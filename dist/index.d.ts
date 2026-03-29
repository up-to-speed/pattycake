import * as unplugin from 'unplugin';
import * as _vite from 'vite';
import * as _babel_core from '@babel/core';

type HirCodegenOpts = {
    /**
     * For some reason ts-pattern allows you to pattern match on arbitrary types that are unrelated to the expression being matched upon. As a result, optional chaining `foo?.bar?.baz` is necessary to avoid `property of undefined` errors. This incurs an additional runtime overhead, but you can disable it here.
     * */
    disableOptionalChaining: boolean;
    mute?: boolean;
    /**
     * When true, throw an error if any match() expression cannot be fully
     * compiled (instead of silently falling back to ts-pattern runtime).
     * Use this in builds where you want to guarantee all match() calls are
     * compiled away.
     */
    hardFail?: boolean;
};

type Opts = HirCodegenOpts;

type Options = Opts;

declare const babel: (api: object, options: HirCodegenOpts | null | undefined, dirname: string) => _babel_core.PluginObj<_babel_core.PluginPass>;
declare const vite: (options: HirCodegenOpts) => _vite.Plugin | _vite.Plugin[];
declare const webpack: (options: HirCodegenOpts) => WebpackPluginInstance;
declare const rollup: (options: HirCodegenOpts) => unplugin.RollupPlugin<any> | unplugin.RollupPlugin<any>[];
declare const rspack: (options: HirCodegenOpts) => RspackPluginInstance;
declare const esbuild: (options: HirCodegenOpts) => unplugin.EsbuildPlugin;
declare const next: (nextConfig: Record<string, any> | undefined, options: Options) => {
    webpack(config: Record<string, any>, webpackOptions: Record<string, any>): any;
};
declare const _default: {
    vite: (options: HirCodegenOpts) => _vite.Plugin | _vite.Plugin[];
    webpack: (options: HirCodegenOpts) => WebpackPluginInstance;
    rollup: (options: HirCodegenOpts) => unplugin.RollupPlugin<any> | unplugin.RollupPlugin<any>[];
    rspack: (options: HirCodegenOpts) => RspackPluginInstance;
    esbuild: (options: HirCodegenOpts) => unplugin.EsbuildPlugin;
    next: (nextConfig: Record<string, any> | undefined, options: Options) => {
        webpack(config: Record<string, any>, webpackOptions: Record<string, any>): any;
    };
    unplugin: unplugin.UnpluginInstance<HirCodegenOpts, boolean>;
    babel: (api: object, options: HirCodegenOpts | null | undefined, dirname: string) => _babel_core.PluginObj<_babel_core.PluginPass>;
};

export { babel, _default as default, esbuild, next, rollup, rspack, vite, webpack };
