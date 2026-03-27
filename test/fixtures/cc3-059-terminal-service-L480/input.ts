import { match } from 'ts-pattern';

declare const with: any;
declare const otherwise: any;
declare const env: any;
declare const iTerm: any;

const __result = match(env.TERM_PROGRAM)
      .with("iTerm.app", () => "iterm" as const)
      .with("vscode", () => "vscode" as const)
      .with("cursor", () => "cursor" as const)
      .otherwise(() => "system" as const);