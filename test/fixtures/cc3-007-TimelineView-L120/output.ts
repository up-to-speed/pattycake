import { match } from 'ts-pattern';
declare const with: any;
declare const exhaustive: any;
declare const entry: any;
declare const provenance: any;
declare const data: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = entry.provenance.data;
  if (__patsy_temp_1?.type === "agent") {
    let data = __patsy_temp_1;
    __result = {
      type: "agent" as const,
      label: data.agentName ?? "unknown",
      messages: data.codingAgentMessages ?? []
    };
    break __patsy_temp_0;
  }
  if (__patsy_temp_1?.type === "external") {
    __result = {
      type: "external" as const,
      label: "External change",
      messages: [] as AgentProvenance["codingAgentMessages"]
    };
    break __patsy_temp_0;
  }
  let __patsy__displayedValue;
  try {
    __patsy__displayedValue = JSON.stringify(__patsy_temp_1);
  } catch (e) {
    __patsy__displayedValue = __patsy_temp_1;
  }
  throw new Error(`Pattern matching error: no pattern matches value ${__patsy__displayedValue}`);
}
