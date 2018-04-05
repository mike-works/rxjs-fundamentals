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
  // TODO: ↓ Replace this with your own solution ↓
  array.forEach(callbackfn);
  // ! Do not use [].forEach or other higher-order functions. That's cheating!
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
export function map<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U): U[] {
  // TODO: ↓ Replace this with your own solution ↓
  return array.map(callbackfn);
  // ! Do not use [].map or other higher-order functions. That's cheating!
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
  return array.filter(callbackfn);
  // ! Do not use [].filter or other higher-order functions. That's cheating!
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
  callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue: U
): U {
  // TODO: ↓ Replace this with your own solution ↓
  return array.reduce(callbackfn, initialValue);
  // ! Do not use [].reduce or other higher-order functions. That's cheating!
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
  return array.some(callbackfn);
  // ! Do not use [].some or other higher-order functions. That's cheating!
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
  return array.every(callbackfn);
  // ! Do not use [].every or other higher-order functions. That's cheating!
}
