import { match, P } from 'ts-pattern';
declare const ref: any;
declare const with: any;
declare const slice: any;
declare const exhaustive: any;
declare const branchRef: any;
declare const sha: any;
let __result;
__patsy_temp_0: {
  if (typeof WORKING_TREE === "object" && WORKING_TREE !== null ? Object.keys(WORKING_TREE).every(k => ref != null && Object.is(ref[k], WORKING_TREE[k])) : Object.is(ref, WORKING_TREE)) {
    __result = "working tree";
    break __patsy_temp_0;
  }
  if (typeof STAGED_ONLY === "object" && STAGED_ONLY !== null ? Object.keys(STAGED_ONLY).every(k => ref != null && Object.is(ref[k], STAGED_ONLY[k])) : Object.is(ref, STAGED_ONLY)) {
    __result = "staged";
    break __patsy_temp_0;
  }
  if (typeof HEAD === "object" && HEAD !== null ? Object.keys(HEAD).every(k => ref != null && Object.is(ref[k], HEAD[k])) : Object.is(ref, HEAD)) {
    __result = "HEAD";
    break __patsy_temp_0;
  }
  if (typeof DEFAULT_BRANCH === "object" && DEFAULT_BRANCH !== null ? Object.keys(DEFAULT_BRANCH).every(k => ref != null && Object.is(ref[k], DEFAULT_BRANCH[k])) : Object.is(ref, DEFAULT_BRANCH)) {
    __result = "default branch";
    break __patsy_temp_0;
  }
  if (typeof PARENT_BRANCH === "object" && PARENT_BRANCH !== null ? Object.keys(PARENT_BRANCH).every(k => ref != null && Object.is(ref[k], PARENT_BRANCH[k])) : Object.is(ref, PARENT_BRANCH)) {
    __result = "parent branch";
    break __patsy_temp_0;
  }
  if (ref?.type === "branch") {
    let branchRef = ref;
    __result = branchRef.name;
    break __patsy_temp_0;
  }
  if (typeof ref === "string") {
    let sha = ref;
    __result = sha.length > 7 ? sha.slice(0, 7) : sha;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(ref);
  } catch (e) {
    __patsy__displayedValue = ref;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}