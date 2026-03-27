import { match } from 'ts-pattern';

declare const change: any;
declare const with: any;
declare const set: any;
declare const ensureDifferentContent: any;
declare const get: any;
declare const exhaustive: any;
declare const state: any;
declare const c: any;

const __result = match(change)
    .with({ type: "modify" }, (c) => {
      state.set(
        c.path,
        ensureDifferentContent(state.get(c.path), c.newContent),
      );
    })
    .with({ type: "add" }, (c) => {
      state.set(c.path, ensureDifferentContent(state.get(c.path), c.content));
    })
    .with({ type: "delete" }, (c) => {
      state.delete(c.path);
    })
    .with({ type: "rename" }, (c) => {
      const content = state.get(c.oldPath);
      if (content === undefined) return;
      state.delete(c.oldPath);
      state.set(c.newPath, content);
    })
    .with({ type: "rename-modify" }, (c) => {
      const existing = state.get(c.oldPath);
      state.delete(c.oldPath);
      state.set(c.newPath, ensureDifferentContent(existing, c.newContent));
    })
    .exhaustive();