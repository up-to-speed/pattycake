import { match } from 'ts-pattern';

declare const message: any;
declare const with: any;
declare const fetchAndDisplayWalkthrough: any;
declare const executeCommand: any;
declare const deleteWalkthrough: any;
declare const refreshWalkthroughsList: any;
declare const openFullCommandCenter: any;
declare const openConfigureApiKeys: any;
declare const openFileAtLine: any;
declare const otherwise: any;
declare const msg: any;
declare const vscode: any;
declare const commands: any;
declare const COMMANDS: any;

const __result = match(message)
      .with({ command: "openWalkthrough" }, async (msg) => {
        await this.fetchAndDisplayWalkthrough(msg.id);
      })
      .with({ command: "createWalkthrough" }, () => {
        vscode.commands.executeCommand(COMMANDS.CREATE_WALKTHROUGH_UNCOMMITTED);
      })
      .with({ command: "deleteWalkthrough" }, async (msg) => {
        await this.deleteWalkthrough(msg.id);
      })
      .with({ command: "refresh" }, async () => {
        await this.refreshWalkthroughsList();
      })
      .with({ command: "openFullCommandCenter" }, () => {
        this.openFullCommandCenter();
      })
      .with({ command: "openConfigureApiKeys" }, async () => {
        await this.openConfigureApiKeys();
      })
      .with({ command: "openFileAtLine" }, async (msg) => {
        await this.openFileAtLine(msg.path, msg.lineNumber);
      })
      .otherwise(() => {
        // Unknown command - silently ignore
      });