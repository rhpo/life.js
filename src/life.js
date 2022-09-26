/*!
 * LifeJS Game Engine v1.0.7
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

export const id = () => Math.random().toString(36).substring(2, 9),
  getRandomName = () => {
    const namelist =
      "James/Robert/John/Michael/David/William/Richard/Thomas/Charles/Islam/Mohammed/Ramy";
    let names = namelist.split("/");
    return names[Math.floor(Math.random() * names.length)];
  },
  defined = (e) => e !== undefined && e !== null,
  deg = Math.PI / 180;

export const Shapes = {
  Circle: "circle",
  Square: "rectangle",
  Rectangle: "rectangle",
  Rect: "rectangle",
  Line: "line",
  Dot: "dot",
};

export const PreSufixedRange = (pref = "", suf = "", start = 0, end) => {
  let obj = {};
  for (let i = start; i <= end; i++) {
    obj[i] = pref + i + suf;
  }
  return obj;
};

export const Patterns = {
  Image: "image",
  Color: "color",
  SolidColor: "color",
  Gradient: "gradient",
};

export const Events = {
  MouseDown: "mousedown",
  MouseUp: "mouseup",
  MouseMove: "mousemove",
  MouseEnter: "mouseenter",
  MouseLeave: "mouseleave",
  Hover: "hover",
  UnHover: "unhover",
  Click: "click",
  DoubleClick: "dblclick",
};

export const Cursors = {
  Default: "default",
  Pointer: "pointer",
  Crosshair: "crosshair",
  Move: "move",
  Text: "text",
  Wait: "wait",
  Help: "help",
  Progress: "progress",
  NotAllowed: "not-allowed",
  NoDrop: "no-drop",
  Grab: "grab",
  Grabbing: "grabbing",
  AllScroll: "all-scroll",
  ZoomIn: "zoom-in",
  ZoomOut: "zoom-out",
  Cell: "cell",
  ContextMenu: "context-menu",
  Alias: "alias",
  Copy: "copy",
  ColResize: "col-resize",
  RowResize: "row-resize",
  NoDrop: "no-drop",
  None: "none",
  EResize: "e-resize",
  NResize: "n-resize",
  NeResize: "ne-resize",
  NwResize: "nw-resize",
  SResize: "s-resize",
  SeResize: "se-resize",
  SwResize: "sw-resize",
  WResize: "w-resize",
  EwResize: "ew-resize",
  NsResize: "ns-resize",
  NeswResize: "nesw-resize",
  NwseResize: "nwse-resize",
};

export class GameLoop {
  /**
   * @param {Function} mainFunc The Main Function of the Game Loop
   * @param {Number} fps The FPS of the Game Loop
   */
  constructor(mainFunc, fps = 60) {
    var delay = 1000 / fps,
      time = null,
      frame = -1,
      tref;
    var callback = mainFunc;

    function loop(timestamp) {
      if (time === null) time = timestamp;
      var seg = Math.floor((timestamp - time) / delay);
      if (seg > frame) {
        frame = seg;
        callback({
          time: timestamp,
          frame: frame,
        });
      }
      tref = requestAnimationFrame(loop);
    }

    this.isPlaying = false;

    this.frameRate = function (newfps) {
      if (!arguments.length) return fps;
      fps = newfps;
      delay = 1000 / fps;
      frame = -1;
      time = null;
    };

    this.start = function () {
      if (!this.isPlaying) {
        this.isPlaying = true;
        tref = requestAnimationFrame(loop);
      }
    };

    this.pause = function () {
      if (this.isPlaying) {
        cancelAnimationFrame(tref);
        this.isPlaying = false;
        time = null;
        frame = -1;
      }
    };

    gameLoops.push(this);
  }

  start() {
    this.start();
  }

  pause() {
    this.pause();
  }

  setFPS(fps) {
    this.frameRate(fps);
  }

  setCallback(callback) {
    this.callback = callback;
  }

  setMainFunction(mainFunc) {
    this.mainFunc = mainFunc;
  }
}

/**
 * @type {World} world The World Object
 * @type {Array<GameLoop>} gameLoops The Game Loops
 */
let world = {};
let gameLoops = [];

const eventify = (self) => {
  self.events = {};

  self.on = self.addEventListener = function (event, listener) {
    if (typeof self.events[event] !== "object") {
      self.events[event] = [];
    }

    self.events[event].push(listener);
  };

  self.removeListener = self.removeEventListener = function (event, listener) {
    let idx;

    if (typeof self.events[event] === "object") {
      idx = self.events[event].indexOf(listener);

      if (idx > -1) {
        self.events[event].splice(idx, 1);
      }
    }
  };

  self.emit = function (event) {
    var i,
      listeners,
      length,
      args = [].slice.call(arguments, 1);

    if (typeof self.events[event] === "object") {
      listeners = self.events[event].slice();
      length = listeners.length;

      for (i = 0; i < length; i++) {
        listeners[i].apply(self, args);
      }
    }
  };

  self.once = function (event, listener) {
    self.on(event, function g() {
      self.removeListener(event, g);
      listener.apply(self, arguments);
    });
  };
};

Array.prototype.replace = function (old, newVal) {
  let idx = this.indexOf(old);
  if (idx > -1) {
    this[idx] = newVal;
  }
};

// START OF THE LIFE.JS LIBRARY ---

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
export class World {
  constructor(
    props = {
      canvas: null,
      doc: document,
      G: { x: 0, y: 0.001 },
      pattern: "color",
      background: "#000",
      size: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      hasLimits: true,
      tag: "map",
      border: { width: 1, background: "#000", pattern: "color" },
      sprites: {},
      onmousemove: null,
      onclick: null,
      onmouseup: null,
      rotation: 0,
      paused: false,
      createWorld: true,
      allowContextMenu: false,
      cursor: "default",
    }
  ) {
    eventify(this);

    this.canvas = props.canvas || null;
    this.createWorld = defined(props.createWorld) ? props.createWorld : true;
    this.isTouchDevice = this.isMobile =
      "ontouchstart" in document.documentElement ||
      !!window.navigator.msMaxTouchPoints;
    this.allowContextMenu = defined(props.allowContextMenu)
      ? props.allowContextMenu
      : false;
    this.doc = props.doc || document;
    this.cursor = defined(props.cursor) ? props.cursor : "default";
    this.G = props.G || { x: 0, y: 0.001 };
    this.pattern = props.pattern || "color";
    this.background = props.background || "#000";
    this.color = props.color || "#fff";
    this.size = props.size || {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.hasLimits = defined(props.hasLimits) ? props.hasLimits : true;
    this.tag = props.tag || "map";
    this.border = props.border || {
      width: 0,
      background: "#000",
      pattern: "color",
    };
    this.sprites = this.sprites || {};

    this.G = props.G || { x: 0, y: 0.001 };
    this.Objects = [];
    this.keys = {};

    this.set = (k, v) => (this[k] = v);

    this.responsive = props.responsive !== undefined ? props.responsive : true;

    this.paused = props.paused !== undefined ? props.paused : false;

    this.rotation = props.rotation !== undefined ? props.rotation : 0;

    this.borderY = {
      type: "rectangle",
      pattern: this.border.pattern,
      background: this.border.background,
      width: this.border.width,
      height: this.size.height,
      x: 0,
      y: 0,
      tag: "border",
      border: this.border,
      name: "borderY",
    };
    this.borderX = {
      type: "rectangle",
      pattern: this.border.pattern,
      background: this.border.background,
      width: this.size.width,
      height: this.border.width,
      x: 0,
      y: 0,
      tag: "border",
      name: "borderX",
      border: this.border,
    };
    this.borderYW = {
      type: "rectangle",
      pattern: this.border.pattern,
      background: this.border.background,
      width: this.border.width,
      height: this.size.height,
      x: this.size.width - this.border.width,
      y: 0,
      tag: "border",
      border: this.border,
      name: "borderYW",
    };

    this.borderXW = {
      type: "rectangle",
      pattern: this.border.pattern,
      background: this.border.background,
      width: this.size.width,
      height: this.border.width,
      x: 0,
      y: this.size.height - this.border.width,
      tag: "border",
      name: "borderXW",
      border: this.border,
    };

    if (this.createWorld === true) {
      if (!this.canvas) {
        this.canvas = this.doc.createElement("canvas");
        this.canvas.width = this.size.width;
        this.canvas.height = this.size.height;
        this.doc.body.appendChild(this.canvas);
      }

      if (this.responsive) {
        var ta = () => {
          this.width = window.innerWidth;
          this.height = window.innerHeight;
          this.canvas.width = this.width;
          this.canvas.height = this.height;
        };
        window.addEventListener("resize", ta);
      }

      if (this.allowContextMenu === false) {
        this.canvas.oncontextmenu = (e) => e.preventDefault();
      }

      this.hasLimits === true &&
        [this.borderX, this.borderY, this.borderXW, this.borderYW].forEach(
          (o) => {
            this.register(new Shape({ ...o, name: o.name, physics: false }));
          }
        );

      this.onLoad = (c) => window.addEventListener("load", c);
      this.onLoad(() => {
        if ((this.hasLimits === this.responsive) === true) {
          window.addEventListener("resize", () => {
            this.getElementByName("borderY").setProps({
              width: world.width,
              height: this.border.width,
            });
            this.getElementByName("borderX").setProps({
              width: this.border.width,
              height: this.canvas.height,
            });
            this.getElementByName("borderYW").setProps({
              width: this.border.width,
              height: this.canvas.height,
              x: this.canvas.width - this.border.width,
            });
            this.getElementByName("borderXW").setProps({
              width: this.canvas.width,
              height: this.border.width,
              y: this.canvas.height - this.border.width,
            });
          });
        }
      });

      this.canvas.addEventListener("click", (e) => this.emit("click", e));
      this.doc.addEventListener("keydown", (e) => {
        this.keys[e.key] = true;
      });
      this.doc.addEventListener("keyup", (e) => {
        this.keys[e.key] = false;
      });

      this.tag = this.tag || "map";

      Object.keys(this.sprites).forEach((k, i) => {
        this.sprites[k] = {};
        this.sprites[k].image = new Image();
        this.sprites[k].image.src = this.sprites[k].src;
        this.sprites[k].image.decode().then(() => {
          this.sprites[k].width = this.sprites[k].image.width;
          this.sprites[k].height = this.sprites[k].image.height;
        });
      });

      this.mouse = {
        x: 0,
        y: 0,
        isLeftClicked: false,
        isRightClicked: false,
        isMiddleClicked: false,
      };

      this.canvas.addEventListener("mousemove", (e) => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
      });

      this.canvas.addEventListener("mousedown", (e) => {
        if (e.button === 0) {
          this.mouse.isLeftClicked = true;
        }
        if (e.button === 1) {
          this.mouse.isMiddleClicked = true;
        }
        if (e.button === 2) {
          this.mouse.isRightClicked = true;
        }
      });
      this.canvas.addEventListener("mouseup", (e) => {
        if (e.button === 0) {
          this.mouse.isLeftClicked = false;
        }
        if (e.button === 2) {
          this.mouse.isRightClicked = false;
        }
        if (e.button === 1) {
          this.mouse.isMiddleClicked = false;
        }
      });
      // outputs:
      // this.sprites = {
      //     'player': {
      //         src: 'https://i.imgur.com/XqQXQ.png',
      //         width: 32,
      //         height: 32,
      //         image: Image
      //     }

      this.mousedown = props.mousedown || (() => { });
      this.mouseup = props.mouseup || (() => { });
      this.mousemove = props.mousemove || (() => { });

      this.canvas.addEventListener("mousedown", (e) => this.mousedown(e));
      this.canvas.addEventListener("mouseup", (e) => this.mouseup(e));
      this.canvas.addEventListener("mousemove", (e) => this.mousemove(e));

      world = this;

      this.ctx = this.canvas.getContext("2d");
      this.width = this.canvas.width;
      this.height = this.canvas.height;

      this.emit("load");

      this.canvas.addEventListener("mousemove", (e) => {
        this.HoveredObjects().forEach((o) => {
          o.emit("mousemove", e);
          if (!o.hovered) {
            o.hovered = true;
            o.emit("hover", e);
            o.emit("mouseenter", e);
          }
        });
        this.UnhoveredObjects().forEach((o) => {
          o.emit("mousemove", e);
          if (o.hovered) {
            o.hovered = false;
            o.emit("unhover", e);
            o.emit("mouseleave", e);
          }
        });
      });

      this.canvas.addEventListener("mousedown", (e) => {
        let hoveredObjects = this.HoveredObjects();
        hoveredObjects.forEach((o) => {
          if (!o.clicked) {
            o.clicked = true;
            o.emit("mousedown", e);
          }
        });
      });

      this.canvas.addEventListener("mouseup", (e) => {
        this.HoveredObjects().forEach((o) => {
          o.emit("mouseup", e);
          o.emit("click", e);
          if (o.clicked) {
            o.clicked = false;
          }
        });
      });

      this.canvas.addEventListener("touchstart", (e) => {
        this.HoveredObjects().forEach((o) => {
          if (!o.clicked) {
            o.clicked = true;
            o.emit("touchstart", e);
          }
        });
        this.mouse.isLeftClicked = true;
      });

      this.canvas.addEventListener("touchend", (e) => {
        this.HoveredObjects().forEach((o) => {
          o.emit("touchend", e);
          o.emit("click", e);
          if (o.clicked) {
            o.clicked = false;
          }
        });
        this.emit("touchend", e);
        this.mouse.isLeftClicked = false;
      });

      this.canvas.addEventListener("touchmove", (e) => {
        this.HoveredObjects().forEach((o) => {
          o.emit("touchmove", e);
        });
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      });

      this.canvas.addEventListener("dblclick", (e) => {
        this.HoveredObjects().forEach((o) => {
          o.emit("dblclick", e);
        });
      });

      return this;
    }
  }

  /**
   * @type {Function} on
   * @description Adds an event listener to the world.
   * @param {String} event - The event to listen for.
   * @param {Function} callback - The callback to execute when the event is fired.
   */
  on;
  /**
   * @type {Function} emit
   * @description Emits an event to the world.
   * @param {String} event - The event to emit.
   * @param {Object} [data] - The data to pass to the event.
   */
  emit;
  /**
   * @type {Function} addEventListener
   * @description Adds an event listener to the world.
   * @param {String} event - The event to listen for.
   * @param {Function} callback - The callback to execute when the event is fired.
   */
  addEventListener;
  /**
   * @type {Function} removeEventListener
   * @description Removes an event listener from the world.
   * @param {String} event - The event to listen for.
   */
  removeEventListener;
  /**
   * @type {Function} removeListener
   * @description Removes an event listener from the world.
   * @param {String} event - The event to listen for.
   */
  removeListener;

  key = {
    isPressed: (k) => this.keys[k],
  };

  destroy() {
    this.canvas && this.canvas.remove();
    this.Objects = [];
    this && delete this;
    gameLoops.forEach((gl) => {
      gl.pause();
    });
  }

  register(object) {
    this.Objects.push(object);
  }

  unregister(object) {
    this.Objects.forEach(
      (o, i) => o.id === object.id && this.Objects.splice(i, 1)
    );
  }

  setCursor(cursor) {
    this.canvas.style.cursor = cursor;
    this.cursor = cursor;
  }

  center(ob, disaVel = false) {
    ob.x = this.canvas.width / 2;
    ob.y = this.canvas.height / 2;
    if (disaVel) {
      ob.velocity = {
        x: 0,
        y: 0,
      };
    }
  }

  centerX(ob, disaVel = false) {
    ob.x = this.canvas.width / 2;
    if (disaVel) {
      ob.velocity = {
        x: 0,
        y: 0,
      };
    }
  }

  centerY(ob, disaVel = false) {
    ob.y = this.canvas.height / 2;
    if (disaVel) {
      ob.velocity = {
        x: 0,
        y: 0,
      };
    }
  }

  getAngleBetween(a, b) {
    return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  }

  draw(
    props = {
      type: "rectangle",
      background: "#000",
      pattern: "color",
      radius: 50,
      width: 50,
      height: 50,
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      rotation: 0,
      x1: this.canvas.width / 2,
      y1: this.canvas.height / 2,
      x2: this.canvas.width / 2,
      y2: this.canvas.height / 2,
    }
  ) {
    props.type = props.type || "rectangle";
    props.background = props.background || "#000";
    props.pattern = props.pattern || "color";
    props.radius = props.radius || undefined;
    props.width = props.radius || props.width || 50;
    props.height = props.radius || props.height || 50;
    props.x = defined(props.x) ? props.x : this.canvas.width / 2;
    props.y = defined(props.y) ? props.y : this.canvas.height / 2;
    props.rotation = defined(props.rotation) ? props.rotation : 0;

    props.x1 = defined(props.x1) ? props.x1 : 0;
    props.y1 = defined(props.y1) ? props.y1 : 0;
    props.x2 = defined(props.x2) ? props.x2 : this.canvas.width / 2;
    props.y2 = defined(props.y2) ? props.y2 : this.canvas.height / 2;
    this.ctx.save();
    this.ctx.translate(props.x, props.y);
    this.ctx.rotate(props.rotation);

    switch (props.type) {
      case "rectangle":
        switch (props.pattern) {
          case "color":
            this.ctx.fillStyle = props.background;
            this.ctx.fillRect(props.x, props.y, props.width, props.height);
            break;
          case "image":
            this.ctx.drawImage(props.image, 0, 0, props.width, props.height);
            break;
        }
        break;
      case "circle":
        switch (props.pattern) {
          case "color":
            this.ctx.fillStyle = props.background;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, props.radius, 0, 2 * Math.PI);
            this.ctx.fill();
            break;
          case "image":
            // draw a circle image
            this.ctx.drawImage(
              props.image,
              -props.radius,
              -props.radius,
              props.radius * 2,
              props.radius * 2
            );
            break;
        }
        break;
      case "dot":
        switch (props.pattern) {
          case "color":
            this.ctx.fillStyle = props.background;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, props.radius, 0, 2 * Math.PI);
            this.ctx.fill();
            break;
          case "image":
            // draw a circle image
            this.ctx.drawImage(
              props.image,
              -props.radius,
              -props.radius,
              props.radius * 2,
              props.radius * 2
            );
            break;
        }
        break;
      case "line":
        this.ctx.strokeStyle = props.background;
        this.ctx.beginPath();
        this.ctx.moveTo(
          props.x1 - world.width / 2,
          props.y1 - world.height / 2
        );
        this.ctx.lineTo(
          props.x2 - world.width / 2,
          props.y2 - world.height / 2
        );
        this.ctx.stroke();
        break;
    }
    this.ctx.restore();
  }

  collision(a, b) {
    if (b instanceof Array) {
      return b.some((b) => this.collision(a, b));
    }
    if (a instanceof Array) {
      return a.some((a) => this.collision(a, b));
    }
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  isTouchingLimits(object) {
    return (
      object.x + object.width > 0 &&
      object.x < world.width &&
      object.y + object.height > 0 &&
      object.y < world.height
    );
  }

  getAllElements() {
    return this.Objects;
  }

  getElementsByTagName(tag) {
    return this.Objects.filter((o) => o.tag === tag);
  }

  getElementByName(name) {
    return this.Objects.find((o) => o.name === name);
  }

  getElementByTagName(tag) {
    return this.Objects.find((o) => o.tag === tag);
  }

  getElementsByName(name) {
    return this.Objects.filter((o) => o.name === name);
  }

  getElementsByType(type) {
    return this.Objects.filter((o) => o.type === type);
  }

  preventCollision(a, b) {
    if (typeof b === "object" && b instanceof Array)
      b.forEach((b) => a.isBody && b.isBody && this.preventCollision(a, b));
    else {
      if (
        a.id !== b.id &&
        !a.noCollisionWith.includes(b.tag) &&
        !b.noCollisionWith.includes(a.tag) &&
        this.collision(a, b)
      ) {
        if (a.tag !== "border" && b.tag !== "border") {
          if (!a.CCHas(b)) {
            a.onCollision(b, a);
            b.onCollision(a, b);
            a.emit("collision", b);
            b.emit("collision", a);
            a.collideWith(b);
            b.collideWith(a);
          }
        }

        switch (a.cacheDirection) {
          case "down":
            if (a.y + a.height > b.y) {
              a.y = b.y - a.height;
              a.velocity.x = a.velocity.x * a.friction;
            }
            break;
          case "up":
            if (a.y < b.y + b.height) {
              a.y = b.y + b.height;
              a.velocity.x = a.velocity.x * a.friction;
            }
            break;
          case "left":
            if (a.x < b.x + b.width) {
              a.x = b.x + b.width;
            }
            break;
          case "right":
            if (a.x + a.width > b.x) {
              a.x = b.x - a.width;
            }
            break;
        }

        if (a.physics) {
          switch (a.cacheDirection) {
            case "left":
            case "right":
              var foo = ~~(-a.velocity.x * a.rebound);
              a.velocity.x = foo;

              if (foo === 0) {
                // get which direction the object is moving
              }
              break;
            case "up":
            case "down":
              var foo = ~~(-a.velocity.y * a.rebound);
              a.velocity.y = foo;
              a.cacheDirection = a.velocity.y < 0 ? "down" : "up";
              if (foo === 0) {
                a.cacheDirection = "down";
              }
              break;
          }
        }
      }

      // Call a.onFinishCollision(b) when a is not touching b anymore
      else if (!this.collision(a, b) && b.CCHas(a)) {
        a.finishCollideWith(b);
        b.finishCollideWith(a);
        a.emit("finishcollision", b);
        b.emit("finishcollision", a);
        a.onFinishCollision(b, a);
        b.onFinishCollision(a, b);
      }
    }
  }

  update(optionalPrefixCallback = null) {
    if (!this.paused) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      if (!this.canvas.style.cursor !== this.cursor)
        this.canvas.style.cursor = this.cursor;

      switch (this.pattern) {
        case "color":
          this.draw({
            pattern: "color",
            background: this.background,
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
          });
          break;
        case "image":
          this.draw({
            pattern: "image",
            image: this.background.image,
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
          });
          break;
      }
      optionalPrefixCallback && optionalPrefixCallback();

      this.Objects = this.Objects.sort((a, b) => {
        // if a.tag is 'wall', place it at the top of the list,
        // else if b.tag is 'wall', place it at the bottom of the list
        // else if a.zIndex is higher, advance it by one
        // else if b.zIndex is higher, advance it by one

        if (a.tag === "wall") return -1;
        else if (b.tag === "wall") return 1;
        else return a.zIndex - b.zIndex;
      });
      // make the objects with 'wall' tag first on the array
      this.Objects.forEach((o) => {
        if (o.physics) {
          // if there is something under the object, do nothing
          if (
            this.getElementsByType("border").some((b) => this.collision(o, b))
          ) {
            o.velocity.y = 0;
            o.velocity.x = 0;
            switch (o.cacheDirection) {
              case "down":
                o.cacheDirection = "up";
                break;
              case "up":
                // o.cacheDirection = 'down';
                break;
              case "left":
                o.cacheDirection = "right";
                break;
              case "right":
                o.cacheDirection = "left";
                break;
            }
          } else {
            o.velocity.x += this.G.x;
            o.velocity.y += this.G.y;
          }
          o.x += o.velocity.x;
          o.y += o.velocity.y;

          o.cacheDirection = o.velocity.x < 0 ? "right" : "left";
          o.cacheDirection = o.velocity.y < 0 ? "up" : "down";
          world.preventCollision(o, world.Objects);
        }
        o.draw();
      });
    }
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  getCursorPosition() {
    return {
      x: this.mouse.x,
      y: this.mouse.y,
    };
  }

  /**
   *
   * @param {Array<string>} map Map grid as an array of strings.
   * @param {Object} mapRef What should be placed in each character.
   * @returns {Array<Shape>} The generated Objects Array.
   */
  generateMap(map, mapRef) {
    let res = {};
    map.forEach((line, y) => {
      line.split("").forEach((c, x) => {
        const len = line.length;
        mapRef[c] &&
          (() => {
            if (!res[c]) res[c] = [];
            res[c].push(
              mapRef[c]({
                mapWidth: world.width,
                mapHeight: world.height,
                x: x * (world.width / len),
                y: y * (world.height / map.length),
                width: world.width / len,
                height: world.height / map.length,
                Cindex: x,
                Lindex: y,
              })
            );
          })();
      });
    });
    return res;
  }

  HoveredObjects() {
    return world.Objects.filter((o) => {
      return (
        o.x < this.mouse.x &&
        o.x + o.width > this.mouse.x &&
        o.y < this.mouse.y &&
        o.y + o.height > this.mouse.y
      );
    });
  }

  UnhoveredObjects() {
    return world.Objects.filter((o) => {
      return (
        o.x > this.mouse.x ||
        o.x + o.width < this.mouse.x ||
        o.y > this.mouse.y ||
        o.y + o.height < this.mouse.y
      );
    });
  }

  getEmptySpace(exceptObject) {
    const emptySpaceRanges = [];
    let occupied = [];

    this.Objects.forEach((o) => {
      if (o.tag !== "border" && o.tag !== "emptySpace" && o.tag !== "player") {
        occupied.push({
          x: o.x,
          y: o.y,
          width: o.width,
          height: o.height,
        });
      }
    });

    if (exceptObject) {
      occupied.forEach((o) => {
        if (o.x === exceptObject.x && o.y === exceptObject.y) {
          occupied.splice(occupied.indexOf(o), 1);
        }
      });
    }

    occupied.forEach((o) => {
      const x = o.x;
      const y = o.y;
      const width = o.width;
      const height = o.height;

      const left = x;
      const right = x + width;
      const up = y;
      const down = y + height;

      const leftRange = {
        start: left,
        end: right,
      };
      const rightRange = {
        start: left,
        end: right,
      };
      const upRange = {
        start: up,
        end: down,
      };
      const downRange = {
        start: up,
        end: down,
      };

      emptySpaceRanges.push(leftRange);
      emptySpaceRanges.push(rightRange);
      emptySpaceRanges.push(upRange);
      emptySpaceRanges.push(downRange);
    });

    emptySpaceRanges.sort((a, b) => a.start - b.start);

    // this will return: [{ start: 0, end: 100 }, { start: 200, end: 300 }]
  }

  oncePressed(key, callback) {
    window.addEventListener("keyup", (e) => key === e.key && callback());
  }
}

export class Shape {
  /**
   * @param {Object} props The Shape properties.
   * @param {Boolean} isTemplate If the shape is a template.
   * @returns {Shape} The Shape object.
   */
  constructor(
    props = {
      type: "rectangle",
      x: 0,
      y: 0,
      width: 10,
      height: 10,
      zIndex: 0,
      isBody: true,
      pattern: "color",
      background: "",
      name: "Example",
      rotation: 0,
      name: getRandomName(),
      tag: "unknown",
      onCollision: () => { },
      onFinishCollision: () => { },
      physics: true,
      rebound: 0.9,
      friction: 0.5,
      id: id(),
      speed: 3,
      velocity: { x: 0, y: 0 },
      border: {
        background: "blue",
        width: 2,
      },
      animate: true,
      flip: [],
      opacity: 1,
      hovered: false,
      clicked: false,
      noCollisionWith: [],
      lineCoordinates: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      },
    },
    isTemplate = false
  ) {
    if (!world) throw new Error("BrainError: No world is initialized!");

    eventify(this);

    this.type = props.type || "rectangle";
    this.zIndex = defined(props.zIndex) ? props.zIndex : 0;
    this.flip = defined(props.flip)
      ? props.flip
      : {
        x: false,
        y: false,
      };

    this.opacity = defined(props.opacity) ? props.opacity : 1;
    this.hovered = false;
    this.clicked = false;
    this.background = props.color || "black";
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.noCollisionWith = defined(props.noCollisionWith)
      ? typeof props.noCollisionWith === "string"
        ? [props.noCollisionWith]
        : props.noCollisionWith
      : [];
    this.radius = props.radius;
    if (defined(this.radius)) {
      this.width = this.radius;
      this.height = this.radius;
    } else {
      this.width = props.width || 10;
      this.height = props.height || 10;
    }
    this.isBody = defined(props.isBody) ? props.isBody : true;
    this.animate = defined(props.animate) ? props.animate : true;
    this.pattern = props.pattern || "color";
    this.background = props.background || "";
    this.rotation = props.rotation || 0;
    this.name = defined(props.name) ? props.name : getRandomName();
    this.lineCoordinates = props.lineCoordinates || {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    };
    this.tag = props.tag || "unknown";
    this.onCollision =
      props.onCollision ||
      /* ((a, b) => console.log('Collided with:', b.name)); */ (() => { });
    this.onFinishCollision =
      props.onFinishCollision ||
      /* ((a, b) => console.log('Finished colliding with:', b.name)); */ (() => { });
    this.collitionObjects = [];
    this.physics = defined(props.physics) ? props.physics : true;
    this.rebound = defined(props.rebound) ? props.rebound : 0.7;
    this.friction = defined(props.friction) ? props.friction : 0.5;

    this.border = defined(props.border)
      ? props.border
      : {
        background: "transparent",
        width: 0,
      };

    this.id = id();

    this.cacheDirection = "up";

    this.speed = props.speed || 3;
    this.velocity = props.velocity || { x: 0, y: 0 };

    world.register && !isTemplate && world.register(this);
    return this;
  }

  /**
   * @type {Function} on
   * @description Adds an event listener to the world.
   * @param {String} event - The event to listen for.
   * @param {Function} callback - The callback to execute when the event is fired.
   */
  on;
  /**
   * @type {Function} emit
   * @description Emits an event to the world.
   * @param {String} event - The event to emit.
   * @param {Object} [data] - The data to pass to the event.
   */
  emit;
  /**
   * @type {Function} addEventListener
   * @description Adds an event listener to the world.
   * @param {String} event - The event to listen for.
   * @param {Function} callback - The callback to execute when the event is fired.
   */
  addEventListener;
  /**
   * @type {Function} removeEventListener
   * @description Removes an event listener from the world.
   * @param {String} event - The event to listen for.
   */
  removeEventListener;
  /**
   * @type {Function} removeListener
   * @description Removes an event listener from the world.
   * @param {String} event - The event to listen for.
   */
  removeListener;

  collideWith(object) {
    this.collitionObjects.push(object);
  }

  finishCollideWith(object) {
    this.collitionObjects.forEach(
      (o, i) => o.id === object.id && this.collitionObjects.splice(i, 1)
    );
  }

  setVelocity(x, y) {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  rotate(angle) {
    this.rotation += angle;
  }

  setRotation(angle) {
    this.rotation = angle;
  }

  draw() {
    /**
     * @type {CanvasRenderingContext2D} ctx
     */
    var ctx = world.ctx;
    ctx.save();

    /**
     * flip object by keeping the same coordinates
     *🪲 B̶U̶G̶:̶ ̶T̶h̶a̶t̶'̶s̶ ̶w̶h̶y̶ ̶F̶l̶i̶p̶p̶i̶n̶g̶ ̶i̶s̶ ̶d̶i̶s̶a̶b̶l̶e̶d.
     •✅ BUGFIX: Fixed Image Flip   •   ⏲️ August 23, 2022.
     */

    ctx.translate(this.x + this.width / 2, this.y + this.width / 2);
    ctx.scale(this.flip.x ? -1 : 1, this.flip.y ? -1 : 1);
    ctx.translate(-(this.x - this.width / 2), -(this.y + this.width / 2));

    ctx.translate(this.x - this.width, this.y + this.height / 2);

    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));

    ctx.globalAlpha = this.opacity;

    switch (this.type) {
      case "rectangle":
        if (this.pattern === "color") {
          world.ctx.fillStyle = this.background;
          world.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.pattern === "gradient") {
          if (!this.background.gradientSettings)
            throw new Error("ArgumentError: No gradient settings found!");
          if (!this.background.gradientSettings.startColor)
            throw new Error("ArgumentError: No start color found!");
          if (!this.background.gradientSettings.endColor)
            throw new Error("ArgumentError: No end color found!");
          let grad = world.ctx.createGradient(this.background.gradientSettings);
          grad.addColorStop(0, this.background.gradientStart);
          grad.addColorStop(1, this.background.gradientEnd);
        }
        if (this.pattern === "image") {
          if (!this.background.image)
            throw new Error("ArgumentError: No image found!");

          ctx.drawImage(
            this.background.image,
            this.x,
            this.y,
            this.flip.x ? -this.width : this.width,
            this.flip.y ? -this.height : this.height
          );
        }

        break;
      case "circle":
        world.ctx.beginPath();
        world.ctx.arc(
          this.x + this.width / 2,
          this.y + this.height / 2,
          this.width / 2,
          0,
          2 * Math.PI
        );
        // arc cons
        world.ctx.fillStyle = this.background;
        world.ctx.fill();
        break;
      case "line":
        world.ctx.beginPath();
        // line width
        world.ctx.lineWidth = this.width;
        world.ctx.moveTo(this.lineCoordinates.x1, this.lineCoordinates.y1);
        world.ctx.lineTo(this.lineCoordinates.x2, this.lineCoordinates.y2);
        world.ctx.strokeStyle = this.pattern || this.background;
        world.ctx.stroke();
        break;
      case "image":
        world.ctx.drawImage(
          this.image,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
    }
    if (this.border) {
      world.ctx.strokeStyle = this.border.background;
      var tempWidth = world.ctx.lineWidth;
      world.ctx.lineWidth = this.border.width;
      world.ctx.strokeRect(this.x, this.y, this.width, this.height);
      world.ctx.lineWidth = tempWidth;
    }

    ctx.restore();

    world.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  remove() {
    world.unregister(this);
  }

  result() {
    return this;
  }

  isOutOfMap() {
    return (
      this.x < 0 || this.x > world.width || this.y < 0 || this.y > world.height
    );
  }

  isOutOfRange(range) {
    return (
      this.x < range.start ||
      this.x > range.end ||
      this.y < range.start ||
      this.y > range.end
    );
  }

  get(p) {
    return this[p];
  }

  set(p, v) {
    this[p] = v;
    return this;
  }

  setProps(props) {
    for (let p in props) {
      this[p] = props[p];
    }
    return this;
  }

  move(direction, optionalSpeed = null, noMatterCollision = false) {
    this.cacheDirection = direction;
    var movingSpeed = optionalSpeed !== null ? optionalSpeed : this.speed;
    switch (direction) {
      case "up":
        this.y -= movingSpeed;
        break;
      case "down":
        this.y += movingSpeed;
        break;
      case "left":
        this.x -= movingSpeed;
        break;
      case "right":
        this.x += movingSpeed;
        break;
      default:
        break;
    }

    world.preventCollision(this, world.Objects);
  }

  moveTheta(angle, optionalSpeed = null, noMatterCollision = false) {
    var movingSpeed = defined(optionalSpeed) ? optionalSpeed : this.speed;
    this.x += Math.cos(angle * deg) * movingSpeed;
    this.y += Math.sin(angle * deg) * movingSpeed;
    world.preventCollision(this, world.Objects);
  }

  follow(target) {
    const x = target.x - this.x;
    const y = target.y - this.y;
    const angle = Math.atan2(y, x);
    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;
    world.preventCollision(this, world.Objects);
  }

  onCollide(callback) {
    this.onCollision = callback;
    return this;
  }

  isCollidingWith(target) {
    return world.collision(this, target);
  }

  CCHas(target) {
    var res = false;
    this.collitionObjects.forEach((o) => {
      o.id === target.id && (res = true);
    });
    return res;
  }

  jump(howHigh) {
    this.velocity.y = -howHigh;
  }
}

export class Animation {
  #_onFinish = () => { };
  constructor(target, speed = 100, loop = true, ...frames) {
    if (!target) throw new Error("ArgumentError: No target found!");
    if (!frames || !frames.length)
      throw new Error("ArgumentError: No frames found!");
    this.target = target;
    this.speed = speed || 100;
    this.frames = frames;
    this.currentFrame = 0;
    this.isPlaying = true;
    this.#_onFinish = () => { };

    setInterval(() => {
      if (this.isPlaying) {
        this.currentFrame++;
        if (this.currentFrame >= this.frames.length) {
          this.currentFrame = 0;
          if (!loop) {
            this.isPlaying = false;
            this.#_onFinish(this.target);
          }
        }

        this.target.background.image = this.frames[this.currentFrame];
      }
    }, this.speed);
  }
  start() {
    this.isPlaying = true;
    return this;
  }
  stop() {
    this.isPlaying = false;
    return this;
  }
  onFinish(callback) {
    this.#_onFinish = callback;
    return this;
  }
}

export const stopAllSounds = (so) => {
  Object.keys(so).forEach((k) => so[k].pause());
};

export function Text(
  p = {
    text: "",
    background: "white",
    font: "Arial",
    size: "20px",
    x: 0,
    y: 0,
    fromEnd: false,
    type: "fill",
  }
) {
  p.text = p.text || "";
  p.background = p.background || "white";
  p.font = p.font || "Arial";
  p.size = p.size || "20px";
  p.x = p.x || 0;
  p.y = p.y || 0;
  p.type = p.type || "fill";
  p.fromEnd = p.fromEnd || false;

  p.y = p.y * 2 + p.y / 2 + p.size.split("px")[0] / 4;

  world.ctx.font = p.size + " " + p.font;
  switch (p.type) {
    case "fill":
      world.ctx.fillStyle = p.background;
      if (p.fromEnd) {
        world.ctx.fillText(
          p.text,
          world.width - world.ctx.measureText(p.text).width - p.x,
          p.y
        );
      } else {
        world.ctx.fillText(p.text, p.x, p.y);
      }
      break;
    case "stroke":
      world.ctx.strokeStyle = p.background;
      if (p.fromEnd) {
        world.ctx.strokeText(
          p.text,
          p.x - world.ctx.measureText(p.text).width,
          p.y
        );
      } else {
        world.ctx.strokeText(p.text, p.x, p.y);
      }
      break;
    default:
      break;
  }
}

export function LoadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = src;
  });
}

// export class Camera {
//     constructor(x, y, width, height, zoom = 1) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.zoom = zoom;
//     }

//     set(x, y, width, height, zoom) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.zoom = zoom;
//     }

//     update() {
//         world.Objects.forEach(o => {
//             o.width = o.width / this.zoom;
//             o.height = o.height / this.zoom;
//         });
//     }
// }

export function LoadAudio(src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = src;
    resolve(audio);
  });
}

export async function spritesBETA(spriteObj) {
  for (let key in spriteObj) {
    world.sprites[key] = await image(spriteObj[key]);
  }
}

// Written and maintained by @rhpo (github.com/rhpo) ❤️.
