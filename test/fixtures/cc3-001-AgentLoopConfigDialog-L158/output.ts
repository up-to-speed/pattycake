import { match } from 'ts-pattern';
declare const newType: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (newType === "prompt") {
    __result = {
      type: "prompt" as const,
      content: text
    };
    break __patsy_temp_0;
  }
  if (newType === "command") {
    __result = {
      type: "command" as const,
      command: text
    };
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(newType);
  } catch (e) {
    __patsy__displayedValue = newType;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
