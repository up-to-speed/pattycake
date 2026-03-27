import { match } from 'ts-pattern';
declare const change: any;
declare const with: any;
declare const writeFile: any;
declare const deleteFile: any;
declare const renameFile: any;
declare const exhaustive: any;
declare const repo: any;
declare const c: any;
let __result;
__patsy_temp_0: {
  if (change?.type === "modify") {
    let c = change;
    __result = repo.writeFile(c.path, c.newContent);
    break __patsy_temp_0;
  }
  if (change?.type === "add") {
    let c = change;
    __result = repo.writeFile(c.path, c.content);
    break __patsy_temp_0;
  }
  if (change?.type === "delete") {
    let c = change;
    __result = repo.deleteFile(c.path);
    break __patsy_temp_0;
  }
  if (change?.type === "rename") {
    let c = change;
    __result = repo.renameFile(c.oldPath, c.newPath);
    break __patsy_temp_0;
  }
  if (change?.type === "rename-modify") {
    let c = change;
    await repo.deleteFile(c.oldPath);
    await repo.writeFile(c.newPath, c.newContent);
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(change);
  } catch (e) {
    __patsy__displayedValue = change;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
