import { assert } from 'chai';
import { slow, suite, test, timeout } from 'mocha-typescript';
import { toArray } from 'rxjs/operators';
import { newObservable } from '../src/exercise/2-subscribe-to-observables';

@suite('EX02: Subscribing to a ( new Observable(...) )')
@timeout(10000)
@slow(2000)
class SubscribeToNewObservableTests {
  private vals!: number[];
  public async before() {
    this.vals = await newObservable.pipe(toArray()).toPromise();
  }
  @test('At least one value in the sequence')
  public numValues() {
    assert.isAtLeast(this.vals.length, 1);
  }

  @test('All values in the sequence are numbers')
  public valueTypes() {
    assert.ok(this.vals.every(x => typeof x === 'number'));
  }

  @test('Every value except the last is <= 90')
  public middleValues() {
    if (this.vals.length > 1) {
      assert.ok(
        this.vals.slice(0, this.vals.length - 1).every(x => x <= 90),
        `Every value in the sequence except the last one is less than 90 - ${JSON.stringify(
          this.vals,
          null,
          '  '
        )}`
      );
    }
  }

  @test('Last value is > 90')
  public lastValue() {
    assert.isAtLeast(this.vals[this.vals.length - 1], 90, 'Last value is > 90');
  }
}
