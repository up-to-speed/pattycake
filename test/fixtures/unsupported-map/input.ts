import { match, P } from 'ts-pattern';

declare const value: any;

const __result = match(value)
  .with(P.map(P.string, P.number), (m) => m.size)
  .otherwise(() => 0);
