var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("toml", function() {
return {
startState:function() {
return {
inString:!1,
stringType:"",
lhs:!0,
inArray:0
};
},
token:function(stream, state) {
if (state.inString || '"' != stream.peek() && "'" != stream.peek() || (state.stringType = stream.peek(), 
stream.next(), state.inString = !0), stream.sol() && 0 === state.inArray && (state.lhs = !0), 
state.inString) {
for (;state.inString && !stream.eol(); ) stream.peek() === state.stringType ? (stream.next(), 
state.inString = !1) :"\\" === stream.peek() ? (stream.next(), stream.next()) :stream.match(/^.[^\\\"\']*/);
return state.lhs ? "property string" :"string";
}
return state.inArray && "]" === stream.peek() ? (stream.next(), state.inArray--, 
"bracket") :state.lhs && "[" === stream.peek() && stream.skipTo("]") ? (stream.next(), 
"]" === stream.peek() && stream.next(), "atom") :"#" === stream.peek() ? (stream.skipToEnd(), 
"comment") :stream.eatSpace() ? null :state.lhs && stream.eatWhile(function(c) {
return "=" != c && " " != c;
}) ? "property" :state.lhs && "=" === stream.peek() ? (stream.next(), state.lhs = !1, 
null) :!state.lhs && stream.match(/^\d\d\d\d[\d\-\:\.T]*Z/) ? "atom" :state.lhs || !stream.match("true") && !stream.match("false") ? state.lhs || "[" !== stream.peek() ? !state.lhs && stream.match(/^\-?\d+(?:\.\d+)?/) ? "number" :(stream.eatSpace() || stream.next(), 
null) :(state.inArray++, stream.next(), "bracket") :"atom";
}
};
}), CodeMirror.defineMIME("text/x-toml", "toml");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 