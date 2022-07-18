import { CODE } from "../constants";

export const codeRenderer = (
  entry: CodeEntry
) => {
  if ('code' in entry) {
    let indicatorTally = 0;
    entry.code.split('').reduce((prev, curr) => {
      let tally = curr === CODE.INDICATOR ? prev + 1 : 0;
      indicatorTally = Math.max(indicatorTally, tally);
      return tally;
    }, 0);

    let codeStartPadding = entry.code.startsWith(CODE.INDICATOR) ? ' ' : '';
    let codeEndPadding = entry.code.endsWith(CODE.INDICATOR) ? ' ' : '';

    let formattedCodeIndicator = ''.padEnd(indicatorTally + 1, CODE.INDICATOR);
    return `${formattedCodeIndicator}${codeStartPadding}${entry.code}${codeEndPadding}${formattedCodeIndicator}`;
  }

  throw new Error('Entry is not a code entry. Unable to render.');
};