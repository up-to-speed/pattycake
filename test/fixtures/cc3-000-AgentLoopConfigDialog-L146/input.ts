import { match } from 'ts-pattern';

declare const action: any;
declare const with: any;
declare const exhaustive: any;
declare const a: any;

const __result = match(action)
      .with({ type: "prompt" }, (a) => a.content)
      .with({ type: "command" }, (a) => a.command)
      .exhaustive();