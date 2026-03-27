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
const __result = match(config).with({
  type: "api-key"
}, ({
  apiKey
}) => {
  if (!apiKey) {
    return null;
  }

  // Use API key (existing logic)
  return match(builtin).with(ModelProvider.OPENAI, () => {
    const provider = createOpenAI({
      apiKey
    });
    return provider(modelId);
  }).with(ModelProvider.GOOGLE, () => {
    const provider = createGoogleGenerativeAI({
      apiKey
    });
    return provider(modelId);
  }).with(ModelProvider.ANTHROPIC, () => {
    const provider = createAnthropic({
      apiKey
    });
    return provider(modelId);
  }).exhaustive();
}).with({
  type: "cli-subscription"
}, async () => {
  // Use CLI provider
  return await getCliModel(builtin, modelId);
}).with({
  type: "cc-credits"
}, () => {
  // Use Command Center's Gemini proxy (only for Google)
  if (builtin !== ModelProvider.GOOGLE) {
    logger.warn("[Model Config] cc-credits auth type used with non-Google provider");
    return null;
  }
  const geminiProxyProvider = createGoogleGenerativeAI({
    name: GEMINI_PROXY_PROVIDER_ID,
    baseURL: GEMINI_PROXY_BASE_URL,
    apiKey: GEMINI_PROXY_API_KEY
  });
  return geminiProxyProvider.languageModel(modelId);
}).exhaustive();
