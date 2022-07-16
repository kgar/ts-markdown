import { renderMarkdown } from '../renderMarkdown';

describe('given a description list entry', () => {
  describe('given a term and details', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dt: 'First Term',
        },
        {
          dd: 'This is the definition of the first term.',
        },
      ],
    };

    test('renders term and details markdown', () => {
      expect(renderMarkdown([dlEntry])).toBe(
        `First Term
: This is the definition of the first term.`
      );
    });
  });

  describe('given a 2 terms and 1 detail', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dt: 'First Term',
        },
        {
          dt: 'Second Term',
        },
        {
          dd: 'This is the definition of the terms.',
        },
      ],
    };

    test('renders term and details markdown', () => {
      expect(renderMarkdown([dlEntry])).toBe(
        `First Term
Second Term
: This is the definition of the terms.`
      );
    });
  });

  describe('given a 2 terms and 2 details', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dt: 'First Term',
        },
        {
          dt: 'Second Term',
        },
        {
          dd: 'This is some definition of the first and second term.',
        },
        {
          dd: {
            text: [
              'This is ',
              { italic: 'more' },
              ' definition of the first and second term.',
            ],
          },
        },
      ],
    };

    test('renders term and details markdown', () => {
      expect(renderMarkdown([dlEntry])).toBe(
        `First Term
Second Term
: This is some definition of the first and second term.
: This is *more* definition of the first and second term.`
      );
    });
  });

  describe('given a term', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dt: 'First Term',
        },
      ],
    };

    test('renders term markdown', () => {
      expect(renderMarkdown([dlEntry])).toBe(`First Term`);
    });
  });

  describe('given a description', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dd: 'A description',
        },
      ],
    };

    test('renders description markdown', () => {
      expect(renderMarkdown([dlEntry])).toBe(`: A description`);
    });
  });

  describe('given a term and details with html override set locally', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dt: 'First Term',
        },
        {
          dd: 'This is the definition of the first term.',
        },
      ],
      html: true,
    };

    test('renders term and details html', () => {
      expect(renderMarkdown([dlEntry])).toBe(
        `<dl>
    <dt>First Term</dt>
    <dd>This is the definition of the first term.</dd>
</dl>`
      );
    });
  });

  describe('given a 2 terms and 1 detail with html override set locally', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dt: 'First Term',
        },
        {
          dt: 'Second Term',
        },
        {
          dd: 'This is the definition of the terms.',
        },
      ],
      html: true,
    };

    test('renders term and details html', () => {
      expect(renderMarkdown([dlEntry])).toBe(
        `<dl>
    <dt>First Term</dt>
    <dt>Second Term</dt>
    <dd>This is the definition of the terms.</dd>
</dl>`
      );
    });
  });

  describe('given a 2 terms and 2 details with html override set locally', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dt: 'First Term',
        },
        {
          dt: 'Second Term',
        },
        {
          dd: 'This is some definition of the first and second term.',
        },
        {
          dd: {
            text: [
              'This is ',
              { italic: 'more' },
              ' definition of the first and second term.',
            ],
          },
        },
      ],
      html: true,
    };

    test('renders term and details html with html override set locally', () => {
      expect(renderMarkdown([dlEntry])).toBe(
        `<dl>
    <dt>First Term</dt>
    <dt>Second Term</dt>
    <dd>This is some definition of the first and second term.</dd>
    <dd>This is *more* definition of the first and second term.</dd>
</dl>`
      );
    });
  });

  describe('given a term', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dt: 'First Term',
        },
      ],
      html: true,
    };

    test('renders term markdown', () => {
      expect(renderMarkdown([dlEntry])).toBe(`<dl>
    <dt>First Term</dt>
</dl>`);
    });
  });

  describe('given a description with html override set locally', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dd: 'A description',
        },
      ],
      html: true,
    };

    test('renders description html', () => {
      expect(renderMarkdown([dlEntry])).toBe(`<dl>
    <dd>A description</dd>
</dl>`);
    });
  });

  describe('given a term and details with html override set at the document level', () => {
    const dlEntry: DescriptionListEntry = {
      dl: [
        {
          dt: 'First Term',
        },
        {
          dd: 'This is the definition of the first term.',
        },
      ],
    };

    test('renders term and details html', () => {
      expect(renderMarkdown([dlEntry], { useDescriptionListHtml: true })).toBe(
        `<dl>
    <dt>First Term</dt>
    <dd>This is the definition of the first term.</dd>
</dl>`
      );
    });
  });
});
