// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.registerHelper("lint", "yaml", function(text) {
var found = [];
try {
jsyaml.load(text);
} catch (e) {
var loc = e.mark;
found.push({
from:CodeMirror.Pos(loc.line, loc.column),
to:CodeMirror.Pos(loc.line, loc.column),
message:e.message
});
}
return found;
});
});