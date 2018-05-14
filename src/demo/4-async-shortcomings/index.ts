import {
  exerciseEventTarget,
  getDataViaCallback,
  getDataViaPromise
} from './samples';

getDataViaCallback(
  data => {
    console.log('[callback] got data', data);
  },
  err => {
    console.error('[callback] received error', err);
  }
);

getDataViaPromise()
  .then(data => {
    console.log('[promise] got data', data);
  })
  .catch(err => {
    console.error('[promise] received error', err);
  });

exerciseEventTarget.addListener('data', data => {
  console.log('[event] got data', data);
});
exerciseEventTarget.addListener('error', error => {
  console.error('[event] got error', error);
});
