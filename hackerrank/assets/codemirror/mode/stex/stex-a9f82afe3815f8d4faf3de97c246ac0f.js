// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("stex", function() {
function pushCommand(state, command) {
state.cmdState.push(command);
}
function peekCommand(state) {
return state.cmdState.length > 0 ? state.cmdState[state.cmdState.length - 1] :null;
}
function popCommand(state) {
var plug = state.cmdState.pop();
plug && plug.closeBracket();
}
function getMostPowerful(state) {
for (var context = state.cmdState, i = context.length - 1; i >= 0; i--) {
var plug = context[i];
if ("DEFAULT" != plug.name) return plug;
}
return {
styleIdentifier:function() {
return null;
}
};
}
function addPluginPattern(pluginName, cmdStyle, styles) {
return function() {
this.name = pluginName, this.bracketNo = 0, this.style = cmdStyle, this.styles = styles, 
this.argument = null, this.styleIdentifier = function() {
return this.styles[this.bracketNo - 1] || null;
}, this.openBracket = function() {
return this.bracketNo++, "bracket";
}, this.closeBracket = function() {};
};
}
function setState(state, f) {
state.f = f;
}
function normal(source, state) {
var plug;
if (source.match(/^\\[a-zA-Z@]+/)) {
var cmdName = source.current().slice(1);
return plug = plugins[cmdName] || plugins.DEFAULT, plug = new plug(), pushCommand(state, plug), 
setState(state, beginParams), plug.style;
}
if (source.match(/^\\[$&%#{}_]/)) return "tag";
if (source.match(/^\\[,;!\/\\]/)) return "tag";
if (source.match("\\[")) return setState(state, function(source, state) {
return inMathMode(source, state, "\\]");
}), "keyword";
if (source.match("$$")) return setState(state, function(source, state) {
return inMathMode(source, state, "$$");
}), "keyword";
if (source.match("$")) return setState(state, function(source, state) {
return inMathMode(source, state, "$");
}), "keyword";
var ch = source.next();
return "%" == ch ? (source.eol() || setState(state, inCComment), "comment") :"}" == ch || "]" == ch ? (plug = peekCommand(state)) ? (plug.closeBracket(ch), 
setState(state, beginParams), "bracket") :"error" :"{" == ch || "[" == ch ? (plug = plugins.DEFAULT, 
plug = new plug(), pushCommand(state, plug), "bracket") :/\d/.test(ch) ? (source.eatWhile(/[\w.%]/), 
"atom") :(source.eatWhile(/[\w\-_]/), plug = getMostPowerful(state), "begin" == plug.name && (plug.argument = source.current()), 
plug.styleIdentifier());
}
function inCComment(source, state) {
return source.skipToEnd(), setState(state, normal), "comment";
}
function inMathMode(source, state, endModeSeq) {
if (source.eatSpace()) return null;
if (source.match(endModeSeq)) return setState(state, normal), "keyword";
if (source.match(/^\\[a-zA-Z@]+/)) return "tag";
if (source.match(/^[a-zA-Z]+/)) return "variable-2";
if (source.match(/^\\[$&%#{}_]/)) return "tag";
if (source.match(/^\\[,;!\/]/)) return "tag";
if (source.match(/^[\^_&]/)) return "tag";
if (source.match(/^[+\-<>|=,\/@!*:;'"`~#?]/)) return null;
if (source.match(/^(\d+\.\d*|\d*\.\d+|\d+)/)) return "number";
var ch = source.next();
return "{" == ch || "}" == ch || "[" == ch || "]" == ch || "(" == ch || ")" == ch ? "bracket" :"%" == ch ? (source.eol() || source.skipToEnd(), 
"comment") :"error";
}
function beginParams(source, state) {
var lastPlug, ch = source.peek();
return "{" == ch || "[" == ch ? (lastPlug = peekCommand(state), lastPlug.openBracket(ch), 
source.eat(ch), setState(state, normal), "bracket") :/[ \t\r]/.test(ch) ? (source.eat(ch), 
null) :(setState(state, normal), popCommand(state), normal(source, state));
}
var plugins = {};
return plugins.importmodule = addPluginPattern("importmodule", "tag", [ "string", "builtin" ]), 
plugins.documentclass = addPluginPattern("documentclass", "tag", [ "", "atom" ]), 
plugins.usepackage = addPluginPattern("usepackage", "tag", [ "atom" ]), plugins.begin = addPluginPattern("begin", "tag", [ "atom" ]), 
plugins.end = addPluginPattern("end", "tag", [ "atom" ]), plugins.DEFAULT = function() {
this.name = "DEFAULT", this.style = "tag", this.styleIdentifier = this.openBracket = this.closeBracket = function() {};
}, {
startState:function() {
return {
cmdState:[],
f:normal
};
},
copyState:function(s) {
return {
cmdState:s.cmdState.slice(),
f:s.f
};
},
token:function(stream, state) {
return state.f(stream, state);
}
};
}), CodeMirror.defineMIME("text/x-stex", "stex"), CodeMirror.defineMIME("text/x-latex", "stex");
});