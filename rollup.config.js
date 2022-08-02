// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: './dist.browser/ts-markdown.js',
    format: 'iife',
    name: 'tsMarkdown',
  },
  plugins: [typescript()],
};
