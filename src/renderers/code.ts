export const codeRenderer = (
  entry: CodeEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('code' in entry) {
    let backtickTally = 0;
    entry.code.split('').reduce((prev, curr) => {
      let tally = curr === '`' ? prev + 1 : 0;
      backtickTally = Math.max(backtickTally, tally);
      return tally;
    }, 0);

    let codeStartPadding = entry.code.startsWith('`') ? ' ' : '';
    let codeEndPadding = entry.code.endsWith('`') ? ' ' : '';

    let codeIndicator = ''.padEnd(backtickTally + 1, '`');
    return `${codeIndicator}${codeStartPadding}${entry.code}${codeEndPadding}${codeIndicator}`;
  }

  throw new Error('Entry is not a code entry. Unable to render.');
};