import { match } from 'ts-pattern';

declare const file: any;
declare const with: any;
declare const convertChunks: any;
declare const for: any;
declare const push: any;
declare const exhaustive: any;
declare const f: any;
declare const chunk: any;
declare const change: any;
declare const allNewLines: any;
declare const allOldLines: any;

const __result = match(file)
    .with(
      { type: "ChangedFile" },
      (f: ChangedFile): FileOperation => ({
        type: "change",
        path: f.path,
        hunks: convertChunks(f.chunks, {
          isFileCreation: false,
          isFileDeletion: false,
        }),
      }),
    )
    .with({ type: "AddedFile" }, (f: AddedFile): FileOperation => {
      // File creation: extract content from the chunks
      const allNewLines: string[] = [];
      for (const chunk of f.chunks) {
        if (chunk.type === "Chunk") {
          for (const change of chunk.changes) {
            if (change.type === "AddedLine") {
              allNewLines.push(change.content);
            } else if (change.type === "UnchangedLine") {
              // This shouldn't happen for added files, but handle it
              allNewLines.push(change.content);
            }
          }
        }
      }
      return {
        type: "creation",
        path: f.path,
        contents: allNewLines,
      };
    })
    .with({ type: "DeletedFile" }, (f: DeletedFile): FileOperation => {
      // Extract old content from the deletion chunks
      const allOldLines: string[] = [];
      for (const chunk of f.chunks) {
        if (chunk.type === "Chunk") {
          for (const change of chunk.changes) {
            if (change.type === "DeletedLine") {
              allOldLines.push(change.content);
            } else if (change.type === "UnchangedLine") {
              allOldLines.push(change.content);
            }
          }
        }
      }
      return {
        type: "deletion",
        path: f.path,
        contents: allOldLines,
      };
    })
    .with(
      { type: "RenamedFile" },
      (f: RenamedFile): FileOperation => ({
        type: "rename",
        pathBefore: f.pathBefore,
        pathAfter: f.pathAfter,
        hunks: convertChunks(f.chunks, {
          isFileCreation: false,
          isFileDeletion: false,
        }),
      }),
    )
    .exhaustive();