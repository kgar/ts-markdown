import { renderMarkdown } from '../renderMarkdown';

describe('given a text entry', () => {
  describe('with bolded, highlighted text', () => {
    const textEntry: TextEntry = {
      text: [{ bold: { highlight: 'Hello, world!' } }],
    };

    test('renders bolded, highlighted line of specified text', () => {
      expect(renderMarkdown([textEntry])).toBe('**==Hello, world!==**');
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#bold-best-practices
   */
  describe('with mid-word bolding', () => {
    const textEntry: TextEntry = {
      text: ['He', { bold: 'll' }, 'o'],
    };

    test('renders a string with asterisks to denote mid-word bolding', () => {
      expect(renderMarkdown([textEntry])).toBe('He**ll**o');
    });
  });

  /**
   * Based on this recomendation: https://www.markdownguide.org/basic-syntax/#bold-best-practices
   */
  describe('with mid-word italicizing', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        text: ['He', { italic: 'll' }, 'o'],
      },
    ];

    test('renders a string with asterisks to denote mid-word italicizing', () => {
      expect(renderMarkdown(data)).toBe('He*ll*o');
    });
  });

  describe('with a superscript', () => {
    const textEntry: TextEntry = {
      text: ['H', { sup: '2' }, 'O'],
    };

    test('renders text with the specified superscript content', () => {
      expect(renderMarkdown([textEntry])).toBe('H^2^O');
    });
  });

  describe('with a superscript and the HTML flag turned on', () => {
    const textEntry: TextEntry = {
      text: [
        'H',
        { sup: { bold: { highlight: { italic: '2' } } }, html: true },
        'O',
      ],
    };

    test('renders text with the specified superscript content with HTML superscript tags', () => {
      expect(renderMarkdown([textEntry])).toBe('H<sup>**==*2*==**</sup>O');
    });
  });

  describe('with a subscript', () => {
    const textEntry: TextEntry = {
      text: ['H', { sub: '2' }, 'O'],
    };

    test('renders text with the specified subscript content', () => {
      expect(renderMarkdown([textEntry])).toBe('H~2~O');
    });
  });

  describe('with a subcript and the HTML flag turned on', () => {
    const textEntry: TextEntry = {
      text: [
        'H',
        { sub: { bold: { highlight: { italic: '2' } } }, html: true },
        'O',
      ],
    };

    test('renders text with the specified superscript content with HTML superscript tags', () => {
      expect(renderMarkdown([textEntry])).toBe('H<sub>**==*2*==**</sub>O');
    });
  });

  describe('with arbitrary HTML table inserted', () => {
    const textEntry: TextEntry = {
      text: `<table>
  <tr>
    <th>Person 1</th>
    <th>Person 2</th>
    <th>Person 3</th>
  </tr>
  <tr>
    <td>Emil</td>
    <td>Tobias</td>
    <td>Linus</td>
  </tr>
  <tr>
    <td>16</td>
    <td>14</td>
    <td>10</td>
  </tr>
</table>`,
    };

    test('preserves the HTML faithfully when rendering', () => {
      expect(renderMarkdown([textEntry])).toBe(`<table>
  <tr>
    <th>Person 1</th>
    <th>Person 2</th>
    <th>Person 3</th>
  </tr>
  <tr>
    <td>Emil</td>
    <td>Tobias</td>
    <td>Linus</td>
  </tr>
  <tr>
    <td>16</td>
    <td>14</td>
    <td>10</td>
  </tr>
</table>`);
    });
  });

  describe('with two footnotes', () => {
    const textEntry: TextEntry = {
      text: [
        "Here's a simple footnote,",
        {
          footnote: {
            id: '1',
            content: 'This is the first footnote.',
          },
        },
        " and here's a longer one.",
        {
          footnote: {
            id: 'bignote',
            content: [
              { p: "Here's one with multiple paragraphs and code." },
              { p: 'Indent paragraphs to include them in the footnote.' },
              { p: { text: [{ code: '{ my code }' }] } },
              { p: 'Add as many paragraphs as you like.' },
            ],
          },
        },
      ],
    };

    // TODO: make this test work. Switch from a hard-typed footnote crawler to a generic one. Take an unknown object type and search for footnote entries.
    test('renders text with footnote identifiers and footnotes in order of appearance at the bottom', () => {
      expect(renderMarkdown([textEntry])).toBe(
        `Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.
    
    Indent paragraphs to include them in the footnote.
    
    \`\{ my code \}\`
    
    Add as many paragraphs as you like.`
      );
    });
  });
});
