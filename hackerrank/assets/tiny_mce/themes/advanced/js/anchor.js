tinyMCEPopup.requireLangPack();

var AnchorDialog = {
init:function(ed) {
var elm, f = document.forms[0];
this.editor = ed, elm = ed.dom.getParent(ed.selection.getNode(), "A"), v = ed.dom.getAttrib(elm, "name"), 
v && (this.action = "update", f.anchorName.value = v), f.insert.value = ed.getLang(elm ? "update" :"insert");
},
update:function() {
var elm, ed = this.editor, name = document.forms[0].anchorName.value;
return name && /^[a-z][a-z0-9\-\_:\.]*$/i.test(name) ? (tinyMCEPopup.restoreSelection(), 
"update" != this.action && ed.selection.collapse(1), elm = ed.dom.getParent(ed.selection.getNode(), "A"), 
elm ? elm.name = name :ed.execCommand("mceInsertContent", 0, ed.dom.createHTML("a", {
name:name,
"class":"mceItemAnchor"
}, "")), tinyMCEPopup.close(), void 0) :(tinyMCEPopup.alert("advanced_dlg.anchor_invalid"), 
void 0);
}
};

tinyMCEPopup.onInit.add(AnchorDialog.init, AnchorDialog);