import { match, P } from 'ts-pattern';

declare const block: any;
declare const with: any;
declare const push: any;
declare const flushUserContent: any;
declare const buildToolResultMessages: any;
declare const otherwise: any;
declare const pendingUserContent: any;
declare const textBlock: any;
declare const messages: any;

const __result = match(block)
          .with(
            { type: "text", text: P.string },
            (textBlock: { text: string }) => {
              pendingUserContent.push({ type: "text", value: textBlock.text });
            },
          )
          .with({ type: "tool_result" }, (toolResultBlock: ToolResultBlock) => {
            flushUserContent();
            messages.push(
              ...buildToolResultMessages(toolResultBlock, timestamp),
            );
          })
          .otherwise(() => {});