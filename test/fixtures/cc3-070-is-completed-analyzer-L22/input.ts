import { match } from 'ts-pattern';

declare const confidence: any;
declare const with: any;
declare const exhaustive: any;
declare const Confidence: any;

const __result = match(confidence)
    .with("high", () => Confidence.High)
    .with("medium", () => Confidence.Medium)
    .with("low", () => Confidence.Low)
    .exhaustive();