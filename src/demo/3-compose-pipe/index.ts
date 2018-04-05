/**
 * ! Demo 3.A - Compose function
 */

function currencyRound(x) {
  return Math.round(x * 100) / 100;
}

function currencyFormat(x) {
  return `$ ${x.toFixed(2)}`;
}

function pipe(val, ...fns) {
  return fns.reduce((acc, item) => item(acc), val);
}

function compose(val, ...fns) {
  return fns.reverse().reduce((acc, item) => item(acc), val);
}

let prices = [301.14129, 1249.14, 91412949].map(p => pipe(p, currencyRound, currencyFormat));
console.log(prices);

console.log(pipe(3.10999, currencyRound, currencyFormat));
console.log(compose(3.10999, currencyFormat, currencyRound));
