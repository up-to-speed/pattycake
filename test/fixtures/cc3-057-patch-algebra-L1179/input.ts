import { match } from 'ts-pattern';

declare const relation: any;
declare const with: any;
declare const extractHunkDiff: any;
declare const isEmpty: any;
declare const push: any;
declare const clone: any;
declare const exhaustive: any;
declare const Hunk: any;
declare const result: any;

const __result = match(relation)
      .with({ type: "identical" }, () => {
        // Hunks match exactly - no difference needed
        aIdx++;
        bIdx++;
        return "ok" as const;
      })
      .with({ type: "overlapping" }, { type: "same-position" }, () => {
        // Need to extract the incremental difference
        const diff = extractHunkDiff(bHunk, aHunk);
        if (diff === null) return "diff-null" as const;
        if (!Hunk.isEmpty(diff)) {
          result.push(diff);
        }
        aIdx++;
        bIdx++;
        return "ok" as const;
      })
      .with({ type: "independent" }, () => {
        // b hunk is independent - add it directly
        result.push(Hunk.clone(bHunk));
        bIdx++;
        return "ok" as const;
      })
      .exhaustive();