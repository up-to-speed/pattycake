import { match } from 'ts-pattern';
declare const geminiMessage: any;
declare const with: any;
declare const enrichWithPathInfo: any;
declare const trim: any;
declare const otherwise: any;
declare const options: any;
declare const msg: any;
declare const context: any;
declare const output: any;
let __result;
__patsy_temp_0: {
  if (geminiMessage?.type === "init") {
    // Init messages are metadata - we extract session_id but don't add to message history
    __result = [];
    break __patsy_temp_0;
  }
  if (geminiMessage?.type === "message" && geminiMessage?.role === "user") {
    let msg = geminiMessage;
    if (options.skipUserMessage) {
      __result = [];
      break __patsy_temp_0;
    }
    __result = [{
      type: "user",
      content: [{
        type: "text",
        value: msg.content
      }],
      timestamp: ts
    }] as CodingAgentMessage[];
    break __patsy_temp_0;
  }
  if (geminiMessage?.type === "message" && geminiMessage?.role === "assistant") {
    let msg = geminiMessage;
    // Skip delta messages - these are streaming updates, not final messages
    if (msg.delta) {
      __result = [];
      break __patsy_temp_0;
    }
    __result = [{
      type: "assistant",
      content: [{
        type: "text",
        value: msg.content
      }],
      timestamp: ts
    }] as CodingAgentMessage[];
    break __patsy_temp_0;
  }
  if (geminiMessage?.type === "tool_use") {
    let msg = geminiMessage;
    const pathInfo = enrichWithPathInfo(msg.tool_name, msg.parameters, FILE_PATH_TOOLS, context.workspacePath);
    __result = [{
      type: "tool_use",
      body: {
        toolName: msg.tool_name,
        toolInput: msg.parameters,
        ...(pathInfo && {
          pathInfo
        })
      },
      timestamp: ts
    }] as CodingAgentMessage[];
    break __patsy_temp_0;
  }
  if (geminiMessage?.type === "tool_result") {
    let msg = geminiMessage;
    const header = `Tool ${msg.tool_id} result`;
    const body = msg.output && msg.output.trim().length > 0 ? msg.output : "(no output reported)";
    __result = [{
      type: "result",
      result: `${header}\n\n${body}`,
      is_error: msg.status === "error",
      timestamp: ts
    }] as CodingAgentMessage[];
    break __patsy_temp_0;
  }
  if (geminiMessage?.type === "result") {
    // Result messages are metadata - don't add to message history
    __result = [];
    break __patsy_temp_0;
  }
  // Unknown message type - ignore
  __result = [];
  break __patsy_temp_0;
}
