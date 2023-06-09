// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function setFullscreen(cm) {
var wrap = cm.getWrapperElement();
cm.state.fullScreenRestore = {
scrollTop:window.pageYOffset,
scrollLeft:window.pageXOffset,
width:wrap.style.width,
height:wrap.style.height
}, wrap.style.width = "", wrap.style.height = "auto", wrap.className += " CodeMirror-fullscreen", 
document.documentElement.style.overflow = "hidden", cm.refresh();
}
function setNormal(cm) {
var wrap = cm.getWrapperElement();
wrap.className = wrap.className.replace(/\s*CodeMirror-fullscreen\b/, ""), document.documentElement.style.overflow = "";
var info = cm.state.fullScreenRestore;
wrap.style.width = info.width, wrap.style.height = info.height, window.scrollTo(info.scrollLeft, info.scrollTop), 
cm.refresh();
}
CodeMirror.defineOption("fullScreen", !1, function(cm, val, old) {
old == CodeMirror.Init && (old = !1), !old != !val && (val ? setFullscreen(cm) :setNormal(cm));
});
});