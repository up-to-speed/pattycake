import { match } from 'ts-pattern';

declare const progress: any;
declare const with: any;
declare const onFailureNotify: any;
declare const onCompleteNotify: any;
declare const exhaustive: any;
declare const config: any;
declare const p: any;

const __result = match(progress)
      .with(
        { status: "failed" },
        (p) => () => this.config.onFailureNotify(p.error),
      )
      .with({ status: "completed" }, () => () => this.config.onCompleteNotify())
      .with(
        { status: "cancelled" },
        () => () => this.config.onCancelledNotify?.(),
      )
      .with({ status: "running" }, () => undefined)
      .exhaustive();