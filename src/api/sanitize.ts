const harmfulPatterns = [
  /<script.*?>/i,
  /<iframe.*?>/i,
  /onerror\s*=|onload\s*=|onclick\s*=/i,
  /system\s*:/i,
  /ignore previous instructions/i,
  /reset instructions/i,
  /\bkill\b|\bdelete\b|\bdrop\b|\bshutdown\b/i,
  /\bpassword\b|\bsecret\b|\btoken\b/i,
  /\bmalicious\b|\bhack\b|\bexploit\b/i,
  /\bnsfw\b|\bsex\b|\bracist\b|\bhate\b|\bviolent\b/i
];

export const sanitizePrompt = (input: string): string => {
  let sanitized = input.replace(/[\u200B-\u200D\uFEFF]/g, '');
  sanitized = sanitized.replace(/[`$]/g, '');
  sanitized = sanitized.replace(/<\/?(script|iframe)[^>]*>/gi, '');

  return sanitized;
};

export const isPromptSafe = (input: string): boolean => {
  for (const pattern of harmfulPatterns) {
    if (pattern.test(input)) {
      return false;
    }
  }
  return true;
};
