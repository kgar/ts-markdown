import { getMarkdownString } from '../rendering';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { MarkdownEntry, RichTextEntry } from '../shared.types';

/**
 * A markdown entry for generating bolded text.
 */
export interface BoldEntry extends MarkdownEntry, RichTextEntry {
  /**
   * The bold text contents and identifying properyt for the renderer.
   */
  bold: RichTextEntry;

  /**
   * The character which will be used to signify bolded text.
   */
  indicator?: '*' | '_';
}

/**
 * The renderer for bold entries.
 *
 * @param entry The renderer for bolded entries.
 * @param options Document-level render options.
 * @returns Bolded markdown content.
 */
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
