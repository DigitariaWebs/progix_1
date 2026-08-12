import assert from 'node:assert/strict';
import {
  buildDraftFormFromAi,
  buildEstimateFromPromptForm,
  functionalitiesToSlots,
  scaleInvestments,
  buildPaymentFields,
  slugify,
} from '../src/features/devis/ai-draft.ts';
import { DEFAULT_ESTIMATE } from '../src/features/devis/types.ts';
import { parseAmount } from '../src/features/devis/estimate-math.ts';

function mkDraft(overrides = {}) {
  return {
    clientName: '',
    projectName: '',
    closerName: '',
    currency: '',
    price: '',
    fullDescription: '',
    paymentModalities: '',
    timeRecommanded: '',
    functionalities: [],
    ...overrides,
  };
}

const closers = [
  { id: 'c1', first_name: 'Karima', last_name: 'Benali', email: 'karima@progix.pro' },
  { id: 'c2', first_name: 'Jean', last_name: 'Dupont', email: 'jean@progix.pro' },
  { id: 'c3', first_name: 'Marc', last_name: 'Dupont', email: 'marc@progix.pro' },
];

// --- buildDraftFormFromAi: currency ---
{
  const { form: dollar } = buildDraftFormFromAi(mkDraft({ currency: '$CAD' }), closers);
  assert.equal(dollar.currency, '$CAD');

  const { form: euro } = buildDraftFormFromAi(mkDraft({ currency: '€' }), closers);
  assert.equal(euro.currency, '€');

  const { form: fallback } = buildDraftFormFromAi(mkDraft({ currency: '' }), closers);
  assert.equal(fallback.currency, '€', 'unknown currency falls back to €');
}

// --- buildDraftFormFromAi: closer matching ---
{
  const { form: full, warnings: w1 } = buildDraftFormFromAi(
    mkDraft({ closerName: 'Karima Benali' }),
    closers
  );
  assert.equal(full.closerId, 'c1');
  assert.ok(!w1.some((w) => w.includes('non reconnu')));

  const { form: lastOnly } = buildDraftFormFromAi(mkDraft({ closerName: 'Benali' }), closers);
  assert.equal(lastOnly.closerId, 'c1');

  const { form: firstOnly } = buildDraftFormFromAi(mkDraft({ closerName: 'karima' }), closers);
  assert.equal(firstOnly.closerId, 'c1');

  const { form: ambiguous, warnings: w2 } = buildDraftFormFromAi(
    mkDraft({ closerName: 'Dupont' }),
    closers
  );
  assert.equal(ambiguous.closerId, '');
  assert.ok(w2.some((w) => w.includes('Dupont') && w.includes('non reconnu')));

  const { form: unknown, warnings: w3 } = buildDraftFormFromAi(
    mkDraft({ closerName: 'Zoé Inconnue' }),
    closers
  );
  assert.equal(unknown.closerId, '');
  assert.ok(w3.some((w) => w.includes('non reconnu')));
}

// --- buildDraftFormFromAi: price digit-stripping ---
{
  const { form, warnings } = buildDraftFormFromAi(mkDraft({ price: '12480' }), closers);
  assert.equal(form.price, '12480');
  assert.ok(!warnings.some((w) => w.includes('Prix')));

  const { form: dirty } = buildDraftFormFromAi(mkDraft({ price: '12 480 $CAD' }), closers);
  assert.equal(dirty.price, '12480', 'non-digit characters are stripped defensively');

  const { warnings: missing } = buildDraftFormFromAi(mkDraft({ price: '' }), closers);
  assert.ok(missing.some((w) => w.includes('Prix')));
}

// --- buildDraftFormFromAi: paymentModalities / timeRecommanded fallback ---
{
  const { form: valid } = buildDraftFormFromAi(mkDraft({ paymentModalities: '2x' }), closers);
  assert.equal(valid.paymentModalities, '2x');

  const { form: invalid } = buildDraftFormFromAi(mkDraft({ paymentModalities: 'garbage' }), closers);
  assert.equal(invalid.paymentModalities, 'mensualité', 'unrecognized value falls back to mensualité');

  const { form: validDays } = buildDraftFormFromAi(mkDraft({ timeRecommanded: '45' }), closers);
  assert.equal(validDays.timeRecommanded, '45');

  const { form: invalidDays } = buildDraftFormFromAi(mkDraft({ timeRecommanded: '75' }), closers);
  assert.equal(invalidDays.timeRecommanded, '90', 'unrecognized value falls back to 90');
}

// --- functionalitiesToSlots: always exactly 6, padded or truncated ---
{
  assert.equal(functionalitiesToSlots([]).length, 6);
  assert.equal(functionalitiesToSlots(['a', 'b', 'c']).length, 6);
  assert.equal(functionalitiesToSlots(Array.from({ length: 9 }, (_, i) => `f${i}`)).length, 6);

  const three = functionalitiesToSlots(['Une fonctionnalité', 'Une autre', '']);
  assert.equal(three[0].included, true);
  assert.equal(three[1].included, true);
  assert.equal(three[2].included, false, 'empty slot starts unchecked');
  assert.equal(three[5].text, '', 'unsupplied slot is empty');
  assert.equal(three[5].included, false);
}

// --- buildDraftFormFromAi: nothing extracted ---
{
  const { warnings } = buildDraftFormFromAi(mkDraft(), closers);
  assert.ok(warnings.some((w) => w.includes("Aucune information exploitable")));
}

// --- buildEstimateFromPromptForm: full mapping ---
function mkPromptForm(overrides = {}) {
  return {
    clientName: 'Acme Corp',
    projectName: 'Trajeo',
    closerId: 'c1',
    currency: '€',
    price: '5600',
    fullDescription: 'Une description.',
    paymentModalities: '3x',
    paymentMonths: '6',
    timeRecommanded: '90',
    functionalities: functionalitiesToSlots([
      'Réservation de trajet en temps réel',
      'Suivi GPS du chauffeur',
      'Estimation automatique du prix',
    ]),
    ...overrides,
  };
}

{
  const estimate = buildEstimateFromPromptForm(mkPromptForm());
  assert.equal(estimate.client_name, 'Acme Corp');
  assert.equal(estimate.slug, 'acme-corp');
  assert.equal(estimate.project_name, 'Trajeo');
  assert.equal(estimate.project_title, 'Trajeo');
  assert.equal(estimate.closer_id, 'c1');
  assert.equal(estimate.total_amount, '5600');
  assert.equal(estimate.delivery_days, '90');
  assert.equal(estimate.currency, '€');
  assert.equal(estimate.marketing_included, true);
  assert.equal(estimate.locked, false);
}

// --- buildEstimateFromPromptForm: features — placeholders replaced, rest untouched ---
{
  const estimate = buildEstimateFromPromptForm(mkPromptForm());
  const placeholderCount = DEFAULT_ESTIMATE.features.filter(
    (f) => f.category === 'dev' && /^fonctionnalit[eé]\s*\d+$/i.test((f.labelStrong ?? '').trim())
  ).length;
  assert.equal(estimate.features.length, DEFAULT_ESTIMATE.features.length - placeholderCount + 3);

  const devLabels = estimate.features.filter((f) => f.category === 'dev').map((f) => f.labelStrong);
  assert.ok(devLabels.includes('Réservation de trajet en temps réel'));

  const fixedBefore = DEFAULT_ESTIMATE.features.filter(
    (f) => !(f.category === 'dev' && /^fonctionnalit[eé]\s*\d+$/i.test((f.labelStrong ?? '').trim()))
  );
  const fixedAfter = estimate.features.filter((f) => !f.id.startsWith('prompt-'));
  assert.deepEqual(fixedAfter, fixedBefore);
}

// --- buildEstimateFromPromptForm: a disabled functionality slot stays included:false, not dropped ---
{
  const slots = functionalitiesToSlots(['Fonctionnalité gardée', 'Fonctionnalité désactivée']);
  slots[1].included = false;
  const estimate = buildEstimateFromPromptForm(mkPromptForm({ functionalities: slots }));
  const disabled = estimate.features.find((f) => f.labelStrong === 'Fonctionnalité désactivée');
  assert.ok(disabled, 'disabled slot still becomes a feature row');
  assert.equal(disabled.included, false);
}

// --- scaleInvestments: total matches price exactly ---
{
  const investments = scaleInvestments(12480, '$CAD');
  const total = investments.reduce((sum, inv) => sum + parseAmount(inv.amount), 0);
  assert.equal(Math.round(total), 12480);
  assert.ok(investments.every((inv) => inv.amount.endsWith('$CAD')));
}

// --- buildPaymentFields: modalities mapping ---
{
  const oneShot = buildPaymentFields('1x', '6', 5600, '€');
  assert.equal(oneShot.payment_schedule_type, 'installments');
  assert.equal(oneShot.payment_installments.length, 1);
  assert.equal(oneShot.payment_installments[0].percentage, 100);

  const threeShot = buildPaymentFields('3x', '6', 5600, '€');
  assert.equal(threeShot.payment_installments.length, 3);
  const threeTotal = threeShot.payment_installments.reduce((sum, i) => sum + parseAmount(i.amount), 0);
  assert.equal(Math.round(threeTotal), 5600);

  const monthly = buildPaymentFields('mensualité', '9', 5600, '€');
  assert.equal(monthly.payment_schedule_type, 'monthly');
  assert.equal(monthly.payment_months, 9);

  const monthlyBadInput = buildPaymentFields('mensualité', 'garbage', 5600, '€');
  assert.equal(monthlyBadInput.payment_months, 6, 'unparseable months falls back to 6');
}

// --- slugify: accents stripped ---
{
  assert.equal(slugify('Écurie Générale'), 'ecurie-generale');
}

console.log('ai-draft: all assertions passed');
