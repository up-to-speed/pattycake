import { match, P } from 'ts-pattern';

declare const value: any;

const __result = match(value)
  .with({ type: 'ok', data: P.any }, (v) => v.data)
  .otherwise(() => null);
