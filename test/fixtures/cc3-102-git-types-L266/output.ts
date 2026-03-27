import { match, P } from 'ts-pattern';
declare const ref: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (Object.is(ref, HEAD)) {
    __result = "HEAD";
    break __patsy_temp_0;
  }
  if (Object.is(ref, WORKING_TREE)) {
    throw new Error("WORKING_TREE cannot be converted to a git argument directly");
  }
  if (Object.is(ref, STAGED_ONLY)) {
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
