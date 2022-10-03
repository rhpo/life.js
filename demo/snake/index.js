import {
    Shape,
    World,
    GameLoop,
    Shapes,
    Text,
    Patterns,
    LoadImage,
    LoadAudio,
    stopAllSounds
} from 'https://gitcdn.link/cdn/rhpo/life.js/main/src/life.min.js?';

const images = {
    food: 'assets/apple.png',
}, sounds = {
    gameover: 'assets/audio/gameover.mp3',
    eat: 'assets/audio/eat.wav',
}

for (const key in images) {
    images[key] = await LoadImage(images[key]);
}

for (const key in sounds) {
    sounds[key] = await LoadAudio(sounds[key]);
}

let world = new World({
    size: {
        width: 400,
        height: 400,
    },
    background: 'palegreen',

    hasLimits: false,
    responsive: false
});

let gameOverScreen = document.getElementById('gameOver');
document.querySelector('#restart').addEventListener('click', () => location.reload());

let animate = (el, animation) => {
    return new Promise((resolve) => {
        const onAnimationEndCb = () => {
            el.removeEventListener("animationend", onAnimationEndCb);
            resolve();
        };
        el.addEventListener("animationend", onAnimationEndCb);
        el["style"].animation = animation;
    });
};

function gameOver() {
    world.pause();
    stopAllSounds(sounds);
    sounds.gameover.play();
    animate(world.canvas, 'fadeOut 2s').then(() => {
        world.canvas.style.opacity = 0;
        gameOverScreen.style.display = 'flex';
        animate(gameOverScreen, 'fadeOut 0.4s reverse');
        document.querySelectorAll('.score').forEach(i => i.innerHTML = score);
        document.querySelector('#restart').focus();
    });
}

document.querySelector('.mobile-controls').style.display = world.isTouchDevice ? 'flex' : 'none';

const CELL_SIZE = 20;

function generateGrid() {
    for (var i = 0; i < world.width; i += CELL_SIZE) {
        new Shape({
            type: 'line',
            lineCoordinates: {
                x1: i,
                y1: 0,
                x2: i,
                y2: world.height,
            },
            background: 'black',
            width: 1,
            physics: false,
            isBody: false,
            zIndex: 999,
        });
    }
    for (var i = 0; i < world.height; i += CELL_SIZE) {
        new Shape({
            type: 'line',
            lineCoordinates: {
                x1: 0,
                y1: i,
                x2: world.width,
                y2: i,
            },
            background: 'black',
            width: 1,
            physics: false,
            isBody: false,
            zIndex: 9999,
        });
    }
}

var lost = false;

const generateSnakeCell = (x, y) => {
    return new Shape({
        x: x,
        y: y,
        width: CELL_SIZE,
        height: CELL_SIZE,
        type: Shapes.Circle,
        pattern: Patterns.Color,
        background: 'green',
        physics: false,
        zIndex: 0,
        tag: 'player',

        onCollision: (other) => {
            if (other.tag === 'player') {
                lost = true;
            }
        }
    });
}

const snake = [
    generateSnakeCell(100, 100),
    generateSnakeCell(80, 100),
    generateSnakeCell(80, 100),
];

snake[0].cacheDirection = 'right';

const snakeMove = dir => {
    let newHead = generateSnakeCell(snake[0].x, snake[0].y);
    newHead.move(dir, CELL_SIZE);
    snake.unshift(newHead);

    if (newHead.x < 0) {
        newHead.x = world.width - CELL_SIZE;
    } else if (newHead.x > world.width - CELL_SIZE) {
        newHead.x = 0;
    }
    if (newHead.y < 0) {
        newHead.y = world.height - CELL_SIZE;
    } else if (newHead.y > world.height - CELL_SIZE) {
        newHead.y = 0;
    }
    // if (snake[0].x === food.x && snake[0].y === food.y) {
    //     food.remove();
    //     food = generateFood();
    // } else {
    snake.pop().remove();
    // }
}

generateGrid();

var score = 0;

function main() {
    if (!world.paused) {

        lost && gameOver();

        var preventDefault = false;

        if ((world.key.isPressed('ArrowLeft') || world.key.isPressed('q')) && snake[0].cacheDirection !== 'right') {
            snakeMove('left');
            preventDefault = true;
        } else if ((world.key.isPressed('ArrowRight') || world.key.isPressed('d')) && snake[0].cacheDirection !== 'left') {
            snakeMove('right');
            preventDefault = true;
        } else if ((world.key.isPressed('ArrowUp') || world.key.isPressed('z')) && snake[0].cacheDirection !== 'down') {
            snakeMove('up');
            preventDefault = true;
        } else if ((world.key.isPressed('ArrowDown') || world.key.isPressed('s')) && snake[0].cacheDirection !== 'up') {
            snakeMove('down');
            preventDefault = true;
        }

        if (!preventDefault) {
            snakeMove(snake[0].cacheDirection);
        }

        world.update();
    }
}

; (function generateFood() {
    var x = Math.floor(Math.random() * world.width / CELL_SIZE) * CELL_SIZE;
    do {
        if (world.collision(x, snake)) {
            x = Math.floor(Math.random() * world.width / CELL_SIZE) * CELL_SIZE;
        }
    } while (world.collision(x, snake));
    var y = Math.floor(Math.random() * world.height / CELL_SIZE) * CELL_SIZE;
    do {
        if (world.collision(x, snake)) {
            y = Math.floor(Math.random() * world.height / CELL_SIZE) * CELL_SIZE;
        }
    } while (world.collision(y, snake));

    let food = new Shape({
        x: x,
        y: y,
        width: CELL_SIZE,
        height: CELL_SIZE,
        pattern: Patterns.Image,
        background: {
            image: images.food,
        },
        physics: false,
        zIndex: 1,

        onCollision: who => {
            if (who.tag === 'player') {
                generateFood();
                food.remove();
                sounds.eat.play();
                score++;
                document.title = `Snake | LifeJS - Score: ${score}`;
                document.querySelectorAll('.score').forEach(i => i.innerHTML = score);
                snake.push(generateSnakeCell(snake[0].x, snake[0].y));
            }
        }
    });
    return food;
})();

window.addEventListener('load', e => {
    document.querySelector('.left').addEventListener('touchstart', e => {
        snake[0].cacheDirection !== 'right' && snakeMove('left');
    });
    document.querySelector('.right').addEventListener('touchstart', e => {
        snake[0].cacheDirection !== 'left' && snakeMove('right');
    });
    document.querySelector('.up').addEventListener('touchstart', e => {
        snake[0].cacheDirection !== 'down' && snakeMove('up');
    });
    document.querySelector('.down').addEventListener('touchstart', e => {
        snake[0].cacheDirection !== 'up' && snakeMove('down');
    });
});

const FPS = 15;
const game = new GameLoop(main, FPS);
game.start();
