!function() {
function b(d, e) {
return d.getParam(e, a[e]);
}
var c = tinymce.each, a = {
paste_auto_cleanup_on_paste:!0,
paste_enable_default_filters:!0,
paste_block_drop:!1,
paste_retain_style_properties:"none",
paste_strip_class_attributes:"mso",
paste_remove_spans:!1,
paste_remove_styles:!1,
paste_remove_styles_if_webkit:!0,
paste_convert_middot_lists:!0,
paste_convert_headers_to_strong:!1,
paste_dialog_width:"450",
paste_dialog_height:"400",
paste_text_use_dialog:!1,
paste_text_sticky:!1,
paste_text_sticky_default:!1,
paste_text_notifyalways:!1,
paste_text_linebreaktype:"p",
paste_text_replacements:[ [ /\u2026/g, "..." ], [ /[\x93\x94\u201c\u201d]/g, '"' ], [ /[\x60\x91\x92\u2018\u2019]/g, "'" ] ]
};
tinymce.create("tinymce.plugins.PastePlugin", {
init:function(d, e) {
function h(l, j) {
var i, k = d.dom;
f.onPreProcess.dispatch(f, l), l.node = k.create("div", 0, l.content), tinymce.isGecko && (i = d.selection.getRng(!0), 
i.startContainer == i.endContainer && 3 == i.startContainer.nodeType && 1 === l.node.childNodes.length && /^(p|h[1-6]|pre)$/i.test(l.node.firstChild.nodeName) && -1 === l.content.indexOf("__MCE_ITEM__") && k.remove(l.node.firstChild, !0)), 
f.onPostProcess.dispatch(f, l), l.content = d.serializer.serialize(l.node, {
getInner:1,
forced_root_block:""
}), !j && d.pasteAsPlainText ? (f._insertPlainText(d, k, l.content), b(d, "paste_text_sticky") || (d.pasteAsPlainText = !1, 
d.controlManager.setActive("pastetext", !1))) :f._insert(l.content);
}
function g(s) {
function m(n) {
n.preventDefault();
}
var l, p, j, t, i, r, k = d.selection, o = d.dom, q = d.getBody();
if ((s.clipboardData || o.doc.dataTransfer) && (r = (s.clipboardData || o.doc.dataTransfer).getData("Text"), 
d.pasteAsPlainText)) return s.preventDefault(), h({
content:r.replace(/\r?\n/g, "<br />")
}), void 0;
if (!o.get("_mcePaste")) return l = o.add(q, "div", {
id:"_mcePaste",
"class":"mcePaste",
"data-mce-bogus":"1"
}, "\ufeff\ufeff"), i = q != d.getDoc().body ? o.getPos(d.selection.getStart(), q).y :q.scrollTop + o.getViewPort(d.getWin()).y, 
o.setStyles(l, {
position:"absolute",
left:tinymce.isGecko ? -40 :0,
top:i - 25,
width:1,
height:1,
overflow:"hidden"
}), tinymce.isIE ? (t = k.getRng(), j = o.doc.body.createTextRange(), j.moveToElementText(l), 
j.execCommand("Paste"), o.remove(l), "\ufeff\ufeff" === l.innerHTML ? (d.execCommand("mcePasteWord"), 
s.preventDefault(), void 0) :(k.setRng(t), k.setContent(""), setTimeout(function() {
h({
content:l.innerHTML
});
}, 0), tinymce.dom.Event.cancel(s))) :(o.bind(d.getDoc(), "mousedown", m), o.bind(d.getDoc(), "keydown", m), 
p = d.selection.getRng(), l = l.firstChild, j = d.getDoc().createRange(), j.setStart(l, 0), 
j.setEnd(l, 2), k.setRng(j), window.setTimeout(function() {
var n, u = "";
o.select("div.mcePaste > div.mcePaste").length ? u = "<p>" + o.encode(r).replace(/\r?\n\r?\n/g, "</p><p>").replace(/\r?\n/g, "<br />") + "</p>" :(n = o.select("div.mcePaste"), 
c(n, function(w) {
var v = w.firstChild;
v && "DIV" == v.nodeName && v.style.marginTop && v.style.backgroundColor && o.remove(v, 1), 
c(o.select("span.Apple-style-span", w), function(x) {
o.remove(x, 1);
}), c(o.select("br[data-mce-bogus]", w), function(x) {
o.remove(x);
}), "mcePaste" != w.parentNode.className && (u += w.innerHTML);
})), c(o.select("div.mcePaste"), function(v) {
o.remove(v);
}), p && k.setRng(p), h({
content:u
}), o.unbind(d.getDoc(), "mousedown", m), o.unbind(d.getDoc(), "keydown", m);
}, 0), void 0);
}
var f = this;
f.editor = d, f.url = e, f.onPreProcess = new tinymce.util.Dispatcher(f), f.onPostProcess = new tinymce.util.Dispatcher(f), 
f.onPreProcess.add(f._preProcess), f.onPostProcess.add(f._postProcess), f.onPreProcess.add(function(i, j) {
d.execCallback("paste_preprocess", i, j);
}), f.onPostProcess.add(function(i, j) {
d.execCallback("paste_postprocess", i, j);
}), d.onKeyDown.addToTop(function(i, j) {
return (tinymce.isMac ? j.metaKey :j.ctrlKey) && 86 == j.keyCode || j.shiftKey && 45 == j.keyCode ? !1 :void 0;
}), d.pasteAsPlainText = b(d, "paste_text_sticky_default"), d.addCommand("mceInsertClipboardContent", function(i, j) {
h(j, !0);
}), b(d, "paste_text_use_dialog") || d.addCommand("mcePasteText", function() {
var k = tinymce.util.Cookie;
d.pasteAsPlainText = !d.pasteAsPlainText, d.controlManager.setActive("pastetext", d.pasteAsPlainText), 
d.pasteAsPlainText && !k.get("tinymcePasteText") && (b(d, "paste_text_sticky") ? d.windowManager.alert(d.translate("paste.plaintext_mode_sticky")) :d.windowManager.alert(d.translate("paste.plaintext_mode_sticky")), 
b(d, "paste_text_notifyalways") || k.set("tinymcePasteText", "1", new Date(new Date().getFullYear() + 1, 12, 31)));
}), d.addButton("pastetext", {
title:"paste.paste_text_desc",
cmd:"mcePasteText"
}), d.addButton("selectall", {
title:"paste.selectall_desc",
cmd:"selectall"
}), b(d, "paste_auto_cleanup_on_paste") && (tinymce.isOpera || /Firefox\/2/.test(navigator.userAgent) ? d.onKeyDown.addToTop(function(i, j) {
((tinymce.isMac ? j.metaKey :j.ctrlKey) && 86 == j.keyCode || j.shiftKey && 45 == j.keyCode) && g(j);
}) :d.onPaste.addToTop(function(i, j) {
return g(j);
})), d.onInit.add(function() {
d.controlManager.setActive("pastetext", d.pasteAsPlainText), b(d, "paste_block_drop") && d.dom.bind(d.getBody(), [ "dragend", "dragover", "draggesture", "dragdrop", "drop", "drag" ], function(i) {
return i.preventDefault(), i.stopPropagation(), !1;
});
}), f._legacySupport();
},
getInfo:function() {
return {
longname:"Paste text/word",
author:"Moxiecode Systems AB",
authorurl:"http://tinymce.moxiecode.com",
infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/paste",
version:tinymce.majorVersion + "." + tinymce.minorVersion
};
},
_preProcess:function(g, e) {
function d(h) {
c(h, function(o) {
j = o.constructor == RegExp ? j.replace(o, "") :j.replace(o[0], o[1]);
});
}
function m(q, o) {
if ("all" === i) return "";
var h = p(n(o.replace(/^(["'])(.*)\1$/, "$2"), " "), function(r) {
return /^(?!mso)/i.test(r);
});
return h.length ? ' class="' + h.join(" ") + '"' :"";
}
var l, i, k = this.editor, j = e.content, p = tinymce.grep, n = tinymce.explode, f = tinymce.trim;
if (0 != k.settings.paste_enable_default_filters) {
if (tinymce.isIE && document.documentMode >= 9 && (d([ [ /(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g, "$1" ] ]), 
d([ [ /<br><br>/g, "<BR><BR>" ], [ /<br>/g, " " ], [ /<BR><BR>/g, "<br>" ] ])), 
/class="?Mso|style="[^"]*\bmso-|w:WordDocument/i.test(j) || e.wordContent) {
e.wordContent = !0, d([ /^\s*(&nbsp;)+/gi, /(&nbsp;|<br[^>]*>)+\s*$/gi ]), b(k, "paste_convert_headers_to_strong") && (j = j.replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>")), 
b(k, "paste_convert_middot_lists") && d([ [ /<!--\[if !supportLists\]-->/gi, "$&__MCE_ITEM__" ], [ /(<span[^>]+(?:mso-list:|:\s*symbol)[^>]+>)/gi, "$1__MCE_ITEM__" ], [ /(<p[^>]+(?:MsoListParagraph)[^>]+>)/gi, "$1__MCE_ITEM__" ] ]), 
d([ /<!--[\s\S]+?-->/gi, /<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi, [ /<(\/?)s>/gi, "<$1strike>" ], [ /&nbsp;/gi, "\xa0" ] ]);
do l = j.length, j = j.replace(/(<[a-z][^>]*\s)(?:id|name|language|type|on\w+|\w+:\w+)=(?:"[^"]*"|\w+)\s?/gi, "$1"); while (l != j.length);
0 == b(k, "paste_retain_style_properties").replace(/^none$/i, "").length ? j = j.replace(/<\/?span[^>]*>/gi, "") :d([ [ /<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi, function(o, h) {
return h.length > 0 ? h.replace(/./, " ").slice(Math.floor(h.length / 2)).split("").join("\xa0") :"";
} ], [ /(<[a-z][^>]*)\sstyle="([^"]*)"/gi, function(t, h, r) {
var u = [], o = 0, q = n(f(r).replace(/&quot;/gi, "'"), ";");
return c(q, function(s) {
function x(A) {
return A + ("0" !== A && /\d$/.test(A)) ? "px" :"";
}
var w, y, z = n(s, ":");
if (2 == z.length) {
switch (w = z[0].toLowerCase(), y = z[1].toLowerCase(), w) {
case "mso-padding-alt":
case "mso-padding-top-alt":
case "mso-padding-right-alt":
case "mso-padding-bottom-alt":
case "mso-padding-left-alt":
case "mso-margin-alt":
case "mso-margin-top-alt":
case "mso-margin-right-alt":
case "mso-margin-bottom-alt":
case "mso-margin-left-alt":
case "mso-table-layout-alt":
case "mso-height":
case "mso-width":
case "mso-vertical-align-alt":
return u[o++] = w.replace(/^mso-|-alt$/g, "") + ":" + x(y), void 0;

case "horiz-align":
return u[o++] = "text-align:" + y, void 0;

case "vert-align":
return u[o++] = "vertical-align:" + y, void 0;

case "font-color":
case "mso-foreground":
return u[o++] = "color:" + y, void 0;

case "mso-background":
case "mso-highlight":
return u[o++] = "background:" + y, void 0;

case "mso-default-height":
return u[o++] = "min-height:" + x(y), void 0;

case "mso-default-width":
return u[o++] = "min-width:" + x(y), void 0;

case "mso-padding-between-alt":
return u[o++] = "border-collapse:separate;border-spacing:" + x(y), void 0;

case "text-line-through":
return ("single" == y || "double" == y) && (u[o++] = "text-decoration:line-through"), 
void 0;

case "mso-zero-height":
return "yes" == y && (u[o++] = "display:none"), void 0;
}
if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?!align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test(w)) return;
u[o++] = w + ":" + z[1];
}
}), o > 0 ? h + ' style="' + u.join(";") + '"' :h;
} ] ]);
}
b(k, "paste_convert_headers_to_strong") && d([ [ /<h[1-6][^>]*>/gi, "<p><strong>" ], [ /<\/h[1-6][^>]*>/gi, "</strong></p>" ] ]), 
d([ [ /Version:[\d.]+\nStartHTML:\d+\nEndHTML:\d+\nStartFragment:\d+\nEndFragment:\d+/gi, "" ] ]), 
i = b(k, "paste_strip_class_attributes"), "none" !== i && (j = j.replace(/ class="([^"]+)"/gi, m), 
j = j.replace(/ class=([\-\w]+)/gi, m)), b(k, "paste_remove_spans") && (j = j.replace(/<\/?span[^>]*>/gi, "")), 
e.content = j;
}
},
_postProcess:function(g, i) {
var d, f = this, e = f.editor, h = e.dom;
0 != e.settings.paste_enable_default_filters && (i.wordContent && (c(h.select("a", i.node), function(j) {
j.href && -1 == j.href.indexOf("#_Toc") || h.remove(j, 1);
}), b(e, "paste_convert_middot_lists") && f._convertLists(g, i), d = b(e, "paste_retain_style_properties"), 
tinymce.is(d, "string") && "all" !== d && "*" !== d && (d = tinymce.explode(d.replace(/^none$/i, "")), 
c(h.select("*", i.node), function(m) {
var l, o, j, n = {}, k = 0;
if (d) for (l = 0; l < d.length; l++) o = d[l], j = h.getStyle(m, o), j && (n[o] = j, 
k++);
h.setAttrib(m, "style", ""), d && k > 0 ? h.setStyles(m, n) :"SPAN" != m.nodeName || m.className || h.remove(m, !0);
}))), b(e, "paste_remove_styles") || b(e, "paste_remove_styles_if_webkit") && tinymce.isWebKit ? c(h.select("*[style]", i.node), function(j) {
j.removeAttribute("style"), j.removeAttribute("data-mce-style");
}) :tinymce.isWebKit && c(h.select("*", i.node), function(j) {
j.removeAttribute("data-mce-style");
}));
},
_convertLists:function(g, e) {
var h, l, f, k, j, i = g.editor.dom, d = -1, m = [];
c(i.select("p", e.node), function(t) {
var q, s, r, n, o, u = "";
for (q = t.firstChild; q && 3 == q.nodeType; q = q.nextSibling) u += q.nodeValue;
u = t.innerHTML.replace(/<\/?\w+[^>]*>/gi, "").replace(/&nbsp;/g, "\xa0"), /^(__MCE_ITEM__)+[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*\u00a0*/.test(u) && (s = "ul"), 
/^__MCE_ITEM__\s*\w+\.\s*\u00a0+/.test(u) && (s = "ol"), s ? (f = parseFloat(t.style.marginLeft || 0), 
f > d && m.push(f), h && s == k ? f > d ? h = l.appendChild(i.create(s)) :d > f && (n = tinymce.inArray(m, f), 
o = i.getParents(h.parentNode, s), h = o[o.length - 1 - n] || h) :(h = i.create(s), 
i.insertAfter(h, t)), c(i.select("span", t), function(v) {
var p = v.innerHTML.replace(/<\/?\w+[^>]*>/gi, "");
"ul" == s && /^__MCE_ITEM__[\u2022\u00b7\u00a7\u00d8o\u25CF]/.test(p) ? i.remove(v) :/^__MCE_ITEM__[\s\S]*\w+\.(&nbsp;|\u00a0)*\s*/.test(p) && i.remove(v);
}), r = t.innerHTML, r = "ul" == s ? t.innerHTML.replace(/__MCE_ITEM__/g, "").replace(/^[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*(&nbsp;|\u00a0)+\s*/, "") :t.innerHTML.replace(/__MCE_ITEM__/g, "").replace(/^\s*\w+\.(&nbsp;|\u00a0)+\s*/, ""), 
l = h.appendChild(i.create("li", 0, r)), i.remove(t), d = f, k = s) :h = d = 0;
}), j = e.node.innerHTML, -1 != j.indexOf("__MCE_ITEM__") && (e.node.innerHTML = j.replace(/__MCE_ITEM__/g, ""));
},
_insert:function(f, d) {
var e = this.editor, g = e.selection.getRng();
e.selection.isCollapsed() || g.startContainer == g.endContainer || e.getDoc().execCommand("Delete", !1, null), 
e.execCommand("mceInsertContent", !1, f, {
skip_undo:d
});
},
_insertPlainText:function(j, x, v) {
function q(d) {
c(d, function(h) {
v = h.constructor == RegExp ? v.replace(h, "") :v.replace(h[0], h[1]);
});
}
var t, u, l, k, r, e, p, f, n = j.getWin(), z = j.getDoc(), s = j.selection, m = tinymce.is, g = (tinymce.inArray, 
b(j, "paste_text_linebreaktype")), o = b(j, "paste_text_replacements");
if ("string" == typeof v && v.length > 0) {
if (/<(?:p|br|h[1-6]|ul|ol|dl|table|t[rdh]|div|blockquote|fieldset|pre|address|center)[^>]*>/i.test(v) ? q([ /[\n\r]+/g ]) :q([ /\r+/g ]), 
q([ [ /<\/(?:p|h[1-6]|ul|ol|dl|table|div|blockquote|fieldset|pre|address|center)>/gi, "\n\n" ], [ /<br[^>]*>|<\/tr>/gi, "\n" ], [ /<\/t[dh]>\s*<t[dh][^>]*>/gi, "	" ], /<[a-z!\/?][^>]*>/gi, [ /&nbsp;/gi, " " ], [ /(?:(?!\n)\s)*(\n+)(?:(?!\n)\s)*/gi, "$1" ], [ /\n{3,}/g, "\n\n" ], /^\s+|\s+$/g ]), 
v = x.decode(tinymce.html.Entities.encodeRaw(v)), s.isCollapsed() || z.execCommand("Delete", !1, null), 
m(o, "array") || m(o, "array") ? q(o) :m(o, "string") && q(new RegExp(o, "gi")), 
"none" == g ? q([ [ /\n+/g, " " ] ]) :"br" == g ? q([ [ /\n/g, "<br />" ] ]) :q([ /^\s+|\s+$/g, [ /\n\n/g, "</p><p>" ], [ /\n/g, "<br />" ] ]), 
-1 != (l = v.indexOf("</p><p>"))) {
k = v.lastIndexOf("</p><p>"), r = s.getNode(), e = [];
do if (1 == r.nodeType) {
if ("TD" == r.nodeName || "BODY" == r.nodeName) break;
e[e.length] = r;
} while (r = r.parentNode);
if (e.length > 0) {
for (p = v.substring(0, l), f = "", t = 0, u = e.length; u > t; t++) p += "</" + e[t].nodeName.toLowerCase() + ">", 
f += "<" + e[e.length - t - 1].nodeName.toLowerCase() + ">";
v = l == k ? p + f + v.substring(l + 7) :p + v.substring(l + 4, k + 4) + f + v.substring(k + 7);
}
}
j.execCommand("mceInsertRawHTML", !1, v + '<span id="_plain_text_marker">&nbsp;</span>'), 
window.setTimeout(function() {
var A, h, w, i, d = x.get("_plain_text_marker");
s.select(d, !1), z.execCommand("Delete", !1, null), d = null, A = s.getStart(), 
h = x.getViewPort(n), w = x.getPos(A).y, i = A.clientHeight, (w < h.y || w + i > h.y + h.h) && (z.body.scrollTop = w < h.y ? w :w - h.h + 25);
}, 0);
}
},
_legacySupport:function() {
var e = this, d = e.editor;
d.addCommand("mcePasteWord", function() {
d.windowManager.open({
file:e.url + "/pasteword.htm",
width:parseInt(b(d, "paste_dialog_width")),
height:parseInt(b(d, "paste_dialog_height")),
inline:1
});
}), b(d, "paste_text_use_dialog") && d.addCommand("mcePasteText", function() {
d.windowManager.open({
file:e.url + "/pastetext.htm",
width:parseInt(b(d, "paste_dialog_width")),
height:parseInt(b(d, "paste_dialog_height")),
inline:1
});
}), d.addButton("pasteword", {
title:"paste.paste_word_desc",
cmd:"mcePasteWord"
});
}
}), tinymce.PluginManager.add("paste", tinymce.plugins.PastePlugin);
}();