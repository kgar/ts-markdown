import { renderMarkdown } from '../renderMarkdown';

describe('given a header 1 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h1: 'Hello, world!',
      },
    ];

    test('renders an h1 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`# ${data[0]['h1']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H1Entry = {
      h1: 'Test',
      id: 'test-id',
    };

    test('renders an h1 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `# ${headerEntry.h1} {#${headerEntry.id}}`
      );
    });
  });
});

describe('given a header 2 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h2: 'Hello, world!',
      },
    ];

    test('renders an h2 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`## ${data[0]['h2']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H2Entry = {
      h2: 'Test',
      id: 'test-id',
    };

    test('renders an h2 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `## ${headerEntry.h2} {#${headerEntry.id}}`
      );
    });
  });
});

describe('given a header 3 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h3: 'Hello, world!',
      },
    ];

    test('renders an h3 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`### ${data[0]['h3']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H3Entry = {
      h3: 'Test',
      id: 'test-id',
    };

    test('renders an h3 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `### ${headerEntry.h3} {#${headerEntry.id}}`
      );
    });
  });
});

describe('given a header 4 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h4: 'Hello, world!',
      },
    ];

    test('renders an h4 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`#### ${data[0]['h4']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H4Entry = {
      h4: 'Test',
      id: 'test-id',
    };

    test('renders an h4 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `#### ${headerEntry.h4} {#${headerEntry.id}}`
      );
    });
  });
});

describe('given a header 5 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h5: 'Hello, world!',
      },
    ];

    test('renders an h5 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`##### ${data[0]['h5']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H5Entry = {
      h5: 'Test',
      id: 'test-id',
    };

    test('renders an h5 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `##### ${headerEntry.h5} {#${headerEntry.id}}`
      );
    });
  });
});

describe('given a header 6 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h6: 'Hello, world!',
      },
    ];

    test('renders an h6 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`###### ${data[0]['h6']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H6Entry = {
      h6: 'Test',
      id: 'test-id',
    };

    test('renders an h6 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `###### ${headerEntry.h6} {#${headerEntry.id}}`
      );
    });
  });
});

// TODO: Test headers with rich text
