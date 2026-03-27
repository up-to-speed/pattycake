import { match } from 'ts-pattern';

declare const with: any;
declare const otherwise: any;
declare const clusterHunksWithAI: any;
declare const expandedHunks: any;

const __result = match(expandedHunks.length)
      .with(1, () => [
        {
          hunkIds: [expandedHunks[0].id],
          title: expandedHunks[0].sectionTitle || "",
          description: expandedHunks[0].sectionDescription || "",
        },
      ])
      .otherwise(
        async () =>
          await clusterHunksWithAI(expandedHunks, model, walkthroughConfig),
      );