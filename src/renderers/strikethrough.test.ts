import { tsMarkdown } from '../rendering';
import { StrikethroughEntry } from './strikethrough';

describe('given a strikethrough entry', () => {
  describe('with a string value', () => {
    const strikethroughEntry: StrikethroughEntry = {
      strikethrough: 'Hello, world!',
    };

    test('renders a highlight line with the specified text', () => {
      expect(tsMarkdown([strikethroughEntry])).toBe(
        `~~${strikethroughEntry.strikethrough}~~`
      );
    });
  });
});
