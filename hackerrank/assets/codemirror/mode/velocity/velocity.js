var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("velocity", function() {
function parseWords(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function chain(stream, state, f) {
return state.tokenize = f, f(stream, state);
}
function tokenBase(stream, state) {
var beforeParams = state.beforeParams;
state.beforeParams = !1;
var ch = stream.next();
if ("'" == ch && state.inParams) return state.lastTokenWasBuiltin = !1, chain(stream, state, tokenString(ch));
if ('"' != ch) {
if (/[\[\]{}\(\),;\.]/.test(ch)) return "(" == ch && beforeParams ? state.inParams = !0 :")" == ch && (state.inParams = !1, 
state.lastTokenWasBuiltin = !0), null;
if (/\d/.test(ch)) return state.lastTokenWasBuiltin = !1, stream.eatWhile(/[\w\.]/), 
"number";
if ("#" == ch && stream.eat("*")) return state.lastTokenWasBuiltin = !1, chain(stream, state, tokenComment);
if ("#" == ch && stream.match(/ *\[ *\[/)) return state.lastTokenWasBuiltin = !1, 
chain(stream, state, tokenUnparsed);
if ("#" == ch && stream.eat("#")) return state.lastTokenWasBuiltin = !1, stream.skipToEnd(), 
"comment";
if ("$" == ch) return stream.eatWhile(/[\w\d\$_\.{}]/), specials && specials.propertyIsEnumerable(stream.current()) ? "keyword" :(state.lastTokenWasBuiltin = !0, 
state.beforeParams = !0, "builtin");
if (isOperatorChar.test(ch)) return state.lastTokenWasBuiltin = !1, stream.eatWhile(isOperatorChar), 
"operator";
stream.eatWhile(/[\w\$_{}@]/);
var word = stream.current();
return keywords && keywords.propertyIsEnumerable(word) ? "keyword" :functions && functions.propertyIsEnumerable(word) || stream.current().match(/^#@?[a-z0-9_]+ *$/i) && "(" == stream.peek() && (!functions || !functions.propertyIsEnumerable(word.toLowerCase())) ? (state.beforeParams = !0, 
state.lastTokenWasBuiltin = !1, "keyword") :state.inString ? (state.lastTokenWasBuiltin = !1, 
"string") :stream.pos > word.length && "." == stream.string.charAt(stream.pos - word.length - 1) && state.lastTokenWasBuiltin ? "builtin" :(state.lastTokenWasBuiltin = !1, 
null);
}
return state.lastTokenWasBuiltin = !1, state.inString ? (state.inString = !1, "string") :state.inParams ? chain(stream, state, tokenString(ch)) :void 0;
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
if ('"' == quote && "$" == stream.peek() && !escaped) {
state.inString = !0, end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return end && (state.tokenize = tokenBase), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("#" == ch && maybeEnd) {
state.tokenize = tokenBase;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function tokenUnparsed(stream, state) {
for (var ch, maybeEnd = 0; ch = stream.next(); ) {
if ("#" == ch && 2 == maybeEnd) {
state.tokenize = tokenBase;
break;
}
"]" == ch ? maybeEnd++ :" " != ch && (maybeEnd = 0);
}
return "meta";
}
var keywords = parseWords("#end #else #break #stop #[[ #]] #{end} #{else} #{break} #{stop}"), functions = parseWords("#if #elseif #foreach #set #include #parse #macro #define #evaluate #{if} #{elseif} #{foreach} #{set} #{include} #{parse} #{macro} #{define} #{evaluate}"), specials = parseWords("$foreach.count $foreach.hasNext $foreach.first $foreach.last $foreach.topmost $foreach.parent.count $foreach.parent.hasNext $foreach.parent.first $foreach.parent.last $foreach.parent $velocityCount $!bodyContent $bodyContent"), isOperatorChar = /[+\-*&%=<>!?:\/|]/;
return {
startState:function() {
return {
tokenize:tokenBase,
beforeParams:!1,
inParams:!1,
inString:!1,
lastTokenWasBuiltin:!1
};
},
token:function(stream, state) {
return stream.eatSpace() ? null :state.tokenize(stream, state);
},
blockCommentStart:"#*",
blockCommentEnd:"*#",
lineComment:"##",
fold:"velocity"
};
}), CodeMirror.defineMIME("text/velocity", "velocity");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 