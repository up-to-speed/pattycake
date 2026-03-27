import { match } from 'ts-pattern';
declare const op: any;
declare const with: any;
declare const exhaustive: any;
declare const o: any;
let __result;
__patsy_temp_0: {
  if (op?.type === "change") {
    let o = op;
    __result = [o.path];
    break __patsy_temp_0;
  }
  if (op?.type === "creation") {
    let o = op;
    __result = [o.path];
    break __patsy_temp_0;
  }
  if (op?.type === "deletion") {
    let o = op;
    __result = [o.path];
    break __patsy_temp_0;
  }
  if (op?.type === "rename") {
    let o = op;
    __result = [o.pathBefore, o.pathAfter];
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(op);
  } catch (e) {
    __patsy__displayedValue = op;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
