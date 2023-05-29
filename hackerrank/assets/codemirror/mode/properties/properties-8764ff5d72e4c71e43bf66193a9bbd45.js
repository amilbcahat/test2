// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("properties", function() {
return {
token:function(stream, state) {
var sol = stream.sol() || state.afterSection, eol = stream.eol();
if (state.afterSection = !1, sol && (state.nextMultiline ? (state.inMultiline = !0, 
state.nextMultiline = !1) :state.position = "def"), eol && !state.nextMultiline && (state.inMultiline = !1, 
state.position = "def"), sol) for (;stream.eatSpace(); ) ;
var ch = stream.next();
return !sol || "#" !== ch && "!" !== ch && ";" !== ch ? sol && "[" === ch ? (state.afterSection = !0, 
stream.skipTo("]"), stream.eat("]"), "header") :"=" === ch || ":" === ch ? (state.position = "quote", 
null) :("\\" === ch && "quote" === state.position && "u" !== stream.next() && (state.nextMultiline = !0), 
state.position) :(state.position = "comment", stream.skipToEnd(), "comment");
},
startState:function() {
return {
position:"def",
nextMultiline:!1,
inMultiline:!1,
afterSection:!1
};
}
};
}), CodeMirror.defineMIME("text/x-properties", "properties"), CodeMirror.defineMIME("text/x-ini", "properties");
});