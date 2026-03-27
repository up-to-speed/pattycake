import { match } from 'ts-pattern';
declare const kind: any;
declare const with: any;
declare const JSONLStorageComponent: any;
declare const JSONStorageComponent: any;
declare const exhaustive: any;
declare const StorageKind: any;
declare const options: any;
let __result;
__patsy_temp_0: {
  if (typeof StorageKind.JSONL === "object" && StorageKind.JSONL !== null ? Object.keys(StorageKind.JSONL).every(k => kind != null && Object.is(kind[k], StorageKind.JSONL[k])) : Object.is(kind, StorageKind.JSONL)) {
    __result = new JSONLStorageComponent(filePath, schema, options.versioning, options.fileMode);
    break __patsy_temp_0;
  }
  if (typeof StorageKind.JSON === "object" && StorageKind.JSON !== null ? Object.keys(StorageKind.JSON).every(k => kind != null && Object.is(kind[k], StorageKind.JSON[k])) : Object.is(kind, StorageKind.JSON)) {
    __result = new JSONStorageComponent(filePath, schema, options.versioning, options.fileMode);
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(kind);
  } catch (e) {
    __patsy__displayedValue = kind;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}