// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
function continueComment(cm) {
if (cm.getOption("disableInput")) return CodeMirror.Pass;
for (var mode, ranges = cm.listSelections(), inserts = [], i = 0; i < ranges.length; i++) {
var pos = ranges[i].head, token = cm.getTokenAt(pos);
if ("comment" != token.type) return CodeMirror.Pass;
var modeHere = CodeMirror.innerMode(cm.getMode(), token.state).mode;
if (mode) {
if (mode != modeHere) return CodeMirror.Pass;
} else mode = modeHere;
var insert = null;
if (mode.blockCommentStart && mode.blockCommentContinue) {
var found, end = token.string.indexOf(mode.blockCommentEnd), full = cm.getRange(CodeMirror.Pos(pos.line, 0), CodeMirror.Pos(pos.line, token.end));
if (-1 != end && end == token.string.length - mode.blockCommentEnd.length && pos.ch >= end) ; else if (0 == token.string.indexOf(mode.blockCommentStart)) {
if (insert = full.slice(0, token.start), !/^\s*$/.test(insert)) {
insert = "";
for (var j = 0; j < token.start; ++j) insert += " ";
}
} else -1 != (found = full.indexOf(mode.blockCommentContinue)) && found + mode.blockCommentContinue.length > token.start && /^\s*$/.test(full.slice(0, found)) && (insert = full.slice(0, found));
null != insert && (insert += mode.blockCommentContinue);
}
if (null == insert && mode.lineComment && continueLineCommentEnabled(cm)) {
var line = cm.getLine(pos.line), found = line.indexOf(mode.lineComment);
found > -1 && (insert = line.slice(0, found), /\S/.test(insert) ? insert = null :insert += mode.lineComment + line.slice(found + mode.lineComment.length).match(/^\s*/)[0]);
}
if (null == insert) return CodeMirror.Pass;
inserts[i] = "\n" + insert;
}
cm.operation(function() {
for (var i = ranges.length - 1; i >= 0; i--) cm.replaceRange(inserts[i], ranges[i].from(), ranges[i].to(), "+insert");
});
}
function continueLineCommentEnabled(cm) {
var opt = cm.getOption("continueComments");
return opt && "object" == typeof opt ? opt.continueLineComment !== !1 :!0;
}
for (var modes = [ "clike", "css", "javascript" ], i = 0; i < modes.length; ++i) CodeMirror.extendMode(modes[i], {
blockCommentContinue:" * "
});
CodeMirror.defineOption("continueComments", null, function(cm, val, prev) {
if (prev && prev != CodeMirror.Init && cm.removeKeyMap("continueComment"), val) {
var key = "Enter";
"string" == typeof val ? key = val :"object" == typeof val && val.key && (key = val.key);
var map = {
name:"continueComment"
};
map[key] = continueComment, cm.addKeyMap(map);
}
});
});