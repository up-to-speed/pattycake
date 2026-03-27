import { match } from 'ts-pattern';
declare const message: any;
declare const with: any;
declare const exhaustive: any;
declare const msg: any;
declare const viewerState: any;
let __result;
__patsy_temp_0: {
  if (message?.type === "walkthroughs") {
    let msg = message;
    listState = {
      status: "loaded",
      walkthroughs: msg.walkthroughs
    };
    if (viewerState.status === "loading") {
      viewerState = {
        status: "none"
      };
    }
    if (showSettings) {
      showSettings = false;
    }
  }
  if (message?.type === "listError") {
    let msg = message;
    listState = {
      status: "error",
      message: msg.error
    };
    viewerState = {
      status: "none"
    };
    showSettings = false;
  }
  if (message?.type === "loading") {
    listState = {
      status: "loading"
    };
    if (viewerState.status === "none") {
      viewerState = {
        status: "none"
      };
    }
  }
  if (message?.type === "viewWalkthrough") {
    let msg = message;
    viewerState = {
      status: "loaded",
      walkthrough: msg.walkthrough
    };
    showSettings = false;
  }
  if (message?.type === "viewLoading") {
    viewerState = {
      status: "loading"
    };
    showSettings = false;
  }
  if (message?.type === "viewError") {
    let msg = message;
    viewerState = {
      status: "error",
      message: msg.error
    };
    showSettings = false;
  }
  if (message?.type === "showModelConfig") {
    viewerState = {
      status: "none"
    };
    showSettings = true;
  }
  if (message?.type === "projectInfo") {
    let msg = message;
    projectInfo = msg.projectInfo;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(message);
  } catch (e) {
    __patsy__displayedValue = message;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
