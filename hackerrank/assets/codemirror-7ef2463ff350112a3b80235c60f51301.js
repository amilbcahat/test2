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
draggingText:!1,
highlight:new Delayed()
}, themeChanged(this), options.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
var doc = options.value;
"string" == typeof doc && (doc = new Doc(options.value, options.mode)), operation(this, attachDoc)(this, doc), 
ie && setTimeout(bind(resetInput, this, !0), 20), registerEventHandlers(this);
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
var d = {}, input = d.input = elt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none; font-size: 4px;");
return webkit ? input.style.width = "1000px" :input.setAttribute("wrap", "off"), 
ios && (input.style.border = "1px solid black"), input.setAttribute("autocorrect", "off"), 
input.setAttribute("autocapitalize", "off"), input.setAttribute("spellcheck", "false"), 
d.inputDiv = elt("div", [ input ], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), 
d.scrollbarH = elt("div", [ elt("div", null, null, "height: 1px") ], "CodeMirror-hscrollbar"), 
d.scrollbarV = elt("div", [ elt("div", null, null, "width: 1px") ], "CodeMirror-vscrollbar"), 
d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler"), d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler"), 
d.lineDiv = elt("div", null, "CodeMirror-code"), d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1"), 
d.cursor = elt("div", " ", "CodeMirror-cursor"), d.otherCursor = elt("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"), 
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
d.cachedCharWidth = d.cachedTextHeight = null, d.measureLineCache = [], d.measureLineCachePos = 0, 
d.inaccurateSelection = !1, d.maxLine = null, d.maxLineLength = 0, d.maxLineChanged = !1, 
d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null, d;
}
function loadMode(cm) {
cm.doc.mode = CodeMirror.getMode(cm.options, cm.doc.modeOption), cm.doc.iter(function(line) {
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
var style = keyMap[cm.options.keyMap].style;
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
for (var found = !1, i = 0; i < options.gutters.length; ++i) "CodeMirror-linenumbers" == options.gutters[i] && (options.lineNumbers ? found = !0 :options.gutters.splice(i--, 1));
!found && options.lineNumbers && options.gutters.push("CodeMirror-linenumbers");
}
function updateScrollbars(cm) {
var d = cm.display, docHeight = cm.doc.height, totalHeight = docHeight + paddingVert(d);
d.sizer.style.minHeight = d.heightForcer.style.top = totalHeight + "px", d.gutters.style.height = Math.max(totalHeight, d.scroller.clientHeight - scrollerCutOff) + "px";
var scrollHeight = Math.max(totalHeight, d.scroller.scrollHeight), needsH = d.scroller.scrollWidth > d.scroller.clientWidth, needsV = scrollHeight > d.scroller.clientHeight;
needsV ? (d.scrollbarV.style.display = "block", d.scrollbarV.style.bottom = needsH ? scrollbarWidth(d.measure) + "px" :"0", 
d.scrollbarV.firstChild.style.height = scrollHeight - d.scroller.clientHeight + d.scrollbarV.clientHeight + "px") :d.scrollbarV.style.display = "", 
needsH ? (d.scrollbarH.style.display = "block", d.scrollbarH.style.right = needsV ? scrollbarWidth(d.measure) + "px" :"0", 
d.scrollbarH.firstChild.style.width = d.scroller.scrollWidth - d.scroller.clientWidth + d.scrollbarH.clientWidth + "px") :d.scrollbarH.style.display = "", 
needsH && needsV ? (d.scrollbarFiller.style.display = "block", d.scrollbarFiller.style.height = d.scrollbarFiller.style.width = scrollbarWidth(d.measure) + "px") :d.scrollbarFiller.style.display = "", 
needsH && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter ? (d.gutterFiller.style.display = "block", 
d.gutterFiller.style.height = scrollbarWidth(d.measure) + "px", d.gutterFiller.style.width = d.gutters.offsetWidth + "px") :d.gutterFiller.style.display = "", 
mac_geLion && 0 === scrollbarWidth(d.measure) && (d.scrollbarV.style.minWidth = d.scrollbarH.style.minHeight = mac_geMountainLion ? "18px" :"12px");
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
function updateDisplay(cm, changes, viewPort) {
for (var updated, oldFrom = cm.display.showingFrom, oldTo = cm.display.showingTo, visible = visibleLines(cm.display, cm.doc, viewPort); updateDisplayInner(cm, changes, visible) && (updated = !0, 
updateSelection(cm), updateScrollbars(cm), viewPort && (viewPort = Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, "number" == typeof viewPort ? viewPort :viewPort.top)), 
visible = visibleLines(cm.display, cm.doc, viewPort), !(visible.from >= cm.display.showingFrom && visible.to <= cm.display.showingTo)); ) changes = [];
return updated && (signalLater(cm, "update", cm), (cm.display.showingFrom != oldFrom || cm.display.showingTo != oldTo) && signalLater(cm, "viewportChange", cm, cm.display.showingFrom, cm.display.showingTo)), 
updated;
}
function updateDisplayInner(cm, changes, visible) {
var display = cm.display, doc = cm.doc;
if (!display.wrapper.clientWidth) return display.showingFrom = display.showingTo = doc.first, 
display.viewOffset = 0, void 0;
if (!(0 == changes.length && visible.from > display.showingFrom && visible.to < display.showingTo)) {
maybeUpdateLineNumberWidth(cm) && (changes = [ {
from:doc.first,
to:doc.first + doc.size
} ]);
var gutterW = display.sizer.style.marginLeft = display.gutters.offsetWidth + "px";
display.scrollbarH.style.left = cm.options.fixedGutter ? gutterW :"0";
var positionsChangedFrom = 1/0;
if (cm.options.lineNumbers) for (var i = 0; i < changes.length; ++i) if (changes[i].diff) {
positionsChangedFrom = changes[i].from;
break;
}
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
if (intactLines == to - from && from == display.showingFrom && to == display.showingTo) return updateViewOffset(cm), 
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
different && (display.lastSizeC = display.wrapper.clientHeight), display.showingFrom = from, 
display.showingTo = to, startWorker(cm, 100);
for (var height, prevBottom = display.lineDiv.offsetTop, node = display.lineDiv.firstChild; node; node = node.nextSibling) if (node.lineObj) {
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
return updateViewOffset(cm), !0;
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
if (0 != line.height && updateLineHeight(line, 0), line.widgets && cur.previousSibling) for (var i = 0; i < line.widgets.length; ++i) if (line.widgets[i].showIfHidden) {
var prev = cur.previousSibling;
if (/pre/i.test(prev.nodeName)) {
var wrap = elt("div", null, null, "position: relative");
prev.parentNode.replaceChild(wrap, prev), wrap.appendChild(prev), prev = wrap;
}
var wnode = prev.appendChild(elt("div", [ line.widgets[i].node ], "CodeMirror-linewidget"));
positionLineWidget(line.widgets[i], wnode, prev, dims);
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
var wrap, lineElement = lineContent(cm, line), markers = line.gutterMarkers, display = cm.display;
if (!(cm.options.lineNumbers || markers || line.bgClass || line.wrapClass || line.widgets)) return lineElement;
if (reuse) {
reuse.alignable = null;
for (var next, isOk = !0, widgetsSeen = 0, n = reuse.firstChild; n; n = next) if (next = n.nextSibling, 
/\bCodeMirror-linewidget\b/.test(n.className)) {
for (var i = 0, first = !0; i < line.widgets.length; ++i) {
var widget = line.widgets[i], isFirst = !1;
if (widget.above || (isFirst = first, first = !1), widget.node == n.firstChild) {
positionLineWidget(widget, n, reuse, dims), ++widgetsSeen, isFirst && reuse.insertBefore(lineElement, n);
break;
}
}
if (i == line.widgets.length) {
isOk = !1;
break;
}
} else reuse.removeChild(n);
isOk && widgetsSeen == line.widgets.length && (wrap = reuse, reuse.className = line.wrapClass || "");
}
if (wrap || (wrap = elt("div", null, line.wrapClass, "position: relative"), wrap.appendChild(lineElement)), 
line.bgClass && wrap.insertBefore(elt("div", null, line.bgClass + " CodeMirror-linebackground"), wrap.firstChild), 
cm.options.lineNumbers || markers) {
var gutterWrap = wrap.insertBefore(elt("div", null, null, "position: absolute; left: " + (cm.options.fixedGutter ? dims.fixedPos :-dims.gutterTotalWidth) + "px"), wrap.firstChild);
if (cm.options.fixedGutter && (wrap.alignable || (wrap.alignable = [])).push(gutterWrap), 
!cm.options.lineNumbers || markers && markers["CodeMirror-linenumbers"] || (wrap.lineNumber = gutterWrap.appendChild(elt("div", lineNumberFor(cm.options, lineNo), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + display.lineNumInnerWidth + "px"))), 
markers) for (var k = 0; k < cm.options.gutters.length; ++k) {
var id = cm.options.gutters[k], found = markers.hasOwnProperty(id) && markers[id];
found && gutterWrap.appendChild(elt("div", [ found ], "CodeMirror-gutter-elt", "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
}
}
if (ie_lt8 && (wrap.style.zIndex = 2), line.widgets && wrap != reuse) for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
var widget = ws[i], node = elt("div", [ widget.node ], "CodeMirror-linewidget");
positionLineWidget(widget, node, wrap, dims), widget.above ? wrap.insertBefore(node, cm.options.lineNumbers && 0 != line.height ? gutterWrap :lineElement) :wrap.appendChild(node), 
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
0 > top && (top = 0), fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px; top: " + top + "px; width: " + (null == width ? clientWidth - left :width) + "px; height: " + (bottom - top) + "px"));
}
function drawForLine(line, fromArg, toArg, retTop) {
function coords(ch) {
return charCoords(cm, Pos(line, ch), "div", lineObj);
}
var lineObj = getLine(doc, line), lineLen = lineObj.text.length, rVal = retTop ? 1/0 :-1/0;
return iterateBidiSections(getOrder(lineObj), fromArg || 0, null == toArg ? lineLen :toArg, function(from, to, dir) {
var rightPos, left, right, leftPos = coords(from);
if (from == to) rightPos = leftPos, left = right = leftPos.left; else {
if (rightPos = coords(to - 1), "rtl" == dir) {
var tmp = leftPos;
leftPos = rightPos, rightPos = tmp;
}
left = leftPos.left, right = rightPos.right;
}
rightPos.top - leftPos.top > 3 && (add(left, leftPos.top, null, leftPos.bottom), 
left = pl, leftPos.bottom < rightPos.top && add(left, leftPos.bottom, null, rightPos.top)), 
null == toArg && to == lineLen && (right = clientWidth), null == fromArg && 0 == from && (left = pl), 
rVal = retTop ? Math.min(rightPos.top, rVal) :Math.max(rightPos.bottom, rVal), pl + 1 > left && (left = pl), 
add(left, rightPos.top, right - left, rightPos.bottom);
}), rVal;
}
var display = cm.display, doc = cm.doc, sel = cm.doc.sel, fragment = document.createDocumentFragment(), clientWidth = display.lineSpace.offsetWidth, pl = paddingLeft(cm.display);
if (sel.from.line == sel.to.line) drawForLine(sel.from.line, sel.from.ch, sel.to.ch); else {
for (var merged, singleLine, fromObj = getLine(doc, sel.from.line), cur = fromObj, path = [ sel.from.line, sel.from.ch ]; merged = collapsedSpanAtEnd(cur); ) {
var found = merged.find();
if (path.push(found.from.ch, found.to.line, found.to.ch), found.to.line == sel.to.line) {
path.push(sel.to.ch), singleLine = !0;
break;
}
cur = getLine(doc, found.to.line);
}
if (singleLine) for (var i = 0; i < path.length; i += 3) drawForLine(path[i], path[i + 1], path[i + 2]); else {
var middleTop, middleBot, toObj = getLine(doc, sel.to.line);
middleTop = sel.from.ch ? drawForLine(sel.from.line, sel.from.ch, null, !1) :heightAtLine(cm, fromObj) - display.viewOffset, 
middleBot = sel.to.ch ? drawForLine(sel.to.line, collapsedSpanAtStart(toObj) ? null :0, sel.to.ch, !0) :heightAtLine(cm, toObj) - display.viewOffset, 
middleBot > middleTop && add(pl, middleTop, null, middleBot);
}
}
removeChildrenAndAdd(display.selectionDiv, fragment), display.selectionDiv.style.display = "";
}
function restartBlink(cm) {
if (cm.state.focused) {
var display = cm.display;
clearInterval(display.blinker);
var on = !0;
display.cursor.style.visibility = display.otherCursor.style.visibility = "", display.blinker = setInterval(function() {
display.cursor.style.visibility = display.otherCursor.style.visibility = (on = !on) ? "" :"hidden";
}, cm.options.cursorBlinkRate);
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
line.styles = highlightLine(cm, line, state);
for (var ischange = !oldStyles || oldStyles.length != line.styles.length, i = 0; !ischange && i < oldStyles.length; ++i) ischange = oldStyles[i] != line.styles[i];
ischange && (prevChange && prevChange.end == doc.frontier ? prevChange.end++ :changed.push(prevChange = {
start:doc.frontier,
end:doc.frontier + 1
})), line.stateAfter = copyState(doc.mode, state);
} else processLine(cm, line, state), line.stateAfter = doc.frontier % 5 == 0 ? copyState(doc.mode, state) :null;
return ++doc.frontier, +new Date() > end ? (startWorker(cm, cm.options.workDelay), 
!0) :void 0;
}), changed.length && operation(cm, function() {
for (var i = 0; i < changed.length; ++i) regChange(this, changed[i].start, changed[i].end);
})();
}
}
function findStartLine(cm, n) {
for (var minindent, minline, doc = cm.doc, search = n, lim = n - 100; search > lim; --search) {
if (search <= doc.first) return doc.first;
var line = getLine(doc, search - 1);
if (line.stateAfter) return search;
var indented = countColumn(line.text, null, cm.options.tabSize);
(null == minline || minindent > indented) && (minline = search - 1, minindent = indented);
}
return minline;
}
function getStateBefore(cm, n) {
var doc = cm.doc, display = cm.display;
if (!doc.mode.startState) return !0;
var pos = findStartLine(cm, n), state = pos > doc.first && getLine(doc, pos - 1).stateAfter;
return state = state ? copyState(doc.mode, state) :startState(doc.mode), doc.iter(pos, n, function(line) {
processLine(cm, line, state);
var save = pos == n - 1 || pos % 5 == 0 || pos >= display.showingFrom && pos < display.showingTo;
line.stateAfter = save ? copyState(doc.mode, state) :null, ++pos;
}), state;
}
function paddingTop(display) {
return display.lineSpace.offsetTop;
}
function paddingVert(display) {
return display.mover.offsetHeight - display.lineSpace.offsetHeight;
}
function paddingLeft(display) {
var e = removeChildrenAndAdd(display.measure, elt("pre", null, null, "text-align: left")).appendChild(elt("span", "x"));
return e.offsetLeft;
}
function measureChar(cm, line, ch, data) {
var dir = -1;
data = data || measureLine(cm, line);
for (var pos = ch; ;pos += dir) {
var r = data[pos];
if (r) break;
0 > dir && 0 == pos && (dir = 1);
}
return {
left:ch > pos ? r.right :r.left,
right:pos > ch ? r.left :r.right,
top:r.top,
bottom:r.bottom
};
}
function findCachedMeasurement(cm, line) {
for (var cache = cm.display.measureLineCache, i = 0; i < cache.length; ++i) {
var memo = cache[i];
if (memo.text == line.text && memo.markedSpans == line.markedSpans && cm.display.scroller.clientWidth == memo.width && memo.classes == line.textClass + "|" + line.bgClass + "|" + line.wrapClass) return memo;
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
classes:line.textClass + "|" + line.bgClass + "|" + line.wrapClass
};
return 16 == cache.length ? cache[++cm.display.measureLineCachePos % 16] = memo :cache.push(memo), 
measure;
}
function measureLineInner(cm, line) {
var display = cm.display, measure = emptyArray(line.text.length), pre = lineContent(cm, line, measure);
if (ie && !ie_lt8 && !cm.options.lineWrapping && pre.childNodes.length > 100) {
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
for (var size = getRect(cur), top = Math.max(0, size.top - outer.top), bot = Math.min(size.bottom - outer.top, maxBot), j = 0; j < vranges.length; j += 2) {
var rtop = vranges[j], rbot = vranges[j + 1];
if (!(rtop > bot || top > rbot) && (top >= rtop && rbot >= bot || rtop >= top && bot >= rbot || Math.min(bot, rbot) - Math.max(top, rtop) >= bot - top >> 1)) {
vranges[j] = Math.min(top, rtop), vranges[j + 1] = Math.max(bot, rbot);
break;
}
}
j == vranges.length && vranges.push(top, bot);
var right = size.right;
cur.measureRight && (right = getRect(cur.measureRight).left), data[i] = {
left:size.left - outer.left,
right:right - outer.left,
top:j
};
}
for (var cur, i = 0; i < data.length; ++i) if (cur = data[i]) {
var vr = cur.top;
cur.top = vranges[vr], cur.bottom = vranges[vr + 1];
}
return data;
}
function measureLineWidth(cm, line) {
var hasBadSpan = !1;
if (line.markedSpans) for (var i = 0; i < line.markedSpans; ++i) {
var sp = line.markedSpans[i];
!sp.collapsed || null != sp.to && sp.to != line.text.length || (hasBadSpan = !0);
}
var cached = !hasBadSpan && findCachedMeasurement(cm, line);
if (cached) return measureChar(cm, line, line.text.length, cached.measure).right;
var pre = lineContent(cm, line), end = pre.appendChild(zeroWidthElement(cm.display.measure));
return removeChildrenAndAdd(cm.display.measure, pre), getRect(end).right - getRect(cm.display.lineDiv).left;
}
function clearCaches(cm) {
cm.display.measureLineCache.length = cm.display.measureLineCachePos = 0, cm.display.cachedCharWidth = cm.display.cachedTextHeight = null, 
cm.options.lineWrapping || (cm.display.maxLineChanged = !0), cm.display.lineNumChars = null;
}
function intoCoordSystem(cm, lineObj, rect, context) {
if (lineObj.widgets) for (var i = 0; i < lineObj.widgets.length; ++i) if (lineObj.widgets[i].above) {
var size = widgetHeight(lineObj.widgets[i]);
rect.top += size, rect.bottom += size;
}
if ("line" == context) return rect;
context || (context = "local");
var yOff = heightAtLine(cm, lineObj);
if ("local" != context && (yOff -= cm.display.viewOffset), "page" == context) {
var lOff = getRect(cm.display.lineSpace);
yOff += lOff.top + (window.pageYOffset || (document.documentElement || document.body).scrollTop);
var xOff = lOff.left + (window.pageXOffset || (document.documentElement || document.body).scrollLeft);
rect.left += xOff, rect.right += xOff;
}
return rect.top += yOff, rect.bottom += yOff, rect;
}
function fromCoordSystem(cm, coords, context) {
if ("div" == context) return coords;
var left = coords.left, top = coords.top;
"page" == context && (left -= window.pageXOffset || (document.documentElement || document.body).scrollLeft, 
top -= window.pageYOffset || (document.documentElement || document.body).scrollTop);
var lineSpaceBox = getRect(cm.display.lineSpace);
if (left -= lineSpaceBox.left, top -= lineSpaceBox.top, "local" == context || !context) {
var editorBox = getRect(cm.display.wrapper);
left += editorBox.left, top += editorBox.top;
}
return {
left:left,
top:top
};
}
function charCoords(cm, pos, context, lineObj) {
return lineObj || (lineObj = getLine(cm.doc, pos.line)), intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch), context);
}
function cursorCoords(cm, pos, context, lineObj, measurement) {
function get(ch, right) {
var m = measureChar(cm, lineObj, ch, measurement);
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
function PosMaybeOutside(line, ch, outside) {
var pos = new Pos(line, ch);
return outside && (pos.outside = !0), pos;
}
function coordsChar(cm, x, y) {
var doc = cm.doc;
if (y += cm.display.viewOffset, 0 > y) return PosMaybeOutside(doc.first, 0, !0);
var lineNo = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
if (lineNo > last) return PosMaybeOutside(doc.first + doc.size - 1, getLine(doc, last).text.length, !0);
for (0 > x && (x = 0); ;) {
var lineObj = getLine(doc, lineNo), found = coordsCharInner(cm, lineObj, lineNo, x, y), merged = collapsedSpanAtEnd(lineObj), mergedPos = merged && merged.find();
if (!(merged && found.ch >= mergedPos.from.ch)) return found;
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
if (x > toX) return PosMaybeOutside(lineNo, to, toOutside);
for (;;) {
if (bidi ? to == from || to == moveVisually(lineObj, from, 1) :1 >= to - from) {
for (var after = toX - x > x - fromX, ch = after ? from :to; isExtendingChar.test(lineObj.text.charAt(ch)); ) ++ch;
var pos = PosMaybeOutside(lineNo, ch, after ? fromOutside :toOutside);
return pos.after = after, pos;
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
display.sizer.style.minWidth = Math.max(0, width + 3 + scrollerCutOff) + "px", display.maxLineChanged = !1;
var maxScrollLeft = Math.max(0, display.sizer.offsetLeft + display.sizer.offsetWidth - display.scroller.clientWidth);
maxScrollLeft < doc.scrollLeft && !op.updateScrollPos && setScrollLeft(cm, Math.min(display.scroller.scrollLeft, maxScrollLeft), !0);
}
var newScrollPos, updated;
if (op.updateScrollPos) newScrollPos = op.updateScrollPos; else if (op.selectionChanged && display.scroller.clientHeight) {
var coords = cursorCoords(cm, doc.sel.head);
newScrollPos = calculateScrollPos(cm, coords.left, coords.top, coords.left, coords.bottom);
}
(op.changes.length || newScrollPos && null != newScrollPos.scrollTop) && (updated = updateDisplay(cm, op.changes, newScrollPos && newScrollPos.scrollTop), 
cm.display.scroller.offsetHeight && (cm.doc.scrollTop = cm.display.scroller.scrollTop)), 
!updated && op.selectionChanged && updateSelection(cm), op.updateScrollPos ? (display.scroller.scrollTop = display.scrollbarV.scrollTop = doc.scrollTop = newScrollPos.scrollTop, 
display.scroller.scrollLeft = display.scrollbarH.scrollLeft = doc.scrollLeft = newScrollPos.scrollLeft, 
alignHorizontally(cm), op.scrollToPos && scrollPosIntoView(cm, clipPos(cm.doc, op.scrollToPos), op.scrollToPosMargin)) :newScrollPos && scrollCursorIntoView(cm), 
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
if (!cm.state.focused || hasSelection(input) || isReadOnly(cm)) return !1;
var text = input.value;
if (text == prevInput && posEq(sel.from, sel.to)) return !1;
if (ie && !ie_lt9 && cm.display.inputHasSelection === text) return resetInput(cm, !0), 
!1;
var withOp = !cm.curOp;
withOp && startOperation(cm), sel.shift = !1;
for (var same = 0, l = Math.min(prevInput.length, text.length); l > same && prevInput.charCodeAt(same) == text.charCodeAt(same); ) ++same;
var from = sel.from, to = sel.to;
same < prevInput.length ? from = Pos(from.line, from.ch - (prevInput.length - same)) :cm.state.overwrite && posEq(from, to) && !cm.state.pasteIncoming && (to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + (text.length - same))));
var updateInput = cm.curOp.updateInput;
return makeChange(cm.doc, {
from:from,
to:to,
text:splitLines(text.slice(same)),
origin:cm.state.pasteIncoming ? "paste" :"+input"
}, "end"), cm.curOp.updateInput = updateInput, text.length > 1e3 || text.indexOf("\n") > -1 ? input.value = cm.display.prevInput = "" :cm.display.prevInput = text, 
withOp && endOperation(cm), cm.state.pasteIncoming = !1, !0;
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
function isReadOnly(cm) {
return cm.options.readOnly || cm.doc.cantEdit;
}
function registerEventHandlers(cm) {
function reFocus() {
cm.state.focused && setTimeout(bind(focusInput, cm), 0);
}
function onResize() {
d.cachedCharWidth = d.cachedTextHeight = null, clearCaches(cm), runInOp(cm, bind(regChange, cm));
}
function unregister() {
for (var p = d.wrapper.parentNode; p && p != document.body; p = p.parentNode) ;
p ? setTimeout(unregister, 5e3) :off(window, "resize", onResize);
}
function drag_(e) {
cm.options.onDragEvent && cm.options.onDragEvent(cm, addStop(e)) || e_stop(e);
}
function prepareCopy() {
d.inaccurateSelection && (d.prevInput = "", d.inaccurateSelection = !1, d.input.value = cm.getSelection(), 
selectInput(d.input));
}
var d = cm.display;
on(d.scroller, "mousedown", operation(cm, onMouseDown)), ie ? on(d.scroller, "dblclick", operation(cm, function(e) {
var pos = posFromMouse(cm, e);
if (pos && !clickInGutter(cm, e) && !eventInWidget(cm.display, e)) {
e_preventDefault(e);
var word = findWordAt(getLine(cm.doc, pos.line).text, pos);
extendSelection(cm.doc, word.from, word.to);
}
})) :on(d.scroller, "dblclick", e_preventDefault), on(d.lineSpace, "selectstart", function(e) {
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
}), on(window, "resize", onResize), setTimeout(unregister, 5e3), on(d.input, "keyup", operation(cm, function(e) {
cm.options.onKeyEvent && cm.options.onKeyEvent(cm, addStop(e)) || 16 == e.keyCode && (cm.doc.sel.shift = !1);
})), on(d.input, "input", bind(fastPoll, cm)), on(d.input, "keydown", operation(cm, onKeyDown)), 
on(d.input, "keypress", operation(cm, onKeyPress)), on(d.input, "focus", bind(onFocus, cm)), 
on(d.input, "blur", bind(onBlur, cm)), cm.options.dragDrop && (on(d.scroller, "dragstart", function(e) {
onDragStart(cm, e);
}), on(d.scroller, "dragenter", drag_), on(d.scroller, "dragover", drag_), on(d.scroller, "drop", operation(cm, onDrop))), 
on(d.scroller, "paste", function(e) {
eventInWidget(d, e) || (focusInput(cm), fastPoll(cm));
}), on(d.input, "paste", function() {
cm.state.pasteIncoming = !0, fastPoll(cm);
}), on(d.input, "cut", prepareCopy), on(d.input, "copy", prepareCopy), khtml && on(d.sizer, "mouseup", function() {
document.activeElement == d.input && d.input.blur(), focusInput(cm);
});
}
function eventInWidget(display, e) {
for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
if (!n) return !0;
if (/\bCodeMirror-(?:line)?widget\b/.test(n.className) || n.parentNode == display.sizer && n != display.mover) return !0;
}
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
cm.state.focused || onFocus(cm), last = cur, doSelect(cur);
var visible = visibleLines(display, doc);
(cur.line >= visible.to || cur.line < visible.from) && setTimeout(operation(cm, function() {
counter == curCount && extend(e);
}), 150);
}
}
function done(e) {
counter = 1/0;
var cur = posFromMouse(cm, e);
cur && doSelect(cur), e_preventDefault(e), focusInput(cm), off(document, "mousemove", move), 
off(document, "mouseup", up);
}
var cm = this, display = cm.display, doc = cm.doc, sel = doc.sel;
if (sel.shift = e.shiftKey, eventInWidget(display, e)) return webkit || (display.scroller.draggable = !1, 
setTimeout(function() {
display.scroller.draggable = !0;
}, 100)), void 0;
if (!clickInGutter(cm, e)) {
var start = posFromMouse(cm, e);
switch (e_button(e)) {
case 3:
return captureMiddleClick && onContextMenu.call(cm, cm, e), void 0;

case 2:
return start && extendSelection(cm.doc, start), setTimeout(bind(focusInput, cm), 20), 
e_preventDefault(e), void 0;
}
if (!start) return e_target(e) == display.scroller && e_preventDefault(e), void 0;
cm.state.focused || onFocus(cm);
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
extendSelection(cm.doc, start), focusInput(cm));
});
return webkit && (display.scroller.draggable = !0), cm.state.draggingText = dragEnd, 
display.scroller.dragDrop && display.scroller.dragDrop(), on(document, "mouseup", dragEnd), 
on(display.scroller, "drop", dragEnd), void 0;
}
e_preventDefault(e), "single" == type && extendSelection(cm.doc, clipPos(doc, start));
var startstart = sel.from, startend = sel.to, lastPos = start, editorSize = getRect(display.wrapper), counter = 0, move = operation(cm, function(e) {
ie || e_button(e) ? extend(e) :done(e);
}), up = operation(cm, done);
on(document, "mousemove", move), on(document, "mouseup", up);
}
}
function onDrop(e) {
var cm = this;
if (!(eventInWidget(cm.display, e) || cm.options.onDragEvent && cm.options.onDragEvent(cm, addStop(e)))) {
e_preventDefault(e);
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
cm.replaceSelection(text, null, "paste"), focusInput(cm), onFocus(cm);
}
} catch (e) {}
}
}
}
function clickInGutter(cm, e) {
var display = cm.display;
try {
var mX = e.clientX, mY = e.clientY;
} catch (e) {
return !1;
}
if (mX >= Math.floor(getRect(display.gutters).right)) return !1;
if (e_preventDefault(e), !hasHandler(cm, "gutterClick")) return !0;
var lineBox = getRect(display.lineDiv);
if (mY > lineBox.bottom) return !0;
mY -= lineBox.top - display.viewOffset;
for (var i = 0; i < cm.options.gutters.length; ++i) {
var g = display.gutters.childNodes[i];
if (g && getRect(g).right >= mX) {
var line = lineAtHeight(cm.doc, mY), gutter = cm.options.gutters[i];
signalLater(cm, "gutterClick", cm, line, gutter, e);
break;
}
}
return !0;
}
function onDragStart(cm, e) {
if (ie && !cm.state.draggingText) return e_stop(e), void 0;
if (!eventInWidget(cm.display, e)) {
var txt = cm.getSelection();
if (e.dataTransfer.setData("Text", txt), e.dataTransfer.setDragImage) {
var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
opera && (img.width = img.height = 1, cm.display.wrapper.appendChild(img), img._top = img.offsetTop), 
safari && (cm.display.dragImg ? img = cm.display.dragImg :(cm.display.dragImg = img, 
img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 
cm.display.wrapper.appendChild(img))), e.dataTransfer.setDragImage(img, 0, 0), opera && img.parentNode.removeChild(img);
}
}
}
function setScrollTop(cm, val) {
Math.abs(cm.doc.scrollTop - val) < 2 || (cm.doc.scrollTop = val, gecko || updateDisplay(cm, [], val), 
cm.display.scroller.scrollTop != val && (cm.display.scroller.scrollTop = val), cm.display.scrollbarV.scrollTop != val && (cm.display.scrollbarV.scrollTop = val), 
gecko && updateDisplay(cm, []));
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
getKeyMap(cm.options.keyMap) == startMap && (cm.options.keyMap = next.call ? next.call(null, cm) :next);
}, 50));
var name = keyName(e, !0), handled = !1;
if (!name) return !1;
var keymaps = allKeyMaps(cm);
return handled = e.shiftKey ? lookupKey("Shift-" + name, keymaps, function(b) {
return doHandleBinding(cm, b, !0);
}) || lookupKey(name, keymaps, function(b) {
return "string" == typeof b && /^go[A-Z]/.test(b) ? doHandleBinding(cm, b) :void 0;
}) :lookupKey(name, keymaps, function(b) {
return doHandleBinding(cm, b);
}), "stop" == handled && (handled = !1), handled && (e_preventDefault(e), restartBlink(cm), 
ie_lt9 && (e.oldKeyCode = e.keyCode, e.keyCode = 0)), handled;
}
function handleCharBinding(cm, e, ch) {
var handled = lookupKey("'" + ch + "'", allKeyMaps(cm), function(b) {
return doHandleBinding(cm, b, !0);
});
return handled && (e_preventDefault(e), restartBlink(cm)), handled;
}
function onKeyDown(e) {
var cm = this;
if (cm.state.focused || onFocus(cm), ie && 27 == e.keyCode && (e.returnValue = !1), 
!cm.options.onKeyEvent || !cm.options.onKeyEvent(cm, addStop(e))) {
var code = e.keyCode;
cm.doc.sel.shift = 16 == code || e.shiftKey;
var handled = handleKeyBinding(cm, e);
opera && (lastStoppedKey = handled ? code :null, !handled && 88 == code && !hasCopyEvent && (mac ? e.metaKey :e.ctrlKey) && cm.replaceSelection(""));
}
}
function onKeyPress(e) {
var cm = this;
if (!cm.options.onKeyEvent || !cm.options.onKeyEvent(cm, addStop(e))) {
var keyCode = e.keyCode, charCode = e.charCode;
if (opera && keyCode == lastStoppedKey) return lastStoppedKey = null, e_preventDefault(e), 
void 0;
if (!(opera && (!e.which || e.which < 10) || khtml) || !handleKeyBinding(cm, e)) {
var ch = String.fromCharCode(null == charCode ? keyCode :charCode);
this.options.electricChars && this.doc.mode.electricChars && this.options.smartIndent && !isReadOnly(this) && this.doc.mode.electricChars.indexOf(ch) > -1 && setTimeout(operation(cm, function() {
indentLine(cm, cm.doc.sel.to.line, "smart");
}), 75), handleCharBinding(cm, e, ch) || (ie && !ie_lt9 && (cm.display.inputHasSelection = null), 
fastPoll(cm));
}
}
}
function onFocus(cm) {
"nocursor" != cm.options.readOnly && (cm.state.focused || (signal(cm, "focus", cm), 
cm.state.focused = !0, -1 == cm.display.wrapper.className.search(/\bCodeMirror-focused\b/) && (cm.display.wrapper.className += " CodeMirror-focused"), 
resetInput(cm, !0)), slowPoll(cm), restartBlink(cm));
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
var extval = display.input.value = " " + (posEq(sel.from, sel.to) ? "" :display.input.value);
display.prevInput = " ", display.input.selectionStart = 1, display.input.selectionEnd = extval.length;
}
}
function rehide() {
if (display.inputDiv.style.position = "relative", display.input.style.cssText = oldCSS, 
ie_lt9 && (display.scrollbarV.scrollTop = display.scroller.scrollTop = scrollPos), 
slowPoll(cm), null != display.input.selectionStart) {
(!ie || ie_lt9) && prepareSelectAllHack(), clearTimeout(detectingSelectAll);
var i = 0, poll = function() {
" " == display.prevInput && 0 == display.input.selectionStart ? operation(cm, commands.selectAll)(cm) :i++ < 10 ? detectingSelectAll = setTimeout(poll, 500) :resetInput(cm);
};
detectingSelectAll = setTimeout(poll, 200);
}
}
var display = cm.display, sel = cm.doc.sel;
if (!eventInWidget(display, e)) {
var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
if (pos && !opera) {
(posEq(sel.from, sel.to) || posLess(pos, sel.from) || !posLess(pos, sel.to)) && operation(cm, setSelection)(cm.doc, pos, pos);
var oldCSS = display.input.style.cssText;
if (display.inputDiv.style.position = "absolute", display.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: white; outline: none;border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);", 
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
function changeEnd(change) {
return change.text ? Pos(change.from.line + change.text.length - 1, lst(change.text).length + (1 == change.text.length ? change.from.ch :0)) :change.to;
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
function filterChange(doc, change) {
var obj = {
canceled:!1,
from:change.from,
to:change.to,
text:change.text,
origin:change.origin,
update:function(from, to, text, origin) {
from && (this.from = clipPos(doc, from)), to && (this.to = clipPos(doc, to)), text && (this.text = text), 
void 0 !== origin && (this.origin = origin);
},
cancel:function() {
this.canceled = !0;
}
};
return signal(doc, "beforeChange", doc, obj), doc.cm && signal(doc.cm, "beforeChange", doc.cm, obj), 
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
if (!(hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) || (change = filterChange(doc, change))) {
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
var selAfter = computeSelAfterChange(doc, change, selUpdate);
addToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id :0/0), makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
var rebased = [];
linkedDocs(doc, function(doc, sharedHist) {
sharedHist || -1 != indexOf(rebased, doc.history) || (rebaseHist(doc.history, change), 
rebased.push(doc.history)), makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
});
}
function makeChangeFromHistory(doc, type) {
if (!doc.cm || !doc.cm.state.suppressEdits) {
var hist = doc.history, event = ("undo" == type ? hist.done :hist.undone).pop();
if (event) {
hist.dirtyCounter += "undo" == type ? -1 :1;
var anti = {
changes:[],
anchorBefore:event.anchorAfter,
headBefore:event.headAfter,
anchorAfter:event.anchorBefore,
headAfter:event.headBefore
};
("undo" == type ? hist.undone :hist.done).push(anti);
for (var i = event.changes.length - 1; i >= 0; --i) {
var change = event.changes[i];
change.origin = type, anti.changes.push(historyChangeFromChange(doc, change));
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
if (sel.goalColumn = null, (checkAtomic || !posEq(anchor, sel.anchor)) && (anchor = skipAtomic(doc, anchor, bias, "push" != checkAtomic)), 
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
var coords = scrollPosIntoView(cm, cm.doc.sel.head, cm.options.cursorScrollMargin);
if (cm.state.focused) {
var display = cm.display, box = getRect(display.sizer), doScroll = null, pTop = paddingTop(cm.display);
if (coords.top + pTop + box.top < 0 ? doScroll = !0 :coords.bottom + pTop + box.top > (window.innerHeight || document.documentElement.clientHeight) && (doScroll = !1), 
null != doScroll && !phantom) {
var hidden = "none" == display.cursor.style.display;
hidden && (display.cursor.style.display = "", display.cursor.style.left = coords.left + "px", 
display.cursor.style.top = coords.top - display.viewOffset + "px"), display.cursor.scrollIntoView(doScroll), 
hidden && (display.cursor.style.display = "none");
}
}
}
function scrollPosIntoView(cm, pos, margin) {
for (null == margin && (margin = 0); ;) {
var changed = !1, coords = cursorCoords(cm, pos), scrollPos = calculateScrollPos(cm, coords.left, coords.top - margin, coords.left, coords.bottom + margin), startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
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
var display = cm.display, pt = paddingTop(display);
y1 += pt, y2 += pt, 0 > y1 && (y1 = 0);
var screen = display.scroller.clientHeight - scrollerCutOff, screentop = display.scroller.scrollTop, result = {}, docBottom = cm.doc.height + paddingVert(display), atTop = pt + 10 > y1, atBottom = y2 + pt > docBottom - 10;
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
var doc = cm.doc;
if (how || (how = "add"), "smart" == how) if (cm.doc.mode.indent) var state = getStateBefore(cm, n); else how = "prev";
var indentation, tabSize = cm.options.tabSize, line = getLine(doc, n), curSpace = countColumn(line.text, null, tabSize), curSpaceString = line.text.match(/^\s*/)[0];
if ("smart" == how && (indentation = cm.doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text), 
indentation == Pass)) {
if (!aggressive) return;
how = "prev";
}
"prev" == how ? indentation = n > doc.first ? countColumn(getLine(doc, n - 1).text, null, tabSize) :0 :"add" == how ? indentation = curSpace + cm.options.indentUnit :"subtract" == how && (indentation = curSpace - cm.options.indentUnit), 
indentation = Math.max(0, indentation);
var indentString = "", pos = 0;
if (cm.options.indentWithTabs) for (var i = Math.floor(indentation / tabSize); i; --i) pos += tabSize, 
indentString += "	";
indentation > pos && (indentString += spaceStr(indentation - pos)), indentString != curSpaceString && replaceRange(cm.doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input"), 
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
var cur = lineObj.text.charAt(ch) || "\n", type = isWordChar(cur) ? "w" :group ? /\s/.test(cur) ? null :"p" :null;
if (sawType && sawType != type) {
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
pos.after === !1 || end == line.length ? --start :++end;
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
if (done) return done;
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
this.pos = this.start = 0, this.string = string, this.tabSize = tabSize || 8, this.lastColumnPos = this.lastColumnValue = 0;
}
function TextMarker(doc, type) {
this.lines = [], this.type = type, this.doc = doc;
}
function markText(doc, from, to, options, type) {
if (options && options.shared) return markTextShared(doc, from, to, options, type);
if (doc.cm && !doc.cm.curOp) return operation(doc.cm, markText)(doc, from, to, options, type);
var marker = new TextMarker(doc, type);
if ("range" == type && !posLess(from, to)) return marker;
options && copyObj(options, marker), marker.replacedWith && (marker.collapsed = !0, 
marker.replacedWith = elt("span", [ marker.replacedWith ], "CodeMirror-widget")), 
marker.collapsed && (sawCollapsedSpans = !0), marker.addToHistory && addToHistory(doc, {
from:from,
to:to,
origin:"markText"
}, {
head:doc.sel.head,
anchor:doc.sel.anchor
}, 0/0);
var collapsedAtStart, collapsedAtEnd, updateMaxLine, curLine = from.line, size = 0, cm = doc.cm;
if (doc.iter(curLine, to.line + 1, function(line) {
cm && marker.collapsed && !cm.options.lineWrapping && visualLine(doc, line) == cm.display.maxLine && (updateMaxLine = !0);
var span = {
from:null,
to:null,
marker:marker
};
size += line.text.length, curLine == from.line && (span.from = from.ch, size -= from.ch), 
curLine == to.line && (span.to = to.ch, size -= line.text.length - to.ch), marker.collapsed && (curLine == to.line && (collapsedAtEnd = collapsedSpanAt(line, to.ch)), 
curLine == from.line ? collapsedAtStart = collapsedSpanAt(line, from.ch) :updateLineHeight(line, 0)), 
addMarkedSpan(line, span), ++curLine;
}), marker.collapsed && doc.iter(from.line, to.line + 1, function(line) {
lineIsHidden(doc, line) && updateLineHeight(line, 0);
}), marker.clearOnEnter && on(marker, "beforeCursorEnter", function() {
marker.clear();
}), marker.readOnly && (sawReadOnlySpans = !0, (doc.history.done.length || doc.history.undone.length) && doc.clearHistory()), 
marker.collapsed) {
if (collapsedAtStart != collapsedAtEnd) throw new Error("Inserting collapsed marker overlapping an existing one");
marker.size = size, marker.atomic = !0;
}
return cm && (updateMaxLine && (cm.curOp.updateMaxLine = !0), (marker.className || marker.startStyle || marker.endStyle || marker.collapsed) && regChange(cm, from.line, to.line + 1), 
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
if (startsBefore || "bookmark" == marker.type && span.from == startCh && (!isInsert || !span.marker.insertLeft)) {
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
if (endsAfter || "bookmark" == marker.type && span.from == endCh && (!isInsert || span.marker.insertLeft)) {
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
function collapsedSpanAt(line, ch) {
var found, sps = sawCollapsedSpans && line.markedSpans;
if (sps) for (var sp, i = 0; i < sps.length; ++i) sp = sps[i], sp.marker.collapsed && (null == sp.from || sp.from < ch) && (null == sp.to || sp.to > ch) && (!found || found.width < sp.marker.width) && (found = sp.marker);
return found;
}
function collapsedSpanAtStart(line) {
return collapsedSpanAt(line, -1);
}
function collapsedSpanAtEnd(line) {
return collapsedSpanAt(line, line.text.length + 1);
}
function visualLine(doc, line) {
for (var merged; merged = collapsedSpanAtStart(line); ) line = getLine(doc, merged.find().from.line);
return line;
}
function lineIsHidden(doc, line) {
var sps = sawCollapsedSpans && line.markedSpans;
if (sps) for (var sp, i = 0; i < sps.length; ++i) if (sp = sps[i], sp.marker.collapsed) {
if (null == sp.from) return !0;
if (0 == sp.from && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp)) return !0;
}
}
function lineIsHiddenInner(doc, line, span) {
if (null == span.to) {
var end = span.marker.find().to, endLine = getLine(doc, end.line);
return lineIsHiddenInner(doc, endLine, getMarkedSpanFor(endLine.markedSpans, span.marker));
}
if (span.marker.inclusiveRight && span.to == line.text.length) return !0;
for (var sp, i = 0; i < line.markedSpans.length; ++i) if (sp = line.markedSpans[i], 
sp.marker.collapsed && sp.from == span.to && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc, line, sp)) return !0;
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
if ((line.widgets || (line.widgets = [])).push(widget), widget.line = line, !lineIsHidden(cm.doc, line) || widget.showIfHidden) {
var aboveVisible = heightAtLine(cm, line) < cm.display.scroller.scrollTop;
updateLineHeight(line, line.height + widgetHeight(widget)), aboveVisible && addToScrollPos(cm, 0, widget.height);
}
return !0;
}), widget;
}
function makeLine(text, markedSpans, estimateHeight) {
var line = {
text:text
};
return attachMarkedSpans(line, markedSpans), line.height = estimateHeight ? estimateHeight(line) :1, 
line;
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
function runMode(cm, text, mode, state, f) {
var flattenSpans = mode.flattenSpans;
null == flattenSpans && (flattenSpans = cm.options.flattenSpans);
var style, curText = "", curStyle = null, stream = new StringStream(text, cm.options.tabSize);
for ("" == text && mode.blankLine && mode.blankLine(state); !stream.eol(); ) {
stream.pos > cm.options.maxHighlightLength ? (flattenSpans = !1, stream.pos = Math.min(text.length, stream.start + 5e4), 
style = null) :style = mode.token(stream, state);
var substr = stream.current();
stream.start = stream.pos, flattenSpans && curStyle == style ? curText += substr :(curText && f(curText, curStyle), 
curText = substr, curStyle = style);
}
curText && f(curText, curStyle);
}
function highlightLine(cm, line, state) {
var st = [ cm.state.modeGen ];
runMode(cm, line.text, cm.doc.mode, state, function(txt, style) {
st.push(txt, style);
});
for (var o = 0; o < cm.state.overlays.length; ++o) {
var overlay = cm.state.overlays[o], i = 1;
runMode(cm, line.text, overlay.mode, !0, function(txt, style) {
for (var start = i, len = txt.length; len; ) {
var cur = st[i], len_ = cur.length;
len >= len_ ? len -= len_ :(st.splice(i, 1, cur.slice(0, len), st[i + 1], cur.slice(len)), 
len = 0), i += 2;
}
if (style) if (overlay.opaque) st.splice(start, i - start, txt, style), i = start + 2; else for (;i > start; start += 2) {
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
function processLine(cm, line, state) {
var mode = cm.doc.mode, stream = new StringStream(line.text, cm.options.tabSize);
for ("" == line.text && mode.blankLine && mode.blankLine(state); !stream.eol() && stream.pos <= cm.options.maxHighlightLength; ) mode.token(stream, state), 
stream.start = stream.pos;
}
function styleToClass(style) {
return style ? styleToClassCache[style] || (styleToClassCache[style] = "cm-" + style.replace(/ +/g, " cm-")) :null;
}
function lineContent(cm, realLine, measure) {
for (var merged, lineBefore, sawBefore, line = realLine, simple = !0; merged = collapsedSpanAtStart(line); ) simple = !1, 
line = getLine(cm.doc, merged.find().from.line), lineBefore || (lineBefore = line);
var builder = {
pre:elt("pre"),
col:0,
pos:0,
display:!measure,
measure:null,
addedOne:!1,
cm:cm
};
line.textClass && (builder.pre.className = line.textClass);
do {
builder.measure = line == realLine && measure, builder.pos = 0, builder.addToken = builder.measure ? buildTokenMeasure :buildToken, 
(ie || webkit) && cm.getOption("lineWrapping") && (builder.addToken = buildTokenSplitSpaces(builder.addToken)), 
measure && sawBefore && line != realLine && !builder.addedOne && (measure[0] = builder.pre.appendChild(zeroWidthElement(cm.display.measure)), 
builder.addedOne = !0);
var next = insertLineContent(line, builder, getLineStyles(cm, line));
sawBefore = line == lineBefore, next && (line = getLine(cm.doc, next.to.line), simple = !1);
} while (next);
measure && !builder.addedOne && (measure[0] = builder.pre.appendChild(simple ? elt("span", " ") :zeroWidthElement(cm.display.measure))), 
builder.pre.firstChild || lineIsHidden(cm.doc, realLine) || builder.pre.appendChild(document.createTextNode(" "));
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
return signal(cm, "renderLine", cm, realLine, builder.pre), builder.pre;
}
function buildToken(builder, text, style, startStyle, endStyle) {
if (text) {
if (tokenSpecialChars.test(text)) for (var content = document.createDocumentFragment(), pos = 0; ;) {
tokenSpecialChars.lastIndex = pos;
var m = tokenSpecialChars.exec(text), skipped = m ? m.index - pos :text.length - pos;
if (skipped && (content.appendChild(document.createTextNode(text.slice(pos, pos + skipped))), 
builder.col += skipped), !m) break;
if (pos += skipped + 1, "	" == m[0]) {
var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab")), builder.col += tabWidth;
} else {
var token = elt("span", "•", "cm-invalidchar");
token.title = "\\u" + m[0].charCodeAt(0).toString(16), content.appendChild(token), 
builder.col += 1;
}
} else {
builder.col += text.length;
var content = document.createTextNode(text);
}
if (style || startStyle || endStyle || builder.measure) {
var fullStyle = style || "";
return startStyle && (fullStyle += startStyle), endStyle && (fullStyle += endStyle), 
builder.pre.appendChild(elt("span", [ content ], fullStyle));
}
builder.pre.appendChild(content);
}
}
function buildTokenMeasure(builder, text, style, startStyle, endStyle) {
for (var wrapping = builder.cm.options.lineWrapping, i = 0; i < text.length; ++i) {
var ch = text.charAt(i), start = 0 == i;
ch.charCodeAt(0) >= 55296 && ch.charCodeAt(0) <= 56318 && i < text.length - 1 ? (ch = text.slice(i, i + 2), 
++i) :i && wrapping && spanAffectsWrapping(text, i) && builder.pre.appendChild(elt("wbr"));
var span = builder.measure[builder.pos] = buildToken(builder, ch, style, start && startStyle, i == text.length - 1 && endStyle);
ie && wrapping && " " == ch && i && !/\s/.test(text.charAt(i - 1)) && i < text.length - 1 && !/\s/.test(text.charAt(i + 1)) && (span.style.whiteSpace = "normal"), 
builder.pos += ch.length;
}
text.length && (builder.addedOne = !0);
}
function buildTokenSplitSpaces(inner) {
function split(old) {
for (var out = " ", i = 0; i < old.length - 2; ++i) out += i % 2 ? " " :" ";
return out += " ";
}
return function(builder, text, style, startStyle, endStyle) {
return inner(builder, text.replace(/ {3,}/, split), style, startStyle, endStyle);
};
}
function buildCollapsedSpan(builder, size, widget) {
widget && (builder.display || (widget = widget.cloneNode(!0)), builder.pre.appendChild(widget), 
builder.measure && size && (builder.measure[builder.pos] = widget, builder.addedOne = !0)), 
builder.pos += size;
}
function insertLineContent(line, builder, styles) {
var spans = line.markedSpans;
if (spans) for (var style, spanStyle, spanEndStyle, spanStartStyle, collapsed, allText = line.text, len = allText.length, pos = 0, i = 1, text = "", nextChange = 0; ;) {
if (nextChange == pos) {
spanStyle = spanEndStyle = spanStartStyle = "", collapsed = null, nextChange = 1/0;
for (var foundBookmark = null, j = 0; j < spans.length; ++j) {
var sp = spans[j], m = sp.marker;
sp.from <= pos && (null == sp.to || sp.to > pos) ? (null != sp.to && nextChange > sp.to && (nextChange = sp.to, 
spanEndStyle = ""), m.className && (spanStyle += " " + m.className), m.startStyle && sp.from == pos && (spanStartStyle += " " + m.startStyle), 
m.endStyle && sp.to == nextChange && (spanEndStyle += " " + m.endStyle), m.collapsed && (!collapsed || collapsed.marker.width < m.width) && (collapsed = sp)) :sp.from > pos && nextChange > sp.from && (nextChange = sp.from), 
"bookmark" == m.type && sp.from == pos && m.replacedWith && (foundBookmark = m.replacedWith);
}
if (collapsed && (collapsed.from || 0) == pos && (buildCollapsedSpan(builder, (null == collapsed.to ? len :collapsed.to) - pos, null != collapsed.from && collapsed.marker.replacedWith), 
null == collapsed.to)) return collapsed.marker.find();
foundBookmark && !collapsed && buildCollapsedSpan(builder, 0, foundBookmark);
}
if (pos >= len) break;
for (var upto = Math.min(len, nextChange); ;) {
if (text) {
var end = pos + text.length;
if (!collapsed) {
var tokenText = end > upto ? text.slice(0, upto - pos) :text;
builder.addToken(builder, tokenText, style ? style + spanStyle :spanStyle, spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle :"");
}
if (end >= upto) {
text = text.slice(upto - pos), pos = upto;
break;
}
pos = end, spanStartStyle = "";
}
text = styles[i++], style = styleToClass(styles[i++]);
}
} else for (var i = 1; i < styles.length; i += 2) builder.addToken(builder, styles[i], styleToClass(styles[i + 1]));
}
function updateDoc(doc, change, markedSpans, selAfter, estimateHeight) {
function spansFor(n) {
return markedSpans ? markedSpans[n] :null;
}
function update(line, text, spans) {
updateLine(line, text, spans, estimateHeight), signalLater(line, "change", line, change);
}
var from = change.from, to = change.to, text = change.text, firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line), lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
if (0 == from.ch && 0 == to.ch && "" == lastText) {
for (var i = 0, e = text.length - 1, added = []; e > i; ++i) added.push(makeLine(text[i], spansFor(i), estimateHeight));
update(lastLine, lastLine.text, lastSpans), nlines && doc.remove(from.line, nlines), 
added.length && doc.insert(from.line, added);
} else if (firstLine == lastLine) if (1 == text.length) update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans); else {
for (var added = [], i = 1, e = text.length - 1; e > i; ++i) added.push(makeLine(text[i], spansFor(i), estimateHeight));
added.push(makeLine(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight)), 
update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0)), doc.insert(from.line + 1, added);
} else if (1 == text.length) update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0)), 
doc.remove(from.line + 1, nlines); else {
update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0)), update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
for (var i = 1, e = text.length - 1, added = []; e > i; ++i) added.push(makeLine(text[i], spansFor(i), estimateHeight));
nlines > 1 && doc.remove(from.line + 1, nlines - 1), doc.insert(from.line + 1, added);
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
function makeHistory() {
return {
done:[],
undone:[],
undoDepth:1/0,
lastTime:0,
lastOp:null,
lastOrigin:null,
dirtyCounter:0
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
var histChange = {
from:change.from,
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
} else {
for (cur = {
changes:[ historyChangeFromChange(doc, change) ],
anchorBefore:doc.sel.anchor,
headBefore:doc.sel.head,
anchorAfter:selAfter.anchor,
headAfter:selAfter.head
}, hist.done.push(cur); hist.done.length > hist.undoDepth; ) hist.done.shift();
hist.dirtyCounter < 0 ? hist.dirtyCounter = 0/0 :hist.dirtyCounter++;
}
hist.lastTime = time, hist.lastOp = opId, hist.lastOrigin = change.origin;
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
ios ? (node.selectionStart = 0, node.selectionEnd = node.value.length) :node.select();
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
return /\w/.test(ch) || ch > "" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
}
function isEmpty(obj) {
for (var n in obj) if (obj.hasOwnProperty(n) && obj[n]) return !1;
return !0;
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
var test = elt("span", "​");
removeChildrenAndAdd(measure, elt("span", [ test, document.createTextNode("x") ])), 
0 != measure.firstChild.offsetHeight && (zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !ie_lt8);
}
return zwspSupported ? elt("span", "​") :elt("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
}
function iterateBidiSections(order, from, to, f) {
if (!order) return f(from, to, "ltr");
for (var i = 0; i < order.length; ++i) {
var part = order[i];
(part.from < to && part.to > from || from == to && part.to == from) && f(Math.max(part.from, from), Math.min(part.to, to), 1 == part.level ? "rtl" :"ltr");
}
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
for (var found, i = 0; i < order.length; ++i) {
var cur = order[i];
if (cur.from < pos && cur.to > pos) return bidiOther = null, i;
if (cur.from == pos || cur.to == pos) {
if (null != found) return compareBidiLevel(order, cur.level, order[found].level) ? (bidiOther = found, 
i) :(bidiOther = i, found);
found = i;
}
}
return bidiOther = null, found;
}
function moveInLine(line, pos, dir, byUnit) {
if (!byUnit) return pos + dir;
do pos += dir; while (pos > 0 && isExtendingChar.test(line.text.charAt(pos)));
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
if (byUnit) for (;target > 0 && isExtendingChar.test(line.text.charAt(target)); ) target += dir;
return 0 > target || target > line.text.length ? null :target;
}
var gecko = /gecko\/\d/i.test(navigator.userAgent), ie = /MSIE \d/.test(navigator.userAgent), ie_lt8 = ie && (null == document.documentMode || document.documentMode < 8), ie_lt9 = ie && (null == document.documentMode || document.documentMode < 9), webkit = /WebKit\//.test(navigator.userAgent), qtwebkit = webkit && /Qt\/\d+\.\d+/.test(navigator.userAgent), chrome = /Chrome\//.test(navigator.userAgent), opera = /Opera\//.test(navigator.userAgent), safari = /Apple Computer/.test(navigator.vendor), khtml = /KHTML\//.test(navigator.userAgent), mac_geLion = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent), mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent), phantom = /PhantomJS/.test(navigator.userAgent), ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent), mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent), mac = ios || /Mac/.test(navigator.platform), windows = /windows/i.test(navigator.platform), opera_version = opera && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
opera_version && (opera_version = Number(opera_version[1]));
var measureText, lastClick, lastDoubleClick, flipCtrlCmd = mac && (qtwebkit || opera && (null == opera_version || 12.11 > opera_version)), captureMiddleClick = gecko || ie && !ie_lt9, sawReadOnlySpans = !1, sawCollapsedSpans = !1, nextOpId = 0, wheelSamples = 0, wheelPixelsPerUnit = null;
ie ? wheelPixelsPerUnit = -.53 :gecko ? wheelPixelsPerUnit = 15 :chrome ? wheelPixelsPerUnit = -.7 :safari && (wheelPixelsPerUnit = -1 / 3);
var maybeTransition, detectingSelectAll, lastStoppedKey = null;
CodeMirror.Pos = Pos, CodeMirror.prototype = {
constructor:CodeMirror,
focus:function() {
window.focus(), focusInput(this), onFocus(this), fastPoll(this);
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
for (var maps = this.state.keyMaps, i = 0; i < maps.length; ++i) if (("string" == typeof map ? maps[i].name :maps[i]) == map) return maps.splice(i, 1), 
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
for (var overlays = this.state.overlays, i = 0; i < overlays.length; ++i) if (overlays[i].modeSpec == spec) return overlays.splice(i, 1), 
this.state.modeGen++, regChange(this), void 0;
}),
indentLine:operation(null, function(n, dir, aggressive) {
"string" != typeof dir && (dir = null == dir ? this.options.smartIndent ? "smart" :"prev" :dir ? "add" :"subtract"), 
isLine(this.doc, n) && indentLine(this, n, dir, aggressive);
}),
indentSelection:operation(null, function(how) {
var sel = this.doc.sel;
if (posEq(sel.from, sel.to)) return indentLine(this, sel.from.line, how);
for (var e = sel.to.line - (sel.to.ch ? 0 :1), i = sel.from.line; e >= i; ++i) indentLine(this, i, how);
}),
getTokenAt:function(pos) {
var doc = this.doc;
pos = clipPos(doc, pos);
for (var state = getStateBefore(this, pos.line), mode = this.doc.mode, line = getLine(doc, pos.line), stream = new StringStream(line.text, this.options.tabSize); stream.pos < pos.ch && !stream.eol(); ) {
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
getStateAfter:function(line) {
var doc = this.doc;
return line = clipLine(doc, null == line ? doc.first + doc.size - 1 :line), getStateBefore(this, line + 1);
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
if (new RegExp("\\b" + cls + "\\b").test(line[prop])) return !1;
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
var upd = cur.replace(new RegExp("^" + cls + "\\b\\s*|\\s*\\b" + cls + "\\b"), "");
if (upd == cur) return !1;
line[prop] = upd || null;
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
node.style.top = top + paddingTop(display) + "px", node.style.left = node.style.right = "", 
"right" == horiz ? (left = display.sizer.clientWidth - node.offsetWidth, node.style.right = "0px") :("left" == horiz ? left = 0 :"middle" == horiz && (left = (display.sizer.clientWidth - node.offsetWidth) / 2), 
node.style.left = left + "px"), scroll && scrollIntoView(this, left, top, left + node.offsetWidth, top + node.offsetHeight);
},
triggerOnKeyDown:operation(null, onKeyDown),
execCommand:function(cmd) {
return commands[cmd](this);
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
var sel = this.doc.sel, pos = cursorCoords(this, sel.head, "div");
null != sel.goalColumn && (pos.left = sel.goalColumn);
var target = findPosV(this, pos, dir, unit);
"page" == unit && addToScrollPos(this, 0, charCoords(this, target, "div").top - pos.top), 
extendSelection(this.doc, target, target, dir), sel.goalColumn = pos.left;
}),
toggleOverwrite:function(value) {
(null == value || value != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? this.display.cursor.className += " CodeMirror-overwrite" :this.display.cursor.className = this.display.cursor.className.replace(" CodeMirror-overwrite", ""));
},
hasFocus:function() {
return this.state.focused;
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
scrollIntoView:operation(null, function(pos, margin) {
"number" == typeof pos && (pos = Pos(pos, 0)), margin || (margin = 0);
var coords = pos;
pos && null == pos.line || (this.curOp.scrollToPos = pos ? clipPos(this.doc, pos) :this.doc.sel.head, 
this.curOp.scrollToPosMargin = margin, coords = cursorCoords(this, this.curOp.scrollToPos));
var sPos = calculateScrollPos(this, coords.left, coords.top - margin, coords.right, coords.bottom + margin);
updateScrollPos(this, sPos.scrollLeft, sPos.scrollTop);
}),
setSize:function(width, height) {
function interpret(val) {
return "number" == typeof val || /^\d+$/.test(String(val)) ? val + "px" :val;
}
null != width && (this.display.wrapper.style.width = interpret(width)), null != height && (this.display.wrapper.style.height = interpret(height)), 
this.refresh();
},
on:function(type, f) {
on(this, type, f);
},
off:function(type, f) {
off(this, type, f);
},
operation:function(f) {
return runInOp(this, f);
},
refresh:operation(null, function() {
clearCaches(this), updateScrollPos(this, this.doc.scrollLeft, this.doc.scrollTop), 
regChange(this);
}),
swapDoc:operation(null, function(doc) {
var old = this.doc;
return old.cm = null, attachDoc(this, doc), clearCaches(this), resetInput(this, !0), 
updateScrollPos(this, doc.scrollLeft, doc.scrollTop), old;
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
};
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
loadMode(cm), clearCaches(cm), regChange(cm);
}, !0), option("electricChars", !0), option("rtlMoveVisually", !windows), option("theme", "default", function(cm) {
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
option("readOnly", !1, function(cm, val) {
"nocursor" == val ? (onBlur(cm), cm.display.input.blur()) :val || resetInput(cm, !0);
}), option("dragDrop", !0), option("cursorBlinkRate", 530), option("cursorScrollMargin", 0), 
option("cursorHeight", 1), option("workTime", 100), option("workDelay", 100), option("flattenSpans", !0), 
option("pollInterval", 100), option("undoDepth", 40, function(cm, val) {
cm.doc.history.undoDepth = val;
}), option("historyEventDelay", 500), option("viewportMargin", 10, function(cm) {
cm.refresh();
}, !0), option("maxHighlightLength", 1e4, function(cm) {
loadMode(cm), cm.refresh();
}, !0), option("moveInputWithCursor", !0, function(cm, val) {
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
spec = createObj(found, spec), spec.name = found.name;
} else if ("string" == typeof spec && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) return CodeMirror.resolveMode("application/xml");
return "string" == typeof spec ? {
name:spec
} :spec || {
name:"null"
};
}, CodeMirror.getMode = function(options, spec) {
spec = CodeMirror.resolveMode(spec);
var mfactory = modes[spec.name];
if (!mfactory) return CodeMirror.getMode(options, "text/plain");
var modeObj = mfactory(options, spec);
if (modeExtensions.hasOwnProperty(spec.name)) {
var exts = modeExtensions[spec.name];
for (var prop in exts) exts.hasOwnProperty(prop) && (modeObj.hasOwnProperty(prop) && (modeObj["_" + prop] = modeObj[prop]), 
modeObj[prop] = exts[prop]);
}
return modeObj.name = spec.name, modeObj;
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
}, CodeMirror.copyState = copyState, CodeMirror.startState = startState, CodeMirror.innerMode = function(mode, state) {
for (;mode.innerMode; ) {
var info = mode.innerMode(state);
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
cm.replaceRange("", Pos(l, 0), Pos(l), "+delete");
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
"Alt-Up":"goDocStart",
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
return 0 == this.pos;
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
this.lastColumnPos = this.start), this.lastColumnValue;
},
indentation:function() {
return countColumn(this.string, null, this.tabSize);
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
}
}, CodeMirror.StringStream = StringStream, CodeMirror.TextMarker = TextMarker, TextMarker.prototype.clear = function() {
if (!this.explicitlyCleared) {
var cm = this.doc.cm, withOp = cm && !cm.curOp;
withOp && startOperation(cm);
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
this.collapsed && this.doc.cantEdit && (this.doc.cantEdit = !1, cm && reCheckSelection(cm)), 
withOp && endOperation(cm), signalLater(this, "clear");
}
}, TextMarker.prototype.find = function() {
for (var from, to, i = 0; i < this.lines.length; ++i) {
var line = this.lines[i], span = getMarkedSpanFor(line.markedSpans, this);
if (null != span.from || null != span.to) {
var found = lineNo(line);
null != span.from && (from = Pos(found, span.from)), null != span.to && (to = Pos(found, span.to));
}
}
return "bookmark" == this.type ? from :from && {
from:from,
to:to
};
}, TextMarker.prototype.changed = function() {
var pos = this.find(), cm = this.doc.cm;
if (pos && cm) {
var line = getLine(this.doc, pos.from.line);
if (clearCachedMeasurement(cm, line), pos.from.line >= cm.display.showingFrom && pos.from.line < cm.display.showingTo) {
for (var node = cm.display.lineDiv.firstChild; node; node = node.nextSibling) if (node.lineObj == line) {
node.offsetHeight != line.height && updateLineHeight(line, node.offsetHeight);
break;
}
runInOp(cm, function() {
cm.curOp.selectionChanged = !0;
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
}, CodeMirror.SharedTextMarker = SharedTextMarker, SharedTextMarker.prototype.clear = function() {
if (!this.explicitlyCleared) {
this.explicitlyCleared = !0;
for (var i = 0; i < this.markers.length; ++i) this.markers[i].clear();
signalLater(this, "clear");
}
}, SharedTextMarker.prototype.find = function() {
return this.primary.find();
};
var LineWidget = CodeMirror.LineWidget = function(cm, node, options) {
for (var opt in options) options.hasOwnProperty(opt) && (this[opt] = options[opt]);
this.cm = cm, this.node = node;
};
LineWidget.prototype.clear = widgetOperation(function() {
var ws = this.line.widgets, no = lineNo(this.line);
if (null != no && ws) {
for (var i = 0; i < ws.length; ++i) ws[i] == this && ws.splice(i--, 1);
ws.length || (this.line.widgets = null), updateLineHeight(this.line, Math.max(0, this.line.height - widgetHeight(this))), 
regChange(this.cm, no, no + 1);
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
var styleToClassCache = {}, tokenSpecialChars = /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\uFEFF]/g;
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
null == firstLine && (firstLine = 0), BranchChunk.call(this, [ new LeafChunk([ makeLine("", null) ]) ]), 
this.first = firstLine, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, 
this.history = makeHistory(), this.frontier = firstLine;
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
setSelection:docOperation(function(anchor, head) {
setSelection(this, clipPos(this, anchor), clipPos(this, head || anchor));
}),
extendSelection:docOperation(function(from, to) {
extendSelection(this, clipPos(this, from), to && clipPos(this, to));
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
this.history = makeHistory();
},
markClean:function() {
this.history.dirtyCounter = 0, this.history.lastOp = this.history.lastOrigin = null;
},
isClean:function() {
return 0 == this.history.dirtyCounter;
},
getHistory:function() {
return {
done:copyHistoryArray(this.history.done),
undone:copyHistoryArray(this.history.undone)
};
},
setHistory:function(histData) {
var hist = this.history = makeHistory();
hist.done = histData.done.slice(0), hist.undone = histData.undone.slice(0);
},
markText:function(from, to, options) {
return markText(this, clipPos(this, from), clipPos(this, to), options, "range");
},
setBookmark:function(pos, options) {
var realOpts = {
replacedWith:options && (null == options.nodeType ? options.widget :options),
insertLeft:options && options.insertLeft
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
CodeMirror.e_stop = e_stop, CodeMirror.e_preventDefault = e_preventDefault, CodeMirror.e_stopPropagation = e_stopPropagation;
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
var spaceStrs = [ "" ], nonASCIISingleCaseWordChar = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, isExtendingChar = /[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\uA66F\uA670-\uA672\uA674-\uA67D\uA69F\udc00-\udfff]/;
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
} :webkit && (spanAffectsWrapping = function(str, i) {
return i > 1 && 45 == str.charCodeAt(i - 1) && /\w/.test(str.charAt(i - 2)) && /[^\-?\.]/.test(str.charAt(i)) ? !0 :/[~!#%&*)=+}\]|\"\.>,:;][({[<]|\?[\w~`@#$%\^&*(_=+{[|><]/.test(str.slice(i - 1, i + 1));
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
91:"Mod",
92:"Mod",
93:"Mod",
109:"-",
107:"=",
127:"Delete",
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
63276:"PageUp",
63277:"PageDown",
63275:"End",
63273:"Home",
63234:"Left",
63232:"Up",
63235:"Right",
63233:"Down",
63302:"Insert",
63272:"Delete"
};
CodeMirror.keyNames = keyNames, function() {
for (var i = 0; 10 > i; i++) keyNames[i + 48] = String(i);
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
for (var replace = i && "!" == types[i - 1] || len - 1 > end && "1" == types[end] ? "1" :"N", j = i; end > j; ++j) types[j] = replace;
i = end - 1;
}
}
for (var i = 0, cur = outerType; len > i; ++i) {
var type = types[i];
"L" == cur && "1" == type ? types[i] = "L" :isStrong.test(type) && (cur = type);
}
for (var i = 0; len > i; ++i) if (isNeutral.test(types[i])) {
for (var end = i + 1; len > end && isNeutral.test(types[end]); ++end) ;
for (var before = "L" == (i ? types[i - 1] :outerType), after = "L" == (len - 1 > end ? types[end] :outerType), replace = before || after ? "L" :"R", j = i; end > j; ++j) types[j] = replace;
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
return CodeMirror.version = "3.13", CodeMirror;
}(), CodeMirror.defineMode("clike", function(config, parserConfig) {
function tokenBase(stream, state) {
var ch = stream.next();
if (hooks[ch]) {
var result = hooks[ch](stream, state);
if (result !== !1) return result;
}
if ('"' == ch || "'" == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return curPunc = ch, null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), "number";
if ("/" == ch) {
if (stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
}
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_]/);
var cur = stream.current();
return keywords.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"keyword") :builtin.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"builtin") :atoms.propertyIsEnumerable(cur) ? "atom" :"variable";
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return (end || !escaped && !multiLineStrings) && (state.tokenize = null), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = null;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function Context(indented, column, type, align, prev) {
this.indented = indented, this.column = column, this.type = type, this.align = align, 
this.prev = prev;
}
function pushContext(state, col, type) {
var indent = state.indented;
return state.context && "statement" == state.context.type && (indent = state.context.indented), 
state.context = new Context(indent, col, type, null, state.context);
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
var curPunc, indentUnit = config.indentUnit, statementIndentUnit = parserConfig.statementIndentUnit || indentUnit, dontAlignCalls = parserConfig.dontAlignCalls, keywords = parserConfig.keywords || {}, builtin = parserConfig.builtin || {}, blockKeywords = parserConfig.blockKeywords || {}, atoms = parserConfig.atoms || {}, hooks = parserConfig.hooks || {}, multiLineStrings = parserConfig.multiLineStrings, isOperatorChar = /[+\-*&%=<>!?|\/]/;
return {
startState:function(basecolumn) {
return {
tokenize:null,
context:new Context((basecolumn || 0) - indentUnit, 0, "top", !1),
indented:0,
startOfLine:!0
};
},
token:function(stream, state) {
var ctx = state.context;
if (stream.sol() && (null == ctx.align && (ctx.align = !1), state.indented = stream.indentation(), 
state.startOfLine = !0), stream.eatSpace()) return null;
curPunc = null;
var style = (state.tokenize || tokenBase)(stream, state);
if ("comment" == style || "meta" == style) return style;
if (null == ctx.align && (ctx.align = !0), ";" != curPunc && ":" != curPunc && "," != curPunc || "statement" != ctx.type) if ("{" == curPunc) pushContext(state, stream.column(), "}"); else if ("[" == curPunc) pushContext(state, stream.column(), "]"); else if ("(" == curPunc) pushContext(state, stream.column(), ")"); else if ("}" == curPunc) {
for (;"statement" == ctx.type; ) ctx = popContext(state);
for ("}" == ctx.type && (ctx = popContext(state)); "statement" == ctx.type; ) ctx = popContext(state);
} else curPunc == ctx.type ? popContext(state) :(("}" == ctx.type || "top" == ctx.type) && ";" != curPunc || "statement" == ctx.type && "newstatement" == curPunc) && pushContext(state, stream.column(), "statement"); else popContext(state);
return state.startOfLine = !1, style;
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase && null != state.tokenize) return CodeMirror.Pass;
var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
"statement" == ctx.type && "}" == firstChar && (ctx = ctx.prev);
var closing = firstChar == ctx.type;
return "statement" == ctx.type ? ctx.indented + ("{" == firstChar ? 0 :statementIndentUnit) :!ctx.align || dontAlignCalls && ")" == ctx.type ? ")" != ctx.type || closing ? ctx.indented + (closing ? 0 :indentUnit) :ctx.indented + statementIndentUnit :ctx.column + (closing ? 0 :1);
},
electricChars:"{}",
blockCommentStart:"/*",
blockCommentEnd:"*/",
lineComment:"//"
};
}), function() {
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function cppHook(stream, state) {
if (!state.startOfLine) return !1;
for (;;) {
if (!stream.skipTo("\\")) {
stream.skipToEnd(), state.tokenize = null;
break;
}
if (stream.next(), stream.eol()) {
state.tokenize = cppHook;
break;
}
}
return "meta";
}
function tokenAtString(stream, state) {
for (var next; null != (next = stream.next()); ) if ('"' == next && !stream.eat('"')) {
state.tokenize = null;
break;
}
return "string";
}
function mimes(ms, mode) {
for (var i = 0; i < ms.length; ++i) CodeMirror.defineMIME(ms[i], mode);
}
var cKeywords = "auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";
mimes([ "text/x-csrc", "text/x-c", "text/x-chdr" ], {
name:"clike",
keywords:words(cKeywords),
blockKeywords:words("case do else for if switch while struct"),
atoms:words("null"),
hooks:{
"#":cppHook
}
}), mimes([ "text/x-c++src", "text/x-c++hdr" ], {
name:"clike",
keywords:words(cKeywords + " asm dynamic_cast namespace reinterpret_cast try bool explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected wchar_t"),
blockKeywords:words("catch class do else finally for if struct switch try while"),
atoms:words("true false null"),
hooks:{
"#":cppHook
}
}), CodeMirror.defineMIME("text/x-java", {
name:"clike",
keywords:words("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),
blockKeywords:words("catch class do else finally for if switch try while"),
atoms:words("true false null"),
hooks:{
"@":function(stream) {
return stream.eatWhile(/[\w\$_]/), "meta";
}
}
}), CodeMirror.defineMIME("text/x-csharp", {
name:"clike",
keywords:words("abstract as base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
blockKeywords:words("catch class do else finally for foreach if struct switch try while"),
builtin:words("Boolean Byte Char DateTime DateTimeOffset Decimal Double Guid Int16 Int32 Int64 Object SByte Single String TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),
atoms:words("true false null"),
hooks:{
"@":function(stream, state) {
return stream.eat('"') ? (state.tokenize = tokenAtString, tokenAtString(stream, state)) :(stream.eatWhile(/[\w\$_]/), 
"meta");
}
}
}), CodeMirror.defineMIME("text/x-scala", {
name:"clike",
keywords:words("abstract case catch class def do else extends false final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try trye type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector :: #:: Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
blockKeywords:words("catch class do else finally for forSome if match switch try while"),
atoms:words("true false null"),
hooks:{
"@":function(stream) {
return stream.eatWhile(/[\w\$_]/), "meta";
}
}
});
}(), CodeMirror.defineMode("python", function(conf, parserConf) {
function wordRegexp(words) {
return new RegExp("^((" + words.join(")|(") + "))\\b");
}
function tokenBase(stream, state) {
if (stream.sol()) {
var scopeOffset = state.scopes[0].offset;
if (stream.eatSpace()) {
var lineOffset = stream.indentation();
return lineOffset > scopeOffset ? indentInfo = "indent" :scopeOffset > lineOffset && (indentInfo = "dedent"), 
null;
}
scopeOffset > 0 && dedent(stream, state);
}
if (stream.eatSpace()) return null;
var ch = stream.peek();
if ("#" === ch) return stream.skipToEnd(), "comment";
if (stream.match(/^[0-9\.]/, !1)) {
var floatLiteral = !1;
if (stream.match(/^\d*\.\d+(e[\+\-]?\d+)?/i) && (floatLiteral = !0), stream.match(/^\d+\.\d*/) && (floatLiteral = !0), 
stream.match(/^\.\d+/) && (floatLiteral = !0), floatLiteral) return stream.eat(/J/i), 
"number";
var intLiteral = !1;
if (stream.match(/^0x[0-9a-f]+/i) && (intLiteral = !0), stream.match(/^0b[01]+/i) && (intLiteral = !0), 
stream.match(/^0o[0-7]+/i) && (intLiteral = !0), stream.match(/^[1-9]\d*(e[\+\-]?\d+)?/) && (stream.eat(/J/i), 
intLiteral = !0), stream.match(/^0(?![\dx])/i) && (intLiteral = !0), intLiteral) return stream.eat(/L/i), 
"number";
}
return stream.match(stringPrefixes) ? (state.tokenize = tokenStringFactory(stream.current()), 
state.tokenize(stream, state)) :stream.match(tripleDelimiters) || stream.match(doubleDelimiters) ? null :stream.match(doubleOperators) || stream.match(singleOperators) || stream.match(wordOperators) ? "operator" :stream.match(singleDelimiters) ? null :stream.match(keywords) ? "keyword" :stream.match(builtins) ? "builtin" :stream.match(identifiers) ? "variable" :(stream.next(), 
ERRORCLASS);
}
function tokenStringFactory(delimiter) {
function tokenString(stream, state) {
for (;!stream.eol(); ) if (stream.eatWhile(/[^'"\\]/), stream.eat("\\")) {
if (stream.next(), singleline && stream.eol()) return OUTCLASS;
} else {
if (stream.match(delimiter)) return state.tokenize = tokenBase, OUTCLASS;
stream.eat(/['"]/);
}
if (singleline) {
if (parserConf.singleLineStringErrors) return ERRORCLASS;
state.tokenize = tokenBase;
}
return OUTCLASS;
}
for (;"rub".indexOf(delimiter.charAt(0).toLowerCase()) >= 0; ) delimiter = delimiter.substr(1);
var singleline = 1 == delimiter.length, OUTCLASS = "string";
return tokenString.isString = !0, tokenString;
}
function indent(stream, state, type) {
type = type || "py";
var indentUnit = 0;
if ("py" === type) {
if ("py" !== state.scopes[0].type) return state.scopes[0].offset = stream.indentation(), 
void 0;
for (var i = 0; i < state.scopes.length; ++i) if ("py" === state.scopes[i].type) {
indentUnit = state.scopes[i].offset + conf.indentUnit;
break;
}
} else indentUnit = stream.column() + stream.current().length;
state.scopes.unshift({
offset:indentUnit,
type:type
});
}
function dedent(stream, state, type) {
if (type = type || "py", 1 != state.scopes.length) {
if ("py" === state.scopes[0].type) {
for (var _indent = stream.indentation(), _indent_index = -1, i = 0; i < state.scopes.length; ++i) if (_indent === state.scopes[i].offset) {
_indent_index = i;
break;
}
if (-1 === _indent_index) return !0;
for (;state.scopes[0].offset !== _indent; ) state.scopes.shift();
return !1;
}
return "py" === type ? (state.scopes[0].offset = stream.indentation(), !1) :state.scopes[0].type != type ? !0 :(state.scopes.shift(), 
!1);
}
}
function tokenLexer(stream, state) {
indentInfo = null;
var style = state.tokenize(stream, state), current = stream.current();
if ("." === current) return style = stream.match(identifiers, !1) ? null :ERRORCLASS, 
null === style && "meta" === state.lastToken && (style = "meta"), style;
if ("@" === current) return stream.match(identifiers, !1) ? "meta" :ERRORCLASS;
"variable" !== style && "builtin" !== style || "meta" !== state.lastToken || (style = "meta"), 
("pass" === current || "return" === current) && (state.dedent += 1), "lambda" === current && (state.lambda = !0), 
(":" === current && !state.lambda && "py" == state.scopes[0].type || "indent" === indentInfo) && indent(stream, state);
var delimiter_index = "[({".indexOf(current);
return -1 !== delimiter_index && indent(stream, state, "])}".slice(delimiter_index, delimiter_index + 1)), 
"dedent" === indentInfo && dedent(stream, state) ? ERRORCLASS :(delimiter_index = "])}".indexOf(current), 
-1 !== delimiter_index && dedent(stream, state, current) ? ERRORCLASS :(state.dedent > 0 && stream.eol() && "py" == state.scopes[0].type && (state.scopes.length > 1 && state.scopes.shift(), 
state.dedent -= 1), style));
}
var ERRORCLASS = "error", singleOperators = parserConf.singleOperators || new RegExp("^[\\+\\-\\*/%&|\\^~<>!]"), singleDelimiters = parserConf.singleDelimiters || new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"), doubleOperators = parserConf.doubleOperators || new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"), doubleDelimiters = parserConf.doubleDelimiters || new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"), tripleDelimiters = parserConf.tripleDelimiters || new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"), identifiers = parserConf.identifiers || new RegExp("^[_A-Za-z][_A-Za-z0-9]*"), wordOperators = wordRegexp([ "and", "or", "not", "is", "in" ]), commonkeywords = [ "as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield" ], commonBuiltins = [ "abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__" ], py2 = {
builtins:[ "apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "False", "True", "None" ],
keywords:[ "exec", "print" ]
}, py3 = {
builtins:[ "ascii", "bytes", "exec", "print" ],
keywords:[ "nonlocal", "False", "True", "None" ]
};
if (parserConf.version && 3 === parseInt(parserConf.version, 10)) {
commonkeywords = commonkeywords.concat(py3.keywords), commonBuiltins = commonBuiltins.concat(py3.builtins);
var stringPrefixes = new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))", "i");
} else {
commonkeywords = commonkeywords.concat(py2.keywords), commonBuiltins = commonBuiltins.concat(py2.builtins);
var stringPrefixes = new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i");
}
var keywords = wordRegexp(commonkeywords), builtins = wordRegexp(commonBuiltins), indentInfo = null, external = {
startState:function(basecolumn) {
return {
tokenize:tokenBase,
scopes:[ {
offset:basecolumn || 0,
type:"py"
} ],
lastToken:null,
lambda:!1,
dedent:0
};
},
token:function(stream, state) {
var style = tokenLexer(stream, state);
return state.lastToken = style, stream.eol() && stream.lambda && (state.lambda = !1), 
style;
},
indent:function(state) {
return state.tokenize != tokenBase ? state.tokenize.isString ? CodeMirror.Pass :0 :state.scopes[0].offset;
},
lineComment:"#"
};
return external;
}), CodeMirror.defineMIME("text/x-python", "python"), CodeMirror.defineMode("perl", function() {
function tokenChain(stream, state, chain, style, tail) {
return state.chain = null, state.style = null, state.tail = null, state.tokenize = function(stream, state) {
for (var c, e = !1, i = 0; c = stream.next(); ) {
if (c === chain[i] && !e) return void 0 !== chain[++i] ? (state.chain = chain[i], 
state.style = style, state.tail = tail) :tail && stream.eatWhile(tail), state.tokenize = tokenPerl, 
style;
e = !e && "\\" == c;
}
return style;
}, state.tokenize(stream, state);
}
function tokenSOMETHING(stream, state, string) {
return state.tokenize = function(stream, state) {
return stream.string == string && (state.tokenize = tokenPerl), stream.skipToEnd(), 
"string";
}, state.tokenize(stream, state);
}
function tokenPerl(stream, state) {
if (stream.eatSpace()) return null;
if (state.chain) return tokenChain(stream, state, state.chain, state.style, state.tail);
if (stream.match(/^\-?[\d\.]/, !1) && stream.match(/^(\-?(\d*\.\d+(e[+-]?\d+)?|\d+\.\d*)|0x[\da-fA-F]+|0b[01]+|\d+(e[+-]?\d+)?)/)) return "number";
if (stream.match(/^<<(?=\w)/)) return stream.eatWhile(/\w/), tokenSOMETHING(stream, state, stream.current().substr(2));
if (stream.sol() && stream.match(/^\=item(?!\w)/)) return tokenSOMETHING(stream, state, "=cut");
var ch = stream.next();
if ('"' == ch || "'" == ch) {
if (stream.prefix(3) == "<<" + ch) {
var p = stream.pos;
stream.eatWhile(/\w/);
var n = stream.current().substr(1);
if (n && stream.eat(ch)) return tokenSOMETHING(stream, state, n);
stream.pos = p;
}
return tokenChain(stream, state, [ ch ], "string");
}
if ("q" == ch) {
var c = stream.look(-2);
if (!c || !/\w/.test(c)) if (c = stream.look(0), "x" == c) {
if (c = stream.look(1), "(" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ ")" ], RXstyle, RXmodifiers);
if ("[" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ "]" ], RXstyle, RXmodifiers);
if ("{" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ "}" ], RXstyle, RXmodifiers);
if ("<" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ ">" ], RXstyle, RXmodifiers);
if (/[\^'"!~\/]/.test(c)) return stream.eatSuffix(1), tokenChain(stream, state, [ stream.eat(c) ], RXstyle, RXmodifiers);
} else if ("q" == c) {
if (c = stream.look(1), "(" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ ")" ], "string");
if ("[" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ "]" ], "string");
if ("{" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ "}" ], "string");
if ("<" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ ">" ], "string");
if (/[\^'"!~\/]/.test(c)) return stream.eatSuffix(1), tokenChain(stream, state, [ stream.eat(c) ], "string");
} else if ("w" == c) {
if (c = stream.look(1), "(" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ ")" ], "bracket");
if ("[" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ "]" ], "bracket");
if ("{" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ "}" ], "bracket");
if ("<" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ ">" ], "bracket");
if (/[\^'"!~\/]/.test(c)) return stream.eatSuffix(1), tokenChain(stream, state, [ stream.eat(c) ], "bracket");
} else if ("r" == c) {
if (c = stream.look(1), "(" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ ")" ], RXstyle, RXmodifiers);
if ("[" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ "]" ], RXstyle, RXmodifiers);
if ("{" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ "}" ], RXstyle, RXmodifiers);
if ("<" == c) return stream.eatSuffix(2), tokenChain(stream, state, [ ">" ], RXstyle, RXmodifiers);
if (/[\^'"!~\/]/.test(c)) return stream.eatSuffix(1), tokenChain(stream, state, [ stream.eat(c) ], RXstyle, RXmodifiers);
} else if (/[\^'"!~\/(\[{<]/.test(c)) {
if ("(" == c) return stream.eatSuffix(1), tokenChain(stream, state, [ ")" ], "string");
if ("[" == c) return stream.eatSuffix(1), tokenChain(stream, state, [ "]" ], "string");
if ("{" == c) return stream.eatSuffix(1), tokenChain(stream, state, [ "}" ], "string");
if ("<" == c) return stream.eatSuffix(1), tokenChain(stream, state, [ ">" ], "string");
if (/[\^'"!~\/]/.test(c)) return tokenChain(stream, state, [ stream.eat(c) ], "string");
}
}
if ("m" == ch) {
var c = stream.look(-2);
if ((!c || !/\w/.test(c)) && (c = stream.eat(/[(\[{<\^'"!~\/]/))) {
if (/[\^'"!~\/]/.test(c)) return tokenChain(stream, state, [ c ], RXstyle, RXmodifiers);
if ("(" == c) return tokenChain(stream, state, [ ")" ], RXstyle, RXmodifiers);
if ("[" == c) return tokenChain(stream, state, [ "]" ], RXstyle, RXmodifiers);
if ("{" == c) return tokenChain(stream, state, [ "}" ], RXstyle, RXmodifiers);
if ("<" == c) return tokenChain(stream, state, [ ">" ], RXstyle, RXmodifiers);
}
}
if ("s" == ch) {
var c = /[\/>\]})\w]/.test(stream.look(-2));
if (!c && (c = stream.eat(/[(\[{<\^'"!~\/]/))) return "[" == c ? tokenChain(stream, state, [ "]", "]" ], RXstyle, RXmodifiers) :"{" == c ? tokenChain(stream, state, [ "}", "}" ], RXstyle, RXmodifiers) :"<" == c ? tokenChain(stream, state, [ ">", ">" ], RXstyle, RXmodifiers) :"(" == c ? tokenChain(stream, state, [ ")", ")" ], RXstyle, RXmodifiers) :tokenChain(stream, state, [ c, c ], RXstyle, RXmodifiers);
}
if ("y" == ch) {
var c = /[\/>\]})\w]/.test(stream.look(-2));
if (!c && (c = stream.eat(/[(\[{<\^'"!~\/]/))) return "[" == c ? tokenChain(stream, state, [ "]", "]" ], RXstyle, RXmodifiers) :"{" == c ? tokenChain(stream, state, [ "}", "}" ], RXstyle, RXmodifiers) :"<" == c ? tokenChain(stream, state, [ ">", ">" ], RXstyle, RXmodifiers) :"(" == c ? tokenChain(stream, state, [ ")", ")" ], RXstyle, RXmodifiers) :tokenChain(stream, state, [ c, c ], RXstyle, RXmodifiers);
}
if ("t" == ch) {
var c = /[\/>\]})\w]/.test(stream.look(-2));
if (!c && (c = stream.eat("r"), c && (c = stream.eat(/[(\[{<\^'"!~\/]/)))) return "[" == c ? tokenChain(stream, state, [ "]", "]" ], RXstyle, RXmodifiers) :"{" == c ? tokenChain(stream, state, [ "}", "}" ], RXstyle, RXmodifiers) :"<" == c ? tokenChain(stream, state, [ ">", ">" ], RXstyle, RXmodifiers) :"(" == c ? tokenChain(stream, state, [ ")", ")" ], RXstyle, RXmodifiers) :tokenChain(stream, state, [ c, c ], RXstyle, RXmodifiers);
}
if ("`" == ch) return tokenChain(stream, state, [ ch ], "variable-2");
if ("/" == ch) return /~\s*$/.test(stream.prefix()) ? tokenChain(stream, state, [ ch ], RXstyle, RXmodifiers) :"operator";
if ("$" == ch) {
var p = stream.pos;
if (stream.eatWhile(/\d/) || stream.eat("{") && stream.eatWhile(/\d/) && stream.eat("}")) return "variable-2";
stream.pos = p;
}
if (/[$@%]/.test(ch)) {
var p = stream.pos;
if (stream.eat("^") && stream.eat(/[A-Z]/) || !/[@$%&]/.test(stream.look(-2)) && stream.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/)) {
var c = stream.current();
if (PERL[c]) return "variable-2";
}
stream.pos = p;
}
if (/[$@%&]/.test(ch) && (stream.eatWhile(/[\w$\[\]]/) || stream.eat("{") && stream.eatWhile(/[\w$\[\]]/) && stream.eat("}"))) {
var c = stream.current();
return PERL[c] ? "variable-2" :"variable";
}
if ("#" == ch && "$" != stream.look(-2)) return stream.skipToEnd(), "comment";
if (/[:+\-\^*$&%@=<>!?|\/~\.]/.test(ch)) {
var p = stream.pos;
if (stream.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/), PERL[stream.current()]) return "operator";
stream.pos = p;
}
if ("_" == ch && 1 == stream.pos) {
if ("_END__" == stream.suffix(6)) return tokenChain(stream, state, [ "\x00" ], "comment");
if ("_DATA__" == stream.suffix(7)) return tokenChain(stream, state, [ "\x00" ], "variable-2");
if ("_C__" == stream.suffix(7)) return tokenChain(stream, state, [ "\x00" ], "string");
}
if (/\w/.test(ch)) {
var p = stream.pos;
if ("{" == stream.look(-2) && ("}" == stream.look(0) || stream.eatWhile(/\w/) && "}" == stream.look(0))) return "string";
stream.pos = p;
}
if (/[A-Z]/.test(ch)) {
var l = stream.look(-2), p = stream.pos;
if (stream.eatWhile(/[A-Z_]/), !/[\da-z]/.test(stream.look(0))) {
var c = PERL[stream.current()];
return c ? (c[1] && (c = c[0]), ":" != l ? 1 == c ? "keyword" :2 == c ? "def" :3 == c ? "atom" :4 == c ? "operator" :5 == c ? "variable-2" :"meta" :"meta") :"meta";
}
stream.pos = p;
}
if (/[a-zA-Z_]/.test(ch)) {
var l = stream.look(-2);
stream.eatWhile(/\w/);
var c = PERL[stream.current()];
return c ? (c[1] && (c = c[0]), ":" != l ? 1 == c ? "keyword" :2 == c ? "def" :3 == c ? "atom" :4 == c ? "operator" :5 == c ? "variable-2" :"meta" :"meta") :"meta";
}
return null;
}
var PERL = {
"->":4,
"++":4,
"--":4,
"**":4,
"=~":4,
"!~":4,
"*":4,
"/":4,
"%":4,
x:4,
"+":4,
"-":4,
".":4,
"<<":4,
">>":4,
"<":4,
">":4,
"<=":4,
">=":4,
lt:4,
gt:4,
le:4,
ge:4,
"==":4,
"!=":4,
"<=>":4,
eq:4,
ne:4,
cmp:4,
"~~":4,
"&":4,
"|":4,
"^":4,
"&&":4,
"||":4,
"//":4,
"..":4,
"...":4,
"?":4,
":":4,
"=":4,
"+=":4,
"-=":4,
"*=":4,
",":4,
"=>":4,
"::":4,
not:4,
and:4,
or:4,
xor:4,
BEGIN:[ 5, 1 ],
END:[ 5, 1 ],
PRINT:[ 5, 1 ],
PRINTF:[ 5, 1 ],
GETC:[ 5, 1 ],
READ:[ 5, 1 ],
READLINE:[ 5, 1 ],
DESTROY:[ 5, 1 ],
TIE:[ 5, 1 ],
TIEHANDLE:[ 5, 1 ],
UNTIE:[ 5, 1 ],
STDIN:5,
STDIN_TOP:5,
STDOUT:5,
STDOUT_TOP:5,
STDERR:5,
STDERR_TOP:5,
$ARG:5,
$_:5,
"@ARG":5,
"@_":5,
$LIST_SEPARATOR:5,
'$"':5,
$PROCESS_ID:5,
$PID:5,
$$:5,
$REAL_GROUP_ID:5,
$GID:5,
"$(":5,
$EFFECTIVE_GROUP_ID:5,
$EGID:5,
"$)":5,
$PROGRAM_NAME:5,
$0:5,
$SUBSCRIPT_SEPARATOR:5,
$SUBSEP:5,
"$;":5,
$REAL_USER_ID:5,
$UID:5,
"$<":5,
$EFFECTIVE_USER_ID:5,
$EUID:5,
"$>":5,
$a:5,
$b:5,
$COMPILING:5,
"$^C":5,
$DEBUGGING:5,
"$^D":5,
"${^ENCODING}":5,
$ENV:5,
"%ENV":5,
$SYSTEM_FD_MAX:5,
"$^F":5,
"@F":5,
"${^GLOBAL_PHASE}":5,
"$^H":5,
"%^H":5,
"@INC":5,
"%INC":5,
$INPLACE_EDIT:5,
"$^I":5,
"$^M":5,
$OSNAME:5,
"$^O":5,
"${^OPEN}":5,
$PERLDB:5,
"$^P":5,
$SIG:5,
"%SIG":5,
$BASETIME:5,
"$^T":5,
"${^TAINT}":5,
"${^UNICODE}":5,
"${^UTF8CACHE}":5,
"${^UTF8LOCALE}":5,
$PERL_VERSION:5,
"$^V":5,
"${^WIN32_SLOPPY_STAT}":5,
$EXECUTABLE_NAME:5,
"$^X":5,
$1:5,
$MATCH:5,
"$&":5,
"${^MATCH}":5,
$PREMATCH:5,
"$`":5,
"${^PREMATCH}":5,
$POSTMATCH:5,
"$'":5,
"${^POSTMATCH}":5,
$LAST_PAREN_MATCH:5,
"$+":5,
$LAST_SUBMATCH_RESULT:5,
"$^N":5,
"@LAST_MATCH_END":5,
"@+":5,
"%LAST_PAREN_MATCH":5,
"%+":5,
"@LAST_MATCH_START":5,
"@-":5,
"%LAST_MATCH_START":5,
"%-":5,
$LAST_REGEXP_CODE_RESULT:5,
"$^R":5,
"${^RE_DEBUG_FLAGS}":5,
"${^RE_TRIE_MAXBUF}":5,
$ARGV:5,
"@ARGV":5,
ARGV:5,
ARGVOUT:5,
$OUTPUT_FIELD_SEPARATOR:5,
$OFS:5,
"$,":5,
$INPUT_LINE_NUMBER:5,
$NR:5,
"$.":5,
$INPUT_RECORD_SEPARATOR:5,
$RS:5,
"$/":5,
$OUTPUT_RECORD_SEPARATOR:5,
$ORS:5,
"$\\":5,
$OUTPUT_AUTOFLUSH:5,
"$|":5,
$ACCUMULATOR:5,
"$^A":5,
$FORMAT_FORMFEED:5,
"$^L":5,
$FORMAT_PAGE_NUMBER:5,
"$%":5,
$FORMAT_LINES_LEFT:5,
"$-":5,
$FORMAT_LINE_BREAK_CHARACTERS:5,
"$:":5,
$FORMAT_LINES_PER_PAGE:5,
"$=":5,
$FORMAT_TOP_NAME:5,
"$^":5,
$FORMAT_NAME:5,
"$~":5,
"${^CHILD_ERROR_NATIVE}":5,
$EXTENDED_OS_ERROR:5,
"$^E":5,
$EXCEPTIONS_BEING_CAUGHT:5,
"$^S":5,
$WARNING:5,
"$^W":5,
"${^WARNING_BITS}":5,
$OS_ERROR:5,
$ERRNO:5,
"$!":5,
"%OS_ERROR":5,
"%ERRNO":5,
"%!":5,
$CHILD_ERROR:5,
"$?":5,
$EVAL_ERROR:5,
"$@":5,
$OFMT:5,
"$#":5,
"$*":5,
$ARRAY_BASE:5,
"$[":5,
$OLD_PERL_VERSION:5,
"$]":5,
"if":[ 1, 1 ],
elsif:[ 1, 1 ],
"else":[ 1, 1 ],
"while":[ 1, 1 ],
unless:[ 1, 1 ],
"for":[ 1, 1 ],
foreach:[ 1, 1 ],
abs:1,
accept:1,
alarm:1,
atan2:1,
bind:1,
binmode:1,
bless:1,
bootstrap:1,
"break":1,
caller:1,
chdir:1,
chmod:1,
chomp:1,
chop:1,
chown:1,
chr:1,
chroot:1,
close:1,
closedir:1,
connect:1,
"continue":[ 1, 1 ],
cos:1,
crypt:1,
dbmclose:1,
dbmopen:1,
"default":1,
defined:1,
"delete":1,
die:1,
"do":1,
dump:1,
each:1,
endgrent:1,
endhostent:1,
endnetent:1,
endprotoent:1,
endpwent:1,
endservent:1,
eof:1,
eval:1,
exec:1,
exists:1,
exit:1,
exp:1,
fcntl:1,
fileno:1,
flock:1,
fork:1,
format:1,
formline:1,
getc:1,
getgrent:1,
getgrgid:1,
getgrnam:1,
gethostbyaddr:1,
gethostbyname:1,
gethostent:1,
getlogin:1,
getnetbyaddr:1,
getnetbyname:1,
getnetent:1,
getpeername:1,
getpgrp:1,
getppid:1,
getpriority:1,
getprotobyname:1,
getprotobynumber:1,
getprotoent:1,
getpwent:1,
getpwnam:1,
getpwuid:1,
getservbyname:1,
getservbyport:1,
getservent:1,
getsockname:1,
getsockopt:1,
given:1,
glob:1,
gmtime:1,
"goto":1,
grep:1,
hex:1,
"import":1,
index:1,
"int":1,
ioctl:1,
join:1,
keys:1,
kill:1,
last:1,
lc:1,
lcfirst:1,
length:1,
link:1,
listen:1,
local:2,
localtime:1,
lock:1,
log:1,
lstat:1,
m:null,
map:1,
mkdir:1,
msgctl:1,
msgget:1,
msgrcv:1,
msgsnd:1,
my:2,
"new":1,
next:1,
no:1,
oct:1,
open:1,
opendir:1,
ord:1,
our:2,
pack:1,
"package":1,
pipe:1,
pop:1,
pos:1,
print:1,
printf:1,
prototype:1,
push:1,
q:null,
qq:null,
qr:null,
quotemeta:null,
qw:null,
qx:null,
rand:1,
read:1,
readdir:1,
readline:1,
readlink:1,
readpipe:1,
recv:1,
redo:1,
ref:1,
rename:1,
require:1,
reset:1,
"return":1,
reverse:1,
rewinddir:1,
rindex:1,
rmdir:1,
s:null,
say:1,
scalar:1,
seek:1,
seekdir:1,
select:1,
semctl:1,
semget:1,
semop:1,
send:1,
setgrent:1,
sethostent:1,
setnetent:1,
setpgrp:1,
setpriority:1,
setprotoent:1,
setpwent:1,
setservent:1,
setsockopt:1,
shift:1,
shmctl:1,
shmget:1,
shmread:1,
shmwrite:1,
shutdown:1,
sin:1,
sleep:1,
socket:1,
socketpair:1,
sort:1,
splice:1,
split:1,
sprintf:1,
sqrt:1,
srand:1,
stat:1,
state:1,
study:1,
sub:1,
substr:1,
symlink:1,
syscall:1,
sysopen:1,
sysread:1,
sysseek:1,
system:1,
syswrite:1,
tell:1,
telldir:1,
tie:1,
tied:1,
time:1,
times:1,
tr:null,
truncate:1,
uc:1,
ucfirst:1,
umask:1,
undef:1,
unlink:1,
unpack:1,
unshift:1,
untie:1,
use:1,
utime:1,
values:1,
vec:1,
wait:1,
waitpid:1,
wantarray:1,
warn:1,
when:1,
write:1,
y:null
}, RXstyle = "string-2", RXmodifiers = /[goseximacplud]/;
return {
startState:function() {
return {
tokenize:tokenPerl,
chain:null,
style:null,
tail:null
};
},
token:function(stream, state) {
return (state.tokenize || tokenPerl)(stream, state);
},
electricChars:"{}"
};
}), CodeMirror.defineMIME("text/x-perl", "perl"), CodeMirror.StringStream.prototype.look = function(c) {
return this.string.charAt(this.pos + (c || 0));
}, CodeMirror.StringStream.prototype.prefix = function(c) {
if (c) {
var x = this.pos - c;
return this.string.substr(x >= 0 ? x :0, c);
}
return this.string.substr(0, this.pos - 1);
}, CodeMirror.StringStream.prototype.suffix = function(c) {
var y = this.string.length, x = y - this.pos + 1;
return this.string.substr(this.pos, c && y > c ? c :x);
}, CodeMirror.StringStream.prototype.nsuffix = function(c) {
var p = this.pos, l = c || this.string.length - this.pos + 1;
return this.pos += l, this.string.substr(p, l);
}, CodeMirror.StringStream.prototype.eatSuffix = function(c) {
var y, x = this.pos + c;
this.pos = 0 >= x ? 0 :x >= (y = this.string.length - 1) ? y :x;
}, function() {
function keywords(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function heredoc(delim) {
return function(stream, state) {
return stream.match(delim) ? state.tokenize = null :stream.skipToEnd(), "string";
};
}
var phpConfig = {
name:"clike",
keywords:keywords("abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent"),
blockKeywords:keywords("catch do else elseif for foreach if switch try while"),
atoms:keywords("true false null TRUE FALSE NULL __CLASS__ __DIR__ __FILE__ __LINE__ __METHOD__ __FUNCTION__ __NAMESPACE__"),
builtin:keywords("func_num_args func_get_arg func_get_args strlen strcmp strncmp strcasecmp strncasecmp each error_reporting define defined trigger_error user_error set_error_handler restore_error_handler get_declared_classes get_loaded_extensions extension_loaded get_extension_funcs debug_backtrace constant bin2hex sleep usleep time mktime gmmktime strftime gmstrftime strtotime date gmdate getdate localtime checkdate flush wordwrap htmlspecialchars htmlentities html_entity_decode md5 md5_file crc32 getimagesize image_type_to_mime_type phpinfo phpversion phpcredits strnatcmp strnatcasecmp substr_count strspn strcspn strtok strtoupper strtolower strpos strrpos strrev hebrev hebrevc nl2br basename dirname pathinfo stripslashes stripcslashes strstr stristr strrchr str_shuffle str_word_count strcoll substr substr_replace quotemeta ucfirst ucwords strtr addslashes addcslashes rtrim str_replace str_repeat count_chars chunk_split trim ltrim strip_tags similar_text explode implode setlocale localeconv parse_str str_pad chop strchr sprintf printf vprintf vsprintf sscanf fscanf parse_url urlencode urldecode rawurlencode rawurldecode readlink linkinfo link unlink exec system escapeshellcmd escapeshellarg passthru shell_exec proc_open proc_close rand srand getrandmax mt_rand mt_srand mt_getrandmax base64_decode base64_encode abs ceil floor round is_finite is_nan is_infinite bindec hexdec octdec decbin decoct dechex base_convert number_format fmod ip2long long2ip getenv putenv getopt microtime gettimeofday getrusage uniqid quoted_printable_decode set_time_limit get_cfg_var magic_quotes_runtime set_magic_quotes_runtime get_magic_quotes_gpc get_magic_quotes_runtime import_request_variables error_log serialize unserialize memory_get_usage var_dump var_export debug_zval_dump print_r highlight_file show_source highlight_string ini_get ini_get_all ini_set ini_alter ini_restore get_include_path set_include_path restore_include_path setcookie header headers_sent connection_aborted connection_status ignore_user_abort parse_ini_file is_uploaded_file move_uploaded_file intval floatval doubleval strval gettype settype is_null is_resource is_bool is_long is_float is_int is_integer is_double is_real is_numeric is_string is_array is_object is_scalar ereg ereg_replace eregi eregi_replace split spliti join sql_regcase dl pclose popen readfile rewind rmdir umask fclose feof fgetc fgets fgetss fread fopen fpassthru ftruncate fstat fseek ftell fflush fwrite fputs mkdir rename copy tempnam tmpfile file file_get_contents stream_select stream_context_create stream_context_set_params stream_context_set_option stream_context_get_options stream_filter_prepend stream_filter_append fgetcsv flock get_meta_tags stream_set_write_buffer set_file_buffer set_socket_blocking stream_set_blocking socket_set_blocking stream_get_meta_data stream_register_wrapper stream_wrapper_register stream_set_timeout socket_set_timeout socket_get_status realpath fnmatch fsockopen pfsockopen pack unpack get_browser crypt opendir closedir chdir getcwd rewinddir readdir dir glob fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype file_exists is_writable is_writeable is_readable is_executable is_file is_dir is_link stat lstat chown touch clearstatcache mail ob_start ob_flush ob_clean ob_end_flush ob_end_clean ob_get_flush ob_get_clean ob_get_length ob_get_level ob_get_status ob_get_contents ob_implicit_flush ob_list_handlers ksort krsort natsort natcasesort asort arsort sort rsort usort uasort uksort shuffle array_walk count end prev next reset current key min max in_array array_search extract compact array_fill range array_multisort array_push array_pop array_shift array_unshift array_splice array_slice array_merge array_merge_recursive array_keys array_values array_count_values array_reverse array_reduce array_pad array_flip array_change_key_case array_rand array_unique array_intersect array_intersect_assoc array_diff array_diff_assoc array_sum array_filter array_map array_chunk array_key_exists pos sizeof key_exists assert assert_options version_compare ftok str_rot13 aggregate session_name session_module_name session_save_path session_id session_regenerate_id session_decode session_register session_unregister session_is_registered session_encode session_start session_destroy session_unset session_set_save_handler session_cache_limiter session_cache_expire session_set_cookie_params session_get_cookie_params session_write_close preg_match preg_match_all preg_replace preg_replace_callback preg_split preg_quote preg_grep overload ctype_alnum ctype_alpha ctype_cntrl ctype_digit ctype_lower ctype_graph ctype_print ctype_punct ctype_space ctype_upper ctype_xdigit virtual apache_request_headers apache_note apache_lookup_uri apache_child_terminate apache_setenv apache_response_headers apache_get_version getallheaders mysql_connect mysql_pconnect mysql_close mysql_select_db mysql_create_db mysql_drop_db mysql_query mysql_unbuffered_query mysql_db_query mysql_list_dbs mysql_list_tables mysql_list_fields mysql_list_processes mysql_error mysql_errno mysql_affected_rows mysql_insert_id mysql_result mysql_num_rows mysql_num_fields mysql_fetch_row mysql_fetch_array mysql_fetch_assoc mysql_fetch_object mysql_data_seek mysql_fetch_lengths mysql_fetch_field mysql_field_seek mysql_free_result mysql_field_name mysql_field_table mysql_field_len mysql_field_type mysql_field_flags mysql_escape_string mysql_real_escape_string mysql_stat mysql_thread_id mysql_client_encoding mysql_get_client_info mysql_get_host_info mysql_get_proto_info mysql_get_server_info mysql_info mysql mysql_fieldname mysql_fieldtable mysql_fieldlen mysql_fieldtype mysql_fieldflags mysql_selectdb mysql_createdb mysql_dropdb mysql_freeresult mysql_numfields mysql_numrows mysql_listdbs mysql_listtables mysql_listfields mysql_db_name mysql_dbname mysql_tablename mysql_table_name pg_connect pg_pconnect pg_close pg_connection_status pg_connection_busy pg_connection_reset pg_host pg_dbname pg_port pg_tty pg_options pg_ping pg_query pg_send_query pg_cancel_query pg_fetch_result pg_fetch_row pg_fetch_assoc pg_fetch_array pg_fetch_object pg_fetch_all pg_affected_rows pg_get_result pg_result_seek pg_result_status pg_free_result pg_last_oid pg_num_rows pg_num_fields pg_field_name pg_field_num pg_field_size pg_field_type pg_field_prtlen pg_field_is_null pg_get_notify pg_get_pid pg_result_error pg_last_error pg_last_notice pg_put_line pg_end_copy pg_copy_to pg_copy_from pg_trace pg_untrace pg_lo_create pg_lo_unlink pg_lo_open pg_lo_close pg_lo_read pg_lo_write pg_lo_read_all pg_lo_import pg_lo_export pg_lo_seek pg_lo_tell pg_escape_string pg_escape_bytea pg_unescape_bytea pg_client_encoding pg_set_client_encoding pg_meta_data pg_convert pg_insert pg_update pg_delete pg_select pg_exec pg_getlastoid pg_cmdtuples pg_errormessage pg_numrows pg_numfields pg_fieldname pg_fieldsize pg_fieldtype pg_fieldnum pg_fieldprtlen pg_fieldisnull pg_freeresult pg_result pg_loreadall pg_locreate pg_lounlink pg_loopen pg_loclose pg_loread pg_lowrite pg_loimport pg_loexport echo print global static exit array empty eval isset unset die include require include_once require_once"),
multiLineStrings:!0,
hooks:{
$:function(stream) {
return stream.eatWhile(/[\w\$_]/), "variable-2";
},
"<":function(stream, state) {
return stream.match(/<</) ? (stream.eatWhile(/[\w\.]/), state.tokenize = heredoc(stream.current().slice(3)), 
state.tokenize(stream, state)) :!1;
},
"#":function(stream) {
for (;!stream.eol() && !stream.match("?>", !1); ) stream.next();
return "comment";
},
"/":function(stream) {
if (stream.eat("/")) {
for (;!stream.eol() && !stream.match("?>", !1); ) stream.next();
return "comment";
}
return !1;
}
}
};
CodeMirror.defineMode("php", function(config, parserConfig) {
function dispatch(stream, state) {
var isPHP = state.curMode == phpMode;
if (stream.sol() && '"' != state.pending && (state.pending = null), isPHP) return isPHP && null == state.php.tokenize && stream.match("?>") ? (state.curMode = htmlMode, 
state.curState = state.html, "meta") :phpMode.token(stream, state.curState);
if (stream.match(/^<\?\w*/)) return state.curMode = phpMode, state.curState = state.php, 
"meta";
if ('"' == state.pending) {
for (;!stream.eol() && '"' != stream.next(); ) ;
var style = "string";
} else if (state.pending && stream.pos < state.pending.end) {
stream.pos = state.pending.end;
var style = state.pending.style;
} else var style = htmlMode.token(stream, state.curState);
state.pending = null;
var cur = stream.current(), openPHP = cur.search(/<\?/);
return -1 != openPHP && (state.pending = "string" == style && /\"$/.test(cur) && !/\?>/.test(cur) ? '"' :{
end:stream.pos,
style:style
}, stream.backUp(cur.length - openPHP)), style;
}
var htmlMode = CodeMirror.getMode(config, "text/html"), phpMode = CodeMirror.getMode(config, phpConfig);
return {
startState:function() {
var html = CodeMirror.startState(htmlMode), php = CodeMirror.startState(phpMode);
return {
html:html,
php:php,
curMode:parserConfig.startOpen ? phpMode :htmlMode,
curState:parserConfig.startOpen ? php :html,
pending:null
};
},
copyState:function(state) {
var cur, html = state.html, htmlNew = CodeMirror.copyState(htmlMode, html), php = state.php, phpNew = CodeMirror.copyState(phpMode, php);
return cur = state.curMode == htmlMode ? htmlNew :phpNew, {
html:htmlNew,
php:phpNew,
curMode:state.curMode,
curState:cur,
pending:state.pending
};
},
token:dispatch,
indent:function(state, textAfter) {
return state.curMode != phpMode && /^\s*<\//.test(textAfter) || state.curMode == phpMode && /^\?>/.test(textAfter) ? htmlMode.indent(state.html, textAfter) :state.curMode.indent(state.curState, textAfter);
},
electricChars:"/{}:",
blockCommentStart:"/*",
blockCommentEnd:"*/",
lineComment:"//",
innerMode:function(state) {
return {
state:state.curState,
mode:state.curMode
};
}
};
}, "htmlmixed", "clike"), CodeMirror.defineMIME("application/x-httpd-php", "php"), 
CodeMirror.defineMIME("application/x-httpd-php-open", {
name:"php",
startOpen:!0
}), CodeMirror.defineMIME("text/x-php", phpConfig);
}(), CodeMirror.defineMode("ruby", function(config) {
function wordObj(words) {
for (var o = {}, i = 0, e = words.length; e > i; ++i) o[words[i]] = !0;
return o;
}
function chain(newtok, stream, state) {
return state.tokenize.push(newtok), newtok(stream, state);
}
function tokenBase(stream, state) {
if (curPunc = null, stream.sol() && stream.match("=begin") && stream.eol()) return state.tokenize.push(readBlockComment), 
"comment";
if (stream.eatSpace()) return null;
var m, ch = stream.next();
if ("`" == ch || "'" == ch || '"' == ch || "/" == ch && !stream.eol() && " " != stream.peek()) return chain(readQuoted(ch, "string", '"' == ch || "`" == ch), stream, state);
if ("%" == ch) {
var style, embed = !1;
stream.eat("s") ? style = "atom" :stream.eat(/[WQ]/) ? (style = "string", embed = !0) :stream.eat(/[wxqr]/) && (style = "string");
var delim = stream.eat(/[^\w\s]/);
return delim ? (matching.propertyIsEnumerable(delim) && (delim = matching[delim]), 
chain(readQuoted(delim, style, embed, !0), stream, state)) :"operator";
}
if ("#" == ch) return stream.skipToEnd(), "comment";
if ("<" == ch && (m = stream.match(/^<-?[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/))) return chain(readHereDoc(m[1]), stream, state);
if ("0" == ch) return stream.eat("x") ? stream.eatWhile(/[\da-fA-F]/) :stream.eat("b") ? stream.eatWhile(/[01]/) :stream.eatWhile(/[0-7]/), 
"number";
if (/\d/.test(ch)) return stream.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/), 
"number";
if ("?" == ch) {
for (;stream.match(/^\\[CM]-/); ) ;
return stream.eat("\\") ? stream.eatWhile(/\w/) :stream.next(), "string";
}
return ":" == ch ? stream.eat("'") ? chain(readQuoted("'", "atom", !1), stream, state) :stream.eat('"') ? chain(readQuoted('"', "atom", !0), stream, state) :(stream.eatWhile(/[\w\?]/), 
"atom") :"@" == ch ? (stream.eat("@"), stream.eatWhile(/[\w\?]/), "variable-2") :"$" == ch ? (stream.next(), 
stream.eatWhile(/[\w\?]/), "variable-3") :/\w/.test(ch) ? (stream.eatWhile(/[\w\?]/), 
stream.eat(":") ? "atom" :"ident") :"|" != ch || !state.varList && "{" != state.lastTok && "do" != state.lastTok ? /[\(\)\[\]{}\\;]/.test(ch) ? (curPunc = ch, 
null) :"-" == ch && stream.eat(">") ? "arrow" :/[=+\-\/*:\.^%<>~|]/.test(ch) ? (stream.eatWhile(/[=+\-\/*:\.^%<>~|]/), 
"operator") :null :(curPunc = "|", null);
}
function tokenBaseUntilBrace() {
var depth = 1;
return function(stream, state) {
if ("}" == stream.peek()) {
if (depth--, 0 == depth) return state.tokenize.pop(), state.tokenize[state.tokenize.length - 1](stream, state);
} else "{" == stream.peek() && depth++;
return tokenBase(stream, state);
};
}
function readQuoted(quote, style, embed, unescaped) {
return function(stream, state) {
for (var ch, escaped = !1; null != (ch = stream.next()); ) {
if (ch == quote && (unescaped || !escaped)) {
state.tokenize.pop();
break;
}
if (embed && "#" == ch && !escaped && stream.eat("{")) {
state.tokenize.push(tokenBaseUntilBrace(arguments.callee));
break;
}
escaped = !escaped && "\\" == ch;
}
return style;
};
}
function readHereDoc(phrase) {
return function(stream, state) {
return stream.match(phrase) ? state.tokenize.pop() :stream.skipToEnd(), "string";
};
}
function readBlockComment(stream, state) {
return stream.sol() && stream.match("=end") && stream.eol() && state.tokenize.pop(), 
stream.skipToEnd(), "comment";
}
var curPunc, keywords = wordObj([ "alias", "and", "BEGIN", "begin", "break", "case", "class", "def", "defined?", "do", "else", "elsif", "END", "end", "ensure", "false", "for", "if", "in", "module", "next", "not", "or", "redo", "rescue", "retry", "return", "self", "super", "then", "true", "undef", "unless", "until", "when", "while", "yield", "nil", "raise", "throw", "catch", "fail", "loop", "callcc", "caller", "lambda", "proc", "public", "protected", "private", "require", "load", "require_relative", "extend", "autoload" ]), indentWords = wordObj([ "def", "class", "case", "for", "while", "do", "module", "then", "catch", "loop", "proc", "begin" ]), dedentWords = wordObj([ "end", "until" ]), matching = {
"[":"]",
"{":"}",
"(":")"
};
return {
startState:function() {
return {
tokenize:[ tokenBase ],
indented:0,
context:{
type:"top",
indented:-config.indentUnit
},
continuedLine:!1,
lastTok:null,
varList:!1
};
},
token:function(stream, state) {
stream.sol() && (state.indented = stream.indentation());
var kwtype, style = state.tokenize[state.tokenize.length - 1](stream, state);
if ("ident" == style) {
var word = stream.current();
style = keywords.propertyIsEnumerable(stream.current()) ? "keyword" :/^[A-Z]/.test(word) ? "tag" :"def" == state.lastTok || "class" == state.lastTok || state.varList ? "def" :"variable", 
indentWords.propertyIsEnumerable(word) ? kwtype = "indent" :dedentWords.propertyIsEnumerable(word) ? kwtype = "dedent" :"if" != word && "unless" != word || stream.column() != stream.indentation() || (kwtype = "indent");
}
return (curPunc || style && "comment" != style) && (state.lastTok = word || curPunc || style), 
"|" == curPunc && (state.varList = !state.varList), "indent" == kwtype || /[\(\[\{]/.test(curPunc) ? state.context = {
prev:state.context,
type:curPunc || style,
indented:state.indented
} :("dedent" == kwtype || /[\)\]\}]/.test(curPunc)) && state.context.prev && (state.context = state.context.prev), 
stream.eol() && (state.continuedLine = "\\" == curPunc || "operator" == style), 
style;
},
indent:function(state, textAfter) {
if (state.tokenize[state.tokenize.length - 1] != tokenBase) return 0;
var firstChar = textAfter && textAfter.charAt(0), ct = state.context, closing = ct.type == matching[firstChar] || "keyword" == ct.type && /^(?:end|until|else|elsif|when|rescue)\b/.test(textAfter);
return ct.indented + (closing ? 0 :config.indentUnit) + (state.continuedLine ? config.indentUnit :0);
},
electricChars:"}de",
lineComment:"#"
};
}), CodeMirror.defineMIME("text/x-ruby", "ruby"), CodeMirror.defineMode("haskell", function(_config, modeConfig) {
function switchState(source, setState, f) {
return setState(f), f(source, setState);
}
function normal(source, setState) {
if (source.eatWhile(whiteCharRE)) return null;
var ch = source.next();
if (specialRE.test(ch)) {
if ("{" == ch && source.eat("-")) {
var t = "comment";
return source.eat("#") && (t = "meta"), switchState(source, setState, ncomment(t, 1));
}
return null;
}
if ("'" == ch) return source.eat("\\") ? source.next() :source.next(), source.eat("'") ? "string" :"error";
if ('"' == ch) return switchState(source, setState, stringLiteral);
if (largeRE.test(ch)) return source.eatWhile(idRE), source.eat(".") ? "qualifier" :"variable-2";
if (smallRE.test(ch)) return source.eatWhile(idRE), "variable";
if (digitRE.test(ch)) {
if ("0" == ch) {
if (source.eat(/[xX]/)) return source.eatWhile(hexitRE), "integer";
if (source.eat(/[oO]/)) return source.eatWhile(octitRE), "number";
}
source.eatWhile(digitRE);
var t = "number";
return source.match(/^\.\d+/) && (t = "number"), source.eat(/[eE]/) && (t = "number", 
source.eat(/[-+]/), source.eatWhile(digitRE)), t;
}
if ("." == ch && source.eat(".")) return "keyword";
if (symbolRE.test(ch)) {
if ("-" == ch && source.eat(/-/) && (source.eatWhile(/-/), !source.eat(symbolRE))) return source.skipToEnd(), 
"comment";
var t = "variable";
return ":" == ch && (t = "variable-2"), source.eatWhile(symbolRE), t;
}
return "error";
}
function ncomment(type, nest) {
return 0 == nest ? normal :function(source, setState) {
for (var currNest = nest; !source.eol(); ) {
var ch = source.next();
if ("{" == ch && source.eat("-")) ++currNest; else if ("-" == ch && source.eat("}") && (--currNest, 
0 == currNest)) return setState(normal), type;
}
return setState(ncomment(type, currNest)), type;
};
}
function stringLiteral(source, setState) {
for (;!source.eol(); ) {
var ch = source.next();
if ('"' == ch) return setState(normal), "string";
if ("\\" == ch) {
if (source.eol() || source.eat(whiteCharRE)) return setState(stringGap), "string";
source.eat("&") || source.next();
}
}
return setState(normal), "error";
}
function stringGap(source, setState) {
return source.eat("\\") ? switchState(source, setState, stringLiteral) :(source.next(), 
setState(normal), "error");
}
var smallRE = /[a-z_]/, largeRE = /[A-Z]/, digitRE = /\d/, hexitRE = /[0-9A-Fa-f]/, octitRE = /[0-7]/, idRE = /[a-z_A-Z0-9']/, symbolRE = /[-!#$%&*+.\/<=>?@\\^|~:]/, specialRE = /[(),;[\]`{}]/, whiteCharRE = /[ \t\v\f]/, wellKnownWords = function() {
function setType(t) {
return function() {
for (var i = 0; i < arguments.length; i++) wkw[arguments[i]] = t;
};
}
var wkw = {};
setType("keyword")("case", "class", "data", "default", "deriving", "do", "else", "foreign", "if", "import", "in", "infix", "infixl", "infixr", "instance", "let", "module", "newtype", "of", "then", "type", "where", "_"), 
setType("keyword")("..", ":", "::", "=", "\\", '"', "<-", "->", "@", "~", "=>"), 
setType("builtin")("!!", "$!", "$", "&&", "+", "++", "-", ".", "/", "/=", "<", "<=", "=<<", "==", ">", ">=", ">>", ">>=", "^", "^^", "||", "*", "**"), 
setType("builtin")("Bool", "Bounded", "Char", "Double", "EQ", "Either", "Enum", "Eq", "False", "FilePath", "Float", "Floating", "Fractional", "Functor", "GT", "IO", "IOError", "Int", "Integer", "Integral", "Just", "LT", "Left", "Maybe", "Monad", "Nothing", "Num", "Ord", "Ordering", "Rational", "Read", "ReadS", "Real", "RealFloat", "RealFrac", "Right", "Show", "ShowS", "String", "True"), 
setType("builtin")("abs", "acos", "acosh", "all", "and", "any", "appendFile", "asTypeOf", "asin", "asinh", "atan", "atan2", "atanh", "break", "catch", "ceiling", "compare", "concat", "concatMap", "const", "cos", "cosh", "curry", "cycle", "decodeFloat", "div", "divMod", "drop", "dropWhile", "either", "elem", "encodeFloat", "enumFrom", "enumFromThen", "enumFromThenTo", "enumFromTo", "error", "even", "exp", "exponent", "fail", "filter", "flip", "floatDigits", "floatRadix", "floatRange", "floor", "fmap", "foldl", "foldl1", "foldr", "foldr1", "fromEnum", "fromInteger", "fromIntegral", "fromRational", "fst", "gcd", "getChar", "getContents", "getLine", "head", "id", "init", "interact", "ioError", "isDenormalized", "isIEEE", "isInfinite", "isNaN", "isNegativeZero", "iterate", "last", "lcm", "length", "lex", "lines", "log", "logBase", "lookup", "map", "mapM", "mapM_", "max", "maxBound", "maximum", "maybe", "min", "minBound", "minimum", "mod", "negate", "not", "notElem", "null", "odd", "or", "otherwise", "pi", "pred", "print", "product", "properFraction", "putChar", "putStr", "putStrLn", "quot", "quotRem", "read", "readFile", "readIO", "readList", "readLn", "readParen", "reads", "readsPrec", "realToFrac", "recip", "rem", "repeat", "replicate", "return", "reverse", "round", "scaleFloat", "scanl", "scanl1", "scanr", "scanr1", "seq", "sequence", "sequence_", "show", "showChar", "showList", "showParen", "showString", "shows", "showsPrec", "significand", "signum", "sin", "sinh", "snd", "span", "splitAt", "sqrt", "subtract", "succ", "sum", "tail", "take", "takeWhile", "tan", "tanh", "toEnum", "toInteger", "toRational", "truncate", "uncurry", "undefined", "unlines", "until", "unwords", "unzip", "unzip3", "userError", "words", "writeFile", "zip", "zip3", "zipWith", "zipWith3");
var override = modeConfig.overrideKeywords;
if (override) for (var word in override) override.hasOwnProperty(word) && (wkw[word] = override[word]);
return wkw;
}();
return {
startState:function() {
return {
f:normal
};
},
copyState:function(s) {
return {
f:s.f
};
},
token:function(stream, state) {
var t = state.f(stream, function(s) {
state.f = s;
}), w = stream.current();
return wellKnownWords.hasOwnProperty(w) ? wellKnownWords[w] :t;
},
blockCommentStart:"{-",
blockCommentEnd:"-}",
lineComment:"--"
};
}), CodeMirror.defineMIME("text/x-haskell", "haskell"), CodeMirror.defineMode("plsql", function(config, parserConfig) {
function chain(stream, state, f) {
return state.tokenize = f, f(stream, state);
}
function ret(tp, style) {
return type = tp, style;
}
function tokenBase(stream, state) {
var ch = stream.next();
return '"' == ch || "'" == ch ? chain(stream, state, tokenString(ch)) :/[\[\]{}\(\),;\.]/.test(ch) ? ret(ch) :/\d/.test(ch) ? (stream.eatWhile(/[\w\.]/), 
ret("number", "number")) :"/" == ch ? stream.eat("*") ? chain(stream, state, tokenComment) :(stream.eatWhile(isOperatorChar), 
ret("operator", "operator")) :"-" == ch ? stream.eat("-") ? (stream.skipToEnd(), 
ret("comment", "comment")) :(stream.eatWhile(isOperatorChar), ret("operator", "operator")) :"@" == ch || "$" == ch ? (stream.eatWhile(/[\w\d\$_]/), 
ret("word", "variable")) :isOperatorChar.test(ch) ? (stream.eatWhile(isOperatorChar), 
ret("operator", "operator")) :(stream.eatWhile(/[\w\$_]/), keywords && keywords.propertyIsEnumerable(stream.current().toLowerCase()) ? ret("keyword", "keyword") :functions && functions.propertyIsEnumerable(stream.current().toLowerCase()) ? ret("keyword", "builtin") :types && types.propertyIsEnumerable(stream.current().toLowerCase()) ? ret("keyword", "variable-2") :sqlplus && sqlplus.propertyIsEnumerable(stream.current().toLowerCase()) ? ret("keyword", "variable-3") :ret("word", "plsql-word"));
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return (end || !escaped && !multiLineStrings) && (state.tokenize = tokenBase), ret("string", "plsql-string");
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = tokenBase;
break;
}
maybeEnd = "*" == ch;
}
return ret("comment", "plsql-comment");
}
var type, keywords = (config.indentUnit, parserConfig.keywords), functions = parserConfig.functions, types = parserConfig.types, sqlplus = parserConfig.sqlplus, multiLineStrings = parserConfig.multiLineStrings, isOperatorChar = /[+\-*&%=<>!?:\/|]/;
return {
startState:function() {
return {
tokenize:tokenBase,
startOfLine:!0
};
},
token:function(stream, state) {
if (stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
return style;
}
};
}), function() {
function keywords(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
var cKeywords = "abort accept access add all alter and any array arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body boolean by case cast char char_base check close cluster clusters colauth column comment commit compress connect connected constant constraint crash create current currval cursor data_base database date dba deallocate debugoff debugon decimal declare default definition delay delete desc digits dispose distinct do drop else elsif enable end entry escape exception exception_init exchange exclusive exists exit external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging long loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base object of off offline on online only open option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw read rebuild record ref references refresh release rename replace resource restrict return returning reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate session set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work", cFunctions = "abs acos add_months ascii asin atan atan2 average bfilename ceil chartorowid chr concat convert cos cosh count decode deref dual dump dup_val_on_index empty error exp false floor found glb greatest hextoraw initcap instr instrb isopen last_day least lenght lenghtb ln lower lpad ltrim lub make_ref max min mod months_between new_time next_day nextval nls_charset_decl_len nls_charset_id nls_charset_name nls_initcap nls_lower nls_sort nls_upper nlssort no_data_found notfound null nvl others power rawtohex reftohex round rowcount rowidtochar rpad rtrim sign sin sinh soundex sqlcode sqlerrm sqrt stddev substr substrb sum sysdate tan tanh to_char to_date to_label to_multi_byte to_number to_single_byte translate true trunc uid upper user userenv variance vsize", cTypes = "bfile blob character clob dec float int integer mlslabel natural naturaln nchar nclob number numeric nvarchar2 real rowtype signtype smallint string varchar varchar2", cSqlplus = "appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define describe echo editfile embedded escape exec execute feedback flagger flush heading headsep instance linesize lno loboffset logsource long longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar release repfooter repheader serveroutput shiftinout show showmode size spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout time timing trimout trimspool ttitle underline verify version wrap";
CodeMirror.defineMIME("text/x-plsql", {
name:"plsql",
keywords:keywords(cKeywords),
functions:keywords(cFunctions),
types:keywords(cTypes),
sqlplus:keywords(cSqlplus)
});
}(), CodeMirror.defineMode("scheme", function() {
function makeKeywords(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function stateStack(indent, type, prev) {
this.indent = indent, this.type = type, this.prev = prev;
}
function pushStack(state, indent, type) {
state.indentStack = new stateStack(indent, type, state.indentStack);
}
function popStack(state) {
state.indentStack = state.indentStack.prev;
}
function isBinaryNumber(stream) {
return stream.match(binaryMatcher);
}
function isOctalNumber(stream) {
return stream.match(octalMatcher);
}
function isDecimalNumber(stream, backup) {
return backup === !0 && stream.backUp(1), stream.match(decimalMatcher);
}
function isHexNumber(stream) {
return stream.match(hexMatcher);
}
var BUILTIN = "builtin", COMMENT = "comment", STRING = "string", ATOM = "atom", NUMBER = "number", BRACKET = "bracket", INDENT_WORD_SKIP = 2, keywords = makeKeywords("λ case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt #f floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? #t tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"), indentKeys = makeKeywords("define let letrec let* lambda"), binaryMatcher = new RegExp(/^(?:[-+]i|[-+][01]+#*(?:\/[01]+#*)?i|[-+]?[01]+#*(?:\/[01]+#*)?@[-+]?[01]+#*(?:\/[01]+#*)?|[-+]?[01]+#*(?:\/[01]+#*)?[-+](?:[01]+#*(?:\/[01]+#*)?)?i|[-+]?[01]+#*(?:\/[01]+#*)?)(?=[()\s;"]|$)/i), octalMatcher = new RegExp(/^(?:[-+]i|[-+][0-7]+#*(?:\/[0-7]+#*)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?@[-+]?[0-7]+#*(?:\/[0-7]+#*)?|[-+]?[0-7]+#*(?:\/[0-7]+#*)?[-+](?:[0-7]+#*(?:\/[0-7]+#*)?)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?)(?=[()\s;"]|$)/i), hexMatcher = new RegExp(/^(?:[-+]i|[-+][\da-f]+#*(?:\/[\da-f]+#*)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?@[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?[-+](?:[\da-f]+#*(?:\/[\da-f]+#*)?)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?)(?=[()\s;"]|$)/i), decimalMatcher = new RegExp(/^(?:[-+]i|[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)i|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)@[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)?i|(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*))(?=[()\s;"]|$)/i);
return {
startState:function() {
return {
indentStack:null,
indentation:0,
mode:!1,
sExprComment:!1
};
},
token:function(stream, state) {
if (null == state.indentStack && stream.sol() && (state.indentation = stream.indentation()), 
stream.eatSpace()) return null;
var returnType = null;
switch (state.mode) {
case "string":
for (var next, escaped = !1; null != (next = stream.next()); ) {
if ('"' == next && !escaped) {
state.mode = !1;
break;
}
escaped = !escaped && "\\" == next;
}
returnType = STRING;
break;

case "comment":
for (var next, maybeEnd = !1; null != (next = stream.next()); ) {
if ("#" == next && maybeEnd) {
state.mode = !1;
break;
}
maybeEnd = "|" == next;
}
returnType = COMMENT;
break;

case "s-expr-comment":
if (state.mode = !1, "(" != stream.peek() && "[" != stream.peek()) {
stream.eatWhile(/[^/s]/), returnType = COMMENT;
break;
}
state.sExprComment = 0;

default:
var ch = stream.next();
if ('"' == ch) state.mode = "string", returnType = STRING; else if ("'" == ch) returnType = ATOM; else if ("#" == ch) if (stream.eat("|")) state.mode = "comment", 
returnType = COMMENT; else if (stream.eat(/[tf]/i)) returnType = ATOM; else if (stream.eat(";")) state.mode = "s-expr-comment", 
returnType = COMMENT; else {
var numTest = null, hasExactness = !1, hasRadix = !0;
stream.eat(/[ei]/i) ? hasExactness = !0 :stream.backUp(1), stream.match(/^#b/i) ? numTest = isBinaryNumber :stream.match(/^#o/i) ? numTest = isOctalNumber :stream.match(/^#x/i) ? numTest = isHexNumber :stream.match(/^#d/i) ? numTest = isDecimalNumber :stream.match(/^[-+0-9.]/, !1) ? (hasRadix = !1, 
numTest = isDecimalNumber) :hasExactness || stream.eat("#"), null != numTest && (hasRadix && !hasExactness && stream.match(/^#[ei]/i), 
numTest(stream) && (returnType = NUMBER));
} else if (/^[-+0-9.]/.test(ch) && isDecimalNumber(stream, !0)) returnType = NUMBER; else if (";" == ch) stream.skipToEnd(), 
returnType = COMMENT; else if ("(" == ch || "[" == ch) {
for (var letter, keyWord = "", indentTemp = stream.column(); null != (letter = stream.eat(/[^\s\(\[\;\)\]]/)); ) keyWord += letter;
keyWord.length > 0 && indentKeys.propertyIsEnumerable(keyWord) ? pushStack(state, indentTemp + INDENT_WORD_SKIP, ch) :(stream.eatSpace(), 
stream.eol() || ";" == stream.peek() ? pushStack(state, indentTemp + 1, ch) :pushStack(state, indentTemp + stream.current().length, ch)), 
stream.backUp(stream.current().length - 1), "number" == typeof state.sExprComment && state.sExprComment++, 
returnType = BRACKET;
} else ")" == ch || "]" == ch ? (returnType = BRACKET, null != state.indentStack && state.indentStack.type == (")" == ch ? "(" :"[") && (popStack(state), 
"number" == typeof state.sExprComment && 0 == --state.sExprComment && (returnType = COMMENT, 
state.sExprComment = !1))) :(stream.eatWhile(/[\w\$_\-!$%&*+\.\/:<=>?@\^~]/), returnType = keywords && keywords.propertyIsEnumerable(stream.current()) ? BUILTIN :"variable");
}
return "number" == typeof state.sExprComment ? COMMENT :returnType;
},
indent:function(state) {
return null == state.indentStack ? state.indentation :state.indentStack.indent;
},
lineComment:";;"
};
}), CodeMirror.defineMIME("text/x-scheme", "scheme"), CodeMirror.defineMode("lua", function(config, parserConfig) {
function prefixRE(words) {
return new RegExp("^(?:" + words.join("|") + ")", "i");
}
function wordRE(words) {
return new RegExp("^(?:" + words.join("|") + ")$", "i");
}
function readBracket(stream) {
for (var level = 0; stream.eat("="); ) ++level;
return stream.eat("["), level;
}
function normal(stream, state) {
var ch = stream.next();
return "-" == ch && stream.eat("-") ? stream.eat("[") && stream.eat("[") ? (state.cur = bracketed(readBracket(stream), "comment"))(stream, state) :(stream.skipToEnd(), 
"comment") :'"' == ch || "'" == ch ? (state.cur = string(ch))(stream, state) :"[" == ch && /[\[=]/.test(stream.peek()) ? (state.cur = bracketed(readBracket(stream), "string"))(stream, state) :/\d/.test(ch) ? (stream.eatWhile(/[\w.%]/), 
"number") :/[\w_]/.test(ch) ? (stream.eatWhile(/[\w\\\-_.]/), "variable") :null;
}
function bracketed(level, style) {
return function(stream, state) {
for (var ch, curlev = null; null != (ch = stream.next()); ) if (null == curlev) "]" == ch && (curlev = 0); else if ("=" == ch) ++curlev; else {
if ("]" == ch && curlev == level) {
state.cur = normal;
break;
}
curlev = null;
}
return style;
};
}
function string(quote) {
return function(stream, state) {
for (var ch, escaped = !1; null != (ch = stream.next()) && (ch != quote || escaped); ) escaped = !escaped && "\\" == ch;
return escaped || (state.cur = normal), "string";
};
}
var indentUnit = config.indentUnit, specials = wordRE(parserConfig.specials || []), builtins = wordRE([ "_G", "_VERSION", "assert", "collectgarbage", "dofile", "error", "getfenv", "getmetatable", "ipairs", "load", "loadfile", "loadstring", "module", "next", "pairs", "pcall", "print", "rawequal", "rawget", "rawset", "require", "select", "setfenv", "setmetatable", "tonumber", "tostring", "type", "unpack", "xpcall", "coroutine.create", "coroutine.resume", "coroutine.running", "coroutine.status", "coroutine.wrap", "coroutine.yield", "debug.debug", "debug.getfenv", "debug.gethook", "debug.getinfo", "debug.getlocal", "debug.getmetatable", "debug.getregistry", "debug.getupvalue", "debug.setfenv", "debug.sethook", "debug.setlocal", "debug.setmetatable", "debug.setupvalue", "debug.traceback", "close", "flush", "lines", "read", "seek", "setvbuf", "write", "io.close", "io.flush", "io.input", "io.lines", "io.open", "io.output", "io.popen", "io.read", "io.stderr", "io.stdin", "io.stdout", "io.tmpfile", "io.type", "io.write", "math.abs", "math.acos", "math.asin", "math.atan", "math.atan2", "math.ceil", "math.cos", "math.cosh", "math.deg", "math.exp", "math.floor", "math.fmod", "math.frexp", "math.huge", "math.ldexp", "math.log", "math.log10", "math.max", "math.min", "math.modf", "math.pi", "math.pow", "math.rad", "math.random", "math.randomseed", "math.sin", "math.sinh", "math.sqrt", "math.tan", "math.tanh", "os.clock", "os.date", "os.difftime", "os.execute", "os.exit", "os.getenv", "os.remove", "os.rename", "os.setlocale", "os.time", "os.tmpname", "package.cpath", "package.loaded", "package.loaders", "package.loadlib", "package.path", "package.preload", "package.seeall", "string.byte", "string.char", "string.dump", "string.find", "string.format", "string.gmatch", "string.gsub", "string.len", "string.lower", "string.match", "string.rep", "string.reverse", "string.sub", "string.upper", "table.concat", "table.insert", "table.maxn", "table.remove", "table.sort" ]), keywords = wordRE([ "and", "break", "elseif", "false", "nil", "not", "or", "return", "true", "function", "end", "if", "then", "else", "do", "while", "repeat", "until", "for", "in", "local" ]), indentTokens = wordRE([ "function", "if", "repeat", "do", "\\(", "{" ]), dedentTokens = wordRE([ "end", "until", "\\)", "}" ]), dedentPartial = prefixRE([ "end", "until", "\\)", "}", "else", "elseif" ]);
return {
startState:function(basecol) {
return {
basecol:basecol || 0,
indentDepth:0,
cur:normal
};
},
token:function(stream, state) {
if (stream.eatSpace()) return null;
var style = state.cur(stream, state), word = stream.current();
return "variable" == style && (keywords.test(word) ? style = "keyword" :builtins.test(word) ? style = "builtin" :specials.test(word) && (style = "variable-2")), 
"comment" != style && "string" != style && (indentTokens.test(word) ? ++state.indentDepth :dedentTokens.test(word) && --state.indentDepth), 
style;
},
indent:function(state, textAfter) {
var closing = dedentPartial.test(textAfter);
return state.basecol + indentUnit * (state.indentDepth - (closing ? 1 :0));
},
lineComment:"--",
blockCommentStart:"--[[",
blockCommentEnd:"]]"
};
}), CodeMirror.defineMIME("text/x-lua", "lua"), CodeMirror.defineMIME("text/x-erlang", "erlang"), 
CodeMirror.defineMode("erlang", function(cmCfg) {
function rval(state, stream, type) {
switch (state.context = "record" == type ? "record" :!1, "whitespace" != type && "comment" != type && (state.lastToken = stream.current()), 
type) {
case "atom":
return "atom";

case "attribute":
return "attribute";

case "builtin":
return "builtin";

case "comment":
return "comment";

case "fun":
return "meta";

case "function":
return "tag";

case "guard":
return "property";

case "keyword":
return "keyword";

case "macro":
return "variable-2";

case "number":
return "number";

case "operator":
return "operator";

case "record":
return "bracket";

case "string":
return "string";

case "type":
return "def";

case "variable":
return "variable";

case "error":
return "error";

case "separator":
return null;

case "open_paren":
return null;

case "close_paren":
return null;

default:
return null;
}
}
function isMember(element, list) {
return -1 < list.indexOf(element);
}
function isPrev(stream, string) {
var start = stream.start, len = string.length;
if (start >= len) {
var word = stream.string.slice(start - len, start);
return word == string;
}
return !1;
}
function tokenize(stream, state) {
if (stream.eatSpace()) return rval(state, stream, "whitespace");
if (("" == peekToken(state).token || "." == peekToken(state).token) && "-" == stream.peek()) {
if (stream.next(), stream.eat(smallRE) && stream.eatWhile(anumRE)) return isMember(stream.current(), typeWords) ? rval(state, stream, "type") :rval(state, stream, "attribute");
stream.backUp(1);
}
var ch = stream.next();
if ("%" == ch) return stream.skipToEnd(), rval(state, stream, "comment");
if ("?" == ch) return stream.eatWhile(anumRE), rval(state, stream, "macro");
if ("#" == ch) return stream.eatWhile(anumRE), rval(state, stream, "record");
if ("$" == ch) return "\\" == stream.next() && (stream.eatWhile(octitRE) || stream.next()), 
rval(state, stream, "string");
if ("'" == ch) return singleQuote(stream) ? rval(state, stream, "atom") :rval(state, stream, "error");
if ('"' == ch) return doubleQuote(stream) ? rval(state, stream, "string") :rval(state, stream, "error");
if (largeRE.test(ch)) return stream.eatWhile(anumRE), rval(state, stream, "variable");
if (smallRE.test(ch)) {
if (stream.eatWhile(anumRE), "/" == stream.peek()) return stream.next(), stream.eatWhile(digitRE) ? rval(state, stream, "fun") :(stream.backUp(1), 
rval(state, stream, "atom"));
var w = stream.current();
return isMember(w, keywordWords) ? (pushToken(state, stream), rval(state, stream, "keyword")) :"(" == stream.peek() ? !isMember(w, bifWords) || isPrev(stream, ":") && !isPrev(stream, "erlang:") ? rval(state, stream, "function") :rval(state, stream, "builtin") :isMember(w, guardWords) ? rval(state, stream, "guard") :isMember(w, operatorWords) ? rval(state, stream, "operator") :":" == stream.peek() ? "erlang" == w ? rval(state, stream, "builtin") :rval(state, stream, "function") :rval(state, stream, "atom");
}
return digitRE.test(ch) ? (stream.eatWhile(digitRE), stream.eat("#") ? stream.eatWhile(digitRE) :(stream.eat(".") && stream.eatWhile(digitRE), 
stream.eat(/[eE]/) && (stream.eat(/[-+]/), stream.eatWhile(digitRE))), rval(state, stream, "number")) :nongreedy(stream, openParenRE, openParenWords) ? (pushToken(state, stream), 
rval(state, stream, "open_paren")) :nongreedy(stream, closeParenRE, closeParenWords) ? (pushToken(state, stream), 
rval(state, stream, "close_paren")) :greedy(stream, sepRE, separatorWords) ? (0 == state.context && pushToken(state, stream), 
rval(state, stream, "separator")) :greedy(stream, symbolRE, symbolWords) ? rval(state, stream, "operator") :rval(state, stream, null);
}
function nongreedy(stream, re, words) {
if (1 == stream.current().length && re.test(stream.current())) {
for (stream.backUp(1); re.test(stream.peek()); ) if (stream.next(), isMember(stream.current(), words)) return !0;
stream.backUp(stream.current().length - 1);
}
return !1;
}
function greedy(stream, re, words) {
if (1 == stream.current().length && re.test(stream.current())) {
for (;re.test(stream.peek()); ) stream.next();
for (;0 < stream.current().length; ) {
if (isMember(stream.current(), words)) return !0;
stream.backUp(1);
}
stream.next();
}
return !1;
}
function doubleQuote(stream) {
return quote(stream, '"', "\\");
}
function singleQuote(stream) {
return quote(stream, "'", "\\");
}
function quote(stream, quoteChar, escapeChar) {
for (;!stream.eol(); ) {
var ch = stream.next();
if (ch == quoteChar) return !0;
ch == escapeChar && stream.next();
}
return !1;
}
function Token(stream) {
this.token = stream ? stream.current() :"", this.column = stream ? stream.column() :0, 
this.indent = stream ? stream.indentation() :0;
}
function myIndent(state, textAfter) {
var indent = cmCfg.indentUnit, outdentWords = [ "after", "catch" ], token = peekToken(state).token, wordAfter = takewhile(textAfter, /[^a-z]/);
return isMember(token, openParenWords) ? peekToken(state).column + token.length :"." == token || "" == token ? 0 :"->" == token ? "end" == wordAfter ? peekToken(state, 2).column :"fun" == peekToken(state, 2).token ? peekToken(state, 2).column + indent :peekToken(state).indent + indent :isMember(wordAfter, outdentWords) ? peekToken(state).indent :peekToken(state).column + indent;
}
function takewhile(str, re) {
var m = str.match(re);
return m ? str.slice(0, m.index) :str;
}
function popToken(state) {
return state.tokenStack.pop();
}
function peekToken(state, depth) {
var len = state.tokenStack.length, dep = depth ? depth :1;
return dep > len ? new Token() :state.tokenStack[len - dep];
}
function pushToken(state, stream) {
var token = stream.current(), prev_token = peekToken(state).token;
return isMember(token, ignoreWords) ? !1 :drop_both(prev_token, token) ? (popToken(state), 
!1) :drop_first(prev_token, token) ? (popToken(state), pushToken(state, stream)) :(state.tokenStack.push(new Token(stream)), 
!0);
}
function drop_first(open, close) {
switch (open + " " + close) {
case "when ->":
return !0;

case "-> end":
return !0;

case "-> .":
return !0;

case ". .":
return !0;

default:
return !1;
}
}
function drop_both(open, close) {
switch (open + " " + close) {
case "( )":
return !0;

case "[ ]":
return !0;

case "{ }":
return !0;

case "<< >>":
return !0;

case "begin end":
return !0;

case "case end":
return !0;

case "fun end":
return !0;

case "if end":
return !0;

case "receive end":
return !0;

case "try end":
return !0;

case "-> ;":
return !0;

default:
return !1;
}
}
var typeWords = [ "-type", "-spec", "-export_type", "-opaque" ], keywordWords = [ "after", "begin", "catch", "case", "cond", "end", "fun", "if", "let", "of", "query", "receive", "try", "when" ], separatorWords = [ "->", ";", ":", ".", "," ], operatorWords = [ "and", "andalso", "band", "bnot", "bor", "bsl", "bsr", "bxor", "div", "not", "or", "orelse", "rem", "xor" ], symbolWords = [ "+", "-", "*", "/", ">", ">=", "<", "=<", "=:=", "==", "=/=", "/=", "||", "<-" ], openParenWords = [ "<<", "(", "[", "{" ], closeParenWords = [ "}", "]", ")", ">>" ], guardWords = [ "is_atom", "is_binary", "is_bitstring", "is_boolean", "is_float", "is_function", "is_integer", "is_list", "is_number", "is_pid", "is_port", "is_record", "is_reference", "is_tuple", "atom", "binary", "bitstring", "boolean", "function", "integer", "list", "number", "pid", "port", "record", "reference", "tuple" ], bifWords = [ "abs", "adler32", "adler32_combine", "alive", "apply", "atom_to_binary", "atom_to_list", "binary_to_atom", "binary_to_existing_atom", "binary_to_list", "binary_to_term", "bit_size", "bitstring_to_list", "byte_size", "check_process_code", "contact_binary", "crc32", "crc32_combine", "date", "decode_packet", "delete_module", "disconnect_node", "element", "erase", "exit", "float", "float_to_list", "garbage_collect", "get", "get_keys", "group_leader", "halt", "hd", "integer_to_list", "internal_bif", "iolist_size", "iolist_to_binary", "is_alive", "is_atom", "is_binary", "is_bitstring", "is_boolean", "is_float", "is_function", "is_integer", "is_list", "is_number", "is_pid", "is_port", "is_process_alive", "is_record", "is_reference", "is_tuple", "length", "link", "list_to_atom", "list_to_binary", "list_to_bitstring", "list_to_existing_atom", "list_to_float", "list_to_integer", "list_to_pid", "list_to_tuple", "load_module", "make_ref", "module_loaded", "monitor_node", "node", "node_link", "node_unlink", "nodes", "notalive", "now", "open_port", "pid_to_list", "port_close", "port_command", "port_connect", "port_control", "pre_loaded", "process_flag", "process_info", "processes", "purge_module", "put", "register", "registered", "round", "self", "setelement", "size", "spawn", "spawn_link", "spawn_monitor", "spawn_opt", "split_binary", "statistics", "term_to_binary", "time", "throw", "tl", "trunc", "tuple_size", "tuple_to_list", "unlink", "unregister", "whereis" ], ignoreWords = [ ",", ":", "catch", "after", "of", "cond", "let", "query" ], smallRE = /[a-z_]/, largeRE = /[A-Z_]/, digitRE = /[0-9]/, octitRE = /[0-7]/, anumRE = /[a-z_A-Z0-9]/, symbolRE = /[\+\-\*\/<>=\|:]/, openParenRE = /[<\(\[\{]/, closeParenRE = /[>\)\]\}]/, sepRE = /[\->\.,:;]/;
return {
startState:function() {
return {
tokenStack:[],
context:!1,
lastToken:null
};
},
token:function(stream, state) {
return tokenize(stream, state);
},
indent:function(state, textAfter) {
return myIndent(state, textAfter);
},
lineComment:"%"
};
}), CodeMirror.defineMode("clojure", function() {
function makeKeywords(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function stateStack(indent, type, prev) {
this.indent = indent, this.type = type, this.prev = prev;
}
function pushStack(state, indent, type) {
state.indentStack = new stateStack(indent, type, state.indentStack);
}
function popStack(state) {
state.indentStack = state.indentStack.prev;
}
function isNumber(ch, stream) {
return "0" === ch && stream.eat(/x/i) ? (stream.eatWhile(tests.hex), !0) :("+" != ch && "-" != ch || !tests.digit.test(stream.peek()) || (stream.eat(tests.sign), 
ch = stream.next()), tests.digit.test(ch) ? (stream.eat(ch), stream.eatWhile(tests.digit), 
"." == stream.peek() && (stream.eat("."), stream.eatWhile(tests.digit)), stream.eat(tests.exponent) && (stream.eat(tests.sign), 
stream.eatWhile(tests.digit)), !0) :!1);
}
function eatCharacter(stream) {
var first = stream.next();
first.match(/[a-z]/) && stream.match(/[a-z]+/, !0) || "u" === first && stream.match(/[0-9a-z]{4}/i, !0);
}
var BUILTIN = "builtin", COMMENT = "comment", STRING = "string", CHARACTER = "string-2", ATOM = "atom", NUMBER = "number", BRACKET = "bracket", KEYWORD = "keyword", INDENT_WORD_SKIP = 2, atoms = makeKeywords("true false nil"), keywords = makeKeywords("defn defn- def def- defonce defmulti defmethod defmacro defstruct deftype defprotocol defrecord defproject deftest slice defalias defhinted defmacro- defn-memo defnk defnk defonce- defunbound defunbound- defvar defvar- let letfn do case cond condp for loop recur when when-not when-let when-first if if-let if-not . .. -> ->> doto and or dosync doseq dotimes dorun doall load import unimport ns in-ns refer try catch finally throw with-open with-local-vars binding gen-class gen-and-load-class gen-and-save-class handler-case handle"), builtins = makeKeywords("* *' *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* *command-line-args* *compile-files* *compile-path* *compiler-options* *data-readers* *e *err* *file* *flush-on-newline* *fn-loader* *in* *math-context* *ns* *out* *print-dup* *print-length* *print-level* *print-meta* *print-readably* *read-eval* *source-path* *unchecked-math* *use-context-classloader* *verbose-defrecords* *warn-on-reflection* + +' - -' -> ->> ->ArrayChunk ->Vec ->VecNode ->VecSeq -cache-protocol-fn -reset-methods .. / < <= = == > >= EMPTY-NODE accessor aclone add-classpath add-watch agent agent-error agent-errors aget alength alias all-ns alter alter-meta! alter-var-root amap ancestors and apply areduce array-map aset aset-boolean aset-byte aset-char aset-double aset-float aset-int aset-long aset-short assert assoc assoc! assoc-in associative? atom await await-for await1 bases bean bigdec bigint biginteger binding bit-and bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left bit-shift-right bit-test bit-xor boolean boolean-array booleans bound-fn bound-fn* bound? butlast byte byte-array bytes case cast char char-array char-escape-string char-name-string char? chars chunk chunk-append chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? class class? clear-agent-errors clojure-version coll? comment commute comp comparator compare compare-and-set! compile complement concat cond condp conj conj! cons constantly construct-proxy contains? count counted? create-ns create-struct cycle dec dec' decimal? declare default-data-readers definline definterface defmacro defmethod defmulti defn defn- defonce defprotocol defrecord defstruct deftype delay delay? deliver denominator deref derive descendants destructure disj disj! dissoc dissoc! distinct distinct? doall dorun doseq dosync dotimes doto double double-array doubles drop drop-last drop-while empty empty? ensure enumeration-seq error-handler error-mode eval even? every-pred every? ex-data ex-info extend extend-protocol extend-type extenders extends? false? ffirst file-seq filter filterv find find-keyword find-ns find-protocol-impl find-protocol-method find-var first flatten float float-array float? floats flush fn fn? fnext fnil for force format frequencies future future-call future-cancel future-cancelled? future-done? future? gen-class gen-interface gensym get get-in get-method get-proxy-class get-thread-bindings get-validator group-by hash hash-combine hash-map hash-set identical? identity if-let if-not ifn? import in-ns inc inc' init-proxy instance? int int-array integer? interleave intern interpose into into-array ints io! isa? iterate iterator-seq juxt keep keep-indexed key keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list list* list? load load-file load-reader load-string loaded-libs locking long long-array longs loop macroexpand macroexpand-1 make-array make-hierarchy map map-indexed map? mapcat mapv max max-key memfn memoize merge merge-with meta method-sig methods min min-key mod munge name namespace namespace-munge neg? newline next nfirst nil? nnext not not-any? not-empty not-every? not= ns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics ns-refers ns-resolve ns-unalias ns-unmap nth nthnext nthrest num number? numerator object-array odd? or parents partial partition partition-all partition-by pcalls peek persistent! pmap pop pop! pop-thread-bindings pos? pr pr-str prefer-method prefers primitives-classnames print print-ctor print-dup print-method print-simple print-str printf println println-str prn prn-str promise proxy proxy-call-with-super proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot rand rand-int rand-nth range ratio? rational? rationalize re-find re-groups re-matcher re-matches re-pattern re-seq read read-line read-string realized? reduce reduce-kv reductions ref ref-history-count ref-max-history ref-min-history ref-set refer refer-clojure reify release-pending-sends rem remove remove-all-methods remove-method remove-ns remove-watch repeat repeatedly replace replicate require reset! reset-meta! resolve rest restart-agent resultset-seq reverse reversible? rseq rsubseq satisfies? second select-keys send send-off seq seq? seque sequence sequential? set set-error-handler! set-error-mode! set-validator! set? short short-array shorts shuffle shutdown-agents slurp some some-fn sort sort-by sorted-map sorted-map-by sorted-set sorted-set-by sorted? special-symbol? spit split-at split-with str string? struct struct-map subs subseq subvec supers swap! symbol symbol? sync take take-last take-nth take-while test the-ns thread-bound? time to-array to-array-2d trampoline transient tree-seq true? type unchecked-add unchecked-add-int unchecked-byte unchecked-char unchecked-dec unchecked-dec-int unchecked-divide-int unchecked-double unchecked-float unchecked-inc unchecked-inc-int unchecked-int unchecked-long unchecked-multiply unchecked-multiply-int unchecked-negate unchecked-negate-int unchecked-remainder-int unchecked-short unchecked-subtract unchecked-subtract-int underive unquote unquote-splicing update-in update-proxy use val vals var-get var-set var? vary-meta vec vector vector-of vector? when when-first when-let when-not while with-bindings with-bindings* with-in-str with-loading-context with-local-vars with-meta with-open with-out-str with-precision with-redefs with-redefs-fn xml-seq zero? zipmap *default-data-reader-fn* as-> cond-> cond->> reduced reduced? send-via set-agent-send-executor! set-agent-send-off-executor! some-> some->>"), indentKeys = makeKeywords("ns fn def defn defmethod bound-fn if if-not case condp when while when-not when-first do future comment doto locking proxy with-open with-precision reify deftype defrecord defprotocol extend extend-protocol extend-type try catch let letfn binding loop for doseq dotimes when-let if-let defstruct struct-map assoc testing deftest handler-case handle dotrace deftrace"), tests = {
digit:/\d/,
digit_or_colon:/[\d:]/,
hex:/[0-9a-f]/i,
sign:/[+-]/,
exponent:/e/i,
keyword_char:/[^\s\(\[\;\)\]]/,
symbol:/[\w*+!\-\._?:\/]/
};
return {
startState:function() {
return {
indentStack:null,
indentation:0,
mode:!1
};
},
token:function(stream, state) {
if (null == state.indentStack && stream.sol() && (state.indentation = stream.indentation()), 
stream.eatSpace()) return null;
var returnType = null;
switch (state.mode) {
case "string":
for (var next, escaped = !1; null != (next = stream.next()); ) {
if ('"' == next && !escaped) {
state.mode = !1;
break;
}
escaped = !escaped && "\\" == next;
}
returnType = STRING;
break;

default:
var ch = stream.next();
if ('"' == ch) state.mode = "string", returnType = STRING; else if ("\\" == ch) eatCharacter(stream), 
returnType = CHARACTER; else if ("'" != ch || tests.digit_or_colon.test(stream.peek())) if (";" == ch) stream.skipToEnd(), 
returnType = COMMENT; else if (isNumber(ch, stream)) returnType = NUMBER; else if ("(" == ch || "[" == ch || "{" == ch) {
var letter, keyWord = "", indentTemp = stream.column();
if ("(" == ch) for (;null != (letter = stream.eat(tests.keyword_char)); ) keyWord += letter;
keyWord.length > 0 && (indentKeys.propertyIsEnumerable(keyWord) || /^(?:def|with)/.test(keyWord)) ? pushStack(state, indentTemp + INDENT_WORD_SKIP, ch) :(stream.eatSpace(), 
stream.eol() || ";" == stream.peek() ? pushStack(state, indentTemp + 1, ch) :pushStack(state, indentTemp + stream.current().length, ch)), 
stream.backUp(stream.current().length - 1), returnType = BRACKET;
} else if (")" == ch || "]" == ch || "}" == ch) returnType = BRACKET, null != state.indentStack && state.indentStack.type == (")" == ch ? "(" :"]" == ch ? "[" :"{") && popStack(state); else {
if (":" == ch) return stream.eatWhile(tests.symbol), ATOM;
stream.eatWhile(tests.symbol), returnType = keywords && keywords.propertyIsEnumerable(stream.current()) ? KEYWORD :builtins && builtins.propertyIsEnumerable(stream.current()) ? BUILTIN :atoms && atoms.propertyIsEnumerable(stream.current()) ? ATOM :null;
} else returnType = ATOM;
}
return returnType;
},
indent:function(state) {
return null == state.indentStack ? state.indentation :state.indentStack.indent;
},
lineComment:";;"
};
}), CodeMirror.defineMIME("text/x-clojure", "clojure"), CodeMirror.defineMode("markdown", function(cmCfg, modeCfg) {
function switchInline(stream, state, f) {
return state.f = state.inline = f, f(stream, state);
}
function switchBlock(stream, state, f) {
return state.f = state.block = f, f(stream, state);
}
function blankLine(state) {
return state.linkTitle = !1, state.em = !1, state.strong = !1, state.quote = 0, 
htmlFound || state.f != htmlBlock || (state.f = inlineNormal, state.block = blockNormal), 
state.thisLineHasContent = !1, null;
}
function blockNormal(stream, state) {
var prevLineIsList = state.list !== !1;
if (state.list !== !1 && state.indentationDiff >= 0 ? (state.indentationDiff < 4 && (state.indentation -= state.indentationDiff), 
state.list = null) :state.list !== !1 && state.indentation > 0 ? (state.list = null, 
state.listDepth = Math.floor(state.indentation / 4)) :state.list !== !1 && (state.list = !1, 
state.listDepth = 0), state.indentationDiff >= 4) return state.indentation -= 4, 
stream.skipToEnd(), code;
if (stream.eatSpace()) return null;
if ("#" === stream.peek() || state.prevLineHasContent && stream.match(headerRE)) state.header = !0; else if (stream.eat(">")) for (state.indentation++, 
state.quote = 1, stream.eatSpace(); stream.eat(">"); ) stream.eatSpace(), state.quote++; else {
if ("[" === stream.peek()) return switchInline(stream, state, footnoteLink);
if (stream.match(hrRE, !0)) return hr;
if (state.prevLineHasContent && !prevLineIsList || !stream.match(ulRE, !0) && !stream.match(olRE, !0)) {
if (modeCfg.fencedCodeBlocks && stream.match(/^```([\w+#]*)/, !0)) return state.localMode = getMode(RegExp.$1), 
state.localMode && (state.localState = state.localMode.startState()), switchBlock(stream, state, local), 
code;
} else state.indentation += 4, state.list = !0, state.listDepth++, modeCfg.taskLists && stream.match(taskListRE, !1) && (state.taskList = !0);
}
return switchInline(stream, state, state.inline);
}
function htmlBlock(stream, state) {
var style = htmlMode.token(stream, state.htmlState);
return htmlFound && "tag" === style && "openTag" !== state.htmlState.type && !state.htmlState.context && (state.f = inlineNormal, 
state.block = blockNormal), state.md_inside && -1 != stream.current().indexOf(">") && (state.f = inlineNormal, 
state.block = blockNormal, state.htmlState.context = void 0), style;
}
function local(stream, state) {
return stream.sol() && stream.match(/^```/, !0) ? (state.localMode = state.localState = null, 
state.f = inlineNormal, state.block = blockNormal, code) :state.localMode ? state.localMode.token(stream, state.localState) :(stream.skipToEnd(), 
code);
}
function getType(state) {
var styles = [];
if (state.taskOpen) return "meta";
if (state.taskClosed) return "property";
if (state.strong && styles.push(strong), state.em && styles.push(em), state.linkText && styles.push(linktext), 
state.code && styles.push(code), state.header && styles.push(header), state.quote && styles.push(state.quote % 2 ? quote1 :quote2), 
state.list !== !1) {
var listMod = (state.listDepth - 1) % 3;
listMod ? 1 === listMod ? styles.push(list2) :styles.push(list3) :styles.push(list1);
}
return styles.length ? styles.join(" ") :null;
}
function handleText(stream, state) {
return stream.match(textRE, !0) ? getType(state) :void 0;
}
function inlineNormal(stream, state) {
var style = state.text(stream, state);
if ("undefined" != typeof style) return style;
if (state.list) return state.list = null, getType(state);
if (state.taskList) {
var taskOpen = "x" !== stream.match(taskListRE, !0)[1];
return taskOpen ? state.taskOpen = !0 :state.taskClosed = !0, state.taskList = !1, 
getType(state);
}
state.taskOpen = !1, state.taskClosed = !1;
var ch = stream.next();
if ("\\" === ch) return stream.next(), getType(state);
if (state.linkTitle) {
state.linkTitle = !1;
var matchCh = ch;
"(" === ch && (matchCh = ")"), matchCh = (matchCh + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
var regex = "^\\s*(?:[^" + matchCh + "\\\\]+|\\\\\\\\|\\\\.)" + matchCh;
if (stream.match(new RegExp(regex), !0)) return linkhref;
}
if ("`" === ch) {
var t = getType(state), before = stream.pos;
stream.eatWhile("`");
var difference = 1 + stream.pos - before;
return state.code ? difference === codeDepth ? (state.code = !1, t) :getType(state) :(codeDepth = difference, 
state.code = !0, getType(state));
}
if (state.code) return getType(state);
if ("!" === ch && stream.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return stream.match(/\[[^\]]*\]/), 
state.inline = state.f = linkHref, image;
if ("[" === ch && stream.match(/.*\](\(| ?\[)/, !1)) return state.linkText = !0, 
getType(state);
if ("]" === ch && state.linkText) {
var type = getType(state);
return state.linkText = !1, state.inline = state.f = linkHref, type;
}
if ("<" === ch && stream.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !0)) return switchInline(stream, state, inlineElement(linkinline, ">"));
if ("<" === ch && stream.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !0)) return switchInline(stream, state, inlineElement(linkemail, ">"));
if ("<" === ch && stream.match(/^\w/, !1)) {
if (-1 != stream.string.indexOf(">")) {
var atts = stream.string.substring(1, stream.string.indexOf(">"));
/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(atts) && (state.md_inside = !0);
}
return stream.backUp(1), switchBlock(stream, state, htmlBlock);
}
if ("<" === ch && stream.match(/^\/\w*?>/)) return state.md_inside = !1, "tag";
var ignoreUnderscore = !1;
if (!modeCfg.underscoresBreakWords && "_" === ch && "_" !== stream.peek() && stream.match(/(\w)/, !1)) {
var prevPos = stream.pos - 2;
if (prevPos >= 0) {
var prevCh = stream.string.charAt(prevPos);
"_" !== prevCh && prevCh.match(/(\w)/, !1) && (ignoreUnderscore = !0);
}
}
var t = getType(state);
if ("*" === ch || "_" === ch && !ignoreUnderscore) {
if (state.strong === ch && stream.eat(ch)) return state.strong = !1, t;
if (!state.strong && stream.eat(ch)) return state.strong = ch, getType(state);
if (state.em === ch) return state.em = !1, t;
if (!state.em) return state.em = ch, getType(state);
} else if (" " === ch && (stream.eat("*") || stream.eat("_"))) {
if (" " === stream.peek()) return getType(state);
stream.backUp(1);
}
return getType(state);
}
function linkHref(stream, state) {
if (stream.eatSpace()) return null;
var ch = stream.next();
return "(" === ch || "[" === ch ? switchInline(stream, state, inlineElement(linkhref, "(" === ch ? ")" :"]")) :"error";
}
function footnoteLink(stream, state) {
return stream.match(/^[^\]]*\]:/, !0) ? (state.f = footnoteUrl, linktext) :switchInline(stream, state, inlineNormal);
}
function footnoteUrl(stream, state) {
return stream.eatSpace() ? null :(stream.match(/^[^\s]+/, !0), void 0 === stream.peek() ? state.linkTitle = !0 :stream.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), 
state.f = state.inline = inlineNormal, linkhref);
}
function inlineRE(endChar) {
return savedInlineRE[endChar] || (endChar = (endChar + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), 
savedInlineRE[endChar] = new RegExp("^(?:[^\\\\]|\\\\.)*?(" + endChar + ")")), savedInlineRE[endChar];
}
function inlineElement(type, endChar, next) {
return next = next || inlineNormal, function(stream, state) {
return stream.match(inlineRE(endChar)), state.inline = state.f = next, type;
};
}
var htmlFound = CodeMirror.modes.hasOwnProperty("xml"), htmlMode = CodeMirror.getMode(cmCfg, htmlFound ? {
name:"xml",
htmlMode:!0
} :"text/plain"), aliases = {
html:"htmlmixed",
js:"javascript",
json:"application/json",
c:"text/x-csrc",
"c++":"text/x-c++src",
java:"text/x-java",
csharp:"text/x-csharp",
"c#":"text/x-csharp",
scala:"text/x-scala"
}, getMode = function() {
var i, mime, modes = {}, mimes = {}, list = [];
for (var m in CodeMirror.modes) CodeMirror.modes.propertyIsEnumerable(m) && list.push(m);
for (i = 0; i < list.length; i++) modes[list[i]] = list[i];
var mimesList = [];
for (var m in CodeMirror.mimeModes) CodeMirror.mimeModes.propertyIsEnumerable(m) && mimesList.push({
mime:m,
mode:CodeMirror.mimeModes[m]
});
for (i = 0; i < mimesList.length; i++) mime = mimesList[i].mime, mimes[mime] = mimesList[i].mime;
for (var a in aliases) (aliases[a] in modes || aliases[a] in mimes) && (modes[a] = aliases[a]);
return function(lang) {
return modes[lang] ? CodeMirror.getMode(cmCfg, modes[lang]) :null;
};
}();
void 0 === modeCfg.underscoresBreakWords && (modeCfg.underscoresBreakWords = !0), 
void 0 === modeCfg.fencedCodeBlocks && (modeCfg.fencedCodeBlocks = !1), void 0 === modeCfg.taskLists && (modeCfg.taskLists = !1);
var codeDepth = 0, header = "header", code = "comment", quote1 = "atom", quote2 = "number", list1 = "variable-2", list2 = "variable-3", list3 = "keyword", hr = "hr", image = "tag", linkinline = "link", linkemail = "link", linktext = "link", linkhref = "string", em = "em", strong = "strong", hrRE = /^([*\-=_])(?:\s*\1){2,}\s*$/, ulRE = /^[*\-+]\s+/, olRE = /^[0-9]+\.\s+/, taskListRE = /^\[(x| )\](?=\s)/, headerRE = /^(?:\={1,}|-{1,})$/, textRE = /^[^!\[\]*_\\<>` "'(]+/, savedInlineRE = [];
return {
startState:function() {
return {
f:blockNormal,
prevLineHasContent:!1,
thisLineHasContent:!1,
block:blockNormal,
htmlState:CodeMirror.startState(htmlMode),
indentation:0,
inline:inlineNormal,
text:handleText,
linkText:!1,
linkTitle:!1,
em:!1,
strong:!1,
header:!1,
taskList:!1,
list:!1,
listDepth:0,
quote:0
};
},
copyState:function(s) {
return {
f:s.f,
prevLineHasContent:s.prevLineHasContent,
thisLineHasContent:s.thisLineHasContent,
block:s.block,
htmlState:CodeMirror.copyState(htmlMode, s.htmlState),
indentation:s.indentation,
localMode:s.localMode,
localState:s.localMode ? CodeMirror.copyState(s.localMode, s.localState) :null,
inline:s.inline,
text:s.text,
linkTitle:s.linkTitle,
em:s.em,
strong:s.strong,
header:s.header,
taskList:s.taskList,
list:s.list,
listDepth:s.listDepth,
quote:s.quote,
md_inside:s.md_inside
};
},
token:function(stream, state) {
if (stream.sol()) {
if (stream.match(/^\s*$/, !0)) return state.prevLineHasContent = !1, blankLine(state);
state.prevLineHasContent = state.thisLineHasContent, state.thisLineHasContent = !0, 
state.header = !1, state.taskList = !1, state.code = !1, state.f = state.block;
var indentation = stream.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length, difference = 4 * Math.floor((indentation - state.indentation) / 4);
difference > 4 && (difference = 4);
var adjustedIndentation = state.indentation + difference;
if (state.indentationDiff = adjustedIndentation - state.indentation, state.indentation = adjustedIndentation, 
indentation > 0) return null;
}
return state.f(stream, state);
},
blankLine:blankLine,
getType:getType
};
}, "xml"), CodeMirror.defineMIME("text/x-markdown", "markdown"), CodeMirror.defineMode("go", function(config) {
function tokenBase(stream, state) {
var ch = stream.next();
if ('"' == ch || "'" == ch || "`" == ch) return state.tokenize = tokenString(ch), 
state.tokenize(stream, state);
if (/[\d\.]/.test(ch)) return "." == ch ? stream.match(/^[0-9]+([eE][\-+]?[0-9]+)?/) :"0" == ch ? stream.match(/^[xX][0-9a-fA-F]+/) || stream.match(/^0[0-7]+/) :stream.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/), 
"number";
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return curPunc = ch, null;
if ("/" == ch) {
if (stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
}
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_]/);
var cur = stream.current();
return keywords.propertyIsEnumerable(cur) ? (("case" == cur || "default" == cur) && (curPunc = "case"), 
"keyword") :atoms.propertyIsEnumerable(cur) ? "atom" :"variable";
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return (end || !escaped && "`" != quote) && (state.tokenize = tokenBase), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = tokenBase;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function Context(indented, column, type, align, prev) {
this.indented = indented, this.column = column, this.type = type, this.align = align, 
this.prev = prev;
}
function pushContext(state, col, type) {
return state.context = new Context(state.indented, col, type, null, state.context);
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
var curPunc, indentUnit = config.indentUnit, keywords = {
"break":!0,
"case":!0,
chan:!0,
"const":!0,
"continue":!0,
"default":!0,
defer:!0,
"else":!0,
fallthrough:!0,
"for":!0,
func:!0,
go:!0,
"goto":!0,
"if":!0,
"import":!0,
"interface":!0,
map:!0,
"package":!0,
range:!0,
"return":!0,
select:!0,
struct:!0,
"switch":!0,
type:!0,
"var":!0,
bool:!0,
"byte":!0,
complex64:!0,
complex128:!0,
float32:!0,
float64:!0,
int8:!0,
int16:!0,
int32:!0,
int64:!0,
string:!0,
uint8:!0,
uint16:!0,
uint32:!0,
uint64:!0,
"int":!0,
uint:!0,
uintptr:!0
}, atoms = {
"true":!0,
"false":!0,
iota:!0,
nil:!0,
append:!0,
cap:!0,
close:!0,
complex:!0,
copy:!0,
imag:!0,
len:!0,
make:!0,
"new":!0,
panic:!0,
print:!0,
println:!0,
real:!0,
recover:!0
}, isOperatorChar = /[+\-*&^%:=<>!|\/]/;
return {
startState:function(basecolumn) {
return {
tokenize:null,
context:new Context((basecolumn || 0) - indentUnit, 0, "top", !1),
indented:0,
startOfLine:!0
};
},
token:function(stream, state) {
var ctx = state.context;
if (stream.sol() && (null == ctx.align && (ctx.align = !1), state.indented = stream.indentation(), 
state.startOfLine = !0, "case" == ctx.type && (ctx.type = "}")), stream.eatSpace()) return null;
curPunc = null;
var style = (state.tokenize || tokenBase)(stream, state);
return "comment" == style ? style :(null == ctx.align && (ctx.align = !0), "{" == curPunc ? pushContext(state, stream.column(), "}") :"[" == curPunc ? pushContext(state, stream.column(), "]") :"(" == curPunc ? pushContext(state, stream.column(), ")") :"case" == curPunc ? ctx.type = "case" :"}" == curPunc && "}" == ctx.type ? ctx = popContext(state) :curPunc == ctx.type && popContext(state), 
state.startOfLine = !1, style);
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase && null != state.tokenize) return 0;
var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
if ("case" == ctx.type && /^(?:case|default)\b/.test(textAfter)) return state.context.type = "}", 
ctx.indented;
var closing = firstChar == ctx.type;
return ctx.align ? ctx.column + (closing ? 0 :1) :ctx.indented + (closing ? 0 :indentUnit);
},
electricChars:"{}:",
blockCommentStart:"/*",
blockCommentEnd:"*/",
lineComment:"//"
};
}), CodeMirror.defineMIME("text/x-go", "go"), CodeMirror.defineMode("javascript", function(config, parserConfig) {
function chain(stream, state, f) {
return state.tokenize = f, f(stream, state);
}
function nextUntilUnescaped(stream, end) {
for (var next, escaped = !1; null != (next = stream.next()); ) {
if (next == end && !escaped) return !1;
escaped = !escaped && "\\" == next;
}
return escaped;
}
function ret(tp, style, cont) {
return type = tp, content = cont, style;
}
function jsTokenBase(stream, state) {
var ch = stream.next();
if ('"' == ch || "'" == ch) return chain(stream, state, jsTokenString(ch));
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return ret(ch);
if ("0" == ch && stream.eat(/x/i)) return stream.eatWhile(/[\da-f]/i), ret("number", "number");
if (/\d/.test(ch) || "-" == ch && stream.eat(/\d/)) return stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), 
ret("number", "number");
if ("/" == ch) return stream.eat("*") ? chain(stream, state, jsTokenComment) :stream.eat("/") ? (stream.skipToEnd(), 
ret("comment", "comment")) :"operator" == state.lastType || "keyword c" == state.lastType || /^[\[{}\(,;:]$/.test(state.lastType) ? (nextUntilUnescaped(stream, "/"), 
stream.eatWhile(/[gimy]/), ret("regexp", "string-2")) :(stream.eatWhile(isOperatorChar), 
ret("operator", null, stream.current()));
if ("#" == ch) return stream.skipToEnd(), ret("error", "error");
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), ret("operator", null, stream.current());
stream.eatWhile(/[\w\$_]/);
var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
return known && "." != state.lastType ? ret(known.type, known.style, word) :ret("variable", "variable", word);
}
function jsTokenString(quote) {
return function(stream, state) {
return nextUntilUnescaped(stream, quote) || (state.tokenize = jsTokenBase), ret("string", "string");
};
}
function jsTokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = jsTokenBase;
break;
}
maybeEnd = "*" == ch;
}
return ret("comment", "comment");
}
function JSLexical(indented, column, type, align, prev, info) {
this.indented = indented, this.column = column, this.type = type, this.prev = prev, 
this.info = info, null != align && (this.align = align);
}
function inScope(state, varname) {
for (var v = state.localVars; v; v = v.next) if (v.name == varname) return !0;
}
function parseJS(state, style, type, content, stream) {
var cc = state.cc;
for (cx.state = state, cx.stream = stream, cx.marked = null, cx.cc = cc, state.lexical.hasOwnProperty("align") || (state.lexical.align = !0); ;) {
var combinator = cc.length ? cc.pop() :jsonMode ? expression :statement;
if (combinator(type, content)) {
for (;cc.length && cc[cc.length - 1].lex; ) cc.pop()();
return cx.marked ? cx.marked :"variable" == type && inScope(state, content) ? "variable-2" :style;
}
}
}
function pass() {
for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
}
function cont() {
return pass.apply(null, arguments), !0;
}
function register(varname) {
function inList(list) {
for (var v = list; v; v = v.next) if (v.name == varname) return !0;
return !1;
}
var state = cx.state;
if (state.context) {
if (cx.marked = "def", inList(state.localVars)) return;
state.localVars = {
name:varname,
next:state.localVars
};
} else {
if (inList(state.globalVars)) return;
state.globalVars = {
name:varname,
next:state.globalVars
};
}
}
function pushcontext() {
cx.state.context = {
prev:cx.state.context,
vars:cx.state.localVars
}, cx.state.localVars = defaultVars;
}
function popcontext() {
cx.state.localVars = cx.state.context.vars, cx.state.context = cx.state.context.prev;
}
function pushlex(type, info) {
var result = function() {
var state = cx.state;
state.lexical = new JSLexical(state.indented, cx.stream.column(), type, null, state.lexical, info);
};
return result.lex = !0, result;
}
function poplex() {
var state = cx.state;
state.lexical.prev && (")" == state.lexical.type && (state.indented = state.lexical.indented), 
state.lexical = state.lexical.prev);
}
function expect(wanted) {
return function(type) {
return type == wanted ? cont() :";" == wanted ? pass() :cont(arguments.callee);
};
}
function statement(type) {
return "var" == type ? cont(pushlex("vardef"), vardef1, expect(";"), poplex) :"keyword a" == type ? cont(pushlex("form"), expression, statement, poplex) :"keyword b" == type ? cont(pushlex("form"), statement, poplex) :"{" == type ? cont(pushlex("}"), block, poplex) :";" == type ? cont() :"if" == type ? cont(pushlex("form"), expression, statement, poplex, maybeelse(cx.state.indented)) :"function" == type ? cont(functiondef) :"for" == type ? cont(pushlex("form"), expect("("), pushlex(")"), forspec1, expect(")"), poplex, statement, poplex) :"variable" == type ? cont(pushlex("stat"), maybelabel) :"switch" == type ? cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"), block, poplex, poplex) :"case" == type ? cont(expression, expect(":")) :"default" == type ? cont(expect(":")) :"catch" == type ? cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"), statement, poplex, popcontext) :pass(pushlex("stat"), expression, expect(";"), poplex);
}
function expression(type) {
return expressionInner(type, maybeoperatorComma);
}
function expressionNoComma(type) {
return expressionInner(type, maybeoperatorNoComma);
}
function expressionInner(type, maybeop) {
return atomicTypes.hasOwnProperty(type) ? cont(maybeop) :"function" == type ? cont(functiondef) :"keyword c" == type ? cont(maybeexpression) :"(" == type ? cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop) :"operator" == type ? cont(expression) :"[" == type ? cont(pushlex("]"), commasep(expressionNoComma, "]"), poplex, maybeop) :"{" == type ? cont(pushlex("}"), commasep(objprop, "}"), poplex, maybeop) :cont();
}
function maybeexpression(type) {
return type.match(/[;\}\)\],]/) ? pass() :pass(expression);
}
function maybeoperatorComma(type, value) {
return "," == type ? pass() :maybeoperatorNoComma(type, value, maybeoperatorComma);
}
function maybeoperatorNoComma(type, value, me) {
return me || (me = maybeoperatorNoComma), "operator" == type ? /\+\+|--/.test(value) ? cont(me) :"?" == value ? cont(expression, expect(":"), expression) :cont(expression) :";" != type ? "(" == type ? cont(pushlex(")", "call"), commasep(expressionNoComma, ")"), poplex, me) :"." == type ? cont(property, me) :"[" == type ? cont(pushlex("]"), expression, expect("]"), poplex, me) :void 0 :void 0;
}
function maybelabel(type) {
return ":" == type ? cont(poplex, statement) :pass(maybeoperatorComma, expect(";"), poplex);
}
function property(type) {
return "variable" == type ? (cx.marked = "property", cont()) :void 0;
}
function objprop(type, value) {
if ("variable" == type) {
if (cx.marked = "property", "get" == value || "set" == value) return cont(getterSetter);
} else ("number" == type || "string" == type) && (cx.marked = type + " property");
return atomicTypes.hasOwnProperty(type) ? cont(expect(":"), expressionNoComma) :void 0;
}
function getterSetter(type) {
return ":" == type ? cont(expression) :"variable" != type ? cont(expect(":"), expression) :(cx.marked = "property", 
cont(functiondef));
}
function commasep(what, end) {
function proceed(type) {
if ("," == type) {
var lex = cx.state.lexical;
return "call" == lex.info && (lex.pos = (lex.pos || 0) + 1), cont(what, proceed);
}
return type == end ? cont() :cont(expect(end));
}
return function(type) {
return type == end ? cont() :pass(what, proceed);
};
}
function block(type) {
return "}" == type ? cont() :pass(statement, block);
}
function maybetype(type) {
return ":" == type ? cont(typedef) :pass();
}
function typedef(type) {
return "variable" == type ? (cx.marked = "variable-3", cont()) :pass();
}
function vardef1(type, value) {
return "variable" == type ? (register(value), isTS ? cont(maybetype, vardef2) :cont(vardef2)) :pass();
}
function vardef2(type, value) {
return "=" == value ? cont(expressionNoComma, vardef2) :"," == type ? cont(vardef1) :void 0;
}
function maybeelse(indent) {
return function(type, value) {
return "keyword b" == type && "else" == value ? (cx.state.lexical = new JSLexical(indent, 0, "form", null, cx.state.lexical), 
cont(statement, poplex)) :pass();
};
}
function forspec1(type) {
return "var" == type ? cont(vardef1, expect(";"), forspec2) :";" == type ? cont(forspec2) :"variable" == type ? cont(formaybein) :pass(expression, expect(";"), forspec2);
}
function formaybein(_type, value) {
return "in" == value ? cont(expression) :cont(maybeoperatorComma, forspec2);
}
function forspec2(type, value) {
return ";" == type ? cont(forspec3) :"in" == value ? cont(expression) :pass(expression, expect(";"), forspec3);
}
function forspec3(type) {
")" != type && cont(expression);
}
function functiondef(type, value) {
return "variable" == type ? (register(value), cont(functiondef)) :"(" == type ? cont(pushlex(")"), pushcontext, commasep(funarg, ")"), poplex, statement, popcontext) :void 0;
}
function funarg(type, value) {
return "variable" == type ? (register(value), isTS ? cont(maybetype) :cont()) :void 0;
}
var type, content, indentUnit = config.indentUnit, jsonMode = parserConfig.json, isTS = parserConfig.typescript, keywords = function() {
function kw(type) {
return {
type:type,
style:"keyword"
};
}
var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), operator = kw("operator"), atom = {
type:"atom",
style:"atom"
}, jsKeywords = {
"if":kw("if"),
"while":A,
"with":A,
"else":B,
"do":B,
"try":B,
"finally":B,
"return":C,
"break":C,
"continue":C,
"new":C,
"delete":C,
"throw":C,
"var":kw("var"),
"const":kw("var"),
let:kw("var"),
"function":kw("function"),
"catch":kw("catch"),
"for":kw("for"),
"switch":kw("switch"),
"case":kw("case"),
"default":kw("default"),
"in":operator,
"typeof":operator,
"instanceof":operator,
"true":atom,
"false":atom,
"null":atom,
undefined:atom,
NaN:atom,
Infinity:atom,
"this":kw("this")
};
if (isTS) {
var type = {
type:"variable",
style:"variable-3"
}, tsKeywords = {
"interface":kw("interface"),
"class":kw("class"),
"extends":kw("extends"),
constructor:kw("constructor"),
"public":kw("public"),
"private":kw("private"),
"protected":kw("protected"),
"static":kw("static"),
"super":kw("super"),
string:type,
number:type,
bool:type,
any:type
};
for (var attr in tsKeywords) jsKeywords[attr] = tsKeywords[attr];
}
return jsKeywords;
}(), isOperatorChar = /[+\-*&%=<>!?|~^]/, atomicTypes = {
atom:!0,
number:!0,
variable:!0,
string:!0,
regexp:!0,
"this":!0
}, cx = {
state:null,
column:null,
marked:null,
cc:null
}, defaultVars = {
name:"this",
next:{
name:"arguments"
}
};
return poplex.lex = !0, {
startState:function(basecolumn) {
return {
tokenize:jsTokenBase,
lastType:null,
cc:[],
lexical:new JSLexical((basecolumn || 0) - indentUnit, 0, "block", !1),
localVars:parserConfig.localVars,
globalVars:parserConfig.globalVars,
context:parserConfig.localVars && {
vars:parserConfig.localVars
},
indented:0
};
},
token:function(stream, state) {
if (stream.sol() && (state.lexical.hasOwnProperty("align") || (state.lexical.align = !1), 
state.indented = stream.indentation()), state.tokenize != jsTokenComment && stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
return "comment" == type ? style :(state.lastType = "operator" != type || "++" != content && "--" != content ? type :"incdec", 
parseJS(state, style, type, content, stream));
},
indent:function(state, textAfter) {
if (state.tokenize == jsTokenComment) return CodeMirror.Pass;
if (state.tokenize != jsTokenBase) return 0;
var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;
"stat" == lexical.type && "}" == firstChar && (lexical = lexical.prev);
var type = lexical.type, closing = firstChar == type;
return null != parserConfig.statementIndent && (")" == type && lexical.prev && "stat" == lexical.prev.type && (lexical = lexical.prev), 
"stat" == lexical.type) ? lexical.indented + parserConfig.statementIndent :"vardef" == type ? lexical.indented + ("operator" == state.lastType || "," == state.lastType ? 4 :0) :"form" == type && "{" == firstChar ? lexical.indented :"form" == type ? lexical.indented + indentUnit :"stat" == type ? lexical.indented + ("operator" == state.lastType || "," == state.lastType ? indentUnit :0) :"switch" != lexical.info || closing ? lexical.align ? lexical.column + (closing ? 0 :1) :lexical.indented + (closing ? 0 :indentUnit) :lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit :2 * indentUnit);
},
electricChars:":{}",
blockCommentStart:jsonMode ? null :"/*",
blockCommentEnd:jsonMode ? null :"*/",
lineComment:jsonMode ? null :"//",
jsonMode:jsonMode
};
}), CodeMirror.defineMIME("text/javascript", "javascript"), CodeMirror.defineMIME("text/ecmascript", "javascript"), 
CodeMirror.defineMIME("application/javascript", "javascript"), CodeMirror.defineMIME("application/ecmascript", "javascript"), 
CodeMirror.defineMIME("application/json", {
name:"javascript",
json:!0
}), CodeMirror.defineMIME("application/x-json", {
name:"javascript",
json:!0
}), CodeMirror.defineMIME("text/typescript", {
name:"javascript",
typescript:!0
}), CodeMirror.defineMIME("application/typescript", {
name:"javascript",
typescript:!0
}), CodeMirror.defineMode("css", function(config) {
return CodeMirror.getMode(config, "text/css");
}), CodeMirror.defineMode("css-base", function(config, parserConfig) {
"use strict";
function ret(style, tp) {
return type = tp, style;
}
function tokenBase(stream, state) {
var ch = stream.next();
if (hooks[ch]) {
var result = hooks[ch](stream, state);
if (result !== !1) return result;
}
if ("@" == ch) return stream.eatWhile(/[\w\\\-]/), ret("def", stream.current());
if ("=" == ch) ret(null, "compare"); else {
if (("~" == ch || "|" == ch) && stream.eat("=")) return ret(null, "compare");
if ('"' == ch || "'" == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if ("#" == ch) return stream.eatWhile(/[\w\\\-]/), ret("atom", "hash");
if ("!" == ch) return stream.match(/^\s*\w*/), ret("keyword", "important");
if (/\d/.test(ch)) return stream.eatWhile(/[\w.%]/), ret("number", "unit");
if ("-" !== ch) return /[,+>*\/]/.test(ch) ? ret(null, "select-op") :"." == ch && stream.match(/^-?[_a-z][_a-z0-9-]*/i) ? ret("qualifier", "qualifier") :":" == ch ? ret("operator", ch) :/[;{}\[\]\(\)]/.test(ch) ? ret(null, ch) :"u" == ch && stream.match("rl(") ? (stream.backUp(1), 
state.tokenize = tokenParenthesized, ret("property", "variable")) :(stream.eatWhile(/[\w\\\-]/), 
ret("property", "variable"));
if (/\d/.test(stream.peek())) return stream.eatWhile(/[\w.%]/), ret("number", "unit");
if (stream.match(/^[^-]+-/)) return ret("meta", "meta");
}
}
function tokenString(quote, nonInclusive) {
return function(stream, state) {
for (var ch, escaped = !1; null != (ch = stream.next()) && (ch != quote || escaped); ) escaped = !escaped && "\\" == ch;
return escaped || (nonInclusive && stream.backUp(1), state.tokenize = tokenBase), 
ret("string", "string");
};
}
function tokenParenthesized(stream, state) {
return stream.next(), state.tokenize = stream.match(/\s*[\"\']/, !1) ? tokenBase :tokenString(")", !0), 
ret(null, "(");
}
var indentUnit = config.indentUnit, hooks = parserConfig.hooks || {}, atMediaTypes = parserConfig.atMediaTypes || {}, atMediaFeatures = parserConfig.atMediaFeatures || {}, propertyKeywords = parserConfig.propertyKeywords || {}, colorKeywords = parserConfig.colorKeywords || {}, valueKeywords = parserConfig.valueKeywords || {}, allowNested = !!parserConfig.allowNested, type = null;
return {
startState:function(base) {
return {
tokenize:tokenBase,
baseIndent:base || 0,
stack:[]
};
},
token:function(stream, state) {
if (state.tokenize = state.tokenize || tokenBase, state.tokenize == tokenBase && stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
style && "string" != typeof style && (style = ret(style[0], style[1]));
var context = state.stack[state.stack.length - 1];
if ("variable" == style) return "variable-definition" == type && state.stack.push("propertyValue"), 
"variable-2";
if ("property" == style) {
var word = stream.current().toLowerCase();
"propertyValue" == context ? style = valueKeywords.hasOwnProperty(word) ? "string-2" :colorKeywords.hasOwnProperty(word) ? "keyword" :"variable-2" :"rule" == context ? propertyKeywords.hasOwnProperty(word) || (style += " error") :"block" == context ? style = propertyKeywords.hasOwnProperty(word) ? "property" :colorKeywords.hasOwnProperty(word) ? "keyword" :valueKeywords.hasOwnProperty(word) ? "string-2" :"tag" :context && "@media{" != context ? "@media" == context ? style = atMediaTypes[stream.current()] ? "attribute" :/^(only|not)$/.test(word) ? "keyword" :"and" == word ? "error" :atMediaFeatures.hasOwnProperty(word) ? "error" :"attribute error" :"@mediaType" == context ? style = atMediaTypes.hasOwnProperty(word) ? "attribute" :"and" == word ? "operator" :/^(only|not)$/.test(word) ? "error" :"error" :"@mediaType(" == context ? propertyKeywords.hasOwnProperty(word) || (atMediaTypes.hasOwnProperty(word) ? style = "error" :"and" == word ? style = "operator" :/^(only|not)$/.test(word) ? style = "error" :style += " error") :style = "@import" == context ? "tag" :"error" :style = "tag";
} else "atom" == style ? context && "@media{" != context && "block" != context ? "propertyValue" == context ? /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(stream.current()) || (style += " error") :style = "error" :style = "builtin" :"@media" == context && "{" == type && (style = "error");
if ("{" == type) if ("@media" == context || "@mediaType" == context) state.stack.pop(), 
state.stack[state.stack.length - 1] = "@media{"; else {
var newContext = allowNested ? "block" :"rule";
state.stack.push(newContext);
} else if ("}" == type) {
var lastState = state.stack[state.stack.length - 1];
"interpolation" == lastState && (style = "operator"), state.stack.pop(), "propertyValue" == context && state.stack.pop();
} else "interpolation" == type ? state.stack.push("interpolation") :"@media" == type ? state.stack.push("@media") :"@import" == type ? state.stack.push("@import") :"@media" == context && /\b(keyword|attribute)\b/.test(style) ? state.stack.push("@mediaType") :"@mediaType" == context && "," == stream.current() ? state.stack.pop() :"@mediaType" == context && "(" == type ? state.stack.push("@mediaType(") :"@mediaType(" == context && ")" == type ? state.stack.pop() :"rule" != context && "block" != context || ":" != type ? "propertyValue" == context && ";" == type ? state.stack.pop() :"@import" == context && ";" == type && state.stack.pop() :state.stack.push("propertyValue");
return style;
},
indent:function(state, textAfter) {
var n = state.stack.length;
return /^\}/.test(textAfter) && (n -= "propertyValue" == state.stack[state.stack.length - 1] ? 2 :1), 
state.baseIndent + n * indentUnit;
},
electricChars:"}",
blockCommentStart:"/*",
blockCommentEnd:"*/"
};
}), function() {
function keySet(array) {
for (var keys = {}, i = 0; i < array.length; ++i) keys[array[i]] = !0;
return keys;
}
function tokenCComment(stream, state) {
for (var ch, maybeEnd = !1; null != (ch = stream.next()); ) {
if (maybeEnd && "/" == ch) {
state.tokenize = null;
break;
}
maybeEnd = "*" == ch;
}
return [ "comment", "comment" ];
}
var atMediaTypes = keySet([ "all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed" ]), atMediaFeatures = keySet([ "width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid" ]), propertyKeywords = keySet([ "align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid-cell", "grid-column", "grid-column-align", "grid-column-sizing", "grid-column-span", "grid-columns", "grid-flow", "grid-row", "grid-row-align", "grid-row-sizing", "grid-row-span", "grid-rows", "grid-template", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-shadow", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "kerning", "text-anchor", "writing-mode" ]), colorKeywords = keySet([ "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen" ]), valueKeywords = keySet([ "above", "absolute", "activeborder", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "auto", "avoid", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break-all", "break-word", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "compact", "condensed", "contain", "content", "content-box", "context-menu", "continuous", "copy", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "disc", "discard", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ew-resize", "expanded", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "justify", "kannada", "katakana", "katakana-iroha", "khmer", "landscape", "lao", "large", "larger", "left", "level", "lighter", "line-through", "linear", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "malayalam", "match", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "overlay", "overline", "padding", "padding-box", "painted", "paused", "persian", "plus-darker", "plus-lighter", "pointer", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radio", "read-only", "read-write", "read-write-plaintext-only", "relative", "repeat", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "round", "row-resize", "rtl", "run-in", "running", "s-resize", "sans-serif", "scroll", "scrollbar", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "single", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "x-large", "x-small", "xor", "xx-large", "xx-small" ]);
CodeMirror.defineMIME("text/css", {
atMediaTypes:atMediaTypes,
atMediaFeatures:atMediaFeatures,
propertyKeywords:propertyKeywords,
colorKeywords:colorKeywords,
valueKeywords:valueKeywords,
hooks:{
"<":function(stream, state) {
function tokenSGMLComment(stream, state) {
for (var ch, dashes = 0; null != (ch = stream.next()); ) {
if (dashes >= 2 && ">" == ch) {
state.tokenize = null;
break;
}
dashes = "-" == ch ? dashes + 1 :0;
}
return [ "comment", "comment" ];
}
return stream.eat("!") ? (state.tokenize = tokenSGMLComment, tokenSGMLComment(stream, state)) :void 0;
},
"/":function(stream, state) {
return stream.eat("*") ? (state.tokenize = tokenCComment, tokenCComment(stream, state)) :!1;
}
},
name:"css-base"
}), CodeMirror.defineMIME("text/x-scss", {
atMediaTypes:atMediaTypes,
atMediaFeatures:atMediaFeatures,
propertyKeywords:propertyKeywords,
colorKeywords:colorKeywords,
valueKeywords:valueKeywords,
allowNested:!0,
hooks:{
$:function(stream) {
return stream.match(/^[\w-]+/), ":" == stream.peek() ? [ "variable", "variable-definition" ] :[ "variable", "variable" ];
},
"/":function(stream, state) {
return stream.eat("/") ? (stream.skipToEnd(), [ "comment", "comment" ]) :stream.eat("*") ? (state.tokenize = tokenCComment, 
tokenCComment(stream, state)) :[ "operator", "operator" ];
},
"#":function(stream) {
return stream.eat("{") ? [ "operator", "interpolation" ] :(stream.eatWhile(/[\w\\\-]/), 
[ "atom", "hash" ]);
}
},
name:"css-base"
});
}(), CodeMirror.defineMode("xml", function(config, parserConfig) {
function inText(stream, state) {
function chain(parser) {
return state.tokenize = parser, parser(stream, state);
}
var ch = stream.next();
if ("<" == ch) {
if (stream.eat("!")) return stream.eat("[") ? stream.match("CDATA[") ? chain(inBlock("atom", "]]>")) :null :stream.match("--") ? chain(inBlock("comment", "-->")) :stream.match("DOCTYPE", !0, !0) ? (stream.eatWhile(/[\w\._\-]/), 
chain(doctype(1))) :null;
if (stream.eat("?")) return stream.eatWhile(/[\w\._\-]/), state.tokenize = inBlock("meta", "?>"), 
"meta";
var isClose = stream.eat("/");
tagName = "";
for (var c; c = stream.eat(/[^\s\u00a0=<>\"\'\/?]/); ) tagName += c;
return tagName ? (type = isClose ? "closeTag" :"openTag", state.tokenize = inTag, 
"tag") :"error";
}
if ("&" == ch) {
var ok;
return ok = stream.eat("#") ? stream.eat("x") ? stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";") :stream.eatWhile(/[\d]/) && stream.eat(";") :stream.eatWhile(/[\w\.\-:]/) && stream.eat(";"), 
ok ? "atom" :"error";
}
return stream.eatWhile(/[^&<]/), null;
}
function inTag(stream, state) {
var ch = stream.next();
return ">" == ch || "/" == ch && stream.eat(">") ? (state.tokenize = inText, type = ">" == ch ? "endTag" :"selfcloseTag", 
"tag") :"=" == ch ? (type = "equals", null) :/[\'\"]/.test(ch) ? (state.tokenize = inAttribute(ch), 
state.tokenize(stream, state)) :(stream.eatWhile(/[^\s\u00a0=<>\"\']/), "word");
}
function inAttribute(quote) {
return function(stream, state) {
for (;!stream.eol(); ) if (stream.next() == quote) {
state.tokenize = inTag;
break;
}
return "string";
};
}
function inBlock(style, terminator) {
return function(stream, state) {
for (;!stream.eol(); ) {
if (stream.match(terminator)) {
state.tokenize = inText;
break;
}
stream.next();
}
return style;
};
}
function doctype(depth) {
return function(stream, state) {
for (var ch; null != (ch = stream.next()); ) {
if ("<" == ch) return state.tokenize = doctype(depth + 1), state.tokenize(stream, state);
if (">" == ch) {
if (1 == depth) {
state.tokenize = inText;
break;
}
return state.tokenize = doctype(depth - 1), state.tokenize(stream, state);
}
}
return "meta";
};
}
function pass() {
for (var i = arguments.length - 1; i >= 0; i--) curState.cc.push(arguments[i]);
}
function cont() {
return pass.apply(null, arguments), !0;
}
function pushContext(tagName, startOfLine) {
var noIndent = Kludges.doNotIndent.hasOwnProperty(tagName) || curState.context && curState.context.noIndent;
curState.context = {
prev:curState.context,
tagName:tagName,
indent:curState.indented,
startOfLine:startOfLine,
noIndent:noIndent
};
}
function popContext() {
curState.context && (curState.context = curState.context.prev);
}
function element(type) {
if ("openTag" == type) return curState.tagName = tagName, curState.tagStart = curStream.column(), 
cont(attributes, endtag(curState.startOfLine));
if ("closeTag" == type) {
var err = !1;
return curState.context ? curState.context.tagName != tagName && (Kludges.implicitlyClosed.hasOwnProperty(curState.context.tagName.toLowerCase()) && popContext(), 
err = !curState.context || curState.context.tagName != tagName) :err = !0, err && (setStyle = "error"), 
cont(endclosetag(err));
}
return cont();
}
function endtag(startOfLine) {
return function(type) {
var tagName = curState.tagName;
return curState.tagName = curState.tagStart = null, "selfcloseTag" == type || "endTag" == type && Kludges.autoSelfClosers.hasOwnProperty(tagName.toLowerCase()) ? (maybePopContext(tagName.toLowerCase()), 
cont()) :"endTag" == type ? (maybePopContext(tagName.toLowerCase()), pushContext(tagName, startOfLine), 
cont()) :cont();
};
}
function endclosetag(err) {
return function(type) {
return err && (setStyle = "error"), "endTag" == type ? (popContext(), cont()) :(setStyle = "error", 
cont(arguments.callee));
};
}
function maybePopContext(nextTagName) {
for (var parentTagName; ;) {
if (!curState.context) return;
if (parentTagName = curState.context.tagName.toLowerCase(), !Kludges.contextGrabbers.hasOwnProperty(parentTagName) || !Kludges.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) return;
popContext();
}
}
function attributes(type) {
return "word" == type ? (setStyle = "attribute", cont(attribute, attributes)) :"endTag" == type || "selfcloseTag" == type ? pass() :(setStyle = "error", 
cont(attributes));
}
function attribute(type) {
return "equals" == type ? cont(attvalue, attributes) :(Kludges.allowMissing ? "word" == type && (setStyle = "attribute") :setStyle = "error", 
"endTag" == type || "selfcloseTag" == type ? pass() :cont());
}
function attvalue(type) {
return "string" == type ? cont(attvaluemaybe) :"word" == type && Kludges.allowUnquoted ? (setStyle = "string", 
cont()) :(setStyle = "error", "endTag" == type || "selfCloseTag" == type ? pass() :cont());
}
function attvaluemaybe(type) {
return "string" == type ? cont(attvaluemaybe) :pass();
}
var tagName, type, curState, curStream, setStyle, indentUnit = config.indentUnit, multilineTagIndentFactor = parserConfig.multilineTagIndentFactor || 1, Kludges = parserConfig.htmlMode ? {
autoSelfClosers:{
area:!0,
base:!0,
br:!0,
col:!0,
command:!0,
embed:!0,
frame:!0,
hr:!0,
img:!0,
input:!0,
keygen:!0,
link:!0,
meta:!0,
param:!0,
source:!0,
track:!0,
wbr:!0
},
implicitlyClosed:{
dd:!0,
li:!0,
optgroup:!0,
option:!0,
p:!0,
rp:!0,
rt:!0,
tbody:!0,
td:!0,
tfoot:!0,
th:!0,
tr:!0
},
contextGrabbers:{
dd:{
dd:!0,
dt:!0
},
dt:{
dd:!0,
dt:!0
},
li:{
li:!0
},
option:{
option:!0,
optgroup:!0
},
optgroup:{
optgroup:!0
},
p:{
address:!0,
article:!0,
aside:!0,
blockquote:!0,
dir:!0,
div:!0,
dl:!0,
fieldset:!0,
footer:!0,
form:!0,
h1:!0,
h2:!0,
h3:!0,
h4:!0,
h5:!0,
h6:!0,
header:!0,
hgroup:!0,
hr:!0,
menu:!0,
nav:!0,
ol:!0,
p:!0,
pre:!0,
section:!0,
table:!0,
ul:!0
},
rp:{
rp:!0,
rt:!0
},
rt:{
rp:!0,
rt:!0
},
tbody:{
tbody:!0,
tfoot:!0
},
td:{
td:!0,
th:!0
},
tfoot:{
tbody:!0
},
th:{
td:!0,
th:!0
},
thead:{
tbody:!0,
tfoot:!0
},
tr:{
tr:!0
}
},
doNotIndent:{
pre:!0
},
allowUnquoted:!0,
allowMissing:!0
} :{
autoSelfClosers:{},
implicitlyClosed:{},
contextGrabbers:{},
doNotIndent:{},
allowUnquoted:!1,
allowMissing:!1
}, alignCDATA = parserConfig.alignCDATA;
return {
startState:function() {
return {
tokenize:inText,
cc:[],
indented:0,
startOfLine:!0,
tagName:null,
tagStart:null,
context:null
};
},
token:function(stream, state) {
if (!state.tagName && stream.sol() && (state.startOfLine = !0, state.indented = stream.indentation()), 
stream.eatSpace()) return null;
setStyle = type = tagName = null;
var style = state.tokenize(stream, state);
if (state.type = type, (style || type) && "comment" != style) for (curState = state, 
curStream = stream; ;) {
var comb = state.cc.pop() || element;
if (comb(type || style)) break;
}
return state.startOfLine = !1, setStyle || style;
},
indent:function(state, textAfter, fullLine) {
var context = state.context;
if (state.tokenize != inTag && state.tokenize != inText || context && context.noIndent) return fullLine ? fullLine.match(/^(\s*)/)[0].length :0;
if (state.tagName) return state.tagStart + indentUnit * multilineTagIndentFactor;
if (alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
for (context && /^<\//.test(textAfter) && (context = context.prev); context && !context.startOfLine; ) context = context.prev;
return context ? context.indent + indentUnit :0;
},
electricChars:"/",
blockCommentStart:"<!--",
blockCommentEnd:"-->",
configuration:parserConfig.htmlMode ? "html" :"xml"
};
}), CodeMirror.defineMIME("text/xml", "xml"), CodeMirror.defineMIME("application/xml", "xml"), 
CodeMirror.mimeModes.hasOwnProperty("text/html") || CodeMirror.defineMIME("text/html", {
name:"xml",
htmlMode:!0
}), CodeMirror.defineMode("htmlmixed", function(config, parserConfig) {
function html(stream, state) {
var tagName = state.htmlState.tagName, style = htmlMode.token(stream, state.htmlState);
if ("script" == tagName && /\btag\b/.test(style) && ">" == stream.current()) {
var scriptType = stream.string.slice(Math.max(0, stream.pos - 100), stream.pos).match(/\btype\s*=\s*("[^"]+"|'[^']+'|\S+)[^<]*$/i);
scriptType = scriptType ? scriptType[1] :"", scriptType && /[\"\']/.test(scriptType.charAt(0)) && (scriptType = scriptType.slice(1, scriptType.length - 1));
for (var i = 0; i < scriptTypes.length; ++i) {
var tp = scriptTypes[i];
if ("string" == typeof tp.matches ? scriptType == tp.matches :tp.matches.test(scriptType)) {
tp.mode && (state.token = script, state.localMode = tp.mode, state.localState = tp.mode.startState && tp.mode.startState(htmlMode.indent(state.htmlState, "")));
break;
}
}
} else "style" == tagName && /\btag\b/.test(style) && ">" == stream.current() && (state.token = css, 
state.localMode = cssMode, state.localState = cssMode.startState(htmlMode.indent(state.htmlState, "")));
return style;
}
function maybeBackup(stream, pat, style) {
var m, cur = stream.current(), close = cur.search(pat);
return close > -1 ? stream.backUp(cur.length - close) :(m = cur.match(/<\/?$/)) && (stream.backUp(cur.length), 
stream.match(pat, !1) || stream.match(cur[0])), style;
}
function script(stream, state) {
return stream.match(/^<\/\s*script\s*>/i, !1) ? (state.token = html, state.localState = state.localMode = null, 
html(stream, state)) :maybeBackup(stream, /<\/\s*script\s*>/, state.localMode.token(stream, state.localState));
}
function css(stream, state) {
return stream.match(/^<\/\s*style\s*>/i, !1) ? (state.token = html, state.localState = state.localMode = null, 
html(stream, state)) :maybeBackup(stream, /<\/\s*style\s*>/, cssMode.token(stream, state.localState));
}
var htmlMode = CodeMirror.getMode(config, {
name:"xml",
htmlMode:!0
}), cssMode = CodeMirror.getMode(config, "css"), scriptTypes = [], scriptTypesConf = parserConfig && parserConfig.scriptTypes;
if (scriptTypes.push({
matches:/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i,
mode:CodeMirror.getMode(config, "javascript")
}), scriptTypesConf) for (var i = 0; i < scriptTypesConf.length; ++i) {
var conf = scriptTypesConf[i];
scriptTypes.push({
matches:conf.matches,
mode:conf.mode && CodeMirror.getMode(config, conf.mode)
});
}
return scriptTypes.push({
matches:/./,
mode:CodeMirror.getMode(config, "text/plain")
}), {
startState:function() {
var state = htmlMode.startState();
return {
token:html,
localMode:null,
localState:null,
htmlState:state
};
},
copyState:function(state) {
if (state.localState) var local = CodeMirror.copyState(state.localMode, state.localState);
return {
token:state.token,
localMode:state.localMode,
localState:local,
htmlState:CodeMirror.copyState(htmlMode, state.htmlState)
};
},
token:function(stream, state) {
return state.token(stream, state);
},
indent:function(state, textAfter) {
return !state.localMode || /^\s*<\//.test(textAfter) ? htmlMode.indent(state.htmlState, textAfter) :state.localMode.indent ? state.localMode.indent(state.localState, textAfter) :CodeMirror.Pass;
},
electricChars:"/{}:",
innerMode:function(state) {
return {
state:state.localState || state.htmlState,
mode:state.localMode || htmlMode
};
}
};
}, "xml", "javascript", "css"), CodeMirror.defineMIME("text/html", "htmlmixed"), 
CodeMirror.defineMode("commonlisp", function(config) {
function readSym(stream) {
for (var ch; ch = stream.next(); ) if ("\\" == ch) stream.next(); else if (!symbol.test(ch)) {
stream.backUp(1);
break;
}
return stream.current();
}
function base(stream, state) {
if (stream.eatSpace()) return type = "ws", null;
if (stream.match(numLiteral)) return "number";
var ch = stream.next();
if ("\\" == ch && (ch = stream.next()), '"' == ch) return (state.tokenize = inString)(stream, state);
if ("(" == ch) return type = "open", "bracket";
if (")" == ch || "]" == ch) return type = "close", "bracket";
if (";" == ch) return stream.skipToEnd(), type = "ws", "comment";
if (/['`,@]/.test(ch)) return null;
if ("|" == ch) return stream.skipTo("|") ? (stream.next(), "symbol") :(stream.skipToEnd(), 
"error");
if ("#" == ch) {
var ch = stream.next();
return "[" == ch ? (type = "open", "bracket") :/[+\-=\.']/.test(ch) ? null :/\d/.test(ch) && stream.match(/^\d*#/) ? null :"|" == ch ? (state.tokenize = inComment)(stream, state) :":" == ch ? (readSym(stream), 
"meta") :"error";
}
var name = readSym(stream);
return "." == name ? null :(type = "symbol", "nil" == name || "t" == name ? "atom" :":" == name.charAt(0) ? "keyword" :"&" == name.charAt(0) ? "variable-2" :"variable");
}
function inString(stream, state) {
for (var next, escaped = !1; next = stream.next(); ) {
if ('"' == next && !escaped) {
state.tokenize = base;
break;
}
escaped = !escaped && "\\" == next;
}
return "string";
}
function inComment(stream, state) {
for (var next, last; next = stream.next(); ) {
if ("#" == next && "|" == last) {
state.tokenize = base;
break;
}
last = next;
}
return type = "ws", "comment";
}
var type, assumeBody = /^with|^def|^do|^prog|case$|^cond$|bind$|when$|unless$/, numLiteral = /^(?:[+\-]?(?:\d+|\d*\.\d+)(?:[efd][+\-]?\d+)?|[+\-]?\d+(?:\/[+\-]?\d+)?|#b[+\-]?[01]+|#o[+\-]?[0-7]+|#x[+\-]?[\da-f]+)/, symbol = /[^\s'`,@()\[\]";]/;
return {
startState:function() {
return {
ctx:{
prev:null,
start:0,
indentTo:0
},
tokenize:base
};
},
token:function(stream, state) {
stream.sol() && "number" != typeof state.ctx.indentTo && (state.ctx.indentTo = state.ctx.start + 1), 
type = null;
var style = state.tokenize(stream, state);
return "ws" != type && (null == state.ctx.indentTo ? state.ctx.indentTo = "symbol" == type && assumeBody.test(stream.current()) ? state.ctx.start + config.indentUnit :"next" :"next" == state.ctx.indentTo && (state.ctx.indentTo = stream.column())), 
"open" == type ? state.ctx = {
prev:state.ctx,
start:stream.column(),
indentTo:null
} :"close" == type && (state.ctx = state.ctx.prev || state.ctx), style;
},
indent:function(state) {
var i = state.ctx.indentTo;
return "number" == typeof i ? i :state.ctx.start + 1;
},
lineComment:";;",
blockCommentStart:"#|",
blockCommentEnd:"|#"
};
}), CodeMirror.defineMIME("text/x-common-lisp", "commonlisp"), CodeMirror.defineMode("ocaml", function() {
function tokenBase(stream, state) {
var ch = stream.next();
if ('"' === ch) return state.tokenize = tokenString, state.tokenize(stream, state);
if ("(" === ch && stream.eat("*")) return state.commentLevel++, state.tokenize = tokenComment, 
state.tokenize(stream, state);
if ("~" === ch) return stream.eatWhile(/\w/), "variable-2";
if ("`" === ch) return stream.eatWhile(/\w/), "quote";
if (/\d/.test(ch)) return stream.eatWhile(/[\d]/), stream.eat(".") && stream.eatWhile(/[\d]/), 
"number";
if (/[+\-*&%=<>!?|]/.test(ch)) return "operator";
stream.eatWhile(/\w/);
var cur = stream.current();
return words[cur] || "variable";
}
function tokenString(stream, state) {
for (var next, end = !1, escaped = !1; null != (next = stream.next()); ) {
if ('"' === next && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" === next;
}
return end && !escaped && (state.tokenize = tokenBase), "string";
}
function tokenComment(stream, state) {
for (var prev, next; state.commentLevel > 0 && null != (next = stream.next()); ) "(" === prev && "*" === next && state.commentLevel++, 
"*" === prev && ")" === next && state.commentLevel--, prev = next;
return state.commentLevel <= 0 && (state.tokenize = tokenBase), "comment";
}
var words = {
"true":"atom",
"false":"atom",
let:"keyword",
rec:"keyword",
"in":"keyword",
of:"keyword",
and:"keyword",
succ:"keyword",
"if":"keyword",
then:"keyword",
"else":"keyword",
"for":"keyword",
to:"keyword",
"while":"keyword",
"do":"keyword",
done:"keyword",
fun:"keyword",
"function":"keyword",
val:"keyword",
type:"keyword",
mutable:"keyword",
match:"keyword",
"with":"keyword",
"try":"keyword",
raise:"keyword",
begin:"keyword",
end:"keyword",
open:"builtin",
trace:"builtin",
ignore:"builtin",
exit:"builtin",
print_string:"builtin",
print_endline:"builtin"
};
return {
startState:function() {
return {
tokenize:tokenBase,
commentLevel:0
};
},
token:function(stream, state) {
return stream.eatSpace() ? null :state.tokenize(stream, state);
},
blockCommentStart:"(*",
blockCommentEnd:"*)"
};
}), CodeMirror.defineMIME("text/x-ocaml", "ocaml"), CodeMirror.defineMode("pascal", function() {
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function tokenBase(stream, state) {
var ch = stream.next();
if ("#" == ch && state.startOfLine) return stream.skipToEnd(), "meta";
if ('"' == ch || "'" == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if ("(" == ch && stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), "number";
if ("/" == ch && stream.eat("/")) return stream.skipToEnd(), "comment";
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_]/);
var cur = stream.current();
return keywords.propertyIsEnumerable(cur) ? "keyword" :atoms.propertyIsEnumerable(cur) ? "atom" :"variable";
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return (end || !escaped) && (state.tokenize = null), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if (")" == ch && maybeEnd) {
state.tokenize = null;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
var keywords = words("and array begin case const div do downto else end file for forward integer boolean char function goto if in label mod nil not of or packed procedure program record repeat set string then to type until var while with"), atoms = {
"null":!0
}, isOperatorChar = /[+\-*&%=<>!?|\/]/;
return {
startState:function() {
return {
tokenize:null
};
},
token:function(stream, state) {
if (stream.eatSpace()) return null;
var style = (state.tokenize || tokenBase)(stream, state);
return "comment" == style || "meta" == style ? style :style;
},
electricChars:"{}"
};
}), CodeMirror.defineMIME("text/x-pascal", "pascal"), CodeMirror.defineMode("groovy", function(config) {
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function tokenBase(stream, state) {
var ch = stream.next();
if ('"' == ch || "'" == ch) return startString(ch, stream, state);
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return curPunc = ch, null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), stream.eat(/eE/) && (stream.eat(/\+\-/), 
stream.eatWhile(/\d/)), "number";
if ("/" == ch) {
if (stream.eat("*")) return state.tokenize.push(tokenComment), tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
if (expectExpression(state.lastToken)) return startString(ch, stream, state);
}
if ("-" == ch && stream.eat(">")) return curPunc = "->", null;
if (/[+\-*&%=<>!?|\/~]/.test(ch)) return stream.eatWhile(/[+\-*&%=<>|~]/), "operator";
if (stream.eatWhile(/[\w\$_]/), "@" == ch) return stream.eatWhile(/[\w\$_\.]/), 
"meta";
if ("." == state.lastToken) return "property";
if (stream.eat(":")) return curPunc = "proplabel", "property";
var cur = stream.current();
return atoms.propertyIsEnumerable(cur) ? "atom" :keywords.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"keyword") :"variable";
}
function startString(quote, stream, state) {
function t(stream, state) {
for (var next, escaped = !1, end = !tripleQuoted; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
if (!tripleQuoted) break;
if (stream.match(quote + quote)) {
end = !0;
break;
}
}
if ('"' == quote && "$" == next && !escaped && stream.eat("{")) return state.tokenize.push(tokenBaseUntilBrace()), 
"string";
escaped = !escaped && "\\" == next;
}
return end && state.tokenize.pop(), "string";
}
var tripleQuoted = !1;
if ("/" != quote && stream.eat(quote)) {
if (!stream.eat(quote)) return "string";
tripleQuoted = !0;
}
return state.tokenize.push(t), t(stream, state);
}
function tokenBaseUntilBrace() {
function t(stream, state) {
if ("}" == stream.peek()) {
if (depth--, 0 == depth) return state.tokenize.pop(), state.tokenize[state.tokenize.length - 1](stream, state);
} else "{" == stream.peek() && depth++;
return tokenBase(stream, state);
}
var depth = 1;
return t.isBase = !0, t;
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize.pop();
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function expectExpression(last) {
return !last || "operator" == last || "->" == last || /[\.\[\{\(,;:]/.test(last) || "newstatement" == last || "keyword" == last || "proplabel" == last;
}
function Context(indented, column, type, align, prev) {
this.indented = indented, this.column = column, this.type = type, this.align = align, 
this.prev = prev;
}
function pushContext(state, col, type) {
return state.context = new Context(state.indented, col, type, null, state.context);
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
var curPunc, keywords = words("abstract as assert boolean break byte case catch char class const continue def default do double else enum extends final finally float for goto if implements import in instanceof int interface long native new package private protected public return short static strictfp super switch synchronized threadsafe throw throws transient try void volatile while"), blockKeywords = words("catch class do else finally for if switch try while enum interface def"), atoms = words("null true false this");
return tokenBase.isBase = !0, {
startState:function(basecolumn) {
return {
tokenize:[ tokenBase ],
context:new Context((basecolumn || 0) - config.indentUnit, 0, "top", !1),
indented:0,
startOfLine:!0,
lastToken:null
};
},
token:function(stream, state) {
var ctx = state.context;
if (stream.sol() && (null == ctx.align && (ctx.align = !1), state.indented = stream.indentation(), 
state.startOfLine = !0, "statement" != ctx.type || expectExpression(state.lastToken) || (popContext(state), 
ctx = state.context)), stream.eatSpace()) return null;
curPunc = null;
var style = state.tokenize[state.tokenize.length - 1](stream, state);
if ("comment" == style) return style;
if (null == ctx.align && (ctx.align = !0), ";" != curPunc && ":" != curPunc || "statement" != ctx.type) if ("->" == curPunc && "statement" == ctx.type && "}" == ctx.prev.type) popContext(state), 
state.context.align = !1; else if ("{" == curPunc) pushContext(state, stream.column(), "}"); else if ("[" == curPunc) pushContext(state, stream.column(), "]"); else if ("(" == curPunc) pushContext(state, stream.column(), ")"); else if ("}" == curPunc) {
for (;"statement" == ctx.type; ) ctx = popContext(state);
for ("}" == ctx.type && (ctx = popContext(state)); "statement" == ctx.type; ) ctx = popContext(state);
} else curPunc == ctx.type ? popContext(state) :("}" == ctx.type || "top" == ctx.type || "statement" == ctx.type && "newstatement" == curPunc) && pushContext(state, stream.column(), "statement"); else popContext(state);
return state.startOfLine = !1, state.lastToken = curPunc || style, style;
},
indent:function(state, textAfter) {
if (!state.tokenize[state.tokenize.length - 1].isBase) return 0;
var firstChar = textAfter && textAfter.charAt(0), ctx = state.context;
"statement" != ctx.type || expectExpression(state.lastToken) || (ctx = ctx.prev);
var closing = firstChar == ctx.type;
return "statement" == ctx.type ? ctx.indented + ("{" == firstChar ? 0 :config.indentUnit) :ctx.align ? ctx.column + (closing ? 0 :1) :ctx.indented + (closing ? 0 :config.indentUnit);
},
electricChars:"{}"
};
}), CodeMirror.defineMIME("text/x-groovy", "groovy"), CodeMirror.defineMode("d", function(config, parserConfig) {
function tokenBase(stream, state) {
var ch = stream.next();
if (hooks[ch]) {
var result = hooks[ch](stream, state);
if (result !== !1) return result;
}
if ('"' == ch || "'" == ch || "`" == ch) return state.tokenize = tokenString(ch), 
state.tokenize(stream, state);
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return curPunc = ch, null;
if (/\d/.test(ch)) return stream.eatWhile(/[\w\.]/), "number";
if ("/" == ch) {
if (stream.eat("+")) return state.tokenize = tokenComment, tokenNestedComment(stream, state);
if (stream.eat("*")) return state.tokenize = tokenComment, tokenComment(stream, state);
if (stream.eat("/")) return stream.skipToEnd(), "comment";
}
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), "operator";
stream.eatWhile(/[\w\$_]/);
var cur = stream.current();
return keywords.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"keyword") :builtin.propertyIsEnumerable(cur) ? (blockKeywords.propertyIsEnumerable(cur) && (curPunc = "newstatement"), 
"builtin") :atoms.propertyIsEnumerable(cur) ? "atom" :"variable";
}
function tokenString(quote) {
return function(stream, state) {
for (var next, escaped = !1, end = !1; null != (next = stream.next()); ) {
if (next == quote && !escaped) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return (end || !escaped && !multiLineStrings) && (state.tokenize = null), "string";
};
}
function tokenComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = null;
break;
}
maybeEnd = "*" == ch;
}
return "comment";
}
function tokenNestedComment(stream, state) {
for (var ch, maybeEnd = !1; ch = stream.next(); ) {
if ("/" == ch && maybeEnd) {
state.tokenize = null;
break;
}
maybeEnd = "+" == ch;
}
return "comment";
}
function Context(indented, column, type, align, prev) {
this.indented = indented, this.column = column, this.type = type, this.align = align, 
this.prev = prev;
}
function pushContext(state, col, type) {
var indent = state.indented;
return state.context && "statement" == state.context.type && (indent = state.context.indented), 
state.context = new Context(indent, col, type, null, state.context);
}
function popContext(state) {
var t = state.context.type;
return (")" == t || "]" == t || "}" == t) && (state.indented = state.context.indented), 
state.context = state.context.prev;
}
var curPunc, indentUnit = config.indentUnit, statementIndentUnit = parserConfig.statementIndentUnit || indentUnit, keywords = parserConfig.keywords || {}, builtin = parserConfig.builtin || {}, blockKeywords = parserConfig.blockKeywords || {}, atoms = parserConfig.atoms || {}, hooks = parserConfig.hooks || {}, multiLineStrings = parserConfig.multiLineStrings, isOperatorChar = /[+\-*&%=<>!?|\/]/;
return {
startState:function(basecolumn) {
return {
tokenize:null,
context:new Context((basecolumn || 0) - indentUnit, 0, "top", !1),
indented:0,
startOfLine:!0
};
},
token:function(stream, state) {
var ctx = state.context;
if (stream.sol() && (null == ctx.align && (ctx.align = !1), state.indented = stream.indentation(), 
state.startOfLine = !0), stream.eatSpace()) return null;
curPunc = null;
var style = (state.tokenize || tokenBase)(stream, state);
if ("comment" == style || "meta" == style) return style;
if (null == ctx.align && (ctx.align = !0), ";" != curPunc && ":" != curPunc && "," != curPunc || "statement" != ctx.type) if ("{" == curPunc) pushContext(state, stream.column(), "}"); else if ("[" == curPunc) pushContext(state, stream.column(), "]"); else if ("(" == curPunc) pushContext(state, stream.column(), ")"); else if ("}" == curPunc) {
for (;"statement" == ctx.type; ) ctx = popContext(state);
for ("}" == ctx.type && (ctx = popContext(state)); "statement" == ctx.type; ) ctx = popContext(state);
} else curPunc == ctx.type ? popContext(state) :(("}" == ctx.type || "top" == ctx.type) && ";" != curPunc || "statement" == ctx.type && "newstatement" == curPunc) && pushContext(state, stream.column(), "statement"); else popContext(state);
return state.startOfLine = !1, style;
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase && null != state.tokenize) return CodeMirror.Pass;
var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
"statement" == ctx.type && "}" == firstChar && (ctx = ctx.prev);
var closing = firstChar == ctx.type;
return "statement" == ctx.type ? ctx.indented + ("{" == firstChar ? 0 :statementIndentUnit) :ctx.align ? ctx.column + (closing ? 0 :1) :ctx.indented + (closing ? 0 :indentUnit);
},
electricChars:"{}"
};
}), function() {
function words(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
var blockKeywords = "body catch class do else enum for foreach foreach_reverse if in interface mixin out scope struct switch try union unittest version while with";
CodeMirror.defineMIME("text/x-d", {
name:"d",
keywords:words("abstract alias align asm assert auto break case cast cdouble cent cfloat const continue debug default delegate delete deprecated export extern final finally function goto immutable import inout invariant is lazy macro module new nothrow override package pragma private protected public pure ref return shared short static super synchronized template this throw typedef typeid typeof volatile __FILE__ __LINE__ __gshared __traits __vector __parameters " + blockKeywords),
blockKeywords:words(blockKeywords),
builtin:words("bool byte char creal dchar double float idouble ifloat int ireal long real short ubyte ucent uint ulong ushort wchar wstring void size_t sizediff_t"),
atoms:words("exit failure success true false null"),
hooks:{
"@":function(stream) {
return stream.eatWhile(/[\w\$_]/), "meta";
}
}
});
}(), CodeMirror.newFoldFunction = function(rangeFinder, widget) {
if (null == widget && (widget = "↔"), "string" == typeof widget) {
var text = document.createTextNode(widget);
widget = document.createElement("span"), widget.appendChild(text), widget.className = "CodeMirror-foldmarker";
}
return function(cm, pos) {
"number" == typeof pos && (pos = CodeMirror.Pos(pos, 0));
var range = rangeFinder(cm, pos);
if (range) {
console.log(range);
for (var present = cm.findMarksAt(range.from), cleared = 0, i = 0; i < present.length; ++i) present[i].__isFold && (++cleared, 
present[i].clear());
if (!cleared) {
var myWidget = widget.cloneNode(!0);
CodeMirror.on(myWidget, "mousedown", function() {
myRange.clear();
});
var myRange = cm.markText(range.from, range.to, {
replacedWith:myWidget,
clearOnEnter:!0,
__isFold:!0
});
}
}
};
}, CodeMirror.mentionLastLine = function(cm, line, hideEnd, endLine) {
return endLine ? endLine :null;
}, CodeMirror.autoFold = function(cm, start) {
return editorMode = cm.doc.mode.name, foldType = window.lang_fold_mapping[editorMode], 
"indent" === foldType ? CodeMirror.indentRangeFinder(cm, start) :CodeMirror.braceRangeFinder(cm, start);
}, CodeMirror.braceRangeFinder = function(cm, start) {
for (var startChar, tokenType, line = start.line, lineText = cm.getLine(line), at = lineText.length; at > 0; ) {
var found = lineText.lastIndexOf("{", at), startToken = "{", endToken = "}";
if (found < start.ch) {
if (found = lineText.lastIndexOf("[", at), found < start.ch) break;
startToken = "[", endToken = "]";
}
if (tokenType = cm.getTokenAt(CodeMirror.Pos(line, found + 1)).type, !/^(comment|string)/.test(tokenType)) {
startChar = found;
break;
}
at = found - 1;
}
if (!(null == startChar || lineText.lastIndexOf(startToken) > startChar)) {
var end, endCh, count = 1, lastLine = cm.lineCount();
outer:for (var i = line + 1; lastLine > i; ++i) for (var text = cm.getLine(i), pos = 0; ;) {
var nextOpen = text.indexOf(startToken, pos), nextClose = text.indexOf(endToken, pos);
if (0 > nextOpen && (nextOpen = text.length), 0 > nextClose && (nextClose = text.length), 
pos = Math.min(nextOpen, nextClose), pos == text.length) break;
if (cm.getTokenAt(CodeMirror.Pos(i, pos + 1)).type == tokenType) if (pos == nextOpen) ++count; else if (!--count) {
end = i, endCh = pos;
break outer;
}
++pos;
}
if (null != end && end != line + 1) return {
from:CodeMirror.Pos(line, startChar + 1),
to:CodeMirror.Pos(end, endCh)
};
}
}, CodeMirror.indentRangeFinder = function(cm, start) {
for (var endLine, tabSize = cm.getOption("tabSize"), firstLine = cm.getLine(start.line), myIndent = CodeMirror.countColumn(firstLine, null, tabSize), i = start.line + 1, end = cm.lineCount(); end > i; ++i) {
var curLine = cm.getLine(i);
if (CodeMirror.countColumn(curLine, null, tabSize) <= myIndent && curLine.length > 0) {
endLine = i - 1;
break;
}
endLine = i;
}
if (endLine) {
for (;0 == cm.getLine(endLine).length; ) endLine--;
if (endLine != start.line) return result = {
from:CodeMirror.Pos(start.line, firstLine.length),
to:CodeMirror.Pos(endLine, cm.getLine(endLine).length)
};
}
}, CodeMirror.tagRangeFinder = function() {
var nameStartChar = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", nameChar = nameStartChar + "-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", xmlTagStart = new RegExp("<(/?)([" + nameStartChar + "][" + nameChar + "]*)", "g");
return function(cm, start) {
function nextLine() {
return line >= cm.lastLine() ? void 0 :(ch = 0, lineText = cm.getLine(++line), !0);
}
function toTagEnd() {
for (;;) {
var gt = lineText.indexOf(">", ch);
if (-1 == gt) {
if (nextLine()) continue;
return;
}
var lastSlash = lineText.lastIndexOf("/", gt), selfClose = lastSlash > -1 && /^\s*$/.test(lineText.slice(lastSlash + 1, gt));
return ch = gt + 1, selfClose ? "selfClose" :"regular";
}
}
function toNextTag() {
for (;;) {
xmlTagStart.lastIndex = ch;
var found = xmlTagStart.exec(lineText);
if (!found) {
if (nextLine()) continue;
return;
}
return ch = found.index + found[0].length, found;
}
}
for (var startCh, line = start.line, ch = start.ch, lineText = cm.getLine(line), stack = []; ;) {
var end, openTag = toNextTag();
if (!openTag || line != start.line || !(end = toTagEnd())) return;
if (!openTag[1] && "selfClose" != end) {
stack.push(openTag[2]), startCh = ch;
break;
}
}
for (;;) {
var end, next = toNextTag(), tagLine = line, tagCh = ch - (next ? next[0].length :0);
if (!next || !(end = toTagEnd())) return;
if ("selfClose" != end) if (next[1]) {
for (var i = stack.length - 1; i >= 0; --i) if (stack[i] == next[2]) {
stack.length = i;
break;
}
if (!stack.length) return {
from:CodeMirror.Pos(start.line, startCh),
to:CodeMirror.Pos(tagLine, tagCh)
};
} else stack.push(next[2]);
}
};
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
keys:[ "C-[" ],
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
return start.ch += inclusive ? 1 :0, end.ch += inclusive ? 0 :1, {
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
escapeNextChar || "/" != c || slashes.push(i), escapeNextChar = "\\" == c;
}
return slashes;
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
smartCase && (ignoreCase = /^[^A-Z]*$/.test(regexPart));
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
isUpperCase(vimKey) && ("Shift" == modifier ? modifier = null :vimKey = vimKey.toLowerCase()), 
modifier && (vimKey = modifier.charAt(0) + "-" + vimKey);
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
!modifier && inArray(key, specialSymbols) && (key = "'" + key + "'");
var vimKey = cmKeyToVimKey(keys[i], modifier), cmKey = modifier ? modifier + "-" + key :key;
cmToVimKeymap[cmKey] = keyMapper(vimKey);
}
}
var cmToVimKeymap = {
nofallthrough:!0,
style:"fat-cursor"
};
return bindKeys(upperCaseAlphabet), bindKeys(upperCaseAlphabet, "Shift"), bindKeys(upperCaseAlphabet, "Ctrl"), 
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
map:function(lhs, rhs) {
exCommandDispatcher.map(lhs, rhs);
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
for (var context = vim.visualMode ? "visual" :"normal", bestMatch = matchedCommands[0], i = 0; i < matchedCommands.length; i++) if (matchedCommands[i].context == context) {
bestMatch = matchedCommands[i];
break;
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
curEnd) :cm.getCursor();
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
var character = motionArgs.selectedCharacter, inclusive = !motionArgs.textObjectInner;
if (!textObjects[character]) return null;
var tmp = textObjects[character](cm, inclusive), start = tmp.start, end = tmp.end;
return [ start, end ];
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
}, textObjects = {
w:function(cm, inclusive) {
return expandWordUnderCursor(cm, inclusive, !0, !1);
},
W:function(cm, inclusive) {
return expandWordUnderCursor(cm, inclusive, !0, !0);
},
"{":function(cm, inclusive) {
return selectCompanionObject(cm, "}", inclusive);
},
"(":function(cm, inclusive) {
return selectCompanionObject(cm, ")", inclusive);
},
"[":function(cm, inclusive) {
return selectCompanionObject(cm, "]", inclusive);
},
"'":function(cm, inclusive) {
return findBeginningAndEnd(cm, "'", inclusive);
},
'"':function(cm, inclusive) {
return findBeginningAndEnd(cm, '"', inclusive);
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
name:"map",
type:"builtIn"
}, {
name:"write",
shortName:"w",
type:"builtIn"
}, {
name:"undo",
shortName:"u",
type:"builtIn"
}, {
name:"redo",
shortName:"red",
type:"builtIn"
}, {
name:"sort",
shortName:"sor",
type:"builtIn"
}, {
name:"substitute",
shortName:"s",
type:"builtIn"
}, {
name:"nohlsearch",
shortName:"noh",
type:"builtIn"
}, {
name:"delmarks",
shortName:"delm",
type:"builtin"
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
map:function(lhs, rhs) {
if (":" != lhs && ":" == lhs.charAt(0)) {
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
} else ":" != rhs && ":" == rhs.charAt(0) ? defaultKeymap.unshift({
keys:parseKeyString(lhs),
type:"keyToEx",
exArgs:{
input:rhs.substring(1)
}
}) :defaultKeymap.unshift({
keys:parseKeyString(lhs),
type:"keyToKey",
toKeys:parseKeyString(rhs)
});
}
};
var exCommands = {
map:function(cm, params) {
var mapArgs = params.args;
return !mapArgs || mapArgs.length < 2 ? (cm && showConfirm(cm, "Invalid mapping: " + params.input), 
void 0) :(exCommandDispatcher.map(mapArgs[0], mapArgs[1], cm), void 0);
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
if (slashes[1] && (replacePart = argString.substring(slashes[1] + 1, slashes[2])), 
slashes[2]) {
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
addToRing(cm.getSelection()), cm.setExtending(!1), cm.setCursor(cm.getCursor());
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
"Ctrl-G":"clearSearch",
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
var self = this, mode = CodeMirror.innerMode(self.getMode(), self.getTokenAt(from).state).mode, commentString = options.lineComment || mode.lineComment;
if (!commentString) return (options.blockCommentStart || mode.blockCommentStart) && (options.fullLines = !0, 
self.blockComment(from, to, options)), void 0;
var firstLine = self.getLine(from.line);
if (null != firstLine) {
var end = Math.min(0 != to.ch || to.line == from.line ? to.line + 1 :to.line, self.lastLine() + 1), pad = null == options.padding ? " " :options.padding, blankLines = options.commentBlankLines;
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
var self = this, mode = CodeMirror.innerMode(self.getMode(), self.getTokenAt(from).state).mode, startString = options.blockCommentStart || mode.blockCommentStart, endString = options.blockCommentEnd || mode.blockCommentEnd;
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
var self = this, mode = CodeMirror.innerMode(self.getMode(), self.getTokenAt(from).state).mode, end = Math.min(to.line, self.lastLine()), start = Math.min(from.line, end), lineString = options.lineComment || mode.lineComment, lines = [], pad = null == options.padding ? " " :options.padding;
lineComment:for (;lineString; ) {
for (var i = start; end >= i; ++i) {
var line = self.getLine(i), found = line.indexOf(lineString);
if (-1 == found && (i != end || i == start) && nonWS.test(line)) break lineComment;
if (i != start && nonWS.test(line.slice(0, found))) break lineComment;
lines.push(line);
}
return self.operation(function() {
for (var i = start; end >= i; ++i) {
var line = lines[i - start], pos = line.indexOf(lineString), endPos = pos + lineString.length;
0 > pos || (line.slice(endPos, endPos + pad.length) == pad && (endPos += pad.length), 
self.replaceRange("", Pos(i, pos), Pos(i, endPos)));
}
}), !0;
}
var startString = options.blockCommentStart || mode.blockCommentStart, endString = options.blockCommentEnd || mode.blockCommentEnd;
if (!startString || !endString) return !1;
var lead = options.blockCommentLead || mode.blockCommentLead, startLine = self.getLine(start), endLine = end == start ? startLine :self.getLine(end), open = startLine.indexOf(startString), close = endLine.lastIndexOf(endString);
return -1 == close && start != end && (endLine = self.getLine(--end), close = endLine.lastIndexOf(endString)), 
-1 == open || -1 == close ? !1 :(self.operation(function() {
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
}), !0);
});
}(), function() {
function buildKeymap(pairs) {
for (var map = {
name:"autoCloseBrackets",
Backspace:function(cm) {
if (cm.somethingSelected()) return CodeMirror.Pass;
var cur = cm.getCursor(), line = cm.getLine(cur.line);
return cur.ch && cur.ch < line.length && pairs.indexOf(line.slice(cur.ch - 1, cur.ch + 1)) % 2 == 0 ? (cm.replaceRange("", CodeMirror.Pos(cur.line, cur.ch - 1), CodeMirror.Pos(cur.line, cur.ch + 1)), 
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
if ("'" == left && "comment" == cm.getTokenAt(cm.getCursor()).type) return CodeMirror.Pass;
if (cm.somethingSelected()) return surround(cm);
if (left != right || maybeOverwrite(cm) == CodeMirror.Pass) {
var cur = cm.getCursor(), ahead = CodeMirror.Pos(cur.line, cur.ch + 1), line = cm.getLine(cur.line), nextChar = line.charAt(cur.ch);
return line.length == cur.ch || closingBrackets.indexOf(nextChar) >= 0 || SPACE_CHAR_REGEX.test(nextChar) ? (cm.replaceSelection(left + right, {
head:ahead,
anchor:ahead
}), void 0) :CodeMirror.Pass;
}
}, left != right && (map["'" + right + "'"] = maybeOverwrite);
})(pairs.charAt(i), pairs.charAt(i + 1));
return map;
}
var DEFAULT_BRACKETS = "()[]{}''\"\"", SPACE_CHAR_REGEX = /\s/;
CodeMirror.defineOption("autoCloseBrackets", !1, function(cm, val, old) {
var wasOn = old && old != CodeMirror.Init;
val && !wasOn ? cm.addKeyMap(buildKeymap("string" == typeof val ? val :DEFAULT_BRACKETS)) :!val && wasOn && cm.removeKeyMap("autoCloseBrackets");
});
}(), function() {
function findMatchingBracket(cm) {
function scan(line, lineNo, start) {
if (line.text) {
var pos = forward ? 0 :line.text.length - 1, end = forward ? line.text.length :-1;
if (line.text.length > maxScanLen) return null;
var checkTokenStyles = line.text.length < 1e3;
for (null != start && (pos = start + d); pos != end; pos += d) {
var ch = line.text.charAt(pos);
if (re.test(ch) && (!checkTokenStyles || cm.getTokenAt(Pos(lineNo, pos + 1)).type == style)) {
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
var maxScanLen = cm.state._matchBrackets.maxScanLineLength || 1e4, cur = cm.getCursor(), line = cm.getLineHandle(cur.line), pos = cur.ch - 1, match = pos >= 0 && matching[line.text.charAt(pos)] || matching[line.text.charAt(++pos)];
if (!match) return null;
for (var found, forward = ">" == match.charAt(1), d = forward ? 1 :-1, style = cm.getTokenAt(Pos(cur.line, pos + 1)).type, stack = [ line.text.charAt(pos) ], re = /[(){}[\]]/, i = cur.line, e = forward ? Math.min(i + 100, cm.lineCount()) :Math.max(-1, i - 100); i != e && !(found = i == cur.line ? scan(line, i, pos) :scan(cm.getLineHandle(i), i)); i += d) ;
return {
from:Pos(cur.line, pos),
to:found && Pos(i, found.pos),
match:found && found.match
};
}
function matchBrackets(cm, autoclear) {
var maxHighlightLen = cm.state._matchBrackets.maxHighlightLineLength || 1e3, found = findMatchingBracket(cm);
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
old && old != CodeMirror.Init && cm.off("cursorActivity", doMatchBrackets), val && (cm.state._matchBrackets = "object" == typeof val ? val :{}, 
cm.on("cursorActivity", doMatchBrackets));
}), CodeMirror.defineExtension("matchBrackets", function() {
matchBrackets(this, !0);
}), CodeMirror.defineExtension("findMatchingBracket", function() {
return findMatchingBracket(this);
});
}(), function() {
CodeMirror.commands.blockIndent = function(cm, direction) {
var from = cm.getCursor("start"), to = cm.getCursor("end");
if (from == to) cm.indentLine(from.line, direction); else for (var i = from.line; i <= to.line; i++) cm.indentLine(i, direction);
};
}();