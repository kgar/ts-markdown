# Data-Driven Markdown Generator 💽 ➡ 🏭 ➡ 📄

> Given markdown as JSON, render markdown! What could go wrong?

(psst: heavily *heavily* inspired by [json2md](https://github.com/IonicaBizau/json2md))

## How It Works

Given some JSON data, call the `render()` function:
```js
let data = [
  { h1: 'Data-Driven Markdown Generator' },
  {
    blockquote: [
      {
        p: [
          'That is',
          { italic: { bold: 'data-driven' } },
          'markdown',
          'generation,',
          { strike: { bold: 'not something else.' } },
        ],

        join: ' ',
      },
      {
        p: [
          'You can ',
          { italic: 'leverage ' },
          'options like ',
          { code: 'join' },
          ' or just add spaces and newlines yourself.',
        ],
      },
    ],
  },
  {
    table: {
      headers: ['Before', { bold: { italic: 'After' } }],
      rows: [
        [
          'We would generate markdown from HTML...',
          'We use a generalized, data-driven tool for generating markdown from anywhere.',
        ],
        {
          Before: 'Making tables was a pain.',
          After: 'We have more options to make crafting tables easier!',
        },
      ],
    },
  },
  {
    ul: [
      'You can make lists',
      'You can also make lists which',
      {
        ol: [
          'Nest',
          'as',
          'far',
          'as',
          {
            ol: [
              'needed',
              { ul: ['no', { strikethrough: { italic: 'problem' } }] },
            ],
          },
        ],
      },
    ],
  },
];

console.log(render(data)); // It makes markdown! 👇
```

Then, receive markdown!

```md
# Data-Driven Markdown Generator

> That is ***data-driven*** markdown geenration, ~~not something else.~~
> 
> You can *leverage* options like `join` or just add spaces and newlines yourself.

| Before                                  | After                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------------- |
| We would generate markdown from HTML... | We use a generalized, data-driven tool for generating markdown from anywhere. |
| Making tables was a pain.               | We have more options to make crafting tables easier!                          |

- You can make lists
- You can also make lists which
  1. Nest
  2. as
  3. far
  4. as
    1. needed
      - no
      - ~~*problem*~~
```

## Goals

- [ ] Support same workloads as [json2md](https://github.com/IonicaBizau/json2md)
- [ ] Have test coverage 😬
- [ ] Support as many scenarios as feasible from [json2md](https://github.com/IonicaBizau/json2md)'s [github issues](https://github.com/IonicaBizau/json2md/issues)
- [ ] Support nesting
- [ ] Support HTML fallback / escape hatching
- [ ] Make extensible for people like me who need [Obsidian.md](https://obsidian.md/)-style linking and transclusion and for those who like encapsulating and reusing commonly needed content
- [ ] Make extension library/libraries that can hook into this one (this is challenging, because differing versions could pose a problem)
- [ ] Provide useful error messages

## Contributing
At this time, I am just getting started. I've never put together a project like this where it provides a potentially popular service for a fully visible standard which I have no time to fully understand. At some point, I will put this out there with my initial json2md goals accomplished, and I will likely rely on github issues and maybe even PRs from the community to fully flesh out this library. For now, though, it's private, and I'm going to use it selfishly 🙏.

