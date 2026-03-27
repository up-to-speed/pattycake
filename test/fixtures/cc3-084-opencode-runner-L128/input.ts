import { match } from 'ts-pattern';

declare const error: any;
declare const with: any;
declare const has: any;
declare const otherwise: any;
declare const RATE_LIMIT_CODES: any;
declare const e: any;
declare const data: any;

const __result = match(error)
    .with({ name: "APIError" }, (e: ApiError) =>
      RATE_LIMIT_CODES.has(e.data.statusCode ?? 0),
    )
    .otherwise(() => false);