import { Router } from 'express';
import { MOVIEDB_V3_API_KEY } from '../config';
import movieDbRouter from './moviedb';
import { getExerciseData } from './workout/get-data';

const API_ROUTER = Router({
  caseSensitive: false
});

API_ROUTER.get('/ex6/workout-data', (req, res) => {
  res.json(getExerciseData());
});

API_ROUTER.use('/moviedb', movieDbRouter);

export default API_ROUTER;
