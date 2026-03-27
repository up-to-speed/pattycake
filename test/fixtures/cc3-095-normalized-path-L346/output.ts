import { match } from 'ts-pattern';
declare const platform: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (platform === "windows") {
    __result = true;
    break __patsy_temp_0;
  }
  if (platform === "mac") {
    __result = true;
    break __patsy_temp_0;
  }
  if (platform === "linux") {
    __result = false;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(platform);
  } catch (e) {
    __patsy__displayedValue = platform;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
