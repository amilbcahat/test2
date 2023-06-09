var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("smarty", function(config) {
var settings = {
rightDelimiter:"}",
leftDelimiter:"{",
smartyVersion:2
};
config.hasOwnProperty("leftDelimiter") && (settings.leftDelimiter = config.leftDelimiter), 
config.hasOwnProperty("rightDelimiter") && (settings.rightDelimiter = config.rightDelimiter), 
config.hasOwnProperty("smartyVersion") && 3 === config.smartyVersion && (settings.smartyVersion = 3);
var last, keyFunctions = [ "debug", "extends", "function", "include", "literal" ], regs = {
operatorChars:/[+\-*&%=<>!?]/,
validIdentifier:/[a-zA-Z0-9_]/,
stringChar:/['"]/
}, helpers = {
cont:function(style, lastType) {
return last = lastType, style;
},
chain:function(stream, state, parser) {
return state.tokenize = parser, parser(stream, state);
}
}, parsers = {
tokenizer:function(stream, state) {
if (stream.match(settings.leftDelimiter, !0)) {
if (stream.eat("*")) return helpers.chain(stream, state, parsers.inBlock("comment", "*" + settings.rightDelimiter));
state.depth++;
var isEol = stream.eol(), isFollowedByWhitespace = /\s/.test(stream.peek());
return 3 === settings.smartyVersion && "{" === settings.leftDelimiter && (isEol || isFollowedByWhitespace) ? (state.depth--, 
null) :(state.tokenize = parsers.smarty, last = "startTag", "tag");
}
return stream.next(), null;
},
smarty:function(stream, state) {
if (stream.match(settings.rightDelimiter, !0)) return 3 === settings.smartyVersion ? (state.depth--, 
state.depth <= 0 && (state.tokenize = parsers.tokenizer)) :state.tokenize = parsers.tokenizer, 
helpers.cont("tag", null);
if (stream.match(settings.leftDelimiter, !0)) return state.depth++, helpers.cont("tag", "startTag");
var ch = stream.next();
if ("$" == ch) return stream.eatWhile(regs.validIdentifier), helpers.cont("variable-2", "variable");
if ("|" == ch) return helpers.cont("operator", "pipe");
if ("." == ch) return helpers.cont("operator", "property");
if (regs.stringChar.test(ch)) return state.tokenize = parsers.inAttribute(ch), helpers.cont("string", "string");
if (regs.operatorChars.test(ch)) return stream.eatWhile(regs.operatorChars), helpers.cont("operator", "operator");
if ("[" == ch || "]" == ch) return helpers.cont("bracket", "bracket");
if ("(" == ch || ")" == ch) return helpers.cont("bracket", "operator");
if (/\d/.test(ch)) return stream.eatWhile(/\d/), helpers.cont("number", "number");
if ("variable" == state.last) {
if ("@" == ch) return stream.eatWhile(regs.validIdentifier), helpers.cont("property", "property");
if ("|" == ch) return stream.eatWhile(regs.validIdentifier), helpers.cont("qualifier", "modifier");
} else {
if ("pipe" == state.last) return stream.eatWhile(regs.validIdentifier), helpers.cont("qualifier", "modifier");
if ("whitespace" == state.last) return stream.eatWhile(regs.validIdentifier), helpers.cont("attribute", "modifier");
}
if ("property" == state.last) return stream.eatWhile(regs.validIdentifier), helpers.cont("property", null);
if (/\s/.test(ch)) return last = "whitespace", null;
var str = "";
"/" != ch && (str += ch);
for (var c = null; c = stream.eat(regs.validIdentifier); ) str += c;
for (var i = 0, j = keyFunctions.length; j > i; i++) if (keyFunctions[i] == str) return helpers.cont("keyword", "keyword");
return /\s/.test(ch) ? null :helpers.cont("tag", "tag");
},
inAttribute:function(quote) {
return function(stream, state) {
for (var prevChar = null, currChar = null; !stream.eol(); ) {
if (currChar = stream.peek(), stream.next() == quote && "\\" !== prevChar) {
state.tokenize = parsers.smarty;
break;
}
prevChar = currChar;
}
return "string";
};
},
inBlock:function(style, terminator) {
return function(stream, state) {
for (;!stream.eol(); ) {
if (stream.match(terminator)) {
state.tokenize = parsers.tokenizer;
break;
}
stream.next();
}
return style;
};
}
};
return {
startState:function() {
return {
tokenize:parsers.tokenizer,
mode:"smarty",
last:null,
depth:0
};
},
token:function(stream, state) {
var style = state.tokenize(stream, state);
return state.last = last, style;
},
electricChars:""
};
}), CodeMirror.defineMIME("text/x-smarty", "smarty");
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 