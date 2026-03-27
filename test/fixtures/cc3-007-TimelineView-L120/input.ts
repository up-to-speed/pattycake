import { match } from 'ts-pattern';

declare const with: any;
declare const exhaustive: any;
declare const entry: any;
declare const provenance: any;
declare const data: any;

const __result = match(entry.provenance.data)
      .with({ type: "agent" }, (data) => {
        return {
          type: "agent" as const,
          label: data.agentName ?? "unknown",
          messages: data.codingAgentMessages ?? [],
        };
      })
      .with({ type: "external" }, () => {
        return {
          type: "external" as const,
          label: "External change",
          messages: [] as AgentProvenance["codingAgentMessages"],
        };
      })
      .exhaustive();