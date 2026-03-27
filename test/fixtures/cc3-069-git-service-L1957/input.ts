import { match } from 'ts-pattern';

declare const status: any;
declare const with: any;
declare const otherwise: any;
declare const GitConflictType: any;

const __result = match(status)
              .with("DD", () => GitConflictType.BothDeleted)
              .with("AU", () => GitConflictType.AddedByUs)
              .with("UD", () => GitConflictType.DeletedByThem)
              .with("UA", () => GitConflictType.AddedByThem)
              .with("DU", () => GitConflictType.DeletedByUs)
              .with("AA", () => GitConflictType.BothAdded)
              .with("UU", () => GitConflictType.BothModified)
              .otherwise(() => null);