// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.registerGlobalHelper("fold", "comment", function(mode) {
return mode.blockCommentStart && mode.blockCommentEnd;
}, function(cm, start) {
var mode = cm.getModeAt(start), startToken = mode.blockCommentStart, endToken = mode.blockCommentEnd;
if (startToken && endToken) {
for (var startCh, line = start.line, lineText = cm.getLine(line), at = start.ch, pass = 0; ;) {
var found = 0 >= at ? -1 :lineText.lastIndexOf(startToken, at - 1);
if (-1 != found) {
if (1 == pass && found < start.ch) return;
if (/comment/.test(cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1)))) {
startCh = found + startToken.length;
break;
}
at = found - 1;
} else {
if (1 == pass) return;
pass = 1, at = lineText.length;
}
}
var end, endCh, depth = 1, lastLine = cm.lastLine();
outer:for (var i = line; lastLine >= i; ++i) for (var text = cm.getLine(i), pos = i == line ? startCh :0; ;) {
var nextOpen = text.indexOf(startToken, pos), nextClose = text.indexOf(endToken, pos);
if (0 > nextOpen && (nextOpen = text.length), 0 > nextClose && (nextClose = text.length), 
pos = Math.min(nextOpen, nextClose), pos == text.length) break;
if (pos == nextOpen) ++depth; else if (!--depth) {
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
});
});