function init() {
var ed, tcont;
tinyMCEPopup.resizeToInnerSize(), ed = tinyMCEPopup.editor, window.setTimeout(insertHelpIFrame, 10), 
tcont = document.getElementById("plugintablecontainer"), document.getElementById("plugins_tab").style.display = "none";
var html = "";
html += '<table id="plugintable">', html += "<thead>", html += "<tr>", html += "<td>" + ed.getLang("advanced_dlg.about_plugin") + "</td>", 
html += "<td>" + ed.getLang("advanced_dlg.about_author") + "</td>", html += "<td>" + ed.getLang("advanced_dlg.about_version") + "</td>", 
html += "</tr>", html += "</thead>", html += "<tbody>", tinymce.each(ed.plugins, function(p, n) {
var info;
p.getInfo && (html += "<tr>", info = p.getInfo(), html += null != info.infourl && "" != info.infourl ? '<td width="50%" title="' + n + '"><a href="' + info.infourl + '" target="_blank">' + info.longname + "</a></td>" :'<td width="50%" title="' + n + '">' + info.longname + "</td>", 
html += null != info.authorurl && "" != info.authorurl ? '<td width="35%"><a href="' + info.authorurl + '" target="_blank">' + info.author + "</a></td>" :'<td width="35%">' + info.author + "</td>", 
html += '<td width="15%">' + info.version + "</td>", html += "</tr>", document.getElementById("plugins_tab").style.display = "");
}), html += "</tbody>", html += "</table>", tcont.innerHTML = html, tinyMCEPopup.dom.get("version").innerHTML = tinymce.majorVersion + "." + tinymce.minorVersion, 
tinyMCEPopup.dom.get("date").innerHTML = tinymce.releaseDate;
}

function insertHelpIFrame() {
var html;
tinyMCEPopup.getParam("docs_url") && (html = '<iframe width="100%" height="300" src="' + tinyMCEPopup.editor.baseURI.toAbsolute(tinyMCEPopup.getParam("docs_url")) + '"></iframe>', 
document.getElementById("iframecontainer").innerHTML = html, document.getElementById("help_tab").style.display = "block", 
document.getElementById("help_tab").setAttribute("aria-hidden", "false"));
}

tinyMCEPopup.requireLangPack(), tinyMCEPopup.onInit.add(init);