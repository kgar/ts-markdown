import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { RichTextEntry, InlineTypes } from '../shared.types';
import { CodeEntry } from './code';
import { ImageEntry } from './img';
import { LinkEntry } from './link';

/**
 * A markdown entry for generating inline text.
 * Used for injecting rich inline text in most places, such as a paragraph or a table cell.
 */
export interface TextEntry extends InlineTypes {
  /**
   * The inline text contents and identifying property for the renderer.
   */
  text: string | (RichTextEntry | LinkEntry | ImageEntry | CodeEntry)[];
}

/**
 * The renderer for inline text entries.
 *
 * @param entry The text entry.
 * @param options Document-level render options.
 * @returns Inline text markdown content.
 */
export const textRenderer: MarkdownRenderer = (
  entry: TextEntry,
  options: RenderOptions
) => {
  if ('text' in entry) {
    if (typeof entry.text === 'string') {
      return entry.text;
    }

    return entry.text
      .map((entry) => getMarkdownString(entry, options))
      .join('');
  }

  throw new Error('Entry is not a text entry. Unable to render.');
};
