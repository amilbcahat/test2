// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function onChange(cm, change) {
CodeMirror.changeEnd(change).line == cm.lastLine() && updateBottomMargin(cm);
}
function updateBottomMargin(cm) {
var padding = "";
if (cm.lineCount() > 1) {
var totalH = cm.display.scroller.clientHeight - 30, lastLineH = cm.getLineHandle(cm.lastLine()).height;
padding = totalH - lastLineH + "px";
}
cm.state.scrollPastEndPadding != padding && (cm.state.scrollPastEndPadding = padding, 
cm.display.lineSpace.parentNode.style.paddingBottom = padding, cm.setSize());
}
CodeMirror.defineOption("scrollPastEnd", !1, function(cm, val, old) {
old && old != CodeMirror.Init && (cm.off("change", onChange), cm.off("refresh", updateBottomMargin), 
cm.display.lineSpace.parentNode.style.paddingBottom = "", cm.state.scrollPastEndPadding = null), 
val && (cm.on("change", onChange), cm.on("refresh", updateBottomMargin), updateBottomMargin(cm));
});
});