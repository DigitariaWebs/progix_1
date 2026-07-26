import { NextRequest, NextResponse } from 'next/server';
import { missingMailConfig, sendLeadEmail } from '@/lib/email/sendLeadEmail';

export const runtime = 'nodejs';

const safe = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const safeNl = (v: unknown) => safe(v).replace(/\n/g, '<br>');

const row = (key: string, val: string) => `
  <tr>
    <td style="padding:13px 0;border-bottom:1px solid #e9edf2;color:#8a94a3;font-size:11px;width:190px;vertical-align:top;letter-spacing:0.08em;text-transform:uppercase;font-weight:600">${key}</td>
    <td style="padding:13px 0;border-bottom:1px solid #e9edf2;color:#0d2235;font-size:14px;vertical-align:top;font-weight:500">${val || '<span style="color:#b6bdc7">—</span>'}</td>
  </tr>`;

const LOCATIONS: Record<string, string> = {
  '1': '1 établissement',
  '2-5': '2 à 5 établissements',
  '6-20': '6 à 20 établissements',
  '20+': 'Plus de 20 établissements',
};

const SALES: Record<string, string> = {
  '<5k': 'Moins de 5 000 $ / mois',
  '5k-15k': '5 000 $ à 15 000 $ / mois',
  '15k-40k': '15 000 $ à 40 000 $ / mois',
  '40k+': 'Plus de 40 000 $ / mois',
  none: 'Pas encore de livraison',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, restaurant, city, locations, monthlySales, phone, email, message } = body;

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail)) {
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
      return NextResponse.json(
        {
          success: false,
          error: 'missing_config',
          message: 'Server configuration incomplete',
          details: `Missing: ${missingConfig.join(', ')}`,
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
            <td style="padding-left:10px;font-size:10px;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;color:#00d4ff">/ Offre restaurants</td>
          </tr></table>
          <h1 style="margin:16px 0 6px;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#ffffff;line-height:1.2">${safe(restaurant)}</h1>
          <p style="margin:0 0 14px;font-size:12px;color:rgba(255,255,255,0.55)">Reçue le ${dateStr} via progix.pro/offers</p>
          <p style="margin:0;font-size:14px">
            <a href="mailto:${safe(leadEmail)}" style="color:#00d4ff;text-decoration:none;font-weight:600">${safe(leadEmail)}</a>
            <span style="color:rgba(255,255,255,0.35)">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            <a href="tel:${safe(String(phone).replace(/[^+\d]/g, ''))}" style="color:#ffffff;text-decoration:none">${safe(phone)}</a>
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#ffffff;padding:26px 40px 8px">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#0093b8">Profil du restaurant</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            ${row('Contact', safe(name))}
            ${row('Restaurant', safe(restaurant))}
            ${row('Ville', safe(city))}
            ${row('Établissements', safe(LOCATIONS[String(locations)] || locations))}
            ${row('Ventes livraison', safe(SALES[String(monthlySales)] || monthlySales))}
          </table>
        </td>
      </tr>
      ${
        String(message ?? '').trim()
          ? `<tr>
        <td style="background:#ffffff;padding:26px 40px 14px">
          <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#0093b8">Précisions</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#3a4654">${safeNl(message)}</p>
        </td>
      </tr>`
          : ''
      }
      <tr>
        <td style="background:#0d2235;border-radius:0 0 8px 8px;padding:20px 40px">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.45)">PROGIX — Développement web, mobile et conseil IT à Montréal &nbsp;·&nbsp; <a href="https://www.progix.pro" style="color:#00d4ff;text-decoration:none">progix.pro</a></p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;

    await sendLeadEmail({
      subject: `Offre restaurants — ${safe(restaurant) || 'Sans nom'}`,
      html,
      replyTo: leadEmail,
    });

    return NextResponse.json({ success: true, message: 'Submitted successfully' });
  } catch (error) {
    const details = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      {
        success: false,
        error: 'submission_failed',
        message: 'Failed to submit',
        details,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
