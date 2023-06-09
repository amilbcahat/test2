var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
var wordRegexp = function(words) {
return new RegExp("^(?:" + words.join("|") + ")$", "i");
};
CodeMirror.defineMode("cypher", function(config) {
var curPunc, tokenBase = function(stream) {
var ch = stream.next(), curPunc = null;
if ('"' === ch || "'" === ch) return stream.match(/.+?["']/), "string";
if (/[{}\(\),\.;\[\]]/.test(ch)) return curPunc = ch, "node";
if ("/" === ch && stream.eat("/")) return stream.skipToEnd(), "comment";
if (operatorChars.test(ch)) return stream.eatWhile(operatorChars), null;
if (stream.eatWhile(/[_\w\d]/), stream.eat(":")) return stream.eatWhile(/[\w\d_\-]/), 
"atom";
var word = stream.current();
return funcs.test(word) ? "builtin" :preds.test(word) ? "def" :keywords.test(word) ? "keyword" :"variable";
}, pushContext = function(state, type, col) {
return state.context = {
prev:state.context,
indent:state.indent,
col:col,
type:type
};
}, popContext = function(state) {
return state.indent = state.context.indent, state.context = state.context.prev;
}, indentUnit = config.indentUnit, funcs = wordRegexp([ "abs", "acos", "allShortestPaths", "asin", "atan", "atan2", "avg", "ceil", "coalesce", "collect", "cos", "cot", "count", "degrees", "e", "endnode", "exp", "extract", "filter", "floor", "haversin", "head", "id", "labels", "last", "left", "length", "log", "log10", "lower", "ltrim", "max", "min", "node", "nodes", "percentileCont", "percentileDisc", "pi", "radians", "rand", "range", "reduce", "rel", "relationship", "relationships", "replace", "right", "round", "rtrim", "shortestPath", "sign", "sin", "split", "sqrt", "startnode", "stdev", "stdevp", "str", "substring", "sum", "tail", "tan", "timestamp", "toFloat", "toInt", "trim", "type", "upper" ]), preds = wordRegexp([ "all", "and", "any", "has", "in", "none", "not", "or", "single", "xor" ]), keywords = wordRegexp([ "as", "asc", "ascending", "assert", "by", "case", "commit", "constraint", "create", "csv", "cypher", "delete", "desc", "descending", "distinct", "drop", "else", "end", "false", "fieldterminator", "foreach", "from", "headers", "in", "index", "is", "limit", "load", "match", "merge", "null", "on", "optional", "order", "periodic", "remove", "return", "scan", "set", "skip", "start", "then", "true", "union", "unique", "unwind", "using", "when", "where", "with" ]), operatorChars = /[*+\-<>=&|~%^]/;
return {
startState:function() {
return {
tokenize:tokenBase,
context:null,
indent:0,
col:0
};
},
token:function(stream, state) {
if (stream.sol() && (state.context && null == state.context.align && (state.context.align = !1), 
state.indent = stream.indentation()), stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
if ("comment" !== style && state.context && null == state.context.align && "pattern" !== state.context.type && (state.context.align = !0), 
"(" === curPunc) pushContext(state, ")", stream.column()); else if ("[" === curPunc) pushContext(state, "]", stream.column()); else if ("{" === curPunc) pushContext(state, "}", stream.column()); else if (/[\]\}\)]/.test(curPunc)) {
for (;state.context && "pattern" === state.context.type; ) popContext(state);
state.context && curPunc === state.context.type && popContext(state);
} else "." === curPunc && state.context && "pattern" === state.context.type ? popContext(state) :/atom|string|variable/.test(style) && state.context && (/[\}\]]/.test(state.context.type) ? pushContext(state, "pattern", stream.column()) :"pattern" !== state.context.type || state.context.align || (state.context.align = !0, 
state.context.col = stream.column()));
return style;
},
indent:function(state, textAfter) {
var firstChar = textAfter && textAfter.charAt(0), context = state.context;
if (/[\]\}]/.test(firstChar)) for (;context && "pattern" === context.type; ) context = context.prev;
var closing = context && firstChar === context.type;
return context ? "keywords" === context.type ? CodeMirror.commands.newlineAndIndent :context.align ? context.col + (closing ? 0 :1) :context.indent + (closing ? 0 :indentUnit) :0;
}
};
}), CodeMirror.modeExtensions.cypher = {
autoFormatLineBreaks:function(text) {
for (var i, lines, reProcessedPortion, lines = text.split("\n"), reProcessedPortion = /\s+\b(return|where|order by|match|with|skip|limit|create|delete|set)\b\s/g, i = 0; i < lines.length; i++) lines[i] = lines[i].replace(reProcessedPortion, " \n$1 ").trim();
return lines.join("\n");
}
}, CodeMirror.defineMIME("application/x-cypher-query", "cypher");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 