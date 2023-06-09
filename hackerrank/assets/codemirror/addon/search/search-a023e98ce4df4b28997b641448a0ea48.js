// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("./searchcursor"), require("../dialog/dialog")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "./searchcursor", "../dialog/dialog" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function searchOverlay(query, caseInsensitive) {
return "string" == typeof query ? query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), caseInsensitive ? "gi" :"g") :query.global || (query = new RegExp(query.source, query.ignoreCase ? "gi" :"g")), 
{
token:function(stream) {
query.lastIndex = stream.pos;
var match = query.exec(stream.string);
return match && match.index == stream.pos ? (stream.pos += match[0].length, "searching") :(match ? stream.pos = match.index :stream.skipToEnd(), 
void 0);
}
};
}
function SearchState() {
this.posFrom = this.posTo = this.query = null, this.overlay = null;
}
function getSearchState(cm) {
return cm.state.search || (cm.state.search = new SearchState());
}
function queryCaseInsensitive(query) {
return "string" == typeof query && query == query.toLowerCase();
}
function getSearchCursor(cm, query, pos) {
return cm.getSearchCursor(query, pos, queryCaseInsensitive(query));
}
function dialog(cm, text, shortText, deflt, f) {
cm.openDialog ? cm.openDialog(text, f, {
value:deflt
}) :f(prompt(shortText, deflt));
}
function confirmDialog(cm, text, shortText, fs) {
cm.openConfirm ? cm.openConfirm(text, fs) :confirm(shortText) && fs[0]();
}
function parseQuery(query) {
var isRE = query.match(/^\/(.*)\/([a-z]*)$/);
return isRE ? (query = new RegExp(isRE[1], -1 == isRE[2].indexOf("i") ? "" :"i"), 
query.test("") && (query = /x^/)) :"" == query && (query = /x^/), query;
}
function doSearch(cm, rev) {
var state = getSearchState(cm);
return state.query ? findNext(cm, rev) :(dialog(cm, queryDialog, "Search for:", cm.getSelection(), function(query) {
cm.operation(function() {
query && !state.query && (state.query = parseQuery(query), cm.removeOverlay(state.overlay, queryCaseInsensitive(state.query)), 
state.overlay = searchOverlay(state.query, queryCaseInsensitive(state.query)), cm.addOverlay(state.overlay), 
state.posFrom = state.posTo = cm.getCursor(), findNext(cm, rev));
});
}), void 0);
}
function findNext(cm, rev) {
cm.operation(function() {
var state = getSearchState(cm), cursor = getSearchCursor(cm, state.query, rev ? state.posFrom :state.posTo);
(cursor.find(rev) || (cursor = getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) :CodeMirror.Pos(cm.firstLine(), 0)), 
cursor.find(rev))) && (cm.setSelection(cursor.from(), cursor.to()), cm.scrollIntoView({
from:cursor.from(),
to:cursor.to()
}), state.posFrom = cursor.from(), state.posTo = cursor.to());
});
}
function clearSearch(cm) {
cm.operation(function() {
var state = getSearchState(cm);
state.query && (state.query = null, cm.removeOverlay(state.overlay));
});
}
function replace(cm, all) {
dialog(cm, replaceQueryDialog, "Replace:", cm.getSelection(), function(query) {
query && (query = parseQuery(query), dialog(cm, replacementQueryDialog, "Replace with:", "", function(text) {
if (all) cm.operation(function() {
for (var cursor = getSearchCursor(cm, query); cursor.findNext(); ) if ("string" != typeof query) {
var match = cm.getRange(cursor.from(), cursor.to()).match(query);
cursor.replace(text.replace(/\$(\d)/g, function(_, i) {
return match[i];
}));
} else cursor.replace(text);
}); else {
clearSearch(cm);
var cursor = getSearchCursor(cm, query, cm.getCursor()), advance = function() {
var match, start = cursor.from();
!(match = cursor.findNext()) && (cursor = getSearchCursor(cm, query), !(match = cursor.findNext()) || start && cursor.from().line == start.line && cursor.from().ch == start.ch) || (cm.setSelection(cursor.from(), cursor.to()), 
cm.scrollIntoView({
from:cursor.from(),
to:cursor.to()
}), confirmDialog(cm, doReplaceConfirm, "Replace?", [ function() {
doReplace(match);
}, advance ]));
}, doReplace = function(match) {
cursor.replace("string" == typeof query ? text :text.replace(/\$(\d)/g, function(_, i) {
return match[i];
})), advance();
};
advance();
}
}));
});
}
var queryDialog = 'Search: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>', replaceQueryDialog = 'Replace: <input type="text" style="width: 10em"/> <span style="color: #888">(Use /re/ syntax for regexp search)</span>', replacementQueryDialog = 'With: <input type="text" style="width: 10em"/>', doReplaceConfirm = "Replace? <button>Yes</button> <button>No</button> <button>Stop</button>";
CodeMirror.commands.find = function(cm) {
clearSearch(cm), doSearch(cm);
}, CodeMirror.commands.findNext = doSearch, CodeMirror.commands.findPrev = function(cm) {
doSearch(cm, !0);
}, CodeMirror.commands.clearSearch = clearSearch, CodeMirror.commands.replace = replace, 
CodeMirror.commands.replaceAll = function(cm) {
replace(cm, !0);
};
});