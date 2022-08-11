import { Animation, LoadImage, LoadAudio, Shape, Text, World } from 'https://gitcdn.link/cdn/rhpo/life.js/main/src/life.min.js';

const images = {
    ground: './assets/ground.png',
    moving1R: './assets/moving1R.png',
    moving2R: './assets/moving2R.png',
    moving3R: './assets/moving3R.png',
    regularR: './assets/regularR.png',
    regularL: './assets/regularL.png',
    jumpL: './assets/jumpL.png',
    jumpR: './assets/jumpR.png',
    moving1L: './assets/moving1L.png',
    moving2L: './assets/moving2L.png',
    moving3L: './assets/moving3L.png',

    ai1: './assets/AI1.png',
    ai2: './assets/AI2.png',
    ai2blue: './assets/AI2Blue.png',
    aidead: './assets/aidead.png',

    finish: './assets/finish.jpg',
    finish2: './assets/finish2.jpg',

    sky: 'https://png.pngtree.com/png-vector/20220614/ourmid/pngtree-white-pixel-fluffy-bubble-clouds-on-blue-sky-png-image_5089795.png',
    skynight: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a53ef9bb-28c6-4f11-ad10-27c0096b5f0d/d9hk8i1-6be6a070-a2ac-465f-8694-26bdcf38a912.png/v1/fill/w_960,h_640,q_80,strp/night_sky_pixel_art_by_zlzhang_d9hk8i1-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvYTUzZWY5YmItMjhjNi00ZjExLWFkMTAtMjdjMDA5NmI1ZjBkXC9kOWhrOGkxLTZiZTZhMDcwLWEyYWMtNDY1Zi04Njk0LTI2YmRjZjM4YTkxMi5wbmciLCJ3aWR0aCI6Ijw9OTYwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.A8fq6gSbOiC-SNJ_0NJC_ebKAYnEY3rP4_xO0SVB4JU'
}

const sounds = {
    jump: './assets/audio/jump.wav',
    kill: './assets/audio/kill.wav',
    background: './assets/audio/background.mp3',
    gameover: './assets/audio/gameover.mp3',
    tada: './assets/audio/tada.mp3',
}

for (var key in images) {
    images[key] = await LoadImage(images[key]);
} // preload images

for (var key in sounds) {
    sounds[key] = await LoadAudio(sounds[key]);
} // preload sounds

sounds.background.loop = true;
sounds.background.volume = 0.4;
sounds.background.play();

const world = new World({
    G: { x: 0, y: .7 },
    hasLimits: true,
    pattern: 'image',
    background: {
        image: images.skynight,
    },
    // pattern: 'color',
    // background: 'black',
    border: {
        pattern: 'color',
        background: 'transparent',
        width: 1
    },
    responsive: true,
    createWorld: true,
    border: {
        width: 1,
        pattern: 'color',
        background: 'transparent',

    }
});

const player = new Shape({
    type: 'rectangle',
    pattern: 'image',
    background: {
        image: images.regularL,
    },
    x: world.width / 2,
    y: world.height / 2,
    width: 24,
    height: 32,
    friction: 0.99,
    rebound: 0.0000001,
    physics: true,
    speed: 4.5,
    rotation: 0,
});

world.center(player);

var generatedObjects = world.generateMap([
    "####################################",
    "#                                  #",
    "#                                  #",
    "#@            !                    #",
    "#########################   ########",
    "#                                  #",
    "#                                  #",
    "#                         !        #",
    "########   #########################",
    "#                                  #",
    "#                                  #",
    "#        !                         #",
    "#########################   ########",
    "#+                                 #",
    "#+                                 #",
    "#+                        !        #",
    "####################################",
], {
    '#': e => {
        new Shape({
            type: 'rectangle',
            pattern: 'image',
            background: {
                image: images.ground,
            },
            x: e.x,
            y: e.y,
            width: e.width,
            height: e.height,
            physics: false,
            isBody: true,
            tag: 'brick',
            zIndex: 999
        });
    },
    '@': e => {
        player.x = e.x;
        player.y = e.y;
    },
    '!': e => {
        return new Shape({
            type: 'rectangle',
            pattern: 'image',
            background: {
                image: images.ai1,
            },
            x: e.x,
            y: e.y,
            width: 32,
            height: 32,
            physics: true,
            isBody: true,
            tag: 'enemy',
            speed: 0.35,
        }).result();
    },
    '+': e => {
        return new Shape({
            type: 'rectangle',
            pattern: 'image',
            background: {
                image: images.finish,
            },
            x: e.x,
            y: e.y,
            width: e.width,
            height: e.height,
            physics: false,
            isBody: true,
            tag: 'finish',
            zIndex: 999
        }).result();
    }
});

var ais = generatedObjects['!'];
var target = generatedObjects['+'];

target.forEach(t => {
    t.onCollision = (e) => {
        if (e === player) {
            world.destroy();
            Object.keys(sounds).forEach(key => sounds[key].pause());
            sounds.tada.play();
            alert('You Win!');
            location.reload();
        }
    }

    new Animation(t, 1000, images.finish, images.finish2);
});

var lastDirection = 'right';

var isGameOver = false;

var score = 0;

function gameOver() {
    world.pause();
    // pause all sounds
    allowedToJump = false;
    Object.keys(sounds).forEach(key => sounds[key].pause());
    sounds.gameover.play();
    setTimeout(() => {
        world.resume();
        player.jump(10);
        player.isBody = false;
        stopAnimations(movingRAnimation, movingLAnimation);
        player.background.image = lastDirection === 'right' ? images.jumpR : images.jumpL;
        isGameOver = true;
    }, 1000);
}

const movingRAnimation = new Animation(player, 80, images.moving1R, images.moving2R, images.moving3R);
const movingLAnimation = new Animation(player, 80, images.moving1L, images.moving2L, images.moving3L);

ais.forEach(ai => {
    new Animation(ai, 200, images.ai1, images.ai2);
    ai.onCollision = async who => {
        if (who === player) {

            // if player is in the top of the ai
            if (player.y < ai.y) {
                ai.background.image = images.aidead;
                sounds.kill.play();
                ai.isBody = false;
                ai.jump(10);
                new Animation(ai, 30, images.ai1, images.ai2blue);
                score++;
            } else {
                gameOver();
            }
        }
    }
    ai.deltaX = 0;
    ai.movingDirection = 'right';
});

const MAX_MOVING_X = 25;

movingLAnimation.start();

const stopAnimations = (...e) => e.forEach(e => e.stop());

var allowedToJump = true;

function isTouchingBrick(object) {
    var res = false;
    var bricks = world.getElementsByTagName('brick');
    bricks.forEach(brick => {
        // using System.Math;
        if (Math.abs(object.x - brick.x) < object.width / 2 + brick.width / 2 && Math.abs(object.y - brick.y) < object.height / 2 + brick.height / 2) {
            res = true;
        }
    });
    return res;
}

const invertDirection = d => d === 'right' ? 'left' : 'right';

function main() {

    if (player.isOutOfMap()) {
        if (!gameOver) {
            world.center(player);
        } else {
            player.remove();
            world.destroy();
            alert('Game Over!');
            location.reload();
        }
    }

    var imr = world.key.isPressed('ArrowRight');
    var iml = world.key.isPressed('ArrowLeft');
    var imu = world.key.isPressed('ArrowUp');
    var imd = world.key.isPressed('ArrowDown');
    var imj = world.key.isPressed(' ');

    if (!isGameOver) {
        if (iml) {
            movingRAnimation.stop();

            movingLAnimation.start();
            player.move('left');
            lastDirection = 'left';
        }

        if (imr) {
            movingLAnimation.stop();
            movingRAnimation.start();

            player.move('right');
            lastDirection = 'right';
        }

        if (imu || imj) {
            if (allowedToJump) {
                stopAnimations(movingRAnimation, movingLAnimation);
                sounds.jump.play();
                player.jump(10);
                allowedToJump = false;
            }
        }


        if (!iml && !imr) {
            stopAnimations(movingRAnimation, movingLAnimation);
            player.background.image = lastDirection === 'left' ? images.regularL : images.regularR;
        }

        if (isTouchingBrick(player)) {
            allowedToJump = true;
        } else {
            stopAnimations(movingRAnimation, movingLAnimation);
            player.background.image = lastDirection === 'left' ? images.jumpL : images.jumpR;
        }
    }


    ais.forEach(ai => {
        if (ai.deltaX > MAX_MOVING_X || ai.deltaX < - MAX_MOVING_X) {
            ai.movingDirection = invertDirection(ai.movingDirection);
        }

        ai.move(ai.movingDirection);
        ai.deltaX += ai.movingDirection === 'right' ? ai.speed : - ai.speed;

    });

    world.update();
    Text({
        text: 'Score: ' + score,
        x: 5,
        y: world.height - 25,
        background: 'white',
        type: 'fill',
        size: '30px',
    });
}

// setInterval(() => player.rotate(1), 10);

const FPS = 60;
setInterval(main, 1000 / FPS);

