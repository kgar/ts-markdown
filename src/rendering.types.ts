import { UnorderedListItemIndicator } from "./renderers/ul";
import { DataDrivenMarkdownEntry } from "./shared.types";

export type ContextualMarkdownRenderPrefix = (
  index: number,
  entry?: DataDrivenMarkdownEntry
) => string;

export type MarkdownRenderPrefix = string | ContextualMarkdownRenderPrefix;

export type DataDrivenMarkdownOptions = {
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
  renderers?: Map<string, MarkdownRenderer>;

  /**
   * These entries are specified as needing 2 newlines above and below, to separate them from other entries.
   */
  blockLevelEntries?: Set<string>;
  applyCompletedDocumentChangesPreFootnotes?: (
    data: DataDrivenMarkdownEntry[],
    document: string,
    options: DataDrivenMarkdownOptions
  ) => string;
  applyCompletedDocumentChangesPostFootnotes?: (
    data: DataDrivenMarkdownEntry[],
    document: string,
    options: DataDrivenMarkdownOptions
  ) => string;
  useCodeblockFencing?: boolean | '`' | '~';
  boldIndicator?: '*' | '_';
  italicIndicator?: '*' | '_';
};

export type MarkdownRenderer = (
  entry: DataDrivenMarkdownEntry,
  options: DataDrivenMarkdownOptions
) => string | string[];
