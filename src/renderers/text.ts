import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import {
  RichTextEntry,
  InlineTypes,
  SupportedPrimitive,
} from '../shared.types';
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
  text:
    | SupportedPrimitive
    | (
        | RichTextEntry
        | LinkEntry
        | ImageEntry
        | CodeEntry
        | SupportedPrimitive
      )[];
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
    if (Array.isArray(entry.text)) {
      return entry.text
        .map((textSegment) => getMarkdownString(textSegment, options))
        .join('');
    }

    return getMarkdownString(entry.text, options);
  }

  throw new Error('Entry is not a text entry. Unable to render.');
};

export function text(content: TextEntry['text']): TextEntry {
  return {
    text: content,
  };
}
