(function() {
$(document).ready(function() {
var $codeeditor, editorOptions;
return editorOptions = {
lineNumbers:!1,
lineWrapping:!0,
matchBrackets:!0,
mode:"text/x-markdown",
indentUnit:4
}, $codeeditor = $("#Answer").get(0), HR.appController.loadCodeMirrorMode("markdown", function() {
return function() {
var editor;
return $codeeditor ? editor = CodeMirror.fromTextArea($codeeditor, editorOptions) :void 0;
};
}(this)), $("#submit").click(function() {
return document.location.href = "/manage/forum/upload";
});
});
}).call(this);