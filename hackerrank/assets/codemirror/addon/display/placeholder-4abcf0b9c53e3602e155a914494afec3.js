// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
function clearPlaceholder(cm) {
cm.state.placeholder && (cm.state.placeholder.parentNode.removeChild(cm.state.placeholder), 
cm.state.placeholder = null);
}
function setPlaceholder(cm) {
clearPlaceholder(cm);
var elt = cm.state.placeholder = document.createElement("pre");
elt.style.cssText = "height: 0; overflow: visible", elt.className = "CodeMirror-placeholder", 
elt.appendChild(document.createTextNode(cm.getOption("placeholder"))), cm.display.lineSpace.insertBefore(elt, cm.display.lineSpace.firstChild);
}
function onBlur(cm) {
isEmpty(cm) && setPlaceholder(cm);
}
function onChange(cm) {
var wrapper = cm.getWrapperElement(), empty = isEmpty(cm);
wrapper.className = wrapper.className.replace(" CodeMirror-empty", "") + (empty ? " CodeMirror-empty" :""), 
empty ? setPlaceholder(cm) :clearPlaceholder(cm);
}
function isEmpty(cm) {
return 1 === cm.lineCount() && "" === cm.getLine(0);
}
CodeMirror.defineOption("placeholder", "", function(cm, val, old) {
var prev = old && old != CodeMirror.Init;
if (val && !prev) cm.on("blur", onBlur), cm.on("change", onChange), onChange(cm); else if (!val && prev) {
cm.off("blur", onBlur), cm.off("change", onChange), clearPlaceholder(cm);
var wrapper = cm.getWrapperElement();
wrapper.className = wrapper.className.replace(" CodeMirror-empty", "");
}
val && !cm.hasFocus() && onBlur(cm);
});
});