import { fromEvent, Observable } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { addLogPanelMessage } from '../../common/log-panel';
import { button1, button2, button3, button4, button5, doc } from './fixtures';

let o1 = fromEvent<MouseEvent>(button1, 'click');
let o2 = fromEvent<MouseEvent>(button2, 'click');
let o3 = fromEvent<MouseEvent>(button3, 'click');
let o4 = fromEvent<MouseEvent>(button4, 'click');
let o5 = fromEvent<MouseEvent>(button5, 'click');

/**
 * - EXERCISE 3.A - Implicit Cancellation
 */

o1.subscribe(() => {
  fromEvent<MouseEvent>(doc, 'mousemove')
    .pipe(takeWhile(m => m.y > 40))
    .subscribe(e => {
      addLogPanelMessage('panel3a', `Mouse is at: ${e.x}, ${e.y}`);
    });
});

/**
 * - EXERCISE 3.B - Explicit Cancellation
 */

o2.subscribe(() => {
  let subscription = fromEvent<MouseEvent>(doc, 'mousemove').subscribe(e => {
    addLogPanelMessage('panel3b', `Mouse is at: ${e.x}, ${e.y}`);
  });
  o3.subscribe(() => {
    subscription.unsubscribe();
  });
});

/**
 * - EXERCISE 3.C - Cleaning Up Internal Resources
 */
o4.subscribe(() => {
  let o = new Observable(function subscribe(observer) {
    let val = 0;
    let task = setInterval(() => {
      console.log('.');
      observer.next((val += 100));
    }, 100);
    return function unsubscribe() {
      clearInterval(task);
    };
  });
  let subscription = o.subscribe(x => {
    addLogPanelMessage('panel3c', `Value is: ${x}`);
  });
  o5.subscribe(() => {
    subscription.unsubscribe();
  });
});
