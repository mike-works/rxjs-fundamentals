import { map, reduce, scan } from 'rxjs/operators';
import {
  exerciseSubject, // Observable to monitor for exercise info
  updateActivity, // Set the activity type in the UI
  updateCalories, // Set the calories in the UI
  updateDistanceInFeet, // Set the distance traveled in the UI
  updateHeartrate, // Set the heartrate in the UI
  updateTimeInSeconds, // Set the time elapsed in the UI
  ExerciseInfo // interface for exercise data
} from './exercise';
import './styles';

exerciseSubject.subscribe(d => {
  console.log('data: ', d);
});
