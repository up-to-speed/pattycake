import { match, P } from 'ts-pattern';
declare const value: any;
let __result;
__patsy_temp_0: {
  if (value instanceof Map && [...value].every(([__patsy_k, __patsy_v]) => typeof __patsy_k === "string" && typeof __patsy_v === "number")) {
    let m = value;
    __result = m.size;
    break __patsy_temp_0;
  }
  __result = 0;
  break __patsy_temp_0;
}
