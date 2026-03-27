import { match } from 'ts-pattern';

declare const preset: any;
declare const with: any;
declare const toLocaleDateString: any;
declare const toLocaleString: any;
declare const toLocaleTimeString: any;
declare const exhaustive: any;
declare const date: any;

const __result = match(preset)
    .with("date", () => date.toLocaleDateString(locale, formatOptions))
    .with("datetime", () => date.toLocaleString(locale, formatOptions))
    .with("time", () => date.toLocaleTimeString(locale, formatOptions))
    .exhaustive();