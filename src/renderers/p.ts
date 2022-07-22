import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export interface ParagraphEntry extends MarkdownEntry {
  p: InlineTypes;
  append?: string;
}

export const pRenderer: MarkdownRenderer = (
  entry: ParagraphEntry,
  options: RenderOptions
) => {
  if ('p' in entry) {
    let result = getParagraphMarkdown(entry, options);

    return {
      markdown: typeof result === 'string' ? result : result.markdown,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not a p entry. Unable to render.');
};

function formatParagraphText(text: string) {
  return text
    ?.trimStart()
    .replace(/(^.*?)[\t]+/g, '')
    .trimStart();
}

function getParagraphMarkdown(entry: ParagraphEntry, options: RenderOptions) {
  if (typeof entry.p === 'string') {
    return getMarkdownString(formatParagraphText(entry.p), options);
  }

  if (Array.isArray(entry.p)) {
    return formatParagraphText(
      entry.p.map((entry) => getMarkdownString(entry, options)).join('')
    );
  }

  let result = getMarkdownString(entry.p, options);

  let resultMarkdown = typeof result === 'string' ? result : result.markdown;

  return formatParagraphText(resultMarkdown)
    .split('\n')
    .map((x) => formatParagraphText(x))
    .join('\n');
}
