type DataDrivenMarkdownEntry =
  | H1Entry
  | H2Entry
  | H3Entry
  | H4Entry
  | H5Entry
  | H6Entry
  | BoldEntry
  | ItalicEntry
  | StrikethroughEntry
  | HighlightEntry
  | TextEntry
  | BlockquoteEntry
  | OrderedListEntry
  | UnorderedListEntry
  | HorizontalRuleEntry
  | CodeEntry
  | LinkEntry
  | ParagraphEntry
  | ImageEntry
  | TableEntry
  | string;

type H1Entry = {
  h1: string;
};

type H2Entry = {
  h2: string;
};

type H3Entry = {
  h3: string;
};

type H4Entry = {
  h4: string;
};

type H5Entry = {
  h5: string;
};

type H6Entry = {
  h6: string;
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
  | CodeEntry
  | string;

type TextEntry = {
  text: string | RichTextEntry[];
};

type BlockquoteEntry = {
  blockquote: string;
};

type OrderedListEntry = {
  ol: string[];
};

type UnorderedListEntry = {
  ul: string[];
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
  p: string | RichTextEntry[];
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
