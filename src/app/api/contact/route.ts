import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const safe = (v: unknown) =>
  String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const safeNl = (v: unknown) => safe(v).replace(/\n/g, '<br>');

const label = (key: string, val: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#666;font-size:11px;width:200px;vertical-align:top;letter-spacing:0.06em;text-transform:uppercase">${key}</td>
    <td style="padding:10px 0;border-bottom:1px solid #1a1a1a;color:#e0e0e0;font-size:13px;vertical-align:top">${val || '<em style="color:#444">—</em>'}</td>
  </tr>`;

const section = (n: string, title: string, body: string) => body ? `
  <div style="margin-bottom:28px">
    <p style="font-size:10px;color:#555;letter-spacing:0.14em;text-transform:uppercase;margin:0 0 8px">${n}. ${title}</p>
    <p style="font-size:13px;color:#ccc;line-height:1.75;margin:0">${body}</p>
  </div>` : '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, company, challenge, stage, blockers, opportunity,
      targetUsers, goalBlockers, investment, validation,
      commitment, readiness, determination, callCommitment, questions,
    } = body;

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

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#080808;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
<div style="max-width:620px;margin:0 auto;padding:48px 28px">
  <div style="margin-bottom:44px">
    <p style="font-size:9px;font-weight:700;letter-spacing:0.32em;text-transform:uppercase;color:#444;margin:0 0 14px">PROGIX</p>
    <h1 style="font-size:26px;font-weight:800;color:#ffffff;margin:0 0 8px;letter-spacing:-0.02em">Nouvelle qualification reçue</h1>
    <p style="font-size:12px;color:#555;margin:0">Soumission via le formulaire de qualification Progix — ${new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <table style="width:100%;border-collapse:collapse;margin-bottom:44px">
    ${label('Nom', safe(name))}
    ${label('Structure existante', safe(fmt.company(company)))}
    ${label('Stade du projet', safe(fmt.stage(stage)))}
    ${label('Utilisateurs cibles (4 mois)', safe(fmt.targetUsers(targetUsers)))}
    ${label('Budget prévu', safe(fmt.investment(investment)))}
    ${label('Prêt à s\'impliquer', safe(fmt.yesno(commitment)))}
    ${label('Capacité à initier', safe(fmt.readiness(readiness)))}
    ${label('Détermination', determination ? `${safe(determination)} / 10` : '')}
    ${label('Engagement appel stratégique', safe(fmt.yesno(callCommitment)))}
  </table>

  <div style="margin-bottom:40px">
    <p style="font-size:9px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#444;margin:0 0 24px;padding-bottom:12px;border-bottom:1px solid #1a1a1a">Réponses détaillées</p>
    ${section('3', 'Défi principal', safeNl(challenge))}
    ${section('5', 'Blocages actuels', safeNl(blockers))}
    ${section('6', 'Plus grande opportunité', safeNl(opportunity))}
    ${section('8', 'Blocages vers l\'objectif', safeNl(goalBlockers))}
    ${section('10', 'Validation marché', safeNl(validation))}
    ${section('15', 'Questions', safeNl(questions))}
  </div>

  <div style="border-top:1px solid #181818;padding-top:20px">
    <p style="font-size:10px;color:#3a3a3a;margin:0">progix.pro — formulaire de qualification</p>
  </div>
</div>
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
