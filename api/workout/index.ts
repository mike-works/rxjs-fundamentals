import * as express from 'express';
import { getExerciseData } from './get-data';

const r = express.Router();

r.get('/', (req, res) => {
  res.json(getExerciseData());
});

export default r;
