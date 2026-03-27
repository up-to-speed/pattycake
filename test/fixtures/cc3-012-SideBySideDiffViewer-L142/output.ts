import { match } from 'ts-pattern';
declare const fileChangesState: any;
declare const with: any;
declare const decideOverscan: any;
declare const map: any;
declare const exhaustive: any;
declare const diffViewerConfig: any;
declare const overscan: any;
declare const overscanBounds: any;
declare const data: any;
declare const f: any;
declare const diff: any;
declare const oldLines: any;
let __result;
__patsy_temp_0: {
  if (fileChangesState?.type === "loading") {
    __result = diffViewerConfig.overscan.overscanBounds.min;
    break __patsy_temp_0;
  }
  if (fileChangesState?.type === "ready") {
    let {
      data
    } = fileChangesState;
    __result = decideOverscan(diffViewerConfig.overscan, data.map(f => f.diff.oldLines.length));
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(fileChangesState);
  } catch (e) {
    __patsy__displayedValue = fileChangesState;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
