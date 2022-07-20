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

## Extending CoolNameHere

TODO

## Why This Project?

TODO

## Contribution Guidelines

Have an idea? Found a bug? See [how to contribute](https://github.com/kgar/data-driven-markdown/blob/main/CONTRIBUTING.md).

## License

[MIT](https://github.com/kgar/data-driven-markdown/blob/main/LICENSE) © [KGar](https://github.com/kgar)
