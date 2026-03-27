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
let __result;
__patsy_temp_0: {
  if (result?.status === "success") {
    __result = {
      status: "success" as const
    };
    break __patsy_temp_0;
  }
  if (result?.status === "canceled") {
    logger.info("executeWorkflow: Workflow cancelled by user", {
      runId,
      ...logContext
    });
    __result = {
      status: "cancelled" as const
    };
    break __patsy_temp_0;
  }
  if (result?.status === "failed") {
    let r = result;
    __result = {
      status: "failed" as const,
      message: await extractErrorMessage(r.error)
    };
    break __patsy_temp_0;
  }
  if (result?.status === "tripwire") {
    let r = result;
    __result = {
      status: "failed" as const,
      message: r.tripwire?.reason ? await t("Workflow stopped: {{reason}}", {
        reason: r.tripwire.reason
      }) : await t("Workflow failed due to an internal check or limit")
    };
    break __patsy_temp_0;
  }
  if (result?.status === "suspended" || result?.status === "paused") {
    let r = result;
    __result = {
      status: "failed" as const,
      message: await t("Workflow {{status}} unexpectedly", {
        status: r.status
      })
    };
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(result);
  } catch (e) {
    __patsy__displayedValue = result;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
