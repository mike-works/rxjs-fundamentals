import { assert } from 'chai';
import { slow, suite, test } from 'mocha-typescript';
import { Observable } from 'rxjs';
import { take, takeUntil, toArray } from 'rxjs/operators';
import { coldToHot, hotToCold, isCold, isHot } from '../src/exercise/10-hot-and-cold/index';
import { sampleCold, sampleHot } from '../src/exercise/10-hot-and-cold/samples';
import { timeout } from './helpers';

@suite('EX10: Observable Temperature')
class ObservableTemperatureTests {
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

  @test('Hot sample observable tests as hot')
  public async hotIsHot() {
    let hot = sampleHot();
    assert.equal(
      await isHot(hot, async () => {
        await timeout(30);
      }),
      true,
      'Sample hot observable initially tests as hot'
    );
  }

  @test('Hot sample observable tests as not cold')
  public async hotIsNotCold() {
    let hot = sampleHot();
    assert.equal(await isCold(hot), false, 'Sample hot observable initially tests as not cold');
  }

  @test('Cold sample observable tests as cold')
  public async coldIsCold() {
    let cold = sampleCold();
    assert.equal(await isCold(cold), true, 'Sample cold observable initially tests as cold');
  }

  @test('Cold sample observable tests as not hot')
  public async coldIsNotHot() {
    let cold = sampleCold();
    assert.equal(
      await isHot(cold, async () => {
        await timeout(30);
      }),
      false,
      'Sample cold observable initially tests as not hot'
    );
  }

  @test('Hot to cold')
  public async hotToColdTest() {
    let hot = sampleHot();
    assert.ok(await isCold(hotToCold(hot)));
  }

  @test('Cold to hot')
  public async coldToHotTest() {
    let cold = sampleCold();
    assert.equal(
      await isHot(coldToHot(cold), async () => {
        await timeout(30);
      }),
      true,
      'coldToHot makes a cold observable hot'
    );
  }
}
