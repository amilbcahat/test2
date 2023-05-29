// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function cmp(a, b) {
return a.line - b.line || a.ch - b.ch;
}
function Iter(cm, line, ch, range) {
this.line = line, this.ch = ch, this.cm = cm, this.text = cm.getLine(line), this.min = range ? range.from :cm.firstLine(), 
this.max = range ? range.to - 1 :cm.lastLine();
}
function tagAt(iter, ch) {
var type = iter.cm.getTokenTypeAt(Pos(iter.line, ch));
return type && /\btag\b/.test(type);
}
function nextLine(iter) {
return iter.line >= iter.max ? void 0 :(iter.ch = 0, iter.text = iter.cm.getLine(++iter.line), 
!0);
}
function prevLine(iter) {
return iter.line <= iter.min ? void 0 :(iter.text = iter.cm.getLine(--iter.line), 
iter.ch = iter.text.length, !0);
}
function toTagEnd(iter) {
for (;;) {
var gt = iter.text.indexOf(">", iter.ch);
if (-1 == gt) {
if (nextLine(iter)) continue;
return;
}
{
if (tagAt(iter, gt + 1)) {
var lastSlash = iter.text.lastIndexOf("/", gt), selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
return iter.ch = gt + 1, selfClose ? "selfClose" :"regular";
}
iter.ch = gt + 1;
}
}
}
function toTagStart(iter) {
for (;;) {
var lt = iter.ch ? iter.text.lastIndexOf("<", iter.ch - 1) :-1;
if (-1 == lt) {
if (prevLine(iter)) continue;
return;
}
if (tagAt(iter, lt + 1)) {
xmlTagStart.lastIndex = lt, iter.ch = lt;
var match = xmlTagStart.exec(iter.text);
if (match && match.index == lt) return match;
} else iter.ch = lt;
}
}
function toNextTag(iter) {
for (;;) {
xmlTagStart.lastIndex = iter.ch;
var found = xmlTagStart.exec(iter.text);
if (!found) {
if (nextLine(iter)) continue;
return;
}
{
if (tagAt(iter, found.index + 1)) return iter.ch = found.index + found[0].length, 
found;
iter.ch = found.index + 1;
}
}
}
function toPrevTag(iter) {
for (;;) {
var gt = iter.ch ? iter.text.lastIndexOf(">", iter.ch - 1) :-1;
if (-1 == gt) {
if (prevLine(iter)) continue;
return;
}
{
if (tagAt(iter, gt + 1)) {
var lastSlash = iter.text.lastIndexOf("/", gt), selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
return iter.ch = gt + 1, selfClose ? "selfClose" :"regular";
}
iter.ch = gt;
}
}
}
function findMatchingClose(iter, tag) {
for (var stack = []; ;) {
var end, next = toNextTag(iter), startLine = iter.line, startCh = iter.ch - (next ? next[0].length :0);
if (!next || !(end = toTagEnd(iter))) return;
if ("selfClose" != end) if (next[1]) {
for (var i = stack.length - 1; i >= 0; --i) if (stack[i] == next[2]) {
stack.length = i;
break;
}
if (0 > i && (!tag || tag == next[2])) return {
tag:next[2],
from:Pos(startLine, startCh),
to:Pos(iter.line, iter.ch)
};
} else stack.push(next[2]);
}
}
function findMatchingOpen(iter, tag) {
for (var stack = []; ;) {
var prev = toPrevTag(iter);
if (!prev) return;
if ("selfClose" != prev) {
var endLine = iter.line, endCh = iter.ch, start = toTagStart(iter);
if (!start) return;
if (start[1]) stack.push(start[2]); else {
for (var i = stack.length - 1; i >= 0; --i) if (stack[i] == start[2]) {
stack.length = i;
break;
}
if (0 > i && (!tag || tag == start[2])) return {
tag:start[2],
from:Pos(iter.line, iter.ch),
to:Pos(endLine, endCh)
};
}
} else toTagStart(iter);
}
}
var Pos = CodeMirror.Pos, nameStartChar = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", nameChar = nameStartChar + "-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", xmlTagStart = new RegExp("<(/?)([" + nameStartChar + "][" + nameChar + "]*)", "g");
CodeMirror.registerHelper("fold", "xml", function(cm, start) {
for (var iter = new Iter(cm, start.line, 0); ;) {
var end, openTag = toNextTag(iter);
if (!openTag || iter.line != start.line || !(end = toTagEnd(iter))) return;
if (!openTag[1] && "selfClose" != end) {
var start = Pos(iter.line, iter.ch), close = findMatchingClose(iter, openTag[2]);
return close && {
from:start,
to:close.from
};
}
}
}), CodeMirror.findMatchingTag = function(cm, pos, range) {
var iter = new Iter(cm, pos.line, pos.ch, range);
if (-1 != iter.text.indexOf(">") || -1 != iter.text.indexOf("<")) {
var end = toTagEnd(iter), to = end && Pos(iter.line, iter.ch), start = end && toTagStart(iter);
if (end && "selfClose" != end && start && !(cmp(iter, pos) > 0)) {
var here = {
from:Pos(iter.line, iter.ch),
to:to,
tag:start[2]
};
return start[1] ? {
open:findMatchingOpen(iter, start[2]),
close:here,
at:"close"
} :(iter = new Iter(cm, to.line, to.ch, range), {
open:here,
close:findMatchingClose(iter, start[2]),
at:"open"
});
}
}
}, CodeMirror.findEnclosingTag = function(cm, pos, range) {
for (var iter = new Iter(cm, pos.line, pos.ch, range); ;) {
var open = findMatchingOpen(iter);
if (!open) break;
var forward = new Iter(cm, pos.line, pos.ch, range), close = findMatchingClose(forward, open.tag);
if (close) return {
open:open,
close:close
};
}
}, CodeMirror.scanForClosingTag = function(cm, pos, name, end) {
var iter = new Iter(cm, pos.line, pos.ch, end ? {
from:0,
to:end
} :null);
return findMatchingClose(iter, name);
};
});