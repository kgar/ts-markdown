- [Introduction](#introduction)
- [Document-level Options](#document-level-options)
- [Entry-level Options](#entry-level-options)
- [Option Precedence: Entry-level > Document-level > Defaults](#option-precedence-entry-level--document-level--defaults)
- [More About Options](#more-about-options)

## Introduction

**ts-markdown** has the following types of options:

- **document-level**: options that apply to the entire document
- **entry-level**: options that apply to a specific type of `MarkdownEntry`

If there is additional options information you'd like to see here which wouldn't fit in FAQs, the cookbook, or the type docs, [open a new GitHub issue](https://github.com/kgar/ts-markdown/issues/new) requesting the type of options documentation you'd like to see.

## Document-level Options

Document-level options affect either a single entry type, a particular lifecycle event in document rendering, or some overarching aspect. Entry-specific options at the document-level are a convenient shortcut for applying your desired style to document rendering, reducing unnecessary props on your individual objects.

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

## Entry-level Options

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

## Option Precedence: Entry-level > Document-level > Defaults

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
    ' - This ',
    { bold: 'is' },
    ' a ',
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
__Note__ - This __is__ a **sample**
```

## More About Options

> For a full list of document-level and entry-level options, see the type documents for `RenderOptions` and the individual entry types, such as `BoldEntry`.
