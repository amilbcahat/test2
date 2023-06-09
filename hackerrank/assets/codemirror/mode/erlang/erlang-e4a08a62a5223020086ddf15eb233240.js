var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMIME("text/x-erlang", "erlang"), CodeMirror.defineMode("erlang", function(cmCfg) {
function tokenizer(stream, state) {
if (state.in_string) return state.in_string = !doubleQuote(stream), rval(state, stream, "string");
if (state.in_atom) return state.in_atom = !singleQuote(stream), rval(state, stream, "atom");
if (stream.eatSpace()) return rval(state, stream, "whitespace");
if (!peekToken(state) && stream.match(/-\s*[a-z\xdf-\xf6\xf8-\xff][\w\xd8-\xde\xc0-\xd6\xdf-\xf6\xf8-\xff]*/)) return is_member(stream.current(), typeWords) ? rval(state, stream, "type") :rval(state, stream, "attribute");
var ch = stream.next();
if ("%" == ch) return stream.skipToEnd(), rval(state, stream, "comment");
if (":" == ch) return rval(state, stream, "colon");
if ("?" == ch) return stream.eatSpace(), stream.eatWhile(anumRE), rval(state, stream, "macro");
if ("#" == ch) return stream.eatSpace(), stream.eatWhile(anumRE), rval(state, stream, "record");
if ("$" == ch) return "\\" != stream.next() || stream.match(escapesRE) ? rval(state, stream, "number") :rval(state, stream, "error");
if ("." == ch) return rval(state, stream, "dot");
if ("'" == ch) {
if (!(state.in_atom = !singleQuote(stream))) {
if (stream.match(/\s*\/\s*[0-9]/, !1)) return stream.match(/\s*\/\s*[0-9]/, !0), 
rval(state, stream, "fun");
if (stream.match(/\s*\(/, !1) || stream.match(/\s*:/, !1)) return rval(state, stream, "function");
}
return rval(state, stream, "atom");
}
if ('"' == ch) return state.in_string = !doubleQuote(stream), rval(state, stream, "string");
if (/[A-Z_\xd8-\xde\xc0-\xd6]/.test(ch)) return stream.eatWhile(anumRE), rval(state, stream, "variable");
if (/[a-z_\xdf-\xf6\xf8-\xff]/.test(ch)) {
if (stream.eatWhile(anumRE), stream.match(/\s*\/\s*[0-9]/, !1)) return stream.match(/\s*\/\s*[0-9]/, !0), 
rval(state, stream, "fun");
var w = stream.current();
return is_member(w, keywordWords) ? rval(state, stream, "keyword") :is_member(w, operatorAtomWords) ? rval(state, stream, "operator") :stream.match(/\s*\(/, !1) ? !is_member(w, bifWords) || ":" == peekToken(state).token && "erlang" != peekToken(state, 2).token ? is_member(w, guardWords) ? rval(state, stream, "guard") :rval(state, stream, "function") :rval(state, stream, "builtin") :is_member(w, operatorAtomWords) ? rval(state, stream, "operator") :":" == lookahead(stream) ? "erlang" == w ? rval(state, stream, "builtin") :rval(state, stream, "function") :is_member(w, [ "true", "false" ]) ? rval(state, stream, "boolean") :is_member(w, [ "true", "false" ]) ? rval(state, stream, "boolean") :rval(state, stream, "atom");
}
var digitRE = /[0-9]/, radixRE = /[0-9a-zA-Z]/;
return digitRE.test(ch) ? (stream.eatWhile(digitRE), stream.eat("#") ? stream.eatWhile(radixRE) || stream.backUp(1) :stream.eat(".") && (stream.eatWhile(digitRE) ? stream.eat(/[eE]/) && (stream.eat(/[-+]/) ? stream.eatWhile(digitRE) || stream.backUp(2) :stream.eatWhile(digitRE) || stream.backUp(1)) :stream.backUp(1)), 
rval(state, stream, "number")) :nongreedy(stream, openParenRE, openParenWords) ? rval(state, stream, "open_paren") :nongreedy(stream, closeParenRE, closeParenWords) ? rval(state, stream, "close_paren") :greedy(stream, separatorRE, separatorWords) ? rval(state, stream, "separator") :greedy(stream, operatorSymbolRE, operatorSymbolWords) ? rval(state, stream, "operator") :rval(state, stream, null);
}
function nongreedy(stream, re, words) {
if (1 == stream.current().length && re.test(stream.current())) {
for (stream.backUp(1); re.test(stream.peek()); ) if (stream.next(), is_member(stream.current(), words)) return !0;
stream.backUp(stream.current().length - 1);
}
return !1;
}
function greedy(stream, re, words) {
if (1 == stream.current().length && re.test(stream.current())) {
for (;re.test(stream.peek()); ) stream.next();
for (;0 < stream.current().length; ) {
if (is_member(stream.current(), words)) return !0;
stream.backUp(1);
}
stream.next();
}
return !1;
}
function doubleQuote(stream) {
return quote(stream, '"', "\\");
}
function singleQuote(stream) {
return quote(stream, "'", "\\");
}
function quote(stream, quoteChar, escapeChar) {
for (;!stream.eol(); ) {
var ch = stream.next();
if (ch == quoteChar) return !0;
ch == escapeChar && stream.next();
}
return !1;
}
function lookahead(stream) {
var m = stream.match(/([\n\s]+|%[^\n]*\n)*(.)/, !1);
return m ? m.pop() :"";
}
function is_member(element, list) {
return -1 < list.indexOf(element);
}
function rval(state, stream, type) {
switch (pushToken(state, realToken(type, stream)), type) {
case "atom":
return "atom";

case "attribute":
return "attribute";

case "boolean":
return "atom";

case "builtin":
return "builtin";

case "close_paren":
return null;

case "colon":
return null;

case "comment":
return "comment";

case "dot":
return null;

case "error":
return "error";

case "fun":
return "meta";

case "function":
return "tag";

case "guard":
return "property";

case "keyword":
return "keyword";

case "macro":
return "variable-2";

case "number":
return "number";

case "open_paren":
return null;

case "operator":
return "operator";

case "record":
return "bracket";

case "separator":
return null;

case "string":
return "string";

case "type":
return "def";

case "variable":
return "variable";

default:
return null;
}
}
function aToken(tok, col, ind, typ) {
return {
token:tok,
column:col,
indent:ind,
type:typ
};
}
function realToken(type, stream) {
return aToken(stream.current(), stream.column(), stream.indentation(), type);
}
function fakeToken(type) {
return aToken(type, 0, 0, type);
}
function peekToken(state, depth) {
var len = state.tokenStack.length, dep = depth ? depth :1;
return dep > len ? !1 :state.tokenStack[len - dep];
}
function pushToken(state, token) {
"comment" != token.type && "whitespace" != token.type && (state.tokenStack = maybe_drop_pre(state.tokenStack, token), 
state.tokenStack = maybe_drop_post(state.tokenStack));
}
function maybe_drop_pre(s, token) {
var last = s.length - 1;
return last > 0 && "record" === s[last].type && "dot" === token.type ? s.pop() :last > 0 && "group" === s[last].type ? (s.pop(), 
s.push(token)) :s.push(token), s;
}
function maybe_drop_post(s) {
var last = s.length - 1;
if ("dot" === s[last].type) return [];
if ("fun" === s[last].type && "fun" === s[last - 1].token) return s.slice(0, last - 1);
switch (s[s.length - 1].token) {
case "}":
return d(s, {
g:[ "{" ]
});

case "]":
return d(s, {
i:[ "[" ]
});

case ")":
return d(s, {
i:[ "(" ]
});

case ">>":
return d(s, {
i:[ "<<" ]
});

case "end":
return d(s, {
i:[ "begin", "case", "fun", "if", "receive", "try" ]
});

case ",":
return d(s, {
e:[ "begin", "try", "when", "->", ",", "(", "[", "{", "<<" ]
});

case "->":
return d(s, {
r:[ "when" ],
m:[ "try", "if", "case", "receive" ]
});

case ";":
return d(s, {
E:[ "case", "fun", "if", "receive", "try", "when" ]
});

case "catch":
return d(s, {
e:[ "try" ]
});

case "of":
return d(s, {
e:[ "case" ]
});

case "after":
return d(s, {
e:[ "receive", "try" ]
});

default:
return s;
}
}
function d(stack, tt) {
for (var type in tt) for (var len = stack.length - 1, tokens = tt[type], i = len - 1; i > -1; i--) if (is_member(stack[i].token, tokens)) {
var ss = stack.slice(0, i);
switch (type) {
case "m":
return ss.concat(stack[i]).concat(stack[len]);

case "r":
return ss.concat(stack[len]);

case "i":
return ss;

case "g":
return ss.concat(fakeToken("group"));

case "E":
return ss.concat(stack[i]);

case "e":
return ss.concat(stack[i]);
}
}
return "E" == type ? [] :stack;
}
function indenter(state, textAfter) {
var t, unit = cmCfg.indentUnit, wordAfter = wordafter(textAfter), currT = peekToken(state, 1), prevT = peekToken(state, 2);
return state.in_string || state.in_atom ? CodeMirror.Pass :prevT ? "when" == currT.token ? currT.column + unit :"when" === wordAfter && "function" === prevT.type ? prevT.indent + unit :"(" === wordAfter && "fun" === currT.token ? currT.column + 3 :"catch" === wordAfter && (t = getToken(state, [ "try" ])) ? t.column :is_member(wordAfter, [ "end", "after", "of" ]) ? (t = getToken(state, [ "begin", "case", "fun", "if", "receive", "try" ]), 
t ? t.column :CodeMirror.Pass) :is_member(wordAfter, closeParenWords) ? (t = getToken(state, openParenWords), 
t ? t.column :CodeMirror.Pass) :is_member(currT.token, [ ",", "|", "||" ]) || is_member(wordAfter, [ ",", "|", "||" ]) ? (t = postcommaToken(state), 
t ? t.column + t.token.length :unit) :"->" == currT.token ? is_member(prevT.token, [ "receive", "case", "if", "try" ]) ? prevT.column + unit + unit :prevT.column + unit :is_member(currT.token, openParenWords) ? currT.column + currT.token.length :(t = defaultToken(state), 
truthy(t) ? t.column + unit :0) :0;
}
function wordafter(str) {
var m = str.match(/,|[a-z]+|\}|\]|\)|>>|\|+|\(/);
return truthy(m) && 0 === m.index ? m[0] :"";
}
function postcommaToken(state) {
var objs = state.tokenStack.slice(0, -1), i = getTokenIndex(objs, "type", [ "open_paren" ]);
return truthy(objs[i]) ? objs[i] :!1;
}
function defaultToken(state) {
var objs = state.tokenStack, stop = getTokenIndex(objs, "type", [ "open_paren", "separator", "keyword" ]), oper = getTokenIndex(objs, "type", [ "operator" ]);
return truthy(stop) && truthy(oper) && oper > stop ? objs[stop + 1] :truthy(stop) ? objs[stop] :!1;
}
function getToken(state, tokens) {
var objs = state.tokenStack, i = getTokenIndex(objs, "token", tokens);
return truthy(objs[i]) ? objs[i] :!1;
}
function getTokenIndex(objs, propname, propvals) {
for (var i = objs.length - 1; i > -1; i--) if (is_member(objs[i][propname], propvals)) return i;
return !1;
}
function truthy(x) {
return x !== !1 && null != x;
}
var typeWords = [ "-type", "-spec", "-export_type", "-opaque" ], keywordWords = [ "after", "begin", "catch", "case", "cond", "end", "fun", "if", "let", "of", "query", "receive", "try", "when" ], separatorRE = /[\->,;]/, separatorWords = [ "->", ";", "," ], operatorAtomWords = [ "and", "andalso", "band", "bnot", "bor", "bsl", "bsr", "bxor", "div", "not", "or", "orelse", "rem", "xor" ], operatorSymbolRE = /[\+\-\*\/<>=\|:!]/, operatorSymbolWords = [ "=", "+", "-", "*", "/", ">", ">=", "<", "=<", "=:=", "==", "=/=", "/=", "||", "<-", "!" ], openParenRE = /[<\(\[\{]/, openParenWords = [ "<<", "(", "[", "{" ], closeParenRE = /[>\)\]\}]/, closeParenWords = [ "}", "]", ")", ">>" ], guardWords = [ "is_atom", "is_binary", "is_bitstring", "is_boolean", "is_float", "is_function", "is_integer", "is_list", "is_number", "is_pid", "is_port", "is_record", "is_reference", "is_tuple", "atom", "binary", "bitstring", "boolean", "function", "integer", "list", "number", "pid", "port", "record", "reference", "tuple" ], bifWords = [ "abs", "adler32", "adler32_combine", "alive", "apply", "atom_to_binary", "atom_to_list", "binary_to_atom", "binary_to_existing_atom", "binary_to_list", "binary_to_term", "bit_size", "bitstring_to_list", "byte_size", "check_process_code", "contact_binary", "crc32", "crc32_combine", "date", "decode_packet", "delete_module", "disconnect_node", "element", "erase", "exit", "float", "float_to_list", "garbage_collect", "get", "get_keys", "group_leader", "halt", "hd", "integer_to_list", "internal_bif", "iolist_size", "iolist_to_binary", "is_alive", "is_atom", "is_binary", "is_bitstring", "is_boolean", "is_float", "is_function", "is_integer", "is_list", "is_number", "is_pid", "is_port", "is_process_alive", "is_record", "is_reference", "is_tuple", "length", "link", "list_to_atom", "list_to_binary", "list_to_bitstring", "list_to_existing_atom", "list_to_float", "list_to_integer", "list_to_pid", "list_to_tuple", "load_module", "make_ref", "module_loaded", "monitor_node", "node", "node_link", "node_unlink", "nodes", "notalive", "now", "open_port", "pid_to_list", "port_close", "port_command", "port_connect", "port_control", "pre_loaded", "process_flag", "process_info", "processes", "purge_module", "put", "register", "registered", "round", "self", "setelement", "size", "spawn", "spawn_link", "spawn_monitor", "spawn_opt", "split_binary", "statistics", "term_to_binary", "time", "throw", "tl", "trunc", "tuple_size", "tuple_to_list", "unlink", "unregister", "whereis" ], anumRE = /[\w@\xd8-\xde\xc0-\xd6\xdf-\xf6\xf8-\xff]/, escapesRE = /[0-7]{1,3}|[bdefnrstv\\"']|\^[a-zA-Z]|x[0-9a-zA-Z]{2}|x{[0-9a-zA-Z]+}/;
return {
startState:function() {
return {
tokenStack:[],
in_string:!1,
in_atom:!1
};
},
token:function(stream, state) {
return tokenizer(stream, state);
},
indent:function(state, textAfter) {
return indenter(state, textAfter);
},
lineComment:"%"
};
});
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 