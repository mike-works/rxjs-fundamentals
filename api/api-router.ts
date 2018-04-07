import { Router } from 'express';
import { getExerciseData } from './workout/get-data';

const API_ROUTER = Router({
  caseSensitive: false
});

API_ROUTER.get('/ex6/workout-data', (req, res) => {
  res.json(getExerciseData());
});

export default API_ROUTER;
