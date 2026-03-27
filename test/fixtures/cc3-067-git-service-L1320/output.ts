import { match, P } from 'ts-pattern';
declare const commitReference: any;
declare const with: any;
declare const runWithShadowCheck: any;
declare const showStagedFile: any;
declare const join: any;
declare const readFile: any;
declare const showFile: any;
declare const resolveGitRef: any;
declare const exhaustive: any;
declare const MonitoredGitOps: any;
declare const pathModule: any;
declare const fs: any;
let __result;
__patsy_temp_0: {
  if (typeof STAGED_ONLY === "object" && STAGED_ONLY !== null ? Object.keys(STAGED_ONLY).every(k => commitReference != null && Object.is(commitReference[k], STAGED_ONLY[k])) : Object.is(commitReference, STAGED_ONLY)) {
    // For staged files, use the index/staging area
    __result = runWithShadowCheck(MonitoredGitOps.showStagedFile(path, filePath));
    break __patsy_temp_0;
  }
  if (typeof WORKING_TREE === "object" && WORKING_TREE !== null ? Object.keys(WORKING_TREE).every(k => commitReference != null && Object.is(commitReference[k], WORKING_TREE[k])) : Object.is(commitReference, WORKING_TREE)) {
    // For working tree, just read the file directly
    const fs = await import("node:fs/promises");
    const fullPath = pathModule.join(path, filePath);
    __result = await fs.readFile(fullPath, "utf8");
    break __patsy_temp_0;
  }
  if (typeof HEAD === "object" && HEAD !== null ? Object.keys(HEAD).every(k => commitReference != null && Object.is(commitReference[k], HEAD[k])) : Object.is(commitReference, HEAD)) {
    __result = showFile("HEAD");
    break __patsy_temp_0;
  }
  if (typeof DEFAULT_BRANCH === "object" && DEFAULT_BRANCH !== null ? Object.keys(DEFAULT_BRANCH).every(k => commitReference != null && Object.is(commitReference[k], DEFAULT_BRANCH[k])) : Object.is(commitReference, DEFAULT_BRANCH)) {
    const resolvedRef = await this.resolveGitRef(path, DEFAULT_BRANCH);
    __result = showFile(String(resolvedRef));
    break __patsy_temp_0;
  }
  if (typeof PARENT_BRANCH === "object" && PARENT_BRANCH !== null ? Object.keys(PARENT_BRANCH).every(k => commitReference != null && Object.is(commitReference[k], PARENT_BRANCH[k])) : Object.is(commitReference, PARENT_BRANCH)) {
    const resolvedRef = await this.resolveGitRef(path, PARENT_BRANCH);
    __result = showFile(String(resolvedRef));
    break __patsy_temp_0;
  }
  if (commitReference?.type === "branch") {
    let branchRef = commitReference;
    const resolvedRef = await this.resolveGitRef(path, branchRef);
    __result = showFile(String(resolvedRef));
    break __patsy_temp_0;
  }
  if (typeof commitReference === "string") {
    let sha = commitReference;
    __result = showFile(sha);
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