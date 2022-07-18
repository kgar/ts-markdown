import { renderMarkdown } from '../rendering';

describe('given a codeblock entry', () => {
  describe('with a single string', () => {
    const codeBlockEntry: CodeBlockEntry = {
      codeblock: `const hello = 'hello';
const world = 'world';
console.error(hello + ', ' + world + '!')`,
    };

    test('renders a code block indented by 4 spaces', () => {
      expect(renderMarkdown([codeBlockEntry])).toBe(
        `    const hello = 'hello';
    const world = 'world';
    console.error(hello + ', ' + world + '!')`
      );
    });
  });

  describe('with a single string and language of js indicated', () => {
    const codeBlockEntry: CodeBlockEntry = {
      codeblock: `const hello = 'hello';
const world = 'world';
console.error(hello + ', ' + world + '!')`,
      language: 'js',
    };

    test('renders a code block indented by 4 spaces and ignores language indication', () => {
      expect(renderMarkdown([codeBlockEntry])).toBe(
        `    const hello = 'hello';
    const world = 'world';
    console.error(hello + ', ' + world + '!')`
      );
    });
  });

  describe('with an array of strings', () => {
    const codeBlockEntry: CodeBlockEntry = {
      codeblock: [
        `const hello = 'hello';`,
        `const world = 'world';`,
        `console.error(hello + ', ' + world + '!')`,
      ],
    };

    test('renders a code block indented by 4 spaces', () => {
      expect(renderMarkdown([codeBlockEntry])).toBe(
        `    const hello = 'hello';
    const world = 'world';
    console.error(hello + ', ' + world + '!')`
      );
    });
  });

  describe('with fencing enabled and with a single string', () => {
    const codeBlockEntry: CodeBlockEntry = {
      codeblock: `const hello = 'hello';
const world = 'world';
console.error(hello + ', ' + world + '!')`,
      fenced: true,
    };

    test('renders a fenced code block denoted by backticks', () => {
      expect(renderMarkdown([codeBlockEntry])).toBe(
        `\`\`\`
const hello = 'hello';
const world = 'world';
console.error(hello + ', ' + world + '!')
\`\`\``
      );
    });
  });

  describe('with fencing enabled and with an array of strings', () => {
    const codeBlockEntry: CodeBlockEntry = {
      codeblock: [
        `const hello = 'hello';`,
        `const world = 'world';`,
        `console.error(hello + ', ' + world + '!')`,
      ],
      fenced: true,
    };

    test('renders a fenced code block denoted by backticks', () => {
      expect(renderMarkdown([codeBlockEntry])).toBe(
        `\`\`\`
const hello = 'hello';
const world = 'world';
console.error(hello + ', ' + world + '!')
\`\`\``
      );
    });
  });

  describe('with fencing enabled and with an array of strings and ts language indicated', () => {
    const codeBlockEntry: CodeBlockEntry = {
      codeblock: [
        `const hello = 'hello';`,
        `const world = 'world';`,
        `console.error(hello + ', ' + world + '!')`,
      ],
      fenced: true,
      language: 'ts',
    };

    test('renders a fenced code block denoted by backticks with ts language indicated', () => {
      expect(renderMarkdown([codeBlockEntry])).toBe(
        `\`\`\`ts
const hello = 'hello';
const world = 'world';
console.error(hello + ', ' + world + '!')
\`\`\``
      );
    });
  });

  describe('with fencing enabled and with an array of strings, ts language indicated, and tilde fence character indicated', () => {
    const codeBlockEntry: CodeBlockEntry = {
      codeblock: [
        `const hello = 'hello';`,
        `const world = 'world';`,
        `console.error(hello + ', ' + world + '!')`,
      ],
      fenced: '~',
      language: 'ts',
    };

    test('renders a fenced code block denoted by tildes with ts language indicated', () => {
      expect(renderMarkdown([codeBlockEntry])).toBe(
        `~~~ts
const hello = 'hello';
const world = 'world';
console.error(hello + ', ' + world + '!')
~~~`
      );
    });
  });

  describe('with fencing enabled and with an array of strings, ts language indicated, and backtick fence character indicated', () => {
    const codeBlockEntry: CodeBlockEntry = {
      codeblock: [
        `const hello = 'hello';`,
        `const world = 'world';`,
        `console.error(hello + ', ' + world + '!')`,
      ],
      fenced: '`',
      language: 'ts',
    };

    test('renders a fenced code block denoted by tildes with ts language indicated', () => {
      expect(renderMarkdown([codeBlockEntry])).toBe(
        `\`\`\`ts
const hello = 'hello';
const world = 'world';
console.error(hello + ', ' + world + '!')
\`\`\``
      );
    });
  });

  describe('given document-level code fencing set to true', () => {
    const codeblockEntry: CodeBlockEntry = {
      codeblock: "console.log('hello, world!')",
    };

    test('renders codeblock with fencing', () => {
      expect(renderMarkdown([codeblockEntry], { useCodeblockFencing: true }))
        .toBe(`\`\`\`
console.log('hello, world!')
\`\`\``);
    });
  });

  describe('with an Obsidian-esque identifier appended', () => {
    const codeBlockEntry: CodeBlockEntry = {
      codeblock: `const hello = 'hello';
const world = 'world';
console.error(hello + ', ' + world + '!')`,
      append: '^heyo',
    };

    test('renders a code block indented by 4 spaces', () => {
      expect(renderMarkdown([codeBlockEntry])).toBe(
        `    const hello = 'hello';
    const world = 'world';
    console.error(hello + ', ' + world + '!')
^heyo`
      );
    });
  });
});
