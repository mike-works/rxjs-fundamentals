/**
 * Create a promise that resolves after some time
 * @param n number of milliseconds
 */
function timeout(n: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, n);
  });
}

/**
 * Drive a generator function that represents a sequence
 * of asynchronous steps.
 *
 * @param genFunction A generator function
 */
function task<T, P extends Promise<T>>(genFunction: () => IterableIterator<P>): P {
  // return Promise.resolve<T>(null as any);
  return new Promise<T>((resolve, reject) => {
    let it = genFunction();
    function nextValue(lastValue?: T) {
      let { value, done } = it.next(lastValue);
      if (done) {
        resolve(lastValue);
      }
      value
        .then(awaitedValue => {
          nextValue(awaitedValue);
        })
        .catch(err => {
          reject(err);
        });
    }
    nextValue();
  }) as P;
}

(async () => {
  try {
    let finalResult = await task(function*() {
      console.log('start');

      let val1 = yield timeout(500).then(() => 'One');
      console.log('val1: ', val1);

      let val2 = yield timeout(500).then(() => 'Two');
      console.log('val2: ', val2);

      let val3 = yield timeout(500).then(() => 'Three');
      console.log('val3: ', val3);

      let val4 = yield timeout(500).then(() => 'Four');
      console.log('val4: ', val4);

      console.log('end');
    });
    console.log('finalResult: ', finalResult);
  } catch (err) {
    console.log('caught', err);
  }
})();
