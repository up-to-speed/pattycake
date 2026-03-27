import { match } from 'ts-pattern';

declare const mimeType: any;
declare const with: any;
declare const exhaustive: any;

const __result = match(mimeType)
    .with("image/png", () => ".png")
    .with("image/jpeg", () => ".jpg")
    .with("image/webp", () => ".webp")
    .with("image/gif", () => ".gif")
    .exhaustive();