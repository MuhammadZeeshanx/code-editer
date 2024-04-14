const htmlCodeEl = document.querySelector("[data-html]");
const cssCodeEl = document.querySelector("[data-css]");
const jsCodeEl = document.querySelector("[data-js]");
const codeEl = document.querySelector("[data-code]").contentWindow.document;
const runButtonEl = document.querySelector("#run");
const clearButtonEl = document.querySelector("#clear");

var defaultEditorSettings = {
  styleActiveLine: true,
  lineNumbers: true,
  matchBrackets: true,
  tabSize: 2,
  indentUnit: 2,
  theme: "monokai",
  lineWrapping: true,
};

var jsEditor = CodeMirror.fromTextArea(jsCodeEl, {
  ...defaultEditorSettings,
  mode: "javascript",
});

var cssEditor = CodeMirror.fromTextArea(cssCodeEl, {
  ...defaultEditorSettings,
  mode: "css",
});

var htmlEditor = CodeMirror.fromTextArea(htmlCodeEl, {
  ...defaultEditorSettings,
  mode: "xml",
  tags: {
    style: [
      ["type", /^text\/(x-)?scss$/, "text/x-scss"],
      [null, null, "css"],
    ],
    custom: [[null, null, "customMode"]],
  },
});

for (var editor of [jsEditor, cssEditor, htmlEditor]) {
  editor.on("blur", function (codeMirror) {
    codeMirror.save();
  });
}

runButtonEl.addEventListener("click", function () {
  var htmlCode = htmlCodeEl.value;
  var cssCode = cssCodeEl.value;
  var jsCode = jsCodeEl.value;

  codeEl.open();
  codeEl.write(`<style>${cssCode}</style>`);
  codeEl.write(htmlCode);
  codeEl.write(`<script>${jsCode}</script>`);
  codeEl.close();
});

clearButtonEl.addEventListener("click", function () {
  htmlEditor.setValue("");
  cssEditor.setValue("");
  jsEditor.setValue("");
});
