import { match } from 'ts-pattern';

declare const event: any;
declare const with: any;
declare const emitMessagesFromPart: any;
declare const add: any;
declare const onSessionIdle: any;
declare const warn: any;
declare const onRetry: any;
declare const error: any;
declare const limit: any;
declare const onRetryLimitExceeded: any;
declare const otherwise: any;
declare const message: any;
declare const part: any;
declare const e: any;
declare const properties: any;
declare const options: any;
declare const streamedPartIds: any;
declare const session: any;
declare const status: any;
declare const logger: any;

const __result = match(event)
      .with({ type: "message.part.updated" }, (e) => {
        if (e.properties.part.sessionID !== options.sessionId) return;
        const emittedCount = this.emitMessagesFromPart(
          e.properties.part,
          options.dedupe,
          false,
        );
        if (emittedCount > 0) options.streamedPartIds.add(e.properties.part.id);
      })
      .with({ type: "session.status" }, (e) => {
        if (e.properties.sessionID !== options.sessionId) return;
        if (e.properties.status.type === "idle") {
          options.onSessionIdle();
        }
        if (e.properties.status.type === "retry") {
          const { attempt, message } = e.properties.status;
          logger.warn(
            `OpenCodeSession: Provider retry attempt ${attempt}: ${message}`,
          );
          options.onRetry(attempt, message);
          if (attempt >= MAX_PROVIDER_RETRY_ATTEMPTS) {
            logger.error(
              `OpenCodeSession: Provider retry limit (${MAX_PROVIDER_RETRY_ATTEMPTS}) exceeded, aborting prompt`,
            );
            options.onRetryLimitExceeded(message);
          }
        }
      })
      .with({ type: "session.idle" }, (e) => {
        if (e.properties.sessionID !== options.sessionId) return;
        options.onSessionIdle();
      })
      .otherwise(() => undefined);