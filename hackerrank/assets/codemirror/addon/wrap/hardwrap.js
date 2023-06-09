// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function findParagraph(cm, pos, options) {
for (var startRE = options.paragraphStart || cm.getHelper(pos, "paragraphStart"), start = pos.line, first = cm.firstLine(); start > first; --start) {
var line = cm.getLine(start);
if (startRE && startRE.test(line)) break;
if (!/\S/.test(line)) {
++start;
break;
}
}
for (var endRE = options.paragraphEnd || cm.getHelper(pos, "paragraphEnd"), end = pos.line + 1, last = cm.lastLine(); last >= end; ++end) {
var line = cm.getLine(end);
if (endRE && endRE.test(line)) {
++end;
break;
}
if (!/\S/.test(line)) break;
}
return {
from:start,
to:end
};
}
function findBreakPoint(text, column, wrapOn, killTrailingSpace) {
for (var at = column; at > 0 && !wrapOn.test(text.slice(at - 1, at + 1)); --at) ;
0 == at && (at = column);
var endOfText = at;
if (killTrailingSpace) for (;" " == text.charAt(endOfText - 1); ) --endOfText;
return {
from:endOfText,
to:at
};
}
function wrapRange(cm, from, to, options) {
from = cm.clipPos(from), to = cm.clipPos(to);
var column = options.column || 80, wrapOn = options.wrapOn || /\s\S|-[^\.\d]/, killTrailing = options.killTrailingSpace !== !1, changes = [], curLine = "", curNo = from.line, lines = cm.getRange(from, to, !1);
if (!lines.length) return null;
for (var leadingSpace = lines[0].match(/^[ \t]*/)[0], i = 0; i < lines.length; ++i) {
var text = lines[i], oldLen = curLine.length, spaceInserted = 0;
curLine && text && !wrapOn.test(curLine.charAt(curLine.length - 1) + text.charAt(0)) && (curLine += " ", 
spaceInserted = 1);
var spaceTrimmed = "";
if (i && (spaceTrimmed = text.match(/^\s*/)[0], text = text.slice(spaceTrimmed.length)), 
curLine += text, i) {
var firstBreak = curLine.length > column && leadingSpace == spaceTrimmed && findBreakPoint(curLine, column, wrapOn, killTrailing);
firstBreak && firstBreak.from == oldLen && firstBreak.to == oldLen + spaceInserted ? (curLine = leadingSpace + text, 
++curNo) :changes.push({
text:[ spaceInserted ? " " :"" ],
from:Pos(curNo, oldLen),
to:Pos(curNo + 1, spaceTrimmed.length)
});
}
for (;curLine.length > column; ) {
var bp = findBreakPoint(curLine, column, wrapOn, killTrailing);
changes.push({
text:[ "", leadingSpace ],
from:Pos(curNo, bp.from),
to:Pos(curNo, bp.to)
}), curLine = leadingSpace + curLine.slice(bp.to), ++curNo;
}
}
return changes.length && cm.operation(function() {
for (var i = 0; i < changes.length; ++i) {
var change = changes[i];
cm.replaceRange(change.text, change.from, change.to);
}
}), changes.length ? {
from:changes[0].from,
to:CodeMirror.changeEnd(changes[changes.length - 1])
} :null;
}
var Pos = CodeMirror.Pos;
CodeMirror.defineExtension("wrapParagraph", function(pos, options) {
options = options || {}, pos || (pos = this.getCursor());
var para = findParagraph(this, pos, options);
return wrapRange(this, Pos(para.from, 0), Pos(para.to - 1), options);
}), CodeMirror.commands.wrapLines = function(cm) {
cm.operation(function() {
for (var ranges = cm.listSelections(), at = cm.lastLine() + 1, i = ranges.length - 1; i >= 0; i--) {
var span, range = ranges[i];
if (range.empty()) {
var para = findParagraph(cm, range.head, {});
span = {
from:Pos(para.from, 0),
to:Pos(para.to - 1)
};
} else span = {
from:range.from(),
to:range.to()
};
span.to.line >= at || (at = span.from.line, wrapRange(cm, span.from, span.to, {}));
}
});
}, CodeMirror.defineExtension("wrapRange", function(from, to, options) {
return wrapRange(this, from, to, options || {});
}), CodeMirror.defineExtension("wrapParagraphsInRange", function(from, to, options) {
options = options || {};
for (var cm = this, paras = [], line = from.line; line <= to.line; ) {
var para = findParagraph(cm, Pos(line, 0), options);
paras.push(para), line = para.to;
}
var madeChange = !1;
return paras.length && cm.operation(function() {
for (var i = paras.length - 1; i >= 0; --i) madeChange = madeChange || wrapRange(cm, Pos(paras[i].from, 0), Pos(paras[i].to - 1), options);
}), madeChange;
});
});