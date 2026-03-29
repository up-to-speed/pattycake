import { match, P } from 'ts-pattern';
declare const value: any;
let __result;
__patsy_temp_0: {
  if (Array.isArray(value) && value.every(__patsy_el => __patsy_el?.type === "ok")) {
    let items = value;
    __result = items.length;
    break __patsy_temp_0;
  }
  __result = 0;
  break __patsy_temp_0;
}
