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
let __result;
__patsy_temp_0: {
  if (message?.command === "openWalkthrough") {
    let msg = message;
    await this.fetchAndDisplayWalkthrough(msg.id);
  }
  if (message?.command === "createWalkthrough") {
    vscode.commands.executeCommand(COMMANDS.CREATE_WALKTHROUGH_UNCOMMITTED);
  }
  if (message?.command === "deleteWalkthrough") {
    let msg = message;
    await this.deleteWalkthrough(msg.id);
  }
  if (message?.command === "refresh") {
    await this.refreshWalkthroughsList();
  }
  if (message?.command === "openFullCommandCenter") {
    this.openFullCommandCenter();
  }
  if (message?.command === "openConfigureApiKeys") {
    await this.openConfigureApiKeys();
  }
  if (message?.command === "openFileAtLine") {
    let msg = message;
    await this.openFileAtLine(msg.path, msg.lineNumber);
  }
}
