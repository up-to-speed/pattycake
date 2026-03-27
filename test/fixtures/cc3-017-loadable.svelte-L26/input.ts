import { match } from 'ts-pattern';

declare const loadable: any;
declare const with: any;
declare const exhaustive: any;
declare const state: any;

const __result = match(loadable)
      .with({ type: "loading" }, () => defaultValue)
      .with({ type: "loaded" }, (state) => state.data)
      .with({ type: "error" }, () => defaultValue)
      .exhaustive();