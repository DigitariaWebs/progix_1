import "server-only";
import OpenAI from "openai";

const DEFAULT_MODEL = "gpt-4.1-mini";

export class MissingOpenAiKeyError extends Error {
  constructor() {
    super("OPENAI_API_KEY manquante.");
    this.name = "MissingOpenAiKeyError";
  }
}

export function getOpenAiModel(): string {
  return process.env.OPENAI_MODEL || DEFAULT_MODEL;
}

export function getOpenAiClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new MissingOpenAiKeyError();
  return new OpenAI({ apiKey });
}
