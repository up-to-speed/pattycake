import { match } from 'ts-pattern';

declare const config: any;
declare const with: any;
declare const isCliSubscriptionAvailable: any;
declare const Google: any;
declare const exhaustive: any;
declare const ModelProvider: any;

const __result = match(config)
      .with({ type: "api-key" }, ({ apiKey }) => {
        return !!apiKey;
      })
      .with({ type: "cli-subscription" }, async () => {
        return await isCliSubscriptionAvailable(provider);
      })
      .with({ type: "cc-credits" }, () => {
        // CC credits are always valid for Google (no auth required for proxy)
        return provider === ModelProvider.GOOGLE;
      })
      .exhaustive();