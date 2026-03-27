import { match } from 'ts-pattern';

declare const level: any;
declare const with: any;
declare const t: any;
declare const exhaustive: any;

const __result = match(level)
      .with("light", () => t("Light"))
      .with("medium", () => t("Medium"))
      .with("heavy", () => t("Heavy"))
      .exhaustive();