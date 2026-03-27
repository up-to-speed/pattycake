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

const __result = match(entry)
        .with({ type: "step" }, (e) => {
          const fullPath = qualifyStepId(prefix, e.step.id);
          return e.step.serializedStepFlow?.length
            ? makeLeafTallyRec(e.step.serializedStepFlow, fullPath)
            : { leafStepPaths: new Set([fullPath]), expectedLeafCount: 1 };
        })
        .with({ type: "parallel" }, (e) => makeLeafTallyRec(e.steps, prefix))
        .with({ type: "conditional" }, (e) => {
          // .branch() runs ALL true conditions ("filtered parallel"), not just first match.
          // Include all paths; use max(branch sizes) as denominator.
          const branchTallies = e.steps.map((s) =>
            makeLeafTallyRec([s], prefix),
          );
          return {
            leafStepPaths: new Set(
              branchTallies.flatMap((t) => [...t.leafStepPaths]),
            ),
            expectedLeafCount: Math.max(
              0,
              ...branchTallies.map((t) => t.expectedLeafCount),
            ),
          };
        })
        .with({ type: "foreach" }, { type: "loop" }, (e) => ({
          leafStepPaths: new Set([qualifyStepId(prefix, e.step.id)]),
          expectedLeafCount: 1,
        }))
        .with({ type: "sleep" }, { type: "sleepUntil" }, (e) => ({
          leafStepPaths: new Set([qualifyStepId(prefix, e.id)]),
          expectedLeafCount: 1,
        }))
        .exhaustive();