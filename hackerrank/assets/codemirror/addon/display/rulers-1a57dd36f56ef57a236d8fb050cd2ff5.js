// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function clearRulers(cm) {
for (var i = cm.display.lineSpace.childNodes.length - 1; i >= 0; i--) {
var node = cm.display.lineSpace.childNodes[i];
/(^|\s)CodeMirror-ruler($|\s)/.test(node.className) && node.parentNode.removeChild(node);
}
}
function setRulers(cm) {
for (var val = cm.getOption("rulers"), cw = cm.defaultCharWidth(), left = cm.charCoords(CodeMirror.Pos(cm.firstLine(), 0), "div").left, minH = cm.display.scroller.offsetHeight + 30, i = 0; i < val.length; i++) {
var elt = document.createElement("div");
elt.className = "CodeMirror-ruler";
var col, cls = null, conf = val[i];
"number" == typeof conf ? col = conf :(col = conf.column, conf.className && (elt.className += " " + conf.className), 
conf.color && (elt.style.borderColor = conf.color), conf.lineStyle && (elt.style.borderLeftStyle = conf.lineStyle), 
conf.width && (elt.style.borderLeftWidth = conf.width), cls = val[i].className), 
elt.style.left = left + col * cw + "px", elt.style.top = "-50px", elt.style.bottom = "-20px", 
elt.style.minHeight = minH + "px", cm.display.lineSpace.insertBefore(elt, cm.display.cursorDiv);
}
}
function refreshRulers(cm) {
clearRulers(cm), setRulers(cm);
}
CodeMirror.defineOption("rulers", !1, function(cm, val, old) {
old && old != CodeMirror.Init && (clearRulers(cm), cm.off("refresh", refreshRulers)), 
val && val.length && (setRulers(cm), cm.on("refresh", refreshRulers));
});
});