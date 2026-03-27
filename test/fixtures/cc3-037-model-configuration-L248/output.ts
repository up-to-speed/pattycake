import { match } from 'ts-pattern';
declare const provider: any;
declare const with: any;
declare const claudeCode: any;
declare const createGeminiProvider: any;
declare const languageModel: any;
declare const codexCliModel: any;
declare const otherwise: any;
declare const resolve: any;
declare const ModelProvider: any;
declare const coupling: any;
declare const geminiProvider: any;
let __result;
__patsy_temp_0: {
  if (typeof ModelProvider.ANTHROPIC === "object" && ModelProvider.ANTHROPIC !== null ? Object.keys(ModelProvider.ANTHROPIC).every(k => provider != null && Object.is(provider[k], ModelProvider.ANTHROPIC[k])) : Object.is(provider, ModelProvider.ANTHROPIC)) {
    // TODO 2026.01.10 jkoppel: Can we just pass the names through? Will it work? Hate this hidden coupling.
    // Map full model IDs to Claude Code tier names
    // TAG_HIDDEN_COUPLING_CLAUDE_NAMES
    const tierMap: Record<string, string> = {
      "claude-haiku-4-5": "haiku",
      "claude-sonnet-4-5": "sonnet",
      "claude-opus-4-5": "opus",
      "claude-opus-4-6": "opus"
    };
    const tier = tierMap[modelId];
    if (!tier) {
      __result = null;
      break __patsy_temp_0;
    }
    __result = await claudeCode(tier);
    break __patsy_temp_0;
  }
  if (typeof ModelProvider.GOOGLE === "object" && ModelProvider.GOOGLE !== null ? Object.keys(ModelProvider.GOOGLE).every(k => provider != null && Object.is(provider[k], ModelProvider.GOOGLE[k])) : Object.is(provider, ModelProvider.GOOGLE)) {
    // Gemini CLI uses OAuth authentication
    const {
      createGeminiProvider
    } = await import("ai-sdk-provider-gemini-cli");
    const geminiProvider = createGeminiProvider({
      authType: "oauth-personal"
    });
    // Note: gemini-cli returns LanguageModelV3, which is compatible with V2
    __result = geminiProvider.languageModel(modelId) as LanguageModelV2 & {
      specificationVersion: "v3";
    };
    break __patsy_temp_0;
  }
  if (typeof ModelProvider.OPENAI === "object" && ModelProvider.OPENAI !== null ? Object.keys(ModelProvider.OPENAI).every(k => provider != null && Object.is(provider[k], ModelProvider.OPENAI[k])) : Object.is(provider, ModelProvider.OPENAI)) {
    __result = await codexCliModel(modelId);
    break __patsy_temp_0;
  }
  __result = Promise.resolve(null);
  break __patsy_temp_0;
}