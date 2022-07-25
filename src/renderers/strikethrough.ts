import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { RichTextEntry, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for strikethrough text.
 */
export interface StrikethroughEntry extends MarkdownEntry, RichTextEntry {
  /**
   * The strikethrough text contents and identifying property for the renderer.
   */
  strikethrough: RichTextEntry;
}

/**
 * The renderer for strickethrough text entries.
 * @param entry The strikethrough entry.
 * @param options Document-level render options.
 * @returns Strikethrough markdown content.
 */
export const strikethroughRenderer: MarkdownRenderer = (
  entry: StrikethroughEntry,
  options: RenderOptions
) => {
  if ('strikethrough' in entry) {
    return `~~${getMarkdownString(entry.strikethrough, options)}~~`;
  }

  throw new Error('Entry is not a strikethrough entry. Unable to render.');
};
