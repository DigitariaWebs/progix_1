import { NextRequest, NextResponse } from 'next/server';
import { missingMailConfig, sendLeadEmail } from '@/lib/email/sendLeadEmail';
import { leadForm } from '@/data/offersData';

export const runtime = 'nodejs';

/**
 * App Router route handlers have no built-in body limit, and `output: 'standalone'`
 * means there is no platform cap either — so the ceiling is enforced here. Without
 * it a single anonymous POST can turn a 10 MB body into a 10 MB email.
 */
const MAX_BODY_BYTES = 64_000;

const MAX_LENGTH: Record<string, number> = {
  name: 200,
  restaurant: 200,
  city: 120,
  locations: 40,
  monthlySales: 40,
  phone: 40,
  email: 254,
  message: 5000,
};

/**
 * Per-instance and in memory: enough for a single standalone deployment fronting
 * one marketing form. A multi-instance rollout needs a shared store.
 */
const RATE_LIMIT = { windowMs: 10 * 60_000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (at) => now - at < RATE_LIMIT.windowMs,
  );
  recent.push(now);
  if (hits.size > 5000) hits.clear();
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

/** Escapes for both text and attribute positions — the quotes matter in `href`. */
const safe = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const safeNl = (v: unknown) => safe(v).replace(/\n/g, '<br>');

/** A mail header is plain text: no HTML entities, no newlines, bounded length. */
const headerSafe = (v: unknown) =>
  String(v ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);

// Rejects the quote, angle-bracket and comma forms that the mail layer would
// reinterpret as a display name or a second address.
const EMAIL_RE = /^[^\s@"'<>,]+@[^\s@"'<>,]+\.[^\s@"'<>,]{2,}$/;

/** Reads the label straight off the form options so the two can never drift. */
const labelFor = (
  options: ReadonlyArray<{ value: string; label: string }>,
  value: unknown,
) => options.find((o) => o.value === String(value))?.label ?? String(value ?? '');

const row = (key: string, val: string) => `
  <tr>
    <td style="padding:13px 0;border-bottom:1px solid #e9edf2;color:#6b7484;font-size:11px;width:190px;vertical-align:top;letter-spacing:0.08em;text-transform:uppercase;font-weight:600">${key}</td>
    <td style="padding:13px 0;border-bottom:1px solid #e9edf2;color:#0d2235;font-size:14px;vertical-align:top;font-weight:500">${val || '<span style="color:#b6bdc7">—</span>'}</td>
  </tr>`;

export async function POST(request: NextRequest) {
  try {
    const declared = Number(request.headers.get('content-length') ?? 0);
    if (declared > MAX_BODY_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: 'payload_too_large',
          message: 'Votre message est trop long.',
        },
        { status: 413 },
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        {
          success: false,
          error: 'invalid_json',
          message: 'Requête invalide.',
        },
        { status: 400 },
      );
    }

    const {
      name,
      restaurant,
      city,
      locations,
      monthlySales,
      phone,
      email,
      message,
      website,
    } = body;

    // Honeypot: a hidden field no human ever fills. Answer 200 so bots learn nothing.
    if (String(website ?? '').trim()) {
      return NextResponse.json({ success: true, message: 'Submitted successfully' });
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (rateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'rate_limited',
          message: 'Trop de demandes. Réessayez dans quelques minutes.',
        },
        { status: 429 },
      );
    }

    const fields: Record<string, unknown> = {
      name,
      restaurant,
      city,
      locations,
      monthlySales,
      phone,
      email,
      message,
    };

    const tooLong = Object.entries(fields)
      .filter(([key, value]) => String(value ?? '').length > MAX_LENGTH[key])
      .map(([key]) => key);

    if (tooLong.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'validation_failed',
          message: 'Un des champs dépasse la longueur autorisée.',
          details: `Too long: ${tooLong.join(', ')}`,
        },
        { status: 400 },
      );
    }

    const required: Record<string, unknown> = {
      name,
      restaurant,
      locations,
      monthlySales,
      phone,
      email,
    };
    const missingFields = Object.entries(required)
      .filter(([, v]) => !String(v ?? '').trim())
      .map(([k]) => k);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'validation_failed',
          message: 'Veuillez remplir tous les champs obligatoires.',
          details: `Missing: ${missingFields.join(', ')}`,
        },
        { status: 400 },
      );
    }

    const leadEmail = String(email).trim();
    if (!EMAIL_RE.test(leadEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'validation_failed',
          message: 'Veuillez entrer un courriel valide.',
        },
        { status: 400 },
      );
    }

    const missingConfig = missingMailConfig();
    if (missingConfig.length > 0) {
      // Logged, not returned: env var names are not an anonymous caller's business.
      console.error(`[api/offers] missing config: ${missingConfig.join(', ')}`);
      return NextResponse.json(
        {
          success: false,
          error: 'missing_config',
          message: 'Server configuration incomplete',
        },
        { status: 500 },
      );
    }

    const dateStr = new Date().toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef1f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;padding:32px 12px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
      <tr>
        <td style="background:#0d2235;border-radius:8px 8px 0 0;padding:36px 40px">
          <p style="margin:0 0 18px;font-size:13px;font-weight:800;letter-spacing:0.32em;color:#ffffff">PROGIX</p>
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td width="34" height="2" style="background:#00d4ff;font-size:0;line-height:0">&nbsp;</td>
            <td style="padding-left:10px;font-size:10px;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;color:#00708c">/ Offre restaurants</td>
          </tr></table>
          <h1 style="margin:16px 0 6px;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#ffffff;line-height:1.2">${safe(restaurant)}</h1>
          <p style="margin:0 0 14px;font-size:12px;color:rgba(255,255,255,0.6)">Reçue le ${dateStr} via progix.pro/offers</p>
          <p style="margin:0;font-size:14px">
            <a href="mailto:${safe(leadEmail)}" style="color:#00d4ff;text-decoration:none;font-weight:600">${safe(leadEmail)}</a>
            <span style="color:rgba(255,255,255,0.35)">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            <a href="tel:${safe(String(phone).replace(/[^+\d]/g, ''))}" style="color:#ffffff;text-decoration:none">${safe(phone)}</a>
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;padding:26px 40px 8px">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#00708c">Profil du restaurant</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            ${row('Contact', safe(name))}
            ${row('Restaurant', safe(restaurant))}
            ${row('Ville', safe(city))}
            ${row('Établissements', safe(labelFor(leadForm.locationOptions, locations)))}
            ${row('Ventes livraison', safe(labelFor(leadForm.salesOptions, monthlySales)))}
          </table>
        </td>
      </tr>
      ${
        String(message ?? '').trim()
          ? `<tr>
        <td style="background:#ffffff;padding:26px 40px 14px">
          <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#00708c">Précisions</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#3a4654">${safeNl(message)}</p>
        </td>
      </tr>`
          : ''
      }
      <tr>
        <td style="background:#0d2235;border-radius:0 0 8px 8px;padding:20px 40px">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.6)">PROGIX — Développement web, mobile et conseil IT à Montréal &nbsp;·&nbsp; <a href="https://www.progix.pro" style="color:#00d4ff;text-decoration:none">progix.pro</a></p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;

    await sendLeadEmail({
      subject: `Offre restaurants — ${headerSafe(restaurant)}`,
      html,
      replyTo: leadEmail,
    });

    return NextResponse.json({ success: true, message: 'Submitted successfully' });
  } catch (error) {
    // Mail-stack errors carry internal hostnames, ports and credential hints.
    // They belong in the server log, not in an anonymous caller's response.
    console.error('[api/offers] submission failed', error);
    return NextResponse.json(
      {
        success: false,
        error: 'submission_failed',
        message: 'Failed to submit',
        ...(process.env.NODE_ENV === 'production'
          ? {}
          : {
              details:
                error instanceof Error ? error.message : 'Unknown error occurred',
            }),
      },
      { status: 500 },
    );
  }
}
