// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("tiki", function(config) {
function inBlock(style, terminator, returnTokenizer) {
return function(stream, state) {
for (;!stream.eol(); ) {
if (stream.match(terminator)) {
state.tokenize = inText;
break;
}
stream.next();
}
return returnTokenizer && (state.tokenize = returnTokenizer), style;
};
}
function inLine(style) {
return function(stream, state) {
for (;!stream.eol(); ) stream.next();
return state.tokenize = inText, style;
};
}
function inText(stream, state) {
function chain(parser) {
return state.tokenize = parser, parser(stream, state);
}
var sol = stream.sol(), ch = stream.next();
switch (ch) {
case "{":
stream.eat("/"), stream.eatSpace();
for (var c, tagName = ""; c = stream.eat(/[^\s\u00a0=\"\'\/?(}]/); ) tagName += c;
return state.tokenize = inPlugin, "tag";

case "_":
if (stream.eat("_")) return chain(inBlock("strong", "__", inText));
break;

case "'":
if (stream.eat("'")) return chain(inBlock("em", "''", inText));
break;

case "(":
if (stream.eat("(")) return chain(inBlock("variable-2", "))", inText));
break;

case "[":
return chain(inBlock("variable-3", "]", inText));

case "|":
if (stream.eat("|")) return chain(inBlock("comment", "||"));
break;

case "-":
if (stream.eat("=")) return chain(inBlock("header string", "=-", inText));
if (stream.eat("-")) return chain(inBlock("error tw-deleted", "--", inText));
break;

case "=":
if (stream.match("==")) return chain(inBlock("tw-underline", "===", inText));
break;

case ":":
if (stream.eat(":")) return chain(inBlock("comment", "::"));
break;

case "^":
return chain(inBlock("tw-box", "^"));

case "~":
if (stream.match("np~")) return chain(inBlock("meta", "~/np~"));
}
if (sol) switch (ch) {
case "!":
return stream.match("!!!!!") ? chain(inLine("header string")) :stream.match("!!!!") ? chain(inLine("header string")) :stream.match("!!!") ? chain(inLine("header string")) :stream.match("!!") ? chain(inLine("header string")) :chain(inLine("header string"));

case "*":
case "#":
case "+":
return chain(inLine("tw-listitem bracket"));
}
return null;
}
function inPlugin(stream, state) {
var ch = stream.next(), peek = stream.peek();
return "}" == ch ? (state.tokenize = inText, "tag") :"(" == ch || ")" == ch ? "bracket" :"=" == ch ? (type = "equals", 
">" == peek && (ch = stream.next(), peek = stream.peek()), /[\'\"]/.test(peek) || (state.tokenize = inAttributeNoQuote()), 
"operator") :/[\'\"]/.test(ch) ? (state.tokenize = inAttribute(ch), state.tokenize(stream, state)) :(stream.eatWhile(/[^\s\u00a0=\"\'\/?]/), 
"keyword");
}
function inAttribute(quote) {
return function(stream, state) {
for (;!stream.eol(); ) if (stream.next() == quote) {
state.tokenize = inPlugin;
break;
}
return "string";
};
}
function inAttributeNoQuote() {
return function(stream, state) {
for (;!stream.eol(); ) {
var ch = stream.next(), peek = stream.peek();
if (" " == ch || "," == ch || /[ )}]/.test(peek)) {
state.tokenize = inPlugin;
break;
}
}
return "string";
};
}
function pass() {
for (var i = arguments.length - 1; i >= 0; i--) curState.cc.push(arguments[i]);
}
function cont() {
return pass.apply(null, arguments), !0;
}
function pushContext(pluginName, startOfLine) {
var noIndent = curState.context && curState.context.noIndent;
curState.context = {
prev:curState.context,
pluginName:pluginName,
indent:curState.indented,
startOfLine:startOfLine,
noIndent:noIndent
};
}
function popContext() {
curState.context && (curState.context = curState.context.prev);
}
function element(type) {
if ("openPlugin" == type) return curState.pluginName = pluginName, cont(attributes, endplugin(curState.startOfLine));
if ("closePlugin" == type) {
var err = !1;
return curState.context ? (err = curState.context.pluginName != pluginName, popContext()) :err = !0, 
err && (setStyle = "error"), cont(endcloseplugin(err));
}
return "string" == type ? (curState.context && "!cdata" == curState.context.name || pushContext("!cdata"), 
curState.tokenize == inText && popContext(), cont()) :cont();
}
function endplugin(startOfLine) {
return function(type) {
return "selfclosePlugin" == type || "endPlugin" == type ? cont() :"endPlugin" == type ? (pushContext(curState.pluginName, startOfLine), 
cont()) :cont();
};
}
function endcloseplugin(err) {
return function(type) {
return err && (setStyle = "error"), "endPlugin" == type ? cont() :pass();
};
}
function attributes(type) {
return "keyword" == type ? (setStyle = "attribute", cont(attributes)) :"equals" == type ? cont(attvalue, attributes) :pass();
}
function attvalue(type) {
return "keyword" == type ? (setStyle = "string", cont()) :"string" == type ? cont(attvaluemaybe) :pass();
}
function attvaluemaybe(type) {
return "string" == type ? cont(attvaluemaybe) :pass();
}
var pluginName, type, curState, setStyle, indentUnit = config.indentUnit;
return {
startState:function() {
return {
tokenize:inText,
cc:[],
indented:0,
startOfLine:!0,
pluginName:null,
context:null
};
},
token:function(stream, state) {
if (stream.sol() && (state.startOfLine = !0, state.indented = stream.indentation()), 
stream.eatSpace()) return null;
setStyle = type = pluginName = null;
var style = state.tokenize(stream, state);
if ((style || type) && "comment" != style) for (curState = state; ;) {
var comb = state.cc.pop() || element;
if (comb(type || style)) break;
}
return state.startOfLine = !1, setStyle || style;
},
indent:function(state, textAfter) {
var context = state.context;
if (context && context.noIndent) return 0;
for (context && /^{\//.test(textAfter) && (context = context.prev); context && !context.startOfLine; ) context = context.prev;
return context ? context.indent + indentUnit :0;
},
electricChars:"/"
};
}), CodeMirror.defineMIME("text/tiki", "tiki");
});