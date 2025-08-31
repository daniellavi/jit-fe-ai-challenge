
import type { GenerateComponentRequest } from "../types";
import { sanitizePrompt, isPromptSafe } from "./sanitize";

export const buildComponentPrompt = ({ type, props }: GenerateComponentRequest): string => {
  let prompt = `Generate a single valid HTML <${type}> element styled inline (with style attribute) based on these attributes:`;
  
  for (const [key, value] of Object.entries(props)) {
    const safeValue = sanitizePrompt(String(value));
    prompt += `\n- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${safeValue}`;
  }

  prompt += `\nThe element's text must be exactly: "${sanitizePrompt(props.text ?? '')}".`;
  prompt += `\nInterpret vague values sensibly. Only return the <${type}> element.`;

  prompt = sanitizePrompt(prompt);
  if (!isPromptSafe(prompt)) {
    throw new Error('Prompt contains potentially harmful or unsafe content.');
  }

  return prompt;
};
