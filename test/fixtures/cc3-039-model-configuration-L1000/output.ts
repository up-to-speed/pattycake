import { match } from 'ts-pattern';
declare const config: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (config?.type === "api-key") {
    let {
      apiKey
    } = config;
    __result = apiKey !== undefined;
    break __patsy_temp_0;
  }
  if (config?.type === "cli-subscription") {
    __result = true;
    break __patsy_temp_0;
  }
  if (config?.type === "cc-credits") {
    __result = true;
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
