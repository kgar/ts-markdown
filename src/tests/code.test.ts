import { renderMarkdown } from '../renderMarkdown';

describe('given a code entry', () => {
  describe('with a string value', () => {
    const codeEntry: CodeEntry = {
      code: 'Hello, world!',
    };

    test('renders a code line with the specified string as text', () => {
      expect(renderMarkdown([codeEntry])).toBe(`\`${codeEntry.code}\``);
    });
  });
});
