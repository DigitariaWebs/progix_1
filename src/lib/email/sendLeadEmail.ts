import nodemailer from 'nodemailer';

export type LeadEmail = {
  subject: string;
  html: string;
  replyTo?: string;
};

/** Returns the list of missing env vars, or an empty array when sending is possible. */
export function missingMailConfig(): string[] {
  const missing: string[] = [];
  if (!process.env.CONTACT_EMAIL) missing.push('CONTACT_EMAIL');

  const hasResend = !!process.env.RESEND_API_KEY;
  const hasSmtp = !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.SMTP_FROM
  );
  if (!hasResend && !hasSmtp) {
    missing.push('RESEND_API_KEY (or SMTP_HOST/USER/PASS/FROM)');
  }
  return missing;
}

async function sendViaResend({ subject, html, replyTo }: LeadEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) return false;

  const from = process.env.SMTP_FROM || 'no-reply@progix.pro';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `PROGIX <${from}>`,
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend error ${res.status}: ${detail}`);
  }
  return true;
}

async function sendViaSmtp({ subject, html, replyTo }: LeadEmail) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const configuredFrom = process.env.SMTP_FROM;
  const to = process.env.CONTACT_EMAIL;

  if (!host || !user || !pass || !configuredFrom || !to) {
    throw new Error('SMTP configuration incomplete');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });

  await transporter.verify();

  // Gmail rejects a From that is not the authenticated mailbox.
  const useGmailSafeFrom = /gmail\.com$/i.test(user) || /smtp\.gmail\.com$/i.test(host);

  await transporter.sendMail({
    from: useGmailSafeFrom ? user : configuredFrom,
    to,
    ...(replyTo ? { replyTo } : {}),
    subject,
    html,
  });
}

/** Sends through Resend when available, falling back to SMTP. Throws on total failure. */
export async function sendLeadEmail(email: LeadEmail): Promise<void> {
  if (process.env.RESEND_API_KEY) {
    try {
      if (await sendViaResend(email)) return;
    } catch {
      // fall through to SMTP
    }
  }
  await sendViaSmtp(email);
}
