import { tsMarkdown } from './rendering';

describe('given a simple document', () => {
  const entries = [
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
  ];

  test('renders expected markdown', () => {
    expect(tsMarkdown(entries)).toBe(
      `#### Hello, world!

> Let's generate some markdown!

Generating markdown from data can be simple. All you need are:

1. objects
2. a function
3. and a place to run :checkered_flag:`
    );
  });
});
