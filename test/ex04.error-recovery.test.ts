import { assert } from 'chai';
import { slow, suite, test, timeout } from 'mocha-typescript';

@suite('EX04: Observable Error Recovery')
class ErrorRecoveryTests {
  @test
  public async world2() {
    assert.equal(2, await Promise.resolve(2), 'Expected two to equal two.');
  }
}
