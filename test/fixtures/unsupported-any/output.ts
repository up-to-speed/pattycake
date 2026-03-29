import { match, P } from 'ts-pattern';
declare const value: any;
let __result;
__patsy_temp_0: {
  if (value?.type === "ok") {
    let v = value;
    __result = v.data;
    break __patsy_temp_0;
  }
  __result = null;
  break __patsy_temp_0;
}
