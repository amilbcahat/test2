// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.registerHelper("fold", "indent", function(cm, start) {
var tabSize = cm.getOption("tabSize"), firstLine = cm.getLine(start.line);
if (/\S/.test(firstLine)) {
for (var getIndent = function(line) {
return CodeMirror.countColumn(line, null, tabSize);
}, myIndent = getIndent(firstLine), lastLineInFold = null, i = start.line + 1, end = cm.lastLine(); end >= i; ++i) {
var curLine = cm.getLine(i), curIndent = getIndent(curLine);
if (curIndent > myIndent) lastLineInFold = i; else if (/\S/.test(curLine)) break;
}
return lastLineInFold ? {
from:CodeMirror.Pos(start.line, firstLine.length),
to:CodeMirror.Pos(lastLineInFold, cm.getLine(lastLineInFold).length)
} :void 0;
}
});
});