import { match, P } from 'ts-pattern';
declare const commitReference: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (typeof STAGED_ONLY === "object" && STAGED_ONLY !== null ? Object.keys(STAGED_ONLY).every(k => commitReference != null && Object.is(commitReference[k], STAGED_ONLY[k])) : Object.is(commitReference, STAGED_ONLY)) {
    __result = isStagedFileError;
    break __patsy_temp_0;
  }
  if (typeof WORKING_TREE === "object" && WORKING_TREE !== null ? Object.keys(WORKING_TREE).every(k => commitReference != null && Object.is(commitReference[k], WORKING_TREE[k])) : Object.is(commitReference, WORKING_TREE)) {
    __result = false;
    break __patsy_temp_0;
  }
  if (typeof HEAD === "object" && HEAD !== null ? Object.keys(HEAD).every(k => commitReference != null && Object.is(commitReference[k], HEAD[k])) : Object.is(commitReference, HEAD)) {
    __result = false;
    break __patsy_temp_0;
  }
  if (typeof DEFAULT_BRANCH === "object" && DEFAULT_BRANCH !== null ? Object.keys(DEFAULT_BRANCH).every(k => commitReference != null && Object.is(commitReference[k], DEFAULT_BRANCH[k])) : Object.is(commitReference, DEFAULT_BRANCH)) {
    __result = false;
    break __patsy_temp_0;
  }
  if (typeof PARENT_BRANCH === "object" && PARENT_BRANCH !== null ? Object.keys(PARENT_BRANCH).every(k => commitReference != null && Object.is(commitReference[k], PARENT_BRANCH[k])) : Object.is(commitReference, PARENT_BRANCH)) {
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