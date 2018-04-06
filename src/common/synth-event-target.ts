export default class SynthEventTarget {
  // tslint:disable-next-line:ban-types
  public listeners: { [k: string]: Function[] | undefined } = {};
  // tslint:disable-next-line:ban-types
  public addListener(eventName: string, handler: Function) {
    if (typeof this.listeners[eventName] === 'undefined') {
      this.listeners[eventName] = [];
    }
    (this.listeners[eventName] as any[]).push(handler);
  }
  public fireEvent(eventName: string, payload: any) {
    let lArr = this.listeners[eventName];
    if (!lArr || lArr.length === 0) {
      return;
    }
    lArr.forEach(l => {
      l(payload);
    });
  }
  // tslint:disable-next-line:ban-types
  public removeListener(eventName: string, handler: Function) {
    let lArr = this.listeners[eventName];
    if (!lArr) {
      return;
    }
    let idx = lArr.findIndex(x => x === handler);
    lArr.splice(idx, 1);
  }
}
