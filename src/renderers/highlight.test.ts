import { tsMarkdown } from '../rendering';
import { HighlightEntry } from './highlight';

describe('given a highlight entry', () => {
  describe('with a string value', () => {
    const highlightEntry: HighlightEntry = {
      highlight: 'Hello, world!',
    };

    test('renders a highlight line with the specified text', () => {
      expect(tsMarkdown([highlightEntry])).toBe(
        `==${highlightEntry.highlight}==`
      );
    });
  });
});
