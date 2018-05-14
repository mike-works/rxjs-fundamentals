import {
  fromEvent,
  observable,
  Observable,
  Observer,
  OperatorFunction
} from 'rxjs';
import { take, takeUntil, takeWhile } from 'rxjs/operators';
import { IS_BROWSER } from '../../common/env';
import { addLogPanelMessage } from '../../common/log-panel';
import {
  button1,
  button2,
  button3,
  button4,
  button5,
  cleanupBeacon,
  doc,
  setupBeacon
} from './fixtures';
/**
 * - EXERCISE 3.A - Implicit Cancellation
 *
 * Finish the function below, which can apply operators
 * that limit an observable
 *
 * ? condition
 *    cancel when a stopping condition is reached, based on emitted values
 * ? maxEvents
 *    cancel after a fixed number of events
 * ? until
 *    cancel when another observable fires
 */

interface FinishWhenOptions<T> {
  condition?: (val: T) => boolean;
  maxEvents?: number;
  until?: Observable<any>;
}

function finishWhen<T>(
  obs: Observable<T>,
  {
    condition, // a function
    maxEvents,
    until
  }: FinishWhenOptions<T> = {}
): Observable<T> {
  let limitedObservable: Observable<T> = obs;
  if (typeof condition !== 'undefined') {
    limitedObservable = takeWhile(condition)(limitedObservable);
  }
  if (typeof maxEvents !== 'undefined') {
    limitedObservable = take<T>(maxEvents)(limitedObservable);
  }
  if (typeof until !== 'undefined') {
    limitedObservable = takeUntil<T>(until)(limitedObservable);
  }
  return limitedObservable;
}

// Example code for using finishWhen
(() => {
  function setupButton1() {
    // Observer for clicks on button 1
    let obsButton1 = fromEvent<MouseEvent>(button1, 'click');
    let sub = obsButton1.subscribe(() => {
      // on click
      sub.unsubscribe(); // stop listening for new clicks
      // Create an observable from mouse move event
      let obsMouseMove = fromEvent<MouseEvent>(doc, 'mousemove');
      finishWhen(obsMouseMove, {
        condition: m => m.y > 40, // cursor is 40px from top of screen
        maxEvents: 100, // 100 total events fired
        until: obsButton1 // button 1 is clicked again
      }).subscribe(e => {
        // This logging should stop once ANY of the above conditions are met
        addLogPanelMessage('panel3a', `Mouse is at: ${e.x}, ${e.y}`);
      });
    });
    return sub;
  }
  let buttonSubs = setupButton1();
})();

/**
 * - EXERCISE 3.B - Explicit Cancellation
 *
 * Complete the function below, u
 */

// Example code for using cancelWhen
function cancelWhen<T>(
  obs: Observable<T>,
  cancelWhenFires: Observable<any>
): Observable<T> {
  return new Observable<T>(observer => {
    let mainSubs = obs.subscribe(observer);
    let cancelSubs = cancelWhenFires.subscribe(() => {
      console.log('stop');
      mainSubs.unsubscribe();
      cancelSubs.unsubscribe();
    });
  });
}

(() => {
  let obsButton2 = fromEvent<MouseEvent>(button2, 'click');
  let obsButton3 = fromEvent<MouseEvent>(button3, 'click');
  obsButton2.subscribe(() => {
    console.log('start');
    let mouseMove = fromEvent<MouseEvent>(doc, 'mousemove');
    cancelWhen(
      mouseMove,
      obsButton3 // button click
    ).subscribe(e => {
      addLogPanelMessage('panel3b', `Mouse is at: ${e.x}, ${e.y}`);
    });
  });
})();

/**
 * - EXERCISE 3.C - Cleaning Up Internal Resources
 */

function setupTimerControls() {
  let obsButton4 = fromEvent<MouseEvent>(button4, 'click');
  let obsButton5 = fromEvent<MouseEvent>(button5, 'click');

  // on button 4 click
  let numTimers = 0;
  obsButton4.subscribe(() => {
    let id = numTimers++;
    let timer = new Observable<number>(observer => {
      let x = 0;
      setInterval(() => {
        observer.next(x++);
        console.log(`Tick: ${id}`);
      }, 500);
    });
    let subs = timer.subscribe(val => {
      addLogPanelMessage('panel3c', `Counter ${id}: ${val}`);
    });
    obsButton5.subscribe(() => {
      subs.unsubscribe();
    });
  });
}
setupTimerControls();
