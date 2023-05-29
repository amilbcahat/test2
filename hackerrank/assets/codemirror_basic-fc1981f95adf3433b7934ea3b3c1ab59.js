window.CodeMirror = function() {
"use strict";
function CodeMirror(place, options) {
if (!(this instanceof CodeMirror)) return new CodeMirror(place, options);
this.options = options = options || {};
for (var opt in defaults) !options.hasOwnProperty(opt) && defaults.hasOwnProperty(opt) && (options[opt] = defaults[opt]);
setGuttersForLineNumbers(options);
var docStart = "string" == typeof options.value ? 0 :options.value.first, display = this.display = makeDisplay(place, docStart);
display.wrapper.CodeMirror = this, updateGutters(this), options.autofocus && !mobile && focusInput(this), 
this.state = {
keyMaps:[],
overlays:[],
modeGen:0,
overwrite:!1,
focused:!1,
suppressEdits:!1,
pasteIncoming:!1,
cutIncoming:!1,
draggingText:!1,
highlight:new Delayed()
}, themeChanged(this), options.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
var doc = options.value;
"string" == typeof doc && (doc = new Doc(options.value, options.mode)), operation(this, attachDoc)(this, doc), 
old_ie && setTimeout(bind(resetInput, this, !0), 20), registerEventHandlers(this);
var hasFocus;
try {
hasFocus = document.activeElement == display.input;
} catch (e) {}
hasFocus || options.autofocus && !mobile ? setTimeout(bind(onFocus, this), 20) :onBlur(this), 
operation(this, function() {
for (var opt in optionHandlers) optionHandlers.propertyIsEnumerable(opt) && optionHandlers[opt](this, options[opt], Init);
for (var i = 0; i < initHooks.length; ++i) initHooks[i](this);
})();
}
function makeDisplay(place, docStart) {
var d = {}, input = d.input = elt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
return webkit ? input.style.width = "1000px" :input.setAttribute("wrap", "off"), 
ios && (input.style.border = "1px solid black"), input.setAttribute("autocorrect", "off"), 
input.setAttribute("autocapitalize", "off"), input.setAttribute("spellcheck", "false"), 
d.inputDiv = elt("div", [ input ], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), 
d.scrollbarH = elt("div", [ elt("div", null, null, "height: 1px") ], "CodeMirror-hscrollbar"), 
d.scrollbarV = elt("div", [ elt("div", null, null, "width: 1px") ], "CodeMirror-vscrollbar"), 
d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler"), d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler"), 
d.lineDiv = elt("div", null, "CodeMirror-code"), d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1"), 
d.cursor = elt("div", "\xa0", "CodeMirror-cursor"), d.otherCursor = elt("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"), 
d.measure = elt("div", null, "CodeMirror-measure"), d.lineSpace = elt("div", [ d.measure, d.selectionDiv, d.lineDiv, d.cursor, d.otherCursor ], null, "position: relative; outline: none"), 
d.mover = elt("div", [ elt("div", [ d.lineSpace ], "CodeMirror-lines") ], null, "position: relative"), 
d.sizer = elt("div", [ d.mover ], "CodeMirror-sizer"), d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerCutOff + "px; width: 1px;"), 
d.gutters = elt("div", null, "CodeMirror-gutters"), d.lineGutter = null, d.scroller = elt("div", [ d.sizer, d.heightForcer, d.gutters ], "CodeMirror-scroll"), 
d.scroller.setAttribute("tabIndex", "-1"), d.wrapper = elt("div", [ d.inputDiv, d.scrollbarH, d.scrollbarV, d.scrollbarFiller, d.gutterFiller, d.scroller ], "CodeMirror"), 
ie_lt8 && (d.gutters.style.zIndex = -1, d.scroller.style.paddingRight = 0), place.appendChild ? place.appendChild(d.wrapper) :place(d.wrapper), 
ios && (input.style.width = "0px"), webkit || (d.scroller.draggable = !0), khtml ? (d.inputDiv.style.height = "1px", 
d.inputDiv.style.position = "absolute") :ie_lt8 && (d.scrollbarH.style.minWidth = d.scrollbarV.style.minWidth = "18px"), 
d.viewOffset = d.lastSizeC = 0, d.showingFrom = d.showingTo = docStart, d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null, 
d.prevInput = "", d.alignWidgets = !1, d.pollingFast = !1, d.poll = new Delayed(), 
d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null, d.measureLineCache = [], 
d.measureLineCachePos = 0, d.inaccurateSelection = !1, d.maxLine = null, d.maxLineLength = 0, 
d.maxLineChanged = !1, d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null, 
d;
}
function loadMode(cm) {
cm.doc.mode = CodeMirror.getMode(cm.options, cm.doc.modeOption), resetModeState(cm);
}
function resetModeState(cm) {
cm.doc.iter(function(line) {
line.stateAfter && (line.stateAfter = null), line.styles && (line.styles = null);
}), cm.doc.frontier = cm.doc.first, startWorker(cm, 100), cm.state.modeGen++, cm.curOp && regChange(cm);
}
function wrappingChanged(cm) {
cm.options.lineWrapping ? (cm.display.wrapper.className += " CodeMirror-wrap", cm.display.sizer.style.minWidth = "") :(cm.display.wrapper.className = cm.display.wrapper.className.replace(" CodeMirror-wrap", ""), 
computeMaxLength(cm)), estimateLineHeights(cm), regChange(cm), clearCaches(cm), 
setTimeout(function() {
updateScrollbars(cm);
}, 100);
}
function estimateHeight(cm) {
var th = textHeight(cm.display), wrapping = cm.options.lineWrapping, perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
return function(line) {
return lineIsHidden(cm.doc, line) ? 0 :wrapping ? (Math.ceil(line.text.length / perLine) || 1) * th :th;
};
}
function estimateLineHeights(cm) {
var doc = cm.doc, est = estimateHeight(cm);
doc.iter(function(line) {
var estHeight = est(line);
estHeight != line.height && updateLineHeight(line, estHeight);
});
}
function keyMapChanged(cm) {
var map = keyMap[cm.options.keyMap], style = map.style;
cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (style ? " cm-keymap-" + style :"");
}
function themeChanged(cm) {
cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), 
clearCaches(cm);
}
function guttersChanged(cm) {
updateGutters(cm), regChange(cm), setTimeout(function() {
alignHorizontally(cm);
}, 20);
}
function updateGutters(cm) {
var gutters = cm.display.gutters, specs = cm.options.gutters;
removeChildren(gutters);
for (var i = 0; i < specs.length; ++i) {
var gutterClass = specs[i], gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + gutterClass));
"CodeMirror-linenumbers" == gutterClass && (cm.display.lineGutter = gElt, gElt.style.width = (cm.display.lineNumWidth || 1) + "px");
}
gutters.style.display = i ? "" :"none";
}
function lineLength(doc, line) {
if (0 == line.height) return 0;
for (var merged, len = line.text.length, cur = line; merged = collapsedSpanAtStart(cur); ) {
var found = merged.find();
cur = getLine(doc, found.from.line), len += found.from.ch - found.to.ch;
}
for (cur = line; merged = collapsedSpanAtEnd(cur); ) {
var found = merged.find();
len -= cur.text.length - found.from.ch, cur = getLine(doc, found.to.line), len += cur.text.length - found.to.ch;
}
return len;
}
function computeMaxLength(cm) {
var d = cm.display, doc = cm.doc;
d.maxLine = getLine(doc, doc.first), d.maxLineLength = lineLength(doc, d.maxLine), 
d.maxLineChanged = !0, doc.iter(function(line) {
var len = lineLength(doc, line);
len > d.maxLineLength && (d.maxLineLength = len, d.maxLine = line);
});
}
function setGuttersForLineNumbers(options) {
var found = indexOf(options.gutters, "CodeMirror-linenumbers");
-1 == found && options.lineNumbers ? options.gutters = options.gutters.concat([ "CodeMirror-linenumbers" ]) :found > -1 && !options.lineNumbers && (options.gutters = options.gutters.slice(0), 
options.gutters.splice(found, 1));
}
function updateScrollbars(cm) {
var d = cm.display, docHeight = cm.doc.height, totalHeight = docHeight + paddingVert(d);
d.sizer.style.minHeight = d.heightForcer.style.top = totalHeight + "px", d.gutters.style.height = Math.max(totalHeight, d.scroller.clientHeight - scrollerCutOff) + "px";
var scrollHeight = Math.max(totalHeight, d.scroller.scrollHeight), needsH = d.scroller.scrollWidth > d.scroller.clientWidth + 1, needsV = scrollHeight > d.scroller.clientHeight + 1;
needsV ? (d.scrollbarV.style.display = "block", d.scrollbarV.style.bottom = needsH ? scrollbarWidth(d.measure) + "px" :"0", 
d.scrollbarV.firstChild.style.height = Math.max(0, scrollHeight - d.scroller.clientHeight + d.scrollbarV.clientHeight) + "px") :(d.scrollbarV.style.display = "", 
d.scrollbarV.firstChild.style.height = "0"), needsH ? (d.scrollbarH.style.display = "block", 
d.scrollbarH.style.right = needsV ? scrollbarWidth(d.measure) + "px" :"0", d.scrollbarH.firstChild.style.width = d.scroller.scrollWidth - d.scroller.clientWidth + d.scrollbarH.clientWidth + "px") :(d.scrollbarH.style.display = "", 
d.scrollbarH.firstChild.style.width = "0"), needsH && needsV ? (d.scrollbarFiller.style.display = "block", 
d.scrollbarFiller.style.height = d.scrollbarFiller.style.width = scrollbarWidth(d.measure) + "px") :d.scrollbarFiller.style.display = "", 
needsH && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter ? (d.gutterFiller.style.display = "block", 
d.gutterFiller.style.height = scrollbarWidth(d.measure) + "px", d.gutterFiller.style.width = d.gutters.offsetWidth + "px") :d.gutterFiller.style.display = "", 
mac_geLion && 0 === scrollbarWidth(d.measure) && (d.scrollbarV.style.minWidth = d.scrollbarH.style.minHeight = mac_geMountainLion ? "18px" :"12px", 
d.scrollbarV.style.pointerEvents = d.scrollbarH.style.pointerEvents = "none");
}
function visibleLines(display, doc, viewPort) {
var top = display.scroller.scrollTop, height = display.wrapper.clientHeight;
"number" == typeof viewPort ? top = viewPort :viewPort && (top = viewPort.top, height = viewPort.bottom - viewPort.top), 
top = Math.floor(top - paddingTop(display));
var bottom = Math.ceil(top + height);
return {
from:lineAtHeight(doc, top),
to:lineAtHeight(doc, bottom)
};
}
function alignHorizontally(cm) {
var display = cm.display;
if (display.alignWidgets || display.gutters.firstChild && cm.options.fixedGutter) {
for (var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft, gutterW = display.gutters.offsetWidth, l = comp + "px", n = display.lineDiv.firstChild; n; n = n.nextSibling) if (n.alignable) for (var i = 0, a = n.alignable; i < a.length; ++i) a[i].style.left = l;
cm.options.fixedGutter && (display.gutters.style.left = comp + gutterW + "px");
}
}
function maybeUpdateLineNumberWidth(cm) {
if (!cm.options.lineNumbers) return !1;
var doc = cm.doc, last = lineNumberFor(cm.options, doc.first + doc.size - 1), display = cm.display;
if (last.length != display.lineNumChars) {
var test = display.measure.appendChild(elt("div", [ elt("div", last) ], "CodeMirror-linenumber CodeMirror-gutter-elt")), innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
return display.lineGutter.style.width = "", display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding), 
display.lineNumWidth = display.lineNumInnerWidth + padding, display.lineNumChars = display.lineNumInnerWidth ? last.length :-1, 
display.lineGutter.style.width = display.lineNumWidth + "px", !0;
}
return !1;
}
function lineNumberFor(options, i) {
return String(options.lineNumberFormatter(i + options.firstLineNumber));
}
function compensateForHScroll(display) {
return getRect(display.scroller).left - getRect(display.sizer).left;
}
function updateDisplay(cm, changes, viewPort, forced) {
for (var updated, oldFrom = cm.display.showingFrom, oldTo = cm.display.showingTo, visible = visibleLines(cm.display, cm.doc, viewPort), first = !0; ;first = !1) {
var oldWidth = cm.display.scroller.clientWidth;
if (!updateDisplayInner(cm, changes, visible, forced)) break;
if (updated = !0, changes = [], updateSelection(cm), updateScrollbars(cm), first && cm.options.lineWrapping && oldWidth != cm.display.scroller.clientWidth) forced = !0; else if (forced = !1, 
viewPort && (viewPort = Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, "number" == typeof viewPort ? viewPort :viewPort.top)), 
visible = visibleLines(cm.display, cm.doc, viewPort), visible.from >= cm.display.showingFrom && visible.to <= cm.display.showingTo) break;
}
return updated && (signalLater(cm, "update", cm), (cm.display.showingFrom != oldFrom || cm.display.showingTo != oldTo) && signalLater(cm, "viewportChange", cm, cm.display.showingFrom, cm.display.showingTo)), 
updated;
}
function updateDisplayInner(cm, changes, visible, forced) {
var display = cm.display, doc = cm.doc;
if (!display.wrapper.offsetWidth) return display.showingFrom = display.showingTo = doc.first, 
display.viewOffset = 0, void 0;
if (!(!forced && 0 == changes.length && visible.from > display.showingFrom && visible.to < display.showingTo)) {
maybeUpdateLineNumberWidth(cm) && (changes = [ {
from:doc.first,
to:doc.first + doc.size
} ]);
var gutterW = display.sizer.style.marginLeft = display.gutters.offsetWidth + "px";
display.scrollbarH.style.left = cm.options.fixedGutter ? gutterW :"0";
var positionsChangedFrom = 1/0;
if (cm.options.lineNumbers) for (var i = 0; i < changes.length; ++i) changes[i].diff && changes[i].from < positionsChangedFrom && (positionsChangedFrom = changes[i].from);
var end = doc.first + doc.size, from = Math.max(visible.from - cm.options.viewportMargin, doc.first), to = Math.min(end, visible.to + cm.options.viewportMargin);
if (display.showingFrom < from && from - display.showingFrom < 20 && (from = Math.max(doc.first, display.showingFrom)), 
display.showingTo > to && display.showingTo - to < 20 && (to = Math.min(end, display.showingTo)), 
sawCollapsedSpans) for (from = lineNo(visualLine(doc, getLine(doc, from))); end > to && lineIsHidden(doc, getLine(doc, to)); ) ++to;
var intact = [ {
from:Math.max(display.showingFrom, doc.first),
to:Math.min(display.showingTo, end)
} ];
if (intact = intact[0].from >= intact[0].to ? [] :computeIntact(intact, changes), 
sawCollapsedSpans) for (var i = 0; i < intact.length; ++i) for (var merged, range = intact[i]; merged = collapsedSpanAtEnd(getLine(doc, range.to - 1)); ) {
var newTo = merged.find().from.line;
if (!(newTo > range.from)) {
intact.splice(i--, 1);
break;
}
range.to = newTo;
}
for (var intactLines = 0, i = 0; i < intact.length; ++i) {
var range = intact[i];
range.from < from && (range.from = from), range.to > to && (range.to = to), range.from >= range.to ? intact.splice(i--, 1) :intactLines += range.to - range.from;
}
if (!forced && intactLines == to - from && from == display.showingFrom && to == display.showingTo) return updateViewOffset(cm), 
void 0;
intact.sort(function(a, b) {
return a.from - b.from;
});
try {
var focused = document.activeElement;
} catch (e) {}
.7 * (to - from) > intactLines && (display.lineDiv.style.display = "none"), patchDisplay(cm, from, to, intact, positionsChangedFrom), 
display.lineDiv.style.display = "", focused && document.activeElement != focused && focused.offsetHeight && focused.focus();
var different = from != display.showingFrom || to != display.showingTo || display.lastSizeC != display.wrapper.clientHeight;
return different && (display.lastSizeC = display.wrapper.clientHeight, startWorker(cm, 400)), 
display.showingFrom = from, display.showingTo = to, display.gutters.style.height = "", 
updateHeightsInViewport(cm), updateViewOffset(cm), !0;
}
}
function updateHeightsInViewport(cm) {
for (var height, display = cm.display, prevBottom = display.lineDiv.offsetTop, node = display.lineDiv.firstChild; node; node = node.nextSibling) if (node.lineObj) {
if (ie_lt8) {
var bot = node.offsetTop + node.offsetHeight;
height = bot - prevBottom, prevBottom = bot;
} else {
var box = getRect(node);
height = box.bottom - box.top;
}
var diff = node.lineObj.height - height;
if (2 > height && (height = textHeight(display)), diff > .001 || -.001 > diff) {
updateLineHeight(node.lineObj, height);
var widgets = node.lineObj.widgets;
if (widgets) for (var i = 0; i < widgets.length; ++i) widgets[i].height = widgets[i].node.offsetHeight;
}
}
}
function updateViewOffset(cm) {
var off = cm.display.viewOffset = heightAtLine(cm, getLine(cm.doc, cm.display.showingFrom));
cm.display.mover.style.top = off + "px";
}
function computeIntact(intact, changes) {
for (var i = 0, l = changes.length || 0; l > i; ++i) {
for (var change = changes[i], intact2 = [], diff = change.diff || 0, j = 0, l2 = intact.length; l2 > j; ++j) {
var range = intact[j];
change.to <= range.from && change.diff ? intact2.push({
from:range.from + diff,
to:range.to + diff
}) :change.to <= range.from || change.from >= range.to ? intact2.push(range) :(change.from > range.from && intact2.push({
from:range.from,
to:change.from
}), change.to < range.to && intact2.push({
from:change.to + diff,
to:range.to + diff
}));
}
intact = intact2;
}
return intact;
}
function getDimensions(cm) {
for (var d = cm.display, left = {}, width = {}, n = d.gutters.firstChild, i = 0; n; n = n.nextSibling, 
++i) left[cm.options.gutters[i]] = n.offsetLeft, width[cm.options.gutters[i]] = n.offsetWidth;
return {
fixedPos:compensateForHScroll(d),
gutterTotalWidth:d.gutters.offsetWidth,
gutterLeft:left,
gutterWidth:width,
wrapperWidth:d.wrapper.clientWidth
};
}
function patchDisplay(cm, from, to, intact, updateNumbersFrom) {
function rm(node) {
var next = node.nextSibling;
return webkit && mac && cm.display.currentWheelTarget == node ? (node.style.display = "none", 
node.lineObj = null) :node.parentNode.removeChild(node), next;
}
var dims = getDimensions(cm), display = cm.display, lineNumbers = cm.options.lineNumbers;
intact.length || webkit && cm.display.currentWheelTarget || removeChildren(display.lineDiv);
var container = display.lineDiv, cur = container.firstChild, nextIntact = intact.shift(), lineN = from;
for (cm.doc.iter(from, to, function(line) {
if (nextIntact && nextIntact.to == lineN && (nextIntact = intact.shift()), lineIsHidden(cm.doc, line)) {
if (0 != line.height && updateLineHeight(line, 0), line.widgets && cur && cur.previousSibling) for (var i = 0; i < line.widgets.length; ++i) {
var w = line.widgets[i];
if (w.showIfHidden) {
var prev = cur.previousSibling;
if (/pre/i.test(prev.nodeName)) {
var wrap = elt("div", null, null, "position: relative");
prev.parentNode.replaceChild(wrap, prev), wrap.appendChild(prev), prev = wrap;
}
var wnode = prev.appendChild(elt("div", [ w.node ], "CodeMirror-linewidget"));
w.handleMouseEvents || (wnode.ignoreEvents = !0), positionLineWidget(w, wnode, prev, dims);
}
}
} else if (nextIntact && nextIntact.from <= lineN && nextIntact.to > lineN) {
for (;cur.lineObj != line; ) cur = rm(cur);
lineNumbers && lineN >= updateNumbersFrom && cur.lineNumber && setTextContent(cur.lineNumber, lineNumberFor(cm.options, lineN)), 
cur = cur.nextSibling;
} else {
if (line.widgets) for (var reuse, j = 0, search = cur; search && 20 > j; ++j, search = search.nextSibling) if (search.lineObj == line && /div/i.test(search.nodeName)) {
reuse = search;
break;
}
var lineNode = buildLineElement(cm, line, lineN, dims, reuse);
if (lineNode != reuse) container.insertBefore(lineNode, cur); else {
for (;cur != reuse; ) cur = rm(cur);
cur = cur.nextSibling;
}
lineNode.lineObj = line;
}
++lineN;
}); cur; ) cur = rm(cur);
}
function buildLineElement(cm, line, lineNo, dims, reuse) {
var wrap, built = buildLineContent(cm, line), lineElement = built.pre, markers = line.gutterMarkers, display = cm.display, bgClass = built.bgClass ? built.bgClass + " " + (line.bgClass || "") :line.bgClass;
if (!(cm.options.lineNumbers || markers || bgClass || line.wrapClass || line.widgets)) return lineElement;
if (reuse) {
reuse.alignable = null;
for (var next, isOk = !0, widgetsSeen = 0, insertBefore = null, n = reuse.firstChild; n; n = next) if (next = n.nextSibling, 
/\bCodeMirror-linewidget\b/.test(n.className)) {
for (var i = 0; i < line.widgets.length; ++i) {
var widget = line.widgets[i];
if (widget.node == n.firstChild) {
widget.above || insertBefore || (insertBefore = n), positionLineWidget(widget, n, reuse, dims), 
++widgetsSeen;
break;
}
}
if (i == line.widgets.length) {
isOk = !1;
break;
}
} else reuse.removeChild(n);
reuse.insertBefore(lineElement, insertBefore), isOk && widgetsSeen == line.widgets.length && (wrap = reuse, 
reuse.className = line.wrapClass || "");
}
if (wrap || (wrap = elt("div", null, line.wrapClass, "position: relative"), wrap.appendChild(lineElement)), 
bgClass && wrap.insertBefore(elt("div", null, bgClass + " CodeMirror-linebackground"), wrap.firstChild), 
cm.options.lineNumbers || markers) {
var gutterWrap = wrap.insertBefore(elt("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (cm.options.fixedGutter ? dims.fixedPos :-dims.gutterTotalWidth) + "px"), lineElement);
if (cm.options.fixedGutter && (wrap.alignable || (wrap.alignable = [])).push(gutterWrap), 
!cm.options.lineNumbers || markers && markers["CodeMirror-linenumbers"] || (wrap.lineNumber = gutterWrap.appendChild(elt("div", lineNumberFor(cm.options, lineNo), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + display.lineNumInnerWidth + "px"))), 
markers) for (var k = 0; k < cm.options.gutters.length; ++k) {
var id = cm.options.gutters[k], found = markers.hasOwnProperty(id) && markers[id];
found && gutterWrap.appendChild(elt("div", [ found ], "CodeMirror-gutter-elt", "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
}
}
if (ie_lt8 && (wrap.style.zIndex = 2), line.widgets && wrap != reuse) for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
var widget = ws[i], node = elt("div", [ widget.node ], "CodeMirror-linewidget");
widget.handleMouseEvents || (node.ignoreEvents = !0), positionLineWidget(widget, node, wrap, dims), 
widget.above ? wrap.insertBefore(node, cm.options.lineNumbers && 0 != line.height ? gutterWrap :lineElement) :wrap.appendChild(node), 
signalLater(widget, "redraw");
}
return wrap;
}
function positionLineWidget(widget, node, wrap, dims) {
if (widget.noHScroll) {
(wrap.alignable || (wrap.alignable = [])).push(node);
var width = dims.wrapperWidth;
node.style.left = dims.fixedPos + "px", widget.coverGutter || (width -= dims.gutterTotalWidth, 
node.style.paddingLeft = dims.gutterTotalWidth + "px"), node.style.width = width + "px";
}
widget.coverGutter && (node.style.zIndex = 5, node.style.position = "relative", 
widget.noHScroll || (node.style.marginLeft = -dims.gutterTotalWidth + "px"));
}
function updateSelection(cm) {
var display = cm.display, collapsed = posEq(cm.doc.sel.from, cm.doc.sel.to);
if (collapsed || cm.options.showCursorWhenSelecting ? updateSelectionCursor(cm) :display.cursor.style.display = display.otherCursor.style.display = "none", 
collapsed ? display.selectionDiv.style.display = "none" :updateSelectionRange(cm), 
cm.options.moveInputWithCursor) {
var headPos = cursorCoords(cm, cm.doc.sel.head, "div"), wrapOff = getRect(display.wrapper), lineOff = getRect(display.lineDiv);
display.inputDiv.style.top = Math.max(0, Math.min(display.wrapper.clientHeight - 10, headPos.top + lineOff.top - wrapOff.top)) + "px", 
display.inputDiv.style.left = Math.max(0, Math.min(display.wrapper.clientWidth - 10, headPos.left + lineOff.left - wrapOff.left)) + "px";
}
}
function updateSelectionCursor(cm) {
var display = cm.display, pos = cursorCoords(cm, cm.doc.sel.head, "div");
display.cursor.style.left = pos.left + "px", display.cursor.style.top = pos.top + "px", 
display.cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px", 
display.cursor.style.display = "", pos.other ? (display.otherCursor.style.display = "", 
display.otherCursor.style.left = pos.other.left + "px", display.otherCursor.style.top = pos.other.top + "px", 
display.otherCursor.style.height = .85 * (pos.other.bottom - pos.other.top) + "px") :display.otherCursor.style.display = "none";
}
function updateSelectionRange(cm) {
function add(left, top, width, bottom) {
0 > top && (top = 0), fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px; top: " + top + "px; width: " + (null == width ? rightSide - left :width) + "px; height: " + (bottom - top) + "px"));
}
function drawForLine(line, fromArg, toArg) {
function coords(ch, bias) {
return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
}
var start, end, lineObj = getLine(doc, line), lineLen = lineObj.text.length;
return iterateBidiSections(getOrder(lineObj), fromArg || 0, null == toArg ? lineLen :toArg, function(from, to, dir) {
var rightPos, left, right, leftPos = coords(from, "left");
if (from == to) rightPos = leftPos, left = right = leftPos.left; else {
if (rightPos = coords(to - 1, "right"), "rtl" == dir) {
var tmp = leftPos;
leftPos = rightPos, rightPos = tmp;
}
left = leftPos.left, right = rightPos.right;
}
null == fromArg && 0 == from && (left = leftSide), rightPos.top - leftPos.top > 3 && (add(left, leftPos.top, null, leftPos.bottom), 
left = leftSide, leftPos.bottom < rightPos.top && add(left, leftPos.bottom, null, rightPos.top)), 
null == toArg && to == lineLen && (right = rightSide), (!start || leftPos.top < start.top || leftPos.top == start.top && leftPos.left < start.left) && (start = leftPos), 
(!end || rightPos.bottom > end.bottom || rightPos.bottom == end.bottom && rightPos.right > end.right) && (end = rightPos), 
leftSide + 1 > left && (left = leftSide), add(left, rightPos.top, right - left, rightPos.bottom);
}), {
start:start,
end:end
};
}
var display = cm.display, doc = cm.doc, sel = cm.doc.sel, fragment = document.createDocumentFragment(), padding = paddingH(cm.display), leftSide = padding.left, rightSide = display.lineSpace.offsetWidth - padding.right;
if (sel.from.line == sel.to.line) drawForLine(sel.from.line, sel.from.ch, sel.to.ch); else {
var fromLine = getLine(doc, sel.from.line), toLine = getLine(doc, sel.to.line), singleVLine = visualLine(doc, fromLine) == visualLine(doc, toLine), leftEnd = drawForLine(sel.from.line, sel.from.ch, singleVLine ? fromLine.text.length :null).end, rightStart = drawForLine(sel.to.line, singleVLine ? 0 :null, sel.to.ch).start;
singleVLine && (leftEnd.top < rightStart.top - 2 ? (add(leftEnd.right, leftEnd.top, null, leftEnd.bottom), 
add(leftSide, rightStart.top, rightStart.left, rightStart.bottom)) :add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom)), 
leftEnd.bottom < rightStart.top && add(leftSide, leftEnd.bottom, null, rightStart.top);
}
removeChildrenAndAdd(display.selectionDiv, fragment), display.selectionDiv.style.display = "";
}
function restartBlink(cm) {
if (cm.state.focused) {
var display = cm.display;
clearInterval(display.blinker);
var on = !0;
display.cursor.style.visibility = display.otherCursor.style.visibility = "", cm.options.cursorBlinkRate > 0 && (display.blinker = setInterval(function() {
display.cursor.style.visibility = display.otherCursor.style.visibility = (on = !on) ? "" :"hidden";
}, cm.options.cursorBlinkRate));
}
}
function startWorker(cm, time) {
cm.doc.mode.startState && cm.doc.frontier < cm.display.showingTo && cm.state.highlight.set(time, bind(highlightWorker, cm));
}
function highlightWorker(cm) {
var doc = cm.doc;
if (doc.frontier < doc.first && (doc.frontier = doc.first), !(doc.frontier >= cm.display.showingTo)) {
var prevChange, end = +new Date() + cm.options.workTime, state = copyState(doc.mode, getStateBefore(cm, doc.frontier)), changed = [];
doc.iter(doc.frontier, Math.min(doc.first + doc.size, cm.display.showingTo + 500), function(line) {
if (doc.frontier >= cm.display.showingFrom) {
var oldStyles = line.styles;
line.styles = highlightLine(cm, line, state, !0);
for (var ischange = !oldStyles || oldStyles.length != line.styles.length, i = 0; !ischange && i < oldStyles.length; ++i) ischange = oldStyles[i] != line.styles[i];
ischange && (prevChange && prevChange.end == doc.frontier ? prevChange.end++ :changed.push(prevChange = {
start:doc.frontier,
end:doc.frontier + 1
})), line.stateAfter = copyState(doc.mode, state);
} else processLine(cm, line.text, state), line.stateAfter = doc.frontier % 5 == 0 ? copyState(doc.mode, state) :null;
return ++doc.frontier, +new Date() > end ? (startWorker(cm, cm.options.workDelay), 
!0) :void 0;
}), changed.length && operation(cm, function() {
for (var i = 0; i < changed.length; ++i) regChange(this, changed[i].start, changed[i].end);
})();
}
}
function findStartLine(cm, n, precise) {
for (var minindent, minline, doc = cm.doc, lim = precise ? -1 :n - (cm.doc.mode.innerMode ? 1e3 :100), search = n; search > lim; --search) {
if (search <= doc.first) return doc.first;
var line = getLine(doc, search - 1);
if (line.stateAfter && (!precise || search <= doc.frontier)) return search;
var indented = countColumn(line.text, null, cm.options.tabSize);
(null == minline || minindent > indented) && (minline = search - 1, minindent = indented);
}
return minline;
}
function getStateBefore(cm, n, precise) {
var doc = cm.doc, display = cm.display;
if (!doc.mode.startState) return !0;
var pos = findStartLine(cm, n, precise), state = pos > doc.first && getLine(doc, pos - 1).stateAfter;
return state = state ? copyState(doc.mode, state) :startState(doc.mode), doc.iter(pos, n, function(line) {
processLine(cm, line.text, state);
var save = pos == n - 1 || pos % 5 == 0 || pos >= display.showingFrom && pos < display.showingTo;
line.stateAfter = save ? copyState(doc.mode, state) :null, ++pos;
}), precise && (doc.frontier = pos), state;
}
function paddingTop(display) {
return display.lineSpace.offsetTop;
}
function paddingVert(display) {
return display.mover.offsetHeight - display.lineSpace.offsetHeight;
}
function paddingH(display) {
if (display.cachedPaddingH) return display.cachedPaddingH;
var e = removeChildrenAndAdd(display.measure, elt("pre", "x")), style = window.getComputedStyle ? window.getComputedStyle(e) :e.currentStyle;
return display.cachedPaddingH = {
left:parseInt(style.paddingLeft),
right:parseInt(style.paddingRight)
};
}
function measureChar(cm, line, ch, data, bias) {
var dir = -1;
if (data = data || measureLine(cm, line), data.crude) {
var left = data.left + ch * data.width;
return {
left:left,
right:left + data.width,
top:data.top,
bottom:data.bottom
};
}
for (var pos = ch; ;pos += dir) {
var r = data[pos];
if (r) break;
0 > dir && 0 == pos && (dir = 1);
}
return bias = pos > ch ? "left" :ch > pos ? "right" :bias, "left" == bias && r.leftSide ? r = r.leftSide :"right" == bias && r.rightSide && (r = r.rightSide), 
{
left:ch > pos ? r.right :r.left,
right:pos > ch ? r.left :r.right,
top:r.top,
bottom:r.bottom
};
}
function findCachedMeasurement(cm, line) {
for (var cache = cm.display.measureLineCache, i = 0; i < cache.length; ++i) {
var memo = cache[i];
if (memo.text == line.text && memo.markedSpans == line.markedSpans && cm.display.scroller.clientWidth == memo.width && memo.classes == line.textClass + "|" + line.wrapClass) return memo;
}
}
function clearCachedMeasurement(cm, line) {
var exists = findCachedMeasurement(cm, line);
exists && (exists.text = exists.measure = exists.markedSpans = null);
}
function measureLine(cm, line) {
var cached = findCachedMeasurement(cm, line);
if (cached) return cached.measure;
var measure = measureLineInner(cm, line), cache = cm.display.measureLineCache, memo = {
text:line.text,
width:cm.display.scroller.clientWidth,
markedSpans:line.markedSpans,
measure:measure,
classes:line.textClass + "|" + line.wrapClass
};
return 16 == cache.length ? cache[++cm.display.measureLineCachePos % 16] = memo :cache.push(memo), 
measure;
}
function measureLineInner(cm, line) {
function measureRect(rect) {
var top = rect.top - outer.top, bot = rect.bottom - outer.top;
bot > maxBot && (bot = maxBot), 0 > top && (top = 0);
for (var i = vranges.length - 2; i >= 0; i -= 2) {
var rtop = vranges[i], rbot = vranges[i + 1];
if (!(rtop > bot || top > rbot) && (top >= rtop && rbot >= bot || rtop >= top && bot >= rbot || Math.min(bot, rbot) - Math.max(top, rtop) >= bot - top >> 1)) {
vranges[i] = Math.min(top, rtop), vranges[i + 1] = Math.max(bot, rbot);
break;
}
}
return 0 > i && (i = vranges.length, vranges.push(top, bot)), {
left:rect.left - outer.left,
right:rect.right - outer.left,
top:i,
bottom:null
};
}
function finishRect(rect) {
rect.bottom = vranges[rect.top + 1], rect.top = vranges[rect.top];
}
if (!cm.options.lineWrapping && line.text.length >= cm.options.crudeMeasuringFrom) return crudelyMeasureLine(cm, line);
var display = cm.display, measure = emptyArray(line.text.length), pre = buildLineContent(cm, line, measure, !0).pre;
if (old_ie && !ie_lt8 && !cm.options.lineWrapping && pre.childNodes.length > 100) {
for (var fragment = document.createDocumentFragment(), chunk = 10, n = pre.childNodes.length, i = 0, chunks = Math.ceil(n / chunk); chunks > i; ++i) {
for (var wrap = elt("div", null, null, "display: inline-block"), j = 0; chunk > j && n; ++j) wrap.appendChild(pre.firstChild), 
--n;
fragment.appendChild(wrap);
}
pre.appendChild(fragment);
}
removeChildrenAndAdd(display.measure, pre);
var outer = getRect(display.lineDiv), vranges = [], data = emptyArray(line.text.length), maxBot = pre.offsetHeight;
ie_lt9 && display.measure.first != pre && removeChildrenAndAdd(display.measure, pre);
for (var cur, i = 0; i < measure.length; ++i) if (cur = measure[i]) {
var node = cur, rect = null;
if (/\bCodeMirror-widget\b/.test(cur.className) && cur.getClientRects) {
1 == cur.firstChild.nodeType && (node = cur.firstChild);
var rects = node.getClientRects();
rects.length > 1 && (rect = data[i] = measureRect(rects[0]), rect.rightSide = measureRect(rects[rects.length - 1]));
}
rect || (rect = data[i] = measureRect(getRect(node))), cur.measureRight && (rect.right = getRect(cur.measureRight).left - outer.left), 
cur.leftSide && (rect.leftSide = measureRect(getRect(cur.leftSide)));
}
removeChildren(cm.display.measure);
for (var cur, i = 0; i < data.length; ++i) (cur = data[i]) && (finishRect(cur), 
cur.leftSide && finishRect(cur.leftSide), cur.rightSide && finishRect(cur.rightSide));
return data;
}
function crudelyMeasureLine(cm, line) {
var copy = new Line(line.text.slice(0, 100), null);
line.textClass && (copy.textClass = line.textClass);
var measure = measureLineInner(cm, copy), left = measureChar(cm, copy, 0, measure, "left"), right = measureChar(cm, copy, 99, measure, "right");
return {
crude:!0,
top:left.top,
left:left.left,
bottom:left.bottom,
width:(right.right - left.left) / 100
};
}
function measureLineWidth(cm, line) {
var hasBadSpan = !1;
if (line.markedSpans) for (var i = 0; i < line.markedSpans; ++i) {
var sp = line.markedSpans[i];
!sp.collapsed || null != sp.to && sp.to != line.text.length || (hasBadSpan = !0);
}
var cached = !hasBadSpan && findCachedMeasurement(cm, line);
if (cached || line.text.length >= cm.options.crudeMeasuringFrom) return measureChar(cm, line, line.text.length, cached && cached.measure, "right").right;
var pre = buildLineContent(cm, line, null, !0).pre, end = pre.appendChild(zeroWidthElement(cm.display.measure));
return removeChildrenAndAdd(cm.display.measure, pre), getRect(end).right - getRect(cm.display.lineDiv).left;
}
function clearCaches(cm) {
cm.display.measureLineCache.length = cm.display.measureLineCachePos = 0, cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null, 
cm.options.lineWrapping || (cm.display.maxLineChanged = !0), cm.display.lineNumChars = null;
}
function pageScrollX() {
return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
}
function pageScrollY() {
return window.pageYOffset || (document.documentElement || document.body).scrollTop;
}
function intoCoordSystem(cm, lineObj, rect, context) {
if (lineObj.widgets) for (var i = 0; i < lineObj.widgets.length; ++i) if (lineObj.widgets[i].above) {
var size = widgetHeight(lineObj.widgets[i]);
rect.top += size, rect.bottom += size;
}
if ("line" == context) return rect;
context || (context = "local");
var yOff = heightAtLine(cm, lineObj);
if ("local" == context ? yOff += paddingTop(cm.display) :yOff -= cm.display.viewOffset, 
"page" == context || "window" == context) {
var lOff = getRect(cm.display.lineSpace);
yOff += lOff.top + ("window" == context ? 0 :pageScrollY());
var xOff = lOff.left + ("window" == context ? 0 :pageScrollX());
rect.left += xOff, rect.right += xOff;
}
return rect.top += yOff, rect.bottom += yOff, rect;
}
function fromCoordSystem(cm, coords, context) {
if ("div" == context) return coords;
var left = coords.left, top = coords.top;
if ("page" == context) left -= pageScrollX(), top -= pageScrollY(); else if ("local" == context || !context) {
var localBox = getRect(cm.display.sizer);
left += localBox.left, top += localBox.top;
}
var lineSpaceBox = getRect(cm.display.lineSpace);
return {
left:left - lineSpaceBox.left,
top:top - lineSpaceBox.top
};
}
function charCoords(cm, pos, context, lineObj, bias) {
return lineObj || (lineObj = getLine(cm.doc, pos.line)), intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, null, bias), context);
}
function cursorCoords(cm, pos, context, lineObj, measurement) {
function get(ch, right) {
var m = measureChar(cm, lineObj, ch, measurement, right ? "right" :"left");
return right ? m.left = m.right :m.right = m.left, intoCoordSystem(cm, lineObj, m, context);
}
function getBidi(ch, partPos) {
var part = order[partPos], right = part.level % 2;
return ch == bidiLeft(part) && partPos && part.level < order[partPos - 1].level ? (part = order[--partPos], 
ch = bidiRight(part) - (part.level % 2 ? 0 :1), right = !0) :ch == bidiRight(part) && partPos < order.length - 1 && part.level < order[partPos + 1].level && (part = order[++partPos], 
ch = bidiLeft(part) - part.level % 2, right = !1), right && ch == part.to && ch > part.from ? get(ch - 1) :get(ch, right);
}
lineObj = lineObj || getLine(cm.doc, pos.line), measurement || (measurement = measureLine(cm, lineObj));
var order = getOrder(lineObj), ch = pos.ch;
if (!order) return get(ch);
var partPos = getBidiPartAt(order, ch), val = getBidi(ch, partPos);
return null != bidiOther && (val.other = getBidi(ch, bidiOther)), val;
}
function PosWithInfo(line, ch, outside, xRel) {
var pos = new Pos(line, ch);
return pos.xRel = xRel, outside && (pos.outside = !0), pos;
}
function coordsChar(cm, x, y) {
var doc = cm.doc;
if (y += cm.display.viewOffset, 0 > y) return PosWithInfo(doc.first, 0, !0, -1);
var lineNo = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
if (lineNo > last) return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, !0, 1);
for (0 > x && (x = 0); ;) {
var lineObj = getLine(doc, lineNo), found = coordsCharInner(cm, lineObj, lineNo, x, y), merged = collapsedSpanAtEnd(lineObj), mergedPos = merged && merged.find();
if (!merged || !(found.ch > mergedPos.from.ch || found.ch == mergedPos.from.ch && found.xRel > 0)) return found;
lineNo = mergedPos.to.line;
}
}
function coordsCharInner(cm, lineObj, lineNo, x, y) {
function getX(ch) {
var sp = cursorCoords(cm, Pos(lineNo, ch), "line", lineObj, measurement);
return wrongLine = !0, innerOff > sp.bottom ? sp.left - adjust :innerOff < sp.top ? sp.left + adjust :(wrongLine = !1, 
sp.left);
}
var innerOff = y - heightAtLine(cm, lineObj), wrongLine = !1, adjust = 2 * cm.display.wrapper.clientWidth, measurement = measureLine(cm, lineObj), bidi = getOrder(lineObj), dist = lineObj.text.length, from = lineLeft(lineObj), to = lineRight(lineObj), fromX = getX(from), fromOutside = wrongLine, toX = getX(to), toOutside = wrongLine;
if (x > toX) return PosWithInfo(lineNo, to, toOutside, 1);
for (;;) {
if (bidi ? to == from || to == moveVisually(lineObj, from, 1) :1 >= to - from) {
for (var ch = fromX > x || toX - x >= x - fromX ? from :to, xDiff = x - (ch == from ? fromX :toX); isExtendingChar(lineObj.text.charAt(ch)); ) ++ch;
var pos = PosWithInfo(lineNo, ch, ch == from ? fromOutside :toOutside, 0 > xDiff ? -1 :xDiff ? 1 :0);
return pos;
}
var step = Math.ceil(dist / 2), middle = from + step;
if (bidi) {
middle = from;
for (var i = 0; step > i; ++i) middle = moveVisually(lineObj, middle, 1);
}
var middleX = getX(middle);
middleX > x ? (to = middle, toX = middleX, (toOutside = wrongLine) && (toX += 1e3), 
dist = step) :(from = middle, fromX = middleX, fromOutside = wrongLine, dist -= step);
}
}
function textHeight(display) {
if (null != display.cachedTextHeight) return display.cachedTextHeight;
if (null == measureText) {
measureText = elt("pre");
for (var i = 0; 49 > i; ++i) measureText.appendChild(document.createTextNode("x")), 
measureText.appendChild(elt("br"));
measureText.appendChild(document.createTextNode("x"));
}
removeChildrenAndAdd(display.measure, measureText);
var height = measureText.offsetHeight / 50;
return height > 3 && (display.cachedTextHeight = height), removeChildren(display.measure), 
height || 1;
}
function charWidth(display) {
if (null != display.cachedCharWidth) return display.cachedCharWidth;
var anchor = elt("span", "x"), pre = elt("pre", [ anchor ]);
removeChildrenAndAdd(display.measure, pre);
var width = anchor.offsetWidth;
return width > 2 && (display.cachedCharWidth = width), width || 10;
}
function startOperation(cm) {
cm.curOp = {
changes:[],
forceUpdate:!1,
updateInput:null,
userSelChange:null,
textChanged:null,
selectionChanged:!1,
cursorActivity:!1,
updateMaxLine:!1,
updateScrollPos:!1,
id:++nextOpId
}, delayedCallbackDepth++ || (delayedCallbacks = []);
}
function endOperation(cm) {
var op = cm.curOp, doc = cm.doc, display = cm.display;
if (cm.curOp = null, op.updateMaxLine && computeMaxLength(cm), display.maxLineChanged && !cm.options.lineWrapping && display.maxLine) {
var width = measureLineWidth(cm, display.maxLine);
display.sizer.style.minWidth = Math.max(0, width + 3) + "px", display.maxLineChanged = !1;
var maxScrollLeft = Math.max(0, display.sizer.offsetLeft + display.sizer.offsetWidth - display.scroller.clientWidth);
maxScrollLeft < doc.scrollLeft && !op.updateScrollPos && setScrollLeft(cm, Math.min(display.scroller.scrollLeft, maxScrollLeft), !0);
}
var newScrollPos, updated;
if (op.updateScrollPos) newScrollPos = op.updateScrollPos; else if (op.selectionChanged && display.scroller.clientHeight) {
var coords = cursorCoords(cm, doc.sel.head);
newScrollPos = calculateScrollPos(cm, coords.left, coords.top, coords.left, coords.bottom);
}
if ((op.changes.length || op.forceUpdate || newScrollPos && null != newScrollPos.scrollTop) && (updated = updateDisplay(cm, op.changes, newScrollPos && newScrollPos.scrollTop, op.forceUpdate), 
cm.display.scroller.offsetHeight && (cm.doc.scrollTop = cm.display.scroller.scrollTop)), 
!updated && op.selectionChanged && updateSelection(cm), op.updateScrollPos) {
var top = Math.max(0, Math.min(display.scroller.scrollHeight - display.scroller.clientHeight, newScrollPos.scrollTop)), left = Math.max(0, Math.min(display.scroller.scrollWidth - display.scroller.clientWidth, newScrollPos.scrollLeft));
display.scroller.scrollTop = display.scrollbarV.scrollTop = doc.scrollTop = top, 
display.scroller.scrollLeft = display.scrollbarH.scrollLeft = doc.scrollLeft = left, 
alignHorizontally(cm), op.scrollToPos && scrollPosIntoView(cm, clipPos(cm.doc, op.scrollToPos.from), clipPos(cm.doc, op.scrollToPos.to), op.scrollToPos.margin);
} else newScrollPos && scrollCursorIntoView(cm);
op.selectionChanged && restartBlink(cm), cm.state.focused && op.updateInput && resetInput(cm, op.userSelChange);
var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
if (hidden) for (var i = 0; i < hidden.length; ++i) hidden[i].lines.length || signal(hidden[i], "hide");
if (unhidden) for (var i = 0; i < unhidden.length; ++i) unhidden[i].lines.length && signal(unhidden[i], "unhide");
var delayed;
if (--delayedCallbackDepth || (delayed = delayedCallbacks, delayedCallbacks = null), 
op.textChanged && signal(cm, "change", cm, op.textChanged), op.cursorActivity && signal(cm, "cursorActivity", cm), 
delayed) for (var i = 0; i < delayed.length; ++i) delayed[i]();
}
function operation(cm1, f) {
return function() {
var cm = cm1 || this, withOp = !cm.curOp;
withOp && startOperation(cm);
try {
var result = f.apply(cm, arguments);
} finally {
withOp && endOperation(cm);
}
return result;
};
}
function docOperation(f) {
return function() {
var result, withOp = this.cm && !this.cm.curOp;
withOp && startOperation(this.cm);
try {
result = f.apply(this, arguments);
} finally {
withOp && endOperation(this.cm);
}
return result;
};
}
function runInOp(cm, f) {
var result, withOp = !cm.curOp;
withOp && startOperation(cm);
try {
result = f();
} finally {
withOp && endOperation(cm);
}
return result;
}
function regChange(cm, from, to, lendiff) {
null == from && (from = cm.doc.first), null == to && (to = cm.doc.first + cm.doc.size), 
cm.curOp.changes.push({
from:from,
to:to,
diff:lendiff
});
}
function slowPoll(cm) {
cm.display.pollingFast || cm.display.poll.set(cm.options.pollInterval, function() {
readInput(cm), cm.state.focused && slowPoll(cm);
});
}
function fastPoll(cm) {
function p() {
var changed = readInput(cm);
changed || missed ? (cm.display.pollingFast = !1, slowPoll(cm)) :(missed = !0, cm.display.poll.set(60, p));
}
var missed = !1;
cm.display.pollingFast = !0, cm.display.poll.set(20, p);
}
function readInput(cm) {
var input = cm.display.input, prevInput = cm.display.prevInput, doc = cm.doc, sel = doc.sel;
if (!cm.state.focused || hasSelection(input) || isReadOnly(cm) || cm.options.disableInput) return !1;
cm.state.pasteIncoming && cm.state.fakedLastChar && (input.value = input.value.substring(0, input.value.length - 1), 
cm.state.fakedLastChar = !1);
var text = input.value;
if (text == prevInput && posEq(sel.from, sel.to)) return !1;
if (ie && !ie_lt9 && cm.display.inputHasSelection === text) return resetInput(cm, !0), 
!1;
var withOp = !cm.curOp;
withOp && startOperation(cm), sel.shift = !1;
for (var same = 0, l = Math.min(prevInput.length, text.length); l > same && prevInput.charCodeAt(same) == text.charCodeAt(same); ) ++same;
var from = sel.from, to = sel.to, inserted = text.slice(same);
same < prevInput.length ? from = Pos(from.line, from.ch - (prevInput.length - same)) :cm.state.overwrite && posEq(from, to) && !cm.state.pasteIncoming && (to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + inserted.length)));
var updateInput = cm.curOp.updateInput, changeEvent = {
from:from,
to:to,
text:splitLines(inserted),
origin:cm.state.pasteIncoming ? "paste" :cm.state.cutIncoming ? "cut" :"+input"
};
if (makeChange(cm.doc, changeEvent, "end"), cm.curOp.updateInput = updateInput, 
signalLater(cm, "inputRead", cm, changeEvent), inserted && !cm.state.pasteIncoming && cm.options.electricChars && cm.options.smartIndent && sel.head.ch < 100) {
var electric = cm.getModeAt(sel.head).electricChars;
if (electric) for (var i = 0; i < electric.length; i++) if (inserted.indexOf(electric.charAt(i)) > -1) {
indentLine(cm, sel.head.line, "smart");
break;
}
}
return text.length > 1e3 || text.indexOf("\n") > -1 ? input.value = cm.display.prevInput = "" :cm.display.prevInput = text, 
withOp && endOperation(cm), cm.state.pasteIncoming = cm.state.cutIncoming = !1, 
!0;
}
function resetInput(cm, user) {
var minimal, selected, doc = cm.doc;
if (posEq(doc.sel.from, doc.sel.to)) user && (cm.display.prevInput = cm.display.input.value = "", 
ie && !ie_lt9 && (cm.display.inputHasSelection = null)); else {
cm.display.prevInput = "", minimal = hasCopyEvent && (doc.sel.to.line - doc.sel.from.line > 100 || (selected = cm.getSelection()).length > 1e3);
var content = minimal ? "-" :selected || cm.getSelection();
cm.display.input.value = content, cm.state.focused && selectInput(cm.display.input), 
ie && !ie_lt9 && (cm.display.inputHasSelection = content);
}
cm.display.inaccurateSelection = minimal;
}
function focusInput(cm) {
"nocursor" == cm.options.readOnly || mobile && document.activeElement == cm.display.input || cm.display.input.focus();
}
function ensureFocus(cm) {
cm.state.focused || (focusInput(cm), onFocus(cm));
}
function isReadOnly(cm) {
return cm.options.readOnly || cm.doc.cantEdit;
}
function registerEventHandlers(cm) {
function reFocus() {
cm.state.focused && setTimeout(bind(focusInput, cm), 0);
}
function onResize() {
null == resizeTimer && (resizeTimer = setTimeout(function() {
resizeTimer = null, d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = knownScrollbarWidth = null, 
clearCaches(cm), runInOp(cm, bind(regChange, cm));
}, 100));
}
function unregister() {
for (var p = d.wrapper.parentNode; p && p != document.body; p = p.parentNode) ;
p ? setTimeout(unregister, 5e3) :off(window, "resize", onResize);
}
function drag_(e) {
signalDOMEvent(cm, e) || cm.options.onDragEvent && cm.options.onDragEvent(cm, addStop(e)) || e_stop(e);
}
function prepareCopy(e) {
d.inaccurateSelection && (d.prevInput = "", d.inaccurateSelection = !1, d.input.value = cm.getSelection(), 
selectInput(d.input)), "cut" == e.type && (cm.state.cutIncoming = !0);
}
var d = cm.display;
on(d.scroller, "mousedown", operation(cm, onMouseDown)), old_ie ? on(d.scroller, "dblclick", operation(cm, function(e) {
if (!signalDOMEvent(cm, e)) {
var pos = posFromMouse(cm, e);
if (pos && !clickInGutter(cm, e) && !eventInWidget(cm.display, e)) {
e_preventDefault(e);
var word = findWordAt(getLine(cm.doc, pos.line).text, pos);
extendSelection(cm.doc, word.from, word.to);
}
}
})) :on(d.scroller, "dblclick", function(e) {
signalDOMEvent(cm, e) || e_preventDefault(e);
}), on(d.lineSpace, "selectstart", function(e) {
eventInWidget(d, e) || e_preventDefault(e);
}), captureMiddleClick || on(d.scroller, "contextmenu", function(e) {
onContextMenu(cm, e);
}), on(d.scroller, "scroll", function() {
d.scroller.clientHeight && (setScrollTop(cm, d.scroller.scrollTop), setScrollLeft(cm, d.scroller.scrollLeft, !0), 
signal(cm, "scroll", cm));
}), on(d.scrollbarV, "scroll", function() {
d.scroller.clientHeight && setScrollTop(cm, d.scrollbarV.scrollTop);
}), on(d.scrollbarH, "scroll", function() {
d.scroller.clientHeight && setScrollLeft(cm, d.scrollbarH.scrollLeft);
}), on(d.scroller, "mousewheel", function(e) {
onScrollWheel(cm, e);
}), on(d.scroller, "DOMMouseScroll", function(e) {
onScrollWheel(cm, e);
}), on(d.scrollbarH, "mousedown", reFocus), on(d.scrollbarV, "mousedown", reFocus), 
on(d.wrapper, "scroll", function() {
d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
});
var resizeTimer;
on(window, "resize", onResize), setTimeout(unregister, 5e3), on(d.input, "keyup", operation(cm, onKeyUp)), 
on(d.input, "input", function() {
ie && !ie_lt9 && cm.display.inputHasSelection && (cm.display.inputHasSelection = null), 
fastPoll(cm);
}), on(d.input, "keydown", operation(cm, onKeyDown)), on(d.input, "keypress", operation(cm, onKeyPress)), 
on(d.input, "focus", bind(onFocus, cm)), on(d.input, "blur", bind(onBlur, cm)), 
cm.options.dragDrop && (on(d.scroller, "dragstart", function(e) {
onDragStart(cm, e);
}), on(d.scroller, "dragenter", drag_), on(d.scroller, "dragover", drag_), on(d.scroller, "drop", operation(cm, onDrop))), 
on(d.scroller, "paste", function(e) {
eventInWidget(d, e) || (focusInput(cm), fastPoll(cm));
}), on(d.input, "paste", function() {
if (webkit && !cm.state.fakedLastChar && !(new Date() - cm.state.lastMiddleDown < 200)) {
var start = d.input.selectionStart, end = d.input.selectionEnd;
d.input.value += "$", d.input.selectionStart = start, d.input.selectionEnd = end, 
cm.state.fakedLastChar = !0;
}
cm.state.pasteIncoming = !0, fastPoll(cm);
}), on(d.input, "cut", prepareCopy), on(d.input, "copy", prepareCopy), khtml && on(d.sizer, "mouseup", function() {
document.activeElement == d.input && d.input.blur(), focusInput(cm);
});
}
function eventInWidget(display, e) {
for (var n = e_target(e); n != display.wrapper; n = n.parentNode) if (!n || n.ignoreEvents || n.parentNode == display.sizer && n != display.mover) return !0;
}
function posFromMouse(cm, e, liberal) {
var display = cm.display;
if (!liberal) {
var target = e_target(e);
if (target == display.scrollbarH || target == display.scrollbarH.firstChild || target == display.scrollbarV || target == display.scrollbarV.firstChild || target == display.scrollbarFiller || target == display.gutterFiller) return null;
}
var x, y, space = getRect(display.lineSpace);
try {
x = e.clientX, y = e.clientY;
} catch (e) {
return null;
}
return coordsChar(cm, x - space.left, y - space.top);
}
function onMouseDown(e) {
function doSelect(cur) {
if (!posEq(lastPos, cur)) {
if (lastPos = cur, "single" == type) return extendSelection(cm.doc, clipPos(doc, start), cur), 
void 0;
if (startstart = clipPos(doc, startstart), startend = clipPos(doc, startend), "double" == type) {
var word = findWordAt(getLine(doc, cur.line).text, cur);
posLess(cur, startstart) ? extendSelection(cm.doc, word.from, startend) :extendSelection(cm.doc, startstart, word.to);
} else "triple" == type && (posLess(cur, startstart) ? extendSelection(cm.doc, startend, clipPos(doc, Pos(cur.line, 0))) :extendSelection(cm.doc, startstart, clipPos(doc, Pos(cur.line + 1, 0))));
}
}
function extend(e) {
var curCount = ++counter, cur = posFromMouse(cm, e, !0);
if (cur) if (posEq(cur, last)) {
var outside = e.clientY < editorSize.top ? -20 :e.clientY > editorSize.bottom ? 20 :0;
outside && setTimeout(operation(cm, function() {
counter == curCount && (display.scroller.scrollTop += outside, extend(e));
}), 50);
} else {
ensureFocus(cm), last = cur, doSelect(cur);
var visible = visibleLines(display, doc);
(cur.line >= visible.to || cur.line < visible.from) && setTimeout(operation(cm, function() {
counter == curCount && extend(e);
}), 150);
}
}
function done(e) {
counter = 1/0, e_preventDefault(e), focusInput(cm), off(document, "mousemove", move), 
off(document, "mouseup", up);
}
if (!signalDOMEvent(this, e)) {
var cm = this, display = cm.display, doc = cm.doc, sel = doc.sel;
if (sel.shift = e.shiftKey, eventInWidget(display, e)) return webkit || (display.scroller.draggable = !1, 
setTimeout(function() {
display.scroller.draggable = !0;
}, 100)), void 0;
if (!clickInGutter(cm, e)) {
var start = posFromMouse(cm, e);
switch (window.focus(), e_button(e)) {
case 3:
return captureMiddleClick && onContextMenu.call(cm, cm, e), void 0;

case 2:
return webkit && (cm.state.lastMiddleDown = +new Date()), start && extendSelection(cm.doc, start), 
setTimeout(bind(focusInput, cm), 20), e_preventDefault(e), void 0;
}
if (!start) return e_target(e) == display.scroller && e_preventDefault(e), void 0;
setTimeout(bind(ensureFocus, cm), 0);
var now = +new Date(), type = "single";
if (lastDoubleClick && lastDoubleClick.time > now - 400 && posEq(lastDoubleClick.pos, start)) type = "triple", 
e_preventDefault(e), setTimeout(bind(focusInput, cm), 20), selectLine(cm, start.line); else if (lastClick && lastClick.time > now - 400 && posEq(lastClick.pos, start)) {
type = "double", lastDoubleClick = {
time:now,
pos:start
}, e_preventDefault(e);
var word = findWordAt(getLine(doc, start.line).text, start);
extendSelection(cm.doc, word.from, word.to);
} else lastClick = {
time:now,
pos:start
};
var last = start;
if (cm.options.dragDrop && dragAndDrop && !isReadOnly(cm) && !posEq(sel.from, sel.to) && !posLess(start, sel.from) && !posLess(sel.to, start) && "single" == type) {
var dragEnd = operation(cm, function(e2) {
webkit && (display.scroller.draggable = !1), cm.state.draggingText = !1, off(document, "mouseup", dragEnd), 
off(display.scroller, "drop", dragEnd), Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10 && (e_preventDefault(e2), 
extendSelection(cm.doc, start), focusInput(cm), old_ie && !ie_lt9 && setTimeout(function() {
document.body.focus(), focusInput(cm);
}, 20));
});
return webkit && (display.scroller.draggable = !0), cm.state.draggingText = dragEnd, 
display.scroller.dragDrop && display.scroller.dragDrop(), on(document, "mouseup", dragEnd), 
on(display.scroller, "drop", dragEnd), void 0;
}
e_preventDefault(e), "single" == type && extendSelection(cm.doc, clipPos(doc, start));
var startstart = sel.from, startend = sel.to, lastPos = start, editorSize = getRect(display.wrapper), counter = 0, move = operation(cm, function(e) {
(ie && !ie_lt10 ? e.buttons :e_button(e)) ? extend(e) :done(e);
}), up = operation(cm, done);
on(document, "mousemove", move), on(document, "mouseup", up);
}
}
}
function gutterEvent(cm, e, type, prevent, signalfn) {
try {
var mX = e.clientX, mY = e.clientY;
} catch (e) {
return !1;
}
if (mX >= Math.floor(getRect(cm.display.gutters).right)) return !1;
prevent && e_preventDefault(e);
var display = cm.display, lineBox = getRect(display.lineDiv);
if (mY > lineBox.bottom || !hasHandler(cm, type)) return e_defaultPrevented(e);
mY -= lineBox.top - display.viewOffset;
for (var i = 0; i < cm.options.gutters.length; ++i) {
var g = display.gutters.childNodes[i];
if (g && getRect(g).right >= mX) {
var line = lineAtHeight(cm.doc, mY), gutter = cm.options.gutters[i];
return signalfn(cm, type, cm, line, gutter, e), e_defaultPrevented(e);
}
}
}
function contextMenuInGutter(cm, e) {
return hasHandler(cm, "gutterContextMenu") ? gutterEvent(cm, e, "gutterContextMenu", !1, signal) :!1;
}
function clickInGutter(cm, e) {
return gutterEvent(cm, e, "gutterClick", !0, signalLater);
}
function onDrop(e) {
var cm = this;
if (!(signalDOMEvent(cm, e) || eventInWidget(cm.display, e) || cm.options.onDragEvent && cm.options.onDragEvent(cm, addStop(e)))) {
e_preventDefault(e), ie && (lastDrop = +new Date());
var pos = posFromMouse(cm, e, !0), files = e.dataTransfer.files;
if (pos && !isReadOnly(cm)) if (files && files.length && window.FileReader && window.File) for (var n = files.length, text = Array(n), read = 0, loadFile = function(file, i) {
var reader = new FileReader();
reader.onload = function() {
text[i] = reader.result, ++read == n && (pos = clipPos(cm.doc, pos), makeChange(cm.doc, {
from:pos,
to:pos,
text:splitLines(text.join("\n")),
origin:"paste"
}, "around"));
}, reader.readAsText(file);
}, i = 0; n > i; ++i) loadFile(files[i], i); else {
if (cm.state.draggingText && !posLess(pos, cm.doc.sel.from) && !posLess(cm.doc.sel.to, pos)) return cm.state.draggingText(e), 
setTimeout(bind(focusInput, cm), 20), void 0;
try {
var text = e.dataTransfer.getData("Text");
if (text) {
var curFrom = cm.doc.sel.from, curTo = cm.doc.sel.to;
setSelection(cm.doc, pos, pos), cm.state.draggingText && replaceRange(cm.doc, "", curFrom, curTo, "paste"), 
cm.replaceSelection(text, null, "paste"), focusInput(cm);
}
} catch (e) {}
}
}
}
function onDragStart(cm, e) {
if (ie && (!cm.state.draggingText || +new Date() - lastDrop < 100)) return e_stop(e), 
void 0;
if (!signalDOMEvent(cm, e) && !eventInWidget(cm.display, e)) {
var txt = cm.getSelection();
if (e.dataTransfer.setData("Text", txt), e.dataTransfer.setDragImage && !safari) {
var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 
opera && (img.width = img.height = 1, cm.display.wrapper.appendChild(img), img._top = img.offsetTop), 
e.dataTransfer.setDragImage(img, 0, 0), opera && img.parentNode.removeChild(img);
}
}
}
function setScrollTop(cm, val) {
Math.abs(cm.doc.scrollTop - val) < 2 || (cm.doc.scrollTop = val, gecko || updateDisplay(cm, [], val), 
cm.display.scroller.scrollTop != val && (cm.display.scroller.scrollTop = val), cm.display.scrollbarV.scrollTop != val && (cm.display.scrollbarV.scrollTop = val), 
gecko && updateDisplay(cm, []), startWorker(cm, 100));
}
function setScrollLeft(cm, val, isScroller) {
(isScroller ? val == cm.doc.scrollLeft :Math.abs(cm.doc.scrollLeft - val) < 2) || (val = Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth), 
cm.doc.scrollLeft = val, alignHorizontally(cm), cm.display.scroller.scrollLeft != val && (cm.display.scroller.scrollLeft = val), 
cm.display.scrollbarH.scrollLeft != val && (cm.display.scrollbarH.scrollLeft = val));
}
function onScrollWheel(cm, e) {
var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
null == dx && e.detail && e.axis == e.HORIZONTAL_AXIS && (dx = e.detail), null == dy && e.detail && e.axis == e.VERTICAL_AXIS ? dy = e.detail :null == dy && (dy = e.wheelDelta);
var display = cm.display, scroll = display.scroller;
if (dx && scroll.scrollWidth > scroll.clientWidth || dy && scroll.scrollHeight > scroll.clientHeight) {
if (dy && mac && webkit) for (var cur = e.target; cur != scroll; cur = cur.parentNode) if (cur.lineObj) {
cm.display.currentWheelTarget = cur;
break;
}
if (dx && !gecko && !opera && null != wheelPixelsPerUnit) return dy && setScrollTop(cm, Math.max(0, Math.min(scroll.scrollTop + dy * wheelPixelsPerUnit, scroll.scrollHeight - scroll.clientHeight))), 
setScrollLeft(cm, Math.max(0, Math.min(scroll.scrollLeft + dx * wheelPixelsPerUnit, scroll.scrollWidth - scroll.clientWidth))), 
e_preventDefault(e), display.wheelStartX = null, void 0;
if (dy && null != wheelPixelsPerUnit) {
var pixels = dy * wheelPixelsPerUnit, top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
0 > pixels ? top = Math.max(0, top + pixels - 50) :bot = Math.min(cm.doc.height, bot + pixels + 50), 
updateDisplay(cm, [], {
top:top,
bottom:bot
});
}
20 > wheelSamples && (null == display.wheelStartX ? (display.wheelStartX = scroll.scrollLeft, 
display.wheelStartY = scroll.scrollTop, display.wheelDX = dx, display.wheelDY = dy, 
setTimeout(function() {
if (null != display.wheelStartX) {
var movedX = scroll.scrollLeft - display.wheelStartX, movedY = scroll.scrollTop - display.wheelStartY, sample = movedY && display.wheelDY && movedY / display.wheelDY || movedX && display.wheelDX && movedX / display.wheelDX;
display.wheelStartX = display.wheelStartY = null, sample && (wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1), 
++wheelSamples);
}
}, 200)) :(display.wheelDX += dx, display.wheelDY += dy));
}
}
function doHandleBinding(cm, bound, dropShift) {
if ("string" == typeof bound && (bound = commands[bound], !bound)) return !1;
cm.display.pollingFast && readInput(cm) && (cm.display.pollingFast = !1);
var doc = cm.doc, prevShift = doc.sel.shift, done = !1;
try {
isReadOnly(cm) && (cm.state.suppressEdits = !0), dropShift && (doc.sel.shift = !1), 
done = bound(cm) != Pass;
} finally {
doc.sel.shift = prevShift, cm.state.suppressEdits = !1;
}
return done;
}
function allKeyMaps(cm) {
var maps = cm.state.keyMaps.slice(0);
return cm.options.extraKeys && maps.push(cm.options.extraKeys), maps.push(cm.options.keyMap), 
maps;
}
function handleKeyBinding(cm, e) {
var startMap = getKeyMap(cm.options.keyMap), next = startMap.auto;
clearTimeout(maybeTransition), next && !isModifierKey(e) && (maybeTransition = setTimeout(function() {
getKeyMap(cm.options.keyMap) == startMap && (cm.options.keyMap = next.call ? next.call(null, cm) :next, 
keyMapChanged(cm));
}, 50));
var name = keyName(e, !0), handled = !1;
if (!name) return !1;
var keymaps = allKeyMaps(cm);
return handled = e.shiftKey ? lookupKey("Shift-" + name, keymaps, function(b) {
return doHandleBinding(cm, b, !0);
}) || lookupKey(name, keymaps, function(b) {
return ("string" == typeof b ? /^go[A-Z]/.test(b) :b.motion) ? doHandleBinding(cm, b) :void 0;
}) :lookupKey(name, keymaps, function(b) {
return doHandleBinding(cm, b);
}), handled && (e_preventDefault(e), restartBlink(cm), ie_lt9 && (e.oldKeyCode = e.keyCode, 
e.keyCode = 0), signalLater(cm, "keyHandled", cm, name, e)), handled;
}
function handleCharBinding(cm, e, ch) {
var handled = lookupKey("'" + ch + "'", allKeyMaps(cm), function(b) {
return doHandleBinding(cm, b, !0);
});
return handled && (e_preventDefault(e), restartBlink(cm), signalLater(cm, "keyHandled", cm, "'" + ch + "'", e)), 
handled;
}
function onKeyUp(e) {
var cm = this;
signalDOMEvent(cm, e) || cm.options.onKeyEvent && cm.options.onKeyEvent(cm, addStop(e)) || 16 == e.keyCode && (cm.doc.sel.shift = !1);
}
function onKeyDown(e) {
var cm = this;
if (ensureFocus(cm), !(signalDOMEvent(cm, e) || cm.options.onKeyEvent && cm.options.onKeyEvent(cm, addStop(e)))) {
old_ie && 27 == e.keyCode && (e.returnValue = !1);
var code = e.keyCode;
cm.doc.sel.shift = 16 == code || e.shiftKey;
var handled = handleKeyBinding(cm, e);
opera && (lastStoppedKey = handled ? code :null, !handled && 88 == code && !hasCopyEvent && (mac ? e.metaKey :e.ctrlKey) && cm.replaceSelection(""));
}
}
function onKeyPress(e) {
var cm = this;
if (!(signalDOMEvent(cm, e) || cm.options.onKeyEvent && cm.options.onKeyEvent(cm, addStop(e)))) {
var keyCode = e.keyCode, charCode = e.charCode;
if (opera && keyCode == lastStoppedKey) return lastStoppedKey = null, e_preventDefault(e), 
void 0;
if (!(opera && (!e.which || e.which < 10) || khtml) || !handleKeyBinding(cm, e)) {
var ch = String.fromCharCode(null == charCode ? keyCode :charCode);
handleCharBinding(cm, e, ch) || (ie && !ie_lt9 && (cm.display.inputHasSelection = null), 
fastPoll(cm));
}
}
}
function onFocus(cm) {
"nocursor" != cm.options.readOnly && (cm.state.focused || (signal(cm, "focus", cm), 
cm.state.focused = !0, -1 == cm.display.wrapper.className.search(/\bCodeMirror-focused\b/) && (cm.display.wrapper.className += " CodeMirror-focused"), 
cm.curOp || (resetInput(cm, !0), webkit && setTimeout(bind(resetInput, cm, !0), 0))), 
slowPoll(cm), restartBlink(cm));
}
function onBlur(cm) {
cm.state.focused && (signal(cm, "blur", cm), cm.state.focused = !1, cm.display.wrapper.className = cm.display.wrapper.className.replace(" CodeMirror-focused", "")), 
clearInterval(cm.display.blinker), setTimeout(function() {
cm.state.focused || (cm.doc.sel.shift = !1);
}, 150);
}
function onContextMenu(cm, e) {
function prepareSelectAllHack() {
if (null != display.input.selectionStart) {
var extval = display.input.value = "\u200b" + (posEq(sel.from, sel.to) ? "" :display.input.value);
display.prevInput = "\u200b", display.input.selectionStart = 1, display.input.selectionEnd = extval.length;
}
}
function rehide() {
if (display.inputDiv.style.position = "relative", display.input.style.cssText = oldCSS, 
ie_lt9 && (display.scrollbarV.scrollTop = display.scroller.scrollTop = scrollPos), 
slowPoll(cm), null != display.input.selectionStart) {
(!ie || ie_lt9) && prepareSelectAllHack(), clearTimeout(detectingSelectAll);
var i = 0, poll = function() {
"\u200b" == display.prevInput && 0 == display.input.selectionStart ? operation(cm, commands.selectAll)(cm) :i++ < 10 ? detectingSelectAll = setTimeout(poll, 500) :resetInput(cm);
};
detectingSelectAll = setTimeout(poll, 200);
}
}
if (!signalDOMEvent(cm, e, "contextmenu")) {
var display = cm.display, sel = cm.doc.sel;
if (!eventInWidget(display, e) && !contextMenuInGutter(cm, e)) {
var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
if (pos && !opera) {
var reset = cm.options.resetSelectionOnContextMenu;
reset && (posEq(sel.from, sel.to) || posLess(pos, sel.from) || !posLess(pos, sel.to)) && operation(cm, setSelection)(cm.doc, pos, pos);
var oldCSS = display.input.style.cssText;
if (display.inputDiv.style.position = "absolute", display.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: transparent; outline: none;border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);", 
focusInput(cm), resetInput(cm, !0), posEq(sel.from, sel.to) && (display.input.value = display.prevInput = " "), 
ie && !ie_lt9 && prepareSelectAllHack(), captureMiddleClick) {
e_stop(e);
var mouseup = function() {
off(window, "mouseup", mouseup), setTimeout(rehide, 20);
};
on(window, "mouseup", mouseup);
} else setTimeout(rehide, 50);
}
}
}
}
function clipPostChange(doc, change, pos) {
if (!posLess(change.from, pos)) return clipPos(doc, pos);
var diff = change.text.length - 1 - (change.to.line - change.from.line);
if (pos.line > change.to.line + diff) {
var preLine = pos.line - diff, lastLine = doc.first + doc.size - 1;
return preLine > lastLine ? Pos(lastLine, getLine(doc, lastLine).text.length) :clipToLen(pos, getLine(doc, preLine).text.length);
}
if (pos.line == change.to.line + diff) return clipToLen(pos, lst(change.text).length + (1 == change.text.length ? change.from.ch :0) + getLine(doc, change.to.line).text.length - change.to.ch);
var inside = pos.line - change.from.line;
return clipToLen(pos, change.text[inside].length + (inside ? 0 :change.from.ch));
}
function computeSelAfterChange(doc, change, hint) {
if (hint && "object" == typeof hint) return {
anchor:clipPostChange(doc, change, hint.anchor),
head:clipPostChange(doc, change, hint.head)
};
if ("start" == hint) return {
anchor:change.from,
head:change.from
};
var end = changeEnd(change);
if ("around" == hint) return {
anchor:change.from,
head:end
};
if ("end" == hint) return {
anchor:end,
head:end
};
var adjustPos = function(pos) {
if (posLess(pos, change.from)) return pos;
if (!posLess(change.to, pos)) return end;
var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
return pos.line == change.to.line && (ch += end.ch - change.to.ch), Pos(line, ch);
};
return {
anchor:adjustPos(doc.sel.anchor),
head:adjustPos(doc.sel.head)
};
}
function filterChange(doc, change, update) {
var obj = {
canceled:!1,
from:change.from,
to:change.to,
text:change.text,
origin:change.origin,
cancel:function() {
this.canceled = !0;
}
};
return update && (obj.update = function(from, to, text, origin) {
from && (this.from = clipPos(doc, from)), to && (this.to = clipPos(doc, to)), text && (this.text = text), 
void 0 !== origin && (this.origin = origin);
}), signal(doc, "beforeChange", doc, obj), doc.cm && signal(doc.cm, "beforeChange", doc.cm, obj), 
obj.canceled ? null :{
from:obj.from,
to:obj.to,
text:obj.text,
origin:obj.origin
};
}
function makeChange(doc, change, selUpdate, ignoreReadOnly) {
if (doc.cm) {
if (!doc.cm.curOp) return operation(doc.cm, makeChange)(doc, change, selUpdate, ignoreReadOnly);
if (doc.cm.state.suppressEdits) return;
}
if (!(hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) || (change = filterChange(doc, change, !0))) {
var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
if (split) {
for (var i = split.length - 1; i >= 1; --i) makeChangeNoReadonly(doc, {
from:split[i].from,
to:split[i].to,
text:[ "" ]
});
split.length && makeChangeNoReadonly(doc, {
from:split[0].from,
to:split[0].to,
text:change.text
}, selUpdate);
} else makeChangeNoReadonly(doc, change, selUpdate);
}
}
function makeChangeNoReadonly(doc, change, selUpdate) {
if (1 != change.text.length || "" != change.text[0] || !posEq(change.from, change.to)) {
var selAfter = computeSelAfterChange(doc, change, selUpdate);
addToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id :0/0), makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
var rebased = [];
linkedDocs(doc, function(doc, sharedHist) {
sharedHist || -1 != indexOf(rebased, doc.history) || (rebaseHist(doc.history, change), 
rebased.push(doc.history)), makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
});
}
}
function makeChangeFromHistory(doc, type) {
if (!doc.cm || !doc.cm.state.suppressEdits) {
var hist = doc.history, event = ("undo" == type ? hist.done :hist.undone).pop();
if (event) {
var anti = {
changes:[],
anchorBefore:event.anchorAfter,
headBefore:event.headAfter,
anchorAfter:event.anchorBefore,
headAfter:event.headBefore,
generation:hist.generation
};
("undo" == type ? hist.undone :hist.done).push(anti), hist.generation = event.generation || ++hist.maxGeneration;
for (var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange"), i = event.changes.length - 1; i >= 0; --i) {
var change = event.changes[i];
if (change.origin = type, filter && !filterChange(doc, change, !1)) return ("undo" == type ? hist.done :hist.undone).length = 0, 
void 0;
anti.changes.push(historyChangeFromChange(doc, change));
var after = i ? computeSelAfterChange(doc, change, null) :{
anchor:event.anchorBefore,
head:event.headBefore
};
makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
var rebased = [];
linkedDocs(doc, function(doc, sharedHist) {
sharedHist || -1 != indexOf(rebased, doc.history) || (rebaseHist(doc.history, change), 
rebased.push(doc.history)), makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
});
}
}
}
}
function shiftDoc(doc, distance) {
function shiftPos(pos) {
return Pos(pos.line + distance, pos.ch);
}
doc.first += distance, doc.cm && regChange(doc.cm, doc.first, doc.first, distance), 
doc.sel.head = shiftPos(doc.sel.head), doc.sel.anchor = shiftPos(doc.sel.anchor), 
doc.sel.from = shiftPos(doc.sel.from), doc.sel.to = shiftPos(doc.sel.to);
}
function makeChangeSingleDoc(doc, change, selAfter, spans) {
if (doc.cm && !doc.cm.curOp) return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans);
if (change.to.line < doc.first) return shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line)), 
void 0;
if (!(change.from.line > doc.lastLine())) {
if (change.from.line < doc.first) {
var shift = change.text.length - 1 - (doc.first - change.from.line);
shiftDoc(doc, shift), change = {
from:Pos(doc.first, 0),
to:Pos(change.to.line + shift, change.to.ch),
text:[ lst(change.text) ],
origin:change.origin
};
}
var last = doc.lastLine();
change.to.line > last && (change = {
from:change.from,
to:Pos(last, getLine(doc, last).text.length),
text:[ change.text[0] ],
origin:change.origin
}), change.removed = getBetween(doc, change.from, change.to), selAfter || (selAfter = computeSelAfterChange(doc, change, null)), 
doc.cm ? makeChangeSingleDocInEditor(doc.cm, change, spans, selAfter) :updateDoc(doc, change, spans, selAfter);
}
}
function makeChangeSingleDocInEditor(cm, change, spans, selAfter) {
var doc = cm.doc, display = cm.display, from = change.from, to = change.to, recomputeMaxLength = !1, checkWidthStart = from.line;
cm.options.lineWrapping || (checkWidthStart = lineNo(visualLine(doc, getLine(doc, from.line))), 
doc.iter(checkWidthStart, to.line + 1, function(line) {
return line == display.maxLine ? (recomputeMaxLength = !0, !0) :void 0;
})), posLess(doc.sel.head, change.from) || posLess(change.to, doc.sel.head) || (cm.curOp.cursorActivity = !0), 
updateDoc(doc, change, spans, selAfter, estimateHeight(cm)), cm.options.lineWrapping || (doc.iter(checkWidthStart, from.line + change.text.length, function(line) {
var len = lineLength(doc, line);
len > display.maxLineLength && (display.maxLine = line, display.maxLineLength = len, 
display.maxLineChanged = !0, recomputeMaxLength = !1);
}), recomputeMaxLength && (cm.curOp.updateMaxLine = !0)), doc.frontier = Math.min(doc.frontier, from.line), 
startWorker(cm, 400);
var lendiff = change.text.length - (to.line - from.line) - 1;
if (regChange(cm, from.line, to.line + 1, lendiff), hasHandler(cm, "change")) {
var changeObj = {
from:from,
to:to,
text:change.text,
removed:change.removed,
origin:change.origin
};
if (cm.curOp.textChanged) {
for (var cur = cm.curOp.textChanged; cur.next; cur = cur.next) ;
cur.next = changeObj;
} else cm.curOp.textChanged = changeObj;
}
}
function replaceRange(doc, code, from, to, origin) {
if (to || (to = from), posLess(to, from)) {
var tmp = to;
to = from, from = tmp;
}
"string" == typeof code && (code = splitLines(code)), makeChange(doc, {
from:from,
to:to,
text:code,
origin:origin
}, null);
}
function Pos(line, ch) {
return this instanceof Pos ? (this.line = line, this.ch = ch, void 0) :new Pos(line, ch);
}
function posEq(a, b) {
return a.line == b.line && a.ch == b.ch;
}
function posLess(a, b) {
return a.line < b.line || a.line == b.line && a.ch < b.ch;
}
function cmp(a, b) {
return a.line - b.line || a.ch - b.ch;
}
function copyPos(x) {
return Pos(x.line, x.ch);
}
function clipLine(doc, n) {
return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1));
}
function clipPos(doc, pos) {
if (pos.line < doc.first) return Pos(doc.first, 0);
var last = doc.first + doc.size - 1;
return pos.line > last ? Pos(last, getLine(doc, last).text.length) :clipToLen(pos, getLine(doc, pos.line).text.length);
}
function clipToLen(pos, linelen) {
var ch = pos.ch;
return null == ch || ch > linelen ? Pos(pos.line, linelen) :0 > ch ? Pos(pos.line, 0) :pos;
}
function isLine(doc, l) {
return l >= doc.first && l < doc.first + doc.size;
}
function extendSelection(doc, pos, other, bias) {
if (doc.sel.shift || doc.sel.extend) {
var anchor = doc.sel.anchor;
if (other) {
var posBefore = posLess(pos, anchor);
posBefore != posLess(other, anchor) ? (anchor = pos, pos = other) :posBefore != posLess(pos, other) && (pos = other);
}
setSelection(doc, anchor, pos, bias);
} else setSelection(doc, pos, other || pos, bias);
doc.cm && (doc.cm.curOp.userSelChange = !0);
}
function filterSelectionChange(doc, anchor, head) {
var obj = {
anchor:anchor,
head:head
};
return signal(doc, "beforeSelectionChange", doc, obj), doc.cm && signal(doc.cm, "beforeSelectionChange", doc.cm, obj), 
obj.anchor = clipPos(doc, obj.anchor), obj.head = clipPos(doc, obj.head), obj;
}
function setSelection(doc, anchor, head, bias, checkAtomic) {
if (!checkAtomic && hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange")) {
var filtered = filterSelectionChange(doc, anchor, head);
head = filtered.head, anchor = filtered.anchor;
}
var sel = doc.sel;
if (sel.goalColumn = null, null == bias && (bias = posLess(head, sel.head) ? -1 :1), 
(checkAtomic || !posEq(anchor, sel.anchor)) && (anchor = skipAtomic(doc, anchor, bias, "push" != checkAtomic)), 
(checkAtomic || !posEq(head, sel.head)) && (head = skipAtomic(doc, head, bias, "push" != checkAtomic)), 
!posEq(sel.anchor, anchor) || !posEq(sel.head, head)) {
sel.anchor = anchor, sel.head = head;
var inv = posLess(head, anchor);
sel.from = inv ? head :anchor, sel.to = inv ? anchor :head, doc.cm && (doc.cm.curOp.updateInput = doc.cm.curOp.selectionChanged = doc.cm.curOp.cursorActivity = !0), 
signalLater(doc, "cursorActivity", doc);
}
}
function reCheckSelection(cm) {
setSelection(cm.doc, cm.doc.sel.from, cm.doc.sel.to, null, "push");
}
function skipAtomic(doc, pos, bias, mayClear) {
var flipped = !1, curPos = pos, dir = bias || 1;
doc.cantEdit = !1;
search:for (;;) {
var line = getLine(doc, curPos.line);
if (line.markedSpans) for (var i = 0; i < line.markedSpans.length; ++i) {
var sp = line.markedSpans[i], m = sp.marker;
if ((null == sp.from || (m.inclusiveLeft ? sp.from <= curPos.ch :sp.from < curPos.ch)) && (null == sp.to || (m.inclusiveRight ? sp.to >= curPos.ch :sp.to > curPos.ch))) {
if (mayClear && (signal(m, "beforeCursorEnter"), m.explicitlyCleared)) {
if (line.markedSpans) {
--i;
continue;
}
break;
}
if (!m.atomic) continue;
var newPos = m.find()[0 > dir ? "from" :"to"];
if (posEq(newPos, curPos) && (newPos.ch += dir, newPos.ch < 0 ? newPos = newPos.line > doc.first ? clipPos(doc, Pos(newPos.line - 1)) :null :newPos.ch > line.text.length && (newPos = newPos.line < doc.first + doc.size - 1 ? Pos(newPos.line + 1, 0) :null), 
!newPos)) {
if (flipped) return mayClear ? (doc.cantEdit = !0, Pos(doc.first, 0)) :skipAtomic(doc, pos, bias, !0);
flipped = !0, newPos = pos, dir = -dir;
}
curPos = newPos;
continue search;
}
}
return curPos;
}
}
function scrollCursorIntoView(cm) {
var coords = scrollPosIntoView(cm, cm.doc.sel.head, null, cm.options.cursorScrollMargin);
if (cm.state.focused) {
var display = cm.display, box = getRect(display.sizer), doScroll = null;
if (coords.top + box.top < 0 ? doScroll = !0 :coords.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight) && (doScroll = !1), 
null != doScroll && !phantom) {
var scrollNode = elt("div", "\u200b", null, "position: absolute; top: " + (coords.top - display.viewOffset) + "px; height: " + (coords.bottom - coords.top + scrollerCutOff) + "px; left: " + coords.left + "px; width: 2px;");
cm.display.lineSpace.appendChild(scrollNode), scrollNode.scrollIntoView(doScroll), 
cm.display.lineSpace.removeChild(scrollNode);
}
}
}
function scrollPosIntoView(cm, pos, end, margin) {
for (null == margin && (margin = 0); ;) {
var changed = !1, coords = cursorCoords(cm, pos), endCoords = end && end != pos ? cursorCoords(cm, end) :coords, scrollPos = calculateScrollPos(cm, Math.min(coords.left, endCoords.left), Math.min(coords.top, endCoords.top) - margin, Math.max(coords.left, endCoords.left), Math.max(coords.bottom, endCoords.bottom) + margin), startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
if (null != scrollPos.scrollTop && (setScrollTop(cm, scrollPos.scrollTop), Math.abs(cm.doc.scrollTop - startTop) > 1 && (changed = !0)), 
null != scrollPos.scrollLeft && (setScrollLeft(cm, scrollPos.scrollLeft), Math.abs(cm.doc.scrollLeft - startLeft) > 1 && (changed = !0)), 
!changed) return coords;
}
}
function scrollIntoView(cm, x1, y1, x2, y2) {
var scrollPos = calculateScrollPos(cm, x1, y1, x2, y2);
null != scrollPos.scrollTop && setScrollTop(cm, scrollPos.scrollTop), null != scrollPos.scrollLeft && setScrollLeft(cm, scrollPos.scrollLeft);
}
function calculateScrollPos(cm, x1, y1, x2, y2) {
var display = cm.display, snapMargin = textHeight(cm.display);
0 > y1 && (y1 = 0);
var screen = display.scroller.clientHeight - scrollerCutOff, screentop = display.scroller.scrollTop, result = {}, docBottom = cm.doc.height + paddingVert(display), atTop = snapMargin > y1, atBottom = y2 > docBottom - snapMargin;
if (screentop > y1) result.scrollTop = atTop ? 0 :y1; else if (y2 > screentop + screen) {
var newTop = Math.min(y1, (atBottom ? docBottom :y2) - screen);
newTop != screentop && (result.scrollTop = newTop);
}
var screenw = display.scroller.clientWidth - scrollerCutOff, screenleft = display.scroller.scrollLeft;
x1 += display.gutters.offsetWidth, x2 += display.gutters.offsetWidth;
var gutterw = display.gutters.offsetWidth, atLeft = gutterw + 10 > x1;
return screenleft + gutterw > x1 || atLeft ? (atLeft && (x1 = 0), result.scrollLeft = Math.max(0, x1 - 10 - gutterw)) :x2 > screenw + screenleft - 3 && (result.scrollLeft = x2 + 10 - screenw), 
result;
}
function updateScrollPos(cm, left, top) {
cm.curOp.updateScrollPos = {
scrollLeft:null == left ? cm.doc.scrollLeft :left,
scrollTop:null == top ? cm.doc.scrollTop :top
};
}
function addToScrollPos(cm, left, top) {
var pos = cm.curOp.updateScrollPos || (cm.curOp.updateScrollPos = {
scrollLeft:cm.doc.scrollLeft,
scrollTop:cm.doc.scrollTop
}), scroll = cm.display.scroller;
pos.scrollTop = Math.max(0, Math.min(scroll.scrollHeight - scroll.clientHeight, pos.scrollTop + top)), 
pos.scrollLeft = Math.max(0, Math.min(scroll.scrollWidth - scroll.clientWidth, pos.scrollLeft + left));
}
function indentLine(cm, n, how, aggressive) {
var state, doc = cm.doc;
null == how && (how = "add"), "smart" == how && (cm.doc.mode.indent ? state = getStateBefore(cm, n) :how = "prev");
var tabSize = cm.options.tabSize, line = getLine(doc, n), curSpace = countColumn(line.text, null, tabSize);
line.stateAfter && (line.stateAfter = null);
var indentation, curSpaceString = line.text.match(/^\s*/)[0];
if (aggressive || /\S/.test(line.text)) {
if ("smart" == how && (indentation = cm.doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text), 
indentation == Pass)) {
if (!aggressive) return;
how = "prev";
}
} else indentation = 0, how = "not";
"prev" == how ? indentation = n > doc.first ? countColumn(getLine(doc, n - 1).text, null, tabSize) :0 :"add" == how ? indentation = curSpace + cm.options.indentUnit :"subtract" == how ? indentation = curSpace - cm.options.indentUnit :"number" == typeof how && (indentation = curSpace + how), 
indentation = Math.max(0, indentation);
var indentString = "", pos = 0;
if (cm.options.indentWithTabs) for (var i = Math.floor(indentation / tabSize); i; --i) pos += tabSize, 
indentString += "	";
indentation > pos && (indentString += spaceStr(indentation - pos)), indentString != curSpaceString ? replaceRange(cm.doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input") :doc.sel.head.line == n && doc.sel.head.ch < curSpaceString.length && setSelection(doc, Pos(n, curSpaceString.length), Pos(n, curSpaceString.length), 1), 
line.stateAfter = null;
}
function changeLine(cm, handle, op) {
var no = handle, line = handle, doc = cm.doc;
return "number" == typeof handle ? line = getLine(doc, clipLine(doc, handle)) :no = lineNo(handle), 
null == no ? null :op(line, no) ? (regChange(cm, no, no + 1), line) :null;
}
function findPosH(doc, pos, dir, unit, visually) {
function findNextLine() {
var l = line + dir;
return l < doc.first || l >= doc.first + doc.size ? possible = !1 :(line = l, lineObj = getLine(doc, l));
}
function moveOnce(boundToLine) {
var next = (visually ? moveVisually :moveLogically)(lineObj, ch, dir, !0);
if (null == next) {
if (boundToLine || !findNextLine()) return possible = !1;
ch = visually ? (0 > dir ? lineRight :lineLeft)(lineObj) :0 > dir ? lineObj.text.length :0;
} else ch = next;
return !0;
}
var line = pos.line, ch = pos.ch, origDir = dir, lineObj = getLine(doc, line), possible = !0;
if ("char" == unit) moveOnce(); else if ("column" == unit) moveOnce(!0); else if ("word" == unit || "group" == unit) for (var sawType = null, group = "group" == unit, first = !0; !(0 > dir) || moveOnce(!first); first = !1) {
var cur = lineObj.text.charAt(ch) || "\n", type = isWordChar(cur) ? "w" :group && "\n" == cur ? "n" :!group || /\s/.test(cur) ? null :"p";
if (!group || first || type || (type = "s"), sawType && sawType != type) {
0 > dir && (dir = 1, moveOnce());
break;
}
if (type && (sawType = type), dir > 0 && !moveOnce(!first)) break;
}
var result = skipAtomic(doc, Pos(line, ch), origDir, !0);
return possible || (result.hitSide = !0), result;
}
function findPosV(cm, pos, dir, unit) {
var y, doc = cm.doc, x = pos.left;
if ("page" == unit) {
var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
y = pos.top + dir * (pageSize - (0 > dir ? 1.5 :.5) * textHeight(cm.display));
} else "line" == unit && (y = dir > 0 ? pos.bottom + 3 :pos.top - 3);
for (;;) {
var target = coordsChar(cm, x, y);
if (!target.outside) break;
if (0 > dir ? 0 >= y :y >= doc.height) {
target.hitSide = !0;
break;
}
y += 5 * dir;
}
return target;
}
function findWordAt(line, pos) {
var start = pos.ch, end = pos.ch;
if (line) {
(pos.xRel < 0 || end == line.length) && start ? --start :++end;
for (var startChar = line.charAt(start), check = isWordChar(startChar) ? isWordChar :/\s/.test(startChar) ? function(ch) {
return /\s/.test(ch);
} :function(ch) {
return !/\s/.test(ch) && !isWordChar(ch);
}; start > 0 && check(line.charAt(start - 1)); ) --start;
for (;end < line.length && check(line.charAt(end)); ) ++end;
}
return {
from:Pos(pos.line, start),
to:Pos(pos.line, end)
};
}
function selectLine(cm, line) {
extendSelection(cm.doc, Pos(line, 0), clipPos(cm.doc, Pos(line + 1, 0)));
}
function option(name, deflt, handle, notOnInit) {
CodeMirror.defaults[name] = deflt, handle && (optionHandlers[name] = notOnInit ? function(cm, val, old) {
old != Init && handle(cm, val, old);
} :handle);
}
function copyState(mode, state) {
if (state === !0) return state;
if (mode.copyState) return mode.copyState(state);
var nstate = {};
for (var n in state) {
var val = state[n];
val instanceof Array && (val = val.concat([])), nstate[n] = val;
}
return nstate;
}
function startState(mode, a1, a2) {
return mode.startState ? mode.startState(a1, a2) :!0;
}
function getKeyMap(val) {
return "string" == typeof val ? keyMap[val] :val;
}
function lookupKey(name, maps, handle) {
function lookup(map) {
map = getKeyMap(map);
var found = map[name];
if (found === !1) return "stop";
if (null != found && handle(found)) return !0;
if (map.nofallthrough) return "stop";
var fallthrough = map.fallthrough;
if (null == fallthrough) return !1;
if ("[object Array]" != Object.prototype.toString.call(fallthrough)) return lookup(fallthrough);
for (var i = 0, e = fallthrough.length; e > i; ++i) {
var done = lookup(fallthrough[i]);
if (done) return done;
}
return !1;
}
for (var i = 0; i < maps.length; ++i) {
var done = lookup(maps[i]);
if (done) return "stop" != done;
}
}
function isModifierKey(event) {
var name = keyNames[event.keyCode];
return "Ctrl" == name || "Alt" == name || "Shift" == name || "Mod" == name;
}
function keyName(event, noShift) {
if (opera && 34 == event.keyCode && event["char"]) return !1;
var name = keyNames[event.keyCode];
return null == name || event.altGraphKey ? !1 :(event.altKey && (name = "Alt-" + name), 
(flipCtrlCmd ? event.metaKey :event.ctrlKey) && (name = "Ctrl-" + name), (flipCtrlCmd ? event.ctrlKey :event.metaKey) && (name = "Cmd-" + name), 
!noShift && event.shiftKey && (name = "Shift-" + name), name);
}
function StringStream(string, tabSize) {
this.pos = this.start = 0, this.string = string, this.tabSize = tabSize || 8, this.lastColumnPos = this.lastColumnValue = 0, 
this.lineStart = 0;
}
function TextMarker(doc, type) {
this.lines = [], this.type = type, this.doc = doc;
}
function markText(doc, from, to, options, type) {
if (options && options.shared) return markTextShared(doc, from, to, options, type);
if (doc.cm && !doc.cm.curOp) return operation(doc.cm, markText)(doc, from, to, options, type);
var marker = new TextMarker(doc, type);
if (options && copyObj(options, marker), posLess(to, from) || posEq(from, to) && marker.clearWhenEmpty !== !1) return marker;
if (marker.replacedWith && (marker.collapsed = !0, marker.replacedWith = elt("span", [ marker.replacedWith ], "CodeMirror-widget"), 
options.handleMouseEvents || (marker.replacedWith.ignoreEvents = !0)), marker.collapsed) {
if (conflictingCollapsedRange(doc, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
sawCollapsedSpans = !0;
}
marker.addToHistory && addToHistory(doc, {
from:from,
to:to,
origin:"markText"
}, {
head:doc.sel.head,
anchor:doc.sel.anchor
}, 0/0);
var updateMaxLine, curLine = from.line, cm = doc.cm;
return doc.iter(curLine, to.line + 1, function(line) {
cm && marker.collapsed && !cm.options.lineWrapping && visualLine(doc, line) == cm.display.maxLine && (updateMaxLine = !0);
var span = {
from:null,
to:null,
marker:marker
};
curLine == from.line && (span.from = from.ch), curLine == to.line && (span.to = to.ch), 
marker.collapsed && curLine != from.line && updateLineHeight(line, 0), addMarkedSpan(line, span), 
++curLine;
}), marker.collapsed && doc.iter(from.line, to.line + 1, function(line) {
lineIsHidden(doc, line) && updateLineHeight(line, 0);
}), marker.clearOnEnter && on(marker, "beforeCursorEnter", function() {
marker.clear();
}), marker.readOnly && (sawReadOnlySpans = !0, (doc.history.done.length || doc.history.undone.length) && doc.clearHistory()), 
marker.collapsed && (marker.id = ++nextMarkerId, marker.atomic = !0), cm && (updateMaxLine && (cm.curOp.updateMaxLine = !0), 
(marker.className || marker.title || marker.startStyle || marker.endStyle || marker.collapsed) && regChange(cm, from.line, to.line + 1), 
marker.atomic && reCheckSelection(cm)), marker;
}
function SharedTextMarker(markers, primary) {
this.markers = markers, this.primary = primary;
for (var i = 0, me = this; i < markers.length; ++i) markers[i].parent = this, on(markers[i], "clear", function() {
me.clear();
});
}
function markTextShared(doc, from, to, options, type) {
options = copyObj(options), options.shared = !1;
var markers = [ markText(doc, from, to, options, type) ], primary = markers[0], widget = options.replacedWith;
return linkedDocs(doc, function(doc) {
widget && (options.replacedWith = widget.cloneNode(!0)), markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
for (var i = 0; i < doc.linked.length; ++i) if (doc.linked[i].isParent) return;
primary = lst(markers);
}), new SharedTextMarker(markers, primary);
}
function getMarkedSpanFor(spans, marker) {
if (spans) for (var i = 0; i < spans.length; ++i) {
var span = spans[i];
if (span.marker == marker) return span;
}
}
function removeMarkedSpan(spans, span) {
for (var r, i = 0; i < spans.length; ++i) spans[i] != span && (r || (r = [])).push(spans[i]);
return r;
}
function addMarkedSpan(line, span) {
line.markedSpans = line.markedSpans ? line.markedSpans.concat([ span ]) :[ span ], 
span.marker.attachLine(line);
}
function markedSpansBefore(old, startCh, isInsert) {
if (old) for (var nw, i = 0; i < old.length; ++i) {
var span = old[i], marker = span.marker, startsBefore = null == span.from || (marker.inclusiveLeft ? span.from <= startCh :span.from < startCh);
if (startsBefore || span.from == startCh && "bookmark" == marker.type && (!isInsert || !span.marker.insertLeft)) {
var endsAfter = null == span.to || (marker.inclusiveRight ? span.to >= startCh :span.to > startCh);
(nw || (nw = [])).push({
from:span.from,
to:endsAfter ? null :span.to,
marker:marker
});
}
}
return nw;
}
function markedSpansAfter(old, endCh, isInsert) {
if (old) for (var nw, i = 0; i < old.length; ++i) {
var span = old[i], marker = span.marker, endsAfter = null == span.to || (marker.inclusiveRight ? span.to >= endCh :span.to > endCh);
if (endsAfter || span.from == endCh && "bookmark" == marker.type && (!isInsert || span.marker.insertLeft)) {
var startsBefore = null == span.from || (marker.inclusiveLeft ? span.from <= endCh :span.from < endCh);
(nw || (nw = [])).push({
from:startsBefore ? null :span.from - endCh,
to:null == span.to ? null :span.to - endCh,
marker:marker
});
}
}
return nw;
}
function stretchSpansOverChange(doc, change) {
var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans, oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
if (!oldFirst && !oldLast) return null;
var startCh = change.from.ch, endCh = change.to.ch, isInsert = posEq(change.from, change.to), first = markedSpansBefore(oldFirst, startCh, isInsert), last = markedSpansAfter(oldLast, endCh, isInsert), sameLine = 1 == change.text.length, offset = lst(change.text).length + (sameLine ? startCh :0);
if (first) for (var i = 0; i < first.length; ++i) {
var span = first[i];
if (null == span.to) {
var found = getMarkedSpanFor(last, span.marker);
found ? sameLine && (span.to = null == found.to ? null :found.to + offset) :span.to = startCh;
}
}
if (last) for (var i = 0; i < last.length; ++i) {
var span = last[i];
if (null != span.to && (span.to += offset), null == span.from) {
var found = getMarkedSpanFor(first, span.marker);
found || (span.from = offset, sameLine && (first || (first = [])).push(span));
} else span.from += offset, sameLine && (first || (first = [])).push(span);
}
first && (first = clearEmptySpans(first)), last && last != first && (last = clearEmptySpans(last));
var newMarkers = [ first ];
if (!sameLine) {
var gapMarkers, gap = change.text.length - 2;
if (gap > 0 && first) for (var i = 0; i < first.length; ++i) null == first[i].to && (gapMarkers || (gapMarkers = [])).push({
from:null,
to:null,
marker:first[i].marker
});
for (var i = 0; gap > i; ++i) newMarkers.push(gapMarkers);
newMarkers.push(last);
}
return newMarkers;
}
function clearEmptySpans(spans) {
for (var i = 0; i < spans.length; ++i) {
var span = spans[i];
null != span.from && span.from == span.to && span.marker.clearWhenEmpty !== !1 && spans.splice(i--, 1);
}
return spans.length ? spans :null;
}
function mergeOldSpans(doc, change) {
var old = getOldSpans(doc, change), stretched = stretchSpansOverChange(doc, change);
if (!old) return stretched;
if (!stretched) return old;
for (var i = 0; i < old.length; ++i) {
var oldCur = old[i], stretchCur = stretched[i];
if (oldCur && stretchCur) spans:for (var j = 0; j < stretchCur.length; ++j) {
for (var span = stretchCur[j], k = 0; k < oldCur.length; ++k) if (oldCur[k].marker == span.marker) continue spans;
oldCur.push(span);
} else stretchCur && (old[i] = stretchCur);
}
return old;
}
function removeReadOnlyRanges(doc, from, to) {
var markers = null;
if (doc.iter(from.line, to.line + 1, function(line) {
if (line.markedSpans) for (var i = 0; i < line.markedSpans.length; ++i) {
var mark = line.markedSpans[i].marker;
!mark.readOnly || markers && -1 != indexOf(markers, mark) || (markers || (markers = [])).push(mark);
}
}), !markers) return null;
for (var parts = [ {
from:from,
to:to
} ], i = 0; i < markers.length; ++i) for (var mk = markers[i], m = mk.find(), j = 0; j < parts.length; ++j) {
var p = parts[j];
if (!posLess(p.to, m.from) && !posLess(m.to, p.from)) {
var newParts = [ j, 1 ];
(posLess(p.from, m.from) || !mk.inclusiveLeft && posEq(p.from, m.from)) && newParts.push({
from:p.from,
to:m.from
}), (posLess(m.to, p.to) || !mk.inclusiveRight && posEq(p.to, m.to)) && newParts.push({
from:m.to,
to:p.to
}), parts.splice.apply(parts, newParts), j += newParts.length - 1;
}
}
return parts;
}
function extraLeft(marker) {
return marker.inclusiveLeft ? -1 :0;
}
function extraRight(marker) {
return marker.inclusiveRight ? 1 :0;
}
function compareCollapsedMarkers(a, b) {
var lenDiff = a.lines.length - b.lines.length;
if (0 != lenDiff) return lenDiff;
var aPos = a.find(), bPos = b.find(), fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
if (fromCmp) return -fromCmp;
var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
return toCmp ? toCmp :b.id - a.id;
}
function collapsedSpanAtSide(line, start) {
var found, sps = sawCollapsedSpans && line.markedSpans;
if (sps) for (var sp, i = 0; i < sps.length; ++i) sp = sps[i], sp.marker.collapsed && null == (start ? sp.from :sp.to) && (!found || compareCollapsedMarkers(found, sp.marker) < 0) && (found = sp.marker);
return found;
}
function collapsedSpanAtStart(line) {
return collapsedSpanAtSide(line, !0);
}
function collapsedSpanAtEnd(line) {
return collapsedSpanAtSide(line, !1);
}
function conflictingCollapsedRange(doc, lineNo, from, to, marker) {
var line = getLine(doc, lineNo), sps = sawCollapsedSpans && line.markedSpans;
if (sps) for (var i = 0; i < sps.length; ++i) {
var sp = sps[i];
if (sp.marker.collapsed) {
var found = sp.marker.find(!0), fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker), toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
if (!(fromCmp >= 0 && 0 >= toCmp || 0 >= fromCmp && toCmp >= 0) && (0 >= fromCmp && (cmp(found.to, from) || extraRight(sp.marker) - extraLeft(marker)) > 0 || fromCmp >= 0 && (cmp(found.from, to) || extraLeft(sp.marker) - extraRight(marker)) < 0)) return !0;
}
}
}
function visualLine(doc, line) {
for (var merged; merged = collapsedSpanAtStart(line); ) line = getLine(doc, merged.find().from.line);
return line;
}
function lineIsHidden(doc, line) {
var sps = sawCollapsedSpans && line.markedSpans;
if (sps) for (var sp, i = 0; i < sps.length; ++i) if (sp = sps[i], sp.marker.collapsed) {
if (null == sp.from) return !0;
if (!sp.marker.replacedWith && 0 == sp.from && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp)) return !0;
}
}
function lineIsHiddenInner(doc, line, span) {
if (null == span.to) {
var end = span.marker.find().to, endLine = getLine(doc, end.line);
return lineIsHiddenInner(doc, endLine, getMarkedSpanFor(endLine.markedSpans, span.marker));
}
if (span.marker.inclusiveRight && span.to == line.text.length) return !0;
for (var sp, i = 0; i < line.markedSpans.length; ++i) if (sp = line.markedSpans[i], 
sp.marker.collapsed && !sp.marker.replacedWith && sp.from == span.to && (null == sp.to || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc, line, sp)) return !0;
}
function detachMarkedSpans(line) {
var spans = line.markedSpans;
if (spans) {
for (var i = 0; i < spans.length; ++i) spans[i].marker.detachLine(line);
line.markedSpans = null;
}
}
function attachMarkedSpans(line, spans) {
if (spans) {
for (var i = 0; i < spans.length; ++i) spans[i].marker.attachLine(line);
line.markedSpans = spans;
}
}
function widgetOperation(f) {
return function() {
var withOp = !this.cm.curOp;
withOp && startOperation(this.cm);
try {
var result = f.apply(this, arguments);
} finally {
withOp && endOperation(this.cm);
}
return result;
};
}
function widgetHeight(widget) {
return null != widget.height ? widget.height :(widget.node.parentNode && 1 == widget.node.parentNode.nodeType || removeChildrenAndAdd(widget.cm.display.measure, elt("div", [ widget.node ], null, "position: relative")), 
widget.height = widget.node.offsetHeight);
}
function addLineWidget(cm, handle, node, options) {
var widget = new LineWidget(cm, node, options);
return widget.noHScroll && (cm.display.alignWidgets = !0), changeLine(cm, handle, function(line) {
var widgets = line.widgets || (line.widgets = []);
if (null == widget.insertAt ? widgets.push(widget) :widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget), 
widget.line = line, !lineIsHidden(cm.doc, line) || widget.showIfHidden) {
var aboveVisible = heightAtLine(cm, line) < cm.doc.scrollTop;
updateLineHeight(line, line.height + widgetHeight(widget)), aboveVisible && addToScrollPos(cm, 0, widget.height), 
cm.curOp.forceUpdate = !0;
}
return !0;
}), widget;
}
function updateLine(line, text, markedSpans, estimateHeight) {
line.text = text, line.stateAfter && (line.stateAfter = null), line.styles && (line.styles = null), 
null != line.order && (line.order = null), detachMarkedSpans(line), attachMarkedSpans(line, markedSpans);
var estHeight = estimateHeight ? estimateHeight(line) :1;
estHeight != line.height && updateLineHeight(line, estHeight);
}
function cleanUpLine(line) {
line.parent = null, detachMarkedSpans(line);
}
function runMode(cm, text, mode, state, f, forceToEnd) {
var flattenSpans = mode.flattenSpans;
null == flattenSpans && (flattenSpans = cm.options.flattenSpans);
var style, curStart = 0, curStyle = null, stream = new StringStream(text, cm.options.tabSize);
for ("" == text && mode.blankLine && mode.blankLine(state); !stream.eol(); ) {
if (stream.pos > cm.options.maxHighlightLength ? (flattenSpans = !1, forceToEnd && processLine(cm, text, state, stream.pos), 
stream.pos = text.length, style = null) :style = mode.token(stream, state), cm.options.addModeClass) {
var mName = CodeMirror.innerMode(mode, state).mode.name;
mName && (style = "m-" + (style ? mName + " " + style :mName));
}
flattenSpans && curStyle == style || (curStart < stream.start && f(stream.start, curStyle), 
curStart = stream.start, curStyle = style), stream.start = stream.pos;
}
for (;curStart < stream.pos; ) {
var pos = Math.min(stream.pos, curStart + 5e4);
f(pos, curStyle), curStart = pos;
}
}
function highlightLine(cm, line, state, forceToEnd) {
var st = [ cm.state.modeGen ];
runMode(cm, line.text, cm.doc.mode, state, function(end, style) {
st.push(end, style);
}, forceToEnd);
for (var o = 0; o < cm.state.overlays.length; ++o) {
var overlay = cm.state.overlays[o], i = 1, at = 0;
runMode(cm, line.text, overlay.mode, !0, function(end, style) {
for (var start = i; end > at; ) {
var i_end = st[i];
i_end > end && st.splice(i, 1, end, st[i + 1], i_end), i += 2, at = Math.min(end, i_end);
}
if (style) if (overlay.opaque) st.splice(start, i - start, end, style), i = start + 2; else for (;i > start; start += 2) {
var cur = st[start + 1];
st[start + 1] = cur ? cur + " " + style :style;
}
});
}
return st;
}
function getLineStyles(cm, line) {
return line.styles && line.styles[0] == cm.state.modeGen || (line.styles = highlightLine(cm, line, line.stateAfter = getStateBefore(cm, lineNo(line)))), 
line.styles;
}
function processLine(cm, text, state, startAt) {
var mode = cm.doc.mode, stream = new StringStream(text, cm.options.tabSize);
for (stream.start = stream.pos = startAt || 0, "" == text && mode.blankLine && mode.blankLine(state); !stream.eol() && stream.pos <= cm.options.maxHighlightLength; ) mode.token(stream, state), 
stream.start = stream.pos;
}
function interpretTokenStyle(style, builder) {
if (!style) return null;
for (;;) {
var lineClass = style.match(/(?:^|\s+)line-(background-)?(\S+)/);
if (!lineClass) break;
style = style.slice(0, lineClass.index) + style.slice(lineClass.index + lineClass[0].length);
var prop = lineClass[1] ? "bgClass" :"textClass";
null == builder[prop] ? builder[prop] = lineClass[2] :new RegExp("(?:^|s)" + lineClass[2] + "(?:$|s)").test(builder[prop]) || (builder[prop] += " " + lineClass[2]);
}
if (/^\s*$/.test(style)) return null;
var cache = builder.cm.options.addModeClass ? styleToClassCacheWithMode :styleToClassCache;
return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
}
function buildLineContent(cm, realLine, measure, copyWidgets) {
for (var merged, line = realLine, empty = !0; merged = collapsedSpanAtStart(line); ) line = getLine(cm.doc, merged.find().from.line);
var builder = {
pre:elt("pre"),
col:0,
pos:0,
measure:null,
measuredSomething:!1,
cm:cm,
copyWidgets:copyWidgets
};
do {
line.text && (empty = !1), builder.measure = line == realLine && measure, builder.pos = 0, 
builder.addToken = builder.measure ? buildTokenMeasure :buildToken, (ie || webkit) && cm.getOption("lineWrapping") && (builder.addToken = buildTokenSplitSpaces(builder.addToken));
var next = insertLineContent(line, builder, getLineStyles(cm, line));
measure && line == realLine && !builder.measuredSomething && (measure[0] = builder.pre.appendChild(zeroWidthElement(cm.display.measure)), 
builder.measuredSomething = !0), next && (line = getLine(cm.doc, next.to.line));
} while (next);
!measure || builder.measuredSomething || measure[0] || (measure[0] = builder.pre.appendChild(empty ? elt("span", "\xa0") :zeroWidthElement(cm.display.measure))), 
builder.pre.firstChild || lineIsHidden(cm.doc, realLine) || builder.pre.appendChild(document.createTextNode("\xa0"));
var order;
if (measure && ie && (order = getOrder(line))) {
var l = order.length - 1;
order[l].from == order[l].to && --l;
var last = order[l], prev = order[l - 1];
if (last.from + 1 == last.to && prev && last.level < prev.level) {
var span = measure[builder.pos - 1];
span && span.parentNode.insertBefore(span.measureRight = zeroWidthElement(cm.display.measure), span.nextSibling);
}
}
var textClass = builder.textClass ? builder.textClass + " " + (realLine.textClass || "") :realLine.textClass;
return textClass && (builder.pre.className = textClass), signal(cm, "renderLine", cm, realLine, builder.pre), 
builder;
}
function defaultSpecialCharPlaceholder(ch) {
var token = elt("span", "\u2022", "cm-invalidchar");
return token.title = "\\u" + ch.charCodeAt(0).toString(16), token;
}
function buildToken(builder, text, style, startStyle, endStyle, title) {
if (text) {
var special = builder.cm.options.specialChars;
if (special.test(text)) for (var content = document.createDocumentFragment(), pos = 0; ;) {
special.lastIndex = pos;
var m = special.exec(text), skipped = m ? m.index - pos :text.length - pos;
if (skipped && (content.appendChild(document.createTextNode(text.slice(pos, pos + skipped))), 
builder.col += skipped), !m) break;
if (pos += skipped + 1, "	" == m[0]) {
var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab")), builder.col += tabWidth;
} else {
var token = builder.cm.options.specialCharPlaceholder(m[0]);
content.appendChild(token), builder.col += 1;
}
} else {
builder.col += text.length;
var content = document.createTextNode(text);
}
if (style || startStyle || endStyle || builder.measure) {
var fullStyle = style || "";
startStyle && (fullStyle += startStyle), endStyle && (fullStyle += endStyle);
var token = elt("span", [ content ], fullStyle);
return title && (token.title = title), builder.pre.appendChild(token);
}
builder.pre.appendChild(content);
}
}
function buildTokenMeasure(builder, text, style, startStyle, endStyle) {
for (var wrapping = builder.cm.options.lineWrapping, i = 0; i < text.length; ++i) {
for (var start = 0 == i, to = i + 1; to < text.length && isExtendingChar(text.charAt(to)); ) ++to;
var ch = text.slice(i, to);
i = to - 1, i && wrapping && spanAffectsWrapping(text, i) && builder.pre.appendChild(elt("wbr"));
var old = builder.measure[builder.pos], span = builder.measure[builder.pos] = buildToken(builder, ch, style, start && startStyle, i == text.length - 1 && endStyle);
old && (span.leftSide = old.leftSide || old), old_ie && wrapping && " " == ch && i && !/\s/.test(text.charAt(i - 1)) && i < text.length - 1 && !/\s/.test(text.charAt(i + 1)) && (span.style.whiteSpace = "normal"), 
builder.pos += ch.length;
}
text.length && (builder.measuredSomething = !0);
}
function buildTokenSplitSpaces(inner) {
function split(old) {
for (var out = " ", i = 0; i < old.length - 2; ++i) out += i % 2 ? " " :"\xa0";
return out += " ";
}
return function(builder, text, style, startStyle, endStyle, title) {
return inner(builder, text.replace(/ {3,}/g, split), style, startStyle, endStyle, title);
};
}
function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
var widget = !ignoreWidget && marker.replacedWith;
if (widget && (builder.copyWidgets && (widget = widget.cloneNode(!0)), builder.pre.appendChild(widget), 
builder.measure)) {
if (size) builder.measure[builder.pos] = widget; else {
var elt = zeroWidthElement(builder.cm.display.measure);
if ("bookmark" != marker.type || marker.insertLeft) {
if (builder.measure[builder.pos]) return;
builder.measure[builder.pos] = builder.pre.insertBefore(elt, widget);
} else builder.measure[builder.pos] = builder.pre.appendChild(elt);
}
builder.measuredSomething = !0;
}
builder.pos += size;
}
function insertLineContent(line, builder, styles) {
var spans = line.markedSpans, allText = line.text, at = 0;
if (spans) for (var style, spanStyle, spanEndStyle, spanStartStyle, title, collapsed, len = allText.length, pos = 0, i = 1, text = "", nextChange = 0; ;) {
if (nextChange == pos) {
spanStyle = spanEndStyle = spanStartStyle = title = "", collapsed = null, nextChange = 1/0;
for (var foundBookmarks = [], j = 0; j < spans.length; ++j) {
var sp = spans[j], m = sp.marker;
sp.from <= pos && (null == sp.to || sp.to > pos) ? (null != sp.to && nextChange > sp.to && (nextChange = sp.to, 
spanEndStyle = ""), m.className && (spanStyle += " " + m.className), m.startStyle && sp.from == pos && (spanStartStyle += " " + m.startStyle), 
m.endStyle && sp.to == nextChange && (spanEndStyle += " " + m.endStyle), m.title && !title && (title = m.title), 
m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0) && (collapsed = sp)) :sp.from > pos && nextChange > sp.from && (nextChange = sp.from), 
"bookmark" == m.type && sp.from == pos && m.replacedWith && foundBookmarks.push(m);
}
if (collapsed && (collapsed.from || 0) == pos && (buildCollapsedSpan(builder, (null == collapsed.to ? len :collapsed.to) - pos, collapsed.marker, null == collapsed.from), 
null == collapsed.to)) return collapsed.marker.find();
if (!collapsed && foundBookmarks.length) for (var j = 0; j < foundBookmarks.length; ++j) buildCollapsedSpan(builder, 0, foundBookmarks[j]);
}
if (pos >= len) break;
for (var upto = Math.min(len, nextChange); ;) {
if (text) {
var end = pos + text.length;
if (!collapsed) {
var tokenText = end > upto ? text.slice(0, upto - pos) :text;
builder.addToken(builder, tokenText, style ? style + spanStyle :spanStyle, spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle :"", title);
}
if (end >= upto) {
text = text.slice(upto - pos), pos = upto;
break;
}
pos = end, spanStartStyle = "";
}
text = allText.slice(at, at = styles[i++]), style = interpretTokenStyle(styles[i++], builder);
}
} else for (var i = 1; i < styles.length; i += 2) builder.addToken(builder, allText.slice(at, at = styles[i]), interpretTokenStyle(styles[i + 1], builder));
}
function updateDoc(doc, change, markedSpans, selAfter, estimateHeight) {
function spansFor(n) {
return markedSpans ? markedSpans[n] :null;
}
function update(line, text, spans) {
updateLine(line, text, spans, estimateHeight), signalLater(line, "change", line, change);
}
var from = change.from, to = change.to, text = change.text, firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line), lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
if (0 != from.ch || 0 != to.ch || "" != lastText || doc.cm && !doc.cm.options.wholeLineUpdateBefore) if (firstLine == lastLine) if (1 == text.length) update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans); else {
for (var added = [], i = 1, e = text.length - 1; e > i; ++i) added.push(new Line(text[i], spansFor(i), estimateHeight));
added.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight)), 
update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0)), doc.insert(from.line + 1, added);
} else if (1 == text.length) update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0)), 
doc.remove(from.line + 1, nlines); else {
update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0)), update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
for (var i = 1, e = text.length - 1, added = []; e > i; ++i) added.push(new Line(text[i], spansFor(i), estimateHeight));
nlines > 1 && doc.remove(from.line + 1, nlines - 1), doc.insert(from.line + 1, added);
} else {
for (var i = 0, e = text.length - 1, added = []; e > i; ++i) added.push(new Line(text[i], spansFor(i), estimateHeight));
update(lastLine, lastLine.text, lastSpans), nlines && doc.remove(from.line, nlines), 
added.length && doc.insert(from.line, added);
}
signalLater(doc, "change", doc, change), setSelection(doc, selAfter.anchor, selAfter.head, null, !0);
}
function LeafChunk(lines) {
this.lines = lines, this.parent = null;
for (var i = 0, e = lines.length, height = 0; e > i; ++i) lines[i].parent = this, 
height += lines[i].height;
this.height = height;
}
function BranchChunk(children) {
this.children = children;
for (var size = 0, height = 0, i = 0, e = children.length; e > i; ++i) {
var ch = children[i];
size += ch.chunkSize(), height += ch.height, ch.parent = this;
}
this.size = size, this.height = height, this.parent = null;
}
function linkedDocs(doc, f, sharedHistOnly) {
function propagate(doc, skip, sharedHist) {
if (doc.linked) for (var i = 0; i < doc.linked.length; ++i) {
var rel = doc.linked[i];
if (rel.doc != skip) {
var shared = sharedHist && rel.sharedHist;
(!sharedHistOnly || shared) && (f(rel.doc, shared), propagate(rel.doc, doc, shared));
}
}
}
propagate(doc, null, !0);
}
function attachDoc(cm, doc) {
if (doc.cm) throw new Error("This document is already in use.");
cm.doc = doc, doc.cm = cm, estimateLineHeights(cm), loadMode(cm), cm.options.lineWrapping || computeMaxLength(cm), 
cm.options.mode = doc.modeOption, regChange(cm);
}
function getLine(chunk, n) {
for (n -= chunk.first; !chunk.lines; ) for (var i = 0; ;++i) {
var child = chunk.children[i], sz = child.chunkSize();
if (sz > n) {
chunk = child;
break;
}
n -= sz;
}
return chunk.lines[n];
}
function getBetween(doc, start, end) {
var out = [], n = start.line;
return doc.iter(start.line, end.line + 1, function(line) {
var text = line.text;
n == end.line && (text = text.slice(0, end.ch)), n == start.line && (text = text.slice(start.ch)), 
out.push(text), ++n;
}), out;
}
function getLines(doc, from, to) {
var out = [];
return doc.iter(from, to, function(line) {
out.push(line.text);
}), out;
}
function updateLineHeight(line, height) {
for (var diff = height - line.height, n = line; n; n = n.parent) n.height += diff;
}
function lineNo(line) {
if (null == line.parent) return null;
for (var cur = line.parent, no = indexOf(cur.lines, line), chunk = cur.parent; chunk; cur = chunk, 
chunk = chunk.parent) for (var i = 0; chunk.children[i] != cur; ++i) no += chunk.children[i].chunkSize();
return no + cur.first;
}
function lineAtHeight(chunk, h) {
var n = chunk.first;
outer:do {
for (var i = 0, e = chunk.children.length; e > i; ++i) {
var child = chunk.children[i], ch = child.height;
if (ch > h) {
chunk = child;
continue outer;
}
h -= ch, n += child.chunkSize();
}
return n;
} while (!chunk.lines);
for (var i = 0, e = chunk.lines.length; e > i; ++i) {
var line = chunk.lines[i], lh = line.height;
if (lh > h) break;
h -= lh;
}
return n + i;
}
function heightAtLine(cm, lineObj) {
lineObj = visualLine(cm.doc, lineObj);
for (var h = 0, chunk = lineObj.parent, i = 0; i < chunk.lines.length; ++i) {
var line = chunk.lines[i];
if (line == lineObj) break;
h += line.height;
}
for (var p = chunk.parent; p; chunk = p, p = chunk.parent) for (var i = 0; i < p.children.length; ++i) {
var cur = p.children[i];
if (cur == chunk) break;
h += cur.height;
}
return h;
}
function getOrder(line) {
var order = line.order;
return null == order && (order = line.order = bidiOrdering(line.text)), order;
}
function makeHistory(startGen) {
return {
done:[],
undone:[],
undoDepth:1/0,
lastTime:0,
lastOp:null,
lastOrigin:null,
generation:startGen || 1,
maxGeneration:startGen || 1
};
}
function attachLocalSpans(doc, change, from, to) {
var existing = change["spans_" + doc.id], n = 0;
doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function(line) {
line.markedSpans && ((existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans), 
++n;
});
}
function historyChangeFromChange(doc, change) {
var from = {
line:change.from.line,
ch:change.from.ch
}, histChange = {
from:from,
to:changeEnd(change),
text:getBetween(doc, change.from, change.to)
};
return attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1), 
linkedDocs(doc, function(doc) {
attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
}, !0), histChange;
}
function addToHistory(doc, change, selAfter, opId) {
var hist = doc.history;
hist.undone.length = 0;
var time = +new Date(), cur = lst(hist.done);
if (cur && (hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && ("+" == change.origin.charAt(0) && doc.cm && hist.lastTime > time - doc.cm.options.historyEventDelay || "*" == change.origin.charAt(0)))) {
var last = lst(cur.changes);
posEq(change.from, change.to) && posEq(change.from, last.to) ? last.to = changeEnd(change) :cur.changes.push(historyChangeFromChange(doc, change)), 
cur.anchorAfter = selAfter.anchor, cur.headAfter = selAfter.head;
} else for (cur = {
changes:[ historyChangeFromChange(doc, change) ],
generation:hist.generation,
anchorBefore:doc.sel.anchor,
headBefore:doc.sel.head,
anchorAfter:selAfter.anchor,
headAfter:selAfter.head
}, hist.done.push(cur); hist.done.length > hist.undoDepth; ) hist.done.shift();
hist.generation = ++hist.maxGeneration, hist.lastTime = time, hist.lastOp = opId, 
hist.lastOrigin = change.origin, last || signal(doc, "historyAdded");
}
function removeClearedSpans(spans) {
if (!spans) return null;
for (var out, i = 0; i < spans.length; ++i) spans[i].marker.explicitlyCleared ? out || (out = spans.slice(0, i)) :out && out.push(spans[i]);
return out ? out.length ? out :null :spans;
}
function getOldSpans(doc, change) {
var found = change["spans_" + doc.id];
if (!found) return null;
for (var i = 0, nw = []; i < change.text.length; ++i) nw.push(removeClearedSpans(found[i]));
return nw;
}
function copyHistoryArray(events, newGroup) {
for (var i = 0, copy = []; i < events.length; ++i) {
var event = events[i], changes = event.changes, newChanges = [];
copy.push({
changes:newChanges,
anchorBefore:event.anchorBefore,
headBefore:event.headBefore,
anchorAfter:event.anchorAfter,
headAfter:event.headAfter
});
for (var j = 0; j < changes.length; ++j) {
var m, change = changes[j];
if (newChanges.push({
from:change.from,
to:change.to,
text:change.text
}), newGroup) for (var prop in change) (m = prop.match(/^spans_(\d+)$/)) && indexOf(newGroup, Number(m[1])) > -1 && (lst(newChanges)[prop] = change[prop], 
delete change[prop]);
}
}
return copy;
}
function rebaseHistSel(pos, from, to, diff) {
to < pos.line ? pos.line += diff :from < pos.line && (pos.line = from, pos.ch = 0);
}
function rebaseHistArray(array, from, to, diff) {
for (var i = 0; i < array.length; ++i) {
for (var sub = array[i], ok = !0, j = 0; j < sub.changes.length; ++j) {
var cur = sub.changes[j];
if (sub.copied || (cur.from = copyPos(cur.from), cur.to = copyPos(cur.to)), to < cur.from.line) cur.from.line += diff, 
cur.to.line += diff; else if (from <= cur.to.line) {
ok = !1;
break;
}
}
sub.copied || (sub.anchorBefore = copyPos(sub.anchorBefore), sub.headBefore = copyPos(sub.headBefore), 
sub.anchorAfter = copyPos(sub.anchorAfter), sub.readAfter = copyPos(sub.headAfter), 
sub.copied = !0), ok ? (rebaseHistSel(sub.anchorBefore), rebaseHistSel(sub.headBefore), 
rebaseHistSel(sub.anchorAfter), rebaseHistSel(sub.headAfter)) :(array.splice(0, i + 1), 
i = 0);
}
}
function rebaseHist(hist, change) {
var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
rebaseHistArray(hist.done, from, to, diff), rebaseHistArray(hist.undone, from, to, diff);
}
function stopMethod() {
e_stop(this);
}
function addStop(event) {
return event.stop || (event.stop = stopMethod), event;
}
function e_preventDefault(e) {
e.preventDefault ? e.preventDefault() :e.returnValue = !1;
}
function e_stopPropagation(e) {
e.stopPropagation ? e.stopPropagation() :e.cancelBubble = !0;
}
function e_defaultPrevented(e) {
return null != e.defaultPrevented ? e.defaultPrevented :0 == e.returnValue;
}
function e_stop(e) {
e_preventDefault(e), e_stopPropagation(e);
}
function e_target(e) {
return e.target || e.srcElement;
}
function e_button(e) {
var b = e.which;
return null == b && (1 & e.button ? b = 1 :2 & e.button ? b = 3 :4 & e.button && (b = 2)), 
mac && e.ctrlKey && 1 == b && (b = 3), b;
}
function on(emitter, type, f) {
if (emitter.addEventListener) emitter.addEventListener(type, f, !1); else if (emitter.attachEvent) emitter.attachEvent("on" + type, f); else {
var map = emitter._handlers || (emitter._handlers = {}), arr = map[type] || (map[type] = []);
arr.push(f);
}
}
function off(emitter, type, f) {
if (emitter.removeEventListener) emitter.removeEventListener(type, f, !1); else if (emitter.detachEvent) emitter.detachEvent("on" + type, f); else {
var arr = emitter._handlers && emitter._handlers[type];
if (!arr) return;
for (var i = 0; i < arr.length; ++i) if (arr[i] == f) {
arr.splice(i, 1);
break;
}
}
}
function signal(emitter, type) {
var arr = emitter._handlers && emitter._handlers[type];
if (arr) for (var args = Array.prototype.slice.call(arguments, 2), i = 0; i < arr.length; ++i) arr[i].apply(null, args);
}
function signalLater(emitter, type) {
function bnd(f) {
return function() {
f.apply(null, args);
};
}
var arr = emitter._handlers && emitter._handlers[type];
if (arr) {
var args = Array.prototype.slice.call(arguments, 2);
delayedCallbacks || (++delayedCallbackDepth, delayedCallbacks = [], setTimeout(fireDelayed, 0));
for (var i = 0; i < arr.length; ++i) delayedCallbacks.push(bnd(arr[i]));
}
}
function signalDOMEvent(cm, e, override) {
return signal(cm, override || e.type, cm, e), e_defaultPrevented(e) || e.codemirrorIgnore;
}
function fireDelayed() {
--delayedCallbackDepth;
var delayed = delayedCallbacks;
delayedCallbacks = null;
for (var i = 0; i < delayed.length; ++i) delayed[i]();
}
function hasHandler(emitter, type) {
var arr = emitter._handlers && emitter._handlers[type];
return arr && arr.length > 0;
}
function eventMixin(ctor) {
ctor.prototype.on = function(type, f) {
on(this, type, f);
}, ctor.prototype.off = function(type, f) {
off(this, type, f);
};
}
function Delayed() {
this.id = null;
}
function countColumn(string, end, tabSize, startIndex, startValue) {
null == end && (end = string.search(/[^\s\u00a0]/), -1 == end && (end = string.length));
for (var i = startIndex || 0, n = startValue || 0; end > i; ++i) "	" == string.charAt(i) ? n += tabSize - n % tabSize :++n;
return n;
}
function spaceStr(n) {
for (;spaceStrs.length <= n; ) spaceStrs.push(lst(spaceStrs) + " ");
return spaceStrs[n];
}
function lst(arr) {
return arr[arr.length - 1];
}
function selectInput(node) {
if (ios) node.selectionStart = 0, node.selectionEnd = node.value.length; else try {
node.select();
} catch (_e) {}
}
function indexOf(collection, elt) {
if (collection.indexOf) return collection.indexOf(elt);
for (var i = 0, e = collection.length; e > i; ++i) if (collection[i] == elt) return i;
return -1;
}
function createObj(base, props) {
function Obj() {}
Obj.prototype = base;
var inst = new Obj();
return props && copyObj(props, inst), inst;
}
function copyObj(obj, target) {
target || (target = {});
for (var prop in obj) obj.hasOwnProperty(prop) && (target[prop] = obj[prop]);
return target;
}
function emptyArray(size) {
for (var a = [], i = 0; size > i; ++i) a.push(void 0);
return a;
}
function bind(f) {
var args = Array.prototype.slice.call(arguments, 1);
return function() {
return f.apply(null, args);
};
}
function isWordChar(ch) {
return /\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
}
function isEmpty(obj) {
for (var n in obj) if (obj.hasOwnProperty(n) && obj[n]) return !1;
return !0;
}
function isExtendingChar(ch) {
return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
}
function elt(tag, content, className, style) {
var e = document.createElement(tag);
if (className && (e.className = className), style && (e.style.cssText = style), 
"string" == typeof content) setTextContent(e, content); else if (content) for (var i = 0; i < content.length; ++i) e.appendChild(content[i]);
return e;
}
function removeChildren(e) {
for (var count = e.childNodes.length; count > 0; --count) e.removeChild(e.firstChild);
return e;
}
function removeChildrenAndAdd(parent, e) {
return removeChildren(parent).appendChild(e);
}
function setTextContent(e, str) {
ie_lt9 ? (e.innerHTML = "", e.appendChild(document.createTextNode(str))) :e.textContent = str;
}
function getRect(node) {
return node.getBoundingClientRect();
}
function spanAffectsWrapping() {
return !1;
}
function scrollbarWidth(measure) {
if (null != knownScrollbarWidth) return knownScrollbarWidth;
var test = elt("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
return removeChildrenAndAdd(measure, test), test.offsetWidth && (knownScrollbarWidth = test.offsetHeight - test.clientHeight), 
knownScrollbarWidth || 0;
}
function zeroWidthElement(measure) {
if (null == zwspSupported) {
var test = elt("span", "\u200b");
removeChildrenAndAdd(measure, elt("span", [ test, document.createTextNode("x") ])), 
0 != measure.firstChild.offsetHeight && (zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !ie_lt8);
}
return zwspSupported ? elt("span", "\u200b") :elt("span", "\xa0", null, "display: inline-block; width: 1px; margin-right: -1px");
}
function iterateBidiSections(order, from, to, f) {
if (!order) return f(from, to, "ltr");
for (var found = !1, i = 0; i < order.length; ++i) {
var part = order[i];
(part.from < to && part.to > from || from == to && part.to == from) && (f(Math.max(part.from, from), Math.min(part.to, to), 1 == part.level ? "rtl" :"ltr"), 
found = !0);
}
found || f(from, to, "ltr");
}
function bidiLeft(part) {
return part.level % 2 ? part.to :part.from;
}
function bidiRight(part) {
return part.level % 2 ? part.from :part.to;
}
function lineLeft(line) {
var order = getOrder(line);
return order ? bidiLeft(order[0]) :0;
}
function lineRight(line) {
var order = getOrder(line);
return order ? bidiRight(lst(order)) :line.text.length;
}
function lineStart(cm, lineN) {
var line = getLine(cm.doc, lineN), visual = visualLine(cm.doc, line);
visual != line && (lineN = lineNo(visual));
var order = getOrder(visual), ch = order ? order[0].level % 2 ? lineRight(visual) :lineLeft(visual) :0;
return Pos(lineN, ch);
}
function lineEnd(cm, lineN) {
for (var merged, line; merged = collapsedSpanAtEnd(line = getLine(cm.doc, lineN)); ) lineN = merged.find().to.line;
var order = getOrder(line), ch = order ? order[0].level % 2 ? lineLeft(line) :lineRight(line) :line.text.length;
return Pos(lineN, ch);
}
function compareBidiLevel(order, a, b) {
var linedir = order[0].level;
return a == linedir ? !0 :b == linedir ? !1 :b > a;
}
function getBidiPartAt(order, pos) {
bidiOther = null;
for (var found, i = 0; i < order.length; ++i) {
var cur = order[i];
if (cur.from < pos && cur.to > pos) return i;
if (cur.from == pos || cur.to == pos) {
if (null != found) return compareBidiLevel(order, cur.level, order[found].level) ? (cur.from != cur.to && (bidiOther = found), 
i) :(cur.from != cur.to && (bidiOther = i), found);
found = i;
}
}
return found;
}
function moveInLine(line, pos, dir, byUnit) {
if (!byUnit) return pos + dir;
do pos += dir; while (pos > 0 && isExtendingChar(line.text.charAt(pos)));
return pos;
}
function moveVisually(line, start, dir, byUnit) {
var bidi = getOrder(line);
if (!bidi) return moveLogically(line, start, dir, byUnit);
for (var pos = getBidiPartAt(bidi, start), part = bidi[pos], target = moveInLine(line, start, part.level % 2 ? -dir :dir, byUnit); ;) {
if (target > part.from && target < part.to) return target;
if (target == part.from || target == part.to) return getBidiPartAt(bidi, target) == pos ? target :(part = bidi[pos += dir], 
dir > 0 == part.level % 2 ? part.to :part.from);
if (part = bidi[pos += dir], !part) return null;
target = dir > 0 == part.level % 2 ? moveInLine(line, part.to, -1, byUnit) :moveInLine(line, part.from, 1, byUnit);
}
}
function moveLogically(line, start, dir, byUnit) {
var target = start + dir;
if (byUnit) for (;target > 0 && isExtendingChar(line.text.charAt(target)); ) target += dir;
return 0 > target || target > line.text.length ? null :target;
}
var gecko = /gecko\/\d/i.test(navigator.userAgent), old_ie = /MSIE \d/.test(navigator.userAgent), ie_lt8 = old_ie && (null == document.documentMode || document.documentMode < 8), ie_lt9 = old_ie && (null == document.documentMode || document.documentMode < 9), ie_lt10 = old_ie && (null == document.documentMode || document.documentMode < 10), ie_gt10 = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent), ie = old_ie || ie_gt10, webkit = /WebKit\//.test(navigator.userAgent), qtwebkit = webkit && /Qt\/\d+\.\d+/.test(navigator.userAgent), chrome = /Chrome\//.test(navigator.userAgent), opera = /Opera\//.test(navigator.userAgent), safari = /Apple Computer/.test(navigator.vendor), khtml = /KHTML\//.test(navigator.userAgent), mac_geLion = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent), mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent), phantom = /PhantomJS/.test(navigator.userAgent), ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent), mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent), mac = ios || /Mac/.test(navigator.platform), windows = /win/i.test(navigator.platform), opera_version = opera && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
opera_version && (opera_version = Number(opera_version[1])), opera_version && opera_version >= 15 && (opera = !1, 
webkit = !0);
var measureText, lastClick, lastDoubleClick, flipCtrlCmd = mac && (qtwebkit || opera && (null == opera_version || 12.11 > opera_version)), captureMiddleClick = gecko || ie && !ie_lt9, sawReadOnlySpans = !1, sawCollapsedSpans = !1, nextOpId = 0, lastDrop = 0, wheelSamples = 0, wheelPixelsPerUnit = null;
ie ? wheelPixelsPerUnit = -.53 :gecko ? wheelPixelsPerUnit = 15 :chrome ? wheelPixelsPerUnit = -.7 :safari && (wheelPixelsPerUnit = -1 / 3);
var maybeTransition, detectingSelectAll, lastStoppedKey = null, changeEnd = CodeMirror.changeEnd = function(change) {
return change.text ? Pos(change.from.line + change.text.length - 1, lst(change.text).length + (1 == change.text.length ? change.from.ch :0)) :change.to;
};
CodeMirror.Pos = Pos, CodeMirror.prototype = {
constructor:CodeMirror,
focus:function() {
window.focus(), focusInput(this), fastPoll(this);
},
setOption:function(option, value) {
var options = this.options, old = options[option];
(options[option] != value || "mode" == option) && (options[option] = value, optionHandlers.hasOwnProperty(option) && operation(this, optionHandlers[option])(this, value, old));
},
getOption:function(option) {
return this.options[option];
},
getDoc:function() {
return this.doc;
},
addKeyMap:function(map, bottom) {
this.state.keyMaps[bottom ? "push" :"unshift"](map);
},
removeKeyMap:function(map) {
for (var maps = this.state.keyMaps, i = 0; i < maps.length; ++i) if (maps[i] == map || "string" != typeof maps[i] && maps[i].name == map) return maps.splice(i, 1), 
!0;
},
addOverlay:operation(null, function(spec, options) {
var mode = spec.token ? spec :CodeMirror.getMode(this.options, spec);
if (mode.startState) throw new Error("Overlays may not be stateful.");
this.state.overlays.push({
mode:mode,
modeSpec:spec,
opaque:options && options.opaque
}), this.state.modeGen++, regChange(this);
}),
removeOverlay:operation(null, function(spec) {
for (var overlays = this.state.overlays, i = 0; i < overlays.length; ++i) {
var cur = overlays[i].modeSpec;
if (cur == spec || "string" == typeof spec && cur.name == spec) return overlays.splice(i, 1), 
this.state.modeGen++, regChange(this), void 0;
}
}),
indentLine:operation(null, function(n, dir, aggressive) {
"string" != typeof dir && "number" != typeof dir && (dir = null == dir ? this.options.smartIndent ? "smart" :"prev" :dir ? "add" :"subtract"), 
isLine(this.doc, n) && indentLine(this, n, dir, aggressive);
}),
indentSelection:operation(null, function(how) {
var sel = this.doc.sel;
if (posEq(sel.from, sel.to)) return indentLine(this, sel.from.line, how, !0);
for (var e = sel.to.line - (sel.to.ch ? 0 :1), i = sel.from.line; e >= i; ++i) indentLine(this, i, how);
}),
getTokenAt:function(pos, precise) {
var doc = this.doc;
pos = clipPos(doc, pos);
for (var state = getStateBefore(this, pos.line, precise), mode = this.doc.mode, line = getLine(doc, pos.line), stream = new StringStream(line.text, this.options.tabSize); stream.pos < pos.ch && !stream.eol(); ) {
stream.start = stream.pos;
var style = mode.token(stream, state);
}
return {
start:stream.start,
end:stream.pos,
string:stream.current(),
className:style || null,
type:style || null,
state:state
};
},
getTokenTypeAt:function(pos) {
pos = clipPos(this.doc, pos);
var styles = getLineStyles(this, getLine(this.doc, pos.line)), before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
if (0 == ch) return styles[2];
for (;;) {
var mid = before + after >> 1;
if ((mid ? styles[2 * mid - 1] :0) >= ch) after = mid; else {
if (!(styles[2 * mid + 1] < ch)) return styles[2 * mid + 2];
before = mid + 1;
}
}
},
getModeAt:function(pos) {
var mode = this.doc.mode;
return mode.innerMode ? CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode :mode;
},
getHelper:function(pos, type) {
return this.getHelpers(pos, type)[0];
},
getHelpers:function(pos, type) {
var found = [];
if (!helpers.hasOwnProperty(type)) return helpers;
var help = helpers[type], mode = this.getModeAt(pos);
if ("string" == typeof mode[type]) help[mode[type]] && found.push(help[mode[type]]); else if (mode[type]) for (var i = 0; i < mode[type].length; i++) {
var val = help[mode[type][i]];
val && found.push(val);
} else mode.helperType && help[mode.helperType] ? found.push(help[mode.helperType]) :help[mode.name] && found.push(help[mode.name]);
for (var i = 0; i < help._global.length; i++) {
var cur = help._global[i];
cur.pred(mode, this) && -1 == indexOf(found, cur.val) && found.push(cur.val);
}
return found;
},
getStateAfter:function(line, precise) {
var doc = this.doc;
return line = clipLine(doc, null == line ? doc.first + doc.size - 1 :line), getStateBefore(this, line + 1, precise);
},
cursorCoords:function(start, mode) {
var pos, sel = this.doc.sel;
return pos = null == start ? sel.head :"object" == typeof start ? clipPos(this.doc, start) :start ? sel.from :sel.to, 
cursorCoords(this, pos, mode || "page");
},
charCoords:function(pos, mode) {
return charCoords(this, clipPos(this.doc, pos), mode || "page");
},
coordsChar:function(coords, mode) {
return coords = fromCoordSystem(this, coords, mode || "page"), coordsChar(this, coords.left, coords.top);
},
lineAtHeight:function(height, mode) {
return height = fromCoordSystem(this, {
top:height,
left:0
}, mode || "page").top, lineAtHeight(this.doc, height + this.display.viewOffset);
},
heightAtLine:function(line, mode) {
var end = !1, last = this.doc.first + this.doc.size - 1;
line < this.doc.first ? line = this.doc.first :line > last && (line = last, end = !0);
var lineObj = getLine(this.doc, line);
return intoCoordSystem(this, getLine(this.doc, line), {
top:0,
left:0
}, mode || "page").top + (end ? lineObj.height :0);
},
defaultTextHeight:function() {
return textHeight(this.display);
},
defaultCharWidth:function() {
return charWidth(this.display);
},
setGutterMarker:operation(null, function(line, gutterID, value) {
return changeLine(this, line, function(line) {
var markers = line.gutterMarkers || (line.gutterMarkers = {});
return markers[gutterID] = value, !value && isEmpty(markers) && (line.gutterMarkers = null), 
!0;
});
}),
clearGutter:operation(null, function(gutterID) {
var cm = this, doc = cm.doc, i = doc.first;
doc.iter(function(line) {
line.gutterMarkers && line.gutterMarkers[gutterID] && (line.gutterMarkers[gutterID] = null, 
regChange(cm, i, i + 1), isEmpty(line.gutterMarkers) && (line.gutterMarkers = null)), 
++i;
});
}),
addLineClass:operation(null, function(handle, where, cls) {
return changeLine(this, handle, function(line) {
var prop = "text" == where ? "textClass" :"background" == where ? "bgClass" :"wrapClass";
if (line[prop]) {
if (new RegExp("(?:^|\\s)" + cls + "(?:$|\\s)").test(line[prop])) return !1;
line[prop] += " " + cls;
} else line[prop] = cls;
return !0;
});
}),
removeLineClass:operation(null, function(handle, where, cls) {
return changeLine(this, handle, function(line) {
var prop = "text" == where ? "textClass" :"background" == where ? "bgClass" :"wrapClass", cur = line[prop];
if (!cur) return !1;
if (null == cls) line[prop] = null; else {
var found = cur.match(new RegExp("(?:^|\\s+)" + cls + "(?:$|\\s+)"));
if (!found) return !1;
var end = found.index + found[0].length;
line[prop] = cur.slice(0, found.index) + (found.index && end != cur.length ? " " :"") + cur.slice(end) || null;
}
return !0;
});
}),
addLineWidget:operation(null, function(handle, node, options) {
return addLineWidget(this, handle, node, options);
}),
removeLineWidget:function(widget) {
widget.clear();
},
lineInfo:function(line) {
if ("number" == typeof line) {
if (!isLine(this.doc, line)) return null;
var n = line;
if (line = getLine(this.doc, line), !line) return null;
} else {
var n = lineNo(line);
if (null == n) return null;
}
return {
line:n,
handle:line,
text:line.text,
gutterMarkers:line.gutterMarkers,
textClass:line.textClass,
bgClass:line.bgClass,
wrapClass:line.wrapClass,
widgets:line.widgets
};
},
getViewport:function() {
return {
from:this.display.showingFrom,
to:this.display.showingTo
};
},
addWidget:function(pos, node, scroll, vert, horiz) {
var display = this.display;
pos = cursorCoords(this, clipPos(this.doc, pos));
var top = pos.bottom, left = pos.left;
if (node.style.position = "absolute", display.sizer.appendChild(node), "over" == vert) top = pos.top; else if ("above" == vert || "near" == vert) {
var vspace = Math.max(display.wrapper.clientHeight, this.doc.height), hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
("above" == vert || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight ? top = pos.top - node.offsetHeight :pos.bottom + node.offsetHeight <= vspace && (top = pos.bottom), 
left + node.offsetWidth > hspace && (left = hspace - node.offsetWidth);
}
node.style.top = top + "px", node.style.left = node.style.right = "", "right" == horiz ? (left = display.sizer.clientWidth - node.offsetWidth, 
node.style.right = "0px") :("left" == horiz ? left = 0 :"middle" == horiz && (left = (display.sizer.clientWidth - node.offsetWidth) / 2), 
node.style.left = left + "px"), scroll && scrollIntoView(this, left, top, left + node.offsetWidth, top + node.offsetHeight);
},
triggerOnKeyDown:operation(null, onKeyDown),
triggerOnKeyPress:operation(null, onKeyPress),
triggerOnKeyUp:operation(null, onKeyUp),
execCommand:function(cmd) {
return commands.hasOwnProperty(cmd) ? commands[cmd](this) :void 0;
},
findPosH:function(from, amount, unit, visually) {
var dir = 1;
0 > amount && (dir = -1, amount = -amount);
for (var i = 0, cur = clipPos(this.doc, from); amount > i && (cur = findPosH(this.doc, cur, dir, unit, visually), 
!cur.hitSide); ++i) ;
return cur;
},
moveH:operation(null, function(dir, unit) {
var pos, sel = this.doc.sel;
pos = sel.shift || sel.extend || posEq(sel.from, sel.to) ? findPosH(this.doc, sel.head, dir, unit, this.options.rtlMoveVisually) :0 > dir ? sel.from :sel.to, 
extendSelection(this.doc, pos, pos, dir);
}),
deleteH:operation(null, function(dir, unit) {
var sel = this.doc.sel;
posEq(sel.from, sel.to) ? replaceRange(this.doc, "", sel.from, findPosH(this.doc, sel.head, dir, unit, !1), "+delete") :replaceRange(this.doc, "", sel.from, sel.to, "+delete"), 
this.curOp.userSelChange = !0;
}),
findPosV:function(from, amount, unit, goalColumn) {
var dir = 1, x = goalColumn;
0 > amount && (dir = -1, amount = -amount);
for (var i = 0, cur = clipPos(this.doc, from); amount > i; ++i) {
var coords = cursorCoords(this, cur, "div");
if (null == x ? x = coords.left :coords.left = x, cur = findPosV(this, coords, dir, unit), 
cur.hitSide) break;
}
return cur;
},
moveV:operation(null, function(dir, unit) {
var target, goal, sel = this.doc.sel;
if (sel.shift || sel.extend || posEq(sel.from, sel.to)) {
var pos = cursorCoords(this, sel.head, "div");
null != sel.goalColumn && (pos.left = sel.goalColumn), target = findPosV(this, pos, dir, unit), 
"page" == unit && addToScrollPos(this, 0, charCoords(this, target, "div").top - pos.top), 
goal = pos.left;
} else target = 0 > dir ? sel.from :sel.to;
extendSelection(this.doc, target, target, dir), null != goal && (sel.goalColumn = goal);
}),
toggleOverwrite:function(value) {
(null == value || value != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? this.display.cursor.className += " CodeMirror-overwrite" :this.display.cursor.className = this.display.cursor.className.replace(" CodeMirror-overwrite", ""), 
signal(this, "overwriteToggle", this, this.state.overwrite));
},
hasFocus:function() {
return document.activeElement == this.display.input;
},
scrollTo:operation(null, function(x, y) {
updateScrollPos(this, x, y);
}),
getScrollInfo:function() {
var scroller = this.display.scroller, co = scrollerCutOff;
return {
left:scroller.scrollLeft,
top:scroller.scrollTop,
height:scroller.scrollHeight - co,
width:scroller.scrollWidth - co,
clientHeight:scroller.clientHeight - co,
clientWidth:scroller.clientWidth - co
};
},
scrollIntoView:operation(null, function(range, margin) {
null == range ? range = {
from:this.doc.sel.head,
to:null
} :"number" == typeof range ? range = {
from:Pos(range, 0),
to:null
} :null == range.from && (range = {
from:range,
to:null
}), range.to || (range.to = range.from), margin || (margin = 0);
var coords = range;
null != range.from.line && (this.curOp.scrollToPos = {
from:range.from,
to:range.to,
margin:margin
}, coords = {
from:cursorCoords(this, range.from),
to:cursorCoords(this, range.to)
});
var sPos = calculateScrollPos(this, Math.min(coords.from.left, coords.to.left), Math.min(coords.from.top, coords.to.top) - margin, Math.max(coords.from.right, coords.to.right), Math.max(coords.from.bottom, coords.to.bottom) + margin);
updateScrollPos(this, sPos.scrollLeft, sPos.scrollTop);
}),
setSize:operation(null, function(width, height) {
function interpret(val) {
return "number" == typeof val || /^\d+$/.test(String(val)) ? val + "px" :val;
}
null != width && (this.display.wrapper.style.width = interpret(width)), null != height && (this.display.wrapper.style.height = interpret(height)), 
this.options.lineWrapping && (this.display.measureLineCache.length = this.display.measureLineCachePos = 0), 
this.curOp.forceUpdate = !0, signal(this, "refresh", this);
}),
operation:function(f) {
return runInOp(this, f);
},
refresh:operation(null, function() {
var oldHeight = this.display.cachedTextHeight;
clearCaches(this), updateScrollPos(this, this.doc.scrollLeft, this.doc.scrollTop), 
regChange(this), (null == oldHeight || Math.abs(oldHeight - textHeight(this.display)) > .5) && estimateLineHeights(this), 
signal(this, "refresh", this);
}),
swapDoc:operation(null, function(doc) {
var old = this.doc;
return old.cm = null, attachDoc(this, doc), clearCaches(this), resetInput(this, !0), 
updateScrollPos(this, doc.scrollLeft, doc.scrollTop), signalLater(this, "swapDoc", this, old), 
old;
}),
getInputField:function() {
return this.display.input;
},
getWrapperElement:function() {
return this.display.wrapper;
},
getScrollerElement:function() {
return this.display.scroller;
},
getGutterElement:function() {
return this.display.gutters;
}
}, eventMixin(CodeMirror);
var optionHandlers = CodeMirror.optionHandlers = {}, defaults = CodeMirror.defaults = {}, Init = CodeMirror.Init = {
toString:function() {
return "CodeMirror.Init";
}
};
option("value", "", function(cm, val) {
cm.setValue(val);
}, !0), option("mode", null, function(cm, val) {
cm.doc.modeOption = val, loadMode(cm);
}, !0), option("indentUnit", 2, loadMode, !0), option("indentWithTabs", !1), option("smartIndent", !0), 
option("tabSize", 4, function(cm) {
resetModeState(cm), clearCaches(cm), regChange(cm);
}, !0), option("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function(cm, val) {
cm.options.specialChars = new RegExp(val.source + (val.test("	") ? "" :"|	"), "g"), 
cm.refresh();
}, !0), option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm) {
cm.refresh();
}, !0), option("electricChars", !0), option("rtlMoveVisually", !windows), option("wholeLineUpdateBefore", !0), 
option("theme", "default", function(cm) {
themeChanged(cm), guttersChanged(cm);
}, !0), option("keyMap", "default", keyMapChanged), option("extraKeys", null), option("onKeyEvent", null), 
option("onDragEvent", null), option("lineWrapping", !1, wrappingChanged, !0), option("gutters", [], function(cm) {
setGuttersForLineNumbers(cm.options), guttersChanged(cm);
}, !0), option("fixedGutter", !0, function(cm, val) {
cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" :"0", 
cm.refresh();
}, !0), option("coverGutterNextToScrollbar", !1, updateScrollbars, !0), option("lineNumbers", !1, function(cm) {
setGuttersForLineNumbers(cm.options), guttersChanged(cm);
}, !0), option("firstLineNumber", 1, guttersChanged, !0), option("lineNumberFormatter", function(integer) {
return integer;
}, guttersChanged, !0), option("showCursorWhenSelecting", !1, updateSelection, !0), 
option("resetSelectionOnContextMenu", !0), option("readOnly", !1, function(cm, val) {
"nocursor" == val ? (onBlur(cm), cm.display.input.blur(), cm.display.disabled = !0) :(cm.display.disabled = !1, 
val || resetInput(cm, !0));
}), option("disableInput", !1, function(cm, val) {
val || resetInput(cm, !0);
}, !0), option("dragDrop", !0), option("cursorBlinkRate", 530), option("cursorScrollMargin", 0), 
option("cursorHeight", 1), option("workTime", 100), option("workDelay", 100), option("flattenSpans", !0, resetModeState, !0), 
option("addModeClass", !1, resetModeState, !0), option("pollInterval", 100), option("undoDepth", 40, function(cm, val) {
cm.doc.history.undoDepth = val;
}), option("historyEventDelay", 500), option("viewportMargin", 10, function(cm) {
cm.refresh();
}, !0), option("maxHighlightLength", 1e4, resetModeState, !0), option("crudeMeasuringFrom", 1e4), 
option("moveInputWithCursor", !0, function(cm, val) {
val || (cm.display.inputDiv.style.top = cm.display.inputDiv.style.left = 0);
}), option("tabindex", null, function(cm, val) {
cm.display.input.tabIndex = val || "";
}), option("autofocus", null);
var modes = CodeMirror.modes = {}, mimeModes = CodeMirror.mimeModes = {};
CodeMirror.defineMode = function(name, mode) {
if (CodeMirror.defaults.mode || "null" == name || (CodeMirror.defaults.mode = name), 
arguments.length > 2) {
mode.dependencies = [];
for (var i = 2; i < arguments.length; ++i) mode.dependencies.push(arguments[i]);
}
modes[name] = mode;
}, CodeMirror.defineMIME = function(mime, spec) {
mimeModes[mime] = spec;
}, CodeMirror.resolveMode = function(spec) {
if ("string" == typeof spec && mimeModes.hasOwnProperty(spec)) spec = mimeModes[spec]; else if (spec && "string" == typeof spec.name && mimeModes.hasOwnProperty(spec.name)) {
var found = mimeModes[spec.name];
"string" == typeof found && (found = {
name:found
}), spec = createObj(found, spec), spec.name = found.name;
} else if ("string" == typeof spec && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) return CodeMirror.resolveMode("application/xml");
return "string" == typeof spec ? {
name:spec
} :spec || {
name:"null"
};
}, CodeMirror.getMode = function(options, spec) {
var spec = CodeMirror.resolveMode(spec), mfactory = modes[spec.name];
if (!mfactory) return CodeMirror.getMode(options, "text/plain");
var modeObj = mfactory(options, spec);
if (modeExtensions.hasOwnProperty(spec.name)) {
var exts = modeExtensions[spec.name];
for (var prop in exts) exts.hasOwnProperty(prop) && (modeObj.hasOwnProperty(prop) && (modeObj["_" + prop] = modeObj[prop]), 
modeObj[prop] = exts[prop]);
}
if (modeObj.name = spec.name, spec.helperType && (modeObj.helperType = spec.helperType), 
spec.modeProps) for (var prop in spec.modeProps) modeObj[prop] = spec.modeProps[prop];
return modeObj;
}, CodeMirror.defineMode("null", function() {
return {
token:function(stream) {
stream.skipToEnd();
}
};
}), CodeMirror.defineMIME("text/plain", "null");
var modeExtensions = CodeMirror.modeExtensions = {};
CodeMirror.extendMode = function(mode, properties) {
var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] :modeExtensions[mode] = {};
copyObj(properties, exts);
}, CodeMirror.defineExtension = function(name, func) {
CodeMirror.prototype[name] = func;
}, CodeMirror.defineDocExtension = function(name, func) {
Doc.prototype[name] = func;
}, CodeMirror.defineOption = option;
var initHooks = [];
CodeMirror.defineInitHook = function(f) {
initHooks.push(f);
};
var helpers = CodeMirror.helpers = {};
CodeMirror.registerHelper = function(type, name, value) {
helpers.hasOwnProperty(type) || (helpers[type] = CodeMirror[type] = {
_global:[]
}), helpers[type][name] = value;
}, CodeMirror.registerGlobalHelper = function(type, name, predicate, value) {
CodeMirror.registerHelper(type, name, value), helpers[type]._global.push({
pred:predicate,
val:value
});
}, CodeMirror.isWordChar = isWordChar, CodeMirror.copyState = copyState, CodeMirror.startState = startState, 
CodeMirror.innerMode = function(mode, state) {
for (;mode.innerMode; ) {
var info = mode.innerMode(state);
if (!info || info.mode == mode) break;
state = info.state, mode = info.mode;
}
return info || {
mode:mode,
state:state
};
};
var commands = CodeMirror.commands = {
selectAll:function(cm) {
cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()));
},
killLine:function(cm) {
var from = cm.getCursor(!0), to = cm.getCursor(!1), sel = !posEq(from, to);
sel || cm.getLine(from.line).length != from.ch ? cm.replaceRange("", from, sel ? to :Pos(from.line), "+delete") :cm.replaceRange("", from, Pos(from.line + 1, 0), "+delete");
},
deleteLine:function(cm) {
var l = cm.getCursor().line;
cm.replaceRange("", Pos(l, 0), Pos(l + 1, 0), "+delete");
},
delLineLeft:function(cm) {
var cur = cm.getCursor();
cm.replaceRange("", Pos(cur.line, 0), cur, "+delete");
},
undo:function(cm) {
cm.undo();
},
redo:function(cm) {
cm.redo();
},
goDocStart:function(cm) {
cm.extendSelection(Pos(cm.firstLine(), 0));
},
goDocEnd:function(cm) {
cm.extendSelection(Pos(cm.lastLine()));
},
goLineStart:function(cm) {
cm.extendSelection(lineStart(cm, cm.getCursor().line));
},
goLineStartSmart:function(cm) {
var cur = cm.getCursor(), start = lineStart(cm, cur.line), line = cm.getLineHandle(start.line), order = getOrder(line);
if (order && 0 != order[0].level) cm.extendSelection(start); else {
var firstNonWS = Math.max(0, line.text.search(/\S/)), inWS = cur.line == start.line && cur.ch <= firstNonWS && cur.ch;
cm.extendSelection(Pos(start.line, inWS ? 0 :firstNonWS));
}
},
goLineEnd:function(cm) {
cm.extendSelection(lineEnd(cm, cm.getCursor().line));
},
goLineRight:function(cm) {
var top = cm.charCoords(cm.getCursor(), "div").top + 5;
cm.extendSelection(cm.coordsChar({
left:cm.display.lineDiv.offsetWidth + 100,
top:top
}, "div"));
},
goLineLeft:function(cm) {
var top = cm.charCoords(cm.getCursor(), "div").top + 5;
cm.extendSelection(cm.coordsChar({
left:0,
top:top
}, "div"));
},
goLineUp:function(cm) {
cm.moveV(-1, "line");
},
goLineDown:function(cm) {
cm.moveV(1, "line");
},
goPageUp:function(cm) {
cm.moveV(-1, "page");
},
goPageDown:function(cm) {
cm.moveV(1, "page");
},
goCharLeft:function(cm) {
cm.moveH(-1, "char");
},
goCharRight:function(cm) {
cm.moveH(1, "char");
},
goColumnLeft:function(cm) {
cm.moveH(-1, "column");
},
goColumnRight:function(cm) {
cm.moveH(1, "column");
},
goWordLeft:function(cm) {
cm.moveH(-1, "word");
},
goGroupRight:function(cm) {
cm.moveH(1, "group");
},
goGroupLeft:function(cm) {
cm.moveH(-1, "group");
},
goWordRight:function(cm) {
cm.moveH(1, "word");
},
delCharBefore:function(cm) {
cm.deleteH(-1, "char");
},
delCharAfter:function(cm) {
cm.deleteH(1, "char");
},
delWordBefore:function(cm) {
cm.deleteH(-1, "word");
},
delWordAfter:function(cm) {
cm.deleteH(1, "word");
},
delGroupBefore:function(cm) {
cm.deleteH(-1, "group");
},
delGroupAfter:function(cm) {
cm.deleteH(1, "group");
},
indentAuto:function(cm) {
cm.indentSelection("smart");
},
indentMore:function(cm) {
cm.indentSelection("add");
},
indentLess:function(cm) {
cm.indentSelection("subtract");
},
insertTab:function(cm) {
cm.replaceSelection("	", "end", "+input");
},
defaultTab:function(cm) {
cm.somethingSelected() ? cm.indentSelection("add") :cm.replaceSelection("	", "end", "+input");
},
transposeChars:function(cm) {
var cur = cm.getCursor(), line = cm.getLine(cur.line);
cur.ch > 0 && cur.ch < line.length - 1 && cm.replaceRange(line.charAt(cur.ch) + line.charAt(cur.ch - 1), Pos(cur.line, cur.ch - 1), Pos(cur.line, cur.ch + 1));
},
newlineAndIndent:function(cm) {
operation(cm, function() {
cm.replaceSelection("\n", "end", "+input"), cm.indentLine(cm.getCursor().line, null, !0);
})();
},
toggleOverwrite:function(cm) {
cm.toggleOverwrite();
}
}, keyMap = CodeMirror.keyMap = {};
keyMap.basic = {
Left:"goCharLeft",
Right:"goCharRight",
Up:"goLineUp",
Down:"goLineDown",
End:"goLineEnd",
Home:"goLineStartSmart",
PageUp:"goPageUp",
PageDown:"goPageDown",
Delete:"delCharAfter",
Backspace:"delCharBefore",
"Shift-Backspace":"delCharBefore",
Tab:"defaultTab",
"Shift-Tab":"indentAuto",
Enter:"newlineAndIndent",
Insert:"toggleOverwrite"
}, keyMap.pcDefault = {
"Ctrl-A":"selectAll",
"Ctrl-D":"deleteLine",
"Ctrl-Z":"undo",
"Shift-Ctrl-Z":"redo",
"Ctrl-Y":"redo",
"Ctrl-Home":"goDocStart",
"Ctrl-Up":"goDocStart",
"Ctrl-End":"goDocEnd",
"Ctrl-Down":"goDocEnd",
"Ctrl-Left":"goGroupLeft",
"Ctrl-Right":"goGroupRight",
"Alt-Left":"goLineStart",
"Alt-Right":"goLineEnd",
"Ctrl-Backspace":"delGroupBefore",
"Ctrl-Delete":"delGroupAfter",
"Ctrl-S":"save",
"Ctrl-F":"find",
"Ctrl-G":"findNext",
"Shift-Ctrl-G":"findPrev",
"Shift-Ctrl-F":"replace",
"Shift-Ctrl-R":"replaceAll",
"Ctrl-[":"indentLess",
"Ctrl-]":"indentMore",
fallthrough:"basic"
}, keyMap.macDefault = {
"Cmd-A":"selectAll",
"Cmd-D":"deleteLine",
"Cmd-Z":"undo",
"Shift-Cmd-Z":"redo",
"Cmd-Y":"redo",
"Cmd-Up":"goDocStart",
"Cmd-End":"goDocEnd",
"Cmd-Down":"goDocEnd",
"Alt-Left":"goGroupLeft",
"Alt-Right":"goGroupRight",
"Cmd-Left":"goLineStart",
"Cmd-Right":"goLineEnd",
"Alt-Backspace":"delGroupBefore",
"Ctrl-Alt-Backspace":"delGroupAfter",
"Alt-Delete":"delGroupAfter",
"Cmd-S":"save",
"Cmd-F":"find",
"Cmd-G":"findNext",
"Shift-Cmd-G":"findPrev",
"Cmd-Alt-F":"replace",
"Shift-Cmd-Alt-F":"replaceAll",
"Cmd-[":"indentLess",
"Cmd-]":"indentMore",
"Cmd-Backspace":"delLineLeft",
fallthrough:[ "basic", "emacsy" ]
}, keyMap["default"] = mac ? keyMap.macDefault :keyMap.pcDefault, keyMap.emacsy = {
"Ctrl-F":"goCharRight",
"Ctrl-B":"goCharLeft",
"Ctrl-P":"goLineUp",
"Ctrl-N":"goLineDown",
"Alt-F":"goWordRight",
"Alt-B":"goWordLeft",
"Ctrl-A":"goLineStart",
"Ctrl-E":"goLineEnd",
"Ctrl-V":"goPageDown",
"Shift-Ctrl-V":"goPageUp",
"Ctrl-D":"delCharAfter",
"Ctrl-H":"delCharBefore",
"Alt-D":"delWordAfter",
"Alt-Backspace":"delWordBefore",
"Ctrl-K":"killLine",
"Ctrl-T":"transposeChars"
}, CodeMirror.lookupKey = lookupKey, CodeMirror.isModifierKey = isModifierKey, CodeMirror.keyName = keyName, 
CodeMirror.fromTextArea = function(textarea, options) {
function save() {
textarea.value = cm.getValue();
}
if (options || (options = {}), options.value = textarea.value, !options.tabindex && textarea.tabindex && (options.tabindex = textarea.tabindex), 
!options.placeholder && textarea.placeholder && (options.placeholder = textarea.placeholder), 
null == options.autofocus) {
var hasFocus = document.body;
try {
hasFocus = document.activeElement;
} catch (e) {}
options.autofocus = hasFocus == textarea || null != textarea.getAttribute("autofocus") && hasFocus == document.body;
}
if (textarea.form && (on(textarea.form, "submit", save), !options.leaveSubmitMethodAlone)) {
var form = textarea.form, realSubmit = form.submit;
try {
var wrappedSubmit = form.submit = function() {
save(), form.submit = realSubmit, form.submit(), form.submit = wrappedSubmit;
};
} catch (e) {}
}
textarea.style.display = "none";
var cm = CodeMirror(function(node) {
textarea.parentNode.insertBefore(node, textarea.nextSibling);
}, options);
return cm.save = save, cm.getTextArea = function() {
return textarea;
}, cm.toTextArea = function() {
save(), textarea.parentNode.removeChild(cm.getWrapperElement()), textarea.style.display = "", 
textarea.form && (off(textarea.form, "submit", save), "function" == typeof textarea.form.submit && (textarea.form.submit = realSubmit));
}, cm;
}, StringStream.prototype = {
eol:function() {
return this.pos >= this.string.length;
},
sol:function() {
return this.pos == this.lineStart;
},
peek:function() {
return this.string.charAt(this.pos) || void 0;
},
next:function() {
return this.pos < this.string.length ? this.string.charAt(this.pos++) :void 0;
},
eat:function(match) {
var ch = this.string.charAt(this.pos);
if ("string" == typeof match) var ok = ch == match; else var ok = ch && (match.test ? match.test(ch) :match(ch));
return ok ? (++this.pos, ch) :void 0;
},
eatWhile:function(match) {
for (var start = this.pos; this.eat(match); ) ;
return this.pos > start;
},
eatSpace:function() {
for (var start = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); ) ++this.pos;
return this.pos > start;
},
skipToEnd:function() {
this.pos = this.string.length;
},
skipTo:function(ch) {
var found = this.string.indexOf(ch, this.pos);
return found > -1 ? (this.pos = found, !0) :void 0;
},
backUp:function(n) {
this.pos -= n;
},
column:function() {
return this.lastColumnPos < this.start && (this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), 
this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) :0);
},
indentation:function() {
return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) :0);
},
match:function(pattern, consume, caseInsensitive) {
if ("string" != typeof pattern) {
var match = this.string.slice(this.pos).match(pattern);
return match && match.index > 0 ? null :(match && consume !== !1 && (this.pos += match[0].length), 
match);
}
var cased = function(str) {
return caseInsensitive ? str.toLowerCase() :str;
}, substr = this.string.substr(this.pos, pattern.length);
return cased(substr) == cased(pattern) ? (consume !== !1 && (this.pos += pattern.length), 
!0) :void 0;
},
current:function() {
return this.string.slice(this.start, this.pos);
},
hideFirstChars:function(n, inner) {
this.lineStart += n;
try {
return inner();
} finally {
this.lineStart -= n;
}
}
}, CodeMirror.StringStream = StringStream, CodeMirror.TextMarker = TextMarker, eventMixin(TextMarker), 
TextMarker.prototype.clear = function() {
if (!this.explicitlyCleared) {
var cm = this.doc.cm, withOp = cm && !cm.curOp;
if (withOp && startOperation(cm), hasHandler(this, "clear")) {
var found = this.find();
found && signalLater(this, "clear", found.from, found.to);
}
for (var min = null, max = null, i = 0; i < this.lines.length; ++i) {
var line = this.lines[i], span = getMarkedSpanFor(line.markedSpans, this);
null != span.to && (max = lineNo(line)), line.markedSpans = removeMarkedSpan(line.markedSpans, span), 
null != span.from ? min = lineNo(line) :this.collapsed && !lineIsHidden(this.doc, line) && cm && updateLineHeight(line, textHeight(cm.display));
}
if (cm && this.collapsed && !cm.options.lineWrapping) for (var i = 0; i < this.lines.length; ++i) {
var visual = visualLine(cm.doc, this.lines[i]), len = lineLength(cm.doc, visual);
len > cm.display.maxLineLength && (cm.display.maxLine = visual, cm.display.maxLineLength = len, 
cm.display.maxLineChanged = !0);
}
null != min && cm && regChange(cm, min, max + 1), this.lines.length = 0, this.explicitlyCleared = !0, 
this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, cm && reCheckSelection(cm)), 
withOp && endOperation(cm);
}
}, TextMarker.prototype.find = function(bothSides) {
for (var from, to, i = 0; i < this.lines.length; ++i) {
var line = this.lines[i], span = getMarkedSpanFor(line.markedSpans, this);
if (null != span.from || null != span.to) {
var found = lineNo(line);
null != span.from && (from = Pos(found, span.from)), null != span.to && (to = Pos(found, span.to));
}
}
return "bookmark" != this.type || bothSides ? from && {
from:from,
to:to
} :from;
}, TextMarker.prototype.changed = function() {
var pos = this.find(), cm = this.doc.cm;
if (pos && cm) {
"bookmark" != this.type && (pos = pos.from);
var line = getLine(this.doc, pos.line);
if (clearCachedMeasurement(cm, line), pos.line >= cm.display.showingFrom && pos.line < cm.display.showingTo) {
for (var node = cm.display.lineDiv.firstChild; node; node = node.nextSibling) if (node.lineObj == line) {
node.offsetHeight != line.height && updateLineHeight(line, node.offsetHeight);
break;
}
runInOp(cm, function() {
cm.curOp.selectionChanged = cm.curOp.forceUpdate = cm.curOp.updateMaxLine = !0;
});
}
}
}, TextMarker.prototype.attachLine = function(line) {
if (!this.lines.length && this.doc.cm) {
var op = this.doc.cm.curOp;
op.maybeHiddenMarkers && -1 != indexOf(op.maybeHiddenMarkers, this) || (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
}
this.lines.push(line);
}, TextMarker.prototype.detachLine = function(line) {
if (this.lines.splice(indexOf(this.lines, line), 1), !this.lines.length && this.doc.cm) {
var op = this.doc.cm.curOp;
(op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
}
};
var nextMarkerId = 0;
CodeMirror.SharedTextMarker = SharedTextMarker, eventMixin(SharedTextMarker), SharedTextMarker.prototype.clear = function() {
if (!this.explicitlyCleared) {
this.explicitlyCleared = !0;
for (var i = 0; i < this.markers.length; ++i) this.markers[i].clear();
signalLater(this, "clear");
}
}, SharedTextMarker.prototype.find = function() {
return this.primary.find();
};
var LineWidget = CodeMirror.LineWidget = function(cm, node, options) {
if (options) for (var opt in options) options.hasOwnProperty(opt) && (this[opt] = options[opt]);
this.cm = cm, this.node = node;
};
eventMixin(LineWidget), LineWidget.prototype.clear = widgetOperation(function() {
var ws = this.line.widgets, no = lineNo(this.line);
if (null != no && ws) {
for (var i = 0; i < ws.length; ++i) ws[i] == this && ws.splice(i--, 1);
ws.length || (this.line.widgets = null);
var aboveVisible = heightAtLine(this.cm, this.line) < this.cm.doc.scrollTop;
updateLineHeight(this.line, Math.max(0, this.line.height - widgetHeight(this))), 
aboveVisible && addToScrollPos(this.cm, 0, -this.height), regChange(this.cm, no, no + 1);
}
}), LineWidget.prototype.changed = widgetOperation(function() {
var oldH = this.height;
this.height = null;
var diff = widgetHeight(this) - oldH;
if (diff) {
updateLineHeight(this.line, this.line.height + diff);
var no = lineNo(this.line);
regChange(this.cm, no, no + 1);
}
});
var Line = CodeMirror.Line = function(text, markedSpans, estimateHeight) {
this.text = text, attachMarkedSpans(this, markedSpans), this.height = estimateHeight ? estimateHeight(this) :1;
};
eventMixin(Line), Line.prototype.lineNo = function() {
return lineNo(this);
};
var styleToClassCache = {}, styleToClassCacheWithMode = {};
LeafChunk.prototype = {
chunkSize:function() {
return this.lines.length;
},
removeInner:function(at, n) {
for (var i = at, e = at + n; e > i; ++i) {
var line = this.lines[i];
this.height -= line.height, cleanUpLine(line), signalLater(line, "delete");
}
this.lines.splice(at, n);
},
collapse:function(lines) {
lines.splice.apply(lines, [ lines.length, 0 ].concat(this.lines));
},
insertInner:function(at, lines, height) {
this.height += height, this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
for (var i = 0, e = lines.length; e > i; ++i) lines[i].parent = this;
},
iterN:function(at, n, op) {
for (var e = at + n; e > at; ++at) if (op(this.lines[at])) return !0;
}
}, BranchChunk.prototype = {
chunkSize:function() {
return this.size;
},
removeInner:function(at, n) {
this.size -= n;
for (var i = 0; i < this.children.length; ++i) {
var child = this.children[i], sz = child.chunkSize();
if (sz > at) {
var rm = Math.min(n, sz - at), oldHeight = child.height;
if (child.removeInner(at, rm), this.height -= oldHeight - child.height, sz == rm && (this.children.splice(i--, 1), 
child.parent = null), 0 == (n -= rm)) break;
at = 0;
} else at -= sz;
}
if (this.size - n < 25) {
var lines = [];
this.collapse(lines), this.children = [ new LeafChunk(lines) ], this.children[0].parent = this;
}
},
collapse:function(lines) {
for (var i = 0, e = this.children.length; e > i; ++i) this.children[i].collapse(lines);
},
insertInner:function(at, lines, height) {
this.size += lines.length, this.height += height;
for (var i = 0, e = this.children.length; e > i; ++i) {
var child = this.children[i], sz = child.chunkSize();
if (sz >= at) {
if (child.insertInner(at, lines, height), child.lines && child.lines.length > 50) {
for (;child.lines.length > 50; ) {
var spilled = child.lines.splice(child.lines.length - 25, 25), newleaf = new LeafChunk(spilled);
child.height -= newleaf.height, this.children.splice(i + 1, 0, newleaf), newleaf.parent = this;
}
this.maybeSpill();
}
break;
}
at -= sz;
}
},
maybeSpill:function() {
if (!(this.children.length <= 10)) {
var me = this;
do {
var spilled = me.children.splice(me.children.length - 5, 5), sibling = new BranchChunk(spilled);
if (me.parent) {
me.size -= sibling.size, me.height -= sibling.height;
var myIndex = indexOf(me.parent.children, me);
me.parent.children.splice(myIndex + 1, 0, sibling);
} else {
var copy = new BranchChunk(me.children);
copy.parent = me, me.children = [ copy, sibling ], me = copy;
}
sibling.parent = me.parent;
} while (me.children.length > 10);
me.parent.maybeSpill();
}
},
iterN:function(at, n, op) {
for (var i = 0, e = this.children.length; e > i; ++i) {
var child = this.children[i], sz = child.chunkSize();
if (sz > at) {
var used = Math.min(n, sz - at);
if (child.iterN(at, used, op)) return !0;
if (0 == (n -= used)) break;
at = 0;
} else at -= sz;
}
}
};
var nextDocId = 0, Doc = CodeMirror.Doc = function(text, mode, firstLine) {
if (!(this instanceof Doc)) return new Doc(text, mode, firstLine);
null == firstLine && (firstLine = 0), BranchChunk.call(this, [ new LeafChunk([ new Line("", null) ]) ]), 
this.first = firstLine, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, 
this.history = makeHistory(), this.cleanGeneration = 1, this.frontier = firstLine;
var start = Pos(firstLine, 0);
this.sel = {
from:start,
to:start,
head:start,
anchor:start,
shift:!1,
extend:!1,
goalColumn:null
}, this.id = ++nextDocId, this.modeOption = mode, "string" == typeof text && (text = splitLines(text)), 
updateDoc(this, {
from:start,
to:start,
text:text
}, null, {
head:start,
anchor:start
});
};
Doc.prototype = createObj(BranchChunk.prototype, {
constructor:Doc,
iter:function(from, to, op) {
op ? this.iterN(from - this.first, to - from, op) :this.iterN(this.first, this.first + this.size, from);
},
insert:function(at, lines) {
for (var height = 0, i = 0, e = lines.length; e > i; ++i) height += lines[i].height;
this.insertInner(at - this.first, lines, height);
},
remove:function(at, n) {
this.removeInner(at - this.first, n);
},
getValue:function(lineSep) {
var lines = getLines(this, this.first, this.first + this.size);
return lineSep === !1 ? lines :lines.join(lineSep || "\n");
},
setValue:function(code) {
var top = Pos(this.first, 0), last = this.first + this.size - 1;
makeChange(this, {
from:top,
to:Pos(last, getLine(this, last).text.length),
text:splitLines(code),
origin:"setValue"
}, {
head:top,
anchor:top
}, !0);
},
replaceRange:function(code, from, to, origin) {
from = clipPos(this, from), to = to ? clipPos(this, to) :from, replaceRange(this, code, from, to, origin);
},
getRange:function(from, to, lineSep) {
var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
return lineSep === !1 ? lines :lines.join(lineSep || "\n");
},
getLine:function(line) {
var l = this.getLineHandle(line);
return l && l.text;
},
setLine:function(line, text) {
isLine(this, line) && replaceRange(this, text, Pos(line, 0), clipPos(this, Pos(line)));
},
removeLine:function(line) {
line ? replaceRange(this, "", clipPos(this, Pos(line - 1)), clipPos(this, Pos(line))) :replaceRange(this, "", Pos(0, 0), clipPos(this, Pos(1, 0)));
},
getLineHandle:function(line) {
return isLine(this, line) ? getLine(this, line) :void 0;
},
getLineNumber:function(line) {
return lineNo(line);
},
getLineHandleVisualStart:function(line) {
return "number" == typeof line && (line = getLine(this, line)), visualLine(this, line);
},
lineCount:function() {
return this.size;
},
firstLine:function() {
return this.first;
},
lastLine:function() {
return this.first + this.size - 1;
},
clipPos:function(pos) {
return clipPos(this, pos);
},
getCursor:function(start) {
var pos, sel = this.sel;
return pos = null == start || "head" == start ? sel.head :"anchor" == start ? sel.anchor :"end" == start || start === !1 ? sel.to :sel.from, 
copyPos(pos);
},
somethingSelected:function() {
return !posEq(this.sel.head, this.sel.anchor);
},
setCursor:docOperation(function(line, ch, extend) {
var pos = clipPos(this, "number" == typeof line ? Pos(line, ch || 0) :line);
extend ? extendSelection(this, pos) :setSelection(this, pos, pos);
}),
setSelection:docOperation(function(anchor, head, bias) {
setSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), bias);
}),
extendSelection:docOperation(function(from, to, bias) {
extendSelection(this, clipPos(this, from), to && clipPos(this, to), bias);
}),
getSelection:function(lineSep) {
return this.getRange(this.sel.from, this.sel.to, lineSep);
},
replaceSelection:function(code, collapse, origin) {
makeChange(this, {
from:this.sel.from,
to:this.sel.to,
text:splitLines(code),
origin:origin
}, collapse || "around");
},
undo:docOperation(function() {
makeChangeFromHistory(this, "undo");
}),
redo:docOperation(function() {
makeChangeFromHistory(this, "redo");
}),
setExtending:function(val) {
this.sel.extend = val;
},
historySize:function() {
var hist = this.history;
return {
undo:hist.done.length,
redo:hist.undone.length
};
},
clearHistory:function() {
this.history = makeHistory(this.history.maxGeneration);
},
markClean:function() {
this.cleanGeneration = this.changeGeneration(!0);
},
changeGeneration:function(forceSplit) {
return forceSplit && (this.history.lastOp = this.history.lastOrigin = null), this.history.generation;
},
isClean:function(gen) {
return this.history.generation == (gen || this.cleanGeneration);
},
getHistory:function() {
return {
done:copyHistoryArray(this.history.done),
undone:copyHistoryArray(this.history.undone)
};
},
setHistory:function(histData) {
var hist = this.history = makeHistory(this.history.maxGeneration);
hist.done = histData.done.slice(0), hist.undone = histData.undone.slice(0);
},
markText:function(from, to, options) {
return markText(this, clipPos(this, from), clipPos(this, to), options, "range");
},
setBookmark:function(pos, options) {
var realOpts = {
replacedWith:options && (null == options.nodeType ? options.widget :options),
insertLeft:options && options.insertLeft,
clearWhenEmpty:!1
};
return pos = clipPos(this, pos), markText(this, pos, pos, realOpts, "bookmark");
},
findMarksAt:function(pos) {
pos = clipPos(this, pos);
var markers = [], spans = getLine(this, pos.line).markedSpans;
if (spans) for (var i = 0; i < spans.length; ++i) {
var span = spans[i];
(null == span.from || span.from <= pos.ch) && (null == span.to || span.to >= pos.ch) && markers.push(span.marker.parent || span.marker);
}
return markers;
},
findMarks:function(from, to) {
from = clipPos(this, from), to = clipPos(this, to);
var found = [], lineNo = from.line;
return this.iter(from.line, to.line + 1, function(line) {
var spans = line.markedSpans;
if (spans) for (var i = 0; i < spans.length; i++) {
var span = spans[i];
lineNo == from.line && from.ch > span.to || null == span.from && lineNo != from.line || lineNo == to.line && span.from > to.ch || found.push(span.marker.parent || span.marker);
}
++lineNo;
}), found;
},
getAllMarks:function() {
var markers = [];
return this.iter(function(line) {
var sps = line.markedSpans;
if (sps) for (var i = 0; i < sps.length; ++i) null != sps[i].from && markers.push(sps[i].marker);
}), markers;
},
posFromIndex:function(off) {
var ch, lineNo = this.first;
return this.iter(function(line) {
var sz = line.text.length + 1;
return sz > off ? (ch = off, !0) :(off -= sz, ++lineNo, void 0);
}), clipPos(this, Pos(lineNo, ch));
},
indexFromPos:function(coords) {
coords = clipPos(this, coords);
var index = coords.ch;
return coords.line < this.first || coords.ch < 0 ? 0 :(this.iter(this.first, coords.line, function(line) {
index += line.text.length + 1;
}), index);
},
copy:function(copyHistory) {
var doc = new Doc(getLines(this, this.first, this.first + this.size), this.modeOption, this.first);
return doc.scrollTop = this.scrollTop, doc.scrollLeft = this.scrollLeft, doc.sel = {
from:this.sel.from,
to:this.sel.to,
head:this.sel.head,
anchor:this.sel.anchor,
shift:this.sel.shift,
extend:!1,
goalColumn:this.sel.goalColumn
}, copyHistory && (doc.history.undoDepth = this.history.undoDepth, doc.setHistory(this.getHistory())), 
doc;
},
linkedDoc:function(options) {
options || (options = {});
var from = this.first, to = this.first + this.size;
null != options.from && options.from > from && (from = options.from), null != options.to && options.to < to && (to = options.to);
var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from);
return options.sharedHist && (copy.history = this.history), (this.linked || (this.linked = [])).push({
doc:copy,
sharedHist:options.sharedHist
}), copy.linked = [ {
doc:this,
isParent:!0,
sharedHist:options.sharedHist
} ], copy;
},
unlinkDoc:function(other) {
if (other instanceof CodeMirror && (other = other.doc), this.linked) for (var i = 0; i < this.linked.length; ++i) {
var link = this.linked[i];
if (link.doc == other) {
this.linked.splice(i, 1), other.unlinkDoc(this);
break;
}
}
if (other.history == this.history) {
var splitIds = [ other.id ];
linkedDocs(other, function(doc) {
splitIds.push(doc.id);
}, !0), other.history = makeHistory(), other.history.done = copyHistoryArray(this.history.done, splitIds), 
other.history.undone = copyHistoryArray(this.history.undone, splitIds);
}
},
iterLinkedDocs:function(f) {
linkedDocs(this, f);
},
getMode:function() {
return this.mode;
},
getEditor:function() {
return this.cm;
}
}), Doc.prototype.eachLine = Doc.prototype.iter;
var dontDelegate = "iter insert remove copy getEditor".split(" ");
for (var prop in Doc.prototype) Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0 && (CodeMirror.prototype[prop] = function(method) {
return function() {
return method.apply(this.doc, arguments);
};
}(Doc.prototype[prop]));
eventMixin(Doc), CodeMirror.e_stop = e_stop, CodeMirror.e_preventDefault = e_preventDefault, 
CodeMirror.e_stopPropagation = e_stopPropagation;
var delayedCallbacks, delayedCallbackDepth = 0;
CodeMirror.on = on, CodeMirror.off = off, CodeMirror.signal = signal;
var scrollerCutOff = 30, Pass = CodeMirror.Pass = {
toString:function() {
return "CodeMirror.Pass";
}
};
Delayed.prototype = {
set:function(ms, f) {
clearTimeout(this.id), this.id = setTimeout(f, ms);
}
}, CodeMirror.countColumn = countColumn;
var spaceStrs = [ "" ], nonASCIISingleCaseWordChar = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
CodeMirror.replaceGetRect = function(f) {
getRect = f;
};
var dragAndDrop = function() {
if (ie_lt9) return !1;
var div = elt("div");
return "draggable" in div || "dragDrop" in div;
}();
gecko ? spanAffectsWrapping = function(str, i) {
return 36 == str.charCodeAt(i - 1) && 39 == str.charCodeAt(i);
} :safari && !/Version\/([6-9]|\d\d)\b/.test(navigator.userAgent) ? spanAffectsWrapping = function(str, i) {
return /\-[^ \-?]|\?[^ !\'\"\),.\-\/:;\?\]\}]/.test(str.slice(i - 1, i + 1));
} :webkit && /Chrome\/(?:29|[3-9]\d|\d\d\d)\./.test(navigator.userAgent) ? spanAffectsWrapping = function(str, i) {
var code = str.charCodeAt(i - 1);
return code >= 8208 && 8212 >= code;
} :webkit && (spanAffectsWrapping = function(str, i) {
if (i > 1 && 45 == str.charCodeAt(i - 1)) {
if (/\w/.test(str.charAt(i - 2)) && /[^\-?\.]/.test(str.charAt(i))) return !0;
if (i > 2 && /[\d\.,]/.test(str.charAt(i - 2)) && /[\d\.,]/.test(str.charAt(i))) return !1;
}
return /[~!#%&*)=+}\]\\|\"\.>,:;][({[<]|-[^\-?\.\u2010-\u201f\u2026]|\?[\w~`@#$%\^&*(_=+{[|><]|\u2026[\w~`@#$%\^&*(_=+{[><]/.test(str.slice(i - 1, i + 1));
});
var knownScrollbarWidth, zwspSupported, splitLines = 3 != "\n\nb".split(/\n/).length ? function(string) {
for (var pos = 0, result = [], l = string.length; l >= pos; ) {
var nl = string.indexOf("\n", pos);
-1 == nl && (nl = string.length);
var line = string.slice(pos, "\r" == string.charAt(nl - 1) ? nl - 1 :nl), rt = line.indexOf("\r");
-1 != rt ? (result.push(line.slice(0, rt)), pos += rt + 1) :(result.push(line), 
pos = nl + 1);
}
return result;
} :function(string) {
return string.split(/\r\n?|\n/);
};
CodeMirror.splitLines = splitLines;
var hasSelection = window.getSelection ? function(te) {
try {
return te.selectionStart != te.selectionEnd;
} catch (e) {
return !1;
}
} :function(te) {
try {
var range = te.ownerDocument.selection.createRange();
} catch (e) {}
return range && range.parentElement() == te ? 0 != range.compareEndPoints("StartToEnd", range) :!1;
}, hasCopyEvent = function() {
var e = elt("div");
return "oncopy" in e ? !0 :(e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy);
}(), keyNames = {
3:"Enter",
8:"Backspace",
9:"Tab",
13:"Enter",
16:"Shift",
17:"Ctrl",
18:"Alt",
19:"Pause",
20:"CapsLock",
27:"Esc",
32:"Space",
33:"PageUp",
34:"PageDown",
35:"End",
36:"Home",
37:"Left",
38:"Up",
39:"Right",
40:"Down",
44:"PrintScrn",
45:"Insert",
46:"Delete",
59:";",
61:"=",
91:"Mod",
92:"Mod",
93:"Mod",
107:"=",
109:"-",
127:"Delete",
173:"-",
186:";",
187:"=",
188:",",
189:"-",
190:".",
191:"/",
192:"`",
219:"[",
220:"\\",
221:"]",
222:"'",
63232:"Up",
63233:"Down",
63234:"Left",
63235:"Right",
63272:"Delete",
63273:"Home",
63275:"End",
63276:"PageUp",
63277:"PageDown",
63302:"Insert"
};
CodeMirror.keyNames = keyNames, function() {
for (var i = 0; 10 > i; i++) keyNames[i + 48] = keyNames[i + 96] = String(i);
for (var i = 65; 90 >= i; i++) keyNames[i] = String.fromCharCode(i);
for (var i = 1; 12 >= i; i++) keyNames[i + 111] = keyNames[i + 63235] = "F" + i;
}();
var bidiOther, bidiOrdering = function() {
function charType(code) {
return 255 >= code ? lowTypes.charAt(code) :code >= 1424 && 1524 >= code ? "R" :code >= 1536 && 1791 >= code ? arabicTypes.charAt(code - 1536) :code >= 1792 && 2220 >= code ? "r" :"L";
}
var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL", arabicTypes = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr", bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/, outerType = "L";
return function(str) {
if (!bidiRE.test(str)) return !1;
for (var type, len = str.length, types = [], i = 0; len > i; ++i) types.push(type = charType(str.charCodeAt(i)));
for (var i = 0, prev = outerType; len > i; ++i) {
var type = types[i];
"m" == type ? types[i] = prev :prev = type;
}
for (var i = 0, cur = outerType; len > i; ++i) {
var type = types[i];
"1" == type && "r" == cur ? types[i] = "n" :isStrong.test(type) && (cur = type, 
"r" == type && (types[i] = "R"));
}
for (var i = 1, prev = types[0]; len - 1 > i; ++i) {
var type = types[i];
"+" == type && "1" == prev && "1" == types[i + 1] ? types[i] = "1" :"," != type || prev != types[i + 1] || "1" != prev && "n" != prev || (types[i] = prev), 
prev = type;
}
for (var i = 0; len > i; ++i) {
var type = types[i];
if ("," == type) types[i] = "N"; else if ("%" == type) {
for (var end = i + 1; len > end && "%" == types[end]; ++end) ;
for (var replace = i && "!" == types[i - 1] || len > end && "1" == types[end] ? "1" :"N", j = i; end > j; ++j) types[j] = replace;
i = end - 1;
}
}
for (var i = 0, cur = outerType; len > i; ++i) {
var type = types[i];
"L" == cur && "1" == type ? types[i] = "L" :isStrong.test(type) && (cur = type);
}
for (var i = 0; len > i; ++i) if (isNeutral.test(types[i])) {
for (var end = i + 1; len > end && isNeutral.test(types[end]); ++end) ;
for (var before = "L" == (i ? types[i - 1] :outerType), after = "L" == (len > end ? types[end] :outerType), replace = before || after ? "L" :"R", j = i; end > j; ++j) types[j] = replace;
i = end - 1;
}
for (var m, order = [], i = 0; len > i; ) if (countsAsLeft.test(types[i])) {
var start = i;
for (++i; len > i && countsAsLeft.test(types[i]); ++i) ;
order.push({
from:start,
to:i,
level:0
});
} else {
var pos = i, at = order.length;
for (++i; len > i && "L" != types[i]; ++i) ;
for (var j = pos; i > j; ) if (countsAsNum.test(types[j])) {
j > pos && order.splice(at, 0, {
from:pos,
to:j,
level:1
});
var nstart = j;
for (++j; i > j && countsAsNum.test(types[j]); ++j) ;
order.splice(at, 0, {
from:nstart,
to:j,
level:2
}), pos = j;
} else ++j;
i > pos && order.splice(at, 0, {
from:pos,
to:i,
level:1
});
}
return 1 == order[0].level && (m = str.match(/^\s+/)) && (order[0].from = m[0].length, 
order.unshift({
from:0,
to:m[0].length,
level:0
})), 1 == lst(order).level && (m = str.match(/\s+$/)) && (lst(order).to -= m[0].length, 
order.push({
from:len - m[0].length,
to:len,
level:0
})), order[0].level != lst(order).level && order.push({
from:len,
to:len,
level:order[0].level
}), order;
};
}();
return CodeMirror.version = "3.22.0", CodeMirror;
}(), function() {
"use strict";
var defaultKeymap = [ {
keys:[ "<Left>" ],
type:"keyToKey",
toKeys:[ "h" ]
}, {
keys:[ "<Right>" ],
type:"keyToKey",
toKeys:[ "l" ]
}, {
keys:[ "<Up>" ],
type:"keyToKey",
toKeys:[ "k" ]
}, {
keys:[ "<Down>" ],
type:"keyToKey",
toKeys:[ "j" ]
}, {
keys:[ "<Space>" ],
type:"keyToKey",
toKeys:[ "l" ]
}, {
keys:[ "<BS>" ],
type:"keyToKey",
toKeys:[ "h" ]
}, {
keys:[ "<C-Space>" ],
type:"keyToKey",
toKeys:[ "W" ]
}, {
keys:[ "<C-BS>" ],
type:"keyToKey",
toKeys:[ "B" ]
}, {
keys:[ "<S-Space>" ],
type:"keyToKey",
toKeys:[ "w" ]
}, {
keys:[ "<S-BS>" ],
type:"keyToKey",
toKeys:[ "b" ]
}, {
keys:[ "<C-n>" ],
type:"keyToKey",
toKeys:[ "j" ]
}, {
keys:[ "<C-p>" ],
type:"keyToKey",
toKeys:[ "k" ]
}, {
keys:[ "<C-[>" ],
type:"keyToKey",
toKeys:[ "<Esc>" ]
}, {
keys:[ "<C-c>" ],
type:"keyToKey",
toKeys:[ "<Esc>" ]
}, {
keys:[ "s" ],
type:"keyToKey",
toKeys:[ "c", "l" ],
context:"normal"
}, {
keys:[ "s" ],
type:"keyToKey",
toKeys:[ "x", "i" ],
context:"visual"
}, {
keys:[ "S" ],
type:"keyToKey",
toKeys:[ "c", "c" ],
context:"normal"
}, {
keys:[ "S" ],
type:"keyToKey",
toKeys:[ "d", "c", "c" ],
context:"visual"
}, {
keys:[ "<Home>" ],
type:"keyToKey",
toKeys:[ "0" ]
}, {
keys:[ "<End>" ],
type:"keyToKey",
toKeys:[ "$" ]
}, {
keys:[ "<PageUp>" ],
type:"keyToKey",
toKeys:[ "<C-b>" ]
}, {
keys:[ "<PageDown>" ],
type:"keyToKey",
toKeys:[ "<C-f>" ]
}, {
keys:[ "<CR>" ],
type:"keyToKey",
toKeys:[ "j", "^" ],
context:"normal"
}, {
keys:[ "H" ],
type:"motion",
motion:"moveToTopLine",
motionArgs:{
linewise:!0,
toJumplist:!0
}
}, {
keys:[ "M" ],
type:"motion",
motion:"moveToMiddleLine",
motionArgs:{
linewise:!0,
toJumplist:!0
}
}, {
keys:[ "L" ],
type:"motion",
motion:"moveToBottomLine",
motionArgs:{
linewise:!0,
toJumplist:!0
}
}, {
keys:[ "h" ],
type:"motion",
motion:"moveByCharacters",
motionArgs:{
forward:!1
}
}, {
keys:[ "l" ],
type:"motion",
motion:"moveByCharacters",
motionArgs:{
forward:!0
}
}, {
keys:[ "j" ],
type:"motion",
motion:"moveByLines",
motionArgs:{
forward:!0,
linewise:!0
}
}, {
keys:[ "k" ],
type:"motion",
motion:"moveByLines",
motionArgs:{
forward:!1,
linewise:!0
}
}, {
keys:[ "g", "j" ],
type:"motion",
motion:"moveByDisplayLines",
motionArgs:{
forward:!0
}
}, {
keys:[ "g", "k" ],
type:"motion",
motion:"moveByDisplayLines",
motionArgs:{
forward:!1
}
}, {
keys:[ "w" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!0,
wordEnd:!1
}
}, {
keys:[ "W" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!0,
wordEnd:!1,
bigWord:!0
}
}, {
keys:[ "e" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!0,
wordEnd:!0,
inclusive:!0
}
}, {
keys:[ "E" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!0,
wordEnd:!0,
bigWord:!0,
inclusive:!0
}
}, {
keys:[ "b" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!1,
wordEnd:!1
}
}, {
keys:[ "B" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!1,
wordEnd:!1,
bigWord:!0
}
}, {
keys:[ "g", "e" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!1,
wordEnd:!0,
inclusive:!0
}
}, {
keys:[ "g", "E" ],
type:"motion",
motion:"moveByWords",
motionArgs:{
forward:!1,
wordEnd:!0,
bigWord:!0,
inclusive:!0
}
}, {
keys:[ "{" ],
type:"motion",
motion:"moveByParagraph",
motionArgs:{
forward:!1,
toJumplist:!0
}
}, {
keys:[ "}" ],
type:"motion",
motion:"moveByParagraph",
motionArgs:{
forward:!0,
toJumplist:!0
}
}, {
keys:[ "<C-f>" ],
type:"motion",
motion:"moveByPage",
motionArgs:{
forward:!0
}
}, {
keys:[ "<C-b>" ],
type:"motion",
motion:"moveByPage",
motionArgs:{
forward:!1
}
}, {
keys:[ "<C-d>" ],
type:"motion",
motion:"moveByScroll",
motionArgs:{
forward:!0,
explicitRepeat:!0
}
}, {
keys:[ "<C-u>" ],
type:"motion",
motion:"moveByScroll",
motionArgs:{
forward:!1,
explicitRepeat:!0
}
}, {
keys:[ "g", "g" ],
type:"motion",
motion:"moveToLineOrEdgeOfDocument",
motionArgs:{
forward:!1,
explicitRepeat:!0,
linewise:!0,
toJumplist:!0
}
}, {
keys:[ "G" ],
type:"motion",
motion:"moveToLineOrEdgeOfDocument",
motionArgs:{
forward:!0,
explicitRepeat:!0,
linewise:!0,
toJumplist:!0
}
}, {
keys:[ "0" ],
type:"motion",
motion:"moveToStartOfLine"
}, {
keys:[ "^" ],
type:"motion",
motion:"moveToFirstNonWhiteSpaceCharacter"
}, {
keys:[ "+" ],
type:"motion",
motion:"moveByLines",
motionArgs:{
forward:!0,
toFirstChar:!0
}
}, {
keys:[ "-" ],
type:"motion",
motion:"moveByLines",
motionArgs:{
forward:!1,
toFirstChar:!0
}
}, {
keys:[ "_" ],
type:"motion",
motion:"moveByLines",
motionArgs:{
forward:!0,
toFirstChar:!0,
repeatOffset:-1
}
}, {
keys:[ "$" ],
type:"motion",
motion:"moveToEol",
motionArgs:{
inclusive:!0
}
}, {
keys:[ "%" ],
type:"motion",
motion:"moveToMatchedSymbol",
motionArgs:{
inclusive:!0,
toJumplist:!0
}
}, {
keys:[ "f", "character" ],
type:"motion",
motion:"moveToCharacter",
motionArgs:{
forward:!0,
inclusive:!0
}
}, {
keys:[ "F", "character" ],
type:"motion",
motion:"moveToCharacter",
motionArgs:{
forward:!1
}
}, {
keys:[ "t", "character" ],
type:"motion",
motion:"moveTillCharacter",
motionArgs:{
forward:!0,
inclusive:!0
}
}, {
keys:[ "T", "character" ],
type:"motion",
motion:"moveTillCharacter",
motionArgs:{
forward:!1
}
}, {
keys:[ ";" ],
type:"motion",
motion:"repeatLastCharacterSearch",
motionArgs:{
forward:!0
}
}, {
keys:[ "," ],
type:"motion",
motion:"repeatLastCharacterSearch",
motionArgs:{
forward:!1
}
}, {
keys:[ "'", "character" ],
type:"motion",
motion:"goToMark",
motionArgs:{
toJumplist:!0
}
}, {
keys:[ "`", "character" ],
type:"motion",
motion:"goToMark",
motionArgs:{
toJumplist:!0
}
}, {
keys:[ "]", "`" ],
type:"motion",
motion:"jumpToMark",
motionArgs:{
forward:!0
}
}, {
keys:[ "[", "`" ],
type:"motion",
motion:"jumpToMark",
motionArgs:{
forward:!1
}
}, {
keys:[ "]", "'" ],
type:"motion",
motion:"jumpToMark",
motionArgs:{
forward:!0,
linewise:!0
}
}, {
keys:[ "[", "'" ],
type:"motion",
motion:"jumpToMark",
motionArgs:{
forward:!1,
linewise:!0
}
}, {
keys:[ "]", "character" ],
type:"motion",
motion:"moveToSymbol",
motionArgs:{
forward:!0,
toJumplist:!0
}
}, {
keys:[ "[", "character" ],
type:"motion",
motion:"moveToSymbol",
motionArgs:{
forward:!1,
toJumplist:!0
}
}, {
keys:[ "|" ],
type:"motion",
motion:"moveToColumn",
motionArgs:{}
}, {
keys:[ "d" ],
type:"operator",
operator:"delete"
}, {
keys:[ "y" ],
type:"operator",
operator:"yank"
}, {
keys:[ "c" ],
type:"operator",
operator:"change"
}, {
keys:[ ">" ],
type:"operator",
operator:"indent",
operatorArgs:{
indentRight:!0
}
}, {
keys:[ "<" ],
type:"operator",
operator:"indent",
operatorArgs:{
indentRight:!1
}
}, {
keys:[ "g", "~" ],
type:"operator",
operator:"swapcase"
}, {
keys:[ "n" ],
type:"motion",
motion:"findNext",
motionArgs:{
forward:!0,
toJumplist:!0
}
}, {
keys:[ "N" ],
type:"motion",
motion:"findNext",
motionArgs:{
forward:!1,
toJumplist:!0
}
}, {
keys:[ "x" ],
type:"operatorMotion",
operator:"delete",
motion:"moveByCharacters",
motionArgs:{
forward:!0
},
operatorMotionArgs:{
visualLine:!1
}
}, {
keys:[ "X" ],
type:"operatorMotion",
operator:"delete",
motion:"moveByCharacters",
motionArgs:{
forward:!1
},
operatorMotionArgs:{
visualLine:!0
}
}, {
keys:[ "D" ],
type:"operatorMotion",
operator:"delete",
motion:"moveToEol",
motionArgs:{
inclusive:!0
},
operatorMotionArgs:{
visualLine:!0
}
}, {
keys:[ "Y" ],
type:"operatorMotion",
operator:"yank",
motion:"moveToEol",
motionArgs:{
inclusive:!0
},
operatorMotionArgs:{
visualLine:!0
}
}, {
keys:[ "C" ],
type:"operatorMotion",
operator:"change",
motion:"moveToEol",
motionArgs:{
inclusive:!0
},
operatorMotionArgs:{
visualLine:!0
}
}, {
keys:[ "~" ],
type:"operatorMotion",
operator:"swapcase",
operatorArgs:{
shouldMoveCursor:!0
},
motion:"moveByCharacters",
motionArgs:{
forward:!0
}
}, {
keys:[ "<C-i>" ],
type:"action",
action:"jumpListWalk",
actionArgs:{
forward:!0
}
}, {
keys:[ "<C-o>" ],
type:"action",
action:"jumpListWalk",
actionArgs:{
forward:!1
}
}, {
keys:[ "<C-e>" ],
type:"action",
action:"scroll",
actionArgs:{
forward:!0,
linewise:!0
}
}, {
keys:[ "<C-y>" ],
type:"action",
action:"scroll",
actionArgs:{
forward:!1,
linewise:!0
}
}, {
keys:[ "a" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
insertAt:"charAfter"
}
}, {
keys:[ "A" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
insertAt:"eol"
}
}, {
keys:[ "i" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
insertAt:"inplace"
}
}, {
keys:[ "I" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
insertAt:"firstNonBlank"
}
}, {
keys:[ "o" ],
type:"action",
action:"newLineAndEnterInsertMode",
isEdit:!0,
interlaceInsertRepeat:!0,
actionArgs:{
after:!0
}
}, {
keys:[ "O" ],
type:"action",
action:"newLineAndEnterInsertMode",
isEdit:!0,
interlaceInsertRepeat:!0,
actionArgs:{
after:!1
}
}, {
keys:[ "v" ],
type:"action",
action:"toggleVisualMode"
}, {
keys:[ "V" ],
type:"action",
action:"toggleVisualMode",
actionArgs:{
linewise:!0
}
}, {
keys:[ "J" ],
type:"action",
action:"joinLines",
isEdit:!0
}, {
keys:[ "p" ],
type:"action",
action:"paste",
isEdit:!0,
actionArgs:{
after:!0,
isEdit:!0
}
}, {
keys:[ "P" ],
type:"action",
action:"paste",
isEdit:!0,
actionArgs:{
after:!1,
isEdit:!0
}
}, {
keys:[ "r", "character" ],
type:"action",
action:"replace",
isEdit:!0
}, {
keys:[ "@", "character" ],
type:"action",
action:"replayMacro"
}, {
keys:[ "q", "character" ],
type:"action",
action:"enterMacroRecordMode"
}, {
keys:[ "R" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
replace:!0
}
}, {
keys:[ "u" ],
type:"action",
action:"undo"
}, {
keys:[ "<C-r>" ],
type:"action",
action:"redo"
}, {
keys:[ "m", "character" ],
type:"action",
action:"setMark"
}, {
keys:[ '"', "character" ],
type:"action",
action:"setRegister"
}, {
keys:[ "z", "z" ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"center"
}
}, {
keys:[ "z", "." ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"center"
},
motion:"moveToFirstNonWhiteSpaceCharacter"
}, {
keys:[ "z", "t" ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"top"
}
}, {
keys:[ "z", "<CR>" ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"top"
},
motion:"moveToFirstNonWhiteSpaceCharacter"
}, {
keys:[ "z", "-" ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"bottom"
}
}, {
keys:[ "z", "b" ],
type:"action",
action:"scrollToCursor",
actionArgs:{
position:"bottom"
},
motion:"moveToFirstNonWhiteSpaceCharacter"
}, {
keys:[ "." ],
type:"action",
action:"repeatLastEdit"
}, {
keys:[ "<C-a>" ],
type:"action",
action:"incrementNumberToken",
isEdit:!0,
actionArgs:{
increase:!0,
backtrack:!1
}
}, {
keys:[ "<C-x>" ],
type:"action",
action:"incrementNumberToken",
isEdit:!0,
actionArgs:{
increase:!1,
backtrack:!1
}
}, {
keys:[ "a", "character" ],
type:"motion",
motion:"textObjectManipulation"
}, {
keys:[ "i", "character" ],
type:"motion",
motion:"textObjectManipulation",
motionArgs:{
textObjectInner:!0
}
}, {
keys:[ "/" ],
type:"search",
searchArgs:{
forward:!0,
querySrc:"prompt",
toJumplist:!0
}
}, {
keys:[ "?" ],
type:"search",
searchArgs:{
forward:!1,
querySrc:"prompt",
toJumplist:!0
}
}, {
keys:[ "*" ],
type:"search",
searchArgs:{
forward:!0,
querySrc:"wordUnderCursor",
toJumplist:!0
}
}, {
keys:[ "#" ],
type:"search",
searchArgs:{
forward:!1,
querySrc:"wordUnderCursor",
toJumplist:!0
}
}, {
keys:[ ":" ],
type:"ex"
} ], Vim = function() {
function beforeSelectionChange(cm, cur) {
var vim = cm.state.vim;
if (!vim.insertMode && !vim.exMode) {
var head = cur.head;
head.ch && head.ch == cm.doc.getLine(head.line).length && head.ch--;
}
}
function getOnPasteFn(cm) {
var vim = cm.state.vim;
return vim.onPasteFn || (vim.onPasteFn = function() {
vim.insertMode || (cm.setCursor(offsetCursor(cm.getCursor(), 0, 1)), actions.enterInsertMode(cm, {}, vim));
}), vim.onPasteFn;
}
function makeKeyRange(start, size) {
for (var keys = [], i = start; start + size > i; i++) keys.push(String.fromCharCode(i));
return keys;
}
function isLine(cm, line) {
return line >= cm.firstLine() && line <= cm.lastLine();
}
function isLowerCase(k) {
return /^[a-z]$/.test(k);
}
function isMatchableSymbol(k) {
return -1 != "()[]{}".indexOf(k);
}
function isNumber(k) {
return numberRegex.test(k);
}
function isUpperCase(k) {
return /^[A-Z]$/.test(k);
}
function isWhiteSpaceString(k) {
return /^\s*$/.test(k);
}
function inArray(val, arr) {
for (var i = 0; i < arr.length; i++) if (arr[i] == val) return !0;
return !1;
}
function maybeInitVimState(cm) {
return cm.state.vim || (cm.state.vim = {
inputState:new InputState(),
lastEditInputState:void 0,
lastEditActionCommand:void 0,
lastHPos:-1,
lastHSPos:-1,
lastMotion:null,
marks:{},
insertMode:!1,
insertModeRepeat:void 0,
visualMode:!1,
visualLine:!1
}), cm.state.vim;
}
function resetVimGlobalState() {
vimGlobalState = {
searchQuery:null,
searchIsReversed:!1,
jumpList:createCircularJumpList(),
macroModeState:createMacroState(),
lastChararacterSearch:{
increment:0,
forward:!0,
selectedCharacter:""
},
registerController:new RegisterController({})
};
}
function InputState() {
this.prefixRepeat = [], this.motionRepeat = [], this.operator = null, this.operatorArgs = null, 
this.motion = null, this.motionArgs = null, this.keyBuffer = [], this.registerName = null;
}
function Register(text, linewise) {
this.clear(), text && this.set(text, linewise);
}
function RegisterController(registers) {
this.registers = registers, this.unamedRegister = registers['"'] = new Register();
}
function clipCursorToContent(cm, cur, includeLineBreak) {
var line = Math.min(Math.max(cm.firstLine(), cur.line), cm.lastLine()), maxCh = lineLength(cm, line) - 1;
maxCh = includeLineBreak ? maxCh + 1 :maxCh;
var ch = Math.min(Math.max(0, cur.ch), maxCh);
return {
line:line,
ch:ch
};
}
function copyArgs(args) {
var ret = {};
for (var prop in args) args.hasOwnProperty(prop) && (ret[prop] = args[prop]);
return ret;
}
function offsetCursor(cur, offsetLine, offsetCh) {
return {
line:cur.line + offsetLine,
ch:cur.ch + offsetCh
};
}
function matchKeysPartial(pressed, mapped) {
for (var i = 0; i < pressed.length; i++) if (pressed[i] != mapped[i] && "character" != mapped[i]) return !1;
return !0;
}
function repeatFn(cm, fn, repeat) {
return function() {
for (var i = 0; repeat > i; i++) fn(cm);
};
}
function copyCursor(cur) {
return {
line:cur.line,
ch:cur.ch
};
}
function cursorEqual(cur1, cur2) {
return cur1.ch == cur2.ch && cur1.line == cur2.line;
}
function cursorIsBefore(cur1, cur2) {
return cur1.line < cur2.line ? !0 :cur1.line == cur2.line && cur1.ch < cur2.ch ? !0 :!1;
}
function cusrorIsBetween(cur1, cur2, cur3) {
var cur1before2 = cursorIsBefore(cur1, cur2), cur2before3 = cursorIsBefore(cur2, cur3);
return cur1before2 && cur2before3;
}
function lineLength(cm, lineNum) {
return cm.getLine(lineNum).length;
}
function reverse(s) {
return s.split("").reverse().join("");
}
function trim(s) {
return s.trim ? s.trim() :s.replace(/^\s+|\s+$/g, "");
}
function escapeRegex(s) {
return s.replace(/([.?*+$\[\]\/\\(){}|\-])/g, "\\$1");
}
function exitVisualMode(cm) {
cm.off("mousedown", exitVisualMode);
var vim = cm.state.vim;
vim.visualMode = !1, vim.visualLine = !1;
var selectionStart = cm.getCursor("anchor"), selectionEnd = cm.getCursor("head");
cursorEqual(selectionStart, selectionEnd) || cm.setCursor(clipCursorToContent(cm, selectionEnd)), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"normal"
});
}
function clipToLine(cm, curStart, curEnd) {
var selection = cm.getRange(curStart, curEnd);
if (/\n\s*$/.test(selection)) {
var lines = selection.split("\n");
lines.pop();
for (var line, line = lines.pop(); lines.length > 0 && line && isWhiteSpaceString(line); line = lines.pop()) curEnd.line--, 
curEnd.ch = 0;
line ? (curEnd.line--, curEnd.ch = lineLength(cm, curEnd.line)) :curEnd.ch = 0;
}
}
function expandSelectionToLine(_cm, curStart, curEnd) {
curStart.ch = 0, curEnd.ch = 0, curEnd.line++;
}
function findFirstNonWhiteSpaceCharacter(text) {
if (!text) return 0;
var firstNonWS = text.search(/\S/);
return -1 == firstNonWS ? text.length :firstNonWS;
}
function expandWordUnderCursor(cm, inclusive, _forward, bigWord, noSymbol) {
var firstMatchedChar, cur = cm.getCursor(), line = cm.getLine(cur.line), idx = cur.ch, textAfterIdx = line.substring(idx);
if (firstMatchedChar = noSymbol ? textAfterIdx.search(/\w/) :textAfterIdx.search(/\S/), 
-1 == firstMatchedChar) return null;
idx += firstMatchedChar, textAfterIdx = line.substring(idx);
var matchRegex, textBeforeIdx = line.substring(0, idx);
matchRegex = bigWord ? /^\S+/ :/\w/.test(line.charAt(idx)) ? /^\w+/ :/^[^\w\s]+/;
var wordAfterRegex = matchRegex.exec(textAfterIdx), wordStart = idx, wordEnd = idx + wordAfterRegex[0].length, revTextBeforeIdx = reverse(textBeforeIdx), wordBeforeRegex = matchRegex.exec(revTextBeforeIdx);
if (wordBeforeRegex && (wordStart -= wordBeforeRegex[0].length), inclusive) {
var textAfterWordEnd = line.substring(wordEnd), whitespacesAfterWord = textAfterWordEnd.match(/^\s*/)[0].length;
if (whitespacesAfterWord > 0) wordEnd += whitespacesAfterWord; else {
var revTrim = revTextBeforeIdx.length - wordStart, textBeforeWordStart = revTextBeforeIdx.substring(revTrim), whitespacesBeforeWord = textBeforeWordStart.match(/^\s*/)[0].length;
wordStart -= whitespacesBeforeWord;
}
}
return {
start:{
line:cur.line,
ch:wordStart
},
end:{
line:cur.line,
ch:wordEnd
}
};
}
function recordJumpPosition(cm, oldCur, newCur) {
cursorEqual(oldCur, newCur) || vimGlobalState.jumpList.add(cm, oldCur, newCur);
}
function recordLastCharacterSearch(increment, args) {
vimGlobalState.lastChararacterSearch.increment = increment, vimGlobalState.lastChararacterSearch.forward = args.forward, 
vimGlobalState.lastChararacterSearch.selectedCharacter = args.selectedCharacter;
}
function findSymbol(cm, repeat, forward, symb) {
var cur = cm.getCursor(), increment = forward ? 1 :-1, endLine = forward ? cm.lineCount() :-1, curCh = cur.ch, line = cur.line, lineText = cm.getLine(line), state = {
lineText:lineText,
nextCh:lineText.charAt(curCh),
lastCh:null,
index:curCh,
symb:symb,
reverseSymb:(forward ? {
")":"(",
"}":"{"
} :{
"(":")",
"{":"}"
})[symb],
forward:forward,
depth:0,
curMoveThrough:!1
}, mode = symbolToMode[symb];
if (!mode) return cur;
var init = findSymbolModes[mode].init, isComplete = findSymbolModes[mode].isComplete;
for (init && init(state); line !== endLine && repeat; ) {
if (state.index += increment, state.nextCh = state.lineText.charAt(state.index), 
!state.nextCh) {
if (line += increment, state.lineText = cm.getLine(line) || "", increment > 0) state.index = 0; else {
var lineLen = state.lineText.length;
state.index = lineLen > 0 ? lineLen - 1 :0;
}
state.nextCh = state.lineText.charAt(state.index);
}
isComplete(state) && (cur.line = line, cur.ch = state.index, repeat--);
}
return state.nextCh || state.curMoveThrough ? {
line:line,
ch:state.index
} :cur;
}
function findWord(cm, cur, forward, bigWord, emptyLineIsWord) {
var lineNum = cur.line, pos = cur.ch, line = cm.getLine(lineNum), dir = forward ? 1 :-1, regexps = bigWord ? bigWordRegexp :wordRegexp;
if (emptyLineIsWord && "" == line) {
if (lineNum += dir, line = cm.getLine(lineNum), !isLine(cm, lineNum)) return null;
pos = forward ? 0 :line.length;
}
for (;;) {
if (emptyLineIsWord && "" == line) return {
from:0,
to:0,
line:lineNum
};
for (var stop = dir > 0 ? line.length :-1, wordStart = stop, wordEnd = stop; pos != stop; ) {
for (var foundWord = !1, i = 0; i < regexps.length && !foundWord; ++i) if (regexps[i].test(line.charAt(pos))) {
for (wordStart = pos; pos != stop && regexps[i].test(line.charAt(pos)); ) pos += dir;
if (wordEnd = pos, foundWord = wordStart != wordEnd, wordStart == cur.ch && lineNum == cur.line && wordEnd == wordStart + dir) continue;
return {
from:Math.min(wordStart, wordEnd + 1),
to:Math.max(wordStart, wordEnd),
line:lineNum
};
}
foundWord || (pos += dir);
}
if (lineNum += dir, !isLine(cm, lineNum)) return null;
line = cm.getLine(lineNum), pos = dir > 0 ? 0 :line.length;
}
throw new Error("The impossible happened.");
}
function moveToWord(cm, repeat, forward, wordEnd, bigWord) {
var cur = cm.getCursor(), curStart = copyCursor(cur), words = [];
(forward && !wordEnd || !forward && wordEnd) && repeat++;
for (var emptyLineIsWord = !(forward && wordEnd), i = 0; repeat > i; i++) {
var word = findWord(cm, cur, forward, bigWord, emptyLineIsWord);
if (!word) {
var eodCh = lineLength(cm, cm.lastLine());
words.push(forward ? {
line:cm.lastLine(),
from:eodCh,
to:eodCh
} :{
line:0,
from:0,
to:0
});
break;
}
words.push(word), cur = {
line:word.line,
ch:forward ? word.to - 1 :word.from
};
}
var shortCircuit = words.length != repeat, firstWord = words[0], lastWord = words.pop();
return forward && !wordEnd ? (shortCircuit || firstWord.from == curStart.ch && firstWord.line == curStart.line || (lastWord = words.pop()), 
{
line:lastWord.line,
ch:lastWord.from
}) :forward && wordEnd ? {
line:lastWord.line,
ch:lastWord.to - 1
} :!forward && wordEnd ? (shortCircuit || firstWord.to == curStart.ch && firstWord.line == curStart.line || (lastWord = words.pop()), 
{
line:lastWord.line,
ch:lastWord.to
}) :{
line:lastWord.line,
ch:lastWord.from
};
}
function moveToCharacter(cm, repeat, forward, character) {
for (var idx, cur = cm.getCursor(), start = cur.ch, i = 0; repeat > i; i++) {
var line = cm.getLine(cur.line);
if (idx = charIdxInLine(start, line, character, forward, !0), -1 == idx) return null;
start = idx;
}
return {
line:cm.getCursor().line,
ch:idx
};
}
function moveToColumn(cm, repeat) {
var line = cm.getCursor().line;
return clipCursorToContent(cm, {
line:line,
ch:repeat - 1
});
}
function updateMark(cm, vim, markName, pos) {
inArray(markName, validMarks) && (vim.marks[markName] && vim.marks[markName].clear(), 
vim.marks[markName] = cm.setBookmark(pos));
}
function charIdxInLine(start, line, character, forward, includeChar) {
var idx;
return forward ? (idx = line.indexOf(character, start + 1), -1 == idx || includeChar || (idx -= 1)) :(idx = line.lastIndexOf(character, start - 1), 
-1 == idx || includeChar || (idx += 1)), idx;
}
function getContextLevel(ctx) {
return "string" === ctx || "comment" === ctx ? 1 :0;
}
function findMatchedSymbol(cm, cur, symb) {
var line = cur.line, ch = cur.ch;
symb = symb ? symb :cm.getLine(line).charAt(ch);
var symbContext = cm.getTokenAt({
line:line,
ch:ch + 1
}).type, symbCtxLevel = getContextLevel(symbContext), reverseSymb = {
"(":")",
")":"(",
"[":"]",
"]":"[",
"{":"}",
"}":"{"
}[symb];
if (!reverseSymb) return cur;
for (var increment = {
"(":1,
"{":1,
"[":1
}[symb] || -1, endLine = 1 === increment ? cm.lineCount() :-1, depth = 1, nextCh = symb, index = ch, lineText = cm.getLine(line); line !== endLine && depth > 0; ) {
if (index += increment, nextCh = lineText.charAt(index), !nextCh) {
if (line += increment, lineText = cm.getLine(line) || "", increment > 0) index = 0; else {
var lineLen = lineText.length;
index = lineLen > 0 ? lineLen - 1 :0;
}
nextCh = lineText.charAt(index);
}
var revSymbContext = cm.getTokenAt({
line:line,
ch:index + 1
}).type, revSymbCtxLevel = getContextLevel(revSymbContext);
symbCtxLevel >= revSymbCtxLevel && (nextCh === symb ? depth++ :nextCh === reverseSymb && depth--);
}
return nextCh ? {
line:line,
ch:index
} :cur;
}
function selectCompanionObject(cm, revSymb, inclusive) {
var cur = cm.getCursor(), end = findMatchedSymbol(cm, cur, revSymb), start = findMatchedSymbol(cm, end);
if (start.line == end.line && start.ch > end.ch || start.line > end.line) {
var tmp = start;
start = end, end = tmp;
}
return inclusive ? end.ch += 1 :start.ch += 1, {
start:start,
end:end
};
}
function findBeginningAndEnd(cm, symb, inclusive) {
var start, end, i, len, cur = cm.getCursor(), line = cm.getLine(cur.line), chars = line.split(""), firstIndex = chars.indexOf(symb);
if (cur.ch < firstIndex ? cur.ch = firstIndex :firstIndex < cur.ch && chars[cur.ch] == symb && (end = cur.ch, 
--cur.ch), chars[cur.ch] != symb || end) for (i = cur.ch; i > -1 && !start; i--) chars[i] == symb && (start = i + 1); else start = cur.ch + 1;
if (start && !end) for (i = start, len = chars.length; len > i && !end; i++) chars[i] == symb && (end = i);
return start && end ? (inclusive && (--start, ++end), {
start:{
line:cur.line,
ch:start
},
end:{
line:cur.line,
ch:end
}
}) :{
start:cur,
end:cur
};
}
function SearchState() {}
function getSearchState(cm) {
var vim = cm.state.vim;
return vim.searchState_ || (vim.searchState_ = new SearchState());
}
function dialog(cm, template, shortText, onClose, options) {
cm.openDialog ? cm.openDialog(template, onClose, {
bottom:!0,
value:options.value,
onKeyDown:options.onKeyDown,
onKeyUp:options.onKeyUp
}) :onClose(prompt(shortText, ""));
}
function findUnescapedSlashes(str) {
for (var escapeNextChar = !1, slashes = [], i = 0; i < str.length; i++) {
var c = str.charAt(i);
escapeNextChar || "/" != c || slashes.push(i), escapeNextChar = !escapeNextChar && "\\" == c;
}
return slashes;
}
function fixRegex(str) {
for (var specials = [ "|", "(", ")", "{" ], unescape = [ "}" ], escapeNextChar = !1, out = [], i = -1; i < str.length; i++) {
var c = str.charAt(i) || "", n = str.charAt(i + 1) || "", specialComesNext = -1 != specials.indexOf(n);
escapeNextChar ? ("\\" === c && specialComesNext || out.push(c), escapeNextChar = !1) :"\\" === c ? (escapeNextChar = !0, 
-1 != unescape.indexOf(n) && (specialComesNext = !0), specialComesNext && "\\" !== n || out.push(c)) :(out.push(c), 
specialComesNext && "\\" !== n && out.push("\\"));
}
return out.join("");
}
function fixRegexReplace(str) {
for (var escapeNextChar = !1, out = [], i = -1; i < str.length; i++) {
var c = str.charAt(i) || "", n = str.charAt(i + 1) || "";
escapeNextChar ? (out.push(c), escapeNextChar = !1) :"\\" === c ? (escapeNextChar = !0, 
isNumber(n) || "$" === n ? out.push("$") :"/" !== n && "\\" !== n && out.push("\\")) :("$" === c && out.push("$"), 
out.push(c), "/" === n && out.push("\\"));
}
return out.join("");
}
function parseQuery(query, ignoreCase, smartCase) {
if (query instanceof RegExp) return query;
var regexPart, forceIgnoreCase, slashes = findUnescapedSlashes(query);
if (slashes.length) {
regexPart = query.substring(0, slashes[0]);
var flagsPart = query.substring(slashes[0]);
forceIgnoreCase = -1 != flagsPart.indexOf("i");
} else regexPart = query;
if (!regexPart) return null;
regexPart = fixRegex(regexPart), smartCase && (ignoreCase = /^[^A-Z]*$/.test(regexPart));
var regexp = new RegExp(regexPart, ignoreCase || forceIgnoreCase ? "i" :void 0);
return regexp;
}
function showConfirm(cm, text) {
cm.openNotification ? cm.openNotification('<span style="color: red">' + text + "</span>", {
bottom:!0,
duration:5e3
}) :alert(text);
}
function makePrompt(prefix, desc) {
var raw = "";
return prefix && (raw += '<span style="font-family: monospace">' + prefix + "</span>"), 
raw += '<input type="text"/> <span style="color: #888">', desc && (raw += '<span style="color: #888">', 
raw += desc, raw += "</span>"), raw;
}
function showPrompt(cm, options) {
var shortText = (options.prefix || "") + " " + (options.desc || ""), prompt = makePrompt(options.prefix, options.desc);
dialog(cm, prompt, shortText, options.onClose, options);
}
function regexEqual(r1, r2) {
if (r1 instanceof RegExp && r2 instanceof RegExp) {
for (var props = [ "global", "multiline", "ignoreCase", "source" ], i = 0; i < props.length; i++) {
var prop = props[i];
if (r1[prop] !== r2[prop]) return !1;
}
return !0;
}
return !1;
}
function updateSearchQuery(cm, rawQuery, ignoreCase, smartCase) {
if (rawQuery) {
var state = getSearchState(cm), query = parseQuery(rawQuery, !!ignoreCase, !!smartCase);
if (query) return highlightSearchMatches(cm, query), regexEqual(query, state.getQuery()) ? query :(state.setQuery(query), 
query);
}
}
function searchOverlay(query) {
if ("^" == query.source.charAt(0)) var matchSol = !0;
return {
token:function(stream) {
if (matchSol && !stream.sol()) return stream.skipToEnd(), void 0;
var match = stream.match(query, !1);
if (match) return 0 == match[0].length ? (stream.next(), "searching") :stream.sol() || (stream.backUp(1), 
query.exec(stream.next() + match[0])) ? (stream.match(query), "searching") :(stream.next(), 
null);
for (;!stream.eol() && (stream.next(), !stream.match(query, !1)); ) ;
},
query:query
};
}
function highlightSearchMatches(cm, query) {
var overlay = getSearchState(cm).getOverlay();
overlay && query == overlay.query || (overlay && cm.removeOverlay(overlay), overlay = searchOverlay(query), 
cm.addOverlay(overlay), getSearchState(cm).setOverlay(overlay));
}
function findNext(cm, prev, query, repeat) {
return void 0 === repeat && (repeat = 1), cm.operation(function() {
for (var pos = cm.getCursor(), cursor = cm.getSearchCursor(query, pos), i = 0; repeat > i; i++) {
var found = cursor.find(prev);
if (0 == i && found && cursorEqual(cursor.from(), pos) && (found = cursor.find(prev)), 
!found && (cursor = cm.getSearchCursor(query, prev ? {
line:cm.lastLine()
} :{
line:cm.firstLine(),
ch:0
}), !cursor.find(prev))) return;
}
return cursor.from();
});
}
function clearSearchHighlight(cm) {
cm.removeOverlay(getSearchState(cm).getOverlay()), getSearchState(cm).setOverlay(null);
}
function isInRange(pos, start, end) {
return "number" != typeof pos && (pos = pos.line), start instanceof Array ? inArray(pos, start) :end ? pos >= start && end >= pos :pos == start;
}
function getUserVisibleLines(cm) {
var scrollInfo = cm.getScrollInfo(), occludeToleranceTop = 6, occludeToleranceBottom = 10, from = cm.coordsChar({
left:0,
top:occludeToleranceTop + scrollInfo.top
}, "local"), bottomY = scrollInfo.clientHeight - occludeToleranceBottom + scrollInfo.top, to = cm.coordsChar({
left:0,
top:bottomY
}, "local");
return {
top:from.line,
bottom:to.line
};
}
function parseKeyString(str) {
for (var key, match, keys = []; str && (match = /<\w+-.+?>|<\w+>|./.exec(str), null !== match); ) key = match[0], 
str = str.substring(match.index + key.length), keys.push(key);
return keys;
}
function doReplace(cm, confirm, lineStart, lineEnd, searchCursor, query, replaceWith) {
function replaceAll() {
cm.operation(function() {
for (;!done; ) replace(), next();
stop();
});
}
function replace() {
var text = cm.getRange(searchCursor.from(), searchCursor.to()), newText = text.replace(query, replaceWith);
searchCursor.replace(newText);
}
function next() {
var found = searchCursor.findNext();
found ? isInRange(searchCursor.from(), lineStart, lineEnd) ? (cm.scrollIntoView(searchCursor.from(), 30), 
cm.setSelection(searchCursor.from(), searchCursor.to()), lastPos = searchCursor.from(), 
done = !1) :done = !0 :done = !0;
}
function stop(close) {
if (close && close(), cm.focus(), lastPos) {
cm.setCursor(lastPos);
var vim = cm.state.vim;
vim.exMode = !1, vim.lastHPos = vim.lastHSPos = lastPos.ch;
}
}
function onPromptKeyDown(e, _value, close) {
CodeMirror.e_stop(e);
var keyName = CodeMirror.keyName(e);
switch (keyName) {
case "Y":
replace(), next();
break;

case "N":
next();
break;

case "A":
cm.operation(replaceAll);
break;

case "L":
replace();

case "Q":
case "Esc":
case "Ctrl-C":
case "Ctrl-[":
stop(close);
}
done && stop(close);
}
cm.state.vim.exMode = !0;
var done = !1, lastPos = searchCursor.from();
return next(), done ? (showConfirm(cm, "No matches for " + query.source), void 0) :confirm ? (showPrompt(cm, {
prefix:"replace with <strong>" + replaceWith + "</strong> (y/n/a/q/l)",
onKeyDown:onPromptKeyDown
}), void 0) :(replaceAll(), void 0);
}
function buildVimKeyMap() {
function cmKeyToVimKey(key, modifier) {
var vimKey = key;
isUpperCase(vimKey) && "Ctrl" == modifier && (vimKey = vimKey.toLowerCase()), modifier && (vimKey = modifier.charAt(0) + "-" + vimKey);
var specialKey = {
Enter:"CR",
Backspace:"BS",
Delete:"Del"
}[vimKey];
return vimKey = specialKey ? specialKey :vimKey, vimKey = vimKey.length > 1 ? "<" + vimKey + ">" :vimKey;
}
function keyMapper(vimKey) {
return function(cm) {
CodeMirror.Vim.handleKey(cm, vimKey);
};
}
function bindKeys(keys, modifier) {
for (var i = 0; i < keys.length; i++) {
var key = keys[i];
modifier || 1 != key.length || (key = "'" + key + "'");
var vimKey = cmKeyToVimKey(keys[i], modifier), cmKey = modifier ? modifier + "-" + key :key;
cmToVimKeymap[cmKey] = keyMapper(vimKey);
}
}
var cmToVimKeymap = {
nofallthrough:!0,
style:"fat-cursor"
};
return bindKeys(upperCaseAlphabet), bindKeys(lowerCaseAlphabet), bindKeys(upperCaseAlphabet, "Ctrl"), 
bindKeys(specialSymbols), bindKeys(specialSymbols, "Ctrl"), bindKeys(numbers), bindKeys(numbers, "Ctrl"), 
bindKeys(specialKeys), bindKeys(specialKeys, "Ctrl"), cmToVimKeymap;
}
function exitInsertMode(cm) {
var vim = cm.state.vim, inReplay = vimGlobalState.macroModeState.inReplay;
inReplay || (cm.off("change", onChange), cm.off("cursorActivity", onCursorActivity), 
CodeMirror.off(cm.getInputField(), "keydown", onKeyEventTargetKeyDown)), !inReplay && vim.insertModeRepeat > 1 && (repeatLastEdit(cm, vim, vim.insertModeRepeat - 1, !0), 
vim.lastEditInputState.repeatOverride = vim.insertModeRepeat), delete vim.insertModeRepeat, 
cm.setCursor(cm.getCursor().line, cm.getCursor().ch - 1, !0), vim.insertMode = !1, 
cm.setOption("keyMap", "vim"), cm.setOption("disableInput", !0), cm.toggleOverwrite(!1), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"normal"
});
}
function parseRegisterToKeyBuffer(macroModeState, registerName) {
var match, key, register = vimGlobalState.registerController.getRegister(registerName), text = register.toString(), macroKeyBuffer = macroModeState.macroKeyBuffer;
emptyMacroKeyBuffer(macroModeState);
do {
if (match = /<\w+-.+?>|<\w+>|./.exec(text), null === match) break;
key = match[0], text = text.substring(match.index + key.length), macroKeyBuffer.push(key);
} while (text);
return macroKeyBuffer;
}
function parseKeyBufferToRegister(registerName, keyBuffer) {
var text = keyBuffer.join("");
vimGlobalState.registerController.setRegisterText(registerName, text);
}
function emptyMacroKeyBuffer(macroModeState) {
if (!macroModeState.isMacroPlaying) {
var macroKeyBuffer = macroModeState.macroKeyBuffer;
macroKeyBuffer.length = 0;
}
}
function executeMacroKeyBuffer(cm, macroModeState, keyBuffer) {
macroModeState.isMacroPlaying = !0;
for (var i = 0, len = keyBuffer.length; len > i; i++) CodeMirror.Vim.handleKey(cm, keyBuffer[i]);
macroModeState.isMacroPlaying = !1;
}
function logKey(macroModeState, key) {
if (!macroModeState.isMacroPlaying) {
var macroKeyBuffer = macroModeState.macroKeyBuffer;
macroKeyBuffer.push(key);
}
}
function onChange(_cm, changeObj) {
for (var macroModeState = vimGlobalState.macroModeState, lastChange = macroModeState.lastInsertModeChanges; changeObj; ) {
if (lastChange.expectCursorActivityForChange = !0, "+input" == changeObj.origin || "paste" == changeObj.origin || void 0 === changeObj.origin) {
var text = changeObj.text.join("\n");
lastChange.changes.push(text);
}
changeObj = changeObj.next;
}
}
function onCursorActivity() {
var macroModeState = vimGlobalState.macroModeState, lastChange = macroModeState.lastInsertModeChanges;
lastChange.expectCursorActivityForChange ? lastChange.expectCursorActivityForChange = !1 :lastChange.changes = [];
}
function InsertModeKey(keyName) {
this.keyName = keyName;
}
function onKeyEventTargetKeyDown(e) {
function onKeyFound() {
return lastChange.changes.push(new InsertModeKey(keyName)), !0;
}
var macroModeState = vimGlobalState.macroModeState, lastChange = macroModeState.lastInsertModeChanges, keyName = CodeMirror.keyName(e);
(-1 != keyName.indexOf("Delete") || -1 != keyName.indexOf("Backspace")) && CodeMirror.lookupKey(keyName, [ "vim-insert" ], onKeyFound);
}
function repeatLastEdit(cm, vim, repeat, repeatForInsert) {
function repeatCommand() {
isAction ? commandDispatcher.processAction(cm, vim, vim.lastEditActionCommand) :commandDispatcher.evalInput(cm, vim);
}
function repeatInsert(repeat) {
macroModeState.lastInsertModeChanges.changes.length > 0 && (repeat = vim.lastEditActionCommand ? repeat :1, 
repeatLastInsertModeChanges(cm, repeat, macroModeState));
}
var macroModeState = vimGlobalState.macroModeState;
macroModeState.inReplay = !0;
var isAction = !!vim.lastEditActionCommand, cachedInputState = vim.inputState;
if (vim.inputState = vim.lastEditInputState, isAction && vim.lastEditActionCommand.interlaceInsertRepeat) for (var i = 0; repeat > i; i++) repeatCommand(), 
repeatInsert(1); else repeatForInsert || repeatCommand(), repeatInsert(repeat);
vim.inputState = cachedInputState, vim.insertMode && !repeatForInsert && exitInsertMode(cm), 
macroModeState.inReplay = !1;
}
function repeatLastInsertModeChanges(cm, repeat, macroModeState) {
function keyHandler(binding) {
return "string" == typeof binding ? CodeMirror.commands[binding](cm) :binding(cm), 
!0;
}
for (var lastChange = macroModeState.lastInsertModeChanges, i = 0; repeat > i; i++) for (var j = 0; j < lastChange.changes.length; j++) {
var change = lastChange.changes[j];
if (change instanceof InsertModeKey) CodeMirror.lookupKey(change.keyName, [ "vim-insert" ], keyHandler); else {
var cur = cm.getCursor();
cm.replaceRange(change, cur, cur);
}
}
}
CodeMirror.defineOption("vimMode", !1, function(cm, val) {
val ? (cm.setOption("keyMap", "vim"), cm.setOption("disableInput", !0), CodeMirror.signal(cm, "vim-mode-change", {
mode:"normal"
}), cm.on("beforeSelectionChange", beforeSelectionChange), maybeInitVimState(cm), 
CodeMirror.on(cm.getInputField(), "paste", getOnPasteFn(cm))) :cm.state.vim && (cm.setOption("keyMap", "default"), 
cm.setOption("disableInput", !1), cm.off("beforeSelectionChange", beforeSelectionChange), 
CodeMirror.off(cm.getInputField(), "paste", getOnPasteFn(cm)), cm.state.vim = null);
});
var vimGlobalState, numberRegex = /[\d]/, wordRegexp = [ /\w/, /[^\w\s]/ ], bigWordRegexp = [ /\S/ ], upperCaseAlphabet = makeKeyRange(65, 26), lowerCaseAlphabet = makeKeyRange(97, 26), numbers = makeKeyRange(48, 10), specialSymbols = "~`!@#$%^&*()_-+=[{}]\\|/?.,<>:;\"'".split(""), specialKeys = [ "Left", "Right", "Up", "Down", "Space", "Backspace", "Esc", "Home", "End", "PageUp", "PageDown", "Enter" ], validMarks = [].concat(upperCaseAlphabet, lowerCaseAlphabet, numbers, [ "<", ">" ]), validRegisters = [].concat(upperCaseAlphabet, lowerCaseAlphabet, numbers, [ "-", '"' ]), createCircularJumpList = function() {
function add(cm, oldCur, newCur) {
function useNextSlot(cursor) {
var next = ++pointer % size, trashMark = buffer[next];
trashMark && trashMark.clear(), buffer[next] = cm.setBookmark(cursor);
}
var current = pointer % size, curMark = buffer[current];
if (curMark) {
var markPos = curMark.find();
markPos && !cursorEqual(markPos, oldCur) && useNextSlot(oldCur);
} else useNextSlot(oldCur);
useNextSlot(newCur), head = pointer, tail = pointer - size + 1, 0 > tail && (tail = 0);
}
function move(cm, offset) {
pointer += offset, pointer > head ? pointer = head :tail > pointer && (pointer = tail);
var mark = buffer[(size + pointer) % size];
if (mark && !mark.find()) {
var newCur, inc = offset > 0 ? 1 :-1, oldCur = cm.getCursor();
do if (pointer += inc, mark = buffer[(size + pointer) % size], mark && (newCur = mark.find()) && !cursorEqual(oldCur, newCur)) break; while (head > pointer && pointer > tail);
}
return mark;
}
var size = 100, pointer = -1, head = 0, tail = 0, buffer = new Array(size);
return {
cachedCursor:void 0,
add:add,
move:move
};
}, createMacroState = function() {
return {
macroKeyBuffer:[],
latestRegister:void 0,
inReplay:!1,
lastInsertModeChanges:{
changes:[],
expectCursorActivityForChange:!1
},
enteredMacroMode:void 0,
isMacroPlaying:!1,
toggle:function(cm, registerName) {
this.enteredMacroMode ? (this.enteredMacroMode(), this.enteredMacroMode = void 0) :(this.latestRegister = registerName, 
this.enteredMacroMode = cm.openDialog("(recording)[" + registerName + "]", null, {
bottom:!0
}));
}
};
}, vimApi = {
buildKeyMap:function() {},
getRegisterController:function() {
return vimGlobalState.registerController;
},
resetVimGlobalState_:resetVimGlobalState,
getVimGlobalState_:function() {
return vimGlobalState;
},
maybeInitVimState_:maybeInitVimState,
InsertModeKey:InsertModeKey,
map:function(lhs, rhs, ctx) {
exCommandDispatcher.map(lhs, rhs, ctx);
},
defineEx:function(name, prefix, func) {
if (0 !== name.indexOf(prefix)) throw new Error('(Vim.defineEx) "' + prefix + '" is not a prefix of "' + name + '", command not registered');
exCommands[name] = func, exCommandDispatcher.commandMap_[prefix] = {
name:name,
shortName:prefix,
type:"api"
};
},
handleKey:function(cm, key) {
var command, vim = maybeInitVimState(cm), macroModeState = vimGlobalState.macroModeState;
if (macroModeState.enteredMacroMode && "q" == key) return actions.exitMacroRecordMode(), 
vim.inputState = new InputState(), void 0;
if ("<Esc>" == key) return vim.inputState = new InputState(), vim.visualMode && exitVisualMode(cm), 
void 0;
if (vim.visualMode || cursorEqual(cm.getCursor("head"), cm.getCursor("anchor")) || (vim.visualMode = !0, 
vim.visualLine = !1, CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual"
}), cm.on("mousedown", exitVisualMode)), ("0" != key || "0" == key && 0 === vim.inputState.getRepeat()) && (command = commandDispatcher.matchCommand(key, defaultKeymap, vim)), 
!command) return isNumber(key) && vim.inputState.pushRepeatDigit(key), void 0;
if ("keyToKey" == command.type) for (var i = 0; i < command.toKeys.length; i++) this.handleKey(cm, command.toKeys[i]); else macroModeState.enteredMacroMode && logKey(macroModeState, key), 
commandDispatcher.processCommand(cm, vim, command);
},
handleEx:function(cm, input) {
exCommandDispatcher.processCommand(cm, input);
}
};
InputState.prototype.pushRepeatDigit = function(n) {
this.operator ? this.motionRepeat = this.motionRepeat.concat(n) :this.prefixRepeat = this.prefixRepeat.concat(n);
}, InputState.prototype.getRepeat = function() {
var repeat = 0;
return (this.prefixRepeat.length > 0 || this.motionRepeat.length > 0) && (repeat = 1, 
this.prefixRepeat.length > 0 && (repeat *= parseInt(this.prefixRepeat.join(""), 10)), 
this.motionRepeat.length > 0 && (repeat *= parseInt(this.motionRepeat.join(""), 10))), 
repeat;
}, Register.prototype = {
set:function(text, linewise) {
this.text = text, this.linewise = !!linewise;
},
append:function(text, linewise) {
linewise || this.linewise ? (this.text += "\n" + text, this.linewise = !0) :this.text += text;
},
clear:function() {
this.text = "", this.linewise = !1;
},
toString:function() {
return this.text;
}
}, RegisterController.prototype = {
pushText:function(registerName, operator, text, linewise) {
linewise && "\n" == text.charAt(0) && (text = text.slice(1) + "\n"), linewise && "\n" !== text.charAt(text.length - 1) && (text += "\n");
var register = this.isValidRegister(registerName) ? this.getRegister(registerName) :null;
if (!register) {
switch (operator) {
case "yank":
this.registers["0"] = new Register(text, linewise);
break;

case "delete":
case "change":
-1 == text.indexOf("\n") ? this.registers["-"] = new Register(text, linewise) :(this.shiftNumericRegisters_(), 
this.registers["1"] = new Register(text, linewise));
}
return this.unamedRegister.set(text, linewise), void 0;
}
var append = isUpperCase(registerName);
append ? (register.append(text, linewise), this.unamedRegister.append(text, linewise)) :(register.set(text, linewise), 
this.unamedRegister.set(text, linewise));
},
setRegisterText:function(name, text, linewise) {
this.getRegister(name).set(text, linewise);
},
getRegister:function(name) {
return this.isValidRegister(name) ? (name = name.toLowerCase(), this.registers[name] || (this.registers[name] = new Register()), 
this.registers[name]) :this.unamedRegister;
},
isValidRegister:function(name) {
return name && inArray(name, validRegisters);
},
shiftNumericRegisters_:function() {
for (var i = 9; i >= 2; i--) this.registers[i] = this.getRegister("" + (i - 1));
}
};
var commandDispatcher = {
matchCommand:function(key, keyMap, vim) {
function getFullyMatchedCommandOrNull(command) {
return keys.length < command.keys.length ? (inputState.keyBuffer.push(key), null) :("character" == command.keys[keys.length - 1] && (inputState.selectedCharacter = selectedCharacter), 
inputState.keyBuffer = [], command);
}
for (var selectedCharacter, inputState = vim.inputState, keys = inputState.keyBuffer.concat(key), matchedCommands = [], i = 0; i < keyMap.length; i++) {
var command = keyMap[i];
if (matchKeysPartial(keys, command.keys)) {
if (inputState.operator && "action" == command.type) continue;
if ("character" == command.keys[keys.length - 1] && (selectedCharacter = keys[keys.length - 1], 
selectedCharacter.length > 1)) switch (selectedCharacter) {
case "<CR>":
selectedCharacter = "\n";
break;

case "<Space>":
selectedCharacter = " ";
break;

default:
continue;
}
matchedCommands.push(command);
}
}
if (matchedCommands.length) {
if (1 == matchedCommands.length) return getFullyMatchedCommandOrNull(matchedCommands[0]);
for (var bestMatch, context = vim.visualMode ? "visual" :"normal", i = 0; i < matchedCommands.length; i++) {
var current = matchedCommands[i];
if (current.context == context) {
bestMatch = current;
break;
}
bestMatch || current.context || (bestMatch = current);
}
return getFullyMatchedCommandOrNull(bestMatch);
}
return inputState.keyBuffer = [], null;
},
processCommand:function(cm, vim, command) {
switch (vim.inputState.repeatOverride = command.repeatOverride, command.type) {
case "motion":
this.processMotion(cm, vim, command);
break;

case "operator":
this.processOperator(cm, vim, command);
break;

case "operatorMotion":
this.processOperatorMotion(cm, vim, command);
break;

case "action":
this.processAction(cm, vim, command);
break;

case "search":
this.processSearch(cm, vim, command);
break;

case "ex":
case "keyToEx":
this.processEx(cm, vim, command);
}
},
processMotion:function(cm, vim, command) {
vim.inputState.motion = command.motion, vim.inputState.motionArgs = copyArgs(command.motionArgs), 
this.evalInput(cm, vim);
},
processOperator:function(cm, vim, command) {
var inputState = vim.inputState;
if (inputState.operator) {
if (inputState.operator == command.operator) return inputState.motion = "expandToLine", 
inputState.motionArgs = {
linewise:!0
}, this.evalInput(cm, vim), void 0;
vim.inputState = new InputState();
}
inputState.operator = command.operator, inputState.operatorArgs = copyArgs(command.operatorArgs), 
vim.visualMode && this.evalInput(cm, vim);
},
processOperatorMotion:function(cm, vim, command) {
var visualMode = vim.visualMode, operatorMotionArgs = copyArgs(command.operatorMotionArgs);
operatorMotionArgs && visualMode && operatorMotionArgs.visualLine && (vim.visualLine = !0), 
this.processOperator(cm, vim, command), visualMode || this.processMotion(cm, vim, command);
},
processAction:function(cm, vim, command) {
var inputState = vim.inputState, repeat = inputState.getRepeat(), repeatIsExplicit = !!repeat, actionArgs = copyArgs(command.actionArgs) || {};
inputState.selectedCharacter && (actionArgs.selectedCharacter = inputState.selectedCharacter), 
command.operator && this.processOperator(cm, vim, command), command.motion && this.processMotion(cm, vim, command), 
(command.motion || command.operator) && this.evalInput(cm, vim), actionArgs.repeat = repeat || 1, 
actionArgs.repeatIsExplicit = repeatIsExplicit, actionArgs.registerName = inputState.registerName, 
vim.inputState = new InputState(), vim.lastMotion = null, command.isEdit && this.recordLastEdit(vim, inputState, command), 
actions[command.action](cm, actionArgs, vim);
},
processSearch:function(cm, vim, command) {
function handleQuery(query, ignoreCase, smartCase) {
try {
updateSearchQuery(cm, query, ignoreCase, smartCase);
} catch (e) {
return showConfirm(cm, "Invalid regex: " + query), void 0;
}
commandDispatcher.processMotion(cm, vim, {
type:"motion",
motion:"findNext",
motionArgs:{
forward:!0,
toJumplist:command.searchArgs.toJumplist
}
});
}
function onPromptClose(query) {
cm.scrollTo(originalScrollPos.left, originalScrollPos.top), handleQuery(query, !0, !0);
}
function onPromptKeyUp(_e, query) {
var parsedQuery;
try {
parsedQuery = updateSearchQuery(cm, query, !0, !0);
} catch (e) {}
parsedQuery ? cm.scrollIntoView(findNext(cm, !forward, parsedQuery), 30) :(clearSearchHighlight(cm), 
cm.scrollTo(originalScrollPos.left, originalScrollPos.top));
}
function onPromptKeyDown(e, _query, close) {
var keyName = CodeMirror.keyName(e);
("Esc" == keyName || "Ctrl-C" == keyName || "Ctrl-[" == keyName) && (updateSearchQuery(cm, originalQuery), 
clearSearchHighlight(cm), cm.scrollTo(originalScrollPos.left, originalScrollPos.top), 
CodeMirror.e_stop(e), close(), cm.focus());
}
if (cm.getSearchCursor) {
var forward = command.searchArgs.forward;
getSearchState(cm).setReversed(!forward);
var promptPrefix = forward ? "/" :"?", originalQuery = getSearchState(cm).getQuery(), originalScrollPos = cm.getScrollInfo();
switch (command.searchArgs.querySrc) {
case "prompt":
showPrompt(cm, {
onClose:onPromptClose,
prefix:promptPrefix,
desc:searchPromptDesc,
onKeyUp:onPromptKeyUp,
onKeyDown:onPromptKeyDown
});
break;

case "wordUnderCursor":
var word = expandWordUnderCursor(cm, !1, !0, !1, !0), isKeyword = !0;
if (word || (word = expandWordUnderCursor(cm, !1, !0, !1, !1), isKeyword = !1), 
!word) return;
var query = cm.getLine(word.start.line).substring(word.start.ch, word.end.ch);
query = isKeyword ? "\\b" + query + "\\b" :escapeRegex(query), vimGlobalState.jumpList.cachedCursor = cm.getCursor(), 
cm.setCursor(word.start), handleQuery(query, !0, !1);
}
}
},
processEx:function(cm, vim, command) {
function onPromptClose(input) {
exCommandDispatcher.processCommand(cm, input);
}
function onPromptKeyDown(e, _input, close) {
var keyName = CodeMirror.keyName(e);
("Esc" == keyName || "Ctrl-C" == keyName || "Ctrl-[" == keyName) && (CodeMirror.e_stop(e), 
close(), cm.focus());
}
"keyToEx" == command.type ? exCommandDispatcher.processCommand(cm, command.exArgs.input) :vim.visualMode ? showPrompt(cm, {
onClose:onPromptClose,
prefix:":",
value:"'<,'>",
onKeyDown:onPromptKeyDown
}) :showPrompt(cm, {
onClose:onPromptClose,
prefix:":",
onKeyDown:onPromptKeyDown
});
},
evalInput:function(cm, vim) {
var curEnd, repeat, inputState = vim.inputState, motion = inputState.motion, motionArgs = inputState.motionArgs || {}, operator = inputState.operator, operatorArgs = inputState.operatorArgs || {}, registerName = inputState.registerName, selectionEnd = cm.getCursor("head"), selectionStart = cm.getCursor("anchor"), curStart = copyCursor(selectionEnd), curOriginal = copyCursor(curStart);
if (operator && this.recordLastEdit(vim, inputState), repeat = void 0 !== inputState.repeatOverride ? inputState.repeatOverride :inputState.getRepeat(), 
repeat > 0 && motionArgs.explicitRepeat ? motionArgs.repeatIsExplicit = !0 :(motionArgs.noRepeat || !motionArgs.explicitRepeat && 0 === repeat) && (repeat = 1, 
motionArgs.repeatIsExplicit = !1), inputState.selectedCharacter && (motionArgs.selectedCharacter = operatorArgs.selectedCharacter = inputState.selectedCharacter), 
motionArgs.repeat = repeat, vim.inputState = new InputState(), motion) {
var motionResult = motions[motion](cm, motionArgs, vim);
if (vim.lastMotion = motions[motion], !motionResult) return;
if (motionArgs.toJumplist) {
var jumpList = vimGlobalState.jumpList, cachedCursor = jumpList.cachedCursor;
cachedCursor ? (recordJumpPosition(cm, cachedCursor, motionResult), delete jumpList.cachedCursor) :recordJumpPosition(cm, curOriginal, motionResult);
}
if (motionResult instanceof Array ? (curStart = motionResult[0], curEnd = motionResult[1]) :curEnd = motionResult, 
curEnd || (curEnd = {
ch:curStart.ch,
line:curStart.line
}), vim.visualMode) {
if (cursorIsBefore(selectionStart, selectionEnd) && (cursorEqual(selectionStart, curEnd) || cursorIsBefore(curEnd, selectionStart)) ? selectionStart.ch += 1 :cursorIsBefore(selectionEnd, selectionStart) && (cursorEqual(selectionStart, curEnd) || cursorIsBefore(selectionStart, curEnd)) && (selectionStart.ch -= 1), 
selectionEnd = curEnd, vim.visualLine) if (cursorIsBefore(selectionStart, selectionEnd)) {
selectionStart.ch = 0;
var lastLine = cm.lastLine();
selectionEnd.line > lastLine && (selectionEnd.line = lastLine), selectionEnd.ch = lineLength(cm, selectionEnd.line);
} else selectionEnd.ch = 0, selectionStart.ch = lineLength(cm, selectionStart.line);
cm.setSelection(selectionStart, selectionEnd), updateMark(cm, vim, "<", cursorIsBefore(selectionStart, selectionEnd) ? selectionStart :selectionEnd), 
updateMark(cm, vim, ">", cursorIsBefore(selectionStart, selectionEnd) ? selectionEnd :selectionStart);
} else operator || (curEnd = clipCursorToContent(cm, curEnd), cm.setCursor(curEnd.line, curEnd.ch));
}
if (operator) {
var inverted = !1;
if (vim.lastMotion = null, operatorArgs.repeat = repeat, vim.visualMode && (curStart = selectionStart, 
curEnd = selectionEnd, motionArgs.inclusive = !0), cursorIsBefore(curEnd, curStart)) {
var tmp = curStart;
curStart = curEnd, curEnd = tmp, inverted = !0;
}
!motionArgs.inclusive || vim.visualMode && inverted || curEnd.ch++;
var linewise = motionArgs.linewise || vim.visualMode && vim.visualLine;
linewise ? expandSelectionToLine(cm, curStart, curEnd) :motionArgs.forward && clipToLine(cm, curStart, curEnd), 
operatorArgs.registerName = registerName, operatorArgs.linewise = linewise, operators[operator](cm, operatorArgs, vim, curStart, curEnd, curOriginal), 
vim.visualMode && exitVisualMode(cm);
}
},
recordLastEdit:function(vim, inputState, actionCommand) {
var macroModeState = vimGlobalState.macroModeState;
macroModeState.inReplay || (vim.lastEditInputState = inputState, vim.lastEditActionCommand = actionCommand, 
macroModeState.lastInsertModeChanges.changes = [], macroModeState.lastInsertModeChanges.expectCursorActivityForChange = !1);
}
}, motions = {
moveToTopLine:function(cm, motionArgs) {
var line = getUserVisibleLines(cm).top + motionArgs.repeat - 1;
return {
line:line,
ch:findFirstNonWhiteSpaceCharacter(cm.getLine(line))
};
},
moveToMiddleLine:function(cm) {
var range = getUserVisibleLines(cm), line = Math.floor(.5 * (range.top + range.bottom));
return {
line:line,
ch:findFirstNonWhiteSpaceCharacter(cm.getLine(line))
};
},
moveToBottomLine:function(cm, motionArgs) {
var line = getUserVisibleLines(cm).bottom - motionArgs.repeat + 1;
return {
line:line,
ch:findFirstNonWhiteSpaceCharacter(cm.getLine(line))
};
},
expandToLine:function(cm, motionArgs) {
var cur = cm.getCursor();
return {
line:cur.line + motionArgs.repeat - 1,
ch:1/0
};
},
findNext:function(cm, motionArgs) {
var state = getSearchState(cm), query = state.getQuery();
if (query) {
var prev = !motionArgs.forward;
return prev = state.isReversed() ? !prev :prev, highlightSearchMatches(cm, query), 
findNext(cm, prev, query, motionArgs.repeat);
}
},
goToMark:function(_cm, motionArgs, vim) {
var mark = vim.marks[motionArgs.selectedCharacter];
return mark ? mark.find() :null;
},
jumpToMark:function(cm, motionArgs, vim) {
for (var best = cm.getCursor(), i = 0; i < motionArgs.repeat; i++) {
var cursor = best;
for (var key in vim.marks) if (isLowerCase(key)) {
var mark = vim.marks[key].find(), isWrongDirection = motionArgs.forward ? cursorIsBefore(mark, cursor) :cursorIsBefore(cursor, mark);
if (!(isWrongDirection || motionArgs.linewise && mark.line == cursor.line)) {
var equal = cursorEqual(cursor, best), between = motionArgs.forward ? cusrorIsBetween(cursor, mark, best) :cusrorIsBetween(best, mark, cursor);
(equal || between) && (best = mark);
}
}
}
return motionArgs.linewise && (best.ch = findFirstNonWhiteSpaceCharacter(cm.getLine(best.line))), 
best;
},
moveByCharacters:function(cm, motionArgs) {
var cur = cm.getCursor(), repeat = motionArgs.repeat, ch = motionArgs.forward ? cur.ch + repeat :cur.ch - repeat;
return {
line:cur.line,
ch:ch
};
},
moveByLines:function(cm, motionArgs, vim) {
var cur = cm.getCursor(), endCh = cur.ch;
switch (vim.lastMotion) {
case this.moveByLines:
case this.moveByDisplayLines:
case this.moveByScroll:
case this.moveToColumn:
case this.moveToEol:
endCh = vim.lastHPos;
break;

default:
vim.lastHPos = endCh;
}
var repeat = motionArgs.repeat + (motionArgs.repeatOffset || 0), line = motionArgs.forward ? cur.line + repeat :cur.line - repeat, first = cm.firstLine(), last = cm.lastLine();
return first > line && cur.line == first || line > last && cur.line == last ? void 0 :(motionArgs.toFirstChar && (endCh = findFirstNonWhiteSpaceCharacter(cm.getLine(line)), 
vim.lastHPos = endCh), vim.lastHSPos = cm.charCoords({
line:line,
ch:endCh
}, "div").left, {
line:line,
ch:endCh
});
},
moveByDisplayLines:function(cm, motionArgs, vim) {
var cur = cm.getCursor();
switch (vim.lastMotion) {
case this.moveByDisplayLines:
case this.moveByScroll:
case this.moveByLines:
case this.moveToColumn:
case this.moveToEol:
break;

default:
vim.lastHSPos = cm.charCoords(cur, "div").left;
}
var repeat = motionArgs.repeat, res = cm.findPosV(cur, motionArgs.forward ? repeat :-repeat, "line", vim.lastHSPos);
if (res.hitSide) if (motionArgs.forward) var lastCharCoords = cm.charCoords(res, "div"), goalCoords = {
top:lastCharCoords.top + 8,
left:vim.lastHSPos
}, res = cm.coordsChar(goalCoords, "div"); else {
var resCoords = cm.charCoords({
line:cm.firstLine(),
ch:0
}, "div");
resCoords.left = vim.lastHSPos, res = cm.coordsChar(resCoords, "div");
}
return vim.lastHPos = res.ch, res;
},
moveByPage:function(cm, motionArgs) {
var curStart = cm.getCursor(), repeat = motionArgs.repeat;
cm.moveV(motionArgs.forward ? repeat :-repeat, "page");
var curEnd = cm.getCursor();
return cm.setCursor(curStart), curEnd;
},
moveByParagraph:function(cm, motionArgs) {
for (var line = cm.getCursor().line, repeat = motionArgs.repeat, inc = motionArgs.forward ? 1 :-1, i = 0; repeat > i && !(!motionArgs.forward && line === cm.firstLine() || motionArgs.forward && line == cm.lastLine()); i++) for (line += inc; line !== cm.firstLine() && line != cm.lastLine() && cm.getLine(line); ) line += inc;
return {
line:line,
ch:0
};
},
moveByScroll:function(cm, motionArgs, vim) {
var scrollbox = cm.getScrollInfo(), curEnd = null, repeat = motionArgs.repeat;
repeat || (repeat = scrollbox.clientHeight / (2 * cm.defaultTextHeight()));
var orig = cm.charCoords(cm.getCursor(), "local");
motionArgs.repeat = repeat;
var curEnd = motions.moveByDisplayLines(cm, motionArgs, vim);
if (!curEnd) return null;
var dest = cm.charCoords(curEnd, "local");
return cm.scrollTo(null, scrollbox.top + dest.top - orig.top), curEnd;
},
moveByWords:function(cm, motionArgs) {
return moveToWord(cm, motionArgs.repeat, !!motionArgs.forward, !!motionArgs.wordEnd, !!motionArgs.bigWord);
},
moveTillCharacter:function(cm, motionArgs) {
var repeat = motionArgs.repeat, curEnd = moveToCharacter(cm, repeat, motionArgs.forward, motionArgs.selectedCharacter), increment = motionArgs.forward ? -1 :1;
return recordLastCharacterSearch(increment, motionArgs), curEnd ? (curEnd.ch += increment, 
curEnd) :null;
},
moveToCharacter:function(cm, motionArgs) {
var repeat = motionArgs.repeat;
return recordLastCharacterSearch(0, motionArgs), moveToCharacter(cm, repeat, motionArgs.forward, motionArgs.selectedCharacter) || cm.getCursor();
},
moveToSymbol:function(cm, motionArgs) {
var repeat = motionArgs.repeat;
return findSymbol(cm, repeat, motionArgs.forward, motionArgs.selectedCharacter) || cm.getCursor();
},
moveToColumn:function(cm, motionArgs, vim) {
var repeat = motionArgs.repeat;
return vim.lastHPos = repeat - 1, vim.lastHSPos = cm.charCoords(cm.getCursor(), "div").left, 
moveToColumn(cm, repeat);
},
moveToEol:function(cm, motionArgs, vim) {
var cur = cm.getCursor();
vim.lastHPos = 1/0;
var retval = {
line:cur.line + motionArgs.repeat - 1,
ch:1/0
}, end = cm.clipPos(retval);
return end.ch--, vim.lastHSPos = cm.charCoords(end, "div").left, retval;
},
moveToFirstNonWhiteSpaceCharacter:function(cm) {
var cursor = cm.getCursor();
return {
line:cursor.line,
ch:findFirstNonWhiteSpaceCharacter(cm.getLine(cursor.line))
};
},
moveToMatchedSymbol:function(cm) {
var symbol, cursor = cm.getCursor(), line = cursor.line, ch = cursor.ch, lineText = cm.getLine(line), startContext = cm.getTokenAt(cursor).type, startCtxLevel = getContextLevel(startContext);
do if (symbol = lineText.charAt(ch++), symbol && isMatchableSymbol(symbol)) {
var endContext = cm.getTokenAt({
line:line,
ch:ch
}).type, endCtxLevel = getContextLevel(endContext);
if (startCtxLevel >= endCtxLevel) break;
} while (symbol);
return symbol ? findMatchedSymbol(cm, {
line:line,
ch:ch - 1
}, symbol) :cursor;
},
moveToStartOfLine:function(cm) {
var cursor = cm.getCursor();
return {
line:cursor.line,
ch:0
};
},
moveToLineOrEdgeOfDocument:function(cm, motionArgs) {
var lineNum = motionArgs.forward ? cm.lastLine() :cm.firstLine();
return motionArgs.repeatIsExplicit && (lineNum = motionArgs.repeat - cm.getOption("firstLineNumber")), 
{
line:lineNum,
ch:findFirstNonWhiteSpaceCharacter(cm.getLine(lineNum))
};
},
textObjectManipulation:function(cm, motionArgs) {
var tmp, mirroredPairs = {
"(":")",
")":"(",
"{":"}",
"}":"{",
"[":"]",
"]":"["
}, selfPaired = {
"'":!0,
'"':!0
}, character = motionArgs.selectedCharacter, inclusive = !motionArgs.textObjectInner;
if (mirroredPairs[character]) tmp = selectCompanionObject(cm, mirroredPairs[character], inclusive); else if (selfPaired[character]) tmp = findBeginningAndEnd(cm, character, inclusive); else if ("W" === character) tmp = expandWordUnderCursor(cm, inclusive, !0, !0); else {
if ("w" !== character) return null;
tmp = expandWordUnderCursor(cm, inclusive, !0, !1);
}
return [ tmp.start, tmp.end ];
},
repeatLastCharacterSearch:function(cm, motionArgs) {
var lastSearch = vimGlobalState.lastChararacterSearch, repeat = motionArgs.repeat, forward = motionArgs.forward === lastSearch.forward, increment = (lastSearch.increment ? 1 :0) * (forward ? -1 :1);
cm.moveH(-increment, "char"), motionArgs.inclusive = forward ? !0 :!1;
var curEnd = moveToCharacter(cm, repeat, forward, lastSearch.selectedCharacter);
return curEnd ? (curEnd.ch += increment, curEnd) :(cm.moveH(increment, "char"), 
cm.getCursor());
}
}, operators = {
change:function(cm, operatorArgs, _vim, curStart, curEnd) {
if (vimGlobalState.registerController.pushText(operatorArgs.registerName, "change", cm.getRange(curStart, curEnd), operatorArgs.linewise), 
operatorArgs.linewise) {
var replacement = curEnd.line > cm.lastLine() ? "" :"\n";
cm.replaceRange(replacement, curStart, curEnd), cm.indentLine(curStart.line, "smart"), 
curStart.ch = null;
} else {
var text = cm.getRange(curStart, curEnd);
if (!isWhiteSpaceString(text)) {
var match = /\s+$/.exec(text);
match && (curEnd = offsetCursor(curEnd, 0, -match[0].length));
}
cm.replaceRange("", curStart, curEnd);
}
actions.enterInsertMode(cm, {}, cm.state.vim), cm.setCursor(curStart);
},
"delete":function(cm, operatorArgs, _vim, curStart, curEnd) {
operatorArgs.linewise && curEnd.line > cm.lastLine() && curStart.line > cm.firstLine() && (curStart.line--, 
curStart.ch = lineLength(cm, curStart.line)), vimGlobalState.registerController.pushText(operatorArgs.registerName, "delete", cm.getRange(curStart, curEnd), operatorArgs.linewise), 
cm.replaceRange("", curStart, curEnd), operatorArgs.linewise ? cm.setCursor(motions.moveToFirstNonWhiteSpaceCharacter(cm)) :cm.setCursor(curStart);
},
indent:function(cm, operatorArgs, vim, curStart, curEnd) {
var startLine = curStart.line, endLine = curEnd.line, repeat = vim.visualMode ? operatorArgs.repeat :1;
operatorArgs.linewise && endLine--;
for (var i = startLine; endLine >= i; i++) for (var j = 0; repeat > j; j++) cm.indentLine(i, operatorArgs.indentRight);
cm.setCursor(curStart), cm.setCursor(motions.moveToFirstNonWhiteSpaceCharacter(cm));
},
swapcase:function(cm, operatorArgs, _vim, curStart, curEnd, curOriginal) {
for (var toSwap = cm.getRange(curStart, curEnd), swapped = "", i = 0; i < toSwap.length; i++) {
var character = toSwap.charAt(i);
swapped += isUpperCase(character) ? character.toLowerCase() :character.toUpperCase();
}
cm.replaceRange(swapped, curStart, curEnd), operatorArgs.shouldMoveCursor || cm.setCursor(curOriginal);
},
yank:function(cm, operatorArgs, _vim, curStart, curEnd, curOriginal) {
vimGlobalState.registerController.pushText(operatorArgs.registerName, "yank", cm.getRange(curStart, curEnd), operatorArgs.linewise), 
cm.setCursor(curOriginal);
}
}, actions = {
jumpListWalk:function(cm, actionArgs, vim) {
if (!vim.visualMode) {
var repeat = actionArgs.repeat, forward = actionArgs.forward, jumpList = vimGlobalState.jumpList, mark = jumpList.move(cm, forward ? repeat :-repeat), markPos = mark ? mark.find() :void 0;
markPos = markPos ? markPos :cm.getCursor(), cm.setCursor(markPos);
}
},
scroll:function(cm, actionArgs, vim) {
if (!vim.visualMode) {
var repeat = actionArgs.repeat || 1, lineHeight = cm.defaultTextHeight(), top = cm.getScrollInfo().top, delta = lineHeight * repeat, newPos = actionArgs.forward ? top + delta :top - delta, cursor = cm.getCursor(), cursorCoords = cm.charCoords(cursor, "local");
if (actionArgs.forward) newPos > cursorCoords.top ? (cursor.line += (newPos - cursorCoords.top) / lineHeight, 
cursor.line = Math.ceil(cursor.line), cm.setCursor(cursor), cursorCoords = cm.charCoords(cursor, "local"), 
cm.scrollTo(null, cursorCoords.top)) :cm.scrollTo(null, newPos); else {
var newBottom = newPos + cm.getScrollInfo().clientHeight;
newBottom < cursorCoords.bottom ? (cursor.line -= (cursorCoords.bottom - newBottom) / lineHeight, 
cursor.line = Math.floor(cursor.line), cm.setCursor(cursor), cursorCoords = cm.charCoords(cursor, "local"), 
cm.scrollTo(null, cursorCoords.bottom - cm.getScrollInfo().clientHeight)) :cm.scrollTo(null, newPos);
}
}
},
scrollToCursor:function(cm, actionArgs) {
var lineNum = cm.getCursor().line, charCoords = cm.charCoords({
line:lineNum,
ch:0
}, "local"), height = cm.getScrollInfo().clientHeight, y = charCoords.top, lineHeight = charCoords.bottom - y;
switch (actionArgs.position) {
case "center":
y = y - height / 2 + lineHeight;
break;

case "bottom":
y = y - height + 1.4 * lineHeight;
break;

case "top":
y += .4 * lineHeight;
}
cm.scrollTo(null, y);
},
replayMacro:function(cm, actionArgs) {
var registerName = actionArgs.selectedCharacter, repeat = actionArgs.repeat, macroModeState = vimGlobalState.macroModeState;
"@" == registerName && (registerName = macroModeState.latestRegister);
for (var keyBuffer = parseRegisterToKeyBuffer(macroModeState, registerName); repeat--; ) executeMacroKeyBuffer(cm, macroModeState, keyBuffer);
},
exitMacroRecordMode:function() {
var macroModeState = vimGlobalState.macroModeState;
macroModeState.toggle(), parseKeyBufferToRegister(macroModeState.latestRegister, macroModeState.macroKeyBuffer);
},
enterMacroRecordMode:function(cm, actionArgs) {
var macroModeState = vimGlobalState.macroModeState, registerName = actionArgs.selectedCharacter;
macroModeState.toggle(cm, registerName), emptyMacroKeyBuffer(macroModeState);
},
enterInsertMode:function(cm, actionArgs, vim) {
if (!cm.getOption("readOnly")) {
vim.insertMode = !0, vim.insertModeRepeat = actionArgs && actionArgs.repeat || 1;
var insertAt = actionArgs ? actionArgs.insertAt :null;
if ("eol" == insertAt) {
var cursor = cm.getCursor();
cursor = {
line:cursor.line,
ch:lineLength(cm, cursor.line)
}, cm.setCursor(cursor);
} else "charAfter" == insertAt ? cm.setCursor(offsetCursor(cm.getCursor(), 0, 1)) :"firstNonBlank" == insertAt && cm.setCursor(motions.moveToFirstNonWhiteSpaceCharacter(cm));
cm.setOption("keyMap", "vim-insert"), cm.setOption("disableInput", !1), actionArgs && actionArgs.replace ? (cm.toggleOverwrite(!0), 
cm.setOption("keyMap", "vim-replace"), CodeMirror.signal(cm, "vim-mode-change", {
mode:"replace"
})) :(cm.setOption("keyMap", "vim-insert"), CodeMirror.signal(cm, "vim-mode-change", {
mode:"insert"
})), vimGlobalState.macroModeState.inReplay || (cm.on("change", onChange), cm.on("cursorActivity", onCursorActivity), 
CodeMirror.on(cm.getInputField(), "keydown", onKeyEventTargetKeyDown));
}
},
toggleVisualMode:function(cm, actionArgs, vim) {
var curEnd, repeat = actionArgs.repeat, curStart = cm.getCursor();
vim.visualMode ? (curStart = cm.getCursor("anchor"), curEnd = cm.getCursor("head"), 
!vim.visualLine && actionArgs.linewise ? (vim.visualLine = !0, curStart.ch = cursorIsBefore(curStart, curEnd) ? 0 :lineLength(cm, curStart.line), 
curEnd.ch = cursorIsBefore(curStart, curEnd) ? lineLength(cm, curEnd.line) :0, cm.setSelection(curStart, curEnd), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:"linewise"
})) :vim.visualLine && !actionArgs.linewise ? (vim.visualLine = !1, CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual"
})) :exitVisualMode(cm)) :(cm.on("mousedown", exitVisualMode), vim.visualMode = !0, 
vim.visualLine = !!actionArgs.linewise, vim.visualLine ? (curStart.ch = 0, curEnd = clipCursorToContent(cm, {
line:curStart.line + repeat - 1,
ch:lineLength(cm, curStart.line)
}, !0)) :curEnd = clipCursorToContent(cm, {
line:curStart.line,
ch:curStart.ch + repeat
}, !0), actionArgs.repeatIsExplicit || vim.visualLine ? cm.setSelection(curStart, curEnd) :(cm.setCursor(curEnd), 
cm.setSelection(curEnd, curStart)), CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:vim.visualLine ? "linewise" :""
})), updateMark(cm, vim, "<", cursorIsBefore(curStart, curEnd) ? curStart :curEnd), 
updateMark(cm, vim, ">", cursorIsBefore(curStart, curEnd) ? curEnd :curStart);
},
joinLines:function(cm, actionArgs, vim) {
var curStart, curEnd;
if (vim.visualMode) curStart = cm.getCursor("anchor"), curEnd = cm.getCursor("head"), 
curEnd.ch = lineLength(cm, curEnd.line) - 1; else {
var repeat = Math.max(actionArgs.repeat, 2);
curStart = cm.getCursor(), curEnd = clipCursorToContent(cm, {
line:curStart.line + repeat - 1,
ch:1/0
});
}
var finalCh = 0;
cm.operation(function() {
for (var i = curStart.line; i < curEnd.line; i++) {
finalCh = lineLength(cm, curStart.line);
var tmp = {
line:curStart.line + 1,
ch:lineLength(cm, curStart.line + 1)
}, text = cm.getRange(curStart, tmp);
text = text.replace(/\n\s*/g, " "), cm.replaceRange(text, curStart, tmp);
}
var curFinalPos = {
line:curStart.line,
ch:finalCh
};
cm.setCursor(curFinalPos);
});
},
newLineAndEnterInsertMode:function(cm, actionArgs, vim) {
vim.insertMode = !0;
var insertAt = cm.getCursor();
if (insertAt.line !== cm.firstLine() || actionArgs.after) {
insertAt.line = actionArgs.after ? insertAt.line :insertAt.line - 1, insertAt.ch = lineLength(cm, insertAt.line), 
cm.setCursor(insertAt);
var newlineFn = CodeMirror.commands.newlineAndIndentContinueComment || CodeMirror.commands.newlineAndIndent;
newlineFn(cm);
} else cm.replaceRange("\n", {
line:cm.firstLine(),
ch:0
}), cm.setCursor(cm.firstLine(), 0);
this.enterInsertMode(cm, {
repeat:actionArgs.repeat
}, vim);
},
paste:function(cm, actionArgs) {
var cur = cm.getCursor(), register = vimGlobalState.registerController.getRegister(actionArgs.registerName);
if (register.text) {
for (var text = "", i = 0; i < actionArgs.repeat; i++) text += register.text;
var linewise = register.linewise;
linewise ? actionArgs.after ? (text = "\n" + text.slice(0, text.length - 1), cur.ch = lineLength(cm, cur.line)) :cur.ch = 0 :cur.ch += actionArgs.after ? 1 :0, 
cm.replaceRange(text, cur);
var curPosFinal, idx;
linewise && actionArgs.after ? curPosFinal = {
line:cur.line + 1,
ch:findFirstNonWhiteSpaceCharacter(cm.getLine(cur.line + 1))
} :linewise && !actionArgs.after ? curPosFinal = {
line:cur.line,
ch:findFirstNonWhiteSpaceCharacter(cm.getLine(cur.line))
} :!linewise && actionArgs.after ? (idx = cm.indexFromPos(cur), curPosFinal = cm.posFromIndex(idx + text.length - 1)) :(idx = cm.indexFromPos(cur), 
curPosFinal = cm.posFromIndex(idx + text.length)), cm.setCursor(curPosFinal);
}
},
undo:function(cm, actionArgs) {
cm.operation(function() {
repeatFn(cm, CodeMirror.commands.undo, actionArgs.repeat)(), cm.setCursor(cm.getCursor("anchor"));
});
},
redo:function(cm, actionArgs) {
repeatFn(cm, CodeMirror.commands.redo, actionArgs.repeat)();
},
setRegister:function(_cm, actionArgs, vim) {
vim.inputState.registerName = actionArgs.selectedCharacter;
},
setMark:function(cm, actionArgs, vim) {
var markName = actionArgs.selectedCharacter;
updateMark(cm, vim, markName, cm.getCursor());
},
replace:function(cm, actionArgs, vim) {
var replaceTo, curEnd, replaceWith = actionArgs.selectedCharacter, curStart = cm.getCursor();
if (vim.visualMode) curStart = cm.getCursor("start"), curEnd = cm.getCursor("end"), 
curEnd = cm.clipPos({
line:curEnd.line,
ch:curEnd.ch + 1
}); else {
var line = cm.getLine(curStart.line);
replaceTo = curStart.ch + actionArgs.repeat, replaceTo > line.length && (replaceTo = line.length), 
curEnd = {
line:curStart.line,
ch:replaceTo
};
}
if ("\n" == replaceWith) vim.visualMode || cm.replaceRange("", curStart, curEnd), 
(CodeMirror.commands.newlineAndIndentContinueComment || CodeMirror.commands.newlineAndIndent)(cm); else {
var replaceWithStr = cm.getRange(curStart, curEnd);
replaceWithStr = replaceWithStr.replace(/[^\n]/g, replaceWith), cm.replaceRange(replaceWithStr, curStart, curEnd), 
vim.visualMode ? (cm.setCursor(curStart), exitVisualMode(cm)) :cm.setCursor(offsetCursor(curEnd, 0, -1));
}
},
incrementNumberToken:function(cm, actionArgs) {
for (var match, start, end, numberStr, token, cur = cm.getCursor(), lineStr = cm.getLine(cur.line), re = /-?\d+/g; null !== (match = re.exec(lineStr)) && (token = match[0], 
start = match.index, end = start + token.length, !(cur.ch < end)); ) ;
if ((actionArgs.backtrack || !(end <= cur.ch)) && token) {
var increment = actionArgs.increase ? 1 :-1, number = parseInt(token) + increment * actionArgs.repeat, from = {
ch:start,
line:cur.line
}, to = {
ch:end,
line:cur.line
};
numberStr = number.toString(), cm.replaceRange(numberStr, from, to), cm.setCursor({
line:cur.line,
ch:start + numberStr.length - 1
});
}
},
repeatLastEdit:function(cm, actionArgs, vim) {
var lastEditInputState = vim.lastEditInputState;
if (lastEditInputState) {
var repeat = actionArgs.repeat;
repeat && actionArgs.repeatIsExplicit ? vim.lastEditInputState.repeatOverride = repeat :repeat = vim.lastEditInputState.repeatOverride || repeat, 
repeatLastEdit(cm, vim, repeat, !1);
}
}
}, symbolToMode = {
"(":"bracket",
")":"bracket",
"{":"bracket",
"}":"bracket",
"[":"section",
"]":"section",
"*":"comment",
"/":"comment",
m:"method",
M:"method",
"#":"preprocess"
}, findSymbolModes = {
bracket:{
isComplete:function(state) {
if (state.nextCh === state.symb) {
if (state.depth++, state.depth >= 1) return !0;
} else state.nextCh === state.reverseSymb && state.depth--;
return !1;
}
},
section:{
init:function(state) {
state.curMoveThrough = !0, state.symb = (state.forward ? "]" :"[") === state.symb ? "{" :"}";
},
isComplete:function(state) {
return 0 === state.index && state.nextCh === state.symb;
}
},
comment:{
isComplete:function(state) {
var found = "*" === state.lastCh && "/" === state.nextCh;
return state.lastCh = state.nextCh, found;
}
},
method:{
init:function(state) {
state.symb = "m" === state.symb ? "{" :"}", state.reverseSymb = "{" === state.symb ? "}" :"{";
},
isComplete:function(state) {
return state.nextCh === state.symb ? !0 :!1;
}
},
preprocess:{
init:function(state) {
state.index = 0;
},
isComplete:function(state) {
if ("#" === state.nextCh) {
var token = state.lineText.match(/#(\w+)/)[1];
if ("endif" === token) {
if (state.forward && 0 === state.depth) return !0;
state.depth++;
} else if ("if" === token) {
if (!state.forward && 0 === state.depth) return !0;
state.depth--;
}
if ("else" === token && 0 === state.depth) return !0;
}
return !1;
}
}
};
SearchState.prototype = {
getQuery:function() {
return vimGlobalState.query;
},
setQuery:function(query) {
vimGlobalState.query = query;
},
getOverlay:function() {
return this.searchOverlay;
},
setOverlay:function(overlay) {
this.searchOverlay = overlay;
},
isReversed:function() {
return vimGlobalState.isReversed;
},
setReversed:function(reversed) {
vimGlobalState.isReversed = reversed;
}
};
var searchPromptDesc = "(Javascript regexp)", defaultExCommandMap = [ {
name:"map"
}, {
name:"nmap",
shortName:"nm"
}, {
name:"vmap",
shortName:"vm"
}, {
name:"write",
shortName:"w"
}, {
name:"undo",
shortName:"u"
}, {
name:"redo",
shortName:"red"
}, {
name:"sort",
shortName:"sor"
}, {
name:"substitute",
shortName:"s"
}, {
name:"nohlsearch",
shortName:"noh"
}, {
name:"delmarks",
shortName:"delm"
} ];
Vim.ExCommandDispatcher = function() {
this.buildCommandMap_();
}, Vim.ExCommandDispatcher.prototype = {
processCommand:function(cm, input) {
var vim = cm.state.vim;
vim.visualMode && exitVisualMode(cm);
var inputStream = new CodeMirror.StringStream(input), params = {};
params.input = input;
try {
this.parseInput_(cm, inputStream, params);
} catch (e) {
return showConfirm(cm, e), void 0;
}
var commandName;
if (params.commandName) {
var command = this.matchCommand_(params.commandName);
if (command) {
if (commandName = command.name, this.parseCommandArgs_(inputStream, params, command), 
"exToKey" == command.type) {
for (var i = 0; i < command.toKeys.length; i++) CodeMirror.Vim.handleKey(cm, command.toKeys[i]);
return;
}
if ("exToEx" == command.type) return this.processCommand(cm, command.toInput), void 0;
}
} else void 0 !== params.line && (commandName = "move");
if (!commandName) return showConfirm(cm, 'Not an editor command ":' + input + '"'), 
void 0;
try {
exCommands[commandName](cm, params);
} catch (e) {
throw showConfirm(cm, e), e;
}
},
parseInput_:function(cm, inputStream, result) {
inputStream.eatWhile(":"), inputStream.eat("%") ? (result.line = cm.firstLine(), 
result.lineEnd = cm.lastLine()) :(result.line = this.parseLineSpec_(cm, inputStream), 
void 0 !== result.line && inputStream.eat(",") && (result.lineEnd = this.parseLineSpec_(cm, inputStream)));
var commandMatch = inputStream.match(/^(\w+)/);
return result.commandName = commandMatch ? commandMatch[1] :inputStream.match(/.*/)[0], 
result;
},
parseLineSpec_:function(cm, inputStream) {
var numberMatch = inputStream.match(/^(\d+)/);
if (numberMatch) return parseInt(numberMatch[1], 10) - 1;
switch (inputStream.next()) {
case ".":
return cm.getCursor().line;

case "$":
return cm.lastLine();

case "'":
var mark = cm.state.vim.marks[inputStream.next()];
if (mark && mark.find()) return mark.find().line;
throw new Error("Mark not set");

default:
return inputStream.backUp(1), void 0;
}
},
parseCommandArgs_:function(inputStream, params, command) {
if (!inputStream.eol()) {
params.argString = inputStream.match(/.*/)[0];
var delim = command.argDelimiter || /\s+/, args = trim(params.argString).split(delim);
args.length && args[0] && (params.args = args);
}
},
matchCommand_:function(commandName) {
for (var i = commandName.length; i > 0; i--) {
var prefix = commandName.substring(0, i);
if (this.commandMap_[prefix]) {
var command = this.commandMap_[prefix];
if (0 === command.name.indexOf(commandName)) return command;
}
}
return null;
},
buildCommandMap_:function() {
this.commandMap_ = {};
for (var i = 0; i < defaultExCommandMap.length; i++) {
var command = defaultExCommandMap[i], key = command.shortName || command.name;
this.commandMap_[key] = command;
}
},
map:function(lhs, rhs, ctx) {
if (":" != lhs && ":" == lhs.charAt(0)) {
if (ctx) throw Error("Mode not supported for ex mappings");
var commandName = lhs.substring(1);
this.commandMap_[commandName] = ":" != rhs && ":" == rhs.charAt(0) ? {
name:commandName,
type:"exToEx",
toInput:rhs.substring(1)
} :{
name:commandName,
type:"exToKey",
toKeys:parseKeyString(rhs)
};
} else if (":" != rhs && ":" == rhs.charAt(0)) {
var mapping = {
keys:parseKeyString(lhs),
type:"keyToEx",
exArgs:{
input:rhs.substring(1)
}
};
ctx && (mapping.context = ctx), defaultKeymap.unshift(mapping);
} else {
var mapping = {
keys:parseKeyString(lhs),
type:"keyToKey",
toKeys:parseKeyString(rhs)
};
ctx && (mapping.context = ctx), defaultKeymap.unshift(mapping);
}
}
};
var exCommands = {
map:function(cm, params, ctx) {
var mapArgs = params.args;
return !mapArgs || mapArgs.length < 2 ? (cm && showConfirm(cm, "Invalid mapping: " + params.input), 
void 0) :(exCommandDispatcher.map(mapArgs[0], mapArgs[1], ctx), void 0);
},
nmap:function(cm, params) {
this.map(cm, params, "normal");
},
vmap:function(cm, params) {
this.map(cm, params, "visual");
},
move:function(cm, params) {
commandDispatcher.processCommand(cm, cm.state.vim, {
type:"motion",
motion:"moveToLineOrEdgeOfDocument",
motionArgs:{
forward:!1,
explicitRepeat:!0,
linewise:!0
},
repeatOverride:params.line + 1
});
},
sort:function(cm, params) {
function parseArgs() {
if (params.argString) {
var args = new CodeMirror.StringStream(params.argString);
if (args.eat("!") && (reverse = !0), args.eol()) return;
if (!args.eatSpace()) return "Invalid arguments";
var opts = args.match(/[a-z]+/);
if (opts) {
opts = opts[0], ignoreCase = -1 != opts.indexOf("i"), unique = -1 != opts.indexOf("u");
var decimal = -1 != opts.indexOf("d") && 1, hex = -1 != opts.indexOf("x") && 1, octal = -1 != opts.indexOf("o") && 1;
if (decimal + hex + octal > 1) return "Invalid arguments";
number = decimal && "decimal" || hex && "hex" || octal && "octal";
}
args.eatSpace() && args.match(/\/.*\//);
}
}
function compareFn(a, b) {
if (reverse) {
var tmp;
tmp = a, a = b, b = tmp;
}
ignoreCase && (a = a.toLowerCase(), b = b.toLowerCase());
var anum = number && numberRegex.exec(a), bnum = number && numberRegex.exec(b);
return anum ? (anum = parseInt((anum[1] + anum[2]).toLowerCase(), radix), bnum = parseInt((bnum[1] + bnum[2]).toLowerCase(), radix), 
anum - bnum) :b > a ? -1 :1;
}
var reverse, ignoreCase, unique, number, err = parseArgs();
if (err) return showConfirm(cm, err + ": " + params.argString), void 0;
var lineStart = params.line || cm.firstLine(), lineEnd = params.lineEnd || params.line || cm.lastLine();
if (lineStart != lineEnd) {
var curStart = {
line:lineStart,
ch:0
}, curEnd = {
line:lineEnd,
ch:lineLength(cm, lineEnd)
}, text = cm.getRange(curStart, curEnd).split("\n"), numberRegex = "decimal" == number ? /(-?)([\d]+)/ :"hex" == number ? /(-?)(?:0x)?([0-9a-f]+)/i :"octal" == number ? /([0-7]+)/ :null, radix = "decimal" == number ? 10 :"hex" == number ? 16 :"octal" == number ? 8 :null, numPart = [], textPart = [];
if (number) for (var i = 0; i < text.length; i++) numberRegex.exec(text[i]) ? numPart.push(text[i]) :textPart.push(text[i]); else textPart = text;
if (numPart.sort(compareFn), textPart.sort(compareFn), text = reverse ? numPart.concat(textPart) :textPart.concat(numPart), 
unique) {
var lastLine, textOld = text;
text = [];
for (var i = 0; i < textOld.length; i++) textOld[i] != lastLine && text.push(textOld[i]), 
lastLine = textOld[i];
}
cm.replaceRange(text.join("\n"), curStart, curEnd);
}
},
substitute:function(cm, params) {
if (!cm.getSearchCursor) throw new Error("Search feature not available. Requires searchcursor.js or any other getSearchCursor implementation.");
var argString = params.argString, slashes = findUnescapedSlashes(argString);
if (0 !== slashes[0]) return showConfirm(cm, "Substitutions should be of the form :s/pattern/replace/"), 
void 0;
var flagsPart, count, regexPart = argString.substring(slashes[0] + 1, slashes[1]), replacePart = "", confirm = !1;
if (slashes[1] && (replacePart = argString.substring(slashes[1] + 1, slashes[2]), 
replacePart = fixRegexReplace(replacePart)), slashes[2]) {
var trailing = argString.substring(slashes[2] + 1).split(" ");
flagsPart = trailing[0], count = parseInt(trailing[1]);
}
if (flagsPart && (-1 != flagsPart.indexOf("c") && (confirm = !0, flagsPart.replace("c", "")), 
regexPart = regexPart + "/" + flagsPart), regexPart) try {
updateSearchQuery(cm, regexPart, !0, !0);
} catch (e) {
return showConfirm(cm, "Invalid regex: " + regexPart), void 0;
}
var state = getSearchState(cm), query = state.getQuery(), lineStart = void 0 !== params.line ? params.line :cm.getCursor().line, lineEnd = params.lineEnd || lineStart;
count && (lineStart = lineEnd, lineEnd = lineStart + count - 1);
var startPos = clipCursorToContent(cm, {
line:lineStart,
ch:0
}), cursor = cm.getSearchCursor(query, startPos);
doReplace(cm, confirm, lineStart, lineEnd, cursor, query, replacePart);
},
redo:CodeMirror.commands.redo,
undo:CodeMirror.commands.undo,
write:function(cm) {
CodeMirror.commands.save ? CodeMirror.commands.save(cm) :cm.save();
},
nohlsearch:function(cm) {
clearSearchHighlight(cm);
},
delmarks:function(cm, params) {
if (!params.argString || !trim(params.argString)) return showConfirm(cm, "Argument required"), 
void 0;
for (var state = cm.state.vim, stream = new CodeMirror.StringStream(trim(params.argString)); !stream.eol(); ) {
stream.eatSpace();
var count = stream.pos;
if (!stream.match(/[a-zA-Z]/, !1)) return showConfirm(cm, "Invalid argument: " + params.argString.substring(count)), 
void 0;
var sym = stream.next();
if (stream.match("-", !0)) {
if (!stream.match(/[a-zA-Z]/, !1)) return showConfirm(cm, "Invalid argument: " + params.argString.substring(count)), 
void 0;
var startMark = sym, finishMark = stream.next();
if (!(isLowerCase(startMark) && isLowerCase(finishMark) || isUpperCase(startMark) && isUpperCase(finishMark))) return showConfirm(cm, "Invalid argument: " + startMark + "-"), 
void 0;
var start = startMark.charCodeAt(0), finish = finishMark.charCodeAt(0);
if (start >= finish) return showConfirm(cm, "Invalid argument: " + params.argString.substring(count)), 
void 0;
for (var j = 0; finish - start >= j; j++) {
var mark = String.fromCharCode(start + j);
delete state.marks[mark];
}
} else delete state.marks[sym];
}
}
}, exCommandDispatcher = new Vim.ExCommandDispatcher();
return CodeMirror.keyMap.vim = buildVimKeyMap(), CodeMirror.keyMap["vim-insert"] = {
Esc:exitInsertMode,
"Ctrl-[":exitInsertMode,
"Ctrl-C":exitInsertMode,
"Ctrl-N":"autocomplete",
"Ctrl-P":"autocomplete",
Enter:function(cm) {
var fn = CodeMirror.commands.newlineAndIndentContinueComment || CodeMirror.commands.newlineAndIndent;
fn(cm);
},
fallthrough:[ "default" ]
}, CodeMirror.keyMap["vim-replace"] = {
Backspace:"goCharLeft",
fallthrough:[ "vim-insert" ]
}, resetVimGlobalState(), vimApi;
};
CodeMirror.Vim = Vim();
}(), function() {
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
cm.replaceSelection(txt, "end", "+input");
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
cm.setCursor(cm.getCursor()), cm.setExtending(!0), cm.on("change", function() {
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
cm.replaceSelection(popFromRing());
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
var pos = cm.getCursor();
pos.ch < cm.getLine(pos.line).length && (pos = Pos(pos.line, pos.ch + 1));
var from = cm.findPosH(pos, -2, "char"), range = cm.getRange(from, pos);
2 == range.length && (cm.setSelection(from, pos), cm.replaceSelection(range.charAt(1) + range.charAt(0), "end"));
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
}(), function() {
"use strict";
function firstNonWS(str) {
var found = str.search(nonWS);
return -1 == found ? 0 :found;
}
var noOptions = {}, nonWS = /[^\s\u00a0]/, Pos = CodeMirror.Pos;
CodeMirror.commands.toggleComment = function(cm) {
var from = cm.getCursor("start"), to = cm.getCursor("end");
cm.uncomment(from, to) || cm.lineComment(from, to);
}, CodeMirror.defineExtension("lineComment", function(from, to, options) {
options || (options = noOptions);
var self = this, mode = self.getModeAt(from), commentString = options.lineComment || mode.lineComment;
if (!commentString) return (options.blockCommentStart || mode.blockCommentStart) && (options.fullLines = !0, 
self.blockComment(from, to, options)), void 0;
var firstLine = self.getLine(from.line);
if (null != firstLine) {
var end = Math.min(0 != to.ch || to.line == from.line ? to.line + 1 :to.line, self.lastLine() + 1), pad = null == options.padding ? " " :options.padding, blankLines = options.commentBlankLines || from.line == to.line;
self.operation(function() {
if (options.indent) for (var baseString = firstLine.slice(0, firstNonWS(firstLine)), i = from.line; end > i; ++i) {
var line = self.getLine(i), cut = baseString.length;
(blankLines || nonWS.test(line)) && (line.slice(0, cut) != baseString && (cut = firstNonWS(line)), 
self.replaceRange(baseString + commentString + pad, Pos(i, 0), Pos(i, cut)));
} else for (var i = from.line; end > i; ++i) (blankLines || nonWS.test(self.getLine(i))) && self.replaceRange(commentString + pad, Pos(i, 0));
});
}
}), CodeMirror.defineExtension("blockComment", function(from, to, options) {
options || (options = noOptions);
var self = this, mode = self.getModeAt(from), startString = options.blockCommentStart || mode.blockCommentStart, endString = options.blockCommentEnd || mode.blockCommentEnd;
if (!startString || !endString) return (options.lineComment || mode.lineComment) && 0 != options.fullLines && self.lineComment(from, to, options), 
void 0;
var end = Math.min(to.line, self.lastLine());
end != from.line && 0 == to.ch && nonWS.test(self.getLine(end)) && --end;
var pad = null == options.padding ? " " :options.padding;
from.line > end || self.operation(function() {
if (0 != options.fullLines) {
var lastLineHasText = nonWS.test(self.getLine(end));
self.replaceRange(pad + endString, Pos(end)), self.replaceRange(startString + pad, Pos(from.line, 0));
var lead = options.blockCommentLead || mode.blockCommentLead;
if (null != lead) for (var i = from.line + 1; end >= i; ++i) (i != end || lastLineHasText) && self.replaceRange(lead + pad, Pos(i, 0));
} else self.replaceRange(endString, to), self.replaceRange(startString, from);
});
}), CodeMirror.defineExtension("uncomment", function(from, to, options) {
options || (options = noOptions);
var didSomething, self = this, mode = self.getModeAt(from), end = Math.min(to.line, self.lastLine()), start = Math.min(from.line, end), lineString = options.lineComment || mode.lineComment, lines = [], pad = null == options.padding ? " " :options.padding;
lineComment:if (lineString) {
for (var i = start; end >= i; ++i) {
var line = self.getLine(i), found = line.indexOf(lineString);
if (found > -1 && !/comment/.test(self.getTokenTypeAt(Pos(i, found + 1))) && (found = -1), 
-1 == found && (i != end || i == start) && nonWS.test(line)) break lineComment;
if (found > -1 && nonWS.test(line.slice(0, found))) break lineComment;
lines.push(line);
}
if (self.operation(function() {
for (var i = start; end >= i; ++i) {
var line = lines[i - start], pos = line.indexOf(lineString), endPos = pos + lineString.length;
0 > pos || (line.slice(endPos, endPos + pad.length) == pad && (endPos += pad.length), 
didSomething = !0, self.replaceRange("", Pos(i, pos), Pos(i, endPos)));
}
}), didSomething) return !0;
}
var startString = options.blockCommentStart || mode.blockCommentStart, endString = options.blockCommentEnd || mode.blockCommentEnd;
if (!startString || !endString) return !1;
var lead = options.blockCommentLead || mode.blockCommentLead, startLine = self.getLine(start), endLine = end == start ? startLine :self.getLine(end), open = startLine.indexOf(startString), close = endLine.lastIndexOf(endString);
return -1 == close && start != end && (endLine = self.getLine(--end), close = endLine.lastIndexOf(endString)), 
-1 != open && -1 != close && /comment/.test(self.getTokenTypeAt(Pos(start, open + 1))) && /comment/.test(self.getTokenTypeAt(Pos(end, close + 1))) ? (self.operation(function() {
self.replaceRange("", Pos(end, close - (pad && endLine.slice(close - pad.length, close) == pad ? pad.length :0)), Pos(end, close + endString.length));
var openEnd = open + startString.length;
if (pad && startLine.slice(openEnd, openEnd + pad.length) == pad && (openEnd += pad.length), 
self.replaceRange("", Pos(start, open), Pos(start, openEnd)), lead) for (var i = start + 1; end >= i; ++i) {
var line = self.getLine(i), found = line.indexOf(lead);
if (-1 != found && !nonWS.test(line.slice(0, found))) {
var foundEnd = found + lead.length;
pad && line.slice(foundEnd, foundEnd + pad.length) == pad && (foundEnd += pad.length), 
self.replaceRange("", Pos(i, found), Pos(i, foundEnd));
}
}
}), !0) :!1;
});
}(), function() {
function charsAround(cm, pos) {
var str = cm.getRange(CodeMirror.Pos(pos.line, pos.ch - 1), CodeMirror.Pos(pos.line, pos.ch + 1));
return 2 == str.length ? str :null;
}
function buildKeymap(pairs) {
for (var map = {
name:"autoCloseBrackets",
Backspace:function(cm) {
if (cm.somethingSelected() || cm.getOption("disableInput")) return CodeMirror.Pass;
var cur = cm.getCursor(), around = charsAround(cm, cur);
return around && pairs.indexOf(around) % 2 == 0 ? (cm.replaceRange("", CodeMirror.Pos(cur.line, cur.ch - 1), CodeMirror.Pos(cur.line, cur.ch + 1)), 
void 0) :CodeMirror.Pass;
}
}, closingBrackets = "", i = 0; i < pairs.length; i += 2) (function(left, right) {
function surround(cm) {
var selection = cm.getSelection();
cm.replaceSelection(left + selection + right);
}
function maybeOverwrite(cm) {
var cur = cm.getCursor(), ahead = cm.getRange(cur, CodeMirror.Pos(cur.line, cur.ch + 1));
return ahead != right || cm.somethingSelected() ? CodeMirror.Pass :(cm.execCommand("goCharRight"), 
void 0);
}
left != right && (closingBrackets += right), map["'" + left + "'"] = function(cm) {
if ("'" == left && "comment" == cm.getTokenAt(cm.getCursor()).type || cm.getOption("disableInput")) return CodeMirror.Pass;
if (cm.somethingSelected()) return surround(cm);
if (left != right || maybeOverwrite(cm) == CodeMirror.Pass) {
var cur = cm.getCursor(), ahead = CodeMirror.Pos(cur.line, cur.ch + 1), line = cm.getLine(cur.line), nextChar = line.charAt(cur.ch), curChar = cur.ch > 0 ? line.charAt(cur.ch - 1) :"";
return left == right && CodeMirror.isWordChar(curChar) ? CodeMirror.Pass :line.length == cur.ch || closingBrackets.indexOf(nextChar) >= 0 || SPACE_CHAR_REGEX.test(nextChar) ? (cm.replaceSelection(left + right, {
head:ahead,
anchor:ahead
}), void 0) :CodeMirror.Pass;
}
}, left != right && (map["'" + right + "'"] = maybeOverwrite);
})(pairs.charAt(i), pairs.charAt(i + 1));
return map;
}
function buildExplodeHandler(pairs) {
return function(cm) {
var cur = cm.getCursor(), around = charsAround(cm, cur);
return !around || pairs.indexOf(around) % 2 != 0 || cm.getOption("disableInput") ? CodeMirror.Pass :(cm.operation(function() {
var newPos = CodeMirror.Pos(cur.line + 1, 0);
cm.replaceSelection("\n\n", {
anchor:newPos,
head:newPos
}, "+input"), cm.indentLine(cur.line + 1, null, !0), cm.indentLine(cur.line + 2, null, !0);
}), void 0);
};
}
var DEFAULT_BRACKETS = "()[]{}''\"\"", DEFAULT_EXPLODE_ON_ENTER = "[]{}", SPACE_CHAR_REGEX = /\s/;
CodeMirror.defineOption("autoCloseBrackets", !1, function(cm, val, old) {
if (old != CodeMirror.Init && old && cm.removeKeyMap("autoCloseBrackets"), val) {
var pairs = DEFAULT_BRACKETS, explode = DEFAULT_EXPLODE_ON_ENTER;
"string" == typeof val ? pairs = val :"object" == typeof val && (null != val.pairs && (pairs = val.pairs), 
null != val.explode && (explode = val.explode));
var map = buildKeymap(pairs);
explode && (map.Enter = buildExplodeHandler(explode)), cm.addKeyMap(map);
}
});
}(), function() {
function findMatchingBracket(cm, where, strict) {
function scan(line, lineNo, start) {
if (line.text) {
var pos = forward ? 0 :line.text.length - 1, end = forward ? line.text.length :-1;
if (line.text.length > maxScanLen) return null;
for (null != start && (pos = start + d); pos != end; pos += d) {
var ch = line.text.charAt(pos);
if (re.test(ch) && cm.getTokenTypeAt(Pos(lineNo, pos + 1)) == style) {
var match = matching[ch];
if (">" == match.charAt(1) == forward) stack.push(ch); else {
if (stack.pop() != match.charAt(0)) return {
pos:pos,
match:!1
};
if (!stack.length) return {
pos:pos,
match:!0
};
}
}
}
}
}
var state = cm.state.matchBrackets, maxScanLen = state && state.maxScanLineLength || 1e4, maxScanLines = state && state.maxScanLines || 100, cur = where || cm.getCursor(), line = cm.getLineHandle(cur.line), pos = cur.ch - 1, match = pos >= 0 && matching[line.text.charAt(pos)] || matching[line.text.charAt(++pos)];
if (!match) return null;
var forward = ">" == match.charAt(1), d = forward ? 1 :-1;
if (strict && forward != (pos == cur.ch)) return null;
for (var found, style = cm.getTokenTypeAt(Pos(cur.line, pos + 1)), stack = [ line.text.charAt(pos) ], re = /[(){}[\]]/, i = cur.line, e = forward ? Math.min(i + maxScanLines, cm.lineCount()) :Math.max(-1, i - maxScanLines); i != e && !(found = i == cur.line ? scan(line, i, pos) :scan(cm.getLineHandle(i), i)); i += d) ;
return {
from:Pos(cur.line, pos),
to:found && Pos(i, found.pos),
match:found && found.match,
forward:forward
};
}
function matchBrackets(cm, autoclear) {
var maxHighlightLen = cm.state.matchBrackets.maxHighlightLineLength || 1e3, found = findMatchingBracket(cm);
if (!(!found || cm.getLine(found.from.line).length > maxHighlightLen || found.to && cm.getLine(found.to.line).length > maxHighlightLen)) {
var style = found.match ? "CodeMirror-matchingbracket" :"CodeMirror-nonmatchingbracket", one = cm.markText(found.from, Pos(found.from.line, found.from.ch + 1), {
className:style
}), two = found.to && cm.markText(found.to, Pos(found.to.line, found.to.ch + 1), {
className:style
});
ie_lt8 && cm.state.focused && cm.display.input.focus();
var clear = function() {
cm.operation(function() {
one.clear(), two && two.clear();
});
};
return autoclear ? (setTimeout(clear, 800), void 0) :clear;
}
}
function doMatchBrackets(cm) {
cm.operation(function() {
currentlyHighlighted && (currentlyHighlighted(), currentlyHighlighted = null), cm.somethingSelected() || (currentlyHighlighted = matchBrackets(cm, !1));
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
}), CodeMirror.defineExtension("findMatchingBracket", function(pos, strict) {
return findMatchingBracket(this, pos, strict);
});
}(), CodeMirror.registerHelper("fold", "brace", function(cm, start) {
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
}), CodeMirror.braceRangeFinder = CodeMirror.fold.brace, CodeMirror.registerHelper("fold", "import", function(cm, start) {
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
}), CodeMirror.importRangeFinder = CodeMirror.fold["import"], CodeMirror.registerHelper("fold", "include", function(cm, start) {
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
}), CodeMirror.includeRangeFinder = CodeMirror.fold.include, CodeMirror.registerGlobalHelper("fold", "comment", function(mode) {
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
}), function() {
"use strict";
function doFold(cm, pos, options, force) {
function getRange(allowFolded) {
var range = finder(cm, pos);
if (!range || range.to.line - range.from.line < minSize) return null;
for (var marks = cm.findMarksAt(range.from), i = 0; i < marks.length; ++i) if (marks[i].__isFold && "fold" !== force) {
if (!allowFolded) return null;
range.cleared = !0, marks[i].clear();
}
return range;
}
var finder = options && (options.call ? options :options.rangeFinder);
finder || (finder = CodeMirror.fold.auto), "number" == typeof pos && (pos = CodeMirror.Pos(pos, 0));
var minSize = options && options.minFoldSize || 0, range = getRange(!0);
if (options && options.scanUp) for (;!range && pos.line > cm.firstLine(); ) pos = CodeMirror.Pos(pos.line - 1, 0), 
range = getRange(!1);
if (range && !range.cleared && "unfold" !== force) {
var myWidget = makeWidget(options);
CodeMirror.on(myWidget, "mousedown", function() {
myRange.clear();
});
var myRange = cm.markText(range.from, range.to, {
replacedWith:myWidget,
clearOnEnter:!0,
__isFold:!0
});
myRange.on("clear", function(from, to) {
CodeMirror.signal(cm, "unfold", cm, from, to);
}), CodeMirror.signal(cm, "fold", cm, range.from, range.to);
}
}
function makeWidget(options) {
var widget = options && options.widget || "\u2194";
if ("string" == typeof widget) {
var text = document.createTextNode(widget);
widget = document.createElement("span"), widget.appendChild(text), widget.className = "CodeMirror-foldmarker";
}
return widget;
}
CodeMirror.newFoldFunction = function(rangeFinder, widget) {
return function(cm, pos) {
doFold(cm, pos, {
rangeFinder:rangeFinder,
widget:widget
});
};
}, CodeMirror.defineExtension("foldCode", function(pos, options, force) {
doFold(this, pos, options, force);
}), CodeMirror.defineExtension("isFolded", function(pos) {
for (var marks = this.findMarksAt(pos), i = 0; i < marks.length; ++i) if (marks[i].__isFold) return !0;
}), CodeMirror.commands.fold = function(cm) {
cm.foldCode(cm.getCursor());
}, CodeMirror.registerHelper("fold", "combine", function() {
var funcs = Array.prototype.slice.call(arguments, 0);
return function(cm, start) {
for (var i = 0; i < funcs.length; ++i) {
var found = funcs[i](cm, start);
if (found) return found;
}
};
}), CodeMirror.registerHelper("fold", "auto", function(cm, start) {
for (var helpers = cm.getHelpers(start, "fold"), i = 0; i < helpers.length; i++) {
var cur = helpers[i](cm, start);
if (cur) return cur;
}
});
}(), function() {
"use strict";
function State(options) {
this.options = options, this.from = this.to = 0;
}
function parseOptions(opts) {
return opts === !0 && (opts = {}), null == opts.gutter && (opts.gutter = "CodeMirror-foldgutter"), 
null == opts.indicatorOpen && (opts.indicatorOpen = "CodeMirror-foldgutter-open"), 
null == opts.indicatorFolded && (opts.indicatorFolded = "CodeMirror-foldgutter-folded"), 
opts;
}
function isFolded(cm, line) {
for (var marks = cm.findMarksAt(Pos(line)), i = 0; i < marks.length; ++i) if (marks[i].__isFold && marks[i].find().from.line == line) return !0;
}
function marker(spec) {
if ("string" == typeof spec) {
var elt = document.createElement("div");
return elt.className = spec, elt;
}
return spec.cloneNode(!0);
}
function updateFoldInfo(cm, from, to) {
var opts = cm.state.foldGutter.options, cur = from;
cm.eachLine(from, to, function(line) {
var mark = null;
if (isFolded(cm, cur)) mark = marker(opts.indicatorFolded); else {
var pos = Pos(cur, 0), func = opts.rangeFinder || CodeMirror.fold.auto, range = func && func(cm, pos);
range && range.from.line + 1 < range.to.line && (mark = marker(opts.indicatorOpen));
}
cm.setGutterMarker(line, opts.gutter, mark), ++cur;
});
}
function updateInViewport(cm) {
var vp = cm.getViewport(), state = cm.state.foldGutter;
state && (cm.operation(function() {
updateFoldInfo(cm, vp.from, vp.to);
}), state.from = vp.from, state.to = vp.to);
}
function onGutterClick(cm, line, gutter) {
var opts = cm.state.foldGutter.options;
gutter == opts.gutter && cm.foldCode(Pos(line, 0), opts.rangeFinder);
}
function onChange(cm) {
var state = cm.state.foldGutter, opts = cm.state.foldGutter.options;
state.from = state.to = 0, clearTimeout(state.changeUpdate), state.changeUpdate = setTimeout(function() {
updateInViewport(cm);
}, opts.foldOnChangeTimeSpan || 600);
}
function onViewportChange(cm) {
var state = cm.state.foldGutter, opts = cm.state.foldGutter.options;
clearTimeout(state.changeUpdate), state.changeUpdate = setTimeout(function() {
var vp = cm.getViewport();
state.from == state.to || vp.from - state.to > 20 || state.from - vp.to > 20 ? updateInViewport(cm) :cm.operation(function() {
vp.from < state.from && (updateFoldInfo(cm, vp.from, state.from), state.from = vp.from), 
vp.to > state.to && (updateFoldInfo(cm, state.to, vp.to), state.to = vp.to);
});
}, opts.updateViewportTimeSpan || 400);
}
function onFold(cm, from) {
var state = cm.state.foldGutter, line = from.line;
line >= state.from && line < state.to && updateFoldInfo(cm, line, line + 1);
}
CodeMirror.defineOption("foldGutter", !1, function(cm, val, old) {
old && old != CodeMirror.Init && (cm.clearGutter(cm.state.foldGutter.options.gutter), 
cm.state.foldGutter = null, cm.off("gutterClick", onGutterClick), cm.off("change", onChange), 
cm.off("viewportChange", onViewportChange), cm.off("fold", onFold), cm.off("unfold", onFold), 
cm.off("swapDoc", updateInViewport)), val && (cm.state.foldGutter = new State(parseOptions(val)), 
updateInViewport(cm), cm.on("gutterClick", onGutterClick), cm.on("change", onChange), 
cm.on("viewportChange", onViewportChange), cm.on("fold", onFold), cm.on("unfold", onFold), 
cm.on("swapDoc", updateInViewport));
});
var Pos = CodeMirror.Pos;
}(), CodeMirror.registerHelper("fold", "indent", function(cm, start) {
var tabSize = cm.getOption("tabSize"), firstLine = cm.getLine(start.line);
if (/\S/.test(firstLine)) {
for (var getIndent = function(line) {
return CodeMirror.countColumn(line, null, tabSize);
}, myIndent = getIndent(firstLine), lastLineInFold = null, i = start.line + 1, end = cm.lastLine(); end >= i; ++i) {
var curLine = cm.getLine(i), curIndent = getIndent(curLine);
if (curIndent > myIndent) lastLineInFold = i; else if (/\S/.test(curLine)) break;
}
return lastLineInFold ? {
from:CodeMirror.Pos(start.line, firstLine.length),
to:CodeMirror.Pos(lastLineInFold, cm.getLine(lastLineInFold).length)
} :void 0;
}
}), CodeMirror.indentRangeFinder = CodeMirror.fold.indent, function() {
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
}), CodeMirror.tagRangeFinder = CodeMirror.fold.xml, CodeMirror.findMatchingTag = function(cm, pos, range) {
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
return !!findMatchingClose(iter, name);
};
}();