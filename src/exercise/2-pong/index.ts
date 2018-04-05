import { fromEvent, interval, BehaviorSubject, Observable } from 'rxjs';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, merge, take, withLatestFrom } from 'rxjs/operators';
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
  // if (side === 'left') {
  //   ctxt.clearRect(0, 0, 25, game.board.size.h);
  // } else {
  //   ctxt.clearRect(game.board.size.w - 25, 0, 25, game.board.size.h);
  // }
  ctxt.beginPath();
  ctxt.fillStyle = 'grey';
  if (side === 'left') {
    ctxt.fillRect(PADDLE_OFFSET, y - PADDLE_HEIGHT, PADDLE_WIDTH, 2 * PADDLE_HEIGHT);
  } else {
    ctxt.fillRect(game.board.size.w - PADDLE_WIDTH - PADDLE_OFFSET, y - PADDLE_HEIGHT, PADDLE_WIDTH, 2 * PADDLE_HEIGHT);
  }
  // ctxt.stroke();
}

function drawBall(game: GameUI, { x, y }: { x: number; y: number }) {
  let { ctxt, cnv, board: { size: { w, h } } } = game;
  // ctxt.clearRect(x - 2 * BALL_RADIUS, y - 2 * BALL_RADIUS, 4 * BALL_RADIUS, 4 * BALL_RADIUS);
  ctxt.beginPath();
  ctxt.fillStyle = 'red';
  ctxt.ellipse(x, y, BALL_RADIUS, BALL_RADIUS, 0, 0, 2 * Math.PI);
  ctxt.fill();
}

function drawBallMotionVector(game: GameUI, { x, y }: { x: number; y: number }, angle: number) {
  let { ctxt, cnv, board: { size: { w, h } } } = game;
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

function boundedMouseMoveObservable(game: GameUI): Observable<{ x: number; y: number }> {
  const { cnv } = game;
  return fromEvent<MouseEvent>(window, 'mousemove').pipe(
    map(m => getMousePos(cnv, m)),
    map(m => {
      let xp = 35 * game.board.size.ratio;
      let y = Math.max(35, Math.min(m.y, game.board.size.h - 35));
      let x = Math.max(xp, Math.min(m.x, game.board.size.w - xp));
      return {
        y,
        x
      };
    }),
    distinctUntilChanged()
  );
}

window.onload = () => {
  const cnv: HTMLCanvasElement | null = document.querySelector('.board');
  if (cnv === null) {
    throw new Error('No <canvas class="body"></canvas>');
  }
  let game = setupGame(cnv);

  let gameSubject = new BehaviorSubject<GameUI>(game);
  gameSubject.forEach((g: GameUI) => {
    let $scoreL = document.querySelector('.score.score-l');
    let $scoreR = document.querySelector('.score.score-r');
    if ($scoreL) {
      $scoreL.innerHTML = `${g.scoreL}`;
    }
    if ($scoreR) {
      $scoreR.innerHTML = `${g.scoreR}`;
    }
  });

  boundedMouseMoveObservable(game).pipe(withLatestFrom(gameSubject)).subscribe(([p, g]) => {
     let paddleL = p.y;
     let paddleR = p.x / g.board.size.ratio;
     let newGame = { ...g, paddleL, paddleR };
     gameSubject.next(newGame);
   });

  let { board: { size: { w, h } } } = game;
  let ballSubject = new BehaviorSubject<Ball>({
    x: w / 2,
    y: h / 2,
    theta: 0.3
  });

  interval(30)
    .pipe(
      withLatestFrom(ballSubject, gameSubject)
    ).forEach(([_, ball, g]) => {
      let { x, y, theta } = ball;
      x += 8 * Math.cos(theta);
      y -= 8 * Math.sin(theta);
      if (x <= 20 + 2 * BALL_RADIUS && (y < (g.paddleL + PADDLE_HEIGHT) && (y > g.paddleL - PADDLE_HEIGHT))) {
        theta = Math.PI - theta;
      } else if ((x > g.board.size.w - 20 - 2 * BALL_RADIUS) && (y < (g.paddleR + PADDLE_HEIGHT) && (y > g.paddleR - PADDLE_HEIGHT))) {
        theta = Math.PI - theta;
      } else if (x <= 5 || x > g.board.size.w - 10) {
        // left/right wall bounce
        theta = Math.PI - theta;
        if (x <= 5) {
          g.scoreR++;
          x = 16;
        } else {
          g.scoreL++;
          x = g.board.size.w - 16;
        }
        gameSubject.next(g);
      } else if (y <= 13 || y > g.board.size.h - 13) {
        // top/bottom wall bounce
        theta = -theta;
      }
      ballSubject.next({ x, y, theta })
    });

  ballSubject.pipe(withLatestFrom(gameSubject)).subscribe(([b, g]) => {
    let { x, y, theta } = b;
    g.ctxt.clearRect(5, 0, g.cnv.width - 10, g.cnv.height);
    drawPaddle(g, 'left');
    drawPaddle(g, 'right');
    drawBall(g, { x, y });
    drawBallMotionVector(g, { x, y }, theta);
  });
};
