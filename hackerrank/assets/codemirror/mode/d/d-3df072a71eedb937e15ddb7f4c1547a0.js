// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
CodeMirror.defineMode("d", function(config, parserConfig) {
function tokenBase(stream, state) {
var ch = stream.next();
if (hooks[ch]) {
var result = hooks[ch](stream, state);
if (result !== !1) return result;
}
if ('"' == ch || "'" == ch || "`" == ch) return state.tokenize = tokenString(ch), 
state.tokenize(stream, state);
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return curPunc = ch, null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), "number";
if ("/" == ch) {
if (stream.eat("+")) return state.tokenize = tokenComment, tokenNestedComment(stream, state);
if (stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
}
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_]/);
var cur = stream.current();
return keywords.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"keyword") :builtin.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"builtin") :atoms.propertyIsEnumerable(cur) ? "atom" :"variable";
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return (end || !escaped && !multiLineStrings) && (state.tokenize = null), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = null;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function tokenNestedComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = null;
break;
}
maybeEnd = "+" == ch;
}
return "comment";
}
function Context(indented, column, type, align, prev) {
this.indented = indented, this.column = column, this.type = type, this.align = align, 
this.prev = prev;
}
function pushContext(state, col, type) {
var indent = state.indented;
return state.context && "statement" == state.context.type && (indent = state.context.indented), 
state.context = new Context(indent, col, type, null, state.context);
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
var curPunc, indentUnit = config.indentUnit, statementIndentUnit = parserConfig.statementIndentUnit || indentUnit, keywords = parserConfig.keywords || {}, builtin = parserConfig.builtin || {}, blockKeywords = parserConfig.blockKeywords || {}, atoms = parserConfig.atoms || {}, hooks = parserConfig.hooks || {}, multiLineStrings = parserConfig.multiLineStrings, isOperatorChar = /[+\-*&%=<>!?|\/]/;
return {
startState:function(basecolumn) {
return {
tokenize:null,
context:new Context((basecolumn || 0) - indentUnit, 0, "top", !1),
indented:0,
startOfLine:!0
};
},
token:function(stream, state) {
var ctx = state.context;
if (stream.sol() && (null == ctx.align && (ctx.align = !1), state.indented = stream.indentation(), 
state.startOfLine = !0), stream.eatSpace()) return null;
curPunc = null;
var style = (state.tokenize || tokenBase)(stream, state);
if ("comment" == style || "meta" == style) return style;
if (null == ctx.align && (ctx.align = !0), ";" != curPunc && ":" != curPunc && "," != curPunc || "statement" != ctx.type) if ("{" == curPunc) pushContext(state, stream.column(), "}"); else if ("[" == curPunc) pushContext(state, stream.column(), "]"); else if ("(" == curPunc) pushContext(state, stream.column(), ")"); else if ("}" == curPunc) {
for (;"statement" == ctx.type; ) ctx = popContext(state);
for ("}" == ctx.type && (ctx = popContext(state)); "statement" == ctx.type; ) ctx = popContext(state);
} else curPunc == ctx.type ? popContext(state) :(("}" == ctx.type || "top" == ctx.type) && ";" != curPunc || "statement" == ctx.type && "newstatement" == curPunc) && pushContext(state, stream.column(), "statement"); else popContext(state);
return state.startOfLine = !1, style;
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase && null != state.tokenize) return CodeMirror.Pass;
var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
"statement" == ctx.type && "}" == firstChar && (ctx = ctx.prev);
var closing = firstChar == ctx.type;
return "statement" == ctx.type ? ctx.indented + ("{" == firstChar ? 0 :statementIndentUnit) :ctx.align ? ctx.column + (closing ? 0 :1) :ctx.indented + (closing ? 0 :indentUnit);
},
electricChars:"{}"
};
});
var blockKeywords = "body catch class do else enum for foreach foreach_reverse if in interface mixin out scope struct switch try union unittest version while with";
CodeMirror.defineMIME("text/x-d", {
name:"d",
keywords:words("abstract alias align asm assert auto break case cast cdouble cent cfloat const continue debug default delegate delete deprecated export extern final finally function goto immutable import inout invariant is lazy macro module new nothrow override package pragma private protected public pure ref return shared short static super synchronized template this throw typedef typeid typeof volatile __FILE__ __LINE__ __gshared __traits __vector __parameters " + blockKeywords),
blockKeywords:words(blockKeywords),
builtin:words("bool byte char creal dchar double float idouble ifloat int ireal long real short ubyte ucent uint ulong ushort wchar wstring void size_t sizediff_t"),
atoms:words("exit failure success true false null"),
hooks:{
"@":function(stream) {
return stream.eatWhile(/[\w\$_]/), "meta";
}
}
});
});