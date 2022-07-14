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
  | CodeBlockEntry;

type H1Entry = {
  h1: string;
} & Partial<Identifiable>;

type H2Entry = {
  h2: string;
} & Partial<Identifiable>;

type H3Entry = {
  h3: string;
} & Partial<Identifiable>;

type H4Entry = {
  h4: string;
} & Partial<Identifiable>;

type H5Entry = {
  h5: string;
} & Partial<Identifiable>;

type H6Entry = {
  h6: string;
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
  | string;

type TextEntry = {
  text: string | (RichTextEntry | LinkEntry | ImageEntry | CodeEntry)[];
};

type BlockquoteEntry = {
  blockquote: string | DataDrivenMarkdownEntry[];
};

type OrderedListEntry = {
  ol: string[];
};

type UnorderedListEntry = {
  ul: (string | TextEntry)[];
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
  p: string | (RichTextEntry | TextEntry)[];
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
  tasks: (RichTextEntry | TaskEntry)[];
};

type TaskEntry = {
  task: RichTextEntry;
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
