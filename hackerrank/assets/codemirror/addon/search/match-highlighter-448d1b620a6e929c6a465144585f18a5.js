// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function State(options) {
"object" == typeof options && (this.minChars = options.minChars, this.style = options.style, 
this.showToken = options.showToken, this.delay = options.delay), null == this.style && (this.style = DEFAULT_TOKEN_STYLE), 
null == this.minChars && (this.minChars = DEFAULT_MIN_CHARS), null == this.delay && (this.delay = DEFAULT_DELAY), 
this.overlay = this.timeout = null;
}
function cursorActivity(cm) {
var state = cm.state.matchHighlighter;
clearTimeout(state.timeout), state.timeout = setTimeout(function() {
highlightMatches(cm);
}, state.delay);
}
function highlightMatches(cm) {
cm.operation(function() {
var state = cm.state.matchHighlighter;
if (state.overlay && (cm.removeOverlay(state.overlay), state.overlay = null), !cm.somethingSelected() && state.showToken) {
for (var re = state.showToken === !0 ? /[\w$]/ :state.showToken, cur = cm.getCursor(), line = cm.getLine(cur.line), start = cur.ch, end = start; start && re.test(line.charAt(start - 1)); ) --start;
for (;end < line.length && re.test(line.charAt(end)); ) ++end;
return end > start && cm.addOverlay(state.overlay = makeOverlay(line.slice(start, end), re, state.style)), 
void 0;
}
var from = cm.getCursor("from"), to = cm.getCursor("to");
if (from.line == to.line) {
var selection = cm.getRange(from, to).replace(/^\s+|\s+$/g, "");
selection.length >= state.minChars && cm.addOverlay(state.overlay = makeOverlay(selection, !1, state.style));
}
});
}
function boundariesAround(stream, re) {
return !(stream.start && re.test(stream.string.charAt(stream.start - 1)) || stream.pos != stream.string.length && re.test(stream.string.charAt(stream.pos)));
}
function makeOverlay(query, hasBoundary, style) {
return {
token:function(stream) {
return !stream.match(query) || hasBoundary && !boundariesAround(stream, hasBoundary) ? (stream.next(), 
stream.skipTo(query.charAt(0)) || stream.skipToEnd(), void 0) :style;
}
};
}
var DEFAULT_MIN_CHARS = 2, DEFAULT_TOKEN_STYLE = "matchhighlight", DEFAULT_DELAY = 100;
CodeMirror.defineOption("highlightSelectionMatches", !1, function(cm, val, old) {
if (old && old != CodeMirror.Init) {
var over = cm.state.matchHighlighter.overlay;
over && cm.removeOverlay(over), clearTimeout(cm.state.matchHighlighter.timeout), 
cm.state.matchHighlighter = null, cm.off("cursorActivity", cursorActivity);
}
val && (cm.state.matchHighlighter = new State(val), highlightMatches(cm), cm.on("cursorActivity", cursorActivity));
});
});