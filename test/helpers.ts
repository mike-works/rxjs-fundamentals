import { Observable } from 'rxjs';

export async function nextValueFrom<T>(o: Observable<T>): Promise<T> {
  return new Promise<T>(res => {
    o.subscribe(res);
  });
}
