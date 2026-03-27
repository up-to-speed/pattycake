import { match } from 'ts-pattern';

declare const fileDiffLineCounts: any;
declare const with: any;
declare const otherwise: any;
declare const reduce: any;
declare const max: any;
declare const min: any;
declare const round: any;
declare const counts: any;

const __result = match(fileDiffLineCounts)
    .with([], () => min)
    .otherwise((counts) => {
      const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
      return Math.max(
        min,
        Math.min(max, Math.round(largeDiffNumLinesThreshold / mean)),
      );
    });