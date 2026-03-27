import { match } from 'ts-pattern';

declare const intent: any;
declare const with: any;
declare const trackFeatureUsed: any;
declare const exhaustive: any;
declare const i: any;
declare const workspace: any;
declare const properly: any;
declare const issue: any;

const __result = match(intent)
        .with({ type: "archived" }, (i) => {
          archivedProjectId = i.projectId;
          showArchivedDialog = true;
        })
        .with({ type: "config" }, (i) => {
          configProject = i.project;
          showConfigDialog = true;
        })
        .with({ type: "add-workspace" }, (i) => {
          dialogProjectId = i.projectId;
          showWorkspaceDialog = true;
        })
        .with({ type: "store" }, () => {
          showStoreDialog = true;
        })
        .with({ type: "rename" }, (i) => {
          renameWorkspaceId = i.workspace.id;
          renameWorkspaceName = i.workspace.name;
          showRenameDialog = true;
        })
        .with({ type: "view-logs" }, (i) => {
          logWorkspaceId = i.workspaceId;
          showLogDialog = true;
          void trackFeatureUsed("workspace_logs_viewed");
        })
        .with({ type: "delete-workspace" }, (i) => {
          deleteWorkspaceId = i.workspaceId;
          deleteWorkspaceName = i.name;
          showDeleteWorkspaceDialog = true;
          // TODO-TIME-PRESSURE 2026.03.01: Added under time pressure, not reviewed properly.
          // Possibly a hack — closes parent dialog to sidestep nested dialog z-index issue.
          showArchivedDialog = false;
        })
        .with({ type: "fork" }, (i) => {
          if (isMutating) return;
          forkTarget = { project: i.project, workspace: i.workspace };
          showForkDialog = true;
        })
        .with({ type: "none" }, () => {})
        .exhaustive();