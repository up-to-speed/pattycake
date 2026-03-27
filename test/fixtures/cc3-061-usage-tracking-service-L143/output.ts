import { match } from 'ts-pattern';
declare const feature: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (feature === "prompt") {
    __result = {
      timestamp,
      feature: "prompt" as const,
      agentType
    };
    break __patsy_temp_0;
  }
  if (feature === "walkthrough") {
    __result = {
      timestamp,
      feature: "walkthrough" as const
    };
    break __patsy_temp_0;
  }
  if (feature === "refactoring") {
    __result = {
      timestamp,
      feature: "refactoring" as const
    };
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(feature);
  } catch (e) {
    __patsy__displayedValue = feature;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
