import { match } from 'ts-pattern';
declare const command: any;
declare const with: any;
declare const findBestMatchBySource: any;
declare const warn: any;
declare const findBestMatchByTarget: any;
declare const exhaustive: any;
declare const cmd: any;
declare const logger: any;
declare const matchResult: any;
let __result;
__patsy_temp_0: {
  if (command?.type === "ReplaceBySource") {
    let cmd = command;
    const matchResult = findBestMatchBySource(translations, cmd.englishText);
    if (!matchResult) {
      logger.warn(`processCommands: No match found for English text: "${cmd.englishText}"`);
      __result = null;
      break __patsy_temp_0;
    }
    __result = {
      englishKey: matchResult.key,
      currentTranslation: translations[matchResult.key] ?? null,
      proposedTranslation: cmd.foreignText
    };
    break __patsy_temp_0;
  }
  if (command?.type === "ReplaceByTarget") {
    let cmd = command;
    const matchResult = findBestMatchByTarget(translations, cmd.oldForeignText);
    if (!matchResult) {
      logger.warn(`processCommands: No match found for foreign text: "${cmd.oldForeignText}"`);
      __result = null;
      break __patsy_temp_0;
    }
    __result = {
      englishKey: matchResult.key,
      currentTranslation: translations[matchResult.key] ?? null,
      proposedTranslation: cmd.newForeignText
    };
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(command);
  } catch (e) {
    __patsy__displayedValue = command;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
