// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("solr", function() {
function isNumber(word) {
return parseFloat(word, 10).toString() === word;
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1; null != (next = stream.next()) && (next != quote || escaped); ) escaped = !escaped && "\\" == next;
return escaped || (state.tokenize = tokenBase), "string";
};
}
function tokenOperator(operator) {
return function(stream, state) {
var style = "operator";
return "+" == operator ? style += " positive" :"-" == operator ? style += " negative" :"|" == operator ? stream.eat(/\|/) :"&" == operator ? stream.eat(/\&/) :"^" == operator && (style += " boost"), 
state.tokenize = tokenBase, style;
};
}
function tokenWord(ch) {
return function(stream, state) {
for (var word = ch; (ch = stream.peek()) && null != ch.match(isStringChar); ) word += stream.next();
return state.tokenize = tokenBase, isOperatorString.test(word) ? "operator" :isNumber(word) ? "number" :":" == stream.peek() ? "field" :"string";
};
}
function tokenBase(stream, state) {
var ch = stream.next();
return '"' == ch ? state.tokenize = tokenString(ch) :isOperatorChar.test(ch) ? state.tokenize = tokenOperator(ch) :isStringChar.test(ch) && (state.tokenize = tokenWord(ch)), 
state.tokenize != tokenBase ? state.tokenize(stream, state) :null;
}
var isStringChar = /[^\s\|\!\+\-\*\?\~\^\&\:\(\)\[\]\{\}\^\"\\]/, isOperatorChar = /[\|\!\+\-\*\?\~\^\&]/, isOperatorString = /^(OR|AND|NOT|TO)$/i;
return {
startState:function() {
return {
tokenize:tokenBase
};
},
token:function(stream, state) {
return stream.eatSpace() ? null :state.tokenize(stream, state);
}
};
}), CodeMirror.defineMIME("text/x-solr", "solr");
});