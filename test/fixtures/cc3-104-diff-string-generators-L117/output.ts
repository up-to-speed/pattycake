import { match } from 'ts-pattern';
declare const kind: any;
declare const with: any;
declare const simpleHash: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (kind?.type === "new") {
    lines[0] = "--- /dev/null";
    __result = [diffLine, "new file mode 100644", `index 0000000..${simpleHash("new:" + filePath)}`];
    break __patsy_temp_0;
  }
  if (kind?.type === "deleted") {
    lines[1] = "+++ /dev/null";
    __result = [diffLine, "deleted file mode 100644", `index ${simpleHash("old:" + filePath)}..0000000`];
    break __patsy_temp_0;
  }
  if (kind?.type === "modified") {
    __result = [diffLine, `index ${simpleHash("old:" + filePath)}..${simpleHash("new:" + filePath)} 100644`];
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(kind);
  } catch (e) {
    __patsy__displayedValue = kind;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
