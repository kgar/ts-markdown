import { MarkdownRenderer } from '../rendering.types';
import { RichTextEntry } from '../shared.types';

// TODO: Remove this interface and see if stuff still works
/**
 * A markdown entry for generating a plain string.
 * This is the most fundamental entry type.
 */
export interface String extends RichTextEntry {}

/**
 * The renderer for string entries.
 *
 * @param entry A string of text.
 * @returns String content.
 */
export const stringRenderer: MarkdownRenderer = (entry: string) => entry;

/**
 * The renderer for null entries.
 *
 * @param entry null
 * @returns an empty string
 */
export const nullRenderer: MarkdownRenderer = (entry: null) => '';

/**
 * The renderer for undefined entries.
 *
 * @param entry undefined
 * @returns an empty string
 */
export const undefinedRenderer: MarkdownRenderer = (entry: undefined) => '';

/**
 * The renderer for boolean entries.
 *
 * @param entry a boolean
 * @returns the boolean as a string
 */
export const booleanRenderer: MarkdownRenderer = (entry: boolean) =>
  entry.toString();

/**
 * The renderer for number entries.
 *
 * @param entry a number
 * @returns the number as a string
 */
export const numberRenderer: MarkdownRenderer = (entry: number) =>
  entry.toString();

/**
 * The renderer for bigint entries.
 *
 * @param entry a bigint
 * @returns the bigint as a string
 */
export const bigintRenderer: MarkdownRenderer = (entry: bigint) =>
  entry.toString();

/**
 * The renderer for date entries.
 *
 * @param entry a date
 * @returns the date as an ISO string.
 */
export const dateRenderer: MarkdownRenderer = (entry: Date) =>
  entry.toISOString();
