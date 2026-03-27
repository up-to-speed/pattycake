import { match, P } from 'ts-pattern';

declare const p: any;
declare const with: any;
declare const exhaustive: any;
declare const r: any;
declare const progress: any;

const __result = match(p)
      .with({ status: "completed" }, () => 100)
      .with({ status: "running" }, (r) => r.progress.percentageDone)
      .with({ status: "failed" }, () => undefined)
      .with({ status: "cancelled" }, () => undefined)
      .with(P.nullish, () => undefined)
      .exhaustive();