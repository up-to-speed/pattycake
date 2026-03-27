import { match } from 'ts-pattern';
declare const with: any;
declare const useApiKey: any;
declare const useCliSubscription: any;
declare const useCcCredits: any;
declare const exhaustive: any;
declare const input: any;
declare const modelConfig: any;
declare const auth: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = input.auth;
  if (__patsy_temp_1?.type === "api-key") {
    let auth = __patsy_temp_1;
    __result = modelConfig.useApiKey(input.provider, auth.apiKey);
    break __patsy_temp_0;
  }
  if (__patsy_temp_1?.type === "cli-subscription") {
    __result = modelConfig.useCliSubscription(input.provider);
    break __patsy_temp_0;
  }
  if (__patsy_temp_1?.type === "cc-credits") {
    __result = modelConfig.useCcCredits(input.provider);
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(__patsy_temp_1);
  } catch (e) {
    __patsy__displayedValue = __patsy_temp_1;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
