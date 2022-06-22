// init.ts
class GameFactory {
  static create = function (level: string): Game {
    switch (level) {
      case "easy":
        return new Game("easy")
      case "normal":
        return new Game("normal")
      case "hard":
        return new Game("hard")
      default:
        break;
    }
  }
}

function initialize() {
  const player: Player = new Player();
  const game = GameFactory.create('hard');
  const snake = Snake.getInstance(game);
  const view = new View(game, snake);
  game.snake = snake;
  game.view = view;
  listen(view);
  keyBoardListen(player, snake);
  view.emit('start');
}

function listen(observer: View) {
  observer.on('toggleView', function () {

  })
  observer.on('updateRender', function () {
    observer.updateRender();
  })
  observer.on('genScore', function () {
    observer.genScore();
  })
  observer.on('start', function () {
    observer.genScore();
    observer.updateRender();
    const timer = setInterval(function () {
      observer.snake.move();
    }, observer.game.FRAME);
  })
}

// 键盘监听
function keyBoardListen(player: Player, snake: Snake) {
  document.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (!player.keys.has(e.code)) {
      player.keys.add(e.code);
    }
    // 不能反向
    if (e.code === KeyBoard.RIGHT && snake.dir === KeyBoard.LEFT
      || e.code === KeyBoard.LEFT && snake.dir === KeyBoard.RIGHT
      || e.code === KeyBoard.UP && snake.dir === KeyBoard.DOWN
      || e.code === KeyBoard.DOWN && snake.dir === KeyBoard.UP) {
      return;
    }
    switch (e.code) {
      case KeyBoard.UP:
        snake.dir = KeyBoard.UP;
        break;
      case KeyBoard.DOWN:
        snake.dir = KeyBoard.DOWN;
        break;
      case KeyBoard.LEFT:
        snake.dir = KeyBoard.LEFT;
        break;
      case KeyBoard.RIGHT:
        snake.dir = KeyBoard.RIGHT;
        break;
      default:
        break;
    }
  })
  document.addEventListener('keyup', function (e) {
    player.keys.delete(e.code);
  })
}
initialize();