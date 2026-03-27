import { match } from 'ts-pattern';

declare const chunk: any;
declare const with: any;
declare const exhaustive: any;

const __result = match(chunk)
      .with({ type: "Chunk" }, (chunk) => chunk.changes)
      .with({ type: "CombinedChunk" }, (chunk) => chunk.changes)
      .with({ type: "BinaryFilesChunk" }, (_) => [])
      .exhaustive();