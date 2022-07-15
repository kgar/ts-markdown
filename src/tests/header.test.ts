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

  describe('with a text entry containing rich text', () => {
    const h1Entry: H1Entry = {
      h1: {
        text: [
          {
            highlight: 'Totally',
          },
          ' ',
          {
            bold: { italic: 'awesome' },
          },
          ' ',
          {
            strikethrough: 'd00d',
          },
        ],
      },
    };

    test('renders h1 with rich text', () => {
      expect(renderMarkdown([h1Entry])).toBe(
        '# ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h1Entry: H1Entry = {
      h1: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h1 with rich text', () => {
      expect(renderMarkdown([h1Entry])).toBe(
        '# ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h1Entry: H1Entry = {
      h1: {
        text: [
          'The magnificent power of ',
          {
            link: {
              source: 'https://www.google.com',
              text: 'Googling Placeholders',
            },
          },
          ' like ',
          {
            img: {
              href: 'https://via.placeholder.com/25',
              alt: 'A 25x25 placeholder image',
              title: 'Here is a handy placeholder image',
            },
          },
        ],
      },
    };

    test('renders h1 with link and image', () => {
      expect(renderMarkdown([h1Entry])).toBe(
        '# The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });

  describe('with underline set to true locally', () => {
    const h1Entry: H1Entry = {
      h1: 'This is my totally cool header',
      underline: true,
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(renderMarkdown([h1Entry])).toBe(
        `This is my totally cool header
==============================`
      );
    });
  });

  describe('with underline set to true at document-level', () => {
    const h1Entry: H1Entry = {
      h1: 'This is my totally cool header',
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(renderMarkdown([h1Entry], { useH1Underlining: true })).toBe(
        `This is my totally cool header
==============================`
      );
    });
  });

  describe('with underline set to true at local-level and false at the document level', () => {
    const h1Entry: H1Entry = {
      h1: 'This is my totally cool header',
      underline: true,
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(renderMarkdown([h1Entry], { useH1Underlining: false })).toBe(
        `This is my totally cool header
==============================`
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

  describe('with a text entry containing rich text', () => {
    const h2Entry: H2Entry = {
      h2: {
        text: [
          {
            highlight: 'Totally',
          },
          ' ',
          {
            bold: { italic: 'awesome' },
          },
          ' ',
          {
            strikethrough: 'd00d',
          },
        ],
      },
    };

    test('renders h2 with rich text', () => {
      expect(renderMarkdown([h2Entry])).toBe(
        '## ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h2Entry: H2Entry = {
      h2: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h2 with rich text', () => {
      expect(renderMarkdown([h2Entry])).toBe(
        '## ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h2Entry: H2Entry = {
      h2: {
        text: [
          'The magnificent power of ',
          {
            link: {
              source: 'https://www.google.com',
              text: 'Googling Placeholders',
            },
          },
          ' like ',
          {
            img: {
              href: 'https://via.placeholder.com/25',
              alt: 'A 25x25 placeholder image',
              title: 'Here is a handy placeholder image',
            },
          },
        ],
      },
    };

    test('renders h2 with link and image', () => {
      expect(renderMarkdown([h2Entry])).toBe(
        '## The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });

  describe('with underline set to true', () => {
    const h2Entry: H2Entry = {
      h2: 'This is my totally cool header',
      underline: true,
    };

    test('renders header without prefixed hashtag and with hyphen underline character length of header text', () => {
      expect(renderMarkdown([h2Entry])).toBe(
        `This is my totally cool header
------------------------------`
      );
    });
  });

  describe('with underline set to true at document-level', () => {
    const h2Entry: H2Entry = {
      h2: 'This is my totally cool header',
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(renderMarkdown([h2Entry], { useH2Underlining: true })).toBe(
        `This is my totally cool header
------------------------------`
      );
    });
  });

  describe('with underline set to true at local-level and false at the document level', () => {
    const h2Entry: H2Entry = {
      h2: 'This is my totally cool header',
      underline: true,
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(renderMarkdown([h2Entry], { useH2Underlining: false })).toBe(
        `This is my totally cool header
------------------------------`
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

  describe('with a text entry containing rich text', () => {
    const h3Entry: H3Entry = {
      h3: {
        text: [
          {
            highlight: 'Totally',
          },
          ' ',
          {
            bold: { italic: 'awesome' },
          },
          ' ',
          {
            strikethrough: 'd00d',
          },
        ],
      },
    };

    test('renders h3 with rich text', () => {
      expect(renderMarkdown([h3Entry])).toBe(
        '### ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h3Entry: H3Entry = {
      h3: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h3 with rich text', () => {
      expect(renderMarkdown([h3Entry])).toBe(
        '### ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h3Entry: H3Entry = {
      h3: {
        text: [
          'The magnificent power of ',
          {
            link: {
              source: 'https://www.google.com',
              text: 'Googling Placeholders',
            },
          },
          ' like ',
          {
            img: {
              href: 'https://via.placeholder.com/25',
              alt: 'A 25x25 placeholder image',
              title: 'Here is a handy placeholder image',
            },
          },
        ],
      },
    };

    test('renders h3 with link and image', () => {
      expect(renderMarkdown([h3Entry])).toBe(
        '### The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
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

  describe('with a text entry containing rich text', () => {
    const h4Entry: H4Entry = {
      h4: {
        text: [
          {
            highlight: 'Totally',
          },
          ' ',
          {
            bold: { italic: 'awesome' },
          },
          ' ',
          {
            strikethrough: 'd00d',
          },
        ],
      },
    };

    test('renders h4 with rich text', () => {
      expect(renderMarkdown([h4Entry])).toBe(
        '#### ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h4Entry: H4Entry = {
      h4: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h4 with rich text', () => {
      expect(renderMarkdown([h4Entry])).toBe(
        '#### ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h4Entry: H4Entry = {
      h4: {
        text: [
          'The magnificent power of ',
          {
            link: {
              source: 'https://www.google.com',
              text: 'Googling Placeholders',
            },
          },
          ' like ',
          {
            img: {
              href: 'https://via.placeholder.com/25',
              alt: 'A 25x25 placeholder image',
              title: 'Here is a handy placeholder image',
            },
          },
        ],
      },
    };

    test('renders h4 with link and image', () => {
      expect(renderMarkdown([h4Entry])).toBe(
        '#### The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
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

  describe('with a text entry containing rich text', () => {
    const h5Entry: H5Entry = {
      h5: {
        text: [
          {
            highlight: 'Totally',
          },
          ' ',
          {
            bold: { italic: 'awesome' },
          },
          ' ',
          {
            strikethrough: 'd00d',
          },
        ],
      },
    };

    test('renders h5 with rich text', () => {
      expect(renderMarkdown([h5Entry])).toBe(
        '##### ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h5Entry: H5Entry = {
      h5: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h5 with rich text', () => {
      expect(renderMarkdown([h5Entry])).toBe(
        '##### ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h5Entry: H5Entry = {
      h5: {
        text: [
          'The magnificent power of ',
          {
            link: {
              source: 'https://www.google.com',
              text: 'Googling Placeholders',
            },
          },
          ' like ',
          {
            img: {
              href: 'https://via.placeholder.com/25',
              alt: 'A 25x25 placeholder image',
              title: 'Here is a handy placeholder image',
            },
          },
        ],
      },
    };

    test('renders h5 with link and image', () => {
      expect(renderMarkdown([h5Entry])).toBe(
        '##### The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
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

  describe('with a text entry containing rich text', () => {
    const h6Entry: H6Entry = {
      h6: {
        text: [
          {
            highlight: 'Totally',
          },
          ' ',
          {
            bold: { italic: 'awesome' },
          },
          ' ',
          {
            strikethrough: 'd00d',
          },
        ],
      },
    };

    test('renders h6 with rich text', () => {
      expect(renderMarkdown([h6Entry])).toBe(
        '###### ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h6Entry: H6Entry = {
      h6: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h6 with rich text', () => {
      expect(renderMarkdown([h6Entry])).toBe(
        '###### ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h6Entry: H6Entry = {
      h6: {
        text: [
          'The magnificent power of ',
          {
            link: {
              source: 'https://www.google.com',
              text: 'Googling Placeholders',
            },
          },
          ' like ',
          {
            img: {
              href: 'https://via.placeholder.com/25',
              alt: 'A 25x25 placeholder image',
              title: 'Here is a handy placeholder image',
            },
          },
        ],
      },
    };

    test('renders h6 with link and image', () => {
      expect(renderMarkdown([h6Entry])).toBe(
        '###### The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });
});

// TODO: Test headers with rich text
