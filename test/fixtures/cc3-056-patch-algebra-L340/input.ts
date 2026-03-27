import { match } from 'ts-pattern';

declare const op: any;
declare const with: any;
declare const set: any;
declare const map: any;
declare const exhaustive: any;
declare const o: any;
declare const hunks: any;
declare const changes: any;
declare const Hunk: any;
declare const renames: any;

const __result = match(op)
      .with({ type: "change" }, (o) => {
        if (o.hunks.length > 0) {
          changes.set(o.path, o.hunks.map(Hunk.clone));
        }
      })
      .with({ type: "rename" }, (o) => {
        renames.set(o.pathBefore, {
          pathAfter: o.pathAfter,
          hunks: o.hunks.map(Hunk.clone),
        });
      })
      .with({ type: "creation" }, (o) => {
        // Convert creation to a hunk that adds all lines
        const creationHunk: Hunk = {
          oldStartLine: 0,
          oldLines: [],
          newStartLine: 1,
          newLines: [...o.contents],
        };
        changes.set(o.path, [creationHunk]);
      })
      .with({ type: "deletion" }, (o) => {
        const deletionHunk: Hunk = {
          oldStartLine: 1,
          oldLines: [...o.contents],
          newStartLine: 0,
          newLines: [],
        };
        changes.set(o.path, [deletionHunk]);
      })
      .exhaustive();