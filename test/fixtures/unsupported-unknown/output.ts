import { match, P } from 'ts-pattern';
declare const value: any;
let __result;
__patsy_temp_0: {
  if (value?.status === 200) {
    let v = value;
    __result = v.body;
    break __patsy_temp_0;
  }
  __result = null;
  break __patsy_temp_0;
}
