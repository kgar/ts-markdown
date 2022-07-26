import { blockquote } from './renderers/blockquote';
import { bold } from './renderers/bold';
import { code } from './renderers/code';
import { codeblock, CodeBlockEntry } from './renderers/codeblock';
import { emoji } from './renderers/emoji';
import { footnote } from './renderers/footnote';
import { h1, H1Entry } from './renderers/h1';
import { h2, H2Entry } from './renderers/h2';
import { h3, H3Entry } from './renderers/h3';
import { h4, H4Entry } from './renderers/h4';
import { h5, H5Entry } from './renderers/h5';
import { h6, H6Entry } from './renderers/h6';
import { highlight } from './renderers/highlight';
import { HorizontalRuleEntry, hr } from './renderers/hr';
import { img } from './renderers/img';
import { italic } from './renderers/italic';
import { link } from './renderers/link';
import { ol } from './renderers/ol';
import { p, ParagraphEntry } from './renderers/p';
import { strikethrough } from './renderers/strikethrough';
import { sub } from './renderers/sub';
import { sup } from './renderers/sup';
import { table, TableEntry } from './renderers/table';
import { text } from './renderers/text';
import { ul } from './renderers/ul';
import { tsMarkdown } from './rendering';
import { MarkdownEntry } from './shared.types';

describe('given an array of more than one markdown entry', () => {
  describe('with 3 paragraphs', () => {
    const paragraphs: ParagraphEntry[] = [
      {
        p: 'Test',
      },
      {
        p: {
          text: [{ italic: { bold: 'This is' } }, ' ', 'a test'],
        },
      },
      {
        p: 'Testing',
      },
    ];

    test('renders 3 paragraphs separated by two newlines between each', () => {
      expect(tsMarkdown(paragraphs)).toBe(
        `Test

***This is*** a test

Testing`
      );
    });
  });

  describe('with 3 paragraphs using helpers', () => {
    const paragraphs: MarkdownEntry[] = [
      p('Test'),
      p(text([italic(bold('This is')), ' ', 'a test'])),
      p('Testing'),
    ];

    test('renders 3 paragraphs separated by two newlines between each', () => {
      expect(tsMarkdown(paragraphs)).toBe(
        `Test

***This is*** a test

Testing`
      );
    });
  });

  describe('with various header entries', () => {
    const paragraphs: (
      | H1Entry
      | H2Entry
      | H3Entry
      | H4Entry
      | H5Entry
      | H6Entry
    )[] = [
      {
        h1: 'Test 1',
      },
      {
        h2: 'Test 2',
      },
      {
        h3: 'Test 3',
      },
      {
        h4: 'Test 4',
      },
      {
        h5: 'Test 5',
      },
      {
        h6: 'Test 6',
      },
      {
        h5: 'Test 5',
      },
      {
        h4: 'Test 4',
      },
      {
        h3: 'Test 3',
      },
      {
        h2: 'Test 2',
      },
      {
        h1: 'Test 1',
      },
    ];

    test('renders header entries with two newlines between each', () => {
      expect(tsMarkdown(paragraphs)).toBe(
        `# Test 1

## Test 2

### Test 3

#### Test 4

##### Test 5

###### Test 6

##### Test 5

#### Test 4

### Test 3

## Test 2

# Test 1`
      );
    });
  });

  describe('with a mildly complex set of markdown data representing a small document', () => {
    const data: MarkdownEntry[] = [
      <H1Entry>{
        h1: 'Testing the Code',
      },
      <HorizontalRuleEntry>{
        hr: true,
      },
      <ParagraphEntry>{
        p: 'It is important to write tests for both initial development and for longterm maintenance.',
      },
      <TableEntry>{
        table: {
          columns: ['Action', 'Reason'],
          rows: [
            [
              'Add new tests for new features',
              'Ensures the library is doing what we expect',
            ],
            [
              'Ensure all previous tests run and pass',
              'Ensures new features do not break existing features',
            ],
            [
              'Etc.',
              {
                text: [
                  {
                    link: {
                      href: 'https://www.google.com',
                      text: 'Time to get back to testing',
                      title:
                        "Don't worry, search engines are a vital part of development",
                    },
                  },
                  ' ',
                  {
                    img: {
                      source: 'https://via.placeholder.com/25',
                      alt: 'A 25x25 placeholder image',
                      title: 'Here is a handy placeholder image',
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
      <H2Entry>{
        h2: 'Sample Test Suite with One Test',
      },
      <CodeBlockEntry>{
        codeblock: `describe('given some common aspect to these tests', () => {
  describe('with this particular input', () => {
    const data = 'some data here';

    test('results in this exepected output', () => {
      expect(runMyCode(data)).toBe('my expected result')
    });
  });
});`,
        fenced: true,
        language: 'ts',
      },
    ];

    test('renders the document as expected', () => {
      expect(tsMarkdown(data)).toBe(
        `# Testing the Code

---

It is important to write tests for both initial development and for longterm maintenance.

| Action                                 | Reason                                                                                                                                                                                                               |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add new tests for new features         | Ensures the library is doing what we expect                                                                                                                                                                          |
| Ensure all previous tests run and pass | Ensures new features do not break existing features                                                                                                                                                                  |
| Etc.                                   | [Time to get back to testing](https://www.google.com "Don't worry, search engines are a vital part of development") ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image") |

## Sample Test Suite with One Test

\`\`\`ts
describe('given some common aspect to these tests', () => {
  describe('with this particular input', () => {
    const data = 'some data here';

    test('results in this exepected output', () => {
      expect(runMyCode(data)).toBe('my expected result')
    });
  });
});
\`\`\``
      );
    });
  });

  describe('with a mildly complex set of markdown data representing a small document, using helpers', () => {
    const data: MarkdownEntry[] = [
      h1('Testing the Code'),
      hr(),
      p(
        'It is important to write tests for both initial development and for longterm maintenance.'
      ),
      table({
        columns: ['Action', 'Reason'],
        rows: [
          [
            'Add new tests for new features',
            'Ensures the library is doing what we expect',
          ],
          [
            'Ensure all previous tests run and pass',
            'Ensures new features do not break existing features',
          ],
          [
            'Etc.',

            text([
              link({
                href: 'https://www.google.com',
                text: 'Time to get back to testing',
                title:
                  "Don't worry, search engines are a vital part of development",
              }),
              ' ',
              img({
                source: 'https://via.placeholder.com/25',
                alt: 'A 25x25 placeholder image',
                title: 'Here is a handy placeholder image',
              }),
            ]),
          ],
        ],
      }),
      h2('Sample Test Suite with One Test'),
      codeblock(
        `describe('given some common aspect to these tests', () => {
  describe('with this particular input', () => {
    const data = 'some data here';

    test('results in this exepected output', () => {
      expect(runMyCode(data)).toBe('my expected result')
    });
  });
});`,
        { fenced: true, language: 'ts' }
      ),
    ];

    test('renders the document as expected', () => {
      expect(tsMarkdown(data)).toBe(
        `# Testing the Code

---

It is important to write tests for both initial development and for longterm maintenance.

| Action                                 | Reason                                                                                                                                                                                                               |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add new tests for new features         | Ensures the library is doing what we expect                                                                                                                                                                          |
| Ensure all previous tests run and pass | Ensures new features do not break existing features                                                                                                                                                                  |
| Etc.                                   | [Time to get back to testing](https://www.google.com "Don't worry, search engines are a vital part of development") ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image") |

## Sample Test Suite with One Test

\`\`\`ts
describe('given some common aspect to these tests', () => {
  describe('with this particular input', () => {
    const data = 'some data here';

    test('results in this exepected output', () => {
      expect(runMyCode(data)).toBe('my expected result')
    });
  });
});
\`\`\``
      );
    });
  });

  describe('with all helpers', () => {
    const entries: MarkdownEntry[] = [
      h1(italic('Testing', { indicator: '_' }), {
        id: 'test',
        underline: true,
      }),
      h2(bold(italic('Testing'), { indicator: '_' }), {
        id: 'test',
        underline: true,
      }),
      h3('Test', { id: 'test' }),
      h4('Testing', { id: 'testing-test' }),
      h5('Headers', { id: 'header-id' }),
      h6('And Headers', { id: 'last-header' }),
      blockquote([
        h2('Blockquotes'),
        hr({ indicator: '_' }),
        blockquote('Blockquotes! Blockquotes! Blockquotes!'),
        hr(),
        p([
          'Look at this paragraph. It is ',
          highlight('rich'),
          ' with ',
          code('cool code samples'),
          '!',
        ]),
        p([
          'You can ',
          link({
            href: 'https://www.google.com',
            text: 'Google',
            title: 'Or let me Google it for you!',
          }),
          ' for ',
          highlight('markdown'),
          ' renderers',
          footnote('1', [
            p('I have searched far and wide.'),
            p([
              "Indeed, there are options out there, but I believe I've got a good thing going here: ",
              img({
                source: 'https://via.placeholder.com/25',
                alt: 'a placeholder',
                title: 'a placeholder image to demonstrate that it works',
              }),
            ]),
          ]),
          ' ',
          emoji('100'),
        ]),
      ]),
      p('Next, we consider a few points:'),
      ul(
        [
          strikethrough('This is a test.'),
          [
            'See my additional elements',
            {
              blockquote: [
                p('There is an embarrassment of blockquotes.'),
                p(["Can you tell I'm having ", text([bold(italic('fun?'))])]),
              ],
            },
          ],
          'I hope to provide something useful to the world, free of charge.',
        ],
        { indicator: '+' }
      ),
      p('These things being said, the next steps are:'),
      ol([
        text(['Act upon the data', sup('2', { html: true })]),
        text([
          'Make an assertion about the result',
          sub('rly', { html: true }),
        ]),
        'Ship it!',
      ]),
    ];

    test('renders the expected markdown document', () => {
      expect(tsMarkdown(entries)).toBe(
        `_Testing_ {#test}
=================

__*Testing*__ {#test}
---------------------

### Test {#test}

#### Testing {#testing-test}

##### Headers {#header-id}

###### And Headers {#last-header}

> ## Blockquotes
> 
> ___
> 
> > Blockquotes! Blockquotes! Blockquotes!
> 
> ---
> 
> Look at this paragraph. It is ==rich== with \`cool code samples\`!
> 
> You can [Google](https://www.google.com "Or let me Google it for you!") for ==markdown== renderers[^1] :100:

Next, we consider a few points:

+ ~~This is a test.~~
+ See my additional elements
    > There is an embarrassment of blockquotes.
    > 
    > Can you tell I'm having ***fun?***
+ I hope to provide something useful to the world, free of charge.

These things being said, the next steps are:

1. Act upon the data<sup>2</sup>
2. Make an assertion about the result<sub>rly</sub>
3. Ship it!

[^1]: I have searched far and wide.
    
    Indeed, there are options out there, but I believe I've got a good thing going here: ![a placeholder](https://via.placeholder.com/25 "a placeholder image to demonstrate that it works")`
      );
    });
  });
});
