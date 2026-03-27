import { match } from 'ts-pattern';
const result: any = undefined;
let html;
__patsy_temp_0: {
  if (result?.type === "text") {
    html = "<p>text</p>";
    break __patsy_temp_0;
  }
  if (result?.type === "img") {
    html = "<img/>";
    break __patsy_temp_0;
  }
  html = 'unknown';
  break __patsy_temp_0;
}
