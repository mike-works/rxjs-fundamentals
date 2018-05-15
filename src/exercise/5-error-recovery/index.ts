import { range, zip, interval } from 'rxjs';
import { delay, map, retry, retryWhen, take, tap } from 'rxjs/operators';
import { addLogPanelMessage } from '../../common/log-panel';
import { unstableFibonacci } from './fixtures';

/**
 * - Exercise 5.A
 * Retry up to 20 times
 */
// TODO: Replace this with your solution
unstableFibonacci()
  .pipe(retry(20))
  .forEach(val => addLogPanelMessage('panel5a', `Value: ${val}`));

/**
 * - Exercise 5.B
 * Retry if sequence was less than 5 digits
 */
// TODO: Replace this with your solution
unstableFibonacci()
  .pipe(take(5), retry())
  .forEach(val => addLogPanelMessage('panel5b', `Value: ${val}`));

/**
 * - Exercise 5.C
 * Retry no more than once per second
 */
// TODO: Replace this with your solution
unstableFibonacci()
  .pipe(
    take(30),
    retryWhen(errors => {
      let lastFail: number | undefined;
      return zip(errors, interval(1000));
    })
  )
  .forEach(val => addLogPanelMessage('panel5c', `Value: ${val}`));
