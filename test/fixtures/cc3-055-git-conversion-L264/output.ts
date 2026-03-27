import { match } from 'ts-pattern';
declare const op: any;
declare const with: any;
declare const detectChangeType: any;
declare const push: any;
declare const renderFileChange: any;
declare const exhaustive: any;
declare const o: any;
declare const lines: any;
declare const hunks: any;
let __result;
__patsy_temp_0: {
  if (op?.type === "change") {
    let o = op;
    const changeType = detectChangeType(o.hunks);
    lines.push(...renderFileChange(o.path, o.path, o.hunks, changeType));
  }
  if (op?.type === "rename") {
    let o = op;
    const changeType = o.hunks.length > 0 ? "rename-modify" : "rename";
    lines.push(...renderFileChange(o.pathBefore, o.pathAfter, o.hunks, changeType));
  }
  if (op?.type === "creation") {
    let o = op;
    // Convert creation to a hunk
    const hunks: Hunk[] = [{
      oldStartLine: 0,
      oldLines: [],
      newStartLine: 1,
      newLines: [...o.contents]
    }];
    lines.push(...renderFileChange(o.path, o.path, hunks, "add"));
  }
  if (op?.type === "deletion") {
    let o = op;
    const hunks: Hunk[] = [{
      oldStartLine: 1,
      oldLines: [...o.contents],
      newStartLine: 0,
      newLines: []
    }];
    lines.push(...renderFileChange(o.path, o.path, hunks, "delete"));
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(op);
  } catch (e) {
    __patsy__displayedValue = op;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
