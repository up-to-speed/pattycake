import { match } from 'ts-pattern';
declare const with: any;
declare const spawnDetached: any;
declare const otherwise: any;
declare const printLine: any;
declare const platform: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = process.platform;
  if (__patsy_temp_1 === "darwin") {
    __result = spawnDetached("open", [url]);
    break __patsy_temp_0;
  }
  if (__patsy_temp_1 === "win32") {
    __result = spawnDetached("cmd", ["/c", "start", "", url]);
    break __patsy_temp_0;
  }
  if (__patsy_temp_1 === "linux") {
    __result = spawnDetached("xdg-open", [url]);
    break __patsy_temp_0;
  }
  printLine(`Automatic browser launch not supported on this platform. Please open the following URL in your browser: ${url}`);
}
