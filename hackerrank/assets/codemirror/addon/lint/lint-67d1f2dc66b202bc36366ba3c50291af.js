// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function showTooltip(e, content) {
function position(e) {
return tt.parentNode ? (tt.style.top = Math.max(0, e.clientY - tt.offsetHeight - 5) + "px", 
tt.style.left = e.clientX + 5 + "px", void 0) :CodeMirror.off(document, "mousemove", position);
}
var tt = document.createElement("div");
return tt.className = "CodeMirror-lint-tooltip", tt.appendChild(content.cloneNode(!0)), 
document.body.appendChild(tt), CodeMirror.on(document, "mousemove", position), position(e), 
null != tt.style.opacity && (tt.style.opacity = 1), tt;
}
function rm(elt) {
elt.parentNode && elt.parentNode.removeChild(elt);
}
function hideTooltip(tt) {
tt.parentNode && (null == tt.style.opacity && rm(tt), tt.style.opacity = 0, setTimeout(function() {
rm(tt);
}, 600));
}
function showTooltipFor(e, content, node) {
function hide() {
CodeMirror.off(node, "mouseout", hide), tooltip && (hideTooltip(tooltip), tooltip = null);
}
var tooltip = showTooltip(e, content), poll = setInterval(function() {
if (tooltip) for (var n = node; ;n = n.parentNode) {
if (n == document.body) return;
if (!n) {
hide();
break;
}
}
return tooltip ? void 0 :clearInterval(poll);
}, 400);
CodeMirror.on(node, "mouseout", hide);
}
function LintState(cm, options, hasGutter) {
this.marked = [], this.options = options, this.timeout = null, this.hasGutter = hasGutter, 
this.onMouseOver = function(e) {
onMouseOver(cm, e);
};
}
function parseOptions(cm, options) {
if (options instanceof Function) return {
getAnnotations:options
};
if (options && options !== !0 || (options = {}), options.getAnnotations || (options.getAnnotations = cm.getHelper(CodeMirror.Pos(0, 0), "lint")), 
!options.getAnnotations) throw new Error("Required option 'getAnnotations' missing (lint addon)");
return options;
}
function clearMarks(cm) {
var state = cm.state.lint;
state.hasGutter && cm.clearGutter(GUTTER_ID);
for (var i = 0; i < state.marked.length; ++i) state.marked[i].clear();
state.marked.length = 0;
}
function makeMarker(labels, severity, multiple, tooltips) {
var marker = document.createElement("div"), inner = marker;
return marker.className = "CodeMirror-lint-marker-" + severity, multiple && (inner = marker.appendChild(document.createElement("div")), 
inner.className = "CodeMirror-lint-marker-multiple"), 0 != tooltips && CodeMirror.on(inner, "mouseover", function(e) {
showTooltipFor(e, labels, inner);
}), marker;
}
function getMaxSeverity(a, b) {
return "error" == a ? a :b;
}
function groupByLine(annotations) {
for (var lines = [], i = 0; i < annotations.length; ++i) {
var ann = annotations[i], line = ann.from.line;
(lines[line] || (lines[line] = [])).push(ann);
}
return lines;
}
function annotationTooltip(ann) {
var severity = ann.severity;
SEVERITIES.test(severity) || (severity = "error");
var tip = document.createElement("div");
return tip.className = "CodeMirror-lint-message-" + severity, tip.appendChild(document.createTextNode(ann.message)), 
tip;
}
function startLinting(cm) {
var state = cm.state.lint, options = state.options;
options.async ? options.getAnnotations(cm, updateLinting, options) :updateLinting(cm, options.getAnnotations(cm.getValue(), options.options));
}
function updateLinting(cm, annotationsNotSorted) {
clearMarks(cm);
for (var state = cm.state.lint, options = state.options, annotations = groupByLine(annotationsNotSorted), line = 0; line < annotations.length; ++line) {
var anns = annotations[line];
if (anns) {
for (var maxSeverity = null, tipLabel = state.hasGutter && document.createDocumentFragment(), i = 0; i < anns.length; ++i) {
var ann = anns[i], severity = ann.severity;
SEVERITIES.test(severity) || (severity = "error"), maxSeverity = getMaxSeverity(maxSeverity, severity), 
options.formatAnnotation && (ann = options.formatAnnotation(ann)), state.hasGutter && tipLabel.appendChild(annotationTooltip(ann)), 
ann.to && state.marked.push(cm.markText(ann.from, ann.to, {
className:"CodeMirror-lint-mark-" + severity,
__annotation:ann
}));
}
state.hasGutter && cm.setGutterMarker(line, GUTTER_ID, makeMarker(tipLabel, maxSeverity, anns.length > 1, state.options.tooltips));
}
}
options.onUpdateLinting && options.onUpdateLinting(annotationsNotSorted, annotations, cm);
}
function onChange(cm) {
var state = cm.state.lint;
clearTimeout(state.timeout), state.timeout = setTimeout(function() {
startLinting(cm);
}, state.options.delay || 500);
}
function popupSpanTooltip(ann, e) {
var target = e.target || e.srcElement;
showTooltipFor(e, annotationTooltip(ann), target);
}
function onMouseOver(cm, e) {
if (/\bCodeMirror-lint-mark-/.test((e.target || e.srcElement).className)) for (var i = 0; i < nearby.length; i += 2) for (var spans = cm.findMarksAt(cm.coordsChar({
left:e.clientX + nearby[i],
top:e.clientY + nearby[i + 1]
}, "client")), j = 0; j < spans.length; ++j) {
var span = spans[j], ann = span.__annotation;
if (ann) return popupSpanTooltip(ann, e);
}
}
var GUTTER_ID = "CodeMirror-lint-markers", SEVERITIES = /^(?:error|warning)$/, nearby = [ 0, 0, 0, 5, 0, -5, 5, 0, -5, 0 ];
CodeMirror.defineOption("lint", !1, function(cm, val, old) {
if (old && old != CodeMirror.Init && (clearMarks(cm), cm.off("change", onChange), 
CodeMirror.off(cm.getWrapperElement(), "mouseover", cm.state.lint.onMouseOver), 
delete cm.state.lint), val) {
for (var gutters = cm.getOption("gutters"), hasLintGutter = !1, i = 0; i < gutters.length; ++i) gutters[i] == GUTTER_ID && (hasLintGutter = !0);
var state = cm.state.lint = new LintState(cm, parseOptions(cm, val), hasLintGutter);
cm.on("change", onChange), 0 != state.options.tooltips && CodeMirror.on(cm.getWrapperElement(), "mouseover", state.onMouseOver), 
startLinting(cm);
}
});
});