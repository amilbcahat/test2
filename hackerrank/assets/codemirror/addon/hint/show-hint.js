// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
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
});