import { MarkdownRenderer } from '../rendering.types';
import { RichTextEntry } from '../shared.types';

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
