import { match, P } from 'ts-pattern';
declare const value: any;
let __result;
__patsy_temp_0: {
  if (value !== null && value !== undefined) {
    let v = value;
    __result = `got: ${v}`;
    break __patsy_temp_0;
  }
  __result = 'was nullish';
  break __patsy_temp_0;
}
