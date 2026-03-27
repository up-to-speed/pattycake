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

const __result = match(block)
        .with(
          { type: "text", text: P.string },
          (textBlock: { text: string }) => {
            textContent.push({
              type: "text",
              value: textBlock.text,
            });
          },
        )
        .with(
          { type: "tool_use" },
          (toolBlock: { name: string; input: unknown }) => {
            const pathInfo = enrichWithPathInfo(
              toolBlock.name,
              toolBlock.input,
              FILE_PATH_TOOLS,
              workspacePath,
            );

            assistantMessages.push({
              type: "tool_use",
              body: {
                toolName: toolBlock.name,
                toolInput: toolBlock.input as ToolInputSchemas,
                ...(pathInfo && { pathInfo }),
              },
              timestamp,
            });
          },
        )
        .otherwise((unknownBlock: { type?: string }) => {
          assistantMessages.push({
            type: "system",
            message: `Unhandled assistant block type: ${String(unknownBlock.type)}`,
            data: unknownBlock,
            timestamp,
          });
        });