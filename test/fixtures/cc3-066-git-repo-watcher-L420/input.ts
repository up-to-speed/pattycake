import { match } from 'ts-pattern';

declare const with: any;
declare const clearInterval: any;
declare const unsubscribeFromRoot: any;
declare const exhaustive: any;
declare const entry: any;
declare const kindData: any;

const __result = match(entry.repoKindData)
      .with({ type: "root" }, async (kindData) => {
        clearInterval(kindData.fetchInterval);
      })
      .with({ type: "clone" }, async (kindData) => {
        await kindData.unsubscribeFromRoot();
      })
      .exhaustive();