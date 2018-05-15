import { map, tap, filter } from 'rxjs/operators';
import { colorObservable } from './fixtures';

function rgbToHex(r: number, g: number, b: number) {
  return [r, g, b]
    .map(ch => ch.toString(16))
    .map(ch => (ch.length === 1 ? `0${ch}` : ch))
    .join('');
}

colorObservable
  .pipe(
    map(col => col.split(',').map(ch => parseInt(ch, 10))),
    filter(x => x[0] < x[1]),
    map(([r, g, b]) => rgbToHex(r, g, b)),
    tap(col => console.log('%c Brighter!', `background: #${col}`))
  )
  .toPromise();
