import { valueWithNoise } from '../utils';

const SPEED = 6.0;

interface ActivityInfo {
  name: string;
  calPerHour: number;
  distPerHour: number;
  injuryChancePerHour: number;
  steadyHeartRate: number;
  duration: number;
}

const ACTIVITIES: { [k: string]: ActivityInfo } = {
  run: {
    name: 'run',
    calPerHour: 725,
    distPerHour: 6 * 5280,
    injuryChancePerHour: 0.025,
    steadyHeartRate: 148,
    duration: 20 * 60 * 1000
  },
  swim: {
    name: 'swim',
    calPerHour: 750,
    distPerHour: 2 * 5280,
    injuryChancePerHour: 0.0125,
    steadyHeartRate: 132,
    duration: 20 * 60 * 1000
  },
  weights: {
    name: 'weights',
    calPerHour: 420,
    distPerHour: 0,
    injuryChancePerHour: 0.05,
    steadyHeartRate: 110,
    duration: 10 * 60 * 1000
  },
  bike: {
    name: 'bike',
    calPerHour: 650,
    distPerHour: 9.6 * 5280,
    injuryChancePerHour: 0.0125,
    steadyHeartRate: 126,
    duration: 25 * 60 * 1000
  }
};

const ACTIVITY_NAMES = Object.keys(ACTIVITIES);
const FULL_ROTATION_TIME = ACTIVITY_NAMES.map(a => ACTIVITIES[a].duration).reduce(
  (sum, d) => sum + d,
  0
);

function exerciseName(): string {
  if (firstRequestTime === null) {
    return ACTIVITY_NAMES[0];
  }
  let t = new Date().valueOf();
  let elapsed = (t - firstRequestTime) * SPEED;
  let cycleTime = elapsed % FULL_ROTATION_TIME;
  let i = 0;
  while (cycleTime - ACTIVITIES[ACTIVITY_NAMES[i]].duration > 0 && i < ACTIVITY_NAMES.length) {
    i++;
    cycleTime -= ACTIVITIES[ACTIVITY_NAMES[i]].duration;
  }
  return ACTIVITY_NAMES[i];
}

interface ExerciseData {
  name: string;
  time: number;
  calories: number;
  distance: number;
  heartRate: number;
  injury?: boolean;
}

let firstRequestTime: number | null = null;
let lastRequestTime: number | null = null;
let isInjured = false;
let heartRate = 88;

function msToHour(ms: number): number {
  return ms / (1000 * 60 * 60);
}

function exerciseDataForTime(name: string, time: number): ExerciseData {
  let { calPerHour, distPerHour, steadyHeartRate } = ACTIVITIES[name];
  let maxHrIncrease = time * SPEED * 3 / 30000;
  heartRate = Math.max(
    Math.min(heartRate + maxHrIncrease, steadyHeartRate),
    heartRate - maxHrIncrease
  );
  if (Math.random() < msToHour(time)) {
    isInjured = true;
  }
  return {
    name,
    time: time * SPEED,
    calories: calPerHour * msToHour(time) * SPEED,
    distance: distPerHour * msToHour(time) * SPEED,
    heartRate
  };
}

export function getExerciseData(): ExerciseData {
  let name = exerciseName();
  let t = new Date().valueOf();
  if (lastRequestTime === null) {
    lastRequestTime = t - 3000;
    firstRequestTime = t;
  }
  let dt = t - lastRequestTime;
  lastRequestTime = t;
  return exerciseDataForTime(name, dt);
}
