import { match } from 'ts-pattern';
declare const intent: any;
declare const with: any;
declare const trackFeatureUsed: any;
declare const exhaustive: any;
declare const i: any;
declare const workspace: any;
declare const properly: any;
declare const issue: any;
let __result;
__patsy_temp_0: {
  if (intent?.type === "archived") {
    let i = intent;
    archivedProjectId = i.projectId;
    showArchivedDialog = true;
  }
  if (intent?.type === "config") {
    let i = intent;
    configProject = i.project;
    showConfigDialog = true;
  }
  if (intent?.type === "add-workspace") {
    let i = intent;
    dialogProjectId = i.projectId;
    showWorkspaceDialog = true;
  }
  if (intent?.type === "store") {
    showStoreDialog = true;
  }
  if (intent?.type === "rename") {
    let i = intent;
    renameWorkspaceId = i.workspace.id;
    renameWorkspaceName = i.workspace.name;
    showRenameDialog = true;
  }
  if (intent?.type === "view-logs") {
    let i = intent;
    logWorkspaceId = i.workspaceId;
    showLogDialog = true;
    void trackFeatureUsed("workspace_logs_viewed");
  }
  if (intent?.type === "delete-workspace") {
    let i = intent;
    deleteWorkspaceId = i.workspaceId;
    deleteWorkspaceName = i.name;
    showDeleteWorkspaceDialog = true;
    // TODO-TIME-PRESSURE 2026.03.01: Added under time pressure, not reviewed properly.
    // Possibly a hack — closes parent dialog to sidestep nested dialog z-index issue.
    showArchivedDialog = false;
  }
  if (intent?.type === "fork") {
    let i = intent;
    if (isMutating) {
      __result = undefined;
      break __patsy_temp_0;
    }
    forkTarget = {
      project: i.project,
      workspace: i.workspace
    };
    showForkDialog = true;
  }
  if (intent?.type === "none") {}
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(intent);
  } catch (e) {
    __patsy__displayedValue = intent;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
