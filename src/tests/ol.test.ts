import { renderMarkdown } from '../renderMarkdown';

describe('given an ordered list entry', () => {
  describe('with a string value', () => {
    const olEntry: OrderedListEntry = {
      ol: [{ li: 'Hello, world!' }],
    };

    test('renders an ordered list line with the specified string as text', () => {
      expect(renderMarkdown([olEntry])).toBe(`1. ${olEntry.ol[0].li}`);
    });
  });

  describe('with rich text', () => {
    const olEntry: OrderedListEntry = {
      ol: [
        {
          li: {
            text: [
              'This text is ',
              { bold: { italic: { highlight: 'so rich!' } } },
            ],
          },
        },
        {
          li: 'And this text is contentedly unadorned',
        },
      ],
    };

    test('renders unordered list with specified rich text', () => {
      expect(renderMarkdown([olEntry])).toBe(
        `1. This text is ***==so rich!==***
2. And this text is contentedly unadorned`
      );
    });
  });

  describe('with a nested ordered list', () => {
    const olEntry: OrderedListEntry = {
      ol: [
        { li: 'Test' },
        {
          li: [
            'Nest',
            {
              ol: [
                {
                  li: {
                    text: [{ italic: 'Nested' }, ' ', { highlight: 'Test' }],
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    test('renders a nested list with the sub-list indented by 4 spaces', () => {
      expect(renderMarkdown([olEntry])).toBe(
        `1. Test
2. Nest
    1. *Nested* ==Test==`
      );
    });
  });

  // TODO: Test ol > content

  // TODO: Test ol > ul nesting

  // TODO: Test ol > ol > ol

  // TODO: Test ol > ul > ol > ul > content
});
