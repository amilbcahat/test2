var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("q", function(config) {
function buildRE(w) {
return new RegExp("^(" + w.join("|") + ")$");
}
function tokenBase(stream, state) {
var sol = stream.sol(), c = stream.next();
if (curPunc = null, sol) {
if ("/" == c) return (state.tokenize = tokenLineComment)(stream, state);
if ("\\" == c) return stream.eol() || /\s/.test(stream.peek()) ? (stream.skipToEnd(), 
/^\\\s*$/.test(stream.current()) ? (state.tokenize = tokenCommentToEOF)(stream, state) :state.tokenize = tokenBase, 
"comment") :(state.tokenize = tokenBase, "builtin");
}
if (/\s/.test(c)) return "/" == stream.peek() ? (stream.skipToEnd(), "comment") :"whitespace";
if ('"' == c) return (state.tokenize = tokenString)(stream, state);
if ("`" == c) return stream.eatWhile(/[A-Z|a-z|\d|_|:|\/|\.]/), "symbol";
if ("." == c && /\d/.test(stream.peek()) || /\d/.test(c)) {
var t = null;
return stream.backUp(1), stream.match(/^\d{4}\.\d{2}(m|\.\d{2}([D|T](\d{2}(:\d{2}(:\d{2}(\.\d{1,9})?)?)?)?)?)/) || stream.match(/^\d+D(\d{2}(:\d{2}(:\d{2}(\.\d{1,9})?)?)?)/) || stream.match(/^\d{2}:\d{2}(:\d{2}(\.\d{1,9})?)?/) || stream.match(/^\d+[ptuv]{1}/) ? t = "temporal" :(stream.match(/^0[NwW]{1}/) || stream.match(/^0x[\d|a-f|A-F]*/) || stream.match(/^[0|1]+[b]{1}/) || stream.match(/^\d+[chijn]{1}/) || stream.match(/-?\d*(\.\d*)?(e[+\-]?\d+)?(e|f)?/)) && (t = "number"), 
!t || (c = stream.peek()) && !E.test(c) ? (stream.next(), "error") :t;
}
return /[A-Z|a-z]|\./.test(c) ? (stream.eatWhile(/[A-Z|a-z|\.|_|\d]/), keywords.test(stream.current()) ? "keyword" :"variable") :/[|/&^!+:\\\-*%$=~#;@><\.,?_\']/.test(c) ? null :/[{}\(\[\]\)]/.test(c) ? null :"error";
}
function tokenLineComment(stream, state) {
return stream.skipToEnd(), /\/\s*$/.test(stream.current()) ? (state.tokenize = tokenBlockComment)(stream, state) :state.tokenize = tokenBase, 
"comment";
}
function tokenBlockComment(stream, state) {
var f = stream.sol() && "\\" == stream.peek();
return stream.skipToEnd(), f && /^\\\s*$/.test(stream.current()) && (state.tokenize = tokenBase), 
"comment";
}
function tokenCommentToEOF(stream) {
return stream.skipToEnd(), "comment";
}
function tokenString(stream, state) {
for (var next, escaped = !1, end = !1; next = stream.next(); ) {
if ('"' == next && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return end && (state.tokenize = tokenBase), "string";
}
function pushContext(state, type, col) {
state.context = {
prev:state.context,
indent:state.indent,
col:col,
type:type
};
}
function popContext(state) {
state.indent = state.context.indent, state.context = state.context.prev;
}
var curPunc, indentUnit = config.indentUnit, keywords = buildRE([ "abs", "acos", "aj", "aj0", "all", "and", "any", "asc", "asin", "asof", "atan", "attr", "avg", "avgs", "bin", "by", "ceiling", "cols", "cor", "cos", "count", "cov", "cross", "csv", "cut", "delete", "deltas", "desc", "dev", "differ", "distinct", "div", "do", "each", "ej", "enlist", "eval", "except", "exec", "exit", "exp", "fby", "fills", "first", "fkeys", "flip", "floor", "from", "get", "getenv", "group", "gtime", "hclose", "hcount", "hdel", "hopen", "hsym", "iasc", "idesc", "if", "ij", "in", "insert", "inter", "inv", "key", "keys", "last", "like", "list", "lj", "load", "log", "lower", "lsq", "ltime", "ltrim", "mavg", "max", "maxs", "mcount", "md5", "mdev", "med", "meta", "min", "mins", "mmax", "mmin", "mmu", "mod", "msum", "neg", "next", "not", "null", "or", "over", "parse", "peach", "pj", "plist", "prd", "prds", "prev", "prior", "rand", "rank", "ratios", "raze", "read0", "read1", "reciprocal", "reverse", "rload", "rotate", "rsave", "rtrim", "save", "scan", "select", "set", "setenv", "show", "signum", "sin", "sqrt", "ss", "ssr", "string", "sublist", "sum", "sums", "sv", "system", "tables", "tan", "til", "trim", "txf", "type", "uj", "ungroup", "union", "update", "upper", "upsert", "value", "var", "view", "views", "vs", "wavg", "where", "where", "while", "within", "wj", "wj1", "wsum", "xasc", "xbar", "xcol", "xcols", "xdesc", "xexp", "xgroup", "xkey", "xlog", "xprev", "xrank" ]), E = /[|/&^!+:\\\-*%$=~#;@><,?_\'\"\[\(\]\)\s{}]/;
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
stream.sol() && (state.context && null == state.context.align && (state.context.align = !1), 
state.indent = stream.indentation());
var style = state.tokenize(stream, state);
if ("comment" != style && state.context && null == state.context.align && "pattern" != state.context.type && (state.context.align = !0), 
"(" == curPunc) pushContext(state, ")", stream.column()); else if ("[" == curPunc) pushContext(state, "]", stream.column()); else if ("{" == curPunc) pushContext(state, "}", stream.column()); else if (/[\]\}\)]/.test(curPunc)) {
for (;state.context && "pattern" == state.context.type; ) popContext(state);
state.context && curPunc == state.context.type && popContext(state);
} else "." == curPunc && state.context && "pattern" == state.context.type ? popContext(state) :/atom|string|variable/.test(style) && state.context && (/[\}\]]/.test(state.context.type) ? pushContext(state, "pattern", stream.column()) :"pattern" != state.context.type || state.context.align || (state.context.align = !0, 
state.context.col = stream.column()));
return style;
},
indent:function(state, textAfter) {
var firstChar = textAfter && textAfter.charAt(0), context = state.context;
if (/[\]\}]/.test(firstChar)) for (;context && "pattern" == context.type; ) context = context.prev;
var closing = context && firstChar == context.type;
return context ? "pattern" == context.type ? context.col :context.align ? context.col + (closing ? 0 :1) :context.indent + (closing ? 0 :indentUnit) :0;
}
};
}), CodeMirror.defineMIME("text/x-q", "q");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 