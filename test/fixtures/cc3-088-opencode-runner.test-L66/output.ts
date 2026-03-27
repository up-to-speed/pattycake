import { match } from 'ts-pattern';
declare const status: any;
declare const with: any;
declare const exhaustive: any;
declare const opts: any;
let __result;
__patsy_temp_0: {
  if (status === "pending") {
    __result = {
      ...common,
      state: {
        status: "pending" as const,
        input,
        raw: ""
      }
    };
    break __patsy_temp_0;
  }
  if (status === "running") {
    __result = {
      ...common,
      state: {
        status: "running" as const,
        input,
        time: {
          start: 0
        }
      }
    };
    break __patsy_temp_0;
  }
  if (status === "completed") {
    __result = {
      ...common,
      state: {
        status: "completed" as const,
        input,
        output: opts.output ?? "tool output",
        title: "Running bash",
        metadata: {},
        time: {
          start: 0,
          end: 1
        }
      }
    };
    break __patsy_temp_0;
  }
  if (status === "error") {
    __result = {
      ...common,
      state: {
        status: "error" as const,
        input,
        error: opts.error ?? "something went wrong",
        time: {
          start: 0,
          end: 1
        }
      }
    };
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(status);
  } catch (e) {
    __patsy__displayedValue = status;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
