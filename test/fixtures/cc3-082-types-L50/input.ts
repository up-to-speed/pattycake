import { match } from 'ts-pattern';

declare const data: any;
declare const with: any;
declare const PromptAction: any;
declare const CommandAction: any;
declare const exhaustive: any;

const __result = match(data)
        .with({ type: "prompt" }, ({ content }) => new PromptAction(content))
        .with({ type: "command" }, ({ command }) => new CommandAction(command))
        .exhaustive();