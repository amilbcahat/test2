var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../htmlmixed/htmlmixed"), require("../ruby/ruby")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../htmlmixed/htmlmixed", "../ruby/ruby" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("haml", function(config) {
function rubyInQuote(endQuote) {
return function(stream, state) {
var ch = stream.peek();
return ch == endQuote && 1 == state.rubyState.tokenize.length ? (stream.next(), 
state.tokenize = html, "closeAttributeTag") :ruby(stream, state);
};
}
function ruby(stream, state) {
return stream.match("-#") ? (stream.skipToEnd(), "comment") :rubyMode.token(stream, state.rubyState);
}
function html(stream, state) {
var ch = stream.peek();
if ("comment" == state.previousToken.style && state.indented > state.previousToken.indented) return stream.skipToEnd(), 
"commentLine";
if (state.startOfLine) {
if ("!" == ch && stream.match("!!")) return stream.skipToEnd(), "tag";
if (stream.match(/^%[\w:#\.]+=/)) return state.tokenize = ruby, "hamlTag";
if (stream.match(/^%[\w:]+/)) return "hamlTag";
if ("/" == ch) return stream.skipToEnd(), "comment";
}
if ((state.startOfLine || "hamlTag" == state.previousToken.style) && ("#" == ch || "." == ch)) return stream.match(/[\w-#\.]*/), 
"hamlAttribute";
if (state.startOfLine && !stream.match("-->", !1) && ("=" == ch || "-" == ch)) return state.tokenize = ruby, 
state.tokenize(stream, state);
if ("hamlTag" == state.previousToken.style || "closeAttributeTag" == state.previousToken.style || "hamlAttribute" == state.previousToken.style) {
if ("(" == ch) return state.tokenize = rubyInQuote(")"), state.tokenize(stream, state);
if ("{" == ch) return state.tokenize = rubyInQuote("}"), state.tokenize(stream, state);
}
return htmlMode.token(stream, state.htmlState);
}
var htmlMode = CodeMirror.getMode(config, {
name:"htmlmixed"
}), rubyMode = CodeMirror.getMode(config, "ruby");
return {
startState:function() {
var htmlState = htmlMode.startState(), rubyState = rubyMode.startState();
return {
htmlState:htmlState,
rubyState:rubyState,
indented:0,
previousToken:{
style:null,
indented:0
},
tokenize:html
};
},
copyState:function(state) {
return {
htmlState:CodeMirror.copyState(htmlMode, state.htmlState),
rubyState:CodeMirror.copyState(rubyMode, state.rubyState),
indented:state.indented,
previousToken:state.previousToken,
tokenize:state.tokenize
};
},
token:function(stream, state) {
if (stream.sol() && (state.indented = stream.indentation(), state.startOfLine = !0), 
stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
if (state.startOfLine = !1, style && "commentLine" != style && (state.previousToken = {
style:style,
indented:state.indented
}), stream.eol() && state.tokenize == ruby) {
stream.backUp(1);
var ch = stream.peek();
stream.next(), ch && "," != ch && (state.tokenize = html);
}
return "hamlTag" == style ? style = "tag" :"commentLine" == style ? style = "comment" :"hamlAttribute" == style ? style = "attribute" :"closeAttributeTag" == style && (style = null), 
style;
}
};
}, "htmlmixed", "ruby"), CodeMirror.defineMIME("text/x-haml", "haml");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 