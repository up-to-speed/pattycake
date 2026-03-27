import { match } from 'ts-pattern';
declare const mimeType: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (mimeType === "image/png") {
    __result = ".png";
    break __patsy_temp_0;
  }
  if (mimeType === "image/jpeg") {
    __result = ".jpg";
    break __patsy_temp_0;
  }
  if (mimeType === "image/webp") {
    __result = ".webp";
    break __patsy_temp_0;
  }
  if (mimeType === "image/gif") {
    __result = ".gif";
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(mimeType);
  } catch (e) {
    __patsy__displayedValue = mimeType;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
