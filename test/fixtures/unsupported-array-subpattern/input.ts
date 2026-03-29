import { match, P } from 'ts-pattern';

declare const value: any;

const __result = match(value)
  .with(P.array({ type: 'ok' }), (items) => items.length)
  .otherwise(() => 0);
