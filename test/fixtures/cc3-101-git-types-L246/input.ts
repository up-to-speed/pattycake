import { match, P } from 'ts-pattern';

declare const ref: any;
declare const with: any;
declare const slice: any;
declare const exhaustive: any;
declare const branchRef: any;
declare const sha: any;

const __result = match(ref)
      .with(WORKING_TREE, () => "working tree")
      .with(STAGED_ONLY, () => "staged")
      .with(HEAD, () => "HEAD")
      .with(DEFAULT_BRANCH, () => "default branch")
      .with(PARENT_BRANCH, () => "parent branch")
      .with({ type: "branch" }, (branchRef) => branchRef.name)
      .with(P.string, (sha) => (sha.length > 7 ? sha.slice(0, 7) : sha))
      .exhaustive();