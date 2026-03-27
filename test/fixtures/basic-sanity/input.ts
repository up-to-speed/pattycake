import { match } from 'ts-pattern';

const result: any = undefined;

const html = match(result)
  .with({ type: 'text' }, () => "<p>text</p>")
  .with({ type: 'img' }, () => "<img/>")
  .otherwise(() => 'unknown');
