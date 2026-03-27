import { match } from 'ts-pattern';
declare const relation: any;
declare const with: any;
declare const extractHunkDiff: any;
declare const isEmpty: any;
declare const push: any;
declare const clone: any;
declare const exhaustive: any;
declare const Hunk: any;
declare const result: any;
let __result;
__patsy_temp_0: {
  if (relation?.type === "identical") {
    // Hunks match exactly - no difference needed
    aIdx++;
    bIdx++;
    __result = "ok" as const;
    break __patsy_temp_0;
  }
  if (relation?.type === "overlapping" || relation?.type === "same-position") {
    // Need to extract the incremental difference
    const diff = extractHunkDiff(bHunk, aHunk);
    if (diff === null) {
      __result = "diff-null" as const;
      break __patsy_temp_0;
    }
    if (!Hunk.isEmpty(diff)) {
      result.push(diff);
    }
    aIdx++;
    bIdx++;
    __result = "ok" as const;
    break __patsy_temp_0;
  }
  if (relation?.type === "independent") {
    // b hunk is independent - add it directly
    result.push(Hunk.clone(bHunk));
    bIdx++;
    __result = "ok" as const;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(relation);
  } catch (e) {
    __patsy__displayedValue = relation;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
