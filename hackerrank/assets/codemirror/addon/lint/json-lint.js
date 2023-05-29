// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.registerHelper("lint", "json", function(text) {
var found = [];
jsonlint.parseError = function(str, hash) {
var loc = hash.loc;
found.push({
from:CodeMirror.Pos(loc.first_line - 1, loc.first_column),
to:CodeMirror.Pos(loc.last_line - 1, loc.last_column),
message:str
});
};
try {
jsonlint.parse(text);
} catch (e) {}
return found;
});
});