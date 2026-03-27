import { match, P } from 'ts-pattern';
declare const p: any;
declare const with: any;
declare const exhaustive: any;
declare const r: any;
declare const progress: any;
let __result;
__patsy_temp_0: {
  if (p?.status === "completed") {
    __result = 100;
    break __patsy_temp_0;
  }
  if (p?.status === "running") {
    let r = p;
    __result = r.progress.percentageDone;
    break __patsy_temp_0;
  }
  if (p?.status === "failed") {
    __result = undefined;
    break __patsy_temp_0;
  }
  if (p?.status === "cancelled") {
    __result = undefined;
    break __patsy_temp_0;
  }
  if (p == null) {
    __result = undefined;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(p);
  } catch (e) {
    __patsy__displayedValue = p;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
