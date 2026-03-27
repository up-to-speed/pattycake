import { match } from 'ts-pattern';
declare const with: any;
declare const error: any;
declare const debug: any;
declare const parseResults: any;
declare const otherwise: any;
declare const result: any;
declare const GrepLikeExitCode: any;
declare const logger: any;
declare const results: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = result.exitCode;
  if (Object.is(__patsy_temp_1, GrepLikeExitCode.ERROR)) {
    // TODO 2025.12.09: it should be possible to have the logger add the function name, without having to add it in the message
    logger.error(`handleSearchToolExitCode: ${toolName} error`, {
      exitCode: result.exitCode,
      stderr: result.stderr
    });
    __result = {
      success: false,
      error: `${toolName} failed with exit code ${result.exitCode}: ${result.stderr || result.stdout}`
    };
    break __patsy_temp_0;
  }
  if (Object.is(__patsy_temp_1, GrepLikeExitCode.NO_MATCHES)) {
    logger.debug("handleSearchToolExitCode: No matches found", {
      query
    });
    __result = {
      success: true,
      results: [],
      count: 0
    };
    break __patsy_temp_0;
  }
  if (Object.is(__patsy_temp_1, GrepLikeExitCode.MATCHES_FOUND)) {
    logger.debug(`handleSearchToolExitCode: ${toolName} output`, {
      stdout: result.stdout
    });
    const stdout = typeof result.stdout === "string" ? result.stdout : "";
    const results = parseResults(stdout);
    __result = {
      success: true,
      results,
      count: results.length
    };
    break __patsy_temp_0;
  }
  // Unexpected exit code
  logger.error(`handleSearchToolExitCode: Unexpected ${toolName} exit code`, {
    exitCode: result.exitCode
  });
  __result = {
    success: false,
    error: `Unexpected ${toolName} exit code: ${result.exitCode}`
  };
  break __patsy_temp_0;
}
