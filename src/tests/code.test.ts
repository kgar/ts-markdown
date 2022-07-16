import { renderMarkdown } from '../rendering';

describe('given a code entry', () => {
  describe('with a string value', () => {
    const codeEntry: CodeEntry = {
      code: 'Hello, world!',
    };

    test('renders a code line with the specified string as text', () => {
      expect(renderMarkdown([codeEntry])).toBe(`\`${codeEntry.code}\``);
    });
  });

  describe('with string beginning and ending with backticks', () => {
    const codeEntry: CodeEntry = {
      code: '`${example}`',
    };

    test('renders code segment with 1 extra space between text and wrapping backticks', () => {
      expect(renderMarkdown([codeEntry])).toBe('`` `${example}` ``');
    });
  });

  describe('with looping', () => {
    for (let i = 0; i < 10; i++) {
      describe(`with ${
        i + 1
      } consecutive backtick within the code text`, () => {
        const codeEntry: CodeEntry = {
          code: ' ' + ''.padEnd(i + 1, '`') + ' ',
        };

        test('renders code segment with 2 surrounding backticks', () => {
          const codeIndicator = ''.padEnd(i + 2, '``');
          expect(renderMarkdown([codeEntry])).toBe(
            codeIndicator + codeEntry.code + codeIndicator
          );
        });
      });
    }
  });
});
