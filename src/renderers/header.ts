import { H1Entry } from './h1';
import { H2Entry } from './h2';
import { H3Entry } from './h3';
import { H4Entry } from './h4';
import { H5Entry } from './h5';
import { H6Entry } from './h6';

/**
 * Appends a heading with an ID.
 *
 * @param id The ID. Can also be null or undefined.
 * @param prefix Any prefix text that should be prepended to the resulting ID markdown.
 * @returns A header with ID markdown appended, or an empty string.
 */
export function getOptionalHeaderIdText(id?: string, prefix: string = '') {
  return id !== undefined ? `${prefix}{#${id}}` : '';
}

/**
 * Helper which creates a header entry at the specified level.
 * Designed to help with more programmatic, dynamic header generation.
 *
 * @param options Entry-level options for this element.
 * @returns a header entry
 */
export function header(
  level: number,
  content:
    | H1Entry['h1']
    | H2Entry['h2']
    | H3Entry['h3']
    | H4Entry['h4']
    | H5Entry['h5']
    | H6Entry['h6'],
  options?:
    | Omit<H1Entry['h1'], 'h1'>
    | Omit<H2Entry['h2'], 'h2'>
    | Omit<H3Entry['h3'], 'h3'>
    | Omit<H4Entry['h4'], 'h4'>
    | Omit<H5Entry['h5'], 'h5'>
    | Omit<H6Entry['h6'], 'h6'>
): H1Entry | H2Entry | H3Entry | H4Entry | H5Entry | H6Entry {
  switch (level) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return {
        ['h' + level]: content,
        ...options,
      } as H1Entry | H2Entry | H3Entry | H4Entry | H5Entry | H6Entry;
    default:
      throw new Error(`Header level ${level} is not supported.`);
  }
}
