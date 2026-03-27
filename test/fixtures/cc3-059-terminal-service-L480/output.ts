import { match } from 'ts-pattern';
declare const with: any;
declare const otherwise: any;
declare const env: any;
declare const iTerm: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = env.TERM_PROGRAM;
  if (__patsy_temp_1 === "iTerm.app") {
    __result = "iterm" as const;
    break __patsy_temp_0;
  }
  if (__patsy_temp_1 === "vscode") {
    __result = "vscode" as const;
    break __patsy_temp_0;
  }
  if (__patsy_temp_1 === "cursor") {
    __result = "cursor" as const;
    break __patsy_temp_0;
  }
  __result = "system" as const;
  break __patsy_temp_0;
}
