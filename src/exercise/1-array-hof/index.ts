import { addLogPanelMessage } from '../../common/log-panel';
import { every, filter, forEach, map, reduce, some } from './collection-utils';

/**
 * - Exercise 1.A
 */
addLogPanelMessage(
  'panel1a',
  'Attempting to use forEach to iterate over [1, 2, 3] and calculate the sum'
);
try {
  let sum = 0;
  forEach([1, 2, 3], x => (sum += x));
  if (sum === 6) {
    addLogPanelMessage('panel1a', `✅ Result was ${sum}`);
  } else {
    addLogPanelMessage('panel1a', `❌ Result was ${sum} (expected: 6)`);
  }
} catch (e) {
  addLogPanelMessage('panel1a', `ERROR: ${e}`);
}

/**
 * - Exercise 1.B
 */
addLogPanelMessage('panel1b', 'Attempting to use map to square each of [1, 2, 3]');
try {
  let squares = map([1, 2, 3], x => x * x);
  if (squares.length === 3) {
    addLogPanelMessage('panel1b', `✅ array returned by map() has 3 elements`);
  } else {
    addLogPanelMessage(
      'panel1b',
      `❌ array returned by map() has ${squares.length} elements (expected: 3)`
    );
  }
  if (JSON.stringify(squares) === JSON.stringify([1, 4, 9])) {
    addLogPanelMessage('panel1b', `✅ array returned by map() has correct elements`);
  } else {
    addLogPanelMessage(
      'panel1b',
      `❌ array returned by map() has incorrect elements: ${JSON.stringify(
        squares
      )} (expected: ${JSON.stringify([1, 4, 9])})`
    );
  }
} catch (e) {
  addLogPanelMessage('panel1b', `ERROR: ${e}`);
}

/**
 * - Exercise 1.C
 */

addLogPanelMessage(
  'panel1c',
  'Attempting to use filter to identify elements of [1, 2, 3] that are even'
);
try {
  let filtered = filter([1, 2, 3], x => x % 2 === 0);
  if (filtered.length === 1) {
    addLogPanelMessage('panel1c', `✅ array returned by filter() has 1 element`);
  } else {
    addLogPanelMessage(
      'panel1c',
      `❌ array returned by filter() has ${filtered.length} elements (expected: 3)`
    );
  }
  if (JSON.stringify(filtered) === JSON.stringify([2])) {
    addLogPanelMessage('panel1c', `✅ array returned by filter() has correct elements`);
  } else {
    addLogPanelMessage(
      'panel1c',
      `❌ array returned by filter() has incorrect elements: ${JSON.stringify(
        filtered
      )} (expected: ${JSON.stringify([2])})`
    );
  }
} catch (e) {
  addLogPanelMessage('panel1c', `ERROR: ${e}`);
}

/**
 * - Exercise 1.D
 */

addLogPanelMessage('panel1d', 'Attempting to use reduce to sum elements [1, 2, 3]');
try {
  let reduced = reduce([1, 2, 3], (acc, item) => acc + item, 0);
  if (reduced === 6) {
    addLogPanelMessage('panel1d', `✅ value returned by reduce() is correct`);
  } else {
    addLogPanelMessage(
      'panel1d',
      `❌ array returned by reduce() was incorrect: ${reduced} (expected: 6)`
    );
  }
} catch (e) {
  addLogPanelMessage('panel1d', `ERROR: ${e}`);
}

/**
 * - Exercise 1.E
 */

addLogPanelMessage('panel1e', 'Attempting to use some to check for even elements [1, 2, 3, 4]');
try {
  let someAreEven = some([1, 2, 3, 4], x => x % 2 === 0);
  if (someAreEven) {
    addLogPanelMessage('panel1e', `✅ value returned by some() is correct`);
  } else {
    addLogPanelMessage(
      'panel1e',
      `❌ array returned by some() was incorrect: ${someAreEven} (expected: true)`
    );
  }
} catch (e) {
  addLogPanelMessage('panel1e', `ERROR: ${e}`);
}

/**
 * - Exercise 1.F
 */

addLogPanelMessage(
  'panel1f',
  'Attempting to use every to check for ALL even elements [1, 2, 3, 4]'
);
try {
  let allAreEven = every([1, 2, 3, 4], x => x % 2 === 0);
  if (!allAreEven) {
    addLogPanelMessage('panel1f', `✅ value returned by every() is correct`);
  } else {
    addLogPanelMessage(
      'panel1f',
      `❌ array returned by every() was incorrect: ${allAreEven} (expected: false)`
    );
  }
} catch (e) {
  addLogPanelMessage('panel1f', `ERROR: ${e}`);
}

addLogPanelMessage('panel1f', 'Attempting to use every to check for ALL even elements [2, 6, 4]');
try {
  let allAreEven = every([2, 6, 4], x => x % 2 === 0);
  if (allAreEven) {
    addLogPanelMessage('panel1f', `✅ value returned by every() is correct`);
  } else {
    addLogPanelMessage(
      'panel1f',
      `❌ array returned by every() was incorrect: ${allAreEven} (expected: true)`
    );
  }
} catch (e) {
  addLogPanelMessage('panel1f', `ERROR: ${e}`);
}
