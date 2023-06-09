// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.registerHelper("lint", "coffeescript", function(text) {
var found = [], parseError = function(err) {
var loc = err.lineNumber;
found.push({
from:CodeMirror.Pos(loc - 1, 0),
to:CodeMirror.Pos(loc, 0),
severity:err.level,
message:err.message
});
};
try {
for (var res = coffeelint.lint(text), i = 0; i < res.length; i++) parseError(res[i]);
} catch (e) {
found.push({
from:CodeMirror.Pos(e.location.first_line, 0),
to:CodeMirror.Pos(e.location.last_line, e.location.last_column),
severity:"error",
message:e.message
});
}
return found;
});
});