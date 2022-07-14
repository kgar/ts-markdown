import { renderMarkdown } from '../renderMarkdown';

describe('given a blockquote entry', () => {
  describe('with a single string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        blockquote: 'Hello, world!',
      },
    ];

    test('renders a blokquote markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`> ${data[0]['blockquote']}`);
    });
  });

  describe('with 2 paragraphs of plain text inside', () => {
    const blockquoteEntry: BlockquoteEntry = {
      blockquote: [
        {
          p: 'Hello, world!',
        },
        {
          p: 'Goodbye, Moon Man!',
        },
      ],
    };

    test('renders blockquote with 2 specified paragraphs nested within', () => {
      expect(renderMarkdown([blockquoteEntry])).toBe(
        `> Hello, world!
> 
> Goodbye, Moon Man!`
      );
    });
  });

  describe('with a nested blockquote', () => {
    const blockquoteEntry: BlockquoteEntry = {
      blockquote: [
        {
          blockquote: 'Hello, world!',
        },
      ],
    };

    test('renders blockquote with 2 specified paragraphs nested within', () => {
      expect(renderMarkdown([blockquoteEntry])).toBe(`> > Hello, world!`);
    });
  });

  describe('with an admonition and a nested blockquote with paragraphs of rich text', () => {
    const blockquoteEntry: BlockquoteEntry = {
      blockquote: [
        {
          p: [
            {
              emoji: 'joy',
            },
            {
              text: [': This is an admonition'],
            },
          ],
        },
        {
          p: 'Be advised.',
        },
        {
          blockquote: 'Obsidian rules.',
        },
      ],
    };

    test('renders complex, nested content as expected', () => {
      expect(renderMarkdown([blockquoteEntry]))
        .toBe(`> :joy:: This is an admonition
> 
> Be advised.
> 
> > Obsidian rules.`);
    });
  });

  describe('with other elements', () => {
    const blockquoteEntry: BlockquoteEntry = {
      blockquote: [
        {
          h4: 'The quarterly results look great!',
        },
        {
          ul: ['Revenue was off the chart.', 'Profits were higher than ever.'],
        },
        {
          p: [
            {
              italic: 'Everything',
            },
            {
              text: ' is going according to ',
            },
            {
              bold: 'plan',
            },
            {
              text: '.',
            },
          ],
        },
      ],
    };

    test('renders blockquote with other elements nested within', () => {
      expect(renderMarkdown([blockquoteEntry])).toBe(
        `> #### The quarterly results look great!
> 
> - Revenue was off the chart.
> - Profits were higher than ever.
> 
> *Everything* is going according to **plan**.`
      );
    });
  });

  describe('with nested list in nested blockquote', () => {
    const blockquoteEntry: BlockquoteEntry = {
      blockquote: [
        {
          blockquote: [
            {
              ol: [
                'Revenue was off the chart.',
                {
                  text: [
                    'Profits were ',
                    { bold: { italic: 'higher' } },
                    ' than ever.',
                  ],
                },
              ],
            },
          ],
        }
      ],
    };

    test('renders blockquote with other elements nested within', () => {
      expect(renderMarkdown([blockquoteEntry])).toBe(
        `> > 1. Revenue was off the chart.
> > 2. Profits were ***higher*** than ever.`
      );
    });
  });
});
