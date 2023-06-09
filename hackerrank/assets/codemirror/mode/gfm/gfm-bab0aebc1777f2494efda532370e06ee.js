// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../markdown/markdown"), require("../../addon/mode/overlay")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../markdown/markdown", "../../addon/mode/overlay" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("gfm", function(config, modeConfig) {
function blankLine(state) {
return state.code = !1, null;
}
var codeDepth = 0, gfmOverlay = {
startState:function() {
return {
code:!1,
codeBlock:!1,
ateSpace:!1
};
},
copyState:function(s) {
return {
code:s.code,
codeBlock:s.codeBlock,
ateSpace:s.ateSpace
};
},
token:function(stream, state) {
if (state.combineTokens = null, state.codeBlock) return stream.match(/^```/) ? (state.codeBlock = !1, 
null) :(stream.skipToEnd(), null);
if (stream.sol() && (state.code = !1), stream.sol() && stream.match(/^```/)) return stream.skipToEnd(), 
state.codeBlock = !0, null;
if ("`" === stream.peek()) {
stream.next();
var before = stream.pos;
stream.eatWhile("`");
var difference = 1 + stream.pos - before;
return state.code ? difference === codeDepth && (state.code = !1) :(codeDepth = difference, 
state.code = !0), null;
}
if (state.code) return stream.next(), null;
if (stream.eatSpace()) return state.ateSpace = !0, null;
if (stream.sol() || state.ateSpace) {
if (state.ateSpace = !1, stream.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/)) return state.combineTokens = !0, 
"link";
if (stream.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) return state.combineTokens = !0, 
"link";
}
return stream.match(/^((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))/i) && "](" != stream.string.slice(stream.start - 2, stream.start) ? (state.combineTokens = !0, 
"link") :(stream.next(), null);
},
blankLine:blankLine
}, markdownConfig = {
underscoresBreakWords:!1,
taskLists:!0,
fencedCodeBlocks:!0
};
for (var attr in modeConfig) markdownConfig[attr] = modeConfig[attr];
return markdownConfig.name = "markdown", CodeMirror.defineMIME("gfmBase", markdownConfig), 
CodeMirror.overlayMode(CodeMirror.getMode(config, "gfmBase"), gfmOverlay);
}, "markdown");
});