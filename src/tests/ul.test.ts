import { renderMarkdown } from '../renderMarkdown';

describe('given an unordered list entry', () => {
  describe('with a string value', () => {
    const ulEntry: UnorderedListEntry = {
      ul: [{ li: 'Hello, world!' }],
    };

    test('renders an unordered list line with hyphen and the specified string as text', () => {
      expect(renderMarkdown([ulEntry])).toBe(`- ${ulEntry.ul[0].li}`);
    });
  });

  describe('with rich text', () => {
    const ulEntry: UnorderedListEntry = {
      ul: [
        {
          li: {
            text: [
              'This text is ',
              { bold: { italic: { highlight: 'so rich!' } } },
            ],
          },
        },
        { li: 'And this text is contentedly unadorned' },
      ],
    };

    test('renders unordered list with specified rich text', () => {
      expect(renderMarkdown([ulEntry])).toBe(
        `- This text is ***==so rich!==***
- And this text is contentedly unadorned`
      );
    });
  });

  // TODO: Test ul > content

  // TODO: Test ul > ul nesting

  // TODO: Test ul > ol nesting

  // TODO: Test ul > ul > ul
  
  // TODO: Test ol > ul > ol > ul > content
});
