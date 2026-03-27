import { match } from 'ts-pattern';

declare const loadable: any;
declare const with: any;
declare const loaded: any;
declare const fn: any;
declare const exhaustive: any;
declare const state: any;

const __result = match(loadable)
      .with({ type: "loading" }, () => loading<U>())
      .with({ type: "loaded" }, (state) => loaded(fn(state.data)))
      .with({ type: "error" }, (state) => error<U>(state.message))
      .exhaustive();