import { match, P } from 'ts-pattern';
declare const ref: any;
declare const with: any;
declare const slice: any;
declare const exhaustive: any;
declare const branchRef: any;
declare const sha: any;
let __result;
__patsy_temp_0: {
  if (ref === WORKING_TREE) {
    __result = "working tree";
    break __patsy_temp_0;
  }
  if (ref === STAGED_ONLY) {
    __result = "staged";
    break __patsy_temp_0;
  }
  if (ref === HEAD) {
    __result = "HEAD";
    break __patsy_temp_0;
  }
  if (ref === DEFAULT_BRANCH) {
    __result = "default branch";
    break __patsy_temp_0;
  }
  if (ref === PARENT_BRANCH) {
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
