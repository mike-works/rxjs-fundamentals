import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

const o = new Observable<{ v: number }>(subscriber => {
  let c = 4;
  const task = setInterval(() => {
    subscriber.next({ v: c++ });
    if (c > 10) {
      clearInterval(task);
    }
  }, 200);
});

o.pipe(
  map<{ v: number }, number>(x => x.v * x.v),
  map<number, number>(x => x * x),
  take(3)
).forEach(x => console.log(x));
