(function() {
$(document).ready(function() {
var $codeeditor, editor, editorOptions;
return editorOptions = {
lineNumbers:!1,
lineWrapping:!0,
matchBrackets:!0,
mode:"text/x-markdown",
indentUnit:4
}, $codeeditor = $("#Answer").get(0), $codeeditor && (editor = CodeMirror.fromTextArea($codeeditor, editorOptions)), 
$("#submit").click(function() {
return document.location.href = "/manage/forum/upload";
});
});
}).call(this);