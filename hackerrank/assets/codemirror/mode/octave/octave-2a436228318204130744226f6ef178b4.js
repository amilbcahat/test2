// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("octave", function() {
function wordRegexp(words) {
return new RegExp("^((" + words.join(")|(") + "))\\b");
}
function tokenTranspose(stream, state) {
return stream.sol() || "'" !== stream.peek() ? (state.tokenize = tokenBase, tokenBase(stream, state)) :(stream.next(), 
state.tokenize = tokenBase, "operator");
}
function tokenComment(stream, state) {
return stream.match(/^.*%}/) ? (state.tokenize = tokenBase, "comment") :(stream.skipToEnd(), 
"comment");
}
function tokenBase(stream, state) {
if (stream.eatSpace()) return null;
if (stream.match("%{")) return state.tokenize = tokenComment, stream.skipToEnd(), 
"comment";
if (stream.match(/^[%#]/)) return stream.skipToEnd(), "comment";
if (stream.match(/^[0-9\.+-]/, !1)) {
if (stream.match(/^[+-]?0x[0-9a-fA-F]+[ij]?/)) return stream.tokenize = tokenBase, 
"number";
if (stream.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?[ij]?/)) return "number";
if (stream.match(/^[+-]?\d+([EeDd][+-]?\d+)?[ij]?/)) return "number";
}
return stream.match(wordRegexp([ "nan", "NaN", "inf", "Inf" ])) ? "number" :stream.match(/^"([^"]|(""))*"/) ? "string" :stream.match(/^'([^']|(''))*'/) ? "string" :stream.match(keywords) ? "keyword" :stream.match(builtins) ? "builtin" :stream.match(identifiers) ? "variable" :stream.match(singleOperators) || stream.match(doubleOperators) ? "operator" :stream.match(singleDelimiters) || stream.match(doubleDelimiters) || stream.match(tripleDelimiters) ? null :stream.match(expressionEnd) ? (state.tokenize = tokenTranspose, 
null) :(stream.next(), "error");
}
var singleOperators = new RegExp("^[\\+\\-\\*/&|\\^~<>!@'\\\\]"), singleDelimiters = new RegExp("^[\\(\\[\\{\\},:=;]"), doubleOperators = new RegExp("^((==)|(~=)|(<=)|(>=)|(<<)|(>>)|(\\.[\\+\\-\\*/\\^\\\\]))"), doubleDelimiters = new RegExp("^((!=)|(\\+=)|(\\-=)|(\\*=)|(/=)|(&=)|(\\|=)|(\\^=))"), tripleDelimiters = new RegExp("^((>>=)|(<<=))"), expressionEnd = new RegExp("^[\\]\\)]"), identifiers = new RegExp("^[_A-Za-z][_A-Za-z0-9]*"), builtins = wordRegexp([ "error", "eval", "function", "abs", "acos", "atan", "asin", "cos", "cosh", "exp", "log", "prod", "sum", "log10", "max", "min", "sign", "sin", "sinh", "sqrt", "tan", "reshape", "break", "zeros", "default", "margin", "round", "ones", "rand", "syn", "ceil", "floor", "size", "clear", "zeros", "eye", "mean", "std", "cov", "det", "eig", "inv", "norm", "rank", "trace", "expm", "logm", "sqrtm", "linspace", "plot", "title", "xlabel", "ylabel", "legend", "text", "grid", "meshgrid", "mesh", "num2str", "fft", "ifft", "arrayfun", "cellfun", "input", "fliplr", "flipud", "ismember" ]), keywords = wordRegexp([ "return", "case", "switch", "else", "elseif", "end", "endif", "endfunction", "if", "otherwise", "do", "for", "while", "try", "catch", "classdef", "properties", "events", "methods", "global", "persistent", "endfor", "endwhile", "printf", "sprintf", "disp", "until", "continue", "pkg" ]);
return {
startState:function() {
return {
tokenize:tokenBase
};
},
token:function(stream, state) {
var style = state.tokenize(stream, state);
return ("number" === style || "variable" === style) && (state.tokenize = tokenTranspose), 
style;
}
};
}), CodeMirror.defineMIME("text/x-octave", "octave");
});