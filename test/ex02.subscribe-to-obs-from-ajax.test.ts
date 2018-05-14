import { assert } from 'chai';
import { slow, suite, test, timeout } from 'mocha-typescript';
import { AjaxResponse } from 'rxjs/ajax';
import { map, toArray } from 'rxjs/operators';
import { observableFromAjax } from '../src/exercise/2-subscribe-to-observables';
import { geoPermission$ } from '../src/exercise/2-subscribe-to-observables/fixtures';
import { nextValueFrom } from './helpers';

@suite('EX02: Subscribing to: Observable from ajax')
class SubscribeToAjaxObservableTests {
  private val!: AjaxResponse;
  public async before() {
    this.val = await nextValueFrom(observableFromAjax());
  }
  @test('Emits something')
  public valueType() {
    assert.ok(this.val);
  }

  @test('Emits an ajax response')
  public valueType2() {
    assert.equal(typeof this.val, 'object');
    assert.equal(typeof this.val.response, 'object');
  }

  @test('Emits an object that has a "data" property with an array value')
  public valueType3() {
    assert.isArray(this.val.response.data);
    assert.isAtLeast(
      this.val.response.data.length,
      3,
      'at least three items in the array'
    );
  }

  @test('Every object in the "data" array has an "attributes" object')
  public valueType4() {
    assert.ok(
      this.val.response.data.every(x => typeof x.attributes === 'object')
    );
  }

  @test(
    'Every object\'s "attributes" object contains a "course-number" and "title" property'
  )
  public valueType5() {
    assert.ok(
      this.val.response.data.every(
        x =>
          typeof x.attributes['course-number'] === 'string' &&
          typeof x.attributes.title === 'string'
      )
    );
  }
}
