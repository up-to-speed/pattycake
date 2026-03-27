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
let __result;
__patsy_temp_0: {
  if (typeof CONTENT_TYPES.TEXT === "object" && CONTENT_TYPES.TEXT !== null ? Object.keys(CONTENT_TYPES.TEXT).every(k => block?.type != null && Object.is((block?.type)[k], CONTENT_TYPES.TEXT[k])) : Object.is(block?.type, CONTENT_TYPES.TEXT)) {
    let b = block;
    __result = {
      type: CONTENT_TYPES.TEXT,
      text: b.value
    };
    break __patsy_temp_0;
  }
  if (typeof CONTENT_TYPES.CODE === "object" && CONTENT_TYPES.CODE !== null ? Object.keys(CONTENT_TYPES.CODE).every(k => block?.type != null && Object.is((block?.type)[k], CONTENT_TYPES.CODE[k])) : Object.is(block?.type, CONTENT_TYPES.CODE)) {
    let b = block;
    __result = {
      // Codex SDK doesn't have separate code blocks, format as text
      type: CONTENT_TYPES.TEXT,
      text: formatCodeBlockForText(b.value, b.language)
    };
    break __patsy_temp_0;
  }
  if (typeof CONTENT_TYPES.IMAGE === "object" && CONTENT_TYPES.IMAGE !== null ? Object.keys(CONTENT_TYPES.IMAGE).every(k => block?.type != null && Object.is((block?.type)[k], CONTENT_TYPES.IMAGE[k])) : Object.is(block?.type, CONTENT_TYPES.IMAGE)) {
    let b = block;
    const imageId = createImageId();
    const imageBuffer = Buffer.from(b.data, "base64");

    // Persist image via injected storage strategy
    const imagePath = await imageStorage.saveImage(imageId, b.mimeType, imageBuffer);
    __result = {
      type: CODEX_LOCAL_IMAGE_TYPE,
      path: imagePath
    };
    break __patsy_temp_0;
  }
  if (typeof CONTENT_TYPES.TOOL_USE === "object" && CONTENT_TYPES.TOOL_USE !== null ? Object.keys(CONTENT_TYPES.TOOL_USE).every(k => block?.type != null && Object.is((block?.type)[k], CONTENT_TYPES.TOOL_USE[k])) : Object.is(block?.type, CONTENT_TYPES.TOOL_USE)) {
    throw new Error(`buildCodexUserInput: tool_use content blocks are not supported in user messages. Tool use blocks should be handled separately.`);
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(block);
  } catch (e) {
    __patsy__displayedValue = block;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}