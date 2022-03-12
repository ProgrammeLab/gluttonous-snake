var TABLE_CELL_SIZE = 32;
const canvasWidth = 640;
const canvasHeight = 640;
var Snake = [];
let canvas = document.querySelector('#canvas');
let snakeCanvas = document.querySelector('#snake-canvas').getContext('2d');
var currentPoint = null; // [x,y]
const keys = new Set();
var snake;
var timer;
const FRAME = 180;

if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    snake = new SnakeNode(snakeCanvas);
} else {
    alert('当前环境不支持canvas,请更换新版浏览器');
}
// 可用点二维数组
let emptyCell = [];
for (let i = 0; i < canvasWidth / TABLE_CELL_SIZE; i++) {
    for (let j = 0; j < canvasHeight / TABLE_CELL_SIZE; j++) {
        emptyCell.push([i * TABLE_CELL_SIZE, j * TABLE_CELL_SIZE]);
    }
}

// 绘制地图网格
function drawGrid() {
    // 竖线
    for (let i = 0; i <= canvasWidth / TABLE_CELL_SIZE; i++) {
        ctx.moveTo(i * TABLE_CELL_SIZE, 0);
        ctx.lineTo(i * TABLE_CELL_SIZE, canvasHeight);
        ctx.stroke();
    }
    // 横线
    for (let i = 0; i <= canvasHeight / TABLE_CELL_SIZE; i++) {
        ctx.moveTo(0, i * TABLE_CELL_SIZE);
        ctx.lineTo(canvasWidth, i * TABLE_CELL_SIZE);
        ctx.stroke();
    }
}

// ----------------------------------------------------------------------------------------
let head_pos_x = 0, head_pos_y = 0;
function upDateRender() {
    ctx.fillRect(head_pos_x * TABLE_CELL_SIZE, head_pos_y * TABLE_CELL_SIZE, TABLE_CELL_SIZE, TABLE_CELL_SIZE);
}

// 键盘监听
function keyBoardListen() {
    document.addEventListener('keydown', function (e) {
        e.preventDefault();
        if (!keys.has(e.code)) {
            keys.add(e.code);
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
        // snake.move();
    })
    document.addEventListener('keyup', function (e) {
        keys.delete(e.code);
    })
}

// 生成得分点
function genScoreNode() {
    let max = emptyCell.length;
    let point = Math.round(Math.random() * max);
    currentPoint = emptyCell[point];
    let flag = true;
    let i;
    while (flag) {
        for (i = 0; i < snake.body.length; i++) {
            // 生成的点在Snake的体内
            // 重新生成点
            if (snake.body[i][0] === currentPoint[0] && snake.body[i][1] === currentPoint[1]) {
                point = Math.round(Math.random() * max);
                currentPoint = emptyCell[point];
                break;
            }
        }
        if (i === snake.body.length) {
            flag = false;
        }
    }
    drawScoreNode();
}

// 绘制得分点
function drawScoreNode() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGrid();
    ctx.fillStyle = 'red';
    ctx.fillRect(currentPoint[0], currentPoint[1], TABLE_CELL_SIZE, TABLE_CELL_SIZE);
}

function main() {
    keyBoardListen();
    drawGrid();
    gameLoop();
    genScoreNode();
}

function reStart() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    snakeCanvas.clearRect(0, 0, canvasWidth, canvasHeight);
    clearInterval(timer);
    snake = null;
    snake = new SnakeNode(snakeCanvas);
    drawGrid();
    gameLoop();
    genScoreNode();
}

// 让snake自动前进
function gameLoop() {
    // snake.draw(snakeCanvas);
    // requestAnimationFrame(gameLoop);
    timer = setInterval(function () {
        snake.move();
    }, FRAME);
}
main();


