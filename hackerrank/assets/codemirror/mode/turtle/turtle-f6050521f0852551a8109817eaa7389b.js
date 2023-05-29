CodeMirror.defineMode("turtle", function(config) {
function wordRegexp(words) {
return new RegExp("^(?:" + words.join("|") + ")$", "i");
}
function tokenBase(stream, state) {
var ch = stream.next();
if (curPunc = null, "<" == ch && !stream.match(/^[\s\u00a0=]/, !1)) return stream.match(/^[^\s\u00a0>]*>?/), 
"atom";
if ('"' == ch || "'" == ch) return state.tokenize = tokenLiteral(ch), state.tokenize(stream, state);
if (/[{}\(\),\.;\[\]]/.test(ch)) return curPunc = ch, null;
if ("#" == ch) return stream.skipToEnd(), "comment";
if (operatorChars.test(ch)) return stream.eatWhile(operatorChars), null;
if (":" == ch) return "operator";
if (stream.eatWhile(/[_\w\d]/), ":" == stream.peek()) return "variable-3";
var word = stream.current();
return keywords.test(word) ? "meta" :ch >= "A" && "Z" >= ch ? "comment" :"keyword";
var word;
}
function tokenLiteral(quote) {
return function(stream, state) {
for (var ch, escaped = !1; null != (ch = stream.next()); ) {
if (ch == quote && !escaped) {
state.tokenize = tokenBase;
break;
}
escaped = !escaped && "\\" == ch;
}
return "string";
};
}
function pushContext(state, type, col) {
state.context = {
prev:state.context,
indent:state.indent,
col:col,
type:type
};
}
function popContext(state) {
state.indent = state.context.indent, state.context = state.context.prev;
}
var curPunc, indentUnit = config.indentUnit, keywords = (wordRegexp([]), wordRegexp([ "@prefix", "@base", "a" ])), operatorChars = /[*+\-<>=&|]/;
return {
startState:function() {
return {
tokenize:tokenBase,
context:null,
indent:0,
col:0
};
},
token:function(stream, state) {
if (stream.sol() && (state.context && null == state.context.align && (state.context.align = !1), 
state.indent = stream.indentation()), stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
if ("comment" != style && state.context && null == state.context.align && "pattern" != state.context.type && (state.context.align = !0), 
"(" == curPunc) pushContext(state, ")", stream.column()); else if ("[" == curPunc) pushContext(state, "]", stream.column()); else if ("{" == curPunc) pushContext(state, "}", stream.column()); else if (/[\]\}\)]/.test(curPunc)) {
for (;state.context && "pattern" == state.context.type; ) popContext(state);
state.context && curPunc == state.context.type && popContext(state);
} else "." == curPunc && state.context && "pattern" == state.context.type ? popContext(state) :/atom|string|variable/.test(style) && state.context && (/[\}\]]/.test(state.context.type) ? pushContext(state, "pattern", stream.column()) :"pattern" != state.context.type || state.context.align || (state.context.align = !0, 
state.context.col = stream.column()));
return style;
},
indent:function(state, textAfter) {
var firstChar = textAfter && textAfter.charAt(0), context = state.context;
if (/[\]\}]/.test(firstChar)) for (;context && "pattern" == context.type; ) context = context.prev;
var closing = context && firstChar == context.type;
return context ? "pattern" == context.type ? context.col :context.align ? context.col + (closing ? 0 :1) :context.indent + (closing ? 0 :indentUnit) :0;
}
};
}), CodeMirror.defineMIME("text/turtle", "turtle");