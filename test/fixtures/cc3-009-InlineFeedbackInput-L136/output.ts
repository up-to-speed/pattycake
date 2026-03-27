import { match } from 'ts-pattern';
declare const result: any;
declare const with: any;
declare const success: any;
declare const t: any;
declare const exhaustive: any;
declare const toast: any;
let __result;
__patsy_temp_0: {
  if (result === "current") {
    __result = toast.success(t("Feedback sent to current agent"));
    break __patsy_temp_0;
  }
  if (result === "new") {
    __result = toast.success(t("No active agent - feedback sent to new agent"));
    break __patsy_temp_0;
  }
  if (result === "no-workspace") {}
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(result);
  } catch (e) {
    __patsy__displayedValue = result;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
