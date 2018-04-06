import { AsyncSubject, BehaviorSubject, Observable, Subject } from 'rxjs';
import { EventTargetLike, NodeStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import SynthEventTarget from '../../common/synth-event-target';

export const synthButton = new SynthEventTarget();
export const buttonOne: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton
    : (document.getElementById('button1') as HTMLButtonElement);

export const notificationPermission$ = new Subject<string>();
export function requestNotificationPermission(): Promise<string> {
  if (typeof window === 'undefined') {
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
  typeof window === 'undefined'
    ? nodeGeoCallback
    : navigator.geolocation.getCurrentPosition.bind(navigator.geolocation);
