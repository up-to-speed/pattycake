import { match } from 'ts-pattern';

declare const scrollContext: any;
declare const with: any;
declare const Px: any;
declare const exhaustive: any;
declare const s: any;

const __result = match(scrollContext)
      .with({ type: "window" }, (s) => s.viewportTopInset)
      .with({ type: "element" }, () => new Px(0))
      .exhaustive();