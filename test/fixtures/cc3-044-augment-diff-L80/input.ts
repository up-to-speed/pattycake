import { match } from 'ts-pattern';

declare const change: any;
declare const with: any;
declare const push: any;
declare const extendRangeListMutate: any;
declare const lines: any;
declare const exhaustive: any;
declare const result: any;
declare const oldLines: any;
declare const delChange: any;
declare const LineRange: any;
declare const newLines: any;
declare const addChange: any;

const __result = match(change)
      .with({ type: "DeletedLine" }, (delChange) => {
        result.deletions++;
        result.oldLines.push(delChange.content);
        LineRange.extendRangeListMutate(
          deletedLineRanges,
          delChange.lineBefore,
        );
      })
      .with({ type: "AddedLine" }, (addChange) => {
        result.additions++;
        result.newLines.push(addChange.content);
        LineRange.extendRangeListMutate(addedLineRanges, addChange.lineAfter);
      })
      .with({ type: "UnchangedLine" }, (_) => {
        // Normal/context lines - no processing needed
      })
      .with({ type: "MessageLine" }, (_) => {
        // Skip message lines (like "\ No newline at end of file")
      })
      .exhaustive();