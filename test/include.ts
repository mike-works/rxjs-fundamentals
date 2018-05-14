import * as browserEnv from 'browser-env';
browserEnv();

if (typeof Notification === undefined) {
  (global as any).Notification = {
    requestPermission() {
      return Promise.resolve(true);
    }
  };
}
