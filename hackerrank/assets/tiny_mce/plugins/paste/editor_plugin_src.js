/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
!function() {
function getParam(ed, name) {
return ed.getParam(name, defs[name]);
}
var each = tinymce.each, defs = {
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
init:function(ed, url) {
function process(o, force_rich) {
var rng, dom = ed.dom;
t.onPreProcess.dispatch(t, o), o.node = dom.create("div", 0, o.content), tinymce.isGecko && (rng = ed.selection.getRng(!0), 
rng.startContainer == rng.endContainer && 3 == rng.startContainer.nodeType && 1 === o.node.childNodes.length && /^(p|h[1-6]|pre)$/i.test(o.node.firstChild.nodeName) && -1 === o.content.indexOf("__MCE_ITEM__") && dom.remove(o.node.firstChild, !0)), 
t.onPostProcess.dispatch(t, o), o.content = ed.serializer.serialize(o.node, {
getInner:1,
forced_root_block:""
}), !force_rich && ed.pasteAsPlainText ? (t._insertPlainText(ed, dom, o.content), 
getParam(ed, "paste_text_sticky") || (ed.pasteAsPlainText = !1, ed.controlManager.setActive("pastetext", !1))) :t._insert(o.content);
}
function grabContent(e) {
function block(e) {
e.preventDefault();
}
var n, or, rng, oldRng, posY, textContent, sel = ed.selection, dom = ed.dom, body = ed.getBody();
if ((e.clipboardData || dom.doc.dataTransfer) && (textContent = (e.clipboardData || dom.doc.dataTransfer).getData("Text"), 
ed.pasteAsPlainText)) return e.preventDefault(), process({
content:textContent.replace(/\r?\n/g, "<br />")
}), void 0;
if (!dom.get("_mcePaste")) return n = dom.add(body, "div", {
id:"_mcePaste",
"class":"mcePaste",
"data-mce-bogus":"1"
}, "\ufeff\ufeff"), posY = body != ed.getDoc().body ? dom.getPos(ed.selection.getStart(), body).y :body.scrollTop + dom.getViewPort(ed.getWin()).y, 
dom.setStyles(n, {
position:"absolute",
left:tinymce.isGecko ? -40 :0,
top:posY - 25,
width:1,
height:1,
overflow:"hidden"
}), tinymce.isIE ? (oldRng = sel.getRng(), rng = dom.doc.body.createTextRange(), 
rng.moveToElementText(n), rng.execCommand("Paste"), dom.remove(n), "\ufeff\ufeff" === n.innerHTML ? (ed.execCommand("mcePasteWord"), 
e.preventDefault(), void 0) :(sel.setRng(oldRng), sel.setContent(""), setTimeout(function() {
process({
content:n.innerHTML
});
}, 0), tinymce.dom.Event.cancel(e))) :(dom.bind(ed.getDoc(), "mousedown", block), 
dom.bind(ed.getDoc(), "keydown", block), or = ed.selection.getRng(), n = n.firstChild, 
rng = ed.getDoc().createRange(), rng.setStart(n, 0), rng.setEnd(n, 2), sel.setRng(rng), 
window.setTimeout(function() {
var nl, h = "";
dom.select("div.mcePaste > div.mcePaste").length ? h = "<p>" + dom.encode(textContent).replace(/\r?\n\r?\n/g, "</p><p>").replace(/\r?\n/g, "<br />") + "</p>" :(nl = dom.select("div.mcePaste"), 
each(nl, function(n) {
var child = n.firstChild;
child && "DIV" == child.nodeName && child.style.marginTop && child.style.backgroundColor && dom.remove(child, 1), 
each(dom.select("span.Apple-style-span", n), function(n) {
dom.remove(n, 1);
}), each(dom.select("br[data-mce-bogus]", n), function(n) {
dom.remove(n);
}), "mcePaste" != n.parentNode.className && (h += n.innerHTML);
})), each(dom.select("div.mcePaste"), function(n) {
dom.remove(n);
}), or && sel.setRng(or), process({
content:h
}), dom.unbind(ed.getDoc(), "mousedown", block), dom.unbind(ed.getDoc(), "keydown", block);
}, 0), void 0);
}
var t = this;
t.editor = ed, t.url = url, t.onPreProcess = new tinymce.util.Dispatcher(t), t.onPostProcess = new tinymce.util.Dispatcher(t), 
t.onPreProcess.add(t._preProcess), t.onPostProcess.add(t._postProcess), t.onPreProcess.add(function(pl, o) {
ed.execCallback("paste_preprocess", pl, o);
}), t.onPostProcess.add(function(pl, o) {
ed.execCallback("paste_postprocess", pl, o);
}), ed.onKeyDown.addToTop(function(ed, e) {
return (tinymce.isMac ? e.metaKey :e.ctrlKey) && 86 == e.keyCode || e.shiftKey && 45 == e.keyCode ? !1 :void 0;
}), ed.pasteAsPlainText = getParam(ed, "paste_text_sticky_default"), ed.addCommand("mceInsertClipboardContent", function(u, o) {
process(o, !0);
}), getParam(ed, "paste_text_use_dialog") || ed.addCommand("mcePasteText", function() {
var cookie = tinymce.util.Cookie;
ed.pasteAsPlainText = !ed.pasteAsPlainText, ed.controlManager.setActive("pastetext", ed.pasteAsPlainText), 
ed.pasteAsPlainText && !cookie.get("tinymcePasteText") && (getParam(ed, "paste_text_sticky") ? ed.windowManager.alert(ed.translate("paste.plaintext_mode_sticky")) :ed.windowManager.alert(ed.translate("paste.plaintext_mode_sticky")), 
getParam(ed, "paste_text_notifyalways") || cookie.set("tinymcePasteText", "1", new Date(new Date().getFullYear() + 1, 12, 31)));
}), ed.addButton("pastetext", {
title:"paste.paste_text_desc",
cmd:"mcePasteText"
}), ed.addButton("selectall", {
title:"paste.selectall_desc",
cmd:"selectall"
}), getParam(ed, "paste_auto_cleanup_on_paste") && (tinymce.isOpera || /Firefox\/2/.test(navigator.userAgent) ? ed.onKeyDown.addToTop(function(ed, e) {
((tinymce.isMac ? e.metaKey :e.ctrlKey) && 86 == e.keyCode || e.shiftKey && 45 == e.keyCode) && grabContent(e);
}) :ed.onPaste.addToTop(function(ed, e) {
return grabContent(e);
})), ed.onInit.add(function() {
ed.controlManager.setActive("pastetext", ed.pasteAsPlainText), getParam(ed, "paste_block_drop") && ed.dom.bind(ed.getBody(), [ "dragend", "dragover", "draggesture", "dragdrop", "drop", "drag" ], function(e) {
return e.preventDefault(), e.stopPropagation(), !1;
});
}), t._legacySupport();
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
_preProcess:function(pl, o) {
function process(items) {
each(items, function(v) {
h = v.constructor == RegExp ? h.replace(v, "") :h.replace(v[0], v[1]);
});
}
function removeClasses(match, g1) {
if ("all" === stripClass) return "";
var cls = grep(explode(g1.replace(/^(["'])(.*)\1$/, "$2"), " "), function(v) {
return /^(?!mso)/i.test(v);
});
return cls.length ? ' class="' + cls.join(" ") + '"' :"";
}
var len, stripClass, ed = this.editor, h = o.content, grep = tinymce.grep, explode = tinymce.explode, trim = tinymce.trim;
if (0 != ed.settings.paste_enable_default_filters) {
if (tinymce.isIE && document.documentMode >= 9 && (process([ [ /(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g, "$1" ] ]), 
process([ [ /<br><br>/g, "<BR><BR>" ], [ /<br>/g, " " ], [ /<BR><BR>/g, "<br>" ] ])), 
/class="?Mso|style="[^"]*\bmso-|w:WordDocument/i.test(h) || o.wordContent) {
o.wordContent = !0, process([ /^\s*(&nbsp;)+/gi, /(&nbsp;|<br[^>]*>)+\s*$/gi ]), 
getParam(ed, "paste_convert_headers_to_strong") && (h = h.replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>")), 
getParam(ed, "paste_convert_middot_lists") && process([ [ /<!--\[if !supportLists\]-->/gi, "$&__MCE_ITEM__" ], [ /(<span[^>]+(?:mso-list:|:\s*symbol)[^>]+>)/gi, "$1__MCE_ITEM__" ], [ /(<p[^>]+(?:MsoListParagraph)[^>]+>)/gi, "$1__MCE_ITEM__" ] ]), 
process([ /<!--[\s\S]+?-->/gi, /<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi, [ /<(\/?)s>/gi, "<$1strike>" ], [ /&nbsp;/gi, "\xa0" ] ]);
do len = h.length, h = h.replace(/(<[a-z][^>]*\s)(?:id|name|language|type|on\w+|\w+:\w+)=(?:"[^"]*"|\w+)\s?/gi, "$1"); while (len != h.length);
0 == getParam(ed, "paste_retain_style_properties").replace(/^none$/i, "").length ? h = h.replace(/<\/?span[^>]*>/gi, "") :process([ [ /<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi, function(str, spaces) {
return spaces.length > 0 ? spaces.replace(/./, " ").slice(Math.floor(spaces.length / 2)).split("").join("\xa0") :"";
} ], [ /(<[a-z][^>]*)\sstyle="([^"]*)"/gi, function(str, tag, style) {
var n = [], i = 0, s = explode(trim(style).replace(/&quot;/gi, "'"), ";");
return each(s, function(v) {
function ensureUnits(v) {
return v + ("0" !== v && /\d$/.test(v)) ? "px" :"";
}
var name, value, parts = explode(v, ":");
if (2 == parts.length) {
switch (name = parts[0].toLowerCase(), value = parts[1].toLowerCase(), name) {
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
return n[i++] = name.replace(/^mso-|-alt$/g, "") + ":" + ensureUnits(value), void 0;

case "horiz-align":
return n[i++] = "text-align:" + value, void 0;

case "vert-align":
return n[i++] = "vertical-align:" + value, void 0;

case "font-color":
case "mso-foreground":
return n[i++] = "color:" + value, void 0;

case "mso-background":
case "mso-highlight":
return n[i++] = "background:" + value, void 0;

case "mso-default-height":
return n[i++] = "min-height:" + ensureUnits(value), void 0;

case "mso-default-width":
return n[i++] = "min-width:" + ensureUnits(value), void 0;

case "mso-padding-between-alt":
return n[i++] = "border-collapse:separate;border-spacing:" + ensureUnits(value), 
void 0;

case "text-line-through":
return ("single" == value || "double" == value) && (n[i++] = "text-decoration:line-through"), 
void 0;

case "mso-zero-height":
return "yes" == value && (n[i++] = "display:none"), void 0;
}
if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?!align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test(name)) return;
n[i++] = name + ":" + parts[1];
}
}), i > 0 ? tag + ' style="' + n.join(";") + '"' :tag;
} ] ]);
}
getParam(ed, "paste_convert_headers_to_strong") && process([ [ /<h[1-6][^>]*>/gi, "<p><strong>" ], [ /<\/h[1-6][^>]*>/gi, "</strong></p>" ] ]), 
process([ [ /Version:[\d.]+\nStartHTML:\d+\nEndHTML:\d+\nStartFragment:\d+\nEndFragment:\d+/gi, "" ] ]), 
stripClass = getParam(ed, "paste_strip_class_attributes"), "none" !== stripClass && (h = h.replace(/ class="([^"]+)"/gi, removeClasses), 
h = h.replace(/ class=([\-\w]+)/gi, removeClasses)), getParam(ed, "paste_remove_spans") && (h = h.replace(/<\/?span[^>]*>/gi, "")), 
o.content = h;
}
},
_postProcess:function(pl, o) {
var styleProps, t = this, ed = t.editor, dom = ed.dom;
0 != ed.settings.paste_enable_default_filters && (o.wordContent && (each(dom.select("a", o.node), function(a) {
a.href && -1 == a.href.indexOf("#_Toc") || dom.remove(a, 1);
}), getParam(ed, "paste_convert_middot_lists") && t._convertLists(pl, o), styleProps = getParam(ed, "paste_retain_style_properties"), 
tinymce.is(styleProps, "string") && "all" !== styleProps && "*" !== styleProps && (styleProps = tinymce.explode(styleProps.replace(/^none$/i, "")), 
each(dom.select("*", o.node), function(el) {
var i, sp, sv, newStyle = {}, npc = 0;
if (styleProps) for (i = 0; i < styleProps.length; i++) sp = styleProps[i], sv = dom.getStyle(el, sp), 
sv && (newStyle[sp] = sv, npc++);
dom.setAttrib(el, "style", ""), styleProps && npc > 0 ? dom.setStyles(el, newStyle) :"SPAN" != el.nodeName || el.className || dom.remove(el, !0);
}))), getParam(ed, "paste_remove_styles") || getParam(ed, "paste_remove_styles_if_webkit") && tinymce.isWebKit ? each(dom.select("*[style]", o.node), function(el) {
el.removeAttribute("style"), el.removeAttribute("data-mce-style");
}) :tinymce.isWebKit && each(dom.select("*", o.node), function(el) {
el.removeAttribute("data-mce-style");
}));
},
_convertLists:function(pl, o) {
var listElm, li, margin, lastType, html, dom = pl.editor.dom, lastMargin = -1, levels = [];
each(dom.select("p", o.node), function(p) {
var sib, type, html, idx, parents, val = "";
for (sib = p.firstChild; sib && 3 == sib.nodeType; sib = sib.nextSibling) val += sib.nodeValue;
val = p.innerHTML.replace(/<\/?\w+[^>]*>/gi, "").replace(/&nbsp;/g, "\xa0"), /^(__MCE_ITEM__)+[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*\u00a0*/.test(val) && (type = "ul"), 
/^__MCE_ITEM__\s*\w+\.\s*\u00a0+/.test(val) && (type = "ol"), type ? (margin = parseFloat(p.style.marginLeft || 0), 
margin > lastMargin && levels.push(margin), listElm && type == lastType ? margin > lastMargin ? listElm = li.appendChild(dom.create(type)) :lastMargin > margin && (idx = tinymce.inArray(levels, margin), 
parents = dom.getParents(listElm.parentNode, type), listElm = parents[parents.length - 1 - idx] || listElm) :(listElm = dom.create(type), 
dom.insertAfter(listElm, p)), each(dom.select("span", p), function(span) {
var html = span.innerHTML.replace(/<\/?\w+[^>]*>/gi, "");
"ul" == type && /^__MCE_ITEM__[\u2022\u00b7\u00a7\u00d8o\u25CF]/.test(html) ? dom.remove(span) :/^__MCE_ITEM__[\s\S]*\w+\.(&nbsp;|\u00a0)*\s*/.test(html) && dom.remove(span);
}), html = p.innerHTML, html = "ul" == type ? p.innerHTML.replace(/__MCE_ITEM__/g, "").replace(/^[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*(&nbsp;|\u00a0)+\s*/, "") :p.innerHTML.replace(/__MCE_ITEM__/g, "").replace(/^\s*\w+\.(&nbsp;|\u00a0)+\s*/, ""), 
li = listElm.appendChild(dom.create("li", 0, html)), dom.remove(p), lastMargin = margin, 
lastType = type) :listElm = lastMargin = 0;
}), html = o.node.innerHTML, -1 != html.indexOf("__MCE_ITEM__") && (o.node.innerHTML = html.replace(/__MCE_ITEM__/g, ""));
},
_insert:function(h, skip_undo) {
var ed = this.editor, r = ed.selection.getRng();
ed.selection.isCollapsed() || r.startContainer == r.endContainer || ed.getDoc().execCommand("Delete", !1, null), 
ed.execCommand("mceInsertContent", !1, h, {
skip_undo:skip_undo
});
},
_insertPlainText:function(ed, dom, h) {
function process(items) {
each(items, function(v) {
h = v.constructor == RegExp ? h.replace(v, "") :h.replace(v[0], v[1]);
});
}
var i, len, pos, rpos, node, breakElms, before, after, w = ed.getWin(), d = ed.getDoc(), sel = ed.selection, is = tinymce.is, linebr = (tinymce.inArray, 
getParam(ed, "paste_text_linebreaktype")), rl = getParam(ed, "paste_text_replacements");
if ("string" == typeof h && h.length > 0) {
if (/<(?:p|br|h[1-6]|ul|ol|dl|table|t[rdh]|div|blockquote|fieldset|pre|address|center)[^>]*>/i.test(h) ? process([ /[\n\r]+/g ]) :process([ /\r+/g ]), 
process([ [ /<\/(?:p|h[1-6]|ul|ol|dl|table|div|blockquote|fieldset|pre|address|center)>/gi, "\n\n" ], [ /<br[^>]*>|<\/tr>/gi, "\n" ], [ /<\/t[dh]>\s*<t[dh][^>]*>/gi, "	" ], /<[a-z!\/?][^>]*>/gi, [ /&nbsp;/gi, " " ], [ /(?:(?!\n)\s)*(\n+)(?:(?!\n)\s)*/gi, "$1" ], [ /\n{3,}/g, "\n\n" ], /^\s+|\s+$/g ]), 
h = dom.decode(tinymce.html.Entities.encodeRaw(h)), sel.isCollapsed() || d.execCommand("Delete", !1, null), 
is(rl, "array") || is(rl, "array") ? process(rl) :is(rl, "string") && process(new RegExp(rl, "gi")), 
"none" == linebr ? process([ [ /\n+/g, " " ] ]) :"br" == linebr ? process([ [ /\n/g, "<br />" ] ]) :process([ /^\s+|\s+$/g, [ /\n\n/g, "</p><p>" ], [ /\n/g, "<br />" ] ]), 
-1 != (pos = h.indexOf("</p><p>"))) {
rpos = h.lastIndexOf("</p><p>"), node = sel.getNode(), breakElms = [];
do if (1 == node.nodeType) {
if ("TD" == node.nodeName || "BODY" == node.nodeName) break;
breakElms[breakElms.length] = node;
} while (node = node.parentNode);
if (breakElms.length > 0) {
for (before = h.substring(0, pos), after = "", i = 0, len = breakElms.length; len > i; i++) before += "</" + breakElms[i].nodeName.toLowerCase() + ">", 
after += "<" + breakElms[breakElms.length - i - 1].nodeName.toLowerCase() + ">";
h = pos == rpos ? before + after + h.substring(pos + 7) :before + h.substring(pos + 4, rpos + 4) + after + h.substring(rpos + 7);
}
}
ed.execCommand("mceInsertRawHTML", !1, h + '<span id="_plain_text_marker">&nbsp;</span>'), 
window.setTimeout(function() {
var elm, vp, y, elmHeight, marker = dom.get("_plain_text_marker");
sel.select(marker, !1), d.execCommand("Delete", !1, null), marker = null, elm = sel.getStart(), 
vp = dom.getViewPort(w), y = dom.getPos(elm).y, elmHeight = elm.clientHeight, (y < vp.y || y + elmHeight > vp.y + vp.h) && (d.body.scrollTop = y < vp.y ? y :y - vp.h + 25);
}, 0);
}
},
_legacySupport:function() {
var t = this, ed = t.editor;
ed.addCommand("mcePasteWord", function() {
ed.windowManager.open({
file:t.url + "/pasteword.htm",
width:parseInt(getParam(ed, "paste_dialog_width")),
height:parseInt(getParam(ed, "paste_dialog_height")),
inline:1
});
}), getParam(ed, "paste_text_use_dialog") && ed.addCommand("mcePasteText", function() {
ed.windowManager.open({
file:t.url + "/pastetext.htm",
width:parseInt(getParam(ed, "paste_dialog_width")),
height:parseInt(getParam(ed, "paste_dialog_height")),
inline:1
});
}), ed.addButton("pasteword", {
title:"paste.paste_word_desc",
cmd:"mcePasteWord"
});
}
}), tinymce.PluginManager.add("paste", tinymce.plugins.PastePlugin);
}();