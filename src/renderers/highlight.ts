import { getMarkdownString } from '../rendering';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { RichTextEntry, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating highlighted text.
 */
export interface HighlightEntry extends MarkdownEntry, RichTextEntry {
  /**
   * The highlighted contents and identifying property for the renderer.
   */
  highlight: RichTextEntry;
}

/**
 * The renderer for highlight entries.
 * @param entry The highlight entry.
 * @param options Document-level render options.
 * @returns Hihglighted text markdown content.
 */
export const highlightRenderer: MarkdownRenderer = (
  entry: HighlightEntry,
  options: RenderOptions
) => {
  if ('highlight' in entry) {
    return `==${getMarkdownString(entry.highlight, options)}==`;
  }

  throw new Error('Entry is not a highlight entry. Unable to render.');
};
