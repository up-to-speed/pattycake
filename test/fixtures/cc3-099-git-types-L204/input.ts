import { match, P } from 'ts-pattern';

declare const ref: any;
declare const with: any;
declare const exhaustive: any;
declare const branchRef: any;

const __result = match(ref)
      .with(WORKING_TREE, () => WORKING_TREE_STRING)
      .with(STAGED_ONLY, () => STAGED_ONLY_STRING)
      .with(HEAD, () => HEAD_STRING)
      .with(DEFAULT_BRANCH, () => DEFAULT_BRANCH_STRING)
      .with(PARENT_BRANCH, () => PARENT_BRANCH_STRING)
      .with(
        { type: "branch" },
        (branchRef) => `${BRANCH_PREFIX}${branchRef.name}`,
      )
      .with(P.string, (sha) => sha as string)
      .exhaustive();