import { match, P } from 'ts-pattern';
declare const value: any;
let __result;
__patsy_temp_0: {
  if (value instanceof Set && [...value].every(__patsy_el => typeof __patsy_el === "number")) {
    let s = value;
    __result = [...s].reduce((a, b) => a + b, 0);
    break __patsy_temp_0;
  }
  __result = 0;
  break __patsy_temp_0;
}
