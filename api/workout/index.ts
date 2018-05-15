import * as express from 'express';
import { getExerciseData } from './get-data';

const r = express.Router();

const UNSTABLE_THRESHOLD = 0.9;

r.get('/', (req, res) => {
  if (req.query.unstable === 'true') {
    let roll = Math.random();
    console.log(
      `Unstable mode -- rolling dice: ${roll} > ${UNSTABLE_THRESHOLD} ?`
    );
    if (roll > UNSTABLE_THRESHOLD) {
      res.status(500);
      res.json({ error: `Unlucky roll: ${roll}` });
      return;
    }
  }
  res.json(getExerciseData());
});

export default r;
