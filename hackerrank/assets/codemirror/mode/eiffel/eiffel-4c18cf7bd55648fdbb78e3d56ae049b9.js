// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("eiffel", function() {
function wordObj(words) {
for (var o = {}, i = 0, e = words.length; e > i; ++i) o[words[i]] = !0;
return o;
}
function chain(newtok, stream, state) {
return state.tokenize.push(newtok), newtok(stream, state);
}
function tokenBase(stream, state) {
if (curPunc = null, stream.eatSpace()) return null;
var ch = stream.next();
return '"' == ch || "'" == ch ? chain(readQuoted(ch, "string"), stream, state) :"-" == ch && stream.eat("-") ? (stream.skipToEnd(), 
"comment") :":" == ch && stream.eat("=") ? "operator" :/[0-9]/.test(ch) ? (stream.eatWhile(/[xXbBCc0-9\.]/), 
stream.eat(/[\?\!]/), "ident") :/[a-zA-Z_0-9]/.test(ch) ? (stream.eatWhile(/[a-zA-Z_0-9]/), 
stream.eat(/[\?\!]/), "ident") :/[=+\-\/*^%<>~]/.test(ch) ? (stream.eatWhile(/[=+\-\/*^%<>~]/), 
"operator") :null;
}
function readQuoted(quote, style, unescaped) {
return function(stream, state) {
for (var ch, escaped = !1; null != (ch = stream.next()); ) {
if (ch == quote && (unescaped || !escaped)) {
state.tokenize.pop();
break;
}
escaped = !escaped && "%" == ch;
}
return style;
};
}
var curPunc, keywords = wordObj([ "note", "across", "when", "variant", "until", "unique", "undefine", "then", "strip", "select", "retry", "rescue", "require", "rename", "reference", "redefine", "prefix", "once", "old", "obsolete", "loop", "local", "like", "is", "inspect", "infix", "include", "if", "frozen", "from", "external", "export", "ensure", "end", "elseif", "else", "do", "creation", "create", "check", "alias", "agent", "separate", "invariant", "inherit", "indexing", "feature", "expanded", "deferred", "class", "Void", "True", "Result", "Precursor", "False", "Current", "create", "attached", "detachable", "as", "and", "implies", "not", "or" ]), operators = wordObj([ ":=", "and then", "and", "or", "<<", ">>" ]);
return {
startState:function() {
return {
tokenize:[ tokenBase ]
};
},
token:function(stream, state) {
var style = state.tokenize[state.tokenize.length - 1](stream, state);
if ("ident" == style) {
var word = stream.current();
style = keywords.propertyIsEnumerable(stream.current()) ? "keyword" :operators.propertyIsEnumerable(stream.current()) ? "operator" :/^[A-Z][A-Z_0-9]*$/g.test(word) ? "tag" :/^0[bB][0-1]+$/g.test(word) ? "number" :/^0[cC][0-7]+$/g.test(word) ? "number" :/^0[xX][a-fA-F0-9]+$/g.test(word) ? "number" :/^([0-9]+\.[0-9]*)|([0-9]*\.[0-9]+)$/g.test(word) ? "number" :/^[0-9]+$/g.test(word) ? "number" :"variable";
}
return style;
},
lineComment:"--"
};
}), CodeMirror.defineMIME("text/x-eiffel", "eiffel");
});