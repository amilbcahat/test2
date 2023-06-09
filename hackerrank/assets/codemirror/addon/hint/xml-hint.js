// CodeMirror, copyright (c) by Marijn Haverbeke and others
!function(mod) {
"object" == typeof exports && "object" == typeof module ? mod(require("../../lib/codemirror")) :"function" == typeof define && define.amd ? define([ "../../lib/codemirror" ], mod) :mod(CodeMirror);
}(function(CodeMirror) {
"use strict";
function getHints(cm, options) {
var tags = options && options.schemaInfo, quote = options && options.quoteChar || '"';
if (tags) {
var cur = cm.getCursor(), token = cm.getTokenAt(cur), inner = CodeMirror.innerMode(cm.getMode(), token.state);
if ("xml" == inner.mode.name) {
var prefix, tagStart, result = [], replaceToken = !1, tag = /\btag\b/.test(token.type), tagName = tag && /^\w/.test(token.string);
if (tagName) {
var before = cm.getLine(cur.line).slice(Math.max(0, token.start - 2), token.start), tagType = /<\/$/.test(before) ? "close" :/<$/.test(before) ? "open" :null;
tagType && (tagStart = token.start - ("close" == tagType ? 2 :1));
} else tag && "<" == token.string ? tagType = "open" :tag && "</" == token.string && (tagType = "close");
if (!tag && !inner.state.tagName || tagType) {
tagName && (prefix = token.string), replaceToken = tagType;
var cx = inner.state.context, curTag = cx && tags[cx.tagName], childList = cx ? curTag && curTag.children :tags["!top"];
if (childList && "close" != tagType) for (var i = 0; i < childList.length; ++i) prefix && 0 != childList[i].lastIndexOf(prefix, 0) || result.push("<" + childList[i]); else if ("close" != tagType) for (var name in tags) !tags.hasOwnProperty(name) || "!top" == name || "!attrs" == name || prefix && 0 != name.lastIndexOf(prefix, 0) || result.push("<" + name);
cx && (!prefix || "close" == tagType && 0 == cx.tagName.lastIndexOf(prefix, 0)) && result.push("</" + cx.tagName + ">");
} else {
var curTag = tags[inner.state.tagName], attrs = curTag && curTag.attrs, globalAttrs = tags["!attrs"];
if (!attrs && !globalAttrs) return;
if (attrs) {
if (globalAttrs) {
var set = {};
for (var nm in globalAttrs) globalAttrs.hasOwnProperty(nm) && (set[nm] = globalAttrs[nm]);
for (var nm in attrs) attrs.hasOwnProperty(nm) && (set[nm] = attrs[nm]);
attrs = set;
}
} else attrs = globalAttrs;
if ("string" == token.type || "=" == token.string) {
var atValues, before = cm.getRange(Pos(cur.line, Math.max(0, cur.ch - 60)), Pos(cur.line, "string" == token.type ? token.start :token.end)), atName = before.match(/([^\s\u00a0=<>\"\']+)=$/);
if (!atName || !attrs.hasOwnProperty(atName[1]) || !(atValues = attrs[atName[1]])) return;
if ("function" == typeof atValues && (atValues = atValues.call(this, cm)), "string" == token.type) {
prefix = token.string;
var n = 0;
/['"]/.test(token.string.charAt(0)) && (quote = token.string.charAt(0), prefix = token.string.slice(1), 
n++);
var len = token.string.length;
/['"]/.test(token.string.charAt(len - 1)) && (quote = token.string.charAt(len - 1), 
prefix = token.string.substr(n, len - 2)), replaceToken = !0;
}
for (var i = 0; i < atValues.length; ++i) prefix && 0 != atValues[i].lastIndexOf(prefix, 0) || result.push(quote + atValues[i] + quote);
} else {
"attribute" == token.type && (prefix = token.string, replaceToken = !0);
for (var attr in attrs) !attrs.hasOwnProperty(attr) || prefix && 0 != attr.lastIndexOf(prefix, 0) || result.push(attr);
}
}
return {
list:result,
from:replaceToken ? Pos(cur.line, null == tagStart ? token.start :tagStart) :cur,
to:replaceToken ? Pos(cur.line, token.end) :cur
};
}
}
}
var Pos = CodeMirror.Pos;
CodeMirror.registerHelper("hint", "xml", getHints);
});