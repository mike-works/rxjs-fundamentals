/**
 * ! Demo 2.A - An iterator is..
 *
 * - an object with a next() function
 * - that returns { value, done }
 */

const RED_FRUITS_4 = ['strawberry', 'cherry', 'apple', 'rasberry'];

(() => {
  let cursor = 0; // Keep track of the next thing to return
  // The iterator
  let it: Iterator<string> = {
    next() {
      return {
        value: RED_FRUITS_4[cursor++], // the value
        done: cursor >= RED_FRUITS_4.length // are we done yet?
      };
    }
  };
})();

/**
 * ! Demo 2.B - That cursor is bugging me
 *
 * - it's a leaky abstraction
 * - let's solve that with a closure
 */

function redFruits() {
  let i = 0;
  return {
    next() {
      return {
        value: RED_FRUITS_4[i++],
        done: i >= RED_FRUITS_4.length
      };
    }
  };
}

(() => {
  let it: Iterator<string> = redFruits();
  console.log('[Demo 2.B] ', it.next().value);
  console.log('[Demo 2.B] ', it.next().value);
  console.log('[Demo 2.B] ', it.next().value);
  console.log('[Demo 2.B] ', it.next().value);
  console.log('[Demo 2.B] ', it.next().value);
})();

/**
 * ! Demo 2.C - Let's get an item out of this thing
 */

console.log('---------------------\n');

(() => {
  let it: Iterator<string> = redFruits();
  let first: { value: string; done: boolean } = it.next();
  console.log(
    '[Demo 2.C] ',
    `First red fruit is ${
      first.value // the value
    } and ${
      first.done // are we done yet?
        ? 'there are NOT more'
        : 'there are more'
    }`
  );
})();

/**
 * ! Demo 2.D - next() is a function, and functions can receive arguments
 *
 * - nothing to stop us from passing something in
 */

console.log('---------------------\n');

function redFruits2() {
  const myFruits = [...RED_FRUITS_4];
  let i = 0;
  return {
    next(newFruit?: string) {
      // did we receive a new fruit?
      if (newFruit) {
        // add it
        myFruits.push(newFruit);
      }
      return { value: myFruits[i++], done: i >= myFruits.length };
    }
  };
}
(() => {
  let it: Iterator<string> = redFruits2();
  console.log('[Demo 2.D] ', it.next().value);
  console.log('[Demo 2.D] ', it.next('plum').value);
  console.log('[Demo 2.D] ', it.next().value);
  console.log('[Demo 2.D] ', it.next().value);
  console.log('[Demo 2.D] ', it.next().value);
})();

/**
 * ! Demo 2.E - an ITERABLE is
 *
 * - an object with a function called Symbol.iterator
 * - when invoked, returns an Iterator
 */

console.log('---------------------\n');

(() => {
  let it: Iterator<string> = RED_FRUITS_4[Symbol.iterator]();
  console.log('[Demo 2.E] ', it.next().value);
  console.log('[Demo 2.E] ', it.next().value);
  console.log('[Demo 2.E] ', it.next().value);
  console.log('[Demo 2.E] ', it.next().value);
})();

/**
 * ! Demo 2.F - Iterating in a for loop
 *
 */

console.log('---------------------\n');

(() => {
  let it: Iterator<string> = RED_FRUITS_4[Symbol.iterator]();
  for (let item = it.next(); !item.done; item = it.next()) {
    // Get an item // Check to see if we're done yet // Get the next item;
    console.log('[Demo 2.F] ', item.value);
  }
})();

/**
 * ! Demo 2.G - A for-of loop
 *
 * - hides the details of the iterator from us
 */

console.log('---------------------\n');

(() => {
  for (let veg of RED_FRUITS_4) {
    console.log('[Demo 2.G] ', veg);
  }
})();

/**
 * ! Demo 2.H - Our own iterable
 *
 * - 🤮
 */

console.log('---------------------\n');

(() => {
  const myIterable = {
    [Symbol.iterator]() {
      let count = 0;
      return {
        next() {
          return { value: count++ * 3, done: count >= 10 };
        }
      };
    }
  };

  for (let c of myIterable) {
    console.log('[Demo 2.H]  ', c);
  }
  for (let c of myIterable) {
    console.log('[Demo 2.H]* ', c);
  }
})();

/**
 * ! Demo 2.I - Generator functions
 *
 * - return an interator
 * - pause local execution between emitting values
 * - use the yield keyword to emit values
 */

console.log('---------------------\n');

(() => {
  function* mySequence() {
    let count = 0;
    while (count < 10) {
      yield count++ * 3;
    }
  }
  for (let c of mySequence()) {
    console.log('[Demo 2.I] ', c);
  }
})();

/**
 * ! Demo 2.J - Passing values into next()
 *
 * - mental model: local execution is paused at the "y" in "yield"
 * - values passed into next() are used when execution resumes
 */

console.log('---------------------\n');

(() => {
  const QUESTIONS = [
    'What is the year?',
    'What is the month?',
    'What is the day?'
  ];

  function* askQuestions() {
    let answers: number[] = [];
    let i = 0;
    debugger;
    while (i < QUESTIONS.length) {
      debugger;
      let answer = yield QUESTIONS[i++];
      debugger;
      answers.push(parseInt(answer, 10));
    }
    yield new Date(answers[0], answers[1], answers[2]);
  }

  let it: IterableIterator<string | Date> = askQuestions();
  debugger;
  // First question
  console.log('[Demo 2.J] ', it.next().value); // What is the year?
  console.log('[Demo 2.J] ', it.next('2018').value); // What is the month?
  console.log('[Demo 2.J] ', it.next('4').value); // What is the day?
  console.log('[Demo 2.J] ', it.next('5').value);
})();
