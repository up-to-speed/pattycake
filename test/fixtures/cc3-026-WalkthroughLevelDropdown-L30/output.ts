import { match } from 'ts-pattern';
declare const level: any;
declare const with: any;
declare const t: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (level === "light") {
    __result = t("Light");
    break __patsy_temp_0;
  }
  if (level === "medium") {
    __result = t("Medium");
    break __patsy_temp_0;
  }
  if (level === "heavy") {
    __result = t("Heavy");
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(level);
  } catch (e) {
    __patsy__displayedValue = level;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
