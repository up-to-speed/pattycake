import { match } from 'ts-pattern';
declare const languageCode: any;
declare const with: any;
declare const Chinese: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (languageCode === "en") {
    __result = "English";
    break __patsy_temp_0;
  }
  if (languageCode === "ja") {
    __result = "Japanese";
    break __patsy_temp_0;
  }
  if (languageCode === "pl") {
    __result = "Polish";
    break __patsy_temp_0;
  }
  if (languageCode === "ru") {
    __result = "Russian";
    break __patsy_temp_0;
  }
  if (languageCode === "zh") {
    __result = "Chinese (Simplified)";
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(languageCode);
  } catch (e) {
    __patsy__displayedValue = languageCode;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
