var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("javascript", function(config, parserConfig) {
function readRegexp(stream) {
for (var next, escaped = !1, inSet = !1; null != (next = stream.next()); ) {
if (!escaped) {
if ("/" == next && !inSet) return;
"[" == next ? inSet = !0 :inSet && "]" == next && (inSet = !1);
}
escaped = !escaped && "\\" == next;
}
}
function ret(tp, style, cont) {
return type = tp, content = cont, style;
}
function tokenBase(stream, state) {
var ch = stream.next();
if ('"' == ch || "'" == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if ("." == ch && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) return ret("number", "number");
if ("." == ch && stream.match("..")) return ret("spread", "meta");
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return ret(ch);
if ("=" == ch && stream.eat(">")) return ret("=>", "operator");
if ("0" == ch && stream.eat(/x/i)) return stream.eatWhile(/[\da-f]/i), ret("number", "number");
if (/\d/.test(ch)) return stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), ret("number", "number");
if ("/" == ch) return stream.eat("*") ? (state.tokenize = tokenComment, tokenComment(stream, state)) :stream.eat("/") ? (stream.skipToEnd(), 
ret("comment", "comment")) :"operator" == state.lastType || "keyword c" == state.lastType || "sof" == state.lastType || /^[\[{}\(,;:]$/.test(state.lastType) ? (readRegexp(stream), 
stream.eatWhile(/[gimy]/), ret("regexp", "string-2")) :(stream.eatWhile(isOperatorChar), 
ret("operator", "operator", stream.current()));
if ("`" == ch) return state.tokenize = tokenQuasi, tokenQuasi(stream, state);
if ("#" == ch) return stream.skipToEnd(), ret("error", "error");
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), ret("operator", "operator", stream.current());
stream.eatWhile(/[\w\$_]/);
var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
return known && "." != state.lastType ? ret(known.type, known.style, word) :ret("variable", "variable", word);
}
function tokenString(quote) {
return function(stream, state) {
var next, escaped = !1;
if (jsonldMode && "@" == stream.peek() && stream.match(isJsonldKeyword)) return state.tokenize = tokenBase, 
ret("jsonld-keyword", "meta");
for (;null != (next = stream.next()) && (next != quote || escaped); ) escaped = !escaped && "\\" == next;
return escaped || (state.tokenize = tokenBase), ret("string", "string");
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
return ret("comment", "comment");
}
function tokenQuasi(stream, state) {
for (var next, escaped = !1; null != (next = stream.next()); ) {
if (!escaped && ("`" == next || "$" == next && stream.eat("{"))) {
state.tokenize = tokenBase;
break;
}
escaped = !escaped && "\\" == next;
}
return ret("quasi", "string-2", stream.current());
}
function findFatArrow(stream, state) {
state.fatArrowAt && (state.fatArrowAt = null);
var arrow = stream.string.indexOf("=>", stream.start);
if (!(0 > arrow)) {
for (var depth = 0, sawSomething = !1, pos = arrow - 1; pos >= 0; --pos) {
var ch = stream.string.charAt(pos), bracket = brackets.indexOf(ch);
if (bracket >= 0 && 3 > bracket) {
if (!depth) {
++pos;
break;
}
if (0 == --depth) break;
} else if (bracket >= 3 && 6 > bracket) ++depth; else if (/[$\w]/.test(ch)) sawSomething = !0; else if (sawSomething && !depth) {
++pos;
break;
}
}
sawSomething && !depth && (state.fatArrowAt = pos);
}
}
function JSLexical(indented, column, type, align, prev, info) {
this.indented = indented, this.column = column, this.type = type, this.prev = prev, 
this.info = info, null != align && (this.align = align);
}
function inScope(state, varname) {
for (var v = state.localVars; v; v = v.next) if (v.name == varname) return !0;
for (var cx = state.context; cx; cx = cx.prev) for (var v = cx.vars; v; v = v.next) if (v.name == varname) return !0;
}
function parseJS(state, style, type, content, stream) {
var cc = state.cc;
for (cx.state = state, cx.stream = stream, cx.marked = null, cx.cc = cc, cx.style = style, 
state.lexical.hasOwnProperty("align") || (state.lexical.align = !0); ;) {
var combinator = cc.length ? cc.pop() :jsonMode ? expression :statement;
if (combinator(type, content)) {
for (;cc.length && cc[cc.length - 1].lex; ) cc.pop()();
return cx.marked ? cx.marked :"variable" == type && inScope(state, content) ? "variable-2" :style;
}
}
}
function pass() {
for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
}
function cont() {
return pass.apply(null, arguments), !0;
}
function register(varname) {
function inList(list) {
for (var v = list; v; v = v.next) if (v.name == varname) return !0;
return !1;
}
var state = cx.state;
if (state.context) {
if (cx.marked = "def", inList(state.localVars)) return;
state.localVars = {
name:varname,
next:state.localVars
};
} else {
if (inList(state.globalVars)) return;
parserConfig.globalVars && (state.globalVars = {
name:varname,
next:state.globalVars
});
}
}
function pushcontext() {
cx.state.context = {
prev:cx.state.context,
vars:cx.state.localVars
}, cx.state.localVars = defaultVars;
}
function popcontext() {
cx.state.localVars = cx.state.context.vars, cx.state.context = cx.state.context.prev;
}
function pushlex(type, info) {
var result = function() {
var state = cx.state, indent = state.indented;
"stat" == state.lexical.type && (indent = state.lexical.indented), state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
};
return result.lex = !0, result;
}
function poplex() {
var state = cx.state;
state.lexical.prev && (")" == state.lexical.type && (state.indented = state.lexical.indented), 
state.lexical = state.lexical.prev);
}
function expect(wanted) {
function exp(type) {
return type == wanted ? cont() :";" == wanted ? pass() :cont(exp);
}
return exp;
}
function statement(type, value) {
return "var" == type ? cont(pushlex("vardef", value.length), vardef, expect(";"), poplex) :"keyword a" == type ? cont(pushlex("form"), expression, statement, poplex) :"keyword b" == type ? cont(pushlex("form"), statement, poplex) :"{" == type ? cont(pushlex("}"), block, poplex) :";" == type ? cont() :"if" == type ? ("else" == cx.state.lexical.info && cx.state.cc[cx.state.cc.length - 1] == poplex && cx.state.cc.pop()(), 
cont(pushlex("form"), expression, statement, poplex, maybeelse)) :"function" == type ? cont(functiondef) :"for" == type ? cont(pushlex("form"), forspec, statement, poplex) :"variable" == type ? cont(pushlex("stat"), maybelabel) :"switch" == type ? cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"), block, poplex, poplex) :"case" == type ? cont(expression, expect(":")) :"default" == type ? cont(expect(":")) :"catch" == type ? cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"), statement, poplex, popcontext) :"module" == type ? cont(pushlex("form"), pushcontext, afterModule, popcontext, poplex) :"class" == type ? cont(pushlex("form"), className, poplex) :"export" == type ? cont(pushlex("form"), afterExport, poplex) :"import" == type ? cont(pushlex("form"), afterImport, poplex) :pass(pushlex("stat"), expression, expect(";"), poplex);
}
function expression(type) {
return expressionInner(type, !1);
}
function expressionNoComma(type) {
return expressionInner(type, !0);
}
function expressionInner(type, noComma) {
if (cx.state.fatArrowAt == cx.stream.start) {
var body = noComma ? arrowBodyNoComma :arrowBody;
if ("(" == type) return cont(pushcontext, pushlex(")"), commasep(pattern, ")"), poplex, expect("=>"), body, popcontext);
if ("variable" == type) return pass(pushcontext, pattern, expect("=>"), body, popcontext);
}
var maybeop = noComma ? maybeoperatorNoComma :maybeoperatorComma;
return atomicTypes.hasOwnProperty(type) ? cont(maybeop) :"function" == type ? cont(functiondef, maybeop) :"keyword c" == type ? cont(noComma ? maybeexpressionNoComma :maybeexpression) :"(" == type ? cont(pushlex(")"), maybeexpression, comprehension, expect(")"), poplex, maybeop) :"operator" == type || "spread" == type ? cont(noComma ? expressionNoComma :expression) :"[" == type ? cont(pushlex("]"), arrayLiteral, poplex, maybeop) :"{" == type ? contCommasep(objprop, "}", null, maybeop) :"quasi" == type ? pass(quasi, maybeop) :cont();
}
function maybeexpression(type) {
return type.match(/[;\}\)\],]/) ? pass() :pass(expression);
}
function maybeexpressionNoComma(type) {
return type.match(/[;\}\)\],]/) ? pass() :pass(expressionNoComma);
}
function maybeoperatorComma(type, value) {
return "," == type ? cont(expression) :maybeoperatorNoComma(type, value, !1);
}
function maybeoperatorNoComma(type, value, noComma) {
var me = 0 == noComma ? maybeoperatorComma :maybeoperatorNoComma, expr = 0 == noComma ? expression :expressionNoComma;
return "=>" == value ? cont(pushcontext, noComma ? arrowBodyNoComma :arrowBody, popcontext) :"operator" == type ? /\+\+|--/.test(value) ? cont(me) :"?" == value ? cont(expression, expect(":"), expr) :cont(expr) :"quasi" == type ? pass(quasi, me) :";" != type ? "(" == type ? contCommasep(expressionNoComma, ")", "call", me) :"." == type ? cont(property, me) :"[" == type ? cont(pushlex("]"), maybeexpression, expect("]"), poplex, me) :void 0 :void 0;
}
function quasi(type, value) {
return "quasi" != type ? pass() :"${" != value.slice(value.length - 2) ? cont(quasi) :cont(expression, continueQuasi);
}
function continueQuasi(type) {
return "}" == type ? (cx.marked = "string-2", cx.state.tokenize = tokenQuasi, cont(quasi)) :void 0;
}
function arrowBody(type) {
return findFatArrow(cx.stream, cx.state), "{" == type ? pass(statement) :pass(expression);
}
function arrowBodyNoComma(type) {
return findFatArrow(cx.stream, cx.state), "{" == type ? pass(statement) :pass(expressionNoComma);
}
function maybelabel(type) {
return ":" == type ? cont(poplex, statement) :pass(maybeoperatorComma, expect(";"), poplex);
}
function property(type) {
return "variable" == type ? (cx.marked = "property", cont()) :void 0;
}
function objprop(type, value) {
return "variable" == type || "keyword" == cx.style ? (cx.marked = "property", "get" == value || "set" == value ? cont(getterSetter) :cont(afterprop)) :"number" == type || "string" == type ? (cx.marked = jsonldMode ? "property" :cx.style + " property", 
cont(afterprop)) :"jsonld-keyword" == type ? cont(afterprop) :"[" == type ? cont(expression, expect("]"), afterprop) :void 0;
}
function getterSetter(type) {
return "variable" != type ? pass(afterprop) :(cx.marked = "property", cont(functiondef));
}
function afterprop(type) {
return ":" == type ? cont(expressionNoComma) :"(" == type ? pass(functiondef) :void 0;
}
function commasep(what, end) {
function proceed(type) {
if ("," == type) {
var lex = cx.state.lexical;
return "call" == lex.info && (lex.pos = (lex.pos || 0) + 1), cont(what, proceed);
}
return type == end ? cont() :cont(expect(end));
}
return function(type) {
return type == end ? cont() :pass(what, proceed);
};
}
function contCommasep(what, end, info) {
for (var i = 3; i < arguments.length; i++) cx.cc.push(arguments[i]);
return cont(pushlex(end, info), commasep(what, end), poplex);
}
function block(type) {
return "}" == type ? cont() :pass(statement, block);
}
function maybetype(type) {
return isTS && ":" == type ? cont(typedef) :void 0;
}
function typedef(type) {
return "variable" == type ? (cx.marked = "variable-3", cont()) :void 0;
}
function vardef() {
return pass(pattern, maybetype, maybeAssign, vardefCont);
}
function pattern(type, value) {
return "variable" == type ? (register(value), cont()) :"[" == type ? contCommasep(pattern, "]") :"{" == type ? contCommasep(proppattern, "}") :void 0;
}
function proppattern(type, value) {
return "variable" != type || cx.stream.match(/^\s*:/, !1) ? ("variable" == type && (cx.marked = "property"), 
cont(expect(":"), pattern, maybeAssign)) :(register(value), cont(maybeAssign));
}
function maybeAssign(_type, value) {
return "=" == value ? cont(expressionNoComma) :void 0;
}
function vardefCont(type) {
return "," == type ? cont(vardef) :void 0;
}
function maybeelse(type, value) {
return "keyword b" == type && "else" == value ? cont(pushlex("form", "else"), statement, poplex) :void 0;
}
function forspec(type) {
return "(" == type ? cont(pushlex(")"), forspec1, expect(")"), poplex) :void 0;
}
function forspec1(type) {
return "var" == type ? cont(vardef, expect(";"), forspec2) :";" == type ? cont(forspec2) :"variable" == type ? cont(formaybeinof) :pass(expression, expect(";"), forspec2);
}
function formaybeinof(_type, value) {
return "in" == value || "of" == value ? (cx.marked = "keyword", cont(expression)) :cont(maybeoperatorComma, forspec2);
}
function forspec2(type, value) {
return ";" == type ? cont(forspec3) :"in" == value || "of" == value ? (cx.marked = "keyword", 
cont(expression)) :pass(expression, expect(";"), forspec3);
}
function forspec3(type) {
")" != type && cont(expression);
}
function functiondef(type, value) {
return "*" == value ? (cx.marked = "keyword", cont(functiondef)) :"variable" == type ? (register(value), 
cont(functiondef)) :"(" == type ? cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, statement, popcontext) :void 0;
}
function funarg(type) {
return "spread" == type ? cont(funarg) :pass(pattern, maybetype);
}
function className(type, value) {
return "variable" == type ? (register(value), cont(classNameAfter)) :void 0;
}
function classNameAfter(type, value) {
return "extends" == value ? cont(expression, classNameAfter) :"{" == type ? cont(pushlex("}"), classBody, poplex) :void 0;
}
function classBody(type, value) {
return "variable" == type || "keyword" == cx.style ? (cx.marked = "property", "get" == value || "set" == value ? cont(classGetterSetter, functiondef, classBody) :cont(functiondef, classBody)) :"*" == value ? (cx.marked = "keyword", 
cont(classBody)) :";" == type ? cont(classBody) :"}" == type ? cont() :void 0;
}
function classGetterSetter(type) {
return "variable" != type ? pass() :(cx.marked = "property", cont());
}
function afterModule(type, value) {
return "string" == type ? cont(statement) :"variable" == type ? (register(value), 
cont(maybeFrom)) :void 0;
}
function afterExport(_type, value) {
return "*" == value ? (cx.marked = "keyword", cont(maybeFrom, expect(";"))) :"default" == value ? (cx.marked = "keyword", 
cont(expression, expect(";"))) :pass(statement);
}
function afterImport(type) {
return "string" == type ? cont() :pass(importSpec, maybeFrom);
}
function importSpec(type, value) {
return "{" == type ? contCommasep(importSpec, "}") :("variable" == type && register(value), 
cont());
}
function maybeFrom(_type, value) {
return "from" == value ? (cx.marked = "keyword", cont(expression)) :void 0;
}
function arrayLiteral(type) {
return "]" == type ? cont() :pass(expressionNoComma, maybeArrayComprehension);
}
function maybeArrayComprehension(type) {
return "for" == type ? pass(comprehension, expect("]")) :"," == type ? cont(commasep(expressionNoComma, "]")) :pass(commasep(expressionNoComma, "]"));
}
function comprehension(type) {
return "for" == type ? cont(forspec, comprehension) :"if" == type ? cont(expression, comprehension) :void 0;
}
var type, content, indentUnit = config.indentUnit, statementIndent = parserConfig.statementIndent, jsonldMode = parserConfig.jsonld, jsonMode = parserConfig.json || jsonldMode, isTS = parserConfig.typescript, keywords = function() {
function kw(type) {
return {
type:type,
style:"keyword"
};
}
var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), operator = kw("operator"), atom = {
type:"atom",
style:"atom"
}, jsKeywords = {
"if":kw("if"),
"while":A,
"with":A,
"else":B,
"do":B,
"try":B,
"finally":B,
"return":C,
"break":C,
"continue":C,
"new":C,
"delete":C,
"throw":C,
"debugger":C,
"var":kw("var"),
"const":kw("var"),
let:kw("var"),
"function":kw("function"),
"catch":kw("catch"),
"for":kw("for"),
"switch":kw("switch"),
"case":kw("case"),
"default":kw("default"),
"in":operator,
"typeof":operator,
"instanceof":operator,
"true":atom,
"false":atom,
"null":atom,
undefined:atom,
NaN:atom,
Infinity:atom,
"this":kw("this"),
module:kw("module"),
"class":kw("class"),
"super":kw("atom"),
yield:C,
"export":kw("export"),
"import":kw("import"),
"extends":C
};
if (isTS) {
var type = {
type:"variable",
style:"variable-3"
}, tsKeywords = {
"interface":kw("interface"),
"extends":kw("extends"),
constructor:kw("constructor"),
"public":kw("public"),
"private":kw("private"),
"protected":kw("protected"),
"static":kw("static"),
string:type,
number:type,
bool:type,
any:type
};
for (var attr in tsKeywords) jsKeywords[attr] = tsKeywords[attr];
}
return jsKeywords;
}(), isOperatorChar = /[+\-*&%=<>!?|~^]/, isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/, brackets = "([{}])", atomicTypes = {
atom:!0,
number:!0,
variable:!0,
string:!0,
regexp:!0,
"this":!0,
"jsonld-keyword":!0
}, cx = {
state:null,
column:null,
marked:null,
cc:null
}, defaultVars = {
name:"this",
next:{
name:"arguments"
}
};
return poplex.lex = !0, {
startState:function(basecolumn) {
var state = {
tokenize:tokenBase,
lastType:"sof",
cc:[],
lexical:new JSLexical((basecolumn || 0) - indentUnit, 0, "block", !1),
localVars:parserConfig.localVars,
context:parserConfig.localVars && {
vars:parserConfig.localVars
},
indented:0
};
return parserConfig.globalVars && "object" == typeof parserConfig.globalVars && (state.globalVars = parserConfig.globalVars), 
state;
},
token:function(stream, state) {
if (stream.sol() && (state.lexical.hasOwnProperty("align") || (state.lexical.align = !1), 
state.indented = stream.indentation(), findFatArrow(stream, state)), state.tokenize != tokenComment && stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
return "comment" == type ? style :(state.lastType = "operator" != type || "++" != content && "--" != content ? type :"incdec", 
parseJS(state, style, type, content, stream));
},
indent:function(state, textAfter) {
if (state.tokenize == tokenComment) return CodeMirror.Pass;
if (state.tokenize != tokenBase) return 0;
var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;
if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
var c = state.cc[i];
if (c == poplex) lexical = lexical.prev; else if (c != maybeelse) break;
}
"stat" == lexical.type && "}" == firstChar && (lexical = lexical.prev), statementIndent && ")" == lexical.type && "stat" == lexical.prev.type && (lexical = lexical.prev);
var type = lexical.type, closing = firstChar == type;
return "vardef" == type ? lexical.indented + ("operator" == state.lastType || "," == state.lastType ? lexical.info + 1 :0) :"form" == type && "{" == firstChar ? lexical.indented :"form" == type ? lexical.indented + indentUnit :"stat" == type ? lexical.indented + ("operator" == state.lastType || "," == state.lastType ? statementIndent || indentUnit :0) :"switch" != lexical.info || closing || 0 == parserConfig.doubleIndentSwitch ? lexical.align ? lexical.column + (closing ? 0 :1) :lexical.indented + (closing ? 0 :indentUnit) :lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit :2 * indentUnit);
},
electricChars:":{}",
blockCommentStart:jsonMode ? null :"/*",
blockCommentEnd:jsonMode ? null :"*/",
lineComment:jsonMode ? null :"//",
fold:"brace",
helperType:jsonMode ? "json" :"javascript",
jsonldMode:jsonldMode,
jsonMode:jsonMode
};
}), CodeMirror.registerHelper("wordChars", "javascript", /[\\w$]/), CodeMirror.defineMIME("text/javascript", "javascript"), 
CodeMirror.defineMIME("text/ecmascript", "javascript"), CodeMirror.defineMIME("application/javascript", "javascript"), 
CodeMirror.defineMIME("application/x-javascript", "javascript"), CodeMirror.defineMIME("application/ecmascript", "javascript"), 
CodeMirror.defineMIME("application/json", {
name:"javascript",
json:!0
}), CodeMirror.defineMIME("application/x-json", {
name:"javascript",
json:!0
}), CodeMirror.defineMIME("application/ld+json", {
name:"javascript",
jsonld:!0
}), CodeMirror.defineMIME("text/typescript", {
name:"javascript",
typescript:!0
}), CodeMirror.defineMIME("application/typescript", {
name:"javascript",
typescript:!0
});
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 