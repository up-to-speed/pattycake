import { match, P } from 'ts-pattern';
declare const value: any;
let __result;
__patsy_temp_0: {
  if (!(value === "error")) {
    let v = value;
    __result = `ok: ${v}`;
    break __patsy_temp_0;
  }
  __result = 'was error';
  break __patsy_temp_0;
}
