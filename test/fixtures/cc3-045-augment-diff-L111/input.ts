import { match } from 'ts-pattern';

declare const with: any;
declare const otherwise: any;

const __result = match([additions > 0, deletions > 0])
    .with([true, true], () => "modify" as const)
    .with([false, true], () => "delete" as const)
    .with([true, false], () => "add" as const)
    .otherwise(() => "add" as const);