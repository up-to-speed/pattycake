import { match } from 'ts-pattern';
declare const op: any;
declare const with: any;
declare const set: any;
declare const map: any;
declare const exhaustive: any;
declare const o: any;
declare const hunks: any;
declare const changes: any;
declare const Hunk: any;
declare const renames: any;
let __result;
__patsy_temp_0: {
  if (op?.type === "change") {
    let o = op;
    if (o.hunks.length > 0) {
      changes.set(o.path, o.hunks.map(Hunk.clone));
    }
  }
  if (op?.type === "rename") {
    let o = op;
    renames.set(o.pathBefore, {
      pathAfter: o.pathAfter,
      hunks: o.hunks.map(Hunk.clone)
    });
  }
  if (op?.type === "creation") {
    let o = op;
    // Convert creation to a hunk that adds all lines
    const creationHunk: Hunk = {
      oldStartLine: 0,
      oldLines: [],
      newStartLine: 1,
      newLines: [...o.contents]
    };
    changes.set(o.path, [creationHunk]);
  }
  if (op?.type === "deletion") {
    let o = op;
    const deletionHunk: Hunk = {
      oldStartLine: 1,
      oldLines: [...o.contents],
      newStartLine: 0,
      newLines: []
    };
    changes.set(o.path, [deletionHunk]);
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(op);
  } catch (e) {
    __patsy__displayedValue = op;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
