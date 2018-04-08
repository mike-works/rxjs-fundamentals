import { Observable, ReplaySubject, Subject } from 'rxjs';
import { sampleCold, sampleHot } from './samples';

export function hotToCold<T>(hot: Observable<T>): Observable<T> {
  let s = new ReplaySubject<T>();
  hot.subscribe(s);
  return s;
}

export function coldToHot<T>(cold: Observable<T>): Observable<T> {
  let s = new Subject<T>();
  cold.subscribe(s);
  return new Observable(obs => s.subscribe(obs));
}
