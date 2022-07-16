type DataDrivenMarkdownEntry =
  | BlockquoteEntry
  | CodeEntry
  | H1Entry
  | H2Entry
  | H3Entry
  | H4Entry
  | H5Entry
  | H6Entry
  | HorizontalRuleEntry
  | ImageEntry
  | LinkEntry
  | OrderedListEntry
  | ParagraphEntry
  | RichTextEntry
  | TableEntry
  | TaskListEntry
  | TextEntry
  | UnorderedListEntry
  | CodeBlockEntry
  | FootnoteEntry
  | DescriptionListEntry;

type H1Entry = {
  h1: InlineTypes;
  underline?: boolean;
} & Partial<Identifiable>;

type H2Entry = {
  h2: InlineTypes;
  underline?: boolean;
} & Partial<Identifiable>;

type H3Entry = {
  h3: InlineTypes;
} & Partial<Identifiable>;

type H4Entry = {
  h4: InlineTypes;
} & Partial<Identifiable>;

type H5Entry = {
  h5: InlineTypes;
} & Partial<Identifiable>;

type H6Entry = {
  h6: InlineTypes;
} & Partial<Identifiable>;

type Identifiable = {
  id: string;
};

type BoldEntry = {
  bold: RichTextEntry;
};

type ItalicEntry = {
  italic: RichTextEntry;
};

type StrikethroughEntry = {
  strikethrough: RichTextEntry;
};

type HighlightEntry = {
  highlight: RichTextEntry;
};

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
};

type InlineTypes = RichTextEntry | TextEntry;

type OrderedListEntry = {
  ol: ListItemEntry[];
};

type UnorderedListEntry = {
  ul: ListItemEntry[];
  indicator?: UnorderedListItemIndicator;
};

type UnorderedListItemIndicator = '-' | '*' | '+';

type ListItemEntry = {
  li: DataDrivenMarkdownEntry | DataDrivenMarkdownEntry[];
};

type HorizontalRuleEntry = {
  hr: '' | null | undefined | true;
};

type CodeEntry = {
  code: string;
};

type LinkEntry = {
  link: { source: string; text?: string; title?: string };
};

type ParagraphEntry = {
  p: InlineTypes;
};

type ImageEntry = {
  img: {
    href: string;
    alt?: string;
    title?: string;
  };
};

type TableEntry = {
  table: {
    columns: (TableColumn | string)[];
    rows: (TableRow | (TextEntry | string)[])[];
  };
};

type TableColumn = {
  name: string;
  align?: 'left' | 'center' | 'right';
};

type TableRow = {
  [key: string]: string | TextEntry;
};

type TaskListEntry = {
  tasks: (InlineTypes | TaskEntry)[];
};

type TaskEntry = {
  task: InlineTypes;
  completed?: boolean;
};

type EmojiEntry = {
  emoji: string;
};

type SuperscriptEntry = {
  sup: RichTextEntry;
  html?: boolean;
};

type SubscriptEntry = {
  sub: RichTextEntry;
  html?: boolean;
};

type CodeBlockEntry = {
  codeblock: string | string[];
  fenced?: boolean | '`' | '~';
  language?: string;
};

type FootnoteEntry = {
  footnote: {
    id: string;
    content: DataDrivenMarkdownEntry | DataDrivenMarkdownEntry[];
  };
};

type DescriptionListEntry = {
  dl: (DescriptionTerm | DescriptionDetails)[];
  html?: boolean;
};

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
};

type MarkdownRenderer = (
  entry: DataDrivenMarkdownEntry,
  options: DataDrivenMarkdownOptions
) => string | string[];
