import { getMarkdownString, renderEntries } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';
import { TextEntry } from './text';

/**
 * A markdown entry for generating tables.
 */
export interface TableEntry extends MarkdownEntry {
  /**
   * The table row and column data, and identifying property for the renderer.
   */
  table: {
    /**
     * The column headers for the table.
     */
    columns: (TableColumn | string)[];

    /**
     * The row data for the table.
     */
    rows: (TableRow | (TextEntry | string)[])[];
  };

  /**
   * Option which will arbitrarily append a string immediately below the table, ignoring block-level settings.
   */
  append?: string;
}

/**
 * A table column header.
 */
export type TableColumn = {
  /**
   * The name of the column.
   */
  name: string;

  /**
   * The horizontal alignment of the entire column.
   */
  align?: 'left' | 'center' | 'right';
};

/**
 * A a row of table data.
 */
export type TableRow = {
  /**
   * A cell of table data.
   * Each key in this object represents a column header name, case-sensitively.
   */
  [key: string]: string | TextEntry;
};

/**
 * The renderer for table entries.
 *
 * @param entry The table entry.
 * @param options Document-level render options.
 * @returns Block-level table markdown content.
 */
export const tableRenderer: MarkdownRenderer = (
  entry: TableEntry,
  options: RenderOptions
) => {
  if ('table' in entry) {
    return {
      markdown: getTableMarkdown(entry, options),
      blockLevel: true,
    };
  }

  throw new Error('Entry is not a table entry. Unable to render.');
};

function getTableMarkdown(entry: TableEntry, options: RenderOptions) {
  escapePipes(entry);
  let columnCount = entry.table.columns.length;
  let columnNames = entry.table.columns.reduce<string[]>(
    (prev, curr) => prev.concat(typeof curr === 'string' ? curr : curr.name),
    []
  );

  let minColumnWidth = 3;
  let cellWidths = [];
  for (let i = 0; i < columnCount; i++) {
    let column = entry.table.columns[i];
    let columnName = getColumnName(column);

    let columnCellTexts = [
      getColumnHeaderTextLength(entry.table.columns[i]),
      ...entry.table.rows
        .reduce<string[]>((prev, curr) => {
          let value = Array.isArray(curr) ? curr[i] : curr[columnName];
          if (value !== undefined) {
            let result = renderCellText(value, options);
            if (typeof result === 'string') {
              prev.push(result);
            } else {
              throw new Error(
                'Unknown table rendering scenario encountered. Multi-line table cell content is not supported.'
              );
            }
          }

          return prev;
        }, [])
        .map((columnCellText) => columnCellText.length),
    ];

    cellWidths[i] = columnCellTexts.reduce(
      (prev, curr) => Math.max(minColumnWidth, prev, curr),
      0
    );
  }

  return [
    buildHeaderRow(entry, cellWidths, entry.table.columns),
    buildDividerRow(cellWidths, entry.table.columns),
    ...buildDataRows(entry, cellWidths, columnNames, options),
  ].join('\n');
}

function buildDataRows(
  entry: TableEntry,
  cellWidths: number[],
  columnNames: string[],
  options: RenderOptions
) {
  return entry.table.rows.map((row) => {
    let cells: string[] = [];
    if (Array.isArray(row)) {
      cells = [
        ...row.map((cell, index) =>
          padAlign(
            renderCellText(cell, options),
            cellWidths[index],
            entry.table.columns[index]
          )
        ),
      ];
    } else if (typeof row === 'object') {
      cells = columnNames.reduce<string[]>(
        (prev, curr, index) =>
          prev.concat(
            padAlign(
              renderCellText(row[curr], options) ?? '',
              cellWidths[index],
              entry.table.columns[index]
            )
          ),
        []
      );
    }
    return `| ${cells.join(' | ')} |`;
  });
}

function renderCellText(
  value: string | number | Date | boolean | TextEntry,
  options: RenderOptions
): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'boolean') {
    return value.toString();
  }

  return renderEntries([value], options);
}

function padAlign(
  cellText: string,
  cellWidth: number,
  column: string | TableColumn
): string {
  return typeof column === 'string' || column.align === 'left' || !column.align
    ? cellText.padEnd(cellWidth, ' ')
    : column.align === 'center'
    ? cellText
        .padStart(
          cellText.length + Math.floor(cellWidth - cellText.length) / 2,
          ' '
        )
        .padEnd(cellWidth, ' ')
    : column.align === 'right'
    ? cellText.padStart(cellWidth, ' ')
    : cellText;
}

function buildDividerRow(
  cellWidths: number[],
  columns: (string | TableColumn)[]
) {
  return `|${cellWidths
    .map(
      (cellWidth, index) =>
        getLeftSideAlignmentCharacter(columns[index]) +
        ''.padStart(cellWidth, '-') +
        getRightSideAlignmentCharacter(columns[index])
    )
    .join('|')}|`;
}

function getLeftSideAlignmentCharacter(column: string | TableColumn) {
  if (typeof column === 'string') {
    return ' ';
  }

  return column.align === 'left' || column.align === 'center' ? ':' : ' ';
}

function getRightSideAlignmentCharacter(column: string | TableColumn) {
  if (typeof column === 'string') {
    return ' ';
  }

  return column.align === 'right' || column.align === 'center' ? ':' : ' ';
}

function buildHeaderRow(
  entry: TableEntry,
  cellWidths: number[],
  columns: (string | TableColumn)[]
) {
  return `| ${entry.table.columns
    .map((column, index) =>
      padAlign(getColumnName(column), cellWidths[index], columns[index])
    )
    .join(' | ')} |`;
}

function getColumnName(column: string | TableColumn) {
  return typeof column === 'string' ? column : column.name;
}

function getColumnHeaderTextLength(column: string | TableColumn) {
  return typeof column === 'string' ? column.length : column.name.length;
}

function escapePipes<T>(target: T): T {
  if (typeof target === 'string') {
    return target.replaceAll('|', '&#124;') as unknown as T;
  }

  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      target[i] = escapePipes(target[i]);
    }
  }

  if (typeof target === 'object' && target !== null) {
    let assignable = target as Record<string, any>;
    for (let key of Object.keys(assignable)) {
      assignable[key] = escapePipes(assignable[key]);
    }
  }

  return target;
}

export function table(
  settings: TableEntry['table'],
  options?: Omit<TableEntry, 'table'>
): TableEntry {
  return {
    table: settings,
    ...options,
  };
}
