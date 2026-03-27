import { match } from 'ts-pattern';

declare const with: any;
declare const t: any;
declare const exhaustive: any;
declare const BUNDLED_MODEL: any;

const __result = match(this.mode)
      .with({ type: "bundled" }, () => BUNDLED_MODEL.displayName)
      .with({ type: "system" }, () => t("OpenCode's configured model"))
      .exhaustive();