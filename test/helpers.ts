import { interval, Observable } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { sampleHot } from '../src/exercise/10-hot-and-cold/samples';

export async function nextValueFrom<T>(o: Observable<T>): Promise<T> {
  return new Promise<T>(res => {
    o.subscribe(res);
  });
}

export async function timeout(n: number) {
  return new Promise(res => {
    setTimeout(res, n);
  });
}

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

export async function isCold(obs: Observable<any>): Promise<boolean> {
  let o1p = obs.pipe(take(3), toArray()).toPromise();
  await timeout(100);
  let o2p = obs.pipe(take(3), toArray()).toPromise();
  let o1Result = await o1p;
  let o2Result = await o2p;
  return o1Result[0] === o2Result[0];
}
