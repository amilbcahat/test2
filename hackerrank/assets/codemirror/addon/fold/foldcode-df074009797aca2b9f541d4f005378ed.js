// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
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