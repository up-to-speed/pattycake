import { match } from 'ts-pattern';
declare const change: any;
declare const with: any;
declare const bufferRemovedLine: any;
declare const bufferAddedLine: any;
declare const processUnchangedLine: any;
declare const lines: any;
declare const exhaustive: any;
declare const builder: any;
declare const r: any;
let __result;
__patsy_temp_0: {
  if (change?.type === "DeletedLine") {
    let r = change;
    builder.bufferRemovedLine(r.content);
  }
  if (change?.type === "AddedLine") {
    let r = change;
    builder.bufferAddedLine(r.content);
  }
  if (change?.type === "UnchangedLine") {
    let r = change;
    builder.processUnchangedLine(r.content);
  }
  if (change?.type === "MessageLine") {
    let _ = change;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(change);
  } catch (e) {
    __patsy__displayedValue = change;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
