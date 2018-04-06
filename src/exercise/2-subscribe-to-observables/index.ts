import { bindCallback, from, fromEvent, of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { first, take, toArray } from 'rxjs/operators';
import '../../common/ajax';
import { addLogPanelMessage } from '../../common/log-panel';
import { buttonOne, requestLocation, requestNotificationPermission } from './fixtures';
/**
 * - EXERCISE 2.A
 * > Create an observable from the click event on
 *
 * ?    <button id='button1'><button>
 *
 *    and calls
 *
 * ?    addLogPanelMessage('panel2a', ... );
 *
 *    to log the x and y coordinates of the click to the screen
 */

export const observableFromEvent = fromEvent<MouseEvent>(buttonOne, 'click');

observableFromEvent.subscribe(me => {
  addLogPanelMessage('panel2a', `Mouse ${me.x}, ${me.y}`);
});

/**
 * - Exercise 2.B
 * > Create an observable that fetches data from
 *
 * ?     https://api.mike.works/api/v1/courses
 *
 *    and logs the title and "course-number" of each course to the screen
 *
 * ?     addLogPanelMessage('panel2b', ... );
 */

export const observableFromAjax = ajax('https://api.mike.works/api/v1/courses');

observableFromAjax.subscribe(({ response }) => {
  response.data.forEach(course => {
    addLogPanelMessage(
      'panel2b',
      `${course.attributes['course-number']}: ${course.attributes.title}`
    );
  });
});

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

export const observableFromPromise = from(requestNotificationPermission());

observableFromPromise.subscribe(r => {
  addLogPanelMessage('panel2c', `Notification permission: ${r.toUpperCase()}`);
});

/**
 * - Exercise 2.D
 * > Create an observable that repeatedly generates random numbers between 1 and 100,
 *   waits that many milliseconds, and then emits the number. Immediately after it
 *   generates a number > 90 and emits it, the observable should complete
 *
 * ?     addLogPanelMessage('panel2d', ... );
 */
export const newObservable = new Observable<number>(observer => {
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
newObservable.subscribe(v => {
  addLogPanelMessage('panel2d', `Random wait: ${v}ms`);
});

/**
 * - Exercise 2.E
 * > Convert the browser geolocation API
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

export const observableFromCallback = bindCallback<Position>(requestLocation)();

observableFromCallback.subscribe(p => {
  addLogPanelMessage('panel2e', `Position: ${p.coords.latitude}, ${p.coords.longitude}`);
});
