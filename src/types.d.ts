type DataDrivenMarkdownEntry =
  | H1Entry
  | H2Entry
  | H3Entry
  | H4Entry
  | H5Entry
  | H6Entry
  | BoldEntry
  | ItalicEntry
  | TextEntry
  | BlockquoteEntry
  | OrderedListEntry
  | UnorderedListEntry;

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
  bold: string;
};

type ItalicEntry = {
  italic: string;
};

type RichTextEntry = ItalicEntry | BoldEntry;

type TextEntry = {
  text: string | (RichTextEntry | string)[];
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
