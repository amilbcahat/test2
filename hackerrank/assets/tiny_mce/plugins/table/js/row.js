function init() {
tinyMCEPopup.resizeToInnerSize(), document.getElementById("backgroundimagebrowsercontainer").innerHTML = getBrowserHTML("backgroundimagebrowser", "backgroundimage", "image", "table"), 
document.getElementById("bgcolor_pickcontainer").innerHTML = getColorPickerHTML("bgcolor_pick", "bgcolor");
var inst = tinyMCEPopup.editor, dom = inst.dom, trElm = dom.getParent(inst.selection.getStart(), "tr"), formObj = document.forms[0], st = dom.parseStyle(dom.getAttrib(trElm, "style")), rowtype = trElm.parentNode.nodeName.toLowerCase(), align = dom.getAttrib(trElm, "align"), valign = dom.getAttrib(trElm, "valign"), height = trimSize(getStyle(trElm, "height", "height")), className = dom.getAttrib(trElm, "class"), bgcolor = convertRGBToHex(getStyle(trElm, "bgcolor", "backgroundColor")), backgroundimage = getStyle(trElm, "background", "backgroundImage").replace(new RegExp("url\\(['\"]?([^'\"]*)['\"]?\\)", "gi"), "$1"), id = dom.getAttrib(trElm, "id"), lang = dom.getAttrib(trElm, "lang"), dir = dom.getAttrib(trElm, "dir");
selectByValue(formObj, "rowtype", rowtype), 0 == dom.select("td.mceSelected,th.mceSelected", trElm).length ? (addClassesToList("class", "table_row_styles"), 
TinyMCE_EditableSelects.init(), formObj.bgcolor.value = bgcolor, formObj.backgroundimage.value = backgroundimage, 
formObj.height.value = height, formObj.id.value = id, formObj.lang.value = lang, 
formObj.style.value = dom.serializeStyle(st), selectByValue(formObj, "align", align), 
selectByValue(formObj, "valign", valign), selectByValue(formObj, "class", className, !0, !0), 
selectByValue(formObj, "dir", dir), isVisible("backgroundimagebrowser") && (document.getElementById("backgroundimage").style.width = "180px"), 
updateColor("bgcolor_pick", "bgcolor")) :tinyMCEPopup.dom.hide("action");
}

function updateAction() {
var trElm, tableElm, inst = tinyMCEPopup.editor, dom = inst.dom, formObj = document.forms[0], action = getSelectValue(formObj, "action");
if (!AutoValidator.validate(formObj)) return tinyMCEPopup.alert(AutoValidator.getErrorMessages(formObj).join(". ") + "."), 
!1;
if (tinyMCEPopup.restoreSelection(), trElm = dom.getParent(inst.selection.getStart(), "tr"), 
tableElm = dom.getParent(inst.selection.getStart(), "table"), dom.select("td.mceSelected,th.mceSelected", trElm).length > 0) return tinymce.each(tableElm.rows, function(tr) {
var i;
for (i = 0; i < tr.cells.length; i++) if (dom.hasClass(tr.cells[i], "mceSelected")) return updateRow(tr, !0), 
void 0;
}), inst.addVisual(), inst.nodeChanged(), inst.execCommand("mceEndUndoLevel"), tinyMCEPopup.close(), 
void 0;
switch (action) {
case "row":
updateRow(trElm);
break;

case "all":
for (var rows = tableElm.getElementsByTagName("tr"), i = 0; i < rows.length; i++) updateRow(rows[i], !0);
break;

case "odd":
case "even":
for (var rows = tableElm.getElementsByTagName("tr"), i = 0; i < rows.length; i++) (i % 2 == 0 && "odd" == action || i % 2 != 0 && "even" == action) && updateRow(rows[i], !0, !0);
}
inst.addVisual(), inst.nodeChanged(), inst.execCommand("mceEndUndoLevel"), tinyMCEPopup.close();
}

function updateRow(tr_elm, skip_id, skip_parent) {
var inst = tinyMCEPopup.editor, formObj = document.forms[0], dom = inst.dom, curRowType = tr_elm.parentNode.nodeName.toLowerCase(), rowtype = getSelectValue(formObj, "rowtype"), doc = inst.getDoc();
if (skip_id || dom.setAttrib(tr_elm, "id", formObj.id.value), dom.setAttrib(tr_elm, "align", getSelectValue(formObj, "align")), 
dom.setAttrib(tr_elm, "vAlign", getSelectValue(formObj, "valign")), dom.setAttrib(tr_elm, "lang", formObj.lang.value), 
dom.setAttrib(tr_elm, "dir", getSelectValue(formObj, "dir")), dom.setAttrib(tr_elm, "style", dom.serializeStyle(dom.parseStyle(formObj.style.value))), 
dom.setAttrib(tr_elm, "class", getSelectValue(formObj, "class")), dom.setAttrib(tr_elm, "background", ""), 
dom.setAttrib(tr_elm, "bgColor", ""), dom.setAttrib(tr_elm, "height", ""), tr_elm.style.height = getCSSSize(formObj.height.value), 
tr_elm.style.backgroundColor = formObj.bgcolor.value, tr_elm.style.backgroundImage = "" != formObj.backgroundimage.value ? "url('" + formObj.backgroundimage.value + "')" :"", 
curRowType != rowtype && !skip_parent) {
for (var newRow = tr_elm.cloneNode(1), theTable = dom.getParent(tr_elm, "table"), dest = rowtype, newParent = null, i = 0; i < theTable.childNodes.length; i++) theTable.childNodes[i].nodeName.toLowerCase() == dest && (newParent = theTable.childNodes[i]);
null == newParent && (newParent = doc.createElement(dest), "CAPTION" == theTable.firstChild.nodeName ? inst.dom.insertAfter(newParent, theTable.firstChild) :theTable.insertBefore(newParent, theTable.firstChild)), 
newParent.appendChild(newRow), tr_elm.parentNode.removeChild(tr_elm), tr_elm = newRow;
}
dom.setAttrib(tr_elm, "style", dom.serializeStyle(dom.parseStyle(tr_elm.style.cssText)));
}

function changedBackgroundImage() {
var formObj = document.forms[0], dom = tinyMCEPopup.editor.dom, st = dom.parseStyle(formObj.style.value);
st["background-image"] = "url('" + formObj.backgroundimage.value + "')", formObj.style.value = dom.serializeStyle(st);
}

function changedStyle() {
var formObj = document.forms[0], dom = tinyMCEPopup.editor.dom, st = dom.parseStyle(formObj.style.value);
formObj.backgroundimage.value = st["background-image"] ? st["background-image"].replace(new RegExp("url\\('?([^']*)'?\\)", "gi"), "$1") :"", 
st.height && (formObj.height.value = trimSize(st.height)), st["background-color"] && (formObj.bgcolor.value = st["background-color"], 
updateColor("bgcolor_pick", "bgcolor"));
}

function changedSize() {
var formObj = document.forms[0], dom = tinyMCEPopup.editor.dom, st = dom.parseStyle(formObj.style.value), height = formObj.height.value;
st.height = "" != height ? getCSSSize(height) :"", formObj.style.value = dom.serializeStyle(st);
}

function changedColor() {
var formObj = document.forms[0], dom = tinyMCEPopup.editor.dom, st = dom.parseStyle(formObj.style.value);
st["background-color"] = formObj.bgcolor.value, formObj.style.value = dom.serializeStyle(st);
}

tinyMCEPopup.requireLangPack(), tinyMCEPopup.onInit.add(init);