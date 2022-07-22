import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { RichTextEntry, MarkdownEntry } from '../shared.types';

export interface StrikethroughEntry extends MarkdownEntry, RichTextEntry {
  strikethrough: RichTextEntry;
}

export const strikethroughRenderer: MarkdownRenderer = (
  entry: StrikethroughEntry,
  options: RenderOptions
) => {
  if ('strikethrough' in entry) {
    return `~~${getMarkdownString(entry.strikethrough, options)}~~`;
  }

  throw new Error('Entry is not a strikethrough entry. Unable to render.');
};
