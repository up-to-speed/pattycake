import { match } from 'ts-pattern';
declare const scrollContext: any;
declare const with: any;
declare const Px: any;
declare const exhaustive: any;
declare const s: any;
let __result;
__patsy_temp_0: {
  if (scrollContext?.type === "window") {
    let s = scrollContext;
    __result = s.viewportTopInset;
    break __patsy_temp_0;
  }
  if (scrollContext?.type === "element") {
    __result = new Px(0);
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(scrollContext);
  } catch (e) {
    __patsy__displayedValue = scrollContext;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
