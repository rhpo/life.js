import { World, Shape, GameLoop } from 'https://min.gitcdn.link/cdn/rhpo/life.js/main/src/life.min.js'

// Rotating Centered Square...
const world = new World();

// Make the Square shape instance...
const square = new Shape({
    type: 'rectangle',
    width: 80,
    height: 80,
    pattern: 'color',
    background: 'cyan',
    physics: false,
    rotation: 0,
});

const FPS = 60;
function Main() {
    world.update();    // • Update The World on each Frame.
    square.rotate(0.5); //  • Rotate the Square.

    world.center(square) // • Make the square centered in the Screen.
}

const game = new GameLoop(Main, FPS);
game.start();
