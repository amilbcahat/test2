var _requirejs = requirejs; requirejs = undefined; var _require = require; require = undefined; var _define = define; define = undefined; 
// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("jinja2", function() {
function tokenBase(stream, state) {
var ch = stream.peek();
if (state.incomment) return stream.skipTo("#}") ? (stream.eatWhile(/\#|}/), state.incomment = !1) :stream.skipToEnd(), 
"comment";
if (state.intag) {
if (state.operator) {
if (state.operator = !1, stream.match(atom)) return "atom";
if (stream.match(number)) return "number";
}
if (state.sign) {
if (state.sign = !1, stream.match(atom)) return "atom";
if (stream.match(number)) return "number";
}
if (state.instring) return ch == state.instring && (state.instring = !1), stream.next(), 
"string";
if ("'" == ch || '"' == ch) return state.instring = ch, stream.next(), "string";
if (stream.match(state.intag + "}") || stream.eat("-") && stream.match(state.intag + "}")) return state.intag = !1, 
"tag";
if (stream.match(operator)) return state.operator = !0, "operator";
if (stream.match(sign)) state.sign = !0; else if (stream.eat(" ") || stream.sol()) {
if (stream.match(keywords)) return "keyword";
if (stream.match(atom)) return "atom";
if (stream.match(number)) return "number";
stream.sol() && stream.next();
} else stream.next();
return "variable";
}
if (stream.eat("{")) {
if (ch = stream.eat("#")) return state.incomment = !0, stream.skipTo("#}") ? (stream.eatWhile(/\#|}/), 
state.incomment = !1) :stream.skipToEnd(), "comment";
if (ch = stream.eat(/\{|%/)) return state.intag = ch, "{" == ch && (state.intag = "}"), 
stream.eat("-"), "tag";
}
stream.next();
}
var keywords = [ "and", "as", "block", "endblock", "by", "cycle", "debug", "else", "elif", "extends", "filter", "endfilter", "firstof", "for", "endfor", "if", "endif", "ifchanged", "endifchanged", "ifequal", "endifequal", "ifnotequal", "endifnotequal", "in", "include", "load", "not", "now", "or", "parsed", "regroup", "reversed", "spaceless", "endspaceless", "ssi", "templatetag", "openblock", "closeblock", "openvariable", "closevariable", "openbrace", "closebrace", "opencomment", "closecomment", "widthratio", "url", "with", "endwith", "get_current_language", "trans", "endtrans", "noop", "blocktrans", "endblocktrans", "get_available_languages", "get_current_language_bidi", "plural" ], operator = /^[+\-*&%=<>!?|~^]/, sign = /^[:\[\(\{]/, atom = [ "true", "false" ], number = /^(\d[+\-\*\/])?\d+(\.\d+)?/;
return keywords = new RegExp("((" + keywords.join(")|(") + "))\\b"), atom = new RegExp("((" + atom.join(")|(") + "))\\b"), 
{
startState:function() {
return {
tokenize:tokenBase
};
},
token:function(stream, state) {
return state.tokenize(stream, state);
}
};
});
});
var requirejs = _requirejs; _requirejs = undefined; var require = _require; _require = undefined; var define = _define; _define = undefined; 