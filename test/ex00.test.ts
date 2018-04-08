import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import { sampleCold, sampleHot } from '../src/exercise/10-hot-and-cold/samples';
import { isCold, isHot, timeout } from './helpers';

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

  @test('isHot test Helper')
  public async isHotTest() {
    let resolved = false;
    let checkP = isHot(sampleHot(), async () => {
      await timeout(30);
    }).then(x => {
      resolved = true;
      return x;
    });
    assert.ok(checkP, 'isHot returns a value');
    assert.equal(typeof checkP.then, 'function', 'isHot returns a promise');
    assert.ok(!resolved, 'Promise has not yet resolved');
    let checkResult = await checkP;
    assert.ok(resolved, 'Promise has has now resolved');
    assert.equal(checkResult, true, 'Promise resolves to true');
  }

  @test('isCold test Helper')
  public async isColdTest() {
    let resolved = false;
    let checkP = isCold(sampleCold()).then(x => {
      resolved = true;
      return x;
    });
    assert.ok(checkP, 'isCold returns a value');
    assert.equal(typeof checkP.then, 'function', 'isCold returns a promise');
    assert.ok(!resolved, 'Promise has not yet resolved');
    let checkResult = await checkP;
    assert.ok(resolved, 'Promise has has now resolved');
    assert.equal(checkResult, true, 'Promise resolves to true');
  }
}
