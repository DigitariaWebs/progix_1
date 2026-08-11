import "server-only";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { getOpenAiClient, getOpenAiModel } from "@/lib/ai/openai";

// Mirrors the boss's validated prompt verbatim (see spec), plus the explicit
// "leave it blank rather than guess" instruction: a strict json_schema
// forces the model to return every key, so "unknown" has to be a real,
// representable value ("") instead of an omitted field.
const SYSTEM_PROMPT = `According to the following text, generate a JSON object following this template (do not suppose or invent, base on input text only):
{
  clientName: string,
  projectName: string,
  closerName: string,
  currency: "€" or "$",
  fullDescription: string,
  functionalities: string list, at least 5 functionalities, 5 to 10 words each
}

If a field has no support in the input text, return it as an empty string ("") — never guess or invent a value. If functionalities has no support, return an empty array.`;

const aiDevisDraftSchema = z.object({
  clientName: z.string(),
  projectName: z.string(),
  closerName: z.string(),
  currency: z.enum(["€", "$", ""]),
  fullDescription: z.string(),
  functionalities: z.array(z.string()),
});

export type AiDevisDraft = z.infer<typeof aiDevisDraftSchema>;

export class AiParseError extends Error {}

/**
 * Sends the closer's pasted text to OpenAI and returns the structured devis
 * draft. Never touches the database or React state — that's applyAiDraft's
 * job (src/features/devis/ai-draft.ts), which is pure and independently
 * testable.
 */
export async function parseCloserPrompt(rawText: string): Promise<AiDevisDraft> {
  const client = getOpenAiClient();

  const completion = await client.chat.completions.parse({
    model: getOpenAiModel(),
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: rawText },
    ],
    response_format: zodResponseFormat(aiDevisDraftSchema, "devis_draft"),
  });

  const parsed = completion.choices[0]?.message.parsed;
  if (!parsed) {
    throw new AiParseError("Réponse IA illisible, réessaie.");
  }
  return parsed;
}
