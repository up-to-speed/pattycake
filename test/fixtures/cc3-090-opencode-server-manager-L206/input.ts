import { match, P } from 'ts-pattern';

declare const with: any;
declare const startSubprocess: any;
declare const spawnBundled: any;
declare const spawnSystem: any;
declare const exhaustive: any;
declare const m: any;

const __result = match(this.mode)
      .with({ type: "bundled" }, () =>
        this.startSubprocess((env) => this.spawnBundled(env)),
      )
      .with({ type: "system", binaryPath: P.string }, (m) =>
        this.startSubprocess((env) => this.spawnSystem(env, m.binaryPath)),
      )
      .exhaustive();