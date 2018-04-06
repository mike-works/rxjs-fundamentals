import { AsyncSubject, BehaviorSubject, Observable, Subject } from 'rxjs';
import { EventTargetLike, NodeStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';

class SynthEventTarget {
  // tslint:disable-next-line:ban-types
  public listeners: { [k: string]: Function[] | undefined } = {};
  // tslint:disable-next-line:ban-types
  public addListener(eventName: string, handler: Function) {
    if (typeof this.listeners[eventName] === 'undefined') {
      this.listeners[eventName] = [];
    }
    (this.listeners[eventName] as any[]).push(handler);
  }
  public fireEvent(eventName: string, payload: any) {
    let lArr = this.listeners[eventName];
    if (!lArr || lArr.length === 0) {
      return;
    }
    lArr.forEach(l => {
      l(payload);
    });
  }
  // tslint:disable-next-line:ban-types
  public removeListener(eventName: string, handler: Function) {
    let lArr = this.listeners[eventName];
    if (!lArr) {
      return;
    }
    let idx = lArr.findIndex(x => x === handler);
    lArr.splice(idx, 1);
  }
}
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
