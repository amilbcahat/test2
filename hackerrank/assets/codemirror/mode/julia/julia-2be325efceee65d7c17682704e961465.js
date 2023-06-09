// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("julia", function(_conf, parserConf) {
function wordRegexp(words) {
return new RegExp("^((" + words.join(")|(") + "))\\b");
}
function in_array(state) {
var ch = cur_scope(state);
return "[" == ch || "{" == ch ? !0 :!1;
}
function cur_scope(state) {
return 0 == state.scopes.length ? null :state.scopes[state.scopes.length - 1];
}
function tokenBase(stream, state) {
var leaving_expr = state.leaving_expr;
if (stream.sol() && (leaving_expr = !1), state.leaving_expr = !1, leaving_expr && stream.match(/^'+/)) return "operator";
if (stream.match(/^\.{2,3}/)) return "operator";
if (stream.eatSpace()) return null;
var ch = stream.peek();
if ("#" === ch) return stream.skipToEnd(), "comment";
"[" === ch && state.scopes.push("["), "{" === ch && state.scopes.push("{");
var scope = cur_scope(state);
"[" === scope && "]" === ch && (state.scopes.pop(), state.leaving_expr = !0), "{" === scope && "}" === ch && (state.scopes.pop(), 
state.leaving_expr = !0), ")" === ch && (state.leaving_expr = !0);
var match;
if (!in_array(state) && (match = stream.match(openers, !1)) && state.scopes.push(match), 
!in_array(state) && stream.match(closers, !1) && state.scopes.pop(), in_array(state) && stream.match(/^end/)) return "number";
if (stream.match(/^=>/)) return "operator";
if (stream.match(/^[0-9\.]/, !1)) {
var imMatcher = RegExp(/^im\b/), floatLiteral = !1;
if (stream.match(/^\d*\.(?!\.)\d+([ef][\+\-]?\d+)?/i) && (floatLiteral = !0), stream.match(/^\d+\.(?!\.)\d*/) && (floatLiteral = !0), 
stream.match(/^\.\d+/) && (floatLiteral = !0), floatLiteral) return stream.match(imMatcher), 
state.leaving_expr = !0, "number";
var intLiteral = !1;
if (stream.match(/^0x[0-9a-f]+/i) && (intLiteral = !0), stream.match(/^0b[01]+/i) && (intLiteral = !0), 
stream.match(/^0o[0-7]+/i) && (intLiteral = !0), stream.match(/^[1-9]\d*(e[\+\-]?\d+)?/) && (intLiteral = !0), 
stream.match(/^0(?![\dx])/i) && (intLiteral = !0), intLiteral) return stream.match(imMatcher), 
state.leaving_expr = !0, "number";
}
return stream.match(/^(::)|(<:)/) ? "operator" :!leaving_expr && stream.match(symbol) ? "string" :stream.match(operators) ? "operator" :stream.match(stringPrefixes) ? (state.tokenize = tokenStringFactory(stream.current()), 
state.tokenize(stream, state)) :stream.match(macro) ? "meta" :stream.match(delimiters) ? null :stream.match(keywords) ? "keyword" :stream.match(builtins) ? "builtin" :stream.match(identifiers) ? (state.leaving_expr = !0, 
"variable") :(stream.next(), ERRORCLASS);
}
function tokenStringFactory(delimiter) {
function tokenString(stream, state) {
for (;!stream.eol(); ) if (stream.eatWhile(/[^'"\\]/), stream.eat("\\")) {
if (stream.next(), singleline && stream.eol()) return OUTCLASS;
} else {
if (stream.match(delimiter)) return state.tokenize = tokenBase, OUTCLASS;
stream.eat(/['"]/);
}
if (singleline) {
if (parserConf.singleLineStringErrors) return ERRORCLASS;
state.tokenize = tokenBase;
}
return OUTCLASS;
}
for (;"rub".indexOf(delimiter.charAt(0).toLowerCase()) >= 0; ) delimiter = delimiter.substr(1);
var singleline = 1 == delimiter.length, OUTCLASS = "string";
return tokenString.isString = !0, tokenString;
}
function tokenLexer(stream, state) {
indentInfo = null;
var style = state.tokenize(stream, state), current = stream.current();
return "." === current ? (style = stream.match(identifiers, !1) ? null :ERRORCLASS, 
null === style && "meta" === state.lastStyle && (style = "meta"), style) :style;
}
var ERRORCLASS = "error", operators = parserConf.operators || /^\.?[|&^\\%*+\-<>!=\/]=?|\?|~|:|\$|\.[<>]|<<=?|>>>?=?|\.[<>=]=|->?|\/\/|\bin\b/, delimiters = parserConf.delimiters || /^[;,()[\]{}]/, identifiers = parserConf.identifiers || /^[_A-Za-z][_A-Za-z0-9]*!*/, blockOpeners = [ "begin", "function", "type", "immutable", "let", "macro", "for", "while", "quote", "if", "else", "elseif", "try", "finally", "catch", "do" ], blockClosers = [ "end", "else", "elseif", "catch", "finally" ], keywordList = [ "if", "else", "elseif", "while", "for", "begin", "let", "end", "do", "try", "catch", "finally", "return", "break", "continue", "global", "local", "const", "export", "import", "importall", "using", "function", "macro", "module", "baremodule", "type", "immutable", "quote", "typealias", "abstract", "bitstype", "ccall" ], builtinList = [ "true", "false", "enumerate", "open", "close", "nothing", "NaN", "Inf", "print", "println", "Int", "Int8", "Uint8", "Int16", "Uint16", "Int32", "Uint32", "Int64", "Uint64", "Int128", "Uint128", "Bool", "Char", "Float16", "Float32", "Float64", "Array", "Vector", "Matrix", "String", "UTF8String", "ASCIIString", "error", "warn", "info", "@printf" ], stringPrefixes = /^(`|'|"{3}|([br]?"))/, keywords = wordRegexp(keywordList), builtins = wordRegexp(builtinList), openers = wordRegexp(blockOpeners), closers = wordRegexp(blockClosers), macro = /^@[_A-Za-z][_A-Za-z0-9]*/, symbol = /^:[_A-Za-z][_A-Za-z0-9]*/, indentInfo = null, external = {
startState:function() {
return {
tokenize:tokenBase,
scopes:[],
leaving_expr:!1
};
},
token:function(stream, state) {
var style = tokenLexer(stream, state);
return state.lastStyle = style, style;
},
indent:function(state, textAfter) {
var delta = 0;
return ("end" == textAfter || "]" == textAfter || "}" == textAfter || "else" == textAfter || "elseif" == textAfter || "catch" == textAfter || "finally" == textAfter) && (delta = -1), 
4 * (state.scopes.length + delta);
},
lineComment:"#",
fold:"indent",
electricChars:"edlsifyh]}"
};
return external;
}), CodeMirror.defineMIME("text/x-julia", "julia");
});