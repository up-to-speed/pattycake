import { match } from 'ts-pattern';

declare const change: any;
declare const with: any;
declare const push: any;
declare const lines: any;
declare const exhaustive: any;
declare const oldLines: any;
declare const c: any;
declare const newLines: any;

const __result = match(change)
      .with({ type: "DeletedLine" }, (c) => {
        oldLines.push(c.content);
      })
      .with({ type: "AddedLine" }, (c) => {
        newLines.push(c.content);
      })
      .with({ type: "UnchangedLine" }, (c) => {
        oldLines.push(c.content);
        newLines.push(c.content);
      })
      .with({ type: "MessageLine" }, () => {
        // Skip message lines (like "\ No newline at end of file")
      })
      .exhaustive();