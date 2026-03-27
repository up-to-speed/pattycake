import { match } from 'ts-pattern';
declare const block: any;
declare const with: any;
declare const push: any;
declare const otherwise: any;
declare const content: any;
declare const toolInput: any;
let __result;
__patsy_temp_0: {
  if (block?.type === "text") {
    let block = block;
    content.push({
      type: "text",
      value: block.text
    });
  }
  if (block?.type === "tool_use") {
    let block = block;
    const toolInput = block.input as {
      command: string;
    };
    content.push({
      type: "tool_use",
      toolName: block.name,
      toolInput: toolInput.command
    });
  }
}
