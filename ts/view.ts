// view.ts
class View extends Observer {
  private views: Map<number, any>;
  public game: Game;
  public snake: Snake;
  constructor(game: Game, snake: Snake) {
    super();
    this.game = game;
    this.snake = snake;
    this.views = new Map();
    this.createCanvasContext();
  }
  createCanvasContext() {
    // grid--0
    this.views.set(0, this.getCanvas("#canvas"));
    this.views.set(1, this.getCanvas("#snake-canvas"));
  }
  getCanvas(selector) {
    const canvas = document.querySelector(selector);
    return canvas.getContext('2d');
  }
  updateRender() {
    // this.drawGrid();
    const ctx = this.views.get(1);
    ctx.clearRect(
      0,
      0,
      this.game.canvasWidth,
      this.game.canvasHeight
    );
    // 绘制body
    for (let i = 0; i < this.snake.body.length; i++) {
      ctx.fillRect(
        this.snake.body[i][0],
        this.snake.body[i][1],
        this.game.TABLE_CELL_SIZE,
        this.game.TABLE_CELL_SIZE
      )
    }
  }
  // 生成分数点
  genScore() {
    let max = this.game.emptyCell.length;
    let point = Math.round(Math.random() * max);
    this.game.currentPoint = this.game.emptyCell[point];
    let flag = true;
    console.dir(this.game)
    let i;
    while (flag) {
      for (i = 0; i < this.snake.body.length; i++) {
        // 生成的点在Snake的体内
        // 重新生成点
        if (this.snake.body[i][0] === this.game.currentPoint[0] && this.snake.body[i][1] === this.game.currentPoint[1]) {
          point = Math.round(Math.random() * max);
          this.game.currentPoint = this.game.emptyCell[point];
          break;
        }
      }
      if (i === this.snake.body.length) {
        flag = false;
      }
    }
    this.drawScoreNode();
  }
  toggleView() {

  }
  drawCurrentView() {

  }
  // 绘制网格
  drawGrid() {
    const gridCtx = this.views.get(0);
    // 竖线
    for (let i = 0; i <= this.game.canvasWidth / this.game.TABLE_CELL_SIZE; i++) {
      gridCtx.moveTo(i * this.game.TABLE_CELL_SIZE, 0);
      gridCtx.lineTo(i * this.game.TABLE_CELL_SIZE, this.game.canvasHeight);
      gridCtx.stroke();
    }
    // 横线
    for (let i = 0; i <= this.game.canvasHeight / this.game.TABLE_CELL_SIZE; i++) {
      gridCtx.moveTo(0, i * this.game.TABLE_CELL_SIZE);
      gridCtx.lineTo(this.game.canvasWidth, i * this.game.TABLE_CELL_SIZE);
      gridCtx.stroke();
    }
  }
  // 绘制得分点
  drawScoreNode() {
    const ctx = this.views.get(0);
    ctx.clearRect(0, 0, this.game.canvasWidth, this.game.canvasHeight);
    this.drawGrid();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.game.currentPoint[0], this.game.currentPoint[1], this.game.TABLE_CELL_SIZE, this.game.TABLE_CELL_SIZE);
  }
}