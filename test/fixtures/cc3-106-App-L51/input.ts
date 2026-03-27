import { match } from 'ts-pattern';

declare const message: any;
declare const with: any;
declare const exhaustive: any;
declare const msg: any;
declare const viewerState: any;

const __result = match(message)
        .with({ type: "walkthroughs" }, (msg) => {
          listState = { status: "loaded", walkthroughs: msg.walkthroughs };
          if (viewerState.status === "loading") {
            viewerState = { status: "none" };
          }
          if (showSettings) {
            showSettings = false;
          }
        })
        .with({ type: "listError" }, (msg) => {
          listState = { status: "error", message: msg.error };
          viewerState = { status: "none" };
          showSettings = false;
        })
        .with({ type: "loading" }, () => {
          listState = { status: "loading" };
          if (viewerState.status === "none") {
            viewerState = { status: "none" };
          }
        })
        .with({ type: "viewWalkthrough" }, (msg) => {
          viewerState = { status: "loaded", walkthrough: msg.walkthrough };
          showSettings = false;
        })
        .with({ type: "viewLoading" }, () => {
          viewerState = { status: "loading" };
          showSettings = false;
        })
        .with({ type: "viewError" }, (msg) => {
          viewerState = { status: "error", message: msg.error };
          showSettings = false;
        })
        .with({ type: "showModelConfig" }, () => {
          viewerState = { status: "none" };
          showSettings = true;
        })
        .with({ type: "projectInfo" }, (msg) => {
          projectInfo = msg.projectInfo;
        })
        .exhaustive();