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

  // Bug: object-valued identifier patterns should match structurally, not by reference
  it('matches object-valued pattern constants structurally, not by reference', async () => {
    const mod = await importTransformedModule(`
import { match, P } from 'ts-pattern';

const pat = { type: 'ok' };
const actual = match({ type: 'ok' })
  .with(pat, () => 'matched')
  .otherwise(() => 'missed');

export { actual };
`);

    expect(mod.actual).toBe('matched');
  });

  // Bug: .otherwise() with rest parameter produces invalid JS
  it('otherwise() with rest parameter does not produce invalid code', async () => {
    const mod = await importTransformedModule(`
import { match } from 'ts-pattern';

const actual = match(42)
  .with(1, () => 'one')
  .otherwise((...args) => args.length);

export { actual };
`);

    expect(mod.actual).toBe(1);
  });

  // Bug: .otherwise() with default parameter produces invalid JS
  it('otherwise() with default parameter does not produce invalid code', async () => {
    const mod = await importTransformedModule(`
import { match } from 'ts-pattern';

const actual = match(42)
  .with(1, () => 'one')
  .otherwise((x = 1) => x);

export { actual };
`);

    expect(mod.actual).toBe(42);
  });

  // Bug: default initializer is dropped when inlining .with() handler
  it('preserves default initializer in .with() handler when value is undefined', async () => {
    const mod = await importTransformedModule(`
import { match, P } from 'ts-pattern';

const actual = match(undefined)
  .with(P._, (x = 1) => x)
  .otherwise(() => 'missed');

export { actual };
`);

    expect(mod.actual).toBe(1);
  });

  // Bug: P.select() captures leak across OR'd alternatives
  it('scopes P.select() captures to the matched alternative', async () => {
    const mod = await importTransformedModule(`
import { match, P } from 'ts-pattern';

const actual = match({ type: 'a', a: 10 })
  .with(
    { type: 'a', a: P.select('foo') },
    { type: 'b', b: P.select('bar') },
    (sel) => sel
  )
  .otherwise(() => 'missed');

export { actual };
`);

    expect(mod.actual).toEqual({ foo: 10 });
    expect(mod.actual).not.toHaveProperty('bar');
  });

  // Bug: void-returning match arms in IIFE mode fall through to exhaustive throw
  it('void callbacks in exhaustive match do not fall through to throw', async () => {
    const mod = await importTransformedModule(`
import { match } from 'ts-pattern';

let called = '';
function test(type) {
  match({ type })
    .with({ type: 'a' }, () => { called = 'a'; })
    .with({ type: 'b' }, () => { called = 'b'; })
    .with({ type: 'c' }, () => { called = 'c'; })
    .exhaustive();
}
test('b');

export { called };
`);

    expect(mod.called).toBe('b');
  });

  // Bug: rest parameter in handler with P.select() only gets selection, not both args
  it('passes both selection and matchExpr to rest parameter with P.select()', async () => {
    const mod = await importTransformedModule(`
import { match, P } from 'ts-pattern';

const input = { x: 1 };
const actual = match(input)
  .with({ x: P.select() }, (...args) => args)
  .otherwise(() => 'missed');

export { actual };
`);

    expect(mod.actual).toEqual([1, { x: 1 }]);
  });
});
