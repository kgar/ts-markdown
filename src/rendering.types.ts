import { UnorderedListItemIndicator } from './renderers/ul';
import { MarkdownEntry } from './shared.types';

export type RenderPrefixFunction = (
  index: number,
  entry?: MarkdownEntry
) => string;

export type MarkdownRenderPrefix = string | RenderPrefixFunction;

export type Renderers = { [key: string]: MarkdownRenderer };

export type RenderOptions = {
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

  /**
   * These entries are specified as needing 2 newlines above and below, to separate them from other entries.
   */
  blockLevelEntries?: Set<string>;
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
};

// TODO: Figure out how to require that `entry` extend `MarkdownEntry` and be containable in the `Renderers` type.
export type MarkdownRenderer = (entry: any, options: RenderOptions) => string;
