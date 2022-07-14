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
});
