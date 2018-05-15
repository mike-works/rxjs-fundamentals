import * as express from 'express';
import * as data from './data.json';

if (typeof data === 'undefined' || data === null) {
  throw new Error('No pricing data found');
}

if (!(data instanceof Array)) {
  throw new Error('Expected an array of pricing data');
}

// 6 months in 2-hour increments
const PRICE_DATA = (data as string[][]).map(
  ([timestamp, open, high, low, close, volumeBTC, volume, weightedPrice]) => {
    return {
      timestamp,
      open,
      high,
      low,
      close,
      volumeBTC,
      volume,
      weightedPrice
    };
  }
);

export default function(app) {
  let firstRequestTime: number;

  const r = express.Router();

  r.get('/price', (req, resp) => {
    if (typeof firstRequestTime === 'undefined') {
      firstRequestTime = new Date().valueOf();
    }
    resp.json({ foo: 'bar' });
  });
  return r;
}
