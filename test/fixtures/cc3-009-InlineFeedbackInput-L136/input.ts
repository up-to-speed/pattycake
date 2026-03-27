import { match } from 'ts-pattern';

declare const result: any;
declare const with: any;
declare const success: any;
declare const t: any;
declare const exhaustive: any;
declare const toast: any;

const __result = match(result)
        .with("current", () =>
          toast.success(t("Feedback sent to current agent")),
        )
        .with("new", () =>
          toast.success(t("No active agent - feedback sent to new agent")),
        )
        .with("no-workspace", () => {
          // getActiveAgentStore already showed an error toast
        })
        .exhaustive();