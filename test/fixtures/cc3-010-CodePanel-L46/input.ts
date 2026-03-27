import { match } from 'ts-pattern';

declare const line: any;
declare const with: any;
declare const exhaustive: any;
declare const l: any;

const __result = match(line)
      .with({ type: "removed" }, (l) => l.oldLineNumber)
      .with({ type: "added" }, (l) => l.newLineNumber)
      .with({ type: "unchanged" }, (l) =>
        preferSide === "old" ? l.oldLineNumber : l.newLineNumber,
      )
      .exhaustive();