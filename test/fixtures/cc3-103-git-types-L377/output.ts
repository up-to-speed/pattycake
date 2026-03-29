import { match } from 'ts-pattern';
declare const file: any;
declare const with: any;
declare const exhaustive: any;
let __result;
__patsy_temp_0: {
  if (file?.type === "ChangedFile") {
    __result = file.path;
    break __patsy_temp_0;
  }
  if (file?.type === "AddedFile") {
    __result = file.path;
    break __patsy_temp_0;
  }
  if (file?.type === "DeletedFile") {
    __result = file.path;
    break __patsy_temp_0;
  }
  if (file?.type === "RenamedFile") {
    __result = file.pathAfter;
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(file);
  } catch (e) {
    __patsy__displayedValue = file;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
