// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.registerHelper("lint", "css", function(text) {
var found = [];
if (!window.CSSLint) return found;
for (var results = CSSLint.verify(text), messages = results.messages, message = null, i = 0; i < messages.length; i++) {
message = messages[i];
var startLine = message.line - 1, endLine = message.line - 1, startCol = message.col - 1, endCol = message.col;
found.push({
from:CodeMirror.Pos(startLine, startCol),
to:CodeMirror.Pos(endLine, endCol),
message:message.message,
severity:message.type
});
}
return found;
});
});