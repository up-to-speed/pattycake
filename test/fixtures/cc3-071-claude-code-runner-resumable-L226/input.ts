import { match } from 'ts-pattern';

declare const block: any;
declare const with: any;
declare const push: any;
declare const formatCodeBlockForText: any;
declare const isSupportedImageMimeType: any;
declare const exhaustive: any;
declare const CONTENT_TYPES: any;
declare const blocks: any;
declare const b: any;
declare const messages: any;
declare const separately: any;

const __result = match(block)
      .with({ type: CONTENT_TYPES.TEXT }, (b) => {
        blocks.push({ type: CONTENT_TYPES.TEXT, text: b.value });
      })
      .with({ type: CONTENT_TYPES.CODE }, (b) => {
        blocks.push({
          type: CONTENT_TYPES.TEXT,
          text: formatCodeBlockForText(b.value, b.language),
        });
      })
      .with({ type: CONTENT_TYPES.IMAGE }, (b) => {
        if (!isSupportedImageMimeType(b.mimeType)) {
          throw new Error(
            `ClaudeCodeRunnerResumable: Unsupported image mime type ${b.mimeType}`,
          );
        }

        blocks.push({
          type: CONTENT_TYPES.IMAGE,
          source: {
            type: "base64",
            media_type: b.mimeType,
            data: b.data,
          },
        });
      })
      .with({ type: CONTENT_TYPES.TOOL_USE }, () => {
        throw new Error(
          `ClaudeCodeRunnerResumable: tool_use content blocks are not supported in user messages. Tool use blocks should be handled separately.`,
        );
      })
      .exhaustive();