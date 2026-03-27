import { match } from 'ts-pattern';

declare const block: any;
declare const with: any;
declare const push: any;
declare const otherwise: any;
declare const content: any;
declare const toolInput: any;

const __result = match(block)
        .with({ type: "text" }, (block) => {
          content.push({
            type: "text",
            value: block.text,
          });
        })
        .with({ type: "tool_use" }, (block) => {
          const toolInput = block.input as { command: string };
          content.push({
            type: "tool_use",
            toolName: block.name,
            toolInput: toolInput.command,
          });
        })
        .otherwise(() => {
          // 2025.08.22 jkoppel: Ignore other types for now
        });