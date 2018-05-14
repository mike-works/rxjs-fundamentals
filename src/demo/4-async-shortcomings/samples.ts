import SynthEventTarget from '../../common/synth-event-target';

export async function getDataViaPromise() {
  if (Math.random() > 0.85) {
    throw new Error('Bad luck! no data this time');
  }
  return await (await fetch('http://localhost:8080/api/workout')).json();
}

export function getDataViaCallback(
  successback: (data: any) => void,
  errback?: (err: Error) => void
) {
  getDataViaPromise()
    .then(data => successback(data))
    .catch(err => {
      if (errback) {
        errback(err);
      }
    });
}

export const exerciseEventTarget = new SynthEventTarget();
setInterval(() => {
  getDataViaPromise()
    .then(data => {
      exerciseEventTarget.fireEvent('data', data);
    })
    .catch(err => {
      exerciseEventTarget.fireEvent('error', err);
    });
}, 1000);
