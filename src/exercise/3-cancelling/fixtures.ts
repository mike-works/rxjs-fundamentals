import { EventTargetLike } from 'rxjs/internal/observable/fromEvent';
import SynthEventTarget from '../../common/synth-event-target';

export const synthButton1 = new SynthEventTarget();
export const button1: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton1
    : (document.getElementById('button1') as HTMLButtonElement);

export const synthButton2 = new SynthEventTarget();
export const button2: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton2
    : (document.getElementById('button2') as HTMLButtonElement);

export const synthButton3 = new SynthEventTarget();
export const button3: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton3
    : (document.getElementById('button3') as HTMLButtonElement);

export const synthButton4 = new SynthEventTarget();
export const button4: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton4
    : (document.getElementById('button4') as HTMLButtonElement);

export const synthButton5 = new SynthEventTarget();
export const button5: EventTargetLike =
  typeof window === 'undefined'
    ? synthButton5
    : (document.getElementById('button5') as HTMLButtonElement);

export const synthDoc = new SynthEventTarget();
export const doc: EventTargetLike = typeof window === 'undefined' ? synthDoc : document;
