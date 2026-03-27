import { match } from 'ts-pattern';
declare const change: any;
declare const with: any;
declare const set: any;
declare const ensureDifferentContent: any;
declare const get: any;
declare const exhaustive: any;
declare const state: any;
declare const c: any;
let __result;
__patsy_temp_0: {
  if (change?.type === "modify") {
    let c = change;
    state.set(c.path, ensureDifferentContent(state.get(c.path), c.newContent));
  }
  if (change?.type === "add") {
    let c = change;
    state.set(c.path, ensureDifferentContent(state.get(c.path), c.content));
  }
  if (change?.type === "delete") {
    let c = change;
    state.delete(c.path);
  }
  if (change?.type === "rename") {
    let c = change;
    const content = state.get(c.oldPath);
    if (content === undefined) {
      __result = undefined;
      break __patsy_temp_0;
    }
    state.delete(c.oldPath);
    state.set(c.newPath, content);
  }
  if (change?.type === "rename-modify") {
    let c = change;
    const existing = state.get(c.oldPath);
    state.delete(c.oldPath);
    state.set(c.newPath, ensureDifferentContent(existing, c.newContent));
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(change);
  } catch (e) {
    __patsy__displayedValue = change;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
