import { match } from 'ts-pattern';

declare const file: any;
declare const with: any;
declare const exhaustive: any;

const __result = match(file)
    .with({ type: "ChangedFile" }, (file) => file.path)
    .with({ type: "AddedFile" }, (file) => file.path)
    .with({ type: "DeletedFile" }, (file) => file.path)
    .with({ type: "RenamedFile" }, (file) => file.pathAfter)
    .exhaustive();