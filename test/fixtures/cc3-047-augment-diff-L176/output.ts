import { match } from 'ts-pattern';
declare const chunk: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (chunk?.type === "Chunk") {
    __result = chunk.changes;
    break __patsy_temp_0;
  }
  if (chunk?.type === "CombinedChunk") {
    __result = chunk.changes;
    break __patsy_temp_0;
  }
  if (chunk?.type === "BinaryFilesChunk") {
    let _ = chunk;
    __result = [];
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
