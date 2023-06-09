/**
 * editor_template_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
!function(tinymce) {
var lastExtID, DOM = tinymce.DOM, Event = tinymce.dom.Event, extend = tinymce.extend, each = tinymce.each, Cookie = tinymce.util.Cookie, explode = tinymce.explode;
tinymce.ThemeManager.requireLangPack("advanced"), tinymce.create("tinymce.themes.AdvancedTheme", {
sizes:[ 8, 10, 12, 14, 18, 24, 36 ],
controls:{
bold:[ "bold_desc", "Bold" ],
italic:[ "italic_desc", "Italic" ],
underline:[ "underline_desc", "Underline" ],
strikethrough:[ "striketrough_desc", "Strikethrough" ],
justifyleft:[ "justifyleft_desc", "JustifyLeft" ],
justifycenter:[ "justifycenter_desc", "JustifyCenter" ],
justifyright:[ "justifyright_desc", "JustifyRight" ],
justifyfull:[ "justifyfull_desc", "JustifyFull" ],
bullist:[ "bullist_desc", "InsertUnorderedList" ],
numlist:[ "numlist_desc", "InsertOrderedList" ],
outdent:[ "outdent_desc", "Outdent" ],
indent:[ "indent_desc", "Indent" ],
cut:[ "cut_desc", "Cut" ],
copy:[ "copy_desc", "Copy" ],
paste:[ "paste_desc", "Paste" ],
undo:[ "undo_desc", "Undo" ],
redo:[ "redo_desc", "Redo" ],
link:[ "link_desc", "mceLink" ],
unlink:[ "unlink_desc", "unlink" ],
image:[ "image_desc", "mceImage" ],
cleanup:[ "cleanup_desc", "mceCleanup" ],
help:[ "help_desc", "mceHelp" ],
code:[ "code_desc", "mceCodeEditor" ],
hr:[ "hr_desc", "InsertHorizontalRule" ],
removeformat:[ "removeformat_desc", "RemoveFormat" ],
sub:[ "sub_desc", "subscript" ],
sup:[ "sup_desc", "superscript" ],
forecolor:[ "forecolor_desc", "ForeColor" ],
forecolorpicker:[ "forecolor_desc", "mceForeColor" ],
backcolor:[ "backcolor_desc", "HiliteColor" ],
backcolorpicker:[ "backcolor_desc", "mceBackColor" ],
charmap:[ "charmap_desc", "mceCharMap" ],
visualaid:[ "visualaid_desc", "mceToggleVisualAid" ],
anchor:[ "anchor_desc", "mceInsertAnchor" ],
newdocument:[ "newdocument_desc", "mceNewDocument" ],
blockquote:[ "blockquote_desc", "mceBlockQuote" ]
},
stateControls:[ "bold", "italic", "underline", "strikethrough", "bullist", "numlist", "justifyleft", "justifycenter", "justifyright", "justifyfull", "sub", "sup", "blockquote" ],
init:function(ed, url) {
var s, v, o, t = this;
t.editor = ed, t.url = url, t.onResolveName = new tinymce.util.Dispatcher(this), 
ed.forcedHighContrastMode = ed.settings.detect_highcontrast && t._isHighContrast(), 
ed.settings.skin = ed.forcedHighContrastMode ? "highcontrast" :ed.settings.skin, 
t.settings = s = extend({
theme_advanced_path:!0,
theme_advanced_toolbar_location:"bottom",
theme_advanced_buttons1:"bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect",
theme_advanced_buttons2:"bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code",
theme_advanced_buttons3:"hr,removeformat,visualaid,|,sub,sup,|,charmap",
theme_advanced_blockformats:"p,address,pre,h1,h2,h3,h4,h5,h6",
theme_advanced_toolbar_align:"center",
theme_advanced_fonts:"Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",
theme_advanced_more_colors:1,
theme_advanced_row_height:23,
theme_advanced_resize_horizontal:1,
theme_advanced_resizing_use_cookie:1,
theme_advanced_font_sizes:"1,2,3,4,5,6,7",
theme_advanced_font_selector:"span",
theme_advanced_show_current_color:0,
readonly:ed.settings.readonly
}, ed.settings), s.font_size_style_values || (s.font_size_style_values = "8pt,10pt,12pt,14pt,18pt,24pt,36pt"), 
tinymce.is(s.theme_advanced_font_sizes, "string") && (s.font_size_style_values = tinymce.explode(s.font_size_style_values), 
s.font_size_classes = tinymce.explode(s.font_size_classes || ""), o = {}, ed.settings.theme_advanced_font_sizes = s.theme_advanced_font_sizes, 
each(ed.getParam("theme_advanced_font_sizes", "", "hash"), function(v, k) {
var cl;
k == v && v >= 1 && 7 >= v && (k = v + " (" + t.sizes[v - 1] + "pt)", cl = s.font_size_classes[v - 1], 
v = s.font_size_style_values[v - 1] || t.sizes[v - 1] + "pt"), /^\s*\./.test(v) && (cl = v.replace(/\./g, "")), 
o[k] = cl ? {
"class":cl
} :{
fontSize:v
};
}), s.theme_advanced_font_sizes = o), (v = s.theme_advanced_path_location) && "none" != v && (s.theme_advanced_statusbar_location = s.theme_advanced_path_location), 
"none" == s.theme_advanced_statusbar_location && (s.theme_advanced_statusbar_location = 0), 
ed.settings.content_css !== !1 && ed.contentCSS.push(ed.baseURI.toAbsolute(url + "/skins/" + ed.settings.skin + "/content.css")), 
ed.onInit.add(function() {
ed.settings.readonly || (ed.onNodeChange.add(t._nodeChanged, t), ed.onKeyUp.add(t._updateUndoStatus, t), 
ed.onMouseUp.add(t._updateUndoStatus, t), ed.dom.bind(ed.dom.getRoot(), "dragend", function() {
t._updateUndoStatus(ed);
}));
}), ed.onSetProgressState.add(function(ed, b, ti) {
var co, tb, id = ed.id;
b ? t.progressTimer = setTimeout(function() {
co = ed.getContainer(), co = co.insertBefore(DOM.create("DIV", {
style:"position:relative"
}), co.firstChild), tb = DOM.get(ed.id + "_tbl"), DOM.add(co, "div", {
id:id + "_blocker",
"class":"mceBlocker",
style:{
width:tb.clientWidth + 2,
height:tb.clientHeight + 2
}
}), DOM.add(co, "div", {
id:id + "_progress",
"class":"mceProgress",
style:{
left:tb.clientWidth / 2,
top:tb.clientHeight / 2
}
});
}, ti || 0) :(DOM.remove(id + "_blocker"), DOM.remove(id + "_progress"), clearTimeout(t.progressTimer));
}), DOM.loadCSS(s.editor_css ? ed.documentBaseURI.toAbsolute(s.editor_css) :url + "/skins/" + ed.settings.skin + "/ui.css"), 
s.skin_variant && DOM.loadCSS(url + "/skins/" + ed.settings.skin + "/ui_" + s.skin_variant + ".css");
},
_isHighContrast:function() {
var actualColor, div = DOM.add(DOM.getRoot(), "div", {
style:"background-color: rgb(171,239,86);"
});
return actualColor = (DOM.getStyle(div, "background-color", !0) + "").toLowerCase().replace(/ /g, ""), 
DOM.remove(div), "rgb(171,239,86)" != actualColor && "#abef56" != actualColor;
},
createControl:function(n, cf) {
var cd, c;
if (c = cf.createControl(n)) return c;
switch (n) {
case "styleselect":
return this._createStyleSelect();

case "formatselect":
return this._createBlockFormats();

case "fontselect":
return this._createFontSelect();

case "fontsizeselect":
return this._createFontSizeSelect();

case "forecolor":
return this._createForeColorMenu();

case "backcolor":
return this._createBackColorMenu();
}
return (cd = this.controls[n]) ? cf.createButton(n, {
title:"advanced." + cd[0],
cmd:cd[1],
ui:cd[2],
value:cd[3]
}) :void 0;
},
execCommand:function(cmd, ui, val) {
var f = this["_" + cmd];
return f ? (f.call(this, ui, val), !0) :!1;
},
_importClasses:function() {
var ed = this.editor, ctrl = ed.controlManager.get("styleselect");
0 == ctrl.getLength() && each(ed.dom.getClasses(), function(o, idx) {
var name = "style_" + idx;
ed.formatter.register(name, {
inline:"span",
attributes:{
"class":o["class"]
},
selector:"*"
}), ctrl.add(o["class"], name);
});
},
_createStyleSelect:function() {
var ctrl, t = this, ed = t.editor, ctrlMan = ed.controlManager;
return ctrl = ctrlMan.createListBox("styleselect", {
title:"advanced.style_select",
onselect:function(name) {
var matches, formatNames = [];
return each(ctrl.items, function(item) {
formatNames.push(item.value);
}), ed.focus(), ed.undoManager.add(), matches = ed.formatter.matchAll(formatNames), 
name && matches[0] != name ? ed.formatter.apply(name) :matches[0] && ed.formatter.remove(matches[0]), 
ed.undoManager.add(), ed.nodeChanged(), !1;
}
}), ed.onInit.add(function() {
var counter = 0, formats = ed.getParam("style_formats");
formats ? each(formats, function(fmt) {
var name, keys = 0;
each(fmt, function() {
keys++;
}), keys > 1 ? (name = fmt.name = fmt.name || "style_" + counter++, ed.formatter.register(name, fmt), 
ctrl.add(fmt.title, name)) :ctrl.add(fmt.title);
}) :each(ed.getParam("theme_advanced_styles", "", "hash"), function(val, key) {
var name;
val && (name = "style_" + counter++, ed.formatter.register(name, {
inline:"span",
classes:val,
selector:"*"
}), ctrl.add(t.editor.translate(key), name));
});
}), 0 == ctrl.getLength() && ctrl.onPostRender.add(function(ed, n) {
ctrl.NativeListBox ? Event.add(n.id, "focus", t._importClasses, t) :(Event.add(n.id + "_text", "focus", t._importClasses, t), 
Event.add(n.id + "_text", "mousedown", t._importClasses, t), Event.add(n.id + "_open", "focus", t._importClasses, t), 
Event.add(n.id + "_open", "mousedown", t._importClasses, t));
}), ctrl;
},
_createFontSelect:function() {
var c, t = this, ed = t.editor;
return c = ed.controlManager.createListBox("fontselect", {
title:"advanced.fontdefault",
onselect:function(v) {
var cur = c.items[c.selectedIndex];
return !v && cur ? (ed.execCommand("FontName", !1, cur.value), void 0) :(ed.execCommand("FontName", !1, v), 
c.select(function(sv) {
return v == sv;
}), cur && cur.value == v && c.select(null), !1);
}
}), c && each(ed.getParam("theme_advanced_fonts", t.settings.theme_advanced_fonts, "hash"), function(v, k) {
c.add(ed.translate(k), v, {
style:-1 == v.indexOf("dings") ? "font-family:" + v :""
});
}), c;
},
_createFontSizeSelect:function() {
var c, t = this, ed = t.editor, i = 0;
return c = ed.controlManager.createListBox("fontsizeselect", {
title:"advanced.font_size",
onselect:function(v) {
var cur = c.items[c.selectedIndex];
return !v && cur ? (cur = cur.value, cur["class"] ? (ed.formatter.toggle("fontsize_class", {
value:cur["class"]
}), ed.undoManager.add(), ed.nodeChanged()) :ed.execCommand("FontSize", !1, cur.fontSize), 
void 0) :(v["class"] ? (ed.focus(), ed.undoManager.add(), ed.formatter.toggle("fontsize_class", {
value:v["class"]
}), ed.undoManager.add(), ed.nodeChanged()) :ed.execCommand("FontSize", !1, v.fontSize), 
c.select(function(sv) {
return v == sv;
}), !cur || cur.value.fontSize != v.fontSize && cur.value["class"] != v["class"] || c.select(null), 
!1);
}
}), c && each(t.settings.theme_advanced_font_sizes, function(v, k) {
var fz = v.fontSize;
fz >= 1 && 7 >= fz && (fz = t.sizes[parseInt(fz) - 1] + "pt"), c.add(k, v, {
style:"font-size:" + fz,
"class":"mceFontSize" + i++ + (" " + (v["class"] || ""))
});
}), c;
},
_createBlockFormats:function() {
var c, fmts = {
p:"advanced.paragraph",
address:"advanced.address",
pre:"advanced.pre",
h1:"advanced.h1",
h2:"advanced.h2",
h3:"advanced.h3",
h4:"advanced.h4",
h5:"advanced.h5",
h6:"advanced.h6",
div:"advanced.div",
blockquote:"advanced.blockquote",
code:"advanced.code",
dt:"advanced.dt",
dd:"advanced.dd",
samp:"advanced.samp"
}, t = this;
return c = t.editor.controlManager.createListBox("formatselect", {
title:"advanced.block",
onselect:function(v) {
return t.editor.execCommand("FormatBlock", !1, v), !1;
}
}), c && each(t.editor.getParam("theme_advanced_blockformats", t.settings.theme_advanced_blockformats, "hash"), function(v, k) {
c.add(t.editor.translate(k != v ? k :fmts[v]), v, {
"class":"mce_formatPreview mce_" + v
});
}), c;
},
_createForeColorMenu:function() {
var c, v, t = this, s = t.settings, o = {};
return s.theme_advanced_more_colors && (o.more_colors_func = function() {
t._mceColorPicker(0, {
color:c.value,
func:function(co) {
c.setColor(co);
}
});
}), (v = s.theme_advanced_text_colors) && (o.colors = v), s.theme_advanced_default_foreground_color && (o.default_color = s.theme_advanced_default_foreground_color), 
o.title = "advanced.forecolor_desc", o.cmd = "ForeColor", o.scope = this, c = t.editor.controlManager.createColorSplitButton("forecolor", o);
},
_createBackColorMenu:function() {
var c, v, t = this, s = t.settings, o = {};
return s.theme_advanced_more_colors && (o.more_colors_func = function() {
t._mceColorPicker(0, {
color:c.value,
func:function(co) {
c.setColor(co);
}
});
}), (v = s.theme_advanced_background_colors) && (o.colors = v), s.theme_advanced_default_background_color && (o.default_color = s.theme_advanced_default_background_color), 
o.title = "advanced.backcolor_desc", o.cmd = "HiliteColor", o.scope = this, c = t.editor.controlManager.createColorSplitButton("backcolor", o);
},
renderUI:function(o) {
var n, ic, tb, sc, p, nl, t = this, ed = t.editor, s = t.settings;
switch (ed.settings && (ed.settings.aria_label = s.aria_label + ed.getLang("advanced.help_shortcut")), 
n = p = DOM.create("span", {
role:"application",
"aria-labelledby":ed.id + "_voice",
id:ed.id + "_parent",
"class":"mceEditor " + ed.settings.skin + "Skin" + (s.skin_variant ? " " + ed.settings.skin + "Skin" + t._ufirst(s.skin_variant) :"")
}), DOM.add(n, "span", {
"class":"mceVoiceLabel",
style:"display:none;",
id:ed.id + "_voice"
}, s.aria_label), DOM.boxModel || (n = DOM.add(n, "div", {
"class":"mceOldBoxModel"
})), n = sc = DOM.add(n, "table", {
role:"presentation",
id:ed.id + "_tbl",
"class":"mceLayout",
cellSpacing:0,
cellPadding:0
}), n = tb = DOM.add(n, "tbody"), (s.theme_advanced_layout_manager || "").toLowerCase()) {
case "rowlayout":
ic = t._rowLayout(s, tb, o);
break;

case "customlayout":
ic = ed.execCallback("theme_advanced_custom_layout", s, tb, o, p);
break;

default:
ic = t._simpleLayout(s, tb, o, p);
}
return n = o.targetNode, nl = sc.rows, DOM.addClass(nl[0], "mceFirst"), DOM.addClass(nl[nl.length - 1], "mceLast"), 
each(DOM.select("tr", tb), function(n) {
DOM.addClass(n.firstChild, "mceFirst"), DOM.addClass(n.childNodes[n.childNodes.length - 1], "mceLast");
}), DOM.get(s.theme_advanced_toolbar_container) ? DOM.get(s.theme_advanced_toolbar_container).appendChild(p) :DOM.insertAfter(p, n), 
Event.add(ed.id + "_path_row", "click", function(e) {
return e = e.target, "A" == e.nodeName ? (t._sel(e.className.replace(/^.*mcePath_([0-9]+).*$/, "$1")), 
Event.cancel(e)) :void 0;
}), ed.getParam("accessibility_focus") || Event.add(DOM.add(p, "a", {
href:"#"
}, "<!-- IE -->"), "focus", function() {
tinyMCE.get(ed.id).focus();
}), "external" == s.theme_advanced_toolbar_location && (o.deltaHeight = 0), t.deltaHeight = o.deltaHeight, 
o.targetNode = null, ed.onKeyDown.add(function(ed, evt) {
var DOM_VK_F10 = 121, DOM_VK_F11 = 122;
if (evt.altKey) {
if (evt.keyCode === DOM_VK_F10) return window.focus(), t.toolbarGroup.focus(), Event.cancel(evt);
if (evt.keyCode === DOM_VK_F11) return DOM.get(ed.id + "_path_row").focus(), Event.cancel(evt);
}
}), ed.addShortcut("alt+0", "", "mceShortcuts", t), {
iframeContainer:ic,
editorContainer:ed.id + "_parent",
sizeContainer:sc,
deltaHeight:o.deltaHeight
};
},
getInfo:function() {
return {
longname:"Advanced theme",
author:"Moxiecode Systems AB",
authorurl:"http://tinymce.moxiecode.com",
version:tinymce.majorVersion + "." + tinymce.minorVersion
};
},
resizeBy:function(dw, dh) {
var e = DOM.get(this.editor.id + "_ifr");
this.resizeTo(e.clientWidth + dw, e.clientHeight + dh);
},
resizeTo:function(w, h, store) {
var ed = this.editor, s = this.settings, e = DOM.get(ed.id + "_tbl"), ifr = DOM.get(ed.id + "_ifr");
w = Math.max(s.theme_advanced_resizing_min_width || 100, w), h = Math.max(s.theme_advanced_resizing_min_height || 100, h), 
w = Math.min(s.theme_advanced_resizing_max_width || 65535, w), h = Math.min(s.theme_advanced_resizing_max_height || 65535, h), 
DOM.setStyle(e, "height", ""), DOM.setStyle(ifr, "height", h), s.theme_advanced_resize_horizontal && (DOM.setStyle(e, "width", ""), 
DOM.setStyle(ifr, "width", w), w < e.clientWidth && (w = e.clientWidth, DOM.setStyle(ifr, "width", e.clientWidth))), 
store && s.theme_advanced_resizing_use_cookie && Cookie.setHash("TinyMCE_" + ed.id + "_size", {
cw:w,
ch:h
});
},
destroy:function() {
var id = this.editor.id;
Event.clear(id + "_resize"), Event.clear(id + "_path_row"), Event.clear(id + "_external_close");
},
_simpleLayout:function(s, tb, o, p) {
var n, ic, etb, c, t = this, ed = t.editor, lo = s.theme_advanced_toolbar_location, sl = s.theme_advanced_statusbar_location;
return s.readonly ? (n = DOM.add(tb, "tr"), n = ic = DOM.add(n, "td", {
"class":"mceIframeContainer"
}), ic) :("top" == lo && t._addToolbars(tb, o), "external" == lo && (n = c = DOM.create("div", {
style:"position:relative"
}), n = DOM.add(n, "div", {
id:ed.id + "_external",
"class":"mceExternalToolbar"
}), DOM.add(n, "a", {
id:ed.id + "_external_close",
href:"javascript:;",
"class":"mceExternalClose"
}), n = DOM.add(n, "table", {
id:ed.id + "_tblext",
cellSpacing:0,
cellPadding:0
}), etb = DOM.add(n, "tbody"), "mceOldBoxModel" == p.firstChild.className ? p.firstChild.appendChild(c) :p.insertBefore(c, p.firstChild), 
t._addToolbars(etb, o), ed.onMouseUp.add(function() {
var e = DOM.get(ed.id + "_external");
DOM.show(e), DOM.hide(lastExtID);
var f = Event.add(ed.id + "_external_close", "click", function() {
DOM.hide(ed.id + "_external"), Event.remove(ed.id + "_external_close", "click", f);
});
DOM.show(e), DOM.setStyle(e, "top", 0 - DOM.getRect(ed.id + "_tblext").h - 1), DOM.hide(e), 
DOM.show(e), e.style.filter = "", lastExtID = ed.id + "_external", e = null;
})), "top" == sl && t._addStatusBar(tb, o), s.theme_advanced_toolbar_container || (n = DOM.add(tb, "tr"), 
n = ic = DOM.add(n, "td", {
"class":"mceIframeContainer"
})), "bottom" == lo && t._addToolbars(tb, o), "bottom" == sl && t._addStatusBar(tb, o), 
ic);
},
_rowLayout:function(s, tb, o) {
var dc, da, n, ic, to, a, t = this, ed = t.editor, cf = ed.controlManager;
return dc = s.theme_advanced_containers_default_class || "", da = s.theme_advanced_containers_default_align || "center", 
each(explode(s.theme_advanced_containers || ""), function(c, i) {
var v = s["theme_advanced_container_" + c] || "";
switch (c.toLowerCase()) {
case "mceeditor":
n = DOM.add(tb, "tr"), n = ic = DOM.add(n, "td", {
"class":"mceIframeContainer"
});
break;

case "mceelementpath":
t._addStatusBar(tb, o);
break;

default:
a = (s["theme_advanced_container_" + c + "_align"] || da).toLowerCase(), a = "mce" + t._ufirst(a), 
n = DOM.add(DOM.add(tb, "tr"), "td", {
"class":"mceToolbar " + (s["theme_advanced_container_" + c + "_class"] || dc) + " " + a || da
}), to = cf.createToolbar("toolbar" + i), t._addControls(v, to), DOM.setHTML(n, to.renderHTML()), 
o.deltaHeight -= s.theme_advanced_row_height;
}
}), ic;
},
_addControls:function(v, tb) {
var di, t = this, s = t.settings, cf = t.editor.controlManager;
s.theme_advanced_disable && !t._disabled ? (di = {}, each(explode(s.theme_advanced_disable), function(v) {
di[v] = 1;
}), t._disabled = di) :di = t._disabled, each(explode(v), function(n) {
var c;
if (!di || !di[n]) {
if ("tablecontrols" == n) return each([ "table", "|", "row_props", "cell_props", "|", "row_before", "row_after", "delete_row", "|", "col_before", "col_after", "delete_col", "|", "split_cells", "merge_cells" ], function(n) {
n = t.createControl(n, cf), n && tb.add(n);
}), void 0;
c = t.createControl(n, cf), c && tb.add(c);
}
});
},
_addToolbars:function(c, o) {
var i, tb, v, n, a, toolbarGroup, t = this, ed = t.editor, s = t.settings, cf = ed.controlManager, h = [];
for (toolbarGroup = cf.createToolbarGroup("toolbargroup", {
name:ed.getLang("advanced.toolbar"),
tab_focus_toolbar:ed.getParam("theme_advanced_tab_focus_toolbar")
}), t.toolbarGroup = toolbarGroup, a = s.theme_advanced_toolbar_align.toLowerCase(), 
a = "mce" + t._ufirst(a), n = DOM.add(DOM.add(c, "tr", {
role:"presentation"
}), "td", {
"class":"mceToolbar " + a,
role:"presentation"
}), i = 1; v = s["theme_advanced_buttons" + i]; i++) tb = cf.createToolbar("toolbar" + i, {
"class":"mceToolbarRow" + i
}), s["theme_advanced_buttons" + i + "_add"] && (v += "," + s["theme_advanced_buttons" + i + "_add"]), 
s["theme_advanced_buttons" + i + "_add_before"] && (v = s["theme_advanced_buttons" + i + "_add_before"] + "," + v), 
t._addControls(v, tb), toolbarGroup.add(tb), o.deltaHeight -= s.theme_advanced_row_height;
h.push(toolbarGroup.renderHTML()), h.push(DOM.createHTML("a", {
href:"#",
accesskey:"z",
title:ed.getLang("advanced.toolbar_focus"),
onfocus:"tinyMCE.getInstanceById('" + ed.id + "').focus();"
}, "<!-- IE -->")), DOM.setHTML(n, h.join(""));
},
_addStatusBar:function(tb, o) {
var n, td, t = this, ed = t.editor, s = t.settings;
n = DOM.add(tb, "tr"), n = td = DOM.add(n, "td", {
"class":"mceStatusbar"
}), n = DOM.add(n, "div", {
id:ed.id + "_path_row",
role:"group",
"aria-labelledby":ed.id + "_path_voice"
}), s.theme_advanced_path ? (DOM.add(n, "span", {
id:ed.id + "_path_voice"
}, ed.translate("advanced.path")), DOM.add(n, "span", {}, ": ")) :DOM.add(n, "span", {}, "&#160;"), 
s.theme_advanced_resizing && (DOM.add(td, "a", {
id:ed.id + "_resize",
href:"javascript:;",
onclick:"return false;",
"class":"mceResize",
tabIndex:"-1"
}), s.theme_advanced_resizing_use_cookie && ed.onPostRender.add(function() {
{
var o = Cookie.getHash("TinyMCE_" + ed.id + "_size");
DOM.get(ed.id + "_tbl");
}
o && t.resizeTo(o.cw, o.ch);
}), ed.onPostRender.add(function() {
Event.add(ed.id + "_resize", "click", function(e) {
e.preventDefault();
}), Event.add(ed.id + "_resize", "mousedown", function(e) {
function resizeOnMove(e) {
e.preventDefault(), width = startWidth + (e.screenX - startX), height = startHeight + (e.screenY - startY), 
t.resizeTo(width, height);
}
function endResize(e) {
Event.remove(DOM.doc, "mousemove", mouseMoveHandler1), Event.remove(ed.getDoc(), "mousemove", mouseMoveHandler2), 
Event.remove(DOM.doc, "mouseup", mouseUpHandler1), Event.remove(ed.getDoc(), "mouseup", mouseUpHandler2), 
width = startWidth + (e.screenX - startX), height = startHeight + (e.screenY - startY), 
t.resizeTo(width, height, !0);
}
var mouseMoveHandler1, mouseMoveHandler2, mouseUpHandler1, mouseUpHandler2, startX, startY, startWidth, startHeight, width, height, ifrElm;
e.preventDefault(), startX = e.screenX, startY = e.screenY, ifrElm = DOM.get(t.editor.id + "_ifr"), 
startWidth = width = ifrElm.clientWidth, startHeight = height = ifrElm.clientHeight, 
mouseMoveHandler1 = Event.add(DOM.doc, "mousemove", resizeOnMove), mouseMoveHandler2 = Event.add(ed.getDoc(), "mousemove", resizeOnMove), 
mouseUpHandler1 = Event.add(DOM.doc, "mouseup", endResize), mouseUpHandler2 = Event.add(ed.getDoc(), "mouseup", endResize);
});
})), o.deltaHeight -= 21, n = tb = null;
},
_updateUndoStatus:function(ed) {
var cm = ed.controlManager, um = ed.undoManager;
cm.setDisabled("undo", !um.hasUndo() && !um.typing), cm.setDisabled("redo", !um.hasRedo());
},
_nodeChanged:function(ed, cm, n, co, ob) {
function getParent(name) {
var i, parents = ob.parents, func = name;
for ("string" == typeof name && (func = function(node) {
return node.nodeName == name;
}), i = 0; i < parents.length; i++) if (func(parents[i])) return parents[i];
}
function updateColor(controlId, color) {
(c = cm.get(controlId)) && (color || (color = c.settings.default_color), color !== c.value && c.displayColor(color));
}
function updateColor(controlId, color) {
(c = cm.get(controlId)) && (color || (color = c.settings.default_color), color !== c.value && c.displayColor(color));
}
var p, v, c, cl, fz, fn, fc, bc, formatNames, matches, t = this, de = 0, s = t.settings;
tinymce.each(t.stateControls, function(c) {
cm.setActive(c, ed.queryCommandState(t.controls[c][1]));
}), cm.setActive("visualaid", ed.hasVisual), t._updateUndoStatus(ed), cm.setDisabled("outdent", !ed.queryCommandState("Outdent")), 
p = getParent("A"), (c = cm.get("link")) && (p && p.name || (c.setDisabled(!p && co), 
c.setActive(!!p))), (c = cm.get("unlink")) && (c.setDisabled(!p && co), c.setActive(!!p && !p.name)), 
(c = cm.get("anchor")) && c.setActive(!co && !!p && p.name), p = getParent("IMG"), 
(c = cm.get("image")) && c.setActive(!co && !!p && -1 == n.className.indexOf("mceItem")), 
(c = cm.get("styleselect")) && (t._importClasses(), formatNames = [], each(c.items, function(item) {
formatNames.push(item.value);
}), matches = ed.formatter.matchAll(formatNames), c.select(matches[0])), (c = cm.get("formatselect")) && (p = getParent(DOM.isBlock), 
p && c.select(p.nodeName.toLowerCase())), getParent(function(n) {
return "SPAN" === n.nodeName && !cl && n.className && (cl = n.className), ed.dom.is(n, s.theme_advanced_font_selector) && (!fz && n.style.fontSize && (fz = n.style.fontSize), 
!fn && n.style.fontFamily && (fn = n.style.fontFamily.replace(/[\"\']+/g, "").replace(/^([^,]+).*/, "$1").toLowerCase()), 
!fc && n.style.color && (fc = n.style.color), !bc && n.style.backgroundColor && (bc = n.style.backgroundColor)), 
!1;
}), (c = cm.get("fontselect")) && c.select(function(v) {
return v.replace(/^([^,]+).*/, "$1").toLowerCase() == fn;
}), (c = cm.get("fontsizeselect")) && (!s.theme_advanced_runtime_fontsize || fz || cl || (fz = ed.dom.getStyle(n, "fontSize", !0)), 
c.select(function(v) {
return v.fontSize && v.fontSize === fz ? !0 :v["class"] && v["class"] === cl ? !0 :void 0;
})), s.theme_advanced_show_current_color && (updateColor("forecolor", fc), updateColor("backcolor", bc)), 
s.theme_advanced_show_current_color && (updateColor("forecolor", fc), updateColor("backcolor", bc)), 
s.theme_advanced_path && s.theme_advanced_statusbar_location && (p = DOM.get(ed.id + "_path") || DOM.add(ed.id + "_path_row", "span", {
id:ed.id + "_path"
}), t.statusKeyboardNavigation && (t.statusKeyboardNavigation.destroy(), t.statusKeyboardNavigation = null), 
DOM.setHTML(p, ""), getParent(function(n) {
var pi, na = n.nodeName.toLowerCase(), ti = "";
if (!(1 != n.nodeType || "br" === na || n.getAttribute("data-mce-bogus") || DOM.hasClass(n, "mceItemHidden") || DOM.hasClass(n, "mceItemRemoved"))) {
switch (tinymce.isIE && "HTML" !== n.scopeName && (na = n.scopeName + ":" + na), 
na = na.replace(/mce\:/g, "")) {
case "b":
na = "strong";
break;

case "i":
na = "em";
break;

case "img":
(v = DOM.getAttrib(n, "src")) && (ti += "src: " + v + " ");
break;

case "a":
(v = DOM.getAttrib(n, "name")) && (ti += "name: " + v + " ", na += "#" + v), (v = DOM.getAttrib(n, "href")) && (ti += "href: " + v + " ");
break;

case "font":
(v = DOM.getAttrib(n, "face")) && (ti += "font: " + v + " "), (v = DOM.getAttrib(n, "size")) && (ti += "size: " + v + " "), 
(v = DOM.getAttrib(n, "color")) && (ti += "color: " + v + " ");
break;

case "span":
(v = DOM.getAttrib(n, "style")) && (ti += "style: " + v + " ");
}
(v = DOM.getAttrib(n, "id")) && (ti += "id: " + v + " "), (v = n.className) && (v = v.replace(/\b\s*(webkit|mce|Apple-)\w+\s*\b/g, ""), 
v && (ti += "class: " + v + " ", (DOM.isBlock(n) || "img" == na || "span" == na) && (na += "." + v))), 
na = na.replace(/(html:)/g, ""), na = {
name:na,
node:n,
title:ti
}, t.onResolveName.dispatch(t, na), ti = na.title, na = na.name, pi = DOM.create("a", {
href:"javascript:;",
role:"button",
onmousedown:"return false;",
title:ti,
"class":"mcePath_" + de++
}, na), p.hasChildNodes() ? (p.insertBefore(DOM.create("span", {
"aria-hidden":"true"
}, "\xa0\xbb "), p.firstChild), p.insertBefore(pi, p.firstChild)) :p.appendChild(pi);
}
}, ed.getBody()), DOM.select("a", p).length > 0 && (t.statusKeyboardNavigation = new tinymce.ui.KeyboardNavigation({
root:ed.id + "_path_row",
items:DOM.select("a", p),
excludeFromTabOrder:!0,
onCancel:function() {
ed.focus();
}
}, DOM)));
},
_sel:function(v) {
this.editor.execCommand("mceSelectNodeDepth", !1, v);
},
_mceInsertAnchor:function() {
var ed = this.editor;
ed.windowManager.open({
url:this.url + "/anchor.htm",
width:320 + parseInt(ed.getLang("advanced.anchor_delta_width", 0)),
height:90 + parseInt(ed.getLang("advanced.anchor_delta_height", 0)),
inline:!0
}, {
theme_url:this.url
});
},
_mceCharMap:function() {
var ed = this.editor;
ed.windowManager.open({
url:this.url + "/charmap.htm",
width:550 + parseInt(ed.getLang("advanced.charmap_delta_width", 0)),
height:250 + parseInt(ed.getLang("advanced.charmap_delta_height", 0)),
inline:!0
}, {
theme_url:this.url
});
},
_mceHelp:function() {
var ed = this.editor;
ed.windowManager.open({
url:this.url + "/about.htm",
width:480,
height:380,
inline:!0
}, {
theme_url:this.url
});
},
_mceShortcuts:function() {
var ed = this.editor;
ed.windowManager.open({
url:this.url + "/shortcuts.htm",
width:480,
height:380,
inline:!0
}, {
theme_url:this.url
});
},
_mceColorPicker:function(u, v) {
var ed = this.editor;
v = v || {}, ed.windowManager.open({
url:this.url + "/color_picker.htm",
width:375 + parseInt(ed.getLang("advanced.colorpicker_delta_width", 0)),
height:250 + parseInt(ed.getLang("advanced.colorpicker_delta_height", 0)),
close_previous:!1,
inline:!0
}, {
input_color:v.color,
func:v.func,
theme_url:this.url
});
},
_mceCodeEditor:function() {
var ed = this.editor;
ed.windowManager.open({
url:this.url + "/source_editor.htm",
width:parseInt(ed.getParam("theme_advanced_source_editor_width", 720)),
height:parseInt(ed.getParam("theme_advanced_source_editor_height", 580)),
inline:!0,
resizable:!0,
maximizable:!0
}, {
theme_url:this.url
});
},
_mceImage:function() {
var ed = this.editor;
-1 == ed.dom.getAttrib(ed.selection.getNode(), "class").indexOf("mceItem") && ed.windowManager.open({
url:this.url + "/image.htm",
width:355 + parseInt(ed.getLang("advanced.image_delta_width", 0)),
height:275 + parseInt(ed.getLang("advanced.image_delta_height", 0)),
inline:!0
}, {
theme_url:this.url
});
},
_mceLink:function() {
var ed = this.editor;
ed.windowManager.open({
url:this.url + "/link.htm",
width:310 + parseInt(ed.getLang("advanced.link_delta_width", 0)),
height:200 + parseInt(ed.getLang("advanced.link_delta_height", 0)),
inline:!0
}, {
theme_url:this.url
});
},
_mceNewDocument:function() {
var ed = this.editor;
ed.windowManager.confirm("advanced.newdocument", function(s) {
s && ed.execCommand("mceSetContent", !1, "");
});
},
_mceForeColor:function() {
var t = this;
this._mceColorPicker(0, {
color:t.fgColor,
func:function(co) {
t.fgColor = co, t.editor.execCommand("ForeColor", !1, co);
}
});
},
_mceBackColor:function() {
var t = this;
this._mceColorPicker(0, {
color:t.bgColor,
func:function(co) {
t.bgColor = co, t.editor.execCommand("HiliteColor", !1, co);
}
});
},
_ufirst:function(s) {
return s.substring(0, 1).toUpperCase() + s.substring(1);
}
}), tinymce.ThemeManager.add("advanced", tinymce.themes.AdvancedTheme);
}(tinymce);