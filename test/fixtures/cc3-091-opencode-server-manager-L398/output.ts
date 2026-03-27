import { match } from 'ts-pattern';
declare const with: any;
declare const buildBundledConfig: any;
declare const buildSystemConfig: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = this.mode;
  if (__patsy_temp_1?.type === "bundled") {
    __result = this.buildBundledConfig();
    break __patsy_temp_0;
  }
  if (__patsy_temp_1?.type === "system") {
    __result = this.buildSystemConfig();
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
