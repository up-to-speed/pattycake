import { match } from 'ts-pattern';

declare const with: any;
declare const otherwise: any;
declare const p: any;
declare const s: any;

const __result = match(p.state)
          .with({ status: "completed" }, (s) => ({
            type: "result" as const,
            result: s.output,
            is_error: false,
            timestamp,
          }))
          .with({ status: "error" }, (s) => ({
            type: "result" as const,
            result: s.error,
            is_error: true,
            timestamp,
          }))
          .otherwise(() => undefined);