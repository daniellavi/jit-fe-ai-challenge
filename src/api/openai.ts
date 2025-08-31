import { OpenAI } from 'openai';
import { sanitizePrompt, isPromptSafe } from './sanitize';
import { parseAndValidateHTML } from './parseAndValidateHTML';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateComponentHTML = async (prompt: string, htmlTag?: string): Promise<string> => {
  const safePrompt = sanitizePrompt(prompt);
  if (!isPromptSafe(safePrompt)) {
    throw new Error('Prompt contains potentially harmful or unsafe content.');
  }

  const openAIClient = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });
  const response = await openAIClient.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are an expert UI assistant.' },
      { role: 'user', content: safePrompt }
    ],
    max_completion_tokens: 100,
    temperature: 0.5
  });

  const html = response.choices?.[0]?.message?.content || '';
  return parseAndValidateHTML(html, htmlTag);
};
