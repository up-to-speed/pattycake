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

const __result = match(provider)
      .with(ModelProvider.ANTHROPIC, async () => {
        // TODO 2026.01.10 jkoppel: Can we just pass the names through? Will it work? Hate this hidden coupling.
        // Map full model IDs to Claude Code tier names
        // TAG_HIDDEN_COUPLING_CLAUDE_NAMES
        const tierMap: Record<string, string> = {
          "claude-haiku-4-5": "haiku",
          "claude-sonnet-4-5": "sonnet",
          "claude-opus-4-5": "opus",
          "claude-opus-4-6": "opus",
        };
        const tier = tierMap[modelId];
        if (!tier) {
          return null;
        }
        return await claudeCode(tier);
      })
      .with(ModelProvider.GOOGLE, async () => {
        // Gemini CLI uses OAuth authentication
        const { createGeminiProvider } =
          await import("ai-sdk-provider-gemini-cli");
        const geminiProvider = createGeminiProvider({
          authType: "oauth-personal",
        });
        // Note: gemini-cli returns LanguageModelV3, which is compatible with V2
        return geminiProvider.languageModel(modelId) as LanguageModelV2 & {
          specificationVersion: "v3";
        };
      })
      .with(ModelProvider.OPENAI, async () => {
        return await codexCliModel(modelId);
      })
      .otherwise(() => Promise.resolve(null));