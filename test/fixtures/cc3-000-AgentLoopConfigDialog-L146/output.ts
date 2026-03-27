import { match } from 'ts-pattern';
declare const action: any;
declare const with: any;
declare const exhaustive: any;
declare const a: any;
let __result;
__patsy_temp_0: {
  if (action?.type === "prompt") {
    let a = action;
    __result = a.content;
    break __patsy_temp_0;
  }
  if (action?.type === "command") {
    let a = action;
    __result = a.command;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(action);
  } catch (e) {
    __patsy__displayedValue = action;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
