// game.ts
class Game extends Observer {
    constructor(level) {
        super();
        this.emptyCell = [];
        this.canvasWidth = 640;
        this.canvasHeight = 640;
        this.FRAME = 180;
        switch (level) {
            case "easy":
                this.TABLE_CELL_SIZE = 64;
                break;
            case "normal":
                this.TABLE_CELL_SIZE = 32;
                break;
            case "hard":
                this.TABLE_CELL_SIZE = 16;
                break;
        }
        this.fillUserCell();
    }
    init() {
    }
    fillUserCell() {
        for (let i = 0; i < this.canvasWidth / this.TABLE_CELL_SIZE; i++) {
            for (let j = 0; j < this.canvasHeight / this.TABLE_CELL_SIZE; j++) {
                let point = [i * this.TABLE_CELL_SIZE, j * this.TABLE_CELL_SIZE];
                this.emptyCell.push(point);
            }
        }
    }
    genScoreNode() {
        let max = this.emptyCell.length;
        let point = Math.round(Math.random() * max);
        this.currentPoint = this.emptyCell[point];
        let flag = true;
        let i;
        while (flag) {
            for (i = 0; i < this.snake.body.length; i++) {
                // 生成的点在Snake的体内
                // 重新生成点
                if (this.snake.body[i][0] === this.currentPoint[0] && this.snake.body[i][1] === this.currentPoint[1]) {
                    point = Math.round(Math.random() * max);
                    this.currentPoint = this.emptyCell[point];
                    break;
                }
            }
            if (i === this.snake.body.length) {
                flag = false;
            }
        }
        this.view.emit('genScore');
    }
    start() {
        this.view.emit('start');
    }
    reStart() {
    }
    notify() {
    }
}
