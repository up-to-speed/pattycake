import { match } from 'ts-pattern';

declare const newType: any;
declare const with: any;
declare const exhaustive: any;

const __result = match(newType)
      .with("prompt", () => ({ type: "prompt" as const, content: text }))
      .with("command", () => ({ type: "command" as const, command: text }))
      .exhaustive();