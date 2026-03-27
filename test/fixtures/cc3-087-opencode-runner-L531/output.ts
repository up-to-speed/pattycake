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
let __result;
__patsy_temp_0: {
  if (event?.type === "message.part.updated") {
    let e = event;
    if (e.properties.part.sessionID !== options.sessionId) {
      __result = undefined;
      break __patsy_temp_0;
    }
    const emittedCount = this.emitMessagesFromPart(e.properties.part, options.dedupe, false);
    if (emittedCount > 0) options.streamedPartIds.add(e.properties.part.id);
  }
  if (event?.type === "session.status") {
    let e = event;
    if (e.properties.sessionID !== options.sessionId) {
      __result = undefined;
      break __patsy_temp_0;
    }
    if (e.properties.status.type === "idle") {
      options.onSessionIdle();
    }
    if (e.properties.status.type === "retry") {
      const {
        attempt,
        message
      } = e.properties.status;
      logger.warn(`OpenCodeSession: Provider retry attempt ${attempt}: ${message}`);
      options.onRetry(attempt, message);
      if (attempt >= MAX_PROVIDER_RETRY_ATTEMPTS) {
        logger.error(`OpenCodeSession: Provider retry limit (${MAX_PROVIDER_RETRY_ATTEMPTS}) exceeded, aborting prompt`);
        options.onRetryLimitExceeded(message);
      }
    }
  }
  if (event?.type === "session.idle") {
    let e = event;
    if (e.properties.sessionID !== options.sessionId) {
      __result = undefined;
      break __patsy_temp_0;
    }
    options.onSessionIdle();
  }
  __result = undefined;
  break __patsy_temp_0;
}
