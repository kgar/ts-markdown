import { renderMarkdown } from '../renderMarkdown';

describe('given an unordered list entry', () => {
  describe('with a string value', () => {
    const ulEntry: UnorderedListEntry = {
      ul: ['Hello, world!'],
    };

    test('renders an unordered list line with hyphen and the specified string as text', () => {
      expect(renderMarkdown([ulEntry])).toBe(`- ${ulEntry.ul[0]}`);
    });
  });
});
