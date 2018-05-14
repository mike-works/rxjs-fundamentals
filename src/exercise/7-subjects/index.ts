import { interval, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

let source = interval(100);

class Foo<T> extends Observable<T> {
  constructor() {
    super();
  }
}

// tslint:disable-next-line:max-classes-per-file
class Emitter<T> {
  private _listeners: {
    [k: string]: Set<(val: T) => void> | undefined;
  } = {};
  constructor(setup: (emit: (eventName: string, message: T) => void) => void) {
    setup(
      function(this: Emitter<T>, eventName: string, message: T) {
        let s = this._listeners[eventName];
        if (typeof s !== 'undefined') {
          for (let cb of s) {
            cb(message);
          }
        }
      }.bind(this)
    );
  }
  public addListener(eventName: string, listener: (val: T) => void): void {
    this.getListenerSet(eventName).add(listener);
  }
  public removeListener(eventName: string, listener: (val: T) => void): void {
    this.getListenerSet(eventName).delete(listener);
  }

  private getListenerSet(eventName: string): Set<(val: T) => void> {
    let s = this._listeners[eventName];
    if (typeof s === 'undefined') {
      return (this._listeners[eventName] = new Set());
    } else return s;
  }
}

let em = new Emitter<number>(emit => {
  let x = 0;
  let task = setInterval(() => {
    emit('data', x++);
    if (x > 100) clearInterval(task);
  }, 100);
});
