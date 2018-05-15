// 0-argument function, 0 arguments pre-applied
export function partial<A, R>(fn: () => R): () => R;
// 1-argument function, 0 arguments pre-applied
export function partial<A, R>(fn: (a: A) => R): (a: A) => R;
// 1-argument function, 1 arguments pre-applied
export function partial<A, R>(fn: (a: A) => R, pa: A): () => R;
// 2-argument function, 0 arguments pre-applied
export function partial<A, B, R>(fn: (a: A, b: B) => R): (a: A, b: B) => R;
// 2-argument function, 1 arguments pre-applied
export function partial<A, B, R>(fn: (a: A, b: B) => R, pa: A): (b: B) => R;
// 2-argument function, 2 arguments pre-applied
export function partial<A, B, R>(fn: (a: A, b: B) => R, pa: A, pb: B): () => R;
// 3-argument function, 0 arguments pre-applied
export function partial<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R
): (a: A, b: B, c: C) => R;
// 3-argument function, 1 arguments pre-applied
export function partial<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R,
  pa: A
): (b: B, c: C) => R;
// 3-argument function, 2 arguments pre-applied
export function partial<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R,
  pa: A,
  pb: B
): (c: C) => R;
// 3-argument function, 3 arguments pre-applied
export function partial<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R,
  pa: A,
  pb: B,
  pc: C
): () => R;
// 4-argument function, 0 arguments pre-applied
export function partial<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R
): (a: A, b: B, c: C, d: D) => R;
// 4-argument function, 1 arguments pre-applied
export function partial<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R,
  pa: A
): (b: B, c: C, d: D) => R;
// 4-argument function, 2 arguments pre-applied
export function partial<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R,
  pa: A,
  pb: B
): (c: C, d: D) => R;
// 4-argument function, 3 arguments pre-applied
export function partial<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R,
  pa: A,
  pb: B,
  pc: C
): (d: D) => R;
// 4-argument function, 4 arguments pre-applied
export function partial<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R,
  pa: A,
  pb: B,
  pc: C,
  pd: D
): () => R;
export function partial(fn: (...args: any[]) => any, ...someArgs: any[]) {
  return fn.bind(undefined, ...someArgs);
}
