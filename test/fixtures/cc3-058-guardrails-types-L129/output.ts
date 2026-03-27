import { match } from 'ts-pattern';
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = this.mode;
  if (__patsy_temp_1 === "allowlist") {
    if (!hasConfiguredPaths) {
      __result = {
        allowed: false,
        reason: "No allowed directories configured",
        guardrailName: this.name
      } as const;
      break __patsy_temp_0;
    }
    __result = isInSpecifiedPath ? {
      allowed: true
    } as const : {
      allowed: false,
      reason: `File path "${filePath}" is outside allowed directories`,
      guardrailName: this.name
    } as const;
    break __patsy_temp_0;
  }
  if (__patsy_temp_1 === "denylist") {
    __result = isInSpecifiedPath ? {
      allowed: false,
      reason: `File path "${filePath}" is in a forbidden directory`,
      guardrailName: this.name
    } as const : {
      allowed: true
    } as const;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(__patsy_temp_1);
  } catch (e) {
    __patsy__displayedValue = __patsy_temp_1;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
