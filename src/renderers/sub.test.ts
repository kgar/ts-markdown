import { renderMarkdown } from '../rendering';

describe('given a subscript entry', () => {
  describe('when html is set to true at the local-level', () => {
    const subEntry: SubscriptEntry = {
      sub: 'test',
      html: true,
    };
    test('renders html version of subscript', () => {
      expect(renderMarkdown([subEntry])).toBe(`<sub>${subEntry.sub}</sub>`);
    });
  });

  describe('when html is set to true at the document level and false at the local-level', () => {
    const subEntry: SubscriptEntry = {
      sub: 'test',
      html: false,
    };
    test('renders markdown version of subscript', () => {
      expect(renderMarkdown([subEntry], { useSubscriptHtml: true })).toBe(
        `~${subEntry.sub}~`
      );
    });
  });

  describe('when html is set to true at the document level', () => {
    const subEntry: SubscriptEntry = {
      sub: 'test',
    };
    test('renders html version of subscript', () => {
      expect(renderMarkdown([subEntry], { useSubscriptHtml: true })).toBe(
        `<sub>${subEntry.sub}</sub>`
      );
    });
  });
});
