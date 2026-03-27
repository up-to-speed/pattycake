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
let __result;
__patsy_temp_0: {
  if (delta?.action === "replace") {
    let d = delta;
    serverMessages = d.messages;
  }
  if (delta?.action === "append") {
    let d = delta;
    serverMessages = d.concatenatedMessages;
  }
  if (delta?.action === "resync") {
    console.warn(`CodingAgentSession: Message index mismatch (expected ${serverMessages.length}, got ${fromIndex}). Recovering with full reload.`);
    void (async () => {
      try {
        const full = await trpc.codingAgent.messages.query({
          sessionId: currentSessionId
        });
        serverMessages = full.messages ?? [];
        pendingPrompts = full.pendingPrompts ?? [];
      } catch (error) {
        console.error("CodingAgentSession: Failed to recover messages:", error);
      }
    })();
  }
  if (delta?.action === "noop") {}
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(delta);
  } catch (e) {
    __patsy__displayedValue = delta;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
