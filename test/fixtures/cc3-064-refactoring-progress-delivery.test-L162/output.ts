import { match } from 'ts-pattern';
declare const outcome: any;
declare const with: any;
declare const completed: any;
declare const cancelled: any;
declare const failed: any;
declare const exhaustive: any;
declare const TaskProgress: any;
declare const error: any;
const __result = match(outcome).with({
  status: "success"
}, () => TaskProgress.completed()).with({
  status: "cancelled"
}, () => TaskProgress.cancelled()).with({
  status: "failed"
}, ({
  message
}) => TaskProgress.failed(message)).with({
  status: "exception"
}, ({
  error
}) => TaskProgress.failed(error.message)).exhaustive();
