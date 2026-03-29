import { match, P } from 'ts-pattern';

declare const value: any;

const __result = match(value)
  .with(P.nonNullable, (v) => `got: ${v}`)
  .otherwise(() => 'was nullish');
