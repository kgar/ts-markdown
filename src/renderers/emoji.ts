import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry, RichTextEntry } from '../shared.types';

export type EmojiEntry = {
  emoji: string;
} & MarkdownEntry &
  RichTextEntry;

export const emojiRenderer: MarkdownRenderer = (
  entry: EmojiEntry,
  options: RenderOptions
) => {
  if ('emoji' in entry) {
    return `:${entry.emoji}:`;
  }

  throw new Error('Entry is not an emoji entry. Unable to render.');
};
