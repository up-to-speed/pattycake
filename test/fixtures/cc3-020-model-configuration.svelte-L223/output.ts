import { match } from 'ts-pattern';
declare const authMethod: any;
declare const with: any;
declare const trim: any;
declare const mutate: any;
declare const then: any;
declare const t: any;
declare const resolve: any;
declare const exhaustive: any;
declare const trpc: any;
declare const models: any;
declare const setProviderAuth: any;
let __result;
__patsy_temp_0: {
  if (authMethod === "api-key") {
    const apiKey = apiKeyValue?.trim();
    __result = trpc.models.setProviderAuth.mutate({
      provider,
      auth: {
        type: "api-key",
        apiKey
      }
    }).then(() => ({
      success: true,
      code: "api-key-updated",
      providerName,
      defaultMessage: t("{{providerName}} API key updated", {
        providerName
      })
    }) as const);
    break __patsy_temp_0;
  }
  if (authMethod === "cli-subscription") {
    const isCliAvailable = this.cliAvailability?.[provider] ?? false;
    if (!isCliAvailable) {
      __result = Promise.resolve({
        success: false,
        code: "cli-unavailable",
        providerName,
        defaultMessage: t("{{providerName}} CLI subscription not available", {
          providerName
        })
      } as const);
      break __patsy_temp_0;
    }
    __result = trpc.models.setProviderAuth.mutate({
      provider,
      auth: {
        type: "cli-subscription"
      }
    }).then(() => ({
      success: true,
      code: "cli-enabled",
      providerName,
      defaultMessage: t("{{providerName}} CLI subscription enabled", {
        providerName
      })
    }) as const);
    break __patsy_temp_0;
  }
  if (authMethod === "cc-credits") {
    // CC credits only available for Google/Gemini
    if (provider !== "google") {
      __result = Promise.resolve({
        success: false,
        code: "cc-credits-unavailable",
        providerName,
        defaultMessage: t("Command Center credits are only available for Google/Gemini")
      } as const);
      break __patsy_temp_0;
    }
    __result = trpc.models.setProviderAuth.mutate({
      provider,
      auth: {
        type: "cc-credits"
      }
    }).then(() => ({
      success: true,
      code: "cc-credits-enabled",
      providerName,
      defaultMessage: t("Command Center credits enabled for Gemini")
    }) as const);
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(authMethod);
  } catch (e) {
    __patsy__displayedValue = authMethod;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
