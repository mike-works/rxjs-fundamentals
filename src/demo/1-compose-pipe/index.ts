// import { partial } from './partial';
/**
 * ! Demo 3.A - Compose function
 */

function currencyRound(x: number): number {
  return Math.round(x * 100) / 100;
}

function currencyFormat(sym: string, x: number): string {
  return `${sym} ${x.toFixed(2)}`;
}
const dollarFormat = currencyFormat.bind(null, '$');

// let x = currencyFormat(currencyRound(y));

function pipe(val, ...fns) {
  return fns.reduce((acc, fn) => fn(acc), val);
}

let z = pipe(9.841824, currencyRound, dollarFormat);

function compose(val, ...fns) {
  return fns.reverse().reduce((acc, item) => item(acc), val);
}

let prices = [301.14129, 1249.14, 91412949].map(p =>
  // Create one function that applies several operations sequentially
  pipe(p, currencyRound, dollarFormat)
);
console.log('prices: ', prices);

console.log('result of pipe: ', pipe(3.10999, currencyRound, dollarFormat));
console.log(
  'result of compose: ',
  compose(3.10999, dollarFormat, currencyRound)
);

function sum(a: number, b: number, c: number, d: number) {
  return a + b + c + d;
}

const partSum = (cc, dd) => {
  return sum(2, 4, cc, dd);
};
const partSum2 = sum.bind(undefined, 2, 4);
console.log('>>>>>>>', partSum2(2, 2));
