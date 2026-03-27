import { match } from 'ts-pattern';

declare const chunk: any;
declare const with: any;
declare const exhaustive: any;
declare const fromFileRange: any;
declare const toFileRange: any;
declare const fromFileRangeA: any;

const __result = match(chunk)
    .with({ type: "Chunk" }, (chunk) => [
      chunk.fromFileRange.start,
      chunk.toFileRange.start,
    ])
    .with({ type: "CombinedChunk" }, (chunk) => [
      chunk.fromFileRangeA.start,
      chunk.toFileRange.start,
    ])
    .with({ type: "BinaryFilesChunk" }, (_) => [undefined, undefined])
    .exhaustive();