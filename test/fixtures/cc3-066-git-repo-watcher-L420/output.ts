import { match } from 'ts-pattern';
declare const with: any;
declare const clearInterval: any;
declare const unsubscribeFromRoot: any;
declare const exhaustive: any;
declare const entry: any;
declare const kindData: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = entry.repoKindData;
  if (__patsy_temp_1?.type === "root") {
    let kindData = __patsy_temp_1;
    clearInterval(kindData.fetchInterval);
  }
  if (__patsy_temp_1?.type === "clone") {
    let kindData = __patsy_temp_1;
    await kindData.unsubscribeFromRoot();
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(__patsy_temp_1);
  } catch (e) {
    __patsy__displayedValue = __patsy_temp_1;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
