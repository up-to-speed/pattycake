import { match } from 'ts-pattern';

declare const with: any;
declare const otherwise: any;

const __result = match(process.platform)
    .with("darwin", () => "mac" as const)
    .with("win32", () => "windows" as const)
    .otherwise(() => "linux" as const);