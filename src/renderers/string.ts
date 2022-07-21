import { MarkdownRenderer } from '../rendering.types';
import { RichTextEntry } from '../shared.types';

export interface String extends RichTextEntry {}

export const stringRenderer: MarkdownRenderer = (entry: string) => entry;
