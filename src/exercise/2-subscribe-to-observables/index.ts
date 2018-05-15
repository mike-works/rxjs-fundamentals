import { bindCallback, from, fromEvent, of, Observable, range } from 'rxjs';
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
  let o = fromEvent<MouseEvent>(buttonOne(), 'click');

  o.subscribe(me => {
    addLogPanelMessage('panel2a', `Mouse ${me.x}, ${me.y}`);
  });
  return o;
}
/**
 * - Exercise 2.B
 * > Create an observable that fetches data from
 *
 * ?     http://localhost:8080/api/workout
 *
 *    and logs the "heartRate" and "calories" of the response to the screen
 *
 * ?     addLogPanelMessage('panel2b', ... );
 */

export function observableFromAjax(): Observable<AjaxResponse> {
  // TODO: Replace this with your own solution
  let o = ajax('https://api.mike.works/api/v1/courses');
  o.subscribe(({ response }) => {
    let courses = response.data;
    courses.forEach(course =>
      addLogPanelMessage('panel2b', `${course.attributes.title}`)
    );
  });
  return o;
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
  let o = from(Notification.requestPermission());
  o.subscribe(r => {
    addLogPanelMessage('panel2c', `Resolved value: ${r}`);
  });
  return o;
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
  let o = new Observable<number>(observer => {
    function scheduleNextVal() {
      let x = Math.round(Math.random() * 100);
      observer.next(x);
      if (x > 90) {
        observer.complete();
      } else {
        setTimeout(scheduleNextVal, x);
      }
    }
    scheduleNextVal();
  });
  o.subscribe(v => {
    addLogPanelMessage('panel2d', `Random wait: ${v}ms`);
  });
  return o;
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
  let o = bindCallback<Position>(
    navigator.geolocation.getCurrentPosition.bind(navigator.geolocation)
  )();

  o.subscribe(p => {
    addLogPanelMessage(
      'panel2e',
      `Position: ${p.coords.latitude}, ${p.coords.longitude}`
    );
  });
  return o;
}

if (IS_BROWSER) {
  console.log('Running browser samples');
  observableFromEvent().toPromise();
  observableFromAjax().toPromise();

  observableFromPromise().toPromise();
  newObservable().toPromise();
  observableFromCallback();
}
