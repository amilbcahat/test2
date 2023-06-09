// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("tiddlywiki", function() {
function chain(stream, state, f) {
return state.tokenize = f, f(stream, state);
}
function ret(tp, style, cont) {
return type = tp, content = cont, style;
}
function jsTokenBase(stream, state) {
var ch, sol = stream.sol();
if (state.block = !1, ch = stream.peek(), sol && /[<\/\*{}\-]/.test(ch)) {
if (stream.match(reCodeBlockStart)) return state.block = !0, chain(stream, state, twTokenCode);
if (stream.match(reBlockQuote)) return ret("quote", "quote");
if (stream.match(reWikiCommentStart) || stream.match(reWikiCommentStop)) return ret("code", "comment");
if (stream.match(reJsCodeStart) || stream.match(reJsCodeStop) || stream.match(reXmlCodeStart) || stream.match(reXmlCodeStop)) return ret("code", "comment");
if (stream.match(reHR)) return ret("hr", "hr");
}
if (ch = stream.next(), sol && /[\/\*!#;:>|]/.test(ch)) {
if ("!" == ch) return stream.skipToEnd(), ret("header", "header");
if ("*" == ch) return stream.eatWhile("*"), ret("list", "comment");
if ("#" == ch) return stream.eatWhile("#"), ret("list", "comment");
if (";" == ch) return stream.eatWhile(";"), ret("list", "comment");
if (":" == ch) return stream.eatWhile(":"), ret("list", "comment");
if (">" == ch) return stream.eatWhile(">"), ret("quote", "quote");
if ("|" == ch) return ret("table", "header");
}
if ("{" == ch && stream.match(/\{\{/)) return chain(stream, state, twTokenCode);
if (/[hf]/i.test(ch) && /[ti]/i.test(stream.peek()) && stream.match(/\b(ttps?|tp|ile):\/\/[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/i)) return ret("link", "link");
if ('"' == ch) return ret("string", "string");
if ("~" == ch) return ret("text", "brace");
if (/[\[\]]/.test(ch) && stream.peek() == ch) return stream.next(), ret("brace", "brace");
if ("@" == ch) return stream.eatWhile(isSpaceName), ret("link", "link");
if (/\d/.test(ch)) return stream.eatWhile(/\d/), ret("number", "number");
if ("/" == ch) {
if (stream.eat("%")) return chain(stream, state, twTokenComment);
if (stream.eat("/")) return chain(stream, state, twTokenEm);
}
if ("_" == ch && stream.eat("_")) return chain(stream, state, twTokenUnderline);
if ("-" == ch && stream.eat("-")) {
if (" " != stream.peek()) return chain(stream, state, twTokenStrike);
if (" " == stream.peek()) return ret("text", "brace");
}
if ("'" == ch && stream.eat("'")) return chain(stream, state, twTokenStrong);
if ("<" != ch) return ret(ch);
if (stream.eat("<")) return chain(stream, state, twTokenMacro);
stream.eatWhile(/[\w\$_]/);
var word = stream.current(), known = textwords.propertyIsEnumerable(word) && textwords[word];
return known ? ret(known.type, known.style, word) :ret("text", null, word);
}
function twTokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = jsTokenBase;
break;
}
maybeEnd = "%" == ch;
}
return ret("comment", "comment");
}
function twTokenStrong(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("'" == ch && maybeEnd) {
state.tokenize = jsTokenBase;
break;
}
maybeEnd = "'" == ch;
}
return ret("text", "strong");
}
function twTokenCode(stream, state) {
var ch, sb = state.block;
return sb && stream.current() ? ret("code", "comment") :!sb && stream.match(reUntilCodeStop) ? (state.tokenize = jsTokenBase, 
ret("code", "comment")) :sb && stream.sol() && stream.match(reCodeBlockStop) ? (state.tokenize = jsTokenBase, 
ret("code", "comment")) :(ch = stream.next(), sb ? ret("code", "comment") :ret("code", "comment"));
}
function twTokenEm(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = jsTokenBase;
break;
}
maybeEnd = "/" == ch;
}
return ret("text", "em");
}
function twTokenUnderline(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("_" == ch && maybeEnd) {
state.tokenize = jsTokenBase;
break;
}
maybeEnd = "_" == ch;
}
return ret("text", "underlined");
}
function twTokenStrike(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("-" == ch && maybeEnd) {
state.tokenize = jsTokenBase;
break;
}
maybeEnd = "-" == ch;
}
return ret("text", "strikethrough");
}
function twTokenMacro(stream, state) {
var ch, word, known;
return "<<" == stream.current() ? ret("brace", "macro") :(ch = stream.next()) ? ">" == ch && ">" == stream.peek() ? (stream.next(), 
state.tokenize = jsTokenBase, ret("brace", "macro")) :(stream.eatWhile(/[\w\$_]/), 
word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word], 
known ? ret(known.type, known.style, word) :ret("macro", null, word)) :(state.tokenize = jsTokenBase, 
ret(ch));
}
var type, content, textwords = {}, keywords = function() {
function kw(type) {
return {
type:type,
style:"macro"
};
}
return {
allTags:kw("allTags"),
closeAll:kw("closeAll"),
list:kw("list"),
newJournal:kw("newJournal"),
newTiddler:kw("newTiddler"),
permaview:kw("permaview"),
saveChanges:kw("saveChanges"),
search:kw("search"),
slider:kw("slider"),
tabs:kw("tabs"),
tag:kw("tag"),
tagging:kw("tagging"),
tags:kw("tags"),
tiddler:kw("tiddler"),
timeline:kw("timeline"),
today:kw("today"),
version:kw("version"),
option:kw("option"),
"with":kw("with"),
filter:kw("filter")
};
}(), isSpaceName = /[\w_\-]/i, reHR = /^\-\-\-\-+$/, reWikiCommentStart = /^\/\*\*\*$/, reWikiCommentStop = /^\*\*\*\/$/, reBlockQuote = /^<<<$/, reJsCodeStart = /^\/\/\{\{\{$/, reJsCodeStop = /^\/\/\}\}\}$/, reXmlCodeStart = /^<!--\{\{\{-->$/, reXmlCodeStop = /^<!--\}\}\}-->$/, reCodeBlockStart = /^\{\{\{$/, reCodeBlockStop = /^\}\}\}$/, reUntilCodeStop = /.*?\}\}\}/;
return {
startState:function() {
return {
tokenize:jsTokenBase,
indented:0,
level:0
};
},
token:function(stream, state) {
if (stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
return style;
},
electricChars:""
};
}), CodeMirror.defineMIME("text/x-tiddlywiki", "tiddlywiki");
});