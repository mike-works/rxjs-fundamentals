import { assert } from 'chai';
import { slow, suite, test, timeout } from 'mocha-typescript';
import { map, toArray } from 'rxjs/operators';
import { observableFromPromise } from '../src/exercise/2-subscribe-to-observables';
import { notificationPermission$ } from '../src/exercise/2-subscribe-to-observables/fixtures';
import { nextValueFrom } from './helpers';

@suite('EX02: Subscribing to: Observable from a Promise')
class SubscribeToPromiseObservableTests {
  @timeout(10000)
  @test('At least one value in the sequence')
  public async numValues() {
    let op = nextValueFrom(observableFromPromise);
    notificationPermission$.next('granted');
    let result = await op;
    assert.isAtLeast(result.length, 1);
  }
  @test('All values in the sequence are strings')
  public async valueTypes() {
    let op = nextValueFrom(observableFromPromise);
    notificationPermission$.next('granted');
    let result = await op;
    assert.equal(typeof result, 'string');
  }
}
