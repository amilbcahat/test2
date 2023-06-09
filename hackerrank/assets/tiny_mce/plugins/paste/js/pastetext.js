tinyMCEPopup.requireLangPack();

var PasteTextDialog = {
init:function() {
this.resize();
},
insert:function() {
var lines, h = tinyMCEPopup.dom.encode(document.getElementById("content").value);
document.getElementById("linebreaks").checked && (lines = h.split(/\r?\n/), lines.length > 1 && (h = "", 
tinymce.each(lines, function(row) {
h += "<p>" + row + "</p>";
}))), tinyMCEPopup.editor.execCommand("mceInsertClipboardContent", !1, {
content:h
}), tinyMCEPopup.close();
},
resize:function() {
var el, vp = tinyMCEPopup.dom.getViewPort(window);
el = document.getElementById("content"), el.style.width = vp.w - 20 + "px", el.style.height = vp.h - 90 + "px";
}
};

tinyMCEPopup.onInit.add(PasteTextDialog.init, PasteTextDialog);