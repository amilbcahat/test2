// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.registerHelper("fold", "brace", function(cm, start) {
function findOpening(openCh) {
for (var at = start.ch, pass = 0; ;) {
var found = 0 >= at ? -1 :lineText.lastIndexOf(openCh, at - 1);
if (-1 != found) {
if (1 == pass && found < start.ch) break;
if (tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1)), !/^(comment|string)/.test(tokenType)) return found + 1;
at = found - 1;
} else {
if (1 == pass) break;
pass = 1, at = lineText.length;
}
}
}
var startCh, tokenType, line = start.line, lineText = cm.getLine(line), startToken = "{", endToken = "}", startCh = findOpening("{");
if (null == startCh && (startToken = "[", endToken = "]", startCh = findOpening("[")), 
null != startCh) {
var end, endCh, count = 1, lastLine = cm.lastLine();
outer:for (var i = line; lastLine >= i; ++i) for (var text = cm.getLine(i), pos = i == line ? startCh :0; ;) {
var nextOpen = text.indexOf(startToken, pos), nextClose = text.indexOf(endToken, pos);
if (0 > nextOpen && (nextOpen = text.length), 0 > nextClose && (nextClose = text.length), 
pos = Math.min(nextOpen, nextClose), pos == text.length) break;
if (cm.getTokenTypeAt(CodeMirror.Pos(i, pos + 1)) == tokenType) if (pos == nextOpen) ++count; else if (!--count) {
end = i, endCh = pos;
break outer;
}
++pos;
}
if (null != end && (line != end || endCh != startCh)) return {
from:CodeMirror.Pos(line, startCh),
to:CodeMirror.Pos(end, endCh)
};
}
}), CodeMirror.registerHelper("fold", "import", function(cm, start) {
function hasImport(line) {
if (line < cm.firstLine() || line > cm.lastLine()) return null;
var start = cm.getTokenAt(CodeMirror.Pos(line, 1));
if (/\S/.test(start.string) || (start = cm.getTokenAt(CodeMirror.Pos(line, start.end + 1))), 
"keyword" != start.type || "import" != start.string) return null;
for (var i = line, e = Math.min(cm.lastLine(), line + 10); e >= i; ++i) {
var text = cm.getLine(i), semi = text.indexOf(";");
if (-1 != semi) return {
startCh:start.end,
end:CodeMirror.Pos(i, semi)
};
}
}
var prev, start = start.line, has = hasImport(start);
if (!has || hasImport(start - 1) || (prev = hasImport(start - 2)) && prev.end.line == start - 1) return null;
for (var end = has.end; ;) {
var next = hasImport(end.line + 1);
if (null == next) break;
end = next.end;
}
return {
from:cm.clipPos(CodeMirror.Pos(start, has.startCh + 1)),
to:end
};
}), CodeMirror.registerHelper("fold", "include", function(cm, start) {
function hasInclude(line) {
if (line < cm.firstLine() || line > cm.lastLine()) return null;
var start = cm.getTokenAt(CodeMirror.Pos(line, 1));
return /\S/.test(start.string) || (start = cm.getTokenAt(CodeMirror.Pos(line, start.end + 1))), 
"meta" == start.type && "#include" == start.string.slice(0, 8) ? start.start + 8 :void 0;
}
var start = start.line, has = hasInclude(start);
if (null == has || null != hasInclude(start - 1)) return null;
for (var end = start; ;) {
var next = hasInclude(end + 1);
if (null == next) break;
++end;
}
return {
from:CodeMirror.Pos(start, has + 1),
to:cm.clipPos(CodeMirror.Pos(end))
};
});
});