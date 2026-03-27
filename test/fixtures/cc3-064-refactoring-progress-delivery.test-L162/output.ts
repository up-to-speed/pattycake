import { match } from 'ts-pattern';
declare const outcome: any;
declare const with: any;
declare const completed: any;
declare const cancelled: any;
declare const failed: any;
declare const exhaustive: any;
declare const TaskProgress: any;
declare const error: any;
let __result;
__patsy_temp_0: {
  if (outcome?.status === "success") {
    __result = TaskProgress.completed();
    break __patsy_temp_0;
  }
  if (outcome?.status === "cancelled") {
    __result = TaskProgress.cancelled();
    break __patsy_temp_0;
  }
  if (outcome?.status === "failed") {
    let {
      message
    } = outcome;
    __result = TaskProgress.failed(message);
    break __patsy_temp_0;
  }
  if (outcome?.status === "exception") {
    let {
      error
    } = outcome;
    __result = TaskProgress.failed(error.message);
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(outcome);
  } catch (e) {
    __patsy__displayedValue = outcome;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
