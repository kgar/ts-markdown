import { renderMarkdown } from '../rendering';

describe('given a horizontal rule entry', () => {
  describe('with any value', () => {
    const hrEntry: HorizontalRuleEntry = {
      hr: '',
    };

    test('renders a horizontal rule', () => {
      expect(renderMarkdown([hrEntry])).toBe(`---`);
    });
  });

  describe('with an Obsidian-esque identifier appended', () => {
    const hrEntry: HorizontalRuleEntry = {
      hr: '',
      append: '^heyo',
    };

    test('renders a horizontal rule with identifier below', () => {
      expect(renderMarkdown([hrEntry])).toBe(`---
^heyo`);
    });
  });
});
