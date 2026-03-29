import { match } from 'ts-pattern';
declare const repoKind: any;
declare const with: any;
declare const fetch: any;
declare const debug: any;
declare const setInterval: any;
declare const doFetch: any;
declare const toMilliseconds: any;
declare const toNumber: any;
declare const subscribe: any;
declare const syncCloneRefsFromRoot: any;
declare const onGitStateChanged: any;
declare const runAsyncSwallowingErrors: any;
declare const exhaustive: any;
declare const GitService: any;
declare const logger: any;
declare const REMOTE_FETCH_INTERVAL: any;
let __result;
__patsy_temp_0: {
  if (repoKind?.type === "root") {
    const doFetch = async () => {
      GitService.fetch(repoPath).catch(error => {
        // Don't log as error - network issues are expected sometimes
        logger.debug(`GitRepoWatcher: Fetch failed for ${repoPath}:`, error);
      });
    };
    const fetchInterval = setInterval(() => {
      void doFetch();
    }, REMOTE_FETCH_INTERVAL.toMilliseconds().toNumber());

    // Do an initial fetch
    void doFetch();
    __result = {
      type: "root" as const,
      fetchInterval
    };
    break __patsy_temp_0;
  }
  if (repoKind?.type === "clone") {
    const unsubscribeFromRoot = await this.subscribe(repoKind.rootRepoPath, {
      onFilesChanged: () => {},
      onGitStateChanged: async () => {
        await this.syncCloneRefsFromRoot(repoPath, repoKind.rootRepoPath);
        this.onGitStateChanged(subscribers);
      }
    });
    void runAsyncSwallowingErrors("GitRepoWatcher: Error in initial ref sync", () => this.syncCloneRefsFromRoot(repoPath, repoKind.rootRepoPath));
    logger.debug(`GitRepoWatcher: Registered clone ${repoPath} → root ${repoKind.rootRepoPath}`);
    __result = {
      ...repoKind,
      unsubscribeFromRoot
    };
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(repoKind);
  } catch (e) {
    __patsy__displayedValue = repoKind;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
