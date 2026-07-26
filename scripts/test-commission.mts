import assert from 'node:assert/strict';
import { computeCommission, formatCad } from '../src/lib/offers/commission.ts';

// 12 000 $/month at 29 % is the page default.
const base = computeCommission({ monthlySales: 12000, ratePct: 29 });
assert.equal(base.monthlyCommission, 3480);
assert.equal(base.monthlyNet, 8520);
assert.equal(base.yearlyCommission, 41760);
assert.equal(base.yearlyNet, 102240);

// A zero rate costs nothing.
const free = computeCommission({ monthlySales: 12000, ratePct: 0 });
assert.equal(free.monthlyCommission, 0);
assert.equal(free.monthlyNet, 12000);

// Negative and absurd inputs are clamped, never propagated.
assert.equal(computeCommission({ monthlySales: -500, ratePct: 29 }).monthlyCommission, 0);
assert.equal(computeCommission({ monthlySales: 12000, ratePct: -5 }).monthlyCommission, 0);
assert.equal(computeCommission({ monthlySales: 12000, ratePct: 500 }).monthlyNet, 0);

// Results are whole dollars — no cents leak into the receipt.
const odd = computeCommission({ monthlySales: 9999, ratePct: 29 });
assert.equal(Number.isInteger(odd.monthlyCommission), true);
assert.equal(Number.isInteger(odd.yearlyCommission), true);

// fr-CA money, no cents, non-breaking space before the dollar sign.
assert.equal(formatCad(41760).replace(/ /g, ' '), '41 760 $');
assert.equal(formatCad(0).replace(/ /g, ' '), '0 $');

console.log('commission: all assertions passed');
