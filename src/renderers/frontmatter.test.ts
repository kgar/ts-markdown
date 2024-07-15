import { tsMarkdown } from '../rendering';
import { FrontmatterEntry, frontmatter } from './frontmatter';

describe('given a frontmatter entry', () => {
  describe('with an object value', () => {
    const entry: FrontmatterEntry = {
      frontmatter: {
        date: '1970-01-01',
      },
    };

    test('renders a frontmatter header with the specified object as content', () => {
      expect(tsMarkdown([entry])).toBe(
        `---\n${Object.keys(entry.frontmatter)[0]}: ${
          Object.values(entry.frontmatter)[0]
        }\n---`
      );
    });
  });

  describe('using a helper with an object value', () => {
    const entry = frontmatter({ date: '1970-01-01' });

    test('renders a frontmatter header with the specified object as content', () => {
      expect(tsMarkdown([entry])).toBe(
        `---\n${Object.keys(entry.frontmatter)[0]}: ${
          Object.values(entry.frontmatter)[0]
        }\n---`
      );
    });
  });
});
