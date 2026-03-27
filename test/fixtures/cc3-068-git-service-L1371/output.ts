import { match, P } from 'ts-pattern';
declare const commitReference: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (commitReference === STAGED_ONLY) {
    __result = isStagedFileError;
    break __patsy_temp_0;
  }
  if (commitReference === WORKING_TREE) {
    __result = false;
    break __patsy_temp_0;
  }
  if (commitReference === HEAD) {
    __result = false;
    break __patsy_temp_0;
  }
  if (commitReference === DEFAULT_BRANCH) {
    __result = false;
    break __patsy_temp_0;
  }
  if (commitReference === PARENT_BRANCH) {
    __result = false;
    break __patsy_temp_0;
  }
  if (commitReference?.type === "branch") {
    __result = false;
    break __patsy_temp_0;
  }
  if (typeof commitReference === "string") {
    __result = false;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(commitReference);
  } catch (e) {
    __patsy__displayedValue = commitReference;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
