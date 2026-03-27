import { match } from 'ts-pattern';
declare const confidence: any;
declare const with: any;
declare const exhaustive: any;
declare const Confidence: any;
let __result;
__patsy_temp_0: {
  if (confidence === "high") {
    __result = Confidence.High;
    break __patsy_temp_0;
  }
  if (confidence === "medium") {
    __result = Confidence.Medium;
    break __patsy_temp_0;
  }
  if (confidence === "low") {
    __result = Confidence.Low;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(confidence);
  } catch (e) {
    __patsy__displayedValue = confidence;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
