import { match } from 'ts-pattern';

declare const delta: any;
declare const with: any;
declare const warn: any;
declare const mismatch: any;
declare const query: any;
declare const error: any;
declare const exhaustive: any;
declare const d: any;
declare const serverMessages: any;
declare const reload: any;
declare const trpc: any;
declare const codingAgent: any;
declare const messages: any;
declare const full: any;

const __result = match(delta)
                .with({ action: "replace" }, (d) => {
                  serverMessages = d.messages;
                })
                .with({ action: "append" }, (d) => {
                  serverMessages = d.concatenatedMessages;
                })
                .with({ action: "resync" }, () => {
                  console.warn(
                    `CodingAgentSession: Message index mismatch (expected ${serverMessages.length}, got ${fromIndex}). Recovering with full reload.`,
                  );
                  void (async () => {
                    try {
                      const full = await trpc.codingAgent.messages.query({
                        sessionId: currentSessionId,
                      });
                      serverMessages = full.messages ?? [];
                      pendingPrompts = full.pendingPrompts ?? [];
                    } catch (error) {
                      console.error(
                        "CodingAgentSession: Failed to recover messages:",
                        error,
                      );
                    }
                  })();
                })
                .with({ action: "noop" }, () => {})
                .exhaustive();