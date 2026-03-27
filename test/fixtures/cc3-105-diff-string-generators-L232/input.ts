import { match } from 'ts-pattern';

declare const kind: any;
declare const with: any;
declare const toGitDiff: any;
declare const generateModifiedCode: any;
declare const exhaustive: any;

const __result = match(kind)
    .with({ type: "new" }, (k) => toGitDiff(filePath, "", code, k))
    .with({ type: "deleted" }, (k) => toGitDiff(filePath, code, "", k))
    .with({ type: "modified" }, () =>
      toGitDiff(filePath, code, generateModifiedCode(lineCount, filePath)),
    )
    .exhaustive();