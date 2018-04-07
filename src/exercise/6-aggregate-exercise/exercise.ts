import { concat, fromEvent, interval, ConnectableObservable, Observable, Subject } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { EventTargetLike } from 'rxjs/internal/observable/fromEvent';
import { concatAll, flatMap, map, multicast } from 'rxjs/operators';
import { addLogPanelMessage } from '../../common/log-panel';
import SynthEventTarget from '../../common/synth-event-target';
import './img/bike.svg';
import './img/run.svg';
import './img/swim.svg';
import './img/watch.svg';
import './img/weights.svg';

export interface ExerciseInfo {
  name: string;
  exercise: string;
  distance: number;
  time: number;
  heartRate: number;
  calories: number;
}
export const exerciseSubject = new Subject<ExerciseInfo>();
let $source = interval(200).pipe(
  map(() => ajax('/api/ex6/workout-data')),
  concatAll(),
  map(r => r.response as ExerciseInfo),
  multicast(exerciseSubject)
) as ConnectableObservable<ExerciseInfo>;

$source.connect();

export const data = {
  calories: 0,
  distance: 0,
  time: 0,
  heartrate: 0,
  activity: ''
};

export function updateCalories(n: number) {
  data.calories = n;
  let $el = document.querySelector('.calories-value');
  if ($el === null) {
    throw new Error('No .calories-value found');
  }
  $el.innerHTML = `${Math.round(n)}`;
}

export function updateActivity(name: string) {
  data.activity = name;
  let $el = document.querySelector('.activity-indicator');
  if ($el === null) {
    throw new Error('No .activity-indicator found');
  }
  $el.classList.remove(...['bike', 'run', 'weights', 'swim'].filter(n => n !== name));
  $el.classList.add(name);
}

export function updateDistanceInFeet(feet: number) {
  data.calories = feet;
  let $el = document.querySelector('.distance-value');
  if ($el === null) {
    throw new Error('No .distance-value found');
  }
  $el.innerHTML = `${(feet / 5280).toFixed(2)} mi`;
}

export function updateTimeInSeconds(n: number) {
  data.calories = n;
  let $el = document.querySelector('.time-value');
  if ($el === null) {
    throw new Error('No .time-value found');
  }
  $el.innerHTML = `${(n - n % 60) / 60}m ${Math.round(n % 60)}s`;
}

export function updateHeartrate(bpm: number) {
  data.heartrate = bpm;
  let $el = document.querySelector('.heartrate-value');
  if ($el === null) {
    throw new Error('No .heartrate-value found');
  }
  $el.innerHTML = `${Math.round(bpm)} bpm`;
}

updateTimeInSeconds(0);
updateDistanceInFeet(0);
updateCalories(0);
updateHeartrate(88);

exerciseSubject.subscribe(ex => {
  addLogPanelMessage('panel6', `${ex.name}: ${ex.calories} cal, ${ex.distance} mi, ${ex.time} sec`);
});

let exSubscription;
