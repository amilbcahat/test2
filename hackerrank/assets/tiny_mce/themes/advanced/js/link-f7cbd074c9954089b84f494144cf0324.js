tinyMCEPopup.requireLangPack();

var LinkDialog = {
preInit:function() {
var url;
(url = tinyMCEPopup.getParam("external_link_list_url")) && document.write('<script language="javascript" type="text/javascript" src="' + tinyMCEPopup.editor.documentBaseURI.toAbsolute(url) + '"></script>');
},
init:function() {
var f = document.forms[0], ed = tinyMCEPopup.editor;
document.getElementById("hrefbrowsercontainer").innerHTML = getBrowserHTML("hrefbrowser", "href", "file", "theme_advanced_link"), 
isVisible("hrefbrowser") && (document.getElementById("href").style.width = "180px"), 
this.fillClassList("class_list"), this.fillFileList("link_list", "tinyMCELinkList"), 
this.fillTargetList("target_list"), (e = ed.dom.getParent(ed.selection.getNode(), "A")) && (f.href.value = ed.dom.getAttrib(e, "href"), 
f.linktitle.value = ed.dom.getAttrib(e, "title"), f.insert.value = ed.getLang("update"), 
selectByValue(f, "link_list", f.href.value), selectByValue(f, "target_list", ed.dom.getAttrib(e, "target")), 
selectByValue(f, "class_list", ed.dom.getAttrib(e, "class")));
},
update:function() {
var e, b, f = document.forms[0], ed = tinyMCEPopup.editor, href = f.href.value.replace(/ /g, "%20");
return tinyMCEPopup.restoreSelection(), e = ed.dom.getParent(ed.selection.getNode(), "A"), 
!f.href.value && e ? (b = ed.selection.getBookmark(), ed.dom.remove(e, 1), ed.selection.moveToBookmark(b), 
tinyMCEPopup.execCommand("mceEndUndoLevel"), tinyMCEPopup.close(), void 0) :(null == e ? (ed.getDoc().execCommand("unlink", !1, null), 
tinyMCEPopup.execCommand("mceInsertLink", !1, "#mce_temp_url#", {
skip_undo:1
}), tinymce.each(ed.dom.select("a"), function(n) {
"#mce_temp_url#" == ed.dom.getAttrib(n, "href") && (e = n, ed.dom.setAttribs(e, {
href:href,
title:f.linktitle.value,
target:f.target_list ? getSelectValue(f, "target_list") :null,
"class":f.class_list ? getSelectValue(f, "class_list") :null
}));
})) :ed.dom.setAttribs(e, {
href:href,
title:f.linktitle.value,
target:f.target_list ? getSelectValue(f, "target_list") :null,
"class":f.class_list ? getSelectValue(f, "class_list") :null
}), (1 != e.childNodes.length || "IMG" != e.firstChild.nodeName) && (ed.focus(), 
ed.selection.select(e), ed.selection.collapse(0), tinyMCEPopup.storeSelection()), 
tinyMCEPopup.execCommand("mceEndUndoLevel"), tinyMCEPopup.close(), void 0);
},
checkPrefix:function(n) {
n.value && Validator.isEmail(n) && !/^\s*mailto:/i.test(n.value) && confirm(tinyMCEPopup.getLang("advanced_dlg.link_is_email")) && (n.value = "mailto:" + n.value), 
/^\s*www\./i.test(n.value) && confirm(tinyMCEPopup.getLang("advanced_dlg.link_is_external")) && (n.value = "http://" + n.value);
},
fillFileList:function(id, l) {
var dom = tinyMCEPopup.dom, lst = dom.get(id);
l = window[l], l && l.length > 0 ? (lst.options[lst.options.length] = new Option("", ""), 
tinymce.each(l, function(o) {
lst.options[lst.options.length] = new Option(o[0], o[1]);
})) :dom.remove(dom.getParent(id, "tr"));
},
fillClassList:function(id) {
var v, cl, dom = tinyMCEPopup.dom, lst = dom.get(id);
(v = tinyMCEPopup.getParam("theme_advanced_styles")) ? (cl = [], tinymce.each(v.split(";"), function(v) {
var p = v.split("=");
cl.push({
title:p[0],
"class":p[1]
});
})) :cl = tinyMCEPopup.editor.dom.getClasses(), cl.length > 0 ? (lst.options[lst.options.length] = new Option(tinyMCEPopup.getLang("not_set"), ""), 
tinymce.each(cl, function(o) {
lst.options[lst.options.length] = new Option(o.title || o["class"], o["class"]);
})) :dom.remove(dom.getParent(id, "tr"));
},
fillTargetList:function(id) {
var v, dom = tinyMCEPopup.dom, lst = dom.get(id);
lst.options[lst.options.length] = new Option(tinyMCEPopup.getLang("not_set"), ""), 
lst.options[lst.options.length] = new Option(tinyMCEPopup.getLang("advanced_dlg.link_target_same"), "_self"), 
lst.options[lst.options.length] = new Option(tinyMCEPopup.getLang("advanced_dlg.link_target_blank"), "_blank"), 
(v = tinyMCEPopup.getParam("theme_advanced_link_targets")) && tinymce.each(v.split(","), function(v) {
v = v.split("="), lst.options[lst.options.length] = new Option(v[0], v[1]);
});
}
};

LinkDialog.preInit(), tinyMCEPopup.onInit.add(LinkDialog.init, LinkDialog);