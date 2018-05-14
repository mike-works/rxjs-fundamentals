import { assert } from 'chai';
import { slow, suite, test, timeout } from 'mocha-typescript';
import { map, toArray } from 'rxjs/operators';
import { observableFromCallback } from '../src/exercise/2-subscribe-to-observables';
import { geoPermission$ } from '../src/exercise/2-subscribe-to-observables/fixtures';
import { nextValueFrom } from './helpers';

@suite('EX02: Subscribing to: Observable from a Callback')
class SubscribeToCallbackObservableTests {
  @test('Emits one Position value')
  public async valueType() {
    let op = nextValueFrom(observableFromCallback());
    geoPermission$.next({
      coords: {
        latitude: 99,
        longitude: 95,
        accuracy: 4,
        altitude: 9,
        altitudeAccuracy: 4,
        heading: null,
        speed: null
      },
      timestamp: new Date().valueOf()
    });
    let result = await op;
    assert.hasAllKeys(result, ['coords', 'timestamp'], 'Emits a position');
  }
}
