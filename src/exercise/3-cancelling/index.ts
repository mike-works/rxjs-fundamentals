import {
  fromEvent,
  observable,
  MonoTypeOperatorFunction,
  Observable,
  Observer,
  OperatorFunction
} from 'rxjs';
import { map, take, takeUntil, takeWhile } from 'rxjs/operators';
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
let o1 = fromEvent<MouseEvent>(button1, 'click');
let o2 = fromEvent<MouseEvent>(button2, 'click');
let o3 = fromEvent<MouseEvent>(button3, 'click');
let o4 = fromEvent<MouseEvent>(button4, 'click');
let o5 = fromEvent<MouseEvent>(button5, 'click');

/**
 * - EXERCISE 3.A - Implicit Cancellation
 */

function finishWhen<T>(
  obs: Observable<T>,
  {
    condition,
    maxEvents,
    until
  }: {
    condition?: (val: T) => boolean;
    maxEvents?: number;
    until?: Observable<any>;
  } = {}
): Observable<T> {
  let ops: Array<MonoTypeOperatorFunction<T>> = [];
  if (typeof condition !== 'undefined') {
    ops.push(takeWhile(condition));
  }
  if (typeof maxEvents !== 'undefined') {
    ops.push(take(maxEvents));
  }
  if (typeof until !== 'undefined') {
    ops.push(takeUntil(until));
  }
  return obs.pipe(...ops);
}

function setupButton1() {
  let sub = o1.subscribe(() => {
    sub.unsubscribe();
    finishWhen(fromEvent<MouseEvent>(doc, 'mousemove'), {
      condition: m => m.y > 40,
      maxEvents: 100,
      until: o1
    }).subscribe(e => {
      addLogPanelMessage('panel3a', `Mouse is at: ${e.x}, ${e.y}`);
    });
  });
  return sub;
}
let buttonSubs = setupButton1();

/**
 * - EXERCISE 3.B - Explicit Cancellation
 */

function cancelWhen<T>(obs: Observable<T>, cancelWhenFires: Observable<any>): Observable<T> {
  return new Observable<T>(observer => {
    let mainSubs = obs.subscribe(observer);
    let cancelSubs = cancelWhenFires.subscribe(() => {
      console.log('stop');
      mainSubs.unsubscribe();
      cancelSubs.unsubscribe();
    });
  });
}

o2.subscribe(() => {
  console.log('start');
  cancelWhen(fromEvent<MouseEvent>(doc, 'mousemove'), o3).subscribe(e => {
    addLogPanelMessage('panel3b', `Mouse is at: ${e.x}, ${e.y}`);
  });
});

/**
 * - EXERCISE 3.C - Cleaning Up Internal Resources
 */

export function setupSelfCleaningObservable<T, R>(
  setupCallback: (observer: Observer<T>) => R,
  cleanupCallback: (arg: R) => void
): Observable<T> {
  return new Observable<T>(observer => {
    let setupInfo = setupCallback(observer);
    return cleanupCallback.bind(null, setupInfo);
  });
}

o4.subscribe(() => {
  let oo = setupSelfCleaningObservable(
    observer => {
      let a = 1;
      let b = 0;
      let task = setupBeacon(500, () => {
        let c = a + b;
        observer.next(c);
        a = b;
        b = c;
      });
      return { task };
    },
    ({ task }) => {
      cleanupBeacon(task);
    }
  );
  let subscription = oo.subscribe(x => {
    addLogPanelMessage('panel3c', `Value is: ${x}`);
  });
  o5.subscribe(() => {
    subscription.unsubscribe();
  });
});
