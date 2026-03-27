import { match } from 'ts-pattern';

declare const op: any;
declare const with: any;
declare const detectChangeType: any;
declare const push: any;
declare const renderFileChange: any;
declare const exhaustive: any;
declare const o: any;
declare const lines: any;
declare const hunks: any;

const __result = match(op)
      .with({ type: "change" }, (o) => {
        const changeType = detectChangeType(o.hunks);
        lines.push(...renderFileChange(o.path, o.path, o.hunks, changeType));
      })
      .with({ type: "rename" }, (o) => {
        const changeType = o.hunks.length > 0 ? "rename-modify" : "rename";
        lines.push(
          ...renderFileChange(o.pathBefore, o.pathAfter, o.hunks, changeType),
        );
      })
      .with({ type: "creation" }, (o) => {
        // Convert creation to a hunk
        const hunks: Hunk[] = [
          {
            oldStartLine: 0,
            oldLines: [],
            newStartLine: 1,
            newLines: [...o.contents],
          },
        ];
        lines.push(...renderFileChange(o.path, o.path, hunks, "add"));
      })
      .with({ type: "deletion" }, (o) => {
        const hunks: Hunk[] = [
          {
            oldStartLine: 1,
            oldLines: [...o.contents],
            newStartLine: 0,
            newLines: [],
          },
        ];
        lines.push(...renderFileChange(o.path, o.path, hunks, "delete"));
      })
      .exhaustive();