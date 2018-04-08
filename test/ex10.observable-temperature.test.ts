import { assert } from 'chai';
import { slow, suite, test } from 'mocha-typescript';
import { Observable } from 'rxjs';
import { take, takeUntil, toArray } from 'rxjs/operators';
import { coldToHot, hotToCold } from '../src/exercise/10-hot-and-cold/index';
import { sampleCold, sampleHot } from '../src/exercise/10-hot-and-cold/samples';
import { isCold, isHot, timeout } from './helpers';

@suite('EX10: Observable Temperature')
class ObservableTemperatureTests {
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
