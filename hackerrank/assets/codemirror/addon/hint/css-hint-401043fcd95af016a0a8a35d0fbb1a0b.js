// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../../mode/css/css")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../../mode/css/css" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
var pseudoClasses = {
link:1,
visited:1,
active:1,
hover:1,
focus:1,
"first-letter":1,
"first-line":1,
"first-child":1,
before:1,
after:1,
lang:1
};
CodeMirror.registerHelper("hint", "css", function(cm) {
function add(keywords) {
for (var name in keywords) word && 0 != name.lastIndexOf(word, 0) || result.push(name);
}
var cur = cm.getCursor(), token = cm.getTokenAt(cur), inner = CodeMirror.innerMode(cm.getMode(), token.state);
if ("css" == inner.mode.name) {
var word = token.string, start = token.start, end = token.end;
/[^\w$_-]/.test(word) && (word = "", start = end = cur.ch);
var spec = CodeMirror.resolveMode("text/css"), result = [], st = inner.state.state;
return "pseudo" == st || "variable-3" == token.type ? add(pseudoClasses) :"block" == st || "maybeprop" == st ? add(spec.propertyKeywords) :"prop" == st || "parens" == st || "at" == st || "params" == st ? (add(spec.valueKeywords), 
add(spec.colorKeywords)) :("media" == st || "media_parens" == st) && (add(spec.mediaTypes), 
add(spec.mediaFeatures)), result.length ? {
list:result,
from:CodeMirror.Pos(cur.line, start),
to:CodeMirror.Pos(cur.line, end)
} :void 0;
}
});
});