const result = document.querySelector("iframe");

const setResult = (e) => {
  result.src = "data:text/html;charset=utf-8," + escape(e);
};

// Monaco loader
require.config({
  paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor/min/vs" },
});

window.MonacoEnvironment = {
  getWorkerUrl: function (workerId, label) {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
         self.MonacoEnvironment = {
           baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor/min/'
         };
         importScripts('https://cdn.jsdelivr.net/npm/monaco-editor/min/vs/base/worker/workerMain.js');`)}`;
  },
};

const LIFEJS_D_TS = `
/*!


   *                *
   **               ***
   ****             ***
   *****            ***
   *******          ***
   *********        ***
   **********       ***
   ************     ***
   *************.   ***
   ***************  ***


 * LifeJS Game Engine v1.1.0
 * https://github.com/rhpo/life.js
 *
 * Author: Ramy Hadid
 *
 * Copyright (C) 2022 LifeJS. All rights reserved.
 * Released under the MIT license
 * Licence: Copyright 2022 ODromo.
 *
 * Permission is hereby granted, free of charge, to any  person  obtaining  a  copy  of  this  software
 * and associated documentation files (the "Software"), to deal in  the  Software  without  restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:

 * The above copyright notice and this permission  notice shall be included in all copies or substantial
 * portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT  NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES  OR  OTHER  LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR  IN  CONNECTION  WITH  THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Date: Mon Sep 05 2022 17:59:03 GMT+0100 (GMT+02:00)
 *
 * #free_palestine  🇵🇸
 * #free_ukraine    🇺🇦
 *
 * ﷽
*/
export declare const id: () => string, randName: () => string, defined: (e: any) => boolean, deg: number;
export declare const Shapes: {
    Circle: string;
    Square: string;
    Rectangle: string;
    Rect: string;
    Line: string;
    Dot: string;
};
export declare const PreSuffixedRange: (pref: string | undefined, suf: string | undefined, start: number | undefined, end: any) => {};
export declare const Patterns: {
    Image: string;
    Color: string;
    SolidColor: string;
    Gradient: string;
};
export declare const Events: {
    MouseDown: string;
    MouseUp: string;
    MouseMove: string;
    MouseEnter: string;
    MouseLeave: string;
    Hover: string;
    UnHover: string;
    Click: string;
    DoubleClick: string;
};
export declare const Cursors: {
    Default: string;
    Pointer: string;
    Crosshair: string;
    Move: string;
    Text: string;
    Wait: string;
    Help: string;
    Progress: string;
    NotAllowed: string;
    NoDrop: string;
    Grab: string;
    Grabbing: string;
    AllScroll: string;
    ZoomIn: string;
    ZoomOut: string;
    Cell: string;
    ContextMenu: string;
    Alias: string;
    Copy: string;
    ColResize: string;
    RowResize: string;
    None: string;
    EResize: string;
    NResize: string;
    NeResize: string;
    NwResize: string;
    SResize: string;
    SeResize: string;
    SwResize: string;
    WResize: string;
    EwResize: string;
    NsResize: string;
    NeswResize: string;
    NwseResize: string;
};
export declare class GameLoop {
    /**
     * @param {Function} mainFunc The Main Function of the Game Loop
     * @param {Number} fps The FPS of the Game Loop
     */
    constructor(mainFunc: any, fps?: number);
    start(): void;
    pause(): void;
    setFPS(fps: any): void;
    setCallback(callback: any): void;
    setMainFunction(mainFunc: any): void;
}
/**
 * @class World
 * @description The World is the main object of the Life.js library. It is the container for all the objects in the game.
 * @param {Object} options The options for the World
 *
 * @property {Function} on The on function for the World
 * @property {Function} removeListener The removeListener function for the World
 * @property {Function} emit The emit function for the World
 * @property {Function} once The once function for the World
 */
export declare class World {
    constructor(props?: {
        canvas: null;
        doc: Document;
        G: {
            x: number;
            y: number;
        };
        pattern: string;
        background: string;
        size: {
            width: number;
            height: number;
        };
        hasLimits: boolean;
        tag: string;
        border: {
            width: number;
            background: string;
            pattern: string;
        };
        sprites: {};
        onmousemove: null;
        onclick: null;
        onmouseup: null;
        rotation: number;
        paused: boolean;
        createWorld: boolean;
        allowContextMenu: boolean;
        cursor: string;
    });
    /**
     * @type {Function} on
     * @description Adds an event listener to the world.
     * @param {String} event - The event to listen for.
     * @param {Function} callback - The callback to execute when the event is fired.
     */
    on: any;
    /**
     * @type {Function} emit
     * @description Emits an event to the world.
     * @param {String} event - The event to emit.
     * @param {Object} [data] - The data to pass to the event.
     */
    emit: any;
    /**
     * @type {Function} addEventListener
     * @description Adds an event listener to the world.
     * @param {String} event - The event to listen for.
     * @param {Function} callback - The callback to execute when the event is fired.
     */
    addEventListener: any;
    /**
     * @type {Function} removeEventListener
     * @description Removes an event listener from the world.
     * @param {String} event - The event to listen for.
     */
    removeEventListener: any;
    /**
     * @type {Function} removeListener
     * @description Removes an event listener from the world.
     * @param {String} event - The event to listen for.
     */
    removeListener: any;
    key: {
        isPressed: (k: any) => any;
    };
    destroy(): void;
    register(object: any): void;
    unregister(object: any): void;
    setCursor(cursor: any): void;
    /**
     * @param {Shape} ob Object
     * @param {bool} disaVel Reset Velocity
     */
    center(ob: any, disaVel?: boolean): void;
    /**
     * @param {Shape} ob Object
     * @param {bool} disaVel Reset Velocity
     */
    centerX(ob: any, disaVel?: boolean): void;
    /**
     * @param {Shape} ob Object
     * @param {bool} disaVel Reset Velocity
     */
    centerY(ob: any, disaVel?: boolean): void;
    getAngleBetween(a: any, b: any): number;
    draw(props?: {
        type: string;
        background: string;
        pattern: string;
        radius: number;
        width: number;
        height: number;
        x: number;
        y: number;
        rotation: number;
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }): void;
    collision(a: any, b: any): any;
    isTouchingLimits(object: any): boolean;
    getAllElements(): any;
    getElementsByTagName(tag: any): any;
    getElementByName(name: any): any;
    getElementByTagName(tag: any): any;
    getElementsByName(name: any): any;
    getElementsByType(type: any): any;
    preventCollision(a: any, b: any): void;
    update(optionalPrefixCallback?: null, optionalSuffixCallback?: null): void;
    /**
     * The function pauses the game.
     */
    pause(): void;
    /**
     * The function resume() sets the paused variable to false.
     */
    resume(): void;
    /**
     * It returns an object with the x and y coordinates of the mouse cursor.
     * @returns An object with two properties, x and y.
     */
    getCursorPosition(): {
        x: any;
        y: any;
    };
    /**
     *
     * @param {Array<string>} map Map grid as an array of strings.
     * @param {Object} mapRef What should be placed in each character.
     * @returns {Array<Shape>} The generated Objects Array.
     */
    generateMap(map: any, mapRef: any): {};
    /**
     * Return all objects in the world that are under the mouse.
     * @returns The objects that are being hovered over.
     */
    HoveredObjects(): any;
    /**
     * Return all objects that are not hovered over by the mouse.
     * @returns The objects that are not being hovered over.
     */
    UnhoveredObjects(): any;
    /**
     * THIS IS BETA || UNDER CONSTRUCTION ! PLEASE DO NOT USE IT
     * @param {*} exceptObject
     */
    getEmptySpace(exceptObject: any): void;
    oncePressed(key: any, callback: any): void;
}
export declare class Shape {
    /**
     * @param {Object} props The Shape properties.
     * @param {Boolean} isTemplate If the shape is a template.
     * @returns {Shape} The Shape object.
     */
    constructor(props?: {
        type: string;
        x: number;
        y: number;
        width: number;
        height: number;
        zIndex: number;
        isBody: boolean;
        pattern: string;
        background: string;
        name: string;
        rotation: number;
        tag: string;
        onCollision: () => void;
        onFinishCollision: () => void;
        physics: boolean;
        rebound: number;
        friction: number;
        id: string;
        speed: number;
        velocity: {
            x: number;
            y: number;
        };
        border: {
            background: string;
            width: number;
        };
        animate: boolean;
        flip: never[];
        opacity: number;
        hovered: boolean;
        clicked: boolean;
        noCollisionWith: never[];
        lineCoordinates: {
            x1: number;
            y1: number;
            x2: number;
            y2: number;
        };
        scale: number;
    }, isTemplate?: boolean);
    /**
     * @type {Function} on
     * @description Adds an event listener to the world.
     * @param {String} event - The event to listen for.
     * @param {Function} callback - The callback to execute when the event is fired.
     */
    on: any;
    /**
     * @type {Function} emit
     * @description Emits an event to the world.
     * @param {String} event - The event to emit.
     * @param {Object} [data] - The data to pass to the event.
     */
    emit: any;
    /**
     * @type {Function} addEventListener
     * @description Adds an event listener to the world.
     * @param {String} event - The event to listen for.
     * @param {Function} callback - The callback to execute when the event is fired.
     */
    addEventListener: any;
    /**
     * @type {Function} removeEventListener
     * @description Removes an event listener from the world.
     * @param {String} event - The event to listen for.
     */
    removeEventListener: any;
    /**
     * @type {Function} removeListener
     * @description Removes an event listener from the world.
     * @param {String} event - The event to listen for.
     */
    removeListener: any;
    collideWith(object: any): void;
    /**
     * If the object's id matches the id of the object in the array, remove it from the array.
     * @param object - The object that the player is colliding with.
     */
    finishCollideWith(object: any): void;
    /**
     * This function sets the velocity of the player to the x and y values passed in as parameters.
     * @param x - The x-coordinate of the velocity vector.
     * @param y - The y coordinate of the ball
     */
    setVelocity(x: any, y: any): void;
    /**
     * It rotates the object by the angle specified.
     * @param angle - The angle to rotate the object by.
     */
    rotate(angle: any): void;
    /**
     * This function sets the rotation of the object to the angle passed in.
     * @param angle - The angle to rotate the object to.
     */
    setRotation(angle: any): void;
    draw(): void;
    /**
     * The remove() function removes the object from the world.
     */
    remove(): void;
    /**
     * Use case: World.generateMap parameter
     * @returns The object itself.
     */
    result(): this;
    /**
     * "If the x or y value of the object is less than 0 or greater than the width or height of the world,
     * return true."
     *
     * The function isOutOfMap() is called in the update() function of the object
     * @returns The return statement is returning a boolean value.
     */
    isOutOfMap(): boolean;
    /**
     * "If the x or y value of the current point is less than the start of the range or greater than the
     * end of the range, then the point is out of range."
     *
     * The function isOutOfRange() takes a range object as an argument. The range object has a start and
     * end property. The function returns true if the x or y value of the current point is less than the
     * start of the range or greater than the end of the range.
     *
     * The function isOutOfRange() is called in the following code:
     *
     *
     * Example:
     
     *     if (point.isOutOfRange(range)) {
     *         console.log("Point is out of range");
     *     }
     * @param range - { start: 0, end: 100 }
     * @returns The return value is a boolean.
     */
    isOutOfRange(range: any): boolean;
    /**
     * It returns the value of the property of the object that is passed as the argument.
     * @param p - The property name to get.
     * @returns The value of the property.
     */
    get(p: any): any;
    /**
     * Set(p, v) {
     *         this[p] = v;
     *         return this;
     *     }
     * @param p - The property name
     * @param v - the value to set the property to
     * @returns The object itself.
     */
    set(p: any, v: any): this;
    /**
     * It takes an object and sets the properties of the object it's called on to the properties of the
     * object passed in.
     * @param props - An object containing the properties to set.
     * @returns The object itself.
     */
    setProps(props: any): this;
    /**
     * It moves the object in the direction specified by the first argument, and if the second argument
     * is not null, it uses that as the speed, otherwise it uses the object's speed.
     *
     * @param direction - The direction you want the object to move in.
     * @param [optionalSpeed=null] - The speed you want the object to move at. If you don't specify
     * this, it will use the object's speed.
     * @param [noMatterCollision=false] - If true, the object will move even if it collides with
     * another object.
     */
    move(direction: any, optionalSpeed?: null, noMatterCollision?: boolean): void;
    /**
     * It moves the object in the direction of the angle, and prevents it from colliding with other
     * objects
     * @param angle - The angle in degrees to move the object.
     * @param [optionalSpeed=null] - The speed at which the object will move. If not defined, the
     * object will move at its default speed.
     * @param [noMatterCollision=false] - If true, the object will move even if it collides with
     * another object.
     */
    moveTheta(angle: any, optionalSpeed?: null, noMatterCollision?: boolean): void;
    /**
     * This function makes the object follow the target object.
     * @param target - The object that the enemy will follow.
     */
    follow(target: any): void;
    /**
     * "This function takes a callback function as an argument and assigns it to the onCollision property
     * of the object it is called on."
     *
     * The function is called on an object, and it takes a callback function as an argument. The callback
     * function is assigned to the onCollision property of the object.
     *
     * The function returns the object it was called on.
     * @param callback - The function to call when a collision occurs.
     * @returns The object itself.
     */
    onCollide(callback: any): this;
    /**
     * If the distance between the center of the two objects is less than the sum of their radii, then
     * they are colliding.
     * @param target - The target object to check collision against.
     * @returns The return value is a boolean value.
     */
    isCollidingWith(target: any): any;
    /**
     * "If the id of the object in the array is the same as the id of the target object, then return
     * true."
     *
     * The function is called in the following way:
     * @param target - The object you want to check if it's in the collisionObjects array.
     * @returns a boolean value.
     */
    CCHas(target: any): boolean;
    /**
     * The jump function takes in a parameter called howHigh and sets the y velocity to the negative of
     * howHigh.
     * @param howHigh - How high the player should jump.
     */
    jump(howHigh: any): void;
}
export declare class Animation {
    #private;
    constructor(target: any, speed?: number, loop?: boolean, ...frames: any[]);
    start(): this;
    stop(): this;
    onFinish(callback: any): this;
}
/**
 * For each key in the object, call the pause() method on the value.
 * @param so - the sound object
 */
export declare const stopAllSounds: (so: any) => void;
/**
 * It draws text on the canvas
 * @param [p] - The parameters of the text.
 */
export declare function Text(p?: {
    text: string;
    background: string;
    font: string;
    size: string;
    x: number;
    y: number;
    fromEnd: boolean;
    type: string;
    zIndex: number;
}): void;
/**
 * @param {string} src Source of the Image
 * @returns Image
 */
export declare function LoadImage(src: any): Promise<unknown>;
/**
 * @param {string} src Audio source
 * @returns Audio
 */
export declare function LoadAudio(src: any): Promise<unknown>;
/**
 * @param {object} spriteObj Sprites Object
 * @returns Promise
 *
 * !: THIS IS BETA
 */
export declare function spritesBETA(spriteObj: any): Promise<unknown>;
`

const template = `
// Hello Life.JS!

const world = new World({
    G: {
        x: 0,
        y: 1,
    },
    background: 'black',
    hasLimits: true,
    responsive: true,
});

const square = new Shape({
  type: Shapes.Square,

  background: 'blue',

  width: 50,
  height: 50,

  physics: false,

  speed: 10
});

world.center(square);

const game = new GameLoop(() => {
  world.update(() => {
      Text({
        text: 'Use arrow keys to move!',
        x: 10,
        y: 10,
        fromEnd: true,
        font: 'Inter, sans-serif'
      });
  });

  if (world.key.isPressed('ArrowLeft')) {
    square.move('left');
  }
  if (world.key.isPressed('ArrowRight')) {
    square.move('right');
  }
  if (world.key.isPressed('ArrowUp')) {
    square.move('up');
  }
  if (world.key.isPressed('ArrowDown')) {
    square.move('down');
  }

  square.rotate(1)
}, 120);

game.start();
`.substring(1);

// Monaco init
require(["vs/editor/editor.main"], function () {
  createEditor(document.querySelector(".code"));
});

function createEditor(editorContainer) {
  
  var libUri = 'ts:filename/lifejs.d.ts';
  
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false
  });

  // compiler options
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES6,
    allowNonTsExtensions: true
  });
  
  monaco.languages.typescript.javascriptDefaults.addExtraLib(LIFEJS_D_TS, libUri);
  
  monaco.editor.createModel(LIFEJS_D_TS, 'typescript', monaco.Uri.parse(libUri));
  
  let editor = monaco.editor.create(editorContainer, {
    value: template,
    language: "javascript",
    theme: "dark",
    minimap: { enabled: false },
    automaticLayout: true,
    contextmenu: false,
    fontSize: 12,
    scrollbar: {
      useShadows: false,
      vertical: "visible",
      horizontal: "visible",
      horizontalScrollbarSize: 12,
      verticalScrollbarSize: 12,
    },
    theme: "vs-dark",
  });

  editor.onDidChangeModelContent(() => {
    setResult(`
    <!DOCTYPE html>
    <body>
      <style>
        html,
        body {
            margin: 0;
            padding: 0;
            height: 100%;
        }

        body {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        * {
            box-sizing: border-box;
        }
      </style>
      <script type="module">
        import { Animation, World, Shape, PreSuffixedRange, Shapes, Patterns, Events, Cursors, GameLoop, LoadImage, LoadAudio, Text } from 'https://gitcdn.link/cdn/rhpo/life.js/main/src/life.min.js';
        ${editor.getValue()}
      </script>
    </body>
`);
  });
}

setResult(`
    <!DOCTYPE html>
    <body>
      <style>
        html,
        body {
            margin: 0;
            padding: 0;
            height: 100%;
        }

        body {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        * {
            box-sizing: border-box;
        }
      </style>
      <script type="module">
        import { World, Text, Animation, Shape, PreSuffixedRange, Shapes, Patterns, Events, Cursors, GameLoop, LoadImage, LoadAudio } from 'https://gitcdn.link/cdn/rhpo/life.js/main/src/life.min.js';
        ${template}
      </script>
    </body>
`);

document.querySelector("nav").onclick = () =>
  (location.href = "https://github.com/rhpo/life.js");
