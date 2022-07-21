import { tsMarkdown } from '../rendering';
import { OrderedListEntry } from './ol';

describe('given an ordered list entry', () => {
  describe('with a string value', () => {
    const olEntry: OrderedListEntry = {
      ol: ['Hello, world!'],
    };

    test('renders an ordered list line with the specified string as text', () => {
      expect(tsMarkdown([olEntry])).toBe(`1. ${olEntry.ol[0]}`);
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
      expect(tsMarkdown([olEntry])).toBe(
        `1. This text is ***==so rich!==***
2. And this text is contentedly unadorned`
      );
    });
  });

  describe('with a nested ordered list', () => {
    const olEntry: OrderedListEntry = {
      ol: [
        'Test',
        [
          'Nest',
          {
            ol: [
              {
                text: [{ italic: 'Nested' }, ' ', { highlight: 'Test' }],
              },
            ],
          },
        ],
      ],
    };

    test('renders a nested list with the sub-list indented by 4 spaces', () => {
      expect(tsMarkdown([olEntry])).toBe(
        `1. Test
2. Nest
    1. *Nested* ==Test==`
      );
    });
  });

  describe('with inserted elements in list item', () => {
    const olEntry: OrderedListEntry = {
      ol: [
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
      expect(tsMarkdown([olEntry])).toBe(
        `1. Testing
    # This is the way 💚
    
    > Live, Laugh, Test Code`
      );
    });
  });

  describe('with nested unordered lists', () => {
    const olEntry: OrderedListEntry = {
      ol: [
        [
          'Test',
          {
            ul: ['Nest', 'Nest Test'],
          },
        ],
        [
          'This is',
          {
            ul: [{ text: ['A ', { bold: 'test' }] }],
          },
        ],
      ],
    };

    test('renders ordered list with nested unordered lists indented with 4 spaces', () => {
      expect(tsMarkdown([olEntry])).toBe(
        `1. Test
    - Nest
    - Nest Test
2. This is
    - A **test**`
      );
    });
  });

  describe('with deep homogeneous nesting', () => {
    const olEntry: OrderedListEntry = {
      ol: [
        [
          'Given',
          {
            ol: [
              'a list with',
              [
                'numerous layers which',
                {
                  ol: ['run deep,', 'we must pass our tests'],
                },
              ],
            ],
          },
        ],
        ['in order to', { ol: ['meet'] }],
        'expectations!',
      ],
    };

    test('renders the nested lists with 4 spaces of indentation added to each nesting layer', () => {
      expect(tsMarkdown([olEntry])).toBe(
        `1. Given
    1. a list with
    2. numerous layers which
        1. run deep,
        2. we must pass our tests
2. in order to
    1. meet
3. expectations!`
      );
    });
  });

  describe('with 4 levels of heterogeneous nesting and then content', () => {
    const olEntry: OrderedListEntry = {
      ol: [
        [
          'this',
          {
            ul: [
              [
                'is',
                {
                  ol: [
                    [
                      'a',
                      {
                        ul: [['test', { blockquote: 'Dig it!' }]],
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
      expect(tsMarkdown([olEntry])).toBe(
        `1. this
    - is
        1. a
            - test
                > Dig it!`
      );
    });
  });

  describe('with a string value and an Obsidian-esque identifier appended', () => {
    const olEntry: OrderedListEntry = {
      ol: ['Hello, world!'],
      append: '^hai',
    };

    test('renders an ordered list line with the specified string as text and the identifier just below', () => {
      expect(tsMarkdown([olEntry])).toBe(`1. ${olEntry.ol[0]}
^hai`);
    });
  });
});
