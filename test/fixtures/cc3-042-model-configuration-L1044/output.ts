import { match } from 'ts-pattern';
declare const builtin: any;
declare const with: any;
declare const createOpenAI: any;
declare const provider: any;
declare const createGoogleGenerativeAI: any;
declare const createAnthropic: any;
declare const exhaustive: any;
declare const ModelProvider: any;
const __result = match(builtin).with(ModelProvider.OPENAI, () => {
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
