
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
<!--[![LinkedIn][linkedin-shield]][linkedin-url]-->

# Life.JS &nbsp;&horbar;&nbsp; Gaming in JavaScript.
<div align="center">
<BR>
   <img src="https://i.ibb.co/Fwk65L4/LIFE.png" width="86">

   <h3 align="center">Life.JS</h3>

  <p align="center">
    <strong>Life.JS</strong> is a web 2D <i>Pure, Extensible and Animated</i> JavaScript Game Engine written in Pure JavaScript in <u>2022</u>.
    <br />
    <a href="https://github.com/rhpo/life.js/docs"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
   
</div>

</center>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#nodejs">🌿 NodeJS</a></li>
        <li><a href="#web">🌐 Web Browsers (VanillaJS)</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<hr>

<h2 name="about-the-project">&bull; 🔍 About The Project</h2>

**LifeJS** is a JavaScript Library to make 2D Animated Browser games with a 
highly flexible __API__.

+ It works by creating instances of pre-given classes and saving their geopositions, dimentions in the object class itself. Then calling a function that draws the shape for each registered shape in the previously created <u>world instance</u>.

+ It was written by a 17 years old developer from Algeria 🇩🇿 called *Ramy Hadid* for web game developement purpose.

+ It's creation story, was that the developer was looking for developing a small browser game, he was then looking for game engines and libraries... Then noticed that all libraries have a complex to use API, he decided to make his own small Idea for making small 2D games, after a long time, this idea turned to be LifeJS.

<h2 name="why-choose">&bull; 🤔 Why LifeJS?</h2>

**Most developers choose us because of the <u>Following Reasons:</u>**
+ Maximum-minimalist code.
+ Full Cross-Browser support.
+ Flexible & Full featured **GEF** *(Game Engine Framework)*.
+ Processing Speed and Organization.

<br>
<h1 name="getting-started">&bull; 🛠️ Getting Started</h1>
<strong name="nodejs">
&nbsp;&nbsp;🌿 NodeJS <i>(for intellisence)</i> :
</strong>
<br><br>

 ```bash
npm install -g life.js # Installing LifeJS
```

<strong name="web">
&nbsp;&nbsp;🌐 Web 
    <strong>&bull; JavaScript</strong>
</strong>
<br><br>

 ```js
import { World, Shape } from 'path/to/life.js';
var world = new World ({ ... });  
```

**✋ Usage :**
```js
const { World, Shape } = require('life.js'); // ESM
import { World as Level, Shape } from 'life.js' // TS 
```
<br>
<h1 name="getting-started">&bull; 📕 CDN</h1>

[Life.min.js &nbsp;&horbar;&nbsp; Minimal Version](https://gitcdn.link/cdn/rhpo/life.js/main/src/life.min.js) &nbsp;&bull;&nbsp; 17kb

[Life.js &nbsp;&horbar;&nbsp; Classic Version (Not minimized)](https://gitcdn.link/cdn/rhpo/life.js/main/src/life.js) &nbsp;&bull;&nbsp; 33kb

<br>
<h1 name="examples">&bull; 🕹️ Code Examples</h1>

```js
import { World, Shape } from 'path/to/life.js'

// Rotating Centered Square...
const world = new World();
const square = new Shape({
   type: 'rectangle',
   width: 80,
   height: 80,
   pattern: 'color',
   background: 'cyan'
});

world.center(square) // • Make the square centered in the Screen.

const FPS = 60;

function main() {
   world.update();    // • Update The World on each Frame.
   square.rotate(1); //  • Rotate the Square.
}
setInterval(main, 1000 / FPS);
```

See? As simple as that.
<br><br><br>

<h1 name="docs">📖 Documentation</h1>

You can check **LifeJS** documentation [here (GitHub)](https://github.com/rhpo/life.js/docs). 

<br>
<h1 name="api">📚 API</h1>

You can check **LifeJS** *Application Programming Interface* (API) [here (GitHub)](https://github.com/rhpo/life.js/api). 

<br>
<h1 name="licence">📜 Licence (MIT)</h1>

*Copyright (c) 2022 LifeJS (https://www.github.com/rhpo/life.js) Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:*

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

```THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.```

<br>
<h1 name="licence">👤 About the author:</h1>
<ul>
    <p>&bull; Name &nbsp;&horbar;&nbsp; Ramy Hadid.</p>
    <p>&bull; Age &nbsp;&horbar;&nbsp; 17 Years old.</p>
    <p>&bull; Nationality &nbsp;&horbar;&nbsp; 🇩🇿 Algeria.</p>
    <p>&bull; Linkedin &nbsp;&horbar;&nbsp; <a href="https://www.linkedin.com/in/ramy-hadid-15aa70243/">(Ramy Hadid)</a></p>
    <p>&bull; Instagram &nbsp;&horbar;&nbsp; <a href="https://www.linkedin.com/in/ramy-hadid-15aa70243/">@ramyhadid</a></p>
        <p>&bull; Discord &nbsp;&horbar;&nbsp; <a href="https://discord.com/users/751901651622690927">ramy#1539</a></p>
    <p>&bull; GitHub &nbsp;&horbar;&nbsp; <a href="https://www.github.com/rhpo">@rhpo</a></p>
    <p>&bull; Email &nbsp;&horbar;&nbsp; <a href="https://www.linkedin.com/in/ramy-hadid-15aa70243/">me@ramey.ml</a></p>
    <p>&bull; Programming Languages &nbsp;&horbar;&nbsp; C# &bull; Ruby &bull; NodeJS &bull; Julia.</p>
</ul>

<br>

> Written by <a href="https://www.github.com/rhpo">@rhpo</a> with ❤️.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/rhpo/life.js?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/rhpo/life.js?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/rhpo/life.js?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/rhpo/life.js?style=for-the-badge
[issues-url]: https://github.com/rhpo/life.js/issues
[license-shield]: https://img.shields.io/github/license/rhpo/life.js?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ramy-hadid-15aa70243/
