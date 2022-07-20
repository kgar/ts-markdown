import { getMarkdownString, renderEntries } from '../rendering';
import { DataDrivenMarkdownOptions } from '../rendering.types';
import { DataDrivenMarkdownEntry } from '../shared.types';
import { TextEntry } from './text';

export type TableEntry = {
  table: {
    columns: (TableColumn | string)[];
    rows: (TableRow | (TextEntry | string)[])[];
  };
  append?: string;
} & DataDrivenMarkdownEntry;

export type TableColumn = {
  name: string;
  align?: 'left' | 'center' | 'right';
};

export type TableRow = {
  [key: string]: string | TextEntry;
};

export const tableRenderer = (
  entry: TableEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('table' in entry) {
    escapePipes(entry);
    let columnCount = entry.table.columns.length;
    let columnNames = entry.table.columns.reduce(
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
            let value = 'length' in curr ? curr[i] : curr[columnName];
            if (value !== undefined) {
              let result = getMarkdownString(value, options);
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

  throw new Error('Entry is not a table entry. Unable to render.');
};

function buildDataRows(
  entry: TableEntry,
  cellWidths: number[],
  columnNames: string[],
  options: DataDrivenMarkdownOptions
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
      cells = columnNames.reduce(
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
  value: string | TextEntry,
  options: DataDrivenMarkdownOptions
): string {
  if (typeof value === 'string') {
    return value;
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

  if (typeof target === 'object') {
    for (let key of Object.keys(target)) {
      target[key] = escapePipes(target[key]);
    }
  }

  return target;
}
