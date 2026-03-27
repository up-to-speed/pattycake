import { match } from 'ts-pattern';

declare const status: any;
declare const with: any;
declare const exhaustive: any;
declare const opts: any;

const __result = match(status)
    .with("pending", () => ({
      ...common,
      state: { status: "pending" as const, input, raw: "" },
    }))
    .with("running", () => ({
      ...common,
      state: { status: "running" as const, input, time: { start: 0 } },
    }))
    .with("completed", () => ({
      ...common,
      state: {
        status: "completed" as const,
        input,
        output: opts.output ?? "tool output",
        title: "Running bash",
        metadata: {},
        time: { start: 0, end: 1 },
      },
    }))
    .with("error", () => ({
      ...common,
      state: {
        status: "error" as const,
        input,
        error: opts.error ?? "something went wrong",
        time: { start: 0, end: 1 },
      },
    }))
    .exhaustive();