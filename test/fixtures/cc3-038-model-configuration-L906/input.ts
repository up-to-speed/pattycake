import { match, P } from 'ts-pattern';

declare const currentPref: any;
declare const with: any;
declare const hasValidAuth: any;
declare const exhaustive: any;

const __result = match(currentPref)
        .with({ mode: "builtin", builtin: P.string }, async ({ builtin }) => {
          return await this.hasValidAuth(builtin);
        })
        .with({ mode: "custom", custom: P.string }, ({ custom }) => {
          return !!this.customProviders[custom];
        })
        .exhaustive();