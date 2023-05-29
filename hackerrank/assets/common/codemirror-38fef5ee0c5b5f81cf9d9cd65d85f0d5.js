// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
if ("object" == typeof exports && "object" == typeof module) module.exports = mod(); else {
if ("function" == typeof define && define.amd) return define([], mod);
this.CodeMirror = mod();
}
}(function() {
"use strict";
function CodeMirror(place, options) {
if (!(this instanceof CodeMirror)) return new CodeMirror(place, options);
this.options = options = options || {}, copyObj(defaults, options, !1), setGuttersForLineNumbers(options);
var doc = options.value;
"string" == typeof doc && (doc = new Doc(doc, options.mode)), this.doc = doc;
var display = this.display = new Display(place, doc);
display.wrapper.CodeMirror = this, updateGutters(this), themeChanged(this), options.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), 
options.autofocus && !mobile && focusInput(this), this.state = {
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
}, ie && 11 > ie_version && setTimeout(bind(resetInput, this, !0), 20), registerEventHandlers(this), 
ensureGlobalHandlers();
var cm = this;
runInOp(this, function() {
cm.curOp.forceUpdate = !0, attachDoc(cm, doc), options.autofocus && !mobile || activeElt() == display.input ? setTimeout(bind(onFocus, cm), 20) :onBlur(cm);
for (var opt in optionHandlers) optionHandlers.hasOwnProperty(opt) && optionHandlers[opt](cm, options[opt], Init);
maybeUpdateLineNumberWidth(cm);
for (var i = 0; i < initHooks.length; ++i) initHooks[i](cm);
});
}
function Display(place, doc) {
var d = this, input = d.input = elt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
webkit ? input.style.width = "1000px" :input.setAttribute("wrap", "off"), ios && (input.style.border = "1px solid black"), 
input.setAttribute("autocorrect", "off"), input.setAttribute("autocapitalize", "off"), 
input.setAttribute("spellcheck", "false"), d.inputDiv = elt("div", [ input ], null, "overflow: hidden; position: relative; width: 3px; height: 0px;"), 
d.scrollbarH = elt("div", [ elt("div", null, null, "height: 100%; min-height: 1px") ], "CodeMirror-hscrollbar"), 
d.scrollbarV = elt("div", [ elt("div", null, null, "min-width: 1px") ], "CodeMirror-vscrollbar"), 
d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler"), d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler"), 
d.lineDiv = elt("div", null, "CodeMirror-code"), d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1"), 
d.cursorDiv = elt("div", null, "CodeMirror-cursors"), d.measure = elt("div", null, "CodeMirror-measure"), 
d.lineMeasure = elt("div", null, "CodeMirror-measure"), d.lineSpace = elt("div", [ d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv ], null, "position: relative; outline: none"), 
d.mover = elt("div", [ elt("div", [ d.lineSpace ], "CodeMirror-lines") ], null, "position: relative"), 
d.sizer = elt("div", [ d.mover ], "CodeMirror-sizer"), d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerCutOff + "px; width: 1px;"), 
d.gutters = elt("div", null, "CodeMirror-gutters"), d.lineGutter = null, d.scroller = elt("div", [ d.sizer, d.heightForcer, d.gutters ], "CodeMirror-scroll"), 
d.scroller.setAttribute("tabIndex", "-1"), d.wrapper = elt("div", [ d.inputDiv, d.scrollbarH, d.scrollbarV, d.scrollbarFiller, d.gutterFiller, d.scroller ], "CodeMirror"), 
ie && 8 > ie_version && (d.gutters.style.zIndex = -1, d.scroller.style.paddingRight = 0), 
ios && (input.style.width = "0px"), webkit || (d.scroller.draggable = !0), khtml && (d.inputDiv.style.height = "1px", 
d.inputDiv.style.position = "absolute"), ie && 8 > ie_version && (d.scrollbarH.style.minHeight = d.scrollbarV.style.minWidth = "18px"), 
place.appendChild ? place.appendChild(d.wrapper) :place(d.wrapper), d.viewFrom = d.viewTo = doc.first, 
d.view = [], d.externalMeasured = null, d.viewOffset = 0, d.lastSizeC = 0, d.updateLineNumbers = null, 
d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null, d.prevInput = "", 
d.alignWidgets = !1, d.pollingFast = !1, d.poll = new Delayed(), d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null, 
d.inaccurateSelection = !1, d.maxLine = null, d.maxLineLength = 0, d.maxLineChanged = !1, 
d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null, d.shift = !1, d.selForContextMenu = null;
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
cm.options.lineWrapping ? (addClass(cm.display.wrapper, "CodeMirror-wrap"), cm.display.sizer.style.minWidth = "") :(rmClass(cm.display.wrapper, "CodeMirror-wrap"), 
findMaxLine(cm)), estimateLineHeights(cm), regChange(cm), clearCaches(cm), setTimeout(function() {
updateScrollbars(cm);
}, 100);
}
function estimateHeight(cm) {
var th = textHeight(cm.display), wrapping = cm.options.lineWrapping, perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
return function(line) {
if (lineIsHidden(cm.doc, line)) return 0;
var widgetsHeight = 0;
if (line.widgets) for (var i = 0; i < line.widgets.length; i++) line.widgets[i].height && (widgetsHeight += line.widgets[i].height);
return wrapping ? widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th :widgetsHeight + th;
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
gutters.style.display = i ? "" :"none", updateGutterSpace(cm);
}
function updateGutterSpace(cm) {
var width = cm.display.gutters.offsetWidth;
cm.display.sizer.style.marginLeft = width + "px", cm.display.scrollbarH.style.left = cm.options.fixedGutter ? width + "px" :0;
}
function lineLength(line) {
if (0 == line.height) return 0;
for (var merged, len = line.text.length, cur = line; merged = collapsedSpanAtStart(cur); ) {
var found = merged.find(0, !0);
cur = found.from.line, len += found.from.ch - found.to.ch;
}
for (cur = line; merged = collapsedSpanAtEnd(cur); ) {
var found = merged.find(0, !0);
len -= cur.text.length - found.from.ch, cur = found.to.line, len += cur.text.length - found.to.ch;
}
return len;
}
function findMaxLine(cm) {
var d = cm.display, doc = cm.doc;
d.maxLine = getLine(doc, doc.first), d.maxLineLength = lineLength(d.maxLine), d.maxLineChanged = !0, 
doc.iter(function(line) {
var len = lineLength(line);
len > d.maxLineLength && (d.maxLineLength = len, d.maxLine = line);
});
}
function setGuttersForLineNumbers(options) {
var found = indexOf(options.gutters, "CodeMirror-linenumbers");
-1 == found && options.lineNumbers ? options.gutters = options.gutters.concat([ "CodeMirror-linenumbers" ]) :found > -1 && !options.lineNumbers && (options.gutters = options.gutters.slice(0), 
options.gutters.splice(found, 1));
}
function hScrollbarTakesSpace(cm) {
return cm.display.scroller.clientHeight - cm.display.wrapper.clientHeight < scrollerCutOff - 3;
}
function measureForScrollbars(cm) {
var scroll = cm.display.scroller;
return {
clientHeight:scroll.clientHeight,
barHeight:cm.display.scrollbarV.clientHeight,
scrollWidth:scroll.scrollWidth,
clientWidth:scroll.clientWidth,
hScrollbarTakesSpace:hScrollbarTakesSpace(cm),
barWidth:cm.display.scrollbarH.clientWidth,
docHeight:Math.round(cm.doc.height + paddingVert(cm.display))
};
}
function updateScrollbars(cm, measure) {
measure || (measure = measureForScrollbars(cm));
var d = cm.display, sWidth = scrollbarWidth(d.measure), scrollHeight = measure.docHeight + scrollerCutOff, needsH = measure.scrollWidth > measure.clientWidth;
needsH && measure.scrollWidth <= measure.clientWidth + 1 && sWidth > 0 && !measure.hScrollbarTakesSpace && (needsH = !1);
var needsV = scrollHeight > measure.clientHeight;
if (needsV ? (d.scrollbarV.style.display = "block", d.scrollbarV.style.bottom = needsH ? sWidth + "px" :"0", 
d.scrollbarV.firstChild.style.height = Math.max(0, scrollHeight - measure.clientHeight + (measure.barHeight || d.scrollbarV.clientHeight)) + "px") :(d.scrollbarV.style.display = "", 
d.scrollbarV.firstChild.style.height = "0"), needsH ? (d.scrollbarH.style.display = "block", 
d.scrollbarH.style.right = needsV ? sWidth + "px" :"0", d.scrollbarH.firstChild.style.width = measure.scrollWidth - measure.clientWidth + (measure.barWidth || d.scrollbarH.clientWidth) + "px") :(d.scrollbarH.style.display = "", 
d.scrollbarH.firstChild.style.width = "0"), needsH && needsV ? (d.scrollbarFiller.style.display = "block", 
d.scrollbarFiller.style.height = d.scrollbarFiller.style.width = sWidth + "px") :d.scrollbarFiller.style.display = "", 
needsH && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter ? (d.gutterFiller.style.display = "block", 
d.gutterFiller.style.height = sWidth + "px", d.gutterFiller.style.width = d.gutters.offsetWidth + "px") :d.gutterFiller.style.display = "", 
!cm.state.checkedOverlayScrollbar && measure.clientHeight > 0) {
if (0 === sWidth) {
var w = mac && !mac_geMountainLion ? "12px" :"18px";
d.scrollbarV.style.minWidth = d.scrollbarH.style.minHeight = w;
var barMouseDown = function(e) {
e_target(e) != d.scrollbarV && e_target(e) != d.scrollbarH && operation(cm, onMouseDown)(e);
};
on(d.scrollbarV, "mousedown", barMouseDown), on(d.scrollbarH, "mousedown", barMouseDown);
}
cm.state.checkedOverlayScrollbar = !0;
}
}
function visibleLines(display, doc, viewport) {
var top = viewport && null != viewport.top ? Math.max(0, viewport.top) :display.scroller.scrollTop;
top = Math.floor(top - paddingTop(display));
var bottom = viewport && null != viewport.bottom ? viewport.bottom :top + display.wrapper.clientHeight, from = lineAtHeight(doc, top), to = lineAtHeight(doc, bottom);
if (viewport && viewport.ensure) {
var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
if (from > ensureFrom) return {
from:ensureFrom,
to:lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight)
};
if (Math.min(ensureTo, doc.lastLine()) >= to) return {
from:lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight),
to:ensureTo
};
}
return {
from:from,
to:Math.max(to, from + 1)
};
}
function alignHorizontally(cm) {
var display = cm.display, view = display.view;
if (display.alignWidgets || display.gutters.firstChild && cm.options.fixedGutter) {
for (var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft, gutterW = display.gutters.offsetWidth, left = comp + "px", i = 0; i < view.length; i++) if (!view[i].hidden) {
cm.options.fixedGutter && view[i].gutter && (view[i].gutter.style.left = left);
var align = view[i].alignable;
if (align) for (var j = 0; j < align.length; j++) align[j].style.left = left;
}
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
display.lineGutter.style.width = display.lineNumWidth + "px", updateGutterSpace(cm), 
!0;
}
return !1;
}
function lineNumberFor(options, i) {
return String(options.lineNumberFormatter(i + options.firstLineNumber));
}
function compensateForHScroll(display) {
return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
}
function DisplayUpdate(cm, viewport, force) {
var display = cm.display;
this.viewport = viewport, this.visible = visibleLines(display, cm.doc, viewport), 
this.editorIsHidden = !display.wrapper.offsetWidth, this.wrapperHeight = display.wrapper.clientHeight, 
this.oldViewFrom = display.viewFrom, this.oldViewTo = display.viewTo, this.oldScrollerWidth = display.scroller.clientWidth, 
this.force = force, this.dims = getDimensions(cm);
}
function updateDisplayIfNeeded(cm, update) {
var display = cm.display, doc = cm.doc;
if (update.editorIsHidden) return resetView(cm), !1;
if (!update.force && update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo && (null == display.updateLineNumbers || display.updateLineNumbers >= display.viewTo) && 0 == countDirtyView(cm)) return !1;
maybeUpdateLineNumberWidth(cm) && (resetView(cm), update.dims = getDimensions(cm));
var end = doc.first + doc.size, from = Math.max(update.visible.from - cm.options.viewportMargin, doc.first), to = Math.min(end, update.visible.to + cm.options.viewportMargin);
display.viewFrom < from && from - display.viewFrom < 20 && (from = Math.max(doc.first, display.viewFrom)), 
display.viewTo > to && display.viewTo - to < 20 && (to = Math.min(end, display.viewTo)), 
sawCollapsedSpans && (from = visualLineNo(cm.doc, from), to = visualLineEndNo(cm.doc, to));
var different = from != display.viewFrom || to != display.viewTo || display.lastSizeC != update.wrapperHeight;
adjustView(cm, from, to), display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom)), 
cm.display.mover.style.top = display.viewOffset + "px";
var toUpdate = countDirtyView(cm);
if (!different && 0 == toUpdate && !update.force && (null == display.updateLineNumbers || display.updateLineNumbers >= display.viewTo)) return !1;
var focused = activeElt();
return toUpdate > 4 && (display.lineDiv.style.display = "none"), patchDisplay(cm, display.updateLineNumbers, update.dims), 
toUpdate > 4 && (display.lineDiv.style.display = ""), focused && activeElt() != focused && focused.offsetHeight && focused.focus(), 
removeChildren(display.cursorDiv), removeChildren(display.selectionDiv), different && (display.lastSizeC = update.wrapperHeight, 
startWorker(cm, 400)), display.updateLineNumbers = null, !0;
}
function postUpdateDisplay(cm, update) {
for (var force = update.force, viewport = update.viewport, first = !0; ;first = !1) {
if (first && cm.options.lineWrapping && update.oldScrollerWidth != cm.display.scroller.clientWidth) force = !0; else if (force = !1, 
viewport && null != viewport.top && (viewport = {
top:Math.min(cm.doc.height + paddingVert(cm.display) - scrollerCutOff - cm.display.scroller.clientHeight, viewport.top)
}), update.visible = visibleLines(cm.display, cm.doc, viewport), update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo) break;
if (!updateDisplayIfNeeded(cm, update)) break;
updateHeightsInViewport(cm);
var barMeasure = measureForScrollbars(cm);
updateSelection(cm), setDocumentHeight(cm, barMeasure), updateScrollbars(cm, barMeasure);
}
signalLater(cm, "update", cm), (cm.display.viewFrom != update.oldViewFrom || cm.display.viewTo != update.oldViewTo) && signalLater(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
}
function updateDisplaySimple(cm, viewport) {
var update = new DisplayUpdate(cm, viewport);
if (updateDisplayIfNeeded(cm, update)) {
postUpdateDisplay(cm, update);
var barMeasure = measureForScrollbars(cm);
updateSelection(cm), setDocumentHeight(cm, barMeasure), updateScrollbars(cm, barMeasure);
}
}
function setDocumentHeight(cm, measure) {
cm.display.sizer.style.minHeight = cm.display.heightForcer.style.top = measure.docHeight + "px", 
cm.display.gutters.style.height = Math.max(measure.docHeight, measure.clientHeight - scrollerCutOff) + "px";
}
function checkForWebkitWidthBug(cm, measure) {
cm.display.sizer.offsetWidth + cm.display.gutters.offsetWidth < cm.display.scroller.clientWidth - 1 && (cm.display.sizer.style.minHeight = cm.display.heightForcer.style.top = "0px", 
cm.display.gutters.style.height = measure.docHeight + "px");
}
function updateHeightsInViewport(cm) {
for (var display = cm.display, prevBottom = display.lineDiv.offsetTop, i = 0; i < display.view.length; i++) {
var height, cur = display.view[i];
if (!cur.hidden) {
if (ie && 8 > ie_version) {
var bot = cur.node.offsetTop + cur.node.offsetHeight;
height = bot - prevBottom, prevBottom = bot;
} else {
var box = cur.node.getBoundingClientRect();
height = box.bottom - box.top;
}
var diff = cur.line.height - height;
if (2 > height && (height = textHeight(display)), (diff > .001 || -.001 > diff) && (updateLineHeight(cur.line, height), 
updateWidgetHeight(cur.line), cur.rest)) for (var j = 0; j < cur.rest.length; j++) updateWidgetHeight(cur.rest[j]);
}
}
}
function updateWidgetHeight(line) {
if (line.widgets) for (var i = 0; i < line.widgets.length; ++i) line.widgets[i].height = line.widgets[i].node.offsetHeight;
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
function patchDisplay(cm, updateNumbersFrom, dims) {
function rm(node) {
var next = node.nextSibling;
return webkit && mac && cm.display.currentWheelTarget == node ? node.style.display = "none" :node.parentNode.removeChild(node), 
next;
}
for (var display = cm.display, lineNumbers = cm.options.lineNumbers, container = display.lineDiv, cur = container.firstChild, view = display.view, lineN = display.viewFrom, i = 0; i < view.length; i++) {
var lineView = view[i];
if (lineView.hidden) ; else if (lineView.node) {
for (;cur != lineView.node; ) cur = rm(cur);
var updateNumber = lineNumbers && null != updateNumbersFrom && lineN >= updateNumbersFrom && lineView.lineNumber;
lineView.changes && (indexOf(lineView.changes, "gutter") > -1 && (updateNumber = !1), 
updateLineForChanges(cm, lineView, lineN, dims)), updateNumber && (removeChildren(lineView.lineNumber), 
lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)))), 
cur = lineView.node.nextSibling;
} else {
var node = buildLineElement(cm, lineView, lineN, dims);
container.insertBefore(node, cur);
}
lineN += lineView.size;
}
for (;cur; ) cur = rm(cur);
}
function updateLineForChanges(cm, lineView, lineN, dims) {
for (var j = 0; j < lineView.changes.length; j++) {
var type = lineView.changes[j];
"text" == type ? updateLineText(cm, lineView) :"gutter" == type ? updateLineGutter(cm, lineView, lineN, dims) :"class" == type ? updateLineClasses(lineView) :"widget" == type && updateLineWidgets(lineView, dims);
}
lineView.changes = null;
}
function ensureLineWrapped(lineView) {
return lineView.node == lineView.text && (lineView.node = elt("div", null, null, "position: relative"), 
lineView.text.parentNode && lineView.text.parentNode.replaceChild(lineView.node, lineView.text), 
lineView.node.appendChild(lineView.text), ie && 8 > ie_version && (lineView.node.style.zIndex = 2)), 
lineView.node;
}
function updateLineBackground(lineView) {
var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") :lineView.line.bgClass;
if (cls && (cls += " CodeMirror-linebackground"), lineView.background) cls ? lineView.background.className = cls :(lineView.background.parentNode.removeChild(lineView.background), 
lineView.background = null); else if (cls) {
var wrap = ensureLineWrapped(lineView);
lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
}
}
function getLineContent(cm, lineView) {
var ext = cm.display.externalMeasured;
return ext && ext.line == lineView.line ? (cm.display.externalMeasured = null, lineView.measure = ext.measure, 
ext.built) :buildLineContent(cm, lineView);
}
function updateLineText(cm, lineView) {
var cls = lineView.text.className, built = getLineContent(cm, lineView);
lineView.text == lineView.node && (lineView.node = built.pre), lineView.text.parentNode.replaceChild(built.pre, lineView.text), 
lineView.text = built.pre, built.bgClass != lineView.bgClass || built.textClass != lineView.textClass ? (lineView.bgClass = built.bgClass, 
lineView.textClass = built.textClass, updateLineClasses(lineView)) :cls && (lineView.text.className = cls);
}
function updateLineClasses(lineView) {
updateLineBackground(lineView), lineView.line.wrapClass ? ensureLineWrapped(lineView).className = lineView.line.wrapClass :lineView.node != lineView.text && (lineView.node.className = "");
var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") :lineView.line.textClass;
lineView.text.className = textClass || "";
}
function updateLineGutter(cm, lineView, lineN, dims) {
lineView.gutter && (lineView.node.removeChild(lineView.gutter), lineView.gutter = null);
var markers = lineView.line.gutterMarkers;
if (cm.options.lineNumbers || markers) {
var wrap = ensureLineWrapped(lineView), gutterWrap = lineView.gutter = wrap.insertBefore(elt("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (cm.options.fixedGutter ? dims.fixedPos :-dims.gutterTotalWidth) + "px"), lineView.text);
if (!cm.options.lineNumbers || markers && markers["CodeMirror-linenumbers"] || (lineView.lineNumber = gutterWrap.appendChild(elt("div", lineNumberFor(cm.options, lineN), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm.display.lineNumInnerWidth + "px"))), 
markers) for (var k = 0; k < cm.options.gutters.length; ++k) {
var id = cm.options.gutters[k], found = markers.hasOwnProperty(id) && markers[id];
found && gutterWrap.appendChild(elt("div", [ found ], "CodeMirror-gutter-elt", "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
}
}
}
function updateLineWidgets(lineView, dims) {
lineView.alignable && (lineView.alignable = null);
for (var next, node = lineView.node.firstChild; node; node = next) {
var next = node.nextSibling;
"CodeMirror-linewidget" == node.className && lineView.node.removeChild(node);
}
insertLineWidgets(lineView, dims);
}
function buildLineElement(cm, lineView, lineN, dims) {
var built = getLineContent(cm, lineView);
return lineView.text = lineView.node = built.pre, built.bgClass && (lineView.bgClass = built.bgClass), 
built.textClass && (lineView.textClass = built.textClass), updateLineClasses(lineView), 
updateLineGutter(cm, lineView, lineN, dims), insertLineWidgets(lineView, dims), 
lineView.node;
}
function insertLineWidgets(lineView, dims) {
if (insertLineWidgetsFor(lineView.line, lineView, dims, !0), lineView.rest) for (var i = 0; i < lineView.rest.length; i++) insertLineWidgetsFor(lineView.rest[i], lineView, dims, !1);
}
function insertLineWidgetsFor(line, lineView, dims, allowAbove) {
if (line.widgets) for (var wrap = ensureLineWrapped(lineView), i = 0, ws = line.widgets; i < ws.length; ++i) {
var widget = ws[i], node = elt("div", [ widget.node ], "CodeMirror-linewidget");
widget.handleMouseEvents || (node.ignoreEvents = !0), positionLineWidget(widget, node, lineView, dims), 
allowAbove && widget.above ? wrap.insertBefore(node, lineView.gutter || lineView.text) :wrap.appendChild(node), 
signalLater(widget, "redraw");
}
}
function positionLineWidget(widget, node, lineView, dims) {
if (widget.noHScroll) {
(lineView.alignable || (lineView.alignable = [])).push(node);
var width = dims.wrapperWidth;
node.style.left = dims.fixedPos + "px", widget.coverGutter || (width -= dims.gutterTotalWidth, 
node.style.paddingLeft = dims.gutterTotalWidth + "px"), node.style.width = width + "px";
}
widget.coverGutter && (node.style.zIndex = 5, node.style.position = "relative", 
widget.noHScroll || (node.style.marginLeft = -dims.gutterTotalWidth + "px"));
}
function copyPos(x) {
return Pos(x.line, x.ch);
}
function maxPos(a, b) {
return cmp(a, b) < 0 ? b :a;
}
function minPos(a, b) {
return cmp(a, b) < 0 ? a :b;
}
function Selection(ranges, primIndex) {
this.ranges = ranges, this.primIndex = primIndex;
}
function Range(anchor, head) {
this.anchor = anchor, this.head = head;
}
function normalizeSelection(ranges, primIndex) {
var prim = ranges[primIndex];
ranges.sort(function(a, b) {
return cmp(a.from(), b.from());
}), primIndex = indexOf(ranges, prim);
for (var i = 1; i < ranges.length; i++) {
var cur = ranges[i], prev = ranges[i - 1];
if (cmp(prev.to(), cur.from()) >= 0) {
var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to()), inv = prev.empty() ? cur.from() == cur.head :prev.from() == prev.head;
primIndex >= i && --primIndex, ranges.splice(--i, 2, new Range(inv ? to :from, inv ? from :to));
}
}
return new Selection(ranges, primIndex);
}
function simpleSelection(anchor, head) {
return new Selection([ new Range(anchor, head || anchor) ], 0);
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
function clipPosArray(doc, array) {
for (var out = [], i = 0; i < array.length; i++) out[i] = clipPos(doc, array[i]);
return out;
}
function extendRange(doc, range, head, other) {
if (doc.cm && doc.cm.display.shift || doc.extend) {
var anchor = range.anchor;
if (other) {
var posBefore = cmp(head, anchor) < 0;
posBefore != cmp(other, anchor) < 0 ? (anchor = head, head = other) :posBefore != cmp(head, other) < 0 && (head = other);
}
return new Range(anchor, head);
}
return new Range(other || head, head);
}
function extendSelection(doc, head, other, options) {
setSelection(doc, new Selection([ extendRange(doc, doc.sel.primary(), head, other) ], 0), options);
}
function extendSelections(doc, heads, options) {
for (var out = [], i = 0; i < doc.sel.ranges.length; i++) out[i] = extendRange(doc, doc.sel.ranges[i], heads[i], null);
var newSel = normalizeSelection(out, doc.sel.primIndex);
setSelection(doc, newSel, options);
}
function replaceOneSelection(doc, i, range, options) {
var ranges = doc.sel.ranges.slice(0);
ranges[i] = range, setSelection(doc, normalizeSelection(ranges, doc.sel.primIndex), options);
}
function setSimpleSelection(doc, anchor, head, options) {
setSelection(doc, simpleSelection(anchor, head), options);
}
function filterSelectionChange(doc, sel) {
var obj = {
ranges:sel.ranges,
update:function(ranges) {
this.ranges = [];
for (var i = 0; i < ranges.length; i++) this.ranges[i] = new Range(clipPos(doc, ranges[i].anchor), clipPos(doc, ranges[i].head));
}
};
return signal(doc, "beforeSelectionChange", doc, obj), doc.cm && signal(doc.cm, "beforeSelectionChange", doc.cm, obj), 
obj.ranges != sel.ranges ? normalizeSelection(obj.ranges, obj.ranges.length - 1) :sel;
}
function setSelectionReplaceHistory(doc, sel, options) {
var done = doc.history.done, last = lst(done);
last && last.ranges ? (done[done.length - 1] = sel, setSelectionNoUndo(doc, sel, options)) :setSelection(doc, sel, options);
}
function setSelection(doc, sel, options) {
setSelectionNoUndo(doc, sel, options), addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id :0/0, options);
}
function setSelectionNoUndo(doc, sel, options) {
(hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange")) && (sel = filterSelectionChange(doc, sel));
var bias = options && options.bias || (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 :1);
setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, !0)), options && options.scroll === !1 || !doc.cm || ensureCursorVisible(doc.cm);
}
function setSelectionInner(doc, sel) {
sel.equals(doc.sel) || (doc.sel = sel, doc.cm && (doc.cm.curOp.updateInput = doc.cm.curOp.selectionChanged = !0, 
signalCursorActivity(doc.cm)), signalLater(doc, "cursorActivity", doc));
}
function reCheckSelection(doc) {
setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, !1), sel_dontScroll);
}
function skipAtomicInSelection(doc, sel, bias, mayClear) {
for (var out, i = 0; i < sel.ranges.length; i++) {
var range = sel.ranges[i], newAnchor = skipAtomic(doc, range.anchor, bias, mayClear), newHead = skipAtomic(doc, range.head, bias, mayClear);
(out || newAnchor != range.anchor || newHead != range.head) && (out || (out = sel.ranges.slice(0, i)), 
out[i] = new Range(newAnchor, newHead));
}
return out ? normalizeSelection(out, sel.primIndex) :sel;
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
var newPos = m.find(0 > dir ? -1 :1);
if (0 == cmp(newPos, curPos) && (newPos.ch += dir, newPos.ch < 0 ? newPos = newPos.line > doc.first ? clipPos(doc, Pos(newPos.line - 1)) :null :newPos.ch > line.text.length && (newPos = newPos.line < doc.first + doc.size - 1 ? Pos(newPos.line + 1, 0) :null), 
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
function drawSelection(cm) {
for (var display = cm.display, doc = cm.doc, result = {}, curFragment = result.cursors = document.createDocumentFragment(), selFragment = result.selection = document.createDocumentFragment(), i = 0; i < doc.sel.ranges.length; i++) {
var range = doc.sel.ranges[i], collapsed = range.empty();
(collapsed || cm.options.showCursorWhenSelecting) && drawSelectionCursor(cm, range, curFragment), 
collapsed || drawSelectionRange(cm, range, selFragment);
}
if (cm.options.moveInputWithCursor) {
var headPos = cursorCoords(cm, doc.sel.primary().head, "div"), wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10, headPos.top + lineOff.top - wrapOff.top)), 
result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10, headPos.left + lineOff.left - wrapOff.left));
}
return result;
}
function updateSelection(cm, drawn) {
drawn || (drawn = drawSelection(cm)), removeChildrenAndAdd(cm.display.cursorDiv, drawn.cursors), 
removeChildrenAndAdd(cm.display.selectionDiv, drawn.selection), null != drawn.teTop && (cm.display.inputDiv.style.top = drawn.teTop + "px", 
cm.display.inputDiv.style.left = drawn.teLeft + "px");
}
function drawSelectionCursor(cm, range, output) {
var pos = cursorCoords(cm, range.head, "div", null, null, !cm.options.singleCursorHeightPerLine), cursor = output.appendChild(elt("div", "\xa0", "CodeMirror-cursor"));
if (cursor.style.left = pos.left + "px", cursor.style.top = pos.top + "px", cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px", 
pos.other) {
var otherCursor = output.appendChild(elt("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"));
otherCursor.style.display = "", otherCursor.style.left = pos.other.left + "px", 
otherCursor.style.top = pos.other.top + "px", otherCursor.style.height = .85 * (pos.other.bottom - pos.other.top) + "px";
}
}
function drawSelectionRange(cm, range, output) {
function add(left, top, width, bottom) {
0 > top && (top = 0), top = Math.round(top), bottom = Math.round(bottom), fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px; top: " + top + "px; width: " + (null == width ? rightSide - left :width) + "px; height: " + (bottom - top) + "px"));
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
var display = cm.display, doc = cm.doc, fragment = document.createDocumentFragment(), padding = paddingH(cm.display), leftSide = padding.left, rightSide = display.lineSpace.offsetWidth - padding.right, sFrom = range.from(), sTo = range.to();
if (sFrom.line == sTo.line) drawForLine(sFrom.line, sFrom.ch, sTo.ch); else {
var fromLine = getLine(doc, sFrom.line), toLine = getLine(doc, sTo.line), singleVLine = visualLine(fromLine) == visualLine(toLine), leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 :null).end, rightStart = drawForLine(sTo.line, singleVLine ? 0 :null, sTo.ch).start;
singleVLine && (leftEnd.top < rightStart.top - 2 ? (add(leftEnd.right, leftEnd.top, null, leftEnd.bottom), 
add(leftSide, rightStart.top, rightStart.left, rightStart.bottom)) :add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom)), 
leftEnd.bottom < rightStart.top && add(leftSide, leftEnd.bottom, null, rightStart.top);
}
output.appendChild(fragment);
}
function restartBlink(cm) {
if (cm.state.focused) {
var display = cm.display;
clearInterval(display.blinker);
var on = !0;
display.cursorDiv.style.visibility = "", cm.options.cursorBlinkRate > 0 ? display.blinker = setInterval(function() {
display.cursorDiv.style.visibility = (on = !on) ? "" :"hidden";
}, cm.options.cursorBlinkRate) :cm.options.cursorBlinkRate < 0 && (display.cursorDiv.style.visibility = "hidden");
}
}
function startWorker(cm, time) {
cm.doc.mode.startState && cm.doc.frontier < cm.display.viewTo && cm.state.highlight.set(time, bind(highlightWorker, cm));
}
function highlightWorker(cm) {
var doc = cm.doc;
if (doc.frontier < doc.first && (doc.frontier = doc.first), !(doc.frontier >= cm.display.viewTo)) {
var end = +new Date() + cm.options.workTime, state = copyState(doc.mode, getStateBefore(cm, doc.frontier)), changedLines = [];
doc.iter(doc.frontier, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function(line) {
if (doc.frontier >= cm.display.viewFrom) {
var oldStyles = line.styles, highlighted = highlightLine(cm, line, state, !0);
line.styles = highlighted.styles;
var oldCls = line.styleClasses, newCls = highlighted.classes;
newCls ? line.styleClasses = newCls :oldCls && (line.styleClasses = null);
for (var ischange = !oldStyles || oldStyles.length != line.styles.length || oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass), i = 0; !ischange && i < oldStyles.length; ++i) ischange = oldStyles[i] != line.styles[i];
ischange && changedLines.push(doc.frontier), line.stateAfter = copyState(doc.mode, state);
} else processLine(cm, line.text, state), line.stateAfter = doc.frontier % 5 == 0 ? copyState(doc.mode, state) :null;
return ++doc.frontier, +new Date() > end ? (startWorker(cm, cm.options.workDelay), 
!0) :void 0;
}), changedLines.length && runInOp(cm, function() {
for (var i = 0; i < changedLines.length; i++) regLineChange(cm, changedLines[i], "text");
});
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
var save = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo;
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
var e = removeChildrenAndAdd(display.measure, elt("pre", "x")), style = window.getComputedStyle ? window.getComputedStyle(e) :e.currentStyle, data = {
left:parseInt(style.paddingLeft),
right:parseInt(style.paddingRight)
};
return isNaN(data.left) || isNaN(data.right) || (display.cachedPaddingH = data), 
data;
}
function ensureLineHeights(cm, lineView, rect) {
var wrapping = cm.options.lineWrapping, curWidth = wrapping && cm.display.scroller.clientWidth;
if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
var heights = lineView.measure.heights = [];
if (wrapping) {
lineView.measure.width = curWidth;
for (var rects = lineView.text.firstChild.getClientRects(), i = 0; i < rects.length - 1; i++) {
var cur = rects[i], next = rects[i + 1];
Math.abs(cur.bottom - next.bottom) > 2 && heights.push((cur.bottom + next.top) / 2 - rect.top);
}
}
heights.push(rect.bottom - rect.top);
}
}
function mapFromLineView(lineView, line, lineN) {
if (lineView.line == line) return {
map:lineView.measure.map,
cache:lineView.measure.cache
};
for (var i = 0; i < lineView.rest.length; i++) if (lineView.rest[i] == line) return {
map:lineView.measure.maps[i],
cache:lineView.measure.caches[i]
};
for (var i = 0; i < lineView.rest.length; i++) if (lineNo(lineView.rest[i]) > lineN) return {
map:lineView.measure.maps[i],
cache:lineView.measure.caches[i],
before:!0
};
}
function updateExternalMeasurement(cm, line) {
line = visualLine(line);
var lineN = lineNo(line), view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
view.lineN = lineN;
var built = view.built = buildLineContent(cm, view);
return view.text = built.pre, removeChildrenAndAdd(cm.display.lineMeasure, built.pre), 
view;
}
function measureChar(cm, line, ch, bias) {
return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
}
function findViewForLine(cm, lineN) {
if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo) return cm.display.view[findViewIndex(cm, lineN)];
var ext = cm.display.externalMeasured;
return ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size ? ext :void 0;
}
function prepareMeasureForLine(cm, line) {
var lineN = lineNo(line), view = findViewForLine(cm, lineN);
view && !view.text ? view = null :view && view.changes && updateLineForChanges(cm, view, lineN, getDimensions(cm)), 
view || (view = updateExternalMeasurement(cm, line));
var info = mapFromLineView(view, line, lineN);
return {
line:line,
view:view,
rect:null,
map:info.map,
cache:info.cache,
before:info.before,
hasHeights:!1
};
}
function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
prepared.before && (ch = -1);
var found, key = ch + (bias || "");
return prepared.cache.hasOwnProperty(key) ? found = prepared.cache[key] :(prepared.rect || (prepared.rect = prepared.view.text.getBoundingClientRect()), 
prepared.hasHeights || (ensureLineHeights(cm, prepared.view, prepared.rect), prepared.hasHeights = !0), 
found = measureCharInner(cm, prepared, ch, bias), found.bogus || (prepared.cache[key] = found)), 
{
left:found.left,
right:found.right,
top:varHeight ? found.rtop :found.top,
bottom:varHeight ? found.rbottom :found.bottom
};
}
function measureCharInner(cm, prepared, ch, bias) {
for (var node, start, end, collapse, map = prepared.map, i = 0; i < map.length; i += 3) {
var mStart = map[i], mEnd = map[i + 1];
if (mStart > ch ? (start = 0, end = 1, collapse = "left") :mEnd > ch ? (start = ch - mStart, 
end = start + 1) :(i == map.length - 3 || ch == mEnd && map[i + 3] > ch) && (end = mEnd - mStart, 
start = end - 1, ch >= mEnd && (collapse = "right")), null != start) {
if (node = map[i + 2], mStart == mEnd && bias == (node.insertLeft ? "left" :"right") && (collapse = bias), 
"left" == bias && 0 == start) for (;i && map[i - 2] == map[i - 3] && map[i - 1].insertLeft; ) node = map[(i -= 3) + 2], 
collapse = "left";
if ("right" == bias && start == mEnd - mStart) for (;i < map.length - 3 && map[i + 3] == map[i + 4] && !map[i + 5].insertLeft; ) node = map[(i += 3) + 2], 
collapse = "right";
break;
}
}
var rect;
if (3 == node.nodeType) {
for (;start && isExtendingChar(prepared.line.text.charAt(mStart + start)); ) --start;
for (;mEnd > mStart + end && isExtendingChar(prepared.line.text.charAt(mStart + end)); ) ++end;
if (ie && 9 > ie_version && 0 == start && end == mEnd - mStart) rect = node.parentNode.getBoundingClientRect(); else if (ie && cm.options.lineWrapping) {
var rects = range(node, start, end).getClientRects();
rect = rects.length ? rects["right" == bias ? rects.length - 1 :0] :nullRect;
} else rect = range(node, start, end).getBoundingClientRect() || nullRect;
} else {
start > 0 && (collapse = bias = "right");
var rects;
rect = cm.options.lineWrapping && (rects = node.getClientRects()).length > 1 ? rects["right" == bias ? rects.length - 1 :0] :node.getBoundingClientRect();
}
if (ie && 9 > ie_version && !start && (!rect || !rect.left && !rect.right)) {
var rSpan = node.parentNode.getClientRects()[0];
rect = rSpan ? {
left:rSpan.left,
right:rSpan.left + charWidth(cm.display),
top:rSpan.top,
bottom:rSpan.bottom
} :nullRect;
}
ie && 11 > ie_version && (rect = maybeUpdateRectForZooming(cm.display.measure, rect));
for (var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top, mid = (rtop + rbot) / 2, heights = prepared.view.measure.heights, i = 0; i < heights.length - 1 && !(mid < heights[i]); i++) ;
var top = i ? heights[i - 1] :0, bot = heights[i], result = {
left:("right" == collapse ? rect.right :rect.left) - prepared.rect.left,
right:("left" == collapse ? rect.left :rect.right) - prepared.rect.left,
top:top,
bottom:bot
};
return rect.left || rect.right || (result.bogus = !0), cm.options.singleCursorHeightPerLine || (result.rtop = rtop, 
result.rbottom = rbot), result;
}
function maybeUpdateRectForZooming(measure, rect) {
if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure)) return rect;
var scaleX = screen.logicalXDPI / screen.deviceXDPI, scaleY = screen.logicalYDPI / screen.deviceYDPI;
return {
left:rect.left * scaleX,
right:rect.right * scaleX,
top:rect.top * scaleY,
bottom:rect.bottom * scaleY
};
}
function clearLineMeasurementCacheFor(lineView) {
if (lineView.measure && (lineView.measure.cache = {}, lineView.measure.heights = null, 
lineView.rest)) for (var i = 0; i < lineView.rest.length; i++) lineView.measure.caches[i] = {};
}
function clearLineMeasurementCache(cm) {
cm.display.externalMeasure = null, removeChildren(cm.display.lineMeasure);
for (var i = 0; i < cm.display.view.length; i++) clearLineMeasurementCacheFor(cm.display.view[i]);
}
function clearCaches(cm) {
clearLineMeasurementCache(cm), cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null, 
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
var yOff = heightAtLine(lineObj);
if ("local" == context ? yOff += paddingTop(cm.display) :yOff -= cm.display.viewOffset, 
"page" == context || "window" == context) {
var lOff = cm.display.lineSpace.getBoundingClientRect();
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
var localBox = cm.display.sizer.getBoundingClientRect();
left += localBox.left, top += localBox.top;
}
var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
return {
left:left - lineSpaceBox.left,
top:top - lineSpaceBox.top
};
}
function charCoords(cm, pos, context, lineObj, bias) {
return lineObj || (lineObj = getLine(cm.doc, pos.line)), intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
}
function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
function get(ch, right) {
var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" :"left", varHeight);
return right ? m.left = m.right :m.right = m.left, intoCoordSystem(cm, lineObj, m, context);
}
function getBidi(ch, partPos) {
var part = order[partPos], right = part.level % 2;
return ch == bidiLeft(part) && partPos && part.level < order[partPos - 1].level ? (part = order[--partPos], 
ch = bidiRight(part) - (part.level % 2 ? 0 :1), right = !0) :ch == bidiRight(part) && partPos < order.length - 1 && part.level < order[partPos + 1].level && (part = order[++partPos], 
ch = bidiLeft(part) - part.level % 2, right = !1), right && ch == part.to && ch > part.from ? get(ch - 1) :get(ch, right);
}
lineObj = lineObj || getLine(cm.doc, pos.line), preparedMeasure || (preparedMeasure = prepareMeasureForLine(cm, lineObj));
var order = getOrder(lineObj), ch = pos.ch;
if (!order) return get(ch);
var partPos = getBidiPartAt(order, ch), val = getBidi(ch, partPos);
return null != bidiOther && (val.other = getBidi(ch, bidiOther)), val;
}
function estimateCoords(cm, pos) {
var left = 0, pos = clipPos(cm.doc, pos);
cm.options.lineWrapping || (left = charWidth(cm.display) * pos.ch);
var lineObj = getLine(cm.doc, pos.line), top = heightAtLine(lineObj) + paddingTop(cm.display);
return {
left:left,
right:left,
top:top,
bottom:top + lineObj.height
};
}
function PosWithInfo(line, ch, outside, xRel) {
var pos = Pos(line, ch);
return pos.xRel = xRel, outside && (pos.outside = !0), pos;
}
function coordsChar(cm, x, y) {
var doc = cm.doc;
if (y += cm.display.viewOffset, 0 > y) return PosWithInfo(doc.first, 0, !0, -1);
var lineN = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
if (lineN > last) return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, !0, 1);
0 > x && (x = 0);
for (var lineObj = getLine(doc, lineN); ;) {
var found = coordsCharInner(cm, lineObj, lineN, x, y), merged = collapsedSpanAtEnd(lineObj), mergedPos = merged && merged.find(0, !0);
if (!merged || !(found.ch > mergedPos.from.ch || found.ch == mergedPos.from.ch && found.xRel > 0)) return found;
lineN = lineNo(lineObj = mergedPos.to.line);
}
}
function coordsCharInner(cm, lineObj, lineNo, x, y) {
function getX(ch) {
var sp = cursorCoords(cm, Pos(lineNo, ch), "line", lineObj, preparedMeasure);
return wrongLine = !0, innerOff > sp.bottom ? sp.left - adjust :innerOff < sp.top ? sp.left + adjust :(wrongLine = !1, 
sp.left);
}
var innerOff = y - heightAtLine(lineObj), wrongLine = !1, adjust = 2 * cm.display.wrapper.clientWidth, preparedMeasure = prepareMeasureForLine(cm, lineObj), bidi = getOrder(lineObj), dist = lineObj.text.length, from = lineLeft(lineObj), to = lineRight(lineObj), fromX = getX(from), fromOutside = wrongLine, toX = getX(to), toOutside = wrongLine;
if (x > toX) return PosWithInfo(lineNo, to, toOutside, 1);
for (;;) {
if (bidi ? to == from || to == moveVisually(lineObj, from, 1) :1 >= to - from) {
for (var ch = fromX > x || toX - x >= x - fromX ? from :to, xDiff = x - (ch == from ? fromX :toX); isExtendingChar(lineObj.text.charAt(ch)); ) ++ch;
var pos = PosWithInfo(lineNo, ch, ch == from ? fromOutside :toOutside, -1 > xDiff ? -1 :xDiff > 1 ? 1 :0);
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
var anchor = elt("span", "xxxxxxxxxx"), pre = elt("pre", [ anchor ]);
removeChildrenAndAdd(display.measure, pre);
var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
return width > 2 && (display.cachedCharWidth = width), width || 10;
}
function startOperation(cm) {
cm.curOp = {
cm:cm,
viewChanged:!1,
startHeight:cm.doc.height,
forceUpdate:!1,
updateInput:null,
typing:!1,
changeObjs:null,
cursorActivityHandlers:null,
cursorActivityCalled:0,
selectionChanged:!1,
updateMaxLine:!1,
scrollLeft:null,
scrollTop:null,
scrollToPos:null,
id:++nextOpId
}, operationGroup ? operationGroup.ops.push(cm.curOp) :cm.curOp.ownsGroup = operationGroup = {
ops:[ cm.curOp ],
delayedCallbacks:[]
};
}
function fireCallbacksForOps(group) {
var callbacks = group.delayedCallbacks, i = 0;
do {
for (;i < callbacks.length; i++) callbacks[i]();
for (var j = 0; j < group.ops.length; j++) {
var op = group.ops[j];
if (op.cursorActivityHandlers) for (;op.cursorActivityCalled < op.cursorActivityHandlers.length; ) op.cursorActivityHandlers[op.cursorActivityCalled++](op.cm);
}
} while (i < callbacks.length);
}
function endOperation(cm) {
var op = cm.curOp, group = op.ownsGroup;
if (group) try {
fireCallbacksForOps(group);
} finally {
operationGroup = null;
for (var i = 0; i < group.ops.length; i++) group.ops[i].cm.curOp = null;
endOperations(group);
}
}
function endOperations(group) {
for (var ops = group.ops, i = 0; i < ops.length; i++) endOperation_R1(ops[i]);
for (var i = 0; i < ops.length; i++) endOperation_W1(ops[i]);
for (var i = 0; i < ops.length; i++) endOperation_R2(ops[i]);
for (var i = 0; i < ops.length; i++) endOperation_W2(ops[i]);
for (var i = 0; i < ops.length; i++) endOperation_finish(ops[i]);
}
function endOperation_R1(op) {
var cm = op.cm, display = cm.display;
op.updateMaxLine && findMaxLine(cm), op.mustUpdate = op.viewChanged || op.forceUpdate || null != op.scrollTop || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping, 
op.update = op.mustUpdate && new DisplayUpdate(cm, op.mustUpdate && {
top:op.scrollTop,
ensure:op.scrollToPos
}, op.forceUpdate);
}
function endOperation_W1(op) {
op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
}
function endOperation_R2(op) {
var cm = op.cm, display = cm.display;
op.updatedDisplay && updateHeightsInViewport(cm), display.maxLineChanged && !cm.options.lineWrapping && (op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left, 
op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo + scrollerCutOff - display.scroller.clientWidth)), 
op.barMeasure = measureForScrollbars(cm), (op.updatedDisplay || op.selectionChanged) && (op.newSelectionNodes = drawSelection(cm));
}
function endOperation_W2(op) {
var cm = op.cm;
null != op.adjustWidthTo && (cm.display.sizer.style.minWidth = op.adjustWidthTo + "px", 
op.maxScrollLeft < cm.doc.scrollLeft && setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), !0)), 
op.newSelectionNodes && updateSelection(cm, op.newSelectionNodes), op.updatedDisplay && setDocumentHeight(cm, op.barMeasure), 
(op.updatedDisplay || op.startHeight != cm.doc.height) && updateScrollbars(cm, op.barMeasure), 
op.selectionChanged && restartBlink(cm), cm.state.focused && op.updateInput && resetInput(cm, op.typing);
}
function endOperation_finish(op) {
var cm = op.cm, display = cm.display, doc = cm.doc;
if (op.updatedDisplay && postUpdateDisplay(cm, op.update), null == display.wheelStartX || null == op.scrollTop && null == op.scrollLeft && !op.scrollToPos || (display.wheelStartX = display.wheelStartY = null), 
null != op.scrollTop && display.scroller.scrollTop != op.scrollTop) {
var top = Math.max(0, Math.min(display.scroller.scrollHeight - display.scroller.clientHeight, op.scrollTop));
display.scroller.scrollTop = display.scrollbarV.scrollTop = doc.scrollTop = top;
}
if (null != op.scrollLeft && display.scroller.scrollLeft != op.scrollLeft) {
var left = Math.max(0, Math.min(display.scroller.scrollWidth - display.scroller.clientWidth, op.scrollLeft));
display.scroller.scrollLeft = display.scrollbarH.scrollLeft = doc.scrollLeft = left, 
alignHorizontally(cm);
}
if (op.scrollToPos) {
var coords = scrollPosIntoView(cm, clipPos(doc, op.scrollToPos.from), clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
op.scrollToPos.isCursor && cm.state.focused && maybeScrollWindow(cm, coords);
}
var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
if (hidden) for (var i = 0; i < hidden.length; ++i) hidden[i].lines.length || signal(hidden[i], "hide");
if (unhidden) for (var i = 0; i < unhidden.length; ++i) unhidden[i].lines.length && signal(unhidden[i], "unhide");
display.wrapper.offsetHeight && (doc.scrollTop = cm.display.scroller.scrollTop), 
op.updatedDisplay && webkit && (cm.options.lineWrapping && checkForWebkitWidthBug(cm, op.barMeasure), 
op.barMeasure.scrollWidth > op.barMeasure.clientWidth && op.barMeasure.scrollWidth < op.barMeasure.clientWidth + 1 && !hScrollbarTakesSpace(cm) && updateScrollbars(cm)), 
op.changeObjs && signal(cm, "changes", cm, op.changeObjs);
}
function runInOp(cm, f) {
if (cm.curOp) return f();
startOperation(cm);
try {
return f();
} finally {
endOperation(cm);
}
}
function operation(cm, f) {
return function() {
if (cm.curOp) return f.apply(cm, arguments);
startOperation(cm);
try {
return f.apply(cm, arguments);
} finally {
endOperation(cm);
}
};
}
function methodOp(f) {
return function() {
if (this.curOp) return f.apply(this, arguments);
startOperation(this);
try {
return f.apply(this, arguments);
} finally {
endOperation(this);
}
};
}
function docMethodOp(f) {
return function() {
var cm = this.cm;
if (!cm || cm.curOp) return f.apply(this, arguments);
startOperation(cm);
try {
return f.apply(this, arguments);
} finally {
endOperation(cm);
}
};
}
function LineView(doc, line, lineN) {
this.line = line, this.rest = visualLineContinued(line), this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 :1, 
this.node = this.text = null, this.hidden = lineIsHidden(doc, line);
}
function buildViewArray(cm, from, to) {
for (var nextPos, array = [], pos = from; to > pos; pos = nextPos) {
var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
nextPos = pos + view.size, array.push(view);
}
return array;
}
function regChange(cm, from, to, lendiff) {
null == from && (from = cm.doc.first), null == to && (to = cm.doc.first + cm.doc.size), 
lendiff || (lendiff = 0);
var display = cm.display;
if (lendiff && to < display.viewTo && (null == display.updateLineNumbers || display.updateLineNumbers > from) && (display.updateLineNumbers = from), 
cm.curOp.viewChanged = !0, from >= display.viewTo) sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo && resetView(cm); else if (to <= display.viewFrom) sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom ? resetView(cm) :(display.viewFrom += lendiff, 
display.viewTo += lendiff); else if (from <= display.viewFrom && to >= display.viewTo) resetView(cm); else if (from <= display.viewFrom) {
var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
cut ? (display.view = display.view.slice(cut.index), display.viewFrom = cut.lineN, 
display.viewTo += lendiff) :resetView(cm);
} else if (to >= display.viewTo) {
var cut = viewCuttingPoint(cm, from, from, -1);
cut ? (display.view = display.view.slice(0, cut.index), display.viewTo = cut.lineN) :resetView(cm);
} else {
var cutTop = viewCuttingPoint(cm, from, from, -1), cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
cutTop && cutBot ? (display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index)), 
display.viewTo += lendiff) :resetView(cm);
}
var ext = display.externalMeasured;
ext && (to < ext.lineN ? ext.lineN += lendiff :from < ext.lineN + ext.size && (display.externalMeasured = null));
}
function regLineChange(cm, line, type) {
cm.curOp.viewChanged = !0;
var display = cm.display, ext = cm.display.externalMeasured;
if (ext && line >= ext.lineN && line < ext.lineN + ext.size && (display.externalMeasured = null), 
!(line < display.viewFrom || line >= display.viewTo)) {
var lineView = display.view[findViewIndex(cm, line)];
if (null != lineView.node) {
var arr = lineView.changes || (lineView.changes = []);
-1 == indexOf(arr, type) && arr.push(type);
}
}
}
function resetView(cm) {
cm.display.viewFrom = cm.display.viewTo = cm.doc.first, cm.display.view = [], cm.display.viewOffset = 0;
}
function findViewIndex(cm, n) {
if (n >= cm.display.viewTo) return null;
if (n -= cm.display.viewFrom, 0 > n) return null;
for (var view = cm.display.view, i = 0; i < view.length; i++) if (n -= view[i].size, 
0 > n) return i;
}
function viewCuttingPoint(cm, oldN, newN, dir) {
var diff, index = findViewIndex(cm, oldN), view = cm.display.view;
if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size) return {
index:index,
lineN:newN
};
for (var i = 0, n = cm.display.viewFrom; index > i; i++) n += view[i].size;
if (n != oldN) {
if (dir > 0) {
if (index == view.length - 1) return null;
diff = n + view[index].size - oldN, index++;
} else diff = n - oldN;
oldN += diff, newN += diff;
}
for (;visualLineNo(cm.doc, newN) != newN; ) {
if (index == (0 > dir ? 0 :view.length - 1)) return null;
newN += dir * view[index - (0 > dir ? 1 :0)].size, index += dir;
}
return {
index:index,
lineN:newN
};
}
function adjustView(cm, from, to) {
var display = cm.display, view = display.view;
0 == view.length || from >= display.viewTo || to <= display.viewFrom ? (display.view = buildViewArray(cm, from, to), 
display.viewFrom = from) :(display.viewFrom > from ? display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view) :display.viewFrom < from && (display.view = display.view.slice(findViewIndex(cm, from))), 
display.viewFrom = from, display.viewTo < to ? display.view = display.view.concat(buildViewArray(cm, display.viewTo, to)) :display.viewTo > to && (display.view = display.view.slice(0, findViewIndex(cm, to)))), 
display.viewTo = to;
}
function countDirtyView(cm) {
for (var view = cm.display.view, dirty = 0, i = 0; i < view.length; i++) {
var lineView = view[i];
lineView.hidden || lineView.node && !lineView.changes || ++dirty;
}
return dirty;
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
var input = cm.display.input, prevInput = cm.display.prevInput, doc = cm.doc;
if (!cm.state.focused || hasSelection(input) && !prevInput || isReadOnly(cm) || cm.options.disableInput) return !1;
cm.state.pasteIncoming && cm.state.fakedLastChar && (input.value = input.value.substring(0, input.value.length - 1), 
cm.state.fakedLastChar = !1);
var text = input.value;
if (text == prevInput && !cm.somethingSelected()) return !1;
if (ie && ie_version >= 9 && cm.display.inputHasSelection === text) return resetInput(cm), 
!1;
var withOp = !cm.curOp;
withOp && startOperation(cm), cm.display.shift = !1, 8203 != text.charCodeAt(0) || doc.sel != cm.display.selForContextMenu || prevInput || (prevInput = "\u200b");
for (var same = 0, l = Math.min(prevInput.length, text.length); l > same && prevInput.charCodeAt(same) == text.charCodeAt(same); ) ++same;
for (var inserted = text.slice(same), textLines = splitLines(inserted), multiPaste = cm.state.pasteIncoming && textLines.length > 1 && doc.sel.ranges.length == textLines.length, i = doc.sel.ranges.length - 1; i >= 0; i--) {
var range = doc.sel.ranges[i], from = range.from(), to = range.to();
same < prevInput.length ? from = Pos(from.line, from.ch - (prevInput.length - same)) :cm.state.overwrite && range.empty() && !cm.state.pasteIncoming && (to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length)));
var updateInput = cm.curOp.updateInput, changeEvent = {
from:from,
to:to,
text:multiPaste ? [ textLines[i] ] :textLines,
origin:cm.state.pasteIncoming ? "paste" :cm.state.cutIncoming ? "cut" :"+input"
};
if (makeChange(cm.doc, changeEvent), signalLater(cm, "inputRead", cm, changeEvent), 
inserted && !cm.state.pasteIncoming && cm.options.electricChars && cm.options.smartIndent && range.head.ch < 100 && (!i || doc.sel.ranges[i - 1].head.line != range.head.line)) {
var mode = cm.getModeAt(range.head);
if (mode.electricChars) {
for (var j = 0; j < mode.electricChars.length; j++) if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
indentLine(cm, range.head.line, "smart");
break;
}
} else if (mode.electricInput) {
var end = changeEnd(changeEvent);
mode.electricInput.test(getLine(doc, end.line).text.slice(0, end.ch)) && indentLine(cm, range.head.line, "smart");
}
}
}
return ensureCursorVisible(cm), cm.curOp.updateInput = updateInput, cm.curOp.typing = !0, 
text.length > 1e3 || text.indexOf("\n") > -1 ? input.value = cm.display.prevInput = "" :cm.display.prevInput = text, 
withOp && endOperation(cm), cm.state.pasteIncoming = cm.state.cutIncoming = !1, 
!0;
}
function resetInput(cm, typing) {
var minimal, selected, doc = cm.doc;
if (cm.somethingSelected()) {
cm.display.prevInput = "";
var range = doc.sel.primary();
minimal = hasCopyEvent && (range.to().line - range.from().line > 100 || (selected = cm.getSelection()).length > 1e3);
var content = minimal ? "-" :selected || cm.getSelection();
cm.display.input.value = content, cm.state.focused && selectInput(cm.display.input), 
ie && ie_version >= 9 && (cm.display.inputHasSelection = content);
} else typing || (cm.display.prevInput = cm.display.input.value = "", ie && ie_version >= 9 && (cm.display.inputHasSelection = null));
cm.display.inaccurateSelection = minimal;
}
function focusInput(cm) {
"nocursor" == cm.options.readOnly || mobile && activeElt() == cm.display.input || cm.display.input.focus();
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
function drag_(e) {
signalDOMEvent(cm, e) || e_stop(e);
}
function prepareCopyCut(e) {
if (cm.somethingSelected()) d.inaccurateSelection && (d.prevInput = "", d.inaccurateSelection = !1, 
d.input.value = cm.getSelection(), selectInput(d.input)); else {
for (var text = "", ranges = [], i = 0; i < cm.doc.sel.ranges.length; i++) {
var line = cm.doc.sel.ranges[i].head.line, lineRange = {
anchor:Pos(line, 0),
head:Pos(line + 1, 0)
};
ranges.push(lineRange), text += cm.getRange(lineRange.anchor, lineRange.head);
}
"cut" == e.type ? cm.setSelections(ranges, null, sel_dontScroll) :(d.prevInput = "", 
d.input.value = text, selectInput(d.input));
}
"cut" == e.type && (cm.state.cutIncoming = !0);
}
var d = cm.display;
on(d.scroller, "mousedown", operation(cm, onMouseDown)), ie && 11 > ie_version ? on(d.scroller, "dblclick", operation(cm, function(e) {
if (!signalDOMEvent(cm, e)) {
var pos = posFromMouse(cm, e);
if (pos && !clickInGutter(cm, e) && !eventInWidget(cm.display, e)) {
e_preventDefault(e);
var word = findWordAt(cm, pos);
extendSelection(cm.doc, word.anchor, word.head);
}
}
})) :on(d.scroller, "dblclick", function(e) {
signalDOMEvent(cm, e) || e_preventDefault(e);
}), on(d.lineSpace, "selectstart", function(e) {
eventInWidget(d, e) || e_preventDefault(e);
}), captureRightClick || on(d.scroller, "contextmenu", function(e) {
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
}), on(d.input, "keyup", function(e) {
onKeyUp.call(cm, e);
}), on(d.input, "input", function() {
ie && ie_version >= 9 && cm.display.inputHasSelection && (cm.display.inputHasSelection = null), 
fastPoll(cm);
}), on(d.input, "keydown", operation(cm, onKeyDown)), on(d.input, "keypress", operation(cm, onKeyPress)), 
on(d.input, "focus", bind(onFocus, cm)), on(d.input, "blur", bind(onBlur, cm)), 
cm.options.dragDrop && (on(d.scroller, "dragstart", function(e) {
onDragStart(cm, e);
}), on(d.scroller, "dragenter", drag_), on(d.scroller, "dragover", drag_), on(d.scroller, "drop", operation(cm, onDrop))), 
on(d.scroller, "paste", function(e) {
eventInWidget(d, e) || (cm.state.pasteIncoming = !0, focusInput(cm), fastPoll(cm));
}), on(d.input, "paste", function() {
if (webkit && !cm.state.fakedLastChar && !(new Date() - cm.state.lastMiddleDown < 200)) {
var start = d.input.selectionStart, end = d.input.selectionEnd;
d.input.value += "$", d.input.selectionEnd = end, d.input.selectionStart = start, 
cm.state.fakedLastChar = !0;
}
cm.state.pasteIncoming = !0, fastPoll(cm);
}), on(d.input, "cut", prepareCopyCut), on(d.input, "copy", prepareCopyCut), khtml && on(d.sizer, "mouseup", function() {
activeElt() == d.input && d.input.blur(), focusInput(cm);
});
}
function onResize(cm) {
var d = cm.display;
d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null, cm.setSize();
}
function eventInWidget(display, e) {
for (var n = e_target(e); n != display.wrapper; n = n.parentNode) if (!n || n.ignoreEvents || n.parentNode == display.sizer && n != display.mover) return !0;
}
function posFromMouse(cm, e, liberal, forRect) {
var display = cm.display;
if (!liberal) {
var target = e_target(e);
if (target == display.scrollbarH || target == display.scrollbarV || target == display.scrollbarFiller || target == display.gutterFiller) return null;
}
var x, y, space = display.lineSpace.getBoundingClientRect();
try {
x = e.clientX - space.left, y = e.clientY - space.top;
} catch (e) {
return null;
}
var line, coords = coordsChar(cm, x, y);
if (forRect && 1 == coords.xRel && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
}
return coords;
}
function onMouseDown(e) {
if (!signalDOMEvent(this, e)) {
var cm = this, display = cm.display;
if (display.shift = e.shiftKey, eventInWidget(display, e)) return webkit || (display.scroller.draggable = !1, 
setTimeout(function() {
display.scroller.draggable = !0;
}, 100)), void 0;
if (!clickInGutter(cm, e)) {
var start = posFromMouse(cm, e);
switch (window.focus(), e_button(e)) {
case 1:
start ? leftButtonDown(cm, e, start) :e_target(e) == display.scroller && e_preventDefault(e);
break;

case 2:
webkit && (cm.state.lastMiddleDown = +new Date()), start && extendSelection(cm.doc, start), 
setTimeout(bind(focusInput, cm), 20), e_preventDefault(e);
break;

case 3:
captureRightClick && onContextMenu(cm, e);
}
}
}
}
function leftButtonDown(cm, e, start) {
setTimeout(bind(ensureFocus, cm), 0);
var type, now = +new Date();
lastDoubleClick && lastDoubleClick.time > now - 400 && 0 == cmp(lastDoubleClick.pos, start) ? type = "triple" :lastClick && lastClick.time > now - 400 && 0 == cmp(lastClick.pos, start) ? (type = "double", 
lastDoubleClick = {
time:now,
pos:start
}) :(type = "single", lastClick = {
time:now,
pos:start
});
var sel = cm.doc.sel, modifier = mac ? e.metaKey :e.ctrlKey;
cm.options.dragDrop && dragAndDrop && !isReadOnly(cm) && "single" == type && sel.contains(start) > -1 && sel.somethingSelected() ? leftButtonStartDrag(cm, e, start, modifier) :leftButtonSelect(cm, e, start, type, modifier);
}
function leftButtonStartDrag(cm, e, start, modifier) {
var display = cm.display, dragEnd = operation(cm, function(e2) {
webkit && (display.scroller.draggable = !1), cm.state.draggingText = !1, off(document, "mouseup", dragEnd), 
off(display.scroller, "drop", dragEnd), Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10 && (e_preventDefault(e2), 
modifier || extendSelection(cm.doc, start), focusInput(cm), ie && 9 == ie_version && setTimeout(function() {
document.body.focus(), focusInput(cm);
}, 20));
});
webkit && (display.scroller.draggable = !0), cm.state.draggingText = dragEnd, display.scroller.dragDrop && display.scroller.dragDrop(), 
on(document, "mouseup", dragEnd), on(display.scroller, "drop", dragEnd);
}
function leftButtonSelect(cm, e, start, type, addNew) {
function extendTo(pos) {
if (0 != cmp(lastPos, pos)) if (lastPos = pos, "rect" == type) {
for (var ranges = [], tabSize = cm.options.tabSize, startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize), posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize), left = Math.min(startCol, posCol), right = Math.max(startCol, posCol), line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line)); end >= line; line++) {
var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
left == right ? ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos))) :text.length > leftPos && ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
}
ranges.length || ranges.push(new Range(start, start)), setSelection(doc, normalizeSelection(startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex), {
origin:"*mouse",
scroll:!1
}), cm.scrollIntoView(pos);
} else {
var oldRange = ourRange, anchor = oldRange.anchor, head = pos;
if ("single" != type) {
if ("double" == type) var range = findWordAt(cm, pos); else var range = new Range(Pos(pos.line, 0), clipPos(doc, Pos(pos.line + 1, 0)));
cmp(range.anchor, anchor) > 0 ? (head = range.head, anchor = minPos(oldRange.from(), range.anchor)) :(head = range.anchor, 
anchor = maxPos(oldRange.to(), range.head));
}
var ranges = startSel.ranges.slice(0);
ranges[ourIndex] = new Range(clipPos(doc, anchor), head), setSelection(doc, normalizeSelection(ranges, ourIndex), sel_mouse);
}
}
function extend(e) {
var curCount = ++counter, cur = posFromMouse(cm, e, !0, "rect" == type);
if (cur) if (0 != cmp(cur, lastPos)) {
ensureFocus(cm), extendTo(cur);
var visible = visibleLines(display, doc);
(cur.line >= visible.to || cur.line < visible.from) && setTimeout(operation(cm, function() {
counter == curCount && extend(e);
}), 150);
} else {
var outside = e.clientY < editorSize.top ? -20 :e.clientY > editorSize.bottom ? 20 :0;
outside && setTimeout(operation(cm, function() {
counter == curCount && (display.scroller.scrollTop += outside, extend(e));
}), 50);
}
}
function done(e) {
counter = 1/0, e_preventDefault(e), focusInput(cm), off(document, "mousemove", move), 
off(document, "mouseup", up), doc.history.lastSelOrigin = null;
}
var display = cm.display, doc = cm.doc;
e_preventDefault(e);
var ourRange, ourIndex, startSel = doc.sel;
if (addNew && !e.shiftKey ? (ourIndex = doc.sel.contains(start), ourRange = ourIndex > -1 ? doc.sel.ranges[ourIndex] :new Range(start, start)) :ourRange = doc.sel.primary(), 
e.altKey) type = "rect", addNew || (ourRange = new Range(start, start)), start = posFromMouse(cm, e, !0, !0), 
ourIndex = -1; else if ("double" == type) {
var word = findWordAt(cm, start);
ourRange = cm.display.shift || doc.extend ? extendRange(doc, ourRange, word.anchor, word.head) :word;
} else if ("triple" == type) {
var line = new Range(Pos(start.line, 0), clipPos(doc, Pos(start.line + 1, 0)));
ourRange = cm.display.shift || doc.extend ? extendRange(doc, ourRange, line.anchor, line.head) :line;
} else ourRange = extendRange(doc, ourRange, start);
addNew ? ourIndex > -1 ? replaceOneSelection(doc, ourIndex, ourRange, sel_mouse) :(ourIndex = doc.sel.ranges.length, 
setSelection(doc, normalizeSelection(doc.sel.ranges.concat([ ourRange ]), ourIndex), {
scroll:!1,
origin:"*mouse"
})) :(ourIndex = 0, setSelection(doc, new Selection([ ourRange ], 0), sel_mouse), 
startSel = doc.sel);
var lastPos = start, editorSize = display.wrapper.getBoundingClientRect(), counter = 0, move = operation(cm, function(e) {
e_button(e) ? extend(e) :done(e);
}), up = operation(cm, done);
on(document, "mousemove", move), on(document, "mouseup", up);
}
function gutterEvent(cm, e, type, prevent, signalfn) {
try {
var mX = e.clientX, mY = e.clientY;
} catch (e) {
return !1;
}
if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) return !1;
prevent && e_preventDefault(e);
var display = cm.display, lineBox = display.lineDiv.getBoundingClientRect();
if (mY > lineBox.bottom || !hasHandler(cm, type)) return e_defaultPrevented(e);
mY -= lineBox.top - display.viewOffset;
for (var i = 0; i < cm.options.gutters.length; ++i) {
var g = display.gutters.childNodes[i];
if (g && g.getBoundingClientRect().right >= mX) {
var line = lineAtHeight(cm.doc, mY), gutter = cm.options.gutters[i];
return signalfn(cm, type, cm, line, gutter, e), e_defaultPrevented(e);
}
}
}
function clickInGutter(cm, e) {
return gutterEvent(cm, e, "gutterClick", !0, signalLater);
}
function onDrop(e) {
var cm = this;
if (!signalDOMEvent(cm, e) && !eventInWidget(cm.display, e)) {
e_preventDefault(e), ie && (lastDrop = +new Date());
var pos = posFromMouse(cm, e, !0), files = e.dataTransfer.files;
if (pos && !isReadOnly(cm)) if (files && files.length && window.FileReader && window.File) for (var n = files.length, text = Array(n), read = 0, loadFile = function(file, i) {
var reader = new FileReader();
reader.onload = operation(cm, function() {
if (text[i] = reader.result, ++read == n) {
pos = clipPos(cm.doc, pos);
var change = {
from:pos,
to:pos,
text:splitLines(text.join("\n")),
origin:"paste"
};
makeChange(cm.doc, change), setSelectionReplaceHistory(cm.doc, simpleSelection(pos, changeEnd(change)));
}
}), reader.readAsText(file);
}, i = 0; n > i; ++i) loadFile(files[i], i); else {
if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) return cm.state.draggingText(e), 
setTimeout(bind(focusInput, cm), 20), void 0;
try {
var text = e.dataTransfer.getData("Text");
if (text) {
if (cm.state.draggingText && !(mac ? e.metaKey :e.ctrlKey)) var selected = cm.listSelections();
if (setSelectionNoUndo(cm.doc, simpleSelection(pos, pos)), selected) for (var i = 0; i < selected.length; ++i) replaceRange(cm.doc, "", selected[i].anchor, selected[i].head, "drag");
cm.replaceSelection(text, "around", "paste"), focusInput(cm);
}
} catch (e) {}
}
}
}
function onDragStart(cm, e) {
if (ie && (!cm.state.draggingText || +new Date() - lastDrop < 100)) return e_stop(e), 
void 0;
if (!signalDOMEvent(cm, e) && !eventInWidget(cm.display, e) && (e.dataTransfer.setData("Text", cm.getSelection()), 
e.dataTransfer.setDragImage && !safari)) {
var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", 
presto && (img.width = img.height = 1, cm.display.wrapper.appendChild(img), img._top = img.offsetTop), 
e.dataTransfer.setDragImage(img, 0, 0), presto && img.parentNode.removeChild(img);
}
}
function setScrollTop(cm, val) {
Math.abs(cm.doc.scrollTop - val) < 2 || (cm.doc.scrollTop = val, gecko || updateDisplaySimple(cm, {
top:val
}), cm.display.scroller.scrollTop != val && (cm.display.scroller.scrollTop = val), 
cm.display.scrollbarV.scrollTop != val && (cm.display.scrollbarV.scrollTop = val), 
gecko && updateDisplaySimple(cm), startWorker(cm, 100));
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
if (dy && mac && webkit) outer:for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) for (var i = 0; i < view.length; i++) if (view[i].node == cur) {
cm.display.currentWheelTarget = cur;
break outer;
}
if (dx && !gecko && !presto && null != wheelPixelsPerUnit) return dy && setScrollTop(cm, Math.max(0, Math.min(scroll.scrollTop + dy * wheelPixelsPerUnit, scroll.scrollHeight - scroll.clientHeight))), 
setScrollLeft(cm, Math.max(0, Math.min(scroll.scrollLeft + dx * wheelPixelsPerUnit, scroll.scrollWidth - scroll.clientWidth))), 
e_preventDefault(e), display.wheelStartX = null, void 0;
if (dy && null != wheelPixelsPerUnit) {
var pixels = dy * wheelPixelsPerUnit, top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
0 > pixels ? top = Math.max(0, top + pixels - 50) :bot = Math.min(cm.doc.height, bot + pixels + 50), 
updateDisplaySimple(cm, {
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
var prevShift = cm.display.shift, done = !1;
try {
isReadOnly(cm) && (cm.state.suppressEdits = !0), dropShift && (cm.display.shift = !1), 
done = bound(cm) != Pass;
} finally {
cm.display.shift = prevShift, cm.state.suppressEdits = !1;
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
}), handled && (e_preventDefault(e), restartBlink(cm), signalLater(cm, "keyHandled", cm, name, e)), 
handled;
}
function handleCharBinding(cm, e, ch) {
var handled = lookupKey("'" + ch + "'", allKeyMaps(cm), function(b) {
return doHandleBinding(cm, b, !0);
});
return handled && (e_preventDefault(e), restartBlink(cm), signalLater(cm, "keyHandled", cm, "'" + ch + "'", e)), 
handled;
}
function onKeyDown(e) {
var cm = this;
if (ensureFocus(cm), !signalDOMEvent(cm, e)) {
ie && 11 > ie_version && 27 == e.keyCode && (e.returnValue = !1);
var code = e.keyCode;
cm.display.shift = 16 == code || e.shiftKey;
var handled = handleKeyBinding(cm, e);
presto && (lastStoppedKey = handled ? code :null, !handled && 88 == code && !hasCopyEvent && (mac ? e.metaKey :e.ctrlKey) && cm.replaceSelection("", null, "cut")), 
18 != code || /\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className) || showCrossHair(cm);
}
}
function showCrossHair(cm) {
function up(e) {
18 != e.keyCode && e.altKey || (rmClass(lineDiv, "CodeMirror-crosshair"), off(document, "keyup", up), 
off(document, "mouseover", up));
}
var lineDiv = cm.display.lineDiv;
addClass(lineDiv, "CodeMirror-crosshair"), on(document, "keyup", up), on(document, "mouseover", up);
}
function onKeyUp(e) {
16 == e.keyCode && (this.doc.sel.shift = !1), signalDOMEvent(this, e);
}
function onKeyPress(e) {
var cm = this;
if (!(signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey)) {
var keyCode = e.keyCode, charCode = e.charCode;
if (presto && keyCode == lastStoppedKey) return lastStoppedKey = null, e_preventDefault(e), 
void 0;
if (!(presto && (!e.which || e.which < 10) || khtml) || !handleKeyBinding(cm, e)) {
var ch = String.fromCharCode(null == charCode ? keyCode :charCode);
handleCharBinding(cm, e, ch) || (ie && ie_version >= 9 && (cm.display.inputHasSelection = null), 
fastPoll(cm));
}
}
}
function onFocus(cm) {
"nocursor" != cm.options.readOnly && (cm.state.focused || (signal(cm, "focus", cm), 
cm.state.focused = !0, addClass(cm.display.wrapper, "CodeMirror-focused"), cm.curOp || cm.display.selForContextMenu == cm.doc.sel || (resetInput(cm), 
webkit && setTimeout(bind(resetInput, cm, !0), 0))), slowPoll(cm), restartBlink(cm));
}
function onBlur(cm) {
cm.state.focused && (signal(cm, "blur", cm), cm.state.focused = !1, rmClass(cm.display.wrapper, "CodeMirror-focused")), 
clearInterval(cm.display.blinker), setTimeout(function() {
cm.state.focused || (cm.display.shift = !1);
}, 150);
}
function onContextMenu(cm, e) {
function prepareSelectAllHack() {
if (null != display.input.selectionStart) {
var selected = cm.somethingSelected(), extval = display.input.value = "\u200b" + (selected ? display.input.value :"");
display.prevInput = selected ? "" :"\u200b", display.input.selectionStart = 1, display.input.selectionEnd = extval.length, 
display.selForContextMenu = cm.doc.sel;
}
}
function rehide() {
if (display.inputDiv.style.position = "relative", display.input.style.cssText = oldCSS, 
ie && 9 > ie_version && (display.scrollbarV.scrollTop = display.scroller.scrollTop = scrollPos), 
slowPoll(cm), null != display.input.selectionStart) {
(!ie || ie && 9 > ie_version) && prepareSelectAllHack();
var i = 0, poll = function() {
display.selForContextMenu == cm.doc.sel && 0 == display.input.selectionStart ? operation(cm, commands.selectAll)(cm) :i++ < 10 ? display.detectingSelectAll = setTimeout(poll, 500) :resetInput(cm);
};
display.detectingSelectAll = setTimeout(poll, 200);
}
}
if (!signalDOMEvent(cm, e, "contextmenu")) {
var display = cm.display;
if (!eventInWidget(display, e) && !contextMenuInGutter(cm, e)) {
var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
if (pos && !presto) {
var reset = cm.options.resetSelectionOnContextMenu;
reset && -1 == cm.doc.sel.contains(pos) && operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
var oldCSS = display.input.style.cssText;
if (display.inputDiv.style.position = "absolute", display.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" :"transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", 
focusInput(cm), resetInput(cm), cm.somethingSelected() || (display.input.value = display.prevInput = " "), 
display.selForContextMenu = cm.doc.sel, clearTimeout(display.detectingSelectAll), 
ie && ie_version >= 9 && prepareSelectAllHack(), captureRightClick) {
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
function contextMenuInGutter(cm, e) {
return hasHandler(cm, "gutterContextMenu") ? gutterEvent(cm, e, "gutterContextMenu", !1, signal) :!1;
}
function adjustForChange(pos, change) {
if (cmp(pos, change.from) < 0) return pos;
if (cmp(pos, change.to) <= 0) return changeEnd(change);
var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
return pos.line == change.to.line && (ch += changeEnd(change).ch - change.to.ch), 
Pos(line, ch);
}
function computeSelAfterChange(doc, change) {
for (var out = [], i = 0; i < doc.sel.ranges.length; i++) {
var range = doc.sel.ranges[i];
out.push(new Range(adjustForChange(range.anchor, change), adjustForChange(range.head, change)));
}
return normalizeSelection(out, doc.sel.primIndex);
}
function offsetPos(pos, old, nw) {
return pos.line == old.line ? Pos(nw.line, pos.ch - old.ch + nw.ch) :Pos(nw.line + (pos.line - old.line), pos.ch);
}
function computeReplacedSel(doc, changes, hint) {
for (var out = [], oldPrev = Pos(doc.first, 0), newPrev = oldPrev, i = 0; i < changes.length; i++) {
var change = changes[i], from = offsetPos(change.from, oldPrev, newPrev), to = offsetPos(changeEnd(change), oldPrev, newPrev);
if (oldPrev = change.to, newPrev = to, "around" == hint) {
var range = doc.sel.ranges[i], inv = cmp(range.head, range.anchor) < 0;
out[i] = new Range(inv ? to :from, inv ? from :to);
} else out[i] = new Range(from, from);
}
return new Selection(out, doc.sel.primIndex);
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
function makeChange(doc, change, ignoreReadOnly) {
if (doc.cm) {
if (!doc.cm.curOp) return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly);
if (doc.cm.state.suppressEdits) return;
}
if (!(hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) || (change = filterChange(doc, change, !0))) {
var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
if (split) for (var i = split.length - 1; i >= 0; --i) makeChangeInner(doc, {
from:split[i].from,
to:split[i].to,
text:i ? [ "" ] :change.text
}); else makeChangeInner(doc, change);
}
}
function makeChangeInner(doc, change) {
if (1 != change.text.length || "" != change.text[0] || 0 != cmp(change.from, change.to)) {
var selAfter = computeSelAfterChange(doc, change);
addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id :0/0), makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
var rebased = [];
linkedDocs(doc, function(doc, sharedHist) {
sharedHist || -1 != indexOf(rebased, doc.history) || (rebaseHist(doc.history, change), 
rebased.push(doc.history)), makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
});
}
}
function makeChangeFromHistory(doc, type, allowSelectionOnly) {
if (!doc.cm || !doc.cm.state.suppressEdits) {
for (var event, hist = doc.history, selAfter = doc.sel, source = "undo" == type ? hist.done :hist.undone, dest = "undo" == type ? hist.undone :hist.done, i = 0; i < source.length && (event = source[i], 
allowSelectionOnly ? !event.ranges || event.equals(doc.sel) :event.ranges); i++) ;
if (i != source.length) {
for (hist.lastOrigin = hist.lastSelOrigin = null; event = source.pop(), event.ranges; ) {
if (pushSelectionToHistory(event, dest), allowSelectionOnly && !event.equals(doc.sel)) return setSelection(doc, event, {
clearRedo:!1
}), void 0;
selAfter = event;
}
var antiChanges = [];
pushSelectionToHistory(selAfter, dest), dest.push({
changes:antiChanges,
generation:hist.generation
}), hist.generation = event.generation || ++hist.maxGeneration;
for (var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange"), i = event.changes.length - 1; i >= 0; --i) {
var change = event.changes[i];
if (change.origin = type, filter && !filterChange(doc, change, !1)) return source.length = 0, 
void 0;
antiChanges.push(historyChangeFromChange(doc, change));
var after = i ? computeSelAfterChange(doc, change, null) :lst(source);
makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change)), !i && doc.cm && doc.cm.scrollIntoView(change);
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
if (0 != distance && (doc.first += distance, doc.sel = new Selection(map(doc.sel.ranges, function(range) {
return new Range(Pos(range.anchor.line + distance, range.anchor.ch), Pos(range.head.line + distance, range.head.ch));
}), doc.sel.primIndex), doc.cm)) {
regChange(doc.cm, doc.first, doc.first - distance, distance);
for (var d = doc.cm.display, l = d.viewFrom; l < d.viewTo; l++) regLineChange(doc.cm, l, "gutter");
}
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
doc.cm ? makeChangeSingleDocInEditor(doc.cm, change, spans) :updateDoc(doc, change, spans), 
setSelectionNoUndo(doc, selAfter, sel_dontScroll);
}
}
function makeChangeSingleDocInEditor(cm, change, spans) {
var doc = cm.doc, display = cm.display, from = change.from, to = change.to, recomputeMaxLength = !1, checkWidthStart = from.line;
cm.options.lineWrapping || (checkWidthStart = lineNo(visualLine(getLine(doc, from.line))), 
doc.iter(checkWidthStart, to.line + 1, function(line) {
return line == display.maxLine ? (recomputeMaxLength = !0, !0) :void 0;
})), doc.sel.contains(change.from, change.to) > -1 && signalCursorActivity(cm), 
updateDoc(doc, change, spans, estimateHeight(cm)), cm.options.lineWrapping || (doc.iter(checkWidthStart, from.line + change.text.length, function(line) {
var len = lineLength(line);
len > display.maxLineLength && (display.maxLine = line, display.maxLineLength = len, 
display.maxLineChanged = !0, recomputeMaxLength = !1);
}), recomputeMaxLength && (cm.curOp.updateMaxLine = !0)), doc.frontier = Math.min(doc.frontier, from.line), 
startWorker(cm, 400);
var lendiff = change.text.length - (to.line - from.line) - 1;
from.line != to.line || 1 != change.text.length || isWholeLineUpdate(cm.doc, change) ? regChange(cm, from.line, to.line + 1, lendiff) :regLineChange(cm, from.line, "text");
var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
if (changeHandler || changesHandler) {
var obj = {
from:from,
to:to,
text:change.text,
removed:change.removed,
origin:change.origin
};
changeHandler && signalLater(cm, "change", cm, obj), changesHandler && (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
}
cm.display.selForContextMenu = null;
}
function replaceRange(doc, code, from, to, origin) {
if (to || (to = from), cmp(to, from) < 0) {
var tmp = to;
to = from, from = tmp;
}
"string" == typeof code && (code = splitLines(code)), makeChange(doc, {
from:from,
to:to,
text:code,
origin:origin
});
}
function maybeScrollWindow(cm, coords) {
var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
if (coords.top + box.top < 0 ? doScroll = !0 :coords.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight) && (doScroll = !1), 
null != doScroll && !phantom) {
var scrollNode = elt("div", "\u200b", null, "position: absolute; top: " + (coords.top - display.viewOffset - paddingTop(cm.display)) + "px; height: " + (coords.bottom - coords.top + scrollerCutOff) + "px; left: " + coords.left + "px; width: 2px;");
cm.display.lineSpace.appendChild(scrollNode), scrollNode.scrollIntoView(doScroll), 
cm.display.lineSpace.removeChild(scrollNode);
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
var screentop = cm.curOp && null != cm.curOp.scrollTop ? cm.curOp.scrollTop :display.scroller.scrollTop, screen = display.scroller.clientHeight - scrollerCutOff, result = {}, docBottom = cm.doc.height + paddingVert(display), atTop = snapMargin > y1, atBottom = y2 > docBottom - snapMargin;
if (screentop > y1) result.scrollTop = atTop ? 0 :y1; else if (y2 > screentop + screen) {
var newTop = Math.min(y1, (atBottom ? docBottom :y2) - screen);
newTop != screentop && (result.scrollTop = newTop);
}
var screenleft = cm.curOp && null != cm.curOp.scrollLeft ? cm.curOp.scrollLeft :display.scroller.scrollLeft, screenw = display.scroller.clientWidth - scrollerCutOff;
x1 += display.gutters.offsetWidth, x2 += display.gutters.offsetWidth;
var gutterw = display.gutters.offsetWidth, atLeft = gutterw + 10 > x1;
return screenleft + gutterw > x1 || atLeft ? (atLeft && (x1 = 0), result.scrollLeft = Math.max(0, x1 - 10 - gutterw)) :x2 > screenw + screenleft - 3 && (result.scrollLeft = x2 + 10 - screenw), 
result;
}
function addToScrollPos(cm, left, top) {
(null != left || null != top) && resolveScrollToPos(cm), null != left && (cm.curOp.scrollLeft = (null == cm.curOp.scrollLeft ? cm.doc.scrollLeft :cm.curOp.scrollLeft) + left), 
null != top && (cm.curOp.scrollTop = (null == cm.curOp.scrollTop ? cm.doc.scrollTop :cm.curOp.scrollTop) + top);
}
function ensureCursorVisible(cm) {
resolveScrollToPos(cm);
var cur = cm.getCursor(), from = cur, to = cur;
cm.options.lineWrapping || (from = cur.ch ? Pos(cur.line, cur.ch - 1) :cur, to = Pos(cur.line, cur.ch + 1)), 
cm.curOp.scrollToPos = {
from:from,
to:to,
margin:cm.options.cursorScrollMargin,
isCursor:!0
};
}
function resolveScrollToPos(cm) {
var range = cm.curOp.scrollToPos;
if (range) {
cm.curOp.scrollToPos = null;
var from = estimateCoords(cm, range.from), to = estimateCoords(cm, range.to), sPos = calculateScrollPos(cm, Math.min(from.left, to.left), Math.min(from.top, to.top) - range.margin, Math.max(from.right, to.right), Math.max(from.bottom, to.bottom) + range.margin);
cm.scrollTo(sPos.scrollLeft, sPos.scrollTop);
}
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
if (indentation > pos && (indentString += spaceStr(indentation - pos)), indentString != curSpaceString) replaceRange(cm.doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input"); else for (var i = 0; i < doc.sel.ranges.length; i++) {
var range = doc.sel.ranges[i];
if (range.head.line == n && range.head.ch < curSpaceString.length) {
var pos = Pos(n, curSpaceString.length);
replaceOneSelection(doc, i, new Range(pos, pos));
break;
}
}
line.stateAfter = null;
}
function changeLine(doc, handle, changeType, op) {
var no = handle, line = handle;
return "number" == typeof handle ? line = getLine(doc, clipLine(doc, handle)) :no = lineNo(handle), 
null == no ? null :(op(line, no) && doc.cm && regLineChange(doc.cm, no, changeType), 
line);
}
function deleteNearSelection(cm, compute) {
for (var ranges = cm.doc.sel.ranges, kill = [], i = 0; i < ranges.length; i++) {
for (var toKill = compute(ranges[i]); kill.length && cmp(toKill.from, lst(kill).to) <= 0; ) {
var replaced = kill.pop();
if (cmp(replaced.from, toKill.from) < 0) {
toKill.from = replaced.from;
break;
}
}
kill.push(toKill);
}
runInOp(cm, function() {
for (var i = kill.length - 1; i >= 0; i--) replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete");
ensureCursorVisible(cm);
});
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
if ("char" == unit) moveOnce(); else if ("column" == unit) moveOnce(!0); else if ("word" == unit || "group" == unit) for (var sawType = null, group = "group" == unit, helper = doc.cm && doc.cm.getHelper(pos, "wordChars"), first = !0; !(0 > dir) || moveOnce(!first); first = !1) {
var cur = lineObj.text.charAt(ch) || "\n", type = isWordChar(cur, helper) ? "w" :group && "\n" == cur ? "n" :!group || /\s/.test(cur) ? null :"p";
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
function findWordAt(cm, pos) {
var doc = cm.doc, line = getLine(doc, pos.line).text, start = pos.ch, end = pos.ch;
if (line) {
var helper = cm.getHelper(pos, "wordChars");
(pos.xRel < 0 || end == line.length) && start ? --start :++end;
for (var startChar = line.charAt(start), check = isWordChar(startChar, helper) ? function(ch) {
return isWordChar(ch, helper);
} :/\s/.test(startChar) ? function(ch) {
return /\s/.test(ch);
} :function(ch) {
return !/\s/.test(ch) && !isWordChar(ch);
}; start > 0 && check(line.charAt(start - 1)); ) --start;
for (;end < line.length && check(line.charAt(end)); ) ++end;
}
return new Range(Pos(pos.line, start), Pos(pos.line, end));
}
function option(name, deflt, handle, notOnInit) {
CodeMirror.defaults[name] = deflt, handle && (optionHandlers[name] = notOnInit ? function(cm, val, old) {
old != Init && handle(cm, val, old);
} :handle);
}
function getKeyMap(val) {
return "string" == typeof val ? keyMap[val] :val;
}
function markText(doc, from, to, options, type) {
if (options && options.shared) return markTextShared(doc, from, to, options, type);
if (doc.cm && !doc.cm.curOp) return operation(doc.cm, markText)(doc, from, to, options, type);
var marker = new TextMarker(doc, type), diff = cmp(from, to);
if (options && copyObj(options, marker, !1), diff > 0 || 0 == diff && marker.clearWhenEmpty !== !1) return marker;
if (marker.replacedWith && (marker.collapsed = !0, marker.widgetNode = elt("span", [ marker.replacedWith ], "CodeMirror-widget"), 
options.handleMouseEvents || (marker.widgetNode.ignoreEvents = !0), options.insertLeft && (marker.widgetNode.insertLeft = !0)), 
marker.collapsed) {
if (conflictingCollapsedRange(doc, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
sawCollapsedSpans = !0;
}
marker.addToHistory && addChangeToHistory(doc, {
from:from,
to:to,
origin:"markText"
}, doc.sel, 0/0);
var updateMaxLine, curLine = from.line, cm = doc.cm;
if (doc.iter(curLine, to.line + 1, function(line) {
cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine && (updateMaxLine = !0), 
marker.collapsed && curLine != from.line && updateLineHeight(line, 0), addMarkedSpan(line, new MarkedSpan(marker, curLine == from.line ? from.ch :null, curLine == to.line ? to.ch :null)), 
++curLine;
}), marker.collapsed && doc.iter(from.line, to.line + 1, function(line) {
lineIsHidden(doc, line) && updateLineHeight(line, 0);
}), marker.clearOnEnter && on(marker, "beforeCursorEnter", function() {
marker.clear();
}), marker.readOnly && (sawReadOnlySpans = !0, (doc.history.done.length || doc.history.undone.length) && doc.clearHistory()), 
marker.collapsed && (marker.id = ++nextMarkerId, marker.atomic = !0), cm) {
if (updateMaxLine && (cm.curOp.updateMaxLine = !0), marker.collapsed) regChange(cm, from.line, to.line + 1); else if (marker.className || marker.title || marker.startStyle || marker.endStyle) for (var i = from.line; i <= to.line; i++) regLineChange(cm, i, "text");
marker.atomic && reCheckSelection(cm.doc), signalLater(cm, "markerAdded", cm, marker);
}
return marker;
}
function markTextShared(doc, from, to, options, type) {
options = copyObj(options), options.shared = !1;
var markers = [ markText(doc, from, to, options, type) ], primary = markers[0], widget = options.widgetNode;
return linkedDocs(doc, function(doc) {
widget && (options.widgetNode = widget.cloneNode(!0)), markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
for (var i = 0; i < doc.linked.length; ++i) if (doc.linked[i].isParent) return;
primary = lst(markers);
}), new SharedTextMarker(markers, primary);
}
function findSharedMarkers(doc) {
return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())), function(m) {
return m.parent;
});
}
function copySharedMarkers(doc, markers) {
for (var i = 0; i < markers.length; i++) {
var marker = markers[i], pos = marker.find(), mFrom = doc.clipPos(pos.from), mTo = doc.clipPos(pos.to);
if (cmp(mFrom, mTo)) {
var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
marker.markers.push(subMark), subMark.parent = marker;
}
}
}
function detachSharedMarkers(markers) {
for (var i = 0; i < markers.length; i++) {
var marker = markers[i], linked = [ marker.primary.doc ];
linkedDocs(marker.primary.doc, function(d) {
linked.push(d);
});
for (var j = 0; j < marker.markers.length; j++) {
var subMarker = marker.markers[j];
-1 == indexOf(linked, subMarker.doc) && (subMarker.parent = null, marker.markers.splice(j--, 1));
}
}
}
function MarkedSpan(marker, from, to) {
this.marker = marker, this.from = from, this.to = to;
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
(nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null :span.to));
}
}
return nw;
}
function markedSpansAfter(old, endCh, isInsert) {
if (old) for (var nw, i = 0; i < old.length; ++i) {
var span = old[i], marker = span.marker, endsAfter = null == span.to || (marker.inclusiveRight ? span.to >= endCh :span.to > endCh);
if (endsAfter || span.from == endCh && "bookmark" == marker.type && (!isInsert || span.marker.insertLeft)) {
var startsBefore = null == span.from || (marker.inclusiveLeft ? span.from <= endCh :span.from < endCh);
(nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null :span.from - endCh, null == span.to ? null :span.to - endCh));
}
}
return nw;
}
function stretchSpansOverChange(doc, change) {
var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans, oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
if (!oldFirst && !oldLast) return null;
var startCh = change.from.ch, endCh = change.to.ch, isInsert = 0 == cmp(change.from, change.to), first = markedSpansBefore(oldFirst, startCh, isInsert), last = markedSpansAfter(oldLast, endCh, isInsert), sameLine = 1 == change.text.length, offset = lst(change.text).length + (sameLine ? startCh :0);
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
if (gap > 0 && first) for (var i = 0; i < first.length; ++i) null == first[i].to && (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i].marker, null, null));
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
} ], i = 0; i < markers.length; ++i) for (var mk = markers[i], m = mk.find(0), j = 0; j < parts.length; ++j) {
var p = parts[j];
if (!(cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0)) {
var newParts = [ j, 1 ], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
(0 > dfrom || !mk.inclusiveLeft && !dfrom) && newParts.push({
from:p.from,
to:m.from
}), (dto > 0 || !mk.inclusiveRight && !dto) && newParts.push({
from:m.to,
to:p.to
}), parts.splice.apply(parts, newParts), j += newParts.length - 1;
}
}
return parts;
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
var found = sp.marker.find(0), fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker), toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
if (!(fromCmp >= 0 && 0 >= toCmp || 0 >= fromCmp && toCmp >= 0) && (0 >= fromCmp && (cmp(found.to, from) > 0 || sp.marker.inclusiveRight && marker.inclusiveLeft) || fromCmp >= 0 && (cmp(found.from, to) < 0 || sp.marker.inclusiveLeft && marker.inclusiveRight))) return !0;
}
}
}
function visualLine(line) {
for (var merged; merged = collapsedSpanAtStart(line); ) line = merged.find(-1, !0).line;
return line;
}
function visualLineContinued(line) {
for (var merged, lines; merged = collapsedSpanAtEnd(line); ) line = merged.find(1, !0).line, 
(lines || (lines = [])).push(line);
return lines;
}
function visualLineNo(doc, lineN) {
var line = getLine(doc, lineN), vis = visualLine(line);
return line == vis ? lineN :lineNo(vis);
}
function visualLineEndNo(doc, lineN) {
if (lineN > doc.lastLine()) return lineN;
var merged, line = getLine(doc, lineN);
if (!lineIsHidden(doc, line)) return lineN;
for (;merged = collapsedSpanAtEnd(line); ) line = merged.find(1, !0).line;
return lineNo(line) + 1;
}
function lineIsHidden(doc, line) {
var sps = sawCollapsedSpans && line.markedSpans;
if (sps) for (var sp, i = 0; i < sps.length; ++i) if (sp = sps[i], sp.marker.collapsed) {
if (null == sp.from) return !0;
if (!sp.marker.widgetNode && 0 == sp.from && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp)) return !0;
}
}
function lineIsHiddenInner(doc, line, span) {
if (null == span.to) {
var end = span.marker.find(1, !0);
return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
}
if (span.marker.inclusiveRight && span.to == line.text.length) return !0;
for (var sp, i = 0; i < line.markedSpans.length; ++i) if (sp = line.markedSpans[i], 
sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (null == sp.to || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc, line, sp)) return !0;
}
function adjustScrollWhenAboveVisible(cm, line, diff) {
heightAtLine(line) < (cm.curOp && cm.curOp.scrollTop || cm.doc.scrollTop) && addToScrollPos(cm, null, diff);
}
function widgetHeight(widget) {
if (null != widget.height) return widget.height;
if (!contains(document.body, widget.node)) {
var parentStyle = "position: relative;";
widget.coverGutter && (parentStyle += "margin-left: -" + widget.cm.getGutterElement().offsetWidth + "px;"), 
removeChildrenAndAdd(widget.cm.display.measure, elt("div", [ widget.node ], null, parentStyle));
}
return widget.height = widget.node.offsetHeight;
}
function addLineWidget(cm, handle, node, options) {
var widget = new LineWidget(cm, node, options);
return widget.noHScroll && (cm.display.alignWidgets = !0), changeLine(cm.doc, handle, "widget", function(line) {
var widgets = line.widgets || (line.widgets = []);
if (null == widget.insertAt ? widgets.push(widget) :widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget), 
widget.line = line, !lineIsHidden(cm.doc, line)) {
var aboveVisible = heightAtLine(line) < cm.doc.scrollTop;
updateLineHeight(line, line.height + widgetHeight(widget)), aboveVisible && addToScrollPos(cm, null, widget.height), 
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
function extractLineClasses(type, output) {
if (type) for (;;) {
var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
if (!lineClass) break;
type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
var prop = lineClass[1] ? "bgClass" :"textClass";
null == output[prop] ? output[prop] = lineClass[2] :new RegExp("(?:^|s)" + lineClass[2] + "(?:$|s)").test(output[prop]) || (output[prop] += " " + lineClass[2]);
}
return type;
}
function callBlankLine(mode, state) {
if (mode.blankLine) return mode.blankLine(state);
if (mode.innerMode) {
var inner = CodeMirror.innerMode(mode, state);
return inner.mode.blankLine ? inner.mode.blankLine(inner.state) :void 0;
}
}
function readToken(mode, stream, state) {
for (var i = 0; 10 > i; i++) {
var style = mode.token(stream, state);
if (stream.pos > stream.start) return style;
}
throw new Error("Mode " + mode.name + " failed to advance stream.");
}
function runMode(cm, text, mode, state, f, lineClasses, forceToEnd) {
var flattenSpans = mode.flattenSpans;
null == flattenSpans && (flattenSpans = cm.options.flattenSpans);
var style, curStart = 0, curStyle = null, stream = new StringStream(text, cm.options.tabSize);
for ("" == text && extractLineClasses(callBlankLine(mode, state), lineClasses); !stream.eol(); ) {
if (stream.pos > cm.options.maxHighlightLength ? (flattenSpans = !1, forceToEnd && processLine(cm, text, state, stream.pos), 
stream.pos = text.length, style = null) :style = extractLineClasses(readToken(mode, stream, state), lineClasses), 
cm.options.addModeClass) {
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
var st = [ cm.state.modeGen ], lineClasses = {};
runMode(cm, line.text, cm.doc.mode, state, function(end, style) {
st.push(end, style);
}, lineClasses, forceToEnd);
for (var o = 0; o < cm.state.overlays.length; ++o) {
var overlay = cm.state.overlays[o], i = 1, at = 0;
runMode(cm, line.text, overlay.mode, !0, function(end, style) {
for (var start = i; end > at; ) {
var i_end = st[i];
i_end > end && st.splice(i, 1, end, st[i + 1], i_end), i += 2, at = Math.min(end, i_end);
}
if (style) if (overlay.opaque) st.splice(start, i - start, end, "cm-overlay " + style), 
i = start + 2; else for (;i > start; start += 2) {
var cur = st[start + 1];
st[start + 1] = (cur ? cur + " " :"") + "cm-overlay " + style;
}
}, lineClasses);
}
return {
styles:st,
classes:lineClasses.bgClass || lineClasses.textClass ? lineClasses :null
};
}
function getLineStyles(cm, line) {
if (!line.styles || line.styles[0] != cm.state.modeGen) {
var result = highlightLine(cm, line, line.stateAfter = getStateBefore(cm, lineNo(line)));
line.styles = result.styles, result.classes ? line.styleClasses = result.classes :line.styleClasses && (line.styleClasses = null);
}
return line.styles;
}
function processLine(cm, text, state, startAt) {
var mode = cm.doc.mode, stream = new StringStream(text, cm.options.tabSize);
for (stream.start = stream.pos = startAt || 0, "" == text && callBlankLine(mode, state); !stream.eol() && stream.pos <= cm.options.maxHighlightLength; ) readToken(mode, stream, state), 
stream.start = stream.pos;
}
function interpretTokenStyle(style, options) {
if (!style || /^\s*$/.test(style)) return null;
var cache = options.addModeClass ? styleToClassCacheWithMode :styleToClassCache;
return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
}
function buildLineContent(cm, lineView) {
var content = elt("span", null, null, webkit ? "padding-right: .1px" :null), builder = {
pre:elt("pre", [ content ]),
content:content,
col:0,
pos:0,
cm:cm
};
lineView.measure = {};
for (var i = 0; i <= (lineView.rest ? lineView.rest.length :0); i++) {
var order, line = i ? lineView.rest[i - 1] :lineView.line;
builder.pos = 0, builder.addToken = buildToken, (ie || webkit) && cm.getOption("lineWrapping") && (builder.addToken = buildTokenSplitSpaces(builder.addToken)), 
hasBadBidiRects(cm.display.measure) && (order = getOrder(line)) && (builder.addToken = buildTokenBadBidi(builder.addToken, order)), 
builder.map = [], insertLineContent(line, builder, getLineStyles(cm, line)), line.styleClasses && (line.styleClasses.bgClass && (builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "")), 
line.styleClasses.textClass && (builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || ""))), 
0 == builder.map.length && builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure))), 
0 == i ? (lineView.measure.map = builder.map, lineView.measure.cache = {}) :((lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map), 
(lineView.measure.caches || (lineView.measure.caches = [])).push({}));
}
return signal(cm, "renderLine", cm, lineView.line, builder.pre), builder.pre.className && (builder.textClass = joinClasses(builder.pre.className, builder.textClass || "")), 
builder;
}
function defaultSpecialCharPlaceholder(ch) {
var token = elt("span", "\u2022", "cm-invalidchar");
return token.title = "\\u" + ch.charCodeAt(0).toString(16), token;
}
function buildToken(builder, text, style, startStyle, endStyle, title) {
if (text) {
var special = builder.cm.options.specialChars, mustWrap = !1;
if (special.test(text)) for (var content = document.createDocumentFragment(), pos = 0; ;) {
special.lastIndex = pos;
var m = special.exec(text), skipped = m ? m.index - pos :text.length - pos;
if (skipped) {
var txt = document.createTextNode(text.slice(pos, pos + skipped));
ie && 9 > ie_version ? content.appendChild(elt("span", [ txt ])) :content.appendChild(txt), 
builder.map.push(builder.pos, builder.pos + skipped, txt), builder.col += skipped, 
builder.pos += skipped;
}
if (!m) break;
if (pos += skipped + 1, "	" == m[0]) {
var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize, txt = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
builder.col += tabWidth;
} else {
var txt = builder.cm.options.specialCharPlaceholder(m[0]);
ie && 9 > ie_version ? content.appendChild(elt("span", [ txt ])) :content.appendChild(txt), 
builder.col += 1;
}
builder.map.push(builder.pos, builder.pos + 1, txt), builder.pos++;
} else {
builder.col += text.length;
var content = document.createTextNode(text);
builder.map.push(builder.pos, builder.pos + text.length, content), ie && 9 > ie_version && (mustWrap = !0), 
builder.pos += text.length;
}
if (style || startStyle || endStyle || mustWrap) {
var fullStyle = style || "";
startStyle && (fullStyle += startStyle), endStyle && (fullStyle += endStyle);
var token = elt("span", [ content ], fullStyle);
return title && (token.title = title), builder.content.appendChild(token);
}
builder.content.appendChild(content);
}
}
function buildTokenSplitSpaces(inner) {
function split(old) {
for (var out = " ", i = 0; i < old.length - 2; ++i) out += i % 2 ? " " :"\xa0";
return out += " ";
}
return function(builder, text, style, startStyle, endStyle, title) {
inner(builder, text.replace(/ {3,}/g, split), style, startStyle, endStyle, title);
};
}
function buildTokenBadBidi(inner, order) {
return function(builder, text, style, startStyle, endStyle, title) {
style = style ? style + " cm-force-border" :"cm-force-border";
for (var start = builder.pos, end = start + text.length; ;) {
for (var i = 0; i < order.length; i++) {
var part = order[i];
if (part.to > start && part.from <= start) break;
}
if (part.to >= end) return inner(builder, text, style, startStyle, endStyle, title);
inner(builder, text.slice(0, part.to - start), style, startStyle, null, title), 
startStyle = null, text = text.slice(part.to - start), start = part.to;
}
};
}
function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
var widget = !ignoreWidget && marker.widgetNode;
widget && (builder.map.push(builder.pos, builder.pos + size, widget), builder.content.appendChild(widget)), 
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
"bookmark" == m.type && sp.from == pos && m.widgetNode && foundBookmarks.push(m);
}
if (collapsed && (collapsed.from || 0) == pos && (buildCollapsedSpan(builder, (null == collapsed.to ? len + 1 :collapsed.to) - pos, collapsed.marker, null == collapsed.from), 
null == collapsed.to)) return;
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
text = allText.slice(at, at = styles[i++]), style = interpretTokenStyle(styles[i++], builder.cm.options);
}
} else for (var i = 1; i < styles.length; i += 2) builder.addToken(builder, allText.slice(at, at = styles[i]), interpretTokenStyle(styles[i + 1], builder.cm.options));
}
function isWholeLineUpdate(doc, change) {
return 0 == change.from.ch && 0 == change.to.ch && "" == lst(change.text) && (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
}
function updateDoc(doc, change, markedSpans, estimateHeight) {
function spansFor(n) {
return markedSpans ? markedSpans[n] :null;
}
function update(line, text, spans) {
updateLine(line, text, spans, estimateHeight), signalLater(line, "change", line, change);
}
var from = change.from, to = change.to, text = change.text, firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line), lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
if (isWholeLineUpdate(doc, change)) {
for (var i = 0, added = []; i < text.length - 1; ++i) added.push(new Line(text[i], spansFor(i), estimateHeight));
update(lastLine, lastLine.text, lastSpans), nlines && doc.remove(from.line, nlines), 
added.length && doc.insert(from.line, added);
} else if (firstLine == lastLine) if (1 == text.length) update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans); else {
for (var added = [], i = 1; i < text.length - 1; ++i) added.push(new Line(text[i], spansFor(i), estimateHeight));
added.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight)), 
update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0)), doc.insert(from.line + 1, added);
} else if (1 == text.length) update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0)), 
doc.remove(from.line + 1, nlines); else {
update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0)), update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
for (var i = 1, added = []; i < text.length - 1; ++i) added.push(new Line(text[i], spansFor(i), estimateHeight));
nlines > 1 && doc.remove(from.line + 1, nlines - 1), doc.insert(from.line + 1, added);
}
signalLater(doc, "change", doc, change);
}
function LeafChunk(lines) {
this.lines = lines, this.parent = null;
for (var i = 0, height = 0; i < lines.length; ++i) lines[i].parent = this, height += lines[i].height;
this.height = height;
}
function BranchChunk(children) {
this.children = children;
for (var size = 0, height = 0, i = 0; i < children.length; ++i) {
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
cm.doc = doc, doc.cm = cm, estimateLineHeights(cm), loadMode(cm), cm.options.lineWrapping || findMaxLine(cm), 
cm.options.mode = doc.modeOption, regChange(cm);
}
function getLine(doc, n) {
if (n -= doc.first, 0 > n || n >= doc.size) throw new Error("There is no line " + (n + doc.first) + " in the document.");
for (var chunk = doc; !chunk.lines; ) for (var i = 0; ;++i) {
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
var diff = height - line.height;
if (diff) for (var n = line; n; n = n.parent) n.height += diff;
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
for (var i = 0; i < chunk.children.length; ++i) {
var child = chunk.children[i], ch = child.height;
if (ch > h) {
chunk = child;
continue outer;
}
h -= ch, n += child.chunkSize();
}
return n;
} while (!chunk.lines);
for (var i = 0; i < chunk.lines.length; ++i) {
var line = chunk.lines[i], lh = line.height;
if (lh > h) break;
h -= lh;
}
return n + i;
}
function heightAtLine(lineObj) {
lineObj = visualLine(lineObj);
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
function History(startGen) {
this.done = [], this.undone = [], this.undoDepth = 1/0, this.lastModTime = this.lastSelTime = 0, 
this.lastOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = startGen || 1;
}
function historyChangeFromChange(doc, change) {
var histChange = {
from:copyPos(change.from),
to:changeEnd(change),
text:getBetween(doc, change.from, change.to)
};
return attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1), 
linkedDocs(doc, function(doc) {
attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
}, !0), histChange;
}
function clearSelectionEvents(array) {
for (;array.length; ) {
var last = lst(array);
if (!last.ranges) break;
array.pop();
}
}
function lastChangeEvent(hist, force) {
return force ? (clearSelectionEvents(hist.done), lst(hist.done)) :hist.done.length && !lst(hist.done).ranges ? lst(hist.done) :hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges ? (hist.done.pop(), 
lst(hist.done)) :void 0;
}
function addChangeToHistory(doc, change, selAfter, opId) {
var hist = doc.history;
hist.undone.length = 0;
var cur, time = +new Date();
if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && ("+" == change.origin.charAt(0) && doc.cm && hist.lastModTime > time - doc.cm.options.historyEventDelay || "*" == change.origin.charAt(0))) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
var last = lst(cur.changes);
0 == cmp(change.from, change.to) && 0 == cmp(change.from, last.to) ? last.to = changeEnd(change) :cur.changes.push(historyChangeFromChange(doc, change));
} else {
var before = lst(hist.done);
for (before && before.ranges || pushSelectionToHistory(doc.sel, hist.done), cur = {
changes:[ historyChangeFromChange(doc, change) ],
generation:hist.generation
}, hist.done.push(cur); hist.done.length > hist.undoDepth; ) hist.done.shift(), 
hist.done[0].ranges || hist.done.shift();
}
hist.done.push(selAfter), hist.generation = ++hist.maxGeneration, hist.lastModTime = hist.lastSelTime = time, 
hist.lastOp = opId, hist.lastOrigin = hist.lastSelOrigin = change.origin, last || signal(doc, "historyAdded");
}
function selectionEventCanBeMerged(doc, origin, prev, sel) {
var ch = origin.charAt(0);
return "*" == ch || "+" == ch && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && new Date() - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay :500);
}
function addSelectionToHistory(doc, sel, opId, options) {
var hist = doc.history, origin = options && options.origin;
opId == hist.lastOp || origin && hist.lastSelOrigin == origin && (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin || selectionEventCanBeMerged(doc, origin, lst(hist.done), sel)) ? hist.done[hist.done.length - 1] = sel :pushSelectionToHistory(sel, hist.done), 
hist.lastSelTime = +new Date(), hist.lastSelOrigin = origin, hist.lastOp = opId, 
options && options.clearRedo !== !1 && clearSelectionEvents(hist.undone);
}
function pushSelectionToHistory(sel, dest) {
var top = lst(dest);
top && top.ranges && top.equals(sel) || dest.push(sel);
}
function attachLocalSpans(doc, change, from, to) {
var existing = change["spans_" + doc.id], n = 0;
doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function(line) {
line.markedSpans && ((existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans), 
++n;
});
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
function copyHistoryArray(events, newGroup, instantiateSel) {
for (var i = 0, copy = []; i < events.length; ++i) {
var event = events[i];
if (event.ranges) copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) :event); else {
var changes = event.changes, newChanges = [];
copy.push({
changes:newChanges
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
}
return copy;
}
function rebaseHistSelSingle(pos, from, to, diff) {
to < pos.line ? pos.line += diff :from < pos.line && (pos.line = from, pos.ch = 0);
}
function rebaseHistArray(array, from, to, diff) {
for (var i = 0; i < array.length; ++i) {
var sub = array[i], ok = !0;
if (sub.ranges) {
sub.copied || (sub = array[i] = sub.deepCopy(), sub.copied = !0);
for (var j = 0; j < sub.ranges.length; j++) rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff), 
rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
} else {
for (var j = 0; j < sub.changes.length; ++j) {
var cur = sub.changes[j];
if (to < cur.from.line) cur.from = Pos(cur.from.line + diff, cur.from.ch), cur.to = Pos(cur.to.line + diff, cur.to.ch); else if (from <= cur.to.line) {
ok = !1;
break;
}
}
ok || (array.splice(0, i + 1), i = 0);
}
}
}
function rebaseHist(hist, change) {
var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
rebaseHistArray(hist.done, from, to, diff), rebaseHistArray(hist.undone, from, to, diff);
}
function e_defaultPrevented(e) {
return null != e.defaultPrevented ? e.defaultPrevented :0 == e.returnValue;
}
function e_target(e) {
return e.target || e.srcElement;
}
function e_button(e) {
var b = e.which;
return null == b && (1 & e.button ? b = 1 :2 & e.button ? b = 3 :4 & e.button && (b = 2)), 
mac && e.ctrlKey && 1 == b && (b = 3), b;
}
function signalLater(emitter, type) {
function bnd(f) {
return function() {
f.apply(null, args);
};
}
var arr = emitter._handlers && emitter._handlers[type];
if (arr) {
var list, args = Array.prototype.slice.call(arguments, 2);
operationGroup ? list = operationGroup.delayedCallbacks :orphanDelayedCallbacks ? list = orphanDelayedCallbacks :(list = orphanDelayedCallbacks = [], 
setTimeout(fireOrphanDelayed, 0));
for (var i = 0; i < arr.length; ++i) list.push(bnd(arr[i]));
}
}
function fireOrphanDelayed() {
var delayed = orphanDelayedCallbacks;
orphanDelayedCallbacks = null;
for (var i = 0; i < delayed.length; ++i) delayed[i]();
}
function signalDOMEvent(cm, e, override) {
return signal(cm, override || e.type, cm, e), e_defaultPrevented(e) || e.codemirrorIgnore;
}
function signalCursorActivity(cm) {
var arr = cm._handlers && cm._handlers.cursorActivity;
if (arr) for (var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []), i = 0; i < arr.length; ++i) -1 == indexOf(set, arr[i]) && set.push(arr[i]);
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
function findColumn(string, goal, tabSize) {
for (var pos = 0, col = 0; ;) {
var nextTab = string.indexOf("	", pos);
-1 == nextTab && (nextTab = string.length);
var skipped = nextTab - pos;
if (nextTab == string.length || col + skipped >= goal) return pos + Math.min(skipped, goal - col);
if (col += nextTab - pos, col += tabSize - col % tabSize, pos = nextTab + 1, col >= goal) return pos;
}
}
function spaceStr(n) {
for (;spaceStrs.length <= n; ) spaceStrs.push(lst(spaceStrs) + " ");
return spaceStrs[n];
}
function lst(arr) {
return arr[arr.length - 1];
}
function indexOf(array, elt) {
for (var i = 0; i < array.length; ++i) if (array[i] == elt) return i;
return -1;
}
function map(array, f) {
for (var out = [], i = 0; i < array.length; i++) out[i] = f(array[i], i);
return out;
}
function createObj(base, props) {
var inst;
if (Object.create) inst = Object.create(base); else {
var ctor = function() {};
ctor.prototype = base, inst = new ctor();
}
return props && copyObj(props, inst), inst;
}
function copyObj(obj, target, overwrite) {
target || (target = {});
for (var prop in obj) !obj.hasOwnProperty(prop) || overwrite === !1 && target.hasOwnProperty(prop) || (target[prop] = obj[prop]);
return target;
}
function bind(f) {
var args = Array.prototype.slice.call(arguments, 1);
return function() {
return f.apply(null, args);
};
}
function isWordChar(ch, helper) {
return helper ? helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch) ? !0 :helper.test(ch) :isWordCharBasic(ch);
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
"string" == typeof content) e.appendChild(document.createTextNode(content)); else if (content) for (var i = 0; i < content.length; ++i) e.appendChild(content[i]);
return e;
}
function removeChildren(e) {
for (var count = e.childNodes.length; count > 0; --count) e.removeChild(e.firstChild);
return e;
}
function removeChildrenAndAdd(parent, e) {
return removeChildren(parent).appendChild(e);
}
function contains(parent, child) {
if (parent.contains) return parent.contains(child);
for (;child = child.parentNode; ) if (child == parent) return !0;
}
function activeElt() {
return document.activeElement;
}
function classTest(cls) {
return new RegExp("\\b" + cls + "\\b\\s*");
}
function rmClass(node, cls) {
var test = classTest(cls);
test.test(node.className) && (node.className = node.className.replace(test, ""));
}
function addClass(node, cls) {
classTest(cls).test(node.className) || (node.className += " " + cls);
}
function joinClasses(a, b) {
for (var as = a.split(" "), i = 0; i < as.length; i++) as[i] && !classTest(as[i]).test(b) && (b += " " + as[i]);
return b;
}
function forEachCodeMirror(f) {
if (document.body.getElementsByClassName) for (var byClass = document.body.getElementsByClassName("CodeMirror"), i = 0; i < byClass.length; i++) {
var cm = byClass[i].CodeMirror;
cm && f(cm);
}
}
function ensureGlobalHandlers() {
globalsRegistered || (registerGlobalHandlers(), globalsRegistered = !0);
}
function registerGlobalHandlers() {
var resizeTimer;
on(window, "resize", function() {
null == resizeTimer && (resizeTimer = setTimeout(function() {
resizeTimer = null, knownScrollbarWidth = null, forEachCodeMirror(onResize);
}, 100));
}), on(window, "blur", function() {
forEachCodeMirror(onBlur);
});
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
0 != measure.firstChild.offsetHeight && (zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && 8 > ie_version));
}
return zwspSupported ? elt("span", "\u200b") :elt("span", "\xa0", null, "display: inline-block; width: 1px; margin-right: -1px");
}
function hasBadBidiRects(measure) {
if (null != badBidiRects) return badBidiRects;
var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062eA")), r0 = range(txt, 0, 1).getBoundingClientRect();
if (r0.left == r0.right) return !1;
var r1 = range(txt, 1, 2).getBoundingClientRect();
return badBidiRects = r1.right - r0.right < 3;
}
function hasBadZoomedRects(measure) {
if (null != badZoomedRects) return badZoomedRects;
var node = removeChildrenAndAdd(measure, elt("span", "x")), normal = node.getBoundingClientRect(), fromRange = range(node, 0, 1).getBoundingClientRect();
return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
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
var line = getLine(cm.doc, lineN), visual = visualLine(line);
visual != line && (lineN = lineNo(visual));
var order = getOrder(visual), ch = order ? order[0].level % 2 ? lineRight(visual) :lineLeft(visual) :0;
return Pos(lineN, ch);
}
function lineEnd(cm, lineN) {
for (var merged, line = getLine(cm.doc, lineN); merged = collapsedSpanAtEnd(line); ) line = merged.find(1, !0).line, 
lineN = null;
var order = getOrder(line), ch = order ? order[0].level % 2 ? lineLeft(line) :lineRight(line) :line.text.length;
return Pos(null == lineN ? lineNo(line) :lineN, ch);
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
var gecko = /gecko\/\d/i.test(navigator.userAgent), ie_upto10 = /MSIE \d/.test(navigator.userAgent), ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), ie = ie_upto10 || ie_11up, ie_version = ie && (ie_upto10 ? document.documentMode || 6 :ie_11up[1]), webkit = /WebKit\//.test(navigator.userAgent), qtwebkit = webkit && /Qt\/\d+\.\d+/.test(navigator.userAgent), chrome = /Chrome\//.test(navigator.userAgent), presto = /Opera\//.test(navigator.userAgent), safari = /Apple Computer/.test(navigator.vendor), khtml = /KHTML\//.test(navigator.userAgent), mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent), phantom = /PhantomJS/.test(navigator.userAgent), ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent), mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent), mac = ios || /Mac/.test(navigator.platform), windows = /win/i.test(navigator.platform), presto_version = presto && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
presto_version && (presto_version = Number(presto_version[1])), presto_version && presto_version >= 15 && (presto = !1, 
webkit = !0);
var flipCtrlCmd = mac && (qtwebkit || presto && (null == presto_version || 12.11 > presto_version)), captureRightClick = gecko || ie && ie_version >= 9, sawReadOnlySpans = !1, sawCollapsedSpans = !1, Pos = CodeMirror.Pos = function(line, ch) {
return this instanceof Pos ? (this.line = line, this.ch = ch, void 0) :new Pos(line, ch);
}, cmp = CodeMirror.cmpPos = function(a, b) {
return a.line - b.line || a.ch - b.ch;
};
Selection.prototype = {
primary:function() {
return this.ranges[this.primIndex];
},
equals:function(other) {
if (other == this) return !0;
if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) return !1;
for (var i = 0; i < this.ranges.length; i++) {
var here = this.ranges[i], there = other.ranges[i];
if (0 != cmp(here.anchor, there.anchor) || 0 != cmp(here.head, there.head)) return !1;
}
return !0;
},
deepCopy:function() {
for (var out = [], i = 0; i < this.ranges.length; i++) out[i] = new Range(copyPos(this.ranges[i].anchor), copyPos(this.ranges[i].head));
return new Selection(out, this.primIndex);
},
somethingSelected:function() {
for (var i = 0; i < this.ranges.length; i++) if (!this.ranges[i].empty()) return !0;
return !1;
},
contains:function(pos, end) {
end || (end = pos);
for (var i = 0; i < this.ranges.length; i++) {
var range = this.ranges[i];
if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0) return i;
}
return -1;
}
}, Range.prototype = {
from:function() {
return minPos(this.anchor, this.head);
},
to:function() {
return maxPos(this.anchor, this.head);
},
empty:function() {
return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
}
};
var measureText, lastClick, lastDoubleClick, nullRect = {
left:0,
right:0,
top:0,
bottom:0
}, operationGroup = null, nextOpId = 0, lastDrop = 0, wheelSamples = 0, wheelPixelsPerUnit = null;
ie ? wheelPixelsPerUnit = -.53 :gecko ? wheelPixelsPerUnit = 15 :chrome ? wheelPixelsPerUnit = -.7 :safari && (wheelPixelsPerUnit = -1 / 3);
var maybeTransition, lastStoppedKey = null, changeEnd = CodeMirror.changeEnd = function(change) {
return change.text ? Pos(change.from.line + change.text.length - 1, lst(change.text).length + (1 == change.text.length ? change.from.ch :0)) :change.to;
};
CodeMirror.prototype = {
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
addOverlay:methodOp(function(spec, options) {
var mode = spec.token ? spec :CodeMirror.getMode(this.options, spec);
if (mode.startState) throw new Error("Overlays may not be stateful.");
this.state.overlays.push({
mode:mode,
modeSpec:spec,
opaque:options && options.opaque
}), this.state.modeGen++, regChange(this);
}),
removeOverlay:methodOp(function(spec) {
for (var overlays = this.state.overlays, i = 0; i < overlays.length; ++i) {
var cur = overlays[i].modeSpec;
if (cur == spec || "string" == typeof spec && cur.name == spec) return overlays.splice(i, 1), 
this.state.modeGen++, regChange(this), void 0;
}
}),
indentLine:methodOp(function(n, dir, aggressive) {
"string" != typeof dir && "number" != typeof dir && (dir = null == dir ? this.options.smartIndent ? "smart" :"prev" :dir ? "add" :"subtract"), 
isLine(this.doc, n) && indentLine(this, n, dir, aggressive);
}),
indentSelection:methodOp(function(how) {
for (var ranges = this.doc.sel.ranges, end = -1, i = 0; i < ranges.length; i++) {
var range = ranges[i];
if (range.empty()) range.head.line > end && (indentLine(this, range.head.line, how, !0), 
end = range.head.line, i == this.doc.sel.primIndex && ensureCursorVisible(this)); else {
var start = Math.max(end, range.from().line), to = range.to();
end = Math.min(this.lastLine(), to.line - (to.ch ? 0 :1)) + 1;
for (var j = start; end > j; ++j) indentLine(this, j, how);
}
}
}),
getTokenAt:function(pos, precise) {
var doc = this.doc;
pos = clipPos(doc, pos);
for (var state = getStateBefore(this, pos.line, precise), mode = this.doc.mode, line = getLine(doc, pos.line), stream = new StringStream(line.text, this.options.tabSize); stream.pos < pos.ch && !stream.eol(); ) {
stream.start = stream.pos;
var style = readToken(mode, stream, state);
}
return {
start:stream.start,
end:stream.pos,
string:stream.current(),
type:style || null,
state:state
};
},
getTokenTypeAt:function(pos) {
pos = clipPos(this.doc, pos);
var type, styles = getLineStyles(this, getLine(this.doc, pos.line)), before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
if (0 == ch) type = styles[2]; else for (;;) {
var mid = before + after >> 1;
if ((mid ? styles[2 * mid - 1] :0) >= ch) after = mid; else {
if (!(styles[2 * mid + 1] < ch)) {
type = styles[2 * mid + 2];
break;
}
before = mid + 1;
}
}
var cut = type ? type.indexOf("cm-overlay ") :-1;
return 0 > cut ? type :0 == cut ? null :type.slice(0, cut - 1);
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
var pos, range = this.doc.sel.primary();
return pos = null == start ? range.head :"object" == typeof start ? clipPos(this.doc, start) :start ? range.from() :range.to(), 
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
return intoCoordSystem(this, lineObj, {
top:0,
left:0
}, mode || "page").top + (end ? this.doc.height - heightAtLine(lineObj) :0);
},
defaultTextHeight:function() {
return textHeight(this.display);
},
defaultCharWidth:function() {
return charWidth(this.display);
},
setGutterMarker:methodOp(function(line, gutterID, value) {
return changeLine(this.doc, line, "gutter", function(line) {
var markers = line.gutterMarkers || (line.gutterMarkers = {});
return markers[gutterID] = value, !value && isEmpty(markers) && (line.gutterMarkers = null), 
!0;
});
}),
clearGutter:methodOp(function(gutterID) {
var cm = this, doc = cm.doc, i = doc.first;
doc.iter(function(line) {
line.gutterMarkers && line.gutterMarkers[gutterID] && (line.gutterMarkers[gutterID] = null, 
regLineChange(cm, i, "gutter"), isEmpty(line.gutterMarkers) && (line.gutterMarkers = null)), 
++i;
});
}),
addLineWidget:methodOp(function(handle, node, options) {
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
from:this.display.viewFrom,
to:this.display.viewTo
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
triggerOnKeyDown:methodOp(onKeyDown),
triggerOnKeyPress:methodOp(onKeyPress),
triggerOnKeyUp:onKeyUp,
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
moveH:methodOp(function(dir, unit) {
var cm = this;
cm.extendSelectionsBy(function(range) {
return cm.display.shift || cm.doc.extend || range.empty() ? findPosH(cm.doc, range.head, dir, unit, cm.options.rtlMoveVisually) :0 > dir ? range.from() :range.to();
}, sel_move);
}),
deleteH:methodOp(function(dir, unit) {
var sel = this.doc.sel, doc = this.doc;
sel.somethingSelected() ? doc.replaceSelection("", null, "+delete") :deleteNearSelection(this, function(range) {
var other = findPosH(doc, range.head, dir, unit, !1);
return 0 > dir ? {
from:other,
to:range.head
} :{
from:range.head,
to:other
};
});
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
moveV:methodOp(function(dir, unit) {
var cm = this, doc = this.doc, goals = [], collapse = !cm.display.shift && !doc.extend && doc.sel.somethingSelected();
if (doc.extendSelectionsBy(function(range) {
if (collapse) return 0 > dir ? range.from() :range.to();
var headPos = cursorCoords(cm, range.head, "div");
null != range.goalColumn && (headPos.left = range.goalColumn), goals.push(headPos.left);
var pos = findPosV(cm, headPos, dir, unit);
return "page" == unit && range == doc.sel.primary() && addToScrollPos(cm, null, charCoords(cm, pos, "div").top - headPos.top), 
pos;
}, sel_move), goals.length) for (var i = 0; i < doc.sel.ranges.length; i++) doc.sel.ranges[i].goalColumn = goals[i];
}),
toggleOverwrite:function(value) {
(null == value || value != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? addClass(this.display.cursorDiv, "CodeMirror-overwrite") :rmClass(this.display.cursorDiv, "CodeMirror-overwrite"), 
signal(this, "overwriteToggle", this, this.state.overwrite));
},
hasFocus:function() {
return activeElt() == this.display.input;
},
scrollTo:methodOp(function(x, y) {
(null != x || null != y) && resolveScrollToPos(this), null != x && (this.curOp.scrollLeft = x), 
null != y && (this.curOp.scrollTop = y);
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
scrollIntoView:methodOp(function(range, margin) {
if (null == range ? (range = {
from:this.doc.sel.primary().head,
to:null
}, null == margin && (margin = this.options.cursorScrollMargin)) :"number" == typeof range ? range = {
from:Pos(range, 0),
to:null
} :null == range.from && (range = {
from:range,
to:null
}), range.to || (range.to = range.from), range.margin = margin || 0, null != range.from.line) resolveScrollToPos(this), 
this.curOp.scrollToPos = range; else {
var sPos = calculateScrollPos(this, Math.min(range.from.left, range.to.left), Math.min(range.from.top, range.to.top) - range.margin, Math.max(range.from.right, range.to.right), Math.max(range.from.bottom, range.to.bottom) + range.margin);
this.scrollTo(sPos.scrollLeft, sPos.scrollTop);
}
}),
setSize:methodOp(function(width, height) {
function interpret(val) {
return "number" == typeof val || /^\d+$/.test(String(val)) ? val + "px" :val;
}
var cm = this;
null != width && (cm.display.wrapper.style.width = interpret(width)), null != height && (cm.display.wrapper.style.height = interpret(height)), 
cm.options.lineWrapping && clearLineMeasurementCache(this);
var lineNo = cm.display.viewFrom;
cm.doc.iter(lineNo, cm.display.viewTo, function(line) {
if (line.widgets) for (var i = 0; i < line.widgets.length; i++) if (line.widgets[i].noHScroll) {
regLineChange(cm, lineNo, "widget");
break;
}
++lineNo;
}), cm.curOp.forceUpdate = !0, signal(cm, "refresh", this);
}),
operation:function(f) {
return runInOp(this, f);
},
refresh:methodOp(function() {
var oldHeight = this.display.cachedTextHeight;
regChange(this), this.curOp.forceUpdate = !0, clearCaches(this), this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop), 
updateGutterSpace(this), (null == oldHeight || Math.abs(oldHeight - textHeight(this.display)) > .5) && estimateLineHeights(this), 
signal(this, "refresh", this);
}),
swapDoc:methodOp(function(doc) {
var old = this.doc;
return old.cm = null, attachDoc(this, doc), clearCaches(this), resetInput(this), 
this.scrollTo(doc.scrollLeft, doc.scrollTop), signalLater(this, "swapDoc", this, old), 
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
var defaults = CodeMirror.defaults = {}, optionHandlers = CodeMirror.optionHandlers = {}, Init = CodeMirror.Init = {
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
}, !0), option("keyMap", "default", keyMapChanged), option("extraKeys", null), option("lineWrapping", !1, wrappingChanged, !0), 
option("gutters", [], function(cm) {
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
val || resetInput(cm));
}), option("disableInput", !1, function(cm, val) {
val || resetInput(cm);
}, !0), option("dragDrop", !0), option("cursorBlinkRate", 530), option("cursorScrollMargin", 0), 
option("cursorHeight", 1, updateSelection, !0), option("singleCursorHeightPerLine", !0, updateSelection, !0), 
option("workTime", 100), option("workDelay", 100), option("flattenSpans", !0, resetModeState, !0), 
option("addModeClass", !1, resetModeState, !0), option("pollInterval", 100), option("undoDepth", 200, function(cm, val) {
cm.doc.history.undoDepth = val;
}), option("historyEventDelay", 1250), option("viewportMargin", 10, function(cm) {
cm.refresh();
}, !0), option("maxHighlightLength", 1e4, resetModeState, !0), option("moveInputWithCursor", !0, function(cm, val) {
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
};
var copyState = CodeMirror.copyState = function(mode, state) {
if (state === !0) return state;
if (mode.copyState) return mode.copyState(state);
var nstate = {};
for (var n in state) {
var val = state[n];
val instanceof Array && (val = val.concat([])), nstate[n] = val;
}
return nstate;
}, startState = CodeMirror.startState = function(mode, a1, a2) {
return mode.startState ? mode.startState(a1, a2) :!0;
};
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
cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
},
singleSelection:function(cm) {
cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
},
killLine:function(cm) {
deleteNearSelection(cm, function(range) {
if (range.empty()) {
var len = getLine(cm.doc, range.head.line).text.length;
return range.head.ch == len && range.head.line < cm.lastLine() ? {
from:range.head,
to:Pos(range.head.line + 1, 0)
} :{
from:range.head,
to:Pos(range.head.line, len)
};
}
return {
from:range.from(),
to:range.to()
};
});
},
deleteLine:function(cm) {
deleteNearSelection(cm, function(range) {
return {
from:Pos(range.from().line, 0),
to:clipPos(cm.doc, Pos(range.to().line + 1, 0))
};
});
},
delLineLeft:function(cm) {
deleteNearSelection(cm, function(range) {
return {
from:Pos(range.from().line, 0),
to:range.from()
};
});
},
undo:function(cm) {
cm.undo();
},
redo:function(cm) {
cm.redo();
},
undoSelection:function(cm) {
cm.undoSelection();
},
redoSelection:function(cm) {
cm.redoSelection();
},
goDocStart:function(cm) {
cm.extendSelection(Pos(cm.firstLine(), 0));
},
goDocEnd:function(cm) {
cm.extendSelection(Pos(cm.lastLine()));
},
goLineStart:function(cm) {
cm.extendSelectionsBy(function(range) {
return lineStart(cm, range.head.line);
}, {
origin:"+move",
bias:1
});
},
goLineStartSmart:function(cm) {
cm.extendSelectionsBy(function(range) {
var start = lineStart(cm, range.head.line), line = cm.getLineHandle(start.line), order = getOrder(line);
if (!order || 0 == order[0].level) {
var firstNonWS = Math.max(0, line.text.search(/\S/)), inWS = range.head.line == start.line && range.head.ch <= firstNonWS && range.head.ch;
return Pos(start.line, inWS ? 0 :firstNonWS);
}
return start;
}, {
origin:"+move",
bias:1
});
},
goLineEnd:function(cm) {
cm.extendSelectionsBy(function(range) {
return lineEnd(cm, range.head.line);
}, {
origin:"+move",
bias:-1
});
},
goLineRight:function(cm) {
cm.extendSelectionsBy(function(range) {
var top = cm.charCoords(range.head, "div").top + 5;
return cm.coordsChar({
left:cm.display.lineDiv.offsetWidth + 100,
top:top
}, "div");
}, sel_move);
},
goLineLeft:function(cm) {
cm.extendSelectionsBy(function(range) {
var top = cm.charCoords(range.head, "div").top + 5;
return cm.coordsChar({
left:0,
top:top
}, "div");
}, sel_move);
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
cm.replaceSelection("	");
},
insertSoftTab:function(cm) {
for (var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize, i = 0; i < ranges.length; i++) {
var pos = ranges[i].from(), col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
spaces.push(new Array(tabSize - col % tabSize + 1).join(" "));
}
cm.replaceSelections(spaces);
},
defaultTab:function(cm) {
cm.somethingSelected() ? cm.indentSelection("add") :cm.execCommand("insertTab");
},
transposeChars:function(cm) {
runInOp(cm, function() {
for (var ranges = cm.listSelections(), newSel = [], i = 0; i < ranges.length; i++) {
var cur = ranges[i].head, line = getLine(cm.doc, cur.line).text;
if (line) if (cur.ch == line.length && (cur = new Pos(cur.line, cur.ch - 1)), cur.ch > 0) cur = new Pos(cur.line, cur.ch + 1), 
cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2), Pos(cur.line, cur.ch - 2), cur, "+transpose"); else if (cur.line > cm.doc.first) {
var prev = getLine(cm.doc, cur.line - 1).text;
prev && cm.replaceRange(line.charAt(0) + "\n" + prev.charAt(prev.length - 1), Pos(cur.line - 1, prev.length - 1), Pos(cur.line, 1), "+transpose");
}
newSel.push(new Range(cur, cur));
}
cm.setSelections(newSel);
});
},
newlineAndIndent:function(cm) {
runInOp(cm, function() {
for (var len = cm.listSelections().length, i = 0; len > i; i++) {
var range = cm.listSelections()[i];
cm.replaceRange("\n", range.anchor, range.head, "+input"), cm.indentLine(range.from().line + 1, null, !0), 
ensureCursorVisible(cm);
}
});
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
Insert:"toggleOverwrite",
Esc:"singleSelection"
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
"Ctrl-U":"undoSelection",
"Shift-Ctrl-U":"redoSelection",
"Alt-U":"redoSelection",
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
"Cmd-U":"undoSelection",
"Shift-Cmd-U":"redoSelection",
fallthrough:[ "basic", "emacsy" ]
}, keyMap.emacsy = {
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
}, keyMap["default"] = mac ? keyMap.macDefault :keyMap.pcDefault;
var lookupKey = CodeMirror.lookupKey = function(name, maps, handle) {
function lookup(map) {
map = getKeyMap(map);
var found = map[name];
if (found === !1) return "stop";
if (null != found && handle(found)) return !0;
if (map.nofallthrough) return "stop";
var fallthrough = map.fallthrough;
if (null == fallthrough) return !1;
if ("[object Array]" != Object.prototype.toString.call(fallthrough)) return lookup(fallthrough);
for (var i = 0; i < fallthrough.length; ++i) {
var done = lookup(fallthrough[i]);
if (done) return done;
}
return !1;
}
for (var i = 0; i < maps.length; ++i) {
var done = lookup(maps[i]);
if (done) return "stop" != done;
}
}, isModifierKey = CodeMirror.isModifierKey = function(event) {
var name = keyNames[event.keyCode];
return "Ctrl" == name || "Alt" == name || "Shift" == name || "Mod" == name;
}, keyName = CodeMirror.keyName = function(event, noShift) {
if (presto && 34 == event.keyCode && event["char"]) return !1;
var name = keyNames[event.keyCode];
return null == name || event.altGraphKey ? !1 :(event.altKey && (name = "Alt-" + name), 
(flipCtrlCmd ? event.metaKey :event.ctrlKey) && (name = "Ctrl-" + name), (flipCtrlCmd ? event.ctrlKey :event.metaKey) && (name = "Cmd-" + name), 
!noShift && event.shiftKey && (name = "Shift-" + name), name);
};
CodeMirror.fromTextArea = function(textarea, options) {
function save() {
textarea.value = cm.getValue();
}
if (options || (options = {}), options.value = textarea.value, !options.tabindex && textarea.tabindex && (options.tabindex = textarea.tabindex), 
!options.placeholder && textarea.placeholder && (options.placeholder = textarea.placeholder), 
null == options.autofocus) {
var hasFocus = activeElt();
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
};
var StringStream = CodeMirror.StringStream = function(string, tabSize) {
this.pos = this.start = 0, this.string = string, this.tabSize = tabSize || 8, this.lastColumnPos = this.lastColumnValue = 0, 
this.lineStart = 0;
};
StringStream.prototype = {
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
};
var TextMarker = CodeMirror.TextMarker = function(doc, type) {
this.lines = [], this.type = type, this.doc = doc;
};
eventMixin(TextMarker), TextMarker.prototype.clear = function() {
if (!this.explicitlyCleared) {
var cm = this.doc.cm, withOp = cm && !cm.curOp;
if (withOp && startOperation(cm), hasHandler(this, "clear")) {
var found = this.find();
found && signalLater(this, "clear", found.from, found.to);
}
for (var min = null, max = null, i = 0; i < this.lines.length; ++i) {
var line = this.lines[i], span = getMarkedSpanFor(line.markedSpans, this);
cm && !this.collapsed ? regLineChange(cm, lineNo(line), "text") :cm && (null != span.to && (max = lineNo(line)), 
null != span.from && (min = lineNo(line))), line.markedSpans = removeMarkedSpan(line.markedSpans, span), 
null == span.from && this.collapsed && !lineIsHidden(this.doc, line) && cm && updateLineHeight(line, textHeight(cm.display));
}
if (cm && this.collapsed && !cm.options.lineWrapping) for (var i = 0; i < this.lines.length; ++i) {
var visual = visualLine(this.lines[i]), len = lineLength(visual);
len > cm.display.maxLineLength && (cm.display.maxLine = visual, cm.display.maxLineLength = len, 
cm.display.maxLineChanged = !0);
}
null != min && cm && this.collapsed && regChange(cm, min, max + 1), this.lines.length = 0, 
this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, 
cm && reCheckSelection(cm.doc)), cm && signalLater(cm, "markerCleared", cm, this), 
withOp && endOperation(cm), this.parent && this.parent.clear();
}
}, TextMarker.prototype.find = function(side, lineObj) {
null == side && "bookmark" == this.type && (side = 1);
for (var from, to, i = 0; i < this.lines.length; ++i) {
var line = this.lines[i], span = getMarkedSpanFor(line.markedSpans, this);
if (null != span.from && (from = Pos(lineObj ? line :lineNo(line), span.from), -1 == side)) return from;
if (null != span.to && (to = Pos(lineObj ? line :lineNo(line), span.to), 1 == side)) return to;
}
return from && {
from:from,
to:to
};
}, TextMarker.prototype.changed = function() {
var pos = this.find(-1, !0), widget = this, cm = this.doc.cm;
pos && cm && runInOp(cm, function() {
var line = pos.line, lineN = lineNo(pos.line), view = findViewForLine(cm, lineN);
if (view && (clearLineMeasurementCacheFor(view), cm.curOp.selectionChanged = cm.curOp.forceUpdate = !0), 
cm.curOp.updateMaxLine = !0, !lineIsHidden(widget.doc, line) && null != widget.height) {
var oldHeight = widget.height;
widget.height = null;
var dHeight = widgetHeight(widget) - oldHeight;
dHeight && updateLineHeight(line, line.height + dHeight);
}
});
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
var nextMarkerId = 0, SharedTextMarker = CodeMirror.SharedTextMarker = function(markers, primary) {
this.markers = markers, this.primary = primary;
for (var i = 0; i < markers.length; ++i) markers[i].parent = this;
};
eventMixin(SharedTextMarker), SharedTextMarker.prototype.clear = function() {
if (!this.explicitlyCleared) {
this.explicitlyCleared = !0;
for (var i = 0; i < this.markers.length; ++i) this.markers[i].clear();
signalLater(this, "clear");
}
}, SharedTextMarker.prototype.find = function(side, lineObj) {
return this.primary.find(side, lineObj);
};
var LineWidget = CodeMirror.LineWidget = function(cm, node, options) {
if (options) for (var opt in options) options.hasOwnProperty(opt) && (this[opt] = options[opt]);
this.cm = cm, this.node = node;
};
eventMixin(LineWidget), LineWidget.prototype.clear = function() {
var cm = this.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
if (null != no && ws) {
for (var i = 0; i < ws.length; ++i) ws[i] == this && ws.splice(i--, 1);
ws.length || (line.widgets = null);
var height = widgetHeight(this);
runInOp(cm, function() {
adjustScrollWhenAboveVisible(cm, line, -height), regLineChange(cm, no, "widget"), 
updateLineHeight(line, Math.max(0, line.height - height));
});
}
}, LineWidget.prototype.changed = function() {
var oldH = this.height, cm = this.cm, line = this.line;
this.height = null;
var diff = widgetHeight(this) - oldH;
diff && runInOp(cm, function() {
cm.curOp.forceUpdate = !0, adjustScrollWhenAboveVisible(cm, line, diff), updateLineHeight(line, line.height + diff);
});
};
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
lines.push.apply(lines, this.lines);
},
insertInner:function(at, lines, height) {
this.height += height, this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
for (var i = 0; i < lines.length; ++i) lines[i].parent = this;
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
if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
var lines = [];
this.collapse(lines), this.children = [ new LeafChunk(lines) ], this.children[0].parent = this;
}
},
collapse:function(lines) {
for (var i = 0; i < this.children.length; ++i) this.children[i].collapse(lines);
},
insertInner:function(at, lines, height) {
this.size += lines.length, this.height += height;
for (var i = 0; i < this.children.length; ++i) {
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
for (var i = 0; i < this.children.length; ++i) {
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
this.cleanGeneration = 1, this.frontier = firstLine;
var start = Pos(firstLine, 0);
this.sel = simpleSelection(start), this.history = new History(null), this.id = ++nextDocId, 
this.modeOption = mode, "string" == typeof text && (text = splitLines(text)), updateDoc(this, {
from:start,
to:start,
text:text
}), setSelection(this, simpleSelection(start), sel_dontScroll);
};
Doc.prototype = createObj(BranchChunk.prototype, {
constructor:Doc,
iter:function(from, to, op) {
op ? this.iterN(from - this.first, to - from, op) :this.iterN(this.first, this.first + this.size, from);
},
insert:function(at, lines) {
for (var height = 0, i = 0; i < lines.length; ++i) height += lines[i].height;
this.insertInner(at - this.first, lines, height);
},
remove:function(at, n) {
this.removeInner(at - this.first, n);
},
getValue:function(lineSep) {
var lines = getLines(this, this.first, this.first + this.size);
return lineSep === !1 ? lines :lines.join(lineSep || "\n");
},
setValue:docMethodOp(function(code) {
var top = Pos(this.first, 0), last = this.first + this.size - 1;
makeChange(this, {
from:top,
to:Pos(last, getLine(this, last).text.length),
text:splitLines(code),
origin:"setValue"
}, !0), setSelection(this, simpleSelection(top));
}),
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
getLineHandle:function(line) {
return isLine(this, line) ? getLine(this, line) :void 0;
},
getLineNumber:function(line) {
return lineNo(line);
},
getLineHandleVisualStart:function(line) {
return "number" == typeof line && (line = getLine(this, line)), visualLine(line);
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
var pos, range = this.sel.primary();
return pos = null == start || "head" == start ? range.head :"anchor" == start ? range.anchor :"end" == start || "to" == start || start === !1 ? range.to() :range.from();
},
listSelections:function() {
return this.sel.ranges;
},
somethingSelected:function() {
return this.sel.somethingSelected();
},
setCursor:docMethodOp(function(line, ch, options) {
setSimpleSelection(this, clipPos(this, "number" == typeof line ? Pos(line, ch || 0) :line), null, options);
}),
setSelection:docMethodOp(function(anchor, head, options) {
setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
}),
extendSelection:docMethodOp(function(head, other, options) {
extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
}),
extendSelections:docMethodOp(function(heads, options) {
extendSelections(this, clipPosArray(this, heads, options));
}),
extendSelectionsBy:docMethodOp(function(f, options) {
extendSelections(this, map(this.sel.ranges, f), options);
}),
setSelections:docMethodOp(function(ranges, primary, options) {
if (ranges.length) {
for (var i = 0, out = []; i < ranges.length; i++) out[i] = new Range(clipPos(this, ranges[i].anchor), clipPos(this, ranges[i].head));
null == primary && (primary = Math.min(ranges.length - 1, this.sel.primIndex)), 
setSelection(this, normalizeSelection(out, primary), options);
}
}),
addSelection:docMethodOp(function(anchor, head, options) {
var ranges = this.sel.ranges.slice(0);
ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor))), setSelection(this, normalizeSelection(ranges, ranges.length - 1), options);
}),
getSelection:function(lineSep) {
for (var lines, ranges = this.sel.ranges, i = 0; i < ranges.length; i++) {
var sel = getBetween(this, ranges[i].from(), ranges[i].to());
lines = lines ? lines.concat(sel) :sel;
}
return lineSep === !1 ? lines :lines.join(lineSep || "\n");
},
getSelections:function(lineSep) {
for (var parts = [], ranges = this.sel.ranges, i = 0; i < ranges.length; i++) {
var sel = getBetween(this, ranges[i].from(), ranges[i].to());
lineSep !== !1 && (sel = sel.join(lineSep || "\n")), parts[i] = sel;
}
return parts;
},
replaceSelection:function(code, collapse, origin) {
for (var dup = [], i = 0; i < this.sel.ranges.length; i++) dup[i] = code;
this.replaceSelections(dup, collapse, origin || "+input");
},
replaceSelections:docMethodOp(function(code, collapse, origin) {
for (var changes = [], sel = this.sel, i = 0; i < sel.ranges.length; i++) {
var range = sel.ranges[i];
changes[i] = {
from:range.from(),
to:range.to(),
text:splitLines(code[i]),
origin:origin
};
}
for (var newSel = collapse && "end" != collapse && computeReplacedSel(this, changes, collapse), i = changes.length - 1; i >= 0; i--) makeChange(this, changes[i]);
newSel ? setSelectionReplaceHistory(this, newSel) :this.cm && ensureCursorVisible(this.cm);
}),
undo:docMethodOp(function() {
makeChangeFromHistory(this, "undo");
}),
redo:docMethodOp(function() {
makeChangeFromHistory(this, "redo");
}),
undoSelection:docMethodOp(function() {
makeChangeFromHistory(this, "undo", !0);
}),
redoSelection:docMethodOp(function() {
makeChangeFromHistory(this, "redo", !0);
}),
setExtending:function(val) {
this.extend = val;
},
getExtending:function() {
return this.extend;
},
historySize:function() {
for (var hist = this.history, done = 0, undone = 0, i = 0; i < hist.done.length; i++) hist.done[i].ranges || ++done;
for (var i = 0; i < hist.undone.length; i++) hist.undone[i].ranges || ++undone;
return {
undo:done,
redo:undone
};
},
clearHistory:function() {
this.history = new History(this.history.maxGeneration);
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
var hist = this.history = new History(this.history.maxGeneration);
hist.done = copyHistoryArray(histData.done.slice(0), null, !0), hist.undone = copyHistoryArray(histData.undone.slice(0), null, !0);
},
addLineClass:docMethodOp(function(handle, where, cls) {
return changeLine(this, handle, "class", function(line) {
var prop = "text" == where ? "textClass" :"background" == where ? "bgClass" :"wrapClass";
if (line[prop]) {
if (new RegExp("(?:^|\\s)" + cls + "(?:$|\\s)").test(line[prop])) return !1;
line[prop] += " " + cls;
} else line[prop] = cls;
return !0;
});
}),
removeLineClass:docMethodOp(function(handle, where, cls) {
return changeLine(this, handle, "class", function(line) {
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
markText:function(from, to, options) {
return markText(this, clipPos(this, from), clipPos(this, to), options, "range");
},
setBookmark:function(pos, options) {
var realOpts = {
replacedWith:options && (null == options.nodeType ? options.widget :options),
insertLeft:options && options.insertLeft,
clearWhenEmpty:!1,
shared:options && options.shared
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
findMarks:function(from, to, filter) {
from = clipPos(this, from), to = clipPos(this, to);
var found = [], lineNo = from.line;
return this.iter(from.line, to.line + 1, function(line) {
var spans = line.markedSpans;
if (spans) for (var i = 0; i < spans.length; i++) {
var span = spans[i];
lineNo == from.line && from.ch > span.to || null == span.from && lineNo != from.line || lineNo == to.line && span.from > to.ch || filter && !filter(span.marker) || found.push(span.marker.parent || span.marker);
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
return doc.scrollTop = this.scrollTop, doc.scrollLeft = this.scrollLeft, doc.sel = this.sel, 
doc.extend = !1, copyHistory && (doc.history.undoDepth = this.history.undoDepth, 
doc.setHistory(this.getHistory())), doc;
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
} ], copySharedMarkers(copy, findSharedMarkers(this)), copy;
},
unlinkDoc:function(other) {
if (other instanceof CodeMirror && (other = other.doc), this.linked) for (var i = 0; i < this.linked.length; ++i) {
var link = this.linked[i];
if (link.doc == other) {
this.linked.splice(i, 1), other.unlinkDoc(this), detachSharedMarkers(findSharedMarkers(this));
break;
}
}
if (other.history == this.history) {
var splitIds = [ other.id ];
linkedDocs(other, function(doc) {
splitIds.push(doc.id);
}, !0), other.history = new History(null), other.history.done = copyHistoryArray(this.history.done, splitIds), 
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
eventMixin(Doc);
var e_preventDefault = CodeMirror.e_preventDefault = function(e) {
e.preventDefault ? e.preventDefault() :e.returnValue = !1;
}, e_stopPropagation = CodeMirror.e_stopPropagation = function(e) {
e.stopPropagation ? e.stopPropagation() :e.cancelBubble = !0;
}, e_stop = CodeMirror.e_stop = function(e) {
e_preventDefault(e), e_stopPropagation(e);
}, on = CodeMirror.on = function(emitter, type, f) {
if (emitter.addEventListener) emitter.addEventListener(type, f, !1); else if (emitter.attachEvent) emitter.attachEvent("on" + type, f); else {
var map = emitter._handlers || (emitter._handlers = {}), arr = map[type] || (map[type] = []);
arr.push(f);
}
}, off = CodeMirror.off = function(emitter, type, f) {
if (emitter.removeEventListener) emitter.removeEventListener(type, f, !1); else if (emitter.detachEvent) emitter.detachEvent("on" + type, f); else {
var arr = emitter._handlers && emitter._handlers[type];
if (!arr) return;
for (var i = 0; i < arr.length; ++i) if (arr[i] == f) {
arr.splice(i, 1);
break;
}
}
}, signal = CodeMirror.signal = function(emitter, type) {
var arr = emitter._handlers && emitter._handlers[type];
if (arr) for (var args = Array.prototype.slice.call(arguments, 2), i = 0; i < arr.length; ++i) arr[i].apply(null, args);
}, orphanDelayedCallbacks = null, scrollerCutOff = 30, Pass = CodeMirror.Pass = {
toString:function() {
return "CodeMirror.Pass";
}
}, sel_dontScroll = {
scroll:!1
}, sel_mouse = {
origin:"*mouse"
}, sel_move = {
origin:"+move"
};
Delayed.prototype.set = function(ms, f) {
clearTimeout(this.id), this.id = setTimeout(f, ms);
};
var countColumn = CodeMirror.countColumn = function(string, end, tabSize, startIndex, startValue) {
null == end && (end = string.search(/[^\s\u00a0]/), -1 == end && (end = string.length));
for (var i = startIndex || 0, n = startValue || 0; ;) {
var nextTab = string.indexOf("	", i);
if (0 > nextTab || nextTab >= end) return n + (end - i);
n += nextTab - i, n += tabSize - n % tabSize, i = nextTab + 1;
}
}, spaceStrs = [ "" ], selectInput = function(node) {
node.select();
};
ios ? selectInput = function(node) {
node.selectionStart = 0, node.selectionEnd = node.value.length;
} :ie && (selectInput = function(node) {
try {
node.select();
} catch (_e) {}
}), [].indexOf && (indexOf = function(array, elt) {
return array.indexOf(elt);
}), [].map && (map = function(array, f) {
return array.map(f);
});
var range, nonASCIISingleCaseWordChar = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, isWordCharBasic = CodeMirror.isWordChar = function(ch) {
return /\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
}, extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
range = document.createRange ? function(node, start, end) {
var r = document.createRange();
return r.setEnd(node, end), r.setStart(node, start), r;
} :function(node, start, end) {
var r = document.body.createTextRange();
return r.moveToElementText(node.parentNode), r.collapse(!0), r.moveEnd("character", end), 
r.moveStart("character", start), r;
}, ie && 11 > ie_version && (activeElt = function() {
try {
return document.activeElement;
} catch (e) {
return document.body;
}
});
var knownScrollbarWidth, zwspSupported, badBidiRects, globalsRegistered = !1, dragAndDrop = function() {
if (ie && 9 > ie_version) return !1;
var div = elt("div");
return "draggable" in div || "dragDrop" in div;
}(), splitLines = CodeMirror.splitLines = 3 != "\n\nb".split(/\n/).length ? function(string) {
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
}, hasSelection = window.getSelection ? function(te) {
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
}(), badZoomedRects = null, keyNames = {
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
return 247 >= code ? lowTypes.charAt(code) :code >= 1424 && 1524 >= code ? "R" :code >= 1536 && 1773 >= code ? arabicTypes.charAt(code - 1536) :code >= 1774 && 2220 >= code ? "r" :code >= 8192 && 8203 >= code ? "w" :8204 == code ? "b" :"L";
}
function BidiSpan(level, from, to) {
this.level = level, this.from = from, this.to = to;
}
var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN", arabicTypes = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm", bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/, isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/, outerType = "L";
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
order.push(new BidiSpan(0, start, i));
} else {
var pos = i, at = order.length;
for (++i; len > i && "L" != types[i]; ++i) ;
for (var j = pos; i > j; ) if (countsAsNum.test(types[j])) {
j > pos && order.splice(at, 0, new BidiSpan(1, pos, j));
var nstart = j;
for (++j; i > j && countsAsNum.test(types[j]); ++j) ;
order.splice(at, 0, new BidiSpan(2, nstart, j)), pos = j;
} else ++j;
i > pos && order.splice(at, 0, new BidiSpan(1, pos, i));
}
return 1 == order[0].level && (m = str.match(/^\s+/)) && (order[0].from = m[0].length, 
order.unshift(new BidiSpan(0, 0, m[0].length))), 1 == lst(order).level && (m = str.match(/\s+$/)) && (lst(order).to -= m[0].length, 
order.push(new BidiSpan(0, len - m[0].length, len))), order[0].level != lst(order).level && order.push(new BidiSpan(order[0].level, len, len)), 
order;
};
}();
return CodeMirror.version = "4.3.1", CodeMirror;
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
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
function cpp11StringHook(stream, state) {
if (stream.backUp(1), stream.match(/(R|u8R|uR|UR|LR)/)) {
var match = stream.match(/"([^\s\\()]{0,16})\(/);
return match ? (state.cpp11RawStringDelim = match[1], state.tokenize = tokenRawString, 
tokenRawString(stream, state)) :!1;
}
return stream.match(/(u8|u|U|L)/) ? stream.match(/["']/, !1) ? "string" :!1 :(stream.next(), 
!1);
}
function tokenAtString(stream, state) {
for (var next; null != (next = stream.next()); ) if ('"' == next && !stream.eat('"')) {
state.tokenize = null;
break;
}
return "string";
}
function tokenRawString(stream, state) {
var delim = state.cpp11RawStringDelim.replace(/[^\w\s]/g, "\\$&"), match = stream.match(new RegExp(".*?\\)" + delim + '"'));
return match ? state.tokenize = null :stream.skipToEnd(), "string";
}
function def(mimes, mode) {
function add(obj) {
if (obj) for (var prop in obj) obj.hasOwnProperty(prop) && words.push(prop);
}
"string" == typeof mimes && (mimes = [ mimes ]);
var words = [];
add(mode.keywords), add(mode.builtin), add(mode.atoms), words.length && (mode.helperType = mimes[0], 
CodeMirror.registerHelper("hintWords", mimes[0], words));
for (var i = 0; i < mimes.length; ++i) CodeMirror.defineMIME(mimes[i], mode);
}
CodeMirror.defineMode("clike", function(config, parserConfig) {
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
lineComment:"//",
fold:"brace"
};
});
var cKeywords = "auto if break int case long char register continue return default short do sizeof double static else struct entry switch extern typedef float union for unsigned goto while enum void const signed volatile";
def([ "text/x-csrc", "text/x-c", "text/x-chdr" ], {
name:"clike",
keywords:words(cKeywords),
blockKeywords:words("case do else for if switch while struct"),
atoms:words("null"),
hooks:{
"#":cppHook
},
modeProps:{
fold:[ "brace", "include" ]
}
}), def([ "text/x-c++src", "text/x-c++hdr" ], {
name:"clike",
keywords:words(cKeywords + " asm dynamic_cast namespace reinterpret_cast try bool explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected wchar_t alignas alignof constexpr decltype nullptr noexcept thread_local final static_assert override"),
blockKeywords:words("catch class do else finally for if struct switch try while"),
atoms:words("true false null"),
hooks:{
"#":cppHook,
u:cpp11StringHook,
U:cpp11StringHook,
L:cpp11StringHook,
R:cpp11StringHook
},
modeProps:{
fold:[ "brace", "include" ]
}
}), def("text/x-java", {
name:"clike",
keywords:words("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while"),
blockKeywords:words("catch class do else finally for if switch try while"),
atoms:words("true false null"),
hooks:{
"@":function(stream) {
return stream.eatWhile(/[\w\$_]/), "meta";
}
},
modeProps:{
fold:[ "brace", "import" ]
}
}), def("text/x-csharp", {
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
}), def("text/x-scala", {
name:"clike",
keywords:words("abstract case catch class def do else extends false final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try trye type val var while with yield _ : = => <- <: <% >: # @ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector :: #:: Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
blockKeywords:words("catch class do else finally for forSome if match switch try while"),
atoms:words("true false null"),
hooks:{
"@":function(stream) {
return stream.eatWhile(/[\w\$_]/), "meta";
}
}
}), def([ "x-shader/x-vertex", "x-shader/x-fragment" ], {
name:"clike",
keywords:words("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4 sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadowconst attribute uniform varying break continue discard return for while do if else struct in out inout"),
blockKeywords:words("for while do if else struct"),
builtin:words("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smootstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
atoms:words("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragColor gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
hooks:{
"#":cppHook
},
modeProps:{
fold:[ "brace", "include" ]
}
});
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function wordRegexp(words) {
return new RegExp("^((" + words.join(")|(") + "))\\b");
}
function top(state) {
return state.scopes[state.scopes.length - 1];
}
var wordOperators = wordRegexp([ "and", "or", "not", "is", "in" ]), commonKeywords = [ "as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield" ], commonBuiltins = [ "abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__" ], py2 = {
builtins:[ "apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "False", "True", "None" ],
keywords:[ "exec", "print" ]
}, py3 = {
builtins:[ "ascii", "bytes", "exec", "print" ],
keywords:[ "nonlocal", "False", "True", "None" ]
};
CodeMirror.registerHelper("hintWords", "python", commonKeywords.concat(commonBuiltins)), 
CodeMirror.defineMode("python", function(conf, parserConf) {
function tokenBase(stream, state) {
if (stream.sol() && "py" == top(state).type) {
var scopeOffset = top(state).offset;
if (stream.eatSpace()) {
var lineOffset = stream.indentation();
return lineOffset > scopeOffset ? pushScope(stream, state, "py") :scopeOffset > lineOffset && dedent(stream, state) && (state.errorToken = !0), 
null;
}
var style = tokenBaseInner(stream, state);
return scopeOffset > 0 && dedent(stream, state) && (style += " " + ERRORCLASS), 
style;
}
return tokenBaseInner(stream, state);
}
function tokenBaseInner(stream, state) {
if (stream.eatSpace()) return null;
var ch = stream.peek();
if ("#" == ch) return stream.skipToEnd(), "comment";
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
state.tokenize(stream, state)) :stream.match(tripleDelimiters) || stream.match(doubleDelimiters) ? null :stream.match(doubleOperators) || stream.match(singleOperators) || stream.match(wordOperators) ? "operator" :stream.match(singleDelimiters) ? null :stream.match(keywords) ? "keyword" :stream.match(builtins) ? "builtin" :stream.match(/^(self|cls)\b/) ? "variable-2" :stream.match(identifiers) ? "def" == state.lastToken || "class" == state.lastToken ? "def" :"variable" :(stream.next(), 
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
function pushScope(stream, state, type) {
var offset = 0, align = null;
if ("py" == type) for (;"py" != top(state).type; ) state.scopes.pop();
offset = top(state).offset + ("py" == type ? conf.indentUnit :hangingIndent), "py" == type || stream.match(/^(\s|#.*)*$/, !1) || (align = stream.column() + 1), 
state.scopes.push({
offset:offset,
type:type,
align:align
});
}
function dedent(stream, state) {
for (var indented = stream.indentation(); top(state).offset > indented; ) {
if ("py" != top(state).type) return !0;
state.scopes.pop();
}
return top(state).offset != indented;
}
function tokenLexer(stream, state) {
var style = state.tokenize(stream, state), current = stream.current();
if ("." == current) return style = stream.match(identifiers, !1) ? null :ERRORCLASS, 
null == style && "meta" == state.lastStyle && (style = "meta"), style;
if ("@" == current) return stream.match(identifiers, !1) ? "meta" :ERRORCLASS;
"variable" != style && "builtin" != style || "meta" != state.lastStyle || (style = "meta"), 
("pass" == current || "return" == current) && (state.dedent += 1), "lambda" == current && (state.lambda = !0), 
":" != current || state.lambda || "py" != top(state).type || pushScope(stream, state, "py");
var delimiter_index = 1 == current.length ? "[({".indexOf(current) :-1;
if (-1 != delimiter_index && pushScope(stream, state, "])}".slice(delimiter_index, delimiter_index + 1)), 
delimiter_index = "])}".indexOf(current), -1 != delimiter_index) {
if (top(state).type != current) return ERRORCLASS;
state.scopes.pop();
}
return state.dedent > 0 && stream.eol() && "py" == top(state).type && (state.scopes.length > 1 && state.scopes.pop(), 
state.dedent -= 1), style;
}
var ERRORCLASS = "error", singleOperators = parserConf.singleOperators || new RegExp("^[\\+\\-\\*/%&|\\^~<>!]"), singleDelimiters = parserConf.singleDelimiters || new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"), doubleOperators = parserConf.doubleOperators || new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"), doubleDelimiters = parserConf.doubleDelimiters || new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"), tripleDelimiters = parserConf.tripleDelimiters || new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"), identifiers = parserConf.identifiers || new RegExp("^[_A-Za-z][_A-Za-z0-9]*"), hangingIndent = parserConf.hangingIndent || conf.indentUnit, myKeywords = commonKeywords, myBuiltins = commonBuiltins;
if (void 0 != parserConf.extra_keywords && (myKeywords = myKeywords.concat(parserConf.extra_keywords)), 
void 0 != parserConf.extra_builtins && (myBuiltins = myBuiltins.concat(parserConf.extra_builtins)), 
parserConf.version && 3 == parseInt(parserConf.version, 10)) {
myKeywords = myKeywords.concat(py3.keywords), myBuiltins = myBuiltins.concat(py3.builtins);
var stringPrefixes = new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))", "i");
} else {
myKeywords = myKeywords.concat(py2.keywords), myBuiltins = myBuiltins.concat(py2.builtins);
var stringPrefixes = new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i");
}
var keywords = wordRegexp(myKeywords), builtins = wordRegexp(myBuiltins), external = {
startState:function(basecolumn) {
return {
tokenize:tokenBase,
scopes:[ {
offset:basecolumn || 0,
type:"py",
align:null
} ],
lastStyle:null,
lastToken:null,
lambda:!1,
dedent:0
};
},
token:function(stream, state) {
var addErr = state.errorToken;
addErr && (state.errorToken = !1);
var style = tokenLexer(stream, state);
state.lastStyle = style;
var current = stream.current();
return current && style && (state.lastToken = current), stream.eol() && state.lambda && (state.lambda = !1), 
addErr ? style + " " + ERRORCLASS :style;
},
indent:function(state, textAfter) {
if (state.tokenize != tokenBase) return state.tokenize.isString ? CodeMirror.Pass :0;
var scope = top(state), closing = textAfter && textAfter.charAt(0) == scope.type;
return null != scope.align ? scope.align - (closing ? 1 :0) :closing && state.scopes.length > 1 ? state.scopes[state.scopes.length - 2].offset :scope.offset;
},
lineComment:"#",
fold:"indent"
};
return external;
}), CodeMirror.defineMIME("text/x-python", "python");
var words = function(str) {
return str.split(" ");
};
CodeMirror.defineMIME("text/x-cython", {
name:"python",
extra_keywords:words("by cdef cimport cpdef ctypedef enum exceptextern gil include nogil property publicreadonly struct union DEF IF ELIF ELSE")
});
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function look(stream, c) {
return stream.string.charAt(stream.pos + (c || 0));
}
function prefix(stream, c) {
if (c) {
var x = stream.pos - c;
return stream.string.substr(x >= 0 ? x :0, c);
}
return stream.string.substr(0, stream.pos - 1);
}
function suffix(stream, c) {
var y = stream.string.length, x = y - stream.pos + 1;
return stream.string.substr(stream.pos, c && y > c ? c :x);
}
function eatSuffix(stream, c) {
var y, x = stream.pos + c;
stream.pos = 0 >= x ? 0 :x >= (y = stream.string.length - 1) ? y :x;
}
CodeMirror.defineMode("perl", function() {
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
if (prefix(stream, 3) == "<<" + ch) {
var p = stream.pos;
stream.eatWhile(/\w/);
var n = stream.current().substr(1);
if (n && stream.eat(ch)) return tokenSOMETHING(stream, state, n);
stream.pos = p;
}
return tokenChain(stream, state, [ ch ], "string");
}
if ("q" == ch) {
var c = look(stream, -2);
if (!c || !/\w/.test(c)) if (c = look(stream, 0), "x" == c) {
if (c = look(stream, 1), "(" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ ")" ], RXstyle, RXmodifiers);
if ("[" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ "]" ], RXstyle, RXmodifiers);
if ("{" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ "}" ], RXstyle, RXmodifiers);
if ("<" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ ">" ], RXstyle, RXmodifiers);
if (/[\^'"!~\/]/.test(c)) return eatSuffix(stream, 1), tokenChain(stream, state, [ stream.eat(c) ], RXstyle, RXmodifiers);
} else if ("q" == c) {
if (c = look(stream, 1), "(" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ ")" ], "string");
if ("[" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ "]" ], "string");
if ("{" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ "}" ], "string");
if ("<" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ ">" ], "string");
if (/[\^'"!~\/]/.test(c)) return eatSuffix(stream, 1), tokenChain(stream, state, [ stream.eat(c) ], "string");
} else if ("w" == c) {
if (c = look(stream, 1), "(" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ ")" ], "bracket");
if ("[" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ "]" ], "bracket");
if ("{" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ "}" ], "bracket");
if ("<" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ ">" ], "bracket");
if (/[\^'"!~\/]/.test(c)) return eatSuffix(stream, 1), tokenChain(stream, state, [ stream.eat(c) ], "bracket");
} else if ("r" == c) {
if (c = look(stream, 1), "(" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ ")" ], RXstyle, RXmodifiers);
if ("[" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ "]" ], RXstyle, RXmodifiers);
if ("{" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ "}" ], RXstyle, RXmodifiers);
if ("<" == c) return eatSuffix(stream, 2), tokenChain(stream, state, [ ">" ], RXstyle, RXmodifiers);
if (/[\^'"!~\/]/.test(c)) return eatSuffix(stream, 1), tokenChain(stream, state, [ stream.eat(c) ], RXstyle, RXmodifiers);
} else if (/[\^'"!~\/(\[{<]/.test(c)) {
if ("(" == c) return eatSuffix(stream, 1), tokenChain(stream, state, [ ")" ], "string");
if ("[" == c) return eatSuffix(stream, 1), tokenChain(stream, state, [ "]" ], "string");
if ("{" == c) return eatSuffix(stream, 1), tokenChain(stream, state, [ "}" ], "string");
if ("<" == c) return eatSuffix(stream, 1), tokenChain(stream, state, [ ">" ], "string");
if (/[\^'"!~\/]/.test(c)) return tokenChain(stream, state, [ stream.eat(c) ], "string");
}
}
if ("m" == ch) {
var c = look(stream, -2);
if ((!c || !/\w/.test(c)) && (c = stream.eat(/[(\[{<\^'"!~\/]/))) {
if (/[\^'"!~\/]/.test(c)) return tokenChain(stream, state, [ c ], RXstyle, RXmodifiers);
if ("(" == c) return tokenChain(stream, state, [ ")" ], RXstyle, RXmodifiers);
if ("[" == c) return tokenChain(stream, state, [ "]" ], RXstyle, RXmodifiers);
if ("{" == c) return tokenChain(stream, state, [ "}" ], RXstyle, RXmodifiers);
if ("<" == c) return tokenChain(stream, state, [ ">" ], RXstyle, RXmodifiers);
}
}
if ("s" == ch) {
var c = /[\/>\]})\w]/.test(look(stream, -2));
if (!c && (c = stream.eat(/[(\[{<\^'"!~\/]/))) return "[" == c ? tokenChain(stream, state, [ "]", "]" ], RXstyle, RXmodifiers) :"{" == c ? tokenChain(stream, state, [ "}", "}" ], RXstyle, RXmodifiers) :"<" == c ? tokenChain(stream, state, [ ">", ">" ], RXstyle, RXmodifiers) :"(" == c ? tokenChain(stream, state, [ ")", ")" ], RXstyle, RXmodifiers) :tokenChain(stream, state, [ c, c ], RXstyle, RXmodifiers);
}
if ("y" == ch) {
var c = /[\/>\]})\w]/.test(look(stream, -2));
if (!c && (c = stream.eat(/[(\[{<\^'"!~\/]/))) return "[" == c ? tokenChain(stream, state, [ "]", "]" ], RXstyle, RXmodifiers) :"{" == c ? tokenChain(stream, state, [ "}", "}" ], RXstyle, RXmodifiers) :"<" == c ? tokenChain(stream, state, [ ">", ">" ], RXstyle, RXmodifiers) :"(" == c ? tokenChain(stream, state, [ ")", ")" ], RXstyle, RXmodifiers) :tokenChain(stream, state, [ c, c ], RXstyle, RXmodifiers);
}
if ("t" == ch) {
var c = /[\/>\]})\w]/.test(look(stream, -2));
if (!c && (c = stream.eat("r"), c && (c = stream.eat(/[(\[{<\^'"!~\/]/)))) return "[" == c ? tokenChain(stream, state, [ "]", "]" ], RXstyle, RXmodifiers) :"{" == c ? tokenChain(stream, state, [ "}", "}" ], RXstyle, RXmodifiers) :"<" == c ? tokenChain(stream, state, [ ">", ">" ], RXstyle, RXmodifiers) :"(" == c ? tokenChain(stream, state, [ ")", ")" ], RXstyle, RXmodifiers) :tokenChain(stream, state, [ c, c ], RXstyle, RXmodifiers);
}
if ("`" == ch) return tokenChain(stream, state, [ ch ], "variable-2");
if ("/" == ch) return /~\s*$/.test(prefix(stream)) ? tokenChain(stream, state, [ ch ], RXstyle, RXmodifiers) :"operator";
if ("$" == ch) {
var p = stream.pos;
if (stream.eatWhile(/\d/) || stream.eat("{") && stream.eatWhile(/\d/) && stream.eat("}")) return "variable-2";
stream.pos = p;
}
if (/[$@%]/.test(ch)) {
var p = stream.pos;
if (stream.eat("^") && stream.eat(/[A-Z]/) || !/[@$%&]/.test(look(stream, -2)) && stream.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/)) {
var c = stream.current();
if (PERL[c]) return "variable-2";
}
stream.pos = p;
}
if (/[$@%&]/.test(ch) && (stream.eatWhile(/[\w$\[\]]/) || stream.eat("{") && stream.eatWhile(/[\w$\[\]]/) && stream.eat("}"))) {
var c = stream.current();
return PERL[c] ? "variable-2" :"variable";
}
if ("#" == ch && "$" != look(stream, -2)) return stream.skipToEnd(), "comment";
if (/[:+\-\^*$&%@=<>!?|\/~\.]/.test(ch)) {
var p = stream.pos;
if (stream.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/), PERL[stream.current()]) return "operator";
stream.pos = p;
}
if ("_" == ch && 1 == stream.pos) {
if ("_END__" == suffix(stream, 6)) return tokenChain(stream, state, [ "\x00" ], "comment");
if ("_DATA__" == suffix(stream, 7)) return tokenChain(stream, state, [ "\x00" ], "variable-2");
if ("_C__" == suffix(stream, 7)) return tokenChain(stream, state, [ "\x00" ], "string");
}
if (/\w/.test(ch)) {
var p = stream.pos;
if ("{" == look(stream, -2) && ("}" == look(stream, 0) || stream.eatWhile(/\w/) && "}" == look(stream, 0))) return "string";
stream.pos = p;
}
if (/[A-Z]/.test(ch)) {
var l = look(stream, -2), p = stream.pos;
if (stream.eatWhile(/[A-Z_]/), !/[\da-z]/.test(look(stream, 0))) {
var c = PERL[stream.current()];
return c ? (c[1] && (c = c[0]), ":" != l ? 1 == c ? "keyword" :2 == c ? "def" :3 == c ? "atom" :4 == c ? "operator" :5 == c ? "variable-2" :"meta" :"meta") :"meta";
}
stream.pos = p;
}
if (/[a-zA-Z_]/.test(ch)) {
var l = look(stream, -2);
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
}), CodeMirror.registerHelper("wordChars", "perl", /[\\w$]/), CodeMirror.defineMIME("text/x-perl", "perl");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../htmlmixed/htmlmixed"), require("../clike/clike")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../htmlmixed/htmlmixed", "../clike/clike" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function keywords(str) {
for (var obj = {}, words = str.split(" "), i = 0; i < words.length; ++i) obj[words[i]] = !0;
return obj;
}
function heredoc(delim) {
return function(stream, state) {
return stream.match(delim) ? state.tokenize = null :stream.skipToEnd(), "string";
};
}
function matchSequence(list) {
return 0 == list.length ? stringWithEscapes :function(stream, state) {
for (var patterns = list[0], i = 0; i < patterns.length; i++) if (stream.match(patterns[i][0])) return state.tokenize = matchSequence(list.slice(1)), 
patterns[i][1];
return state.tokenize = stringWithEscapes, "string";
};
}
function stringWithEscapes(stream, state) {
var next, escaped = !1, end = !1;
if ('"' == stream.current()) return "string";
if (stream.match("${", !1) || stream.match("{$", !1)) return state.tokenize = null, 
"string";
if (stream.match(/\$[a-zA-Z_][a-zA-Z0-9_]*/)) return stream.match("[", !1) && (state.tokenize = matchSequence([ [ [ "[", null ] ], [ [ /\d[\w\.]*/, "number" ], [ /\$[a-zA-Z_][a-zA-Z0-9_]*/, "variable-2" ], [ /[\w\$]+/, "variable" ] ], [ [ "]", null ] ] ])), 
stream.match(/\-\>\w/, !1) && (state.tokenize = matchSequence([ [ [ "->", null ] ], [ [ /[\w]+/, "variable" ] ] ])), 
"variable-2";
for (;!(stream.eol() || stream.match("{$", !1) || stream.match(/(\$[a-zA-Z_][a-zA-Z0-9_]*|\$\{)/, !1) && !escaped); ) {
if (next = stream.next(), !escaped && '"' == next) {
end = !0;
break;
}
escaped = !escaped && "\\" == next;
}
return end && (state.tokenize = null, state.phpEncapsStack.pop()), "string";
}
var phpKeywords = "abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent yield insteadof finally", phpAtoms = "true false null TRUE FALSE NULL __CLASS__ __DIR__ __FILE__ __LINE__ __METHOD__ __FUNCTION__ __NAMESPACE__ __TRAIT__", phpBuiltin = "func_num_args func_get_arg func_get_args strlen strcmp strncmp strcasecmp strncasecmp each error_reporting define defined trigger_error user_error set_error_handler restore_error_handler get_declared_classes get_loaded_extensions extension_loaded get_extension_funcs debug_backtrace constant bin2hex hex2bin sleep usleep time mktime gmmktime strftime gmstrftime strtotime date gmdate getdate localtime checkdate flush wordwrap htmlspecialchars htmlentities html_entity_decode md5 md5_file crc32 getimagesize image_type_to_mime_type phpinfo phpversion phpcredits strnatcmp strnatcasecmp substr_count strspn strcspn strtok strtoupper strtolower strpos strrpos strrev hebrev hebrevc nl2br basename dirname pathinfo stripslashes stripcslashes strstr stristr strrchr str_shuffle str_word_count strcoll substr substr_replace quotemeta ucfirst ucwords strtr addslashes addcslashes rtrim str_replace str_repeat count_chars chunk_split trim ltrim strip_tags similar_text explode implode setlocale localeconv parse_str str_pad chop strchr sprintf printf vprintf vsprintf sscanf fscanf parse_url urlencode urldecode rawurlencode rawurldecode readlink linkinfo link unlink exec system escapeshellcmd escapeshellarg passthru shell_exec proc_open proc_close rand srand getrandmax mt_rand mt_srand mt_getrandmax base64_decode base64_encode abs ceil floor round is_finite is_nan is_infinite bindec hexdec octdec decbin decoct dechex base_convert number_format fmod ip2long long2ip getenv putenv getopt microtime gettimeofday getrusage uniqid quoted_printable_decode set_time_limit get_cfg_var magic_quotes_runtime set_magic_quotes_runtime get_magic_quotes_gpc get_magic_quotes_runtime import_request_variables error_log serialize unserialize memory_get_usage var_dump var_export debug_zval_dump print_r highlight_file show_source highlight_string ini_get ini_get_all ini_set ini_alter ini_restore get_include_path set_include_path restore_include_path setcookie header headers_sent connection_aborted connection_status ignore_user_abort parse_ini_file is_uploaded_file move_uploaded_file intval floatval doubleval strval gettype settype is_null is_resource is_bool is_long is_float is_int is_integer is_double is_real is_numeric is_string is_array is_object is_scalar ereg ereg_replace eregi eregi_replace split spliti join sql_regcase dl pclose popen readfile rewind rmdir umask fclose feof fgetc fgets fgetss fread fopen fpassthru ftruncate fstat fseek ftell fflush fwrite fputs mkdir rename copy tempnam tmpfile file file_get_contents stream_select stream_context_create stream_context_set_params stream_context_set_option stream_context_get_options stream_filter_prepend stream_filter_append fgetcsv flock get_meta_tags stream_set_write_buffer set_file_buffer set_socket_blocking stream_set_blocking socket_set_blocking stream_get_meta_data stream_register_wrapper stream_wrapper_register stream_set_timeout socket_set_timeout socket_get_status realpath fnmatch fsockopen pfsockopen pack unpack get_browser crypt opendir closedir chdir getcwd rewinddir readdir dir glob fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype file_exists is_writable is_writeable is_readable is_executable is_file is_dir is_link stat lstat chown touch clearstatcache mail ob_start ob_flush ob_clean ob_end_flush ob_end_clean ob_get_flush ob_get_clean ob_get_length ob_get_level ob_get_status ob_get_contents ob_implicit_flush ob_list_handlers ksort krsort natsort natcasesort asort arsort sort rsort usort uasort uksort shuffle array_walk count end prev next reset current key min max in_array array_search extract compact array_fill range array_multisort array_push array_pop array_shift array_unshift array_splice array_slice array_merge array_merge_recursive array_keys array_values array_count_values array_reverse array_reduce array_pad array_flip array_change_key_case array_rand array_unique array_intersect array_intersect_assoc array_diff array_diff_assoc array_sum array_filter array_map array_chunk array_key_exists pos sizeof key_exists assert assert_options version_compare ftok str_rot13 aggregate session_name session_module_name session_save_path session_id session_regenerate_id session_decode session_register session_unregister session_is_registered session_encode session_start session_destroy session_unset session_set_save_handler session_cache_limiter session_cache_expire session_set_cookie_params session_get_cookie_params session_write_close preg_match preg_match_all preg_replace preg_replace_callback preg_split preg_quote preg_grep overload ctype_alnum ctype_alpha ctype_cntrl ctype_digit ctype_lower ctype_graph ctype_print ctype_punct ctype_space ctype_upper ctype_xdigit virtual apache_request_headers apache_note apache_lookup_uri apache_child_terminate apache_setenv apache_response_headers apache_get_version getallheaders mysql_connect mysql_pconnect mysql_close mysql_select_db mysql_create_db mysql_drop_db mysql_query mysql_unbuffered_query mysql_db_query mysql_list_dbs mysql_list_tables mysql_list_fields mysql_list_processes mysql_error mysql_errno mysql_affected_rows mysql_insert_id mysql_result mysql_num_rows mysql_num_fields mysql_fetch_row mysql_fetch_array mysql_fetch_assoc mysql_fetch_object mysql_data_seek mysql_fetch_lengths mysql_fetch_field mysql_field_seek mysql_free_result mysql_field_name mysql_field_table mysql_field_len mysql_field_type mysql_field_flags mysql_escape_string mysql_real_escape_string mysql_stat mysql_thread_id mysql_client_encoding mysql_get_client_info mysql_get_host_info mysql_get_proto_info mysql_get_server_info mysql_info mysql mysql_fieldname mysql_fieldtable mysql_fieldlen mysql_fieldtype mysql_fieldflags mysql_selectdb mysql_createdb mysql_dropdb mysql_freeresult mysql_numfields mysql_numrows mysql_listdbs mysql_listtables mysql_listfields mysql_db_name mysql_dbname mysql_tablename mysql_table_name pg_connect pg_pconnect pg_close pg_connection_status pg_connection_busy pg_connection_reset pg_host pg_dbname pg_port pg_tty pg_options pg_ping pg_query pg_send_query pg_cancel_query pg_fetch_result pg_fetch_row pg_fetch_assoc pg_fetch_array pg_fetch_object pg_fetch_all pg_affected_rows pg_get_result pg_result_seek pg_result_status pg_free_result pg_last_oid pg_num_rows pg_num_fields pg_field_name pg_field_num pg_field_size pg_field_type pg_field_prtlen pg_field_is_null pg_get_notify pg_get_pid pg_result_error pg_last_error pg_last_notice pg_put_line pg_end_copy pg_copy_to pg_copy_from pg_trace pg_untrace pg_lo_create pg_lo_unlink pg_lo_open pg_lo_close pg_lo_read pg_lo_write pg_lo_read_all pg_lo_import pg_lo_export pg_lo_seek pg_lo_tell pg_escape_string pg_escape_bytea pg_unescape_bytea pg_client_encoding pg_set_client_encoding pg_meta_data pg_convert pg_insert pg_update pg_delete pg_select pg_exec pg_getlastoid pg_cmdtuples pg_errormessage pg_numrows pg_numfields pg_fieldname pg_fieldsize pg_fieldtype pg_fieldnum pg_fieldprtlen pg_fieldisnull pg_freeresult pg_result pg_loreadall pg_locreate pg_lounlink pg_loopen pg_loclose pg_loread pg_lowrite pg_loimport pg_loexport http_response_code get_declared_traits getimagesizefromstring socket_import_stream stream_set_chunk_size trait_exists header_register_callback class_uses session_status session_register_shutdown echo print global static exit array empty eval isset unset die include require include_once require_once";
CodeMirror.registerHelper("hintWords", "php", [ phpKeywords, phpAtoms, phpBuiltin ].join(" ").split(" ")), 
CodeMirror.registerHelper("wordChars", "php", /[\\w$]/);
var phpConfig = {
name:"clike",
helperType:"php",
keywords:keywords(phpKeywords),
blockKeywords:keywords("catch do else elseif for foreach if switch try while finally"),
atoms:keywords(phpAtoms),
builtin:keywords(phpBuiltin),
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
},
'"':function(stream, state) {
return state.phpEncapsStack || (state.phpEncapsStack = []), state.phpEncapsStack.push(0), 
state.tokenize = stringWithEscapes, state.tokenize(stream, state);
},
"{":function(_stream, state) {
return state.phpEncapsStack && state.phpEncapsStack.length > 0 && state.phpEncapsStack[state.phpEncapsStack.length - 1]++, 
!1;
},
"}":function(_stream, state) {
return state.phpEncapsStack && state.phpEncapsStack.length > 0 && 0 == --state.phpEncapsStack[state.phpEncapsStack.length - 1] && (state.tokenize = stringWithEscapes), 
!1;
}
}
};
CodeMirror.defineMode("php", function(config, parserConfig) {
function dispatch(stream, state) {
var isPHP = state.curMode == phpMode;
if (stream.sol() && state.pending && '"' != state.pending && "'" != state.pending && (state.pending = null), 
isPHP) return isPHP && null == state.php.tokenize && stream.match("?>") ? (state.curMode = htmlMode, 
state.curState = state.html, "meta") :phpMode.token(stream, state.curState);
if (stream.match(/^<\?\w*/)) return state.curMode = phpMode, state.curState = state.php, 
"meta";
if ('"' == state.pending || "'" == state.pending) {
for (;!stream.eol() && stream.next() != state.pending; ) ;
var style = "string";
} else if (state.pending && stream.pos < state.pending.end) {
stream.pos = state.pending.end;
var style = state.pending.style;
} else var style = htmlMode.token(stream, state.curState);
state.pending && (state.pending = null);
var m, cur = stream.current(), openPHP = cur.search(/<\?/);
return -1 != openPHP && (state.pending = "string" == style && (m = cur.match(/[\'\"]$/)) && !/\?>/.test(cur) ? m[0] :{
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
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("ruby", function(config) {
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
if ("`" == ch || "'" == ch || '"' == ch) return chain(readQuoted(ch, "string", '"' == ch || "`" == ch), stream, state);
if ("/" == ch) {
var currentIndex = stream.current().length;
if (stream.skipTo("/")) {
var search_till = stream.current().length;
stream.backUp(stream.current().length - currentIndex);
for (var balance = 0; stream.current().length < search_till; ) {
var chchr = stream.next();
if ("(" == chchr ? balance += 1 :")" == chchr && (balance -= 1), 0 > balance) break;
}
if (stream.backUp(stream.current().length - currentIndex), 0 == balance) return chain(readQuoted(ch, "string-2", !0), stream, state);
}
return "operator";
}
if ("%" == ch) {
var style = "string", embed = !0;
stream.eat("s") ? style = "atom" :stream.eat(/[WQ]/) ? style = "string" :stream.eat(/[r]/) ? style = "string-2" :stream.eat(/[wxq]/) && (style = "string", 
embed = !1);
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
return ":" == ch ? stream.eat("'") ? chain(readQuoted("'", "atom", !1), stream, state) :stream.eat('"') ? chain(readQuoted('"', "atom", !0), stream, state) :stream.eat(/[\<\>]/) ? (stream.eat(/[\<\>]/), 
"atom") :stream.eat(/[\+\-\*\/\&\|\:\!]/) ? "atom" :stream.eat(/[a-zA-Z$@_]/) ? (stream.eatWhile(/[\w]/), 
stream.eat(/[\?\!\=]/), "atom") :"operator" :"@" == ch && stream.match(/^@?[a-zA-Z_]/) ? (stream.eat("@"), 
stream.eatWhile(/[\w]/), "variable-2") :"$" == ch ? (stream.eat(/[a-zA-Z_]/) ? stream.eatWhile(/[\w]/) :stream.eat(/\d/) ? stream.eat(/\d/) :stream.next(), 
"variable-3") :/[a-zA-Z_]/.test(ch) ? (stream.eatWhile(/[\w]/), stream.eat(/[\?\!]/), 
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
function tokenBaseOnce() {
var alreadyCalled = !1;
return function(stream, state) {
return alreadyCalled ? (state.tokenize.pop(), state.tokenize[state.tokenize.length - 1](stream, state)) :(alreadyCalled = !0, 
tokenBase(stream, state));
};
}
function readQuoted(quote, style, embed, unescaped) {
return function(stream, state) {
var ch, escaped = !1;
for ("read-quoted-paused" === state.context.type && (state.context = state.context.prev, 
stream.eat("}")); null != (ch = stream.next()); ) {
if (ch == quote && (unescaped || !escaped)) {
state.tokenize.pop();
break;
}
if (embed && "#" == ch && !escaped) {
if (stream.eat("{")) {
"}" == quote && (state.context = {
prev:state.context,
type:"read-quoted-paused"
}), state.tokenize.push(tokenBaseUntilBrace());
break;
}
if (/[@\$]/.test(stream.peek())) {
state.tokenize.push(tokenBaseOnce());
break;
}
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
var curPunc, keywords = wordObj([ "alias", "and", "BEGIN", "begin", "break", "case", "class", "def", "defined?", "do", "else", "elsif", "END", "end", "ensure", "false", "for", "if", "in", "module", "next", "not", "or", "redo", "rescue", "retry", "return", "self", "super", "then", "true", "undef", "unless", "until", "when", "while", "yield", "nil", "raise", "throw", "catch", "fail", "loop", "callcc", "caller", "lambda", "proc", "public", "protected", "private", "require", "load", "require_relative", "extend", "autoload", "__END__", "__FILE__", "__LINE__", "__dir__" ]), indentWords = wordObj([ "def", "class", "case", "for", "while", "module", "then", "catch", "loop", "proc", "begin" ]), dedentWords = wordObj([ "end", "until" ]), matching = {
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
indentWords.propertyIsEnumerable(word) ? kwtype = "indent" :dedentWords.propertyIsEnumerable(word) ? kwtype = "dedent" :"if" != word && "unless" != word || stream.column() != stream.indentation() ? "do" == word && state.context.indented < state.indented && (kwtype = "indent") :kwtype = "indent";
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
}), CodeMirror.defineMIME("text/x-ruby", "ruby");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("haskell", function(_config, modeConfig) {
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
}), CodeMirror.defineMIME("text/x-haskell", "haskell");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("scheme", function() {
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
var BUILTIN = "builtin", COMMENT = "comment", STRING = "string", ATOM = "atom", NUMBER = "number", BRACKET = "bracket", INDENT_WORD_SKIP = 2, keywords = makeKeywords("\u03bb case-lambda call/cc class define-class exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt #f floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? #t tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?"), indentKeys = makeKeywords("define let letrec let* lambda"), binaryMatcher = new RegExp(/^(?:[-+]i|[-+][01]+#*(?:\/[01]+#*)?i|[-+]?[01]+#*(?:\/[01]+#*)?@[-+]?[01]+#*(?:\/[01]+#*)?|[-+]?[01]+#*(?:\/[01]+#*)?[-+](?:[01]+#*(?:\/[01]+#*)?)?i|[-+]?[01]+#*(?:\/[01]+#*)?)(?=[()\s;"]|$)/i), octalMatcher = new RegExp(/^(?:[-+]i|[-+][0-7]+#*(?:\/[0-7]+#*)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?@[-+]?[0-7]+#*(?:\/[0-7]+#*)?|[-+]?[0-7]+#*(?:\/[0-7]+#*)?[-+](?:[0-7]+#*(?:\/[0-7]+#*)?)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?)(?=[()\s;"]|$)/i), hexMatcher = new RegExp(/^(?:[-+]i|[-+][\da-f]+#*(?:\/[\da-f]+#*)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?@[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?[-+](?:[\da-f]+#*(?:\/[\da-f]+#*)?)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?)(?=[()\s;"]|$)/i), decimalMatcher = new RegExp(/^(?:[-+]i|[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)i|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)@[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)?i|(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*))(?=[()\s;"]|$)/i);
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
}), CodeMirror.defineMIME("text/x-scheme", "scheme");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("lua", function(config, parserConfig) {
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
}), CodeMirror.defineMIME("text/x-lua", "lua");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMIME("text/x-erlang", "erlang"), CodeMirror.defineMode("erlang", function(cmCfg) {
function tokenizer(stream, state) {
if (state.in_string) return state.in_string = !doubleQuote(stream), rval(state, stream, "string");
if (state.in_atom) return state.in_atom = !singleQuote(stream), rval(state, stream, "atom");
if (stream.eatSpace()) return rval(state, stream, "whitespace");
if (!peekToken(state) && stream.match(/-\s*[a-z\xdf-\xf6\xf8-\xff][\w\xd8-\xde\xc0-\xd6\xdf-\xf6\xf8-\xff]*/)) return is_member(stream.current(), typeWords) ? rval(state, stream, "type") :rval(state, stream, "attribute");
var ch = stream.next();
if ("%" == ch) return stream.skipToEnd(), rval(state, stream, "comment");
if (":" == ch) return rval(state, stream, "colon");
if ("?" == ch) return stream.eatSpace(), stream.eatWhile(anumRE), rval(state, stream, "macro");
if ("#" == ch) return stream.eatSpace(), stream.eatWhile(anumRE), rval(state, stream, "record");
if ("$" == ch) return "\\" != stream.next() || stream.match(escapesRE) ? rval(state, stream, "number") :rval(state, stream, "error");
if ("." == ch) return rval(state, stream, "dot");
if ("'" == ch) {
if (!(state.in_atom = !singleQuote(stream))) {
if (stream.match(/\s*\/\s*[0-9]/, !1)) return stream.match(/\s*\/\s*[0-9]/, !0), 
rval(state, stream, "fun");
if (stream.match(/\s*\(/, !1) || stream.match(/\s*:/, !1)) return rval(state, stream, "function");
}
return rval(state, stream, "atom");
}
if ('"' == ch) return state.in_string = !doubleQuote(stream), rval(state, stream, "string");
if (/[A-Z_\xd8-\xde\xc0-\xd6]/.test(ch)) return stream.eatWhile(anumRE), rval(state, stream, "variable");
if (/[a-z_\xdf-\xf6\xf8-\xff]/.test(ch)) {
if (stream.eatWhile(anumRE), stream.match(/\s*\/\s*[0-9]/, !1)) return stream.match(/\s*\/\s*[0-9]/, !0), 
rval(state, stream, "fun");
var w = stream.current();
return is_member(w, keywordWords) ? rval(state, stream, "keyword") :is_member(w, operatorAtomWords) ? rval(state, stream, "operator") :stream.match(/\s*\(/, !1) ? !is_member(w, bifWords) || ":" == peekToken(state).token && "erlang" != peekToken(state, 2).token ? is_member(w, guardWords) ? rval(state, stream, "guard") :rval(state, stream, "function") :rval(state, stream, "builtin") :is_member(w, operatorAtomWords) ? rval(state, stream, "operator") :":" == lookahead(stream) ? "erlang" == w ? rval(state, stream, "builtin") :rval(state, stream, "function") :is_member(w, [ "true", "false" ]) ? rval(state, stream, "boolean") :is_member(w, [ "true", "false" ]) ? rval(state, stream, "boolean") :rval(state, stream, "atom");
}
var digitRE = /[0-9]/, radixRE = /[0-9a-zA-Z]/;
return digitRE.test(ch) ? (stream.eatWhile(digitRE), stream.eat("#") ? stream.eatWhile(radixRE) || stream.backUp(1) :stream.eat(".") && (stream.eatWhile(digitRE) ? stream.eat(/[eE]/) && (stream.eat(/[-+]/) ? stream.eatWhile(digitRE) || stream.backUp(2) :stream.eatWhile(digitRE) || stream.backUp(1)) :stream.backUp(1)), 
rval(state, stream, "number")) :nongreedy(stream, openParenRE, openParenWords) ? rval(state, stream, "open_paren") :nongreedy(stream, closeParenRE, closeParenWords) ? rval(state, stream, "close_paren") :greedy(stream, separatorRE, separatorWords) ? rval(state, stream, "separator") :greedy(stream, operatorSymbolRE, operatorSymbolWords) ? rval(state, stream, "operator") :rval(state, stream, null);
}
function nongreedy(stream, re, words) {
if (1 == stream.current().length && re.test(stream.current())) {
for (stream.backUp(1); re.test(stream.peek()); ) if (stream.next(), is_member(stream.current(), words)) return !0;
stream.backUp(stream.current().length - 1);
}
return !1;
}
function greedy(stream, re, words) {
if (1 == stream.current().length && re.test(stream.current())) {
for (;re.test(stream.peek()); ) stream.next();
for (;0 < stream.current().length; ) {
if (is_member(stream.current(), words)) return !0;
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
function lookahead(stream) {
var m = stream.match(/([\n\s]+|%[^\n]*\n)*(.)/, !1);
return m ? m.pop() :"";
}
function is_member(element, list) {
return -1 < list.indexOf(element);
}
function rval(state, stream, type) {
switch (pushToken(state, realToken(type, stream)), type) {
case "atom":
return "atom";

case "attribute":
return "attribute";

case "boolean":
return "atom";

case "builtin":
return "builtin";

case "close_paren":
return null;

case "colon":
return null;

case "comment":
return "comment";

case "dot":
return null;

case "error":
return "error";

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

case "open_paren":
return null;

case "operator":
return "operator";

case "record":
return "bracket";

case "separator":
return null;

case "string":
return "string";

case "type":
return "def";

case "variable":
return "variable";

default:
return null;
}
}
function aToken(tok, col, ind, typ) {
return {
token:tok,
column:col,
indent:ind,
type:typ
};
}
function realToken(type, stream) {
return aToken(stream.current(), stream.column(), stream.indentation(), type);
}
function fakeToken(type) {
return aToken(type, 0, 0, type);
}
function peekToken(state, depth) {
var len = state.tokenStack.length, dep = depth ? depth :1;
return dep > len ? !1 :state.tokenStack[len - dep];
}
function pushToken(state, token) {
"comment" != token.type && "whitespace" != token.type && (state.tokenStack = maybe_drop_pre(state.tokenStack, token), 
state.tokenStack = maybe_drop_post(state.tokenStack));
}
function maybe_drop_pre(s, token) {
var last = s.length - 1;
return last > 0 && "record" === s[last].type && "dot" === token.type ? s.pop() :last > 0 && "group" === s[last].type ? (s.pop(), 
s.push(token)) :s.push(token), s;
}
function maybe_drop_post(s) {
var last = s.length - 1;
if ("dot" === s[last].type) return [];
if ("fun" === s[last].type && "fun" === s[last - 1].token) return s.slice(0, last - 1);
switch (s[s.length - 1].token) {
case "}":
return d(s, {
g:[ "{" ]
});

case "]":
return d(s, {
i:[ "[" ]
});

case ")":
return d(s, {
i:[ "(" ]
});

case ">>":
return d(s, {
i:[ "<<" ]
});

case "end":
return d(s, {
i:[ "begin", "case", "fun", "if", "receive", "try" ]
});

case ",":
return d(s, {
e:[ "begin", "try", "when", "->", ",", "(", "[", "{", "<<" ]
});

case "->":
return d(s, {
r:[ "when" ],
m:[ "try", "if", "case", "receive" ]
});

case ";":
return d(s, {
E:[ "case", "fun", "if", "receive", "try", "when" ]
});

case "catch":
return d(s, {
e:[ "try" ]
});

case "of":
return d(s, {
e:[ "case" ]
});

case "after":
return d(s, {
e:[ "receive", "try" ]
});

default:
return s;
}
}
function d(stack, tt) {
for (var type in tt) for (var len = stack.length - 1, tokens = tt[type], i = len - 1; i > -1; i--) if (is_member(stack[i].token, tokens)) {
var ss = stack.slice(0, i);
switch (type) {
case "m":
return ss.concat(stack[i]).concat(stack[len]);

case "r":
return ss.concat(stack[len]);

case "i":
return ss;

case "g":
return ss.concat(fakeToken("group"));

case "E":
return ss.concat(stack[i]);

case "e":
return ss.concat(stack[i]);
}
}
return "E" == type ? [] :stack;
}
function indenter(state, textAfter) {
var t, unit = cmCfg.indentUnit, wordAfter = wordafter(textAfter), currT = peekToken(state, 1), prevT = peekToken(state, 2);
return state.in_string || state.in_atom ? CodeMirror.Pass :prevT ? "when" == currT.token ? currT.column + unit :"when" === wordAfter && "function" === prevT.type ? prevT.indent + unit :"(" === wordAfter && "fun" === currT.token ? currT.column + 3 :"catch" === wordAfter && (t = getToken(state, [ "try" ])) ? t.column :is_member(wordAfter, [ "end", "after", "of" ]) ? (t = getToken(state, [ "begin", "case", "fun", "if", "receive", "try" ]), 
t ? t.column :CodeMirror.Pass) :is_member(wordAfter, closeParenWords) ? (t = getToken(state, openParenWords), 
t ? t.column :CodeMirror.Pass) :is_member(currT.token, [ ",", "|", "||" ]) || is_member(wordAfter, [ ",", "|", "||" ]) ? (t = postcommaToken(state), 
t ? t.column + t.token.length :unit) :"->" == currT.token ? is_member(prevT.token, [ "receive", "case", "if", "try" ]) ? prevT.column + unit + unit :prevT.column + unit :is_member(currT.token, openParenWords) ? currT.column + currT.token.length :(t = defaultToken(state), 
truthy(t) ? t.column + unit :0) :0;
}
function wordafter(str) {
var m = str.match(/,|[a-z]+|\}|\]|\)|>>|\|+|\(/);
return truthy(m) && 0 === m.index ? m[0] :"";
}
function postcommaToken(state) {
var objs = state.tokenStack.slice(0, -1), i = getTokenIndex(objs, "type", [ "open_paren" ]);
return truthy(objs[i]) ? objs[i] :!1;
}
function defaultToken(state) {
var objs = state.tokenStack, stop = getTokenIndex(objs, "type", [ "open_paren", "separator", "keyword" ]), oper = getTokenIndex(objs, "type", [ "operator" ]);
return truthy(stop) && truthy(oper) && oper > stop ? objs[stop + 1] :truthy(stop) ? objs[stop] :!1;
}
function getToken(state, tokens) {
var objs = state.tokenStack, i = getTokenIndex(objs, "token", tokens);
return truthy(objs[i]) ? objs[i] :!1;
}
function getTokenIndex(objs, propname, propvals) {
for (var i = objs.length - 1; i > -1; i--) if (is_member(objs[i][propname], propvals)) return i;
return !1;
}
function truthy(x) {
return x !== !1 && null != x;
}
var typeWords = [ "-type", "-spec", "-export_type", "-opaque" ], keywordWords = [ "after", "begin", "catch", "case", "cond", "end", "fun", "if", "let", "of", "query", "receive", "try", "when" ], separatorRE = /[\->,;]/, separatorWords = [ "->", ";", "," ], operatorAtomWords = [ "and", "andalso", "band", "bnot", "bor", "bsl", "bsr", "bxor", "div", "not", "or", "orelse", "rem", "xor" ], operatorSymbolRE = /[\+\-\*\/<>=\|:!]/, operatorSymbolWords = [ "=", "+", "-", "*", "/", ">", ">=", "<", "=<", "=:=", "==", "=/=", "/=", "||", "<-", "!" ], openParenRE = /[<\(\[\{]/, openParenWords = [ "<<", "(", "[", "{" ], closeParenRE = /[>\)\]\}]/, closeParenWords = [ "}", "]", ")", ">>" ], guardWords = [ "is_atom", "is_binary", "is_bitstring", "is_boolean", "is_float", "is_function", "is_integer", "is_list", "is_number", "is_pid", "is_port", "is_record", "is_reference", "is_tuple", "atom", "binary", "bitstring", "boolean", "function", "integer", "list", "number", "pid", "port", "record", "reference", "tuple" ], bifWords = [ "abs", "adler32", "adler32_combine", "alive", "apply", "atom_to_binary", "atom_to_list", "binary_to_atom", "binary_to_existing_atom", "binary_to_list", "binary_to_term", "bit_size", "bitstring_to_list", "byte_size", "check_process_code", "contact_binary", "crc32", "crc32_combine", "date", "decode_packet", "delete_module", "disconnect_node", "element", "erase", "exit", "float", "float_to_list", "garbage_collect", "get", "get_keys", "group_leader", "halt", "hd", "integer_to_list", "internal_bif", "iolist_size", "iolist_to_binary", "is_alive", "is_atom", "is_binary", "is_bitstring", "is_boolean", "is_float", "is_function", "is_integer", "is_list", "is_number", "is_pid", "is_port", "is_process_alive", "is_record", "is_reference", "is_tuple", "length", "link", "list_to_atom", "list_to_binary", "list_to_bitstring", "list_to_existing_atom", "list_to_float", "list_to_integer", "list_to_pid", "list_to_tuple", "load_module", "make_ref", "module_loaded", "monitor_node", "node", "node_link", "node_unlink", "nodes", "notalive", "now", "open_port", "pid_to_list", "port_close", "port_command", "port_connect", "port_control", "pre_loaded", "process_flag", "process_info", "processes", "purge_module", "put", "register", "registered", "round", "self", "setelement", "size", "spawn", "spawn_link", "spawn_monitor", "spawn_opt", "split_binary", "statistics", "term_to_binary", "time", "throw", "tl", "trunc", "tuple_size", "tuple_to_list", "unlink", "unregister", "whereis" ], anumRE = /[\w@\xd8-\xde\xc0-\xd6\xdf-\xf6\xf8-\xff]/, escapesRE = /[0-7]{1,3}|[bdefnrstv\\"']|\^[a-zA-Z]|x[0-9a-zA-Z]{2}|x{[0-9a-zA-Z]+}/;
return {
startState:function() {
return {
tokenStack:[],
in_string:!1,
in_atom:!1
};
},
token:function(stream, state) {
return tokenizer(stream, state);
},
indent:function(state, textAfter) {
return indenter(state, textAfter);
},
lineComment:"%"
};
});
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("clojure", function(options) {
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
var BUILTIN = "builtin", COMMENT = "comment", STRING = "string", CHARACTER = "string-2", ATOM = "atom", NUMBER = "number", BRACKET = "bracket", KEYWORD = "keyword", INDENT_WORD_SKIP = options.indentUnit || 2, NORMAL_INDENT_UNIT = options.indentUnit || 2, atoms = makeKeywords("true false nil"), keywords = makeKeywords("defn defn- def def- defonce defmulti defmethod defmacro defstruct deftype defprotocol defrecord defproject deftest slice defalias defhinted defmacro- defn-memo defnk defnk defonce- defunbound defunbound- defvar defvar- let letfn do case cond condp for loop recur when when-not when-let when-first if if-let if-not . .. -> ->> doto and or dosync doseq dotimes dorun doall load import unimport ns in-ns refer try catch finally throw with-open with-local-vars binding gen-class gen-and-load-class gen-and-save-class handler-case handle"), builtins = makeKeywords("* *' *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* *command-line-args* *compile-files* *compile-path* *compiler-options* *data-readers* *e *err* *file* *flush-on-newline* *fn-loader* *in* *math-context* *ns* *out* *print-dup* *print-length* *print-level* *print-meta* *print-readably* *read-eval* *source-path* *unchecked-math* *use-context-classloader* *verbose-defrecords* *warn-on-reflection* + +' - -' -> ->> ->ArrayChunk ->Vec ->VecNode ->VecSeq -cache-protocol-fn -reset-methods .. / < <= = == > >= EMPTY-NODE accessor aclone add-classpath add-watch agent agent-error agent-errors aget alength alias all-ns alter alter-meta! alter-var-root amap ancestors and apply areduce array-map aset aset-boolean aset-byte aset-char aset-double aset-float aset-int aset-long aset-short assert assoc assoc! assoc-in associative? atom await await-for await1 bases bean bigdec bigint biginteger binding bit-and bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left bit-shift-right bit-test bit-xor boolean boolean-array booleans bound-fn bound-fn* bound? butlast byte byte-array bytes case cast char char-array char-escape-string char-name-string char? chars chunk chunk-append chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? class class? clear-agent-errors clojure-version coll? comment commute comp comparator compare compare-and-set! compile complement concat cond condp conj conj! cons constantly construct-proxy contains? count counted? create-ns create-struct cycle dec dec' decimal? declare default-data-readers definline definterface defmacro defmethod defmulti defn defn- defonce defprotocol defrecord defstruct deftype delay delay? deliver denominator deref derive descendants destructure disj disj! dissoc dissoc! distinct distinct? doall dorun doseq dosync dotimes doto double double-array doubles drop drop-last drop-while empty empty? ensure enumeration-seq error-handler error-mode eval even? every-pred every? ex-data ex-info extend extend-protocol extend-type extenders extends? false? ffirst file-seq filter filterv find find-keyword find-ns find-protocol-impl find-protocol-method find-var first flatten float float-array float? floats flush fn fn? fnext fnil for force format frequencies future future-call future-cancel future-cancelled? future-done? future? gen-class gen-interface gensym get get-in get-method get-proxy-class get-thread-bindings get-validator group-by hash hash-combine hash-map hash-set identical? identity if-let if-not ifn? import in-ns inc inc' init-proxy instance? int int-array integer? interleave intern interpose into into-array ints io! isa? iterate iterator-seq juxt keep keep-indexed key keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list list* list? load load-file load-reader load-string loaded-libs locking long long-array longs loop macroexpand macroexpand-1 make-array make-hierarchy map map-indexed map? mapcat mapv max max-key memfn memoize merge merge-with meta method-sig methods min min-key mod munge name namespace namespace-munge neg? newline next nfirst nil? nnext not not-any? not-empty not-every? not= ns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics ns-refers ns-resolve ns-unalias ns-unmap nth nthnext nthrest num number? numerator object-array odd? or parents partial partition partition-all partition-by pcalls peek persistent! pmap pop pop! pop-thread-bindings pos? pr pr-str prefer-method prefers primitives-classnames print print-ctor print-dup print-method print-simple print-str printf println println-str prn prn-str promise proxy proxy-call-with-super proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot rand rand-int rand-nth range ratio? rational? rationalize re-find re-groups re-matcher re-matches re-pattern re-seq read read-line read-string realized? reduce reduce-kv reductions ref ref-history-count ref-max-history ref-min-history ref-set refer refer-clojure reify release-pending-sends rem remove remove-all-methods remove-method remove-ns remove-watch repeat repeatedly replace replicate require reset! reset-meta! resolve rest restart-agent resultset-seq reverse reversible? rseq rsubseq satisfies? second select-keys send send-off seq seq? seque sequence sequential? set set-error-handler! set-error-mode! set-validator! set? short short-array shorts shuffle shutdown-agents slurp some some-fn sort sort-by sorted-map sorted-map-by sorted-set sorted-set-by sorted? special-symbol? spit split-at split-with str string? struct struct-map subs subseq subvec supers swap! symbol symbol? sync take take-last take-nth take-while test the-ns thread-bound? time to-array to-array-2d trampoline transient tree-seq true? type unchecked-add unchecked-add-int unchecked-byte unchecked-char unchecked-dec unchecked-dec-int unchecked-divide-int unchecked-double unchecked-float unchecked-inc unchecked-inc-int unchecked-int unchecked-long unchecked-multiply unchecked-multiply-int unchecked-negate unchecked-negate-int unchecked-remainder-int unchecked-short unchecked-subtract unchecked-subtract-int underive unquote unquote-splicing update-in update-proxy use val vals var-get var-set var? vary-meta vec vector vector-of vector? when when-first when-let when-not while with-bindings with-bindings* with-in-str with-loading-context with-local-vars with-meta with-open with-out-str with-precision with-redefs with-redefs-fn xml-seq zero? zipmap *default-data-reader-fn* as-> cond-> cond->> reduced reduced? send-via set-agent-send-executor! set-agent-send-off-executor! some-> some->>"), indentKeys = makeKeywords("ns fn def defn defmethod bound-fn if if-not case condp when while when-not when-first do future comment doto locking proxy with-open with-precision reify deftype defrecord defprotocol extend extend-protocol extend-type try catch let letfn binding loop for doseq dotimes when-let if-let defstruct struct-map assoc testing deftest handler-case handle dotrace deftrace"), tests = {
digit:/\d/,
digit_or_colon:/[\d:]/,
hex:/[0-9a-f]/i,
sign:/[+-]/,
exponent:/e/i,
keyword_char:/[^\s\(\[\;\)\]]/,
symbol:/[\w*+!\-\._?:<>\/]/
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
stream.eol() || ";" == stream.peek() ? pushStack(state, indentTemp + NORMAL_INDENT_UNIT, ch) :pushStack(state, indentTemp + stream.current().length, ch)), 
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
}), CodeMirror.defineMIME("text/x-clojure", "clojure");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror", require("../xml/xml"))) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../xml/xml" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("markdown", function(cmCfg, modeCfg) {
function switchInline(stream, state, f) {
return state.f = state.inline = f, f(stream, state);
}
function switchBlock(stream, state, f) {
return state.f = state.block = f, f(stream, state);
}
function blankLine(state) {
return state.linkTitle = !1, state.em = !1, state.strong = !1, state.quote = 0, 
htmlFound || state.f != htmlBlock || (state.f = inlineNormal, state.block = blockNormal), 
state.trailingSpace = 0, state.trailingSpaceNewLine = !1, state.thisLineHasContent = !1, 
null;
}
function blockNormal(stream, state) {
var sol = stream.sol(), prevLineIsList = state.list !== !1;
state.list !== !1 && state.indentationDiff >= 0 ? (state.indentationDiff < 4 && (state.indentation -= state.indentationDiff), 
state.list = null) :state.list !== !1 && state.indentation > 0 ? (state.list = null, 
state.listDepth = Math.floor(state.indentation / 4)) :state.list !== !1 && (state.list = !1, 
state.listDepth = 0);
var match = null;
if (state.indentationDiff >= 4) return state.indentation -= 4, stream.skipToEnd(), 
code;
if (stream.eatSpace()) return null;
if (match = stream.match(atxHeaderRE)) return state.header = match[0].length <= 6 ? match[0].length :6, 
modeCfg.highlightFormatting && (state.formatting = "header"), state.f = state.inline, 
getType(state);
if (state.prevLineHasContent && (match = stream.match(setextHeaderRE))) return state.header = "=" == match[0].charAt(0) ? 1 :2, 
modeCfg.highlightFormatting && (state.formatting = "header"), state.f = state.inline, 
getType(state);
if (stream.eat(">")) return state.indentation++, state.quote = sol ? 1 :state.quote + 1, 
modeCfg.highlightFormatting && (state.formatting = "quote"), stream.eatSpace(), 
getType(state);
if ("[" === stream.peek()) return switchInline(stream, state, footnoteLink);
if (stream.match(hrRE, !0)) return hr;
if ((!state.prevLineHasContent || prevLineIsList) && (stream.match(ulRE, !1) || stream.match(olRE, !1))) {
var listType = null;
return stream.match(ulRE, !0) ? listType = "ul" :(stream.match(olRE, !0), listType = "ol"), 
state.indentation += 4, state.list = !0, state.listDepth++, modeCfg.taskLists && stream.match(taskListRE, !1) && (state.taskList = !0), 
state.f = state.inline, modeCfg.highlightFormatting && (state.formatting = [ "list", "list-" + listType ]), 
getType(state);
}
return modeCfg.fencedCodeBlocks && stream.match(/^```([\w+#]*)/, !0) ? (state.localMode = getMode(RegExp.$1), 
state.localMode && (state.localState = state.localMode.startState()), switchBlock(stream, state, local), 
modeCfg.highlightFormatting && (state.formatting = "code-block"), state.code = !0, 
getType(state)) :switchInline(stream, state, state.inline);
}
function htmlBlock(stream, state) {
var style = htmlMode.token(stream, state.htmlState);
return (htmlFound && null === state.htmlState.tagStart && !state.htmlState.context || state.md_inside && stream.current().indexOf(">") > -1) && (state.f = inlineNormal, 
state.block = blockNormal, state.htmlState = null), style;
}
function local(stream, state) {
if (stream.sol() && stream.match(/^```/, !0)) {
state.localMode = state.localState = null, state.f = inlineNormal, state.block = blockNormal, 
modeCfg.highlightFormatting && (state.formatting = "code-block"), state.code = !0;
var returnType = getType(state);
return state.code = !1, returnType;
}
return state.localMode ? state.localMode.token(stream, state.localState) :(stream.skipToEnd(), 
code);
}
function getType(state) {
var styles = [];
if (state.formatting) {
styles.push(formatting), "string" == typeof state.formatting && (state.formatting = [ state.formatting ]);
for (var i = 0; i < state.formatting.length; i++) styles.push(formatting + "-" + state.formatting[i]), 
"header" === state.formatting[i] && styles.push(formatting + "-" + state.formatting[i] + "-" + state.header), 
"quote" === state.formatting[i] && (!modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote ? styles.push(formatting + "-" + state.formatting[i] + "-" + state.quote) :styles.push("error"));
}
if (state.taskOpen) return styles.push("meta"), styles.length ? styles.join(" ") :null;
if (state.taskClosed) return styles.push("property"), styles.length ? styles.join(" ") :null;
if (state.linkHref) return styles.push(linkhref), styles.length ? styles.join(" ") :null;
if (state.strong && styles.push(strong), state.em && styles.push(em), state.linkText && styles.push(linktext), 
state.code && styles.push(code), state.header && (styles.push(header), styles.push(header + "-" + state.header)), 
state.quote && (styles.push(quote), !modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote ? styles.push(quote + "-" + state.quote) :styles.push(quote + "-" + modeCfg.maxBlockquoteDepth)), 
state.list !== !1) {
var listMod = (state.listDepth - 1) % 3;
listMod ? 1 === listMod ? styles.push(list2) :styles.push(list3) :styles.push(list1);
}
return state.trailingSpaceNewLine ? styles.push("trailing-space-new-line") :state.trailingSpace && styles.push("trailing-space-" + (state.trailingSpace % 2 ? "a" :"b")), 
styles.length ? styles.join(" ") :null;
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
return taskOpen ? state.taskOpen = !0 :state.taskClosed = !0, modeCfg.highlightFormatting && (state.formatting = "task"), 
state.taskList = !1, getType(state);
}
if (state.taskOpen = !1, state.taskClosed = !1, state.header && stream.match(/^#+$/, !0)) return modeCfg.highlightFormatting && (state.formatting = "header"), 
getType(state);
var sol = stream.sol(), ch = stream.next();
if (state.escape) return state.escape = !1, getType(state);
if ("\\" === ch) return modeCfg.highlightFormatting && (state.formatting = "escape"), 
state.escape = !0, getType(state);
if (state.linkTitle) {
state.linkTitle = !1;
var matchCh = ch;
"(" === ch && (matchCh = ")"), matchCh = (matchCh + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
var regex = "^\\s*(?:[^" + matchCh + "\\\\]+|\\\\\\\\|\\\\.)" + matchCh;
if (stream.match(new RegExp(regex), !0)) return linkhref;
}
if ("`" === ch) {
var previousFormatting = state.formatting;
modeCfg.highlightFormatting && (state.formatting = "code");
var t = getType(state), before = stream.pos;
stream.eatWhile("`");
var difference = 1 + stream.pos - before;
return state.code ? difference === codeDepth ? (state.code = !1, t) :(state.formatting = previousFormatting, 
getType(state)) :(codeDepth = difference, state.code = !0, getType(state));
}
if (state.code) return getType(state);
if ("!" === ch && stream.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return stream.match(/\[[^\]]*\]/), 
state.inline = state.f = linkHref, image;
if ("[" === ch && stream.match(/.*\](\(| ?\[)/, !1)) return state.linkText = !0, 
modeCfg.highlightFormatting && (state.formatting = "link"), getType(state);
if ("]" === ch && state.linkText) {
modeCfg.highlightFormatting && (state.formatting = "link");
var type = getType(state);
return state.linkText = !1, state.inline = state.f = linkHref, type;
}
if ("<" === ch && stream.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) {
state.f = state.inline = linkInline, modeCfg.highlightFormatting && (state.formatting = "link");
var type = getType(state);
return type ? type += " " :type = "", type + linkinline;
}
if ("<" === ch && stream.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) {
state.f = state.inline = linkInline, modeCfg.highlightFormatting && (state.formatting = "link");
var type = getType(state);
return type ? type += " " :type = "", type + linkemail;
}
if ("<" === ch && stream.match(/^\w/, !1)) {
if (-1 != stream.string.indexOf(">")) {
var atts = stream.string.substring(1, stream.string.indexOf(">"));
/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(atts) && (state.md_inside = !0);
}
return stream.backUp(1), state.htmlState = CodeMirror.startState(htmlMode), switchBlock(stream, state, htmlBlock);
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
if ("*" === ch || "_" === ch && !ignoreUnderscore) if (sol && " " === stream.peek()) ; else {
if (state.strong === ch && stream.eat(ch)) {
modeCfg.highlightFormatting && (state.formatting = "strong");
var t = getType(state);
return state.strong = !1, t;
}
if (!state.strong && stream.eat(ch)) return state.strong = ch, modeCfg.highlightFormatting && (state.formatting = "strong"), 
getType(state);
if (state.em === ch) {
modeCfg.highlightFormatting && (state.formatting = "em");
var t = getType(state);
return state.em = !1, t;
}
if (!state.em) return state.em = ch, modeCfg.highlightFormatting && (state.formatting = "em"), 
getType(state);
} else if (" " === ch && (stream.eat("*") || stream.eat("_"))) {
if (" " === stream.peek()) return getType(state);
stream.backUp(1);
}
return " " === ch && (stream.match(/ +$/, !1) ? state.trailingSpace++ :state.trailingSpace && (state.trailingSpaceNewLine = !0)), 
getType(state);
}
function linkInline(stream, state) {
var ch = stream.next();
if (">" === ch) {
state.f = state.inline = inlineNormal, modeCfg.highlightFormatting && (state.formatting = "link");
var type = getType(state);
return type ? type += " " :type = "", type + linkinline;
}
return stream.match(/^[^>]+/, !0), linkinline;
}
function linkHref(stream, state) {
if (stream.eatSpace()) return null;
var ch = stream.next();
return "(" === ch || "[" === ch ? (state.f = state.inline = getLinkHrefInside("(" === ch ? ")" :"]"), 
modeCfg.highlightFormatting && (state.formatting = "link-string"), state.linkHref = !0, 
getType(state)) :"error";
}
function getLinkHrefInside(endChar) {
return function(stream, state) {
var ch = stream.next();
if (ch === endChar) {
state.f = state.inline = inlineNormal, modeCfg.highlightFormatting && (state.formatting = "link-string");
var returnState = getType(state);
return state.linkHref = !1, returnState;
}
return stream.match(inlineRE(endChar), !0) && stream.backUp(1), state.linkHref = !0, 
getType(state);
};
}
function footnoteLink(stream, state) {
return stream.match(/^[^\]]*\]:/, !1) ? (state.f = footnoteLinkInside, stream.next(), 
modeCfg.highlightFormatting && (state.formatting = "link"), state.linkText = !0, 
getType(state)) :switchInline(stream, state, inlineNormal);
}
function footnoteLinkInside(stream, state) {
if (stream.match(/^\]:/, !0)) {
state.f = state.inline = footnoteUrl, modeCfg.highlightFormatting && (state.formatting = "link");
var returnType = getType(state);
return state.linkText = !1, returnType;
}
return stream.match(/^[^\]]+/, !0), linktext;
}
function footnoteUrl(stream, state) {
return stream.eatSpace() ? null :(stream.match(/^[^\s]+/, !0), void 0 === stream.peek() ? state.linkTitle = !0 :stream.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), 
state.f = state.inline = inlineNormal, linkhref);
}
function inlineRE(endChar) {
return savedInlineRE[endChar] || (endChar = (endChar + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), 
savedInlineRE[endChar] = new RegExp("^(?:[^\\\\]|\\\\.)*?(" + endChar + ")")), savedInlineRE[endChar];
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
void 0 === modeCfg.highlightFormatting && (modeCfg.highlightFormatting = !1), void 0 === modeCfg.maxBlockquoteDepth && (modeCfg.maxBlockquoteDepth = 0), 
void 0 === modeCfg.underscoresBreakWords && (modeCfg.underscoresBreakWords = !0), 
void 0 === modeCfg.fencedCodeBlocks && (modeCfg.fencedCodeBlocks = !1), void 0 === modeCfg.taskLists && (modeCfg.taskLists = !1);
var codeDepth = 0, header = "header", code = "comment", quote = "quote", list1 = "variable-2", list2 = "variable-3", list3 = "keyword", hr = "hr", image = "tag", formatting = "formatting", linkinline = "link", linkemail = "link", linktext = "link", linkhref = "string", em = "em", strong = "strong", hrRE = /^([*\-=_])(?:\s*\1){2,}\s*$/, ulRE = /^[*\-+]\s+/, olRE = /^[0-9]+\.\s+/, taskListRE = /^\[(x| )\](?=\s)/, atxHeaderRE = /^#+/, setextHeaderRE = /^(?:\={1,}|-{1,})$/, textRE = /^[^#!\[\]*_\\<>` "'(]+/, savedInlineRE = [], mode = {
startState:function() {
return {
f:blockNormal,
prevLineHasContent:!1,
thisLineHasContent:!1,
block:blockNormal,
htmlState:null,
indentation:0,
inline:inlineNormal,
text:handleText,
escape:!1,
formatting:!1,
linkText:!1,
linkHref:!1,
linkTitle:!1,
em:!1,
strong:!1,
header:0,
taskList:!1,
list:!1,
listDepth:0,
quote:0,
trailingSpace:0,
trailingSpaceNewLine:!1
};
},
copyState:function(s) {
return {
f:s.f,
prevLineHasContent:s.prevLineHasContent,
thisLineHasContent:s.thisLineHasContent,
block:s.block,
htmlState:s.htmlState && CodeMirror.copyState(htmlMode, s.htmlState),
indentation:s.indentation,
localMode:s.localMode,
localState:s.localMode ? CodeMirror.copyState(s.localMode, s.localState) :null,
inline:s.inline,
text:s.text,
escape:!1,
formatting:!1,
linkTitle:s.linkTitle,
em:s.em,
strong:s.strong,
header:s.header,
taskList:s.taskList,
list:s.list,
listDepth:s.listDepth,
quote:s.quote,
trailingSpace:s.trailingSpace,
trailingSpaceNewLine:s.trailingSpaceNewLine,
md_inside:s.md_inside
};
},
token:function(stream, state) {
if (state.formatting = !1, stream.sol()) {
var forceBlankLine = stream.match(/^\s*$/, !0) || state.header;
if (state.header = 0, forceBlankLine) return state.prevLineHasContent = !1, blankLine(state);
state.prevLineHasContent = state.thisLineHasContent, state.thisLineHasContent = !0, 
state.escape = !1, state.taskList = !1, state.code = !1, state.trailingSpace = 0, 
state.trailingSpaceNewLine = !1, state.f = state.block;
var indentation = stream.match(/^\s*/, !0)[0].replace(/\t/g, "    ").length, difference = 4 * Math.floor((indentation - state.indentation) / 4);
difference > 4 && (difference = 4);
var adjustedIndentation = state.indentation + difference;
if (state.indentationDiff = adjustedIndentation - state.indentation, state.indentation = adjustedIndentation, 
indentation > 0) return null;
}
var result = state.f(stream, state);
return stream.start == stream.pos ? this.token(stream, state) :result;
},
innerMode:function(state) {
return state.block == htmlBlock ? {
state:state.htmlState,
mode:htmlMode
} :state.localState ? {
state:state.localState,
mode:state.localMode
} :{
state:state,
mode:mode
};
},
blankLine:blankLine,
getType:getType,
fold:"markdown"
};
return mode;
}, "xml"), CodeMirror.defineMIME("text/x-markdown", "markdown");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("go", function(config) {
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
electricChars:"{}):",
fold:"brace",
blockCommentStart:"/*",
blockCommentEnd:"*/",
lineComment:"//"
};
}), CodeMirror.defineMIME("text/x-go", "go");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("javascript", function(config, parserConfig) {
function readRegexp(stream) {
for (var next, escaped = !1, inSet = !1; null != (next = stream.next()); ) {
if (!escaped) {
if ("/" == next && !inSet) return;
"[" == next ? inSet = !0 :inSet && "]" == next && (inSet = !1);
}
escaped = !escaped && "\\" == next;
}
}
function ret(tp, style, cont) {
return type = tp, content = cont, style;
}
function tokenBase(stream, state) {
var ch = stream.next();
if ('"' == ch || "'" == ch) return state.tokenize = tokenString(ch), state.tokenize(stream, state);
if ("." == ch && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) return ret("number", "number");
if ("." == ch && stream.match("..")) return ret("spread", "meta");
if (/[\[\]{}\(\),;\:\.]/.test(ch)) return ret(ch);
if ("=" == ch && stream.eat(">")) return ret("=>", "operator");
if ("0" == ch && stream.eat(/x/i)) return stream.eatWhile(/[\da-f]/i), ret("number", "number");
if (/\d/.test(ch)) return stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), ret("number", "number");
if ("/" == ch) return stream.eat("*") ? (state.tokenize = tokenComment, tokenComment(stream, state)) :stream.eat("/") ? (stream.skipToEnd(), 
ret("comment", "comment")) :"operator" == state.lastType || "keyword c" == state.lastType || "sof" == state.lastType || /^[\[{}\(,;:]$/.test(state.lastType) ? (readRegexp(stream), 
stream.eatWhile(/[gimy]/), ret("regexp", "string-2")) :(stream.eatWhile(isOperatorChar), 
ret("operator", "operator", stream.current()));
if ("`" == ch) return state.tokenize = tokenQuasi, tokenQuasi(stream, state);
if ("#" == ch) return stream.skipToEnd(), ret("error", "error");
if (isOperatorChar.test(ch)) return stream.eatWhile(isOperatorChar), ret("operator", "operator", stream.current());
stream.eatWhile(/[\w\$_]/);
var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
return known && "." != state.lastType ? ret(known.type, known.style, word) :ret("variable", "variable", word);
}
function tokenString(quote) {
return function(stream, state) {
var next, escaped = !1;
if (jsonldMode && "@" == stream.peek() && stream.match(isJsonldKeyword)) return state.tokenize = tokenBase, 
ret("jsonld-keyword", "meta");
for (;null != (next = stream.next()) && (next != quote || escaped); ) escaped = !escaped && "\\" == next;
return escaped || (state.tokenize = tokenBase), ret("string", "string");
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
return ret("comment", "comment");
}
function tokenQuasi(stream, state) {
for (var next, escaped = !1; null != (next = stream.next()); ) {
if (!escaped && ("`" == next || "$" == next && stream.eat("{"))) {
state.tokenize = tokenBase;
break;
}
escaped = !escaped && "\\" == next;
}
return ret("quasi", "string-2", stream.current());
}
function findFatArrow(stream, state) {
state.fatArrowAt && (state.fatArrowAt = null);
var arrow = stream.string.indexOf("=>", stream.start);
if (!(0 > arrow)) {
for (var depth = 0, sawSomething = !1, pos = arrow - 1; pos >= 0; --pos) {
var ch = stream.string.charAt(pos), bracket = brackets.indexOf(ch);
if (bracket >= 0 && 3 > bracket) {
if (!depth) {
++pos;
break;
}
if (0 == --depth) break;
} else if (bracket >= 3 && 6 > bracket) ++depth; else if (/[$\w]/.test(ch)) sawSomething = !0; else if (sawSomething && !depth) {
++pos;
break;
}
}
sawSomething && !depth && (state.fatArrowAt = pos);
}
}
function JSLexical(indented, column, type, align, prev, info) {
this.indented = indented, this.column = column, this.type = type, this.prev = prev, 
this.info = info, null != align && (this.align = align);
}
function inScope(state, varname) {
for (var v = state.localVars; v; v = v.next) if (v.name == varname) return !0;
for (var cx = state.context; cx; cx = cx.prev) for (var v = cx.vars; v; v = v.next) if (v.name == varname) return !0;
}
function parseJS(state, style, type, content, stream) {
var cc = state.cc;
for (cx.state = state, cx.stream = stream, cx.marked = null, cx.cc = cc, cx.style = style, 
state.lexical.hasOwnProperty("align") || (state.lexical.align = !0); ;) {
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
parserConfig.globalVars && (state.globalVars = {
name:varname,
next:state.globalVars
});
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
var state = cx.state, indent = state.indented;
"stat" == state.lexical.type && (indent = state.lexical.indented), state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
};
return result.lex = !0, result;
}
function poplex() {
var state = cx.state;
state.lexical.prev && (")" == state.lexical.type && (state.indented = state.lexical.indented), 
state.lexical = state.lexical.prev);
}
function expect(wanted) {
function exp(type) {
return type == wanted ? cont() :";" == wanted ? pass() :cont(exp);
}
return exp;
}
function statement(type, value) {
return "var" == type ? cont(pushlex("vardef", value.length), vardef, expect(";"), poplex) :"keyword a" == type ? cont(pushlex("form"), expression, statement, poplex) :"keyword b" == type ? cont(pushlex("form"), statement, poplex) :"{" == type ? cont(pushlex("}"), block, poplex) :";" == type ? cont() :"if" == type ? ("else" == cx.state.lexical.info && cx.state.cc[cx.state.cc.length - 1] == poplex && cx.state.cc.pop()(), 
cont(pushlex("form"), expression, statement, poplex, maybeelse)) :"function" == type ? cont(functiondef) :"for" == type ? cont(pushlex("form"), forspec, statement, poplex) :"variable" == type ? cont(pushlex("stat"), maybelabel) :"switch" == type ? cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"), block, poplex, poplex) :"case" == type ? cont(expression, expect(":")) :"default" == type ? cont(expect(":")) :"catch" == type ? cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"), statement, poplex, popcontext) :"module" == type ? cont(pushlex("form"), pushcontext, afterModule, popcontext, poplex) :"class" == type ? cont(pushlex("form"), className, poplex) :"export" == type ? cont(pushlex("form"), afterExport, poplex) :"import" == type ? cont(pushlex("form"), afterImport, poplex) :pass(pushlex("stat"), expression, expect(";"), poplex);
}
function expression(type) {
return expressionInner(type, !1);
}
function expressionNoComma(type) {
return expressionInner(type, !0);
}
function expressionInner(type, noComma) {
if (cx.state.fatArrowAt == cx.stream.start) {
var body = noComma ? arrowBodyNoComma :arrowBody;
if ("(" == type) return cont(pushcontext, pushlex(")"), commasep(pattern, ")"), poplex, expect("=>"), body, popcontext);
if ("variable" == type) return pass(pushcontext, pattern, expect("=>"), body, popcontext);
}
var maybeop = noComma ? maybeoperatorNoComma :maybeoperatorComma;
return atomicTypes.hasOwnProperty(type) ? cont(maybeop) :"function" == type ? cont(functiondef, maybeop) :"keyword c" == type ? cont(noComma ? maybeexpressionNoComma :maybeexpression) :"(" == type ? cont(pushlex(")"), maybeexpression, comprehension, expect(")"), poplex, maybeop) :"operator" == type || "spread" == type ? cont(noComma ? expressionNoComma :expression) :"[" == type ? cont(pushlex("]"), arrayLiteral, poplex, maybeop) :"{" == type ? contCommasep(objprop, "}", null, maybeop) :"quasi" == type ? pass(quasi, maybeop) :cont();
}
function maybeexpression(type) {
return type.match(/[;\}\)\],]/) ? pass() :pass(expression);
}
function maybeexpressionNoComma(type) {
return type.match(/[;\}\)\],]/) ? pass() :pass(expressionNoComma);
}
function maybeoperatorComma(type, value) {
return "," == type ? cont(expression) :maybeoperatorNoComma(type, value, !1);
}
function maybeoperatorNoComma(type, value, noComma) {
var me = 0 == noComma ? maybeoperatorComma :maybeoperatorNoComma, expr = 0 == noComma ? expression :expressionNoComma;
return "=>" == value ? cont(pushcontext, noComma ? arrowBodyNoComma :arrowBody, popcontext) :"operator" == type ? /\+\+|--/.test(value) ? cont(me) :"?" == value ? cont(expression, expect(":"), expr) :cont(expr) :"quasi" == type ? pass(quasi, me) :";" != type ? "(" == type ? contCommasep(expressionNoComma, ")", "call", me) :"." == type ? cont(property, me) :"[" == type ? cont(pushlex("]"), maybeexpression, expect("]"), poplex, me) :void 0 :void 0;
}
function quasi(type, value) {
return "quasi" != type ? pass() :"${" != value.slice(value.length - 2) ? cont(quasi) :cont(expression, continueQuasi);
}
function continueQuasi(type) {
return "}" == type ? (cx.marked = "string-2", cx.state.tokenize = tokenQuasi, cont(quasi)) :void 0;
}
function arrowBody(type) {
return findFatArrow(cx.stream, cx.state), "{" == type ? pass(statement) :pass(expression);
}
function arrowBodyNoComma(type) {
return findFatArrow(cx.stream, cx.state), "{" == type ? pass(statement) :pass(expressionNoComma);
}
function maybelabel(type) {
return ":" == type ? cont(poplex, statement) :pass(maybeoperatorComma, expect(";"), poplex);
}
function property(type) {
return "variable" == type ? (cx.marked = "property", cont()) :void 0;
}
function objprop(type, value) {
return "variable" == type || "keyword" == cx.style ? (cx.marked = "property", "get" == value || "set" == value ? cont(getterSetter) :cont(afterprop)) :"number" == type || "string" == type ? (cx.marked = jsonldMode ? "property" :cx.style + " property", 
cont(afterprop)) :"jsonld-keyword" == type ? cont(afterprop) :"[" == type ? cont(expression, expect("]"), afterprop) :void 0;
}
function getterSetter(type) {
return "variable" != type ? pass(afterprop) :(cx.marked = "property", cont(functiondef));
}
function afterprop(type) {
return ":" == type ? cont(expressionNoComma) :"(" == type ? pass(functiondef) :void 0;
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
function contCommasep(what, end, info) {
for (var i = 3; i < arguments.length; i++) cx.cc.push(arguments[i]);
return cont(pushlex(end, info), commasep(what, end), poplex);
}
function block(type) {
return "}" == type ? cont() :pass(statement, block);
}
function maybetype(type) {
return isTS && ":" == type ? cont(typedef) :void 0;
}
function typedef(type) {
return "variable" == type ? (cx.marked = "variable-3", cont()) :void 0;
}
function vardef() {
return pass(pattern, maybetype, maybeAssign, vardefCont);
}
function pattern(type, value) {
return "variable" == type ? (register(value), cont()) :"[" == type ? contCommasep(pattern, "]") :"{" == type ? contCommasep(proppattern, "}") :void 0;
}
function proppattern(type, value) {
return "variable" != type || cx.stream.match(/^\s*:/, !1) ? ("variable" == type && (cx.marked = "property"), 
cont(expect(":"), pattern, maybeAssign)) :(register(value), cont(maybeAssign));
}
function maybeAssign(_type, value) {
return "=" == value ? cont(expressionNoComma) :void 0;
}
function vardefCont(type) {
return "," == type ? cont(vardef) :void 0;
}
function maybeelse(type, value) {
return "keyword b" == type && "else" == value ? cont(pushlex("form", "else"), statement, poplex) :void 0;
}
function forspec(type) {
return "(" == type ? cont(pushlex(")"), forspec1, expect(")"), poplex) :void 0;
}
function forspec1(type) {
return "var" == type ? cont(vardef, expect(";"), forspec2) :";" == type ? cont(forspec2) :"variable" == type ? cont(formaybeinof) :pass(expression, expect(";"), forspec2);
}
function formaybeinof(_type, value) {
return "in" == value || "of" == value ? (cx.marked = "keyword", cont(expression)) :cont(maybeoperatorComma, forspec2);
}
function forspec2(type, value) {
return ";" == type ? cont(forspec3) :"in" == value || "of" == value ? (cx.marked = "keyword", 
cont(expression)) :pass(expression, expect(";"), forspec3);
}
function forspec3(type) {
")" != type && cont(expression);
}
function functiondef(type, value) {
return "*" == value ? (cx.marked = "keyword", cont(functiondef)) :"variable" == type ? (register(value), 
cont(functiondef)) :"(" == type ? cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, statement, popcontext) :void 0;
}
function funarg(type) {
return "spread" == type ? cont(funarg) :pass(pattern, maybetype);
}
function className(type, value) {
return "variable" == type ? (register(value), cont(classNameAfter)) :void 0;
}
function classNameAfter(type, value) {
return "extends" == value ? cont(expression, classNameAfter) :"{" == type ? cont(pushlex("}"), classBody, poplex) :void 0;
}
function classBody(type, value) {
return "variable" == type || "keyword" == cx.style ? (cx.marked = "property", "get" == value || "set" == value ? cont(classGetterSetter, functiondef, classBody) :cont(functiondef, classBody)) :"*" == value ? (cx.marked = "keyword", 
cont(classBody)) :";" == type ? cont(classBody) :"}" == type ? cont() :void 0;
}
function classGetterSetter(type) {
return "variable" != type ? pass() :(cx.marked = "property", cont());
}
function afterModule(type, value) {
return "string" == type ? cont(statement) :"variable" == type ? (register(value), 
cont(maybeFrom)) :void 0;
}
function afterExport(_type, value) {
return "*" == value ? (cx.marked = "keyword", cont(maybeFrom, expect(";"))) :"default" == value ? (cx.marked = "keyword", 
cont(expression, expect(";"))) :pass(statement);
}
function afterImport(type) {
return "string" == type ? cont() :pass(importSpec, maybeFrom);
}
function importSpec(type, value) {
return "{" == type ? contCommasep(importSpec, "}") :("variable" == type && register(value), 
cont());
}
function maybeFrom(_type, value) {
return "from" == value ? (cx.marked = "keyword", cont(expression)) :void 0;
}
function arrayLiteral(type) {
return "]" == type ? cont() :pass(expressionNoComma, maybeArrayComprehension);
}
function maybeArrayComprehension(type) {
return "for" == type ? pass(comprehension, expect("]")) :"," == type ? cont(commasep(expressionNoComma, "]")) :pass(commasep(expressionNoComma, "]"));
}
function comprehension(type) {
return "for" == type ? cont(forspec, comprehension) :"if" == type ? cont(expression, comprehension) :void 0;
}
var type, content, indentUnit = config.indentUnit, statementIndent = parserConfig.statementIndent, jsonldMode = parserConfig.jsonld, jsonMode = parserConfig.json || jsonldMode, isTS = parserConfig.typescript, keywords = function() {
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
"debugger":C,
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
"this":kw("this"),
module:kw("module"),
"class":kw("class"),
"super":kw("atom"),
yield:C,
"export":kw("export"),
"import":kw("import"),
"extends":C
};
if (isTS) {
var type = {
type:"variable",
style:"variable-3"
}, tsKeywords = {
"interface":kw("interface"),
"extends":kw("extends"),
constructor:kw("constructor"),
"public":kw("public"),
"private":kw("private"),
"protected":kw("protected"),
"static":kw("static"),
string:type,
number:type,
bool:type,
any:type
};
for (var attr in tsKeywords) jsKeywords[attr] = tsKeywords[attr];
}
return jsKeywords;
}(), isOperatorChar = /[+\-*&%=<>!?|~^]/, isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/, brackets = "([{}])", atomicTypes = {
atom:!0,
number:!0,
variable:!0,
string:!0,
regexp:!0,
"this":!0,
"jsonld-keyword":!0
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
var state = {
tokenize:tokenBase,
lastType:"sof",
cc:[],
lexical:new JSLexical((basecolumn || 0) - indentUnit, 0, "block", !1),
localVars:parserConfig.localVars,
context:parserConfig.localVars && {
vars:parserConfig.localVars
},
indented:0
};
return parserConfig.globalVars && "object" == typeof parserConfig.globalVars && (state.globalVars = parserConfig.globalVars), 
state;
},
token:function(stream, state) {
if (stream.sol() && (state.lexical.hasOwnProperty("align") || (state.lexical.align = !1), 
state.indented = stream.indentation(), findFatArrow(stream, state)), state.tokenize != tokenComment && stream.eatSpace()) return null;
var style = state.tokenize(stream, state);
return "comment" == type ? style :(state.lastType = "operator" != type || "++" != content && "--" != content ? type :"incdec", 
parseJS(state, style, type, content, stream));
},
indent:function(state, textAfter) {
if (state.tokenize == tokenComment) return CodeMirror.Pass;
if (state.tokenize != tokenBase) return 0;
var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;
if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
var c = state.cc[i];
if (c == poplex) lexical = lexical.prev; else if (c != maybeelse) break;
}
"stat" == lexical.type && "}" == firstChar && (lexical = lexical.prev), statementIndent && ")" == lexical.type && "stat" == lexical.prev.type && (lexical = lexical.prev);
var type = lexical.type, closing = firstChar == type;
return "vardef" == type ? lexical.indented + ("operator" == state.lastType || "," == state.lastType ? lexical.info + 1 :0) :"form" == type && "{" == firstChar ? lexical.indented :"form" == type ? lexical.indented + indentUnit :"stat" == type ? lexical.indented + ("operator" == state.lastType || "," == state.lastType ? statementIndent || indentUnit :0) :"switch" != lexical.info || closing || 0 == parserConfig.doubleIndentSwitch ? lexical.align ? lexical.column + (closing ? 0 :1) :lexical.indented + (closing ? 0 :indentUnit) :lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit :2 * indentUnit);
},
electricChars:":{}",
blockCommentStart:jsonMode ? null :"/*",
blockCommentEnd:jsonMode ? null :"*/",
lineComment:jsonMode ? null :"//",
fold:"brace",
helperType:jsonMode ? "json" :"javascript",
jsonldMode:jsonldMode,
jsonMode:jsonMode
};
}), CodeMirror.registerHelper("wordChars", "javascript", /[\\w$]/), CodeMirror.defineMIME("text/javascript", "javascript"), 
CodeMirror.defineMIME("text/ecmascript", "javascript"), CodeMirror.defineMIME("application/javascript", "javascript"), 
CodeMirror.defineMIME("application/x-javascript", "javascript"), CodeMirror.defineMIME("application/ecmascript", "javascript"), 
CodeMirror.defineMIME("application/json", {
name:"javascript",
json:!0
}), CodeMirror.defineMIME("application/x-json", {
name:"javascript",
json:!0
}), CodeMirror.defineMIME("application/ld+json", {
name:"javascript",
jsonld:!0
}), CodeMirror.defineMIME("text/typescript", {
name:"javascript",
typescript:!0
}), CodeMirror.defineMIME("application/typescript", {
name:"javascript",
typescript:!0
});
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
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
function tokenSGMLComment(stream, state) {
return stream.skipTo("-->") ? (stream.match("-->"), state.tokenize = null) :stream.skipToEnd(), 
[ "comment", "comment" ];
}
CodeMirror.defineMode("css", function(config, parserConfig) {
function ret(style, tp) {
return type = tp, style;
}
function tokenBase(stream, state) {
var ch = stream.next();
if (tokenHooks[ch]) {
var result = tokenHooks[ch](stream, state);
if (result !== !1) return result;
}
return "@" == ch ? (stream.eatWhile(/[\w\\\-]/), ret("def", stream.current())) :"=" == ch || ("~" == ch || "|" == ch) && stream.eat("=") ? ret(null, "compare") :'"' == ch || "'" == ch ? (state.tokenize = tokenString(ch), 
state.tokenize(stream, state)) :"#" == ch ? (stream.eatWhile(/[\w\\\-]/), ret("atom", "hash")) :"!" == ch ? (stream.match(/^\s*\w*/), 
ret("keyword", "important")) :/\d/.test(ch) || "." == ch && stream.eat(/\d/) ? (stream.eatWhile(/[\w.%]/), 
ret("number", "unit")) :"-" !== ch ? /[,+>*\/]/.test(ch) ? ret(null, "select-op") :"." == ch && stream.match(/^-?[_a-z][_a-z0-9-]*/i) ? ret("qualifier", "qualifier") :/[:;{}\[\]\(\)]/.test(ch) ? ret(null, ch) :"u" == ch && stream.match("rl(") ? (stream.backUp(1), 
state.tokenize = tokenParenthesized, ret("property", "word")) :/[\w\\\-]/.test(ch) ? (stream.eatWhile(/[\w\\\-]/), 
ret("property", "word")) :ret(null, null) :/[\d.]/.test(stream.peek()) ? (stream.eatWhile(/[\w.%]/), 
ret("number", "unit")) :stream.match(/^\w+-/) ? ret("meta", "meta") :void 0;
}
function tokenString(quote) {
return function(stream, state) {
for (var ch, escaped = !1; null != (ch = stream.next()); ) {
if (ch == quote && !escaped) {
")" == quote && stream.backUp(1);
break;
}
escaped = !escaped && "\\" == ch;
}
return (ch == quote || !escaped && ")" != quote) && (state.tokenize = null), ret("string", "string");
};
}
function tokenParenthesized(stream, state) {
return stream.next(), state.tokenize = stream.match(/\s*[\"\')]/, !1) ? null :tokenString(")"), 
ret(null, "(");
}
function Context(type, indent, prev) {
this.type = type, this.indent = indent, this.prev = prev;
}
function pushContext(state, stream, type) {
return state.context = new Context(type, stream.indentation() + indentUnit, state.context), 
type;
}
function popContext(state) {
return state.context = state.context.prev, state.context.type;
}
function pass(type, stream, state) {
return states[state.context.type](type, stream, state);
}
function popAndPass(type, stream, state, n) {
for (var i = n || 1; i > 0; i--) state.context = state.context.prev;
return pass(type, stream, state);
}
function wordAsValue(stream) {
var word = stream.current().toLowerCase();
override = valueKeywords.hasOwnProperty(word) ? "atom" :colorKeywords.hasOwnProperty(word) ? "keyword" :"variable";
}
parserConfig.propertyKeywords || (parserConfig = CodeMirror.resolveMode("text/css"));
var type, override, indentUnit = config.indentUnit, tokenHooks = parserConfig.tokenHooks, mediaTypes = parserConfig.mediaTypes || {}, mediaFeatures = parserConfig.mediaFeatures || {}, propertyKeywords = parserConfig.propertyKeywords || {}, nonStandardPropertyKeywords = parserConfig.nonStandardPropertyKeywords || {}, colorKeywords = parserConfig.colorKeywords || {}, valueKeywords = parserConfig.valueKeywords || {}, fontProperties = parserConfig.fontProperties || {}, allowNested = parserConfig.allowNested, states = {};
return states.top = function(type, stream, state) {
if ("{" == type) return pushContext(state, stream, "block");
if ("}" == type && state.context.prev) return popContext(state);
if ("@media" == type) return pushContext(state, stream, "media");
if ("@font-face" == type) return "font_face_before";
if (/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(type)) return "keyframes";
if (type && "@" == type.charAt(0)) return pushContext(state, stream, "at");
if ("hash" == type) override = "builtin"; else if ("word" == type) override = "tag"; else {
if ("variable-definition" == type) return "maybeprop";
if ("interpolation" == type) return pushContext(state, stream, "interpolation");
if (":" == type) return "pseudo";
if (allowNested && "(" == type) return pushContext(state, stream, "parens");
}
return state.context.type;
}, states.block = function(type, stream, state) {
if ("word" == type) {
var word = stream.current().toLowerCase();
return propertyKeywords.hasOwnProperty(word) ? (override = "property", "maybeprop") :nonStandardPropertyKeywords.hasOwnProperty(word) ? (override = "string-2", 
"maybeprop") :allowNested ? (override = stream.match(/^\s*:/, !1) ? "property" :"tag", 
"block") :(override += " error", "maybeprop");
}
return "meta" == type ? "block" :allowNested || "hash" != type && "qualifier" != type ? states.top(type, stream, state) :(override = "error", 
"block");
}, states.maybeprop = function(type, stream, state) {
return ":" == type ? pushContext(state, stream, "prop") :pass(type, stream, state);
}, states.prop = function(type, stream, state) {
if (";" == type) return popContext(state);
if ("{" == type && allowNested) return pushContext(state, stream, "propBlock");
if ("}" == type || "{" == type) return popAndPass(type, stream, state);
if ("(" == type) return pushContext(state, stream, "parens");
if ("hash" != type || /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(stream.current())) {
if ("word" == type) wordAsValue(stream); else if ("interpolation" == type) return pushContext(state, stream, "interpolation");
} else override += " error";
return "prop";
}, states.propBlock = function(type, _stream, state) {
return "}" == type ? popContext(state) :"word" == type ? (override = "property", 
"maybeprop") :state.context.type;
}, states.parens = function(type, stream, state) {
return "{" == type || "}" == type ? popAndPass(type, stream, state) :")" == type ? popContext(state) :"(" == type ? pushContext(state, stream, "parens") :("word" == type && wordAsValue(stream), 
"parens");
}, states.pseudo = function(type, stream, state) {
return "word" == type ? (override = "variable-3", state.context.type) :pass(type, stream, state);
}, states.media = function(type, stream, state) {
if ("(" == type) return pushContext(state, stream, "media_parens");
if ("}" == type) return popAndPass(type, stream, state);
if ("{" == type) return popContext(state) && pushContext(state, stream, allowNested ? "block" :"top");
if ("word" == type) {
var word = stream.current().toLowerCase();
override = "only" == word || "not" == word || "and" == word ? "keyword" :mediaTypes.hasOwnProperty(word) ? "attribute" :mediaFeatures.hasOwnProperty(word) ? "property" :"error";
}
return state.context.type;
}, states.media_parens = function(type, stream, state) {
return ")" == type ? popContext(state) :"{" == type || "}" == type ? popAndPass(type, stream, state, 2) :states.media(type, stream, state);
}, states.font_face_before = function(type, stream, state) {
return "{" == type ? pushContext(state, stream, "font_face") :pass(type, stream, state);
}, states.font_face = function(type, stream, state) {
return "}" == type ? popContext(state) :"word" == type ? (override = fontProperties.hasOwnProperty(stream.current().toLowerCase()) ? "property" :"error", 
"maybeprop") :"font_face";
}, states.keyframes = function(type, stream, state) {
return "word" == type ? (override = "variable", "keyframes") :"{" == type ? pushContext(state, stream, "top") :pass(type, stream, state);
}, states.at = function(type, stream, state) {
return ";" == type ? popContext(state) :"{" == type || "}" == type ? popAndPass(type, stream, state) :("word" == type ? override = "tag" :"hash" == type && (override = "builtin"), 
"at");
}, states.interpolation = function(type, stream, state) {
return "}" == type ? popContext(state) :"{" == type || ";" == type ? popAndPass(type, stream, state) :("variable" != type && (override = "error"), 
"interpolation");
}, {
startState:function(base) {
return {
tokenize:null,
state:"top",
context:new Context("top", base || 0, null)
};
},
token:function(stream, state) {
if (!state.tokenize && stream.eatSpace()) return null;
var style = (state.tokenize || tokenBase)(stream, state);
return style && "object" == typeof style && (type = style[1], style = style[0]), 
override = style, state.state = states[state.state](type, stream, state), override;
},
indent:function(state, textAfter) {
var cx = state.context, ch = textAfter && textAfter.charAt(0), indent = cx.indent;
return "prop" != cx.type || "}" != ch && ")" != ch || (cx = cx.prev), !cx.prev || ("}" != ch || "block" != cx.type && "top" != cx.type && "interpolation" != cx.type && "font_face" != cx.type) && (")" != ch || "parens" != cx.type && "media_parens" != cx.type) && ("{" != ch || "at" != cx.type && "media" != cx.type) || (indent = cx.indent - indentUnit, 
cx = cx.prev), indent;
},
electricChars:"}",
blockCommentStart:"/*",
blockCommentEnd:"*/",
fold:"brace"
};
});
var mediaTypes_ = [ "all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed" ], mediaTypes = keySet(mediaTypes_), mediaFeatures_ = [ "width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid" ], mediaFeatures = keySet(mediaFeatures_), propertyKeywords_ = [ "align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-position", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode" ], propertyKeywords = keySet(propertyKeywords_), nonStandardPropertyKeywords_ = [ "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom" ], nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_), colorKeywords_ = [ "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen" ], colorKeywords = keySet(colorKeywords_), valueKeywords_ = [ "above", "absolute", "activeborder", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "auto", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "column", "compact", "condensed", "contain", "content", "content-box", "context-menu", "continuous", "copy", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "disc", "discard", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ew-resize", "expanded", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "landscape", "lao", "large", "larger", "left", "level", "lighter", "line-through", "linear", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "malayalam", "match", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "round", "row-resize", "rtl", "run-in", "running", "s-resize", "sans-serif", "scroll", "scrollbar", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "single", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "x-large", "x-small", "xor", "xx-large", "xx-small" ], valueKeywords = keySet(valueKeywords_), fontProperties_ = [ "font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style" ], fontProperties = keySet(fontProperties_), allWords = mediaTypes_.concat(mediaFeatures_).concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_).concat(valueKeywords_);
CodeMirror.registerHelper("hintWords", "css", allWords), CodeMirror.defineMIME("text/css", {
mediaTypes:mediaTypes,
mediaFeatures:mediaFeatures,
propertyKeywords:propertyKeywords,
nonStandardPropertyKeywords:nonStandardPropertyKeywords,
colorKeywords:colorKeywords,
valueKeywords:valueKeywords,
fontProperties:fontProperties,
tokenHooks:{
"<":function(stream, state) {
return stream.match("!--") ? (state.tokenize = tokenSGMLComment, tokenSGMLComment(stream, state)) :!1;
},
"/":function(stream, state) {
return stream.eat("*") ? (state.tokenize = tokenCComment, tokenCComment(stream, state)) :!1;
}
},
name:"css"
}), CodeMirror.defineMIME("text/x-scss", {
mediaTypes:mediaTypes,
mediaFeatures:mediaFeatures,
propertyKeywords:propertyKeywords,
nonStandardPropertyKeywords:nonStandardPropertyKeywords,
colorKeywords:colorKeywords,
valueKeywords:valueKeywords,
fontProperties:fontProperties,
allowNested:!0,
tokenHooks:{
"/":function(stream, state) {
return stream.eat("/") ? (stream.skipToEnd(), [ "comment", "comment" ]) :stream.eat("*") ? (state.tokenize = tokenCComment, 
tokenCComment(stream, state)) :[ "operator", "operator" ];
},
":":function(stream) {
return stream.match(/\s*\{/) ? [ null, "{" ] :!1;
},
$:function(stream) {
return stream.match(/^[\w-]+/), stream.match(/^\s*:/, !1) ? [ "variable-2", "variable-definition" ] :[ "variable-2", "variable" ];
},
"#":function(stream) {
return stream.eat("{") ? [ null, "interpolation" ] :!1;
}
},
name:"css",
helperType:"scss"
}), CodeMirror.defineMIME("text/x-less", {
mediaTypes:mediaTypes,
mediaFeatures:mediaFeatures,
propertyKeywords:propertyKeywords,
nonStandardPropertyKeywords:nonStandardPropertyKeywords,
colorKeywords:colorKeywords,
valueKeywords:valueKeywords,
fontProperties:fontProperties,
allowNested:!0,
tokenHooks:{
"/":function(stream, state) {
return stream.eat("/") ? (stream.skipToEnd(), [ "comment", "comment" ]) :stream.eat("*") ? (state.tokenize = tokenCComment, 
tokenCComment(stream, state)) :[ "operator", "operator" ];
},
"@":function(stream) {
return stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/, !1) ? !1 :(stream.eatWhile(/[\w\\\-]/), 
stream.match(/^\s*:/, !1) ? [ "variable-2", "variable-definition" ] :[ "variable-2", "variable" ]);
},
"&":function() {
return [ "atom", "atom" ];
}
},
name:"css",
helperType:"less"
});
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("xml", function(config, parserConfig) {
function inText(stream, state) {
function chain(parser) {
return state.tokenize = parser, parser(stream, state);
}
var ch = stream.next();
if ("<" == ch) return stream.eat("!") ? stream.eat("[") ? stream.match("CDATA[") ? chain(inBlock("atom", "]]>")) :null :stream.match("--") ? chain(inBlock("comment", "-->")) :stream.match("DOCTYPE", !0, !0) ? (stream.eatWhile(/[\w\._\-]/), 
chain(doctype(1))) :null :stream.eat("?") ? (stream.eatWhile(/[\w\._\-]/), state.tokenize = inBlock("meta", "?>"), 
"meta") :(type = stream.eat("/") ? "closeTag" :"openTag", state.tokenize = inTag, 
"tag bracket");
if ("&" == ch) {
var ok;
return ok = stream.eat("#") ? stream.eat("x") ? stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";") :stream.eatWhile(/[\d]/) && stream.eat(";") :stream.eatWhile(/[\w\.\-:]/) && stream.eat(";"), 
ok ? "atom" :"error";
}
return stream.eatWhile(/[^&<]/), null;
}
function inTag(stream, state) {
var ch = stream.next();
if (">" == ch || "/" == ch && stream.eat(">")) return state.tokenize = inText, type = ">" == ch ? "endTag" :"selfcloseTag", 
"tag bracket";
if ("=" == ch) return type = "equals", null;
if ("<" == ch) {
state.tokenize = inText, state.state = baseState, state.tagName = state.tagStart = null;
var next = state.tokenize(stream, state);
return next ? next + " tag error" :"tag error";
}
return /[\'\"]/.test(ch) ? (state.tokenize = inAttribute(ch), state.stringStartCol = stream.column(), 
state.tokenize(stream, state)) :(stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), 
"word");
}
function inAttribute(quote) {
var closure = function(stream, state) {
for (;!stream.eol(); ) if (stream.next() == quote) {
state.tokenize = inTag;
break;
}
return "string";
};
return closure.isInAttribute = !0, closure;
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
function Context(state, tagName, startOfLine) {
this.prev = state.context, this.tagName = tagName, this.indent = state.indented, 
this.startOfLine = startOfLine, (Kludges.doNotIndent.hasOwnProperty(tagName) || state.context && state.context.noIndent) && (this.noIndent = !0);
}
function popContext(state) {
state.context && (state.context = state.context.prev);
}
function maybePopContext(state, nextTagName) {
for (var parentTagName; ;) {
if (!state.context) return;
if (parentTagName = state.context.tagName, !Kludges.contextGrabbers.hasOwnProperty(parentTagName) || !Kludges.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) return;
popContext(state);
}
}
function baseState(type, stream, state) {
return "openTag" == type ? (state.tagStart = stream.column(), tagNameState) :"closeTag" == type ? closeTagNameState :baseState;
}
function tagNameState(type, stream, state) {
return "word" == type ? (state.tagName = stream.current(), setStyle = "tag", attrState) :(setStyle = "error", 
tagNameState);
}
function closeTagNameState(type, stream, state) {
if ("word" == type) {
var tagName = stream.current();
return state.context && state.context.tagName != tagName && Kludges.implicitlyClosed.hasOwnProperty(state.context.tagName) && popContext(state), 
state.context && state.context.tagName == tagName ? (setStyle = "tag", closeState) :(setStyle = "tag error", 
closeStateErr);
}
return setStyle = "error", closeStateErr;
}
function closeState(type, _stream, state) {
return "endTag" != type ? (setStyle = "error", closeState) :(popContext(state), 
baseState);
}
function closeStateErr(type, stream, state) {
return setStyle = "error", closeState(type, stream, state);
}
function attrState(type, _stream, state) {
if ("word" == type) return setStyle = "attribute", attrEqState;
if ("endTag" == type || "selfcloseTag" == type) {
var tagName = state.tagName, tagStart = state.tagStart;
return state.tagName = state.tagStart = null, "selfcloseTag" == type || Kludges.autoSelfClosers.hasOwnProperty(tagName) ? maybePopContext(state, tagName) :(maybePopContext(state, tagName), 
state.context = new Context(state, tagName, tagStart == state.indented)), baseState;
}
return setStyle = "error", attrState;
}
function attrEqState(type, stream, state) {
return "equals" == type ? attrValueState :(Kludges.allowMissing || (setStyle = "error"), 
attrState(type, stream, state));
}
function attrValueState(type, stream, state) {
return "string" == type ? attrContinuedState :"word" == type && Kludges.allowUnquoted ? (setStyle = "string", 
attrState) :(setStyle = "error", attrState(type, stream, state));
}
function attrContinuedState(type, stream, state) {
return "string" == type ? attrContinuedState :attrState(type, stream, state);
}
var indentUnit = config.indentUnit, multilineTagIndentFactor = parserConfig.multilineTagIndentFactor || 1, multilineTagIndentPastTag = parserConfig.multilineTagIndentPastTag;
null == multilineTagIndentPastTag && (multilineTagIndentPastTag = !0);
var type, setStyle, Kludges = parserConfig.htmlMode ? {
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
allowMissing:!0,
caseFold:!0
} :{
autoSelfClosers:{},
implicitlyClosed:{},
contextGrabbers:{},
doNotIndent:{},
allowUnquoted:!1,
allowMissing:!1,
caseFold:!1
}, alignCDATA = parserConfig.alignCDATA;
return {
startState:function() {
return {
tokenize:inText,
state:baseState,
indented:0,
tagName:null,
tagStart:null,
context:null
};
},
token:function(stream, state) {
if (!state.tagName && stream.sol() && (state.indented = stream.indentation()), stream.eatSpace()) return null;
type = null;
var style = state.tokenize(stream, state);
return (style || type) && "comment" != style && (setStyle = null, state.state = state.state(type || style, stream, state), 
setStyle && (style = "error" == setStyle ? style + " error" :setStyle)), style;
},
indent:function(state, textAfter, fullLine) {
var context = state.context;
if (state.tokenize.isInAttribute) return state.tagStart == state.indented ? state.stringStartCol + 1 :state.indented + indentUnit;
if (context && context.noIndent) return CodeMirror.Pass;
if (state.tokenize != inTag && state.tokenize != inText) return fullLine ? fullLine.match(/^(\s*)/)[0].length :0;
if (state.tagName) return multilineTagIndentPastTag ? state.tagStart + state.tagName.length + 2 :state.tagStart + indentUnit * multilineTagIndentFactor;
if (alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
if (tagAfter && tagAfter[1]) for (;context; ) {
if (context.tagName == tagAfter[2]) {
context = context.prev;
break;
}
if (!Kludges.implicitlyClosed.hasOwnProperty(context.tagName)) break;
context = context.prev;
} else if (tagAfter) for (;context; ) {
var grabbers = Kludges.contextGrabbers[context.tagName];
if (!grabbers || !grabbers.hasOwnProperty(tagAfter[2])) break;
context = context.prev;
}
for (;context && !context.startOfLine; ) context = context.prev;
return context ? context.indent + indentUnit :0;
},
electricInput:/<\/[\s\w:]+>$/,
blockCommentStart:"<!--",
blockCommentEnd:"-->",
configuration:parserConfig.htmlMode ? "html" :"xml",
helperType:parserConfig.htmlMode ? "html" :"xml"
};
}), CodeMirror.defineMIME("text/xml", "xml"), CodeMirror.defineMIME("application/xml", "xml"), 
CodeMirror.mimeModes.hasOwnProperty("text/html") || CodeMirror.defineMIME("text/html", {
name:"xml",
htmlMode:!0
});
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../xml/xml"), require("../javascript/javascript"), require("../css/css")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("htmlmixed", function(config, parserConfig) {
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
stream.match(pat, !1) || stream.match(cur)), style;
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
htmlMode:!0,
multilineTagIndentFactor:parserConfig.multilineTagIndentFactor,
multilineTagIndentPastTag:parserConfig.multilineTagIndentPastTag
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
innerMode:function(state) {
return {
state:state.localState || state.htmlState,
mode:state.localMode || htmlMode
};
}
};
}, "xml", "javascript", "css"), CodeMirror.defineMIME("text/html", "htmlmixed");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
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
}), CodeMirror.defineMIME("text/x-common-lisp", "commonlisp");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("pascal", function() {
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
}), CodeMirror.defineMIME("text/x-pascal", "pascal");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.defineMode("groovy", function(config) {
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
electricChars:"{}",
fold:"brace"
};
}), CodeMirror.defineMIME("text/x-groovy", "groovy");
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
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
if (options && options.call) {
var finder = options;
options = null;
} else var finder = getOption(cm, options, "rangeFinder");
"number" == typeof pos && (pos = CodeMirror.Pos(pos, 0));
var minSize = getOption(cm, options, "minFoldSize"), range = getRange(!0);
if (getOption(cm, options, "scanUp")) for (;!range && pos.line > cm.firstLine(); ) pos = CodeMirror.Pos(pos.line - 1, 0), 
range = getRange(!1);
if (range && !range.cleared && "unfold" !== force) {
var myWidget = makeWidget(cm, options);
CodeMirror.on(myWidget, "mousedown", function(e) {
myRange.clear(), CodeMirror.e_preventDefault(e);
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
function makeWidget(cm, options) {
var widget = getOption(cm, options, "widget");
if ("string" == typeof widget) {
var text = document.createTextNode(widget);
widget = document.createElement("span"), widget.appendChild(text), widget.className = "CodeMirror-foldmarker";
}
return widget;
}
function getOption(cm, options, name) {
if (options && void 0 !== options[name]) return options[name];
var editorOptions = cm.options.foldOptions;
return editorOptions && void 0 !== editorOptions[name] ? editorOptions[name] :defaultOptions[name];
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
}), CodeMirror.commands.toggleFold = function(cm) {
cm.foldCode(cm.getCursor());
}, CodeMirror.commands.fold = function(cm) {
cm.foldCode(cm.getCursor(), null, "fold");
}, CodeMirror.commands.unfold = function(cm) {
cm.foldCode(cm.getCursor(), null, "unfold");
}, CodeMirror.commands.foldAll = function(cm) {
cm.operation(function() {
for (var i = cm.firstLine(), e = cm.lastLine(); e >= i; i++) cm.foldCode(CodeMirror.Pos(i, 0), null, "fold");
});
}, CodeMirror.commands.unfoldAll = function(cm) {
cm.operation(function() {
for (var i = cm.firstLine(), e = cm.lastLine(); e >= i; i++) cm.foldCode(CodeMirror.Pos(i, 0), null, "unfold");
});
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
var defaultOptions = {
rangeFinder:CodeMirror.fold.auto,
widget:"\u2194",
minFoldSize:0,
scanUp:!1
};
CodeMirror.defineOption("foldOptions", null);
});