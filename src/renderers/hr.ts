export const hrRenderer = (
  entry: HorizontalRuleEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('hr' in entry) {
    let indicator = entry.indicator ?? '-';
    return `${indicator}${indicator}${indicator}`;
  }

  throw new Error('Entry is not an hr entry. Unable to render.');
};
