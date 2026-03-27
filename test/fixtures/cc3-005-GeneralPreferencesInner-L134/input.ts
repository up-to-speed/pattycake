import { match } from 'ts-pattern';

declare const newLevel: any;
declare const with: any;
declare const t: any;
declare const exhaustive: any;

const __result = match(newLevel)
        .with("all", () => t("Telemetry enabled"))
        .with("crashes_only", () => t("Crash reports only"))
        .with("none", () => t("Telemetry disabled"))
        .exhaustive();