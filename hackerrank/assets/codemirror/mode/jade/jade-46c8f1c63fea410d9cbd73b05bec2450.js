// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../javascript/javascript"), require("../css/css"), require("../htmlmixed/htmlmixed")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../javascript/javascript", "../css/css", "../htmlmixed/htmlmixed" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("jade", function(config) {
function State() {
this.javaScriptLine = !1, this.javaScriptLineExcludesColon = !1, this.javaScriptArguments = !1, 
this.javaScriptArgumentsDepth = 0, this.isInterpolating = !1, this.interpolationNesting = 0, 
this.jsState = jsMode.startState(), this.restOfLine = "", this.isIncludeFiltered = !1, 
this.isEach = !1, this.lastTag = "", this.scriptType = "", this.isAttrs = !1, this.attrsNest = [], 
this.inAttributeName = !0, this.attributeIsType = !1, this.attrValue = "", this.indentOf = 1/0, 
this.indentToken = "", this.innerMode = null, this.innerState = null, this.innerModeForLine = !1;
}
function javaScript(stream, state) {
if (stream.sol() && (state.javaScriptLine = !1, state.javaScriptLineExcludesColon = !1), 
state.javaScriptLine) {
if (state.javaScriptLineExcludesColon && ":" === stream.peek()) return state.javaScriptLine = !1, 
state.javaScriptLineExcludesColon = !1, void 0;
var tok = jsMode.token(stream, state.jsState);
return stream.eol() && (state.javaScriptLine = !1), tok || !0;
}
}
function javaScriptArguments(stream, state) {
if (state.javaScriptArguments) {
if (0 === state.javaScriptArgumentsDepth && "(" !== stream.peek()) return state.javaScriptArguments = !1, 
void 0;
if ("(" === stream.peek() ? state.javaScriptArgumentsDepth++ :")" === stream.peek() && state.javaScriptArgumentsDepth--, 
0 === state.javaScriptArgumentsDepth) return state.javaScriptArguments = !1, void 0;
var tok = jsMode.token(stream, state.jsState);
return tok || !0;
}
}
function yieldStatement(stream) {
return stream.match(/^yield\b/) ? "keyword" :void 0;
}
function doctype(stream) {
return stream.match(/^(?:doctype) *([^\n]+)?/) ? DOCTYPE :void 0;
}
function interpolation(stream, state) {
return stream.match("#{") ? (state.isInterpolating = !0, state.interpolationNesting = 0, 
"punctuation") :void 0;
}
function interpolationContinued(stream, state) {
if (state.isInterpolating) {
if ("}" === stream.peek()) {
if (state.interpolationNesting--, state.interpolationNesting < 0) return stream.next(), 
state.isInterpolating = !1, "puncutation";
} else "{" === stream.peek() && state.interpolationNesting++;
return jsMode.token(stream, state.jsState) || !0;
}
}
function caseStatement(stream, state) {
return stream.match(/^case\b/) ? (state.javaScriptLine = !0, KEYWORD) :void 0;
}
function when(stream, state) {
return stream.match(/^when\b/) ? (state.javaScriptLine = !0, state.javaScriptLineExcludesColon = !0, 
KEYWORD) :void 0;
}
function defaultStatement(stream) {
return stream.match(/^default\b/) ? KEYWORD :void 0;
}
function extendsStatement(stream, state) {
return stream.match(/^extends?\b/) ? (state.restOfLine = "string", KEYWORD) :void 0;
}
function append(stream, state) {
return stream.match(/^append\b/) ? (state.restOfLine = "variable", KEYWORD) :void 0;
}
function prepend(stream, state) {
return stream.match(/^prepend\b/) ? (state.restOfLine = "variable", KEYWORD) :void 0;
}
function block(stream, state) {
return stream.match(/^block\b *(?:(prepend|append)\b)?/) ? (state.restOfLine = "variable", 
KEYWORD) :void 0;
}
function include(stream, state) {
return stream.match(/^include\b/) ? (state.restOfLine = "string", KEYWORD) :void 0;
}
function includeFiltered(stream, state) {
return stream.match(/^include:([a-zA-Z0-9\-]+)/, !1) && stream.match("include") ? (state.isIncludeFiltered = !0, 
KEYWORD) :void 0;
}
function includeFilteredContinued(stream, state) {
if (state.isIncludeFiltered) {
var tok = filter(stream, state);
return state.isIncludeFiltered = !1, state.restOfLine = "string", tok;
}
}
function mixin(stream, state) {
return stream.match(/^mixin\b/) ? (state.javaScriptLine = !0, KEYWORD) :void 0;
}
function call(stream, state) {
return stream.match(/^\+([-\w]+)/) ? (stream.match(/^\( *[-\w]+ *=/, !1) || (state.javaScriptArguments = !0, 
state.javaScriptArgumentsDepth = 0), "variable") :stream.match(/^\+#{/, !1) ? (stream.next(), 
state.mixinCallAfter = !0, interpolation(stream, state)) :void 0;
}
function callArguments(stream, state) {
return state.mixinCallAfter ? (state.mixinCallAfter = !1, stream.match(/^\( *[-\w]+ *=/, !1) || (state.javaScriptArguments = !0, 
state.javaScriptArgumentsDepth = 0), !0) :void 0;
}
function conditional(stream, state) {
return stream.match(/^(if|unless|else if|else)\b/) ? (state.javaScriptLine = !0, 
KEYWORD) :void 0;
}
function each(stream, state) {
return stream.match(/^(- *)?(each|for)\b/) ? (state.isEach = !0, KEYWORD) :void 0;
}
function eachContinued(stream, state) {
if (state.isEach) {
if (stream.match(/^ in\b/)) return state.javaScriptLine = !0, state.isEach = !1, 
KEYWORD;
if (stream.sol() || stream.eol()) state.isEach = !1; else if (stream.next()) {
for (;!stream.match(/^ in\b/, !1) && stream.next(); ) ;
return "variable";
}
}
}
function whileStatement(stream, state) {
return stream.match(/^while\b/) ? (state.javaScriptLine = !0, KEYWORD) :void 0;
}
function tag(stream, state) {
var captures;
return (captures = stream.match(/^(\w(?:[-:\w]*\w)?)\/?/)) ? (state.lastTag = captures[1].toLowerCase(), 
"script" === state.lastTag && (state.scriptType = "application/javascript"), "tag") :void 0;
}
function filter(stream, state) {
if (stream.match(/^:([\w\-]+)/)) {
var innerMode;
return config && config.innerModes && (innerMode = config.innerModes(stream.current().substring(1))), 
innerMode || (innerMode = stream.current().substring(1)), "string" == typeof innerMode && (innerMode = CodeMirror.getMode(config, innerMode)), 
setInnerMode(stream, state, innerMode), "atom";
}
}
function code(stream, state) {
return stream.match(/^(!?=|-)/) ? (state.javaScriptLine = !0, "punctuation") :void 0;
}
function id(stream) {
return stream.match(/^#([\w-]+)/) ? ID :void 0;
}
function className(stream) {
return stream.match(/^\.([\w-]+)/) ? CLASS :void 0;
}
function attrs(stream, state) {
return "(" == stream.peek() ? (stream.next(), state.isAttrs = !0, state.attrsNest = [], 
state.inAttributeName = !0, state.attrValue = "", state.attributeIsType = !1, "punctuation") :void 0;
}
function attrsContinued(stream, state) {
if (state.isAttrs) {
if (ATTRS_NEST[stream.peek()] && state.attrsNest.push(ATTRS_NEST[stream.peek()]), 
state.attrsNest[state.attrsNest.length - 1] === stream.peek()) state.attrsNest.pop(); else if (stream.eat(")")) return state.isAttrs = !1, 
"punctuation";
if (state.inAttributeName && stream.match(/^[^=,\)!]+/)) return ("=" === stream.peek() || "!" === stream.peek()) && (state.inAttributeName = !1, 
state.jsState = jsMode.startState(), state.attributeIsType = "script" === state.lastTag && "type" === stream.current().trim().toLowerCase() ? !0 :!1), 
"attribute";
var tok = jsMode.token(stream, state.jsState);
if (state.attributeIsType && "string" === tok && (state.scriptType = stream.current().toString()), 
0 === state.attrsNest.length && ("string" === tok || "variable" === tok || "keyword" === tok)) try {
return Function("", "var x " + state.attrValue.replace(/,\s*$/, "").replace(/^!/, "")), 
state.inAttributeName = !0, state.attrValue = "", stream.backUp(stream.current().length), 
attrsContinued(stream, state);
} catch (ex) {}
return state.attrValue += stream.current(), tok || !0;
}
}
function attributesBlock(stream, state) {
return stream.match(/^&attributes\b/) ? (state.javaScriptArguments = !0, state.javaScriptArgumentsDepth = 0, 
"keyword") :void 0;
}
function indent(stream) {
return stream.sol() && stream.eatSpace() ? "indent" :void 0;
}
function comment(stream, state) {
return stream.match(/^ *\/\/(-)?([^\n]*)/) ? (state.indentOf = stream.indentation(), 
state.indentToken = "comment", "comment") :void 0;
}
function colon(stream) {
return stream.match(/^: */) ? "colon" :void 0;
}
function text(stream, state) {
return stream.match(/^(?:\| ?| )([^\n]+)/) ? "string" :stream.match(/^(<[^\n]*)/, !1) ? (setInnerMode(stream, state, "htmlmixed"), 
state.innerModeForLine = !0, innerMode(stream, state, !0)) :void 0;
}
function dot(stream, state) {
if (stream.eat(".")) {
var innerMode = null;
return "script" === state.lastTag && -1 != state.scriptType.toLowerCase().indexOf("javascript") ? innerMode = state.scriptType.toLowerCase().replace(/"|'/g, "") :"style" === state.lastTag && (innerMode = "css"), 
setInnerMode(stream, state, innerMode), "dot";
}
}
function fail(stream) {
return stream.next(), null;
}
function setInnerMode(stream, state, mode) {
mode = CodeMirror.mimeModes[mode] || mode, mode = config.innerModes ? config.innerModes(mode) || mode :mode, 
mode = CodeMirror.mimeModes[mode] || mode, mode = CodeMirror.getMode(config, mode), 
state.indentOf = stream.indentation(), mode && "null" !== mode.name ? state.innerMode = mode :state.indentToken = "string";
}
function innerMode(stream, state, force) {
return stream.indentation() > state.indentOf || state.innerModeForLine && !stream.sol() || force ? state.innerMode ? (state.innerState || (state.innerState = state.innerMode.startState ? state.innerMode.startState(stream.indentation()) :{}), 
stream.hideFirstChars(state.indentOf + 2, function() {
return state.innerMode.token(stream, state.innerState) || !0;
})) :(stream.skipToEnd(), state.indentToken) :(stream.sol() && (state.indentOf = 1/0, 
state.indentToken = null, state.innerMode = null, state.innerState = null), void 0);
}
function restOfLine(stream, state) {
if (stream.sol() && (state.restOfLine = ""), state.restOfLine) {
stream.skipToEnd();
var tok = state.restOfLine;
return state.restOfLine = "", tok;
}
}
function startState() {
return new State();
}
function copyState(state) {
return state.copy();
}
function nextToken(stream, state) {
var tok = innerMode(stream, state) || restOfLine(stream, state) || interpolationContinued(stream, state) || includeFilteredContinued(stream, state) || eachContinued(stream, state) || attrsContinued(stream, state) || javaScript(stream, state) || javaScriptArguments(stream, state) || callArguments(stream, state) || yieldStatement(stream, state) || doctype(stream, state) || interpolation(stream, state) || caseStatement(stream, state) || when(stream, state) || defaultStatement(stream, state) || extendsStatement(stream, state) || append(stream, state) || prepend(stream, state) || block(stream, state) || include(stream, state) || includeFiltered(stream, state) || mixin(stream, state) || call(stream, state) || conditional(stream, state) || each(stream, state) || whileStatement(stream, state) || tag(stream, state) || filter(stream, state) || code(stream, state) || id(stream, state) || className(stream, state) || attrs(stream, state) || attributesBlock(stream, state) || indent(stream, state) || text(stream, state) || comment(stream, state) || colon(stream, state) || dot(stream, state) || fail(stream, state);
return tok === !0 ? null :tok;
}
var KEYWORD = "keyword", DOCTYPE = "meta", ID = "builtin", CLASS = "qualifier", ATTRS_NEST = {
"{":"}",
"(":")",
"[":"]"
}, jsMode = CodeMirror.getMode(config, "javascript");
return State.prototype.copy = function() {
var res = new State();
return res.javaScriptLine = this.javaScriptLine, res.javaScriptLineExcludesColon = this.javaScriptLineExcludesColon, 
res.javaScriptArguments = this.javaScriptArguments, res.javaScriptArgumentsDepth = this.javaScriptArgumentsDepth, 
res.isInterpolating = this.isInterpolating, res.interpolationNesting = this.intpolationNesting, 
res.jsState = CodeMirror.copyState(jsMode, this.jsState), res.innerMode = this.innerMode, 
this.innerMode && this.innerState && (res.innerState = CodeMirror.copyState(this.innerMode, this.innerState)), 
res.restOfLine = this.restOfLine, res.isIncludeFiltered = this.isIncludeFiltered, 
res.isEach = this.isEach, res.lastTag = this.lastTag, res.scriptType = this.scriptType, 
res.isAttrs = this.isAttrs, res.attrsNest = this.attrsNest.slice(), res.inAttributeName = this.inAttributeName, 
res.attributeIsType = this.attributeIsType, res.attrValue = this.attrValue, res.indentOf = this.indentOf, 
res.indentToken = this.indentToken, res.innerModeForLine = this.innerModeForLine, 
res;
}, {
startState:startState,
copyState:copyState,
token:nextToken
};
}), CodeMirror.defineMIME("text/x-jade", "jade");
});