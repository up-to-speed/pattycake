import { match } from 'ts-pattern';

declare const kind: any;
declare const with: any;
declare const JSONLStorageComponent: any;
declare const JSONStorageComponent: any;
declare const exhaustive: any;
declare const StorageKind: any;
declare const options: any;

const __result = match(kind)
      .with(
        StorageKind.JSONL,
        () =>
          new JSONLStorageComponent(
            filePath,
            schema,
            options.versioning,
            options.fileMode,
          ),
      )
      .with(
        StorageKind.JSON,
        () =>
          new JSONStorageComponent(
            filePath,
            schema,
            options.versioning,
            options.fileMode,
          ),
      )
      .exhaustive();