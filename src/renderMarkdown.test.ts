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

  describe('given a code element with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        code: 'Hello, world!',
      },
    ];

    test('renders a code line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`\`${data[0]['code']}\``);
    });
  });

  describe('given a horizontal rule element with any value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        hr: '',
      },
    ];

    test('renders a horizontal rule', () => {
      expect(renderMarkdown(data)).toBe(`---`);
    });
  });

  describe('given a link element with no text', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        link: { source: 'https://www.google.com' },
      },
    ];

    test('renders an auto-link', () => {
      expect(renderMarkdown(data)).toBe(data[0]['link']['source']);
    });
  });

  describe('given a link element with text', () => {
    const linkEntry = {
      link: { source: 'https://www.google.com', text: 'Google' },
    };

    test('renders a link line with specified text and source', () => {
      expect(renderMarkdown([linkEntry])).toBe(
        `[${linkEntry.link.text}](${linkEntry.link.source})`
      );
    });
  });

  describe('given a link element with source, text, and title', () => {
    const linkEntry = {
      link: {
        source: 'https://www.google.com',
        text: 'Google',
        title: 'Let Me Google That For You...',
      },
    };

    test('renders a link line with specified text and source', () => {
      expect(renderMarkdown([linkEntry])).toBe(
        `[${linkEntry.link.text}](${linkEntry.link.source} "${linkEntry.link.title}")`
      );
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#link-best-practices
   */
  describe('given a link with source that has spaces', () => {
    const linkEntry = {
      link: {
        source: 'https://www.google.com/this is my cool link',
      },
    };

    test('renders an auto-link with spaces URL-encoded', () => {
      expect(renderMarkdown([linkEntry])).toBe(
        linkEntry.link.source.replace(/\s/g, '%20')
      );
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#link-best-practices
   */
  describe('given a link with source and text that has spaces', () => {
    const linkEntry = {
      link: {
        source: 'https://www.google.com/this is my cool link',
        text: 'Not a cool link',
      },
    };

    test('renders a link line with spaces URL-encoded on the source', () => {
      expect(renderMarkdown([linkEntry])).toBe(
        `[${linkEntry.link.text}](${linkEntry.link.source.replace(
          /\s/g,
          '%20'
        )})`
      );
    });
  });

  describe('given a single paragraph element', () => {
    const pEntry = {
      p: 'Hello, world!',
    };

    test('renders a paragraph line with the specified string', () => {
      expect(renderMarkdown([pEntry])).toBe(pEntry.p);
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#paragraph-best-practices
   * Also, a paragraph with 4 spaces creates a code block.
   */
  describe('given a single paragraph element with 4 spaces of indentation', () => {
    const pEntry = {
      p: '    Hello, world!',
    };

    test('renders a paragraph line with the specified string and without indentation', () => {
      expect(renderMarkdown([pEntry])).toBe(pEntry.p.trim());
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#paragraph-best-practices
   */
  describe('given a single paragraph element with 2 tabs of indentation', () => {
    const pEntry = {
      p: '\t\tHello, world!',
    };

    test('renders a paragraph line with the specified string and without indentation', () => {
      expect(renderMarkdown([pEntry])).toBe('Hello, world!');
    });
  });

  describe('given a single paragraph element with rich text', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        p: [{ bold: 'Hello,' }, ' ', { italic: 'world!' }],
      },
    ];

    test('renders a paragraph line with the specified string and rich text formatting', () => {
      expect(renderMarkdown(data)).toBe('**Hello,** *world!*');
    });
  });

  describe('given a single image element with an href', () => {
    const imgEntry = {
      img: {
        href: 'image.png',
      },
    };

    test('renders an image line with the specified href', () => {
      expect(renderMarkdown([imgEntry])).toBe(`![](${imgEntry.img.href})`);
    });
  });

  describe('given a single image element with an href and alt text', () => {
    const imgEntry = {
      img: {
        href: 'image.png',
        alt: 'Alt text here',
      },
    };

    test('renders an image line with the specified href and alt text', () => {
      expect(renderMarkdown([imgEntry])).toBe(
        `![${imgEntry.img.alt}](${imgEntry.img.href})`
      );
    });
  });

  describe('given a single image element with an href, title, and alt text', () => {
    const imgEntry = {
      img: {
        href: 'image.png',
        alt: 'Alt text here',
        title: 'Title here',
      },
    };

    test('renders an image line with the specified href and alt text', () => {
      expect(renderMarkdown([imgEntry])).toBe(
        `![${imgEntry.img.alt}](${imgEntry.img.href} "${imgEntry.img.title}")`
      );
    });
  });

  describe('given a single table element with columns and array-index rows', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1', 'Col2'],
        rows: [
          ['Row1', 'Row2'],
          ['Row3', 'Row4 is longer'],
        ],
      },
    };

    test('renders a markdown table with justified cell widths', () => {
      expect(renderMarkdown([tableEntry])).toBe(
        `| Col1 | Col2           |
| ---- | -------------- |
| Row1 | Row2           |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('given a single table element with columns and column-reference rows', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1', 'Col2'],
        rows: [
          { Col1: 'Row1', Col2: 'Row2' },
          { Col1: 'Row3', Col2: 'Row4 is longer' },
        ],
      },
    };

    test('renders a markdown table with justified cell widths', () => {
      expect(renderMarkdown([tableEntry])).toBe(
        `| Col1 | Col2           |
| ---- | -------------- |
| Row1 | Row2           |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('given a single table element with missing cell data', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1', 'Col2'],
        rows: [{ Col1: 'Row1' }, { Col1: 'Row3', Col2: 'Row4 is longer' }],
      },
    };

    test('renders a markdown table with justified cell widths and an empty cell for the missing data', () => {
      expect(renderMarkdown([tableEntry])).toBe(
        `| Col1 | Col2           |
| ---- | -------------- |
| Row1 |                |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('given a single table element with column 2 right-aligned', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1', { name: 'Col2', align: 'right' }],
        rows: [
          { Col1: 'Row1', Col2: 'Row2' },
          { Col1: 'Row3', Col2: 'Row4 is longer' },
        ],
      },
    };

    test('renders a markdown table with justified cell widths and column 2 set to right-aligned', () => {
      expect(renderMarkdown([tableEntry])).toBe(
        `| Col1 |           Col2 |
| ---- | --------------:|
| Row1 |           Row2 |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('given a single table element with column 2 center-aligned', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1', { name: 'Col2', align: 'center' }],
        rows: [
          { Col1: 'Row1', Col2: 'Row2' },
          { Col1: 'Row3', Col2: 'Row4 is longer' },
        ],
      },
    };

    test('renders a markdown table with justified cell widths and column 2 set to center-aligned', () => {
      expect(renderMarkdown([tableEntry])).toBe(
        `| Col1 |      Col2      |
| ---- |:--------------:|
| Row1 |      Row2      |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('given a single table element with column 2 center-aligned with perfect centering not possible', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1', { name: 'Col2', align: 'center' }],
        rows: [
          { Col1: 'Row1', Col2: 'Row2' },
          { Col1: 'Row3', Col2: 'Row4 is longer!' },
        ],
      },
    };

    test('renders a markdown table with justified cell widths and column 2 set to center-aligned with more spaces on the right side', () => {
      expect(renderMarkdown([tableEntry])).toBe(
        `| Col1 |      Col2       |
| ---- |:---------------:|
| Row1 |      Row2       |
| Row3 | Row4 is longer! |`
      );
    });
  });

  describe('given a single table element with column 2 left-aligned', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1', { name: 'Col2', align: 'left' }],
        rows: [
          { Col1: 'Row1', Col2: 'Row2' },
          { Col1: 'Row3', Col2: 'Row4 is longer' },
        ],
      },
    };

    test('renders a markdown table with justified cell widths and column 2 set to left-aligned', () => {
      expect(renderMarkdown([tableEntry])).toBe(
        `| Col1 | Col2           |
| ---- |:-------------- |
| Row1 | Row2           |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('given a single table element with headers and cells that contain pipe characters', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col|1', 'Col|2'],
        rows: [
          ['Row|1', 'Row|2'],
          ['Row|3', 'Row|4'],
        ],
      },
    };

    test('renders a markdown table with justified cell widths and HTML-encoded pipe characters', () => {
      expect(renderMarkdown([tableEntry])).toBe(
        `| Col&#124;1 | Col&#124;2 |
| ---------- | ---------- |
| Row&#124;1 | Row&#124;2 |
| Row&#124;3 | Row&#124;4 |`
      );
    });
  });

  // TODO: Add table tests for acceptable elements.
  // TODO: Test
  /*
    - links
    - code
    - emphasis
    - bold
    - italic
    - strikethrough
    - highlight
    - text (rich text)
    - array of rich strings and rich text objects
  */

  // TODO: Test pipe-escaping in nested rich text scenarios

  // TODO: Add table tests for unacceptable elements. (correlate this with Obsidian. Does Obsidian let you put things in tables that the Markdown guide says cannot go there?)
});
