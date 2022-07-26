import { tsMarkdown } from '../rendering';
import { header } from './header';

describe('given general header helpers with level property', () => {
  const headers = [
    header(1, 'Hello, world!'),
    header(2, 'Hello, world!'),
    header(3, 'Hello, world!'),
    header(4, 'Hello, world!'),
    header(5, 'Hello, world!'),
    header(6, 'Hello, world!'),
  ];

  test('renders headers at the specified levels', () => {
    expect(tsMarkdown(headers)).toBe(
      `# Hello, world!

## Hello, world!

### Hello, world!

#### Hello, world!

##### Hello, world!

###### Hello, world!`
    );
  });
});
