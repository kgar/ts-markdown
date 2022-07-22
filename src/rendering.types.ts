import { UnorderedListItemIndicator } from './renderers/ul';
import { MarkdownEntry } from './shared.types';

export interface RenderPrefixFunction {
  (index: number, entry?: MarkdownEntry): string;
}

export type MarkdownRenderPrefix = string | RenderPrefixFunction;

export interface Renderers {
  [key: string]: MarkdownRenderer;
}

export interface RenderOptions {
  unorderedListItemIndicator?: UnorderedListItemIndicator;
  useH1Underlining?: boolean;
  useH2Underlining?: boolean;
  useSubscriptHtml?: boolean;
  useSuperscriptHtml?: boolean;
  useDescriptionListHtml?: boolean;
  prefix?: MarkdownRenderPrefix;

  /**
   * The renderers which will be used when processing markdown entries.
   */
  renderers?: Renderers;

  applyCompletedDocumentChangesPreFootnotes?: (
    data: MarkdownEntry[],
    document: string,
    options: RenderOptions
  ) => string;
  applyCompletedDocumentChangesPostFootnotes?: (
    data: MarkdownEntry[],
    document: string,
    options: RenderOptions
  ) => string;
  useCodeblockFencing?: boolean | '`' | '~';
  boldIndicator?: '*' | '_';
  italicIndicator?: '*' | '_';
}

// TODO: Figure out how to require that `entry` extend `MarkdownEntry` and be containable in the `Renderers` type.
export interface MarkdownRenderer {
  (entry: any, options: RenderOptions): MarkdownRenderResult;
}

export type MarkdownRenderResult =
  | string
  | { markdown: string; blockLevel: true };
