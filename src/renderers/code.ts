import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating a code segment.
 */
export interface CodeEntry extends MarkdownEntry {
  /**
   * The code text.
   */
  code: string;
}

/**
 * The renderer for code entries.
 * @param entry The code entry.
 * @param options Document-level render options.
 * @returns Code markdown content.
 */
export const codeRenderer: MarkdownRenderer = (
  entry: CodeEntry,
  options: RenderOptions
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
