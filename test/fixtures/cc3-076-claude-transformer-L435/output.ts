import { match } from 'ts-pattern';
declare const message: any;
declare const with: any;
declare const parseAssistantMessage: any;
declare const parseUserMessage: any;
declare const parseResultMessage: any;
declare const parseSystemMessage: any;
declare const parseRateLimitEvent: any;
declare const otherwise: any;
declare const fallbackUnhandled: any;
let __result;
__patsy_temp_0: {
  if (message?.type === "assistant") {
    let msg: SDKAssistantMessage = message;
    __result = parseAssistantMessage(msg as SDKAssistantMessage, resolvedTimestamp, this.workspacePath);
    break __patsy_temp_0;
  }
  if (message?.type === "user") {
    let msg: SDKMessage & {
      type: "user";
    } = message;
    __result = parseUserMessage(msg, resolvedTimestamp);
    break __patsy_temp_0;
  }
  if (message?.type === "result") {
    let msg: SDKResultMessage = message;
    __result = parseResultMessage(msg as SDKResultMessage, resolvedTimestamp);
    break __patsy_temp_0;
  }
  if (message?.type === "system") {
    let msg: SDKMessage & {
      type: "system";
    } = message;
    __result = parseSystemMessage(msg, resolvedTimestamp);
    break __patsy_temp_0;
  }
  if (message?.type === "rate_limit_event") {
    let msg = message;
    __result = parseRateLimitEvent(msg as unknown as RateLimitEvent, resolvedTimestamp);
    break __patsy_temp_0;
  }
  let msg: SDKMessage = message;
  __result = fallbackUnhandled(msg, resolvedTimestamp);
  break __patsy_temp_0;
}
