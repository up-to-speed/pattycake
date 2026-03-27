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
  if (builtin === ModelProvider.OPENAI) {
    const provider = createOpenAI({
      apiKey
    });
    __result = provider(modelId);
    break __patsy_temp_0;
  }
  if (builtin === ModelProvider.GOOGLE) {
    const provider = createGoogleGenerativeAI({
      apiKey
    });
    __result = provider(modelId);
    break __patsy_temp_0;
  }
  if (builtin === ModelProvider.ANTHROPIC) {
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
