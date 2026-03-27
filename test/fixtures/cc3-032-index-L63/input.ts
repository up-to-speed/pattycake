import { match } from 'ts-pattern';

declare const platform: any;
declare const with: any;
declare const WindowsDetector: any;
declare const MacOSDetector: any;
declare const LinuxDetector: any;
declare const exhaustive: any;

const __result = match(platform)
    .with("windows", () => new WindowsDetector())
    .with("macos", () => new MacOSDetector())
    .with("linux", () => new LinuxDetector())
    .exhaustive();