import { match } from 'ts-pattern';

declare const with: any;
declare const exhaustive: any;

const __result = match(this.mode)
      .with("allowlist", () => {
        if (!hasConfiguredPaths) {
          return {
            allowed: false,
            reason: "No allowed directories configured",
            guardrailName: this.name,
          } as const;
        }

        return isInSpecifiedPath
          ? ({ allowed: true } as const)
          : ({
              allowed: false,
              reason: `File path "${filePath}" is outside allowed directories`,
              guardrailName: this.name,
            } as const);
      })
      .with("denylist", () => {
        return isInSpecifiedPath
          ? ({
              allowed: false,
              reason: `File path "${filePath}" is in a forbidden directory`,
              guardrailName: this.name,
            } as const)
          : ({ allowed: true } as const);
      })
      .exhaustive();