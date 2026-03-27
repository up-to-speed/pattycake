import { match } from 'ts-pattern';
declare const sessionState: any;
declare const with: any;
declare const now: any;
declare const toISOString: any;
declare const push: any;
declare const exhaustive: any;
declare const messages: any;
let __result;
__patsy_temp_0: {
  if (sessionState === "active") {
    // Agent is already thinking — show as queued, not processing
    pendingPrompts = [...pendingPrompts, {
      id: `optimistic-${Date.now()}`,
      previewText,
      enqueuedAt: new Date().toISOString(),
      content
    }];
  }
  if (sessionState === "waiting") {
    const optimisticMessage: CodingAgentMessage = {
      type: "user" as const,
      content,
      timestamp: new Date().toISOString()
    };
    messages.push(optimisticMessage);
    sessionState = "active";
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(sessionState);
  } catch (e) {
    __patsy__displayedValue = sessionState;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
