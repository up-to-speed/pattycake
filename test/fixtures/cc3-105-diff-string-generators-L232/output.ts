import { match } from 'ts-pattern';
declare const kind: any;
declare const with: any;
declare const toGitDiff: any;
declare const generateModifiedCode: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (kind?.type === "new") {
    let k = kind;
    __result = toGitDiff(filePath, "", code, k);
    break __patsy_temp_0;
  }
  if (kind?.type === "deleted") {
    let k = kind;
    __result = toGitDiff(filePath, code, "", k);
    break __patsy_temp_0;
  }
  if (kind?.type === "modified") {
    __result = toGitDiff(filePath, code, generateModifiedCode(lineCount, filePath));
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(kind);
  } catch (e) {
    __patsy__displayedValue = kind;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
