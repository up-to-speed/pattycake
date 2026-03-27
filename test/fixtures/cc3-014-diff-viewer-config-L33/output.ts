import { match } from 'ts-pattern';
declare const fileDiffLineCounts: any;
declare const with: any;
declare const otherwise: any;
declare const reduce: any;
declare const max: any;
declare const min: any;
declare const round: any;
declare const counts: any;
let __result;
__patsy_temp_0: {
  if (Array.isArray(fileDiffLineCounts) && fileDiffLineCounts?.length >= 0) {
    __result = min;
    break __patsy_temp_0;
  }
  let counts = fileDiffLineCounts;
  const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
  __result = Math.max(min, Math.min(max, Math.round(largeDiffNumLinesThreshold / mean)));
  break __patsy_temp_0;
}
