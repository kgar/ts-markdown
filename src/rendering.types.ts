import { UnorderedListItemIndicator } from './renderers/ul';
import { MarkdownEntry, SupportedPrimitive } from './shared.types';

export type MarkdownEntryOrPrimitive = MarkdownEntry | SupportedPrimitive;

/**
 * A function providing prefix text to the markdown rendering code.
 * Provides some context for where in an array of items it is, as well as which markdown entry is it working with.
 * Often used when differentiating between parent and nested child content, such as with adding block elements to a list item.
 */
export interface RenderPrefixFunction {
  (index: number, entry?: MarkdownEntryOrPrimitive): string;
}

/**
 * A prefix to use when rendering a line of markdown.
 * Allows for recursive, nested markdown rendering.
 */
export type MarkdownRenderPrefix = string | RenderPrefixFunction;

/**
 * A key/value object map of renderers where
 * - key: an identifying property name to look for when processing markdown entries.
 * - value: a renderer to use when encountering a markdown entries that has a key matching this value's key.
 */
export interface Renderers {
  [key: string]: MarkdownRenderer;
}

/**
 * Document-level options which can affect broad aspects of the rendering process.
 * Whenever these options have entry-level equivalent options, the entry-level options take precedence.
 */
export interface RenderOptions {
  /**
   * An indicator specifying which character to use when denoting an unordered list item.
   * Default: '-'
   */
  unorderedListItemIndicator?: UnorderedListItemIndicator;

  /**
   * Option which will use '=' underlining for denoting an h1 rather than a '#' prefix.
   */
  useH1Underlining?: boolean;

  /**
   * Option which will use '-' underlining for denoting an h2 rather than a '##' prefix.
   */
  useH2Underlining?: boolean;

  /**
   * Option to render subscript indicators as HTML.
   * Default: false
   */
  useSubscriptHtml?: boolean;

  /**
   * Option to render superscript indicators as HTML.
   * Default: false
   */
  useSuperscriptHtml?: boolean;

  /**
   * Option to render description lists as HTML.
   * Default: false
   */
  useDescriptionListHtml?: boolean;

  /**
   * An arbitrary prefix which will be prepended to every line of text generated within the context of these options.
   * Typically used by the main markdown generator when recursively rendering lines of markdown.
   */
  prefix?: MarkdownRenderPrefix;

  /**
   * The renderers which will be used when processing markdown entries.
   */
  renderers?: Renderers;

  /**
   * A hook for injecting or manipulating document content before footnotes are added to the end of the document.
   * Expects the caller to return the document with any changes applied to it.
   */
  onDocumentFootnoteAppending?: (
    /**
     * The originally-submitted markdown entries.
     */
    data: MarkdownEntryOrPrimitive[],

    /**
     * The document after initial rendering but before footnotes are applied.
     */
    document: string,

    /**
     * The originally-submitted document-level options.
     */
    options: RenderOptions
  ) => string;

  /**
   * A hook for injecting or manipulating document content after footnotes are added to the end of the document.
   * Expects the caller to return the document with any changes applied to it.
   */
  onDocumentFootnoteAppended?: (
    /**
     * The originally-submitted markdown entries.
     */
    data: MarkdownEntryOrPrimitive[],

    /**
     * The document after initial rendering and after footnotes are applied.
     */
    document: string,

    /**
     * The originally-submitted document-level options.
     */
    options: RenderOptions
  ) => string;

  /**
   * Indicates whether or not to use codeblock fencing rather than standard indentation for codeblocks.
   * Supplying `true` tells the renderer to always use code fencing with the default character.
   * Otherwise, supplying a character tells the renderer to always use code fencing with the specified character.
   * Omitting this options results in indented codeblocks.
   */
  useCodeblockFencing?: boolean | '`' | '~';

  /**
   * The character which will be used to signify bolded text.
   */
  boldIndicator?: '*' | '_';

  /**
   * Indicator determining what character is used to denote italics.
   */
  italicIndicator?: '*' | '_';
}

// TODO: Figure out how to require that `entry` extend `MarkdownEntry` and be containable in the `Renderers` type.
/**
 * A function which can take an entry and render markdown.
 * This function is designed to receive a markdown entry that it is able to render, provided the collection of renderers has the correct key associated with this renderer.
 */
export interface MarkdownRenderer {
  (entry: any, options: RenderOptions): MarkdownRenderResult;
}

/**
 * The result of rendering a markdown entry.
 * Can be a string or a more specific set of markdown content which requires metadata, such as being block-level.
 * The additional metadata tells the markdown generator how to handle assembling this markdown in relation to other entries.
 */
export type MarkdownRenderResult =
  | string
  | { markdown: string; blockLevel: true };
