let speed = 32;

class SnakeNode {
    head_x = 0;
    head_y = 0;
    body = [[0, 0]];
    dir = KeyBoard.RIGHT;
    constructor(ctx, x, y) {
        this.ctx = ctx;
    }
    _move() {

    }
    move() {
        let tail = [...this.body[this.body.length - 1]];
        // 坐标前移
        switch (this.dir) {
            case KeyBoard.DOWN:
                this.head_y += speed;
                break;
            case KeyBoard.UP:
                this.head_y -= speed;
                break;
            case KeyBoard.LEFT:
                this.head_x -= speed;
                break;
            case KeyBoard.RIGHT:
                this.head_x += speed;
                break;
            default:
                break;
        }
        this.isHitWall();
        this.isHitSelf();
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
            genScoreNode();
        }

        this.draw();
    }
    // 判断是否吃到得分点
    isHitPoint() {
        if (this.head_x === currentPoint[0] && this.head_y === currentPoint[1])
            return true;
        return false;
    }
    /**
     * 判断是否撞墙
     * @returns 
     */
    isHitWall() {
        if (this.head_x < 0 || this.head_x >= canvasWidth || this.head_y < 0 || this.head_y > canvasHeight) {
            alert('GAME OVER');
            reStart();
            return true;
        }
        return false;
    }

    // 判断是否撞到自己
    isHitSelf() {
        for (let i = 0; i < this.body.length; i++) {
            if (this.head_x === this.body[i][0] && this.head_y === this.body[i][1]) {
                alert('GAME OVER');
                reStart();
                return true;
            }

        }
        return false
    }
    /**
     * 绘制蛇体
     */
    draw() {
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // 绘制body
        for (let i = 0; i < this.body.length; i++) {
            this.ctx.fillRect(this.body[i][0], this.body[i][1], TABLE_CELL_SIZE, TABLE_CELL_SIZE)
        }
    }
}
