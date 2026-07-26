'use client';

import { useState } from 'react';
import { DISPLAY, MONO, leadForm, offersTheme } from '@/data/offersData';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD_CLASS =
  'w-full border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/40 focus:border-[#00D4FF] focus:outline-none';

const LABEL_CLASS =
  'mb-2 block text-[11px] uppercase tracking-[0.14em] text-white/60';

export default function OfferLeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok || !payload.success) {
        setErrorMessage(payload.message || leadForm.errorGeneric);
        setStatus('error');
        return;
      }
      setStatus('sent');
    } catch {
      setErrorMessage(leadForm.errorGeneric);
      setStatus('error');
    }
  }

  return (
    <section
      id="proposition"
      className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12"
      style={{ background: offersTheme.ink }}
    >
      <div className="mx-auto max-w-3xl">
        <p
          className="text-[11px] uppercase tracking-[0.3em] text-white/60"
          style={{ fontFamily: MONO }}
        >
          {leadForm.eyebrow}
        </p>
        <h2
          className="mt-6 font-bold text-white"
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {leadForm.title}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/70">
          {leadForm.body}
        </p>

        {status === 'sent' ? (
          <p
            role="status"
            className="mt-12 border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-6 py-8 text-base text-white"
          >
            {leadForm.success}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 grid gap-6 sm:grid-cols-2">
            {/* Honeypot. Hidden from people, irresistible to bots; the API answers
                200 without sending when it arrives filled. */}
            <div className="hidden" aria-hidden>
              <label htmlFor="of-website">Site web</label>
              <input id="of-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-name">
                {leadForm.fields.name}
              </label>
              <input
                id="of-name"
                name="name"
                required
                maxLength={200}
                autoComplete="name"
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-restaurant">
                {leadForm.fields.restaurant}
              </label>
              <input
                id="of-restaurant"
                name="restaurant"
                required
                maxLength={200}
                autoComplete="organization"
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-city">
                {leadForm.fields.city}
              </label>
              <input
                id="of-city"
                name="city"
                maxLength={120}
                autoComplete="address-level2"
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-locations">
                {leadForm.fields.locations}
              </label>
              <select
                id="of-locations"
                name="locations"
                required
                defaultValue=""
                className={FIELD_CLASS}
              >
                <option value="" disabled>
                  Choisir
                </option>
                {leadForm.locationOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-black"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={LABEL_CLASS} htmlFor="of-sales">
                {leadForm.fields.monthlySales}
              </label>
              <select
                id="of-sales"
                name="monthlySales"
                required
                defaultValue=""
                className={FIELD_CLASS}
              >
                <option value="" disabled>
                  Choisir
                </option>
                {leadForm.salesOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-black"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-phone">
                {leadForm.fields.phone}
              </label>
              <input
                id="of-phone"
                name="phone"
                type="tel"
                required
                maxLength={40}
                autoComplete="tel"
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="of-email">
                {leadForm.fields.email}
              </label>
              <input
                id="of-email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                className={FIELD_CLASS}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={LABEL_CLASS} htmlFor="of-message">
                {leadForm.fields.message}
              </label>
              <textarea
                id="of-message"
                name="message"
                rows={4}
                maxLength={5000}
                className={`${FIELD_CLASS} resize-y`}
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-full px-8 py-4 text-sm font-semibold text-[#0E2233] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                style={{ background: offersTheme.cyan }}
              >
                {status === 'sending' ? leadForm.sending : leadForm.submit}
              </button>

              <p role="alert" aria-live="polite" className="mt-4 text-sm text-[#F08A6C]">
                {status === 'error' ? errorMessage : ''}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
