import { match } from 'ts-pattern';

declare const viewMode: any;
declare const with: any;
declare const exhaustive: any;

const __result = match(viewMode)
      .with("unified", () => this.visibleLines + this.unifiedExtraLines)
      .with("split", () => this.visibleLines)
      .exhaustive();