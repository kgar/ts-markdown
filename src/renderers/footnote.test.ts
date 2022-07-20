import { renderMarkdown } from '../rendering';
import { FootnoteEntry } from './footnote';

describe('given a footnote entry', () => {
  describe('with valid ID and one line of content', () => {
    const footnoteEntry: FootnoteEntry = {
      footnote: {
        id: '1',
        content: 'This is a footnote.',
      },
    };

    test('renders footnote tag inline and footnote content two lines below', () => {
      expect(renderMarkdown([footnoteEntry])).toBe(
        `[^1]

[^1]: This is a footnote.`
      );
    });
  });

  describe('with valid ID and multiple lines of rich content', () => {
    const footnoteEntry: FootnoteEntry = {
      footnote: {
        id: 'bignote',
        content: [
          { p: "Here's one with multiple paragraphs and code." },
          { p: 'Indent paragraphs to include them in the footnote.' },
          { p: { text: [{ code: '{ my code }' }] } },
          { p: 'Add as many paragraphs as you like.' },
        ],
      },
    };
    
    test('renders footnote tag inline and footnote content two lines below', () => {
      expect(renderMarkdown([footnoteEntry])).toBe(
        `[^bignote]

[^bignote]: Here's one with multiple paragraphs and code.
    
    Indent paragraphs to include them in the footnote.
    
    \`\{ my code \}\`
    
    Add as many paragraphs as you like.`
      );
    });
  });
});
