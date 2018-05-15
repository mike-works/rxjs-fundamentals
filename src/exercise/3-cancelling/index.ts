import {
  fromEvent,
  observable,
  Observable,
  Observer,
  OperatorFunction,
  Operator,
  Subscriber
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
  // - 1 number of events
  // - 2 condition is met
  // - 3 an observable fires
  //   let operators: any[] = [];
  //   op3(op2(op1(obs)))

  // }
  let toReturn: Observable<T> = obs;
  // // * SIMPLE SOLUTION
  // if (condition) {
  //   toReturn = takeWhile(condition)(toReturn);
  // }
  // if (maxEvents) {
  //   toReturn = take<T>(maxEvents)(toReturn);
  // }
  // if (until) {
  //   toReturn = takeUntil<T>(until)(toReturn);
  // }

  // * FP SOLUTION
  let operators: Array<OperatorFunction<any, any>> = [];

  if (condition) {
    operators.push(takeWhile(condition));
  }
  if (maxEvents) {
    operators.push(take<T>(maxEvents));
  }
  if (until) {
    operators.push(takeUntil<T>(until));
  }
  return operators.reduce((acc, op) => {
    return op(acc);
  }, obs);
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
  return new Observable<T>(observer => {
    let subs = obs.subscribe(evt => {
      observer.next(evt);
    });
    function cleanup() {
      console.log('detach');
      subs.unsubscribe();
      subs2.unsubscribe(); // the "one time use" pattern
    }
    obs.forEach(() => null).then(cleanup);
    let subs2 = cancelWhenFires.subscribe(cleanup);
  });
}

// Example code for using cancelWhen
(() => {
  let obsButton2 = fromEvent<MouseEvent>(button2, 'click');
  let obsButton3 = fromEvent<MouseEvent>(button3, 'click');
  obsButton2.subscribe(() => {
    console.log('start');
    let mouseMove = take<MouseEvent>(50)(
      fromEvent<MouseEvent>(doc, 'mousemove')
    );
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
  let s1 = obsButton4.subscribe(() => {
    let id = numTimers++;
    let obs = new Observable<[number, number]>(observer => {
      let x = 0;
      let task = setInterval(() => {
        observer.next([id, x++]);
        console.log(`Tick: ${id}`);
      }, 500);
      return () => clearInterval(task);
    });
    let s2 = obs.subscribe(([idd, val]) => {
      addLogPanelMessage('panel3c', `Counter: ${idd}: ${val}`);
    });
    let s3 = obsButton5.subscribe(() => {
      s1.unsubscribe();
      s2.unsubscribe();
      s3.unsubscribe();
    });
    // TODO: Implement your solution here
  });
}
setupTimerControls();
