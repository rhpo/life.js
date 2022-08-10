# Life.JS &nbsp;&horbar;&nbsp; Gaming in JavaScript.
<p align="center">
<img src="https://i.ibb.co/Fwk65L4/LIFE.png" width="200">
</p>

</center>

**Life.JS** is a web 2D *Pure, Extensible and Animated* JavaScript Game Engine written in VanillaJS in <u>2022</u>.

## 	&bull; 🤔 Why Choose LifeJS?
**Most developers choose us because of the <u>Following Reasons:</u>**
+ Maximum-minimalist code.
+ Full Cross-Brower support.
+ Flexible & Full featured **GEF** *(Game Engine Framework)*.
+ Processing Speed and Organization.

## &bull; 💻 Code Examples...
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
function Main() {
   world.update();    // • Update The World on each Frame.
   square.rotate(1); //  • Rotate the Square.
}
setInterval(Main, 1000 / FPS);
```

See? As simple as that.

# &bull; 🛠️ Installation...
&nbsp;&nbsp;**🌿 NodeJS *(for intellisence)* :**
 ```bash
     npm install -g life.js # Installing LifeJS
```
+ &nbsp;&nbsp;**✋ Usage :**
```js
        const { World, Shape } = require('life.js'); // ESM
        import { World as Level, Shape } from 'life.js' // TS 
```

&nbsp;&nbsp;**🌐 Web *(JavaScript)* :**
 ```js
     import { World, Shape } from 'path/to/life.js';
     var world = new World({...});  
```



