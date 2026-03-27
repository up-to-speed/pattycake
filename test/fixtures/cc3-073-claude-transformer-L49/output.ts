import { match, P } from 'ts-pattern';
declare const block: any;
declare const with: any;
declare const push: any;
declare const enrichWithPathInfo: any;
declare const otherwise: any;
declare const textContent: any;
declare const textBlock: any;
declare const toolBlock: any;
declare const assistantMessages: any;
declare const unknownBlock: any;
let __result;
__patsy_temp_0: {
  if (block?.type === "text" && typeof block?.text === "string") {
    let textBlock: {
      text: string;
    } = block;
    textContent.push({
      type: "text",
      value: textBlock.text
    });
  }
  if (block?.type === "tool_use") {
    let toolBlock: {
      name: string;
      input: unknown;
    } = block;
    const pathInfo = enrichWithPathInfo(toolBlock.name, toolBlock.input, FILE_PATH_TOOLS, workspacePath);
    assistantMessages.push({
      type: "tool_use",
      body: {
        toolName: toolBlock.name,
        toolInput: toolBlock.input as ToolInputSchemas,
        ...(pathInfo && {
          pathInfo
        })
      },
      timestamp
    });
  }
  let unknownBlock: {
    type?: string;
  } = block;
  assistantMessages.push({
    type: "system",
    message: `Unhandled assistant block type: ${String(unknownBlock.type)}`,
    data: unknownBlock,
    timestamp
  });
}
