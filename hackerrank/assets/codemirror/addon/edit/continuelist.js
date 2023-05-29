// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
var listRE = /^(\s*)([*+-]|(\d+)\.)(\s+)/, unorderedBullets = "*+-";
CodeMirror.commands.newlineAndIndentContinueMarkdownList = function(cm) {
if (cm.getOption("disableInput")) return CodeMirror.Pass;
for (var ranges = cm.listSelections(), replacements = [], i = 0; i < ranges.length; i++) {
var match, pos = ranges[i].head, inList = cm.getStateAfter(pos.line).list !== !1;
if (!ranges[i].empty() || !inList || !(match = cm.getLine(pos.line).match(listRE))) return cm.execCommand("newlineAndIndent"), 
void 0;
var indent = match[1], after = match[4], bullet = unorderedBullets.indexOf(match[2]) >= 0 ? match[2] :parseInt(match[3], 10) + 1 + ".";
replacements[i] = "\n" + indent + bullet + after;
}
cm.replaceSelections(replacements);
};
});