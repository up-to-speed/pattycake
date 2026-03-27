import { match } from 'ts-pattern';
declare const provider: any;
declare const with: any;
declare const claudeCode: any;
declare const debug: any;
declare const generateText: any;
declare const first: any;
declare const homedir: any;
declare const join: any;
declare const for: any;
declare const access: any;
declare const createGeminiProvider: any;
declare const languageModel: any;
declare const codexCliModel: any;
declare const exhaustive: any;
declare const ModelProvider: any;
declare const logger: any;
declare const text: any;
declare const error: any;
declare const untested: any;
declare const on: any;
declare const os: any;
declare const path: any;
declare const v2: any;
declare const oauth_creds: any;
declare const fs: any;
declare const imports: any;
declare const geminiProvider: any;
let __result;
__patsy_temp_0: {
  if (Object.is(provider, ModelProvider.ANTHROPIC)) {
    // Actually test the Claude Code CLI by making a simple API call
    try {
      const model = await claudeCode("sonnet");
      if (!model) {
        logger.debug("[Model Config] Claude Code CLI not available: executable not found");
        __result = false;
        break __patsy_temp_0;
      }

      // Make a minimal test call to verify authentication
      const {
        text
      } = await generateText({
        model,
        prompt: "Hi"
      });
      logger.debug("[Model Config] Claude Code CLI test successful", {
        responseLength: text.length
      });
      __result = true;
      break __patsy_temp_0;
    } catch (error) {
      logger.debug("[Model Config] Claude Code CLI not available", {
        error,
        errorMessage: error instanceof Error ? error.message : String(error)
      });
      __result = false;
      break __patsy_temp_0;
    }
  }
  if (Object.is(provider, ModelProvider.GOOGLE)) {
    // TODO 2026.01.10 jkoppel: Claude Code wrote this; untested. Don't have a Gemini subscription to test on.
    // For Gemini, check credentials file first (fast check)
    const homeDir = os.homedir();
    const credPaths = [path.join(homeDir, ".gemini", "mcp-oauth-tokens-v2.json"), path.join(homeDir, ".gemini", "oauth_creds.json")];
    let credentialsFound = false;
    for (const credPath of credPaths) {
      try {
        await fs.access(credPath);
        credentialsFound = true;
        logger.debug("[Model Config] Gemini CLI credentials found", {
          path: credPath
        });
        break;
      } catch {
        // File doesn't exist, continue checking
      }
    }
    if (!credentialsFound) {
      logger.debug("[Model Config] Gemini CLI credentials not found");
      __result = false;
      break __patsy_temp_0;
    }

    // Credentials found, now test actual API call
    try {
      // 2026.01.19 jkoppel: AI thinks we need this to get builds working because the gemini-cli package uses WASM imports.
      const {
        createGeminiProvider
      } = await import("ai-sdk-provider-gemini-cli");
      const geminiProvider = createGeminiProvider({
        authType: "oauth-personal"
      });
      const model = geminiProvider.languageModel("gemini-2.5-flash") as LanguageModelV2 & {
        specificationVersion: "v3";
      };

      // Make a minimal test call to verify authentication
      const {
        text
      } = await generateText({
        model,
        prompt: "Hi"
      });
      logger.debug("[Model Config] Gemini CLI test successful", {
        responseLength: text.length
      });
      __result = true;
      break __patsy_temp_0;
    } catch (error) {
      logger.debug("[Model Config] Gemini CLI not available", {
        error
      });
      __result = false;
      break __patsy_temp_0;
    }
  }
  if (Object.is(provider, ModelProvider.OPENAI)) {
    try {
      const model = await codexCliModel("gpt-5.2");
      if (!model) {
        logger.debug("[Model Config] Codex CLI not available");
        __result = false;
        break __patsy_temp_0;
      }
      const {
        text
      } = await generateText({
        model,
        prompt: "Hi"
      });
      logger.debug("[Model Config] Codex CLI test successful", {
        modelId: "gpt-5.2",
        responseLength: text.length
      });
      __result = true;
      break __patsy_temp_0;
    } catch (error) {
      logger.debug("[Model Config] Codex CLI not available", {
        error,
        errorMessage: error instanceof Error ? error.message : String(error)
      });
    }
    __result = false;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(provider);
  } catch (e) {
    __patsy__displayedValue = provider;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
