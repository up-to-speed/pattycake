import { match, P } from 'ts-pattern';
declare const get: any;
declare const with: any;
declare const otherwise: any;
declare const node: any;
declare const children: any;
let __result;
__patsy_temp_0: {
  const __patsy_temp_1 = node.children.get(key);
  if (__patsy_temp_1?.type === "leaf") {
    let _ = __patsy_temp_1;
    __result = null;
    break __patsy_temp_0;
  }
  if (__patsy_temp_1?.type === "internal") {
    let child = __patsy_temp_1;
    __result = child;
    break __patsy_temp_0;
  }
  if (__patsy_temp_1 == null) {
    __result = null;
    break __patsy_temp_0;
  }
  __result = null;
  break __patsy_temp_0;
}
