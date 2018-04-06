import { assert } from 'chai';
import { slow, suite, test, timeout } from 'mocha-typescript';

@suite('EX02: SubscribeToObservable')
class SubscribeTests {
  @test
  public async todo() {
    assert.equal(2, await Promise.resolve(2), 'Expected two to equal two.');
  }
}
