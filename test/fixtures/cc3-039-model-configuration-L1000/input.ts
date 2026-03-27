import { match } from 'ts-pattern';

declare const config: any;
declare const with: any;
declare const exhaustive: any;

const __result = match(config)
        .with({ type: "api-key" }, ({ apiKey }) => apiKey !== undefined)
        .with({ type: "cli-subscription" }, () => true)
        .with({ type: "cc-credits" }, () => true)
        .exhaustive();