// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("pascal", function() {
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function tokenBase(stream, state) {
var ch = stream.next();
if ("#" == ch && state.startOfLine) return stream.skipToEnd(), "meta";
if ('"' == ch || "'" == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if ("(" == ch && stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), "number";
if ("/" == ch && stream.eat("/")) return stream.skipToEnd(), "comment";
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_]/);
var cur = stream.current();
return keywords.propertyIsEnumerable(cur) ? "keyword" :atoms.propertyIsEnumerable(cur) ? "atom" :"variable";
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
return (end || !escaped) && (state.tokenize = null), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if (")" == ch && maybeEnd) {
state.tokenize = null;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
var keywords = words("and array begin case const div do downto else end file for forward integer boolean char function goto if in label mod nil not of or packed procedure program record repeat set string then to type until var while with"), atoms = {
"null":!0
}, isOperatorChar = /[+\-*&%=<>!?|\/]/;
return {
startState:function() {
return {
tokenize:null
};
},
token:function(stream, state) {
if (stream.eatSpace()) return null;
var style = (state.tokenize || tokenBase)(stream, state);
return "comment" == style || "meta" == style ? style :style;
},
electricChars:"{}"
};
}), CodeMirror.defineMIME("text/x-pascal", "pascal");
});