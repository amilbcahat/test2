// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("./runmode")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "./runmode" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function textContent(node, out) {
if (3 == node.nodeType) return out.push(node.nodeValue);
for (var ch = node.firstChild; ch; ch = ch.nextSibling) textContent(ch, out), isBlock.test(node.nodeType) && out.push("\n");
}
var isBlock = /^(p|li|div|h\\d|pre|blockquote|td)$/;
CodeMirror.colorize = function(collection, defaultMode) {
collection || (collection = document.body.getElementsByTagName("pre"));
for (var i = 0; i < collection.length; ++i) {
var node = collection[i], mode = node.getAttribute("data-lang") || defaultMode;
if (mode) {
var text = [];
textContent(node, text), node.innerHTML = "", CodeMirror.runMode(text.join(""), mode, node), 
node.className += " cm-s-default";
}
}
};
});