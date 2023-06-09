var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("vb", function(conf, parserConf) {
function wordRegexp(words) {
return new RegExp("^((" + words.join(")|(") + "))\\b", "i");
}
function indent(_stream, state) {
state.currentIndent++;
}
function dedent(_stream, state) {
state.currentIndent--;
}
function tokenBase(stream, state) {
if (stream.eatSpace()) return null;
var ch = stream.peek();
if ("'" === ch) return stream.skipToEnd(), "comment";
if (stream.match(/^((&H)|(&O))?[0-9\.a-f]/i, !1)) {
var floatLiteral = !1;
if (stream.match(/^\d*\.\d+F?/i) ? floatLiteral = !0 :stream.match(/^\d+\.\d*F?/) ? floatLiteral = !0 :stream.match(/^\.\d+F?/) && (floatLiteral = !0), 
floatLiteral) return stream.eat(/J/i), "number";
var intLiteral = !1;
if (stream.match(/^&H[0-9a-f]+/i) ? intLiteral = !0 :stream.match(/^&O[0-7]+/i) ? intLiteral = !0 :stream.match(/^[1-9]\d*F?/) ? (stream.eat(/J/i), 
intLiteral = !0) :stream.match(/^0(?![\dx])/i) && (intLiteral = !0), intLiteral) return stream.eat(/L/i), 
"number";
}
return stream.match(stringPrefixes) ? (state.tokenize = tokenStringFactory(stream.current()), 
state.tokenize(stream, state)) :stream.match(tripleDelimiters) || stream.match(doubleDelimiters) ? null :stream.match(doubleOperators) || stream.match(singleOperators) || stream.match(wordOperators) ? "operator" :stream.match(singleDelimiters) ? null :stream.match(doOpening) ? (indent(stream, state), 
state.doInCurrentLine = !0, "keyword") :stream.match(opening) ? (state.doInCurrentLine ? state.doInCurrentLine = !1 :indent(stream, state), 
"keyword") :stream.match(middle) ? "keyword" :stream.match(doubleClosing) ? (dedent(stream, state), 
dedent(stream, state), "keyword") :stream.match(closing) ? (dedent(stream, state), 
"keyword") :stream.match(types) ? "keyword" :stream.match(keywords) ? "keyword" :stream.match(identifiers) ? "variable" :(stream.next(), 
ERRORCLASS);
}
function tokenStringFactory(delimiter) {
var singleline = 1 == delimiter.length, OUTCLASS = "string";
return function(stream, state) {
for (;!stream.eol(); ) {
if (stream.eatWhile(/[^'"]/), stream.match(delimiter)) return state.tokenize = tokenBase, 
OUTCLASS;
stream.eat(/['"]/);
}
if (singleline) {
if (parserConf.singleLineStringErrors) return ERRORCLASS;
state.tokenize = tokenBase;
}
return OUTCLASS;
};
}
function tokenLexer(stream, state) {
var style = state.tokenize(stream, state), current = stream.current();
if ("." === current) return style = state.tokenize(stream, state), current = stream.current(), 
"variable" === style ? "variable" :ERRORCLASS;
var delimiter_index = "[({".indexOf(current);
return -1 !== delimiter_index && indent(stream, state), "dedent" === indentInfo && dedent(stream, state) ? ERRORCLASS :(delimiter_index = "])}".indexOf(current), 
-1 !== delimiter_index && dedent(stream, state) ? ERRORCLASS :style);
}
var ERRORCLASS = "error", singleOperators = new RegExp("^[\\+\\-\\*/%&\\\\|\\^~<>!]"), singleDelimiters = new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"), doubleOperators = new RegExp("^((==)|(<>)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"), doubleDelimiters = new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"), tripleDelimiters = new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"), identifiers = new RegExp("^[_A-Za-z][_A-Za-z0-9]*"), openingKeywords = [ "class", "module", "sub", "enum", "select", "while", "if", "function", "get", "set", "property", "try" ], middleKeywords = [ "else", "elseif", "case", "catch" ], endKeywords = [ "next", "loop" ], wordOperators = wordRegexp([ "and", "or", "not", "xor", "in" ]), commonkeywords = [ "as", "dim", "break", "continue", "optional", "then", "until", "goto", "byval", "byref", "new", "handles", "property", "return", "const", "private", "protected", "friend", "public", "shared", "static", "true", "false" ], commontypes = [ "integer", "string", "double", "decimal", "boolean", "short", "char", "float", "single" ], keywords = wordRegexp(commonkeywords), types = wordRegexp(commontypes), stringPrefixes = '"', opening = wordRegexp(openingKeywords), middle = wordRegexp(middleKeywords), closing = wordRegexp(endKeywords), doubleClosing = wordRegexp([ "end" ]), doOpening = wordRegexp([ "do" ]), indentInfo = null, external = {
electricChars:"dDpPtTfFeE ",
startState:function() {
return {
tokenize:tokenBase,
lastToken:null,
currentIndent:0,
nextLineIndent:0,
doInCurrentLine:!1
};
},
token:function(stream, state) {
stream.sol() && (state.currentIndent += state.nextLineIndent, state.nextLineIndent = 0, 
state.doInCurrentLine = 0);
var style = tokenLexer(stream, state);
return state.lastToken = {
style:style,
content:stream.current()
}, style;
},
indent:function(state, textAfter) {
var trueText = textAfter.replace(/^\s+|\s+$/g, "");
return trueText.match(closing) || trueText.match(doubleClosing) || trueText.match(middle) ? conf.indentUnit * (state.currentIndent - 1) :state.currentIndent < 0 ? 0 :state.currentIndent * conf.indentUnit;
}
};
return external;
}), CodeMirror.defineMIME("text/x-vb", "vb");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 