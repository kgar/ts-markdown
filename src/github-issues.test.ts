import { tsMarkdown } from './rendering';

describe('https://github.com/kgar/ts-markdown/issues/40', () => {
  describe('given text which contains multiple underscores within a single word', () => {
    const paragraphText = `Hello, t_word_with_underscores`;

    const entries = [
      {
        p: paragraphText,
      },
    ];

    test('should be the same text that was originally provided', () => {
      expect(tsMarkdown(entries)).toBe(paragraphText);
    });
  });
});
