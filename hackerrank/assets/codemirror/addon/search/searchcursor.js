// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function SearchCursor(doc, query, pos, caseFold) {
if (this.atOccurrence = !1, this.doc = doc, null == caseFold && "string" == typeof query && (caseFold = !1), 
pos = pos ? doc.clipPos(pos) :Pos(0, 0), this.pos = {
from:pos,
to:pos
}, "string" != typeof query) query.global || (query = new RegExp(query.source, query.ignoreCase ? "ig" :"g")), 
this.matches = function(reverse, pos) {
if (reverse) {
query.lastIndex = 0;
for (var match, start, line = doc.getLine(pos.line).slice(0, pos.ch), cutOff = 0; ;) {
query.lastIndex = cutOff;
var newMatch = query.exec(line);
if (!newMatch) break;
if (match = newMatch, start = match.index, cutOff = match.index + (match[0].length || 1), 
cutOff == line.length) break;
}
var matchLen = match && match[0].length || 0;
matchLen || (0 == start && 0 == line.length ? match = void 0 :start != doc.getLine(pos.line).length && matchLen++);
} else {
query.lastIndex = pos.ch;
var line = doc.getLine(pos.line), match = query.exec(line), matchLen = match && match[0].length || 0, start = match && match.index;
start + matchLen == line.length || matchLen || (matchLen = 1);
}
return match && matchLen ? {
from:Pos(pos.line, start),
to:Pos(pos.line, start + matchLen),
match:match
} :void 0;
}; else {
var origQuery = query;
caseFold && (query = query.toLowerCase());
var fold = caseFold ? function(str) {
return str.toLowerCase();
} :function(str) {
return str;
}, target = query.split("\n");
if (1 == target.length) this.matches = query.length ? function(reverse, pos) {
if (reverse) {
var orig = doc.getLine(pos.line).slice(0, pos.ch), line = fold(orig), match = line.lastIndexOf(query);
if (match > -1) return match = adjustPos(orig, line, match), {
from:Pos(pos.line, match),
to:Pos(pos.line, match + origQuery.length)
};
} else {
var orig = doc.getLine(pos.line).slice(pos.ch), line = fold(orig), match = line.indexOf(query);
if (match > -1) return match = adjustPos(orig, line, match) + pos.ch, {
from:Pos(pos.line, match),
to:Pos(pos.line, match + origQuery.length)
};
}
} :function() {}; else {
var origTarget = origQuery.split("\n");
this.matches = function(reverse, pos) {
var last = target.length - 1;
if (reverse) {
if (pos.line - (target.length - 1) < doc.firstLine()) return;
if (fold(doc.getLine(pos.line).slice(0, origTarget[last].length)) != target[target.length - 1]) return;
for (var to = Pos(pos.line, origTarget[last].length), ln = pos.line - 1, i = last - 1; i >= 1; --i, 
--ln) if (target[i] != fold(doc.getLine(ln))) return;
var line = doc.getLine(ln), cut = line.length - origTarget[0].length;
if (fold(line.slice(cut)) != target[0]) return;
return {
from:Pos(ln, cut),
to:to
};
}
if (!(pos.line + (target.length - 1) > doc.lastLine())) {
var line = doc.getLine(pos.line), cut = line.length - origTarget[0].length;
if (fold(line.slice(cut)) == target[0]) {
for (var from = Pos(pos.line, cut), ln = pos.line + 1, i = 1; last > i; ++i, ++ln) if (target[i] != fold(doc.getLine(ln))) return;
if (fold(doc.getLine(ln).slice(0, origTarget[last].length)) == target[last]) return {
from:from,
to:Pos(ln, origTarget[last].length)
};
}
}
};
}
}
}
function adjustPos(orig, folded, pos) {
if (orig.length == folded.length) return pos;
for (var pos1 = Math.min(pos, orig.length); ;) {
var len1 = orig.slice(0, pos1).toLowerCase().length;
if (pos > len1) ++pos1; else {
if (!(len1 > pos)) return pos1;
--pos1;
}
}
}
var Pos = CodeMirror.Pos;
SearchCursor.prototype = {
findNext:function() {
return this.find(!1);
},
findPrevious:function() {
return this.find(!0);
},
find:function(reverse) {
function savePosAndFail(line) {
var pos = Pos(line, 0);
return self.pos = {
from:pos,
to:pos
}, self.atOccurrence = !1, !1;
}
for (var self = this, pos = this.doc.clipPos(reverse ? this.pos.from :this.pos.to); ;) {
if (this.pos = this.matches(reverse, pos)) return this.atOccurrence = !0, this.pos.match || !0;
if (reverse) {
if (!pos.line) return savePosAndFail(0);
pos = Pos(pos.line - 1, this.doc.getLine(pos.line - 1).length);
} else {
var maxLine = this.doc.lineCount();
if (pos.line == maxLine - 1) return savePosAndFail(maxLine);
pos = Pos(pos.line + 1, 0);
}
}
},
from:function() {
return this.atOccurrence ? this.pos.from :void 0;
},
to:function() {
return this.atOccurrence ? this.pos.to :void 0;
},
replace:function(newText) {
if (this.atOccurrence) {
var lines = CodeMirror.splitLines(newText);
this.doc.replaceRange(lines, this.pos.from, this.pos.to), this.pos.to = Pos(this.pos.from.line + lines.length - 1, lines[lines.length - 1].length + (1 == lines.length ? this.pos.from.ch :0));
}
}
}, CodeMirror.defineExtension("getSearchCursor", function(query, pos, caseFold) {
return new SearchCursor(this.doc, query, pos, caseFold);
}), CodeMirror.defineDocExtension("getSearchCursor", function(query, pos, caseFold) {
return new SearchCursor(this, query, pos, caseFold);
}), CodeMirror.defineExtension("selectMatches", function(query, caseFold) {
for (var next, ranges = [], cur = this.getSearchCursor(query, this.getCursor("from"), caseFold); (next = cur.findNext()) && !(CodeMirror.cmpPos(cur.to(), this.getCursor("to")) > 0); ) ranges.push({
anchor:cur.from(),
head:cur.to()
});
ranges.length && this.setSelections(ranges, 0);
});
});