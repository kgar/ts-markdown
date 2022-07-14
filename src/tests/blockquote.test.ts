import { renderMarkdown } from '../renderMarkdown';

describe('given a blockquote', () => {
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
});
