import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry, RichTextEntry } from '../shared.types';

/**
 * A markdown entry for generating emojis.
 */
export interface EmojiEntry extends MarkdownEntry, RichTextEntry {
  /**
   * The emoji name.
   */
  emoji: string;
}

/**
 * The renderer for emoji entries.
 *
 * @param entry The emoji entry.
 * @param options Document-level render options.
 * @returns Emoji markdown content.
 */
export const emojiRenderer: MarkdownRenderer = (
  entry: EmojiEntry,
  options: RenderOptions
) => {
  if ('emoji' in entry) {
    return `:${entry.emoji}:`;
  }

  throw new Error('Entry is not an emoji entry. Unable to render.');
};
