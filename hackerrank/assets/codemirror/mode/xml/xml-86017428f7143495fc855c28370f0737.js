// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("xml", function(config, parserConfig) {
function inText(stream, state) {
function chain(parser) {
return state.tokenize = parser, parser(stream, state);
}
var ch = stream.next();
if ("<" == ch) return stream.eat("!") ? stream.eat("[") ? stream.match("CDATA[") ? chain(inBlock("atom", "]]>")) :null :stream.match("--") ? chain(inBlock("comment", "-->")) :stream.match("DOCTYPE", !0, !0) ? (stream.eatWhile(/[\w\._\-]/), 
chain(doctype(1))) :null :stream.eat("?") ? (stream.eatWhile(/[\w\._\-]/), state.tokenize = inBlock("meta", "?>"), 
"meta") :(type = stream.eat("/") ? "closeTag" :"openTag", state.tokenize = inTag, 
"tag bracket");
if ("&" == ch) {
var ok;
return ok = stream.eat("#") ? stream.eat("x") ? stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";") :stream.eatWhile(/[\d]/) && stream.eat(";") :stream.eatWhile(/[\w\.\-:]/) && stream.eat(";"), 
ok ? "atom" :"error";
}
return stream.eatWhile(/[^&<]/), null;
}
function inTag(stream, state) {
var ch = stream.next();
if (">" == ch || "/" == ch && stream.eat(">")) return state.tokenize = inText, type = ">" == ch ? "endTag" :"selfcloseTag", 
"tag bracket";
if ("=" == ch) return type = "equals", null;
if ("<" == ch) {
state.tokenize = inText, state.state = baseState, state.tagName = state.tagStart = null;
var next = state.tokenize(stream, state);
return next ? next + " tag error" :"tag error";
}
return /[\'\"]/.test(ch) ? (state.tokenize = inAttribute(ch), state.stringStartCol = stream.column(), 
state.tokenize(stream, state)) :(stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), 
"word");
}
function inAttribute(quote) {
var closure = function(stream, state) {
for (;!stream.eol(); ) if (stream.next() == quote) {
state.tokenize = inTag;
break;
}
return "string";
};
return closure.isInAttribute = !0, closure;
}
function inBlock(style, terminator) {
return function(stream, state) {
for (;!stream.eol(); ) {
if (stream.match(terminator)) {
state.tokenize = inText;
break;
}
stream.next();
}
return style;
};
}
function doctype(depth) {
return function(stream, state) {
for (var ch; null != (ch = stream.next()); ) {
if ("<" == ch) return state.tokenize = doctype(depth + 1), state.tokenize(stream, state);
if (">" == ch) {
if (1 == depth) {
state.tokenize = inText;
break;
}
return state.tokenize = doctype(depth - 1), state.tokenize(stream, state);
}
}
return "meta";
};
}
function Context(state, tagName, startOfLine) {
this.prev = state.context, this.tagName = tagName, this.indent = state.indented, 
this.startOfLine = startOfLine, (Kludges.doNotIndent.hasOwnProperty(tagName) || state.context && state.context.noIndent) && (this.noIndent = !0);
}
function popContext(state) {
state.context && (state.context = state.context.prev);
}
function maybePopContext(state, nextTagName) {
for (var parentTagName; ;) {
if (!state.context) return;
if (parentTagName = state.context.tagName, !Kludges.contextGrabbers.hasOwnProperty(parentTagName) || !Kludges.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) return;
popContext(state);
}
}
function baseState(type, stream, state) {
return "openTag" == type ? (state.tagStart = stream.column(), tagNameState) :"closeTag" == type ? closeTagNameState :baseState;
}
function tagNameState(type, stream, state) {
return "word" == type ? (state.tagName = stream.current(), setStyle = "tag", attrState) :(setStyle = "error", 
tagNameState);
}
function closeTagNameState(type, stream, state) {
if ("word" == type) {
var tagName = stream.current();
return state.context && state.context.tagName != tagName && Kludges.implicitlyClosed.hasOwnProperty(state.context.tagName) && popContext(state), 
state.context && state.context.tagName == tagName ? (setStyle = "tag", closeState) :(setStyle = "tag error", 
closeStateErr);
}
return setStyle = "error", closeStateErr;
}
function closeState(type, _stream, state) {
return "endTag" != type ? (setStyle = "error", closeState) :(popContext(state), 
baseState);
}
function closeStateErr(type, stream, state) {
return setStyle = "error", closeState(type, stream, state);
}
function attrState(type, _stream, state) {
if ("word" == type) return setStyle = "attribute", attrEqState;
if ("endTag" == type || "selfcloseTag" == type) {
var tagName = state.tagName, tagStart = state.tagStart;
return state.tagName = state.tagStart = null, "selfcloseTag" == type || Kludges.autoSelfClosers.hasOwnProperty(tagName) ? maybePopContext(state, tagName) :(maybePopContext(state, tagName), 
state.context = new Context(state, tagName, tagStart == state.indented)), baseState;
}
return setStyle = "error", attrState;
}
function attrEqState(type, stream, state) {
return "equals" == type ? attrValueState :(Kludges.allowMissing || (setStyle = "error"), 
attrState(type, stream, state));
}
function attrValueState(type, stream, state) {
return "string" == type ? attrContinuedState :"word" == type && Kludges.allowUnquoted ? (setStyle = "string", 
attrState) :(setStyle = "error", attrState(type, stream, state));
}
function attrContinuedState(type, stream, state) {
return "string" == type ? attrContinuedState :attrState(type, stream, state);
}
var indentUnit = config.indentUnit, multilineTagIndentFactor = parserConfig.multilineTagIndentFactor || 1, multilineTagIndentPastTag = parserConfig.multilineTagIndentPastTag;
null == multilineTagIndentPastTag && (multilineTagIndentPastTag = !0);
var type, setStyle, Kludges = parserConfig.htmlMode ? {
autoSelfClosers:{
area:!0,
base:!0,
br:!0,
col:!0,
command:!0,
embed:!0,
frame:!0,
hr:!0,
img:!0,
input:!0,
keygen:!0,
link:!0,
meta:!0,
param:!0,
source:!0,
track:!0,
wbr:!0
},
implicitlyClosed:{
dd:!0,
li:!0,
optgroup:!0,
option:!0,
p:!0,
rp:!0,
rt:!0,
tbody:!0,
td:!0,
tfoot:!0,
th:!0,
tr:!0
},
contextGrabbers:{
dd:{
dd:!0,
dt:!0
},
dt:{
dd:!0,
dt:!0
},
li:{
li:!0
},
option:{
option:!0,
optgroup:!0
},
optgroup:{
optgroup:!0
},
p:{
address:!0,
article:!0,
aside:!0,
blockquote:!0,
dir:!0,
div:!0,
dl:!0,
fieldset:!0,
footer:!0,
form:!0,
h1:!0,
h2:!0,
h3:!0,
h4:!0,
h5:!0,
h6:!0,
header:!0,
hgroup:!0,
hr:!0,
menu:!0,
nav:!0,
ol:!0,
p:!0,
pre:!0,
section:!0,
table:!0,
ul:!0
},
rp:{
rp:!0,
rt:!0
},
rt:{
rp:!0,
rt:!0
},
tbody:{
tbody:!0,
tfoot:!0
},
td:{
td:!0,
th:!0
},
tfoot:{
tbody:!0
},
th:{
td:!0,
th:!0
},
thead:{
tbody:!0,
tfoot:!0
},
tr:{
tr:!0
}
},
doNotIndent:{
pre:!0
},
allowUnquoted:!0,
allowMissing:!0,
caseFold:!0
} :{
autoSelfClosers:{},
implicitlyClosed:{},
contextGrabbers:{},
doNotIndent:{},
allowUnquoted:!1,
allowMissing:!1,
caseFold:!1
}, alignCDATA = parserConfig.alignCDATA;
return {
startState:function() {
return {
tokenize:inText,
state:baseState,
indented:0,
tagName:null,
tagStart:null,
context:null
};
},
token:function(stream, state) {
if (!state.tagName && stream.sol() && (state.indented = stream.indentation()), stream.eatSpace()) return null;
type = null;
var style = state.tokenize(stream, state);
return (style || type) && "comment" != style && (setStyle = null, state.state = state.state(type || style, stream, state), 
setStyle && (style = "error" == setStyle ? style + " error" :setStyle)), style;
},
indent:function(state, textAfter, fullLine) {
var context = state.context;
if (state.tokenize.isInAttribute) return state.tagStart == state.indented ? state.stringStartCol + 1 :state.indented + indentUnit;
if (context && context.noIndent) return CodeMirror.Pass;
if (state.tokenize != inTag && state.tokenize != inText) return fullLine ? fullLine.match(/^(\s*)/)[0].length :0;
if (state.tagName) return multilineTagIndentPastTag ? state.tagStart + state.tagName.length + 2 :state.tagStart + indentUnit * multilineTagIndentFactor;
if (alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
if (tagAfter && tagAfter[1]) for (;context; ) {
if (context.tagName == tagAfter[2]) {
context = context.prev;
break;
}
if (!Kludges.implicitlyClosed.hasOwnProperty(context.tagName)) break;
context = context.prev;
} else if (tagAfter) for (;context; ) {
var grabbers = Kludges.contextGrabbers[context.tagName];
if (!grabbers || !grabbers.hasOwnProperty(tagAfter[2])) break;
context = context.prev;
}
for (;context && !context.startOfLine; ) context = context.prev;
return context ? context.indent + indentUnit :0;
},
electricInput:/<\/[\s\w:]+>$/,
blockCommentStart:"<!--",
blockCommentEnd:"-->",
configuration:parserConfig.htmlMode ? "html" :"xml",
helperType:parserConfig.htmlMode ? "html" :"xml"
};
}), CodeMirror.defineMIME("text/xml", "xml"), CodeMirror.defineMIME("application/xml", "xml"), 
CodeMirror.mimeModes.hasOwnProperty("text/html") || CodeMirror.defineMIME("text/html", {
name:"xml",
htmlMode:!0
});
});