import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export type ParagraphEntry = {
  p: InlineTypes;
  append?: string;
} & MarkdownEntry;

export const pRenderer: MarkdownRenderer = (
  entry: ParagraphEntry,
  options: RenderOptions
) => {
  if ('p' in entry) {
    if (typeof entry.p === 'string') {
      return getMarkdownString(formatParagraphText(entry.p), options);
    }

    if (Array.isArray(entry.p)) {
      return formatParagraphText(
        entry.p.map((entry) => getMarkdownString(entry, options)).join('')
      );
    }

    let result = getMarkdownString(entry.p, options);

    return formatParagraphText(result)
      .split('\n')
      .map((x) => formatParagraphText(x))
      .join('\n');
  }

  throw new Error('Entry is not a p entry. Unable to render.');
};

function formatParagraphText(text: string) {
  return text
    ?.trimStart()
    .replace(/(^.*?)[\t]+/g, '')
    .trimStart();
}
