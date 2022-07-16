import { renderMarkdown } from '../rendering';

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
      expect(renderMarkdown(paragraphs)).toBe(
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
      expect(renderMarkdown(paragraphs)).toBe(
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
    const data: DataDrivenMarkdownEntry[] = [
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
                      source: 'https://www.google.com',
                      text: 'Time to get back to testing',
                      title:
                        "Don't worry, search engines are a vital part of development",
                    },
                  },
                  ' ',
                  {
                    img: {
                      href: 'https://via.placeholder.com/25',
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
      expect(renderMarkdown(data)).toBe(
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
});
