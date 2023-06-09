// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("ntriples", function() {
function transitState(currState, c) {
var ret, currLocation = currState.location;
ret = currLocation == Location.PRE_SUBJECT && "<" == c ? Location.WRITING_SUB_URI :currLocation == Location.PRE_SUBJECT && "_" == c ? Location.WRITING_BNODE_URI :currLocation == Location.PRE_PRED && "<" == c ? Location.WRITING_PRED_URI :currLocation == Location.PRE_OBJ && "<" == c ? Location.WRITING_OBJ_URI :currLocation == Location.PRE_OBJ && "_" == c ? Location.WRITING_OBJ_BNODE :currLocation == Location.PRE_OBJ && '"' == c ? Location.WRITING_OBJ_LITERAL :currLocation == Location.WRITING_SUB_URI && ">" == c ? Location.PRE_PRED :currLocation == Location.WRITING_BNODE_URI && " " == c ? Location.PRE_PRED :currLocation == Location.WRITING_PRED_URI && ">" == c ? Location.PRE_OBJ :currLocation == Location.WRITING_OBJ_URI && ">" == c ? Location.POST_OBJ :currLocation == Location.WRITING_OBJ_BNODE && " " == c ? Location.POST_OBJ :currLocation == Location.WRITING_OBJ_LITERAL && '"' == c ? Location.POST_OBJ :currLocation == Location.WRITING_LIT_LANG && " " == c ? Location.POST_OBJ :currLocation == Location.WRITING_LIT_TYPE && ">" == c ? Location.POST_OBJ :currLocation == Location.WRITING_OBJ_LITERAL && "@" == c ? Location.WRITING_LIT_LANG :currLocation == Location.WRITING_OBJ_LITERAL && "^" == c ? Location.WRITING_LIT_TYPE :" " != c || currLocation != Location.PRE_SUBJECT && currLocation != Location.PRE_PRED && currLocation != Location.PRE_OBJ && currLocation != Location.POST_OBJ ? currLocation == Location.POST_OBJ && "." == c ? Location.PRE_SUBJECT :Location.ERROR :currLocation, 
currState.location = ret;
}
var Location = {
PRE_SUBJECT:0,
WRITING_SUB_URI:1,
WRITING_BNODE_URI:2,
PRE_PRED:3,
WRITING_PRED_URI:4,
PRE_OBJ:5,
WRITING_OBJ_URI:6,
WRITING_OBJ_BNODE:7,
WRITING_OBJ_LITERAL:8,
WRITING_LIT_LANG:9,
WRITING_LIT_TYPE:10,
POST_OBJ:11,
ERROR:12
};
return {
startState:function() {
return {
location:Location.PRE_SUBJECT,
uris:[],
anchors:[],
bnodes:[],
langs:[],
types:[]
};
},
token:function(stream, state) {
var ch = stream.next();
if ("<" == ch) {
transitState(state, ch);
var parsedURI = "";
return stream.eatWhile(function(c) {
return "#" != c && ">" != c ? (parsedURI += c, !0) :!1;
}), state.uris.push(parsedURI), stream.match("#", !1) ? "variable" :(stream.next(), 
transitState(state, ">"), "variable");
}
if ("#" == ch) {
var parsedAnchor = "";
return stream.eatWhile(function(c) {
return ">" != c && " " != c ? (parsedAnchor += c, !0) :!1;
}), state.anchors.push(parsedAnchor), "variable-2";
}
if (">" == ch) return transitState(state, ">"), "variable";
if ("_" == ch) {
transitState(state, ch);
var parsedBNode = "";
return stream.eatWhile(function(c) {
return " " != c ? (parsedBNode += c, !0) :!1;
}), state.bnodes.push(parsedBNode), stream.next(), transitState(state, " "), "builtin";
}
if ('"' == ch) return transitState(state, ch), stream.eatWhile(function(c) {
return '"' != c;
}), stream.next(), "@" != stream.peek() && "^" != stream.peek() && transitState(state, '"'), 
"string";
if ("@" == ch) {
transitState(state, "@");
var parsedLang = "";
return stream.eatWhile(function(c) {
return " " != c ? (parsedLang += c, !0) :!1;
}), state.langs.push(parsedLang), stream.next(), transitState(state, " "), "string-2";
}
if ("^" == ch) {
stream.next(), transitState(state, "^");
var parsedType = "";
return stream.eatWhile(function(c) {
return ">" != c ? (parsedType += c, !0) :!1;
}), state.types.push(parsedType), stream.next(), transitState(state, ">"), "variable";
}
" " == ch && transitState(state, ch), "." == ch && transitState(state, ch);
}
};
}), CodeMirror.defineMIME("text/n-triples", "ntriples");
});