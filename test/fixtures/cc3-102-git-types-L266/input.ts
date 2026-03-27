import { match, P } from 'ts-pattern';

declare const ref: any;
declare const with: any;
declare const exhaustive: any;

const __result = match(ref)
      .with(HEAD, () => "HEAD")
      .with(WORKING_TREE, () => {
        throw new Error(
          "WORKING_TREE cannot be converted to a git argument directly",
        );
      })
      .with(STAGED_ONLY, () => {
        throw new Error(
          "STAGED_ONLY cannot be converted to a git argument directly",
        );
      })
      .with(P.string, (sha) => sha)
      .exhaustive();