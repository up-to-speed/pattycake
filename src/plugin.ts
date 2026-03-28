import type { PluginItem, PluginObj } from '@babel/core';
import { transformAsync } from '@babel/core';
import pluginSyntaxJsx from '@babel/plugin-syntax-jsx';
import pluginSyntaxTypescript from '@babel/plugin-syntax-typescript';
import { declare } from '@babel/helper-plugin-utils';
import { createUnplugin } from 'unplugin';
import pattycakePlugin, { Opts } from './pattycake';

export type Options = Opts;

export const unplugin = createUnplugin((options: Opts) => {
  return {
    enforce: 'pre',
    name: 'pattycake',
    transformInclude(id: string) {
      return /\.[jt]s[x]?$/.test(id);
    },
    async transform(code: string, id: string) {
      // Fast bail: skip files that don't use ts-pattern
      if (!code.includes('ts-pattern')) {
        return null;
      }

      const plugins: PluginItem[] = [[pluginSyntaxJsx]];

      const isTypescript = /\.ts[x]?$/.test(id);
      if (isTypescript) {
        plugins.push([
          pluginSyntaxTypescript,
          { allExtensions: true, isTSX: id.endsWith('.tsx') },
        ]);
      }

      plugins.push([babelPlugin, options]);

      try {
        const result = await transformAsync(code, { plugins, filename: id });
        return result?.code || null;
      } catch {
        // Fall back to original code if pattycake can't handle this file
        return null;
      }
    },
  };
});

export const babelPlugin = declare((api, options: Opts) => {
  api.assertVersion(7);

  return pattycakePlugin(options);
});
