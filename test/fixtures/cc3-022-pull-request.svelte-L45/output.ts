import { match } from 'ts-pattern';
declare const result: any;
declare const with: any;
declare const exhaustive: any;
const __result = match(result).with({
  success: true
}, ({
  url
}) => url).with({
  success: false
}, ({
  error
}) => {
  throw new Error(error);
}).exhaustive();
