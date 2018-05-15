import * as browserEnv from 'browser-env';
browserEnv();

if (typeof Notification === 'undefined') {
  (global as any).Notification = {
    requestPermission() {
      return Promise.resolve('granted');
    }
  };
}

if (typeof window.navigator.geolocation === 'undefined') {
  (window.navigator as any).geolocation = {
    getCurrentPosition(cb) {
      setTimeout(() => {
        cb({
          coords: {
            latitude: 99,
            longitude: 95,
            accuracy: 4,
            altitude: 9,
            altitudeAccuracy: 4,
            heading: null,
            speed: null
          },
          timestamp: new Date().valueOf()
        });
      }, 10);
    }
  };
}
