CodeMirror.defineMode("dtd", function(config) {
function ret(style, tp) {
return type = tp, style;
}
function tokenBase(stream, state) {
var ch = stream.next();
if ("<" != ch || !stream.eat("!")) {
if ("<" == ch && stream.eat("?")) return state.tokenize = inBlock("meta", "?>"), 
ret("meta", ch);
if ("#" == ch && stream.eatWhile(/[\w]/)) return ret("atom", "tag");
if ("|" == ch) return ret("keyword", "seperator");
if (ch.match(/[\(\)\[\]\-\.,\+\?>]/)) return ret(null, ch);
if (ch.match(/[\[\]]/)) return ret("rule", ch);
if ('"' == ch || "'" == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if (stream.eatWhile(/[a-zA-Z\?\+\d]/)) {
var sc = stream.current();
return null !== sc.substr(sc.length - 1, sc.length).match(/\?|\+/) && stream.backUp(1), 
ret("tag", "tag");
}
return "%" == ch || "*" == ch ? ret("number", "number") :(stream.eatWhile(/[\w\\\-_%.{,]/), 
ret(null, null));
}
return stream.eatWhile(/[\-]/) ? (state.tokenize = tokenSGMLComment, tokenSGMLComment(stream, state)) :stream.eatWhile(/[\w]/) ? ret("keyword", "doindent") :void 0;
}
function tokenSGMLComment(stream, state) {
for (var ch, dashes = 0; null != (ch = stream.next()); ) {
if (dashes >= 2 && ">" == ch) {
state.tokenize = tokenBase;
break;
}
dashes = "-" == ch ? dashes + 1 :0;
}
return ret("comment", "comment");
}
function tokenString(quote) {
return function(stream, state) {
for (var ch, escaped = !1; null != (ch = stream.next()); ) {
if (ch == quote && !escaped) {
state.tokenize = tokenBase;
break;
}
escaped = !escaped && "\\" == ch;
}
return ret("string", "tag");
};
}
function inBlock(style, terminator) {
return function(stream, state) {
for (;!stream.eol(); ) {
if (stream.match(terminator)) {
state.tokenize = tokenBase;
break;
}
stream.next();
}
return style;
};
}
var type, indentUnit = config.indentUnit;
return {
startState:function(base) {
return {
tokenize:tokenBase,
baseIndent:base || 0,
stack:[]
};
},
token:function(stream, state) {
if (stream.eatSpace()) return null;
var style = state.tokenize(stream, state), context = state.stack[state.stack.length - 1];
return "[" == stream.current() || "doindent" === type || "[" == type ? state.stack.push("rule") :"endtag" === type ? state.stack[state.stack.length - 1] = "endtag" :"]" == stream.current() || "]" == type || ">" == type && "rule" == context ? state.stack.pop() :"[" == type && state.stack.push("["), 
style;
},
indent:function(state, textAfter) {
var n = state.stack.length;
return textAfter.match(/\]\s+|\]/) ? n -= 1 :">" === textAfter.substr(textAfter.length - 1, textAfter.length) && ("<" === textAfter.substr(0, 1) || "doindent" == type && textAfter.length > 1 || ("doindent" == type ? n-- :">" == type && textAfter.length > 1 || "tag" == type && ">" !== textAfter || ("tag" == type && "rule" == state.stack[state.stack.length - 1] ? n-- :"tag" == type ? n++ :">" === textAfter && "rule" == state.stack[state.stack.length - 1] && ">" === type ? n-- :">" === textAfter && "rule" == state.stack[state.stack.length - 1] || ("<" !== textAfter.substr(0, 1) && ">" === textAfter.substr(0, 1) ? n -= 1 :">" === textAfter || (n -= 1)))), 
(null == type || "]" == type) && n--), state.baseIndent + n * indentUnit;
},
electricChars:"]>"
};
}), CodeMirror.defineMIME("application/xml-dtd", "dtd");