import { match, P } from 'ts-pattern';
declare const ref: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (typeof HEAD === "object" && HEAD !== null ? Object.keys(HEAD).every(k => ref != null && Object.is(ref[k], HEAD[k])) : Object.is(ref, HEAD)) {
    __result = "HEAD";
    break __patsy_temp_0;
  }
  if (typeof WORKING_TREE === "object" && WORKING_TREE !== null ? Object.keys(WORKING_TREE).every(k => ref != null && Object.is(ref[k], WORKING_TREE[k])) : Object.is(ref, WORKING_TREE)) {
    throw new Error("WORKING_TREE cannot be converted to a git argument directly");
  }
  if (typeof STAGED_ONLY === "object" && STAGED_ONLY !== null ? Object.keys(STAGED_ONLY).every(k => ref != null && Object.is(ref[k], STAGED_ONLY[k])) : Object.is(ref, STAGED_ONLY)) {
    throw new Error("STAGED_ONLY cannot be converted to a git argument directly");
  }
  if (typeof ref === "string") {
    let sha = ref;
    __result = sha;
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