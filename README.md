# ts-markdown <!-- omit in toc -->

An extensible TypeScript markdown generator that takes JSON and creates a markdown document.

[📖 Docs](https://kgar.github.io/ts-markdown/) | [🎮 Playground (Live Demo)](https://kgar.github.io/ts-markdown/playground.html)

---

- [Quick Start](#quick-start)
- [Extensibility](#extensibility)
- [Compatibility](#compatibility)
- [Why This Project?](#why-this-project)
- [🙌 Credit](#-credit)
  - [Credit to json2md](#credit-to-json2md)
  - [Credit to Markdown Guide](#credit-to-markdown-guide)
- [🌏 Contribution Guidelines](#-contribution-guidelines)
- [License](#license)

## Quick Start

Install **ts-markdown**:

```sh
npm install ts-markdown
# or "yarn add ts-markdown"
```

Generate some markdown:

```ts
import { tsMarkdown } from 'ts-markdown';

// Make markdown entries
const entries = [
  {
    h4: 'Hello, world!',
  },
  {
    blockquote: "Let's generate markdown!",
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
];

return tsMarkdown(entries); // returns the markdown document as a string
```

And the result is:

```md
#### Hello, world!

> Let's generate markdown!

Generating markdown from data can be simple. All you need are:

1. objects
2. a function
3. and a place to run :checkered_flag:
```

For more information about supported markdown elements, view the [type docs](https://kgar.github.io/ts-markdown/modules.html). All support markdown elements end with `Entry`, such as `LinkEntry`, `ImageEntry`, `UnorderedListEntry`, and so on.

For more examples of **generating markdown**, check out the [cookbook](https://kgar.github.io/ts-markdown/pages/cookbook.html).

## Extensibility

You can extend **ts-markdown** to render your own custom elements or even override existing renderers.

For more information on extending **ts-markdown**, see [Extending ts-markdown](https://kgar.github.io/ts-markdown/pages/extending-ts-markdown.html).

## Compatibility

**ts-markdown** is written in TypeScript and node JS. It works with node JS v16.x and higher. Earlier versions may also work, but it is not guaranteed.

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
