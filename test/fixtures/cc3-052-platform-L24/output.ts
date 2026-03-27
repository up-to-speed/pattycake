import { match } from 'ts-pattern';
declare const with: any;
declare const otherwise: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = process.platform;
  if (__patsy_temp_1 === "darwin") {
    __result = "mac" as const;
    break __patsy_temp_0;
  }
  if (__patsy_temp_1 === "win32") {
    __result = "windows" as const;
    break __patsy_temp_0;
  }
  __result = "linux" as const;
  break __patsy_temp_0;
}
