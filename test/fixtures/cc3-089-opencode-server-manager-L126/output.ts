import { match } from 'ts-pattern';
declare const with: any;
declare const t: any;
declare const exhaustive: any;
declare const BUNDLED_MODEL: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = this.mode;
  if (__patsy_temp_1?.type === "bundled") {
    __result = BUNDLED_MODEL.displayName;
    break __patsy_temp_0;
  }
  if (__patsy_temp_1?.type === "system") {
    __result = t("OpenCode's configured model");
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(__patsy_temp_1);
  } catch (e) {
    __patsy__displayedValue = __patsy_temp_1;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
