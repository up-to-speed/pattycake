import { match } from 'ts-pattern';
declare const loadable: any;
declare const with: any;
declare const exhaustive: any;
declare const state: any;
let __result;
__patsy_temp_0: {
  if (loadable?.type === "loading") {
    __result = defaultValue;
    break __patsy_temp_0;
  }
  if (loadable?.type === "loaded") {
    let state = loadable;
    __result = state.data;
    break __patsy_temp_0;
  }
  if (loadable?.type === "error") {
    __result = defaultValue;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(loadable);
  } catch (e) {
    __patsy__displayedValue = loadable;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
