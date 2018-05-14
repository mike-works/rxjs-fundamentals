import { AsyncSubject, BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  EventTargetLike,
  NodeStyleEventEmitter
} from 'rxjs/internal/observable/fromEvent';
import SynthEventTarget from '../../common/synth-event-target';

export const synthButton = new SynthEventTarget();
const realButton = window.document.getElementById(
  'button1'
) as HTMLButtonElement;
export const buttonOne: () => HTMLButtonElement = () =>
  window.document.getElementById('button1') as HTMLButtonElement; // || synthButton;

export const notificationPermission$ = new Subject<string>();
export function requestNotificationPermission(): Promise<string> {
  if (typeof window === 'undefined' || typeof Notification === 'undefined') {
    return new Promise<string>(res => {
      notificationPermission$.subscribe(res);
    });
  } else {
    return Notification.requestPermission();
  }
}

export const geoPermission$ = new Subject<Position>();

function nodeGeoCallback(callback: (p: Position) => void) {
  geoPermission$.subscribe(p => {
    callback(p);
  });
}
export const requestLocation =
  typeof window === 'undefined' ||
  typeof navigator === 'undefined' ||
  typeof navigator.geolocation === 'undefined'
    ? nodeGeoCallback
    : navigator.geolocation.getCurrentPosition.bind(navigator.geolocation);
