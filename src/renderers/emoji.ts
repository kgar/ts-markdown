import { DataDrivenMarkdownOptions } from "../rendering.types";
import { DataDrivenMarkdownEntry, RichTextEntry } from "../shared.types";

export type EmojiEntry = {
  emoji: string;
} & DataDrivenMarkdownEntry &
  RichTextEntry;

export const emojiRenderer = (
  entry: EmojiEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('emoji' in entry) {
    return `:${entry.emoji}:`;
  }

  throw new Error('Entry is not an emoji entry. Unable to render.');
}