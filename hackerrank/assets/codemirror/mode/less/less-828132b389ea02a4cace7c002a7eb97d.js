var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
CodeMirror.defineMode("less", function(config) {
function ret(style, tp) {
return type = tp, style;
}
function tokenBase(stream, state) {
var ch = stream.next();
if ("@" == ch) return stream.eatWhile(/[\w\-]/), ret("meta", stream.current());
if ("/" == ch && stream.eat("*")) return state.tokenize = tokenCComment, tokenCComment(stream, state);
if ("<" == ch && stream.eat("!")) return state.tokenize = tokenSGMLComment, tokenSGMLComment(stream, state);
if ("=" == ch) ret(null, "compare"); else {
if ("|" == ch && stream.eat("=")) return ret(null, "compare");
if ('"' == ch || "'" == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if ("/" == ch) {
if (stream.eat("/")) return state.tokenize = tokenSComment, tokenSComment(stream, state);
if ("string" == type || "(" == type) return ret("string", "string");
if (void 0 !== state.stack[state.stack.length - 1]) return ret(null, ch);
if (stream.eatWhile(/[\a-zA-Z0-9\-_.\s]/), /\/|\)|#/.test(stream.peek() || stream.eatSpace() && ")" === stream.peek()) || stream.eol()) return ret("string", "string");
} else {
if ("!" == ch) return stream.match(/^\s*\w*/), ret("keyword", "important");
if (/\d/.test(ch)) return stream.eatWhile(/[\w.%]/), ret("number", "unit");
if (/[,+<>*\/]/.test(ch)) return "=" == stream.peek() || "a" == type ? ret("string", "string") :"," === ch ? ret(null, ch) :ret(null, "select-op");
if (/[;{}:\[\]()~\|]/.test(ch)) {
if (":" == ch) return stream.eatWhile(/[a-z\\\-]/), selectors.test(stream.current()) ? ret("tag", "tag") :":" == stream.peek() ? (stream.next(), 
stream.eatWhile(/[a-z\\\-]/), stream.current().match(/\:\:\-(o|ms|moz|webkit)\-/) ? ret("string", "string") :selectors.test(stream.current().substring(1)) ? ret("tag", "tag") :ret(null, ch)) :ret(null, ch);
if ("~" != ch) return ret(null, ch);
if ("r" == type) return ret("string", "string");
} else {
if ("." == ch) return "(" == type ? ret("string", "string") :(stream.eatWhile(/[\a-zA-Z0-9\-_]/), 
" " === stream.peek() && stream.eatSpace(), ")" === stream.peek() || ":" === type ? ret("number", "unit") :stream.current().length > 1 && "rule" === state.stack[state.stack.length - 1] && !stream.match(/^[{,+(]/, !1) ? ret("number", "unit") :ret("tag", "tag"));
if ("#" == ch) return stream.eatWhile(/[A-Za-z0-9]/), 4 == stream.current().length || 7 == stream.current().length ? null != stream.current().match(/[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}/, !1) ? stream.current().substring(1) != stream.current().match(/[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}/, !1) ? ret("atom", "tag") :(stream.eatSpace(), 
/[\/<>.(){!$%^&*_\-\\?=+\|#'~`]/.test(stream.peek()) ? "select-op" === type ? ret("number", "unit") :ret("atom", "tag") :"}" == stream.peek() ? ret("number", "unit") :/[a-zA-Z\\]/.test(stream.peek()) ? ret("atom", "tag") :stream.eol() ? ret("atom", "tag") :ret("number", "unit")) :(stream.eatWhile(/[\w\\\-]/), 
ret("atom", stream.current())) :(stream.eatWhile(/[\w\\\-]/), "rule" === state.stack[state.stack.length - 1] ? ret("atom", stream.current()) :ret("atom", stream.current()));
if ("&" == ch) return stream.eatWhile(/[\w\-]/), ret(null, ch);
if (stream.eatWhile(/[\w\\\-_%.{]/), null === stream.current().match(/\\/)) {
if ("string" == type) return "{" === state.stack[state.stack.length - 1] && ":" === stream.peek() ? ret("variable", "variable") :("/" === stream.peek() && stream.eatWhile(/[\w\\\-_%.{:\/]/), 
ret(type, stream.current()));
if (null != stream.current().match(/(^http$|^https$)/)) return stream.eatWhile(/[\w\\\-_%.{:\/]/), 
"/" === stream.peek() && stream.eatWhile(/[\w\\\-_%.{:\/]/), ret("string", "string");
if ("<" == stream.peek() || ">" == stream.peek() || "+" == stream.peek()) return "(" !== type || "n" !== stream.current() && "-n" !== stream.current() ? ret("tag", "tag") :ret("string", stream.current());
if (/\(/.test(stream.peek())) return "when" === stream.current() ? ret("variable", "variable") :"@media" === state.stack[state.stack.length - 1] && "and" === stream.current() ? ret("variable", stream.current()) :ret(null, ch);
if ("/" == stream.peek() && void 0 !== state.stack[state.stack.length - 1]) return "/" === stream.peek() && stream.eatWhile(/[\w\\\-_%.{:\/]/), 
ret("string", stream.current());
if (stream.current().match(/\-\d|\-.\d/)) return ret("number", "unit");
if (/\/|[\s\)]/.test(stream.peek() || stream.eol() || stream.eatSpace() && "/" == stream.peek()) && -1 !== stream.current().indexOf(".")) return "{" == stream.current().substring(stream.current().length - 1, stream.current().length) ? (stream.backUp(1), 
ret("tag", "tag")) :(stream.eatSpace(), /[{<>.a-zA-Z\/]/.test(stream.peek()) || stream.eol() ? ret("tag", "tag") :ret("string", "string"));
if (stream.eol() || "[" == stream.peek() || "#" == stream.peek() || "tag" == type) {
if ("{" == stream.current().substring(stream.current().length - 1, stream.current().length)) stream.backUp(1); else {
if ("border-color" === state.stack[state.stack.length - 1] || "background-position" === state.stack[state.stack.length - 1] || "font-family" === state.stack[state.stack.length - 1]) return ret(null, stream.current());
if ("tag" === type) return ret("tag", "tag");
if ((":" === type || "unit" === type) && "rule" === state.stack[state.stack.length - 1]) return ret(null, stream.current());
if ("rule" === state.stack[state.stack.length - 1] && "tag" === type) return ret("string", stream.current());
if (";" === state.stack[state.stack.length - 1] && ":" === type) return ret(null, stream.current());
if ("#" === stream.peek() && void 0 !== type && null === type.match(/\+|,|tag|select\-op|}|{|;/g)) return ret("string", stream.current());
if ("variable" === type) return ret(null, stream.current());
if ("{" === state.stack[state.stack.length - 1] && "comment" === type) return ret("variable", stream.current());
if (0 === state.stack.length && (";" === type || "comment" === type)) return ret("tag", stream.current());
if (("{" === state.stack[state.stack.length - 1] || ";" === type) && "@media{" !== state.stack[state.stack.length - 1]) return ret("variable", stream.current());
if ("{" === state.stack[state.stack.length - 2] && ";" === state.stack[state.stack.length - 1]) return ret("variable", stream.current());
}
return ret("tag", "tag");
}
if ("compare" == type || "a" == type || "(" == type) return ret("string", "string");
if ("|" == type || "-" == stream.current() || "[" == type) return "|" == type && stream.match(/^[\]=~]/, !1) ? ret("number", stream.current()) :"|" == type ? ret("tag", "tag") :"[" == type ? (stream.eatWhile(/\w\-/), 
ret("number", stream.current())) :ret(null, ch);
if (":" == stream.peek() || stream.eatSpace() && ":" == stream.peek()) {
stream.next();
var t_v = ":" == stream.peek() ? !0 :!1;
if (t_v) stream.backUp(1); else {
var old_pos = stream.pos, sc = stream.current().length;
stream.eatWhile(/[a-z\\\-]/);
var new_pos = stream.pos;
if (null != stream.current().substring(sc - 1).match(selectors)) return stream.backUp(new_pos - (old_pos - 1)), 
ret("tag", "tag");
stream.backUp(new_pos - (old_pos - 1));
}
return t_v ? ret("tag", "tag") :ret("variable", "variable");
}
return "font-family" === state.stack[state.stack.length - 1] || "background-position" === state.stack[state.stack.length - 1] || "border-color" === state.stack[state.stack.length - 1] ? ret(null, null) :null === state.stack[state.stack.length - 1] && ":" === type ? ret(null, stream.current()) :/\^|\$/.test(stream.current()) && stream.match(/^[~=]/, !1) ? ret("string", "string") :"unit" === type && "rule" === state.stack[state.stack.length - 1] ? ret(null, "unit") :"unit" === type && ";" === state.stack[state.stack.length - 1] ? ret(null, "unit") :")" === type && "rule" === state.stack[state.stack.length - 1] ? ret(null, "unit") :type && null !== type.match("@") && "rule" === state.stack[state.stack.length - 1] ? ret(null, "unit") :";" !== type && "}" !== type && "," !== type || ";" !== state.stack[state.stack.length - 1] ? ";" === type && void 0 !== stream.peek() && !stream.match(/^[{\.]/, !1) || ";" === type && stream.eatSpace() && !stream.match(/^[{\.]/) ? ret("variable", stream.current()) :"@media" === type && "@media" === state.stack[state.stack.length - 1] || "@namespace" === type ? ret("tag", stream.current()) :"{" === type && ";" === state.stack[state.stack.length - 1] && "{" === stream.peek() ? ret("tag", "tag") :"{" !== type && ":" !== type || ";" !== state.stack[state.stack.length - 1] ? "{" === state.stack[state.stack.length - 1] && stream.eatSpace() && !stream.match(/^[\.#]/) || "select-op" === type || "rule" === state.stack[state.stack.length - 1] && "," === type ? ret("tag", "tag") :"variable" === type && "rule" === state.stack[state.stack.length - 1] ? ret("tag", "tag") :stream.eatSpace() && "{" === stream.peek() || stream.eol() || "{" === stream.peek() ? ret("tag", "tag") :")" !== type || "and" != stream.current() && "and " != stream.current() ? ")" !== type || "when" != stream.current() && "when " != stream.current() ? ")" === type || "comment" === type || "{" === type ? ret("tag", "tag") :stream.sol() ? ret("tag", "tag") :stream.eatSpace() && "#" === stream.peek() || "#" === stream.peek() ? ret("tag", "tag") :0 === state.stack.length ? ret("tag", "tag") :";" === type && void 0 !== stream.peek() && stream.match(/^[\.|#]/g) ? ret("tag", "tag") :":" === type ? (stream.eatSpace(), 
ret(null, stream.current())) :"and " === stream.current() || "and" === stream.current() ? ret("variable", stream.current()) :";" === type && "{" === state.stack[state.stack.length - 1] ? ret("variable", stream.current()) :"rule" === state.stack[state.stack.length - 1] ? ret(null, stream.current()) :ret("tag", stream.current()) :ret("variable", "variable") :ret("variable", "variable") :ret(null, stream.current()) :ret("tag", stream.current());
}
if ("\\" === stream.current().charAt(stream.current().length - 1)) {
for (stream.eat(/\'|\"|\)|\(/); stream.eatWhile(/[\w\\\-_%.{]/); ) stream.eat(/\'|\"|\)|\(/);
return ret("string", stream.current());
}
}
}
}
}
function tokenSComment(stream, state) {
return stream.skipToEnd(), state.tokenize = tokenBase, ret("comment", "comment");
}
function tokenCComment(stream, state) {
for (var ch, maybeEnd = !1; null != (ch = stream.next()); ) {
if (maybeEnd && "/" == ch) {
state.tokenize = tokenBase;
break;
}
maybeEnd = "*" == ch;
}
return ret("comment", "comment");
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
for (var ch, escaped = !1; null != (ch = stream.next()) && (ch != quote || escaped); ) escaped = !escaped && "\\" == ch;
return escaped || (state.tokenize = tokenBase), ret("string", "string");
};
}
var type, indentUnit = config.indentUnit, selectors = /(^\:root$|^\:nth\-child$|^\:nth\-last\-child$|^\:nth\-of\-type$|^\:nth\-last\-of\-type$|^\:first\-child$|^\:last\-child$|^\:first\-of\-type$|^\:last\-of\-type$|^\:only\-child$|^\:only\-of\-type$|^\:empty$|^\:link|^\:visited$|^\:active$|^\:hover$|^\:focus$|^\:target$|^\:lang$|^\:enabled^\:disabled$|^\:checked$|^\:first\-line$|^\:first\-letter$|^\:before$|^\:after$|^\:not$|^\:required$|^\:invalid$)/;
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
if ("hash" == type && "rule" == context ? style = "atom" :"variable" == style && ("rule" == context ? style = null :context && "@media{" != context || (style = "when" == stream.current() ? "variable" :/[\s,|\s\)|\s]/.test(stream.peek()) ? "tag" :type)), 
"rule" == context && /^[\{\};]$/.test(type) && state.stack.pop(), "{" == type ? "@media" == context ? state.stack[state.stack.length - 1] = "@media{" :state.stack.push("{") :"}" == type ? state.stack.pop() :"@media" == type ? state.stack.push("@media") :"font-family" === stream.current() ? state.stack[state.stack.length - 1] = "font-family" :"background-position" === stream.current() ? state.stack[state.stack.length - 1] = "background-position" :"border-color" === stream.current() ? state.stack[state.stack.length - 1] = "border-color" :"{" == context && "comment" != type && "tag" !== type ? state.stack.push("rule") :":" === stream.peek() && null === stream.current().match(/@|#/) && (style = type), 
";" !== type || "font-family" != state.stack[state.stack.length - 1] && "background-position" != state.stack[state.stack.length - 1] && "border-color" != state.stack[state.stack.length - 1]) {
if ("tag" === type && ")" === stream.peek() && null === stream.current().match(/\:/)) type = null, 
style = null; else if ("variable" === type && ")" === stream.peek() || "variable" === type && stream.eatSpace() && ")" === stream.peek()) return ret(null, stream.current());
} else state.stack[state.stack.length - 1] = stream.current();
return style;
},
indent:function(state, textAfter) {
var n = state.stack.length;
return /^\}/.test(textAfter) ? n -= "rule" === state.stack[state.stack.length - 1] ? 2 :1 :"{" === state.stack[state.stack.length - 2] && (n -= "rule" === state.stack[state.stack.length - 1] ? 1 :0), 
state.baseIndent + n * indentUnit;
},
electricChars:"}",
blockCommentStart:"/*",
blockCommentEnd:"*/",
lineComment:"//"
};
}), CodeMirror.defineMIME("text/x-less", "less"), CodeMirror.mimeModes.hasOwnProperty("text/css") || CodeMirror.defineMIME("text/css", "less");
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 