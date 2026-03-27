import { match, P } from 'ts-pattern';
declare const commitReference: any;
declare const with: any;
declare const exhaustive: any;
const __result = match(commitReference).with(STAGED_ONLY, () => isStagedFileError).with(WORKING_TREE, () => false).with(HEAD, () => false).with(DEFAULT_BRANCH, () => false).with(PARENT_BRANCH, () => false).with({
  type: "branch"
}, () => false).with(P.string, () => false).exhaustive();
