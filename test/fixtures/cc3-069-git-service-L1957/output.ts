import { match } from 'ts-pattern';
declare const status: any;
declare const with: any;
declare const otherwise: any;
declare const GitConflictType: any;
let __result;
__patsy_temp_0: {
  if (status === "DD") {
    __result = GitConflictType.BothDeleted;
    break __patsy_temp_0;
  }
  if (status === "AU") {
    __result = GitConflictType.AddedByUs;
    break __patsy_temp_0;
  }
  if (status === "UD") {
    __result = GitConflictType.DeletedByThem;
    break __patsy_temp_0;
  }
  if (status === "UA") {
    __result = GitConflictType.AddedByThem;
    break __patsy_temp_0;
  }
  if (status === "DU") {
    __result = GitConflictType.DeletedByUs;
    break __patsy_temp_0;
  }
  if (status === "AA") {
    __result = GitConflictType.BothAdded;
    break __patsy_temp_0;
  }
  if (status === "UU") {
    __result = GitConflictType.BothModified;
    break __patsy_temp_0;
  }
  __result = null;
  break __patsy_temp_0;
}
