import { getMarkdownString } from '../rendering';
import { DataDrivenMarkdownOptions } from '../rendering.types';
import { InlineTypes, DataDrivenMarkdownEntry } from '../shared.types';

export type ParagraphEntry = {
  p: InlineTypes;
  append?: string;
} & DataDrivenMarkdownEntry;

export const pRenderer = (
  entry: ParagraphEntry,
  options: DataDrivenMarkdownOptions
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
    if (typeof result === 'string') {
      return formatParagraphText(result);
    }

    return result.map((x) => formatParagraphText(x));
  }

  throw new Error('Entry is not a p entry. Unable to render.');
};

function formatParagraphText(text: string) {
  return text
    ?.trimStart()
    .replace(/(^.*?)[\t]+/g, '')
    .trimStart();
}
