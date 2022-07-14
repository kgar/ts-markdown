import { renderMarkdown } from '../renderMarkdown';

describe('given an ordered list entry', () => {
  describe('with a string value', () => {
    const olEntry: OrderedListEntry = {
      ol: ['Hello, world!'],
    };

    test('renders an ordered list line with the specified string as text', () => {
      expect(renderMarkdown([olEntry])).toBe(`1. ${olEntry.ol[0]}`);
    });
  });

  describe('with rich text', () => {
    const olEntry: OrderedListEntry = {
      ol: [
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
      expect(renderMarkdown([olEntry])).toBe(
        `1. This text is ***==so rich!==***
2. And this text is contentedly unadorned`
      );
    });
  });
});
