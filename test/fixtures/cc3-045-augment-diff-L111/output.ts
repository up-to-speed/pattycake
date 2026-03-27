import { match } from 'ts-pattern';
declare const with: any;
declare const otherwise: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = [additions > 0, deletions > 0];
  if (Array.isArray(__patsy_temp_1) && __patsy_temp_1?.length >= 2 && __patsy_temp_1[0] === true && __patsy_temp_1[1] === true) {
    __result = "modify" as const;
    break __patsy_temp_0;
  }
  if (Array.isArray(__patsy_temp_1) && __patsy_temp_1?.length >= 2 && __patsy_temp_1[0] === false && __patsy_temp_1[1] === true) {
    __result = "delete" as const;
    break __patsy_temp_0;
  }
  if (Array.isArray(__patsy_temp_1) && __patsy_temp_1?.length >= 2 && __patsy_temp_1[0] === true && __patsy_temp_1[1] === false) {
    __result = "add" as const;
    break __patsy_temp_0;
  }
  __result = "add" as const;
  break __patsy_temp_0;
}
