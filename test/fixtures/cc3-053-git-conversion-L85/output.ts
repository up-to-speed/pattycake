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
let __result;
__patsy_temp_0: {
  if (file?.type === "ChangedFile") {
    let f: ChangedFile = file;
    __result = {
      type: "change",
      path: f.path,
      hunks: convertChunks(f.chunks, {
        isFileCreation: false,
        isFileDeletion: false
      })
    };
    break __patsy_temp_0;
  }
  if (file?.type === "AddedFile") {
    let f: AddedFile = file;
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
    __result = {
      type: "creation",
      path: f.path,
      contents: allNewLines
    };
    break __patsy_temp_0;
  }
  if (file?.type === "DeletedFile") {
    let f: DeletedFile = file;
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
    __result = {
      type: "deletion",
      path: f.path,
      contents: allOldLines
    };
    break __patsy_temp_0;
  }
  if (file?.type === "RenamedFile") {
    let f: RenamedFile = file;
    __result = {
      type: "rename",
      pathBefore: f.pathBefore,
      pathAfter: f.pathAfter,
      hunks: convertChunks(f.chunks, {
        isFileCreation: false,
        isFileDeletion: false
      })
    };
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(file);
  } catch (e) {
    __patsy__displayedValue = file;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
