import { match } from 'ts-pattern';

declare const block: any;
declare const with: any;
declare const formatCodeBlockForText: any;
declare const createImageId: any;
declare const from: any;
declare const saveImage: any;
declare const exhaustive: any;
declare const CONTENT_TYPES: any;
declare const b: any;
declare const Buffer: any;
declare const imageStorage: any;
declare const messages: any;
declare const separately: any;

const __result = match(block)
      .with(
        { type: CONTENT_TYPES.TEXT },
        (b): UserInput => ({
          type: CONTENT_TYPES.TEXT,
          text: b.value,
        }),
      )
      .with(
        { type: CONTENT_TYPES.CODE },
        (b): UserInput => ({
          // Codex SDK doesn't have separate code blocks, format as text
          type: CONTENT_TYPES.TEXT,
          text: formatCodeBlockForText(b.value, b.language),
        }),
      )
      .with({ type: CONTENT_TYPES.IMAGE }, async (b): Promise<UserInput> => {
        const imageId = createImageId();
        const imageBuffer = Buffer.from(b.data, "base64");

        // Persist image via injected storage strategy
        const imagePath = await imageStorage.saveImage(
          imageId,
          b.mimeType,
          imageBuffer,
        );

        return { type: CODEX_LOCAL_IMAGE_TYPE, path: imagePath };
      })
      .with({ type: CONTENT_TYPES.TOOL_USE }, () => {
        throw new Error(
          `buildCodexUserInput: tool_use content blocks are not supported in user messages. Tool use blocks should be handled separately.`,
        );
      })
      .exhaustive();