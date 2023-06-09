// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("coffeescript", function(conf) {
function wordRegexp(words) {
return new RegExp("^((" + words.join(")|(") + "))\\b");
}
function tokenBase(stream, state) {
if (stream.sol()) {
null === state.scope.align && (state.scope.align = !1);
var scopeOffset = state.scope.offset;
if (stream.eatSpace()) {
var lineOffset = stream.indentation();
return lineOffset > scopeOffset && "coffee" == state.scope.type ? "indent" :scopeOffset > lineOffset ? "dedent" :null;
}
scopeOffset > 0 && dedent(stream, state);
}
if (stream.eatSpace()) return null;
var ch = stream.peek();
if (stream.match("####")) return stream.skipToEnd(), "comment";
if (stream.match("###")) return state.tokenize = longComment, state.tokenize(stream, state);
if ("#" === ch) return stream.skipToEnd(), "comment";
if (stream.match(/^-?[0-9\.]/, !1)) {
var floatLiteral = !1;
if (stream.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i) && (floatLiteral = !0), stream.match(/^-?\d+\.\d*/) && (floatLiteral = !0), 
stream.match(/^-?\.\d+/) && (floatLiteral = !0), floatLiteral) return "." == stream.peek() && stream.backUp(1), 
"number";
var intLiteral = !1;
if (stream.match(/^-?0x[0-9a-f]+/i) && (intLiteral = !0), stream.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/) && (intLiteral = !0), 
stream.match(/^-?0(?![\dx])/i) && (intLiteral = !0), intLiteral) return "number";
}
if (stream.match(stringPrefixes)) return state.tokenize = tokenFactory(stream.current(), !1, "string"), 
state.tokenize(stream, state);
if (stream.match(regexPrefixes)) {
if ("/" != stream.current() || stream.match(/^.*\//, !1)) return state.tokenize = tokenFactory(stream.current(), !0, "string-2"), 
state.tokenize(stream, state);
stream.backUp(1);
}
return stream.match(operators) || stream.match(wordOperators) ? "operator" :stream.match(delimiters) ? "punctuation" :stream.match(constants) ? "atom" :stream.match(keywords) ? "keyword" :stream.match(identifiers) ? "variable" :stream.match(properties) ? "property" :(stream.next(), 
ERRORCLASS);
}
function tokenFactory(delimiter, singleline, outclass) {
return function(stream, state) {
for (;!stream.eol(); ) if (stream.eatWhile(/[^'"\/\\]/), stream.eat("\\")) {
if (stream.next(), singleline && stream.eol()) return outclass;
} else {
if (stream.match(delimiter)) return state.tokenize = tokenBase, outclass;
stream.eat(/['"\/]/);
}
return singleline && (conf.mode.singleLineStringErrors ? outclass = ERRORCLASS :state.tokenize = tokenBase), 
outclass;
};
}
function longComment(stream, state) {
for (;!stream.eol(); ) {
if (stream.eatWhile(/[^#]/), stream.match("###")) {
state.tokenize = tokenBase;
break;
}
stream.eatWhile("#");
}
return "comment";
}
function indent(stream, state, type) {
type = type || "coffee";
for (var offset = 0, align = !1, alignOffset = null, scope = state.scope; scope; scope = scope.prev) if ("coffee" === scope.type) {
offset = scope.offset + conf.indentUnit;
break;
}
"coffee" !== type ? (align = null, alignOffset = stream.column() + stream.current().length) :state.scope.align && (state.scope.align = !1), 
state.scope = {
offset:offset,
type:type,
prev:state.scope,
align:align,
alignOffset:alignOffset
};
}
function dedent(stream, state) {
if (state.scope.prev) {
if ("coffee" === state.scope.type) {
for (var _indent = stream.indentation(), matched = !1, scope = state.scope; scope; scope = scope.prev) if (_indent === scope.offset) {
matched = !0;
break;
}
if (!matched) return !0;
for (;state.scope.prev && state.scope.offset !== _indent; ) state.scope = state.scope.prev;
return !1;
}
return state.scope = state.scope.prev, !1;
}
}
function tokenLexer(stream, state) {
var style = state.tokenize(stream, state), current = stream.current();
if ("." === current) return style = state.tokenize(stream, state), current = stream.current(), 
/^\.[\w$]+$/.test(current) ? "variable" :ERRORCLASS;
"return" === current && (state.dedent += 1), ("->" !== current && "=>" !== current || state.lambda || stream.peek()) && "indent" !== style || indent(stream, state);
var delimiter_index = "[({".indexOf(current);
if (-1 !== delimiter_index && indent(stream, state, "])}".slice(delimiter_index, delimiter_index + 1)), 
indentKeywords.exec(current) && indent(stream, state), "then" == current && dedent(stream, state), 
"dedent" === style && dedent(stream, state)) return ERRORCLASS;
if (delimiter_index = "])}".indexOf(current), -1 !== delimiter_index) {
for (;"coffee" == state.scope.type && state.scope.prev; ) state.scope = state.scope.prev;
state.scope.type == current && (state.scope = state.scope.prev);
}
return state.dedent > 0 && stream.eol() && "coffee" == state.scope.type && (state.scope.prev && (state.scope = state.scope.prev), 
state.dedent -= 1), style;
}
var ERRORCLASS = "error", operators = /^(?:->|=>|\+[+=]?|-[\-=]?|\*[\*=]?|\/[\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\|=?|\^=?|\~|!|\?)/, delimiters = /^(?:[()\[\]{},:`=;]|\.\.?\.?)/, identifiers = /^[_A-Za-z$][_A-Za-z$0-9]*/, properties = /^(@|this\.)[_A-Za-z$][_A-Za-z$0-9]*/, wordOperators = wordRegexp([ "and", "or", "not", "is", "isnt", "in", "instanceof", "typeof" ]), indentKeywords = [ "for", "while", "loop", "if", "unless", "else", "switch", "try", "catch", "finally", "class" ], commonKeywords = [ "break", "by", "continue", "debugger", "delete", "do", "in", "of", "new", "return", "then", "this", "throw", "when", "until" ], keywords = wordRegexp(indentKeywords.concat(commonKeywords));
indentKeywords = wordRegexp(indentKeywords);
var stringPrefixes = /^('{3}|\"{3}|['\"])/, regexPrefixes = /^(\/{3}|\/)/, commonConstants = [ "Infinity", "NaN", "undefined", "null", "true", "false", "on", "off", "yes", "no" ], constants = wordRegexp(commonConstants), external = {
startState:function(basecolumn) {
return {
tokenize:tokenBase,
scope:{
offset:basecolumn || 0,
type:"coffee",
prev:null,
align:!1
},
lastToken:null,
lambda:!1,
dedent:0
};
},
token:function(stream, state) {
var fillAlign = null === state.scope.align && state.scope;
fillAlign && stream.sol() && (fillAlign.align = !1);
var style = tokenLexer(stream, state);
return fillAlign && style && "comment" != style && (fillAlign.align = !0), state.lastToken = {
style:style,
content:stream.current()
}, stream.eol() && stream.lambda && (state.lambda = !1), style;
},
indent:function(state, text) {
if (state.tokenize != tokenBase) return 0;
var scope = state.scope, closer = text && "])}".indexOf(text.charAt(0)) > -1;
if (closer) for (;"coffee" == scope.type && scope.prev; ) scope = scope.prev;
var closes = closer && scope.type === text.charAt(0);
return scope.align ? scope.alignOffset - (closes ? 1 :0) :(closes ? scope.prev :scope).offset;
},
lineComment:"#",
fold:"indent"
};
return external;
}), CodeMirror.defineMIME("text/x-coffeescript", "coffeescript");
});