import { match, P } from 'ts-pattern';
declare const with: any;
declare const startSubprocess: any;
declare const spawnBundled: any;
declare const spawnSystem: any;
declare const exhaustive: any;
declare const m: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = this.mode;
  if (__patsy_temp_1?.type === "bundled") {
    __result = this.startSubprocess(env => this.spawnBundled(env));
    break __patsy_temp_0;
  }
  if (__patsy_temp_1?.type === "system" && typeof __patsy_temp_1?.binaryPath === "string") {
    let m = __patsy_temp_1;
    __result = this.startSubprocess(env => this.spawnSystem(env, m.binaryPath));
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(__patsy_temp_1);
  } catch (e) {
    __patsy__displayedValue = __patsy_temp_1;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
