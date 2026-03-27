import { match } from 'ts-pattern';
declare const error: any;
declare const with: any;
declare const has: any;
declare const otherwise: any;
declare const RATE_LIMIT_CODES: any;
declare const e: any;
declare const data: any;
let __result;
__patsy_temp_0: {
  if (error?.name === "APIError") {
    let e: ApiError = error;
    __result = RATE_LIMIT_CODES.has(e.data.statusCode ?? 0);
    break __patsy_temp_0;
  }
  __result = false;
  break __patsy_temp_0;
}
