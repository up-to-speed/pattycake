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
  if (commitReference === STAGED_ONLY) {
    // For staged files, use the index/staging area
    __result = runWithShadowCheck(MonitoredGitOps.showStagedFile(path, filePath));
    break __patsy_temp_0;
  }
  if (commitReference === WORKING_TREE) {
    // For working tree, just read the file directly
    const fs = await import("node:fs/promises");
    const fullPath = pathModule.join(path, filePath);
    __result = await fs.readFile(fullPath, "utf8");
    break __patsy_temp_0;
  }
  if (commitReference === HEAD) {
    __result = showFile("HEAD");
    break __patsy_temp_0;
  }
  if (commitReference === DEFAULT_BRANCH) {
    const resolvedRef = await this.resolveGitRef(path, DEFAULT_BRANCH);
    __result = showFile(String(resolvedRef));
    break __patsy_temp_0;
  }
  if (commitReference === PARENT_BRANCH) {
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
