import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  noExternal: [],
  external: [
    '@babel/core',
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-syntax-typescript',
    '@babel/helper-plugin-utils',
    '@babel/types',
    '@babel/traverse',
    'unplugin',
  ],
});
