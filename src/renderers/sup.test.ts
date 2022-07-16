import { renderMarkdown } from '../rendering';

describe('given a superscript entry', () => {
  describe('when html is set to true at the local-level', () => {
    const superEntry: SuperscriptEntry = {
      sup: 'test',
      html: true,
    };
    test('renders html version of superscript', () => {
      expect(renderMarkdown([superEntry])).toBe(`<sup>${superEntry.sup}</sup>`);
    });
  });

  describe('when html is set to true at the document level and false at the local-level', () => {
    const superEntry: SuperscriptEntry = {
      sup: 'test',
      html: false,
    };
    test('renders markdown version of superscript', () => {
      expect(renderMarkdown([superEntry], { useSuperscriptHtml: true })).toBe(
        `^${superEntry.sup}^`
      );
    });
  });

  describe('when html is set to true at the document level', () => {
    const supEntry: SuperscriptEntry = {
      sup: 'test',
    };
    test('renders html version of superscript', () => {
      expect(renderMarkdown([supEntry], { useSuperscriptHtml: true })).toBe(
        `<sup>${supEntry.sup}</sup>`
      );
    });
  });
});
