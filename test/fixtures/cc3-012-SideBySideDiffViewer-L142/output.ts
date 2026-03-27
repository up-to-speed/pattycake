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
const __result = match(fileChangesState).with({
  type: "loading"
}, () => diffViewerConfig.overscan.overscanBounds.min).with({
  type: "ready"
}, ({
  data
}) => decideOverscan(diffViewerConfig.overscan, data.map(f => f.diff.oldLines.length))).exhaustive();
