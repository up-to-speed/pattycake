import { match } from 'ts-pattern';

declare const with: any;
declare const ClaudeCodeSession: any;
declare const AmazonQSession: any;
declare const CodexSession: any;
declare const getInstance: any;
declare const getProviderConfig: any;
declare const first: any;
declare const GeminiSession: any;
declare const hasValidAuth: any;
declare const t: any;
declare const AppError: any;
declare const OpenCodeSession: any;
declare const getSystemOpenCodeServerManager: any;
declare const getBundledOpenCodeServerManager: any;
declare const exhaustive: any;
declare const config: any;
declare const ModelConfigurationManager: any;
declare const modelConfigManager: any;
declare const ModelProvider: any;
declare const providerConfig: any;
declare const subscription: any;
declare const agent: any;
declare const CLI: any;
declare const found: any;
declare const StatusCodes: any;

const __result = match(config.type)
      .with("claude-code", () => new ClaudeCodeSession(config))
      .with("amazon-q", () => new AmazonQSession(config))
      .with("codex", () => new CodexSession(config))
      .with("gemini", async () => {
        // Gemini can work with:
        // 1. API key - explicitly provided or from model configuration
        // 2. CLI subscription - Gemini CLI uses its own OAuth credentials
        const modelConfigManager =
          await ModelConfigurationManager.getInstance();
        const providerConfig = modelConfigManager.getProviderConfig(
          ModelProvider.GOOGLE,
        );

        // Check for API key first (explicit config > saved API key)
        const geminiApiKey =
          providerConfig.type === "api-key"
            ? providerConfig.apiKey
            : providerConfig.savedApiKey;
        const apiKey = config.apiKey ?? geminiApiKey;

        if (apiKey) {
          // Have an API key - use it
          return new GeminiSession({ ...config, apiKey });
        }

        // No API key - check if CLI subscription is available
        if (providerConfig.type === "cli-subscription") {
          const hasValidAuth = await modelConfigManager.hasValidAuth(
            ModelProvider.GOOGLE,
          );
          if (hasValidAuth) {
            // CLI subscription is available - the Gemini CLI will use its own OAuth
            // Pass empty string as apiKey since the CLI doesn't need it
            return new GeminiSession({ ...config, apiKey: "" });
          }
        }

        // Neither API key nor valid CLI subscription
        const errorMessage =
          providerConfig.type === "cc-credits"
            ? await t(
                "The Gemini agent requires an API key or CLI subscription. Command Center credits only work with the AI chat, not the Gemini CLI agent. Please set a Gemini API key or log in to the Gemini CLI.",
              )
            : await t(
                "Gemini API key not found. Please set the Gemini API key in the model configuration settings, or log in to the Gemini CLI.",
              );

        throw new AppError(errorMessage, StatusCodes.UNAUTHORIZED);
      })
      .with(
        "opencode",
        () =>
          new OpenCodeSession(
            config,
            getSystemOpenCodeServerManager(config.binaryPath ?? "opencode"),
          ),
      )
      .with(
        "opencode-bundled",
        () => new OpenCodeSession(config, getBundledOpenCodeServerManager()),
      )
      .exhaustive();