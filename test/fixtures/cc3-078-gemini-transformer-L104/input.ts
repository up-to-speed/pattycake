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

const __result = match(geminiMessage)
    .with({ type: "init" }, () => {
      // Init messages are metadata - we extract session_id but don't add to message history
      return [];
    })
    .with({ type: "message", role: "user" }, (msg) => {
      if (options.skipUserMessage) {
        return [];
      }
      return [
        {
          type: "user",
          content: [{ type: "text", value: msg.content }],
          timestamp: ts,
        },
      ] as CodingAgentMessage[];
    })
    .with({ type: "message", role: "assistant" }, (msg) => {
      // Skip delta messages - these are streaming updates, not final messages
      if (msg.delta) {
        return [];
      }
      return [
        {
          type: "assistant",
          content: [{ type: "text", value: msg.content }],
          timestamp: ts,
        },
      ] as CodingAgentMessage[];
    })
    .with({ type: "tool_use" }, (msg) => {
      const pathInfo = enrichWithPathInfo(
        msg.tool_name,
        msg.parameters,
        FILE_PATH_TOOLS,
        context.workspacePath,
      );

      return [
        {
          type: "tool_use",
          body: {
            toolName: msg.tool_name,
            toolInput: msg.parameters,
            ...(pathInfo && { pathInfo }),
          },
          timestamp: ts,
        },
      ] as CodingAgentMessage[];
    })
    .with({ type: "tool_result" }, (msg) => {
      const header = `Tool ${msg.tool_id} result`;
      const body =
        msg.output && msg.output.trim().length > 0
          ? msg.output
          : "(no output reported)";
      return [
        {
          type: "result",
          result: `${header}\n\n${body}`,
          is_error: msg.status === "error",
          timestamp: ts,
        },
      ] as CodingAgentMessage[];
    })
    .with({ type: "result" }, () => {
      // Result messages are metadata - don't add to message history
      return [];
    })
    .otherwise(() => {
      // Unknown message type - ignore
      return [];
    });