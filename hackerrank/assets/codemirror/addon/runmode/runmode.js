// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.runMode = function(string, modespec, callback, options) {
var mode = CodeMirror.getMode(CodeMirror.defaults, modespec), ie = /MSIE \d/.test(navigator.userAgent), ie_lt9 = ie && (null == document.documentMode || document.documentMode < 9);
if (1 == callback.nodeType) {
var tabSize = options && options.tabSize || CodeMirror.defaults.tabSize, node = callback, col = 0;
node.innerHTML = "", callback = function(text, style) {
if ("\n" == text) return node.appendChild(document.createTextNode(ie_lt9 ? "\r" :text)), 
col = 0, void 0;
for (var content = "", pos = 0; ;) {
var idx = text.indexOf("	", pos);
if (-1 == idx) {
content += text.slice(pos), col += text.length - pos;
break;
}
col += idx - pos, content += text.slice(pos, idx);
var size = tabSize - col % tabSize;
col += size;
for (var i = 0; size > i; ++i) content += " ";
pos = idx + 1;
}
if (style) {
var sp = node.appendChild(document.createElement("span"));
sp.className = "cm-" + style.replace(/ +/g, " cm-"), sp.appendChild(document.createTextNode(content));
} else node.appendChild(document.createTextNode(content));
};
}
for (var lines = CodeMirror.splitLines(string), state = options && options.state || CodeMirror.startState(mode), i = 0, e = lines.length; e > i; ++i) {
i && callback("\n");
var stream = new CodeMirror.StringStream(lines[i]);
for (!stream.string && mode.blankLine && mode.blankLine(state); !stream.eol(); ) {
var style = mode.token(stream, state);
callback(stream.current(), style, i, stream.start, state), stream.start = stream.pos;
}
}
};
});