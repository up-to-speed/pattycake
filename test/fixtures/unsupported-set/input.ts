import { match, P } from 'ts-pattern';

declare const value: any;

const __result = match(value)
  .with(P.set(P.number), (s) => [...s].reduce((a, b) => a + b, 0))
  .otherwise(() => 0);
