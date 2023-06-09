var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("z80", function() {
var keywords1 = /^(exx?|(ld|cp|in)([di]r?)?|pop|push|ad[cd]|cpl|daa|dec|inc|neg|sbc|sub|and|bit|[cs]cf|x?or|res|set|r[lr]c?a?|r[lr]d|s[lr]a|srl|djnz|nop|rst|[de]i|halt|im|ot[di]r|out[di]?)\b/i, keywords2 = /^(call|j[pr]|ret[in]?)\b/i, keywords3 = /^b_?(call|jump)\b/i, variables1 = /^(af?|bc?|c|de?|e|hl?|l|i[xy]?|r|sp)\b/i, variables2 = /^(n?[zc]|p[oe]?|m)\b/i, errors = /^([hl][xy]|i[xy][hl]|slia|sll)\b/i, numbers = /^([\da-f]+h|[0-7]+o|[01]+b|\d+)\b/i;
return {
startState:function() {
return {
context:0
};
},
token:function(stream, state) {
if (stream.column() || (state.context = 0), stream.eatSpace()) return null;
var w;
if (stream.eatWhile(/\w/)) {
if (w = stream.current(), !stream.indentation()) return numbers.test(w) ? "number" :null;
if (1 == state.context && variables1.test(w)) return "variable-2";
if (2 == state.context && variables2.test(w)) return "variable-3";
if (keywords1.test(w)) return state.context = 1, "keyword";
if (keywords2.test(w)) return state.context = 2, "keyword";
if (keywords3.test(w)) return state.context = 3, "keyword";
if (errors.test(w)) return "error";
} else {
if (stream.eat(";")) return stream.skipToEnd(), "comment";
if (stream.eat('"')) {
for (;(w = stream.next()) && '"' != w; ) "\\" == w && stream.next();
return "string";
}
if (stream.eat("'")) {
if (stream.match(/\\?.'/)) return "number";
} else if (stream.eat(".") || stream.sol() && stream.eat("#")) {
if (state.context = 4, stream.eatWhile(/\w/)) return "def";
} else if (stream.eat("$")) {
if (stream.eatWhile(/[\da-f]/i)) return "number";
} else if (stream.eat("%")) {
if (stream.eatWhile(/[01]/)) return "number";
} else stream.next();
}
return null;
}
};
}), CodeMirror.defineMIME("text/x-z80", "z80");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 