import { getMarkdownString } from '../rendering';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { RichTextEntry, MarkdownEntry } from '../shared.types';

export type ItalicEntry = {
  italic: RichTextEntry;
  indicator?: '*' | '_';
} & MarkdownEntry &
  RichTextEntry;

export const italicRenderer: MarkdownRenderer = (
  entry: ItalicEntry,
  options: RenderOptions
) => {
  if ('italic' in entry) {
    let indicator = entry.indicator ?? options.italicIndicator ?? '*';
    return `${indicator}${getMarkdownString(
      entry.italic,
      options
    )}${indicator}`;
  }

  throw new Error('Entry is not an italic entry. Unable to render.');
};
