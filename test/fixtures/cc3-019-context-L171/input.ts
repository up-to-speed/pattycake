import { match, P } from 'ts-pattern';

declare const get: any;
declare const with: any;
declare const otherwise: any;
declare const node: any;
declare const children: any;

const __result = match(node.children.get(key))
      .with({ type: "leaf" }, (_) => null)
      .with({ type: "internal" }, (child) => child)
      .with(P.nullish, () => null)
      .otherwise(() => null);