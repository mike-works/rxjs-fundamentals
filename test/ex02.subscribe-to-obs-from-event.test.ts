import { assert } from 'chai';
import { slow, suite, test, timeout } from 'mocha-typescript';
import { map, take, toArray } from 'rxjs/operators';
import { observableFromEvent } from '../src/exercise/2-subscribe-to-observables';
import { buttonOne } from '../src/exercise/2-subscribe-to-observables/fixtures';
import { nextValueFrom } from './helpers';

@suite('EX02: Subscribing to: Observable from an event')
class SubscribeToEventObservableTests {
  public static async before() {
    let b = document.createElement('button');
    b.id = 'button1';
    window.document.body.appendChild(b);
  }
  private values!: MouseEvent[];
  public async before() {
    let op = nextValueFrom(observableFromEvent().pipe(take(3), toArray()));
    buttonOne().dispatchEvent(new MouseEvent('click'));
    buttonOne().dispatchEvent(new MouseEvent('click'));
    buttonOne().dispatchEvent(new MouseEvent('click'));
    buttonOne().dispatchEvent(new MouseEvent('click')); // Should not be fired through the observer
    this.values = await op;
  }
  @test('Observer emits a sequence of values')
  public async numValues() {
    assert.isArray(this.values);
    assert.equal(this.values.length, 3);
  }
  @test('All values in the sequence are mouse events')
  public async valueTypes() {
    assert.ok(
      this.values.every(
        e => typeof e.clientX === 'number' && typeof e.clientY === 'number'
      ),
      'string'
    );
  }
}
