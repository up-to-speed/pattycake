import { match } from 'ts-pattern';
declare const builtin: any;
declare const with: any;
declare const createOpenAI: any;
declare const provider: any;
declare const createGoogleGenerativeAI: any;
declare const createAnthropic: any;
declare const exhaustive: any;
declare const ModelProvider: any;
let __result;
__patsy_temp_0: {
  if (typeof ModelProvider.OPENAI === "object" && ModelProvider.OPENAI !== null ? Object.keys(ModelProvider.OPENAI).every(k => builtin != null && Object.is(builtin[k], ModelProvider.OPENAI[k])) : Object.is(builtin, ModelProvider.OPENAI)) {
    const provider = createOpenAI({
      apiKey
    });
    __result = provider(modelId);
    break __patsy_temp_0;
  }
  if (typeof ModelProvider.GOOGLE === "object" && ModelProvider.GOOGLE !== null ? Object.keys(ModelProvider.GOOGLE).every(k => builtin != null && Object.is(builtin[k], ModelProvider.GOOGLE[k])) : Object.is(builtin, ModelProvider.GOOGLE)) {
    const provider = createGoogleGenerativeAI({
      apiKey
    });
    __result = provider(modelId);
    break __patsy_temp_0;
  }
  if (typeof ModelProvider.ANTHROPIC === "object" && ModelProvider.ANTHROPIC !== null ? Object.keys(ModelProvider.ANTHROPIC).every(k => builtin != null && Object.is(builtin[k], ModelProvider.ANTHROPIC[k])) : Object.is(builtin, ModelProvider.ANTHROPIC)) {
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