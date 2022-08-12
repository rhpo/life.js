
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Linkedin][linkedin-shield]][linkedin-url]
[![Discord][discord-shield]][discord-url]

# Life.JS &nbsp;&horbar;&nbsp; Documentation.
<div align="center">
<br>
   <img src="https://i.ibb.co/Fwk65L4/LIFE.png" width="86">
   
   <h3 align="center">Life.JS</h3>

  <p align="center">
    <strong>Life.JS</strong> is a web 2D <i>Pure, Extensible and Animated</i> JavaScript Game Engine written in Pure JavaScript in <u>2022</u>.
    <br />
    <h3><u>~ Documentation ~</u></h3>
    <a href="https://rhpo.github.io/life.js/demo/rotating-square/">View Demo</a>
    ·
    <a href="https://github.com/rhpo/life.js/issues">Report Bug</a>
    ·
    <a href="mailto:lifejs@ramey.ml">Request Feature</a>
  </p>
   
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#importing">🔨 Importing necessary tools</a></li>
    <li><a href="#first-world">🌍 Making your first World</a></li>
    <li><a href="#first-shape">🧍  Making our first Shape</a></li>
    <li><a href="#controls">🕹 Controls</a></li>
  </ol>
</details>


<hr>

<h1 name="importing">&bull; Importing necessary tools 🔨</h1>

For this tutorial, we will need to import some tools to be able to make our game.
+ **Required Objects/Classes** &nbsp;&nbsp;&horbar; &nbsp;&nbsp;<u>World</u> &nbsp;&bull;&nbsp; <u>Shape</u> &nbsp;&bull;&nbsp; <u>GameLoop</u> .

For sure, there is a lot of tools in **LifeJS**, we will be representing the basic and necessary ones. If you want to learn everything, do it yourself by reading our API.
+ Importing requirements:

```js
import {
    World, 
    Shape,
    GameLoop
} from 'cdn/path/to/life.js'
```
<br>

<h1 name="first-world">&bull; Making your first World 🌍</h1>
In this first step, we will be making our first world that holds everything we create later (like Shapes, Objects).
<br>

To create a world, we need to use the <u>World</u> class from the LifeJS API like so.
```js
const myWorld = new World( ...params );
```
+ **Remember**: If there is no <u>canvas</u> provided in the World class constructor (params), *LifeJS* will automatically create a canvas and append it to the document's body.

Let's say that we want a world with color <span style="background: #32a852;color:white;padding: 5px;padding-top:2.5px;padding-bottom:2.5px;border-radius: 5px;">#32a852</span> as a background, and we want to add limits to the world so there will be no overflow (Objects won't be able to leave the screen), we will do the following:

```js 
const myWorld = new World({
    pattern: 'color',          //    Tell LifeJS: background = color (string).
    background: '#32a852',
    
    hasLimits: true,             //  Enable Limits as we said previously.
    border: {                   //   Style the borders 😎.
       width: 1,               //    Border width: <Number>
       pattern: 'color',      //     Pattern: <String>
       background: 'black'   //      Background: <Any|String|Object>
    }
});
```

Nice! We created our first world! But why does it not appear yet? Oh! We didn't make the <u>Main</u> function that will make our world active and moving. Let's do it.

+ **Remember:** The main function is a piece of code that will be called over and over to keep out world running Continuously, generally, it'll be called 60 times per second, seems familiar right? it's the <u>FPS (FramePerSecond)</u> default number 🙂.

We will first declare a constant that has the number of **FPS** (*FramesPerSecond*), let's say we want *60FPS*.
```js
const FPS = 60;
```

Then, we create the main function that controls our Game.
```js
...

function main() {
    myWorld.update(); // ℹ️ Required in Main Funtion to Update the game.
}

const FPS = 60;                       // ⬅️ Our FPS, setting condition: (a > 0)
var game = new GameLoop(main, FPS);  //  ⬅️ This will create our game instance
game.start();                       //   ⬅️ Start the loop, so 'main' will be called 
                                   //    over and over...
```
+ Tada! Our game is showing the green color, it's our current world.

But until now, everything seems boring, let's add some objects, with the <u>Shape</u> class!
<br>
<br>
<h1 name="first-shape">&bull; Making our first Shape🧍</h1>

+ We will make & add a person to our world. Let's give him the <span style="background: blue;color:white;padding: 5px;padding-top:2.5px;padding-bottom:2.5px;border-radius: 5px;">Blue</span> color.

```js
const player = new Shape({
   type: 'rectangle',  // Type of the shape, can be: Rectangle, Circle... 
   pattern: 'color',
   background: 'blue',
   
   width: 25,       //  DIMENTION X   (Width)
   height: 25,     //   DIMENTION Y  (Height)
   
   physics: true,  //   True, so we can make the square affected
                  //    by gravity, or simply, to make it drop.
});
```

+ Here! We created our first shape, and it can drop too, nice. let's take ourselfs to the next Step.

<h1 name="controls">&bull; 🕹️ Controls</h1>
Hi again! Glad you made it until here.

We will learn how to make your object move using ***specific Keys***, easy, just follow
what I do.

+ Remember the ***main function*** that we wrote last time? 
We will now use it to get the ***key states***
of the game, we will check if keys are *pressed*, if so, move the shape to the specific direction. We will do so by using the ``World.key.isPressed(keyString)`` function.

```js
function main() {
    
    if (myWorld.key.isPressed('ArrowLeft'))
        player.move('left');
        
    else if (myWorld.key.isPressed('ArrowRight'))
        player.move('right');

    //  🔑 KeyboardEvent NamesList: https://shorturl.at/orTY6 (Mozilla Docs)
    
    myWorld.update();   // ℹ️ Preferably, updating our world must be at the
                       //      end of the main function. To prevent graphical
                      //       issues.
}
```

**Test:** Press the left ArrowKey &nbsp;(⬅️),  and then the right Arrow Key  &nbsp;(➡️), the shape will start moving!

+ **Remember:** You can set a specific speed when initialising a new ***Shape*** instance, using the ``speed:`` property ``<Number>``.<br><br>
And you can also set a gravity vector in the ***World*** instance using the ``G:`` property, Ex: ``G: { x: 0, y: 9.8 }``
<br>

### 🙂 Happy Coding!
<br>

* Useful Links:
<p>&bull; API &nbsp;&horbar;&nbsp; <a href="https://github.com/rhpo/life.js/tree/main/api">Check LifeJS API</a></p>
<br>

> Written by <a href="https://www.github.com/rhpo">@rhpo</a> with ❤️.

[contributors-shield]: https://img.shields.io/github/contributors/rhpo/life.js?style=for-the-badge
[contributors-url]: https://github.com/rhpo/life.js/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/rhpo/life.js?style=for-the-badge
[forks-url]: https://github.com/rhpo/life.js/network/members
[stars-shield]: https://img.shields.io/github/stars/rhpo/life.js?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/rhpo/life.js?style=for-the-badge
[issues-url]: https://github.com/rhpo/life.js/issues
[license-shield]: https://img.shields.io/github/license/rhpo/life.js?style=for-the-badge
[license-url]: https://github.com/rhpo/life.js/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[discord-shield]: https://img.shields.io/discord/1006994262174478377?color=7289da&label=Discord&logo=discord&logoColor=white&style=for-the-badge
[discord-url]: https://discord.gg/XXa7PpnMbq
[linkedin-url]: https://www.linkedin.com/in/ramy-hadid-15aa70243/
