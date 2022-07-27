- [Introduction](#introduction)
- [A Simple Extension](#a-simple-extension)
- [More Involved Extension Example](#more-involved-extension-example)
- [Overriding an Existing Renderer](#overriding-an-existing-renderer)
- [Remarks on Extensibility](#remarks-on-extensibility)

## Introduction

You can add your own custom markdown renderers and override existing renderers.

This is useful for those who are generating markdown for a specific type of markdown engine, such as [Obsidian.md](https://www.obsidian.md).

If you would like an example of how to extend **ts-markdown** that is not covered here, feel free to [open a new github issue](https://github.com/kgar/ts-markdown/issues/new) requesting the type of extensibility example you'd like to see.

[Back to Top](#)

<br />

## A Simple Extension

Let's make an extension which wraps around some text like `OHAI ${textHere}!`.

First, let's make a custom render extension using a super-compact approach:

```ts
import { getRenderers } from './defaults';
import { tsMarkdown } from './rendering';

let entry = {
  sayHelloTo: 'friend',
};

tsMarkdown([entry], {
  renderers: getRenderers({
    sayHelloTo: (entry: { sayHelloTo: string }) => {
      return `OHAI ${entry.sayHelloTo}!`;
    },
  }),
});
```

We get:

```
OHAI friend!
```

Here's a longer form where we declare types and assign more variables along the way:

```ts
import { getRenderers } from './defaults';
import { tsMarkdown } from './rendering';
import { MarkdownRenderer } from './rendering.types';

type SayHelloToEntry = {
  sayHelloTo: string;
};

const sayHelloToRenderer: MarkdownRenderer = (
  entry: SayHelloToEntry,
  options
) => {
  return `OHAI ${entry.sayHelloTo}!`;
};

const myCustomRenderers = { sayHelloTo: sayHelloToRenderer };

const renderers = getRenderers(myCustomRenderers);

let entry: SayHelloToEntry = {
  sayHelloTo: 'friend',
};

tsMarkdown([entry], { renderers });
```

Let's break down the longer form:

```ts
import { getRenderers } from './defaults';
import { tsMarkdown } from './rendering';
import { MarkdownRenderer } from './rendering.types';

// ✅ Declare a type for your entry.
// The naming convention is to suffix your element name with "Entry", so:
type SayHelloToEntry = {
  sayHelloTo: string;
  // 👆 This is the identifying property.
  // All markdown entries have it.
  // Unordered lists are identified with `ul`:
  // { ul: myListItems }
  //   👆
  // When looking for a renderer, we will try to find it based on properties on the entry object 🤞
};

// ✅ Make a renderer of type `MarkdownRenderer` and return a string, whatever that string is.
const sayHelloToRenderer: MarkdownRenderer = (
  entry: SayHelloToEntry,
  options
  // 👆 Sometimes, you need access to the document-level options. Here they are!
) => {
  return `OHAI ${entry.sayHelloTo}!`;
};

// ✅ Create an object with all of your custom renderers to be used when creating markdown:
const myCustomRenderers = { sayHelloTo: sayHelloToRenderer };

// ✅ Get the standard set of renderers and add your custom renderers:
const renderers = getRenderers(myCustomRenderers);

// ✅ Make some data and generate some markdown!
let entry: SayHelloToEntry = {
  sayHelloTo: 'friend',
};

tsMarkdown([entry], { renderers });
```

[Back to Top](#)

<br />

## More Involved Extension Example

Here's an example in TypeScript of adding an [Obsidian.md](https://obsidian.md/) [callout](https://help.obsidian.md/How+to/Use+callouts) renderer, which is truly the fanciest of blockquotes:

```ts
import {
  MarkdownEntry,
  MarkdownRenderer,
  RenderOptions,
  BlockquoteEntry,
  renderEntries,
  getRenderers,
  tsMarkdown,
} from 'ts-markdown';

// Declare a type for your entry.
type ObsidianCalloutEntry = {
  callout: {
    type: string;
    title?: string;
    content: MarkdownEntry | MarkdownEntry[];
  };
};

// Create a MarkdownRenderer.
const calloutRenderer: MarkdownRenderer = (
  entry: ObsidianCalloutEntry,
  options: RenderOptions
) => {
  let titleText = entry.callout.title ? ` ${entry.callout.title}` : '';

  let content = Array.isArray(entry.callout.content)
    ? entry.callout.content
    : [entry.callout.content];

  const blockquote: BlockquoteEntry = {
    blockquote: [{ p: `[!${entry.callout.type}]${titleText}` }, ...content],
  };

  // For markdown elements that are block-level,
  // 🚫 don't return just a string
  // ✅ use the object return type as seen here.
  return {
    markdown: renderEntries([blockquote], options),
    // This tells the markdown renderer to ensure
    // there are 2 newlines between this element
    // and other elements.
    blockLevel: true,
  };
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

// ts-markdown options are optional 😉
const options = {
  // Get the default renderers and pass in your own custom renderers
  // with a key that matches the uniquely identifying property
  // of your custom markdown entry.
  renderers: getRenderers({ callout: calloutRenderer }),
};

tsMarkdown([callout], options);
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

[Back to Top](#)

<br />

## Overriding an Existing Renderer

You can also completely override an existing renderer. For example, let's have bolded text wrapped in turtles 🐢:

```ts
import { getRenderers } from './defaults';
import { tsMarkdown } from './rendering';

let entry = {
  bold: 'I can be a professional turtle if I want.',
};

tsMarkdown([entry], {
  renderers: getRenderers({
    bold: (entry: { bold: string }) => {
      return `🐢🐢${entry.bold}🐢🐢`;
    },
  }),
});
```

And the result is:

```md
🐢🐢I can be a professional turtle if I want.🐢🐢
```

> Enjoy the possibilities 🌌🐢

[Back to Top](#)

<br />

## Remarks on Extensibility

The current API involves settings things up in stages. It's not as brief as I would like, but it's well-suited for larger-scale document rendering where the same options are used for hundreds or thousands of calls to `tsMarkdown()`. It's largely designed so that other projects can pull in ts-markdown and thoroughly extend and customize it for their purposes, using multiple files and organizing the information in a way that fits their needs.

If you have an idea 💡 for making this extensibility API leaner, cleaner, and easier to read, see [how to contribute](https://github.com/kgar/data-driven-markdown/blob/main/CONTRIBUTING.md).

[Back to Top](#)
