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

const __result = match(command)
        .with({ type: "ReplaceBySource" }, (cmd) => {
          const matchResult = findBestMatchBySource(
            translations,
            cmd.englishText,
          );
          if (!matchResult) {
            logger.warn(
              `processCommands: No match found for English text: "${cmd.englishText}"`,
            );
            return null;
          }

          return {
            englishKey: matchResult.key,
            currentTranslation: translations[matchResult.key] ?? null,
            proposedTranslation: cmd.foreignText,
          };
        })
        .with({ type: "ReplaceByTarget" }, (cmd) => {
          const matchResult = findBestMatchByTarget(
            translations,
            cmd.oldForeignText,
          );
          if (!matchResult) {
            logger.warn(
              `processCommands: No match found for foreign text: "${cmd.oldForeignText}"`,
            );
            return null;
          }

          return {
            englishKey: matchResult.key,
            currentTranslation: translations[matchResult.key] ?? null,
            proposedTranslation: cmd.newForeignText,
          };
        })
        .exhaustive();