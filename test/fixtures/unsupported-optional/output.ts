import { match, P } from 'ts-pattern';
declare const value: any;
let __result;
__patsy_temp_0: {
  if (typeof value?.name === "string" && (value?.age === undefined || typeof value?.age === "number")) {
    let v = value;
    __result = `${v.name} age ${v.age ?? 'unknown'}`;
    break __patsy_temp_0;
  }
  __result = 'no match';
  break __patsy_temp_0;
}
