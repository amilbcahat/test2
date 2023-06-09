// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("xquery", function() {
function ret(tp, style, cont) {
return type = tp, content = cont, style;
}
function chain(stream, state, f) {
return state.tokenize = f, f(stream, state);
}
function tokenBase(stream, state) {
var ch = stream.next(), mightBeFunction = !1, isEQName = isEQNameAhead(stream);
if ("<" == ch) {
if (stream.match("!--", !0)) return chain(stream, state, tokenXMLComment);
if (stream.match("![CDATA", !1)) return state.tokenize = tokenCDATA, ret("tag", "tag");
if (stream.match("?", !1)) return chain(stream, state, tokenPreProcessing);
var isclose = stream.eat("/");
stream.eatSpace();
for (var c, tagName = ""; c = stream.eat(/[^\s\u00a0=<>\"\'\/?]/); ) tagName += c;
return chain(stream, state, tokenTag(tagName, isclose));
}
if ("{" == ch) return pushStateStack(state, {
type:"codeblock"
}), ret("", null);
if ("}" == ch) return popStateStack(state), ret("", null);
if (isInXmlBlock(state)) return ">" == ch ? ret("tag", "tag") :"/" == ch && stream.eat(">") ? (popStateStack(state), 
ret("tag", "tag")) :ret("word", "variable");
if (/\d/.test(ch)) return stream.match(/^\d*(?:\.\d*)?(?:E[+\-]?\d+)?/), ret("number", "atom");
if ("(" === ch && stream.eat(":")) return pushStateStack(state, {
type:"comment"
}), chain(stream, state, tokenComment);
if (isEQName || '"' !== ch && "'" !== ch) {
if ("$" === ch) return chain(stream, state, tokenVariable);
if (":" === ch && stream.eat("=")) return ret("operator", "keyword");
if ("(" === ch) return pushStateStack(state, {
type:"paren"
}), ret("", null);
if (")" === ch) return popStateStack(state), ret("", null);
if ("[" === ch) return pushStateStack(state, {
type:"bracket"
}), ret("", null);
if ("]" === ch) return popStateStack(state), ret("", null);
var known = keywords.propertyIsEnumerable(ch) && keywords[ch];
if (isEQName && '"' === ch) for (;'"' !== stream.next(); ) ;
if (isEQName && "'" === ch) for (;"'" !== stream.next(); ) ;
known || stream.eatWhile(/[\w\$_-]/);
var foundColon = stream.eat(":");
!stream.eat(":") && foundColon && stream.eatWhile(/[\w\$_-]/), stream.match(/^[ \t]*\(/, !1) && (mightBeFunction = !0);
var word = stream.current();
return known = keywords.propertyIsEnumerable(word) && keywords[word], mightBeFunction && !known && (known = {
type:"function_call",
style:"variable def"
}), isInXmlConstructor(state) ? (popStateStack(state), ret("word", "variable", word)) :(("element" == word || "attribute" == word || "axis_specifier" == known.type) && pushStateStack(state, {
type:"xmlconstructor"
}), known ? ret(known.type, known.style, word) :ret("word", "variable", word));
}
return chain(stream, state, tokenString(ch));
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1, maybeNested = !1, nestedCount = 0; ch = stream.next(); ) {
if (")" == ch && maybeEnd) {
if (!(nestedCount > 0)) {
popStateStack(state);
break;
}
nestedCount--;
} else ":" == ch && maybeNested && nestedCount++;
maybeEnd = ":" == ch, maybeNested = "(" == ch;
}
return ret("comment", "comment");
}
function tokenString(quote, f) {
return function(stream, state) {
var ch;
if (isInString(state) && stream.current() == quote) return popStateStack(state), 
f && (state.tokenize = f), ret("string", "string");
if (pushStateStack(state, {
type:"string",
name:quote,
tokenize:tokenString(quote, f)
}), stream.match("{", !1) && isInXmlAttributeBlock(state)) return state.tokenize = tokenBase, 
ret("string", "string");
for (;ch = stream.next(); ) {
if (ch == quote) {
popStateStack(state), f && (state.tokenize = f);
break;
}
if (stream.match("{", !1) && isInXmlAttributeBlock(state)) return state.tokenize = tokenBase, 
ret("string", "string");
}
return ret("string", "string");
};
}
function tokenVariable(stream, state) {
var isVariableChar = /[\w\$_-]/;
if (stream.eat('"')) {
for (;'"' !== stream.next(); ) ;
stream.eat(":");
} else stream.eatWhile(isVariableChar), stream.match(":=", !1) || stream.eat(":");
return stream.eatWhile(isVariableChar), state.tokenize = tokenBase, ret("variable", "variable");
}
function tokenTag(name, isclose) {
return function(stream, state) {
return stream.eatSpace(), isclose && stream.eat(">") ? (popStateStack(state), state.tokenize = tokenBase, 
ret("tag", "tag")) :(stream.eat("/") || pushStateStack(state, {
type:"tag",
name:name,
tokenize:tokenBase
}), stream.eat(">") ? (state.tokenize = tokenBase, ret("tag", "tag")) :(state.tokenize = tokenAttribute, 
ret("tag", "tag")));
};
}
function tokenAttribute(stream, state) {
var ch = stream.next();
return "/" == ch && stream.eat(">") ? (isInXmlAttributeBlock(state) && popStateStack(state), 
isInXmlBlock(state) && popStateStack(state), ret("tag", "tag")) :">" == ch ? (isInXmlAttributeBlock(state) && popStateStack(state), 
ret("tag", "tag")) :"=" == ch ? ret("", null) :'"' == ch || "'" == ch ? chain(stream, state, tokenString(ch, tokenAttribute)) :(isInXmlAttributeBlock(state) || pushStateStack(state, {
type:"attribute",
tokenize:tokenAttribute
}), stream.eat(/[a-zA-Z_:]/), stream.eatWhile(/[-a-zA-Z0-9_:.]/), stream.eatSpace(), 
(stream.match(">", !1) || stream.match("/", !1)) && (popStateStack(state), state.tokenize = tokenBase), 
ret("attribute", "attribute"));
}
function tokenXMLComment(stream, state) {
for (var ch; ch = stream.next(); ) if ("-" == ch && stream.match("->", !0)) return state.tokenize = tokenBase, 
ret("comment", "comment");
}
function tokenCDATA(stream, state) {
for (var ch; ch = stream.next(); ) if ("]" == ch && stream.match("]", !0)) return state.tokenize = tokenBase, 
ret("comment", "comment");
}
function tokenPreProcessing(stream, state) {
for (var ch; ch = stream.next(); ) if ("?" == ch && stream.match(">", !0)) return state.tokenize = tokenBase, 
ret("comment", "comment meta");
}
function isInXmlBlock(state) {
return isIn(state, "tag");
}
function isInXmlAttributeBlock(state) {
return isIn(state, "attribute");
}
function isInXmlConstructor(state) {
return isIn(state, "xmlconstructor");
}
function isInString(state) {
return isIn(state, "string");
}
function isEQNameAhead(stream) {
return '"' === stream.current() ? stream.match(/^[^\"]+\"\:/, !1) :"'" === stream.current() ? stream.match(/^[^\"]+\'\:/, !1) :!1;
}
function isIn(state, type) {
return state.stack.length && state.stack[state.stack.length - 1].type == type;
}
function pushStateStack(state, newState) {
state.stack.push(newState);
}
function popStateStack(state) {
state.stack.pop();
var reinstateTokenize = state.stack.length && state.stack[state.stack.length - 1].tokenize;
state.tokenize = reinstateTokenize || tokenBase;
}
var type, content, keywords = function() {
function kw(type) {
return {
type:type,
style:"keyword"
};
}
for (var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), operator = kw("operator"), atom = {
type:"atom",
style:"atom"
}, punctuation = {
type:"punctuation",
style:null
}, qualifier = {
type:"axis_specifier",
style:"qualifier"
}, kwObj = {
"if":A,
"switch":A,
"while":A,
"for":A,
"else":B,
then:B,
"try":B,
"finally":B,
"catch":B,
element:C,
attribute:C,
let:C,
"implements":C,
"import":C,
module:C,
namespace:C,
"return":C,
"super":C,
"this":C,
"throws":C,
where:C,
"private":C,
",":punctuation,
"null":atom,
"fn:false()":atom,
"fn:true()":atom
}, basic = [ "after", "ancestor", "ancestor-or-self", "and", "as", "ascending", "assert", "attribute", "before", "by", "case", "cast", "child", "comment", "declare", "default", "define", "descendant", "descendant-or-self", "descending", "document", "document-node", "element", "else", "eq", "every", "except", "external", "following", "following-sibling", "follows", "for", "function", "if", "import", "in", "instance", "intersect", "item", "let", "module", "namespace", "node", "node", "of", "only", "or", "order", "parent", "precedes", "preceding", "preceding-sibling", "processing-instruction", "ref", "return", "returns", "satisfies", "schema", "schema-element", "self", "some", "sortby", "stable", "text", "then", "to", "treat", "typeswitch", "union", "variable", "version", "where", "xquery", "empty-sequence" ], i = 0, l = basic.length; l > i; i++) kwObj[basic[i]] = kw(basic[i]);
for (var types = [ "xs:string", "xs:float", "xs:decimal", "xs:double", "xs:integer", "xs:boolean", "xs:date", "xs:dateTime", "xs:time", "xs:duration", "xs:dayTimeDuration", "xs:time", "xs:yearMonthDuration", "numeric", "xs:hexBinary", "xs:base64Binary", "xs:anyURI", "xs:QName", "xs:byte", "xs:boolean", "xs:anyURI", "xf:yearMonthDuration" ], i = 0, l = types.length; l > i; i++) kwObj[types[i]] = atom;
for (var operators = [ "eq", "ne", "lt", "le", "gt", "ge", ":=", "=", ">", ">=", "<", "<=", ".", "|", "?", "and", "or", "div", "idiv", "mod", "*", "/", "+", "-" ], i = 0, l = operators.length; l > i; i++) kwObj[operators[i]] = operator;
for (var axis_specifiers = [ "self::", "attribute::", "child::", "descendant::", "descendant-or-self::", "parent::", "ancestor::", "ancestor-or-self::", "following::", "preceding::", "following-sibling::", "preceding-sibling::" ], i = 0, l = axis_specifiers.length; l > i; i++) kwObj[axis_specifiers[i]] = qualifier;
return kwObj;
}();
return {
startState:function() {
return {
tokenize:tokenBase,
cc:[],
stack:[]
};
},
token:function(stream, state) {
if (stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
return style;
},
blockCommentStart:"(:",
blockCommentEnd:":)"
};
}), CodeMirror.defineMIME("application/xquery", "xquery");
});