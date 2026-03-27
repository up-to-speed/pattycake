import { match } from 'ts-pattern';

declare const languageCode: any;
declare const with: any;
declare const Chinese: any;
declare const exhaustive: any;

const __result = match(languageCode)
    .with("en", () => "English")
    .with("ja", () => "Japanese")
    .with("pl", () => "Polish")
    .with("ru", () => "Russian")
    .with("zh", () => "Chinese (Simplified)")
    .exhaustive();