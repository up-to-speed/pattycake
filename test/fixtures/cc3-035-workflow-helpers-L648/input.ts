import { match } from 'ts-pattern';

declare const result: any;
declare const with: any;
declare const info: any;
declare const extractErrorMessage: any;
declare const t: any;
declare const exhaustive: any;
declare const logger: any;
declare const r: any;
declare const tripwire: any;

const __result = match(result)
    .with({ status: "success" }, () => ({ status: "success" as const }))
    .with({ status: "canceled" }, () => {
      logger.info("executeWorkflow: Workflow cancelled by user", {
        runId,
        ...logContext,
      });
      return { status: "cancelled" as const };
    })
    .with({ status: "failed" }, async (r) => ({
      status: "failed" as const,
      message: await extractErrorMessage(r.error),
    }))
    .with({ status: "tripwire" }, async (r) => ({
      status: "failed" as const,
      message: r.tripwire?.reason
        ? await t("Workflow stopped: {{reason}}", { reason: r.tripwire.reason })
        : await t("Workflow failed due to an internal check or limit"),
    }))
    .with({ status: "suspended" }, { status: "paused" }, async (r) => ({
      status: "failed" as const,
      message: await t("Workflow {{status}} unexpectedly", {
        status: r.status,
      }),
    }))
    .exhaustive();