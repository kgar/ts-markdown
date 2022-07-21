# CoolNameHere

## Description

(make sure to include a link to a github pages documentation site here)

## Getting Started

To use CoolNameHere in your project, run:

```sh
npm install CoolNameHere
# or "yarn add CoolNameHere"
```

## Usage

CoolNameHere is written in TypeScript and follows the latest maintenance LTS of Node.

CoolNameHere resolves around sending an array of "markdown entry" objects to the `renderMarkdown()` function.

### **Example** - generating a simple document:

Given this code:

```ts
import { renderMarkdown } from './CoolNameHere';

renderMarkdown([
  {
    h4: 'Hello, world!',
  },
  {
    blockquote: "Let's generate some markdown!",
  },
  { p: 'Generating markdown from data can be simple. All you need are:' },
  {
    ol: [
      'objects',
      'a function',
      {
        text: ['and a place to run ', { emoji: 'checkered_flag' }],
      },
    ],
  },
]);
```

The following markdown is generated:

```md
#### Hello, world!

> Let's generate some markdown!

Generating markdown from data can be simple. All you need are:

1. objects
2. a function
3. and a place to run :checkered_flag:
```

Rendered to GitHub, it looks like this:

#### Hello, world!

> Let's generate some markdown!

Generating markdown from data can be simple. All you need are:

1. objects
2. a function
3. and a place to run :checkered_flag:

## Options

TODO

## Extending CoolNameHere

You can add your own custom markdown renderers into the mix. Here's an example in TypeScript of adding an [Obsidian.md](https://obsidian.md/) [callout](https://help.obsidian.md/How+to/Use+callouts) renderer, which is truly the fanciest of blockquotes:

```ts
import { getBlockLevelEntries, getRenderers } from './defaults';
import { BlockquoteEntry } from './renderers/blockquote';
import { renderEntries, renderMarkdown } from './rendering';
import { MarkdownRenderer, CoolNameHereOptions } from './rendering.types';
import { CoolNameHereEntry } from './shared.types';

// Declare a type for your entry.
type ObsidianCalloutEntry = {
  callout: {
    type: string;
    title?: string;
    content: CoolNameHereEntry | CoolNameHereEntry[];
  };
};

// Create a MarkdownRenderer.
const calloutRenderer: MarkdownRenderer = (
  entry: ObsidianCalloutEntry,
  options: CoolNameHereOptions
) => {
  let titleText = entry.callout.title ? ` ${entry.callout.title}` : '';

  let content = Array.isArray(entry.callout.content)
    ? entry.callout.content
    : [entry.callout.content];

  const blockquote: BlockquoteEntry = {
    blockquote: [{ p: `[!${entry.callout.type}]${titleText}` }, ...content],
  };

  return renderEntries([blockquote], options);
};

// Using your custom callout
const callout: ObsidianCalloutEntry = {
  callout: {
    type: 'tip',
    title: 'Welcome, Friends',
    content: [
      {
        h2: 'Content Creation',
      },
      {
        p: 'Obsidian allows you to create content quickly and easily, while rendering a view of your content that is satisfying to behold.',
      },
    ],
  },
};

// CoolNameHere options are optional 😉
const options = {
  // Get the default renderers and pass in your own custom renderers
  // with a key that matches the uniquely identifying property
  // of your custom markdown entry.
  renderers: getRenderers({ callout: calloutRenderer }),

  // If your entry is block-level (it needs two newlines above and below it)
  // include it in the list of block level entries,
  // and `renderMarkdown()` will do the rest.
  blockLevelEntries: getBlockLevelEntries(['callout']),
};

renderMarkdown([callout], options);
```

This will render the following markdown:

```md
> [!tip] Welcome, Friends
>
> ## Content Creation
>
> Obsidian allows you to create content quickly and easily, while rendering a view of your content that is satisfying to behold.
```

How the callout is rendered in Obsidian:

![](https://github.com/kgar/data-driven-markdown/blob/main/images/obsidian-callout-example.jpg)

> **Note**: We reused existing renderers! :exploding_head:
>
> In the above example, we were able to use the existing blockquote markdown renderer and add some extra functionality to it.
>
> We gave it a new name and its own uniquely identifying property ("callout"), so it didn't override the existing blockquote renderer, so we're able to use both.

## Why This Project?

TODO

## Contribution Guidelines

Have an idea? Found a bug? See [how to contribute](https://github.com/kgar/data-driven-markdown/blob/main/CONTRIBUTING).

## License

[MIT](https://github.com/kgar/data-driven-markdown/blob/main/LICENSE) © [KGar](https://github.com/kgar)
