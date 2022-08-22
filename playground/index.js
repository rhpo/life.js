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
