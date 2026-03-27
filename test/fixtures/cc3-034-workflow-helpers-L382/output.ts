import { match } from 'ts-pattern';
declare const entry: any;
declare const with: any;
declare const qualifyStepId: any;
declare const makeLeafTallyRec: any;
declare const branch: any;
declare const conditions: any;
declare const max: any;
declare const map: any;
declare const flatMap: any;
declare const exhaustive: any;
declare const e: any;
declare const step: any;
declare const denominator: any;
declare const steps: any;
declare const branchTallies: any;
declare const t: any;
let __result;
__patsy_temp_0: {
  if (entry?.type === "step") {
    let e = entry;
    const fullPath = qualifyStepId(prefix, e.step.id);
    __result = e.step.serializedStepFlow?.length ? makeLeafTallyRec(e.step.serializedStepFlow, fullPath) : {
      leafStepPaths: new Set([fullPath]),
      expectedLeafCount: 1
    };
    break __patsy_temp_0;
  }
  if (entry?.type === "parallel") {
    let e = entry;
    __result = makeLeafTallyRec(e.steps, prefix);
    break __patsy_temp_0;
  }
  if (entry?.type === "conditional") {
    let e = entry;
    // .branch() runs ALL true conditions ("filtered parallel"), not just first match.
    // Include all paths; use max(branch sizes) as denominator.
    const branchTallies = e.steps.map(s => makeLeafTallyRec([s], prefix));
    __result = {
      leafStepPaths: new Set(branchTallies.flatMap(t => [...t.leafStepPaths])),
      expectedLeafCount: Math.max(0, ...branchTallies.map(t => t.expectedLeafCount))
    };
    break __patsy_temp_0;
  }
  if (entry?.type === "foreach" || entry?.type === "loop") {
    let e = entry;
    __result = {
      leafStepPaths: new Set([qualifyStepId(prefix, e.step.id)]),
      expectedLeafCount: 1
    };
    break __patsy_temp_0;
  }
  if (entry?.type === "sleep" || entry?.type === "sleepUntil") {
    let e = entry;
    __result = {
      leafStepPaths: new Set([qualifyStepId(prefix, e.id)]),
      expectedLeafCount: 1
    };
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(entry);
  } catch (e) {
    __patsy__displayedValue = entry;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
