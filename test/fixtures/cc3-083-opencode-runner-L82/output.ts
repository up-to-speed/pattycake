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
const __result = match(error).with({
  name: "APIError"
}, (e: ApiError) => e.data.message).with({
  name: "ProviderAuthError"
}, (e: ProviderAuthError) => e.data.message).with({
  name: "NotFoundError"
}, (e: NotFoundError) => e.data.message).with({
  success: false as const
}, (e: BadRequestError) => e.errors.map((err: Record<string, unknown>) => JSON.stringify(err)).join("; ")).otherwise(() => {
  if (error instanceof Error) return error.message;

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
    if (message) return status !== null ? `${message} (status: ${status})` : message;
    return JSON.stringify(error);
  }
  return String(error);
});
