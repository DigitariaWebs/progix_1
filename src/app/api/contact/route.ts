import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const safe = (v: unknown) =>
  String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const safeNl = (v: unknown) => safe(v).replace(/\n/g, '<br>');

const row = (key: string, val: string) => `
  <tr>
    <td style="padding:13px 0;border-bottom:1px solid #e9edf2;color:#8a94a3;font-size:11px;width:190px;vertical-align:top;letter-spacing:0.08em;text-transform:uppercase;font-weight:600">${key}</td>
    <td style="padding:13px 0;border-bottom:1px solid #e9edf2;color:#0d2235;font-size:14px;vertical-align:top;font-weight:500">${val || '<span style="color:#b6bdc7">—</span>'}</td>
  </tr>`;

const answer = (n: string, title: string, body: string) => body ? `
  <tr>
    <td style="padding:0 0 26px">
      <p style="margin:0 0 7px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0093b8">${n} — ${title}</p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#3a4654">${body}</p>
    </td>
  </tr>` : '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, company, challenge, stage, blockers, opportunity,
      targetUsers, goalBlockers, investment, validation,
      commitment, readiness, determination, callCommitment, questions,
      email, phone,
    } = body;

    // All steps are required except 'questions' and 'phone' — mirrors the client-side gate
    const requiredFields = {
      name, company, challenge, stage, blockers, opportunity,
      targetUsers, goalBlockers, investment, validation,
      commitment, readiness, determination, callCommitment, email,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([, v]) => !String(v ?? '').trim())
      .map(([k]) => k);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, error: 'validation_failed', message: 'Veuillez répondre à toutes les questions obligatoires.', details: `Missing: ${missingFields.join(', ')}` },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
      return NextResponse.json(
        { success: false, error: 'validation_failed', message: 'Veuillez entrer un email valide.' },
        { status: 400 },
      );
    }
    const leadEmail = String(email).trim();

    const hasResend = !!process.env.RESEND_API_KEY;
    const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM);

    if (!process.env.CONTACT_EMAIL || (!hasResend && !hasSmtp)) {
      const missing: string[] = [];
      if (!process.env.CONTACT_EMAIL) missing.push('CONTACT_EMAIL');
      if (!hasResend && !hasSmtp) missing.push('RESEND_API_KEY (or SMTP_HOST/USER/PASS/FROM)');
      return NextResponse.json(
        { success: false, error: 'missing_config', message: 'Server configuration incomplete', details: `Missing: ${missing.join(', ')}` },
        { status: 500 },
      );
    }

    const fmt = {
      company: (v: string) => ({ created: 'Oui, une entreprise déjà créée', creating: 'Oui, en cours de création', none: 'Non, pas encore' }[v] || v),
      stage: (v: string) => ({ idea: 'Idée', developing: 'En cours de développement', launched: 'Déjà lancé' }[v] || v),
      targetUsers: (v: string) => ({ '<1k': 'Moins de 1 000', '1k-2k': '1 000 – 2 000', '2k-5k': '2 000 – 5 000', '5k+': '5 000+' }[v] || v),
      investment: (v: string) => ({ '<5k': 'Moins de 5 000 $', '5k-10k': '5 000 $ à 10 000 $', '10k-20k': '10 000 $ à 20 000 $', '20k+': '20 000 $ et plus', discuss: 'Je souhaite en discuter' }[v] || v),
      yesno: (v: string) => ({ yes: 'Oui', no: 'Non' }[v] || v),
      readiness: (v: string) => ({ 'yes-fit': 'Oui, si la solution correspond à mes attentes', conditional: 'Oui, sous certaines conditions', considering: 'Je suis encore en réflexion', no: 'Non pour le moment' }[v] || v),
    };

    const det = parseInt(determination, 10) || 0;
    const detPct = Math.min(100, Math.max(0, det * 10));
    const dateStr = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef1f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;padding:32px 12px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

      <!-- Header -->
      <tr>
        <td style="background:#0d2235;border-radius:8px 8px 0 0;padding:36px 40px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0 0 18px;font-size:13px;font-weight:800;letter-spacing:0.32em;color:#ffffff">PROGIX</p>
                <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                  <td width="34" height="2" style="background:#00d4ff;font-size:0;line-height:0">&nbsp;</td>
                  <td style="padding-left:10px;font-size:10px;font-weight:700;letter-spacing:0.26em;text-transform:uppercase;color:#00d4ff">/ Nouvelle qualification</td>
                </tr></table>
                <h1 style="margin:16px 0 6px;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:#ffffff;line-height:1.2">${safe(name) || 'Anonyme'}</h1>
                <p style="margin:0 0 14px;font-size:12px;color:rgba(255,255,255,0.55)">Reçue le ${dateStr} via progix.pro/contact</p>
                <p style="margin:0;font-size:14px">
                  <a href="mailto:${safe(leadEmail)}" style="color:#00d4ff;text-decoration:none;font-weight:600">${safe(leadEmail)}</a>
                  ${phone ? `<span style="color:rgba(255,255,255,0.35)">&nbsp;&nbsp;·&nbsp;&nbsp;</span><a href="tel:${safe(String(phone).replace(/[^+\d]/g, ''))}" style="color:#ffffff;text-decoration:none">${safe(phone)}</a>` : ''}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Stat cards -->
      <tr>
        <td style="background:#ffffff;padding:28px 40px 0">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="48%" style="background:#f4f7fa;border:1px solid #e9edf2;border-radius:6px;padding:16px 18px;vertical-align:top">
                <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8a94a3">Budget prévu</p>
                <p style="margin:0;font-size:17px;font-weight:800;color:#0d2235;line-height:1.3">${safe(fmt.investment(investment))}</p>
              </td>
              <td width="4%" style="font-size:0">&nbsp;</td>
              <td width="48%" style="background:#f4f7fa;border:1px solid #e9edf2;border-radius:6px;padding:16px 18px;vertical-align:top">
                <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#8a94a3">Détermination</p>
                <p style="margin:0 0 8px;font-size:17px;font-weight:800;color:#0d2235">${det} / 10</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
                  <td style="background:#e3e8ee;border-radius:3px;font-size:0;line-height:0;height:6px">
                    <table role="presentation" width="${detPct}%" cellpadding="0" cellspacing="0"><tr>
                      <td style="background:#00d4ff;border-radius:3px;font-size:0;line-height:0;height:6px">&nbsp;</td>
                    </tr></table>
                  </td>
                </tr></table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Profile rows -->
      <tr>
        <td style="background:#ffffff;padding:26px 40px 8px">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#0093b8">Profil du prospect</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            ${row('Email', `<a href="mailto:${safe(leadEmail)}" style="color:#0093b8;text-decoration:none;font-weight:600">${safe(leadEmail)}</a>`)}
            ${row('Téléphone', phone ? safe(phone) : '')}
            ${row('Structure existante', safe(fmt.company(company)))}
            ${row('Stade du projet', safe(fmt.stage(stage)))}
            ${row('Utilisateurs cibles (4 mois)', safe(fmt.targetUsers(targetUsers)))}
            ${row('Prêt à s\'impliquer', safe(fmt.yesno(commitment)))}
            ${row('Capacité à initier', safe(fmt.readiness(readiness)))}
            ${row('Engagement appel stratégique', safe(fmt.yesno(callCommitment)))}
          </table>
        </td>
      </tr>

      <!-- Detailed answers -->
      <tr>
        <td style="background:#ffffff;padding:30px 40px 14px">
          <p style="margin:0 0 22px;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#0093b8;border-bottom:1px solid #e9edf2;padding-bottom:12px">Réponses détaillées</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${answer('03', 'Défi principal', safeNl(challenge))}
            ${answer('05', 'Blocages actuels', safeNl(blockers))}
            ${answer('06', 'Plus grande opportunité', safeNl(opportunity))}
            ${answer('08', 'Blocages vers l\'objectif', safeNl(goalBlockers))}
            ${answer('10', 'Validation marché', safeNl(validation))}
            ${answer('15', 'Questions du prospect', safeNl(questions))}
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#0d2235;border-radius:0 0 8px 8px;padding:20px 40px">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.45)">PROGIX — Développement web, mobile et conseil IT à Montréal &nbsp;·&nbsp; <a href="https://www.progix.pro" style="color:#00d4ff;text-decoration:none">progix.pro</a></p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body></html>`;

    const sendViaResend = async () => {
      const apiKey = process.env.RESEND_API_KEY;
      const to = process.env.CONTACT_EMAIL;
      if (!apiKey || !to) return false;
      const from = process.env.SMTP_FROM || 'no-reply@progix.pro';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: `PROGIX <${from}>`,
          to: [to],
          reply_to: leadEmail,
          subject: `Nouvelle qualification — ${safe(name) || 'Anonyme'}`,
          html,
        }),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Resend error ${res.status}: ${txt}`);
      }
      return true;
    };

    let sent = false;
    try {
      if (process.env.RESEND_API_KEY) {
        await sendViaResend();
        sent = true;
      }
    } catch {
      // fall back to SMTP
    }

    if (!sent) {
      const host = process.env.SMTP_HOST;
      const port = parseInt(process.env.SMTP_PORT || '587', 10);
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      const configuredFrom = process.env.SMTP_FROM;
      const to = process.env.CONTACT_EMAIL;

      if (!host || !user || !pass || !configuredFrom || !to) {
        return NextResponse.json(
          { success: false, message: 'Email service not configured. Set RESEND_API_KEY or SMTP_* env vars.' },
          { status: 500 },
        );
      }

      const transporter = nodemailer.createTransport({
        host, port, secure: port === 465,
        auth: { user, pass },
        tls: { rejectUnauthorized: false },
      });

      try {
        await transporter.verify();
      } catch {
        return NextResponse.json(
          { success: false, message: 'SMTP verification failed', code: 'SMTP_VERIFY_ERROR' },
          { status: 500 },
        );
      }

      const useGmailSafeFrom = /gmail\.com$/i.test(user) || /smtp\.gmail\.com$/i.test(host);
      const from = useGmailSafeFrom ? user : configuredFrom!;

      await transporter.sendMail({
        from, to,
        replyTo: leadEmail,
        subject: `Nouvelle qualification — ${safe(name) || 'Anonyme'}`,
        html,
      });
    }

    return NextResponse.json({ success: true, message: 'Submitted successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorCode = error && typeof error === 'object' && 'code' in error
      ? (error as { code?: string }).code
      : 'UNKNOWN';
    return NextResponse.json(
      { success: false, error: 'submission_failed', message: 'Failed to submit', details: errorMessage, errorCode, timestamp: new Date().toISOString() },
      { status: 500 },
    );
  }
}
