import { renderMarkdown } from '../rendering';
import { UnorderedListEntry } from './ul';

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

  describe('with a nested ordered list', () => {
    const ulEntry: UnorderedListEntry = {
      ul: [
        'Test',
        [
          'Nest',
          {
            ul: [
              {
                text: [{ italic: 'Nested' }, ' ', { highlight: 'Test' }],
              },
            ],
          },
        ],
      ],
    };

    test('renders a nested list with the sub-list indented by 4 spaces', () => {
      expect(renderMarkdown([ulEntry])).toBe(
        `- Test
- Nest
    - *Nested* ==Test==`
      );
    });
  });

  describe('with inserted elements in list item', () => {
    const olEntry: UnorderedListEntry = {
      ul: [
        [
          'Testing',
          {
            h1: 'This is the way 💚',
          },
          {
            blockquote: 'Live, Laugh, Test Code',
          },
        ],
      ],
    };

    test('renders list item with indented sub-elements', () => {
      expect(renderMarkdown([olEntry])).toBe(
        `- Testing
    # This is the way 💚
    
    > Live, Laugh, Test Code`
      );
    });
  });

  describe('with nested ordered lists', () => {
    const ulEntry: UnorderedListEntry = {
      ul: [
        [
          'Test',
          {
            ol: ['Nest', 'Nest Test'],
          },
        ],
        [
          'This is',
          {
            ol: [{ text: ['A ', { bold: 'test' }] }],
          },
        ],
      ],
    };

    test('renders ordered list with nested ordered lists indented with 4 spaces', () => {
      expect(renderMarkdown([ulEntry])).toBe(
        `- Test
    1. Nest
    2. Nest Test
- This is
    1. A **test**`
      );
    });
  });

  describe('with deep homogeneous nesting', () => {
    const ulEntry: UnorderedListEntry = {
      ul: [
        [
          'Given',
          {
            ul: [
              'a list with',
              [
                'numerous layers which',
                {
                  ul: ['run deep,', 'we must pass our tests'],
                },
              ],
            ],
          },
        ],
        ['in order to', { ul: ['meet'] }],
        ['expectations!'],
      ],
    };

    test('renders the nested lists with 4 spaces of indentation added to each nesting layer', () => {
      expect(renderMarkdown([ulEntry])).toBe(
        `- Given
    - a list with
    - numerous layers which
        - run deep,
        - we must pass our tests
- in order to
    - meet
- expectations!`
      );
    });
  });

  describe('with 4 levels of heterogeneous nesting and then content', () => {
    const ulEntry: UnorderedListEntry = {
      ul: [
        [
          'this',
          {
            ol: [
              [
                'is',
                {
                  ul: [
                    [
                      'a',
                      {
                        ol: [['test', { blockquote: 'Dig it!' }]],
                      },
                    ],
                  ],
                },
              ],
            ],
          },
        ],
      ],
    };

    test('renders the nested lists with 4 spaces of indentation per level', () => {
      expect(renderMarkdown([ulEntry])).toBe(
        `- this
    1. is
        - a
            1. test
                > Dig it!`
      );
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#starting-unordered-list-items-with-numbers
   */
  describe('starting with a number and a period', () => {
    const olEntry: UnorderedListEntry = {
      ul: ['1968. A great year.'],
    };

    test('renders a list item where the first period is escaped', () => {
      expect(renderMarkdown([olEntry])).toBe('- 1968\\. A great year.');
    });
  });

  describe('with local option for asterisk list item indicator', () => {
    const ulEntry: UnorderedListEntry = {
      ul: ["Let's get to work!"],
      indicator: '*',
    };

    test('renders list with asterisk indicator', () => {
      expect(renderMarkdown([ulEntry])).toBe("* Let's get to work!");
    });
  });

  describe('with local option for hyphen list item indicator', () => {
    const ulEntry: UnorderedListEntry = {
      ul: ["Let's get to work!"],
      indicator: '-',
    };

    test('renders list with hyphen indicator', () => {
      expect(renderMarkdown([ulEntry])).toBe("- Let's get to work!");
    });
  });

  describe('with local option for plus sign list item indicator', () => {
    const ulEntry: UnorderedListEntry = {
      ul: ["Let's get to work!"],
      indicator: '+',
    };

    test('renders list with plus sign indicator', () => {
      expect(renderMarkdown([ulEntry])).toBe("+ Let's get to work!");
    });
  });

  describe('with document-level option for asterisk list item indicator', () => {
    const ulEntry: UnorderedListEntry = {
      ul: ["Let's get to work!"],
    };

    test('renders list with asterisk indicator', () => {
      expect(
        renderMarkdown([ulEntry], { unorderedListItemIndicator: '*' })
      ).toBe("* Let's get to work!");
    });
  });

  describe('with document-level option for hyphen list item indicator', () => {
    const ulEntry: UnorderedListEntry = {
      ul: ["Let's get to work!"],
    };

    test('renders list with hyphen indicator', () => {
      expect(
        renderMarkdown([ulEntry], { unorderedListItemIndicator: '-' })
      ).toBe("- Let's get to work!");
    });
  });

  describe('with document-level option for plus sign list item indicator', () => {
    const ulEntry: UnorderedListEntry = {
      ul: ["Let's get to work!"],
    };

    test('renders list with plus sign indicator', () => {
      expect(
        renderMarkdown([ulEntry], { unorderedListItemIndicator: '+' })
      ).toBe("+ Let's get to work!");
    });
  });

  describe('with local option for plus sign and document-level option for hyphen list item indicator', () => {
    const ulEntry: UnorderedListEntry = {
      ul: ["Let's get to work!"],
      indicator: '+',
    };

    test('renders list with plus sign indicator', () => {
      expect(
        renderMarkdown([ulEntry], { unorderedListItemIndicator: '-' })
      ).toBe("+ Let's get to work!");
    });
  });

  describe('with a string value and an Obsidian-esque identifier appended', () => {
    const ulEntry: UnorderedListEntry = {
      ul: ['Hello, world!'],
      append: '^still-here',
    };

    test('renders an unordered list line with hyphen and the specified string as text and an identifier just below', () => {
      expect(renderMarkdown([ulEntry])).toBe(`- ${ulEntry.ul[0]}
^still-here`);
    });
  });
});
