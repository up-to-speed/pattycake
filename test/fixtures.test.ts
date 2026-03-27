import { transformAsync } from '@babel/core';
import { babelPlugin } from '../src/plugin';
import * as fs from 'fs';
import * as path from 'path';
import { describe, it, expect } from 'vitest';

const fixturesDir = path.join(__dirname, 'fixtures');

async function transformCode(code: string): Promise<string> {
  const result = await transformAsync(code, {
    plugins: [
      ['@babel/plugin-syntax-typescript', { allExtensions: true }],
      [babelPlugin, { disableOptionalChaining: false }],
    ],
    filename: 'test.ts',
  });
  return result?.code || '';
}

function normalizeWhitespace(code: string): string {
  return code
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}

const fixtureDirs = fs.readdirSync(fixturesDir).filter((name) => {
  const fullPath = path.join(fixturesDir, name);
  return (
    fs.statSync(fullPath).isDirectory() &&
    fs.existsSync(path.join(fullPath, 'input.ts')) &&
    fs.existsSync(path.join(fullPath, 'output.ts'))
  );
});

describe('fixtures', () => {
  for (const fixture of fixtureDirs) {
    it(fixture, async () => {
      const inputPath = path.join(fixturesDir, fixture, 'input.ts');
      const outputPath = path.join(fixturesDir, fixture, 'output.ts');

      const input = fs.readFileSync(inputPath, 'utf8');
      const expectedOutput = fs.readFileSync(outputPath, 'utf8');

      const actualOutput = await transformCode(input);

      expect(normalizeWhitespace(actualOutput)).toBe(
        normalizeWhitespace(expectedOutput),
      );
    });
  }
});
