import * as express from 'express';
import bitcoinRouter from './bitcoin';
import movieDbRouter from './moviedb';
import workoutRouter from './workout';

export default function(app) {
  const API_ROUTER = express.Router({ caseSensitive: false });

  API_ROUTER.use('/workout', workoutRouter);
  API_ROUTER.use('/moviedb', movieDbRouter);
  API_ROUTER.use('/bitcoin', bitcoinRouter(app));
  return API_ROUTER;
}
