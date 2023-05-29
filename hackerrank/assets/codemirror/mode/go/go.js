var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("go", function(config) {
function tokenBase(stream, state) {
var ch = stream.next();
if ('"' == ch || "'" == ch || "`" == ch) return state.tokenize = tokenString(ch), 
state.tokenize(stream, state);
if (/[\d\.]/.test(ch)) return "." == ch ? stream.match(/^[0-9]+([eE][\-+]?[0-9]+)?/) :"0" == ch ? stream.match(/^[xX][0-9a-fA-F]+/) || stream.match(/^0[0-7]+/) :stream.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/), 
"number";
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return curPunc = ch, null;
if ("/" == ch) {
if (stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
}
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_]/);
var cur = stream.current();
return keywords.propertyIsEnumerable(cur) ? (("case" == cur || "default" == cur) && (curPunc = "case"), 
"keyword") :atoms.propertyIsEnumerable(cur) ? "atom" :"variable";
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return (end || !escaped && "`" != quote) && (state.tokenize = tokenBase), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = tokenBase;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function Context(indented, column, type, align, prev) {
this.indented = indented, this.column = column, this.type = type, this.align = align, 
this.prev = prev;
}
function pushContext(state, col, type) {
return state.context = new Context(state.indented, col, type, null, state.context);
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
var curPunc, indentUnit = config.indentUnit, keywords = {
"break":!0,
"case":!0,
chan:!0,
"const":!0,
"continue":!0,
"default":!0,
defer:!0,
"else":!0,
fallthrough:!0,
"for":!0,
func:!0,
go:!0,
"goto":!0,
"if":!0,
"import":!0,
"interface":!0,
map:!0,
"package":!0,
range:!0,
"return":!0,
select:!0,
struct:!0,
"switch":!0,
type:!0,
"var":!0,
bool:!0,
"byte":!0,
complex64:!0,
complex128:!0,
float32:!0,
float64:!0,
int8:!0,
int16:!0,
int32:!0,
int64:!0,
string:!0,
uint8:!0,
uint16:!0,
uint32:!0,
uint64:!0,
"int":!0,
uint:!0,
uintptr:!0
}, atoms = {
"true":!0,
"false":!0,
iota:!0,
nil:!0,
append:!0,
cap:!0,
close:!0,
complex:!0,
copy:!0,
imag:!0,
len:!0,
make:!0,
"new":!0,
panic:!0,
print:!0,
println:!0,
real:!0,
recover:!0
}, isOperatorChar = /[+\-*&^%:=<>!|\/]/;
return {
startState:function(basecolumn) {
return {
tokenize:null,
context:new Context((basecolumn || 0) - indentUnit, 0, "top", !1),
indented:0,
startOfLine:!0
};
},
token:function(stream, state) {
var ctx = state.context;
if (stream.sol() && (null == ctx.align && (ctx.align = !1), state.indented = stream.indentation(), 
state.startOfLine = !0, "case" == ctx.type && (ctx.type = "}")), stream.eatSpace()) return null;
curPunc = null;
var style = (state.tokenize || tokenBase)(stream, state);
return "comment" == style ? style :(null == ctx.align && (ctx.align = !0), "{" == curPunc ? pushContext(state, stream.column(), "}") :"[" == curPunc ? pushContext(state, stream.column(), "]") :"(" == curPunc ? pushContext(state, stream.column(), ")") :"case" == curPunc ? ctx.type = "case" :"}" == curPunc && "}" == ctx.type ? ctx = popContext(state) :curPunc == ctx.type && popContext(state), 
state.startOfLine = !1, style);
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase && null != state.tokenize) return 0;
var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
if ("case" == ctx.type && /^(?:case|default)\b/.test(textAfter)) return state.context.type = "}", 
ctx.indented;
var closing = firstChar == ctx.type;
return ctx.align ? ctx.column + (closing ? 0 :1) :ctx.indented + (closing ? 0 :indentUnit);
},
electricChars:"{}):",
fold:"brace",
blockCommentStart:"/*",
blockCommentEnd:"*/",
lineComment:"//"
};
}), CodeMirror.defineMIME("text/x-go", "go");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 