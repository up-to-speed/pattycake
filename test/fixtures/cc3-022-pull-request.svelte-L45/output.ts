import { match } from 'ts-pattern';
declare const result: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (result?.success === true) {
    let {
      url
    } = result;
    __result = url;
    break __patsy_temp_0;
  }
  if (result?.success === false) {
    let {
      error
    } = result;
    throw new Error(error);
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(result);
  } catch (e) {
    __patsy__displayedValue = result;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
