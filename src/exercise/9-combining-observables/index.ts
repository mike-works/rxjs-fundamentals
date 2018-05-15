import { fromEvent, interval, BehaviorSubject, Observable } from 'rxjs';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  take,
  withLatestFrom
} from 'rxjs/operators';
import './styles';

const BALL_RADIUS = 10;
const PADDLE_HEIGHT = 30;
const PADDLE_WIDTH = 15;
const PADDLE_OFFSET = 10;

interface BoardSize {
  readonly w: number;
  readonly h: number;
  readonly ratio: number;
}

interface Ball {
  x: number;
  y: number;
  theta: number;
}

interface Board {
  size: BoardSize;
}

interface GameUI {
  cnv: HTMLCanvasElement;
  ctxt: CanvasRenderingContext2D;
  board: Board;
  paddleL: number;
  scoreL: number;
  scoreR: number;
  paddleR: number;
}

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function drawPaddle(game: GameUI, side: 'left' | 'right') {
  let y = side === 'left' ? game.paddleL : game.paddleR;
  let { ctxt } = game;
  ctxt.beginPath();
  ctxt.fillStyle = 'grey';
  if (side === 'left') {
    ctxt.fillRect(
      PADDLE_OFFSET,
      y - PADDLE_HEIGHT,
      PADDLE_WIDTH,
      2 * PADDLE_HEIGHT
    );
  } else {
    ctxt.fillRect(
      game.board.size.w - PADDLE_WIDTH - PADDLE_OFFSET,
      y - PADDLE_HEIGHT,
      PADDLE_WIDTH,
      2 * PADDLE_HEIGHT
    );
  }
  // ctxt.stroke();
}

function drawBall(game: GameUI, { x, y }: { x: number; y: number }) {
  let {
    ctxt,
    cnv,
    board: {
      size: { w, h }
    }
  } = game;
  // ctxt.clearRect(x - 2 * BALL_RADIUS, y - 2 * BALL_RADIUS, 4 * BALL_RADIUS, 4 * BALL_RADIUS);
  ctxt.beginPath();
  ctxt.fillStyle = 'red';
  ctxt.ellipse(x, y, BALL_RADIUS, BALL_RADIUS, 0, 0, 2 * Math.PI);
  ctxt.fill();
}

function drawBallMotionVector(
  game: GameUI,
  { x, y }: { x: number; y: number },
  angle: number
) {
  let {
    ctxt,
    cnv,
    board: {
      size: { w, h }
    }
  } = game;
  ctxt.beginPath();
  ctxt.strokeStyle = 'yellow';
  ctxt.lineWidth = 2;
  ctxt.moveTo(x, y);
  ctxt.lineTo(x + Math.cos(angle) * 10, y - Math.sin(angle) * 10);
  ctxt.stroke();
}

function setupGame(cnv: HTMLCanvasElement): GameUI {
  let aspectRatio = cnv.width / cnv.height;
  let ar2 = window.innerWidth / window.innerHeight;
  let cw: number;
  let ch: number;
  if (ar2 < aspectRatio) {
    cw = window.innerWidth - 22;
    ch = cw / aspectRatio;
  } else {
    ch = window.innerHeight - 50;
    cw = ch * aspectRatio;
  }
  cnv.width = cw;
  cnv.height = ch;
  const ctxt = cnv.getContext('2d');
  if (ctxt === null) {
    throw new Error('Unable to get CanvasRenderingContext2D from canvas');
  }
  const game = {
    scoreL: 0,
    scoreR: 0,
    board: { size: { w: cw, h: ch, ratio: cw / ch } },
    ctxt,
    cnv,
    paddleL: ch / 2,
    paddleR: ch / 2
  };
  drawPaddle(game, 'left');
  drawPaddle(game, 'right');

  drawBall(game, { x: cw / 2, y: ch / 2 });
  drawBallMotionVector(game, { x: cw / 2, y: ch / 2 }, Math.PI * 45 / 180);
  return game;
}

window.onload = () => {
  const cnv: HTMLCanvasElement | null = document.querySelector('.board');
  if (cnv === null) {
    throw new Error('No <canvas class="body"></canvas>');
  }
  let game = setupGame(cnv);

  let gameSubject = new BehaviorSubject<GameUI>(game);

  let {
    board: {
      size: { w, h }
    }
  } = game;
  let ballSubject = new BehaviorSubject<Ball>({
    x: w / 2,
    y: h / 2,
    theta: 0.3
  });
};
