var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("http", function() {
function failFirstLine(stream, state) {
return stream.skipToEnd(), state.cur = header, "error";
}
function start(stream, state) {
return stream.match(/^HTTP\/\d\.\d/) ? (state.cur = responseStatusCode, "keyword") :stream.match(/^[A-Z]+/) && /[ \t]/.test(stream.peek()) ? (state.cur = requestPath, 
"keyword") :failFirstLine(stream, state);
}
function responseStatusCode(stream, state) {
var code = stream.match(/^\d+/);
if (!code) return failFirstLine(stream, state);
state.cur = responseStatusText;
var status = Number(code[0]);
return status >= 100 && 200 > status ? "positive informational" :status >= 200 && 300 > status ? "positive success" :status >= 300 && 400 > status ? "positive redirect" :status >= 400 && 500 > status ? "negative client-error" :status >= 500 && 600 > status ? "negative server-error" :"error";
}
function responseStatusText(stream, state) {
return stream.skipToEnd(), state.cur = header, null;
}
function requestPath(stream, state) {
return stream.eatWhile(/\S/), state.cur = requestProtocol, "string-2";
}
function requestProtocol(stream, state) {
return stream.match(/^HTTP\/\d\.\d$/) ? (state.cur = header, "keyword") :failFirstLine(stream, state);
}
function header(stream) {
return stream.sol() && !stream.eat(/[ \t]/) ? stream.match(/^.*?:/) ? "atom" :(stream.skipToEnd(), 
"error") :(stream.skipToEnd(), "string");
}
function body(stream) {
return stream.skipToEnd(), null;
}
return {
token:function(stream, state) {
var cur = state.cur;
return cur != header && cur != body && stream.eatSpace() ? null :cur(stream, state);
},
blankLine:function(state) {
state.cur = body;
},
startState:function() {
return {
cur:start
};
}
};
}), CodeMirror.defineMIME("message/http", "http");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 