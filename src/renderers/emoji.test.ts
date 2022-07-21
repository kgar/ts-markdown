import { tsMarkdown } from '../rendering';
import { EmojiEntry } from './emoji';

describe('given an emoji entry', () => {
  describe('with a specified emoji name', () => {
    const emojiEntry: EmojiEntry = {
      emoji: 'joy',
    };

    test('renders an emoji line with the specified emoji name', () => {
      expect(tsMarkdown([emojiEntry])).toBe(':joy:');
    });
  });
});
