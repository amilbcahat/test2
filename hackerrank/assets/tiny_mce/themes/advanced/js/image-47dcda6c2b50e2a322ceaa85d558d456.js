var ImageDialog = {
preInit:function() {
var url;
tinyMCEPopup.requireLangPack(), (url = tinyMCEPopup.getParam("external_image_list_url")) && document.write('<script language="javascript" type="text/javascript" src="' + tinyMCEPopup.editor.documentBaseURI.toAbsolute(url) + '"></script>');
},
init:function() {
var f = document.forms[0], ed = tinyMCEPopup.editor;
document.getElementById("srcbrowsercontainer").innerHTML = getBrowserHTML("srcbrowser", "src", "image", "theme_advanced_image"), 
isVisible("srcbrowser") && (document.getElementById("src").style.width = "180px"), 
e = ed.selection.getNode(), this.fillFileList("image_list", tinyMCEPopup.getParam("external_image_list", "tinyMCEImageList")), 
"IMG" == e.nodeName && (f.src.value = ed.dom.getAttrib(e, "src"), f.alt.value = ed.dom.getAttrib(e, "alt"), 
f.border.value = this.getAttrib(e, "border"), f.vspace.value = this.getAttrib(e, "vspace"), 
f.hspace.value = this.getAttrib(e, "hspace"), f.width.value = ed.dom.getAttrib(e, "width"), 
f.height.value = ed.dom.getAttrib(e, "height"), f.insert.value = ed.getLang("update"), 
this.styleVal = ed.dom.getAttrib(e, "style"), selectByValue(f, "image_list", f.src.value), 
selectByValue(f, "align", this.getAttrib(e, "align")), this.updateStyle());
},
fillFileList:function(id, l) {
var dom = tinyMCEPopup.dom, lst = dom.get(id);
l = "function" == typeof l ? l() :window[l], l && l.length > 0 ? (lst.options[lst.options.length] = new Option("", ""), 
tinymce.each(l, function(o) {
lst.options[lst.options.length] = new Option(o[0], o[1]);
})) :dom.remove(dom.getParent(id, "tr"));
},
update:function() {
var el, f = document.forms[0], nl = f.elements, ed = tinyMCEPopup.editor, args = {};
return tinyMCEPopup.restoreSelection(), "" === f.src.value ? ("IMG" == ed.selection.getNode().nodeName && (ed.dom.remove(ed.selection.getNode()), 
ed.execCommand("mceRepaint")), tinyMCEPopup.close(), void 0) :(ed.settings.inline_styles ? args.style = this.styleVal :args = tinymce.extend(args, {
vspace:nl.vspace.value,
hspace:nl.hspace.value,
border:nl.border.value,
align:getSelectValue(f, "align")
}), tinymce.extend(args, {
src:f.src.value.replace(/ /g, "%20"),
alt:f.alt.value,
width:f.width.value,
height:f.height.value
}), el = ed.selection.getNode(), el && "IMG" == el.nodeName ? (ed.dom.setAttribs(el, args), 
tinyMCEPopup.editor.execCommand("mceRepaint"), tinyMCEPopup.editor.focus()) :(ed.execCommand("mceInsertContent", !1, '<img id="__mce_tmp" />', {
skip_undo:1
}), ed.dom.setAttribs("__mce_tmp", args), ed.dom.setAttrib("__mce_tmp", "id", ""), 
ed.undoManager.add()), tinyMCEPopup.close(), void 0);
},
updateStyle:function() {
var st, v, dom = tinyMCEPopup.dom, f = document.forms[0];
tinyMCEPopup.editor.settings.inline_styles && (st = tinyMCEPopup.dom.parseStyle(this.styleVal), 
v = getSelectValue(f, "align"), v ? "left" == v || "right" == v ? (st["float"] = v, 
delete st["vertical-align"]) :(st["vertical-align"] = v, delete st["float"]) :(delete st["float"], 
delete st["vertical-align"]), v = f.border.value, v || "0" == v ? st.border = "0" == v ? "0" :v + "px solid black" :delete st.border, 
v = f.hspace.value, v ? (delete st.margin, st["margin-left"] = v + "px", st["margin-right"] = v + "px") :(delete st["margin-left"], 
delete st["margin-right"]), v = f.vspace.value, v ? (delete st.margin, st["margin-top"] = v + "px", 
st["margin-bottom"] = v + "px") :(delete st["margin-top"], delete st["margin-bottom"]), 
st = tinyMCEPopup.dom.parseStyle(dom.serializeStyle(st), "img"), this.styleVal = dom.serializeStyle(st, "img"));
},
getAttrib:function(e, at) {
var v, v2, ed = tinyMCEPopup.editor, dom = ed.dom;
if (ed.settings.inline_styles) switch (at) {
case "align":
if (v = dom.getStyle(e, "float")) return v;
if (v = dom.getStyle(e, "vertical-align")) return v;
break;

case "hspace":
if (v = dom.getStyle(e, "margin-left"), v2 = dom.getStyle(e, "margin-right"), v && v == v2) return parseInt(v.replace(/[^0-9]/g, ""));
break;

case "vspace":
if (v = dom.getStyle(e, "margin-top"), v2 = dom.getStyle(e, "margin-bottom"), v && v == v2) return parseInt(v.replace(/[^0-9]/g, ""));
break;

case "border":
if (v = 0, tinymce.each([ "top", "right", "bottom", "left" ], function(sv) {
return sv = dom.getStyle(e, "border-" + sv + "-width"), !sv || sv != v && 0 !== v ? (v = 0, 
!1) :(sv && (v = sv), void 0);
}), v) return parseInt(v.replace(/[^0-9]/g, ""));
}
return (v = dom.getAttrib(e, at)) ? v :"";
},
resetImageData:function() {
var f = document.forms[0];
f.width.value = f.height.value = "";
},
updateImageData:function() {
var f = document.forms[0], t = ImageDialog;
"" == f.width.value && (f.width.value = t.preloadImg.width), "" == f.height.value && (f.height.value = t.preloadImg.height);
},
getImageData:function() {
var f = document.forms[0];
this.preloadImg = new Image(), this.preloadImg.onload = this.updateImageData, this.preloadImg.onerror = this.resetImageData, 
this.preloadImg.src = tinyMCEPopup.editor.documentBaseURI.toAbsolute(f.src.value);
}
};

ImageDialog.preInit(), tinyMCEPopup.onInit.add(ImageDialog.init, ImageDialog);