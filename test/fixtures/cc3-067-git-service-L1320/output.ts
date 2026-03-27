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
const __result = match(commitReference).with(STAGED_ONLY, async () => {
  // For staged files, use the index/staging area
  return runWithShadowCheck(MonitoredGitOps.showStagedFile(path, filePath));
}).with(WORKING_TREE, async () => {
  // For working tree, just read the file directly
  const fs = await import("node:fs/promises");
  const fullPath = pathModule.join(path, filePath);
  return await fs.readFile(fullPath, "utf8");
}).with(HEAD, async () => {
  return showFile("HEAD");
}).with(DEFAULT_BRANCH, async () => {
  const resolvedRef = await this.resolveGitRef(path, DEFAULT_BRANCH);
  return showFile(String(resolvedRef));
}).with(PARENT_BRANCH, async () => {
  const resolvedRef = await this.resolveGitRef(path, PARENT_BRANCH);
  return showFile(String(resolvedRef));
}).with({
  type: "branch"
}, async branchRef => {
  const resolvedRef = await this.resolveGitRef(path, branchRef);
  return showFile(String(resolvedRef));
}).with(P.string, async sha => {
  return showFile(sha);
}).exhaustive();
