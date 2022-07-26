import { getMarkdownString } from '../rendering';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { RichTextEntry, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating italic text.
 */
export interface ItalicEntry extends MarkdownEntry, RichTextEntry {
  /**
   * The italic text contents and identifying property for the renderer.
   */
  italic: RichTextEntry;

  /**
   * Indicator determining what character is used to denote italics.
   * Default: '*'
   */
  indicator?: '*' | '_';
}

/**
 * The renderer for italic entries.
 *
 * @param entry The italic entry.
 * @param options Document-level render options.
 * @returns Italic markdown content.
 */
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

export function italic(
  content: ItalicEntry['italic'],
  options?: Omit<ItalicEntry, 'italic'>
): ItalicEntry {
  return {
    italic: content,
    ...options,
  };
}
