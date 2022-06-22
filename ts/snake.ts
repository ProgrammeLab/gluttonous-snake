// snake.ts
class Snake {
  private head_x: number = 0;
  private head_y: number = 0;
  public body: Array<any> = [[0, 0]];
  public dir: string = KeyBoard.RIGHT;
  private static instance: Snake;
  private game: Game;
  private speed: number;

  private constructor(game: Game) {
    this.game = game;
    this.speed = game.TABLE_CELL_SIZE;
  }
  static getInstance(game: Game): Snake {
    if (!this.instance) {
      this.instance = new Snake(game);
    }
    return this.instance;
  }
  move() {
    let tail = [...this.body[this.body.length - 1]];
    // 坐标前移
    switch (this.dir) {
      case KeyBoard.DOWN:
        this.head_y += this.speed;
        break;
      case KeyBoard.UP:
        this.head_y -= this.speed;
        break;
      case KeyBoard.LEFT:
        this.head_x -= this.speed;
        break;
      case KeyBoard.RIGHT:
        this.head_x += this.speed;
        break;
      default:
        break;
    }
    if (this.isHitSelf() || this.isHitWall()) {
      // 从新开始游戏
      this.head_x = 0;
      this.head_y = 0;
      this.body = [[0, 0]];
      this.dir = KeyBoard.RIGHT;
      console.log("restart");
      return;
    }
    // 整体移动
    let tmpx, tmpy, lastx = this.head_x, lasty = this.head_y;
    for (let i = 0; i < this.body.length; i++) {
      tmpx = this.body[i][0]
      tmpy = this.body[i][1]
      this.body[i][0] = lastx;
      this.body[i][1] = lasty;
      lastx = tmpx;
      lasty = tmpy;
    }
    if (this.isHitPoint()) {
      // 吃到得分点
      this.body.push(tail);
      this.game.genScoreNode();
    }

    this.game.view.emit('updateRender')
  }
  /**
   * 判断是否撞墙
   * @returns 
   */
  isHitWall(): boolean {
    if (this.head_x < 0 || this.head_x >= this.game.canvasWidth || this.head_y < 0 || this.head_y > this.game.canvasHeight) {
      alert('GAME OVER');
      // reStart();
      return true;
    }
    return false;
  }
  // 判断是否撞到自己
  isHitSelf(): boolean {
    for (let i = 0; i < this.body.length; i++) {
      if (this.head_x === this.body[i][0] && this.head_y === this.body[i][1]) {
        alert('GAME OVER');
        return true;
      }

    }
    return false
  }
  // 判断是否吃到得分点
  isHitPoint(): boolean {
    if (this.head_x === this.game.currentPoint[0]
      && this.head_y === this.game.currentPoint[1])
      return true;
    return false;
  }
}
