import { getMarkdownString } from '../rendering';
import {
  DataDrivenMarkdownOptions,
  MarkdownRenderer,
} from '../rendering.types';
import { DataDrivenMarkdownEntry, RichTextEntry } from '../shared.types';

export type BoldEntry = {
  bold: RichTextEntry;
  indicator?: '*' | '_';
} & DataDrivenMarkdownEntry &
  RichTextEntry;

export const boldRenderer: MarkdownRenderer = (
  entry: BoldEntry,
  options: DataDrivenMarkdownOptions
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
