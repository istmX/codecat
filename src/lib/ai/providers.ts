import { createGroq } from "@ai-sdk/groq";
import { createMistral } from "@ai-sdk/mistral";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { LanguageModel } from "ai";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// The fallback chain: Groq -> Mistral -> Gemini
export const models = {
  groq: groq("llama-3.3-70b-versatile"), // primary
  mistral: mistral("mistral-large-latest"), // fallback 1
  gemini: google("gemini-3.5-flash"), // fallback 2
};
