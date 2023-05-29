// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../fold/xml-fold")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../fold/xml-fold" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function clear(cm) {
cm.state.tagHit && cm.state.tagHit.clear(), cm.state.tagOther && cm.state.tagOther.clear(), 
cm.state.tagHit = cm.state.tagOther = null;
}
function doMatchTags(cm) {
cm.state.failedTagMatch = !1, cm.operation(function() {
if (clear(cm), !cm.somethingSelected()) {
var cur = cm.getCursor(), range = cm.getViewport();
range.from = Math.min(range.from, cur.line), range.to = Math.max(cur.line + 1, range.to);
var match = CodeMirror.findMatchingTag(cm, cur, range);
if (match) {
if (cm.state.matchBothTags) {
var hit = "open" == match.at ? match.open :match.close;
hit && (cm.state.tagHit = cm.markText(hit.from, hit.to, {
className:"CodeMirror-matchingtag"
}));
}
var other = "close" == match.at ? match.open :match.close;
other ? cm.state.tagOther = cm.markText(other.from, other.to, {
className:"CodeMirror-matchingtag"
}) :cm.state.failedTagMatch = !0;
}
}
});
}
function maybeUpdateMatch(cm) {
cm.state.failedTagMatch && doMatchTags(cm);
}
CodeMirror.defineOption("matchTags", !1, function(cm, val, old) {
old && old != CodeMirror.Init && (cm.off("cursorActivity", doMatchTags), cm.off("viewportChange", maybeUpdateMatch), 
clear(cm)), val && (cm.state.matchBothTags = "object" == typeof val && val.bothTags, 
cm.on("cursorActivity", doMatchTags), cm.on("viewportChange", maybeUpdateMatch), 
doMatchTags(cm));
}), CodeMirror.commands.toMatchingTag = function(cm) {
var found = CodeMirror.findMatchingTag(cm, cm.getCursor());
if (found) {
var other = "close" == found.at ? found.open :found.close;
other && cm.extendSelection(other.to, other.from);
}
};
});