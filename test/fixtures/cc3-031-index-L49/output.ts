import { match } from 'ts-pattern';
declare const platform: any;
declare const with: any;
declare const otherwise: any;
declare const Platform: any;
let __result;
__patsy_temp_0: {
  if (platform === "win32") {
    __result = Platform.Windows;
    break __patsy_temp_0;
  }
  if (platform === "darwin") {
    __result = Platform.MacOS;
    break __patsy_temp_0;
  }
  __result = Platform.Linux;
  break __patsy_temp_0;
}
