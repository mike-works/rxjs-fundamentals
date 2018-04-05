import { assert } from 'chai';
import { slow, suite, test, timeout } from 'mocha-typescript';
import * as coll from '../src/exercise/1-array-hof/index';

@suite('EX01: Array higher-order function tests')
class ArrayHofTests {
  @test('collection-utils.js exports')
  public async exportsArePresent() {
    assert.equal(typeof coll.map, 'function', 'Exercise module exports a map() function');
    assert.equal(typeof coll.reduce, 'function', 'Exercise module exports a reduce() function');
    assert.equal(typeof coll.filter, 'function', 'Exercise module exports a filter() function');
    assert.equal(typeof coll.forEach, 'function', 'Exercise module exports a forEach() function');
    assert.equal(typeof coll.some, 'function', 'Exercise module exports a some() function');
    assert.equal(typeof coll.every, 'function', 'Exercise module exports a every() function');
  }

  @test('forEach to iterate over [1, 2, 3]')
  public forEachSum() {
    let c = 0;
    coll.forEach([1, 2, 3], x => {
      c += x;
    });
    assert.equal(c, 6, 'Sum is 6');
  }

  @test('map to square each of [1, 2, 3]')
  public mapSquare() {
    assert.sameDeepMembers(coll.map([1, 2, 3], x => x * x), [1, 4, 9]);
  }

  @test('map to stringify each of [1, 2, 3]')
  public mapString() {
    assert.sameDeepMembers(coll.map([1, 2, 3], x => `${x}`), ['1', '2', '3']);
  }

  @test('filter [1, 2, 3] where x > 2')
  public filterMoreThanTwo() {
    assert.deepEqual(coll.filter([1, 2, 3], x => x > 2), [3]);
  }

  @test('filter [1, "2", 3] where x is a number')
  public filterNumbers() {
    assert.deepEqual(coll.filter([1, '2', 3], x => typeof x === 'number'), [1, 3]);
  }

  @test('reduce to sum up [1, 2, 3]')
  public reduceSum() {
    assert.equal(coll.reduce([1, 2, 3], (x, acc) => acc + x, 0), 6);
  }

  @test('reduce to average [99, 101, 100]')
  public reduceAvg() {
    assert.equal(
      coll.reduce(
        [99, 101, 100],
        (x, acc, idx, arr) => {
          if (idx === arr.length - 1) {
            return (acc + x) / arr.length;
          } else {
            return acc + x;
          }
        },
        0
      ),
      100
    );
  }

  @test('some to test whether any of these [1, 2, 3] are even')
  public someEven() {
    assert.equal(coll.some([1, 2, 3], x => x % 2 === 0), true);
  }

  @test('some to test whether any of these [1, 2, 3] are > 5')
  public someNotGreaterThanFive() {
    assert.equal(coll.some([1, 2, 3], x => x > 5), false);
  }

  @test('every to test whether ALL of these [1, 2, 3] are even')
  public everyEven() {
    assert.equal(coll.every([1, 2, 3], x => x % 2 === 0), false);
  }

  @test('every to test whether ALL of these [1, 2, 3] are > 0')
  public everyPositive() {
    assert.equal(coll.every([1, 2, 3], x => x > 0), true);
  }

  @test('every to test whether ALL of these [1, 2, 3] are <= 0')
  public everyNegative() {
    assert.equal(coll.every([1, 2, 3], x => x <= 0), false);
  }
}
