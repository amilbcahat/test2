// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../htmlmixed/htmlmixed"), require("../../addon/mode/overlay")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../htmlmixed/htmlmixed", "../../addon/mode/overlay" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("django:inner", function() {
function tokenBase(stream, state) {
stream.eatWhile(/[^\{]/);
var ch = stream.next();
return "{" == ch && (ch = stream.eat(/\{|%|#/)) ? (state.tokenize = inTag(ch), "tag") :void 0;
}
function inTag(close) {
return "{" == close && (close = "}"), function(stream, state) {
var ch = stream.next();
return ch == close && stream.eat("}") ? (state.tokenize = tokenBase, "tag") :stream.match(keywords) ? "keyword" :"#" == close ? "comment" :"string";
};
}
var keywords = [ "block", "endblock", "for", "endfor", "in", "true", "false", "loop", "none", "self", "super", "if", "endif", "as", "not", "and", "else", "import", "with", "endwith", "without", "context", "ifequal", "endifequal", "ifnotequal", "endifnotequal", "extends", "include", "load", "length", "comment", "endcomment", "empty" ];
return keywords = new RegExp("^((" + keywords.join(")|(") + "))\\b"), {
startState:function() {
return {
tokenize:tokenBase
};
},
token:function(stream, state) {
return state.tokenize(stream, state);
}
};
}), CodeMirror.defineMode("django", function(config) {
var htmlBase = CodeMirror.getMode(config, "text/html"), djangoInner = CodeMirror.getMode(config, "django:inner");
return CodeMirror.overlayMode(htmlBase, djangoInner);
}), CodeMirror.defineMIME("text/x-django", "django");
});