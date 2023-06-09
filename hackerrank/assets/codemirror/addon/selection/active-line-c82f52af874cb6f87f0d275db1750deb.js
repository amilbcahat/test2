// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function clearActiveLines(cm) {
for (var i = 0; i < cm.state.activeLines.length; i++) cm.removeLineClass(cm.state.activeLines[i], "wrap", WRAP_CLASS), 
cm.removeLineClass(cm.state.activeLines[i], "background", BACK_CLASS);
}
function sameArray(a, b) {
if (a.length != b.length) return !1;
for (var i = 0; i < a.length; i++) if (a[i] != b[i]) return !1;
return !0;
}
function updateActiveLines(cm, ranges) {
for (var active = [], i = 0; i < ranges.length; i++) {
var range = ranges[i];
if (range.empty()) {
var line = cm.getLineHandleVisualStart(range.head.line);
active[active.length - 1] != line && active.push(line);
}
}
sameArray(cm.state.activeLines, active) || cm.operation(function() {
clearActiveLines(cm);
for (var i = 0; i < active.length; i++) cm.addLineClass(active[i], "wrap", WRAP_CLASS), 
cm.addLineClass(active[i], "background", BACK_CLASS);
cm.state.activeLines = active;
});
}
function selectionChange(cm, sel) {
updateActiveLines(cm, sel.ranges);
}
var WRAP_CLASS = "CodeMirror-activeline", BACK_CLASS = "CodeMirror-activeline-background";
CodeMirror.defineOption("styleActiveLine", !1, function(cm, val, old) {
var prev = old && old != CodeMirror.Init;
val && !prev ? (cm.state.activeLines = [], updateActiveLines(cm, cm.listSelections()), 
cm.on("beforeSelectionChange", selectionChange)) :!val && prev && (cm.off("beforeSelectionChange", selectionChange), 
clearActiveLines(cm), delete cm.state.activeLines);
});
});