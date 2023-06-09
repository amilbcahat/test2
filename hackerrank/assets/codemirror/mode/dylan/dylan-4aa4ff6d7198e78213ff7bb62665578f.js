// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("dylan", function() {
function chain(stream, state, f) {
return state.tokenize = f, f(stream, state);
}
function ret(_type, style, _content) {
return type = _type, content = _content, style;
}
function tokenBase(stream, state) {
var ch = stream.peek();
if ("'" == ch || '"' == ch) return stream.next(), chain(stream, state, tokenString(ch, "string", "string"));
if ("/" == ch) return stream.next(), stream.eat("*") ? chain(stream, state, tokenComment) :stream.eat("/") ? (stream.skipToEnd(), 
ret("comment", "comment")) :(stream.skipTo(" "), ret("operator", "operator"));
if (/\d/.test(ch)) return stream.match(/^\d*(?:\.\d*)?(?:e[+\-]?\d+)?/), ret("number", "number");
if ("#" == ch) return stream.next(), ch = stream.peek(), '"' == ch ? (stream.next(), 
chain(stream, state, tokenString('"', "symbol", "string-2"))) :"b" == ch ? (stream.next(), 
stream.eatWhile(/[01]/), ret("number", "number")) :"x" == ch ? (stream.next(), stream.eatWhile(/[\da-f]/i), 
ret("number", "number")) :"o" == ch ? (stream.next(), stream.eatWhile(/[0-7]/), 
ret("number", "number")) :(stream.eatWhile(/[-a-zA-Z]/), ret("hash", "keyword"));
if (stream.match("end")) return ret("end", "keyword");
for (var name in patterns) if (patterns.hasOwnProperty(name)) {
var pattern = patterns[name];
if (pattern instanceof Array && pattern.some(function(p) {
return stream.match(p);
}) || stream.match(pattern)) return ret(name, patternStyles[name], stream.current());
}
return stream.match("define") ? ret("definition", "def") :(stream.eatWhile(/[\w\-]/), 
wordLookup[stream.current()] ? ret(wordLookup[stream.current()], styleLookup[stream.current()], stream.current()) :stream.current().match(symbol) ? ret("variable", "variable") :(stream.next(), 
ret("other", "variable-2")));
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
function tokenString(quote, type, style) {
return function(stream, state) {
for (var next, end = !1; null != (next = stream.next()); ) if (next == quote) {
end = !0;
break;
}
return end && (state.tokenize = tokenBase), ret(type, style);
};
}
var words = {
unnamedDefinition:[ "interface" ],
namedDefinition:[ "module", "library", "macro", "C-struct", "C-union", "C-function", "C-callable-wrapper" ],
typeParameterizedDefinition:[ "class", "C-subtype", "C-mapped-subtype" ],
otherParameterizedDefinition:[ "method", "function", "C-variable", "C-address" ],
constantSimpleDefinition:[ "constant" ],
variableSimpleDefinition:[ "variable" ],
otherSimpleDefinition:[ "generic", "domain", "C-pointer-type", "table" ],
statement:[ "if", "block", "begin", "method", "case", "for", "select", "when", "unless", "until", "while", "iterate", "profiling", "dynamic-bind" ],
separator:[ "finally", "exception", "cleanup", "else", "elseif", "afterwards" ],
other:[ "above", "below", "by", "from", "handler", "in", "instance", "let", "local", "otherwise", "slot", "subclass", "then", "to", "keyed-by", "virtual" ],
signalingCalls:[ "signal", "error", "cerror", "break", "check-type", "abort" ]
};
words.otherDefinition = words.unnamedDefinition.concat(words.namedDefinition).concat(words.otherParameterizedDefinition), 
words.definition = words.typeParameterizedDefinition.concat(words.otherDefinition), 
words.parameterizedDefinition = words.typeParameterizedDefinition.concat(words.otherParameterizedDefinition), 
words.simpleDefinition = words.constantSimpleDefinition.concat(words.variableSimpleDefinition).concat(words.otherSimpleDefinition), 
words.keyword = words.statement.concat(words.separator).concat(words.other);
var symbolPattern = "[-_a-zA-Z?!*@<>$%]+", symbol = new RegExp("^" + symbolPattern), patterns = {
symbolKeyword:symbolPattern + ":",
symbolClass:"<" + symbolPattern + ">",
symbolGlobal:"\\*" + symbolPattern + "\\*",
symbolConstant:"\\$" + symbolPattern
}, patternStyles = {
symbolKeyword:"atom",
symbolClass:"tag",
symbolGlobal:"variable-2",
symbolConstant:"variable-3"
};
for (var patternName in patterns) patterns.hasOwnProperty(patternName) && (patterns[patternName] = new RegExp("^" + patterns[patternName]));
patterns.keyword = [ /^with(?:out)?-[-_a-zA-Z?!*@<>$%]+/ ];
var styles = {};
styles.keyword = "keyword", styles.definition = "def", styles.simpleDefinition = "def", 
styles.signalingCalls = "builtin";
var wordLookup = {}, styleLookup = {};
[ "keyword", "definition", "simpleDefinition", "signalingCalls" ].forEach(function(type) {
words[type].forEach(function(word) {
wordLookup[word] = type, styleLookup[word] = styles[type];
});
});
var type, content;
return {
startState:function() {
return {
tokenize:tokenBase,
currentIndent:0
};
},
token:function(stream, state) {
if (stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
return style;
},
blockCommentStart:"/*",
blockCommentEnd:"*/"
};
}), CodeMirror.defineMIME("text/x-dylan", "dylan");
});