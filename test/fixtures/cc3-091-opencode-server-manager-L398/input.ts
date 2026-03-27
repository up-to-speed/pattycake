import { match } from 'ts-pattern';

declare const with: any;
declare const buildBundledConfig: any;
declare const buildSystemConfig: any;
declare const exhaustive: any;

const __result = match(this.mode)
      .with({ type: "bundled" }, () => this.buildBundledConfig())
      .with({ type: "system" }, () => this.buildSystemConfig())
      .exhaustive();