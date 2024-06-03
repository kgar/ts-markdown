import { tsMarkdown } from '../rendering';
import { table, TableEntry } from './table';

describe('given a table entry', () => {
  describe('with columns and array-index rows', () => {
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
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col1 | Col2           |
| ---- | -------------- |
| Row1 | Row2           |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('with columns and column-reference rows', () => {
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
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col1 | Col2           |
| ---- | -------------- |
| Row1 | Row2           |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('with missing cell data', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1', 'Col2'],
        rows: [{ Col1: 'Row1' }, { Col1: 'Row3', Col2: 'Row4 is longer' }],
      },
    };

    test('renders a markdown table with justified cell widths and an empty cell for the missing data', () => {
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col1 | Col2           |
| ---- | -------------- |
| Row1 |                |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('with column 2 right-aligned', () => {
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
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col1 |           Col2 |
| ---- | --------------:|
| Row1 |           Row2 |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('with column 2 center-aligned', () => {
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
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col1 |      Col2      |
| ---- |:--------------:|
| Row1 |      Row2      |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('with column 2 center-aligned with perfect centering not possible', () => {
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
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col1 |      Col2       |
| ---- |:---------------:|
| Row1 |      Row2       |
| Row3 | Row4 is longer! |`
      );
    });
  });

  describe('with column 2 left-aligned', () => {
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
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col1 | Col2           |
| ---- |:-------------- |
| Row1 | Row2           |
| Row3 | Row4 is longer |`
      );
    });
  });

  describe('with headers and cells that contain pipe characters', () => {
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
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col&#124;1 | Col&#124;2 |
| ---------- | ---------- |
| Row&#124;1 | Row&#124;2 |
| Row&#124;3 | Row&#124;4 |`
      );
    });

    test('uses custom pipeReplacer function', () => {
      expect(
        tsMarkdown([
          {
            table: {
              columns: ['Col|1', 'Col|2'],
              rows: [
                ['Link', '[[Path/to/note.md|Display Text]]'],
                ['Row|3', 'Row|4'],
              ],
            },
            pipeReplacer: (content: string) =>
              content.replace(/(?<!\\)\|/g, '\\|'),
          },
        ])
      ).toBe(
        `| Col\\|1 | Col\\|2                            |
| ------ | --------------------------------- |
| Link   | [[Path/to/note.md\\|Display Text]] |
| Row\\|3 | Row\\|4                            |`
      );
    });
  });

  describe('with rich row text', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1'],
        rows: [
          [{ text: [{ bold: 'Row1' }, ' works'] }],
          [{ text: [{ italic: 'Row2' }, ' works'] }],
          [{ text: ['Yes, ', { strikethrough: 'Row3' }, ' works'] }],
          [{ text: [{ highlight: 'Row4' }, ' works'] }],
          [{ text: [{ bold: { italic: 'Row5' } }, ' ', { italic: 'works' }] }],
          [
            {
              text: [
                { strikethrough: { bold: { italic: 'Row6' } } },
                ' ',
                { code: 'works' },
              ],
            },
          ],
          [
            {
              text: [
                {
                  highlight: {
                    bold: {
                      italic: 'Row7',
                    },
                  },
                },
                ' ',
                {
                  code: 'works like a charm!',
                },
              ],
            },
          ],
        ],
      },
    };

    test('renders a markdown table with rich row text', () => {
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col1                                 |
| ------------------------------------ |
| **Row1** works                       |
| *Row2* works                         |
| Yes, ~~Row3~~ works                  |
| ==Row4== works                       |
| ***Row5*** *works*                   |
| ~~***Row6***~~ \`works\`               |
| ==***Row7***== \`works like a charm!\` |`
      );
    });
  });

  describe('with rich row text and two pipes', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1'],
        rows: [[{ text: [{ bold: 'Row1||' }, ' works'] }]],
      },
    };

    test('renders a markdown table with rich row text and escaped pipes', () => {
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col1                       |
| -------------------------- |
| **Row1&#124;&#124;** works |`
      );
    });

    test('renders a markdown table with rich row text and escaped pipes, using a custom pipeReplacer function', () => {
      expect(
        tsMarkdown([
          {
            table: {
              columns: ['Col1'],
              rows: [[{ text: [{ bold: 'Row1||' }, ' works'] }]],
            },
            pipeReplacer: (content: string) => content.replace('|', '<PIPE>'),
          },
        ])
      ).toBe(
        `| Col1                       |
| -------------------------- |
| **Row1<PIPE><PIPE>** works |`
      );
    });
  });

  describe('with rich text including a link in one row and rich text including an image in another row', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Test'],
        rows: [
          [
            {
              text: [
                { bold: 'Hello, please go to' },
                ' ',
                { link: { text: 'Google', href: 'https://www.google.com' } },
                '.',
              ],
            },
          ],
          [
            {
              text: [
                'Look at this: ',
                {
                  img: {
                    alt: 'Placeholder!',
                    source: 'https://via.placeholder.com/150',
                  },
                },
              ],
            },
          ],
        ],
      },
    };

    test('renders a table with rich text and a link on one row and rich text with an image on another row', () => {
      expect(tsMarkdown([tableEntry])).toBe(
        `| Test                                                           |
| -------------------------------------------------------------- |
| **Hello, please go to** [Google](https://www.google.com).      |
| Look at this: ![Placeholder!](https://via.placeholder.com/150) |`
      );
    });
  });

  describe('with columns and array-index rows and an Obsidian-esque identifier appended', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['Col1', 'Col2'],
        rows: [
          ['Row1', 'Row2'],
          ['Row3', 'Row4 is longer'],
        ],
      },
      append: '^i-just-keep-showing-up-at-places',
    };

    test('renders a markdown table with justified cell widths and an identifier just below', () => {
      expect(tsMarkdown([tableEntry])).toBe(
        `| Col1 | Col2           |
| ---- | -------------- |
| Row1 | Row2           |
| Row3 | Row4 is longer |
^i-just-keep-showing-up-at-places`
      );
    });
  });

  describe('with single-character header names and cells', () => {
    const tableEntry: TableEntry = {
      table: {
        columns: ['A', 'B'],
        rows: [['C', 'D']],
      },
    };

    test('renders 3 hyphens for each column on the header separator row', () => {
      expect(tsMarkdown([tableEntry])).toBe(
        `| A   | B   |
| --- | --- |
| C   | D   |`
      );
    });
  });

  describe('with external data having null and numeric cells', () => {
    const data = [
      {
        firstName: 'Fred',
        lastName: 'Flintstone',
        age: 100000000,
      },
      {
        firstName: 'Saitama',
        lastName: null,
        age: 25,
      },
      {
        firstName: 'Miles',
        lastName: 'Morales',
        age: 17,
      },
    ];

    const rows = data.map((x) => ({
      'First Name': x.firstName,
      'Last Name': x.lastName,
      Age: x.age,
    }));

    const myTable = {
      table: {
        columns: [
          { name: 'First Name' },
          { name: 'Last Name' },
          { name: 'Age' },
        ],
        rows: rows,
      },
    };

    test('renders table with null values as empty strings and numbers as strings', () => {
      expect(tsMarkdown([myTable])).toBe(
        `| First Name | Last Name  | Age       |
| ---------- | ---------- | --------- |
| Fred       | Flintstone | 100000000 |
| Saitama    |            | 25        |
| Miles      | Morales    | 17        |`
      );
    });
  });

  describe('with fields that differ from the column names', () => {
    const data = [
      {
        firstName: 'Fred',
        lastName: 'Flintstone',
        age: 100000000,
      },
      {
        firstName: 'Saitama',
        lastName: null,
        age: 25,
      },
      {
        firstName: 'Miles',
        lastName: 'Morales',
        age: 17,
      },
    ];

    const myTable = table({
      columns: [
        { name: 'First Name', field: 'firstName' },
        { name: 'Last Name', field: 'lastName' },
        { name: 'Age', field: 'age' },
      ],
      rows: data,
    });

    test('renders tables with specified column names, using data from specified fields', () => {
      expect(tsMarkdown([myTable])).toBe(
        `| First Name | Last Name  | Age       |
| ---------- | ---------- | --------- |
| Fred       | Flintstone | 100000000 |
| Saitama    |            | 25        |
| Miles      | Morales    | 17        |`
      );
    });
  });

  describe('with prefixCellValues option set', () => {
    test.each([[undefined], [true]])(
      'applies prefix to cell values when prefixCellValues = %s',
      (prefixCellValues) => {
        expect(
          tsMarkdown([
            {
              blockquote: {
                table: {
                  columns: ['Col1', 'Col2'],
                  rows: [['Row 1-Left', 'Row 1-Right']],
                },
                prefixCellValues,
              },
            },
          ])
        ).toBe(`> | Col1         | Col2          |
> | ------------ | ------------- |
> | > Row 1-Left | > Row 1-Right |`);
      }
    );

    test('does not prefix cell values when prefixCellValues = false', () => {
      expect(
        tsMarkdown([
          {
            blockquote: {
              table: {
                columns: ['Col1', 'Col2'],
                rows: [['Row 1-Left', 'Row 1-Right']],
              },
              prefixCellValues: false,
            },
          },
        ])
      ).toBe(`> | Col1       | Col2        |
> | ---------- | ----------- |
> | Row 1-Left | Row 1-Right |`);
    });
  });
});
