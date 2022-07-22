import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry, RichTextEntry } from '../shared.types';

export interface EmojiEntry extends MarkdownEntry, RichTextEntry {
  emoji: string;
}

export const emojiRenderer: MarkdownRenderer = (
  entry: EmojiEntry,
  options: RenderOptions
) => {
  if ('emoji' in entry) {
    return `:${entry.emoji}:`;
  }

  throw new Error('Entry is not an emoji entry. Unable to render.');
};
