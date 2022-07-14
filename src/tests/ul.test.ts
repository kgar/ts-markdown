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

  describe('with rich text', () => {
    const ulEntry: UnorderedListEntry = {
      ul: [
        {
          text: [
            'This text is ',
            { bold: { italic: { highlight: 'so rich!' } } },
          ],
        },
        'And this text is contentedly unadorned',
      ],
    };

    test('renders unordered list with specified rich text', () => {
      expect(renderMarkdown([ulEntry])).toBe(
        `- This text is ***==so rich!==***
- And this text is contentedly unadorned`
      );
    });
  });
});
