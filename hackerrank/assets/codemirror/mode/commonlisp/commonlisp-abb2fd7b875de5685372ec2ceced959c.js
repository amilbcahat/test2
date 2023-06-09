CodeMirror.defineMode("commonlisp", function(config) {
function readSym(stream) {
for (var ch; ch = stream.next(); ) if ("\\" == ch) stream.next(); else if (!symbol.test(ch)) {
stream.backUp(1);
break;
}
return stream.current();
}
function base(stream, state) {
if (stream.eatSpace()) return type = "ws", null;
if (stream.match(numLiteral)) return "number";
var ch = stream.next();
if ("\\" == ch && (ch = stream.next()), '"' == ch) return (state.tokenize = inString)(stream, state);
if ("(" == ch) return type = "open", "bracket";
if (")" == ch || "]" == ch) return type = "close", "bracket";
if (";" == ch) return stream.skipToEnd(), type = "ws", "comment";
if (/['`,@]/.test(ch)) return null;
if ("|" == ch) return stream.skipTo("|") ? (stream.next(), "symbol") :(stream.skipToEnd(), 
"error");
if ("#" == ch) {
var ch = stream.next();
return "[" == ch ? (type = "open", "bracket") :/[+\-=\.']/.test(ch) ? null :/\d/.test(ch) && stream.match(/^\d*#/) ? null :"|" == ch ? (state.tokenize = inComment)(stream, state) :":" == ch ? (readSym(stream), 
"meta") :"error";
}
var name = readSym(stream);
return "." == name ? null :(type = "symbol", "nil" == name || "t" == name ? "atom" :":" == name.charAt(0) ? "keyword" :"&" == name.charAt(0) ? "variable-2" :"variable");
}
function inString(stream, state) {
for (var next, escaped = !1; next = stream.next(); ) {
if ('"' == next && !escaped) {
state.tokenize = base;
break;
}
escaped = !escaped && "\\" == next;
}
return "string";
}
function inComment(stream, state) {
for (var next, last; next = stream.next(); ) {
if ("#" == next && "|" == last) {
state.tokenize = base;
break;
}
last = next;
}
return type = "ws", "comment";
}
var type, assumeBody = /^with|^def|^do|^prog|case$|^cond$|bind$|when$|unless$/, numLiteral = /^(?:[+\-]?(?:\d+|\d*\.\d+)(?:[efd][+\-]?\d+)?|[+\-]?\d+(?:\/[+\-]?\d+)?|#b[+\-]?[01]+|#o[+\-]?[0-7]+|#x[+\-]?[\da-f]+)/, symbol = /[^\s'`,@()\[\]";]/;
return {
startState:function() {
return {
ctx:{
prev:null,
start:0,
indentTo:0
},
tokenize:base
};
},
token:function(stream, state) {
stream.sol() && "number" != typeof state.ctx.indentTo && (state.ctx.indentTo = state.ctx.start + 1), 
type = null;
var style = state.tokenize(stream, state);
return "ws" != type && (null == state.ctx.indentTo ? state.ctx.indentTo = "symbol" == type && assumeBody.test(stream.current()) ? state.ctx.start + config.indentUnit :"next" :"next" == state.ctx.indentTo && (state.ctx.indentTo = stream.column())), 
"open" == type ? state.ctx = {
prev:state.ctx,
start:stream.column(),
indentTo:null
} :"close" == type && (state.ctx = state.ctx.prev || state.ctx), style;
},
indent:function(state) {
var i = state.ctx.indentTo;
return "number" == typeof i ? i :state.ctx.start + 1;
},
lineComment:";;",
blockCommentStart:"#|",
blockCommentEnd:"|#"
};
}), CodeMirror.defineMIME("text/x-common-lisp", "commonlisp");