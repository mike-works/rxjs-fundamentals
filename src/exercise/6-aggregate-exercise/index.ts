import { fromEvent, ConnectableObservable, Subject } from 'rxjs';
import { map, reduce, scan } from 'rxjs/operators';
import './exercise';
import {
  exerciseSubject,
  updateActivity,
  updateCalories,
  updateDistanceInFeet,
  updateHeartrate,
  updateTimeInSeconds,
  ExerciseInfo
} from './exercise';
import './styles';

exerciseSubject
  .pipe(
    scan<ExerciseInfo, number>((acc, val) => {
      return acc + val.distance;
    }, 0)
  )
  .subscribe(d => {
    updateDistanceInFeet(d);
  });

exerciseSubject.subscribe(ei => {
  updateActivity(ei.name);
});

exerciseSubject
  .pipe(
    scan<ExerciseInfo, number>((acc, val) => {
      return acc + val.time;
    }, 0)
  )
  .subscribe(t => {
    updateTimeInSeconds(t / 1000);
  });

exerciseSubject
  .pipe(
    scan<ExerciseInfo, number>((acc, val) => {
      return val.heartRate;
    }, 0)
  )
  .subscribe(t => {
    updateHeartrate(t);
  });

exerciseSubject
  .pipe(
    scan<ExerciseInfo, Array<{ calories: number; time: number }>>(
      (acc, val) => {
        let { calories, time } = val;
        acc.push({ time, calories });
        while (time - acc[0].time > 20000) {
          acc.shift();
        }
        return acc;
      },
      [] as Array<{ calories: number; time: number }>
    ),
    map<Array<{ calories: number; time: number }>, { calories: number; time: number }>(arr =>
      arr.reduce(
        (acc, item) => {
          return { calories: acc.calories + item.calories, time: acc.time + item.time };
        },
        { calories: 0, time: 0 }
      )
    ),
    map(({ calories, time }) => calories / time * 1000 * 60 * 60)
  )
  .subscribe(c => {
    updateCalories(c);
  });
