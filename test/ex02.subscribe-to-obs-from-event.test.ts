import { assert } from 'chai';
import { slow, suite, test, timeout } from 'mocha-typescript';
import { map, take, toArray } from 'rxjs/operators';
import { observableFromEvent } from '../src/exercise/2-subscribe-to-observables';
import { synthButton } from '../src/exercise/2-subscribe-to-observables/fixtures';
import { nextValueFrom } from './helpers';

@suite('EX02: Subscribing to: Observable from an event')
class SubscribeToEventObservableTests {
  private values!: MouseEvent[];
  public async before() {
    let op = nextValueFrom(observableFromEvent.pipe(take(3), toArray()));
    synthButton.fireEvent('click', { x: 99, y: 99 });
    synthButton.fireEvent('click', { x: 99, y: 99 });
    synthButton.fireEvent('click', { x: 99, y: 99 });
    synthButton.fireEvent('click', { x: 99, y: 99 }); // Should not be fired through the observer
    this.values = await op;
  }
  @test('Observer emits a sequence of values')
  public async numValues() {
    assert.isArray(this.values);
    assert.equal(this.values.length, 3);
  }
  @test('All values in the sequence are mouse events')
  public async valueTypes() {
    assert.ok(this.values.every(x => typeof x.x === 'number' && typeof x.y === 'number'), 'string');
  }
}
