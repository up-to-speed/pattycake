import { match, P } from 'ts-pattern';
declare const ref: any;
declare const with: any;
declare const exhaustive: any;
declare const branchRef: any;
let __result;
__patsy_temp_0: {
  if (Object.is(ref, WORKING_TREE)) {
    __result = WORKING_TREE_STRING;
    break __patsy_temp_0;
  }
  if (Object.is(ref, STAGED_ONLY)) {
    __result = STAGED_ONLY_STRING;
    break __patsy_temp_0;
  }
  if (Object.is(ref, HEAD)) {
    __result = HEAD_STRING;
    break __patsy_temp_0;
  }
  if (Object.is(ref, DEFAULT_BRANCH)) {
    __result = DEFAULT_BRANCH_STRING;
    break __patsy_temp_0;
  }
  if (Object.is(ref, PARENT_BRANCH)) {
    __result = PARENT_BRANCH_STRING;
    break __patsy_temp_0;
  }
  if (ref?.type === "branch") {
    let branchRef = ref;
    __result = `${BRANCH_PREFIX}${branchRef.name}`;
    break __patsy_temp_0;
  }
  if (typeof ref === "string") {
    let sha = ref;
    __result = sha as string;
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
