var _requirejs = requirejs;

requirejs = void 0;

var _require = require;

require = void 0;

var _define = define;

define = void 0, // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
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
"object" == typeof exports && "object" == typeof module ? mod(require("../lib/codemirror"), require("../addon/search/searchcursor"), require("../addon/dialog/dialog"), require("../addon/edit/matchbrackets.js")) :"function" == typeof define && define.amd ? define([ "../lib/codemirror", "../addon/search/searchcursor", "../addon/dialog/dialog", "../addon/edit/matchbrackets" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
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
toJumplist:!0,
linewise:!0
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
keys:[ "]", "p" ],
type:"action",
action:"paste",
isEdit:!0,
actionArgs:{
after:!0,
isEdit:!0,
matchIndent:!0
}
}, {
keys:[ "[", "p" ],
type:"action",
action:"paste",
isEdit:!0,
actionArgs:{
after:!1,
isEdit:!0,
matchIndent:!0
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
keys:[ "o" ],
type:"motion",
motion:"moveToOtherHighlightedEnd",
motionArgs:{},
context:"visual"
}, {
keys:[ "O" ],
type:"motion",
motion:"moveToOtherHighlightedEnd",
motionArgs:{
sameLine:!0
},
context:"visual"
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
keys:[ "A" ],
type:"action",
action:"enterInsertMode",
isEdit:!0,
actionArgs:{
insertAt:"endOfSelectedArea"
},
context:"visual"
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
keys:[ "<C-v>" ],
type:"action",
action:"toggleVisualMode",
actionArgs:{
blockwise:!0
}
}, {
keys:[ "g", "v" ],
type:"action",
action:"reselectLastSelection"
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
keys:[ "u" ],
type:"action",
action:"changeCase",
actionArgs:{
toLower:!0
},
context:"visual",
isEdit:!0
}, {
keys:[ "U" ],
type:"action",
action:"changeCase",
actionArgs:{
toLower:!1
},
context:"visual",
isEdit:!0
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
wholeWordOnly:!0,
toJumplist:!0
}
}, {
keys:[ "#" ],
type:"search",
searchArgs:{
forward:!1,
querySrc:"wordUnderCursor",
wholeWordOnly:!0,
toJumplist:!0
}
}, {
keys:[ "g", "*" ],
type:"search",
searchArgs:{
forward:!0,
querySrc:"wordUnderCursor",
toJumplist:!0
}
}, {
keys:[ "g", "#" ],
type:"search",
searchArgs:{
forward:!1,
querySrc:"wordUnderCursor",
toJumplist:!0
}
}, {
keys:[ ":" ],
type:"ex"
} ], Pos = CodeMirror.Pos, Vim = function() {
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
function defineOption(name, defaultValue, type) {
if (void 0 === defaultValue) throw Error("defaultValue is required");
type || (type = "string"), options[name] = {
type:type,
defaultValue:defaultValue
}, setOption(name, defaultValue);
}
function setOption(name, value) {
var option = options[name];
if (!option) throw Error("Unknown option: " + name);
if ("boolean" == option.type) {
if (value && value !== !0) throw Error("Invalid argument: " + name + "=" + value);
value !== !1 && (value = !0);
}
option.value = "boolean" == option.type ? !!value :value;
}
function getOption(name) {
var option = options[name];
if (!option) throw Error("Unknown option: " + name);
return option.value;
}
function MacroModeState() {
this.latestRegister = void 0, this.isPlaying = !1, this.isRecording = !1, this.replaySearchQueries = [], 
this.onRecordingDone = void 0, this.lastInsertModeChanges = createInsertModeChanges();
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
fakeCursor:null,
insertMode:!1,
insertModeRepeat:void 0,
visualMode:!1,
visualLine:!1,
visualBlock:!1,
lastSelection:null,
lastPastedText:null
}), cm.state.vim;
}
function resetVimGlobalState() {
vimGlobalState = {
searchQuery:null,
searchIsReversed:!1,
lastSubstituteReplacePart:void 0,
jumpList:createCircularJumpList(),
macroModeState:new MacroModeState(),
lastChararacterSearch:{
increment:0,
forward:!0,
selectedCharacter:""
},
registerController:new RegisterController({}),
searchHistoryController:new HistoryController({}),
exCommandHistoryController:new HistoryController({})
};
for (var optionName in options) {
var option = options[optionName];
option.value = option.defaultValue;
}
}
function InputState() {
this.prefixRepeat = [], this.motionRepeat = [], this.operator = null, this.operatorArgs = null, 
this.motion = null, this.motionArgs = null, this.keyBuffer = [], this.registerName = null;
}
function clearInputState(cm, reason) {
cm.state.vim.inputState = new InputState(), CodeMirror.signal(cm, "vim-command-done", reason);
}
function Register(text, linewise) {
this.clear(), this.keyBuffer = [ text || "" ], this.insertModeChanges = [], this.searchQueries = [], 
this.linewise = !!linewise;
}
function RegisterController(registers) {
this.registers = registers, this.unnamedRegister = registers['"'] = new Register(), 
registers["."] = new Register(), registers[":"] = new Register(), registers["/"] = new Register();
}
function HistoryController() {
this.historyBuffer = [], this.iterator, this.initialPrefix = null;
}
function clipCursorToContent(cm, cur, includeLineBreak) {
var line = Math.min(Math.max(cm.firstLine(), cur.line), cm.lastLine()), maxCh = lineLength(cm, line) - 1;
maxCh = includeLineBreak ? maxCh + 1 :maxCh;
var ch = Math.min(Math.max(0, cur.ch), maxCh);
return Pos(line, ch);
}
function copyArgs(args) {
var ret = {};
for (var prop in args) args.hasOwnProperty(prop) && (ret[prop] = args[prop]);
return ret;
}
function offsetCursor(cur, offsetLine, offsetCh) {
return Pos(cur.line + offsetLine, cur.ch + offsetCh);
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
return Pos(cur.line, cur.ch);
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
function selectBlock(cm, selectionEnd) {
var start, end, selectionStart, selections = [], ranges = cm.listSelections(), firstRange = ranges[0].anchor, lastRange = ranges[ranges.length - 1].anchor, curEnd = cm.getCursor("head"), primIndex = getIndex(ranges, curEnd), contains = getIndex(ranges, selectionEnd) < 0 ? !1 :!0;
selectionEnd = cm.clipPos(selectionEnd);
var near = Math.abs(firstRange.line - selectionEnd.line) - Math.abs(lastRange.line - selectionEnd.line);
if (near > 0 ? (end = selectionEnd.line, start = firstRange.line, lastRange.line == selectionEnd.line && contains && (start = end)) :0 > near ? (start = selectionEnd.line, 
end = lastRange.line, firstRange.line == selectionEnd.line && contains && (end = start)) :0 == primIndex ? (start = selectionEnd.line, 
end = lastRange.line) :(start = firstRange.line, end = selectionEnd.line), start > end) {
var tmp = start;
start = end, end = tmp;
}
for (selectionStart = near > 0 ? firstRange :lastRange; end >= start; ) {
var anchor = {
line:start,
ch:selectionStart.ch
}, head = {
line:start,
ch:selectionEnd.ch
};
anchor.ch < curEnd.ch && (head.ch == anchor.ch || anchor.ch - head.ch == 1) ? (anchor.ch++, 
head.ch--) :anchor.ch > curEnd.ch && (head.ch == anchor.ch || anchor.ch - head.ch == -1) && (anchor.ch--, 
head.ch++);
var range = {
anchor:anchor,
head:head
};
selections.push(range), cursorEqual(head, selectionEnd) && (primIndex = selections.indexOf(range)), 
start++;
}
return selectionEnd.ch = selections[0].head.ch, selectionStart.ch = selections[0].anchor.ch, 
cm.setSelections(selections, primIndex), selectionStart;
}
function getIndex(ranges, head) {
for (var i = 0; i < ranges.length; i++) if (cursorEqual(ranges[i].head, head)) return i;
return -1;
}
function getSelectedAreaRange(cm, vim) {
var selectionStart = cm.getCursor("anchor"), selectionEnd = cm.getCursor("head"), lastSelection = vim.lastSelection;
if (vim.visualMode) {
if (cursorIsBefore(selectionEnd, selectionStart)) {
var tmp = selectionStart;
selectionStart = selectionEnd, selectionEnd = tmp;
}
exitVisualMode(cm);
} else {
var lastSelectionCurStart = vim.lastSelection.curStartMark.find(), lastSelectionCurEnd = vim.lastSelection.curEndMark.find(), line = lastSelectionCurEnd.line - lastSelectionCurStart.line, ch = line ? lastSelectionCurEnd.ch :lastSelectionCurEnd.ch - lastSelectionCurStart.ch;
if (selectionEnd = {
line:selectionEnd.line + line,
ch:line ? selectionEnd.ch :ch + selectionEnd.ch
}, lastSelection.visualLine) return [ {
line:selectionStart.line,
ch:0
}, {
line:selectionEnd.line,
ch:lineLength(cm, selectionEnd.line)
} ];
}
return [ selectionStart, selectionEnd ];
}
function updateLastSelection(cm, vim, selectionStart, selectionEnd) {
selectionStart && selectionEnd || (selectionStart = vim.marks["<"].find() || cm.getCursor("anchor"), 
selectionEnd = vim.marks[">"].find() || cm.getCursor("head")), vim.lastPastedText && (selectionEnd = cm.posFromIndex(cm.indexFromPos(selectionStart) + vim.lastPastedText.length), 
vim.lastPastedText = null);
var ranges = cm.listSelections(), swap = getIndex(ranges, selectionStart) > -1;
vim.lastSelection = {
curStartMark:cm.setBookmark(swap ? selectionEnd :selectionStart),
curEndMark:cm.setBookmark(swap ? selectionStart :selectionEnd),
visualMode:vim.visualMode,
visualLine:vim.visualLine,
visualBlock:vim.visualBlock
};
}
function exitVisualMode(cm) {
cm.off("mousedown", exitVisualMode);
var vim = cm.state.vim, selectionStart = cm.getCursor("anchor"), selectionEnd = cm.getCursor("head");
updateLastSelection(cm, vim), vim.visualMode = !1, vim.visualLine = !1, vim.visualBlock = !1, 
cursorEqual(selectionStart, selectionEnd) || cm.setCursor(clipCursorToContent(cm, selectionEnd)), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"normal"
}), vim.fakeCursor && vim.fakeCursor.clear();
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
start:Pos(cur.line, wordStart),
end:Pos(cur.line, wordEnd)
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
var cur = copyCursor(cm.getCursor()), increment = forward ? 1 :-1, endLine = forward ? cm.lineCount() :-1, curCh = cur.ch, line = cur.line, lineText = cm.getLine(line), state = {
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
return state.nextCh || state.curMoveThrough ? Pos(line, state.index) :cur;
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
words.push(word), cur = Pos(word.line, forward ? word.to - 1 :word.from);
}
var shortCircuit = words.length != repeat, firstWord = words[0], lastWord = words.pop();
return forward && !wordEnd ? (shortCircuit || firstWord.from == curStart.ch && firstWord.line == curStart.line || (lastWord = words.pop()), 
Pos(lastWord.line, lastWord.from)) :forward && wordEnd ? Pos(lastWord.line, lastWord.to - 1) :!forward && wordEnd ? (shortCircuit || firstWord.to == curStart.ch && firstWord.line == curStart.line || (lastWord = words.pop()), 
Pos(lastWord.line, lastWord.to)) :Pos(lastWord.line, lastWord.from);
}
function moveToCharacter(cm, repeat, forward, character) {
for (var idx, cur = cm.getCursor(), start = cur.ch, i = 0; repeat > i; i++) {
var line = cm.getLine(cur.line);
if (idx = charIdxInLine(start, line, character, forward, !0), -1 == idx) return null;
start = idx;
}
return Pos(cm.getCursor().line, idx);
}
function moveToColumn(cm, repeat) {
var line = cm.getCursor().line;
return clipCursorToContent(cm, Pos(line, repeat - 1));
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
function selectCompanionObject(cm, symb, inclusive) {
var start, end, cur = cm.getCursor(), bracketRegexp = {
"(":/[()]/,
")":/[()]/,
"[":/[[\]]/,
"]":/[[\]]/,
"{":/[{}]/,
"}":/[{}]/
}[symb], openSym = {
"(":"(",
")":"(",
"[":"[",
"]":"[",
"{":"{",
"}":"{"
}[symb], curChar = cm.getLine(cur.line).charAt(cur.ch), offset = curChar === openSym ? 1 :0;
if (start = cm.scanForBracket(Pos(cur.line, cur.ch + offset), -1, null, {
bracketRegex:bracketRegexp
}), end = cm.scanForBracket(Pos(cur.line, cur.ch + offset), 1, null, {
bracketRegex:bracketRegexp
}), !start || !end) return {
start:cur,
end:cur
};
if (start = start.pos, end = end.pos, start.line == end.line && start.ch > end.ch || start.line > end.line) {
var tmp = start;
start = end, end = tmp;
}
return inclusive ? end.ch += 1 :start.ch += 1, {
start:start,
end:end
};
}
function findBeginningAndEnd(cm, symb, inclusive) {
var start, end, i, len, cur = copyCursor(cm.getCursor()), line = cm.getLine(cur.line), chars = line.split(""), firstIndex = chars.indexOf(symb);
if (cur.ch < firstIndex ? cur.ch = firstIndex :firstIndex < cur.ch && chars[cur.ch] == symb && (end = cur.ch, 
--cur.ch), chars[cur.ch] != symb || end) for (i = cur.ch; i > -1 && !start; i--) chars[i] == symb && (start = i + 1); else start = cur.ch + 1;
if (start && !end) for (i = start, len = chars.length; len > i && !end; i++) chars[i] == symb && (end = i);
return start && end ? (inclusive && (--start, ++end), {
start:Pos(cur.line, start),
end:Pos(cur.line, end)
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
function splitBySlash(argString) {
var slashes = findUnescapedSlashes(argString) || [];
if (!slashes.length) return [];
var tokens = [];
if (0 === slashes[0]) {
for (var i = 0; i < slashes.length; i++) "number" == typeof slashes[i] && tokens.push(argString.substring(slashes[i] + 1, slashes[i + 1]));
return tokens;
}
}
function findUnescapedSlashes(str) {
for (var escapeNextChar = !1, slashes = [], i = 0; i < str.length; i++) {
var c = str.charAt(i);
escapeNextChar || "/" != c || slashes.push(i), escapeNextChar = !escapeNextChar && "\\" == c;
}
return slashes;
}
function translateRegex(str) {
for (var specials = "|(){", unescape = "}", escapeNextChar = !1, out = [], i = -1; i < str.length; i++) {
var c = str.charAt(i) || "", n = str.charAt(i + 1) || "", specialComesNext = n && -1 != specials.indexOf(n);
escapeNextChar ? ("\\" === c && specialComesNext || out.push(c), escapeNextChar = !1) :"\\" === c ? (escapeNextChar = !0, 
n && -1 != unescape.indexOf(n) && (specialComesNext = !0), specialComesNext && "\\" !== n || out.push(c)) :(out.push(c), 
specialComesNext && "\\" !== n && out.push("\\"));
}
return out.join("");
}
function translateRegexReplace(str) {
for (var escapeNextChar = !1, out = [], i = -1; i < str.length; i++) {
var c = str.charAt(i) || "", n = str.charAt(i + 1) || "";
escapeNextChar ? (out.push(c), escapeNextChar = !1) :"\\" === c ? (escapeNextChar = !0, 
isNumber(n) || "$" === n ? out.push("$") :"/" !== n && "\\" !== n && out.push("\\")) :("$" === c && out.push("$"), 
out.push(c), "/" === n && out.push("\\"));
}
return out.join("");
}
function unescapeRegexReplace(str) {
for (var stream = new CodeMirror.StringStream(str), output = []; !stream.eol(); ) {
for (;stream.peek() && "\\" != stream.peek(); ) output.push(stream.next());
stream.match("\\/", !0) ? output.push("/") :stream.match("\\\\", !0) ? output.push("\\") :output.push(stream.next());
}
return output.join("");
}
function parseQuery(query, ignoreCase, smartCase) {
var lastSearchRegister = vimGlobalState.registerController.getRegister("/");
if (lastSearchRegister.setText(query), query instanceof RegExp) return query;
var regexPart, forceIgnoreCase, slashes = findUnescapedSlashes(query);
if (slashes.length) {
regexPart = query.substring(0, slashes[0]);
var flagsPart = query.substring(slashes[0]);
forceIgnoreCase = -1 != flagsPart.indexOf("i");
} else regexPart = query;
if (!regexPart) return null;
getOption("pcre") || (regexPart = translateRegex(regexPart)), smartCase && (ignoreCase = /^[^A-Z]*$/.test(regexPart));
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
!found && (cursor = cm.getSearchCursor(query, prev ? Pos(cm.lastLine()) :Pos(cm.firstLine(), 0)), 
!cursor.find(prev))) return;
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
function doReplace(cm, confirm, global, lineStart, lineEnd, searchCursor, query, replaceWith, callback) {
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
for (var found; found = searchCursor.findNext() && isInRange(searchCursor.from(), lineStart, lineEnd); ) if (global || !lastPos || searchCursor.from().line != lastPos.line) return cm.scrollIntoView(searchCursor.from(), 30), 
cm.setSelection(searchCursor.from(), searchCursor.to()), lastPos = searchCursor.from(), 
done = !1, void 0;
done = !0;
}
function stop(close) {
if (close && close(), cm.focus(), lastPos) {
cm.setCursor(lastPos);
var vim = cm.state.vim;
vim.exMode = !1, vim.lastHPos = vim.lastHSPos = lastPos.ch;
}
callback && callback();
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
var savedCallback = callback;
callback = void 0, cm.operation(replaceAll), callback = savedCallback;
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
}), void 0) :(replaceAll(), callback && callback(), void 0);
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
CodeMirror.signal(cm, "vim-keypress", vimKey), CodeMirror.Vim.handleKey(cm, vimKey);
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
var vim = cm.state.vim, macroModeState = vimGlobalState.macroModeState, insertModeChangeRegister = vimGlobalState.registerController.getRegister("."), isPlaying = macroModeState.isPlaying;
isPlaying || (cm.off("change", onChange), CodeMirror.off(cm.getInputField(), "keydown", onKeyEventTargetKeyDown)), 
!isPlaying && vim.insertModeRepeat > 1 && (repeatLastEdit(cm, vim, vim.insertModeRepeat - 1, !0), 
vim.lastEditInputState.repeatOverride = vim.insertModeRepeat), delete vim.insertModeRepeat, 
vim.insertMode = !1, cm.setCursor(cm.getCursor().line, cm.getCursor().ch - 1), cm.setOption("keyMap", "vim"), 
cm.setOption("disableInput", !0), cm.toggleOverwrite(!1), insertModeChangeRegister.setText(macroModeState.lastInsertModeChanges.changes.join("")), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"normal"
}), macroModeState.isRecording && logInsertModeChange(macroModeState);
}
function executeMacroRegister(cm, vim, macroModeState, registerName) {
var register = vimGlobalState.registerController.getRegister(registerName), keyBuffer = register.keyBuffer, imc = 0;
macroModeState.isPlaying = !0, macroModeState.replaySearchQueries = register.searchQueries.slice(0);
for (var i = 0; i < keyBuffer.length; i++) for (var match, key, text = keyBuffer[i]; text; ) if (match = /<\w+-.+?>|<\w+>|./.exec(text), 
key = match[0], text = text.substring(match.index + key.length), CodeMirror.Vim.handleKey(cm, key), 
vim.insertMode) {
var changes = register.insertModeChanges[imc++].changes;
vimGlobalState.macroModeState.lastInsertModeChanges.changes = changes, repeatInsertModeChanges(cm, changes, 1), 
exitInsertMode(cm);
}
macroModeState.isPlaying = !1;
}
function logKey(macroModeState, key) {
if (!macroModeState.isPlaying) {
var registerName = macroModeState.latestRegister, register = vimGlobalState.registerController.getRegister(registerName);
register && register.pushText(key);
}
}
function logInsertModeChange(macroModeState) {
if (!macroModeState.isPlaying) {
var registerName = macroModeState.latestRegister, register = vimGlobalState.registerController.getRegister(registerName);
register && register.pushInsertModeChanges(macroModeState.lastInsertModeChanges);
}
}
function logSearchQuery(macroModeState, query) {
if (!macroModeState.isPlaying) {
var registerName = macroModeState.latestRegister, register = vimGlobalState.registerController.getRegister(registerName);
register && register.pushSearchQuery(query);
}
}
function onChange(_cm, changeObj) {
var macroModeState = vimGlobalState.macroModeState, lastChange = macroModeState.lastInsertModeChanges;
if (!macroModeState.isPlaying) for (;changeObj; ) {
if (lastChange.expectCursorActivityForChange = !0, "+input" == changeObj.origin || "paste" == changeObj.origin || void 0 === changeObj.origin) {
var text = changeObj.text.join("\n");
lastChange.changes.push(text);
}
changeObj = changeObj.next;
}
}
function onCursorActivity(cm) {
var vim = cm.state.vim;
if (vim.insertMode) {
var macroModeState = vimGlobalState.macroModeState;
if (macroModeState.isPlaying) return;
var lastChange = macroModeState.lastInsertModeChanges;
lastChange.expectCursorActivityForChange ? lastChange.expectCursorActivityForChange = !1 :lastChange.changes = [];
} else "*mouse" == cm.doc.history.lastSelOrigin && (vim.lastHPos = cm.doc.getCursor().ch, 
cm.somethingSelected() && (vim.visualMode = !0));
if (vim.visualMode) {
var from, head;
from = head = cm.getCursor("head");
var anchor = cm.getCursor("anchor"), to = Pos(head.line, from.ch + (cursorIsBefore(anchor, head) ? -1 :1));
if (cursorIsBefore(to, from)) {
var temp = from;
from = to, to = temp;
}
vim.fakeCursor && vim.fakeCursor.clear(), vim.fakeCursor = cm.markText(from, to, {
className:"cm-animate-fat-cursor"
});
}
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
if (macroModeState.lastInsertModeChanges.changes.length > 0) {
repeat = vim.lastEditActionCommand ? repeat :1;
var changeObject = macroModeState.lastInsertModeChanges;
macroModeState.lastInsertModeChanges = {}, repeatInsertModeChanges(cm, changeObject.changes, repeat), 
macroModeState.lastInsertModeChanges = changeObject;
}
}
var macroModeState = vimGlobalState.macroModeState;
macroModeState.isPlaying = !0;
var isAction = !!vim.lastEditActionCommand, cachedInputState = vim.inputState;
if (vim.inputState = vim.lastEditInputState, isAction && vim.lastEditActionCommand.interlaceInsertRepeat) for (var i = 0; repeat > i; i++) repeatCommand(), 
repeatInsert(1); else repeatForInsert || repeatCommand(), repeatInsert(repeat);
vim.inputState = cachedInputState, vim.insertMode && !repeatForInsert && exitInsertMode(cm), 
macroModeState.isPlaying = !1;
}
function repeatInsertModeChanges(cm, changes, repeat) {
function keyHandler(binding) {
return "string" == typeof binding ? CodeMirror.commands[binding](cm) :binding(cm), 
!0;
}
for (var i = 0; repeat > i; i++) for (var j = 0; j < changes.length; j++) {
var change = changes[j];
if (change instanceof InsertModeKey) CodeMirror.lookupKey(change.keyName, [ "vim-insert" ], keyHandler); else {
var cur = cm.getCursor();
cm.replaceRange(change, cur, cur);
}
}
}
CodeMirror.defineOption("vimMode", !1, function(cm, val) {
val ? (cm.setOption("keyMap", "vim"), cm.setOption("disableInput", !0), cm.setOption("showCursorWhenSelecting", !1), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"normal"
}), cm.on("cursorActivity", onCursorActivity), maybeInitVimState(cm), CodeMirror.on(cm.getInputField(), "paste", getOnPasteFn(cm))) :cm.state.vim && (cm.setOption("keyMap", "default"), 
cm.setOption("disableInput", !1), cm.off("cursorActivity", onCursorActivity), CodeMirror.off(cm.getInputField(), "paste", getOnPasteFn(cm)), 
cm.state.vim = null);
});
var numberRegex = /[\d]/, wordRegexp = [ /\w/, /[^\w\s]/ ], bigWordRegexp = [ /\S/ ], upperCaseAlphabet = makeKeyRange(65, 26), lowerCaseAlphabet = makeKeyRange(97, 26), numbers = makeKeyRange(48, 10), specialSymbols = "~`!@#$%^&*()_-+=[{}]\\|/?.,<>:;\"'".split(""), specialKeys = [ "Left", "Right", "Up", "Down", "Space", "Backspace", "Esc", "Home", "End", "PageUp", "PageDown", "Enter" ], validMarks = [].concat(upperCaseAlphabet, lowerCaseAlphabet, numbers, [ "<", ">" ]), validRegisters = [].concat(upperCaseAlphabet, lowerCaseAlphabet, numbers, [ "-", '"', ".", ":", "/" ]), options = {}, createCircularJumpList = function() {
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
}, createInsertModeChanges = function(c) {
return c ? {
changes:c.changes,
expectCursorActivityForChange:c.expectCursorActivityForChange
} :{
changes:[],
expectCursorActivityForChange:!1
};
};
MacroModeState.prototype = {
exitMacroRecordMode:function() {
var macroModeState = vimGlobalState.macroModeState;
macroModeState.onRecordingDone(), macroModeState.onRecordingDone = void 0, macroModeState.isRecording = !1;
},
enterMacroRecordMode:function(cm, registerName) {
var register = vimGlobalState.registerController.getRegister(registerName);
register && (register.clear(), this.latestRegister = registerName, this.onRecordingDone = cm.openDialog("(recording)[" + registerName + "]", null, {
bottom:!0
}), this.isRecording = !0);
}
};
var vimGlobalState, vimApi = {
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
setOption:setOption,
getOption:getOption,
defineOption:defineOption,
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
if (macroModeState.isRecording && "q" == key) return macroModeState.exitMacroRecordMode(), 
clearInputState(cm), void 0;
if ("<Esc>" == key) return clearInputState(cm), vim.visualMode && exitVisualMode(cm), 
void 0;
if (vim.visualMode || cursorEqual(cm.getCursor("head"), cm.getCursor("anchor")) || (vim.visualMode = !0, 
vim.visualLine = !1, CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual"
}), cm.on("mousedown", exitVisualMode)), ("0" != key || "0" == key && 0 === vim.inputState.getRepeat()) && (command = commandDispatcher.matchCommand(key, defaultKeymap, vim)), 
!command) return isNumber(key) && vim.inputState.pushRepeatDigit(key), macroModeState.isRecording && logKey(macroModeState, key), 
void 0;
if ("keyToKey" == command.type) for (var i = 0; i < command.toKeys.length; i++) this.handleKey(cm, command.toKeys[i]); else macroModeState.isRecording && logKey(macroModeState, key), 
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
setText:function(text, linewise) {
this.keyBuffer = [ text || "" ], this.linewise = !!linewise;
},
pushText:function(text, linewise) {
linewise && (this.linewise || this.keyBuffer.push("\n"), this.linewise = !0), this.keyBuffer.push(text);
},
pushInsertModeChanges:function(changes) {
this.insertModeChanges.push(createInsertModeChanges(changes));
},
pushSearchQuery:function(query) {
this.searchQueries.push(query);
},
clear:function() {
this.keyBuffer = [], this.insertModeChanges = [], this.searchQueries = [], this.linewise = !1;
},
toString:function() {
return this.keyBuffer.join("");
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
return this.unnamedRegister.setText(text, linewise), void 0;
}
var append = isUpperCase(registerName);
append ? register.pushText(text, linewise) :register.setText(text, linewise), this.unnamedRegister.setText(register.toString(), linewise);
},
getRegister:function(name) {
return this.isValidRegister(name) ? (name = name.toLowerCase(), this.registers[name] || (this.registers[name] = new Register()), 
this.registers[name]) :this.unnamedRegister;
},
isValidRegister:function(name) {
return name && inArray(name, validRegisters);
},
shiftNumericRegisters_:function() {
for (var i = 9; i >= 2; i--) this.registers[i] = this.getRegister("" + (i - 1));
}
}, HistoryController.prototype = {
nextMatch:function(input, up) {
var historyBuffer = this.historyBuffer, dir = up ? -1 :1;
null === this.initialPrefix && (this.initialPrefix = input);
for (var i = this.iterator + dir; up ? i >= 0 :i < historyBuffer.length; i += dir) for (var element = historyBuffer[i], j = 0; j <= element.length; j++) if (this.initialPrefix == element.substring(0, j)) return this.iterator = i, 
element;
return i >= historyBuffer.length ? (this.iterator = historyBuffer.length, this.initialPrefix) :0 > i ? input :void 0;
},
pushInput:function(input) {
var index = this.historyBuffer.indexOf(input);
index > -1 && this.historyBuffer.splice(index, 1), input.length && this.historyBuffer.push(input);
},
reset:function() {
this.initialPrefix = null, this.iterator = this.historyBuffer.length;
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
clearInputState(cm);
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
clearInputState(cm), vim.lastMotion = null, command.isEdit && this.recordLastEdit(vim, inputState, command), 
actions[command.action](cm, actionArgs, vim);
},
processSearch:function(cm, vim, command) {
function handleQuery(query, ignoreCase, smartCase) {
vimGlobalState.searchHistoryController.pushInput(query), vimGlobalState.searchHistoryController.reset();
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
var macroModeState = vimGlobalState.macroModeState;
macroModeState.isRecording && logSearchQuery(macroModeState, query);
}
function onPromptKeyUp(e, query, close) {
var up, keyName = CodeMirror.keyName(e);
"Up" == keyName || "Down" == keyName ? (up = "Up" == keyName ? !0 :!1, query = vimGlobalState.searchHistoryController.nextMatch(query, up) || "", 
close(query)) :"Left" != keyName && "Right" != keyName && "Ctrl" != keyName && "Alt" != keyName && "Shift" != keyName && vimGlobalState.searchHistoryController.reset();
var parsedQuery;
try {
parsedQuery = updateSearchQuery(cm, query, !0, !0);
} catch (e) {}
parsedQuery ? cm.scrollIntoView(findNext(cm, !forward, parsedQuery), 30) :(clearSearchHighlight(cm), 
cm.scrollTo(originalScrollPos.left, originalScrollPos.top));
}
function onPromptKeyDown(e, query, close) {
var keyName = CodeMirror.keyName(e);
("Esc" == keyName || "Ctrl-C" == keyName || "Ctrl-[" == keyName) && (vimGlobalState.searchHistoryController.pushInput(query), 
vimGlobalState.searchHistoryController.reset(), updateSearchQuery(cm, originalQuery), 
clearSearchHighlight(cm), cm.scrollTo(originalScrollPos.left, originalScrollPos.top), 
CodeMirror.e_stop(e), close(), cm.focus());
}
if (cm.getSearchCursor) {
var forward = command.searchArgs.forward, wholeWordOnly = command.searchArgs.wholeWordOnly;
getSearchState(cm).setReversed(!forward);
var promptPrefix = forward ? "/" :"?", originalQuery = getSearchState(cm).getQuery(), originalScrollPos = cm.getScrollInfo();
switch (command.searchArgs.querySrc) {
case "prompt":
var macroModeState = vimGlobalState.macroModeState;
if (macroModeState.isPlaying) {
var query = macroModeState.replaySearchQueries.shift();
handleQuery(query, !0, !1);
} else showPrompt(cm, {
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
query = isKeyword && wholeWordOnly ? "\\b" + query + "\\b" :escapeRegex(query), 
vimGlobalState.jumpList.cachedCursor = cm.getCursor(), cm.setCursor(word.start), 
handleQuery(query, !0, !1);
}
}
},
processEx:function(cm, vim, command) {
function onPromptClose(input) {
vimGlobalState.exCommandHistoryController.pushInput(input), vimGlobalState.exCommandHistoryController.reset(), 
exCommandDispatcher.processCommand(cm, input);
}
function onPromptKeyDown(e, input, close) {
var up, keyName = CodeMirror.keyName(e);
("Esc" == keyName || "Ctrl-C" == keyName || "Ctrl-[" == keyName) && (vimGlobalState.exCommandHistoryController.pushInput(input), 
vimGlobalState.exCommandHistoryController.reset(), CodeMirror.e_stop(e), close(), 
cm.focus()), "Up" == keyName || "Down" == keyName ? (up = "Up" == keyName ? !0 :!1, 
input = vimGlobalState.exCommandHistoryController.nextMatch(input, up) || "", close(input)) :"Left" != keyName && "Right" != keyName && "Ctrl" != keyName && "Alt" != keyName && "Shift" != keyName && vimGlobalState.exCommandHistoryController.reset();
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
var curEnd, repeat, inputState = vim.inputState, motion = inputState.motion, motionArgs = inputState.motionArgs || {}, operator = inputState.operator, operatorArgs = inputState.operatorArgs || {}, registerName = inputState.registerName, selectionEnd = copyCursor(cm.getCursor("head")), selectionStart = copyCursor(cm.getCursor("anchor")), curStart = copyCursor(selectionEnd), curOriginal = copyCursor(curStart);
if (operator && this.recordLastEdit(vim, inputState), repeat = void 0 !== inputState.repeatOverride ? inputState.repeatOverride :inputState.getRepeat(), 
repeat > 0 && motionArgs.explicitRepeat ? motionArgs.repeatIsExplicit = !0 :(motionArgs.noRepeat || !motionArgs.explicitRepeat && 0 === repeat) && (repeat = 1, 
motionArgs.repeatIsExplicit = !1), inputState.selectedCharacter && (motionArgs.selectedCharacter = operatorArgs.selectedCharacter = inputState.selectedCharacter), 
motionArgs.repeat = repeat, clearInputState(cm), motion) {
var motionResult = motions[motion](cm, motionArgs, vim);
if (vim.lastMotion = motions[motion], !motionResult) return;
if (motionArgs.toJumplist) {
var jumpList = vimGlobalState.jumpList, cachedCursor = jumpList.cachedCursor;
cachedCursor ? (recordJumpPosition(cm, cachedCursor, motionResult), delete jumpList.cachedCursor) :recordJumpPosition(cm, curOriginal, motionResult);
}
if (motionResult instanceof Array ? (curStart = motionResult[0], curEnd = motionResult[1]) :curEnd = motionResult, 
curEnd || (curEnd = Pos(curStart.line, curStart.ch)), vim.visualMode) {
var offset = 0;
if (cursorIsBefore(selectionStart, selectionEnd) && (cursorEqual(selectionStart, curEnd) || cursorIsBefore(curEnd, selectionStart)) ? (selectionStart.ch += 1, 
offset = -1) :cursorIsBefore(selectionEnd, selectionStart) && (cursorEqual(selectionStart, curEnd) || cursorIsBefore(selectionStart, curEnd)) && (selectionStart.ch -= 1, 
offset = 1), vim.visualBlock || motionResult instanceof Array || (curEnd.ch += offset), 
1/0 != vim.lastHPos && (vim.lastHPos = curEnd.ch), selectionEnd = curEnd, selectionStart = motionResult instanceof Array ? curStart :selectionStart, 
vim.visualLine) if (cursorIsBefore(selectionStart, selectionEnd)) {
selectionStart.ch = 0;
var lastLine = cm.lastLine();
selectionEnd.line > lastLine && (selectionEnd.line = lastLine), selectionEnd.ch = lineLength(cm, selectionEnd.line);
} else selectionEnd.ch = 0, selectionStart.ch = lineLength(cm, selectionStart.line); else vim.visualBlock && (selectionStart = selectBlock(cm, selectionEnd));
vim.visualBlock || cm.setSelection(selectionStart, selectionEnd), updateMark(cm, vim, "<", cursorIsBefore(selectionStart, selectionEnd) ? selectionStart :selectionEnd), 
updateMark(cm, vim, ">", cursorIsBefore(selectionStart, selectionEnd) ? selectionEnd :selectionStart);
} else operator || (curEnd = clipCursorToContent(cm, curEnd), cm.setCursor(curEnd.line, curEnd.ch));
}
if (operator) {
var inverted = !1;
if (vim.lastMotion = null, operatorArgs.repeat = repeat, vim.visualMode && (curStart = selectionStart, 
curEnd = selectionEnd, motionArgs.inclusive = !0, operatorArgs.shouldMoveCursor = !1), 
curEnd && cursorIsBefore(curEnd, curStart)) {
var tmp = curStart;
curStart = curEnd, curEnd = tmp, inverted = !0;
} else curEnd || (curEnd = copyCursor(curStart));
if (motionArgs.inclusive && !vim.visualMode && curEnd.ch++, operatorArgs.selOffset) curEnd.line = curStart.line + operatorArgs.selOffset.line, 
curEnd.ch = operatorArgs.selOffset.line ? operatorArgs.selOffset.ch :curStart.ch + operatorArgs.selOffset.ch; else if (vim.visualMode) {
var selOffset = Pos();
selOffset.line = curEnd.line - curStart.line, selOffset.ch = selOffset.line ? curEnd.ch :curEnd.ch - curStart.ch, 
operatorArgs.selOffset = selOffset;
}
var linewise = motionArgs.linewise || vim.visualMode && vim.visualLine || operatorArgs.linewise;
linewise ? expandSelectionToLine(cm, curStart, curEnd) :motionArgs.forward && clipToLine(cm, curStart, curEnd), 
operatorArgs.registerName = registerName, operatorArgs.linewise = linewise, vim.visualBlock || cm.extendSelection(curStart, curEnd), 
operators[operator](cm, operatorArgs, vim, curStart, curEnd, curOriginal), vim.visualMode && exitVisualMode(cm);
}
},
recordLastEdit:function(vim, inputState, actionCommand) {
var macroModeState = vimGlobalState.macroModeState;
macroModeState.isPlaying || (vim.lastEditInputState = inputState, vim.lastEditActionCommand = actionCommand, 
macroModeState.lastInsertModeChanges.changes = [], macroModeState.lastInsertModeChanges.expectCursorActivityForChange = !1);
}
}, motions = {
moveToTopLine:function(cm, motionArgs) {
var line = getUserVisibleLines(cm).top + motionArgs.repeat - 1;
return Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
},
moveToMiddleLine:function(cm) {
var range = getUserVisibleLines(cm), line = Math.floor(.5 * (range.top + range.bottom));
return Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
},
moveToBottomLine:function(cm, motionArgs) {
var line = getUserVisibleLines(cm).bottom - motionArgs.repeat + 1;
return Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
},
expandToLine:function(cm, motionArgs) {
var cur = cm.getCursor();
return Pos(cur.line + motionArgs.repeat - 1, 1/0);
},
findNext:function(cm, motionArgs) {
var state = getSearchState(cm), query = state.getQuery();
if (query) {
var prev = !motionArgs.forward;
return prev = state.isReversed() ? !prev :prev, highlightSearchMatches(cm, query), 
findNext(cm, prev, query, motionArgs.repeat);
}
},
goToMark:function(cm, motionArgs, vim) {
var mark = vim.marks[motionArgs.selectedCharacter];
if (mark) {
var pos = mark.find();
return motionArgs.linewise ? {
line:pos.line,
ch:findFirstNonWhiteSpaceCharacter(cm.getLine(pos.line))
} :pos;
}
return null;
},
moveToOtherHighlightedEnd:function(cm, motionArgs, vim) {
var ranges = cm.listSelections(), curEnd = cm.getCursor("head"), curStart = ranges[0].anchor, curIndex = cursorEqual(ranges[0].head, curEnd) ? ranges.length - 1 :0;
return motionArgs.sameLine && vim.visualBlock ? (curStart = Pos(curEnd.line, ranges[curIndex].anchor.ch), 
curEnd = Pos(ranges[curIndex].head.line, curEnd.ch)) :curStart = ranges[curIndex].anchor, 
cm.setCursor(curEnd), [ curEnd, curStart ];
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
return motionArgs.linewise && (best = Pos(best.line, findFirstNonWhiteSpaceCharacter(cm.getLine(best.line)))), 
best;
},
moveByCharacters:function(cm, motionArgs) {
var cur = cm.getCursor(), repeat = motionArgs.repeat, ch = motionArgs.forward ? cur.ch + repeat :cur.ch - repeat;
return Pos(cur.line, ch);
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
vim.lastHPos = endCh), vim.lastHSPos = cm.charCoords(Pos(line, endCh), "div").left, 
Pos(line, endCh));
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
var resCoords = cm.charCoords(Pos(cm.firstLine(), 0), "div");
resCoords.left = vim.lastHSPos, res = cm.coordsChar(resCoords, "div");
}
return vim.lastHPos = res.ch, res;
},
moveByPage:function(cm, motionArgs) {
var curStart = cm.getCursor(), repeat = motionArgs.repeat;
return cm.findPosV(curStart, motionArgs.forward ? repeat :-repeat, "page");
},
moveByParagraph:function(cm, motionArgs) {
for (var line = cm.getCursor().line, repeat = motionArgs.repeat, inc = motionArgs.forward ? 1 :-1, i = 0; repeat > i && !(!motionArgs.forward && line === cm.firstLine() || motionArgs.forward && line == cm.lastLine()); i++) for (line += inc; line !== cm.firstLine() && line != cm.lastLine() && cm.getLine(line); ) line += inc;
return Pos(line, 0);
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
var retval = Pos(cur.line + motionArgs.repeat - 1, 1/0), end = cm.clipPos(retval);
return end.ch--, vim.lastHSPos = cm.charCoords(end, "div").left, retval;
},
moveToFirstNonWhiteSpaceCharacter:function(cm) {
var cursor = cm.getCursor();
return Pos(cursor.line, findFirstNonWhiteSpaceCharacter(cm.getLine(cursor.line)));
},
moveToMatchedSymbol:function(cm) {
var symbol, cursor = cm.getCursor(), line = cursor.line, ch = cursor.ch, lineText = cm.getLine(line);
do if (symbol = lineText.charAt(ch++), symbol && isMatchableSymbol(symbol)) {
var style = cm.getTokenTypeAt(Pos(line, ch));
if ("string" !== style && "comment" !== style) break;
} while (symbol);
if (symbol) {
var matched = cm.findMatchingBracket(Pos(line, ch));
return matched.to;
}
return cursor;
},
moveToStartOfLine:function(cm) {
var cursor = cm.getCursor();
return Pos(cursor.line, 0);
},
moveToLineOrEdgeOfDocument:function(cm, motionArgs) {
var lineNum = motionArgs.forward ? cm.lastLine() :cm.firstLine();
return motionArgs.repeatIsExplicit && (lineNum = motionArgs.repeat - cm.getOption("firstLineNumber")), 
Pos(lineNum, findFirstNonWhiteSpaceCharacter(cm.getLine(lineNum)));
},
textObjectManipulation:function(cm, motionArgs) {
var mirroredPairs = {
"(":")",
")":"(",
"{":"}",
"}":"{",
"[":"]",
"]":"["
}, selfPaired = {
"'":!0,
'"':!0
}, character = motionArgs.selectedCharacter;
"b" == character ? character = "(" :"B" == character && (character = "{");
var tmp, inclusive = !motionArgs.textObjectInner;
if (mirroredPairs[character]) tmp = selectCompanionObject(cm, character, inclusive); else if (selfPaired[character]) tmp = findBeginningAndEnd(cm, character, inclusive); else if ("W" === character) tmp = expandWordUnderCursor(cm, inclusive, !0, !0); else {
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
"delete":function(cm, operatorArgs, vim, curStart, curEnd) {
var selectionEnd = vim.visualMode ? vim.marks[">"].find() :null;
if (operatorArgs.linewise && curEnd.line > cm.lastLine() && curStart.line > cm.firstLine() && (curStart.line--, 
curStart.ch = lineLength(cm, curStart.line)), vimGlobalState.registerController.pushText(operatorArgs.registerName, "delete", cm.getRange(curStart, curEnd), operatorArgs.linewise), 
vim.visualBlock) {
var selections = cm.listSelections();
curStart = selections[0].anchor;
var replacement = new Array(selections.length).join("1").split("1");
cm.replaceSelections(replacement);
} else cm.replaceRange("", curStart, curEnd);
selectionEnd && (vim.marks[">"] = cm.setBookmark(selectionEnd)), operatorArgs.linewise ? cm.setCursor(motions.moveToFirstNonWhiteSpaceCharacter(cm)) :cm.setCursor(curStart);
},
indent:function(cm, operatorArgs, vim, curStart, curEnd) {
var startLine = curStart.line, endLine = curEnd.line, repeat = vim.visualMode ? operatorArgs.repeat :1;
operatorArgs.linewise && endLine--;
for (var i = startLine; endLine >= i; i++) for (var j = 0; repeat > j; j++) cm.indentLine(i, operatorArgs.indentRight);
cm.setCursor(curStart), cm.setCursor(motions.moveToFirstNonWhiteSpaceCharacter(cm));
},
swapcase:function(cm, operatorArgs) {
for (var selections = cm.getSelections(), ranges = cm.listSelections(), swapped = [], j = 0; j < selections.length; j++) {
for (var toSwap = selections[j], text = "", i = 0; i < toSwap.length; i++) {
var character = toSwap.charAt(i);
text += isUpperCase(character) ? character.toLowerCase() :character.toUpperCase();
}
swapped.push(text);
}
cm.replaceSelections(swapped);
var curStart = ranges[0].anchor, curEnd = ranges[0].head;
operatorArgs.shouldMoveCursor || cm.setCursor(cursorIsBefore(curStart, curEnd) ? curStart :curEnd);
},
yank:function(cm, operatorArgs, _vim, _curStart, _curEnd, curOriginal) {
var text = cm.getSelection();
vimGlobalState.registerController.pushText(operatorArgs.registerName, "yank", text, operatorArgs.linewise), 
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
var repeat = actionArgs.repeat || 1, lineHeight = cm.defaultTextHeight(), top = cm.getScrollInfo().top, delta = lineHeight * repeat, newPos = actionArgs.forward ? top + delta :top - delta, cursor = copyCursor(cm.getCursor()), cursorCoords = cm.charCoords(cursor, "local");
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
var lineNum = cm.getCursor().line, charCoords = cm.charCoords(Pos(lineNum, 0), "local"), height = cm.getScrollInfo().clientHeight, y = charCoords.top, lineHeight = charCoords.bottom - y;
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
replayMacro:function(cm, actionArgs, vim) {
var registerName = actionArgs.selectedCharacter, repeat = actionArgs.repeat, macroModeState = vimGlobalState.macroModeState;
for ("@" == registerName && (registerName = macroModeState.latestRegister); repeat--; ) executeMacroRegister(cm, vim, macroModeState, registerName);
},
enterMacroRecordMode:function(cm, actionArgs) {
var macroModeState = vimGlobalState.macroModeState, registerName = actionArgs.selectedCharacter;
macroModeState.enterMacroRecordMode(cm, registerName);
},
enterInsertMode:function(cm, actionArgs, vim) {
if (!cm.getOption("readOnly")) {
vim.insertMode = !0, vim.insertModeRepeat = actionArgs && actionArgs.repeat || 1;
var insertAt = actionArgs ? actionArgs.insertAt :null;
if ("eol" == insertAt) {
var cursor = cm.getCursor();
cursor = Pos(cursor.line, lineLength(cm, cursor.line)), cm.setCursor(cursor);
} else if ("charAfter" == insertAt) cm.setCursor(offsetCursor(cm.getCursor(), 0, 1)); else if ("firstNonBlank" == insertAt) cm.setCursor(motions.moveToFirstNonWhiteSpaceCharacter(cm)); else if ("endOfSelectedArea" == insertAt) {
var selectionEnd = cm.getCursor("head"), selectionStart = cm.getCursor("anchor");
selectionEnd.line < selectionStart.line && (selectionEnd = Pos(selectionStart.line, 0)), 
cm.setCursor(selectionEnd), exitVisualMode(cm);
}
cm.setOption("keyMap", "vim-insert"), cm.setOption("disableInput", !1), actionArgs && actionArgs.replace ? (cm.toggleOverwrite(!0), 
cm.setOption("keyMap", "vim-replace"), CodeMirror.signal(cm, "vim-mode-change", {
mode:"replace"
})) :(cm.setOption("keyMap", "vim-insert"), CodeMirror.signal(cm, "vim-mode-change", {
mode:"insert"
})), vimGlobalState.macroModeState.isPlaying || (cm.on("change", onChange), CodeMirror.on(cm.getInputField(), "keydown", onKeyEventTargetKeyDown));
}
},
toggleVisualMode:function(cm, actionArgs, vim) {
var curEnd, repeat = actionArgs.repeat, curStart = cm.getCursor(), selections = cm.listSelections();
vim.visualMode ? (curStart = cm.getCursor("anchor"), curEnd = cm.getCursor("head"), 
vim.visualLine ? (actionArgs.blockwise ? (vim.visualBlock = !0, selectBlock(cm, curEnd), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:"blockwise"
})) :actionArgs.linewise ? exitVisualMode(cm) :CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual"
}), vim.visualLine = !1) :vim.visualBlock ? (actionArgs.linewise ? (vim.visualLine = !0, 
curStart = Pos(selections[0].anchor.line, 0), curEnd = Pos(selections[selections.length - 1].anchor.line, lineLength(cm, selections[selections.length - 1].anchor.line)), 
cm.setSelection(curStart, curEnd), CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:"linewise"
})) :actionArgs.blockwise ? exitVisualMode(cm) :(curStart = curEnd != selections[0].head ? selections[0].anchor :selections[selections.length - 1].anchor, 
cm.setSelection(curStart, curEnd), CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual"
})), vim.visualBlock = !1) :actionArgs.linewise ? (vim.visualLine = !0, curStart.ch = cursorIsBefore(curStart, curEnd) ? 0 :lineLength(cm, curStart.line), 
curEnd.ch = cursorIsBefore(curStart, curEnd) ? lineLength(cm, curEnd.line) :0, cm.setSelection(curStart, curEnd), 
CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:"linewise"
})) :actionArgs.blockwise ? (vim.visualBlock = !0, selectBlock(cm, curEnd), CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:"blockwise"
})) :exitVisualMode(cm)) :(cm.on("mousedown", exitVisualMode), vim.visualMode = !0, 
vim.visualLine = !!actionArgs.linewise, vim.visualBlock = !!actionArgs.blockwise, 
vim.visualLine ? (curStart.ch = 0, curEnd = clipCursorToContent(cm, Pos(curStart.line + repeat - 1, lineLength(cm, curStart.line)), !0)) :curEnd = clipCursorToContent(cm, Pos(curStart.line, curStart.ch + repeat), !0), 
cm.setSelection(curStart, curEnd), CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:vim.visualLine ? "linewise" :""
})), updateMark(cm, vim, "<", cursorIsBefore(curStart, curEnd) ? curStart :curEnd), 
updateMark(cm, vim, ">", cursorIsBefore(curStart, curEnd) ? curEnd :curStart);
},
reselectLastSelection:function(cm, _actionArgs, vim) {
var curStart = vim.marks["<"].find(), curEnd = vim.marks[">"].find(), lastSelection = vim.lastSelection;
if (lastSelection) {
var selectionStart = lastSelection.curStartMark.find(), selectionEnd = lastSelection.curEndMark.find(), blockwise = lastSelection.visualBlock;
updateLastSelection(cm, vim, curStart, curEnd), blockwise ? (cm.setCursor(selectionStart), 
selectionStart = selectBlock(cm, selectionEnd)) :(cm.setSelection(selectionStart, selectionEnd), 
selectionStart = cm.getCursor("anchor"), selectionEnd = cm.getCursor("head")), vim.visualMode && (updateMark(cm, vim, "<", cursorIsBefore(selectionStart, selectionEnd) ? selectionStart :selectionEnd), 
updateMark(cm, vim, ">", cursorIsBefore(selectionStart, selectionEnd) ? selectionEnd :selectionStart)), 
vim.visualMode = !0, lastSelection.visualLine ? (vim.visualLine = !0, vim.visualBlock = !1) :lastSelection.visualBlock ? (vim.visualLine = !1, 
vim.visualBlock = !0) :vim.visualBlock = vim.visualLine = !1, CodeMirror.signal(cm, "vim-mode-change", {
mode:"visual",
subMode:vim.visualLine ? "linewise" :""
});
}
},
joinLines:function(cm, actionArgs, vim) {
var curStart, curEnd;
if (vim.visualMode) curStart = cm.getCursor("anchor"), curEnd = cm.getCursor("head"), 
curEnd.ch = lineLength(cm, curEnd.line) - 1; else {
var repeat = Math.max(actionArgs.repeat, 2);
curStart = cm.getCursor(), curEnd = clipCursorToContent(cm, Pos(curStart.line + repeat - 1, 1/0));
}
var finalCh = 0;
cm.operation(function() {
for (var i = curStart.line; i < curEnd.line; i++) {
finalCh = lineLength(cm, curStart.line);
var tmp = Pos(curStart.line + 1, lineLength(cm, curStart.line + 1)), text = cm.getRange(curStart, tmp);
text = text.replace(/\n\s*/g, " "), cm.replaceRange(text, curStart, tmp);
}
var curFinalPos = Pos(curStart.line, finalCh);
cm.setCursor(curFinalPos);
});
},
newLineAndEnterInsertMode:function(cm, actionArgs, vim) {
vim.insertMode = !0;
var insertAt = copyCursor(cm.getCursor());
if (insertAt.line !== cm.firstLine() || actionArgs.after) {
insertAt.line = actionArgs.after ? insertAt.line :insertAt.line - 1, insertAt.ch = lineLength(cm, insertAt.line), 
cm.setCursor(insertAt);
var newlineFn = CodeMirror.commands.newlineAndIndentContinueComment || CodeMirror.commands.newlineAndIndent;
newlineFn(cm);
} else cm.replaceRange("\n", Pos(cm.firstLine(), 0)), cm.setCursor(cm.firstLine(), 0);
this.enterInsertMode(cm, {
repeat:actionArgs.repeat
}, vim);
},
paste:function(cm, actionArgs, vim) {
var cur = copyCursor(cm.getCursor()), register = vimGlobalState.registerController.getRegister(actionArgs.registerName), text = register.toString();
if (text) {
if (actionArgs.matchIndent) {
var whitespaceLength = function(str) {
var tabs = str.split("	").length - 1, spaces = str.split(" ").length - 1;
return tabs * cm.options.tabSize + 1 * spaces;
}, currentLine = cm.getLine(cm.getCursor().line), indent = whitespaceLength(currentLine.match(/^\s*/)[0]), chompedText = text.replace(/\n$/, ""), wasChomped = text !== chompedText, firstIndent = whitespaceLength(text.match(/^\s*/)[0]), text = chompedText.replace(/^\s*/gm, function(wspace) {
var newIndent = indent + (whitespaceLength(wspace) - firstIndent);
if (0 > newIndent) return "";
if (cm.options.indentWithTabs) {
var quotient = Math.floor(newIndent / cm.options.tabSize);
return Array(quotient + 1).join("	");
}
return Array(newIndent + 1).join(" ");
});
text += wasChomped ? "\n" :"";
}
if (actionArgs.repeat > 1) var text = Array(actionArgs.repeat + 1).join(text);
var linewise = register.linewise;
linewise ? vim.visualMode ? text = vim.visualLine ? text.slice(0, -1) :"\n" + text.slice(0, text.length - 1) + "\n" :actionArgs.after ? (text = "\n" + text.slice(0, text.length - 1), 
cur.ch = lineLength(cm, cur.line)) :cur.ch = 0 :cur.ch += actionArgs.after ? 1 :0;
var curPosFinal, idx;
if (vim.visualMode) {
vim.lastPastedText = text;
var lastSelectionCurEnd, selectedArea = getSelectedAreaRange(cm, vim), selectionStart = selectedArea[0], selectionEnd = selectedArea[1];
vim.lastSelection && (lastSelectionCurEnd = vim.lastSelection.curEndMark.find()), 
vimGlobalState.registerController.unnamedRegister.setText(cm.getRange(selectionStart, selectionEnd)), 
cm.replaceRange(text, selectionStart, selectionEnd), lastSelectionCurEnd && (vim.lastSelection.curEndMark = cm.setBookmark(lastSelectionCurEnd)), 
curPosFinal = cm.posFromIndex(cm.indexFromPos(selectionStart) + text.length - 1), 
linewise && (curPosFinal.ch = 0);
} else cm.replaceRange(text, cur), linewise && actionArgs.after ? curPosFinal = Pos(cur.line + 1, findFirstNonWhiteSpaceCharacter(cm.getLine(cur.line + 1))) :linewise && !actionArgs.after ? curPosFinal = Pos(cur.line, findFirstNonWhiteSpaceCharacter(cm.getLine(cur.line))) :!linewise && actionArgs.after ? (idx = cm.indexFromPos(cur), 
curPosFinal = cm.posFromIndex(idx + text.length - 1)) :(idx = cm.indexFromPos(cur), 
curPosFinal = cm.posFromIndex(idx + text.length));
cm.setCursor(curPosFinal);
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
if (vim.visualMode) curStart = cm.getCursor("start"), curEnd = cm.getCursor("end"); else {
var line = cm.getLine(curStart.line);
replaceTo = curStart.ch + actionArgs.repeat, replaceTo > line.length && (replaceTo = line.length), 
curEnd = Pos(curStart.line, replaceTo);
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
var increment = actionArgs.increase ? 1 :-1, number = parseInt(token) + increment * actionArgs.repeat, from = Pos(cur.line, start), to = Pos(cur.line, end);
numberStr = number.toString(), cm.replaceRange(numberStr, from, to), cm.setCursor(Pos(cur.line, start + numberStr.length - 1));
}
},
repeatLastEdit:function(cm, actionArgs, vim) {
var lastEditInputState = vim.lastEditInputState;
if (lastEditInputState) {
var repeat = actionArgs.repeat;
repeat && actionArgs.repeatIsExplicit ? vim.lastEditInputState.repeatOverride = repeat :repeat = vim.lastEditInputState.repeatOverride || repeat, 
repeatLastEdit(cm, vim, repeat, !1);
}
},
changeCase:function(cm, actionArgs, vim) {
var selectedAreaRange = getSelectedAreaRange(cm, vim), selectionStart = selectedAreaRange[0], selectionEnd = selectedAreaRange[1], lastSelectionCurEnd = vim.lastSelection.curEndMark.find(), toLower = actionArgs.toLower, text = cm.getRange(selectionStart, selectionEnd);
cm.replaceRange(toLower ? text.toLowerCase() :text.toUpperCase(), selectionStart, selectionEnd), 
vim.lastSelection.curEndMark = cm.setBookmark(lastSelectionCurEnd), cm.setCursor(selectionStart);
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
defineOption("pcre", !0, "boolean"), SearchState.prototype = {
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
name:"unmap"
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
name:"set",
shortName:"set"
}, {
name:"sort",
shortName:"sor"
}, {
name:"substitute",
shortName:"s",
possiblyAsync:!0
}, {
name:"nohlsearch",
shortName:"noh"
}, {
name:"delmarks",
shortName:"delm"
}, {
name:"registers",
shortName:"reg",
excludeFromCommandHistory:!0
}, {
name:"global",
shortName:"g"
} ];
Vim.ExCommandDispatcher = function() {
this.buildCommandMap_();
}, Vim.ExCommandDispatcher.prototype = {
processCommand:function(cm, input, opt_params) {
var vim = cm.state.vim, commandHistoryRegister = vimGlobalState.registerController.getRegister(":"), previousCommand = commandHistoryRegister.toString();
vim.visualMode && exitVisualMode(cm);
var inputStream = new CodeMirror.StringStream(input);
commandHistoryRegister.setText(input);
var params = opt_params || {};
params.input = input;
try {
this.parseInput_(cm, inputStream, params);
} catch (e) {
throw showConfirm(cm, e), e;
}
var command, commandName;
if (params.commandName) {
if (command = this.matchCommand_(params.commandName)) {
if (commandName = command.name, command.excludeFromCommandHistory && commandHistoryRegister.setText(previousCommand), 
this.parseCommandArgs_(inputStream, params, command), "exToKey" == command.type) {
for (var i = 0; i < command.toKeys.length; i++) CodeMirror.Vim.handleKey(cm, command.toKeys[i]);
return;
}
if ("exToEx" == command.type) return this.processCommand(cm, command.toInput), void 0;
}
} else void 0 !== params.line && (commandName = "move");
if (!commandName) return showConfirm(cm, 'Not an editor command ":' + input + '"'), 
void 0;
try {
exCommands[commandName](cm, params), command && command.possiblyAsync || !params.callback || params.callback();
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
toInput:rhs.substring(1),
user:!0
} :{
name:commandName,
type:"exToKey",
toKeys:parseKeyString(rhs),
user:!0
};
} else if (":" != rhs && ":" == rhs.charAt(0)) {
var mapping = {
keys:parseKeyString(lhs),
type:"keyToEx",
exArgs:{
input:rhs.substring(1)
},
user:!0
};
ctx && (mapping.context = ctx), defaultKeymap.unshift(mapping);
} else {
var mapping = {
keys:parseKeyString(lhs),
type:"keyToKey",
toKeys:parseKeyString(rhs),
user:!0
};
ctx && (mapping.context = ctx), defaultKeymap.unshift(mapping);
}
},
unmap:function(lhs, ctx) {
var arrayEquals = function(a, b) {
if (a === b) return !0;
if (null == a || null == b) return !0;
if (a.length != b.length) return !1;
for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return !1;
return !0;
};
if (":" != lhs && ":" == lhs.charAt(0)) {
if (ctx) throw Error("Mode not supported for ex mappings");
var commandName = lhs.substring(1);
if (this.commandMap_[commandName] && this.commandMap_[commandName].user) return delete this.commandMap_[commandName], 
void 0;
} else for (var keys = parseKeyString(lhs), i = 0; i < defaultKeymap.length; i++) if (arrayEquals(keys, defaultKeymap[i].keys) && defaultKeymap[i].context === ctx && defaultKeymap[i].user) return defaultKeymap.splice(i, 1), 
void 0;
throw Error("No such mapping.");
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
unmap:function(cm, params, ctx) {
var mapArgs = params.args;
return !mapArgs || mapArgs.length < 1 ? (cm && showConfirm(cm, "No such mapping: " + params.input), 
void 0) :(exCommandDispatcher.unmap(mapArgs[0], ctx), void 0);
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
set:function(cm, params) {
var setArgs = params.args;
if (!setArgs || setArgs.length < 1) return cm && showConfirm(cm, "Invalid mapping: " + params.input), 
void 0;
var expr = setArgs[0].split("="), optionName = expr[0], value = expr[1], forceGet = !1;
if ("?" == optionName.charAt(optionName.length - 1)) {
if (value) throw Error("Trailing characters: " + params.argString);
optionName = optionName.substring(0, optionName.length - 1), forceGet = !0;
}
void 0 === value && "no" == optionName.substring(0, 2) && (optionName = optionName.substring(2), 
value = !1);
var optionIsBoolean = options[optionName] && "boolean" == options[optionName].type;
if (optionIsBoolean && void 0 == value && (value = !0), !optionIsBoolean && !value || forceGet) {
var oldValue = getOption(optionName);
oldValue === !0 || oldValue === !1 ? showConfirm(cm, " " + (oldValue ? "" :"no") + optionName) :showConfirm(cm, "  " + optionName + "=" + oldValue);
} else setOption(optionName, value);
},
registers:function(cm, params) {
var regArgs = params.args, registers = vimGlobalState.registerController.registers, regInfo = "----------Registers----------<br><br>";
if (regArgs) {
var registerName;
regArgs = regArgs.join("");
for (var i = 0; i < regArgs.length; i++) if (registerName = regArgs.charAt(i), vimGlobalState.registerController.isValidRegister(registerName)) {
var register = registers[registerName] || new Register();
regInfo += '"' + registerName + "    " + register.toString() + "<br>";
}
} else for (var registerName in registers) {
var text = registers[registerName].toString();
text.length && (regInfo += '"' + registerName + "    " + text + "<br>");
}
showConfirm(cm, regInfo);
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
var curStart = Pos(lineStart, 0), curEnd = Pos(lineEnd, lineLength(cm, lineEnd)), text = cm.getRange(curStart, curEnd).split("\n"), numberRegex = "decimal" == number ? /(-?)([\d]+)/ :"hex" == number ? /(-?)(?:0x)?([0-9a-f]+)/i :"octal" == number ? /([0-7]+)/ :null, radix = "decimal" == number ? 10 :"hex" == number ? 16 :"octal" == number ? 8 :null, numPart = [], textPart = [];
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
global:function(cm, params) {
var argString = params.argString;
if (!argString) return showConfirm(cm, "Regular Expression missing from global"), 
void 0;
var cmd, lineStart = void 0 !== params.line ? params.line :cm.firstLine(), lineEnd = params.lineEnd || params.line || cm.lastLine(), tokens = splitBySlash(argString), regexPart = argString;
if (tokens.length && (regexPart = tokens[0], cmd = tokens.slice(1, tokens.length).join("/")), 
regexPart) try {
updateSearchQuery(cm, regexPart, !0, !0);
} catch (e) {
return showConfirm(cm, "Invalid regex: " + regexPart), void 0;
}
for (var query = getSearchState(cm).getQuery(), matchedLines = [], content = "", i = lineStart; lineEnd >= i; i++) {
var matched = query.test(cm.getLine(i));
matched && (matchedLines.push(i + 1), content += cm.getLine(i) + "<br>");
}
if (!cmd) return showConfirm(cm, content), void 0;
var index = 0, nextCommand = function() {
if (index < matchedLines.length) {
var command = matchedLines[index] + cmd;
exCommandDispatcher.processCommand(cm, command, {
callback:nextCommand
});
}
index++;
};
nextCommand();
},
substitute:function(cm, params) {
if (!cm.getSearchCursor) throw new Error("Search feature not available. Requires searchcursor.js or any other getSearchCursor implementation.");
var regexPart, trailing, flagsPart, count, argString = params.argString, tokens = argString ? splitBySlash(argString) :[], replacePart = "", confirm = !1, global = !1;
if (tokens.length) regexPart = tokens[0], replacePart = tokens[1], void 0 !== replacePart && (replacePart = getOption("pcre") ? unescapeRegexReplace(replacePart) :translateRegexReplace(replacePart), 
vimGlobalState.lastSubstituteReplacePart = replacePart), trailing = tokens[2] ? tokens[2].split(" ") :[]; else if (argString && argString.length) return showConfirm(cm, "Substitutions should be of the form :s/pattern/replace/"), 
void 0;
if (trailing && (flagsPart = trailing[0], count = parseInt(trailing[1]), flagsPart && (-1 != flagsPart.indexOf("c") && (confirm = !0, 
flagsPart.replace("c", "")), -1 != flagsPart.indexOf("g") && (global = !0, flagsPart.replace("g", "")), 
regexPart = regexPart + "/" + flagsPart)), regexPart) try {
updateSearchQuery(cm, regexPart, !0, !0);
} catch (e) {
return showConfirm(cm, "Invalid regex: " + regexPart), void 0;
}
if (replacePart = replacePart || vimGlobalState.lastSubstituteReplacePart, void 0 === replacePart) return showConfirm(cm, "No previous substitute regular expression"), 
void 0;
var state = getSearchState(cm), query = state.getQuery(), lineStart = void 0 !== params.line ? params.line :cm.getCursor().line, lineEnd = params.lineEnd || lineStart;
count && (lineStart = lineEnd, lineEnd = lineStart + count - 1);
var startPos = clipCursorToContent(cm, Pos(lineStart, 0)), cursor = cm.getSearchCursor(query, startPos);
doReplace(cm, confirm, global, lineStart, lineEnd, cursor, query, replacePart, params.callback);
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
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
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
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
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
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
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
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.registerHelper("fold", "markdown", function(cm, start) {
function isHeader(lineNo) {
var tokentype = cm.getTokenTypeAt(CodeMirror.Pos(lineNo, 0));
return tokentype && /\bheader\b/.test(tokentype);
}
function headerLevel(lineNo, line, nextLine) {
var match = line && line.match(/^#+/);
return match && isHeader(lineNo) ? match[0].length :(match = nextLine && nextLine.match(/^[=\-]+\s*$/), 
match && isHeader(lineNo + 1) ? "=" == nextLine[0] ? 1 :2 :maxDepth);
}
var maxDepth = 100, firstLine = cm.getLine(start.line), nextLine = cm.getLine(start.line + 1), level = headerLevel(start.line, firstLine, nextLine);
if (level === maxDepth) return void 0;
for (var lastLineNo = cm.lastLine(), end = start.line, nextNextLine = cm.getLine(end + 2); lastLineNo > end && !(headerLevel(end + 1, nextLine, nextNextLine) <= level); ) ++end, 
nextLine = nextNextLine, nextNextLine = cm.getLine(end + 2);
return {
from:CodeMirror.Pos(start.line, firstLine.length),
to:CodeMirror.Pos(end, cm.getLine(end).length)
};
});
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
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
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.registerHelper("fold", "indent", function(cm, start) {
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
});
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
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("./foldcode")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "./foldcode" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
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
return elt.className = spec + " CodeMirror-guttermarker-subtle", elt;
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
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function firstNonWS(str) {
var found = str.search(nonWS);
return -1 == found ? 0 :found;
}
var noOptions = {}, nonWS = /[^\s\u00a0]/, Pos = CodeMirror.Pos;
CodeMirror.commands.toggleComment = function(cm) {
for (var minLine = 1/0, ranges = cm.listSelections(), mode = null, i = ranges.length - 1; i >= 0; i--) {
var from = ranges[i].from(), to = ranges[i].to();
from.line >= minLine || (to.line >= minLine && (to = Pos(minLine, 0)), minLine = from.line, 
null == mode ? cm.uncomment(from, to) ? mode = "un" :(cm.lineComment(from, to), 
mode = "line") :"un" == mode ? cm.uncomment(from, to) :cm.lineComment(from, to));
}
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
if (-1 == close && start != end && (endLine = self.getLine(--end), close = endLine.lastIndexOf(endString)), 
-1 == open || -1 == close || !/comment/.test(self.getTokenTypeAt(Pos(start, open + 1))) || !/comment/.test(self.getTokenTypeAt(Pos(end, close + 1)))) return !1;
var lastStart = startLine.lastIndexOf(startString, from.ch), firstEnd = -1 == lastStart ? -1 :startLine.slice(0, from.ch).indexOf(endString, lastStart + startString.length);
if (-1 != lastStart && -1 != firstEnd) return !1;
firstEnd = endLine.indexOf(endString, to.ch);
var almostLastStart = endLine.slice(to.ch).lastIndexOf(startString, firstEnd - to.ch);
return lastStart = -1 == firstEnd || -1 == almostLastStart ? -1 :to.ch + almostLastStart, 
-1 != firstEnd && -1 != lastStart ? !1 :(self.operation(function() {
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
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
function charsAround(cm, pos) {
var str = cm.getRange(Pos(pos.line, pos.ch - 1), Pos(pos.line, pos.ch + 1));
return 2 == str.length ? str :null;
}
function enteringString(cm, pos, ch) {
var line = cm.getLine(pos.line), token = cm.getTokenAt(pos);
if (/\bstring2?\b/.test(token.type)) return !1;
var stream = new CodeMirror.StringStream(line.slice(0, pos.ch) + ch + line.slice(pos.ch), 4);
for (stream.pos = stream.start = token.start; ;) {
var type1 = cm.getMode().token(stream, token.state);
if (stream.pos >= pos.ch + 1) return /\bstring2?\b/.test(type1);
stream.start = stream.pos;
}
}
function buildKeymap(pairs) {
for (var map = {
name:"autoCloseBrackets",
Backspace:function(cm) {
if (cm.getOption("disableInput")) return CodeMirror.Pass;
for (var ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
if (!ranges[i].empty()) return CodeMirror.Pass;
var around = charsAround(cm, ranges[i].head);
if (!around || pairs.indexOf(around) % 2 != 0) return CodeMirror.Pass;
}
for (var i = ranges.length - 1; i >= 0; i--) {
var cur = ranges[i].head;
cm.replaceRange("", Pos(cur.line, cur.ch - 1), Pos(cur.line, cur.ch + 1));
}
}
}, closingBrackets = "", i = 0; i < pairs.length; i += 2) (function(left, right) {
left != right && (closingBrackets += right), map["'" + left + "'"] = function(cm) {
if (cm.getOption("disableInput")) return CodeMirror.Pass;
for (var type, next, ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
var curType, range = ranges[i], cur = range.head, next = cm.getRange(cur, Pos(cur.line, cur.ch + 1));
if (range.empty()) if (left == right && next == right) curType = cm.getRange(cur, Pos(cur.line, cur.ch + 3)) == left + left + left ? "skipThree" :"skip"; else if (left == right && cur.ch > 1 && cm.getRange(Pos(cur.line, cur.ch - 2), cur) == left + left && (cur.ch <= 2 || cm.getRange(Pos(cur.line, cur.ch - 3), Pos(cur.line, cur.ch - 2)) != left)) curType = "addFour"; else if ('"' == left || "'" == left) {
if (CodeMirror.isWordChar(next) || !enteringString(cm, cur, left)) return CodeMirror.Pass;
curType = "both";
} else {
if (!(cm.getLine(cur.line).length == cur.ch || closingBrackets.indexOf(next) >= 0 || SPACE_CHAR_REGEX.test(next))) return CodeMirror.Pass;
curType = "both";
} else curType = "surround";
if (type) {
if (type != curType) return CodeMirror.Pass;
} else type = curType;
}
cm.operation(function() {
if ("skip" == type) cm.execCommand("goCharRight"); else if ("skipThree" == type) for (var i = 0; 3 > i; i++) cm.execCommand("goCharRight"); else if ("surround" == type) {
for (var sels = cm.getSelections(), i = 0; i < sels.length; i++) sels[i] = left + sels[i] + right;
cm.replaceSelections(sels, "around");
} else "both" == type ? (cm.replaceSelection(left + right, null), cm.execCommand("goCharLeft")) :"addFour" == type && (cm.replaceSelection(left + left + left + left, "before"), 
cm.execCommand("goCharRight"));
});
}, left != right && (map["'" + right + "'"] = function(cm) {
for (var ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
var range = ranges[i];
if (!range.empty() || cm.getRange(range.head, Pos(range.head.line, range.head.ch + 1)) != right) return CodeMirror.Pass;
}
cm.execCommand("goCharRight");
});
})(pairs.charAt(i), pairs.charAt(i + 1));
return map;
}
function buildExplodeHandler(pairs) {
return function(cm) {
if (cm.getOption("disableInput")) return CodeMirror.Pass;
for (var ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
if (!ranges[i].empty()) return CodeMirror.Pass;
var around = charsAround(cm, ranges[i].head);
if (!around || pairs.indexOf(around) % 2 != 0) return CodeMirror.Pass;
}
cm.operation(function() {
cm.replaceSelection("\n\n", null), cm.execCommand("goCharLeft"), ranges = cm.listSelections();
for (var i = 0; i < ranges.length; i++) {
var line = ranges[i].head.line;
cm.indentLine(line, null, !0), cm.indentLine(line + 1, null, !0);
}
});
};
}
var DEFAULT_BRACKETS = "()[]{}''\"\"", DEFAULT_EXPLODE_ON_ENTER = "[]{}", SPACE_CHAR_REGEX = /\s/, Pos = CodeMirror.Pos;
CodeMirror.defineOption("autoCloseBrackets", !1, function(cm, val, old) {
if (old != CodeMirror.Init && old && cm.removeKeyMap("autoCloseBrackets"), val) {
var pairs = DEFAULT_BRACKETS, explode = DEFAULT_EXPLODE_ON_ENTER;
"string" == typeof val ? pairs = val :"object" == typeof val && (null != val.pairs && (pairs = val.pairs), 
null != val.explode && (explode = val.explode));
var map = buildKeymap(pairs);
explode && (map.Enter = buildExplodeHandler(explode)), cm.addKeyMap(map);
}
});
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
function findMatchingBracket(cm, where, strict, config) {
var line = cm.getLineHandle(where.line), pos = where.ch - 1, match = pos >= 0 && matching[line.text.charAt(pos)] || matching[line.text.charAt(++pos)];
if (!match) return null;
var dir = ">" == match.charAt(1) ? 1 :-1;
if (strict && dir > 0 != (pos == where.ch)) return null;
var style = cm.getTokenTypeAt(Pos(where.line, pos + 1)), found = scanForBracket(cm, Pos(where.line, pos + (dir > 0 ? 1 :0)), dir, style || null, config);
return null == found ? null :{
from:Pos(where.line, pos),
to:found && found.pos,
match:found && found.ch == match.charAt(0),
forward:dir > 0
};
}
function scanForBracket(cm, where, dir, style, config) {
for (var maxScanLen = config && config.maxScanLineLength || 1e4, maxScanLines = config && config.maxScanLines || 1e3, stack = [], re = config && config.bracketRegex ? config.bracketRegex :/[(){}[\]]/, lineEnd = dir > 0 ? Math.min(where.line + maxScanLines, cm.lastLine() + 1) :Math.max(cm.firstLine() - 1, where.line - maxScanLines), lineNo = where.line; lineNo != lineEnd; lineNo += dir) {
var line = cm.getLine(lineNo);
if (line) {
var pos = dir > 0 ? 0 :line.length - 1, end = dir > 0 ? line.length :-1;
if (!(line.length > maxScanLen)) for (lineNo == where.line && (pos = where.ch - (0 > dir ? 1 :0)); pos != end; pos += dir) {
var ch = line.charAt(pos);
if (re.test(ch) && (void 0 === style || cm.getTokenTypeAt(Pos(lineNo, pos + 1)) == style)) {
var match = matching[ch];
if (">" == match.charAt(1) == dir > 0) stack.push(ch); else {
if (!stack.length) return {
pos:Pos(lineNo, pos),
ch:ch
};
stack.pop();
}
}
}
}
}
return lineNo - dir == (dir > 0 ? cm.lastLine() :cm.firstLine()) ? !1 :null;
}
function matchBrackets(cm, autoclear, config) {
for (var maxHighlightLen = cm.state.matchBrackets.maxHighlightLineLength || 1e3, marks = [], ranges = cm.listSelections(), i = 0; i < ranges.length; i++) {
var match = ranges[i].empty() && findMatchingBracket(cm, ranges[i].head, !1, config);
if (match && cm.getLine(match.from.line).length <= maxHighlightLen) {
var style = match.match ? "CodeMirror-matchingbracket" :"CodeMirror-nonmatchingbracket";
marks.push(cm.markText(match.from, Pos(match.from.line, match.from.ch + 1), {
className:style
})), match.to && cm.getLine(match.to.line).length <= maxHighlightLen && marks.push(cm.markText(match.to, Pos(match.to.line, match.to.ch + 1), {
className:style
}));
}
}
if (marks.length) {
ie_lt8 && cm.state.focused && cm.display.input.focus();
var clear = function() {
cm.operation(function() {
for (var i = 0; i < marks.length; i++) marks[i].clear();
});
};
if (!autoclear) return clear;
setTimeout(clear, 800);
}
}
function doMatchBrackets(cm) {
cm.operation(function() {
currentlyHighlighted && (currentlyHighlighted(), currentlyHighlighted = null), currentlyHighlighted = matchBrackets(cm, !1, cm.state.matchBrackets);
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
}), CodeMirror.defineExtension("findMatchingBracket", function(pos, strict, config) {
return findMatchingBracket(this, pos, strict, config);
}), CodeMirror.defineExtension("scanForBracket", function(pos, dir, style, config) {
return scanForBracket(this, pos, dir, style, config);
});
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
CodeMirror.runMode = function(string, modespec, callback, options) {
var mode = CodeMirror.getMode(CodeMirror.defaults, modespec), ie = /MSIE \d/.test(navigator.userAgent), ie_lt9 = ie && (null == document.documentMode || document.documentMode < 9);
if (1 == callback.nodeType) {
var tabSize = options && options.tabSize || CodeMirror.defaults.tabSize, node = callback, col = 0;
node.innerHTML = "", callback = function(text, style) {
if ("\n" == text) return node.appendChild(document.createTextNode(ie_lt9 ? "\r" :text)), 
col = 0, void 0;
for (var content = "", pos = 0; ;) {
var idx = text.indexOf("	", pos);
if (-1 == idx) {
content += text.slice(pos), col += text.length - pos;
break;
}
col += idx - pos, content += text.slice(pos, idx);
var size = tabSize - col % tabSize;
col += size;
for (var i = 0; size > i; ++i) content += " ";
pos = idx + 1;
}
if (style) {
var sp = node.appendChild(document.createElement("span"));
sp.className = "cm-" + style.replace(/ +/g, " cm-"), sp.appendChild(document.createTextNode(content));
} else node.appendChild(document.createTextNode(content));
};
}
for (var lines = CodeMirror.splitLines(string), state = options && options.state || CodeMirror.startState(mode), i = 0, e = lines.length; e > i; ++i) {
i && callback("\n");
var stream = new CodeMirror.StringStream(lines[i]);
for (!stream.string && mode.blankLine && mode.blankLine(state); !stream.eol(); ) {
var style = mode.token(stream, state);
callback(stream.current(), style, i, stream.start, state), stream.start = stream.pos;
}
}
};
}), // CodeMirror, copyright (c) by Marijn Haverbeke and others
function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function Completion(cm, options) {
this.cm = cm, this.options = this.buildOptions(options), this.widget = this.onClose = null;
}
function getText(completion) {
return "string" == typeof completion ? completion :completion.text;
}
function buildKeyMap(completion, handle) {
function addBinding(key, val) {
var bound;
bound = "string" != typeof val ? function(cm) {
return val(cm, handle);
} :baseMap.hasOwnProperty(val) ? baseMap[val] :val, ourMap[key] = bound;
}
var baseMap = {
Up:function() {
handle.moveFocus(-1);
},
Down:function() {
handle.moveFocus(1);
},
PageUp:function() {
handle.moveFocus(-handle.menuSize() + 1, !0);
},
PageDown:function() {
handle.moveFocus(handle.menuSize() - 1, !0);
},
Home:function() {
handle.setFocus(0);
},
End:function() {
handle.setFocus(handle.length - 1);
},
Enter:handle.pick,
Tab:handle.pick,
Esc:handle.close
}, custom = completion.options.customKeys, ourMap = custom ? {} :baseMap;
if (custom) for (var key in custom) custom.hasOwnProperty(key) && addBinding(key, custom[key]);
var extra = completion.options.extraKeys;
if (extra) for (var key in extra) extra.hasOwnProperty(key) && addBinding(key, extra[key]);
return ourMap;
}
function getHintElement(hintsElement, el) {
for (;el && el != hintsElement; ) {
if ("LI" === el.nodeName.toUpperCase() && el.parentNode == hintsElement) return el;
el = el.parentNode;
}
}
function Widget(completion, data) {
this.completion = completion, this.data = data;
var widget = this, cm = completion.cm, hints = this.hints = document.createElement("ul");
hints.className = "CodeMirror-hints", this.selectedHint = data.selectedHint || 0;
for (var completions = data.list, i = 0; i < completions.length; ++i) {
var elt = hints.appendChild(document.createElement("li")), cur = completions[i], className = HINT_ELEMENT_CLASS + (i != this.selectedHint ? "" :" " + ACTIVE_HINT_ELEMENT_CLASS);
null != cur.className && (className = cur.className + " " + className), elt.className = className, 
cur.render ? cur.render(elt, data, cur) :elt.appendChild(document.createTextNode(cur.displayText || getText(cur))), 
elt.hintId = i;
}
var pos = cm.cursorCoords(completion.options.alignWithWord ? data.from :null), left = pos.left, top = pos.bottom, below = !0;
hints.style.left = left + "px", hints.style.top = top + "px";
var winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth), winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
(completion.options.container || document.body).appendChild(hints);
var box = hints.getBoundingClientRect(), overlapY = box.bottom - winH;
if (overlapY > 0) {
var height = box.bottom - box.top, curTop = pos.top - (pos.bottom - box.top);
if (curTop - height > 0) hints.style.top = (top = pos.top - height) + "px", below = !1; else if (height > winH) {
hints.style.height = winH - 5 + "px", hints.style.top = (top = pos.bottom - box.top) + "px";
var cursor = cm.getCursor();
data.from.ch != cursor.ch && (pos = cm.cursorCoords(cursor), hints.style.left = (left = pos.left) + "px", 
box = hints.getBoundingClientRect());
}
}
var overlapX = box.left - winW;
if (overlapX > 0 && (box.right - box.left > winW && (hints.style.width = winW - 5 + "px", 
overlapX -= box.right - box.left - winW), hints.style.left = (left = pos.left - overlapX) + "px"), 
cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
moveFocus:function(n, avoidWrap) {
widget.changeActive(widget.selectedHint + n, avoidWrap);
},
setFocus:function(n) {
widget.changeActive(n);
},
menuSize:function() {
return widget.screenAmount();
},
length:completions.length,
close:function() {
completion.close();
},
pick:function() {
widget.pick();
},
data:data
})), completion.options.closeOnUnfocus) {
var closingOnBlur;
cm.on("blur", this.onBlur = function() {
closingOnBlur = setTimeout(function() {
completion.close();
}, 100);
}), cm.on("focus", this.onFocus = function() {
clearTimeout(closingOnBlur);
});
}
var startScroll = cm.getScrollInfo();
return cm.on("scroll", this.onScroll = function() {
var curScroll = cm.getScrollInfo(), editor = cm.getWrapperElement().getBoundingClientRect(), newTop = top + startScroll.top - curScroll.top, point = newTop - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
return below || (point += hints.offsetHeight), point <= editor.top || point >= editor.bottom ? completion.close() :(hints.style.top = newTop + "px", 
hints.style.left = left + startScroll.left - curScroll.left + "px", void 0);
}), CodeMirror.on(hints, "dblclick", function(e) {
var t = getHintElement(hints, e.target || e.srcElement);
t && null != t.hintId && (widget.changeActive(t.hintId), widget.pick());
}), CodeMirror.on(hints, "click", function(e) {
var t = getHintElement(hints, e.target || e.srcElement);
t && null != t.hintId && (widget.changeActive(t.hintId), completion.options.completeOnSingleClick && widget.pick());
}), CodeMirror.on(hints, "mousedown", function() {
setTimeout(function() {
cm.focus();
}, 20);
}), CodeMirror.signal(data, "select", completions[0], hints.firstChild), !0;
}
var HINT_ELEMENT_CLASS = "CodeMirror-hint", ACTIVE_HINT_ELEMENT_CLASS = "CodeMirror-hint-active";
CodeMirror.showHint = function(cm, getHints, options) {
if (!getHints) return cm.showHint(options);
options && options.async && (getHints.async = !0);
var newOpts = {
hint:getHints
};
if (options) for (var prop in options) newOpts[prop] = options[prop];
return cm.showHint(newOpts);
}, CodeMirror.defineExtension("showHint", function(options) {
if (!(this.listSelections().length > 1 || this.somethingSelected())) {
this.state.completionActive && this.state.completionActive.close();
var completion = this.state.completionActive = new Completion(this, options), getHints = completion.options.hint;
if (getHints) return CodeMirror.signal(this, "startCompletion", this), getHints.async ? (getHints(this, function(hints) {
completion.showHints(hints);
}, completion.options), void 0) :completion.showHints(getHints(this, completion.options));
}
}), Completion.prototype = {
close:function() {
this.active() && (this.cm.state.completionActive = null, this.widget && this.widget.close(), 
this.onClose && this.onClose(), CodeMirror.signal(this.cm, "endCompletion", this.cm));
},
active:function() {
return this.cm.state.completionActive == this;
},
pick:function(data, i) {
var completion = data.list[i];
completion.hint ? completion.hint(this.cm, data, completion) :this.cm.replaceRange(getText(completion), completion.from || data.from, completion.to || data.to, "complete"), 
CodeMirror.signal(data, "pick", completion), this.close();
},
showHints:function(data) {
return data && data.list.length && this.active() ? (this.options.completeSingle && 1 == data.list.length ? this.pick(data, 0) :this.showWidget(data), 
void 0) :this.close();
},
showWidget:function(data) {
function done() {
finished || (finished = !0, completion.close(), completion.cm.off("cursorActivity", activity), 
data && CodeMirror.signal(data, "close"));
}
function update() {
if (!finished) {
CodeMirror.signal(data, "update");
var getHints = completion.options.hint;
getHints.async ? getHints(completion.cm, finishUpdate, completion.options) :finishUpdate(getHints(completion.cm, completion.options));
}
}
function finishUpdate(data_) {
if (data = data_, !finished) {
if (!data || !data.list.length) return done();
completion.widget && completion.widget.close(), completion.widget = new Widget(completion, data);
}
}
function clearDebounce() {
debounce && (cancelAnimationFrame(debounce), debounce = 0);
}
function activity() {
clearDebounce();
var pos = completion.cm.getCursor(), line = completion.cm.getLine(pos.line);
pos.line != startPos.line || line.length - pos.ch != startLen - startPos.ch || pos.ch < startPos.ch || completion.cm.somethingSelected() || pos.ch && closeOn.test(line.charAt(pos.ch - 1)) ? completion.close() :(debounce = requestAnimationFrame(update), 
completion.widget && completion.widget.close());
}
this.widget = new Widget(this, data), CodeMirror.signal(data, "shown");
var finished, debounce = 0, completion = this, closeOn = this.options.closeCharacters, startPos = this.cm.getCursor(), startLen = this.cm.getLine(startPos.line).length, requestAnimationFrame = window.requestAnimationFrame || function(fn) {
return setTimeout(fn, 1e3 / 60);
}, cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
this.cm.on("cursorActivity", activity), this.onClose = done;
},
buildOptions:function(options) {
var editor = this.cm.options.hintOptions, out = {};
for (var prop in defaultOptions) out[prop] = defaultOptions[prop];
if (editor) for (var prop in editor) void 0 !== editor[prop] && (out[prop] = editor[prop]);
if (options) for (var prop in options) void 0 !== options[prop] && (out[prop] = options[prop]);
return out;
}
}, Widget.prototype = {
close:function() {
if (this.completion.widget == this) {
this.completion.widget = null, this.hints.parentNode.removeChild(this.hints), this.completion.cm.removeKeyMap(this.keyMap);
var cm = this.completion.cm;
this.completion.options.closeOnUnfocus && (cm.off("blur", this.onBlur), cm.off("focus", this.onFocus)), 
cm.off("scroll", this.onScroll);
}
},
pick:function() {
this.completion.pick(this.data, this.selectedHint);
},
changeActive:function(i, avoidWrap) {
if (i >= this.data.list.length ? i = avoidWrap ? this.data.list.length - 1 :0 :0 > i && (i = avoidWrap ? 0 :this.data.list.length - 1), 
this.selectedHint != i) {
var node = this.hints.childNodes[this.selectedHint];
node.className = node.className.replace(" " + ACTIVE_HINT_ELEMENT_CLASS, ""), node = this.hints.childNodes[this.selectedHint = i], 
node.className += " " + ACTIVE_HINT_ELEMENT_CLASS, node.offsetTop < this.hints.scrollTop ? this.hints.scrollTop = node.offsetTop - 3 :node.offsetTop + node.offsetHeight > this.hints.scrollTop + this.hints.clientHeight && (this.hints.scrollTop = node.offsetTop + node.offsetHeight - this.hints.clientHeight + 3), 
CodeMirror.signal(this.data, "select", this.data.list[this.selectedHint], node);
}
},
screenAmount:function() {
return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
}
}, CodeMirror.registerHelper("hint", "auto", function(cm, options) {
var words, helpers = cm.getHelpers(cm.getCursor(), "hint");
if (helpers.length) for (var i = 0; i < helpers.length; i++) {
var cur = helpers[i](cm, options);
if (cur && cur.list.length) return cur;
} else if (words = cm.getHelper(cm.getCursor(), "hintWords")) {
if (words) return CodeMirror.hint.fromList(cm, {
words:words
});
} else if (CodeMirror.hint.anyword) return CodeMirror.hint.anyword(cm, options);
}), CodeMirror.registerHelper("hint", "fromList", function(cm, options) {
for (var cur = cm.getCursor(), token = cm.getTokenAt(cur), found = [], i = 0; i < options.words.length; i++) {
var word = options.words[i];
word.slice(0, token.string.length) == token.string && found.push(word);
}
return found.length ? {
list:found,
from:CodeMirror.Pos(cur.line, token.start),
to:CodeMirror.Pos(cur.line, token.end)
} :void 0;
}), CodeMirror.commands.autocomplete = CodeMirror.showHint;
var defaultOptions = {
hint:CodeMirror.hint.auto,
completeSingle:!0,
alignWithWord:!0,
closeCharacters:/[\s()\[\]{};:>,]/,
closeOnUnfocus:!0,
completeOnSingleClick:!1,
container:null,
customKeys:null,
extraKeys:null
};
CodeMirror.defineOption("hintOptions", null);
}), function() {
var __indexOf = [].indexOf || function(item) {
for (var i = 0, l = this.length; l > i; i++) if (i in this && this[i] === item) return i;
return -1;
};
!function(widgetFactory) {
"function" == typeof define && define.amd ? define("codeshell", [ "jquery", "underscore", "codemirror/lib/codemirror", "select2", "json2", "jstorage" ], function($, _, cm) {
widgetFactory(window.jQuery, window, _, cm);
}) :widgetFactory(window.jQuery, window, window._, window.CodeMirror);
}(function($, window, _, CodeMirror) {
return $.widget("hr.codeshell", {
options:{},
_options:{
enableIntellisense:!1,
showSave:!1,
showCustomInput:!0,
showCompileTest:!0,
showSubmit:!1,
showUploadCode:!1,
showFullScreen:!1,
statusText:"",
showTheme:!1,
showNonEditableHeadTail:!1,
enableVersioning:!1,
versionIds:[],
versioningRestUrl:"",
foldCode:!1,
dynamicMode:!1,
languages:[ "c", "cpp", "java", "csharp", "haskell", "php", "python", "perl", "ruby", "bash", "oracle", "mysql", "sql", "clojure", "scala", "code", "text", "brainfuck", "javascript", "d", "go", "lua", "erlang", "sbcl", "ocaml", "pascal", "python3", "groovy", "text_pseudo", "objectivec", "fsharp", "visualbasic", "cobol", "tsql", "lolcode", "smalltalk", "tcl", "html", "css", "java8", "db2" ],
language:"c",
showTemplate:!0,
autoSaveNamespace:null,
onSave:null,
autoSave:null,
firstLineNumber:1,
initialCode:"",
compile_button_text:"Run Code",
submit_button_text:"Submit Code",
lang_line_nos:{},
lang_head_template:{},
lang_body_template:{},
lang_tail_template:{},
lang_template:{},
lang_mime_mapping:{
c:"text/x-csrc",
cpp:"text/x-c++src",
java:"text/x-java",
csharp:"text/x-csharp",
haskell:"text/x-haskell",
php:"text/x-php",
python:"text/x-python",
perl:"text/x-perl",
ruby:"text/x-ruby",
bash:"text/x-bash",
oracle:"text/x-plsql",
mysql:"text/x-plsql",
tsql:"text/x-plsql",
sql:"text/x-plsql",
clojure:"text/x-scheme",
scala:"text/x-scala",
code:"text/plain",
text:"text/plain",
brainfuck:"text/plain",
javascript:"text/javascript",
d:"text/x-d",
go:"text/x-go",
lua:"text/x-lua",
erlang:"text/x-erlang",
sbcl:"text/x-common-lisp",
ocaml:"text/x-ocaml",
pascal:"text/x-pascal",
python3:"text/x-python",
groovy:"text/x-groovy",
text_pseudo:"text/plain",
objectivec:"text/x-csrc",
fsharp:"text/x-fsharp",
visualbasic:"text/x-vb",
cobol:"text/x-cobol",
smalltalk:"text/x-stsrc",
tcl:"text/x-tcl",
html:"text/html",
css:"text/css",
java8:"text/x-java",
db2:"text/x-plsql"
},
lang_display_mapping:{
c:"C",
cpp:"C++",
java:"Java",
csharp:"C#",
haskell:"Haskell",
php:"PHP",
python:"Python 2",
ruby:"Ruby",
perl:"Perl",
bash:"BASH",
oracle:"Oracle",
mysql:"MySQL",
sql:"SQL",
clojure:"Clojure",
scala:"Scala",
code:"Generic",
text:"Plain Text",
brainfuck:"Brainfuck",
javascript:"Javascript",
lua:"Lua",
sbcl:"Lisp",
erlang:"Erlang",
go:"Go",
d:"D",
ocaml:"OCaml",
pascal:"Pascal",
python3:"Python 3",
groovy:"Groovy",
objectivec:"Objective C",
text_pseudo:"Plain Text",
fsharp:"F#",
visualbasic:"VB.NET",
cobol:"COBOL",
tsql:"T-SQL",
lolcode:"LOLCODE",
smalltalk:"Smalltalk",
tcl:"Tcl",
whitespace:"Whitespace",
css:"CSS",
html:"HTML",
java8:"Java 8",
db2:"DB2"
},
default_head_end:{
c:"/* Head ends here */",
cpp:"/* Head ends here */",
java:"/* Head ends here */",
csharp:"/* Head ends here */",
haskell:"-- Head ends here",
php:"/* Head ends here */",
python:"# Head ends here",
perl:"# Head ends here",
ruby:"# Head ends here",
bash:"# Head ends here",
clojure:"; Head ends here",
scala:"/* Head ends here */",
sbcl:"; Head ends here",
lua:"-- Head ends here",
javascript:"/* Head ends here */",
pascal:"{ Head ends here }",
python3:"# Head ends here",
groovy:"// Head ends here",
objectivec:"// Head ends here",
fsharp:"// Head ends here",
visualbasic:"' Head ends here",
cobol:"* Head ends here",
lolcode:"BTW Head ends here",
smalltalk:'" Head ends here"',
tcl:"# Head ends here",
whitespace:"Head ends here",
html:"<!-- Head ends here -->",
css:"/* Head ends here */",
java8:"/* Head ends here */",
db2:"/* Head ends here */"
},
lang_fold_mapping:{
c:"brace",
cpp:"brace",
java:"brace",
csharp:"brace",
haskell:"indent",
php:"brace",
python:"indent",
ruby:"indent",
perl:"brace",
bash:"brace",
oracle:"indent",
mysql:"indent",
sql:"indent",
clojure:"indent",
scala:"brace",
code:"brace",
text:"indent",
brainfuck:"indent",
javascript:"brace",
lua:"indent",
sbcl:"indent",
erlang:"indent",
go:"brace",
d:"brace",
ocaml:"indent",
pascal:"indent",
python3:"indent",
groovy:"brace",
objectivec:"brace",
text_pseudo:"indent",
fsharp:"indent",
visualbasic:"indent",
cobol:"indent",
lolcode:"indent",
smalltalk:"indent",
tcl:"brace",
whitespace:"indent",
html:"tag",
css:"brace",
java8:"brace",
db2:"indent"
},
default_tail_start:{
c:"/* Tail starts here */",
cpp:"/* Tail starts here */",
java:"/* Tail starts here */",
csharp:"/* Tail starts here */",
haskell:"-- Tail starts here",
php:"/* Tail starts here */",
python:"# Tail starts here",
perl:"# Tail starts here",
ruby:"# Tail starts here",
bash:"# Tail starts here",
clojure:"; Tail starts here",
scala:"/* Tail starts here */",
sbcl:"; Tail starts here",
lua:"-- Tail starts here",
javascript:"/* Tail starts here */",
pascal:"{ Tail starts here }",
python3:"# Tail starts here",
groovy:"// Tail starts here",
objectivec:"// Tail starts here",
fsharp:"// Tail starts here",
visualbasic:"' Tail starts here",
cobol:"* Tail starts here",
lolcode:"BTW Tail starts here",
smalltalk:'" Tail starts here"',
tcl:"# Tail starts here",
whitespace:"Tail starts here",
html:"<!-- Tail starts here -->",
css:"/* Tails starts here */",
java8:"/* Tail starts here */",
db2:"/* Tail starts here */"
},
lang_default_text:{
c:"#include <stdio.h>\n#include <string.h>\n#include <math.h>\n#include <stdlib.h>\n\nint main() {\n\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */    \n    return 0;\n}\n",
cpp:"#include <cmath>\n#include <cstdio>\n#include <vector>\n#include <iostream>\n#include <algorithm>\nusing namespace std;\n\n\nint main() {\n    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   \n    return 0;\n}\n",
java:"import java.io.*;\nimport java.util.*;\nimport java.text.*;\nimport java.math.*;\nimport java.util.regex.*;\n\npublic class Solution {\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n    }\n}",
csharp:"using System;\nusing System.Collections.Generic;\nusing System.IO;\nclass Solution {\n    static void Main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution */\n    }\n}",
php:'<?php\n$_fp = fopen("php://stdin", "r");\n/* Enter your code here. Read input from STDIN. Print output to STDOUT */\n\n?>',
ruby:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
python:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
perl:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
haskell:"-- Enter your code here. Read input from STDIN. Print output to STDOUT",
clojure:"; Enter your code here. Read input from STDIN. Print output to STDOUT\n;",
lua:"-- Enter your code here. Read input from STDIN. Print output to STDOUT",
sbcl:";; Enter your code here. Read input from STDIN. Print output to STDOUT",
erlang:"% Enter your code here. Read input from STDIN. Print output to STDOUT\n% Your class should be named solution\n\n-module(solution).\n-export([main/0]).\n\nmain() ->\n	.\n",
scala:"object Solution {\n\n    def main(args: Array[String]) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution\n*/\n    }\n}",
go:'package main\nimport "fmt"\n\nfunc main() {\n //Enter your code here. Read input from STDIN. Print output to STDOUT\n}',
javascript:'function processData(input) {\n    //Enter your code here\n} \n\nprocess.stdin.resume();\nprocess.stdin.setEncoding("ascii");\n_input = "";\nprocess.stdin.on("data", function (input) {\n    _input += input;\n});\n\nprocess.stdin.on("end", function () {\n   processData(_input);\n});\n',
d:"/* Enter your code here. Read input from STDIN. Print output to STDOUT */",
ocaml:"(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
pascal:"(* Enter your code here. Read input from STDIN. Print output to STDOUT *)",
groovy:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
text:"",
objectivec:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
fsharp:"//Enter your code here. Read input from STDIN. Print output to STDOUT",
visualbasic:"'Enter your code here. Read input from STDIN. Print output to STDOUT",
cobol:"*Enter your code here. Read input from STDIN. Print output to STDOUT",
lolcode:"BTW Enter your code here. Read input from STDIN. Print output to STDOUT",
smalltalk:'"Enter your code here. Read input from STDIN. Print output to STDOUT"',
tcl:"# Enter your code here. Read input from STDIN. Print output to STDOUT",
whitespace:"Enter your code here. Read input from STDIN. Print output to STDOUT",
html:"<!-- Enter your code here -->",
css:"/* Enter your code here*/",
java8:"import java.io.*;\nimport java.util.*;\n\npublic class Solution {\n\n    public static void main(String[] args) {\n        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */\n    }\n}"
}
},
headerTemplate:'<div class="clearfix grey-header cap plL plR psT psB" style="position: relative;">\n  <% if (enableVersioning) { %>\n  <div class="fork-dialog cs-dialog hide">\n    <div class="header">Fork <span class="version-seq"></span></div>\n    <div class="body">\n      <p class="grey-msg">past buffers are marked read only, you wont be able to edit your current buffer without forking it</p>\n      <div class="m msT">\n        <button class="btn close-fork-dialog">Cancel</button>&nbsp;&nbsp;\n        <button class="btn btn-primary fork-version" data-action="fork">Fork <span class="version-seq"></span></button>&nbsp;&nbsp;\n        <button class="btn btn-primary fork-version" data-action="orphan">Create New Buffer</button>\n      </div>\n    </div>\n  </div>\n  <div class="fork-limit-reached-dialog cs-dialog hide">\n    <div class="header">Fork Limit Reached</div>\n    <div class="body">\n      <p class="grey-msg">You can&rsquo;t create more than 20 buffers, please delete one of your old bufferes to create a new buffer.</p>\n      <div class="m msT">\n        <button class="btn close-fork-limit-reached-dialog">OK</button>&nbsp;&nbsp;\n      </div>\n    </div>\n  </div>\n  <div class="delete-version-dialog cs-dialog hide">\n    <div class="header">Delete <span class="version-seq"></span></div>\n    <div class="body">\n      <p class="grey-msg">Are you sure you want to delete <strong><span class="version-seq"></span></strong>? This action can&rsquo;t be undone.</p>\n      <div class="m msT">\n        <button class="btn delete-version-button">Yes</button>&nbsp;&nbsp;\n      </div>\n    </div>\n  </div>\n  <div class="pull-left no-select">\n    <p style="padding-top: 8px;">\n      <strong class="version-name">Current Buffer</strong>\n      <span class="gray-text version-meta">(saved locally, editable)</span>\n      &nbsp;&nbsp;\n      <a class="fork-this-version"><i class="icon--grey cursor icon-flow-branch"></i></a>\n      <a class="show-version-timeline"><i class="icon--grey cursor icon-back-in-time"></i></a>\n      <a class="delete-active-version hide"><i class="icon--grey cursor icon-trash"></i></a>\n    </p>\n  </div>\n  <% } %>\n  <div class="pull-right">\n    <div class="inline large lines inverse pull-right msT msL">\n      <% if (showSave) { %>\n      <a href="javascript:;" class="cursor save-code no-select" id="save-code"><i class="icon-floppy icon--grey no-select"></i></a>\n      <% } %>\n      <% if (showFullScreen) { %>\n      <a class="restorefullscreen force-hide active-link no-select">\n          <i class="icon-resize-small-alt icon--grey no-select"></i></a>\n      <a class="fullscreen active-link no-select"\n         data-analytics="Switch to fullscreen"><i class="icon-resize-full-alt icon--grey no-select"></i></a>\n      <% } %>\n      <a class="hide" style="display:none;"></a>\n      <div style="position:relative; margin-left: 0px;">\n        <a class="cursor no-select" id="show-preferences"><i class="icon-cog icon--grey no-select"></i></a>\n        <div id="pref-pane"\n          style="position: absolute;right: -0.5em;top: 2em;z-index: 9;background: #fff;border: 1px solid #ddd;border-radius: 5px;padding: 10px;  width: 16em; display: none;">\n          <div style="position: absolute;width: 0;right: 0.8em;height: 0;border-left: 7px solid transparent;border-right: 7px solid transparent;border-bottom: 7px solid #ddd;top: -0.4em;"></div>\n          <label>Editor Mode</label>\n          <div class="btn-group msB no-select">\n            <a class="cursor emacs btn btn-white editor-mode-button no-select" data-editor="emacs">Emacs</a>\n            <a class="cursor default btn btn-white editor-mode-button no-select" data-editor="default">Normal</a>\n            <a class="cursor vim btn btn-white editor-mode-button no-select" data-editor="vim">Vim</a>\n          </div>\n          <% if (showTheme) { %>\n          <label>Editor Theme</label>\n          <select id="editor-theme">\n            <option value="light">Light</option>\n            <option value="dark">Dark</option>\n          </select>\n          <% } %>\n          <label>Tab Spaces</label>\n          <input id="tab-spaces" type="text" style="width: 4em;">\n          <% if (enableIntellisense) { %>\n            <label for="auto-complete">\n              <input id="auto-complete" type="checkbox" checked>\n              Auto Complete\n            </label>\n          <% } %>\n        </div>\n      </div>\n    </div>\n    <div class="pull-right">\n      <div class="dummy-lang-container hide"></div>\n      <select id="select-lang">\n       <% _.each(languages, function(l){ %>\n        <option value="<%=l%>"><%=lang_display_mapping[l]%></option>\n       <% }); %>\n      </select>\n    </div>\n    <div class="clearfix"></div>\n  </div>\n</div>\n<% if (enableVersioning) { %>\n<div class="version-timeline">\n  <div class="version-timeline-inner">\n    <div class="cross-line"></div>\n    <div class="start-slab pull-left"></div>\n    <% _.each (versionIds, function (version_id) { %>\n      <div class="version-ball pull-left cursor" data-version-id="<%= version_id %>"></div>\n    <% }); %>\n    <div class="current-version-ball green-bkg pull-left cursor"></div>\n  </div>\n</div>\n<% } %>',
bodyTemplate:'<div class="hr_tour-code-solution">\n  <div class="code-checker">\n    <div class="code-editors">\n      <% if (showNonEditableHeadTail){ %> <div class="code-head"> <textarea id="codeheadview" style="width:100%"/> </div> <%}%>\n      <% if (dynamicMode) { %> <div class="loading-mode" style="display:none">Loading Editor... </div> <% } %>\n      <div class="code-body"> <textarea id="codeview" style="width:100%"></textarea> </div>\n      <% if (showNonEditableHeadTail){ %> <div class="code-tail"> <textarea id="codetailview" style="width:100%"/> </div> <%}%>\n      <div class="clearfix"></div>\n    </div>\n    <div id="codeeditor-statusbar" class="clearfix psA codeeditor_statusbar">\n      <span id="statusbar-mode"></span>\n      <span><em id="status-text"><%-statusText%></em></span>\n      <div class="pull-right">\n        <span id="statusbar-line"></span>\n        <span id="statusbar-col"></span>\n        <span id="statusbar-count"></span>\n      </div>\n    </div>\n  </div>\n</div>',
footerTemplate:'<div class="clearfix mlT">\n  <div class="pull-right">\n    <% if (showCompileTest) { %>\n    <button class="btn bb-compile msR" data-analytics="Compile and Test"><%= compile_button_text %></button>\n    <% } %>\n    <% if (showSubmit) { %>\n    <button class="btn btn-primary bb-submit ans-submit" data-analytics="Submit Code"><%= submit_button_text %></button>\n    <% } %>\n  </div>\n  <div class="pull-left inline">\n      <% if(showUploadCode) { %>\n      <button class="btn btn-text upload_file" data-analytics="Upload File"><i class="icon-upload"></i>Upload Code as File</button>\n      <% } %>\n      <% if (showCustomInput) { %>\n      <div class="mlL mmT">\n          <label for="customtestcase"><input type="checkbox" id="customtestcase"><span class="lmT msL">Use a custom test case</span></label>\n          <textarea rows="5" id="custominput" style="display:none"></textarea>\n      </div>\n      <% } %>\n  </div>\n</div>',
_create:function() {
var e, that;
return this.ele_name = this.element.context.id, e = $(this.element), this.options = $.extend(this._options, this.options), 
this.current_code = e.html(), e.empty(), e.append(_.template(this.headerTemplate, this.options)), 
e.append(_.template(this.bodyTemplate, this.options)), e.append(_.template(this.footerTemplate, this.options)), 
that = this, this.codeEditor = this._initCodeEditor(e.find("textarea#codeview")[0]), 
this.options.showNonEditableHeadTail && (this.codeEditorHead = this._initCodeEditor(e.find("textarea#codeheadview")[0], !0), 
this.codeEditorTail = this._initCodeEditor(e.find("textarea#codetailview")[0], !0)), 
this.codeEditor.on("update", function() {
return that._updateStatusBar(that);
}), this.codeEditor.on("cursorActivity", function(e) {
return that._updateStatusPosition(e);
}), this.options.showNonEditableHeadTail && (this.codeEditorHead.on("cursorActivity", function(e) {
return that._updateStatusPosition(e);
}), this.codeEditorTail.on("cursorActivity", function(e) {
return that._updateStatusPosition(e);
})), this.codeEditor.on("change", function() {
return that._saveLangCode(that), that.options.showNonEditableHeadTail ? that._updateTailEditorLineNumber() :void 0;
}), this.codeEditor.on("viewportChange", function() {
return that._growEditor();
}), this.changeLanguage("cpp"), this.changeLanguage(e.find("#select-lang").select2("val")), 
this._shiftPressed = !1, this.options.enableIntellisense && this.codeEditor.on("keyup", function(cm, e) {
16 === e.keyCode && (that._shiftPressed = !1), 190 === e.keyCode && that._shiftPressed === !1 && that._enableIntellisenseFunc(cm);
}), this.options.enableIntellisense && this.codeEditor.on("keydown", function(cm, e) {
16 === e.keyCode && (that._shiftPressed = !0), that._autoCompleteReqestStatus === !0 && (that._autoCompleteReqestStatus = !1);
}), this.codeEditor.on("blur", function() {
return that._autoCompleteReqestStatus === !0 ? that._autoCompleteReqestStatus = !1 :void 0;
}), e.find("#select-lang").change(function(e) {
return that._changeLanguage(e, that);
}), e.find("#save-code").click(function(e) {
return that._saveCode(e, that);
}), e.find("#select-lang").on("select2-close", function() {
return setTimeout(function() {
return that._focusEditor(that);
}, 100);
}), e.find(".editor-mode-button").click(function(e) {
return that._setEditorMode(e, that), that._updateStatusBar(that);
}), e.find("button.bb-compile").click(function() {
var data;
return data = {
code:that.codeEditor.getValue(),
language:that.options.language
}, that.options.showCustomInput && $(that.element).find("#customtestcase").attr("checked") && (data.custominput = $(that.element).find("#custominput").val()), 
that._trigger("compile", {}, data);
}), e.find("button.bb-submit").click(function() {
var data;
return data = {
code:that.codeEditor.getValue(),
language:that.options.language
}, that.options.showCustomInput && $(that.element).find("#customtestcase").attr("checked") && (data.custominput = $(that.element).find("#custominput").val()), 
that._trigger("submit", {}, data);
}), e.find("#customtestcase").click(function() {
return $(that.element).find("#custominput").toggle(this.checked);
}), e.find("#show-preferences").click(function(_this) {
return function(ev) {
var $pref_pane;
return $pref_pane = e.find("#pref-pane"), "none" === $pref_pane.css("display") ? ($(ev.currentTarget).find("i").addClass("green-color"), 
$pref_pane.show(), _this.element.find("#tab-spaces").val(_this.codeEditor.options.tabSize)) :($(ev.currentTarget).find("i").removeClass("green-color"), 
$pref_pane.hide());
};
}(this)), e.find("#editor-theme").change(function(_this) {
return function(ev) {
return _this._changeTheme($(ev.currentTarget).val());
};
}(this)), e.find("#tab-spaces").keyup(function(_this) {
return function(ev) {
return _this._setTabSize($(ev.currentTarget).val());
};
}(this)), e.find(".fork-this-version").click(function(_this) {
return function(ev) {
var dialog_class;
return _this.options.versionIds && _this.options.versionIds.length < 20 ? (dialog_class = ".fork-dialog", 
void 0 === _this.ActiveVersionId || null === _this.ActiveVersionId ? e.find(".fork-dialog .version-seq").html("Current Buffer") :e.find(".fork-dialog .version-seq").html("Buffer #" + (_.indexOf(_this.options.versionIds, _this.ActiveVersionId) + 1))) :dialog_class = ".fork-limit-reached-dialog", 
"none" === _this.element.find(dialog_class).css("display") ? (_this.element.find(dialog_class).show(), 
$(ev.currentTarget).find("i").addClass("green-color")) :(_this.element.find(dialog_class).hide(), 
$(ev.currentTarget).find("i").removeClass("green-color"));
};
}(this)), e.find(".show-version-timeline").click(function(_this) {
return function(ev) {
return "none" === _this.element.find(".version-timeline").css("display") ? (_this.element.find(".version-timeline").show(), 
$(ev.currentTarget).find("i").addClass("green-color")) :(_this.element.find(".version-timeline").hide(), 
$(ev.currentTarget).find("i").removeClass("green-color"));
};
}(this)), this.options.enableIntellisense && this._initializeAutoComplete(), this._suggestionBoxDisplayStatus = !1, 
this._autoCompleteReqestStatus = !1, this._bindVersionBall(), this._bindCurrentVersionBall(), 
e.find(".fork-version").click(function(_this) {
return function(ev) {
var forked_data;
return forked_data = "orphan" === $(ev.currentTarget).attr("data-action") ? {
code:that._getDefaultLangCode(that.options.language),
language:that.options.language
} :{
code:_this.codeEditor.getValue(),
language:_this.options.language
}, _this._forkNewBuffer(forked_data);
};
}(this)), e.find(".close-fork-dialog").click(function(_this) {
return function() {
return _this.element.find(".fork-dialog").hide(), _this.element.find(".fork-this-version").find("i").removeClass("green-color");
};
}(this)), e.find(".close-fork-limit-reached-dialog").click(function(_this) {
return function() {
return _this.element.find(".fork-limit-reached-dialog").hide(), _this.element.find(".fork-this-version").find("i").removeClass("green-color");
};
}(this)), e.find(".delete-active-version").click(function(_this) {
return function(ev) {
return $(ev.currentTarget).find("i").hasClass("green-color") ? ($(ev.currentTarget).find("i").removeClass("green-color"), 
e.find(".delete-version-dialog").hide()) :null !== _this.ActiveVersionId ? ($(ev.currentTarget).find("i").addClass("green-color"), 
e.find(".delete-version-dialog").find(".version-seq").html("Buffer #" + (_.indexOf(_this.options.versionIds, _this.ActiveVersionId) + 1)), 
e.find(".delete-version-dialog").show(), e.find(".delete-version-dialog").find(".delete-version-button").attr("data-version-id", _this.ActiveVersionId)) :void 0;
};
}(this)), e.find(".delete-version-button").click(function(_this) {
return function() {
var next_version_index, version_id;
return version_id = parseInt(e.find(".delete-version-button").attr("data-version-id")), 
next_version_index = _.indexOf(_this.options.versionIds, version_id), that = _this, 
$.ajax({
url:_this.options.versioningRestUrl,
type:"DELETE",
data:{
version_id:version_id
},
success:function() {
var $el;
return that.options.versionIds = _.reject(that.options.versionIds, function(num) {
return num === version_id;
}), that.element.find(".version-ball[data-version-id=" + version_id + "]").remove(), 
$el = next_version_index < that.options.versionIds.length ? that.element.find(".version-ball[data-version-id=" + that.options.versionIds[next_version_index] + "]") :that.element.find(".current-version-ball"), 
$el.click(), e.find(".delete-active-version").find("i").removeClass("green-color"), 
e.find(".delete-version-dialog").hide();
}
});
};
}(this)), null === e.find("#select-lang").val() && e.find("#select-lang").select2("val", this.options.languages[0]), 
e.find("#select-lang").trigger("change"), this._trigger("compile", {}, {}), this._changeTheme(), 
this._setTabSize(this.codeEditor.options.tabSize), window.codeEditor = this.codeEditor;
},
_initializeAutoComplete:function() {
var e;
return e = $(this.element), "undefined" == typeof $.cookie("enableIntellisenseUserPref") ? (e.find("#auto-complete").prop("checked", !0), 
$.cookie("enableIntellisenseUserPref", "true")) :"true" === $.cookie("enableIntellisenseUserPref") ? e.find("#auto-complete").prop("checked", !0) :"false" === $.cookie("enableIntellisenseUserPref") ? e.find("#auto-complete").prop("checked", !1) :(e.find("#auto-complete").prop("checked", !0), 
$.cookie("enableIntellisenseUserPref", "true")), e.find("#auto-complete").click(function() {
return function() {
e.find("#auto-complete").is(":checked") ? $.cookie("enableIntellisenseUserPref", "true") :$.cookie("enableIntellisenseUserPref", "false");
};
}(this));
},
_copyToCurrentBuffer:function(data) {
var e, that;
return e = $(this.element), e.find(".version-ball").removeClass("green-bkg"), e.find(".version-name").html("Current Buffer"), 
e.find(".version-meta").html("(saved locally, editable)"), e.find(".current-version-ball").hasClass("green-bkg") || e.find(".current-version-ball").addClass("green-bkg"), 
this.versionGetXhr && void 0 === this.versionGetXhr.status && this.versionGetXhr.abort(), 
this._showLoading("Loading current buffer... "), this.codeEditor.setOption("readOnly", !1), 
this.setValue(data), this.ActiveVersionId = null, this.saveLangCode(), that = this, 
setTimeout(function() {
return that._hideLoading(), $(that.element).find(".dummy-lang-container").hide(), 
$(that.element).find("#select-lang").siblings(".select2-container").show(), that.element.find(".delete-active-version").hide(), 
that.ActiveVersionId = null;
}, 100);
},
_forkNewBuffer:function(forked_data) {
var data, e, that;
return null == forked_data && (forked_data = null), e = $(this.element), data = void 0 === this.ActiveVersionId || null === this.ActiveVersionId ? {
code:this.codeEditor.getValue(),
language:this.options.language
} :{
code:this._getLangCode(this.currentBufferLang),
language:this.currentBufferLang
}, this._showLoading("Saving previous buffer on cloud... "), this.element.find(".close-fork-dialog").click(), 
that = this, $.ajax({
url:this.options.versioningRestUrl,
type:"POST",
data:data,
success:function(data) {
return forked_data && that._copyToCurrentBuffer(forked_data), that._hideLoading(), 
"none" === e.find(".version-timeline").css("display") && e.find(".show-version-timeline").click(), 
e.find(".version-ball").removeClass("green-bkg"), e.find(".version-ball").hasClass("green-bkg") || e.find(".current-version-ball").addClass("green-bkg"), 
that._addNewVersion(data.id);
}
});
},
forkNewBuffer:function(data) {
var dialog_class, that;
return this.options.enableVersioning ? this.options.versionIds && this.options.versionIds.length < 20 ? (this._forkNewBuffer(data), 
that = this, setTimeout(function() {
return that.saveLangCode();
}, 0)) :(dialog_class = ".fork-limit-reached-dialog", "none" === this.element.find(dialog_class).css("display") ? (this.element.find(dialog_class).show(), 
this.element.find(".fork-this-version i").addClass("green-color")) :(this.element.find(dialog_class).hide(), 
this.element.find(".fork-this-version i").removeClass("green-color"))) :this.setValue(data);
},
_bindCurrentVersionBall:function() {
var e;
return e = $(this.element), e.find(".current-version-ball").click(function(_this) {
return function() {
var data;
return data = {
code:_this._getLangCode(_this.currentBufferLang || _this.options.language),
language:_this.currentBufferLang || _this.options.language
}, _this._copyToCurrentBuffer(data);
};
}(this));
},
_bindVersionBall:function() {
var e;
return e = $(this.element), e.find(".version-ball").unbind("click").click(function(_this) {
return function(ev) {
var that, version_id, version_seq;
return version_id = parseInt($(ev.currentTarget).attr("data-version-id")), version_seq = _.indexOf(_this.options.versionIds, version_id) + 1, 
e.find(".current-version-ball").hasClass("green-bkg") && (_this.currentBufferLang = _this.options.language, 
_this.saveLangCode()), _this.element.find(".delete-active-version").hide(), e.find(".version-name").html("Buffer #" + version_seq), 
e.find(".version-meta").html("(saved on cloud, read-only)"), e.find(".version-ball").removeClass("green-bkg"), 
e.find(".current-version-ball").removeClass("green-bkg"), $(ev.currentTarget).hasClass("green-bkg") || $(ev.currentTarget).addClass("green-bkg"), 
that = _this, _this._showLoading("Looking up cloud for buffer #" + version_seq + "... "), 
_this.versionGetXhr && void 0 === _this.versionGetXhr.status && _this.versionGetXhr.abort(), 
_this.versionGetXhr = $.ajax({
url:_this.options.versioningRestUrl,
type:"GET",
data:{
version_id:version_id
},
success:function(data) {
return that.setValue({
code:data.source,
language:data.language
}), that.codeEditor.setOption("readOnly", !0), $(that.element).find(".dummy-lang-container").html(that.options.lang_display_mapping[data.language]).show(), 
$(that.element).find("#select-lang").siblings(".select2-container").hide(), that._hideLoading(), 
that.ActiveVersionId = version_id, that.element.find(".delete-active-version").show();
}
});
};
}(this));
},
_addNewVersion:function(version_id) {
var prev;
return -1 === _.indexOf(this.options.versionIds, version_id) ? (this.options.versionIds.push(version_id), 
this.options.versionIds = _.sortBy(this.options.versionIds, function(num) {
return num;
}), prev = null, _.each(this.options.versionIds, function(version_id) {
var $el;
return 0 === this.element.find(".version-ball[data-version-id=" + version_id + "]").length && ($el = null !== prev ? this.element.find(".version-ball[data-version-id=" + prev + "]") :this.element.find(".start-slab"), 
$el.after("<div class='version-ball pull-left cursor' data-version-id='" + version_id + "'></div>"), 
this._bindVersionBall()), prev = version_id;
}, this)) :void 0;
},
_updateStatusBar:function() {
var modeText;
return modeText = function() {
switch (this.codeEditor.options.keyMap) {
case "vim":
return "--VIM--";

case "vim-insert":
return "-- INSERT --";

case "emacs":
return "EMACS";

case "emacs-Ctrl-X":
return "C-x-";

default:
return "";
}
}.call(this), $(this.element).find("#statusbar-mode").text(modeText);
},
_updateStatusPosition:function(e) {
var pos, start_line;
return pos = e.doc.getCursor(), start_line = e.getOption("firstLineNumber"), e = $(this.element), 
e.find("#statusbar-line").text("Line: " + (pos.line + start_line)), e.find("#statusbar-col").text("Col: " + (pos.ch + 1));
},
_getThemeName:function(slug) {
return "dark" === slug ? "ambiance" :"default";
},
_changeTheme:function(editor_theme) {
return null == editor_theme && (editor_theme = null), editor_theme || (editor_theme = $.cookie("hacker_editor_theme")), 
"dark" !== editor_theme && "light" !== editor_theme && (editor_theme = "light"), 
$.cookie("hacker_editor_theme", editor_theme), this.element.find("select#editor-theme option[value=" + editor_theme + "]").attr("selected", !0), 
this.codeEditor.setOption("theme", this._getThemeName(editor_theme)), this.codeEditor.refresh();
},
_setTabSize:function(size) {
return size = parseInt(size), _.isNumber(size) && !_.isNaN(size) && this.codeEditor.options.tabSize !== size ? (this._saveUserOpts({
tabSize:size,
indentUnit:size
}), this.codeEditor.setOption("tabSize", size), this.codeEditor.setOption("indentUnit", size)) :void 0;
},
_parseJson:function(data, customRendering) {
var retHintValues, that;
return retHintValues = [], that = this, $.each(data, function(index, data) {
var autoCompleteObject;
autoCompleteObject = {}, autoCompleteObject.text = data.completion, "" === data.type && (data.type = " "), 
autoCompleteObject.displayText = data.menu, autoCompleteObject.type = data.type, 
autoCompleteObject.completion = data.completion, autoCompleteObject.menu = data.menu, 
autoCompleteObject.info = data.info, customRendering === !0 && (autoCompleteObject.render = function(elt, self, data) {
var divCompletionText, divMenuText, divTypeText;
(" " === data.type || "" === data.type) && (data.type = "(" === data.completion[data.completion.length - 1] || ")" === data.completion[data.completion.length - 1] ? "f" :"v"), 
"(" === data.completion[data.completion.length - 1] && (data.completion += ")"), 
divTypeText = document.createElement("DIV"), divTypeText.className = "CodeMirror-hint-divTypeText", 
divTypeText.appendChild(document.createTextNode(data.type)), divCompletionText = document.createElement("DIV"), 
divCompletionText.className = "CodeMirror-hint-divCompletionText", divCompletionText.appendChild(document.createTextNode(" " + data.completion + " ")), 
divMenuText = document.createElement("DIV"), divMenuText.className = "CodeMirror-hint-divMenuText", 
divMenuText.appendChild(document.createTextNode(data.menu + " ")), elt.appendChild(divTypeText), 
elt.appendChild(divCompletionText), elt.appendChild(divMenuText), elt.style.display = "table-row";
}), retHintValues.push(autoCompleteObject);
}), retHintValues;
},
_updateLoadingMessage:function(cm, retHintValues) {
var noKeyPress, options;
noKeyPress = !0, options = {
completeSingle:!1,
hint:function(cm) {
var inner;
return noKeyPress === !0 ? noKeyPress = !1 :retHintValues = [], inner = {
from:cm.getCursor(),
to:cm.getCursor(),
list:[]
}, inner.list = retHintValues, inner;
}
}, CodeMirror.showHint(cm, options.hint, options);
},
_cleanToken:function(token) {
var charCode, iterateToken;
for (iterateToken = 0; iterateToken < token.length && (charCode = token.charCodeAt(iterateToken), 
!(charCode > 47 && 58 > charCode || charCode > 64 && 91 > charCode || charCode > 96 && 123 > charCode || "_" === token[iterateToken])); ) iterateToken++;
return token = token.substr(iterateToken);
},
_filterSuggestions:function(list, token) {
var found, iterateList, matched, ptrToken, ptrWord, word;
for (token = token.toLowerCase(), found = [], iterateList = 0; iterateList < list.length; ) {
for (word = list[iterateList].text.toLowerCase(), matched = 1, ptrWord = 0, ptrToken = 0; ptrToken < token.length; ) {
for (;word[ptrWord] !== token[ptrToken] && ptrWord < word.length; ) ptrWord++;
if (ptrWord === word.length) {
matched = 0;
break;
}
ptrToken++;
}
1 === matched && found.push(list[iterateList]), iterateList++;
}
return found;
},
_adjustHeightSuggestionBox:function(hints) {
var adjustTop, box, cm, ele, height, hintsTop, newTop, pos, winH, winW;
cm = this.codeEditor, pos = cm.cursorCoords(cm.getCursor()), winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth), 
winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight), 
box = hints.getBoundingClientRect(), ele = $("#CodeMirror-hint-infoDiv")[0], adjustTop = ele.offsetHeight, 
height = box.bottom + adjustTop - box.top, height > winH ? (hints.style.height = winH - 5 - adjustTop + "px", 
newTop = parseInt(hints.style.top.substr(0, hints.style.top.length - 2), 10), newTop += winH - 5 - adjustTop, 
$(ele).css("top", newTop + "px")) :(hintsTop = parseInt(hints.style.top.substr(0, hints.style.top.length - 2), 10), 
hintsTop < pos.top && hintsTop + (box.bottom - box.top) + adjustTop !== pos.top && (hints.style.top = pos.top - adjustTop - (box.bottom - box.top) + "px", 
newTop = pos.top - adjustTop, $(ele).css("top", newTop + "px")));
},
_adjustWidthSuggestionBox:function(hints) {
var box, cm, editor, pos;
cm = this.codeEditor, pos = cm.cursorCoords(cm.getCursor()), box = hints.getBoundingClientRect(), 
editor = cm.display.wrapper, editor.offsetWidth > box.width ? editor.offsetLeft + editor.offsetWidth >= box.right ? hints.style.width = box.width :(hints.style.width = box.width, 
hints.style.left = pos.left - (box.right - (editor.offsetLeft + editor.offsetWidth)) - 5 + "px") :(hints.style.left = editor.offsetLeft + "px", 
hints.style.width = editor.offsetWidth + "px");
},
_setMaxWidthCompletionText:function(hints) {
var curWidth, divCompletionText, iterateDivs, maxWidth, obj, startWidth;
if (divCompletionText = hints.getElementsByClassName("CodeMirror-hint-divCompletionText"), 
divCompletionText.length > 0) for (iterateDivs = divCompletionText.length - 1; iterateDivs >= 0; ) obj = divCompletionText[iterateDivs], 
maxWidth = void 0, startWidth = void 0, maxWidth = hints.style.width, maxWidth = parseInt(maxWidth.substr(0, maxWidth.length - 2)), 
curWidth = obj.offsetWidth, curWidth > maxWidth && (curWidth = maxWidth - 40, obj.style.maxWidth = curWidth + "px", 
obj.style.textOverflow = "ellipsis"), iterateDivs--;
},
_setMaxWidthMenuText:function(hints) {
var divMenuText, iterateDivs, obj, reqdWidth, startWidth;
if (divMenuText = hints.getElementsByClassName("CodeMirror-hint-divMenuText"), divMenuText.length > 0) for (iterateDivs = divMenuText.length - 1; iterateDivs >= 0; ) obj = divMenuText[iterateDivs], 
reqdWidth = hints.style.width, reqdWidth = parseInt(reqdWidth.substr(0, reqdWidth.length - 2)), 
startWidth = obj.offsetLeft, reqdWidth -= startWidth, obj.style.maxWidth = reqdWidth - 20 + "px", 
iterateDivs--;
},
_removeShowHintWidget:function(cm) {
this._updateSuggestions(cm, []);
},
_updateSuggestions:function(cm, retHintValues) {
var options, tempRetHintValues, that;
tempRetHintValues = retHintValues, that = this, options = {
completeSingle:!1,
hint:function(cm) {
var inner, token;
return retHintValues = tempRetHintValues, token = cm.getTokenAt(cm.getCursor()).string, 
token = that._cleanToken(token), token.length > 0 && (retHintValues = that._filterSuggestions(retHintValues, token)), 
inner = {
from:cm.getCursor(),
to:cm.getCursor(),
list:[]
}, inner.list = retHintValues, CodeMirror.on(inner, "shown", function() {
that._suggestionBoxDisplayStatus = !0;
}), CodeMirror.on(inner, "close", function() {
$("#CodeMirror-hint-infoDiv").remove(), that._suggestionBoxDisplayStatus = !1;
}), CodeMirror.on(inner, "select", function(completion, elt) {
var adjustTop, infoDiv, infoDivInfo, infoDivMenu;
that._adjustWidthSuggestionBox($(".CodeMirror-hints")[0]), that._setMaxWidthMenuText($(".CodeMirror-hints")[0]), 
that._setMaxWidthCompletionText($(".CodeMirror-hints")[0]), (completion.menu.length > 0 || completion.info.length > 0) && (completion.info === completion.menu && (completion.info = ""), 
$("#CodeMirror-hint-infoDiv").length > 0 ? ($("#CodeMirror-hint-infoDivMenu").text(completion.menu), 
$("#CodeMirror-hint-infoDivInfo").text(completion.info), $("#CodeMirror-hint-infoDiv").css("width", $(elt).parent().css("width")), 
$("#CodeMirror-hint-infoDiv").css("left", $(elt).parent().css("left")), adjustTop = parseInt($(elt).parent().css("top").substr(0, $(elt).parent().css("top").length - 2), 10), 
adjustTop += parseInt($(elt).parent().css("height").substr(0, $(elt).parent().css("height").length - 2), 10), 
$("#CodeMirror-hint-infoDiv").css("top", adjustTop + "px")) :(infoDiv = document.createElement("ul"), 
infoDiv.id = "CodeMirror-hint-infoDiv", $(elt.parentNode.parentNode).append($(infoDiv)), 
$(infoDiv).css("width", $(elt).parent().css("width")), $(infoDiv).css("left", $(elt).parent().css("left")), 
adjustTop = parseInt($(elt).parent().css("top").substr(0, $(elt).parent().css("top").length - 2), 10), 
adjustTop += parseInt($(elt).parent().css("height").substr(0, $(elt).parent().css("height").length - 2), 10), 
$(infoDiv).css("top", adjustTop + "px"), infoDivMenu = document.createElement("span"), 
infoDivMenu.id = "CodeMirror-hint-infoDivMenu", $(infoDivMenu).css("color", "blue"), 
$(infoDivMenu).text(completion.menu), infoDivInfo = document.createElement("span"), 
infoDivInfo.id = "CodeMirror-hint-infoDivInfo", $(infoDivInfo).css("color", "#D757FA"), 
$(infoDivInfo).text(completion.info), $(infoDiv).append($(infoDivMenu)), $(infoDiv).append($(infoDivInfo)))), 
that._adjustHeightSuggestionBox($(".CodeMirror-hints")[0]);
}), CodeMirror.on(inner, "pick", function() {
var startPoint, tempInnerEnd, tempInnerStart;
startPoint = inner.to.ch - token.length, tempInnerStart = {}, tempInnerStart.line = inner.from.line, 
tempInnerStart.ch = startPoint, tempInnerEnd = {}, tempInnerEnd.line = inner.to.line, 
tempInnerEnd.ch = inner.to.ch, cm.replaceRange("", tempInnerStart, tempInnerEnd);
}), inner;
}
}, CodeMirror.showHint(cm, options.hint, options);
},
_getLoadingData:function() {
var data;
return data = [], data.push({
type:"",
completion:"",
menu:"Loading hints...   ",
info:""
}), data;
},
_showAutoCompleteLoadingMsg:function(cm) {
var data, retHintValues;
data = this._getLoadingData(), retHintValues = this._parseJson(data, !1), this._updateLoadingMessage(cm, retHintValues);
},
_enableIntellisenseFunc:function(cm) {
var data, e, language, retHintValues, that;
return e = $(this.element), e.find("#auto-complete").prop("checked") !== !1 && (language = this.options.language, 
"java" === language || "cpp" === language || "c" === language || "ruby" === language) ? (this._autoCompleteReqestStatus = !0, 
data = this._getFullCodeOffsetLanguage(cm), retHintValues = [], that = this, $.ajax({
type:"POST",
url:"https://autocomplete.hackerrank.com/saveRun",
data:data,
dataType:"json",
success:function(data) {
return data.msg ? (console.log("No suggestions obtained - error"), that._removeShowHintWidget(cm), 
void 0) :(that._autoCompleteReqestStatus === !0 && (retHintValues = that._parseJson(data, !0), 
that._updateSuggestions(cm, retHintValues)), void 0);
}
})) :void 0;
},
_getFullCodeOffsetLanguage:function(cm) {
var autoCompleteInfo, code, headCode, language, lineCh, lineNum, offset, tailCode;
for (language = this.options.language, code = "", headCode = this._getLangHeadCode(language), 
0 !== headCode.length && (code += headCode), code += "\n", offset = code.length, 
lineCh = cm.getCursor(), lineNum = 0; lineNum < lineCh.line; ) offset += cm.getLine(lineNum).length + 1, 
lineNum++;
return offset += lineCh.ch, code += cm.getValue(), code += "\n", tailCode = this._getLangTailCode(language), 
0 !== tailCode.length && (code += tailCode), code += "\n", autoCompleteInfo = {
code:code,
offset:offset,
fileType:language
};
},
_initCodeEditor:function(t, readOnly) {
var e, opts, sel, that, _ref;
return null == readOnly && (readOnly = !1), opts = this._getUserOpts(), e = $(this.element), 
e.find(".editor-mode-button[data-editor=" + opts.keyMap + "]").addClass("disabled"), 
sel = e.find("#select-lang"), sel.select2({
width:"off"
}), this._initAutoSave(), opts.userPreferredLang && (_ref = opts.userPreferredLang, 
__indexOf.call(this.options.languages, _ref) >= 0) ? (sel.select2("val", opts.userPreferredLang), 
opts.mode = this.options.lang_mime_mapping[opts.userPreferredLang]) :(sel.select2("val", this.options.language), 
opts.mode = this.options.lang_mime_mapping[this.options.language]), that = this, 
this.options.enableIntellisense && "emacs" !== opts.keyMap && (opts.extraKeys["Ctrl-Space"] = function(cm) {
that._showAutoCompleteLoadingMsg(cm), that._enableIntellisenseFunc(cm);
}), opts.readOnly = readOnly, CodeMirror.fromTextArea(t, opts);
},
_changeLanguage:function(e) {
return this.changeLanguage($(e.currentTarget).select2("val"));
},
changeLanguage:function(lang, cb) {
return null == cb && (cb = null), null !== lang ? (this.newLanguage = lang, this.options.dynamicMode ? (this._showLoading(), 
this._trigger("loadmode", {}, {
lang:lang,
callback:function(_this) {
return function() {
return _this._changeMode(cb);
};
}(this)
})) :this._changeMode(cb)) :void 0;
},
_showLoading:function(msg) {
return null == msg && (msg = "Loading Editor... "), $(this.element).find(".code-body, .code-head, .code-tail").hide(), 
$(this.element).find(".loading-mode").html(msg).show();
},
_hideLoading:function() {
return $(this.element).find(".code-body, .code-head, .code-tail").show(), $(this.element).find(".loading-mode").hide();
},
_changeMode:function(cb) {
var from, lang, sel;
return null == cb && (cb = null), this._hideLoading(), lang = this.newLanguage, 
from = this.options.language, this.options.language = lang, this.codeEditor.setValue(this._getLangCode(lang)), 
this._foldCode(), this.options.showNonEditableHeadTail && this._displayHeadAndTail(lang), 
this._saveUserOpts({
userPreferredLang:lang
}), this.codeEditor.setOption("mode", this.options.lang_mime_mapping[lang]), this.options.showNonEditableHeadTail === !1 && this._setMainEditorLineNumber(lang), 
sel = $(this.element).find("#select-lang"), sel.select2("val", lang), this.codeEditor.clearHistory(), 
this._trigger("languagechange", {}, {
from:from,
to:lang
}), null !== cb ? cb() :void 0;
},
_saveCode:function(e) {
return e.preventDefault(), this.options.onSave ? this.options.onSave() :void 0;
},
_initAutoSave:function() {
var callback, timeout;
return this.options.autoSave && this.options.onSave ? (timeout = parseInt(this.options.autoSave, 10), 
callback = this.options.onSave, this._autoSaveCode(timeout, callback)) :void 0;
},
_autoSaveCode:function(timeout, callback) {
return callback(), setInterval(this._autoSaveCode, timeout, timeout, callback);
},
_setEditorMode:function(e) {
var mode, that;
return mode = $(e.currentTarget).attr("data-editor"), $(e.currentTarget).parent().find(".editor-mode-button").removeClass("disabled"), 
$(e.currentTarget).addClass("disabled"), this.codeEditor.setOption("keyMap", mode), 
that = this, "emacs" === mode ? delete this.codeEditor.options.extraKeys["Ctrl-Space"] :this.codeEditor.options.extraKeys["Ctrl-Space"] = function(cm) {
that._showAutoCompleteLoadingMsg(cm), that._enableIntellisenseFunc(cm);
}, this._focusEditor(e), this._saveUserOpts({
keyMap:mode
});
},
_focusEditor:function() {
return this.codeEditor.focus();
},
_getDefaultLangCode:function(l) {
var body, head, tail, _stripTabs, _suffix_new_line;
if (this.options.showTemplate && !this.options.showNonEditableHeadTail) {
if (void 0 !== this.options.lang_head_template[l] || void 0 !== this.options.lang_body_template[l] || void 0 !== this.options.lang_tail_template[l] || void 0 !== this.options.lang_template[l]) return _stripTabs = function(string) {
var spaces, tab;
return spaces = new Array(4).join(" "), tab = "	", void 0 === string ? "" :string.split(tab).join(spaces);
}, _suffix_new_line = function(string) {
return string && -1 === string.indexOf("\n", string.length - 1) ? "" + string + "\n" :string;
}, head = _suffix_new_line(_stripTabs(this.options.lang_head_template[l] || "")), 
body = _suffix_new_line(_stripTabs(this.options.lang_template[l] || this.options.lang_body_template[l] || "")), 
tail = _suffix_new_line(_stripTabs(this.options.lang_tail_template[l] || "")), "" + head + body + tail;
} else if (this.options.lang_template[l] || this.options.lang_body_template[l] || this.options.lang_default_text[l]) return this.options.lang_template[l] || this.options.lang_body_template[l] || this.options.lang_default_text[l];
return "";
},
_getLangCode:function(l) {
var val;
return this.options.autoSaveNamespace && (val = $.jStorage.get(this.getCurrentAutosavekey(l)), 
val && !$.jStorage.get("" + this.getCurrentAutosavekey(l) + "-default_template")) ? val :this._getDefaultLangCode(l);
},
_getLangHeadCode:function(l) {
return this.options.lang_head_template[l] ? this.options.lang_head_template[l] :"";
},
_getLangTailCode:function(l) {
return this.options.lang_tail_template[l] ? this.options.lang_tail_template[l] :"";
},
_displayHeadAndTail:function(l) {
var e, head_editor_lines, head_height;
return e = $(this.element), 0 !== this._getLangHeadCode(l).length ? (this.codeEditorHead.setValue(this._getLangHeadCode(l)), 
head_editor_lines = this.codeEditorHead.getValue().split("\n").length, this.codeEditor.setOption("firstLineNumber", head_editor_lines + 1), 
this.codeEditorHead.setOption("mode", this.options.lang_mime_mapping[l])) :e.find(".code-head").hide(), 
0 !== this._getLangTailCode(l).length ? (this.codeEditorTail.setValue(this._getLangTailCode(l)), 
this._updateTailEditorLineNumber(), this.codeEditorTail.setOption("mode", this.options.lang_mime_mapping[l])) :e.find(".code-tail").hide(), 
head_height = e.find(".code-head").height(), e.find(".code-editors").scrollTop(head_height - 60);
},
_updateTailEditorLineNumber:function() {
var head_editor_lines, main_editor_lines;
return head_editor_lines = this.codeEditorHead.getValue().split("\n").length, main_editor_lines = this.codeEditor.getValue().split("\n").length, 
this.codeEditorTail.setOption("firstLineNumber", head_editor_lines + main_editor_lines + 1);
},
_setMainEditorLineNumber:function(l) {
return this.options.lang_line_nos && this.options.lang_line_nos[l] ? this.codeEditor.setOption("firstLineNumber", this.options.lang_line_nos[l]) :this.codeEditor.setOption("firstLineNumber", 1);
},
_growEditor:function() {
var main_editor_height;
return main_editor_height = this.element.find(".code-body").height(), 300 > main_editor_height && (main_editor_height = 300), 
this.element.find(".code-editors").css("max-height", "" + (main_editor_height + 110) + "px");
},
_saveLangCode:function() {
var d, saveObject, that;
return void 0 === this.ActiveVersionId || null === this.ActiveVersionId ? (d = new Date(), 
saveObject = "" + this.options.language + d.getHours() + d.getMinutes(), window[saveObject] && clearTimeout(window[saveObject]), 
that = this, window[saveObject] = setTimeout(function() {
return that.saveLangCode();
}, 3e3)) :void 0;
},
saveLangCode:function() {
var code, key, opts;
return void 0 !== this.ActiveVersionId && null !== this.ActiveVersionId || (opts = this.options, 
!opts.autoSaveNamespace || opts.lang_mime_mapping[opts.language] !== this.codeEditor.options.mode) ? void 0 :(key = this.getCurrentAutosavekey(), 
code = this.codeEditor.getValue(), $.jStorage.set("" + key + "-default_template", this._getDefaultLangCode(opts.language) === code || this.options.lang_default_text[opts.language] === code), 
$.jStorage.set(key, code));
},
getCurrentAutosavekey:function(l) {
var opts;
return null == l && (l = null), opts = this.options, null === l && (l = opts.language), 
opts.autoSaveNamespace && opts.language ? "" + opts.autoSaveNamespace + "-" + l :"";
},
_getUserOpts:function() {
var a, forced_opts;
return a = {
lineNumbers:!0,
lineWrapping:!0,
styleActiveLine:!0,
autoCloseBrackets:!0,
autoCloseTags:!0,
indentWithTabs:!1,
matchBrackets:!0,
keyMap:"default",
userPreferredLang:null,
indentUnit:4
}, forced_opts = {
extraKeys:{
Tab:function(cm) {
var characterAt, offset, spaces;
return characterAt = cm.coordsChar(cm.cursorCoords()).ch, offset = characterAt % cm.getOption("indentUnit"), 
spaces = Array(cm.getOption("indentUnit") + 1 - offset).join(" "), cm.replaceSelection(spaces, "end", "+input");
}
},
foldGutter:!0,
gutters:[ "CodeMirror-linenumbers", "CodeMirror-foldgutter" ]
}, $.extend($.extend(a, $.parseJSON($.jStorage.get("codeshellUserOpts"))), forced_opts);
},
_saveUserOpts:function(opts) {
var a;
return a = $.extend(this._getUserOpts(), opts), $.jStorage.set("codeshellUserOpts", JSON.stringify(a));
},
value:function(getall) {
var allCode;
return null == getall && (getall = !1), getall ? (allCode = [], _.each(this.options.languages, function(_this) {
return function(lang) {
return lang === _this.options.language ? allCode.push(_this.value()) :allCode.push({
code:_this._getLangCode(lang),
language:lang
});
};
}(this)), allCode) :{
code:this.codeEditor.getValue(),
language:this.options.language
};
},
_foldCode:function() {
var added_head, added_tail, clbk_head, clbk_tail, code, line, line_ctr, lines, _i, _len, _results;
if (this.options.foldCode) {
for (code = this.codeEditor.getValue(), line_ctr = 0, added_head = !1, added_tail = !1, 
lines = (code || "").split("\n"), _results = [], _i = 0, _len = lines.length; _len > _i; _i++) line = lines[_i], 
line_ctr += 1, added_head || added_tail || -1 === line.indexOf("Head ends") || (clbk_head = function() {
return {
from:{
ch:0,
line:0
},
to:{
ch:0,
line:line_ctr
}
};
}, CodeMirror.newFoldFunction(clbk_head)(this.codeEditor, {}), added_head = !0), 
added_tail || -1 === line.indexOf("Tail starts") ? _results.push(void 0) :(clbk_tail = function() {
return {
from:{
ch:0,
line:line_ctr - 1
},
to:{
ch:0,
line:lines.length
}
};
}, CodeMirror.newFoldFunction(clbk_tail)(this.codeEditor, {}), _results.push(added_tail = !0));
return _results;
}
},
setValue:function(opts) {
return opts.language ? this.changeLanguage(opts.language, function(_this) {
return function() {
return opts.code ? (_this.codeEditor.setValue(opts.code), _this._foldCode()) :void 0;
};
}(this)) :void 0;
},
setValueorFork:function(opts) {
var that;
return that = this, opts.language && window.HR.forkable === !0 ? this.changeLanguage(opts.language, function() {
var _ref;
return opts.code ? ($.jStorage.get("" + that.getCurrentAutosavekey(opts.language)) && (_ref = that.value().code) !== opts.code && "" !== _ref && _ref !== that._getDefaultLangCode(opts.language) && _ref !== that.options.lang_default_text[opts.language] && window.HR.forkable === !0 && (window.HR.forkable = !1, 
that._forkNewBuffer(opts)), that.setValue(opts), that._foldCode()) :void 0;
}) :void 0;
},
refresh:function() {
return setTimeout(function(_this) {
return function() {
return _this.codeEditor.refresh();
};
}(this), 25), this.options.showNonEditableHeadTail ? (setTimeout(function(_this) {
return function() {
return _this.codeEditorHead.refresh();
};
}(this), 25), setTimeout(function(_this) {
return function() {
return _this.codeEditorTail.refresh();
};
}(this), 25)) :void 0;
},
onChange:function(callback) {
return null !== callback ? this.codeEditor.on("change", callback) :void 0;
},
setOption:function(key, value) {
return this.codeEditor.setOption(key, value);
},
getOptions:function() {
return this.options;
},
setStatusText:function(t) {
return null == t && (t = ""), this.options.statusText = t, $(this.element).find("#status-text").html(_.escape(t));
},
deleteLangCode:function() {
var key, opts;
return opts = this.options, opts.autoSaveNamespace && opts.lang_mime_mapping[opts.language] === this.codeEditor.options.mode ? (key = "" + opts.autoSaveNamespace + "-" + opts.language, 
$.jStorage.deleteKey(key)) :void 0;
},
enableCompileBtn:function() {
var $btn;
return $btn = $(this.element).find("button.bb-compile"), $btn.removeAttr("btn-disabled").removeClass("disabled");
},
getEditor:function() {
return this.codeEditor;
},
destroy:function() {
return this._saveLangCode(this), $.Widget.prototype.destroy.call(this);
}
});
});
}.call(this);

var requirejs = _requirejs;

_requirejs = void 0;

var require = _require;

_require = void 0;

var define = _define;

_define = void 0;