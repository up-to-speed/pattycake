import { match } from 'ts-pattern';
declare const window: any;
declare const with: any;
declare const setHours: any;
declare const setDate: any;
declare const getDate: any;
declare const getDay: any;
declare const exhaustive: any;
declare const d: any;
let __result;
__patsy_temp_0: {
  if (window === "day") {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    __result = d;
    break __patsy_temp_0;
  }
  if (window === "week") {
    const d = new Date(now);
    // Sunday = 0
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0, 0, 0, 0);
    __result = d;
    break __patsy_temp_0;
  }
  if (window === "month") {
    const d = new Date(now);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    __result = d;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(window);
  } catch (e) {
    __patsy__displayedValue = window;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
