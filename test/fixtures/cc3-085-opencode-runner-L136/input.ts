import { match } from 'ts-pattern';

declare const error: any;
declare const with: any;
declare const has: any;
declare const otherwise: any;
declare const OVERLOADED_CODES: any;
declare const e: any;
declare const data: any;

const __result = match(error)
    .with({ name: "APIError" }, (e: ApiError) =>
      OVERLOADED_CODES.has(e.data.statusCode ?? 0),
    )
    .otherwise(() => false);