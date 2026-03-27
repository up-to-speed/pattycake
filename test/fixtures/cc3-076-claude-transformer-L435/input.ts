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

const __result = match(message)
      .with({ type: "assistant" }, (msg: SDKAssistantMessage) =>
        parseAssistantMessage(
          msg as SDKAssistantMessage,
          resolvedTimestamp,
          this.workspacePath,
        ),
      )
      .with({ type: "user" }, (msg: SDKMessage & { type: "user" }) =>
        parseUserMessage(msg, resolvedTimestamp),
      )
      .with({ type: "result" }, (msg: SDKResultMessage) =>
        parseResultMessage(msg as SDKResultMessage, resolvedTimestamp),
      )
      .with({ type: "system" }, (msg: SDKMessage & { type: "system" }) =>
        parseSystemMessage(msg, resolvedTimestamp),
      )
      .with({ type: "rate_limit_event" }, (msg) =>
        parseRateLimitEvent(
          msg as unknown as RateLimitEvent,
          resolvedTimestamp,
        ),
      )
      .otherwise((msg: SDKMessage) =>
        fallbackUnhandled(msg, resolvedTimestamp),
      );