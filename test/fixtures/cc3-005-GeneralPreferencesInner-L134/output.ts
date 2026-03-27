import { match } from 'ts-pattern';
declare const newLevel: any;
declare const with: any;
declare const t: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (newLevel === "all") {
    __result = t("Telemetry enabled");
    break __patsy_temp_0;
  }
  if (newLevel === "crashes_only") {
    __result = t("Crash reports only");
    break __patsy_temp_0;
  }
  if (newLevel === "none") {
    __result = t("Telemetry disabled");
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(newLevel);
  } catch (e) {
    __patsy__displayedValue = newLevel;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
