import { Observable } from 'rxjs';

export function unstableFibonacci(): Observable<number> {
  return new Observable<number>(observer => {
    let twoAgo = 1;
    let oneAgo = 0;
    let task = setInterval(() => {
      if (Math.random() > 0.8) {
        observer.error('Oops!');
        return;
      }
      let val = twoAgo + oneAgo;
      observer.next(val);
      twoAgo = oneAgo;
      oneAgo = val;
    }, 200);
    return () => clearInterval(task);
  });
}
