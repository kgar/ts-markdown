import { renderMarkdown } from "../renderMarkdown";

describe('given an emoji entry', () => {
  describe('with a specified emoji name', () => {
    const emojiEntry: EmojiEntry = {
      emoji: 'joy',
    };

    test('renders an emoji line with the specified emoji name', () => {
      expect(renderMarkdown([emojiEntry])).toBe(':joy:');
    });
  });
});
