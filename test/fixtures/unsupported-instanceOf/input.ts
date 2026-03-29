import { match, P } from 'ts-pattern';

declare const value: any;
declare const TypeError: any;
declare const RangeError: any;

const __result = match(value)
  .with(P.instanceOf(TypeError), (e) => `type error: ${e.message}`)
  .with(P.instanceOf(RangeError), (e) => `range error: ${e.message}`)
  .otherwise(() => 'unknown error');
