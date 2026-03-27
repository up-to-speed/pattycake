import { match } from 'ts-pattern';

declare const platform: any;
declare const with: any;
declare const exhaustive: any;

const __result = match(platform)
    .with("windows", () => true)
    .with("mac", () => true)
    .with("linux", () => false)
    .exhaustive();