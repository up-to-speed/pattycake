import { match } from 'ts-pattern';
declare const data: any;
declare const with: any;
declare const PromptAction: any;
declare const CommandAction: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (data?.type === "prompt") {
    let {
      content
    } = data;
    __result = new PromptAction(content);
    break __patsy_temp_0;
  }
  if (data?.type === "command") {
    let {
      command
    } = data;
    __result = new CommandAction(command);
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(data);
  } catch (e) {
    __patsy__displayedValue = data;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
