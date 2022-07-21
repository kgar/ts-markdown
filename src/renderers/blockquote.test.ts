import { renderMarkdown } from '../rendering';
import { MarkdownEntry } from '../shared.types';
import { BlockquoteEntry } from './blockquote';

describe('given a blockquote entry', () => {
  describe('with a single string value', () => {
    const entry = {
      blockquote: 'Hello, world!',
    };

    test('renders a blokquote markdown line with the specified string as text', () => {
      expect(renderMarkdown([entry])).toBe(`> ${entry.blockquote}`);
    });
  });

  describe('with 2 paragraphs of plain text inside', () => {
    const entry: BlockquoteEntry = {
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
      expect(renderMarkdown([entry])).toBe(
        `> Hello, world!
> 
> Goodbye, Moon Man!`
      );
    });
  });

  describe('with a nested blockquote', () => {
    const entry: BlockquoteEntry = {
      blockquote: [
        {
          blockquote: 'Hello, world!',
        },
      ],
    };

    test('renders blockquote with 2 specified paragraphs nested within', () => {
      expect(renderMarkdown([entry])).toBe(`> > Hello, world!`);
    });
  });

  describe('with an admonition and a nested blockquote with paragraphs of rich text', () => {
    const entry: BlockquoteEntry = {
      blockquote: [
        {
          p: {
            text: [
              {
                emoji: 'joy',
              },
              ': This is an admonition',
            ],
          },
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
      expect(renderMarkdown([entry])).toBe(`> :joy:: This is an admonition
> 
> Be advised.
> 
> > Obsidian rules.`);
    });
  });

  describe('with other elements', () => {
    const entry: BlockquoteEntry = {
      blockquote: [
        {
          h4: 'The quarterly results look great!',
        },
        {
          ul: ['Revenue was off the chart.', 'Profits were higher than ever.'],
        },
        {
          p: {
            text: [
              {
                italic: 'Everything',
              },
              ' is going according to ',
              {
                bold: 'plan',
              },
              '.',
            ],
          },
        },
      ],
    };

    test('renders blockquote with other elements nested within', () => {
      expect(renderMarkdown([entry])).toBe(
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
    const entry: BlockquoteEntry = {
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
        },
      ],
    };

    test('renders blockquote with other elements nested within', () => {
      expect(renderMarkdown([entry])).toBe(
        `> > 1. Revenue was off the chart.
> > 2. Profits were ***higher*** than ever.`
      );
    });
  });

  describe('given a blockquote with an Obsidian-esque identifier tacked onto the end of it', () => {
    const input: BlockquoteEntry = {
      blockquote: [{ h1: 'Hello, world!' }, { p: 'This is a blockquote!' }],
      append: '^my-obsidian-id',
    };

    const output = `> # Hello, world!
> 
> This is a blockquote!
^my-obsidian-id`;

    test('renders the blockquote with the identifier just below it', () => {
      expect(renderMarkdown([input])).toBe(output);
    });
  });
});
