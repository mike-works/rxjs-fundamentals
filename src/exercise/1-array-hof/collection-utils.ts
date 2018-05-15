/**
 * Invoke a function for each item in an array
 *
 * @export
 * @param array Array to iterate over
 * @param callbackfn function to invoke on each element
 */

export function forEach<T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => void
): void {
  // TODO: Implement your own solution
  for (let i = 0; i < array.length; i++) {
    callbackfn(array[i], i, array);
  }
  // ! Do not use [].forEach or other built-in higher-order functions. That's cheating!
}

/**
 * Create a transformed copy of an array, where
 * a transformation function is applied to each item
 *
 * @export
 * @param array list of items to transoform
 * @param callbackfn transformation function
 * @return transformed items
 */
export function map<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U
): U[] {
  // TODO: ↓ Replace this with your own solution ↓
  return reduce(
    array,
    (transformed, item, idx, arr) => {
      transformed.push(callbackfn(item, idx, array));
      return transformed;
    },
    [] as U[]
  );
  // ! Do not use [].map or other built-in higher-order functions. That's cheating!
}

/**
 * Create a filtered array, given an original array and
 * a filtering function to be invoked on each element.
 * Only those elements where the filtering function returns
 * true will be in the returned filtered array.
 *
 * @export
 * @param {array} array original array
 * @param {function} func filtering function
 * @return {array} filtered array
 */

export function filter<T>(
  array: T[],
  callbackfn: (value: T, index?: number, array?: T[]) => boolean
): T[] {
  // TODO: ↓ Replace this with your own solution ↓
  return reduce(
    array,
    (filtered, item, idx, arr) => {
      if (callbackfn(item, idx, array)) filtered.push(item);
      return filtered;
    },
    [] as T[]
  );
  // ! Do not use [].filter or other built-in higher-order functions. That's cheating!
}

/**
 * Generate a singular value by iterating over an array.
 * More info: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @export
 * @param array original array
 * @param callbackfn reducer function
 * @param initialValue initial value of accumulator
 * @return ultimate value of the accumulator
 */
export function reduce<T, U>(
  array: T[],
  callbackfn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => U,
  initialValue: U
): U {
  // TODO: ↓ Replace this with your own solution ↓
  let reducedVal = initialValue;
  for (let i = 0; i < array.length; i++) {
    reducedVal = callbackfn(reducedVal, array[i], i, array);
  }
  return reducedVal;
  // ! Do not use [].reduce or other built-in higher-order functions. That's cheating!
}

/**
 * Detect whether one or more elements in an array meet a condition
 *
 * @export
 * @param array original array
 * @param callbackfn condition to check on array elements
 * @return true if one or more elements in the array passes the callbackfn test
 */
export function some<T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => boolean
): boolean {
  // TODO: ↓ Replace this with your own solution ↓
  for (let i = 0; i < array.length; i++) {
    if (callbackfn(array[i], i, array)) return true;
  }
  return false;
  // ! Do not use [].some or other built-in higher-order functions. That's cheating!
}

/**
 * Detect whether all elements in an array meet a condition
 *
 * @export
 * @param array original array
 * @param callbackfn condition to check on array elements
 * @return true if all in the array passes the callbackfn test
 */
export function every<T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => boolean
): boolean {
  // TODO: ↓ Replace this with your own solution ↓
  for (let i = 0; i < array.length; i++) {
    if (!callbackfn(array[i], i, array)) return false;
  }
  return true;
  // ! Do not use [].every or other built-in higher-order functions. That's cheating!
}
