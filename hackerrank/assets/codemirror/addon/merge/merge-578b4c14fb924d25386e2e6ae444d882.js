// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function DiffView(mv, type) {
this.mv = mv, this.type = type, this.classes = "left" == type ? {
chunk:"CodeMirror-merge-l-chunk",
start:"CodeMirror-merge-l-chunk-start",
end:"CodeMirror-merge-l-chunk-end",
insert:"CodeMirror-merge-l-inserted",
del:"CodeMirror-merge-l-deleted",
connect:"CodeMirror-merge-l-connect"
} :{
chunk:"CodeMirror-merge-r-chunk",
start:"CodeMirror-merge-r-chunk-start",
end:"CodeMirror-merge-r-chunk-end",
insert:"CodeMirror-merge-r-inserted",
del:"CodeMirror-merge-r-deleted",
connect:"CodeMirror-merge-r-connect"
};
}
function ensureDiff(dv) {
dv.diffOutOfDate && (dv.diff = getDiff(dv.orig.getValue(), dv.edit.getValue()), 
dv.diffOutOfDate = !1, CodeMirror.signal(dv.edit, "updateDiff", dv.diff));
}
function registerUpdate(dv) {
function update(mode) {
"full" == mode && (dv.svg && clear(dv.svg), clear(dv.copyButtons), clearMarks(dv.edit, edit.marked, dv.classes), 
clearMarks(dv.orig, orig.marked, dv.classes), edit.from = edit.to = orig.from = orig.to = 0), 
ensureDiff(dv), dv.showDifferences && (updateMarks(dv.edit, dv.diff, edit, DIFF_INSERT, dv.classes), 
updateMarks(dv.orig, dv.diff, orig, DIFF_DELETE, dv.classes)), drawConnectors(dv);
}
function set(slow) {
clearTimeout(debounceChange), debounceChange = setTimeout(update, 1 == slow ? 250 :100);
}
function change() {
dv.diffOutOfDate || (dv.diffOutOfDate = !0, edit.from = edit.to = orig.from = orig.to = 0), 
set(!0);
}
var debounceChange, edit = {
from:0,
to:0,
marked:[]
}, orig = {
from:0,
to:0,
marked:[]
};
return dv.edit.on("change", change), dv.orig.on("change", change), dv.edit.on("markerAdded", set), 
dv.edit.on("markerCleared", set), dv.orig.on("markerAdded", set), dv.orig.on("markerCleared", set), 
dv.edit.on("viewportChange", set), dv.orig.on("viewportChange", set), update(), 
update;
}
function registerScroll(dv) {
dv.edit.on("scroll", function() {
syncScroll(dv, DIFF_INSERT) && drawConnectors(dv);
}), dv.orig.on("scroll", function() {
syncScroll(dv, DIFF_DELETE) && drawConnectors(dv);
});
}
function syncScroll(dv, type) {
if (dv.diffOutOfDate) return !1;
if (!dv.lockScroll) return !0;
var editor, other, now = +new Date();
if (type == DIFF_INSERT ? (editor = dv.edit, other = dv.orig) :(editor = dv.orig, 
other = dv.edit), editor.state.scrollSetBy == dv && (editor.state.scrollSetAt || 0) + 50 > now) return !1;
var botDist, mix, sInfo = editor.getScrollInfo(), halfScreen = .5 * sInfo.clientHeight, midY = sInfo.top + halfScreen, mid = editor.lineAtHeight(midY, "local"), around = chunkBoundariesAround(dv.diff, mid, type == DIFF_INSERT), off = getOffsets(editor, type == DIFF_INSERT ? around.edit :around.orig), offOther = getOffsets(other, type == DIFF_INSERT ? around.orig :around.edit), ratio = (midY - off.top) / (off.bot - off.top), targetPos = offOther.top - halfScreen + ratio * (offOther.bot - offOther.top);
if (targetPos > sInfo.top && (mix = sInfo.top / halfScreen) < 1) targetPos = targetPos * mix + sInfo.top * (1 - mix); else if ((botDist = sInfo.height - sInfo.clientHeight - sInfo.top) < halfScreen) {
var otherInfo = other.getScrollInfo(), botDistOther = otherInfo.height - otherInfo.clientHeight - targetPos;
botDistOther > botDist && (mix = botDist / halfScreen) < 1 && (targetPos = targetPos * mix + (otherInfo.height - otherInfo.clientHeight - botDist) * (1 - mix));
}
return other.scrollTo(sInfo.left, targetPos), other.state.scrollSetAt = now, other.state.scrollSetBy = dv, 
!0;
}
function getOffsets(editor, around) {
var bot = around.after;
return null == bot && (bot = editor.lastLine() + 1), {
top:editor.heightAtLine(around.before || 0, "local"),
bot:editor.heightAtLine(bot, "local")
};
}
function setScrollLock(dv, val, action) {
dv.lockScroll = val, val && 0 != action && syncScroll(dv, DIFF_INSERT) && drawConnectors(dv), 
dv.lockButton.innerHTML = val ? "\u21db\u21da" :"\u21db&nbsp;&nbsp;\u21da";
}
function clearMarks(editor, arr, classes) {
for (var i = 0; i < arr.length; ++i) {
var mark = arr[i];
mark instanceof CodeMirror.TextMarker ? mark.clear() :mark.parent && (editor.removeLineClass(mark, "background", classes.chunk), 
editor.removeLineClass(mark, "background", classes.start), editor.removeLineClass(mark, "background", classes.end));
}
arr.length = 0;
}
function updateMarks(editor, diff, state, type, classes) {
var vp = editor.getViewport();
editor.operation(function() {
state.from == state.to || vp.from - state.to > 20 || state.from - vp.to > 20 ? (clearMarks(editor, state.marked, classes), 
markChanges(editor, diff, type, state.marked, vp.from, vp.to, classes), state.from = vp.from, 
state.to = vp.to) :(vp.from < state.from && (markChanges(editor, diff, type, state.marked, vp.from, state.from, classes), 
state.from = vp.from), vp.to > state.to && (markChanges(editor, diff, type, state.marked, state.to, vp.to, classes), 
state.to = vp.to));
});
}
function markChanges(editor, diff, type, marks, from, to, classes) {
function markChunk(start, end) {
for (var bfrom = Math.max(from, start), bto = Math.min(to, end), i = bfrom; bto > i; ++i) {
var line = editor.addLineClass(i, "background", classes.chunk);
i == start && editor.addLineClass(line, "background", classes.start), i == end - 1 && editor.addLineClass(line, "background", classes.end), 
marks.push(line);
}
start == end && bfrom == end && bto == end && (bfrom ? marks.push(editor.addLineClass(bfrom - 1, "background", classes.end)) :marks.push(editor.addLineClass(bfrom, "background", classes.start)));
}
for (var pos = Pos(0, 0), top = Pos(from, 0), bot = editor.clipPos(Pos(to - 1)), cls = type == DIFF_DELETE ? classes.del :classes.insert, chunkStart = 0, i = 0; i < diff.length; ++i) {
var part = diff[i], tp = part[0], str = part[1];
if (tp == DIFF_EQUAL) {
var cleanFrom = pos.line + (startOfLineClean(diff, i) ? 0 :1);
moveOver(pos, str);
var cleanTo = pos.line + (endOfLineClean(diff, i) ? 1 :0);
cleanTo > cleanFrom && (i && markChunk(chunkStart, cleanFrom), chunkStart = cleanTo);
} else if (tp == type) {
var end = moveOver(pos, str, !0), a = posMax(top, pos), b = posMin(bot, end);
posEq(a, b) || marks.push(editor.markText(a, b, {
className:cls
})), pos = end;
}
}
chunkStart <= pos.line && markChunk(chunkStart, pos.line + 1);
}
function drawConnectors(dv) {
if (dv.showDifferences) {
if (dv.svg) {
clear(dv.svg);
var w = dv.gap.offsetWidth;
attrs(dv.svg, "width", w, "height", dv.gap.offsetHeight);
}
clear(dv.copyButtons);
var flip = "left" == dv.type, vpEdit = dv.edit.getViewport(), vpOrig = dv.orig.getViewport(), sTopEdit = dv.edit.getScrollInfo().top, sTopOrig = dv.orig.getScrollInfo().top;
iterateChunks(dv.diff, function(topOrig, botOrig, topEdit, botEdit) {
if (!(topEdit > vpEdit.to || botEdit < vpEdit.from || topOrig > vpOrig.to || botOrig < vpOrig.from)) {
var topLpx = dv.orig.heightAtLine(topOrig, "local") - sTopOrig, top = topLpx;
if (dv.svg) {
var topRpx = dv.edit.heightAtLine(topEdit, "local") - sTopEdit;
if (flip) {
var tmp = topLpx;
topLpx = topRpx, topRpx = tmp;
}
var botLpx = dv.orig.heightAtLine(botOrig, "local") - sTopOrig, botRpx = dv.edit.heightAtLine(botEdit, "local") - sTopEdit;
if (flip) {
var tmp = botLpx;
botLpx = botRpx, botRpx = tmp;
}
var curveTop = " C " + w / 2 + " " + topRpx + " " + w / 2 + " " + topLpx + " " + (w + 2) + " " + topLpx, curveBot = " C " + w / 2 + " " + botLpx + " " + w / 2 + " " + botRpx + " -1 " + botRpx;
attrs(dv.svg.appendChild(document.createElementNS(svgNS, "path")), "d", "M -1 " + topRpx + curveTop + " L " + (w + 2) + " " + botLpx + curveBot + " z", "class", dv.classes.connect);
}
var copy = dv.copyButtons.appendChild(elt("div", "left" == dv.type ? "\u21dd" :"\u21dc", "CodeMirror-merge-copy"));
copy.title = "Revert chunk", copy.chunk = {
topEdit:topEdit,
botEdit:botEdit,
topOrig:topOrig,
botOrig:botOrig
}, copy.style.top = top + "px";
}
});
}
}
function copyChunk(dv, chunk) {
dv.diffOutOfDate || dv.edit.replaceRange(dv.orig.getRange(Pos(chunk.topOrig, 0), Pos(chunk.botOrig, 0)), Pos(chunk.topEdit, 0), Pos(chunk.botEdit, 0));
}
function buildGap(dv) {
var lock = dv.lockButton = elt("div", null, "CodeMirror-merge-scrolllock");
lock.title = "Toggle locked scrolling";
var lockWrap = elt("div", [ lock ], "CodeMirror-merge-scrolllock-wrap");
CodeMirror.on(lock, "click", function() {
setScrollLock(dv, !dv.lockScroll);
}), dv.copyButtons = elt("div", null, "CodeMirror-merge-copybuttons-" + dv.type), 
CodeMirror.on(dv.copyButtons, "click", function(e) {
var node = e.target || e.srcElement;
node.chunk && copyChunk(dv, node.chunk);
});
var gapElts = [ dv.copyButtons, lockWrap ], svg = document.createElementNS && document.createElementNS(svgNS, "svg");
return svg && !svg.createSVGRect && (svg = null), dv.svg = svg, svg && gapElts.push(svg), 
dv.gap = elt("div", gapElts, "CodeMirror-merge-gap");
}
function asString(obj) {
return "string" == typeof obj ? obj :obj.getValue();
}
function getDiff(a, b) {
var diff = dmp.diff_main(a, b);
dmp.diff_cleanupSemantic(diff);
for (var i = 0; i < diff.length; ++i) {
var part = diff[i];
part[1] ? i && diff[i - 1][0] == part[0] && (diff.splice(i--, 1), diff[i][1] += part[1]) :diff.splice(i--, 1);
}
return diff;
}
function iterateChunks(diff, f) {
for (var startEdit = 0, startOrig = 0, edit = Pos(0, 0), orig = Pos(0, 0), i = 0; i < diff.length; ++i) {
var part = diff[i], tp = part[0];
if (tp == DIFF_EQUAL) {
var startOff = startOfLineClean(diff, i) ? 0 :1, cleanFromEdit = edit.line + startOff, cleanFromOrig = orig.line + startOff;
moveOver(edit, part[1], null, orig);
var endOff = endOfLineClean(diff, i) ? 1 :0, cleanToEdit = edit.line + endOff, cleanToOrig = orig.line + endOff;
cleanToEdit > cleanFromEdit && (i && f(startOrig, cleanFromOrig, startEdit, cleanFromEdit), 
startEdit = cleanToEdit, startOrig = cleanToOrig);
} else moveOver(tp == DIFF_INSERT ? edit :orig, part[1]);
}
(startEdit <= edit.line || startOrig <= orig.line) && f(startOrig, orig.line + 1, startEdit, edit.line + 1);
}
function getChunks(dv) {
ensureDiff(dv);
var collect = [];
return iterateChunks(dv.diff, function(topOrig, botOrig, topEdit, botEdit) {
collect.push({
origFrom:topOrig,
origTo:botOrig,
editFrom:topEdit,
editTo:botEdit
});
}), collect;
}
function endOfLineClean(diff, i) {
if (i == diff.length - 1) return !0;
var next = diff[i + 1][1];
return 1 == next.length || 10 != next.charCodeAt(0) ? !1 :i == diff.length - 2 ? !0 :(next = diff[i + 2][1], 
next.length > 1 && 10 == next.charCodeAt(0));
}
function startOfLineClean(diff, i) {
if (0 == i) return !0;
var last = diff[i - 1][1];
return 10 != last.charCodeAt(last.length - 1) ? !1 :1 == i ? !0 :(last = diff[i - 2][1], 
10 == last.charCodeAt(last.length - 1));
}
function chunkBoundariesAround(diff, n, nInEdit) {
var beforeE, afterE, beforeO, afterO;
return iterateChunks(diff, function(fromOrig, toOrig, fromEdit, toEdit) {
var fromLocal = nInEdit ? fromEdit :fromOrig, toLocal = nInEdit ? toEdit :toOrig;
null == afterE && (fromLocal > n ? (afterE = fromEdit, afterO = fromOrig) :toLocal > n && (afterE = toEdit, 
afterO = toOrig)), n >= toLocal ? (beforeE = toEdit, beforeO = toOrig) :n >= fromLocal && (beforeE = fromEdit, 
beforeO = fromOrig);
}), {
edit:{
before:beforeE,
after:afterE
},
orig:{
before:beforeO,
after:afterO
}
};
}
function elt(tag, content, className, style) {
var e = document.createElement(tag);
if (className && (e.className = className), style && (e.style.cssText = style), 
"string" == typeof content) e.appendChild(document.createTextNode(content)); else if (content) for (var i = 0; i < content.length; ++i) e.appendChild(content[i]);
return e;
}
function clear(node) {
for (var count = node.childNodes.length; count > 0; --count) node.removeChild(node.firstChild);
}
function attrs(elt) {
for (var i = 1; i < arguments.length; i += 2) elt.setAttribute(arguments[i], arguments[i + 1]);
}
function copyObj(obj, target) {
target || (target = {});
for (var prop in obj) obj.hasOwnProperty(prop) && (target[prop] = obj[prop]);
return target;
}
function moveOver(pos, str, copy, other) {
for (var out = copy ? Pos(pos.line, pos.ch) :pos, at = 0; ;) {
var nl = str.indexOf("\n", at);
if (-1 == nl) break;
++out.line, other && ++other.line, at = nl + 1;
}
return out.ch = (at ? 0 :out.ch) + (str.length - at), other && (other.ch = (at ? 0 :other.ch) + (str.length - at)), 
out;
}
function posMin(a, b) {
return (a.line - b.line || a.ch - b.ch) < 0 ? a :b;
}
function posMax(a, b) {
return (a.line - b.line || a.ch - b.ch) > 0 ? a :b;
}
function posEq(a, b) {
return a.line == b.line && a.ch == b.ch;
}
var Pos = CodeMirror.Pos, svgNS = "http://www.w3.org/2000/svg";
DiffView.prototype = {
constructor:DiffView,
init:function(pane, orig, options) {
this.edit = this.mv.edit, this.orig = CodeMirror(pane, copyObj({
value:orig,
readOnly:!0
}, copyObj(options))), this.diff = getDiff(asString(orig), asString(options.value)), 
this.diffOutOfDate = !1, this.showDifferences = options.showDifferences !== !1, 
this.forceUpdate = registerUpdate(this), setScrollLock(this, !0, !1), registerScroll(this);
},
setShowDifferences:function(val) {
val = val !== !1, val != this.showDifferences && (this.showDifferences = val, this.forceUpdate("full"));
}
};
var MergeView = CodeMirror.MergeView = function(node, options) {
if (!(this instanceof MergeView)) return new MergeView(node, options);
var origLeft = options.origLeft, origRight = null == options.origRight ? options.orig :options.origRight, hasLeft = null != origLeft, hasRight = null != origRight, panes = 1 + (hasLeft ? 1 :0) + (hasRight ? 1 :0), wrap = [], left = this.left = null, right = this.right = null;
if (hasLeft) {
left = this.left = new DiffView(this, "left");
var leftPane = elt("div", null, "CodeMirror-merge-pane");
wrap.push(leftPane), wrap.push(buildGap(left));
}
var editPane = elt("div", null, "CodeMirror-merge-pane");
if (wrap.push(editPane), hasRight) {
right = this.right = new DiffView(this, "right"), wrap.push(buildGap(right));
var rightPane = elt("div", null, "CodeMirror-merge-pane");
wrap.push(rightPane);
}
(hasRight ? rightPane :editPane).className += " CodeMirror-merge-pane-rightmost", 
wrap.push(elt("div", null, null, "height: 0; clear: both;"));
var wrapElt = this.wrap = node.appendChild(elt("div", wrap, "CodeMirror-merge CodeMirror-merge-" + panes + "pane"));
this.edit = CodeMirror(editPane, copyObj(options)), left && left.init(leftPane, origLeft, options), 
right && right.init(rightPane, origRight, options);
var onResize = function() {
left && drawConnectors(left), right && drawConnectors(right);
};
CodeMirror.on(window, "resize", onResize);
var resizeInterval = setInterval(function() {
for (var p = wrapElt.parentNode; p && p != document.body; p = p.parentNode) ;
p || (clearInterval(resizeInterval), CodeMirror.off(window, "resize", onResize));
}, 5e3);
};
MergeView.prototype = {
constuctor:MergeView,
editor:function() {
return this.edit;
},
rightOriginal:function() {
return this.right && this.right.orig;
},
leftOriginal:function() {
return this.left && this.left.orig;
},
setShowDifferences:function(val) {
this.right && this.right.setShowDifferences(val), this.left && this.left.setShowDifferences(val);
},
rightChunks:function() {
return this.right && getChunks(this.right);
},
leftChunks:function() {
return this.left && getChunks(this.left);
}
};
var dmp = new diff_match_patch();
});