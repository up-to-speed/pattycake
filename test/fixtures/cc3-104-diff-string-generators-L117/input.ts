import { match } from 'ts-pattern';

declare const kind: any;
declare const with: any;
declare const simpleHash: any;
declare const exhaustive: any;

const __result = match(kind)
    .with({ type: "new" }, () => {
      lines[0] = "--- /dev/null";
      return [
        diffLine,
        "new file mode 100644",
        `index 0000000..${simpleHash("new:" + filePath)}`,
      ];
    })
    .with({ type: "deleted" }, () => {
      lines[1] = "+++ /dev/null";
      return [
        diffLine,
        "deleted file mode 100644",
        `index ${simpleHash("old:" + filePath)}..0000000`,
      ];
    })
    .with({ type: "modified" }, () => [
      diffLine,
      `index ${simpleHash("old:" + filePath)}..${simpleHash("new:" + filePath)} 100644`,
    ])
    .exhaustive();