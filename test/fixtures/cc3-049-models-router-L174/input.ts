import { match } from 'ts-pattern';

declare const with: any;
declare const useApiKey: any;
declare const useCliSubscription: any;
declare const useCcCredits: any;
declare const exhaustive: any;
declare const input: any;
declare const modelConfig: any;
declare const auth: any;

const __result = match(input.auth)
        .with({ type: "api-key" }, (auth) =>
          modelConfig.useApiKey(input.provider, auth.apiKey),
        )
        .with({ type: "cli-subscription" }, () =>
          modelConfig.useCliSubscription(input.provider),
        )
        .with({ type: "cc-credits" }, () =>
          modelConfig.useCcCredits(input.provider),
        )
        .exhaustive();