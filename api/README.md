
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Linkedin][linkedin-shield]][linkedin-url]
[![Discord][discord-shield]][discord-url]

# Life.JS &nbsp;&horbar;&nbsp; API.
<div align="center">
<br>
   <img src="https://i.ibb.co/Fwk65L4/LIFE.png" width="86">
   
   <h3 align="center">Life.JS</h3>

  <p align="center">
    <strong>Life.JS</strong> is a web 2D <i>Pure, Extensible and Animated</i> JavaScript Game Engine written in Pure JavaScript in <u>2022</u>.
    <br />
    <h3><u>~ API ~</u></h3>
    <a href="https://rhpo.github.io/life.js/demo/rotating-square/">View Demo</a>
    ·
    <a href="https://github.com/rhpo/life.js/issues">Report Bug</a>
    ·
    <a href="mailto:lifejs@ramey.ml">Request Feature</a>
  </p>
   
</div>

<details>
  <summary>Table of Contents</summary>
  
  *   [constructor][1]
    *   [Parameters][2]
*   [World][4]
    *   [Parameters][5]
    *   [Properties][6]
    *   [on][7]
        *   [Parameters][8]
    *   [emit][9]
        *   [Parameters][10]
    *   [addEventListener][11]
        *   [Parameters][12]
    *   [removeEventListener][13]
        *   [Parameters][14]
    *   [removeListener][15]
        *   [Parameters][16]
    *   [center][17]
        *   [Parameters][18]
    *   [generateMap][19]
        *   [Parameters][20]
*   [constructor][21]
    *   [Parameters][22]
*   [on][23]
    *   [Parameters][24]
*   [emit][25]
    *   [Parameters][26]
*   [addEventListener][27]
    *   [Parameters][28]
*   [removeEventListener][29]
    *   [Parameters][30]
*   [removeListener][31]
    *   [Parameters][32]
*   [ctx][33]
*   [LoadImage][35]
    *   [Parameters][36]
*   [LoadAudio][37]
    *   [Parameters][38]
*   [spritesBETA][39]
    *   [Parameters][40]
</details>


<hr>

### Parameters

*   `mainFunc` **[Function][41]** The Main Function of the Game Loop
*   `fps` **[Number][42]** The FPS of the Game Loop (optional, default `60`)

## World

The World is the main object of the Life.js library. It is the container for all the objects in the game.

### Parameters

*   `options` **[Object][44]** The options for the World

### Properties

*   `on` **[Function][41]** The on function for the World
*   `removeListener` **[Function][41]** The removeListener function for the World
*   `emit` **[Function][41]** The emit function for the World
*   `once` **[Function][41]** The once function for the World

### on

Adds an event listener to the world.

Type: [Function][41]

#### Parameters

*   `event` **[String][45]** The event to listen for.
*   `callback` **[Function][41]** The callback to execute when the event is fired.

### emit

Emits an event to the world.

Type: [Function][41]

#### Parameters

*   `event` **[String][45]** The event to emit.
*   `data` **[Object][44]?** The data to pass to the event.

### addEventListener

Adds an event listener to the world.

Type: [Function][41]

#### Parameters

*   `event` **[String][45]** The event to listen for.
*   `callback` **[Function][41]** The callback to execute when the event is fired.

### removeEventListener

Removes an event listener from the world.

Type: [Function][41]

#### Parameters

*   `event` **[String][45]** The event to listen for.

### removeListener

Removes an event listener from the world.

Type: [Function][41]

#### Parameters

*   `event` **[String][45]** The event to listen for.

### center

#### Parameters

*   `ob` **Shape** Object
*   `disaVel` **bool** Reset Velocity (optional, default `false`)

### generateMap

#### Parameters

*   `map` **[Array][43]<[string][45]>** Map grid as an array of strings.
*   `mapRef` **[Object][44]** What should be placed in each character.

Returns **[Array][43]\<Shape>** The generated Objects Array.

## constructor

### Parameters

*   `props` **[Object][44]** The Shape properties. (optional, default `defaultConfiguration`)
*   `isTemplate` **[Boolean][46]** If the shape is a template. (optional, default `false`)

Returns **Shape** The Shape object.

## on

Adds an event listener to the world.

Type: [Function][41]

### Parameters

*   `event` **[String][45]** The event to listen for.
*   `callback` **[Function][41]** The callback to execute when the event is fired.

## emit

Emits an event to the world.

Type: [Function][41]

### Parameters

*   `event` **[String][45]** The event to emit.
*   `data` **[Object][44]?** The data to pass to the event.

## addEventListener

Adds an event listener to the world.

Type: [Function][41]

### Parameters

*   `event` **[String][45]** The event to listen for.
*   `callback` **[Function][41]** The callback to execute when the event is fired.

## removeEventListener

Removes an event listener from the world.

Type: [Function][41]

### Parameters

*   `event` **[String][45]** The event to listen for.

## removeListener

Removes an event listener from the world.

Type: [Function][41]

### Parameters

*   `event` **[String][45]** The event to listen for.

## ctx

Type: [CanvasRenderingContext2D][47]

## LoadImage

### Parameters

*   `src` **[string][45]** Source of the Image

Returns **any** Image

## LoadAudio

### Parameters

*   `src` **[string][45]** Audio source

Returns **any** Audio

## spritesBETA

### Parameters

*   `spriteObj` **[object][44]** Sprites Object

Returns **any** Promise
*THIS IS BETA!*

[1]: #constructor

[2]: #parameters

[4]: #world-1

[5]: #parameters-1

[6]: #properties

[7]: #on

[8]: #parameters-2

[9]: #emit

[10]: #parameters-3

[11]: #addeventlistener

[12]: #parameters-4

[13]: #removeeventlistener

[14]: #parameters-5

[15]: #removelistener

[16]: #parameters-6

[17]: #center

[18]: #parameters-7

[19]: #generatemap

[20]: #parameters-8

[21]: #constructor-1

[22]: #parameters-9

[23]: #on-1

[24]: #parameters-10

[25]: #emit-1

[26]: #parameters-11

[27]: #addeventlistener-1

[28]: #parameters-12

[29]: #removeeventlistener-1

[30]: #parameters-13

[31]: #removelistener-1

[32]: #parameters-14

[33]: #ctx

[35]: #loadimage

[36]: #parameters-15

[37]: #loadaudio

[38]: #parameters-16

[39]: #spritesbeta

[40]: #parameters-17

[41]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[42]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[43]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[44]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[45]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[46]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[47]: https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D

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
