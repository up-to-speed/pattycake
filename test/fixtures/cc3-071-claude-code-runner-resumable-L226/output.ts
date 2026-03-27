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
let __result;
__patsy_temp_0: {
  if (Object.is(block?.type, CONTENT_TYPES.TEXT)) {
    let b = block;
    blocks.push({
      type: CONTENT_TYPES.TEXT,
      text: b.value
    });
  }
  if (Object.is(block?.type, CONTENT_TYPES.CODE)) {
    let b = block;
    blocks.push({
      type: CONTENT_TYPES.TEXT,
      text: formatCodeBlockForText(b.value, b.language)
    });
  }
  if (Object.is(block?.type, CONTENT_TYPES.IMAGE)) {
    let b = block;
    if (!isSupportedImageMimeType(b.mimeType)) {
      throw new Error(`ClaudeCodeRunnerResumable: Unsupported image mime type ${b.mimeType}`);
    }
    blocks.push({
      type: CONTENT_TYPES.IMAGE,
      source: {
        type: "base64",
        media_type: b.mimeType,
        data: b.data
      }
    });
  }
  if (Object.is(block?.type, CONTENT_TYPES.TOOL_USE)) {
    throw new Error(`ClaudeCodeRunnerResumable: tool_use content blocks are not supported in user messages. Tool use blocks should be handled separately.`);
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(block);
  } catch (e) {
    __patsy__displayedValue = block;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
