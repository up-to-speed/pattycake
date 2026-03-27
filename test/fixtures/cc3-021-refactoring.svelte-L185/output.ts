import { match } from 'ts-pattern';
declare const progress: any;
declare const with: any;
declare const onFailureNotify: any;
declare const onCompleteNotify: any;
declare const exhaustive: any;
declare const config: any;
declare const p: any;
let __result;
__patsy_temp_0: {
  if (progress?.status === "failed") {
    let p = progress;
    __result = () => this.config.onFailureNotify(p.error);
    break __patsy_temp_0;
  }
  if (progress?.status === "completed") {
    __result = () => this.config.onCompleteNotify();
    break __patsy_temp_0;
  }
  if (progress?.status === "cancelled") {
    __result = () => this.config.onCancelledNotify?.();
    break __patsy_temp_0;
  }
  if (progress?.status === "running") {
    __result = undefined;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(progress);
  } catch (e) {
    __patsy__displayedValue = progress;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
