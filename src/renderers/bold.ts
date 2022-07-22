import { getMarkdownString } from '../rendering';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { MarkdownEntry, RichTextEntry } from '../shared.types';

export interface BoldEntry extends MarkdownEntry, RichTextEntry {
  bold: RichTextEntry;
  indicator?: '*' | '_';
}

export const boldRenderer: MarkdownRenderer = (
  entry: BoldEntry,
  options: RenderOptions
) => {
  if ('bold' in entry) {
    let indicator = entry.indicator ?? options.boldIndicator ?? '*';

    return `${indicator}${indicator}${getMarkdownString(
      entry.bold,
      options
    )}${indicator}${indicator}`;
  }

  throw new Error('Entry is not a bold entry. Unable to render.');
};
