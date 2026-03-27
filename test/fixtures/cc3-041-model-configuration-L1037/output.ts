import { match } from 'ts-pattern';
declare const config: any;
declare const with: any;
declare const key: any;
declare const createOpenAI: any;
declare const provider: any;
declare const createGoogleGenerativeAI: any;
declare const createAnthropic: any;
declare const exhaustive: any;
declare const getCliModel: any;
declare const proxy: any;
declare const warn: any;
declare const languageModel: any;
declare const ModelProvider: any;
declare const logger: any;
declare const geminiProxyProvider: any;
let __result;
__patsy_temp_0: {
  if (config?.type === "api-key") {
    let {
      apiKey
    } = config;
    if (!apiKey) {
      __result = null;
      break __patsy_temp_0;
    }

    // Use API key (existing logic)
    __patsy_temp_0: {
      if (Object.is(builtin, ModelProvider.OPENAI)) {
        const provider = createOpenAI({
          apiKey
        });
        __result = provider(modelId);
        break __patsy_temp_0;
      }
      if (Object.is(builtin, ModelProvider.GOOGLE)) {
        const provider = createGoogleGenerativeAI({
          apiKey
        });
        __result = provider(modelId);
        break __patsy_temp_0;
      }
      if (Object.is(builtin, ModelProvider.ANTHROPIC)) {
        const provider = createAnthropic({
          apiKey
        });
        __result = provider(modelId);
        break __patsy_temp_0;
      }
      let __patsy__displayedValue;
      try {
        __patsy__displayedValue = JSON.stringify(builtin);
      } catch (e) {
        __patsy__displayedValue = builtin;
      }
      throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
    }
    break __patsy_temp_0;
  }
  if (config?.type === "cli-subscription") {
    // Use CLI provider
    __result = await getCliModel(builtin, modelId);
    break __patsy_temp_0;
  }
  if (config?.type === "cc-credits") {
    // Use Command Center's Gemini proxy (only for Google)
    if (builtin !== ModelProvider.GOOGLE) {
      logger.warn("[Model Config] cc-credits auth type used with non-Google provider");
      __result = null;
      break __patsy_temp_0;
    }
    const geminiProxyProvider = createGoogleGenerativeAI({
      name: GEMINI_PROXY_PROVIDER_ID,
      baseURL: GEMINI_PROXY_BASE_URL,
      apiKey: GEMINI_PROXY_API_KEY
    });
    __result = geminiProxyProvider.languageModel(modelId);
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
