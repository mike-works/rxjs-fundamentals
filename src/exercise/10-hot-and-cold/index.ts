import { Observable, ReplaySubject, Subject } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { sampleCold, sampleHot } from './samples';

/**
 * - Transform a cold observable to a hot one
 * @param hot a hot observable
 * @returns a cold observable, emitting the same sequence as hot
 */
export function hotToCold<T>(hot: Observable<T>): Observable<T> {
  let s = new ReplaySubject<T>();
  hot.subscribe(s);
  return s;
}

/**
 * - Transform a hot observable to a cold one
 * @param cold a cold observable
 * @returns a hot observable emitting the same sequence as cold
 */
export function coldToHot<T>(cold: Observable<T>): Observable<T> {
  let s = new Subject<T>();
  cold.subscribe(s);
  return new Observable(obs => s.subscribe(obs));
}

/**
 * - Determine whether a given observable is hot
 * @param obs an observable to test
 * @param guaranteedMiss an async function that -- if the observable is hot -- guarantees that a value will be missed
 */
export async function isHot<T>(
  obs: Observable<T>,
  guaranteedMiss: () => Promise<void>
): Promise<boolean> {
  let o1p = obs.pipe(take(3), toArray()).toPromise();
  await guaranteedMiss();
  let o2p = obs.pipe(take(3), toArray()).toPromise();
  let o2Result = await o2p;
  let o1Result = await o1p;
  return o1Result[0] !== o2Result[0];
}

/**
 * - Determine whether a given observable is cold
 * @param obs an observable to test
 */
export async function isCold(obs: Observable<any>): Promise<boolean> {
  let o1p = obs.pipe(take(3), toArray()).toPromise();
  await timeout(100);
  let o2p = obs.pipe(take(3), toArray()).toPromise();
  let o1Result = await o1p;
  let o2Result = await o2p;
  return o1Result[0] === o2Result[0];
}

/**
 * - Generate a promise that resolves after a number of milliseconds
 * @param n number of milliseconds
 */
async function timeout(n: number) {
  return new Promise(res => {
    setTimeout(res, n);
  });
}
