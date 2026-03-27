import { match } from 'ts-pattern';

declare const error: any;
declare const with: any;
declare const has: any;
declare const toLowerCase: any;
declare const includes: any;
declare const otherwise: any;
declare const e: any;
declare const data: any;
declare const AUTH_ERROR_CODES: any;
declare const part: any;
declare const guidance: any;
declare const StatusCodes: any;
declare const message: any;
declare const body: any;

const __result = match(error)
    .with({ name: "ProviderAuthError" }, () => true)
    .with({ name: "APIError" }, (e: ApiError) => {
      const statusCode = e.data.statusCode ?? 0;
      if (AUTH_ERROR_CODES.has(statusCode)) return true;

      // NOTE jkoppel 2026.03.01:
      //   Codex wrote this part. Seems good to have,
      //   but don't know whether the things it's looking for are accurate
      /*
       * Some providers return invalid-credential failures as HTTP 400
       * (for example API_KEY_INVALID / INVALID_ARGUMENT) instead of 401/403.
       * Treat these as auth errors so users still receive auth-specific guidance.
       */
      if (statusCode !== StatusCodes.BAD_REQUEST) return false;
      const message = e.data.message.toLowerCase();
      const body = (e.data.responseBody ?? "").toLowerCase();
      return (
        message.includes("api key") ||
        body.includes("api_key_invalid") ||
        body.includes("invalid_api_key") ||
        (body.includes("invalid_argument") &&
          (body.includes("api key") || body.includes("api_key")))
      );
    })
    .otherwise(() => false);