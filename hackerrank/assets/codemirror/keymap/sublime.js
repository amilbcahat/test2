// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../lib/codemirror"), require("../addon/search/searchcursor"), require("../addon/edit/matchbrackets")) :"function" == typeof define && define.amd ? define([ "../lib/codemirror", "../addon/search/searchcursor", "../addon/edit/matchbrackets" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function findPosSubword(doc, start, dir) {
if (0 > dir && 0 == start.ch) return doc.clipPos(Pos(start.line - 1));
var line = doc.getLine(start.line);
if (dir > 0 && start.ch >= line.length) return doc.clipPos(Pos(start.line + 1, 0));
for (var type, state = "start", pos = start.ch, e = 0 > dir ? 0 :line.length, i = 0; pos != e; pos += dir, 
i++) {
var next = line.charAt(0 > dir ? pos - 1 :pos), cat = "_" != next && CodeMirror.isWordChar(next) ? "w" :"o";
if ("w" == cat && next.toUpperCase() == next && (cat = "W"), "start" == state) "o" != cat && (state = "in", 
type = cat); else if ("in" == state && type != cat) {
if ("w" == type && "W" == cat && 0 > dir && pos--, "W" == type && "w" == cat && dir > 0) {
type = "w";
continue;
}
break;
}
}
return Pos(start.line, pos);
}
function moveSubword(cm, dir) {
cm.extendSelectionsBy(function(range) {
return cm.display.shift || cm.doc.extend || range.empty() ? findPosSubword(cm.doc, range.head, dir) :0 > dir ? range.from() :range.to();
});
}
function insertLine(cm, above) {
cm.operation(function() {
for (var len = cm.listSelections().length, newSelection = [], last = -1, i = 0; len > i; i++) {
var head = cm.listSelections()[i].head;
if (!(head.line <= last)) {
var at = Pos(head.line + (above ? 0 :1), 0);
cm.replaceRange("\n", at, null, "+insertLine"), cm.indentLine(at.line, null, !0), 
newSelection.push({
head:at,
anchor:at
}), last = head.line + 1;
}
}
cm.setSelections(newSelection);
});
}
function wordAt(cm, pos) {
for (var start = pos.ch, end = start, line = cm.getLine(pos.line); start && CodeMirror.isWordChar(line.charAt(start - 1)); ) --start;
for (;end < line.length && CodeMirror.isWordChar(line.charAt(end)); ) ++end;
return {
from:Pos(pos.line, start),
to:Pos(pos.line, end),
word:line.slice(start, end)
};
}
function selectBetweenBrackets(cm) {
var pos = cm.getCursor(), opening = cm.scanForBracket(pos, -1);
if (opening) for (;;) {
var closing = cm.scanForBracket(pos, 1);
if (!closing) return;
if (closing.ch == mirror.charAt(mirror.indexOf(opening.ch) + 1)) return cm.setSelection(Pos(opening.pos.line, opening.pos.ch + 1), closing.pos, !1), 
!0;
pos = Pos(closing.pos.line, closing.pos.ch + 1);
}
}
function sortLines(cm, caseSensitive) {
for (var selected, ranges = cm.listSelections(), toSort = [], i = 0; i < ranges.length; i++) {
var range = ranges[i];
if (!range.empty()) {
for (var from = range.from().line, to = range.to().line; i < ranges.length - 1 && ranges[i + 1].from().line == to; ) to = range[++i].to().line;
toSort.push(from, to);
}
}
toSort.length ? selected = !0 :toSort.push(cm.firstLine(), cm.lastLine()), cm.operation(function() {
for (var ranges = [], i = 0; i < toSort.length; i += 2) {
var from = toSort[i], to = toSort[i + 1], start = Pos(from, 0), end = Pos(to), lines = cm.getRange(start, end, !1);
caseSensitive ? lines.sort() :lines.sort(function(a, b) {
var au = a.toUpperCase(), bu = b.toUpperCase();
return au != bu && (a = au, b = bu), b > a ? -1 :a == b ? 0 :1;
}), cm.replaceRange(lines, start, end), selected && ranges.push({
anchor:start,
head:end
});
}
selected && cm.setSelections(ranges, 0);
});
}
function modifyWordOrSelection(cm, mod) {
cm.operation(function() {
for (var ranges = cm.listSelections(), indices = [], replacements = [], i = 0; i < ranges.length; i++) {
var range = ranges[i];
range.empty() ? (indices.push(i), replacements.push("")) :replacements.push(mod(cm.getRange(range.from(), range.to())));
}
cm.replaceSelections(replacements, "around", "case");
for (var at, i = indices.length - 1; i >= 0; i--) {
var range = ranges[indices[i]];
if (!(at && CodeMirror.cmpPos(range.head, at) > 0)) {
var word = wordAt(cm, range.head);
at = word.from, cm.replaceRange(mod(word.word), word.from, word.to);
}
}
});
}
function getTarget(cm) {
var from = cm.getCursor("from"), to = cm.getCursor("to");
if (0 == CodeMirror.cmpPos(from, to)) {
var word = wordAt(cm, from);
if (!word.word) return;
from = word.from, to = word.to;
}
return {
from:from,
to:to,
query:cm.getRange(from, to),
word:word
};
}
function findAndGoTo(cm, forward) {
var target = getTarget(cm);
if (target) {
var query = target.query, cur = cm.getSearchCursor(query, forward ? target.to :target.from);
(forward ? cur.findNext() :cur.findPrevious()) ? cm.setSelection(cur.from(), cur.to()) :(cur = cm.getSearchCursor(query, forward ? Pos(cm.firstLine(), 0) :cm.clipPos(Pos(cm.lastLine()))), 
(forward ? cur.findNext() :cur.findPrevious()) ? cm.setSelection(cur.from(), cur.to()) :target.word && cm.setSelection(target.from, target.to));
}
}
var map = CodeMirror.keyMap.sublime = {
fallthrough:"default"
}, cmds = CodeMirror.commands, Pos = CodeMirror.Pos, ctrl = CodeMirror.keyMap["default"] == CodeMirror.keyMap.pcDefault ? "Ctrl-" :"Cmd-";
cmds[map["Alt-Left"] = "goSubwordLeft"] = function(cm) {
moveSubword(cm, -1);
}, cmds[map["Alt-Right"] = "goSubwordRight"] = function(cm) {
moveSubword(cm, 1);
}, cmds[map[ctrl + "Up"] = "scrollLineUp"] = function(cm) {
var info = cm.getScrollInfo();
if (!cm.somethingSelected()) {
var visibleBottomLine = cm.lineAtHeight(info.top + info.clientHeight, "local");
cm.getCursor().line >= visibleBottomLine && cm.execCommand("goLineUp");
}
cm.scrollTo(null, info.top - cm.defaultTextHeight());
}, cmds[map[ctrl + "Down"] = "scrollLineDown"] = function(cm) {
var info = cm.getScrollInfo();
if (!cm.somethingSelected()) {
var visibleTopLine = cm.lineAtHeight(info.top, "local") + 1;
cm.getCursor().line <= visibleTopLine && cm.execCommand("goLineDown");
}
cm.scrollTo(null, info.top + cm.defaultTextHeight());
}, cmds[map["Shift-" + ctrl + "L"] = "splitSelectionByLine"] = function(cm) {
for (var ranges = cm.listSelections(), lineRanges = [], i = 0; i < ranges.length; i++) for (var from = ranges[i].from(), to = ranges[i].to(), line = from.line; line <= to.line; ++line) to.line > from.line && line == to.line && 0 == to.ch || lineRanges.push({
anchor:line == from.line ? from :Pos(line, 0),
head:line == to.line ? to :Pos(line)
});
cm.setSelections(lineRanges, 0);
}, map["Shift-Tab"] = "indentLess", cmds[map.Esc = "singleSelectionTop"] = function(cm) {
var range = cm.listSelections()[0];
cm.setSelection(range.anchor, range.head, {
scroll:!1
});
}, cmds[map[ctrl + "L"] = "selectLine"] = function(cm) {
for (var ranges = cm.listSelections(), extended = [], i = 0; i < ranges.length; i++) {
var range = ranges[i];
extended.push({
anchor:Pos(range.from().line, 0),
head:Pos(range.to().line + 1, 0)
});
}
cm.setSelections(extended);
}, map["Shift-" + ctrl + "K"] = "deleteLine", cmds[map[ctrl + "Enter"] = "insertLineAfter"] = function(cm) {
insertLine(cm, !1);
}, cmds[map["Shift-" + ctrl + "Enter"] = "insertLineBefore"] = function(cm) {
insertLine(cm, !0);
}, cmds[map[ctrl + "D"] = "selectNextOccurrence"] = function(cm) {
var from = cm.getCursor("from"), to = cm.getCursor("to"), fullWord = cm.state.sublimeFindFullWord == cm.doc.sel;
if (0 == CodeMirror.cmpPos(from, to)) {
var word = wordAt(cm, from);
if (!word.word) return;
cm.setSelection(word.from, word.to), fullWord = !0;
} else {
var text = cm.getRange(from, to), query = fullWord ? new RegExp("\\b" + text + "\\b") :text, cur = cm.getSearchCursor(query, to);
cur.findNext() ? cm.addSelection(cur.from(), cur.to()) :(cur = cm.getSearchCursor(query, Pos(cm.firstLine(), 0)), 
cur.findNext() && cm.addSelection(cur.from(), cur.to()));
}
fullWord && (cm.state.sublimeFindFullWord = cm.doc.sel);
};
var mirror = "(){}[]";
cmds[map["Shift-" + ctrl + "Space"] = "selectScope"] = function(cm) {
selectBetweenBrackets(cm) || cm.execCommand("selectAll");
}, cmds[map["Shift-" + ctrl + "M"] = "selectBetweenBrackets"] = function(cm) {
return selectBetweenBrackets(cm) ? void 0 :CodeMirror.Pass;
}, cmds[map[ctrl + "M"] = "goToBracket"] = function(cm) {
cm.extendSelectionsBy(function(range) {
var next = cm.scanForBracket(range.head, 1);
if (next && 0 != CodeMirror.cmpPos(next.pos, range.head)) return next.pos;
var prev = cm.scanForBracket(range.head, -1);
return prev && Pos(prev.pos.line, prev.pos.ch + 1) || range.head;
});
}, cmds[map["Shift-" + ctrl + "Up"] = "swapLineUp"] = function(cm) {
for (var ranges = cm.listSelections(), linesToMove = [], at = cm.firstLine() - 1, newSels = [], i = 0; i < ranges.length; i++) {
var range = ranges[i], from = range.from().line - 1, to = range.to().line;
newSels.push({
anchor:Pos(range.anchor.line - 1, range.anchor.ch),
head:Pos(range.head.line - 1, range.head.ch)
}), 0 != range.to().ch || range.empty() || --to, from > at ? linesToMove.push(from, to) :linesToMove.length && (linesToMove[linesToMove.length - 1] = to), 
at = to;
}
cm.operation(function() {
for (var i = 0; i < linesToMove.length; i += 2) {
var from = linesToMove[i], to = linesToMove[i + 1], line = cm.getLine(from);
cm.replaceRange("", Pos(from, 0), Pos(from + 1, 0), "+swapLine"), to > cm.lastLine() ? cm.replaceRange("\n" + line, Pos(cm.lastLine()), null, "+swapLine") :cm.replaceRange(line + "\n", Pos(to, 0), null, "+swapLine");
}
cm.setSelections(newSels), cm.scrollIntoView();
});
}, cmds[map["Shift-" + ctrl + "Down"] = "swapLineDown"] = function(cm) {
for (var ranges = cm.listSelections(), linesToMove = [], at = cm.lastLine() + 1, i = ranges.length - 1; i >= 0; i--) {
var range = ranges[i], from = range.to().line + 1, to = range.from().line;
0 != range.to().ch || range.empty() || from--, at > from ? linesToMove.push(from, to) :linesToMove.length && (linesToMove[linesToMove.length - 1] = to), 
at = to;
}
cm.operation(function() {
for (var i = linesToMove.length - 2; i >= 0; i -= 2) {
var from = linesToMove[i], to = linesToMove[i + 1], line = cm.getLine(from);
from == cm.lastLine() ? cm.replaceRange("", Pos(from - 1), Pos(from), "+swapLine") :cm.replaceRange("", Pos(from, 0), Pos(from + 1, 0), "+swapLine"), 
cm.replaceRange(line + "\n", Pos(to, 0), null, "+swapLine");
}
cm.scrollIntoView();
});
}, map[ctrl + "/"] = "toggleComment", cmds[map[ctrl + "J"] = "joinLines"] = function(cm) {
for (var ranges = cm.listSelections(), joined = [], i = 0; i < ranges.length; i++) {
for (var range = ranges[i], from = range.from(), start = from.line, end = range.to().line; i < ranges.length - 1 && ranges[i + 1].from().line == end; ) end = ranges[++i].to().line;
joined.push({
start:start,
end:end,
anchor:!range.empty() && from
});
}
cm.operation(function() {
for (var offset = 0, ranges = [], i = 0; i < joined.length; i++) {
for (var head, obj = joined[i], anchor = obj.anchor && Pos(obj.anchor.line - offset, obj.anchor.ch), line = obj.start; line <= obj.end; line++) {
var actual = line - offset;
line == obj.end && (head = Pos(actual, cm.getLine(actual).length + 1)), actual < cm.lastLine() && (cm.replaceRange(" ", Pos(actual), Pos(actual + 1, /^\s*/.exec(cm.getLine(actual + 1))[0].length)), 
++offset);
}
ranges.push({
anchor:anchor || head,
head:head
});
}
cm.setSelections(ranges, 0);
});
}, cmds[map["Shift-" + ctrl + "D"] = "duplicateLine"] = function(cm) {
cm.operation(function() {
for (var rangeCount = cm.listSelections().length, i = 0; rangeCount > i; i++) {
var range = cm.listSelections()[i];
range.empty() ? cm.replaceRange(cm.getLine(range.head.line) + "\n", Pos(range.head.line, 0)) :cm.replaceRange(cm.getRange(range.from(), range.to()), range.from());
}
cm.scrollIntoView();
});
}, map[ctrl + "T"] = "transposeChars", cmds[map.F9 = "sortLines"] = function(cm) {
sortLines(cm, !0);
}, cmds[map[ctrl + "F9"] = "sortLinesInsensitive"] = function(cm) {
sortLines(cm, !1);
}, cmds[map.F2 = "nextBookmark"] = function(cm) {
var marks = cm.state.sublimeBookmarks;
if (marks) for (;marks.length; ) {
var current = marks.shift(), found = current.find();
if (found) return marks.push(current), cm.setSelection(found.from, found.to);
}
}, cmds[map["Shift-F2"] = "prevBookmark"] = function(cm) {
var marks = cm.state.sublimeBookmarks;
if (marks) for (;marks.length; ) {
marks.unshift(marks.pop());
var found = marks[marks.length - 1].find();
if (found) return cm.setSelection(found.from, found.to);
marks.pop();
}
}, cmds[map[ctrl + "F2"] = "toggleBookmark"] = function(cm) {
for (var ranges = cm.listSelections(), marks = cm.state.sublimeBookmarks || (cm.state.sublimeBookmarks = []), i = 0; i < ranges.length; i++) {
for (var from = ranges[i].from(), to = ranges[i].to(), found = cm.findMarks(from, to), j = 0; j < found.length; j++) if (found[j].sublimeBookmark) {
found[j].clear();
for (var k = 0; k < marks.length; k++) marks[k] == found[j] && marks.splice(k--, 1);
break;
}
j == found.length && marks.push(cm.markText(from, to, {
sublimeBookmark:!0,
clearWhenEmpty:!1
}));
}
}, cmds[map["Shift-" + ctrl + "F2"] = "clearBookmarks"] = function(cm) {
var marks = cm.state.sublimeBookmarks;
if (marks) for (var i = 0; i < marks.length; i++) marks[i].clear();
marks.length = 0;
}, cmds[map["Alt-F2"] = "selectBookmarks"] = function(cm) {
var marks = cm.state.sublimeBookmarks, ranges = [];
if (marks) for (var i = 0; i < marks.length; i++) {
var found = marks[i].find();
found ? ranges.push({
anchor:found.from,
head:found.to
}) :marks.splice(i--, 0);
}
ranges.length && cm.setSelections(ranges, 0);
}, map["Alt-Q"] = "wrapLines";
var mapK = CodeMirror.keyMap["sublime-Ctrl-K"] = {
auto:"sublime",
nofallthrough:!0
};
map[ctrl + "K"] = function(cm) {
cm.setOption("keyMap", "sublime-Ctrl-K");
}, mapK[ctrl + "Backspace"] = "delLineLeft", cmds[mapK[ctrl + "K"] = "delLineRight"] = function(cm) {
cm.operation(function() {
for (var ranges = cm.listSelections(), i = ranges.length - 1; i >= 0; i--) cm.replaceRange("", ranges[i].anchor, Pos(ranges[i].to().line), "+delete");
cm.scrollIntoView();
});
}, cmds[mapK[ctrl + "U"] = "upcaseAtCursor"] = function(cm) {
modifyWordOrSelection(cm, function(str) {
return str.toUpperCase();
});
}, cmds[mapK[ctrl + "L"] = "downcaseAtCursor"] = function(cm) {
modifyWordOrSelection(cm, function(str) {
return str.toLowerCase();
});
}, cmds[mapK[ctrl + "Space"] = "setSublimeMark"] = function(cm) {
cm.state.sublimeMark && cm.state.sublimeMark.clear(), cm.state.sublimeMark = cm.setBookmark(cm.getCursor());
}, cmds[mapK[ctrl + "A"] = "selectToSublimeMark"] = function(cm) {
var found = cm.state.sublimeMark && cm.state.sublimeMark.find();
found && cm.setSelection(cm.getCursor(), found);
}, cmds[mapK[ctrl + "W"] = "deleteToSublimeMark"] = function(cm) {
var found = cm.state.sublimeMark && cm.state.sublimeMark.find();
if (found) {
var from = cm.getCursor(), to = found;
if (CodeMirror.cmpPos(from, to) > 0) {
var tmp = to;
to = from, from = tmp;
}
cm.state.sublimeKilled = cm.getRange(from, to), cm.replaceRange("", from, to);
}
}, cmds[mapK[ctrl + "X"] = "swapWithSublimeMark"] = function(cm) {
var found = cm.state.sublimeMark && cm.state.sublimeMark.find();
found && (cm.state.sublimeMark.clear(), cm.state.sublimeMark = cm.setBookmark(cm.getCursor()), 
cm.setCursor(found));
}, cmds[mapK[ctrl + "Y"] = "sublimeYank"] = function(cm) {
null != cm.state.sublimeKilled && cm.replaceSelection(cm.state.sublimeKilled, null, "paste");
}, mapK[ctrl + "G"] = "clearBookmarks", cmds[mapK[ctrl + "C"] = "showInCenter"] = function(cm) {
var pos = cm.cursorCoords(null, "local");
cm.scrollTo(null, (pos.top + pos.bottom) / 2 - cm.getScrollInfo().clientHeight / 2);
}, cmds[map["Shift-Alt-Up"] = "selectLinesUpward"] = function(cm) {
cm.operation(function() {
for (var ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
var range = ranges[i];
range.head.line > cm.firstLine() && cm.addSelection(Pos(range.head.line - 1, range.head.ch));
}
});
}, cmds[map["Shift-Alt-Down"] = "selectLinesDownward"] = function(cm) {
cm.operation(function() {
for (var ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
var range = ranges[i];
range.head.line < cm.lastLine() && cm.addSelection(Pos(range.head.line + 1, range.head.ch));
}
});
}, cmds[map[ctrl + "F3"] = "findUnder"] = function(cm) {
findAndGoTo(cm, !0);
}, cmds[map["Shift-" + ctrl + "F3"] = "findUnderPrevious"] = function(cm) {
findAndGoTo(cm, !1);
}, cmds[map["Alt-F3"] = "findAllUnder"] = function(cm) {
var target = getTarget(cm);
if (target) {
for (var cur = cm.getSearchCursor(target.query), matches = [], primaryIndex = -1; cur.findNext(); ) matches.push({
anchor:cur.from(),
head:cur.to()
}), cur.from().line <= target.from.line && cur.from().ch <= target.from.ch && primaryIndex++;
cm.setSelections(matches, primaryIndex);
}
}, map["Shift-" + ctrl + "["] = "fold", map["Shift-" + ctrl + "]"] = "unfold", mapK[ctrl + "0"] = mapK[ctrl + "j"] = "unfoldAll", 
map[ctrl + "I"] = "findIncremental", map["Shift-" + ctrl + "I"] = "findIncrementalReverse", 
map[ctrl + "H"] = "replace", map.F3 = "findNext", map["Shift-F3"] = "findPrev";
});