// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function onCursorActivity(cm) {
cm.operation(function() {
update(cm);
});
}
function onChange(cm) {
cm.state.markedSelection.length && cm.operation(function() {
clear(cm);
});
}
function coverRange(cm, from, to, addAt) {
if (0 != cmp(from, to)) for (var array = cm.state.markedSelection, cls = cm.state.markedSelectionStyle, line = from.line; ;) {
var start = line == from.line ? from :Pos(line, 0), endLine = line + CHUNK_SIZE, atEnd = endLine >= to.line, end = atEnd ? to :Pos(endLine, 0), mark = cm.markText(start, end, {
className:cls
});
if (null == addAt ? array.push(mark) :array.splice(addAt++, 0, mark), atEnd) break;
line = endLine;
}
}
function clear(cm) {
for (var array = cm.state.markedSelection, i = 0; i < array.length; ++i) array[i].clear();
array.length = 0;
}
function reset(cm) {
clear(cm);
for (var ranges = cm.listSelections(), i = 0; i < ranges.length; i++) coverRange(cm, ranges[i].from(), ranges[i].to());
}
function update(cm) {
if (!cm.somethingSelected()) return clear(cm);
if (cm.listSelections().length > 1) return reset(cm);
var from = cm.getCursor("start"), to = cm.getCursor("end"), array = cm.state.markedSelection;
if (!array.length) return coverRange(cm, from, to);
var coverStart = array[0].find(), coverEnd = array[array.length - 1].find();
if (!coverStart || !coverEnd || to.line - from.line < CHUNK_SIZE || cmp(from, coverEnd.to) >= 0 || cmp(to, coverStart.from) <= 0) return reset(cm);
for (;cmp(from, coverStart.from) > 0; ) array.shift().clear(), coverStart = array[0].find();
for (cmp(from, coverStart.from) < 0 && (coverStart.to.line - from.line < CHUNK_SIZE ? (array.shift().clear(), 
coverRange(cm, from, coverStart.to, 0)) :coverRange(cm, from, coverStart.from, 0)); cmp(to, coverEnd.to) < 0; ) array.pop().clear(), 
coverEnd = array[array.length - 1].find();
cmp(to, coverEnd.to) > 0 && (to.line - coverEnd.from.line < CHUNK_SIZE ? (array.pop().clear(), 
coverRange(cm, coverEnd.from, to)) :coverRange(cm, coverEnd.to, to));
}
CodeMirror.defineOption("styleSelectedText", !1, function(cm, val, old) {
var prev = old && old != CodeMirror.Init;
val && !prev ? (cm.state.markedSelection = [], cm.state.markedSelectionStyle = "string" == typeof val ? val :"CodeMirror-selectedtext", 
reset(cm), cm.on("cursorActivity", onCursorActivity), cm.on("change", onChange)) :!val && prev && (cm.off("cursorActivity", onCursorActivity), 
cm.off("change", onChange), clear(cm), cm.state.markedSelection = cm.state.markedSelectionStyle = null);
});
var CHUNK_SIZE = 8, Pos = CodeMirror.Pos, cmp = CodeMirror.cmpPos;
});