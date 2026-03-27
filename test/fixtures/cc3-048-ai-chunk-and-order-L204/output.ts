import { match } from 'ts-pattern';
declare const with: any;
declare const otherwise: any;
declare const clusterHunksWithAI: any;
declare const expandedHunks: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = expandedHunks.length;
  if (__patsy_temp_1 === 1) {
    __result = [{
      hunkIds: [expandedHunks[0].id],
      title: expandedHunks[0].sectionTitle || "",
      description: expandedHunks[0].sectionDescription || ""
    }];
    break __patsy_temp_0;
  }
  __result = await clusterHunksWithAI(expandedHunks, model, walkthroughConfig);
  break __patsy_temp_0;
}
