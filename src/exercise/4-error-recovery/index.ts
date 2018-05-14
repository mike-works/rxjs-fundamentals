import {
  from,
  fromEvent,
  interval,
  of,
  timer,
  Notification,
  Observable,
  Subject
} from 'rxjs';
import {
  catchError,
  delay,
  delayWhen,
  filter,
  map,
  multicast,
  reduce,
  retry,
  retryWhen,
  sample,
  take,
  tap,
  zip
} from 'rxjs/operators';
import { websocket } from 'rxjs/websocket';

import * as io from 'socket.io-client';
import { timeout } from '../../../test/helpers';

// let socket = io('localhost:8090');
// socket.on('connection', () => console.log('connected'));
// socket.on('message', x => console.log(x));
// socket.open();

let o = new Observable<number>(observer => {
  let x = 0;
  let task = setInterval(() => {
    if (x % 5 !== 4) {
      observer.next(x);
    } else {
      observer.error(`Invalid value for x: ${x}`);
      x++;
    }
    x++;
  }, 1000);
});

let oo = from(fetch('https://api.mike.works/api/v1/courses'));

(async () => {
  await timeout(1000);
  console.log('start');
  await oo.forEach(data => console.log(data));
  console.log('finish');
})();
