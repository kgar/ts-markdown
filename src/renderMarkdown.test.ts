import { renderMarkdown } from './renderMarkdown';

describe('single element tests', () => {
  describe('given a single h1 object with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h1: 'Hello, world!',
      },
    ];

    test('renders an h1 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`# ${data[0]['h1']}`);
    });
  });

  describe('given a single h2 object with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h2: 'Hello, world!',
      },
    ];

    test('renders an h2 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`## ${data[0]['h2']}`);
    });
  });

  describe('given a single h3 object with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h3: 'Hello, world!',
      },
    ];

    test('renders an h3 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`### ${data[0]['h3']}`);
    });
  });

  describe('given a single h4 object with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h4: 'Hello, world!',
      },
    ];

    test('renders an h4 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`#### ${data[0]['h4']}`);
    });
  });

  describe('given a single h5 object with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h5: 'Hello, world!',
      },
    ];

    test('renders an h5 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`##### ${data[0]['h5']}`);
    });
  });

  describe('given a single h6 object with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h6: 'Hello, world!',
      },
    ];

    test('renders an h6 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`###### ${data[0]['h6']}`);
    });
  });

  describe('given a single bold element with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        bold: 'Hello, world!',
      },
    ];

    test('renders a bolded markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`**${data[0]['bold']}**`);
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#bold-best-practices
   */
  describe('given a single text element mid-word bolding', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        text: ['He', { bold: 'll' }, 'o'],
      },
    ];

    test('renders a string with asterisks to denote mid-word bolding', () => {
      expect(renderMarkdown(data)).toBe('He**ll**o');
    });
  });

  describe('given a single italic element with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        italic: 'Hello, world!',
      },
    ];

    test('renders a italicized markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`*${data[0]['italic']}*`);
    });
  });

  /**
   * Based on this recomendation: https://www.markdownguide.org/basic-syntax/#bold-best-practices
   */
  describe('given a single text element mid-word italicizing', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        text: ['He', { italic: 'll' }, 'o'],
      },
    ];

    test('renders a string with asterisks to denote mid-word italicizing', () => {
      expect(renderMarkdown(data)).toBe('He*ll*o');
    });
  });

  describe('given a single blockquote element with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        blockquote: 'Hello, world!',
      },
    ];

    test('renders a blokquote markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`> ${data[0]['blockquote']}`);
    });
  });

  describe('given an ordered list element with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        ol: ['Hello, world!'],
      },
    ];

    test('renders an ordered list line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`1. ${data[0]['ol']}`);
    });
  });

  describe('given an unordered list element with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        ul: ['Hello, world!'],
      },
    ];

    test('renders an unordered list line with hyphen and the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`- ${data[0]['ul']}`);
    });
  });
});
