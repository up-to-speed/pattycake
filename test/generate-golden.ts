/**
 * Script to generate golden output files for fixtures.
 * Run with: npx tsx test/generate-golden.ts
 */
import { transformAsync } from '@babel/core';
import { babelPlugin } from '../src/plugin';
import * as fs from 'fs';
import * as path from 'path';

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

async function main() {
  const fixtureDirs = fs.readdirSync(fixturesDir).filter((name) => {
    const fullPath = path.join(fixturesDir, name);
    return (
      fs.statSync(fullPath).isDirectory() &&
      fs.existsSync(path.join(fullPath, 'input.ts'))
    );
  });

  let generated = 0;
  let skipped = 0;
  let errored = 0;

  for (const fixture of fixtureDirs) {
    const inputPath = path.join(fixturesDir, fixture, 'input.ts');
    const outputPath = path.join(fixturesDir, fixture, 'output.ts');

    if (fs.existsSync(outputPath)) {
      skipped++;
      continue;
    }

    const input = fs.readFileSync(inputPath, 'utf8');
    try {
      const output = await transformCode(input);
      fs.writeFileSync(outputPath, output + '\n');
      generated++;
      console.log(`  generated: ${fixture}`);
    } catch (err: any) {
      errored++;
      console.error(`  ERROR: ${fixture}: ${err.message}`);
    }
  }

  console.log(`\nDone: ${generated} generated, ${skipped} skipped, ${errored} errored`);
}

main();
