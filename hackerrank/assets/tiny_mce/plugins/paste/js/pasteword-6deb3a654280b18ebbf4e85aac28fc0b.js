tinyMCEPopup.requireLangPack();

var PasteWordDialog = {
init:function() {
var ifr, doc, css, ed = tinyMCEPopup.editor, el = document.getElementById("iframecontainer"), cssHTML = "";
el.innerHTML = '<iframe id="iframe" src="javascript:\'\';" frameBorder="0" style="border: 1px solid gray"></iframe>', 
ifr = document.getElementById("iframe"), doc = ifr.contentWindow.document, css = [ ed.baseURI.toAbsolute("themes/" + ed.settings.theme + "/skins/" + ed.settings.skin + "/content.css") ], 
css = css.concat(tinymce.explode(ed.settings.content_css) || []), tinymce.each(css, function(u) {
cssHTML += '<link href="' + ed.documentBaseURI.toAbsolute("" + u) + '" rel="stylesheet" type="text/css" />';
}), doc.open(), doc.write("<html><head>" + cssHTML + '</head><body class="mceContentBody" spellcheck="false"></body></html>'), 
doc.close(), doc.designMode = "on", this.resize(), window.setTimeout(function() {
ifr.contentWindow.focus();
}, 10);
},
insert:function() {
var h = document.getElementById("iframe").contentWindow.document.body.innerHTML;
tinyMCEPopup.editor.execCommand("mceInsertClipboardContent", !1, {
content:h,
wordContent:!0
}), tinyMCEPopup.close();
},
resize:function() {
var el, vp = tinyMCEPopup.dom.getViewPort(window);
el = document.getElementById("iframe"), el && (el.style.width = vp.w - 20 + "px", 
el.style.height = vp.h - 90 + "px");
}
};

tinyMCEPopup.onInit.add(PasteWordDialog.init, PasteWordDialog);