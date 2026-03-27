import { match, P } from 'ts-pattern';
declare const currentPref: any;
declare const with: any;
declare const hasValidAuth: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (currentPref?.mode === "builtin" && typeof currentPref?.builtin === "string") {
    let {
      builtin
    } = currentPref;
    __result = await this.hasValidAuth(builtin);
    break __patsy_temp_0;
  }
  if (currentPref?.mode === "custom" && typeof currentPref?.custom === "string") {
    let {
      custom
    } = currentPref;
    __result = !!this.customProviders[custom];
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(currentPref);
  } catch (e) {
    __patsy__displayedValue = currentPref;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
