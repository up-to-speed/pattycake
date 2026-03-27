import { match } from 'ts-pattern';

declare const level: any;
declare const with: any;
declare const t: any;
declare const exhaustive: any;

const __result = match(level)
      .with("light", () => t("Brief descriptions to jog your memory"))
      .with("medium", () => t("Explains the what and the how"))
      .with("heavy", () => t("Explains the code line-by-line"))
      .exhaustive();