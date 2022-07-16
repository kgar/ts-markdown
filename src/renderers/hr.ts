export const hrRenderer = (
  entry: HorizontalRuleEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('hr' in entry) {
    return '---';
  }

  throw new Error('Entry is not an hr entry. Unable to render.');
};