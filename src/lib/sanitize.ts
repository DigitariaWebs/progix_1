const NUL = String.fromCharCode(0);
const UNPAIRED_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;

/**
 * Strips characters Postgres's jsonb/text input can't store: the NUL byte
 * (illegal in Postgres text — it's null-terminated C strings under the
 * hood) and unpaired UTF-16 surrogates (half of a broken emoji, e.g. from a
 * mid-character string cut somewhere upstream). Both raise "unsupported
 * Unicode escape sequence" from jsonb_in on insert/upsert. Apply to any
 * free-text captured from users or an LLM before it reaches Supabase.
 */
function sanitizeUnicode(value: string): string {
  return value.split(NUL).join("").replace(UNPAIRED_SURROGATE, "");
}

/** Recursively applies {@link sanitizeUnicode} to every string in an object/array tree. */
export function deepSanitizeUnicode<T>(value: T): T {
  if (typeof value === "string") return sanitizeUnicode(value) as unknown as T;
  if (Array.isArray(value)) return value.map(deepSanitizeUnicode) as unknown as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, deepSanitizeUnicode(v)])
    ) as T;
  }
  return value;
}

/**
 * True if any string in the tree contains a NUL byte or unpaired surrogate —
 * i.e. `deepSanitizeUnicode` would have to remove something. Observed from
 * gpt-4.1-mini structured-output calls: it occasionally (non-deterministically,
 * ~1 in 3 in testing) replaces every accented character in French text with a
 * literal NUL. Stripping NUL then leaves readable words mangled ("jusqu'à" →
 * "jusqu'a" losing the space too), so callers should prefer retrying the
 * generation over silently sanitizing when this returns true.
 */
export function hasUnicodeCorruption(value: unknown): boolean {
  if (typeof value === "string") return sanitizeUnicode(value) !== value;
  if (Array.isArray(value)) return value.some(hasUnicodeCorruption);
  if (value && typeof value === "object") {
    return Object.values(value).some(hasUnicodeCorruption);
  }
  return false;
}
