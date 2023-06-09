CodeMirror.defineMode("haxe", function(config, parserConfig) {
function chain(stream, state, f) {
return state.tokenize = f, f(stream, state);
}
function nextUntilUnescaped(stream, end) {
for (var next, escaped = !1; null != (next = stream.next()); ) {
if (next == end && !escaped) return !1;
escaped = !escaped && "\\" == next;
}
return escaped;
}
function ret(tp, style, cont) {
return type = tp, content = cont, style;
}
function haxeTokenBase(stream, state) {
var ch = stream.next();
if ('"' == ch || "'" == ch) return chain(stream, state, haxeTokenString(ch));
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return ret(ch);
if ("0" == ch && stream.eat(/x/i)) return stream.eatWhile(/[\da-f]/i), ret("number", "number");
if (/\d/.test(ch) || "-" == ch && stream.eat(/\d/)) return stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), 
ret("number", "number");
if (state.reAllowed && "~" == ch && stream.eat(/\//)) return nextUntilUnescaped(stream, "/"), 
stream.eatWhile(/[gimsu]/), ret("regexp", "string-2");
if ("/" == ch) return stream.eat("*") ? chain(stream, state, haxeTokenComment) :stream.eat("/") ? (stream.skipToEnd(), 
ret("comment", "comment")) :(stream.eatWhile(isOperatorChar), ret("operator", null, stream.current()));
if ("#" == ch) return stream.skipToEnd(), ret("conditional", "meta");
if ("@" == ch) return stream.eat(/:/), stream.eatWhile(/[\w_]/), ret("metadata", "meta");
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), ret("operator", null, stream.current());
var word;
if (/[A-Z]/.test(ch)) return stream.eatWhile(/[\w_<>]/), word = stream.current(), 
ret("type", "variable-3", word);
stream.eatWhile(/[\w_]/);
var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
return known && state.kwAllowed ? ret(known.type, known.style, word) :ret("variable", "variable", word);
}
function haxeTokenString(quote) {
return function(stream, state) {
return nextUntilUnescaped(stream, quote) || (state.tokenize = haxeTokenBase), ret("string", "string");
};
}
function haxeTokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = haxeTokenBase;
break;
}
maybeEnd = "*" == ch;
}
return ret("comment", "comment");
}
function HaxeLexical(indented, column, type, align, prev, info) {
this.indented = indented, this.column = column, this.type = type, this.prev = prev, 
this.info = info, null != align && (this.align = align);
}
function inScope(state, varname) {
for (var v = state.localVars; v; v = v.next) if (v.name == varname) return !0;
}
function parseHaxe(state, style, type, content, stream) {
var cc = state.cc;
for (cx.state = state, cx.stream = stream, cx.marked = null, cx.cc = cc, state.lexical.hasOwnProperty("align") || (state.lexical.align = !0); ;) {
var combinator = cc.length ? cc.pop() :statement;
if (combinator(type, content)) {
for (;cc.length && cc[cc.length - 1].lex; ) cc.pop()();
return cx.marked ? cx.marked :"variable" == type && inScope(state, content) ? "variable-2" :"variable" == type && imported(state, content) ? "variable-3" :style;
}
}
}
function imported(state, typename) {
if (/[a-z]/.test(typename.charAt(0))) return !1;
for (var len = state.importedtypes.length, i = 0; len > i; i++) if (state.importedtypes[i] == typename) return !0;
}
function registerimport(importname) {
for (var state = cx.state, t = state.importedtypes; t; t = t.next) if (t.name == importname) return;
state.importedtypes = {
name:importname,
next:state.importedtypes
};
}
function pass() {
for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
}
function cont() {
return pass.apply(null, arguments), !0;
}
function register(varname) {
var state = cx.state;
if (state.context) {
cx.marked = "def";
for (var v = state.localVars; v; v = v.next) if (v.name == varname) return;
state.localVars = {
name:varname,
next:state.localVars
};
}
}
function pushcontext() {
cx.state.context || (cx.state.localVars = defaultVars), cx.state.context = {
prev:cx.state.context,
vars:cx.state.localVars
};
}
function popcontext() {
cx.state.localVars = cx.state.context.vars, cx.state.context = cx.state.context.prev;
}
function pushlex(type, info) {
var result = function() {
var state = cx.state;
state.lexical = new HaxeLexical(state.indented, cx.stream.column(), type, null, state.lexical, info);
};
return result.lex = !0, result;
}
function poplex() {
var state = cx.state;
state.lexical.prev && (")" == state.lexical.type && (state.indented = state.lexical.indented), 
state.lexical = state.lexical.prev);
}
function expect(wanted) {
return function(type) {
return type == wanted ? cont() :";" == wanted ? pass() :cont(arguments.callee);
};
}
function statement(type) {
return "@" == type ? cont(metadef) :"var" == type ? cont(pushlex("vardef"), vardef1, expect(";"), poplex) :"keyword a" == type ? cont(pushlex("form"), expression, statement, poplex) :"keyword b" == type ? cont(pushlex("form"), statement, poplex) :"{" == type ? cont(pushlex("}"), pushcontext, block, poplex, popcontext) :";" == type ? cont() :"attribute" == type ? cont(maybeattribute) :"function" == type ? cont(functiondef) :"for" == type ? cont(pushlex("form"), expect("("), pushlex(")"), forspec1, expect(")"), poplex, statement, poplex) :"variable" == type ? cont(pushlex("stat"), maybelabel) :"switch" == type ? cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"), block, poplex, poplex) :"case" == type ? cont(expression, expect(":")) :"default" == type ? cont(expect(":")) :"catch" == type ? cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"), statement, poplex, popcontext) :"import" == type ? cont(importdef, expect(";")) :"typedef" == type ? cont(typedef) :pass(pushlex("stat"), expression, expect(";"), poplex);
}
function expression(type) {
return atomicTypes.hasOwnProperty(type) ? cont(maybeoperator) :"function" == type ? cont(functiondef) :"keyword c" == type ? cont(maybeexpression) :"(" == type ? cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeoperator) :"operator" == type ? cont(expression) :"[" == type ? cont(pushlex("]"), commasep(expression, "]"), poplex, maybeoperator) :"{" == type ? cont(pushlex("}"), commasep(objprop, "}"), poplex, maybeoperator) :cont();
}
function maybeexpression(type) {
return type.match(/[;\}\)\],]/) ? pass() :pass(expression);
}
function maybeoperator(type, value) {
if ("operator" == type && /\+\+|--/.test(value)) return cont(maybeoperator);
if ("operator" == type || ":" == type) return cont(expression);
if (";" != type) return "(" == type ? cont(pushlex(")"), commasep(expression, ")"), poplex, maybeoperator) :"." == type ? cont(property, maybeoperator) :"[" == type ? cont(pushlex("]"), expression, expect("]"), poplex, maybeoperator) :void 0;
}
function maybeattribute(type) {
return "attribute" == type ? cont(maybeattribute) :"function" == type ? cont(functiondef) :"var" == type ? cont(vardef1) :void 0;
}
function metadef(type) {
return ":" == type ? cont(metadef) :"variable" == type ? cont(metadef) :"(" == type ? cont(pushlex(")"), commasep(metaargs, ")"), poplex, statement) :void 0;
}
function metaargs(type) {
return "variable" == type ? cont() :void 0;
}
function importdef(type, value) {
return "variable" == type && /[A-Z]/.test(value.charAt(0)) ? (registerimport(value), 
cont()) :"variable" == type || "property" == type || "." == type ? cont(importdef) :void 0;
}
function typedef(type, value) {
return "variable" == type && /[A-Z]/.test(value.charAt(0)) ? (registerimport(value), 
cont()) :void 0;
}
function maybelabel(type) {
return ":" == type ? cont(poplex, statement) :pass(maybeoperator, expect(";"), poplex);
}
function property(type) {
return "variable" == type ? (cx.marked = "property", cont()) :void 0;
}
function objprop(type) {
return "variable" == type && (cx.marked = "property"), atomicTypes.hasOwnProperty(type) ? cont(expect(":"), expression) :void 0;
}
function commasep(what, end) {
function proceed(type) {
return "," == type ? cont(what, proceed) :type == end ? cont() :cont(expect(end));
}
return function(type) {
return type == end ? cont() :pass(what, proceed);
};
}
function block(type) {
return "}" == type ? cont() :pass(statement, block);
}
function vardef1(type, value) {
return "variable" == type ? (register(value), cont(typeuse, vardef2)) :cont();
}
function vardef2(type, value) {
return "=" == value ? cont(expression, vardef2) :"," == type ? cont(vardef1) :void 0;
}
function forspec1(type, value) {
return "variable" == type && register(value), cont(pushlex(")"), pushcontext, forin, expression, poplex, statement, popcontext);
}
function forin(_type, value) {
return "in" == value ? cont() :void 0;
}
function functiondef(type, value) {
return "variable" == type ? (register(value), cont(functiondef)) :"new" == value ? cont(functiondef) :"(" == type ? cont(pushlex(")"), pushcontext, commasep(funarg, ")"), poplex, typeuse, statement, popcontext) :void 0;
}
function typeuse(type) {
return ":" == type ? cont(typestring) :void 0;
}
function typestring(type) {
return "type" == type ? cont() :"variable" == type ? cont() :"{" == type ? cont(pushlex("}"), commasep(typeprop, "}"), poplex) :void 0;
}
function typeprop(type) {
return "variable" == type ? cont(typeuse) :void 0;
}
function funarg(type, value) {
return "variable" == type ? (register(value), cont(typeuse)) :void 0;
}
var type, content, indentUnit = config.indentUnit, keywords = function() {
function kw(type) {
return {
type:type,
style:"keyword"
};
}
var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), operator = kw("operator"), atom = {
type:"atom",
style:"atom"
}, attribute = {
type:"attribute",
style:"attribute"
}, type = kw("typedef");
return {
"if":A,
"while":A,
"else":B,
"do":B,
"try":B,
"return":C,
"break":C,
"continue":C,
"new":C,
"throw":C,
"var":kw("var"),
inline:attribute,
"static":attribute,
using:kw("import"),
"public":attribute,
"private":attribute,
cast:kw("cast"),
"import":kw("import"),
macro:kw("macro"),
"function":kw("function"),
"catch":kw("catch"),
untyped:kw("untyped"),
callback:kw("cb"),
"for":kw("for"),
"switch":kw("switch"),
"case":kw("case"),
"default":kw("default"),
"in":operator,
never:kw("property_access"),
trace:kw("trace"),
"class":type,
"enum":type,
"interface":type,
typedef:type,
"extends":type,
"implements":type,
dynamic:type,
"true":atom,
"false":atom,
"null":atom
};
}(), isOperatorChar = /[+\-*&%=<>!?|]/, atomicTypes = {
atom:!0,
number:!0,
variable:!0,
string:!0,
regexp:!0
}, cx = {
state:null,
column:null,
marked:null,
cc:null
}, defaultVars = {
name:"this",
next:null
};
return poplex.lex = !0, {
startState:function(basecolumn) {
var defaulttypes = [ "Int", "Float", "String", "Void", "Std", "Bool", "Dynamic", "Array" ];
return {
tokenize:haxeTokenBase,
reAllowed:!0,
kwAllowed:!0,
cc:[],
lexical:new HaxeLexical((basecolumn || 0) - indentUnit, 0, "block", !1),
localVars:parserConfig.localVars,
importedtypes:defaulttypes,
context:parserConfig.localVars && {
vars:parserConfig.localVars
},
indented:0
};
},
token:function(stream, state) {
if (stream.sol() && (state.lexical.hasOwnProperty("align") || (state.lexical.align = !1), 
state.indented = stream.indentation()), stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
return "comment" == type ? style :(state.reAllowed = !("operator" != type && "keyword c" != type && !type.match(/^[\[{}\(,;:]$/)), 
state.kwAllowed = "." != type, parseHaxe(state, style, type, content, stream));
},
indent:function(state, textAfter) {
if (state.tokenize != haxeTokenBase) return 0;
var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;
"stat" == lexical.type && "}" == firstChar && (lexical = lexical.prev);
var type = lexical.type, closing = firstChar == type;
return "vardef" == type ? lexical.indented + 4 :"form" == type && "{" == firstChar ? lexical.indented :"stat" == type || "form" == type ? lexical.indented + indentUnit :"switch" != lexical.info || closing ? lexical.align ? lexical.column + (closing ? 0 :1) :lexical.indented + (closing ? 0 :indentUnit) :lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit :2 * indentUnit);
},
electricChars:"{}"
};
}), CodeMirror.defineMIME("text/x-haxe", "haxe");