import { match } from 'ts-pattern';
declare const error: any;
declare const with: any;
declare const map: any;
declare const stringify: any;
declare const join: any;
declare const otherwise: any;
declare const e: any;
declare const data: any;
declare const errors: any;
declare const part: any;
declare const needed: any;
declare const payloads: any;
declare const record: any;
declare const nested: any;
let __result;
__patsy_temp_0: {
  if (error?.name === "APIError") {
    let e: ApiError = error;
    __result = e.data.message;
    break __patsy_temp_0;
  }
  if (error?.name === "ProviderAuthError") {
    let e: ProviderAuthError = error;
    __result = e.data.message;
    break __patsy_temp_0;
  }
  if (error?.name === "NotFoundError") {
    let e: NotFoundError = error;
    __result = e.data.message;
    break __patsy_temp_0;
  }
  if (error?.success === false) {
    let e: BadRequestError = error;
    __result = e.errors.map((err: Record<string, unknown>) => JSON.stringify(err)).join("; ");
    break __patsy_temp_0;
  }
  if (error instanceof Error) {
    __result = error.message;
    break __patsy_temp_0;
  }

  // NOTE jkoppel 2026.03.01: Codex wrote this part. I'm unconvinced it's actually needed.
  /*
   * Unknown thrown objects are common with provider SDK payloads.
   * Pull message/status from common object shapes first, and only then
   * fall back to JSON so details are not lost as "[object Object]".
   */
  if (typeof error === "object" && error !== null) {
    const record = error as Record<string, unknown>;
    const nested = typeof record.error === "object" && record.error !== null ? record.error as Record<string, unknown> : null;
    const message = typeof record.message === "string" ? record.message : typeof nested?.message === "string" ? nested.message : null;
    const status = typeof record.statusCode === "number" ? record.statusCode : record.status;
    if (message) {
      __result = status !== null ? `${message} (status: ${status})` : message;
      break __patsy_temp_0;
    }
    __result = JSON.stringify(error);
    break __patsy_temp_0;
  }
  __result = String(error);
  break __patsy_temp_0;
}
