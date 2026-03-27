import { match } from 'ts-pattern';

declare const change: any;
declare const with: any;
declare const writeFile: any;
declare const deleteFile: any;
declare const renameFile: any;
declare const exhaustive: any;
declare const repo: any;
declare const c: any;

const __result = match(change)
    .with({ type: "modify" }, (c) => repo.writeFile(c.path, c.newContent))
    .with({ type: "add" }, (c) => repo.writeFile(c.path, c.content))
    .with({ type: "delete" }, (c) => repo.deleteFile(c.path))
    .with({ type: "rename" }, (c) => repo.renameFile(c.oldPath, c.newPath))
    .with({ type: "rename-modify" }, async (c) => {
      await repo.deleteFile(c.oldPath);
      await repo.writeFile(c.newPath, c.newContent);
    })
    .exhaustive();