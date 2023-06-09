// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
function findMatchingBracket(cm, where, strict, config) {
var line = cm.getLineHandle(where.line), pos = where.ch - 1, match = pos >= 0 && matching[line.text.charAt(pos)] || matching[line.text.charAt(++pos)];
if (!match) return null;
var dir = ">" == match.charAt(1) ? 1 :-1;
if (strict && dir > 0 != (pos == where.ch)) return null;
var style = cm.getTokenTypeAt(Pos(where.line, pos + 1)), found = scanForBracket(cm, Pos(where.line, pos + (dir > 0 ? 1 :0)), dir, style || null, config);
return null == found ? null :{
from:Pos(where.line, pos),
to:found && found.pos,
match:found && found.ch == match.charAt(0),
forward:dir > 0
};
}
function scanForBracket(cm, where, dir, style, config) {
for (var maxScanLen = config && config.maxScanLineLength || 1e4, maxScanLines = config && config.maxScanLines || 1e3, stack = [], re = config && config.bracketRegex ? config.bracketRegex :/[(){}[\]]/, lineEnd = dir > 0 ? Math.min(where.line + maxScanLines, cm.lastLine() + 1) :Math.max(cm.firstLine() - 1, where.line - maxScanLines), lineNo = where.line; lineNo != lineEnd; lineNo += dir) {
var line = cm.getLine(lineNo);
if (line) {
var pos = dir > 0 ? 0 :line.length - 1, end = dir > 0 ? line.length :-1;
if (!(line.length > maxScanLen)) for (lineNo == where.line && (pos = where.ch - (0 > dir ? 1 :0)); pos != end; pos += dir) {
var ch = line.charAt(pos);
if (re.test(ch) && (void 0 === style || cm.getTokenTypeAt(Pos(lineNo, pos + 1)) == style)) {
var match = matching[ch];
if (">" == match.charAt(1) == dir > 0) stack.push(ch); else {
if (!stack.length) return {
pos:Pos(lineNo, pos),
ch:ch
};
stack.pop();
}
}
}
}
}
return lineNo - dir == (dir > 0 ? cm.lastLine() :cm.firstLine()) ? !1 :null;
}
function matchBrackets(cm, autoclear, config) {
for (var maxHighlightLen = cm.state.matchBrackets.maxHighlightLineLength || 1e3, marks = [], ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
var match = ranges[i].empty() && findMatchingBracket(cm, ranges[i].head, !1, config);
if (match && cm.getLine(match.from.line).length <= maxHighlightLen) {
var style = match.match ? "CodeMirror-matchingbracket" :"CodeMirror-nonmatchingbracket";
marks.push(cm.markText(match.from, Pos(match.from.line, match.from.ch + 1), {
className:style
})), match.to && cm.getLine(match.to.line).length <= maxHighlightLen && marks.push(cm.markText(match.to, Pos(match.to.line, match.to.ch + 1), {
className:style
}));
}
}
if (marks.length) {
ie_lt8 && cm.state.focused && cm.display.input.focus();
var clear = function() {
cm.operation(function() {
for (var i = 0; i < marks.length; i++) marks[i].clear();
});
};
if (!autoclear) return clear;
setTimeout(clear, 800);
}
}
function doMatchBrackets(cm) {
cm.operation(function() {
currentlyHighlighted && (currentlyHighlighted(), currentlyHighlighted = null), currentlyHighlighted = matchBrackets(cm, !1, cm.state.matchBrackets);
});
}
var ie_lt8 = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 8), Pos = CodeMirror.Pos, matching = {
"(":")>",
")":"(<",
"[":"]>",
"]":"[<",
"{":"}>",
"}":"{<"
}, currentlyHighlighted = null;
CodeMirror.defineOption("matchBrackets", !1, function(cm, val, old) {
old && old != CodeMirror.Init && cm.off("cursorActivity", doMatchBrackets), val && (cm.state.matchBrackets = "object" == typeof val ? val :{}, 
cm.on("cursorActivity", doMatchBrackets));
}), CodeMirror.defineExtension("matchBrackets", function() {
matchBrackets(this, !0);
}), CodeMirror.defineExtension("findMatchingBracket", function(pos, strict, config) {
return findMatchingBracket(this, pos, strict, config);
}), CodeMirror.defineExtension("scanForBracket", function(pos, dir, style, config) {
return scanForBracket(this, pos, dir, style, config);
});
});