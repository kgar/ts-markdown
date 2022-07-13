export function renderMarkdown(data: DataDrivenMarkdownEntry[]) {
  return data.map(getMarkdownString).join('');
}

function getMarkdownString(entry: DataDrivenMarkdownEntry | string): string {
  if (entry === null || entry === undefined) {
    return '';
  }

  if (typeof entry === 'string') {
    return entry;
  }

  if ('h1' in entry) {
    return `# ${getMarkdownString(entry.h1)}`;
  }

  if ('h2' in entry) {
    return `## ${getMarkdownString(entry.h2)}`;
  }

  if ('h3' in entry) {
    return `### ${getMarkdownString(entry.h3)}`;
  }

  if ('h4' in entry) {
    return `#### ${getMarkdownString(entry.h4)}`;
  }

  if ('h5' in entry) {
    return `##### ${getMarkdownString(entry.h5)}`;
  }

  if ('h6' in entry) {
    return `###### ${getMarkdownString(entry.h6)}`;
  }

  if ('bold' in entry) {
    return `**${getMarkdownString(entry.bold)}**`;
  }

  if ('italic' in entry) {
    return `*${getMarkdownString(entry.italic)}*`;
  }

  if ('highlight' in entry) {
    return `==${getMarkdownString(entry.highlight)}==`;
  }

  if ('strikethrough' in entry) {
    return `~~${getMarkdownString(entry.strikethrough)}~~`;
  }

  if ('text' in entry) {
    if (typeof entry.text === 'string') {
      return entry.text;
    }

    return entry.text.map(getMarkdownString).join('');
  }

  if ('blockquote' in entry) {
    return `> ${getMarkdownString(entry.blockquote)}`;
  }

  if ('ol' in entry) {
    return `1. ${entry.ol}`;
  }

  if ('ul' in entry) {
    return `- ${entry.ul}`;
  }

  if ('hr' in entry) {
    return '---';
  }

  if ('code' in entry) {
    return `\`${entry.code}\``;
  }

  if ('link' in entry) {
    const formattedLink = entry.link.source.replace(/\s/g, '%20');

    if (!entry.link.text) {
      return formattedLink;
    }

    const titleSegment =
      entry.link.title !== undefined ? ` "${entry.link.title}"` : '';

    return `[${entry.link.text}](${formattedLink}${titleSegment})`;
  }

  if ('p' in entry) {
    if (typeof entry.p === 'string') {
      return getMarkdownString(formatParagraphText(entry.p));
    }

    return formatParagraphText(entry.p.map(getMarkdownString).join(''));
  }

  if ('img' in entry) {
    const formattedLink = entry.img.href.replace(/\s/g, '%20');

    const titleSegment =
      entry.img.title !== undefined ? ` "${entry.img.title}"` : '';

    return `![${entry.img.alt ?? ''}](${formattedLink}${titleSegment})`;
  }

  // TODO: Extract to own module. It's getting unruly in here.
  if ('table' in entry) {
    escapePipes(entry);
    let columnCount = entry.table.columns.length;
    let columnNames = entry.table.columns.reduce(
      (prev, curr) => prev.concat(typeof curr === 'string' ? curr : curr.name),
      []
    );

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
              prev.push(getMarkdownString(value));
            }

            return prev;
          }, [])
          .map((x) => x.length),
      ];

      cellWidths[i] = columnCellTexts.reduce(
        (prev, curr) => Math.max(prev, curr),
        0
      );
    }

    return [
      buildHeaderRow(entry, cellWidths, entry.table.columns),
      buildDividerRow(cellWidths, entry.table.columns),
      ...buildDataRows(entry, cellWidths, columnNames),
    ].join('\n');
  }

  return null;
}

function buildDataRows(
  entry: TableEntry,
  cellWidths: number[],
  columnNames: string[]
) {
  return entry.table.rows.map((row) => {
    let cells: string[] = [];
    if (Array.isArray(row)) {
      cells = [
        ...row.map((x, index) =>
          padAlign(
            renderCellText(x),
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
              renderCellText(row[curr]) ?? '',
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

function renderCellText(value: string | TextEntry): string {
  if (typeof value === 'string') {
    return value;
  }

  return renderMarkdown([value]);
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
      (x, index) =>
        getLeftSideAlignmentCharacter(columns[index]) +
        ''.padStart(x, '-') +
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
    .map((x, index) =>
      padAlign(getColumnName(x), cellWidths[index], columns[index])
    )
    .join(' | ')} |`;
}

function getColumnName(column: string | TableColumn) {
  return typeof column === 'string' ? column : column.name;
}

function formatParagraphText(text: string) {
  return text
    ?.trimStart()
    .replace(/(^.*?)[\t]+/g, '')
    .trimStart();
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
