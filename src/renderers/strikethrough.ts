import { getMarkdownString } from '../rendering';
import { DataDrivenMarkdownOptions } from '../rendering.types';
import { RichTextEntry, DataDrivenMarkdownEntry } from '../shared.types';

export type StrikethroughEntry = {
  strikethrough: RichTextEntry;
} & DataDrivenMarkdownEntry &
  RichTextEntry;

export const strikethroughRenderer = (
  entry: StrikethroughEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('strikethrough' in entry) {
    return `~~${getMarkdownString(entry.strikethrough, options)}~~`;
  }

  throw new Error('Entry is not a strikethrough entry. Unable to render.');
};
