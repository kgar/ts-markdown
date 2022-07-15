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

  describe('with inserted elements in list item', () => {
    const olEntry: OrderedListEntry = {
      ol: [
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
        `1. Testing
    # This is the way 💚
    
    > Live, Laugh, Test Code`
      );
    });
  });

  describe('with nested unordered lists', () => {
    const olEntry: OrderedListEntry = {
      ol: [
        {
          li: [
            'Test',
            {
              ul: [{ li: 'Nest' }, { li: 'Nest Test' }],
            },
          ],
        },
        {
          li: [
            'This is',
            {
              ul: [
                {
                  li: { text: ['A ', { bold: 'test' }] },
                },
              ],
            },
          ],
        },
      ],
    };

    test('renders ordered list with nested unordered lists indented with 4 spaces', () => {
      expect(renderMarkdown([olEntry])).toBe(
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
        {
          li: [
            'Given',
            {
              ol: [
                { li: 'a list with' },
                {
                  li: [
                    'numerous layers which',
                    {
                      ol: [
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
        { li: ['in order to', { ol: [{ li: 'meet' }] }] },
        { li: ['expectations!'] },
      ],
    };

    test('renders the nested lists with 4 spaces of indentation added to each nesting layer', () => {
      expect(renderMarkdown([olEntry])).toBe(
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
        {
          li: [
            'this',
            {
              ul: [
                {
                  li: [
                    'is',
                    {
                      ol: [
                        {
                          li: [
                            'a',
                            {
                              ul: [{ li: ['test', { blockquote: 'Dig it!' }] }],
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
      expect(renderMarkdown([olEntry])).toBe(
        `1. this
    - is
        1. a
            - test
                > Dig it!`
      );
    });
  });
});
