import { match } from 'ts-pattern';
declare const preset: any;
declare const with: any;
declare const toLocaleDateString: any;
declare const toLocaleString: any;
declare const toLocaleTimeString: any;
declare const exhaustive: any;
declare const date: any;
let __result;
__patsy_temp_0: {
  if (preset === "date") {
    __result = date.toLocaleDateString(locale, formatOptions);
    break __patsy_temp_0;
  }
  if (preset === "datetime") {
    __result = date.toLocaleString(locale, formatOptions);
    break __patsy_temp_0;
  }
  if (preset === "time") {
    __result = date.toLocaleTimeString(locale, formatOptions);
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(preset);
  } catch (e) {
    __patsy__displayedValue = preset;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
