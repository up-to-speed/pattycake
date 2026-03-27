import { match } from 'ts-pattern';

declare const platform: any;
declare const with: any;
declare const otherwise: any;
declare const Platform: any;

const __result = match(platform)
    .with("win32", () => Platform.Windows)
    .with("darwin", () => Platform.MacOS)
    .otherwise(() => Platform.Linux);