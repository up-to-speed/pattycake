import { match, P } from 'ts-pattern';

declare const value: any;

const __result = match(value)
  .with({ name: P.string, age: P.optional(P.number) }, (v) => `${v.name} age ${v.age ?? 'unknown'}`)
  .otherwise(() => 'no match');
