import { match } from 'ts-pattern';
declare const with: any;
declare const otherwise: any;
declare const p: any;
declare const s: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = p.state;
  if (__patsy_temp_1?.status === "completed") {
    let s = __patsy_temp_1;
    __result = {
      type: "result" as const,
      result: s.output,
      is_error: false,
      timestamp
    };
    break __patsy_temp_0;
  }
  if (__patsy_temp_1?.status === "error") {
    let s = __patsy_temp_1;
    __result = {
      type: "result" as const,
      result: s.error,
      is_error: true,
      timestamp
    };
    break __patsy_temp_0;
  }
  __result = undefined;
  break __patsy_temp_0;
}
