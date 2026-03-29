import { match, P } from 'ts-pattern';

declare const value: any;

const __result = match(value)
  .with({ status: 200, body: P.unknown }, (v) => v.body)
  .otherwise(() => null);
