import { transformAsync } from '@babel/core';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { babelPlugin } from '../src/plugin';

async function transformCode(source: string): Promise<string> {
  const result = await transformAsync(source, {
    babelrc: false,
    configFile: false,
    filename: 'test.ts',
    presets: ['@babel/preset-typescript'],
    plugins: [[babelPlugin, { disableOptionalChaining: false }]],
  });

  if (!result?.code) {
    throw new Error('Babel did not return transformed code');
  }

  return result.code;
}

async function importTransformedModule(source: string) {
  const code = await transformCode(source);
  const tempDir = fs.mkdtempSync(
    path.join(process.cwd(), '.pattycake-regression-'),
  );
  const filePath = path.join(tempDir, 'module.mjs');
  fs.writeFileSync(filePath, code, 'utf8');

  try {
    return await import(`${pathToFileURL(filePath).href}?t=${Date.now()}`);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

describe('regressions', () => {
  it('preserves ts-pattern equality semantics for expression patterns', async () => {
    const mod = await importTransformedModule(`
import { match } from 'ts-pattern';

const negZero = -0;
const nanCase = match(NaN)
  .with(NaN, () => 'matched')
  .otherwise(() => 'missed');
const negZeroCase = match(0)
  .with(negZero, () => 'matched')
  .otherwise(() => 'missed');

export { nanCase, negZeroCase };
`);

    expect(mod.nanCase).toBe('matched');
    expect(mod.negZeroCase).toBe('missed');
  });

  it.each([
    {
      title: 'rest parameters',
      code: `
import { match } from 'ts-pattern';

const actual = match(1)
  .with(1, (...args) => args.length)
  .otherwise(() => 0);

export { actual };
`,
      expected: 1,
    },
    {
      title: 'default parameters',
      code: `
import { match } from 'ts-pattern';

const actual = match(2)
  .with(2, (x = 1) => x)
  .otherwise(() => 0);

export { actual };
`,
      expected: 2,
    },
  ])('keeps handler params parseable for $title', async ({ code, expected }) => {
    const mod = await importTransformedModule(code);
    expect(mod.actual).toBe(expected);
  });
});
