import { match } from 'ts-pattern';

declare const with: any;
declare const spawnDetached: any;
declare const otherwise: any;
declare const printLine: any;
declare const platform: any;

const __result = match(process.platform)
      .with("darwin", () => spawnDetached("open", [url]))
      .with("win32", () => spawnDetached("cmd", ["/c", "start", "", url]))
      .with("linux", () => spawnDetached("xdg-open", [url]))
      .otherwise(() => {
        printLine(
          `Automatic browser launch not supported on this platform. Please open the following URL in your browser: ${url}`,
        );
      });