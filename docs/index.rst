Life.JS  ―  Gaming in JavaScript.
=================================

.. raw:: html

   <p align="center">

.. raw:: html

   </p>

.. raw:: html

   </center>

**Life.JS** is a web 2D *Pure, Extensible and Animated* JavaScript Game
Engine written in VanillaJS in 2022.

• 🤔 Why Choose LifeJS?
-----------------------

**Most developers choose us because of the Following Reasons:** +
Maximum-minimalist code. + Full Cross-Brower support. + Flexible & Full
featured **GEF** *(Game Engine Framework)*. + Processing Speed and
Organization.

• 💻 Code Examples…
-------------------

.. code:: js

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

See? As simple as that.

• 🛠️ Installation…
==================

  **🌿 NodeJS (for intellisence) :**
``bash npm install -g life.js # Installing LifeJS``   **✋ Usage :**

.. code:: js

   const { World, Shape } = require('life.js'); // ESM
   import { World as Level, Shape } from 'life.js' // TS 

  **🌐 Web (JavaScript) :**
``js import { World, Shape } from 'path/to/life.js'; var world = new World({...});``
