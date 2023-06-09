!function() {
var d = tinymce.DOM, b = tinymce.dom.Element, a = tinymce.dom.Event, e = tinymce.each, c = tinymce.is;
tinymce.create("tinymce.plugins.InlinePopups", {
init:function(f, g) {
f.onBeforeRenderUI.add(function() {
f.windowManager = new tinymce.InlineWindowManager(f), d.loadCSS(g + "/skins/" + (f.settings.inlinepopups_skin || "clearlooks2") + "/window.css");
});
},
getInfo:function() {
return {
longname:"InlinePopups",
author:"Moxiecode Systems AB",
authorurl:"http://tinymce.moxiecode.com",
infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/inlinepopups",
version:tinymce.majorVersion + "." + tinymce.minorVersion
};
}
}), tinymce.create("tinymce.InlineWindowManager:tinymce.WindowManager", {
InlineWindowManager:function(f) {
var g = this;
g.parent(f), g.zIndex = 3e5, g.count = 0, g.windows = {};
},
open:function(s, j) {
var i, h, o, q, x, y, n, z = this, k = "", r = z.editor, g = 0, v = 0;
return s = s || {}, j = j || {}, s.inline ? (n = z._frontWindow(), n && d.get(n.id + "_ifr") && (n.focussedElement = d.get(n.id + "_ifr").contentWindow.document.activeElement), 
s.type || (z.bookmark = r.selection.getBookmark(1)), i = d.uniqueId(), h = d.getViewPort(), 
s.width = parseInt(s.width || 320), s.height = parseInt(s.height || 240) + (tinymce.isIE ? 8 :0), 
s.min_width = parseInt(s.min_width || 150), s.min_height = parseInt(s.min_height || 100), 
s.max_width = parseInt(s.max_width || 2e3), s.max_height = parseInt(s.max_height || 2e3), 
s.left = s.left || Math.round(Math.max(h.x, h.x + h.w / 2 - s.width / 2)), s.top = s.top || Math.round(Math.max(h.y, h.y + h.h / 2 - s.height / 2)), 
s.movable = s.resizable = !0, j.mce_width = s.width, j.mce_height = s.height, j.mce_inline = !0, 
j.mce_window_id = i, j.mce_auto_focus = s.auto_focus, z.features = s, z.params = j, 
z.onOpen.dispatch(z, s, j), s.type && (k += " mceModal", s.type && (k += " mce" + s.type.substring(0, 1).toUpperCase() + s.type.substring(1)), 
s.resizable = !1), s.statusbar && (k += " mceStatusbar"), s.resizable && (k += " mceResizable"), 
s.minimizable && (k += " mceMinimizable"), s.maximizable && (k += " mceMaximizable"), 
s.movable && (k += " mceMovable"), z._addAll(d.doc.body, [ "div", {
id:i,
role:"dialog",
"aria-labelledby":s.type ? i + "_content" :i + "_title",
"class":(r.settings.inlinepopups_skin || "clearlooks2") + (tinymce.isIE && window.getSelection ? " ie9" :""),
style:"width:100px;height:100px"
}, [ "div", {
id:i + "_wrapper",
"class":"mceWrapper" + k
}, [ "div", {
id:i + "_top",
"class":"mceTop"
}, [ "div", {
"class":"mceLeft"
} ], [ "div", {
"class":"mceCenter"
} ], [ "div", {
"class":"mceRight"
} ], [ "span", {
id:i + "_title"
}, s.title || "" ] ], [ "div", {
id:i + "_middle",
"class":"mceMiddle"
}, [ "div", {
id:i + "_left",
"class":"mceLeft",
tabindex:"0"
} ], [ "span", {
id:i + "_content"
} ], [ "div", {
id:i + "_right",
"class":"mceRight",
tabindex:"0"
} ] ], [ "div", {
id:i + "_bottom",
"class":"mceBottom"
}, [ "div", {
"class":"mceLeft"
} ], [ "div", {
"class":"mceCenter"
} ], [ "div", {
"class":"mceRight"
} ], [ "span", {
id:i + "_status"
}, "Content" ] ], [ "a", {
"class":"mceMove",
tabindex:"-1",
href:"javascript:;"
} ], [ "a", {
"class":"mceMin",
tabindex:"-1",
href:"javascript:;",
onmousedown:"return false;"
} ], [ "a", {
"class":"mceMax",
tabindex:"-1",
href:"javascript:;",
onmousedown:"return false;"
} ], [ "a", {
"class":"mceMed",
tabindex:"-1",
href:"javascript:;",
onmousedown:"return false;"
} ], [ "a", {
"class":"mceClose",
tabindex:"-1",
href:"javascript:;",
onmousedown:"return false;"
} ], [ "a", {
id:i + "_resize_n",
"class":"mceResize mceResizeN",
tabindex:"-1",
href:"javascript:;"
} ], [ "a", {
id:i + "_resize_s",
"class":"mceResize mceResizeS",
tabindex:"-1",
href:"javascript:;"
} ], [ "a", {
id:i + "_resize_w",
"class":"mceResize mceResizeW",
tabindex:"-1",
href:"javascript:;"
} ], [ "a", {
id:i + "_resize_e",
"class":"mceResize mceResizeE",
tabindex:"-1",
href:"javascript:;"
} ], [ "a", {
id:i + "_resize_nw",
"class":"mceResize mceResizeNW",
tabindex:"-1",
href:"javascript:;"
} ], [ "a", {
id:i + "_resize_ne",
"class":"mceResize mceResizeNE",
tabindex:"-1",
href:"javascript:;"
} ], [ "a", {
id:i + "_resize_sw",
"class":"mceResize mceResizeSW",
tabindex:"-1",
href:"javascript:;"
} ], [ "a", {
id:i + "_resize_se",
"class":"mceResize mceResizeSE",
tabindex:"-1",
href:"javascript:;"
} ] ] ]), d.setStyles(i, {
top:-1e4,
left:-1e4
}), tinymce.isGecko && d.setStyle(i, "overflow", "auto"), s.type || (g += d.get(i + "_left").clientWidth, 
g += d.get(i + "_right").clientWidth, v += d.get(i + "_top").clientHeight, v += d.get(i + "_bottom").clientHeight), 
d.setStyles(i, {
top:s.top,
left:s.left,
width:s.width + g,
height:s.height + v
}), y = s.url || s.file, y && (tinymce.relaxedDomain && (y += (-1 == y.indexOf("?") ? "?" :"&") + "mce_rdomain=" + tinymce.relaxedDomain), 
y = tinymce._addVer(y)), s.type ? (d.add(i + "_wrapper", "a", {
id:i + "_ok",
"class":"mceButton mceOk",
href:"javascript:;",
onmousedown:"return false;"
}, "Ok"), "confirm" == s.type && d.add(i + "_wrapper", "a", {
"class":"mceButton mceCancel",
href:"javascript:;",
onmousedown:"return false;"
}, "Cancel"), d.add(i + "_middle", "div", {
"class":"mceIcon"
}), d.setHTML(i + "_content", s.content.replace("\n", "<br />")), a.add(i, "keyup", function(f) {
var p = 27;
return f.keyCode === p ? (s.button_func(!1), a.cancel(f)) :void 0;
}), a.add(i, "keydown", function(f) {
var t, p = 9;
return f.keyCode === p ? (t = d.select("a.mceCancel", i + "_wrapper")[0], t && t !== f.target ? t.focus() :d.get(i + "_ok").focus(), 
a.cancel(f)) :void 0;
})) :(d.add(i + "_content", "iframe", {
id:i + "_ifr",
src:'javascript:""',
frameBorder:0,
style:"border:0;width:10px;height:10px"
}), d.setStyles(i + "_ifr", {
width:s.width,
height:s.height
}), d.setAttrib(i + "_ifr", "src", y)), o = a.add(i, "mousedown", function(t) {
var f, p, u = t.target;
if (f = z.windows[i], z.focus(i), "A" == u.nodeName || "a" == u.nodeName) {
if ("mceClose" == u.className) return z.close(null, i), a.cancel(t);
if ("mceMax" == u.className) f.oldPos = f.element.getXY(), f.oldSize = f.element.getSize(), 
p = d.getViewPort(), p.w -= 2, p.h -= 2, f.element.moveTo(p.x, p.y), f.element.resizeTo(p.w, p.h), 
d.setStyles(i + "_ifr", {
width:p.w - f.deltaWidth,
height:p.h - f.deltaHeight
}), d.addClass(i + "_wrapper", "mceMaximized"); else if ("mceMed" == u.className) f.element.moveTo(f.oldPos.x, f.oldPos.y), 
f.element.resizeTo(f.oldSize.w, f.oldSize.h), f.iframeElement.resizeTo(f.oldSize.w - f.deltaWidth, f.oldSize.h - f.deltaHeight), 
d.removeClass(i + "_wrapper", "mceMaximized"); else {
if ("mceMove" == u.className) return z._startDrag(i, t, u.className);
if (d.hasClass(u, "mceResize")) return z._startDrag(i, t, u.className.substring(13));
}
}
}), q = a.add(i, "click", function(f) {
var p = f.target;
if (z.focus(i), "A" == p.nodeName || "a" == p.nodeName) switch (p.className) {
case "mceClose":
return z.close(null, i), a.cancel(f);

case "mceButton mceOk":
case "mceButton mceCancel":
return s.button_func("mceButton mceOk" == p.className), a.cancel(f);
}
}), a.add([ i + "_left", i + "_right" ], "focus", function(p) {
var t = d.get(i + "_ifr");
if (t) {
var f = t.contentWindow.document.body, u = d.select(":input:enabled,*[tabindex=0]", f);
p.target.id === i + "_left" ? u[u.length - 1].focus() :u[0].focus();
} else d.get(i + "_ok").focus();
}), x = z.windows[i] = {
id:i,
mousedown_func:o,
click_func:q,
element:new b(i, {
blocker:1,
container:r.getContainer()
}),
iframeElement:new b(i + "_ifr"),
features:s,
deltaWidth:g,
deltaHeight:v
}, x.iframeElement.on("focus", function() {
z.focus(i);
}), 0 == z.count && "modal" == z.editor.getParam("dialog_type", "modal") ? (d.add(d.doc.body, "div", {
id:"mceModalBlocker",
"class":(z.editor.settings.inlinepopups_skin || "clearlooks2") + "_modalBlocker",
style:{
zIndex:z.zIndex - 1
}
}), d.show("mceModalBlocker"), d.setAttrib(d.doc.body, "aria-hidden", "true")) :d.setStyle("mceModalBlocker", "z-index", z.zIndex - 1), 
(tinymce.isIE6 || /Firefox\/2\./.test(navigator.userAgent) || tinymce.isIE && !d.boxModel) && d.setStyles("mceModalBlocker", {
position:"absolute",
left:h.x,
top:h.y,
width:h.w - 2,
height:h.h - 2
}), d.setAttrib(i, "aria-hidden", "false"), z.focus(i), z._fixIELayout(i, 1), d.get(i + "_ok") && d.get(i + "_ok").focus(), 
z.count++, x) :z.parent(s, j);
},
focus:function(h) {
var f, g = this;
(f = g.windows[h]) && (f.zIndex = this.zIndex++, f.element.setStyle("zIndex", f.zIndex), 
f.element.update(), h += "_wrapper", d.removeClass(g.lastId, "mceFocus"), d.addClass(h, "mceFocus"), 
g.lastId = h, f.focussedElement ? f.focussedElement.focus() :d.get(h + "_ok") ? d.get(f.id + "_ok").focus() :d.get(f.id + "_ifr") && d.get(f.id + "_ifr").focus());
},
_addAll:function(k, h) {
var g, f = this, j = tinymce.DOM;
if (c(h, "string")) k.appendChild(j.doc.createTextNode(h)); else if (h.length) for (k = k.appendChild(j.create(h[0], h[1])), 
g = 2; g < h.length; g++) f._addAll(k, h[g]);
},
_startDrag:function(v, G, E) {
function D() {
f || (o._fixIELayout(v, 0), d.add(C.body, "div", {
id:"mceEventBlocker",
"class":"mceEventBlocker " + (o.editor.settings.inlinepopups_skin || "clearlooks2"),
style:{
zIndex:o.zIndex + 1
}
}), (tinymce.isIE6 || tinymce.isIE && !d.boxModel) && d.setStyles("mceEventBlocker", {
position:"absolute",
left:A.x,
top:A.y,
width:A.w - 2,
height:A.h - 2
}), f = new b("mceEventBlocker"), f.update(), x = h.getXY(), q = h.getSize(), s = g.x + x.x - A.x, 
r = g.y + x.y - A.y, d.add(f.get(), "div", {
id:"mcePlaceHolder",
"class":"mcePlaceHolder",
style:{
left:s,
top:r,
width:q.w,
height:q.h
}
}), F = new b("mcePlaceHolder"));
}
{
var u, z, f, x, q, F, g, A, s, r, j, i, m, k, n, B, o = this, C = d.doc, l = o.windows[v], h = l.element;
h.getXY();
}
return g = {
x:0,
y:0
}, A = d.getViewPort(), A.w -= 2, A.h -= 2, j = G.screenX, i = G.screenY, m = k = n = B = 0, 
u = a.add(C, "mouseup", function(p) {
return a.remove(C, "mouseup", u), a.remove(C, "mousemove", z), f && f.remove(), 
h.moveBy(m, k), h.resizeBy(n, B), q = h.getSize(), d.setStyles(v + "_ifr", {
width:q.w - l.deltaWidth,
height:q.h - l.deltaHeight
}), o._fixIELayout(v, 1), a.cancel(p);
}), "Move" != E && D(), z = a.add(C, "mousemove", function(w) {
var p, H, t;
switch (D(), p = w.screenX - j, H = w.screenY - i, E) {
case "ResizeW":
m = p, n = 0 - p;
break;

case "ResizeE":
n = p;
break;

case "ResizeN":
case "ResizeNW":
case "ResizeNE":
"ResizeNW" == E ? (m = p, n = 0 - p) :"ResizeNE" == E && (n = p), k = H, B = 0 - H;
break;

case "ResizeS":
case "ResizeSW":
case "ResizeSE":
"ResizeSW" == E ? (m = p, n = 0 - p) :"ResizeSE" == E && (n = p), B = H;
break;

case "mceMove":
m = p, k = H;
}
return n < (t = l.features.min_width - q.w) && (0 !== m && (m += n - t), n = t), 
B < (t = l.features.min_height - q.h) && (0 !== k && (k += B - t), B = t), n = Math.min(n, l.features.max_width - q.w), 
B = Math.min(B, l.features.max_height - q.h), m = Math.max(m, A.x - (s + A.x)), 
k = Math.max(k, A.y - (r + A.y)), m = Math.min(m, A.w + A.x - (s + q.w + A.x)), 
k = Math.min(k, A.h + A.y - (r + q.h + A.y)), m + k !== 0 && (0 > s + m && (m = 0), 
0 > r + k && (k = 0), F.moveTo(s + m, r + k)), n + B !== 0 && F.resizeTo(q.w + n, q.h + B), 
a.cancel(w);
}), a.cancel(G);
},
resizeBy:function(g, h, i) {
var f = this.windows[i];
f && (f.element.resizeBy(g, h), f.iframeElement.resizeBy(g, h));
},
close:function(i, k) {
var f, h, k, g = this, j = d.doc;
return k = g._findId(k || i), g.windows[k] ? (g.count--, 0 == g.count && (d.remove("mceModalBlocker"), 
d.setAttrib(d.doc.body, "aria-hidden", "false"), g.editor.focus()), (f = g.windows[k]) && (g.onClose.dispatch(g), 
a.remove(j, "mousedown", f.mousedownFunc), a.remove(j, "click", f.clickFunc), a.clear(k), 
a.clear(k + "_ifr"), d.setAttrib(k + "_ifr", "src", 'javascript:""'), f.element.remove(), 
delete g.windows[k], h = g._frontWindow(), h && g.focus(h.id)), void 0) :(g.parent(i), 
void 0);
},
_frontWindow:function() {
var g, f = 0;
return e(this.windows, function(h) {
h.zIndex > f && (g = h, f = h.zIndex);
}), g;
},
setTitle:function(f, g) {
var h;
f = this._findId(f), (h = d.get(f + "_title")) && (h.innerHTML = d.encode(g));
},
alert:function(g, f) {
var h, i = this;
h = i.open({
title:i,
type:"alert",
button_func:function(k) {
f && f.call(k || i, k), i.close(null, h.id);
},
content:d.encode(i.editor.getLang(g, g)),
inline:1,
width:400,
height:130
});
},
confirm:function(g, f) {
var h, i = this;
h = i.open({
title:i,
type:"confirm",
button_func:function(k) {
f && f.call(k || i, k), i.close(null, h.id);
},
content:d.encode(i.editor.getLang(g, g)),
inline:1,
width:400,
height:130
});
},
_findId:function(f) {
var g = this;
return "string" == typeof f ? f :(e(g.windows, function(h) {
var i = d.get(h.id + "_ifr");
return i && f == i.contentWindow ? (f = h.id, !1) :void 0;
}), f);
},
_fixIELayout:function(i, h) {
var f, g;
tinymce.isIE6 && (e([ "n", "s", "w", "e", "nw", "ne", "sw", "se" ], function(j) {
var k = d.get(i + "_resize_" + j);
d.setStyles(k, {
width:h ? k.clientWidth :"",
height:h ? k.clientHeight :"",
cursor:d.getStyle(k, "cursor", 1)
}), d.setStyle(i + "_bottom", "bottom", "-1px"), k = 0;
}), (f = this.windows[i]) && (f.element.hide(), f.element.show(), e(d.select("div,a", i), function(k) {
"none" != k.currentStyle.backgroundImage && (g = new Image(), g.src = k.currentStyle.backgroundImage.replace(/url\(\"(.+)\"\)/, "$1"));
}), d.get(i).style.filter = ""));
}
}), tinymce.PluginManager.add("inlinepopups", tinymce.plugins.InlinePopups);
}();