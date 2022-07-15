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

  describe('with a nested ordered list', () => {
    const ulEntry: UnorderedListEntry = {
      ul: [
        { li: 'Test' },
        {
          li: [
            'Nest',
            {
              ul: [
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
        {
          li: [
            'Testing',
            {
              h1: 'This is the way 💚',
            },
            {
              blockquote: 'Live, Laugh, Test Code',
            },
          ],
        },
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
        {
          li: [
            'Test',
            {
              ol: [{ li: 'Nest' }, { li: 'Nest Test' }],
            },
          ],
        },
        {
          li: [
            'This is',
            {
              ol: [
                {
                  li: { text: ['A ', { bold: 'test' }] },
                },
              ],
            },
          ],
        },
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
        {
          li: [
            'Given',
            {
              ul: [
                { li: 'a list with' },
                {
                  li: [
                    'numerous layers which',
                    {
                      ul: [
                        { li: 'run deep,' },
                        { li: 'we must pass our tests' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        { li: ['in order to', { ul: [{ li: 'meet' }] }] },
        { li: ['expectations!'] },
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
        {
          li: [
            'this',
            {
              ol: [
                {
                  li: [
                    'is',
                    {
                      ul: [
                        {
                          li: [
                            'a',
                            {
                              ol: [{ li: ['test', { blockquote: 'Dig it!' }] }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
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
});
