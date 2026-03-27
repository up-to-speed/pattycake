import { match } from 'ts-pattern';
declare const change: any;
declare const with: any;
declare const push: any;
declare const extendRangeListMutate: any;
declare const lines: any;
declare const exhaustive: any;
declare const result: any;
declare const oldLines: any;
declare const delChange: any;
declare const LineRange: any;
declare const newLines: any;
declare const addChange: any;
let __result;
__patsy_temp_0: {
  if (change?.type === "DeletedLine") {
    let delChange = change;
    result.deletions++;
    result.oldLines.push(delChange.content);
    LineRange.extendRangeListMutate(deletedLineRanges, delChange.lineBefore);
  }
  if (change?.type === "AddedLine") {
    let addChange = change;
    result.additions++;
    result.newLines.push(addChange.content);
    LineRange.extendRangeListMutate(addedLineRanges, addChange.lineAfter);
  }
  if (change?.type === "UnchangedLine") {
    let _ = change;
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
