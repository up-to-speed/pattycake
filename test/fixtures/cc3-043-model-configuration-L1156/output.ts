import { match } from 'ts-pattern';
declare const config: any;
declare const with: any;
declare const isCliSubscriptionAvailable: any;
declare const Google: any;
declare const exhaustive: any;
declare const ModelProvider: any;
let __result;
__patsy_temp_0: {
  if (config?.type === "api-key") {
    let {
      apiKey
    } = config;
    __result = !!apiKey;
    break __patsy_temp_0;
  }
  if (config?.type === "cli-subscription") {
    __result = await isCliSubscriptionAvailable(provider);
    break __patsy_temp_0;
  }
  if (config?.type === "cc-credits") {
    // CC credits are always valid for Google (no auth required for proxy)
    __result = provider === ModelProvider.GOOGLE;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(config);
  } catch (e) {
    __patsy__displayedValue = config;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
