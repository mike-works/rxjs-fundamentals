import { EventTargetLike } from 'rxjs/internal/observable/fromEvent';
import SynthEventTarget from '../../common/synth-event-target';
import { interval, Subscription } from 'rxjs';

export const synthButton1 = new SynthEventTarget();
export const button1: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton1
    : (document.getElementById('button1') as HTMLButtonElement);

export const synthButton2 = new SynthEventTarget();
export const button2: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton2
    : (document.getElementById('button2') as HTMLButtonElement);

export const synthButton3 = new SynthEventTarget();
export const button3: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton3
    : (document.getElementById('button3') as HTMLButtonElement);

export const synthButton4 = new SynthEventTarget();
export const button4: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton4
    : (document.getElementById('button4') as HTMLButtonElement);

export const synthButton5 = new SynthEventTarget();
export const button5: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton5
    : (document.getElementById('button5') as HTMLButtonElement);

export const synthDoc = new SynthEventTarget();
export const doc: EventTargetLike = typeof window === 'undefined' ? synthDoc : document;

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
  console.log(`[Beacon]: Setup for #${beacon.id} (current count = ${beaconCount})`);
  return beacon;
}

export function cleanupBeacon(beacon: Beacon) {
  beacon.subs.unsubscribe();
  beaconCount--;
  console.log(`[Beacon]: Cleanup for #${beacon.id} (current count = ${beaconCount})`);
}
