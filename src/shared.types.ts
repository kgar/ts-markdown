/**
 * A marker interface that designates a type as eligible to pass through markdown rendering.
 */
export interface MarkdownEntry {}

/**
 * A marker interface that represents inline text that has been manipulated visually to provide more expressive text.
 */
export interface RichTextEntry extends InlineTypes {}

/**
 * A marker interface that represents any text that can be rendered together on a single line.
 */
export interface InlineTypes {}

/**
 * Valid list item content, to be used in an ordered or unordered list.
 */
export type ListItemEntry = MarkdownEntry | MarkdownEntry[];

/**
 * The JavaScript primitives which are supported in **ts-markdown**.
 */
export type SupportedPrimitive =
  | string
  | null
  | undefined
  | Date
  | number
  | bigint;
