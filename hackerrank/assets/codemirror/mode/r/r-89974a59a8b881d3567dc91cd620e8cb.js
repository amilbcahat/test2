// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("r", function(config) {
function wordObj(str) {
for (var words = str.split(" "), res = {}, i = 0; i < words.length; ++i) res[words[i]] = !0;
return res;
}
function tokenBase(stream, state) {
curPunc = null;
var ch = stream.next();
if ("#" == ch) return stream.skipToEnd(), "comment";
if ("0" == ch && stream.eat("x")) return stream.eatWhile(/[\da-f]/i), "number";
if ("." == ch && stream.eat(/\d/)) return stream.match(/\d*(?:e[+\-]?\d+)?/), "number";
if (/\d/.test(ch)) return stream.match(/\d*(?:\.\d+)?(?:e[+\-]\d+)?L?/), "number";
if ("'" == ch || '"' == ch) return state.tokenize = tokenString(ch), "string";
if ("." == ch && stream.match(/.[.\d]+/)) return "keyword";
if (/[\w\.]/.test(ch) && "_" != ch) {
stream.eatWhile(/[\w\.]/);
var word = stream.current();
return atoms.propertyIsEnumerable(word) ? "atom" :keywords.propertyIsEnumerable(word) ? (blockkeywords.propertyIsEnumerable(word) && !stream.match(/\s*if(\s+|$)/, !1) && (curPunc = "block"), 
"keyword") :builtins.propertyIsEnumerable(word) ? "builtin" :"variable";
}
return "%" == ch ? (stream.skipTo("%") && stream.next(), "variable-2") :"<" == ch && stream.eat("-") ? "arrow" :"=" == ch && state.ctx.argList ? "arg-is" :opChars.test(ch) ? "$" == ch ? "dollar" :(stream.eatWhile(opChars), 
"operator") :/[\(\){}\[\];]/.test(ch) ? (curPunc = ch, ";" == ch ? "semi" :null) :null;
}
function tokenString(quote) {
return function(stream, state) {
if (stream.eat("\\")) {
var ch = stream.next();
return "x" == ch ? stream.match(/^[a-f0-9]{2}/i) :("u" == ch || "U" == ch) && stream.eat("{") && stream.skipTo("}") ? stream.next() :"u" == ch ? stream.match(/^[a-f0-9]{4}/i) :"U" == ch ? stream.match(/^[a-f0-9]{8}/i) :/[0-7]/.test(ch) && stream.match(/^[0-7]{1,2}/), 
"string-2";
}
for (var next; null != (next = stream.next()); ) {
if (next == quote) {
state.tokenize = tokenBase;
break;
}
if ("\\" == next) {
stream.backUp(1);
break;
}
}
return "string";
};
}
function push(state, type, stream) {
state.ctx = {
type:type,
indent:state.indent,
align:null,
column:stream.column(),
prev:state.ctx
};
}
function pop(state) {
state.indent = state.ctx.indent, state.ctx = state.ctx.prev;
}
var curPunc, atoms = wordObj("NULL NA Inf NaN NA_integer_ NA_real_ NA_complex_ NA_character_"), builtins = wordObj("list quote bquote eval return call parse deparse"), keywords = wordObj("if else repeat while function for in next break"), blockkeywords = wordObj("if else repeat while function for"), opChars = /[+\-*\/^<>=!&|~$:]/;
return {
startState:function() {
return {
tokenize:tokenBase,
ctx:{
type:"top",
indent:-config.indentUnit,
align:!1
},
indent:0,
afterIdent:!1
};
},
token:function(stream, state) {
if (stream.sol() && (null == state.ctx.align && (state.ctx.align = !1), state.indent = stream.indentation()), 
stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
"comment" != style && null == state.ctx.align && (state.ctx.align = !0);
var ctype = state.ctx.type;
return ";" != curPunc && "{" != curPunc && "}" != curPunc || "block" != ctype || pop(state), 
"{" == curPunc ? push(state, "}", stream) :"(" == curPunc ? (push(state, ")", stream), 
state.afterIdent && (state.ctx.argList = !0)) :"[" == curPunc ? push(state, "]", stream) :"block" == curPunc ? push(state, "block", stream) :curPunc == ctype && pop(state), 
state.afterIdent = "variable" == style || "keyword" == style, style;
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase) return 0;
var firstChar = textAfter && textAfter.charAt(0), ctx = state.ctx, closing = firstChar == ctx.type;
return "block" == ctx.type ? ctx.indent + ("{" == firstChar ? 0 :config.indentUnit) :ctx.align ? ctx.column + (closing ? 0 :1) :ctx.indent + (closing ? 0 :config.indentUnit);
},
lineComment:"#"
};
}), CodeMirror.defineMIME("text/x-rsrc", "r");
});