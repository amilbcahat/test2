// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("./foldcode")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "./foldcode" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function State(options) {
this.options = options, this.from = this.to = 0;
}
function parseOptions(opts) {
return opts === !0 && (opts = {}), null == opts.gutter && (opts.gutter = "CodeMirror-foldgutter"), 
null == opts.indicatorOpen && (opts.indicatorOpen = "CodeMirror-foldgutter-open"), 
null == opts.indicatorFolded && (opts.indicatorFolded = "CodeMirror-foldgutter-folded"), 
opts;
}
function isFolded(cm, line) {
for (var marks = cm.findMarksAt(Pos(line)), i = 0; i < marks.length; ++i) if (marks[i].__isFold && marks[i].find().from.line == line) return !0;
}
function marker(spec) {
if ("string" == typeof spec) {
var elt = document.createElement("div");
return elt.className = spec + " CodeMirror-guttermarker-subtle", elt;
}
return spec.cloneNode(!0);
}
function updateFoldInfo(cm, from, to) {
var opts = cm.state.foldGutter.options, cur = from;
cm.eachLine(from, to, function(line) {
var mark = null;
if (isFolded(cm, cur)) mark = marker(opts.indicatorFolded); else {
var pos = Pos(cur, 0), func = opts.rangeFinder || CodeMirror.fold.auto, range = func && func(cm, pos);
range && range.from.line + 1 < range.to.line && (mark = marker(opts.indicatorOpen));
}
cm.setGutterMarker(line, opts.gutter, mark), ++cur;
});
}
function updateInViewport(cm) {
var vp = cm.getViewport(), state = cm.state.foldGutter;
state && (cm.operation(function() {
updateFoldInfo(cm, vp.from, vp.to);
}), state.from = vp.from, state.to = vp.to);
}
function onGutterClick(cm, line, gutter) {
var opts = cm.state.foldGutter.options;
gutter == opts.gutter && cm.foldCode(Pos(line, 0), opts.rangeFinder);
}
function onChange(cm) {
var state = cm.state.foldGutter, opts = cm.state.foldGutter.options;
state.from = state.to = 0, clearTimeout(state.changeUpdate), state.changeUpdate = setTimeout(function() {
updateInViewport(cm);
}, opts.foldOnChangeTimeSpan || 600);
}
function onViewportChange(cm) {
var state = cm.state.foldGutter, opts = cm.state.foldGutter.options;
clearTimeout(state.changeUpdate), state.changeUpdate = setTimeout(function() {
var vp = cm.getViewport();
state.from == state.to || vp.from - state.to > 20 || state.from - vp.to > 20 ? updateInViewport(cm) :cm.operation(function() {
vp.from < state.from && (updateFoldInfo(cm, vp.from, state.from), state.from = vp.from), 
vp.to > state.to && (updateFoldInfo(cm, state.to, vp.to), state.to = vp.to);
});
}, opts.updateViewportTimeSpan || 400);
}
function onFold(cm, from) {
var state = cm.state.foldGutter, line = from.line;
line >= state.from && line < state.to && updateFoldInfo(cm, line, line + 1);
}
CodeMirror.defineOption("foldGutter", !1, function(cm, val, old) {
old && old != CodeMirror.Init && (cm.clearGutter(cm.state.foldGutter.options.gutter), 
cm.state.foldGutter = null, cm.off("gutterClick", onGutterClick), cm.off("change", onChange), 
cm.off("viewportChange", onViewportChange), cm.off("fold", onFold), cm.off("unfold", onFold), 
cm.off("swapDoc", updateInViewport)), val && (cm.state.foldGutter = new State(parseOptions(val)), 
updateInViewport(cm), cm.on("gutterClick", onGutterClick), cm.on("change", onChange), 
cm.on("viewportChange", onViewportChange), cm.on("fold", onFold), cm.on("unfold", onFold), 
cm.on("swapDoc", updateInViewport));
});
var Pos = CodeMirror.Pos;
});