// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("rust", function() {
function r(tc, style) {
return tcat = tc, style;
}
function tokenBase(stream, state) {
var ch = stream.next();
if ('"' == ch) return state.tokenize = tokenString, state.tokenize(stream, state);
if ("'" == ch) return tcat = "atom", stream.eat("\\") ? stream.skipTo("'") ? (stream.next(), 
"string") :"error" :(stream.next(), stream.eat("'") ? "string" :"error");
if ("/" == ch) {
if (stream.eat("/")) return stream.skipToEnd(), "comment";
if (stream.eat("*")) return state.tokenize = tokenComment(1), state.tokenize(stream, state);
}
if ("#" == ch) return stream.eat("[") ? (tcat = "open-attr", null) :(stream.eatWhile(/\w/), 
r("macro", "meta"));
if (":" == ch && stream.match(":<")) return r("op", null);
if (ch.match(/\d/) || "." == ch && stream.eat(/\d/)) {
var flp = !1;
return stream.match(/^x[\da-f]+/i) || stream.match(/^b[01]+/) || (stream.eatWhile(/\d/), 
stream.eat(".") && (flp = !0, stream.eatWhile(/\d/)), stream.match(/^e[+\-]?\d+/i) && (flp = !0)), 
flp ? stream.match(/^f(?:32|64)/) :stream.match(/^[ui](?:8|16|32|64)/), r("atom", "number");
}
return ch.match(/[()\[\]{}:;,]/) ? r(ch, null) :"-" == ch && stream.eat(">") ? r("->", null) :ch.match(operatorChar) ? (stream.eatWhile(operatorChar), 
r("op", null)) :(stream.eatWhile(/\w/), content = stream.current(), stream.match(/^::\w/) ? (stream.backUp(1), 
r("prefix", "variable-2")) :state.keywords.propertyIsEnumerable(content) ? r(state.keywords[content], content.match(/true|false/) ? "atom" :"keyword") :r("name", "variable"));
}
function tokenString(stream, state) {
for (var ch, escaped = !1; ch = stream.next(); ) {
if ('"' == ch && !escaped) return state.tokenize = tokenBase, r("atom", "string");
escaped = !escaped && "\\" == ch;
}
return r("op", "string");
}
function tokenComment(depth) {
return function(stream, state) {
for (var ch, lastCh = null; ch = stream.next(); ) {
if ("/" == ch && "*" == lastCh) {
if (1 == depth) {
state.tokenize = tokenBase;
break;
}
return state.tokenize = tokenComment(depth - 1), state.tokenize(stream, state);
}
if ("*" == ch && "/" == lastCh) return state.tokenize = tokenComment(depth + 1), 
state.tokenize(stream, state);
lastCh = ch;
}
return "comment";
};
}
function pass() {
for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
}
function cont() {
return pass.apply(null, arguments), !0;
}
function pushlex(type, info) {
var result = function() {
var state = cx.state;
state.lexical = {
indented:state.indented,
column:cx.stream.column(),
type:type,
prev:state.lexical,
info:info
};
};
return result.lex = !0, result;
}
function poplex() {
var state = cx.state;
state.lexical.prev && (")" == state.lexical.type && (state.indented = state.lexical.indented), 
state.lexical = state.lexical.prev);
}
function typecx() {
cx.state.keywords = typeKeywords;
}
function valcx() {
cx.state.keywords = valKeywords;
}
function commasep(comb, end) {
function more(type) {
return "," == type ? cont(comb, more) :type == end ? cont() :cont(more);
}
return function(type) {
return type == end ? cont() :pass(comb, more);
};
}
function stat_of(comb, tag) {
return cont(pushlex("stat", tag), comb, poplex, block);
}
function block(type) {
return "}" == type ? cont() :"let" == type ? stat_of(letdef1, "let") :"fn" == type ? stat_of(fndef) :"type" == type ? cont(pushlex("stat"), tydef, endstatement, poplex, block) :"enum" == type ? stat_of(enumdef) :"mod" == type ? stat_of(mod) :"iface" == type ? stat_of(iface) :"impl" == type ? stat_of(impl) :"open-attr" == type ? cont(pushlex("]"), commasep(expression, "]"), poplex) :"ignore" == type || type.match(/[\]\);,]/) ? cont(block) :pass(pushlex("stat"), expression, poplex, endstatement, block);
}
function endstatement(type) {
return ";" == type ? cont() :pass();
}
function expression(type) {
return "atom" == type || "name" == type ? cont(maybeop) :"{" == type ? cont(pushlex("}"), exprbrace, poplex) :type.match(/[\[\(]/) ? matchBrackets(type, expression) :type.match(/[\]\)\};,]/) ? pass() :"if-style" == type ? cont(expression, expression) :"else-style" == type || "op" == type ? cont(expression) :"for" == type ? cont(pattern, maybetype, inop, expression, expression) :"alt" == type ? cont(expression, altbody) :"fn" == type ? cont(fndef) :"macro" == type ? cont(macro) :cont();
}
function maybeop(type) {
return "." == content ? cont(maybeprop) :"::<" == content ? cont(typarams, maybeop) :"op" == type || ":" == content ? cont(expression) :"(" == type || "[" == type ? matchBrackets(type, expression) :pass();
}
function maybeprop() {
return content.match(/^\w+$/) ? (cx.marked = "variable", cont(maybeop)) :pass(expression);
}
function exprbrace(type) {
if ("op" == type) {
if ("|" == content) return cont(blockvars, poplex, pushlex("}", "block"), block);
if ("||" == content) return cont(poplex, pushlex("}", "block"), block);
}
return "mutable" == content || content.match(/^\w+$/) && ":" == cx.stream.peek() && !cx.stream.match("::", !1) ? pass(record_of(expression)) :pass(block);
}
function record_of(comb) {
function ro(type) {
return "mutable" == content || "with" == content ? (cx.marked = "keyword", cont(ro)) :content.match(/^\w*$/) ? (cx.marked = "variable", 
cont(ro)) :":" == type ? cont(comb, ro) :"}" == type ? cont() :cont(ro);
}
return ro;
}
function blockvars(type) {
return "name" == type ? (cx.marked = "def", cont(blockvars)) :"op" == type && "|" == content ? cont() :cont(blockvars);
}
function letdef1(type) {
return type.match(/[\]\)\};]/) ? cont() :"=" == content ? cont(expression, letdef2) :"," == type ? cont(letdef1) :pass(pattern, maybetype, letdef1);
}
function letdef2(type) {
return type.match(/[\]\)\};,]/) ? pass(letdef1) :pass(expression, letdef2);
}
function maybetype(type) {
return ":" == type ? cont(typecx, rtype, valcx) :pass();
}
function inop(type) {
return "name" == type && "in" == content ? (cx.marked = "keyword", cont()) :pass();
}
function fndef(type) {
return "@" == content || "~" == content ? (cx.marked = "keyword", cont(fndef)) :"name" == type ? (cx.marked = "def", 
cont(fndef)) :"<" == content ? cont(typarams, fndef) :"{" == type ? pass(expression) :"(" == type ? cont(pushlex(")"), commasep(argdef, ")"), poplex, fndef) :"->" == type ? cont(typecx, rtype, valcx, fndef) :";" == type ? cont() :cont(fndef);
}
function tydef(type) {
return "name" == type ? (cx.marked = "def", cont(tydef)) :"<" == content ? cont(typarams, tydef) :"=" == content ? cont(typecx, rtype, valcx) :cont(tydef);
}
function enumdef(type) {
return "name" == type ? (cx.marked = "def", cont(enumdef)) :"<" == content ? cont(typarams, enumdef) :"=" == content ? cont(typecx, rtype, valcx, endstatement) :"{" == type ? cont(pushlex("}"), typecx, enumblock, valcx, poplex) :cont(enumdef);
}
function enumblock(type) {
return "}" == type ? cont() :"(" == type ? cont(pushlex(")"), commasep(rtype, ")"), poplex, enumblock) :(content.match(/^\w+$/) && (cx.marked = "def"), 
cont(enumblock));
}
function mod(type) {
return "name" == type ? (cx.marked = "def", cont(mod)) :"{" == type ? cont(pushlex("}"), block, poplex) :pass();
}
function iface(type) {
return "name" == type ? (cx.marked = "def", cont(iface)) :"<" == content ? cont(typarams, iface) :"{" == type ? cont(pushlex("}"), block, poplex) :pass();
}
function impl(type) {
return "<" == content ? cont(typarams, impl) :"of" == content || "for" == content ? (cx.marked = "keyword", 
cont(rtype, impl)) :"name" == type ? (cx.marked = "def", cont(impl)) :"{" == type ? cont(pushlex("}"), block, poplex) :pass();
}
function typarams() {
return ">" == content ? cont() :"," == content ? cont(typarams) :":" == content ? cont(rtype, typarams) :pass(rtype, typarams);
}
function argdef(type) {
return "name" == type ? (cx.marked = "def", cont(argdef)) :":" == type ? cont(typecx, rtype, valcx) :pass();
}
function rtype(type) {
return "name" == type ? (cx.marked = "variable-3", cont(rtypemaybeparam)) :"mutable" == content ? (cx.marked = "keyword", 
cont(rtype)) :"atom" == type ? cont(rtypemaybeparam) :"op" == type || "obj" == type ? cont(rtype) :"fn" == type ? cont(fntype) :"{" == type ? cont(pushlex("{"), record_of(rtype), poplex) :matchBrackets(type, rtype);
}
function rtypemaybeparam() {
return "<" == content ? cont(typarams) :pass();
}
function fntype(type) {
return "(" == type ? cont(pushlex("("), commasep(rtype, ")"), poplex, fntype) :"->" == type ? cont(rtype) :pass();
}
function pattern(type) {
return "name" == type ? (cx.marked = "def", cont(patternmaybeop)) :"atom" == type ? cont(patternmaybeop) :"op" == type ? cont(pattern) :type.match(/[\]\)\};,]/) ? pass() :matchBrackets(type, pattern);
}
function patternmaybeop(type) {
return "op" == type && "." == content ? cont() :"to" == content ? (cx.marked = "keyword", 
cont(pattern)) :pass();
}
function altbody(type) {
return "{" == type ? cont(pushlex("}", "alt"), altblock1, poplex) :pass();
}
function altblock1(type) {
return "}" == type ? cont() :"|" == type ? cont(altblock1) :"when" == content ? (cx.marked = "keyword", 
cont(expression, altblock2)) :type.match(/[\]\);,]/) ? cont(altblock1) :pass(pattern, altblock2);
}
function altblock2(type) {
return "{" == type ? cont(pushlex("}", "alt"), block, poplex, altblock1) :pass(altblock1);
}
function macro(type) {
return type.match(/[\[\(\{]/) ? matchBrackets(type, expression) :pass();
}
function matchBrackets(type, comb) {
return "[" == type ? cont(pushlex("]"), commasep(comb, "]"), poplex) :"(" == type ? cont(pushlex(")"), commasep(comb, ")"), poplex) :"{" == type ? cont(pushlex("}"), commasep(comb, "}"), poplex) :cont();
}
function parse(state, stream, style) {
var cc = state.cc;
for (cx.state = state, cx.stream = stream, cx.marked = null, cx.cc = cc; ;) {
var combinator = cc.length ? cc.pop() :block;
if (combinator(tcat)) {
for (;cc.length && cc[cc.length - 1].lex; ) cc.pop()();
return cx.marked || style;
}
}
}
var tcat, content, indentUnit = 4, altIndentUnit = 2, valKeywords = {
"if":"if-style",
"while":"if-style",
"else":"else-style",
"do":"else-style",
ret:"else-style",
fail:"else-style",
"break":"atom",
cont:"atom",
"const":"let",
resource:"fn",
let:"let",
fn:"fn",
"for":"for",
alt:"alt",
iface:"iface",
impl:"impl",
type:"type",
"enum":"enum",
mod:"mod",
as:"op",
"true":"atom",
"false":"atom",
assert:"op",
check:"op",
claim:"op",
"native":"ignore",
unsafe:"ignore",
"import":"else-style",
"export":"else-style",
copy:"op",
log:"op",
log_err:"op",
use:"op",
bind:"op",
self:"atom"
}, typeKeywords = function() {
for (var keywords = {
fn:"fn",
block:"fn",
obj:"obj"
}, atoms = "bool uint int i8 i16 i32 i64 u8 u16 u32 u64 float f32 f64 str char".split(" "), i = 0, e = atoms.length; e > i; ++i) keywords[atoms[i]] = "atom";
return keywords;
}(), operatorChar = /[+\-*&%=<>!?|\.@]/, cx = {
state:null,
stream:null,
marked:null,
cc:null
};
return poplex.lex = typecx.lex = valcx.lex = !0, {
startState:function() {
return {
tokenize:tokenBase,
cc:[],
lexical:{
indented:-indentUnit,
column:0,
type:"top",
align:!1
},
keywords:valKeywords,
indented:0
};
},
token:function(stream, state) {
if (stream.sol() && (state.lexical.hasOwnProperty("align") || (state.lexical.align = !1), 
state.indented = stream.indentation()), stream.eatSpace()) return null;
tcat = content = null;
var style = state.tokenize(stream, state);
return "comment" == style ? style :(state.lexical.hasOwnProperty("align") || (state.lexical.align = !0), 
"prefix" == tcat ? style :(content || (content = stream.current()), parse(state, stream, style)));
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase) return 0;
var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, type = lexical.type, closing = firstChar == type;
return "stat" == type ? lexical.indented + indentUnit :lexical.align ? lexical.column + (closing ? 0 :1) :lexical.indented + (closing ? 0 :"alt" == lexical.info ? altIndentUnit :indentUnit);
},
electricChars:"{}",
blockCommentStart:"/*",
blockCommentEnd:"*/",
lineComment:"//",
fold:"brace"
};
}), CodeMirror.defineMIME("text/x-rustsrc", "rust");
});