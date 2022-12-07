import {
    Shape,
    World,
    stopAllSounds,
    LoadImage,
    LoadAudio,
    GameLoop,
    Shapes,
    Cursors,
    Text,
    PreSuffixedRange,
    Animation,
    deg,
} from 'https://raw.githack.com/rhpo/life.js/main/src/life.min.js?';

var AXIS = {
    NONE: 1,
    HORIZONTAL: 2,
    VERTICAL: 3,
    BOTH: 4
};

// // Camera constructor
function Camera(xView, yView, viewportWidth, viewportHeight, worldWidth, worldHeight) {
    function Rectangle(left, top, width, height) {
        this.left = left || 0;
        this.top = top || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    Rectangle.prototype.set = function (left, top, /*optional*/ width, /*optional*/ height) {
        this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
    }

    Rectangle.prototype.within = function (r) {
        return (r.left <= this.left &&
            r.right >= this.right &&
            r.top <= this.top &&
            r.bottom >= this.bottom);
    }

    Rectangle.prototype.overlaps = function (r) {
        return (this.left < r.right &&
            r.left < this.right &&
            this.top < r.bottom &&
            r.top < this.bottom);
    }
    // position of camera (left-top coordinate)
    this.xView = xView || 0;
    this.yView = yView || 0;

    // distance from followed object to border before camera starts move
    this.xDeadZone = 0; // min distance to horizontal borders
    this.yDeadZone = 0; // min distance to vertical borders

    // viewport dimensions
    this.wView = viewportWidth;
    this.hView = viewportHeight;

    // allow camera to move in vertical and horizontal axis
    this.axis = AXIS.BOTH;

    // object that should be followed
    this.followed = null;

    // rectangle that represents the viewport
    this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);

    // rectangle that represents the world's boundary (room's boundary)
    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);

}

// gameObject needs to have "x" and "y" properties (as world(or room) position)
Camera.prototype.follow = function (gameObject, xDeadZone, yDeadZone) {
    this.followed = gameObject;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
}

Camera.prototype.update = function () {
    // keep following the player (or other desired object)
    if (this.followed != null) {
        if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
            // moves camera on horizontal axis based on followed object position
            if (this.followed.x - this.xView + this.xDeadZone > this.wView)
                this.xView = this.followed.x - (this.wView - this.xDeadZone);
            else if (this.followed.x - this.xDeadZone < this.xView)
                this.xView = this.followed.x - this.xDeadZone;

        }
        if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
            // moves camera on vertical axis based on followed object position
            if (this.followed.y - this.yView + this.yDeadZone > this.hView)
                this.yView = this.followed.y - (this.hView - this.yDeadZone);
            else if (this.followed.y - this.yDeadZone < this.yView)
                this.yView = this.followed.y - this.yDeadZone;
        }

    }

    // update viewportRect
    this.viewportRect.set(this.xView, this.yView);

    // don't let camera leaves the world's boundary
    if (!this.viewportRect.within(this.worldRect)) {
        if (this.viewportRect.left < this.worldRect.left)
            this.xView = this.worldRect.left;
        if (this.viewportRect.top < this.worldRect.top)
            this.yView = this.worldRect.top;
        if (this.viewportRect.right > this.worldRect.right)
            this.xView = this.worldRect.right - this.wView;
        if (this.viewportRect.bottom > this.worldRect.bottom)
            this.yView = this.worldRect.bottom - this.hView;
    }

}

const duplicate = e => JSON.parse(JSON.stringify(e));

const FPS = 120;

let gameOverScreen = document.getElementById('gameOver');

const images = {
    cursor: './assets/cursor.png',
    player: './assets/player.png',
    ai: './assets/ai.png',
    fire: './assets/fire.png',
    background: './assets/background.jpg',
}
for (const key in images) {
    images[key] = await LoadImage(images[key]);
}

const damageImages = PreSuffixedRange('./assets/damage/frame_', '.png', 0, 7);
for (const key in damageImages) {
    damageImages[key] = await LoadImage(damageImages[key]);
}

const objectToArray = object => Object.keys(object).map(key => object[key]);


const sounds = {
    background: './assets/sounds/background.mp3',
    damage: './assets/sounds/damage.wav',
    gameover: './assets/sounds/gameover.mp3',
    shoot: './assets/sounds/shoot.wav',
    levelup: './assets/sounds/levelup.mp3',
}

for (const key in sounds) {
    sounds[key] = await LoadAudio(sounds[key]);
}

const world = new World({
    pattern: 'image',
    background: {
        image: images.background,
    },
    responsive: true,
    hasLimits: false,

    border: {
        background: 'transparent'
    },

    G: {
        x: 0,
        y: 0,
    }
});

sounds.background.volume = 0.4;
sounds.background.loop = true;
sounds.background.play();

function damageSound() {
    sounds.damage.play();
}

const player = new Shape({
    width: 20,
    height: 40,
    pattern: 'image',
    background: {
        image: images.player,
    },

    physics: true,

    noCollisionWith: ['bullet'],
    tag: 'player',
    onCollision: who => {
        if (who.tag == 'enemy') {
            damageSound();
        }
    },

    speed: 1,
});

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

world.center(player);

var robots = [];

var aiSpeed = 1;
function generateAI() {
    // x and y must be outside of the map range, and not inside
    var x = [-100, world.width + 100][Math.floor(Math.random() * 2)];
    var y = Math.random() * world.height;
    var ai = new Shape({
        width: 30,
        height: 30,
        pattern: 'image',
        background: {
            image: images.ai,
        },

        x: x,
        y: y,

        physics: false,

        noCollisionWith: ['aibullet', 'enemy'],
        tag: 'enemy',

        onCollision: who => {
            if (who.tag == 'player') {
                world.pause();
                stopAllSounds(sounds);
                sounds.gameover.play();
                animate(world.canvas, 'fadeOut 2s').then(() => {
                    world.canvas.style.opacity = 0;
                    world.canvas.style.zIndex = 1;
                    gameOverScreen.style.zIndex = 999999;
                    gameOverScreen.style.display = 'flex';
                    // play fadeOut backwards
                    animate(gameOverScreen, 'fadeOut 0.4s reverse');
                    document.querySelector('#score').innerHTML = score;
                });
            }
        },

        speed: aiSpeed,
    });
    return ai;
}

var level = 0;

var levelInterval = {
    0: 2200,
    1: 1800,
    2: 1100,
}

var levelNames = {
    0: 'Easy',
    1: 'Medium',
    2: 'Hard',
}

setInterval(() => {
    robots.push(generateAI());
}, levelInterval[level]);

var playerBullets = [];
var score = 0;

world.on('click', function (e) {
    var bullet = new Shape({
        width: 5,
        height: 5,
        radius: 5,
        type: Shapes.Square,
        pattern: 'color',
        background: 'cyan',
        physics: false,

        onCollision: who => {
            if (who.tag === 'enemy') {
                who.remove();
                bullet.remove();
                bullet.x = -100;
                bullet.y = -100;
                playerBullets.forEach((bull, index) => {
                    if (bull.id === bullet.id) {
                        playerBullets.splice(index, 1);
                    }
                });
                robots.splice(robots.indexOf(who), 1);
                damageSound();
                score++;

                if (score % 10 === 0) {
                    if (level < 2) {
                        level++;
                        aiSpeed = 5000;
                        robots.forEach(robot => {
                            robot.speed = aiSpeed;
                        })
                        setTimeout(() => {
                            robots.push(generateAI());
                        }, levelInterval[level]);
                        sounds.levelup.play();
                    }
                }
                new Animation(new Shape({
                    width: 30,
                    height: 30,
                    pattern: 'image',
                    background: {
                        image: damageImages[0],
                    },
                    x: who.x + who.width / 2,
                    y: who.y + who.height / 2,
                    physics: false,
                    isBody: false,
                    noCollisionWith: ['aibullet', 'enemy'],
                    tag: 'explosion',
                }), 50, false, ...objectToArray(damageImages)).start().onFinish(target => {
                    target.remove();
                });
            }
        },

        // x and y coordinates are the top center of the shape, and we take care of the rotation
        x: player.x + player.width / 2,
        y: player.y + player.height / 2,

        tag: 'bullet',
        noCollisionWith: ['aibullet', 'bullet'],
    });

    var reqTimeBulletOut = Math.sqrt(Math.pow(bullet.x - player.x, 2) + Math.pow(bullet.y - player.y, 2)) / player.speed * FPS;
    setTimeout(() => {
        bullet.remove();
    }, reqTimeBulletOut * 1000);

    sounds.shoot.play();

    playerBullets.push([bullet, duplicate(world.mouse)]);
});

if (world.isMobile) {
    document.querySelector('.mobile-controls').style.display = 'flex';

    document.querySelector('.walk').addEventListener('touchstart', () => {
        world.mouse.isRightClicked = true;
    });

    document.querySelector('.walk').addEventListener('touchend', () => {
        world.mouse.isRightClicked = false;
    });

    document.querySelector('.shoot').addEventListener('touchstart', () => {
        world.emit('click');
    });
}

window.WORLD = world;

const camera = new Camera(0, 0, -1, -1, 0, 0);

camera.follow(player);


function main() {

    if (!world.paused) {
        var playerY = player.y + player.height / 2;
        var playerX = player.x + player.width / 2;
        var thetaMouseShape = Math.atan2(playerY - world.mouse.y, playerX - world.mouse.x) * 180 / Math.PI - 90;
        player.rotation = thetaMouseShape;

        playerBullets.forEach(function (bullet) {
            var angle = Math.atan2(playerY - bullet[1].y, playerX - bullet[1].x) * 180 / Math.PI + 180;
            bullet[0].moveTheta(angle, 20);
        });

        robots.forEach(robot => {
            var theta = world.getAngleBetween(robot, player);
            robot.moveTheta(theta, 1);
            robot.rotation = theta + 90;
        });

        if (world.HoveredObjects().map(e => e.tag).includes('enemy')) {
            world.setCursor(Cursors.Crosshair);
        } else world.setCursor(Cursors.Cell);

        world.update(() => {
            camera.update();

            Text({
                text: 'Score: ' + score,
                x: 10,
                y: 10,
                background: 'white',
                type: 'fill',
                size: '20px',
                font: '\'Press Start 2P\', cursive'
            });

            Text({
                text: `Level: ${levelNames[level]}`,
                x: 10,
                y: 10,
                fromEnd: true,
                background: 'white',
                type: 'fill',
                size: '20px',
                font: '\'Press Start 2P\', cursive'
            });

            if (world.mouse.isRightClicked) {
                // follow mouse if the radius between the mouse and the player is more than 10
                if (Math.sqrt(Math.pow(playerX - world.mouse.x, 2) + Math.pow(playerY - world.mouse.y, 2)) > 50) {
                    player.follow(world.mouse);
                } else {
                    world.setCursor(Cursors.None);
                }
            }

            if (world.mouse.isLeftClicked) {
                world.draw({
                    type: 'line',
                    x1: player.x + player.width / 2,
                    y1: player.y + player.height / 2,
                    x2: world.mouse.x,
                    y2: world.mouse.y,
                    pattern: 'color',
                    background: 'red',
                    width: 1,
                });
            }
        });

        camera.update();
    }
}

const game = new GameLoop(main, FPS);
game.start();


document.querySelector('#restart').addEventListener('click', () => {
    window.location.reload();
});
