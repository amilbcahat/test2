// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror"), require("../fold/xml-fold")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror", "../fold/xml-fold" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
function autoCloseGT(cm) {
if (cm.getOption("disableInput")) return CodeMirror.Pass;
for (var ranges = cm.listSelections(), replacements = [], i = 0; i < ranges.length; i++) {
if (!ranges[i].empty()) return CodeMirror.Pass;
var pos = ranges[i].head, tok = cm.getTokenAt(pos), inner = CodeMirror.innerMode(cm.getMode(), tok.state), state = inner.state;
if ("xml" != inner.mode.name || !state.tagName) return CodeMirror.Pass;
var opt = cm.getOption("autoCloseTags"), html = "html" == inner.mode.configuration, dontCloseTags = "object" == typeof opt && opt.dontCloseTags || html && htmlDontClose, indentTags = "object" == typeof opt && opt.indentTags || html && htmlIndent, tagName = state.tagName;
tok.end > pos.ch && (tagName = tagName.slice(0, tagName.length - tok.end + pos.ch));
var lowerTagName = tagName.toLowerCase();
if (!tagName || "string" == tok.type && (tok.end != pos.ch || !/[\"\']/.test(tok.string.charAt(tok.string.length - 1)) || 1 == tok.string.length) || "tag" == tok.type && "closeTag" == state.type || tok.string.indexOf("/") == tok.string.length - 1 || dontCloseTags && indexOf(dontCloseTags, lowerTagName) > -1 || closingTagExists(cm, tagName, pos, state, !0)) return CodeMirror.Pass;
var indent = indentTags && indexOf(indentTags, lowerTagName) > -1;
replacements[i] = {
indent:indent,
text:">" + (indent ? "\n\n" :"") + "</" + tagName + ">",
newPos:indent ? CodeMirror.Pos(pos.line + 1, 0) :CodeMirror.Pos(pos.line, pos.ch + 1)
};
}
for (var i = ranges.length - 1; i >= 0; i--) {
var info = replacements[i];
cm.replaceRange(info.text, ranges[i].head, ranges[i].anchor, "+insert");
var sel = cm.listSelections().slice(0);
sel[i] = {
head:info.newPos,
anchor:info.newPos
}, cm.setSelections(sel), info.indent && (cm.indentLine(info.newPos.line, null, !0), 
cm.indentLine(info.newPos.line + 1, null, !0));
}
}
function autoCloseSlash(cm) {
if (cm.getOption("disableInput")) return CodeMirror.Pass;
for (var ranges = cm.listSelections(), replacements = [], i = 0; i < ranges.length; i++) {
if (!ranges[i].empty()) return CodeMirror.Pass;
var pos = ranges[i].head, tok = cm.getTokenAt(pos), inner = CodeMirror.innerMode(cm.getMode(), tok.state), state = inner.state;
if ("string" == tok.type || "<" != tok.string.charAt(0) || tok.start != pos.ch - 1 || "xml" != inner.mode.name || !state.context || !state.context.tagName || closingTagExists(cm, state.context.tagName, pos, state)) return CodeMirror.Pass;
replacements[i] = "/" + state.context.tagName + ">";
}
cm.replaceSelections(replacements);
}
function indexOf(collection, elt) {
if (collection.indexOf) return collection.indexOf(elt);
for (var i = 0, e = collection.length; e > i; ++i) if (collection[i] == elt) return i;
return -1;
}
function closingTagExists(cm, tagName, pos, state, newTag) {
if (!CodeMirror.scanForClosingTag) return !1;
var end = Math.min(cm.lastLine() + 1, pos.line + 500), nextClose = CodeMirror.scanForClosingTag(cm, pos, null, end);
if (!nextClose || nextClose.tag != tagName) return !1;
for (var cx = state.context, onCx = newTag ? 1 :0; cx && cx.tagName == tagName; cx = cx.prev) ++onCx;
pos = nextClose.to;
for (var i = 1; onCx > i; i++) {
var next = CodeMirror.scanForClosingTag(cm, pos, null, end);
if (!next || next.tag != tagName) return !1;
pos = next.to;
}
return !0;
}
CodeMirror.defineOption("autoCloseTags", !1, function(cm, val, old) {
if (old != CodeMirror.Init && old && cm.removeKeyMap("autoCloseTags"), val) {
var map = {
name:"autoCloseTags"
};
("object" != typeof val || val.whenClosing) && (map["'/'"] = function(cm) {
return autoCloseSlash(cm);
}), ("object" != typeof val || val.whenOpening) && (map["'>'"] = function(cm) {
return autoCloseGT(cm);
}), cm.addKeyMap(map);
}
});
var htmlDontClose = [ "area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr" ], htmlIndent = [ "applet", "blockquote", "body", "button", "div", "dl", "fieldset", "form", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "html", "iframe", "layer", "legend", "object", "ol", "p", "select", "table", "ul" ];
});