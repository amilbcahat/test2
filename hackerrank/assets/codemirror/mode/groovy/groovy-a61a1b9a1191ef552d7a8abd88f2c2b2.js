var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("groovy", function(config) {
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function tokenBase(stream, state) {
var ch = stream.next();
if ('"' == ch || "'" == ch) return startString(ch, stream, state);
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return curPunc = ch, null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), stream.eat(/eE/) && (stream.eat(/\+\-/), 
stream.eatWhile(/\d/)), "number";
if ("/" == ch) {
if (stream.eat("*")) return state.tokenize.push(tokenComment), tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
if (expectExpression(state.lastToken)) return startString(ch, stream, state);
}
if ("-" == ch && stream.eat(">")) return curPunc = "->", null;
if (/[+\-*&%=<>!?|\/~]/.test(ch)) return stream.eatWhile(/[+\-*&%=<>|~]/), "operator";
if (stream.eatWhile(/[\w\$_]/), "@" == ch) return stream.eatWhile(/[\w\$_\.]/), 
"meta";
if ("." == state.lastToken) return "property";
if (stream.eat(":")) return curPunc = "proplabel", "property";
var cur = stream.current();
return atoms.propertyIsEnumerable(cur) ? "atom" :keywords.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"keyword") :"variable";
}
function startString(quote, stream, state) {
function t(stream, state) {
for (var next, escaped = !1, end = !tripleQuoted; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
if (!tripleQuoted) break;
if (stream.match(quote + quote)) {
end = !0;
break;
}
}
if ('"' == quote && "$" == next && !escaped && stream.eat("{")) return state.tokenize.push(tokenBaseUntilBrace()), 
"string";
escaped = !escaped && "\\" == next;
}
return end && state.tokenize.pop(), "string";
}
var tripleQuoted = !1;
if ("/" != quote && stream.eat(quote)) {
if (!stream.eat(quote)) return "string";
tripleQuoted = !0;
}
return state.tokenize.push(t), t(stream, state);
}
function tokenBaseUntilBrace() {
function t(stream, state) {
if ("}" == stream.peek()) {
if (depth--, 0 == depth) return state.tokenize.pop(), state.tokenize[state.tokenize.length - 1](stream, state);
} else "{" == stream.peek() && depth++;
return tokenBase(stream, state);
}
var depth = 1;
return t.isBase = !0, t;
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize.pop();
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function expectExpression(last) {
return !last || "operator" == last || "->" == last || /[\.\[\{\(,;:]/.test(last) || "newstatement" == last || "keyword" == last || "proplabel" == last;
}
function Context(indented, column, type, align, prev) {
this.indented = indented, this.column = column, this.type = type, this.align = align, 
this.prev = prev;
}
function pushContext(state, col, type) {
return state.context = new Context(state.indented, col, type, null, state.context);
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
var curPunc, keywords = words("abstract as assert boolean break byte case catch char class const continue def default do double else enum extends final finally float for goto if implements import in instanceof int interface long native new package private protected public return short static strictfp super switch synchronized threadsafe throw throws transient try void volatile while"), blockKeywords = words("catch class do else finally for if switch try while enum interface def"), atoms = words("null true false this");
return tokenBase.isBase = !0, {
startState:function(basecolumn) {
return {
tokenize:[ tokenBase ],
context:new Context((basecolumn || 0) - config.indentUnit, 0, "top", !1),
indented:0,
startOfLine:!0,
lastToken:null
};
},
token:function(stream, state) {
var ctx = state.context;
if (stream.sol() && (null == ctx.align && (ctx.align = !1), state.indented = stream.indentation(), 
state.startOfLine = !0, "statement" != ctx.type || expectExpression(state.lastToken) || (popContext(state), 
ctx = state.context)), stream.eatSpace()) return null;
curPunc = null;
var style = state.tokenize[state.tokenize.length - 1](stream, state);
if ("comment" == style) return style;
if (null == ctx.align && (ctx.align = !0), ";" != curPunc && ":" != curPunc || "statement" != ctx.type) if ("->" == curPunc && "statement" == ctx.type && "}" == ctx.prev.type) popContext(state), 
state.context.align = !1; else if ("{" == curPunc) pushContext(state, stream.column(), "}"); else if ("[" == curPunc) pushContext(state, stream.column(), "]"); else if ("(" == curPunc) pushContext(state, stream.column(), ")"); else if ("}" == curPunc) {
for (;"statement" == ctx.type; ) ctx = popContext(state);
for ("}" == ctx.type && (ctx = popContext(state)); "statement" == ctx.type; ) ctx = popContext(state);
} else curPunc == ctx.type ? popContext(state) :("}" == ctx.type || "top" == ctx.type || "statement" == ctx.type && "newstatement" == curPunc) && pushContext(state, stream.column(), "statement"); else popContext(state);
return state.startOfLine = !1, state.lastToken = curPunc || style, style;
},
indent:function(state, textAfter) {
if (!state.tokenize[state.tokenize.length - 1].isBase) return 0;
var firstChar = textAfter && textAfter.charAt(0), ctx = state.context;
"statement" != ctx.type || expectExpression(state.lastToken) || (ctx = ctx.prev);
var closing = firstChar == ctx.type;
return "statement" == ctx.type ? ctx.indented + ("{" == firstChar ? 0 :config.indentUnit) :ctx.align ? ctx.column + (closing ? 0 :1) :ctx.indented + (closing ? 0 :config.indentUnit);
},
electricChars:"{}",
fold:"brace"
};
}), CodeMirror.defineMIME("text/x-groovy", "groovy");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 