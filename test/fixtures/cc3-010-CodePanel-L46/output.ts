import { match } from 'ts-pattern';
declare const line: any;
declare const with: any;
declare const exhaustive: any;
declare const l: any;
let __result;
__patsy_temp_0: {
  if (line?.type === "removed") {
    let l = line;
    __result = l.oldLineNumber;
    break __patsy_temp_0;
  }
  if (line?.type === "added") {
    let l = line;
    __result = l.newLineNumber;
    break __patsy_temp_0;
  }
  if (line?.type === "unchanged") {
    let l = line;
    __result = preferSide === "old" ? l.oldLineNumber : l.newLineNumber;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(line);
  } catch (e) {
    __patsy__displayedValue = line;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
