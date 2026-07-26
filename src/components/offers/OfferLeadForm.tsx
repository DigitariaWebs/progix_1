'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { MONO, leadForm, offersTheme } from '@/data/offersData';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Errors = Partial<Record<string, string>>;

const EMAIL_RE = /^[^\s@"'<>,]+@[^\s@"'<>,]+\.[^\s@"'<>,]{2,}$/;

const REQUIRED = ['name', 'restaurant', 'locations', 'monthlySales', 'phone', 'email'];
const SELECTS = new Set(['locations', 'monthlySales']);

function validateField(name: string, value: string): string | undefined {
  const trimmed = value.trim();
  if (REQUIRED.includes(name) && !trimmed) {
    return SELECTS.has(name) ? leadForm.errorSelect : leadForm.errorRequired;
  }
  if (name === 'email' && trimmed && !EMAIL_RE.test(trimmed)) {
    return leadForm.errorEmail;
  }
  return undefined;
}

const fieldClass = (invalid: boolean) =>
  [
    'w-full border bg-white/[0.04] px-4 py-3.5 text-sm text-white transition-colors duration-200',
    'placeholder:text-white/40 focus:outline-none',
    invalid
      ? 'border-[#F08A6C] focus:border-[#F08A6C]'
      : 'border-white/15 hover:border-white/30 focus:border-[#00D4FF]',
  ].join(' ');

const LABEL_CLASS =
  'mb-2 block text-[11px] uppercase tracking-[0.14em] text-white/60';

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs text-[#F08A6C]">
      {message}
    </p>
  );
}

export default function OfferLeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const reduce = useReducedMotion();

  const asField = (target: EventTarget) =>
    target instanceof HTMLInputElement ||
    target instanceof HTMLSelectElement ||
    target instanceof HTMLTextAreaElement
      ? target
      : null;

  /** Validates on blur, not on keystroke — nagging mid-typing is worse than late. */
  function handleBlur(event: React.FocusEvent<HTMLElement>) {
    const field = asField(event.target);
    if (!field?.name || field.name === 'website') return;
    setErrors((prev) => ({
      ...prev,
      [field.name]: validateField(field.name, field.value),
    }));
  }

  function clearOnEdit(event: React.FormEvent<HTMLFormElement>) {
    const field = asField(event.target);
    if (field?.name && errors[field.name]) {
      setErrors((prev) => ({ ...prev, [field.name]: undefined }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    const found: Errors = {};
    for (const field of REQUIRED) {
      const message = validateField(field, data[field] ?? '');
      if (message) found[field] = message;
    }

    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus('error');
      setFormError('');
      // Send focus to the first problem rather than making people hunt for it.
      const first = form.elements.namedItem(Object.keys(found)[0]);
      if (first instanceof HTMLElement) first.focus();
      return;
    }

    setStatus('sending');
    setFormError('');

    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok || !payload.success) {
        setFormError(payload.message || leadForm.errorGeneric);
        setStatus('error');
        return;
      }
      setStatus('sent');
    } catch {
      setFormError(leadForm.errorGeneric);
      setStatus('error');
    }
  }

  return (
    <section
      id="proposition"
      aria-labelledby="offers-form-title"
      className="scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12"
      style={{ background: offersTheme.ink }}
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          id="offers-form-title"
          eyebrow={leadForm.eyebrow}
          title={leadForm.title}
          tone="dark"
        />

        <Reveal delay={0.08}>
          <p className="mt-5 text-base leading-relaxed text-white/70">
            {leadForm.body}
          </p>
        </Reveal>

        {status === 'sent' ? (
          <motion.div
            role="status"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-12 flex items-start gap-4 border border-[#00D4FF]/40 bg-[#00D4FF]/10 px-6 py-8"
          >
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              style={{ background: offersTheme.cyan }}
            >
              <Check aria-hidden className="h-4 w-4 text-[#0E2233]" strokeWidth={3} />
            </span>
            <p className="text-base text-white">{leadForm.success}</p>
          </motion.div>
        ) : (
          <Reveal delay={0.12}>
            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              onBlurCapture={handleBlur}
              onChange={clearOnEdit}
              className="mt-12 grid gap-6 sm:grid-cols-2"
            >
              {/* Honeypot. Hidden from people, irresistible to bots; the API answers
                  200 without sending when it arrives filled. */}
              <div className="hidden" aria-hidden>
                <label htmlFor="of-website">Site web</label>
                <input
                  id="of-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="of-name">
                  {leadForm.fields.name}
                </label>
                <input
                  id="of-name"
                  name="name"
                  maxLength={200}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'of-name-error' : undefined}
                  className={fieldClass(!!errors.name)}
                />
                <FieldError id="of-name-error" message={errors.name} />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="of-restaurant">
                  {leadForm.fields.restaurant}
                </label>
                <input
                  id="of-restaurant"
                  name="restaurant"
                  maxLength={200}
                  autoComplete="organization"
                  aria-invalid={!!errors.restaurant}
                  aria-describedby={
                    errors.restaurant ? 'of-restaurant-error' : undefined
                  }
                  className={fieldClass(!!errors.restaurant)}
                />
                <FieldError id="of-restaurant-error" message={errors.restaurant} />
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
                  className={fieldClass(false)}
                />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="of-locations">
                  {leadForm.fields.locations}
                </label>
                <select
                  id="of-locations"
                  name="locations"
                  defaultValue=""
                  aria-invalid={!!errors.locations}
                  aria-describedby={
                    errors.locations ? 'of-locations-error' : undefined
                  }
                  className={fieldClass(!!errors.locations)}
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
                <FieldError id="of-locations-error" message={errors.locations} />
              </div>

              <div className="sm:col-span-2">
                <label className={LABEL_CLASS} htmlFor="of-sales">
                  {leadForm.fields.monthlySales}
                </label>
                <select
                  id="of-sales"
                  name="monthlySales"
                  defaultValue=""
                  aria-invalid={!!errors.monthlySales}
                  aria-describedby={
                    errors.monthlySales ? 'of-sales-error' : undefined
                  }
                  className={fieldClass(!!errors.monthlySales)}
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
                <FieldError id="of-sales-error" message={errors.monthlySales} />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="of-phone">
                  {leadForm.fields.phone}
                </label>
                <input
                  id="of-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  maxLength={40}
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'of-phone-error' : undefined}
                  className={fieldClass(!!errors.phone)}
                />
                <FieldError id="of-phone-error" message={errors.phone} />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="of-email">
                  {leadForm.fields.email}
                </label>
                <input
                  id="of-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  maxLength={254}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'of-email-error' : undefined}
                  className={fieldClass(!!errors.email)}
                />
                <FieldError id="of-email-error" message={errors.email} />
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
                  className={`${fieldClass(false)} resize-y`}
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold text-[#0E2233] transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00D4FF] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  style={{ background: offersTheme.cyan }}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                      {leadForm.sending}
                    </>
                  ) : (
                    <>
                      {leadForm.submit}
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <p
                  aria-live="polite"
                  className="mt-4 min-h-5 text-sm text-[#F08A6C]"
                  style={{ fontFamily: MONO }}
                >
                  {formError}
                </p>
              </div>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}
