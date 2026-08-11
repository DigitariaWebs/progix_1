import assert from 'node:assert/strict';
import { applyAiDraft, slugify } from '../src/features/devis/ai-draft.ts';
import { DEFAULT_ESTIMATE } from '../src/features/devis/types.ts';

const baseForm = {
  id: '',
  ...DEFAULT_ESTIMATE,
  slug: '',
  client_name: '',
  closer_id: null,
  project_name: '',
  project_title: '',
  project_description: '',
  total_amount: '',
};

function mkDraft(overrides = {}) {
  return {
    clientName: '',
    projectName: '',
    closerName: '',
    currency: '',
    fullDescription: '',
    functionalities: [],
    ...overrides,
  };
}

const closers = [
  { id: 'c1', first_name: 'Karima', last_name: 'Benali', email: 'karima@progix.pro' },
  { id: 'c2', first_name: 'Jean', last_name: 'Dupont', email: 'jean@progix.pro' },
  { id: 'c3', first_name: 'Marc', last_name: 'Dupont', email: 'marc@progix.pro' },
];

// --- currency ---
{
  const { next: dollar } = applyAiDraft(baseForm, mkDraft({ currency: '$' }), closers);
  assert.equal(dollar.currency, '$CAD');

  const { next: euro } = applyAiDraft(baseForm, mkDraft({ currency: '€' }), closers);
  assert.equal(euro.currency, '€');

  const formWithCurrency = { ...baseForm, currency: '$CAD' };
  const { next: unchanged } = applyAiDraft(formWithCurrency, mkDraft({ currency: '' }), closers);
  assert.equal(unchanged.currency, '$CAD');
}

// --- closer matching ---
{
  const { next: full, warnings: w1 } = applyAiDraft(
    baseForm,
    mkDraft({ closerName: 'Karima Benali' }),
    closers
  );
  assert.equal(full.closer_id, 'c1');
  assert.ok(!w1.some((w) => w.includes('non reconnu')), 'exact full-name match must not warn');

  const { next: lastOnly } = applyAiDraft(baseForm, mkDraft({ closerName: 'Benali' }), closers);
  assert.equal(lastOnly.closer_id, 'c1');

  const { next: firstOnly } = applyAiDraft(baseForm, mkDraft({ closerName: 'karima' }), closers);
  assert.equal(firstOnly.closer_id, 'c1');

  // "Dupont" matches two closers at the last-name tier — ambiguous, no guess.
  const { next: ambiguous, warnings: w2 } = applyAiDraft(
    baseForm,
    mkDraft({ closerName: 'Dupont' }),
    closers
  );
  assert.equal(ambiguous.closer_id, null);
  assert.ok(w2.some((w) => w.includes('Dupont') && w.includes('non reconnu')));

  const { next: unknown, warnings: w3 } = applyAiDraft(
    baseForm,
    mkDraft({ closerName: 'Zoé Inconnue' }),
    closers
  );
  assert.equal(unknown.closer_id, null);
  assert.ok(w3.some((w) => w.includes('non reconnu')));
}

// --- feature slot replacement ---
{
  const placeholderCount = DEFAULT_ESTIMATE.features.filter(
    (f) => f.category === 'dev' && /^fonctionnalit[eé]\s*\d+$/i.test((f.labelStrong ?? '').trim())
  ).length;
  assert.equal(placeholderCount, 5, 'sanity: DEFAULT_ESTIMATE should ship 5 placeholder slots');

  const originalCount = DEFAULT_ESTIMATE.features.length;

  for (const n of [3, 5, 8]) {
    const functionalities = Array.from({ length: n }, (_, i) => `Fonctionnalité IA numéro ${i + 1}`);
    const { next } = applyAiDraft(baseForm, mkDraft({ functionalities }), closers);
    assert.equal(next.features.length, originalCount - placeholderCount + n, `n=${n}`);

    const devLabels = next.features.filter((f) => f.category === 'dev').map((f) => f.labelStrong);
    for (const text of functionalities) {
      assert.ok(devLabels.includes(text), `missing "${text}" for n=${n}`);
    }

    // Every fixed feature (non-placeholder) survives, unchanged, in order.
    const fixedBefore = DEFAULT_ESTIMATE.features.filter(
      (f) => !(f.category === 'dev' && /^fonctionnalit[eé]\s*\d+$/i.test((f.labelStrong ?? '').trim()))
    );
    const fixedAfter = next.features.filter((f) => !f.id.startsWith('ai-'));
    assert.deepEqual(fixedAfter, fixedBefore, `fixed features must survive unchanged for n=${n}`);
  }
}

// --- 0 functionalities: placeholders untouched, warning emitted ---
{
  const { next, warnings } = applyAiDraft(baseForm, mkDraft({ functionalities: [] }), closers);
  assert.deepEqual(next.features, DEFAULT_ESTIMATE.features);
  assert.ok(warnings.some((w) => w.includes('Aucune fonctionnalité')));
}

// --- generated feature ids are unique within one call ---
{
  const functionalities = Array.from({ length: 8 }, (_, i) => `Fonctionnalité ${i}`);
  const { next } = applyAiDraft(baseForm, mkDraft({ functionalities }), closers);
  const aiIds = next.features.filter((f) => f.id.startsWith('ai-')).map((f) => f.id);
  assert.equal(new Set(aiIds).size, aiIds.length, 'AI feature ids must be unique');
}

// --- empty AI strings never overwrite non-empty form fields ---
{
  const filledForm = {
    ...baseForm,
    client_name: 'Acme Corp',
    project_name: 'Trajeo',
    project_description: 'Une description déjà saisie.',
  };
  const { next } = applyAiDraft(filledForm, mkDraft(), closers);
  assert.equal(next.client_name, 'Acme Corp');
  assert.equal(next.project_name, 'Trajeo');
  assert.equal(next.project_description, 'Une description déjà saisie.');
}

// --- total_amount is never modified ---
{
  const formWithAmount = { ...baseForm, total_amount: '5 600' };
  const { next, warnings } = applyAiDraft(
    formWithAmount,
    mkDraft({ clientName: 'Acme', functionalities: ['x'] }),
    closers
  );
  assert.equal(next.total_amount, '5 600');
  assert.ok(!warnings.some((w) => w.includes('Montant total')));

  const { warnings: w2 } = applyAiDraft(baseForm, mkDraft({ clientName: 'Acme' }), closers);
  assert.ok(w2.some((w) => w.includes('Montant total')));
}

// --- slug derived from clientName, accents stripped ---
{
  const { next } = applyAiDraft(baseForm, mkDraft({ clientName: 'Écurie Générale' }), closers);
  assert.equal(next.slug, 'ecurie-generale');
  assert.equal(slugify('Écurie Générale'), 'ecurie-generale');
}

console.log('ai-draft: all assertions passed');
