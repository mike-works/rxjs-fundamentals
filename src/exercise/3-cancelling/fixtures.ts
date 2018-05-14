import { interval, Subscription } from 'rxjs';
import { EventTargetLike } from 'rxjs/internal/observable/fromEvent';
import { IS_BROWSER } from '../../common/env';
import SynthEventTarget from '../../common/synth-event-target';

export const synthButton1 = new SynthEventTarget();
export const button1: EventTargetLike = !IS_BROWSER
  ? synthButton1
  : (document.getElementById('button1') as HTMLButtonElement);

export const synthButton2 = new SynthEventTarget();
export const button2: EventTargetLike = !IS_BROWSER
  ? synthButton2
  : (document.getElementById('button2') as HTMLButtonElement);

export const synthButton3 = new SynthEventTarget();
export const button3: EventTargetLike = !IS_BROWSER
  ? synthButton3
  : (document.getElementById('button3') as HTMLButtonElement);

export const synthButton4 = new SynthEventTarget();
export const button4: EventTargetLike = !IS_BROWSER
  ? synthButton4
  : (document.getElementById('button4') as HTMLButtonElement);

export const synthButton5 = new SynthEventTarget();
export const button5: EventTargetLike = !IS_BROWSER
  ? synthButton5
  : (document.getElementById('button5') as HTMLButtonElement);

export const synthDoc = new SynthEventTarget();
export const doc: EventTargetLike = !IS_BROWSER ? synthDoc : document;

let beaconCount = 0;
export const BEACON_INFO = {
  get beaconCount(): number {
    return beaconCount;
  }
};

interface Beacon {
  subs: Subscription;
  id: number;
}

export function setupBeacon(delay: number, callback: () => void): Beacon {
  let subs = interval(delay).subscribe(callback);
  let id = ++beaconCount;
  let beacon = { subs, id };
  console.log(
    `[Beacon]: Setup for #${beacon.id} (current count = ${beaconCount})`
  );
  return beacon;
}

export function cleanupBeacon(beacon: Beacon) {
  beacon.subs.unsubscribe();
  beaconCount--;
  console.log(
    `[Beacon]: Cleanup for #${beacon.id} (current count = ${beaconCount})`
  );
}
