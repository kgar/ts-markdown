import { getMarkdownString } from '../rendering';
import { RenderOptions } from '../rendering.types';
import { RichTextEntry, MarkdownEntry } from '../shared.types';

export type SuperscriptEntry = {
  sup: RichTextEntry;
  html?: boolean;
} & MarkdownEntry &
  RichTextEntry;

export const supRenderer = (
  entry: SuperscriptEntry,
  options: RenderOptions
) => {
  if ('sup' in entry) {
    let useSuperscriptHtml = entry.html ?? options.useSuperscriptHtml ?? false;
    let superscriptOpen = useSuperscriptHtml ? '<sup>' : '^';
    let superscriptClose = useSuperscriptHtml ? '</sup>' : '^';
    return `${superscriptOpen}${getMarkdownString(
      entry.sup,
      options
    )}${superscriptClose}`;
  }

  throw new Error('Entry is not an sup entry. Unable to render.');
};
