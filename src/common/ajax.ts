import { IS_BROWSER } from './env';
// tslint:disable:no-var-requires

if (IS_BROWSER) {
  (global as any).XMLHttpRequest = require('xhr2');
  (global as any).fetch = require('node-fetch');
}
