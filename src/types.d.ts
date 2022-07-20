/**
 * A marker interface that designates a type as eligible to pass through markdown rendering.
 */
interface DataDrivenMarkdownEntry {}

type H1Entry = {
  h1: InlineTypes;
  underline?: boolean;
} & Partial<Identifiable> &
  Appendable &
  DataDrivenMarkdownEntry;

type H2Entry = {
  h2: InlineTypes;
  underline?: boolean;
} & Partial<Identifiable> &
  Appendable &
  DataDrivenMarkdownEntry;

type H3Entry = {
  h3: InlineTypes;
} & Partial<Identifiable> &
  Appendable &
  DataDrivenMarkdownEntry;

type H4Entry = {
  h4: InlineTypes;
} & Partial<Identifiable> &
  Appendable &
  DataDrivenMarkdownEntry;

type H5Entry = {
  h5: InlineTypes;
} & Partial<Identifiable> &
  Appendable &
  DataDrivenMarkdownEntry;

type H6Entry = {
  h6: InlineTypes;
} & Partial<Identifiable> &
  Appendable &
  DataDrivenMarkdownEntry;

type Identifiable = {
  id: string;
};

type BoldEntry = {
  bold: RichTextEntry;
  indicator?: '*' | '_';
} & DataDrivenMarkdownEntry;

type ItalicEntry = {
  italic: RichTextEntry;
  indicator?: '*' | '_';
} & DataDrivenMarkdownEntry;

type StrikethroughEntry = {
  strikethrough: RichTextEntry;
} & DataDrivenMarkdownEntry;

type HighlightEntry = {
  highlight: RichTextEntry;
} & DataDrivenMarkdownEntry;

type RichTextEntry =
  | ItalicEntry
  | BoldEntry
  | StrikethroughEntry
  | HighlightEntry
  | SuperscriptEntry
  | SubscriptEntry
  | EmojiEntry
  | FootnoteEntry
  | string;

type TextEntry = {
  text: string | (RichTextEntry | LinkEntry | ImageEntry | CodeEntry)[];
};

type BlockquoteEntry = {
  blockquote: string | DataDrivenMarkdownEntry[];
} & Appendable &
  DataDrivenMarkdownEntry;

type Appendable = {
  append?: string;
};

type InlineTypes = RichTextEntry | TextEntry;

type OrderedListEntry = {
  ol: ListItemEntry[];
} & Appendable &
  DataDrivenMarkdownEntry;

type UnorderedListEntry = {
  ul: ListItemEntry[];
  indicator?: UnorderedListItemIndicator;
} & Appendable &
  DataDrivenMarkdownEntry;

type UnorderedListItemIndicator = '-' | '*' | '+';

type ListItemEntry = {
  li: DataDrivenMarkdownEntry | DataDrivenMarkdownEntry[];
};

type HorizontalRuleEntry = {
  hr: '' | null | undefined | true;
} & Appendable &
  DataDrivenMarkdownEntry;

type CodeEntry = {
  code: string;
} & DataDrivenMarkdownEntry;

type LinkEntry = {
  link: { source: string; text?: string; title?: string };
} & DataDrivenMarkdownEntry;

type ParagraphEntry = {
  p: InlineTypes;
} & Appendable &
  DataDrivenMarkdownEntry;

type ImageEntry = {
  img: {
    href: string;
    alt?: string;
    title?: string;
  };
} & DataDrivenMarkdownEntry;

type TableEntry = {
  table: {
    columns: (TableColumn | string)[];
    rows: (TableRow | (TextEntry | string)[])[];
  };
} & Appendable &
  DataDrivenMarkdownEntry;

type TableColumn = {
  name: string;
  align?: 'left' | 'center' | 'right';
};

type TableRow = {
  [key: string]: string | TextEntry;
};

type TaskListEntry = {
  tasks: (InlineTypes | TaskEntry)[];
} & Appendable &
  DataDrivenMarkdownEntry;

type TaskEntry = {
  task: InlineTypes;
  completed?: boolean;
};

type EmojiEntry = {
  emoji: string;
} & DataDrivenMarkdownEntry;

type CanFallbackToHtml = {
  html?: boolean;
};

type SuperscriptEntry = {
  sup: RichTextEntry;
} & CanFallbackToHtml &
  DataDrivenMarkdownEntry;

type SubscriptEntry = {
  sub: RichTextEntry;
} & CanFallbackToHtml &
  DataDrivenMarkdownEntry;

type CodeBlockEntry = {
  codeblock: string | string[];
  fenced?: boolean | '`' | '~';
  language?: string;
} & Appendable &
  DataDrivenMarkdownEntry;

type FootnoteEntry = {
  footnote: {
    id: string;
    content: DataDrivenMarkdownEntry | DataDrivenMarkdownEntry[];
  };
} & DataDrivenMarkdownEntry;

type DescriptionListEntry = {
  dl: (DescriptionTerm | DescriptionDetails)[];
  html?: boolean;
} & Appendable &
  DataDrivenMarkdownEntry;

type DescriptionTerm = {
  dt: InlineTypes;
};

type DescriptionDetails = {
  dd: InlineTypes;
};

type ContextualMarkdownRenderPrefix = (
  index: number,
  entry?: DataDrivenMarkdownEntry
) => string;

type MarkdownRenderPrefix = string | ContextualMarkdownRenderPrefix;

type DataDrivenMarkdownOptions = {
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
};

type MarkdownRenderer = (
  entry: DataDrivenMarkdownEntry,
  options: DataDrivenMarkdownOptions
) => string | string[];
