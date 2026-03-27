import { match } from 'ts-pattern';
declare const viewMode: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (viewMode === "unified") {
    __result = this.visibleLines + this.unifiedExtraLines;
    break __patsy_temp_0;
  }
  if (viewMode === "split") {
    __result = this.visibleLines;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(viewMode);
  } catch (e) {
    __patsy__displayedValue = viewMode;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
