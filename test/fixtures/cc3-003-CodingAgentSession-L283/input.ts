import { match } from 'ts-pattern';

declare const sessionState: any;
declare const with: any;
declare const now: any;
declare const toISOString: any;
declare const push: any;
declare const exhaustive: any;
declare const messages: any;

const __result = match(sessionState)
      .with("active", () => {
        // Agent is already thinking — show as queued, not processing
        pendingPrompts = [
          ...pendingPrompts,
          {
            id: `optimistic-${Date.now()}`,
            previewText,
            enqueuedAt: new Date().toISOString(),
            content,
          },
        ];
      })
      .with("waiting", () => {
        const optimisticMessage: CodingAgentMessage = {
          type: "user" as const,
          content,
          timestamp: new Date().toISOString(),
        };

        messages.push(optimisticMessage);
        sessionState = "active";
      })
      .exhaustive();