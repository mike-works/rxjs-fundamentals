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
