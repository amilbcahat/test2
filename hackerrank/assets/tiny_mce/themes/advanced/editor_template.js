!function(e) {
var g, d = e.DOM, b = e.dom.Event, h = e.extend, f = e.each, a = e.util.Cookie, c = e.explode;
e.ThemeManager.requireLangPack("advanced"), e.create("tinymce.themes.AdvancedTheme", {
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
init:function(j, k) {
var m, i, n, l = this;
l.editor = j, l.url = k, l.onResolveName = new e.util.Dispatcher(this), j.forcedHighContrastMode = j.settings.detect_highcontrast && l._isHighContrast(), 
j.settings.skin = j.forcedHighContrastMode ? "highcontrast" :j.settings.skin, l.settings = m = h({
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
readonly:j.settings.readonly
}, j.settings), m.font_size_style_values || (m.font_size_style_values = "8pt,10pt,12pt,14pt,18pt,24pt,36pt"), 
e.is(m.theme_advanced_font_sizes, "string") && (m.font_size_style_values = e.explode(m.font_size_style_values), 
m.font_size_classes = e.explode(m.font_size_classes || ""), n = {}, j.settings.theme_advanced_font_sizes = m.theme_advanced_font_sizes, 
f(j.getParam("theme_advanced_font_sizes", "", "hash"), function(q, p) {
var o;
p == q && q >= 1 && 7 >= q && (p = q + " (" + l.sizes[q - 1] + "pt)", o = m.font_size_classes[q - 1], 
q = m.font_size_style_values[q - 1] || l.sizes[q - 1] + "pt"), /^\s*\./.test(q) && (o = q.replace(/\./g, "")), 
n[p] = o ? {
"class":o
} :{
fontSize:q
};
}), m.theme_advanced_font_sizes = n), (i = m.theme_advanced_path_location) && "none" != i && (m.theme_advanced_statusbar_location = m.theme_advanced_path_location), 
"none" == m.theme_advanced_statusbar_location && (m.theme_advanced_statusbar_location = 0), 
j.settings.content_css !== !1 && j.contentCSS.push(j.baseURI.toAbsolute(k + "/skins/" + j.settings.skin + "/content.css")), 
j.onInit.add(function() {
j.settings.readonly || (j.onNodeChange.add(l._nodeChanged, l), j.onKeyUp.add(l._updateUndoStatus, l), 
j.onMouseUp.add(l._updateUndoStatus, l), j.dom.bind(j.dom.getRoot(), "dragend", function() {
l._updateUndoStatus(j);
}));
}), j.onSetProgressState.add(function(q, o, r) {
var s, p, t = q.id;
o ? l.progressTimer = setTimeout(function() {
s = q.getContainer(), s = s.insertBefore(d.create("DIV", {
style:"position:relative"
}), s.firstChild), p = d.get(q.id + "_tbl"), d.add(s, "div", {
id:t + "_blocker",
"class":"mceBlocker",
style:{
width:p.clientWidth + 2,
height:p.clientHeight + 2
}
}), d.add(s, "div", {
id:t + "_progress",
"class":"mceProgress",
style:{
left:p.clientWidth / 2,
top:p.clientHeight / 2
}
});
}, r || 0) :(d.remove(t + "_blocker"), d.remove(t + "_progress"), clearTimeout(l.progressTimer));
}), d.loadCSS(m.editor_css ? j.documentBaseURI.toAbsolute(m.editor_css) :k + "/skins/" + j.settings.skin + "/ui.css"), 
m.skin_variant && d.loadCSS(k + "/skins/" + j.settings.skin + "/ui_" + m.skin_variant + ".css");
},
_isHighContrast:function() {
var i, j = d.add(d.getRoot(), "div", {
style:"background-color: rgb(171,239,86);"
});
return i = (d.getStyle(j, "background-color", !0) + "").toLowerCase().replace(/ /g, ""), 
d.remove(j), "rgb(171,239,86)" != i && "#abef56" != i;
},
createControl:function(l, i) {
var j, k;
if (k = i.createControl(l)) return k;
switch (l) {
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
return (j = this.controls[l]) ? i.createButton(l, {
title:"advanced." + j[0],
cmd:j[1],
ui:j[2],
value:j[3]
}) :void 0;
},
execCommand:function(k, j, l) {
var i = this["_" + k];
return i ? (i.call(this, j, l), !0) :!1;
},
_importClasses:function() {
var i = this.editor, j = i.controlManager.get("styleselect");
0 == j.getLength() && f(i.dom.getClasses(), function(n, l) {
var m = "style_" + l;
i.formatter.register(m, {
inline:"span",
attributes:{
"class":n["class"]
},
selector:"*"
}), j.add(n["class"], m);
});
},
_createStyleSelect:function() {
var l, k = this, i = k.editor, j = i.controlManager;
return l = j.createListBox("styleselect", {
title:"advanced.style_select",
onselect:function(o) {
var p, n = [];
return f(l.items, function(q) {
n.push(q.value);
}), i.focus(), i.undoManager.add(), p = i.formatter.matchAll(n), o && p[0] != o ? i.formatter.apply(o) :p[0] && i.formatter.remove(p[0]), 
i.undoManager.add(), i.nodeChanged(), !1;
}
}), i.onInit.add(function() {
var o = 0, n = i.getParam("style_formats");
n ? f(n, function(p) {
var q, r = 0;
f(p, function() {
r++;
}), r > 1 ? (q = p.name = p.name || "style_" + o++, i.formatter.register(q, p), 
l.add(p.title, q)) :l.add(p.title);
}) :f(i.getParam("theme_advanced_styles", "", "hash"), function(r, q) {
var p;
r && (p = "style_" + o++, i.formatter.register(p, {
inline:"span",
classes:r,
selector:"*"
}), l.add(k.editor.translate(q), p));
});
}), 0 == l.getLength() && l.onPostRender.add(function(o, p) {
l.NativeListBox ? b.add(p.id, "focus", k._importClasses, k) :(b.add(p.id + "_text", "focus", k._importClasses, k), 
b.add(p.id + "_text", "mousedown", k._importClasses, k), b.add(p.id + "_open", "focus", k._importClasses, k), 
b.add(p.id + "_open", "mousedown", k._importClasses, k));
}), l;
},
_createFontSelect:function() {
var k, j = this, i = j.editor;
return k = i.controlManager.createListBox("fontselect", {
title:"advanced.fontdefault",
onselect:function(l) {
var m = k.items[k.selectedIndex];
return !l && m ? (i.execCommand("FontName", !1, m.value), void 0) :(i.execCommand("FontName", !1, l), 
k.select(function(n) {
return l == n;
}), m && m.value == l && k.select(null), !1);
}
}), k && f(i.getParam("theme_advanced_fonts", j.settings.theme_advanced_fonts, "hash"), function(m, l) {
k.add(i.translate(l), m, {
style:-1 == m.indexOf("dings") ? "font-family:" + m :""
});
}), k;
},
_createFontSizeSelect:function() {
var n, m = this, k = m.editor, l = 0;
return n = k.controlManager.createListBox("fontsizeselect", {
title:"advanced.font_size",
onselect:function(i) {
var o = n.items[n.selectedIndex];
return !i && o ? (o = o.value, o["class"] ? (k.formatter.toggle("fontsize_class", {
value:o["class"]
}), k.undoManager.add(), k.nodeChanged()) :k.execCommand("FontSize", !1, o.fontSize), 
void 0) :(i["class"] ? (k.focus(), k.undoManager.add(), k.formatter.toggle("fontsize_class", {
value:i["class"]
}), k.undoManager.add(), k.nodeChanged()) :k.execCommand("FontSize", !1, i.fontSize), 
n.select(function(p) {
return i == p;
}), !o || o.value.fontSize != i.fontSize && o.value["class"] != i["class"] || n.select(null), 
!1);
}
}), n && f(m.settings.theme_advanced_font_sizes, function(o, i) {
var p = o.fontSize;
p >= 1 && 7 >= p && (p = m.sizes[parseInt(p) - 1] + "pt"), n.add(i, o, {
style:"font-size:" + p,
"class":"mceFontSize" + l++ + (" " + (o["class"] || ""))
});
}), n;
},
_createBlockFormats:function() {
var k, i = {
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
}, j = this;
return k = j.editor.controlManager.createListBox("formatselect", {
title:"advanced.block",
onselect:function(l) {
return j.editor.execCommand("FormatBlock", !1, l), !1;
}
}), k && f(j.editor.getParam("theme_advanced_blockformats", j.settings.theme_advanced_blockformats, "hash"), function(m, l) {
k.add(j.editor.translate(l != m ? l :i[m]), m, {
"class":"mce_formatPreview mce_" + m
});
}), k;
},
_createForeColorMenu:function() {
var m, i, j = this, k = j.settings, l = {};
return k.theme_advanced_more_colors && (l.more_colors_func = function() {
j._mceColorPicker(0, {
color:m.value,
func:function(n) {
m.setColor(n);
}
});
}), (i = k.theme_advanced_text_colors) && (l.colors = i), k.theme_advanced_default_foreground_color && (l.default_color = k.theme_advanced_default_foreground_color), 
l.title = "advanced.forecolor_desc", l.cmd = "ForeColor", l.scope = this, m = j.editor.controlManager.createColorSplitButton("forecolor", l);
},
_createBackColorMenu:function() {
var m, i, j = this, k = j.settings, l = {};
return k.theme_advanced_more_colors && (l.more_colors_func = function() {
j._mceColorPicker(0, {
color:m.value,
func:function(n) {
m.setColor(n);
}
});
}), (i = k.theme_advanced_background_colors) && (l.colors = i), k.theme_advanced_default_background_color && (l.default_color = k.theme_advanced_default_background_color), 
l.title = "advanced.backcolor_desc", l.cmd = "HiliteColor", l.scope = this, m = j.editor.controlManager.createColorSplitButton("backcolor", l);
},
renderUI:function(k) {
var m, l, q, u, j, i, v = this, r = v.editor, w = v.settings;
switch (r.settings && (r.settings.aria_label = w.aria_label + r.getLang("advanced.help_shortcut")), 
m = j = d.create("span", {
role:"application",
"aria-labelledby":r.id + "_voice",
id:r.id + "_parent",
"class":"mceEditor " + r.settings.skin + "Skin" + (w.skin_variant ? " " + r.settings.skin + "Skin" + v._ufirst(w.skin_variant) :"")
}), d.add(m, "span", {
"class":"mceVoiceLabel",
style:"display:none;",
id:r.id + "_voice"
}, w.aria_label), d.boxModel || (m = d.add(m, "div", {
"class":"mceOldBoxModel"
})), m = u = d.add(m, "table", {
role:"presentation",
id:r.id + "_tbl",
"class":"mceLayout",
cellSpacing:0,
cellPadding:0
}), m = q = d.add(m, "tbody"), (w.theme_advanced_layout_manager || "").toLowerCase()) {
case "rowlayout":
l = v._rowLayout(w, q, k);
break;

case "customlayout":
l = r.execCallback("theme_advanced_custom_layout", w, q, k, j);
break;

default:
l = v._simpleLayout(w, q, k, j);
}
return m = k.targetNode, i = u.rows, d.addClass(i[0], "mceFirst"), d.addClass(i[i.length - 1], "mceLast"), 
f(d.select("tr", q), function(o) {
d.addClass(o.firstChild, "mceFirst"), d.addClass(o.childNodes[o.childNodes.length - 1], "mceLast");
}), d.get(w.theme_advanced_toolbar_container) ? d.get(w.theme_advanced_toolbar_container).appendChild(j) :d.insertAfter(j, m), 
b.add(r.id + "_path_row", "click", function(n) {
return n = n.target, "A" == n.nodeName ? (v._sel(n.className.replace(/^.*mcePath_([0-9]+).*$/, "$1")), 
b.cancel(n)) :void 0;
}), r.getParam("accessibility_focus") || b.add(d.add(j, "a", {
href:"#"
}, "<!-- IE -->"), "focus", function() {
tinyMCE.get(r.id).focus();
}), "external" == w.theme_advanced_toolbar_location && (k.deltaHeight = 0), v.deltaHeight = k.deltaHeight, 
k.targetNode = null, r.onKeyDown.add(function(p, n) {
var s = 121, o = 122;
if (n.altKey) {
if (n.keyCode === s) return window.focus(), v.toolbarGroup.focus(), b.cancel(n);
if (n.keyCode === o) return d.get(p.id + "_path_row").focus(), b.cancel(n);
}
}), r.addShortcut("alt+0", "", "mceShortcuts", v), {
iframeContainer:l,
editorContainer:r.id + "_parent",
sizeContainer:u,
deltaHeight:k.deltaHeight
};
},
getInfo:function() {
return {
longname:"Advanced theme",
author:"Moxiecode Systems AB",
authorurl:"http://tinymce.moxiecode.com",
version:e.majorVersion + "." + e.minorVersion
};
},
resizeBy:function(i, j) {
var k = d.get(this.editor.id + "_ifr");
this.resizeTo(k.clientWidth + i, k.clientHeight + j);
},
resizeTo:function(i, m, k) {
var j = this.editor, l = this.settings, n = d.get(j.id + "_tbl"), o = d.get(j.id + "_ifr");
i = Math.max(l.theme_advanced_resizing_min_width || 100, i), m = Math.max(l.theme_advanced_resizing_min_height || 100, m), 
i = Math.min(l.theme_advanced_resizing_max_width || 65535, i), m = Math.min(l.theme_advanced_resizing_max_height || 65535, m), 
d.setStyle(n, "height", ""), d.setStyle(o, "height", m), l.theme_advanced_resize_horizontal && (d.setStyle(n, "width", ""), 
d.setStyle(o, "width", i), i < n.clientWidth && (i = n.clientWidth, d.setStyle(o, "width", n.clientWidth))), 
k && l.theme_advanced_resizing_use_cookie && a.setHash("TinyMCE_" + j.id + "_size", {
cw:i,
ch:m
});
},
destroy:function() {
var i = this.editor.id;
b.clear(i + "_resize"), b.clear(i + "_path_row"), b.clear(i + "_external_close");
},
_simpleLayout:function(y, r, k, i) {
var l, j, q, w, x = this, u = x.editor, v = y.theme_advanced_toolbar_location, m = y.theme_advanced_statusbar_location;
return y.readonly ? (l = d.add(r, "tr"), l = j = d.add(l, "td", {
"class":"mceIframeContainer"
}), j) :("top" == v && x._addToolbars(r, k), "external" == v && (l = w = d.create("div", {
style:"position:relative"
}), l = d.add(l, "div", {
id:u.id + "_external",
"class":"mceExternalToolbar"
}), d.add(l, "a", {
id:u.id + "_external_close",
href:"javascript:;",
"class":"mceExternalClose"
}), l = d.add(l, "table", {
id:u.id + "_tblext",
cellSpacing:0,
cellPadding:0
}), q = d.add(l, "tbody"), "mceOldBoxModel" == i.firstChild.className ? i.firstChild.appendChild(w) :i.insertBefore(w, i.firstChild), 
x._addToolbars(q, k), u.onMouseUp.add(function() {
var o = d.get(u.id + "_external");
d.show(o), d.hide(g);
var n = b.add(u.id + "_external_close", "click", function() {
d.hide(u.id + "_external"), b.remove(u.id + "_external_close", "click", n);
});
d.show(o), d.setStyle(o, "top", 0 - d.getRect(u.id + "_tblext").h - 1), d.hide(o), 
d.show(o), o.style.filter = "", g = u.id + "_external", o = null;
})), "top" == m && x._addStatusBar(r, k), y.theme_advanced_toolbar_container || (l = d.add(r, "tr"), 
l = j = d.add(l, "td", {
"class":"mceIframeContainer"
})), "bottom" == v && x._addToolbars(r, k), "bottom" == m && x._addStatusBar(r, k), 
j);
},
_rowLayout:function(w, m, k) {
var u, x, l, j, r, q, v = this, p = v.editor, i = p.controlManager;
return u = w.theme_advanced_containers_default_class || "", x = w.theme_advanced_containers_default_align || "center", 
f(c(w.theme_advanced_containers || ""), function(s, o) {
var n = w["theme_advanced_container_" + s] || "";
switch (s.toLowerCase()) {
case "mceeditor":
l = d.add(m, "tr"), l = j = d.add(l, "td", {
"class":"mceIframeContainer"
});
break;

case "mceelementpath":
v._addStatusBar(m, k);
break;

default:
q = (w["theme_advanced_container_" + s + "_align"] || x).toLowerCase(), q = "mce" + v._ufirst(q), 
l = d.add(d.add(m, "tr"), "td", {
"class":"mceToolbar " + (w["theme_advanced_container_" + s + "_class"] || u) + " " + q || x
}), r = i.createToolbar("toolbar" + o), v._addControls(n, r), d.setHTML(l, r.renderHTML()), 
k.deltaHeight -= w.theme_advanced_row_height;
}
}), j;
},
_addControls:function(j, i) {
var m, k = this, l = k.settings, n = k.editor.controlManager;
l.theme_advanced_disable && !k._disabled ? (m = {}, f(c(l.theme_advanced_disable), function(o) {
m[o] = 1;
}), k._disabled = m) :m = k._disabled, f(c(j), function(p) {
var o;
if (!m || !m[p]) {
if ("tablecontrols" == p) return f([ "table", "|", "row_props", "cell_props", "|", "row_before", "row_after", "delete_row", "|", "col_before", "col_after", "delete_col", "|", "split_cells", "merge_cells" ], function(q) {
q = k.createControl(q, n), q && i.add(q);
}), void 0;
o = k.createControl(p, n), o && i.add(o);
}
});
},
_addToolbars:function(x, k) {
var p, m, z, l, y, w, A = this, r = A.editor, B = A.settings, j = r.controlManager, q = [];
for (w = j.createToolbarGroup("toolbargroup", {
name:r.getLang("advanced.toolbar"),
tab_focus_toolbar:r.getParam("theme_advanced_tab_focus_toolbar")
}), A.toolbarGroup = w, y = B.theme_advanced_toolbar_align.toLowerCase(), y = "mce" + A._ufirst(y), 
l = d.add(d.add(x, "tr", {
role:"presentation"
}), "td", {
"class":"mceToolbar " + y,
role:"presentation"
}), p = 1; z = B["theme_advanced_buttons" + p]; p++) m = j.createToolbar("toolbar" + p, {
"class":"mceToolbarRow" + p
}), B["theme_advanced_buttons" + p + "_add"] && (z += "," + B["theme_advanced_buttons" + p + "_add"]), 
B["theme_advanced_buttons" + p + "_add_before"] && (z = B["theme_advanced_buttons" + p + "_add_before"] + "," + z), 
A._addControls(z, m), w.add(m), k.deltaHeight -= B.theme_advanced_row_height;
q.push(w.renderHTML()), q.push(d.createHTML("a", {
href:"#",
accesskey:"z",
title:r.getLang("advanced.toolbar_focus"),
onfocus:"tinyMCE.getInstanceById('" + r.id + "').focus();"
}, "<!-- IE -->")), d.setHTML(l, q.join(""));
},
_addStatusBar:function(m, j) {
var k, l, v = this, p = v.editor, w = v.settings;
k = d.add(m, "tr"), k = l = d.add(k, "td", {
"class":"mceStatusbar"
}), k = d.add(k, "div", {
id:p.id + "_path_row",
role:"group",
"aria-labelledby":p.id + "_path_voice"
}), w.theme_advanced_path ? (d.add(k, "span", {
id:p.id + "_path_voice"
}, p.translate("advanced.path")), d.add(k, "span", {}, ": ")) :d.add(k, "span", {}, "&#160;"), 
w.theme_advanced_resizing && (d.add(l, "a", {
id:p.id + "_resize",
href:"javascript:;",
onclick:"return false;",
"class":"mceResize",
tabIndex:"-1"
}), w.theme_advanced_resizing_use_cookie && p.onPostRender.add(function() {
{
var n = a.getHash("TinyMCE_" + p.id + "_size");
d.get(p.id + "_tbl");
}
n && v.resizeTo(n.cw, n.ch);
}), p.onPostRender.add(function() {
b.add(p.id + "_resize", "click", function(n) {
n.preventDefault();
}), b.add(p.id + "_resize", "mousedown", function(D) {
function y(G) {
G.preventDefault(), n = A + (G.screenX - C), E = F + (G.screenY - z), v.resizeTo(n, E);
}
function B(G) {
b.remove(d.doc, "mousemove", t), b.remove(p.getDoc(), "mousemove", r), b.remove(d.doc, "mouseup", s), 
b.remove(p.getDoc(), "mouseup", o), n = A + (G.screenX - C), E = F + (G.screenY - z), 
v.resizeTo(n, E, !0);
}
var t, r, s, o, C, z, A, F, n, E, x;
D.preventDefault(), C = D.screenX, z = D.screenY, x = d.get(v.editor.id + "_ifr"), 
A = n = x.clientWidth, F = E = x.clientHeight, t = b.add(d.doc, "mousemove", y), 
r = b.add(p.getDoc(), "mousemove", y), s = b.add(d.doc, "mouseup", B), o = b.add(p.getDoc(), "mouseup", B);
});
})), j.deltaHeight -= 21, k = m = null;
},
_updateUndoStatus:function(j) {
var i = j.controlManager, k = j.undoManager;
i.setDisabled("undo", !k.hasUndo() && !k.typing), i.setDisabled("redo", !k.hasRedo());
},
_nodeChanged:function(m, r, D, q, E) {
function o(p) {
var s, n = E.parents, t = p;
for ("string" == typeof p && (t = function(v) {
return v.nodeName == p;
}), s = 0; s < n.length; s++) if (t(n[s])) return n[s];
}
function A(p, n) {
(G = r.get(p)) && (n || (n = G.settings.default_color), n !== G.value && G.displayColor(n));
}
function A(p, n) {
(G = r.get(p)) && (n || (n = G.settings.default_color), n !== G.value && G.displayColor(n));
}
var C, x, G, w, k, u, B, l, j, i, y = this, F = 0, z = y.settings;
e.each(y.stateControls, function(n) {
r.setActive(n, m.queryCommandState(y.controls[n][1]));
}), r.setActive("visualaid", m.hasVisual), y._updateUndoStatus(m), r.setDisabled("outdent", !m.queryCommandState("Outdent")), 
C = o("A"), (G = r.get("link")) && (C && C.name || (G.setDisabled(!C && q), G.setActive(!!C))), 
(G = r.get("unlink")) && (G.setDisabled(!C && q), G.setActive(!!C && !C.name)), 
(G = r.get("anchor")) && G.setActive(!q && !!C && C.name), C = o("IMG"), (G = r.get("image")) && G.setActive(!q && !!C && -1 == D.className.indexOf("mceItem")), 
(G = r.get("styleselect")) && (y._importClasses(), j = [], f(G.items, function(n) {
j.push(n.value);
}), i = m.formatter.matchAll(j), G.select(i[0])), (G = r.get("formatselect")) && (C = o(d.isBlock), 
C && G.select(C.nodeName.toLowerCase())), o(function(p) {
return "SPAN" === p.nodeName && !w && p.className && (w = p.className), m.dom.is(p, z.theme_advanced_font_selector) && (!k && p.style.fontSize && (k = p.style.fontSize), 
!u && p.style.fontFamily && (u = p.style.fontFamily.replace(/[\"\']+/g, "").replace(/^([^,]+).*/, "$1").toLowerCase()), 
!B && p.style.color && (B = p.style.color), !l && p.style.backgroundColor && (l = p.style.backgroundColor)), 
!1;
}), (G = r.get("fontselect")) && G.select(function(n) {
return n.replace(/^([^,]+).*/, "$1").toLowerCase() == u;
}), (G = r.get("fontsizeselect")) && (!z.theme_advanced_runtime_fontsize || k || w || (k = m.dom.getStyle(D, "fontSize", !0)), 
G.select(function(n) {
return n.fontSize && n.fontSize === k ? !0 :n["class"] && n["class"] === w ? !0 :void 0;
})), z.theme_advanced_show_current_color && (A("forecolor", B), A("backcolor", l)), 
z.theme_advanced_show_current_color && (A("forecolor", B), A("backcolor", l)), z.theme_advanced_path && z.theme_advanced_statusbar_location && (C = d.get(m.id + "_path") || d.add(m.id + "_path_row", "span", {
id:m.id + "_path"
}), y.statusKeyboardNavigation && (y.statusKeyboardNavigation.destroy(), y.statusKeyboardNavigation = null), 
d.setHTML(C, ""), o(function(H) {
var v, p = H.nodeName.toLowerCase(), t = "";
if (!(1 != H.nodeType || "br" === p || H.getAttribute("data-mce-bogus") || d.hasClass(H, "mceItemHidden") || d.hasClass(H, "mceItemRemoved"))) {
switch (e.isIE && "HTML" !== H.scopeName && (p = H.scopeName + ":" + p), p = p.replace(/mce\:/g, "")) {
case "b":
p = "strong";
break;

case "i":
p = "em";
break;

case "img":
(x = d.getAttrib(H, "src")) && (t += "src: " + x + " ");
break;

case "a":
(x = d.getAttrib(H, "name")) && (t += "name: " + x + " ", p += "#" + x), (x = d.getAttrib(H, "href")) && (t += "href: " + x + " ");
break;

case "font":
(x = d.getAttrib(H, "face")) && (t += "font: " + x + " "), (x = d.getAttrib(H, "size")) && (t += "size: " + x + " "), 
(x = d.getAttrib(H, "color")) && (t += "color: " + x + " ");
break;

case "span":
(x = d.getAttrib(H, "style")) && (t += "style: " + x + " ");
}
(x = d.getAttrib(H, "id")) && (t += "id: " + x + " "), (x = H.className) && (x = x.replace(/\b\s*(webkit|mce|Apple-)\w+\s*\b/g, ""), 
x && (t += "class: " + x + " ", (d.isBlock(H) || "img" == p || "span" == p) && (p += "." + x))), 
p = p.replace(/(html:)/g, ""), p = {
name:p,
node:H,
title:t
}, y.onResolveName.dispatch(y, p), t = p.title, p = p.name, v = d.create("a", {
href:"javascript:;",
role:"button",
onmousedown:"return false;",
title:t,
"class":"mcePath_" + F++
}, p), C.hasChildNodes() ? (C.insertBefore(d.create("span", {
"aria-hidden":"true"
}, "\xa0\xbb "), C.firstChild), C.insertBefore(v, C.firstChild)) :C.appendChild(v);
}
}, m.getBody()), d.select("a", C).length > 0 && (y.statusKeyboardNavigation = new e.ui.KeyboardNavigation({
root:m.id + "_path_row",
items:d.select("a", C),
excludeFromTabOrder:!0,
onCancel:function() {
m.focus();
}
}, d)));
},
_sel:function(i) {
this.editor.execCommand("mceSelectNodeDepth", !1, i);
},
_mceInsertAnchor:function() {
var i = this.editor;
i.windowManager.open({
url:this.url + "/anchor.htm",
width:320 + parseInt(i.getLang("advanced.anchor_delta_width", 0)),
height:90 + parseInt(i.getLang("advanced.anchor_delta_height", 0)),
inline:!0
}, {
theme_url:this.url
});
},
_mceCharMap:function() {
var i = this.editor;
i.windowManager.open({
url:this.url + "/charmap.htm",
width:550 + parseInt(i.getLang("advanced.charmap_delta_width", 0)),
height:250 + parseInt(i.getLang("advanced.charmap_delta_height", 0)),
inline:!0
}, {
theme_url:this.url
});
},
_mceHelp:function() {
var i = this.editor;
i.windowManager.open({
url:this.url + "/about.htm",
width:480,
height:380,
inline:!0
}, {
theme_url:this.url
});
},
_mceShortcuts:function() {
var i = this.editor;
i.windowManager.open({
url:this.url + "/shortcuts.htm",
width:480,
height:380,
inline:!0
}, {
theme_url:this.url
});
},
_mceColorPicker:function(k, j) {
var i = this.editor;
j = j || {}, i.windowManager.open({
url:this.url + "/color_picker.htm",
width:375 + parseInt(i.getLang("advanced.colorpicker_delta_width", 0)),
height:250 + parseInt(i.getLang("advanced.colorpicker_delta_height", 0)),
close_previous:!1,
inline:!0
}, {
input_color:j.color,
func:j.func,
theme_url:this.url
});
},
_mceCodeEditor:function() {
var i = this.editor;
i.windowManager.open({
url:this.url + "/source_editor.htm",
width:parseInt(i.getParam("theme_advanced_source_editor_width", 720)),
height:parseInt(i.getParam("theme_advanced_source_editor_height", 580)),
inline:!0,
resizable:!0,
maximizable:!0
}, {
theme_url:this.url
});
},
_mceImage:function() {
var i = this.editor;
-1 == i.dom.getAttrib(i.selection.getNode(), "class").indexOf("mceItem") && i.windowManager.open({
url:this.url + "/image.htm",
width:355 + parseInt(i.getLang("advanced.image_delta_width", 0)),
height:275 + parseInt(i.getLang("advanced.image_delta_height", 0)),
inline:!0
}, {
theme_url:this.url
});
},
_mceLink:function() {
var i = this.editor;
i.windowManager.open({
url:this.url + "/link.htm",
width:310 + parseInt(i.getLang("advanced.link_delta_width", 0)),
height:200 + parseInt(i.getLang("advanced.link_delta_height", 0)),
inline:!0
}, {
theme_url:this.url
});
},
_mceNewDocument:function() {
var i = this.editor;
i.windowManager.confirm("advanced.newdocument", function(j) {
j && i.execCommand("mceSetContent", !1, "");
});
},
_mceForeColor:function() {
var i = this;
this._mceColorPicker(0, {
color:i.fgColor,
func:function(j) {
i.fgColor = j, i.editor.execCommand("ForeColor", !1, j);
}
});
},
_mceBackColor:function() {
var i = this;
this._mceColorPicker(0, {
color:i.bgColor,
func:function(j) {
i.bgColor = j, i.editor.execCommand("HiliteColor", !1, j);
}
});
},
_ufirst:function(i) {
return i.substring(0, 1).toUpperCase() + i.substring(1);
}
}), e.ThemeManager.add("advanced", e.themes.AdvancedTheme);
}(tinymce);