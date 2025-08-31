export const parseAndValidateHTML = (html: string, htmlTag?: string): string => {
  let cleaned = html.trim();
  cleaned = cleaned.replace(/^```html\n?|^```\n?|```$/g, '').trim();
  cleaned = cleaned.replace(/```/g, '').trim();
  cleaned = cleaned.replace(/^\s+|\s+$/g, '');

  if (!cleaned) {
    throw new Error('AI did not return a valid HTML.');
  }

  if (htmlTag && !cleaned.startsWith(`<${htmlTag}`)) {
    throw new Error(`AI did not return a valid <${htmlTag}> HTML.`);
  }

  return cleaned;
};
