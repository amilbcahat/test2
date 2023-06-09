// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function posEq(a, b) {
return a.line == b.line && a.ch == b.ch;
}
function addToRing(str) {
killRing.push(str), killRing.length > 50 && killRing.shift();
}
function growRingTop(str) {
return killRing.length ? (killRing[killRing.length - 1] += str, void 0) :addToRing(str);
}
function getFromRing(n) {
return killRing[killRing.length - (n ? Math.min(n, 1) :1)] || "";
}
function popFromRing() {
return killRing.length > 1 && killRing.pop(), getFromRing();
}
function kill(cm, from, to, mayGrow, text) {
null == text && (text = cm.getRange(from, to)), mayGrow && lastKill && lastKill.cm == cm && posEq(from, lastKill.pos) && cm.isClean(lastKill.gen) ? growRingTop(text) :addToRing(text), 
cm.replaceRange("", from, to, "+delete"), lastKill = mayGrow ? {
cm:cm,
pos:from,
gen:cm.changeGeneration()
} :null;
}
function byChar(cm, pos, dir) {
return cm.findPosH(pos, dir, "char", !0);
}
function byWord(cm, pos, dir) {
return cm.findPosH(pos, dir, "word", !0);
}
function byLine(cm, pos, dir) {
return cm.findPosV(pos, dir, "line", cm.doc.sel.goalColumn);
}
function byPage(cm, pos, dir) {
return cm.findPosV(pos, dir, "page", cm.doc.sel.goalColumn);
}
function byParagraph(cm, pos, dir) {
for (var no = pos.line, line = cm.getLine(no), sawText = /\S/.test(0 > dir ? line.slice(0, pos.ch) :line.slice(pos.ch)), fst = cm.firstLine(), lst = cm.lastLine(); ;) {
if (no += dir, fst > no || no > lst) return cm.clipPos(Pos(no - dir, 0 > dir ? 0 :null));
line = cm.getLine(no);
var hasText = /\S/.test(line);
if (hasText) sawText = !0; else if (sawText) return Pos(no, 0);
}
}
function bySentence(cm, pos, dir) {
for (var line = pos.line, ch = pos.ch, text = cm.getLine(pos.line), sawWord = !1; ;) {
var next = text.charAt(ch + (0 > dir ? -1 :0));
if (next) {
if (sawWord && /[!?.]/.test(next)) return Pos(line, ch + (dir > 0 ? 1 :0));
sawWord || (sawWord = /\w/.test(next)), ch += dir;
} else {
if (line == (0 > dir ? cm.firstLine() :cm.lastLine())) return Pos(line, ch);
if (text = cm.getLine(line + dir), !/\S/.test(text)) return Pos(line, ch);
line += dir, ch = 0 > dir ? text.length :0;
}
}
}
function byExpr(cm, pos, dir) {
var wrap;
if (cm.findMatchingBracket && (wrap = cm.findMatchingBracket(pos, !0)) && wrap.match && (wrap.forward ? 1 :-1) == dir) return dir > 0 ? Pos(wrap.to.line, wrap.to.ch + 1) :wrap.to;
for (var first = !0; ;first = !1) {
var token = cm.getTokenAt(pos), after = Pos(pos.line, 0 > dir ? token.start :token.end);
if (!(first && dir > 0 && token.end == pos.ch) && /\w/.test(token.string)) return after;
var newPos = cm.findPosH(after, dir, "char");
if (posEq(after, newPos)) return pos;
pos = newPos;
}
}
function getPrefix(cm, precise) {
var digits = cm.state.emacsPrefix;
return digits ? (clearPrefix(cm), "-" == digits ? -1 :Number(digits)) :precise ? null :1;
}
function repeated(cmd) {
var f = "string" == typeof cmd ? function(cm) {
cm.execCommand(cmd);
} :cmd;
return function(cm) {
var prefix = getPrefix(cm);
f(cm);
for (var i = 1; prefix > i; ++i) f(cm);
};
}
function findEnd(cm, by, dir) {
var pos = cm.getCursor(), prefix = getPrefix(cm);
0 > prefix && (dir = -dir, prefix = -prefix);
for (var i = 0; prefix > i; ++i) {
var newPos = by(cm, pos, dir);
if (posEq(newPos, pos)) break;
pos = newPos;
}
return pos;
}
function move(by, dir) {
var f = function(cm) {
cm.extendSelection(findEnd(cm, by, dir));
};
return f.motion = !0, f;
}
function killTo(cm, by, dir) {
kill(cm, cm.getCursor(), findEnd(cm, by, dir), !0);
}
function addPrefix(cm, digit) {
return cm.state.emacsPrefix ? ("-" != digit && (cm.state.emacsPrefix += digit), 
void 0) :(cm.state.emacsPrefix = digit, cm.on("keyHandled", maybeClearPrefix), cm.on("inputRead", maybeDuplicateInput), 
void 0);
}
function maybeClearPrefix(cm, arg) {
cm.state.emacsPrefixMap || prefixPreservingKeys.hasOwnProperty(arg) || clearPrefix(cm);
}
function clearPrefix(cm) {
cm.state.emacsPrefix = null, cm.off("keyHandled", maybeClearPrefix), cm.off("inputRead", maybeDuplicateInput);
}
function maybeDuplicateInput(cm, event) {
var dup = getPrefix(cm);
if (dup > 1 && "+input" == event.origin) {
for (var one = event.text.join("\n"), txt = "", i = 1; dup > i; ++i) txt += one;
cm.replaceSelection(txt);
}
}
function addPrefixMap(cm) {
cm.state.emacsPrefixMap = !0, cm.addKeyMap(prefixMap), cm.on("keyHandled", maybeRemovePrefixMap), 
cm.on("inputRead", maybeRemovePrefixMap);
}
function maybeRemovePrefixMap(cm, arg) {
("string" != typeof arg || !/^\d$/.test(arg) && "Ctrl-U" != arg) && (cm.removeKeyMap(prefixMap), 
cm.state.emacsPrefixMap = !1, cm.off("keyHandled", maybeRemovePrefixMap), cm.off("inputRead", maybeRemovePrefixMap));
}
function setMark(cm) {
cm.setCursor(cm.getCursor()), cm.setExtending(!cm.getExtending()), cm.on("change", function() {
cm.setExtending(!1);
});
}
function clearMark(cm) {
cm.setExtending(!1), cm.setCursor(cm.getCursor());
}
function getInput(cm, msg, f) {
cm.openDialog ? cm.openDialog(msg + ': <input type="text" style="width: 10em"/>', f, {
bottom:!0
}) :f(prompt(msg, ""));
}
function operateOnWord(cm, op) {
var start = cm.getCursor(), end = cm.findPosH(start, 1, "word");
cm.replaceRange(op(cm.getRange(start, end)), start, end), cm.setCursor(end);
}
function toEnclosingExpr(cm) {
for (var pos = cm.getCursor(), line = pos.line, ch = pos.ch, stack = []; line >= cm.firstLine(); ) {
for (var text = cm.getLine(line), i = null == ch ? text.length :ch; i > 0; ) {
var ch = text.charAt(--i);
if (")" == ch) stack.push("("); else if ("]" == ch) stack.push("["); else if ("}" == ch) stack.push("{"); else if (/[\(\{\[]/.test(ch) && (!stack.length || stack.pop() != ch)) return cm.extendSelection(Pos(line, i));
}
--line, ch = null;
}
}
function quit(cm) {
cm.execCommand("clearSearch"), clearMark(cm);
}
function regPrefix(d) {
prefixMap[d] = function(cm) {
addPrefix(cm, d);
}, keyMap["Ctrl-" + d] = function(cm) {
addPrefix(cm, d);
}, prefixPreservingKeys["Ctrl-" + d] = !0;
}
var Pos = CodeMirror.Pos, killRing = [], lastKill = null, prefixPreservingKeys = {
"Alt-G":!0,
"Ctrl-X":!0,
"Ctrl-Q":!0,
"Ctrl-U":!0
}, keyMap = CodeMirror.keyMap.emacs = {
"Ctrl-W":function(cm) {
kill(cm, cm.getCursor("start"), cm.getCursor("end"));
},
"Ctrl-K":repeated(function(cm) {
var start = cm.getCursor(), end = cm.clipPos(Pos(start.line)), text = cm.getRange(start, end);
/\S/.test(text) || (text += "\n", end = Pos(start.line + 1, 0)), kill(cm, start, end, !0, text);
}),
"Alt-W":function(cm) {
addToRing(cm.getSelection()), clearMark(cm);
},
"Ctrl-Y":function(cm) {
var start = cm.getCursor();
cm.replaceRange(getFromRing(getPrefix(cm)), start, start, "paste"), cm.setSelection(start, cm.getCursor());
},
"Alt-Y":function(cm) {
cm.replaceSelection(popFromRing(), "around", "paste");
},
"Ctrl-Space":setMark,
"Ctrl-Shift-2":setMark,
"Ctrl-F":move(byChar, 1),
"Ctrl-B":move(byChar, -1),
Right:move(byChar, 1),
Left:move(byChar, -1),
"Ctrl-D":function(cm) {
killTo(cm, byChar, 1);
},
Delete:function(cm) {
killTo(cm, byChar, 1);
},
"Ctrl-H":function(cm) {
killTo(cm, byChar, -1);
},
Backspace:function(cm) {
killTo(cm, byChar, -1);
},
"Alt-F":move(byWord, 1),
"Alt-B":move(byWord, -1),
"Alt-D":function(cm) {
killTo(cm, byWord, 1);
},
"Alt-Backspace":function(cm) {
killTo(cm, byWord, -1);
},
"Ctrl-N":move(byLine, 1),
"Ctrl-P":move(byLine, -1),
Down:move(byLine, 1),
Up:move(byLine, -1),
"Ctrl-A":"goLineStart",
"Ctrl-E":"goLineEnd",
End:"goLineEnd",
Home:"goLineStart",
"Alt-V":move(byPage, -1),
"Ctrl-V":move(byPage, 1),
PageUp:move(byPage, -1),
PageDown:move(byPage, 1),
"Ctrl-Up":move(byParagraph, -1),
"Ctrl-Down":move(byParagraph, 1),
"Alt-A":move(bySentence, -1),
"Alt-E":move(bySentence, 1),
"Alt-K":function(cm) {
killTo(cm, bySentence, 1);
},
"Ctrl-Alt-K":function(cm) {
killTo(cm, byExpr, 1);
},
"Ctrl-Alt-Backspace":function(cm) {
killTo(cm, byExpr, -1);
},
"Ctrl-Alt-F":move(byExpr, 1),
"Ctrl-Alt-B":move(byExpr, -1),
"Shift-Ctrl-Alt-2":function(cm) {
cm.setSelection(findEnd(cm, byExpr, 1), cm.getCursor());
},
"Ctrl-Alt-T":function(cm) {
var leftStart = byExpr(cm, cm.getCursor(), -1), leftEnd = byExpr(cm, leftStart, 1), rightEnd = byExpr(cm, leftEnd, 1), rightStart = byExpr(cm, rightEnd, -1);
cm.replaceRange(cm.getRange(rightStart, rightEnd) + cm.getRange(leftEnd, rightStart) + cm.getRange(leftStart, leftEnd), leftStart, rightEnd);
},
"Ctrl-Alt-U":repeated(toEnclosingExpr),
"Alt-Space":function(cm) {
for (var pos = cm.getCursor(), from = pos.ch, to = pos.ch, text = cm.getLine(pos.line); from && /\s/.test(text.charAt(from - 1)); ) --from;
for (;to < text.length && /\s/.test(text.charAt(to)); ) ++to;
cm.replaceRange(" ", Pos(pos.line, from), Pos(pos.line, to));
},
"Ctrl-O":repeated(function(cm) {
cm.replaceSelection("\n", "start");
}),
"Ctrl-T":repeated(function(cm) {
cm.execCommand("transposeChars");
}),
"Alt-C":repeated(function(cm) {
operateOnWord(cm, function(w) {
var letter = w.search(/\w/);
return -1 == letter ? w :w.slice(0, letter) + w.charAt(letter).toUpperCase() + w.slice(letter + 1).toLowerCase();
});
}),
"Alt-U":repeated(function(cm) {
operateOnWord(cm, function(w) {
return w.toUpperCase();
});
}),
"Alt-L":repeated(function(cm) {
operateOnWord(cm, function(w) {
return w.toLowerCase();
});
}),
"Alt-;":"toggleComment",
"Ctrl-/":repeated("undo"),
"Shift-Ctrl--":repeated("undo"),
"Ctrl-Z":repeated("undo"),
"Cmd-Z":repeated("undo"),
"Shift-Alt-,":"goDocStart",
"Shift-Alt-.":"goDocEnd",
"Ctrl-S":"findNext",
"Ctrl-R":"findPrev",
"Ctrl-G":quit,
"Shift-Alt-5":"replace",
"Alt-/":"autocomplete",
"Ctrl-J":"newlineAndIndent",
Enter:!1,
Tab:"indentAuto",
"Alt-G":function(cm) {
cm.setOption("keyMap", "emacs-Alt-G");
},
"Ctrl-X":function(cm) {
cm.setOption("keyMap", "emacs-Ctrl-X");
},
"Ctrl-Q":function(cm) {
cm.setOption("keyMap", "emacs-Ctrl-Q");
},
"Ctrl-U":addPrefixMap
};
CodeMirror.keyMap["emacs-Ctrl-X"] = {
Tab:function(cm) {
cm.indentSelection(getPrefix(cm, !0) || cm.getOption("indentUnit"));
},
"Ctrl-X":function(cm) {
cm.setSelection(cm.getCursor("head"), cm.getCursor("anchor"));
},
"Ctrl-S":"save",
"Ctrl-W":"save",
S:"saveAll",
F:"open",
U:repeated("undo"),
K:"close",
Delete:function(cm) {
kill(cm, cm.getCursor(), bySentence(cm, cm.getCursor(), 1), !0);
},
auto:"emacs",
nofallthrough:!0,
disableInput:!0
}, CodeMirror.keyMap["emacs-Alt-G"] = {
G:function(cm) {
var prefix = getPrefix(cm, !0);
return null != prefix && prefix > 0 ? cm.setCursor(prefix - 1) :(getInput(cm, "Goto line", function(str) {
var num;
str && !isNaN(num = Number(str)) && num == num | 0 && num > 0 && cm.setCursor(num - 1);
}), void 0);
},
auto:"emacs",
nofallthrough:!0,
disableInput:!0
}, CodeMirror.keyMap["emacs-Ctrl-Q"] = {
Tab:repeated("insertTab"),
auto:"emacs",
nofallthrough:!0
};
for (var prefixMap = {
"Ctrl-G":clearPrefix
}, i = 0; 10 > i; ++i) regPrefix(String(i));
regPrefix("-");
});