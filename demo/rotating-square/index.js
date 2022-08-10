import { World, Shape } from 'https://gitcdn.link/cdn/rhpo/life.js/main/src/life.min.js?'

// Rotating Centered Square...
const world = new World();
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
setInterval(Main, 1000 / FPS);
