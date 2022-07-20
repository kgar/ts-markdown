import { getMarkdownString } from '../rendering';
import {
  DataDrivenMarkdownOptions,
  MarkdownRenderer,
} from '../rendering.types';
import { RichTextEntry, DataDrivenMarkdownEntry } from '../shared.types';

export type ItalicEntry = {
  italic: RichTextEntry;
  indicator?: '*' | '_';
} & DataDrivenMarkdownEntry &
  RichTextEntry;

export const italicRenderer: MarkdownRenderer = (
  entry: ItalicEntry,
  options: DataDrivenMarkdownOptions
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
