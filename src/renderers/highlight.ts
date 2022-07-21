import { getMarkdownString } from '../rendering';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { RichTextEntry, MarkdownEntry } from '../shared.types';

export type HighlightEntry = {
  highlight: RichTextEntry;
} & MarkdownEntry &
  RichTextEntry;

export const highlightRenderer: MarkdownRenderer = (
  entry: HighlightEntry,
  options: RenderOptions
) => {
  if ('highlight' in entry) {
    return `==${getMarkdownString(entry.highlight, options)}==`;
  }

  throw new Error('Entry is not a highlight entry. Unable to render.');
};
