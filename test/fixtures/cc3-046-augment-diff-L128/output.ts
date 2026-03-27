import { match } from 'ts-pattern';
declare const chunk: any;
declare const with: any;
declare const exhaustive: any;
declare const fromFileRange: any;
declare const toFileRange: any;
declare const fromFileRangeA: any;
let __result;
__patsy_temp_0: {
  if (chunk?.type === "Chunk") {
    let chunk = chunk;
    __result = [chunk.fromFileRange.start, chunk.toFileRange.start];
    break __patsy_temp_0;
  }
  if (chunk?.type === "CombinedChunk") {
    let chunk = chunk;
    __result = [chunk.fromFileRangeA.start, chunk.toFileRange.start];
    break __patsy_temp_0;
  }
  if (chunk?.type === "BinaryFilesChunk") {
    let _ = chunk;
    __result = [undefined, undefined];
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(chunk);
  } catch (e) {
    __patsy__displayedValue = chunk;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
