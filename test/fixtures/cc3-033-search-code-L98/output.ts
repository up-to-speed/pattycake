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
const __result = match(result.exitCode).with(GrepLikeExitCode.ERROR, (): SearchResult => {
  // TODO 2025.12.09: it should be possible to have the logger add the function name, without having to add it in the message
  logger.error(`handleSearchToolExitCode: ${toolName} error`, {
    exitCode: result.exitCode,
    stderr: result.stderr
  });
  return {
    success: false,
    error: `${toolName} failed with exit code ${result.exitCode}: ${result.stderr || result.stdout}`
  };
}).with(GrepLikeExitCode.NO_MATCHES, (): SearchResult => {
  logger.debug("handleSearchToolExitCode: No matches found", {
    query
  });
  return {
    success: true,
    results: [],
    count: 0
  };
}).with(GrepLikeExitCode.MATCHES_FOUND, (): SearchResult => {
  logger.debug(`handleSearchToolExitCode: ${toolName} output`, {
    stdout: result.stdout
  });
  const stdout = typeof result.stdout === "string" ? result.stdout : "";
  const results = parseResults(stdout);
  return {
    success: true,
    results,
    count: results.length
  };
}).otherwise((): SearchResult => {
  // Unexpected exit code
  logger.error(`handleSearchToolExitCode: Unexpected ${toolName} exit code`, {
    exitCode: result.exitCode
  });
  return {
    success: false,
    error: `Unexpected ${toolName} exit code: ${result.exitCode}`
  };
});
