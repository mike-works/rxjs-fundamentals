import { interval, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

export const sampleCold = () => {
  return new Observable(observer => {
    let ct = 0;
    let task = setInterval(() => {
      observer.next(ct++);
      if (ct > 100) {
        clearInterval(task);
        observer.complete();
      }
    });
  });
};

export const sampleHot = () => {
  let subj = new Subject<number>();
  interval(3)
    .pipe(take(100))
    .forEach(x => {
      subj.next(x);
    });
  return subj;
};
