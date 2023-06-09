function init() {
ed = tinyMCEPopup.editor, tinyMCEPopup.resizeToInnerSize(), document.getElementById("backgroundimagebrowsercontainer").innerHTML = getBrowserHTML("backgroundimagebrowser", "backgroundimage", "image", "table"), 
document.getElementById("bordercolor_pickcontainer").innerHTML = getColorPickerHTML("bordercolor_pick", "bordercolor"), 
document.getElementById("bgcolor_pickcontainer").innerHTML = getColorPickerHTML("bgcolor_pick", "bgcolor");
var tdElm = ed.dom.getParent(ed.selection.getStart(), "td,th"), formObj = document.forms[0], st = ed.dom.parseStyle(ed.dom.getAttrib(tdElm, "style")), celltype = tdElm.nodeName.toLowerCase(), align = ed.dom.getAttrib(tdElm, "align"), valign = ed.dom.getAttrib(tdElm, "valign"), width = trimSize(getStyle(tdElm, "width", "width")), height = trimSize(getStyle(tdElm, "height", "height")), bordercolor = convertRGBToHex(getStyle(tdElm, "bordercolor", "borderLeftColor")), bgcolor = convertRGBToHex(getStyle(tdElm, "bgcolor", "backgroundColor")), className = ed.dom.getAttrib(tdElm, "class"), backgroundimage = getStyle(tdElm, "background", "backgroundImage").replace(new RegExp("url\\(['\"]?([^'\"]*)['\"]?\\)", "gi"), "$1"), id = ed.dom.getAttrib(tdElm, "id"), lang = ed.dom.getAttrib(tdElm, "lang"), dir = ed.dom.getAttrib(tdElm, "dir"), scope = ed.dom.getAttrib(tdElm, "scope");
addClassesToList("class", "table_cell_styles"), TinyMCE_EditableSelects.init(), 
ed.dom.hasClass(tdElm, "mceSelected") ? tinyMCEPopup.dom.hide("action") :(formObj.bordercolor.value = bordercolor, 
formObj.bgcolor.value = bgcolor, formObj.backgroundimage.value = backgroundimage, 
formObj.width.value = width, formObj.height.value = height, formObj.id.value = id, 
formObj.lang.value = lang, formObj.style.value = ed.dom.serializeStyle(st), selectByValue(formObj, "align", align), 
selectByValue(formObj, "valign", valign), selectByValue(formObj, "class", className, !0, !0), 
selectByValue(formObj, "celltype", celltype), selectByValue(formObj, "dir", dir), 
selectByValue(formObj, "scope", scope), isVisible("backgroundimagebrowser") && (document.getElementById("backgroundimage").style.width = "180px"), 
updateColor("bordercolor_pick", "bordercolor"), updateColor("bgcolor_pick", "bgcolor"));
}

function updateAction() {
function doUpdate(s) {
s && (updateCell(tdElm), ed.addVisual(), ed.nodeChanged(), inst.execCommand("mceEndUndoLevel"), 
tinyMCEPopup.close());
}
var el, tdElm, trElm, tableElm, inst = ed, formObj = document.forms[0];
if (!AutoValidator.validate(formObj)) return tinyMCEPopup.alert(AutoValidator.getErrorMessages(formObj).join(". ") + "."), 
!1;
if (tinyMCEPopup.restoreSelection(), el = ed.selection.getStart(), tdElm = ed.dom.getParent(el, "td,th"), 
trElm = ed.dom.getParent(el, "tr"), tableElm = ed.dom.getParent(el, "table"), ed.dom.hasClass(tdElm, "mceSelected")) return tinymce.each(ed.dom.select("td.mceSelected,th.mceSelected"), function(td) {
updateCell(td);
}), ed.addVisual(), ed.nodeChanged(), inst.execCommand("mceEndUndoLevel"), tinyMCEPopup.close(), 
void 0;
switch (getSelectValue(formObj, "action")) {
case "cell":
var celltype = getSelectValue(formObj, "celltype"), scope = getSelectValue(formObj, "scope");
if (ed.getParam("accessibility_warnings", 1)) return "th" == celltype && "" == scope ? tinyMCEPopup.confirm(ed.getLang("table_dlg.missing_scope", "", !0), doUpdate) :doUpdate(1), 
void 0;
updateCell(tdElm);
break;

case "row":
var cell = trElm.firstChild;
"TD" != cell.nodeName && "TH" != cell.nodeName && (cell = nextCell(cell));
do cell = updateCell(cell, !0); while (null != (cell = nextCell(cell)));
break;

case "col":
var curr, col = 0, cell = trElm.firstChild, rows = tableElm.getElementsByTagName("tr");
"TD" != cell.nodeName && "TH" != cell.nodeName && (cell = nextCell(cell));
do {
if (cell == tdElm) break;
col += cell.getAttribute("colspan");
} while (null != (cell = nextCell(cell)));
for (var i = 0; i < rows.length; i++) {
cell = rows[i].firstChild, "TD" != cell.nodeName && "TH" != cell.nodeName && (cell = nextCell(cell)), 
curr = 0;
do {
if (curr == col) {
cell = updateCell(cell, !0);
break;
}
curr += cell.getAttribute("colspan");
} while (null != (cell = nextCell(cell)));
}
break;

case "all":
for (var rows = tableElm.getElementsByTagName("tr"), i = 0; i < rows.length; i++) {
var cell = rows[i].firstChild;
"TD" != cell.nodeName && "TH" != cell.nodeName && (cell = nextCell(cell));
do cell = updateCell(cell, !0); while (null != (cell = nextCell(cell)));
}
}
ed.addVisual(), ed.nodeChanged(), inst.execCommand("mceEndUndoLevel"), tinyMCEPopup.close();
}

function nextCell(elm) {
for (;null != (elm = elm.nextSibling); ) if ("TD" == elm.nodeName || "TH" == elm.nodeName) return elm;
return null;
}

function updateCell(td, skip_id) {
var inst = ed, formObj = document.forms[0], curCellType = td.nodeName.toLowerCase(), celltype = getSelectValue(formObj, "celltype"), doc = inst.getDoc(), dom = ed.dom;
if (skip_id || dom.setAttrib(td, "id", formObj.id.value), dom.setAttrib(td, "align", formObj.align.value), 
dom.setAttrib(td, "vAlign", formObj.valign.value), dom.setAttrib(td, "lang", formObj.lang.value), 
dom.setAttrib(td, "dir", getSelectValue(formObj, "dir")), dom.setAttrib(td, "style", ed.dom.serializeStyle(ed.dom.parseStyle(formObj.style.value))), 
dom.setAttrib(td, "scope", formObj.scope.value), dom.setAttrib(td, "class", getSelectValue(formObj, "class")), 
ed.dom.setAttrib(td, "width", ""), ed.dom.setAttrib(td, "height", ""), ed.dom.setAttrib(td, "bgColor", ""), 
ed.dom.setAttrib(td, "borderColor", ""), ed.dom.setAttrib(td, "background", ""), 
td.style.width = getCSSSize(formObj.width.value), td.style.height = getCSSSize(formObj.height.value), 
"" != formObj.bordercolor.value ? (td.style.borderColor = formObj.bordercolor.value, 
td.style.borderStyle = "" == td.style.borderStyle ? "solid" :td.style.borderStyle, 
td.style.borderWidth = "" == td.style.borderWidth ? "1px" :td.style.borderWidth) :td.style.borderColor = "", 
td.style.backgroundColor = formObj.bgcolor.value, td.style.backgroundImage = "" != formObj.backgroundimage.value ? "url('" + formObj.backgroundimage.value + "')" :"", 
curCellType != celltype) {
for (var newCell = doc.createElement(celltype), c = 0; c < td.childNodes.length; c++) newCell.appendChild(td.childNodes[c].cloneNode(1));
for (var a = 0; a < td.attributes.length; a++) ed.dom.setAttrib(newCell, td.attributes[a].name, ed.dom.getAttrib(td, td.attributes[a].name));
td.parentNode.replaceChild(newCell, td), td = newCell;
}
return dom.setAttrib(td, "style", dom.serializeStyle(dom.parseStyle(td.style.cssText))), 
td;
}

function changedBackgroundImage() {
var formObj = document.forms[0], st = ed.dom.parseStyle(formObj.style.value);
st["background-image"] = "url('" + formObj.backgroundimage.value + "')", formObj.style.value = ed.dom.serializeStyle(st);
}

function changedSize() {
var formObj = document.forms[0], st = ed.dom.parseStyle(formObj.style.value), width = formObj.width.value;
st.width = "" != width ? getCSSSize(width) :"";
var height = formObj.height.value;
st.height = "" != height ? getCSSSize(height) :"", formObj.style.value = ed.dom.serializeStyle(st);
}

function changedColor() {
var formObj = document.forms[0], st = ed.dom.parseStyle(formObj.style.value);
st["background-color"] = formObj.bgcolor.value, st["border-color"] = formObj.bordercolor.value, 
formObj.style.value = ed.dom.serializeStyle(st);
}

function changedStyle() {
var formObj = document.forms[0], st = ed.dom.parseStyle(formObj.style.value);
formObj.backgroundimage.value = st["background-image"] ? st["background-image"].replace(new RegExp("url\\('?([^']*)'?\\)", "gi"), "$1") :"", 
st.width && (formObj.width.value = trimSize(st.width)), st.height && (formObj.height.value = trimSize(st.height)), 
st["background-color"] && (formObj.bgcolor.value = st["background-color"], updateColor("bgcolor_pick", "bgcolor")), 
st["border-color"] && (formObj.bordercolor.value = st["border-color"], updateColor("bordercolor_pick", "bordercolor"));
}

tinyMCEPopup.requireLangPack();

var ed;

tinyMCEPopup.onInit.add(init);