import { tsMarkdown } from './rendering';

describe('https://github.com/kgar/ts-markdown/issues/40', () => {
  describe('given text in any node which contains multiple underscores within the word', () => {
    const wordWithUnderscores = 't_word_with_underscores';
    const paragraphText = `Hello, ${wordWithUnderscores}`;

    const entries = [
      {
        p: paragraphText,
      },
    ];

    test('should not convert the underscores to asterisks', () => {
      expect(tsMarkdown(entries)).toBe(paragraphText);
    });
  });
});
