import "server-only";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { getOpenAiClient, getOpenAiModel } from "@/lib/ai/openai";
import { deepSanitizeUnicode, hasUnicodeCorruption } from "@/lib/sanitize";

// Mirrors the boss's validated prompt verbatim (see spec), plus the explicit
// "leave it blank rather than guess" instruction: a strict json_schema
// forces the model to return every key, so "unknown" has to be a real,
// representable value ("") instead of an omitted field. functionalities is
// requested as up to 6 items rather than schema-enforced to exactly 6 —
// OpenAI's strict mode doesn't reliably support fixed-length arrays, so the
// 6-slot shape is enforced in code instead (see functionalitiesToSlots in
// ai-draft.ts), padding/truncating whatever the model returns.
const SYSTEM_PROMPT = `According to the following text, generate a JSON object following this template (do not suppose or invent, base on input text only, write everything in french):
{
  clientName: string,
  projectName: string,
  closerName: string,
  currency: "€" or "$CAD",
  price: string (digits only, no currency symbol or spaces, e.g. "12480"),
  fullDescription: string,
  paymentModalities: "1x" or "2x" or "3x" or "mensualité",
  functionalities: up to 6 items, at least 4, 12 to 15 words each
}

If a field has no support in the input text, return it as an empty string (""). Never guess or invent a value. If fewer than 6 functionalities are supported by the text, return only the ones that are.`;

const aiDevisDraftSchema = z.object({
  clientName: z.string(),
  projectName: z.string(),
  closerName: z.string(),
  currency: z.enum(["€", "$CAD", ""]),
  price: z.string(),
  fullDescription: z.string(),
  paymentModalities: z.enum(["1x", "2x", "3x", "mensualité", ""]),
  functionalities: z.array(z.string()),
});

export type AiDevisDraft = z.infer<typeof aiDevisDraftSchema>;

export class AiParseError extends Error {}

// gpt-4.1-mini frequently (non-deterministically, ~2 in 3 calls in testing)
// replaces every accented French character in its structured output with a
// literal NUL byte — Postgres's jsonb_in rejects that outright on save, and
// simply stripping it leaves words mangled ("jusqu'à" → "jusqu'a", losing
// the space too). It's non-deterministic per-call, so retrying is far more
// likely to land clean than the mangled text is to become readable through
// sanitizing alone — but the failure rate is high enough that a low retry
// budget (e.g. 2-3) still has a real chance of exhausting without a clean
// result, hence 5.
const MAX_ATTEMPTS = 5;

/**
 * Sends the closer's pasted text to OpenAI and returns the structured devis
 * draft. Never touches the database or React state — that's ai-draft.ts's
 * job (buildDraftFormFromAi / buildEstimateFromPromptForm), which is pure
 * and independently testable.
 */
export async function parseCloserPrompt(rawText: string): Promise<AiDevisDraft> {
  const client = getOpenAiClient();
  let lastParsed: AiDevisDraft | undefined;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const completion = await client.chat.completions.parse({
      model: getOpenAiModel(),
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: rawText },
      ],
      response_format: zodResponseFormat(aiDevisDraftSchema, "devis_draft"),
    });

    const parsed = completion.choices[0]?.message.parsed;
    if (!parsed) continue;
    if (!hasUnicodeCorruption(parsed)) return parsed;
    lastParsed = parsed;
  }

  if (!lastParsed) {
    throw new AiParseError("Réponse IA illisible, réessaie.");
  }
  // Every attempt came back corrupted — fall back to a sanitized copy so the
  // save still succeeds, rather than blocking the closer entirely.
  return deepSanitizeUnicode(lastParsed);
}
