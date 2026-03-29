import { match, P } from 'ts-pattern';
declare const value: any;
declare const TypeError: any;
declare const RangeError: any;
let __result;
__patsy_temp_0: {
  if (value instanceof TypeError) {
    let e = value;
    __result = `type error: ${e.message}`;
    break __patsy_temp_0;
  }
  if (value instanceof RangeError) {
    let e = value;
    __result = `range error: ${e.message}`;
    break __patsy_temp_0;
  }
  __result = 'unknown error';
  break __patsy_temp_0;
}
