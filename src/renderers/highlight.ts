import { getMarkdownString } from '../rendering';
import {
  DataDrivenMarkdownOptions,
  MarkdownRenderer,
} from '../rendering.types';
import { RichTextEntry, DataDrivenMarkdownEntry } from '../shared.types';

export type HighlightEntry = {
  highlight: RichTextEntry;
} & DataDrivenMarkdownEntry &
  RichTextEntry;

export const highlightRenderer: MarkdownRenderer = (
  entry: HighlightEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('highlight' in entry) {
    return `==${getMarkdownString(entry.highlight, options)}==`;
  }

  throw new Error('Entry is not a highlight entry. Unable to render.');
};
