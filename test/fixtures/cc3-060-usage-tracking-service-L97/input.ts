import { match } from 'ts-pattern';

declare const window: any;
declare const with: any;
declare const setHours: any;
declare const setDate: any;
declare const getDate: any;
declare const getDay: any;
declare const exhaustive: any;
declare const d: any;

const __result = match(window)
    .with("day", () => {
      const d = new Date(now);
      d.setHours(0, 0, 0, 0);
      return d;
    })
    .with("week", () => {
      const d = new Date(now);
      // Sunday = 0
      d.setDate(d.getDate() - d.getDay());
      d.setHours(0, 0, 0, 0);
      return d;
    })
    .with("month", () => {
      const d = new Date(now);
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      return d;
    })
    .exhaustive();