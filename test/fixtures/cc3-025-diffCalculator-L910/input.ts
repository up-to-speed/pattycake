import { match } from 'ts-pattern';

declare const change: any;
declare const with: any;
declare const bufferRemovedLine: any;
declare const bufferAddedLine: any;
declare const processUnchangedLine: any;
declare const lines: any;
declare const exhaustive: any;
declare const builder: any;
declare const r: any;

const __result = match(change)
            .with({ type: "DeletedLine" }, (r) => {
              builder.bufferRemovedLine(r.content);
            })
            .with({ type: "AddedLine" }, (r) => {
              builder.bufferAddedLine(r.content);
            })
            .with({ type: "UnchangedLine" }, (r) => {
              builder.processUnchangedLine(r.content);
            })
            .with({ type: "MessageLine" }, (_) => {
              // Skip message lines (like "\ No newline at end of file")
            })
            .exhaustive();