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
  // TODO: Implement your solution here. return an implicitly-cancelled version of this observable
  return obs;
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
 * Complete the function below, such that obs is cancelled when cancelWhenFires observable emits a value
 */

function cancelWhen<T>(
  obs: Observable<T>,
  cancelWhenFires: Observable<any>
): Observable<T> {
  // TODO: implement your solution here. Return a new observable that cancels when cancelWhenFires emits a value
  return obs;
}

// Example code for using cancelWhen
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
 *
 *  When obsButton4 is clicked, start logging incrementing values every 500ms
 *  Clicking button 4 repeteadly should cause new counters to start in parallel
 *  Clicking button 5 should stop ALL timers, including any cleanup of setInterval
 */

function setupTimerControls() {
  let obsButton4 = fromEvent<MouseEvent>(button4, 'click');
  let obsButton5 = fromEvent<MouseEvent>(button5, 'click');

  // on button 4 click
  let numTimers = 0;
  obsButton4.subscribe(() => {
    let id = numTimers++;
    // TODO: Implement your solution here
  });
}
setupTimerControls();
