# ts-markdown

> An extensible TypeScript markdown generator that takes JSON and creates a markdown document.

## Getting Started

To use **ts-markdown** in your project, run:

```sh
npm install ts-markdown
# or "yarn add ts-markdown"
```

## Usage

**ts-markdown** is written in TypeScript and works with node JS and is known to be supported on node v16.x and higher. Earlier versions may also work, but it is not guaranteed.

**ts-markdown** revolves around sending an array of "markdown entry" objects to the `tsMarkdown()` function.

### **Example** - generating a simple document:

Given this code:

```ts
import { tsMarkdown } from 'ts-markdown';

tsMarkdown([
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

## Options

**ts-markdown** has the following types of options:

- entry-level: options that apply to a specific type of `MarkdownEntry`
- document-level: options that apply the entire document

### Document-level options

You can specify options at the document-level by passing in a `RenderOptions` object when calling the `tsMarkdown()` function:

```ts
const options: RenderOptions = {
  useH1Underlining: true,
};

tsMarkdown(myEntries, options);
// 👆 H1 markdown will now have underlining whenever these options are passed into `tsMarkdown()`
```

> **Note**: We Have Defaults
>
> Any options that you do not specify fall back to a default value, so you do not have to specify all options. You can pick and choose the ones you want to specify.

### Entry-level options

Some markdown entries have their own entry-level options.

For example, unordered lists have an option for which indicator to use:

```ts
const ulEntry: UnorderedListEntry = {
  ul: ['Hello, world!', 'Goodbye, Moon Man!'],
  indicator: '+',
};

tsMarkdown([ulEntry]);
```

The result is a list with items indicated by `+`:

```
+ Hello, world!
+ Goodbye, Moon Man!
```

### Option Precedence: Entry-level > Document-level > Defaults

> Entry-level settings, if specified, take precedence over all else.
>
> Then, document-level settings are considered.
>
> Otherwise, we use defaults.

When specifying options, you may need to provide entry- and document-level options which conflict with each other.

For example, I want all bolded text to use underscores `_`, except I want one entry to use asterisks `*`:

```ts
import { tsMarkdown } from './rendering';
import { RenderOptions } from './rendering.types';
import { MarkdownEntry } from './shared.types';

const entry: MarkdownEntry = {
  text: [
    { bold: 'Note' },
    ' - This is a ',
    {
      bold: 'sample',
      // 👇 this is an entry-level option
      indicator: '*',
    },
  ],
};

// 👇 these are document-level options
const options: RenderOptions = {
  boldIndicator: '_',
};

tsMarkdown([entry], options);
```

The rendered markdown is:

```
__Note__ - This is a **sample**
```

### More About Options

> API documentation is in the works. In the meantime, you can view the types for any of the markdown entries by visiting:
>
> - [rendering.types.ts](https://github.com/kgar/ts-markdown/blob/main/src/rendering.types.ts)
> - Any renderer ts file, such as [bold.ts](https://github.com/kgar/ts-markdown/blob/main/src/renderers/bold.ts)

## Extending ts-markdown

You can add your own custom markdown renderers into the mix.

### A Simple Extension

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

### More Involved Extension Example

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

### Overriding an Existing Renderer

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

### Remarks on Extensibility

The current API involves settings things up in stages. It's not as brief as I would like, but it's well-suited for larger-scale document rendering where the same options are used for hundreds or thousands of calls to `tsMarkdown()`. It's largely designed so that other projects can pull in ts-markdown and thoroughly extend and customize it for their purposes, using multiple files and organizing the information in a way that fits their needs.

If you have an idea 💡 for making this extensibility API leaner, cleaner, and easier to read, see [how to contribute](https://github.com/kgar/data-driven-markdown/blob/main/CONTRIBUTING.md).

## Why This Project?

I am an avid user of [Obsidian.md](https://www.obsidian.md), and as I build my vaults of information, I sometimes need to convert JSON into markdown in a programmatic way. I may be working on a project to crunch some JSON and build articles, and having the ability to offload the complexity of rendering markdown to a library would be ideal. Additionally, having TypeScript typing support sweetens the deal for me.

Because I could not find an active / monitored library that handled the level of complexity I need when building my Obsidian markdown documents, I decided to make it myself.

## 🙌 Credit

### Credit to [json2md](https://github.com/IonicaBizau/json2md)

This library is heavily inspired by [Ionică Bizău's](https://github.com/IonicaBizau) [json2md](https://github.com/IonicaBizau/json2md) library, which was the only highly starred repo I could find that offered the kind of functionality I wanted. I also like the modeling the author chose, so I have patterned mine after theirs, adding and expanding in ways that make sense to me.

### Credit to [Markdown Guide](https://www.markdownguide.org/)

The unit tests in this library cover almost all cases defined in [Markdown Guide](https://www.markdownguide.org/), an excellent website for getting exactly the details needed for writing good markdown. Any best practices that I've applied are most likely based on this website.

## 🌏 Contribution Guidelines

Have an idea? Found a bug? See [how to contribute](https://github.com/kgar/data-driven-markdown/blob/main/CONTRIBUTING.md).

## License

[MIT](https://github.com/kgar/data-driven-markdown/blob/main/LICENSE) © [KGar](https://github.com/kgar)
