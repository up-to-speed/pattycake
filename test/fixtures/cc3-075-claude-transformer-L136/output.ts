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
let __result;
__patsy_temp_0: {
  if (block?.type === "text" && typeof block?.text === "string") {
    let textBlock: {
      text: string;
    } = block;
    pendingUserContent.push({
      type: "text",
      value: textBlock.text
    });
  }
  if (block?.type === "tool_result") {
    let toolResultBlock: ToolResultBlock = block;
    flushUserContent();
    messages.push(...buildToolResultMessages(toolResultBlock, timestamp));
  }
}
