import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { sampleCold, sampleHot } from '../src/exercise/10-hot-and-cold/samples';
import { timeout } from './helpers';

@suite('EX00: Initial tests')
class Hello {
  @test('timeout test helper')
  public async timeoutTest() {
    let resolved = false;
    let p = timeout(20).then(() => {
      resolved = true;
    });
    assert.ok(p, 'Timeout returns a value');
    assert.ok(!resolved, 'Timeout promise has not yet resolved');
    await new Promise(res => {
      setTimeout(res, 50);
    });
    assert.ok(resolved, 'Timeout promise has been resolved');
  }
}
