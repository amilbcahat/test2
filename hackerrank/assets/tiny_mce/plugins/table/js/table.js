function insertTable() {
var align, width, height, className, caption, frame, rules, capEl, elm, cellLimit, rowLimit, colLimit, formObj = document.forms[0], inst = tinyMCEPopup.editor, dom = inst.dom, cols = 2, rows = 2, border = 0, cellpadding = -1, cellspacing = -1, html = "";
if (tinyMCEPopup.restoreSelection(), !AutoValidator.validate(formObj)) return tinyMCEPopup.alert(AutoValidator.getErrorMessages(formObj).join(". ") + "."), 
!1;
if (elm = dom.getParent(inst.selection.getNode(), "table"), cols = formObj.elements.cols.value, 
rows = formObj.elements.rows.value, border = "" != formObj.elements.border.value ? formObj.elements.border.value :0, 
cellpadding = "" != formObj.elements.cellpadding.value ? formObj.elements.cellpadding.value :"", 
cellspacing = "" != formObj.elements.cellspacing.value ? formObj.elements.cellspacing.value :"", 
align = getSelectValue(formObj, "align"), frame = getSelectValue(formObj, "tframe"), 
rules = getSelectValue(formObj, "rules"), width = formObj.elements.width.value, 
height = formObj.elements.height.value, bordercolor = formObj.elements.bordercolor.value, 
bgcolor = formObj.elements.bgcolor.value, className = getSelectValue(formObj, "class"), 
id = formObj.elements.id.value, summary = formObj.elements.summary.value, style = formObj.elements.style.value, 
dir = formObj.elements.dir.value, lang = formObj.elements.lang.value, background = formObj.elements.backgroundimage.value, 
caption = formObj.elements.caption.checked, cellLimit = tinyMCEPopup.getParam("table_cell_limit", !1), 
rowLimit = tinyMCEPopup.getParam("table_row_limit", !1), colLimit = tinyMCEPopup.getParam("table_col_limit", !1), 
colLimit && cols > colLimit) return tinyMCEPopup.alert(inst.getLang("table_dlg.col_limit").replace(/\{\$cols\}/g, colLimit)), 
!1;
if (rowLimit && rows > rowLimit) return tinyMCEPopup.alert(inst.getLang("table_dlg.row_limit").replace(/\{\$rows\}/g, rowLimit)), 
!1;
if (cellLimit && cols * rows > cellLimit) return tinyMCEPopup.alert(inst.getLang("table_dlg.cell_limit").replace(/\{\$cells\}/g, cellLimit)), 
!1;
if ("update" == action) return dom.setAttrib(elm, "cellPadding", cellpadding, !0), 
dom.setAttrib(elm, "cellSpacing", cellspacing, !0), dom.setAttrib(elm, "border", border), 
dom.setAttrib(elm, "align", align), dom.setAttrib(elm, "frame", frame), dom.setAttrib(elm, "rules", rules), 
dom.setAttrib(elm, "class", className), dom.setAttrib(elm, "style", style), dom.setAttrib(elm, "id", id), 
dom.setAttrib(elm, "summary", summary), dom.setAttrib(elm, "dir", dir), dom.setAttrib(elm, "lang", lang), 
capEl = inst.dom.select("caption", elm)[0], capEl && !caption && capEl.parentNode.removeChild(capEl), 
!capEl && caption && (capEl = elm.ownerDocument.createElement("caption"), tinymce.isIE || (capEl.innerHTML = '<br data-mce-bogus="1"/>'), 
elm.insertBefore(capEl, elm.firstChild)), width && inst.settings.inline_styles ? (dom.setStyle(elm, "width", width), 
dom.setAttrib(elm, "width", "")) :(dom.setAttrib(elm, "width", width, !0), dom.setStyle(elm, "width", "")), 
dom.setAttrib(elm, "borderColor", ""), dom.setAttrib(elm, "bgColor", ""), dom.setAttrib(elm, "background", ""), 
height && inst.settings.inline_styles ? (dom.setStyle(elm, "height", height), dom.setAttrib(elm, "height", "")) :(dom.setAttrib(elm, "height", height, !0), 
dom.setStyle(elm, "height", "")), elm.style.backgroundImage = "" != background ? "url('" + background + "')" :"", 
"" != bordercolor ? (elm.style.borderColor = bordercolor, elm.style.borderStyle = "" == elm.style.borderStyle ? "solid" :elm.style.borderStyle, 
elm.style.borderWidth = "" == border ? "1px" :border) :elm.style.borderColor = "", 
elm.style.backgroundColor = bgcolor, elm.style.height = getCSSSize(height), inst.addVisual(), 
inst.nodeChanged(), inst.execCommand("mceEndUndoLevel"), (formObj.width.value != orgTableWidth || formObj.height.value != orgTableHeight) && inst.execCommand("mceRepaint"), 
tinyMCEPopup.close(), !0;
html += "<table", html += makeAttrib("id", id), html += makeAttrib("border", border), 
html += makeAttrib("cellpadding", cellpadding), html += makeAttrib("cellspacing", cellspacing), 
html += makeAttrib("data-mce-new", "1"), width && inst.settings.inline_styles ? (style && (style += "; "), 
/^[0-9\.]+$/.test(width) && (width += "px"), style += "width: " + width) :html += makeAttrib("width", width), 
html += makeAttrib("align", align), html += makeAttrib("frame", frame), html += makeAttrib("rules", rules), 
html += makeAttrib("class", className), html += makeAttrib("style", style), html += makeAttrib("summary", summary), 
html += makeAttrib("dir", dir), html += makeAttrib("lang", lang), html += ">", caption && (html += tinymce.isIE ? "<caption></caption>" :'<caption><br data-mce-bogus="1"/></caption>');
for (var y = 0; rows > y; y++) {
html += "<tr>";
for (var x = 0; cols > x; x++) html += tinymce.isIE ? "<td></td>" :'<td><br data-mce-bogus="1"/></td>';
html += "</tr>";
}
if (html += "</table>", inst.settings.fix_table_elements) {
var patt = "";
inst.focus(), inst.selection.setContent('<br class="_mce_marker" />'), tinymce.each("h1,h2,h3,h4,h5,h6,p".split(","), function(n) {
patt && (patt += ","), patt += n + " ._mce_marker";
}), tinymce.each(inst.dom.select(patt), function(n) {
inst.dom.split(inst.dom.getParent(n, "h1,h2,h3,h4,h5,h6,p"), n);
}), dom.setOuterHTML(dom.select("br._mce_marker")[0], html);
} else inst.execCommand("mceInsertContent", !1, html);
tinymce.each(dom.select("table[data-mce-new]"), function(node) {
var td = dom.select("td", node);
try {
inst.selection.select(td[0], !0), inst.selection.collapse();
} catch (ex) {}
dom.setAttrib(node, "data-mce-new", "");
}), inst.addVisual(), inst.execCommand("mceEndUndoLevel"), tinyMCEPopup.close();
}

function makeAttrib(attrib, value) {
var formObj = document.forms[0], valueElm = formObj.elements[attrib];
return ("undefined" == typeof value || null == value) && (value = "", valueElm && (value = valueElm.value)), 
"" == value ? "" :(value = value.replace(/&/g, "&amp;"), value = value.replace(/\"/g, "&quot;"), 
value = value.replace(/</g, "&lt;"), value = value.replace(/>/g, "&gt;"), " " + attrib + '="' + value + '"');
}

function init() {
tinyMCEPopup.resizeToInnerSize(), document.getElementById("backgroundimagebrowsercontainer").innerHTML = getBrowserHTML("backgroundimagebrowser", "backgroundimage", "image", "table"), 
document.getElementById("backgroundimagebrowsercontainer").innerHTML = getBrowserHTML("backgroundimagebrowser", "backgroundimage", "image", "table"), 
document.getElementById("bordercolor_pickcontainer").innerHTML = getColorPickerHTML("bordercolor_pick", "bordercolor"), 
document.getElementById("bgcolor_pickcontainer").innerHTML = getColorPickerHTML("bgcolor_pick", "bgcolor");
var cols = 2, rows = 2, border = tinyMCEPopup.getParam("table_default_border", "0"), cellpadding = tinyMCEPopup.getParam("table_default_cellpadding", ""), cellspacing = tinyMCEPopup.getParam("table_default_cellspacing", ""), align = "", width = "", height = "", bordercolor = "", bgcolor = "", className = "", id = "", summary = "", style = "", dir = "", lang = "", background = "", bgcolor = "", bordercolor = "", rules = "", frame = "", inst = tinyMCEPopup.editor, dom = inst.dom, formObj = document.forms[0], elm = dom.getParent(inst.selection.getNode(), "table");
if (action = tinyMCEPopup.getWindowArg("action"), action || (action = elm ? "update" :"insert"), 
elm && "insert" != action) {
for (var rowsAr = elm.rows, cols = 0, i = 0; i < rowsAr.length; i++) rowsAr[i].cells.length > cols && (cols = rowsAr[i].cells.length);
cols = cols, rows = rowsAr.length, st = dom.parseStyle(dom.getAttrib(elm, "style")), 
border = trimSize(getStyle(elm, "border", "borderWidth")), cellpadding = dom.getAttrib(elm, "cellpadding", ""), 
cellspacing = dom.getAttrib(elm, "cellspacing", ""), width = trimSize(getStyle(elm, "width", "width")), 
height = trimSize(getStyle(elm, "height", "height")), bordercolor = convertRGBToHex(getStyle(elm, "bordercolor", "borderLeftColor")), 
bgcolor = convertRGBToHex(getStyle(elm, "bgcolor", "backgroundColor")), align = dom.getAttrib(elm, "align", align), 
frame = dom.getAttrib(elm, "frame"), rules = dom.getAttrib(elm, "rules"), className = tinymce.trim(dom.getAttrib(elm, "class").replace(/mceItem.+/g, "")), 
id = dom.getAttrib(elm, "id"), summary = dom.getAttrib(elm, "summary"), style = dom.serializeStyle(st), 
dir = dom.getAttrib(elm, "dir"), lang = dom.getAttrib(elm, "lang"), background = getStyle(elm, "background", "backgroundImage").replace(new RegExp("url\\(['\"]?([^'\"]*)['\"]?\\)", "gi"), "$1"), 
formObj.caption.checked = elm.getElementsByTagName("caption").length > 0, orgTableWidth = width, 
orgTableHeight = height, action = "update", formObj.insert.value = inst.getLang("update");
}
addClassesToList("class", "table_styles"), TinyMCE_EditableSelects.init(), selectByValue(formObj, "align", align), 
selectByValue(formObj, "tframe", frame), selectByValue(formObj, "rules", rules), 
selectByValue(formObj, "class", className, !0, !0), formObj.cols.value = cols, formObj.rows.value = rows, 
formObj.border.value = border, formObj.cellpadding.value = cellpadding, formObj.cellspacing.value = cellspacing, 
formObj.width.value = width, formObj.height.value = height, formObj.bordercolor.value = bordercolor, 
formObj.bgcolor.value = bgcolor, formObj.id.value = id, formObj.summary.value = summary, 
formObj.style.value = style, formObj.dir.value = dir, formObj.lang.value = lang, 
formObj.backgroundimage.value = background, updateColor("bordercolor_pick", "bordercolor"), 
updateColor("bgcolor_pick", "bgcolor"), isVisible("backgroundimagebrowser") && (document.getElementById("backgroundimage").style.width = "180px"), 
"update" == action && (formObj.cols.disabled = !0, formObj.rows.disabled = !0);
}

function changedSize() {
var formObj = document.forms[0], st = dom.parseStyle(formObj.style.value), height = formObj.height.value;
st.height = "" != height ? getCSSSize(height) :"", formObj.style.value = dom.serializeStyle(st);
}

function changedBackgroundImage() {
var formObj = document.forms[0], st = dom.parseStyle(formObj.style.value);
st["background-image"] = "url('" + formObj.backgroundimage.value + "')", formObj.style.value = dom.serializeStyle(st);
}

function changedBorder() {
var formObj = document.forms[0], st = dom.parseStyle(formObj.style.value);
"" != formObj.border.value && "" != formObj.bordercolor.value && (st["border-width"] = formObj.border.value + "px"), 
formObj.style.value = dom.serializeStyle(st);
}

function changedColor() {
var formObj = document.forms[0], st = dom.parseStyle(formObj.style.value);
st["background-color"] = formObj.bgcolor.value, "" != formObj.bordercolor.value && (st["border-color"] = formObj.bordercolor.value, 
st["border-width"] || (st["border-width"] = "" == formObj.border.value ? "1px" :formObj.border.value + "px")), 
formObj.style.value = dom.serializeStyle(st);
}

function changedStyle() {
var formObj = document.forms[0], st = dom.parseStyle(formObj.style.value);
formObj.backgroundimage.value = st["background-image"] ? st["background-image"].replace(new RegExp("url\\(['\"]?([^'\"]*)['\"]?\\)", "gi"), "$1") :"", 
st.width && (formObj.width.value = trimSize(st.width)), st.height && (formObj.height.value = trimSize(st.height)), 
st["background-color"] && (formObj.bgcolor.value = st["background-color"], updateColor("bgcolor_pick", "bgcolor")), 
st["border-color"] && (formObj.bordercolor.value = st["border-color"], updateColor("bordercolor_pick", "bordercolor"));
}

tinyMCEPopup.requireLangPack();

var action, orgTableWidth, orgTableHeight, dom = tinyMCEPopup.editor.dom;

tinyMCEPopup.onInit.add(init);