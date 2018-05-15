import {
  bindCallback,
  from,
  fromEvent,
  of,
  Observable,
  range,
  defer
} from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { first, take, toArray } from 'rxjs/operators';
import '../../common/ajax';
import { IS_BROWSER } from '../../common/env';
import { addLogPanelMessage } from '../../common/log-panel';
import {
  buttonOne,
  requestLocation,
  requestNotificationPermission
} from './fixtures';
/**
 * - EXERCISE 2.A
 * > Create an observable from the click event on
 *
 * ?    <button id='button1'><button>
 *
 *    which can be retrieved like this
 *
 * ?  let button1: HTMLButtonElement = buttonOne();
 *
 *    and calls
 *
 * ?    addLogPanelMessage('panel2a', ... );
 *
 *    to log the x and y coordinates of the click to the screen
 */

export function observableFromEvent(): Observable<MouseEvent> {
  // TODO: Replace this with your own solution
  let obs = fromEvent<MouseEvent>(buttonOne(), 'click');
  obs.subscribe(evt => {
    addLogPanelMessage('panel2a', `${evt.x}, ${evt.y}`);
  });
  return obs;
}
/**
 * - Exercise 2.B
 * > Create an observable that fetches data from
 *
 * ?     https://api.mike.works/api/v1/courses
 *
 *    and iterates over the data array, logging item.attributes.title to the screen
 *
 * ?     addLogPanelMessage('panel2b', ... );
 */

export function observableFromAjax(): Observable<AjaxResponse> {
  let obs = ajax('https://api.mike.works/api/v1/courses');
  obs.subscribe(resp => {
    resp.response.data.forEach(course => {
      addLogPanelMessage('panel2b', `${course.attributes.title}`);
    });
  });
  return obs;
}

/**
 * - Exercise 2.C
 * > Create an observable that encapsulates asking the user for notification permissions
 *
 * ?     Notification.requestPermission()
 *
 *    and emits a value describing whether the permission has been obtained or not
 *
 * ?     addLogPanelMessage('panel2c', ... );
 */

export function observableFromPromise(): Observable<NotificationPermission> {
  // TODO: Replace this with your own solution
  let p = Notification.requestPermission();
  let obs = defer(() => p);
  obs.subscribe(resolvedVal => {
    addLogPanelMessage('panel2c', `Permission status: ${resolvedVal}`);
  });
  return obs;
}

/**
 * - Exercise 2.D
 * > Create an observable that repeatedly generates random numbers between 1 and 100,
 *   waits that many milliseconds, and then emits the number. Immediately after it
 *   generates a number > 90 and emits it, the observable should complete
 *
 * ?     addLogPanelMessage('panel2d', ... );
 */
export function newObservable(): Observable<number> {
  // TODO: Replace this with your own solution
  let obs = new Observable<number>(observer => {
    function nextValue() {
      let num = Math.round(Math.random() * 100);
      setTimeout(() => {
        // TODO what about unsubscribe?
        observer.next(num); /* emit */
        if (num > 90) observer.complete();
        else nextValue();
      }, num /* wait */);
    }
    nextValue();
  });
  obs.subscribe(val => {
    addLogPanelMessage('panel2d', `sequence value: ${val}`);
  });
  return obs;
}

/**
 * - Exercise 2.E
 * > We have a function that accepts a callback called
 *
 * ?    navigator.geolocation.getCurrentPosition
 *
 *   to a function that returns an observable. Keep in mind that this
 *   function MUST be invoked with
 *
 * ?    navigator.geolocation
 *
 *   as its lexical scope. Log the latitude and longitude values emitted
 *   by this observable onto the screen, via..
 *
 * ?    addLogPanelMessage('panel2e', ... );
 */

export function observableFromCallback(): Observable<Position> {
  // TODO: Replace this with your own solution
  const getLoc = navigator.geolocation.getCurrentPosition.bind(
    navigator.geolocation
  );
  let obs = bindCallback<Position>(getLoc)();
  obs.subscribe(loc => {
    addLogPanelMessage(
      'panel2e',
      `location: ${loc.coords.latitude}, ${loc.coords.longitude}`
    );
  });
  return obs;
}

if (IS_BROWSER) {
  console.log('Running browser samples');
  observableFromEvent().toPromise();
  observableFromAjax().toPromise();

  observableFromPromise().toPromise();
  newObservable().toPromise();
  observableFromCallback();
}
