// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("yaml", function() {
var cons = [ "true", "false", "on", "off", "yes", "no" ], keywordRegex = new RegExp("\\b((" + cons.join(")|(") + "))$", "i");
return {
token:function(stream, state) {
var ch = stream.peek(), esc = state.escaped;
if (state.escaped = !1, "#" == ch && (0 == stream.pos || /\s/.test(stream.string.charAt(stream.pos - 1)))) return stream.skipToEnd(), 
"comment";
if (state.literal && stream.indentation() > state.keyCol) return stream.skipToEnd(), 
"string";
if (state.literal && (state.literal = !1), stream.sol()) {
if (state.keyCol = 0, state.pair = !1, state.pairStart = !1, stream.match(/---/)) return "def";
if (stream.match(/\.\.\./)) return "def";
if (stream.match(/\s*-\s+/)) return "meta";
}
if (stream.match(/^(\{|\}|\[|\])/)) return "{" == ch ? state.inlinePairs++ :"}" == ch ? state.inlinePairs-- :"[" == ch ? state.inlineList++ :state.inlineList--, 
"meta";
if (state.inlineList > 0 && !esc && "," == ch) return stream.next(), "meta";
if (state.inlinePairs > 0 && !esc && "," == ch) return state.keyCol = 0, state.pair = !1, 
state.pairStart = !1, stream.next(), "meta";
if (state.pairStart) {
if (stream.match(/^\s*(\||\>)\s*/)) return state.literal = !0, "meta";
if (stream.match(/^\s*(\&|\*)[a-z0-9\._-]+\b/i)) return "variable-2";
if (0 == state.inlinePairs && stream.match(/^\s*-?[0-9\.\,]+\s?$/)) return "number";
if (state.inlinePairs > 0 && stream.match(/^\s*-?[0-9\.\,]+\s?(?=(,|}))/)) return "number";
if (stream.match(keywordRegex)) return "keyword";
}
return !state.pair && stream.match(/^\s*\S+(?=\s*:($|\s))/i) ? (state.pair = !0, 
state.keyCol = stream.indentation(), "atom") :state.pair && stream.match(/^:\s*/) ? (state.pairStart = !0, 
"meta") :(state.pairStart = !1, state.escaped = "\\" == ch, stream.next(), null);
},
startState:function() {
return {
pair:!1,
pairStart:!1,
keyCol:0,
inlinePairs:0,
inlineList:0,
literal:!1,
escaped:!1
};
}
};
}), CodeMirror.defineMIME("text/x-yaml", "yaml");
});