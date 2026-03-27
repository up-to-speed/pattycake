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

const __result = match(authMethod)
      .with("api-key", () => {
        const apiKey = apiKeyValue?.trim();

        return trpc.models.setProviderAuth
          .mutate({
            provider,
            auth: { type: "api-key", apiKey },
          })
          .then(
            () =>
              ({
                success: true,
                code: "api-key-updated",
                providerName,
                defaultMessage: t("{{providerName}} API key updated", {
                  providerName,
                }),
              }) as const,
          );
      })
      .with("cli-subscription", () => {
        const isCliAvailable = this.cliAvailability?.[provider] ?? false;
        if (!isCliAvailable) {
          return Promise.resolve({
            success: false,
            code: "cli-unavailable",
            providerName,
            defaultMessage: t(
              "{{providerName}} CLI subscription not available",
              { providerName },
            ),
          } as const);
        }

        return trpc.models.setProviderAuth
          .mutate({
            provider,
            auth: { type: "cli-subscription" },
          })
          .then(
            () =>
              ({
                success: true,
                code: "cli-enabled",
                providerName,
                defaultMessage: t("{{providerName}} CLI subscription enabled", {
                  providerName,
                }),
              }) as const,
          );
      })
      .with("cc-credits", () => {
        // CC credits only available for Google/Gemini
        if (provider !== "google") {
          return Promise.resolve({
            success: false,
            code: "cc-credits-unavailable",
            providerName,
            defaultMessage: t(
              "Command Center credits are only available for Google/Gemini",
            ),
          } as const);
        }

        return trpc.models.setProviderAuth
          .mutate({
            provider,
            auth: { type: "cc-credits" },
          })
          .then(
            () =>
              ({
                success: true,
                code: "cc-credits-enabled",
                providerName,
                defaultMessage: t("Command Center credits enabled for Gemini"),
              }) as const,
          );
      })
      .exhaustive();