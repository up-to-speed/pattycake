import { match } from 'ts-pattern';
declare const change: any;
declare const with: any;
declare const push: any;
declare const lines: any;
declare const exhaustive: any;
declare const oldLines: any;
declare const c: any;
declare const newLines: any;
let __result;
__patsy_temp_0: {
  if (change?.type === "DeletedLine") {
    let c = change;
    oldLines.push(c.content);
  }
  if (change?.type === "AddedLine") {
    let c = change;
    newLines.push(c.content);
  }
  if (change?.type === "UnchangedLine") {
    let c = change;
    oldLines.push(c.content);
    newLines.push(c.content);
  }
  if (change?.type === "MessageLine") {}
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(change);
  } catch (e) {
    __patsy__displayedValue = change;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
