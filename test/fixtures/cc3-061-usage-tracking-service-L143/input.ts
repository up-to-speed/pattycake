import { match } from 'ts-pattern';

declare const feature: any;
declare const with: any;
declare const exhaustive: any;

const __result = match(feature)
    .with("prompt", () => ({
      timestamp,
      feature: "prompt" as const,
      agentType,
    }))
    .with("walkthrough", () => ({ timestamp, feature: "walkthrough" as const }))
    .with("refactoring", () => ({
      timestamp,
      feature: "refactoring" as const,
    }))
    .exhaustive();