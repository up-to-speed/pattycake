import { match, P } from 'ts-pattern';

declare const value: any;

const __result = match(value)
  .with(P.not('error'), (v) => `ok: ${v}`)
  .otherwise(() => 'was error');
