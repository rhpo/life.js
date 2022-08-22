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

const template = `
// Hello Life.JS!

// Create a new world
const world = new World({
    G: {
        x: 0,
        y: 1,
    },
    background: 'palegreen',
    hasLimits: false,
    responsive: true,
});

const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

// Generating Random Shapes:

var generatedCount = 0;
setInterval(() => {
  generatedCount++;
  new Shape({
    type: Shapes.Square,
    radius: 30,
    pattern: Patterns.Color,
    background: getRandomColor(),
    rebound: 0.5,
    x: Math.random() * world.width,
  });
}, 400);

world.canvas.onmousemove = e => world.mouse.isLeftClicked && world.HoveredObjects().filter(e => e.remove());

// Make a Ground:
new Shape({
  background: 'black',
  x: 0,
  y: world.height - 15,
  width: world.width,
  height: 15,
  physics: false,
});

const game = new GameLoop(() => {
  world.update();
  Text({
    text: 'Generated: ' + generatedCount,
    x: 10,
    y: 10,
    fromEnd: true,
    background: 'black',
    font: 'Consolas',
  });
});
game.start();
`.substring(1);

// Monaco init
require(["vs/editor/editor.main"], function () {
  createEditor(document.querySelector(".code"));
});

function createEditor(editorContainer) {
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
        import { Animation, World, Shape, PreSufixedRange, Shapes, Patterns, Events, Cursors, GameLoop, LoadImage, LoadAudio, Text } from 'https://gitcdn.link/cdn/rhpo/life.js/main/src/life.min.js';
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
        import { World, Text, Animation, Shape, PreSufixedRange, Shapes, Patterns, Events, Cursors, GameLoop, LoadImage, LoadAudio } from 'https://gitcdn.link/cdn/rhpo/life.js/main/src/life.min.js';
        ${template}
      </script>
    </body>
`);

document.querySelector("nav").onclick = () =>
  (location.href = "https://github.com/rhpo/life.js");
