import { match } from 'ts-pattern';

declare const op: any;
declare const with: any;
declare const exhaustive: any;
declare const o: any;

const __result = match(op)
      .with({ type: "change" }, (o) => [o.path])
      .with({ type: "creation" }, (o) => [o.path])
      .with({ type: "deletion" }, (o) => [o.path])
      .with({ type: "rename" }, (o) => [o.pathBefore, o.pathAfter])
      .exhaustive();