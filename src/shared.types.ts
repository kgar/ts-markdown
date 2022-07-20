/**
 * A marker interface that designates a type as eligible to pass through markdown rendering.
 */
export interface DataDrivenMarkdownEntry {}

export interface RichTextEntry extends InlineTypes {}

export interface InlineTypes {}

export type ListItemEntry = {
  li: DataDrivenMarkdownEntry | DataDrivenMarkdownEntry[];
};
