/**
 * form_utils.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
function getColorPickerHTML(id, target_form_element) {
var h = "", dom = tinyMCEPopup.dom;
return (label = dom.select("label[for=" + target_form_element + "]")[0]) && (label.id = label.id || dom.uniqueId()), 
h += '<a role="button" aria-labelledby="' + id + '_label" id="' + id + '_link" href="javascript:;" onclick="tinyMCEPopup.pickColor(event,\'' + target_form_element + '\');" onmousedown="return false;" class="pickcolor">', 
h += '<span id="' + id + '" title="' + tinyMCEPopup.getLang("browse") + '">&nbsp;<span id="' + id + '_label" class="mceVoiceLabel mceIconOnly" style="display:none;">' + tinyMCEPopup.getLang("browse") + "</span></span></a>";
}

function updateColor(img_id, form_element_id) {
document.getElementById(img_id).style.backgroundColor = document.forms[0].elements[form_element_id].value;
}

function setBrowserDisabled(id, state) {
var img = document.getElementById(id), lnk = document.getElementById(id + "_link");
lnk && (state ? (lnk.setAttribute("realhref", lnk.getAttribute("href")), lnk.removeAttribute("href"), 
tinyMCEPopup.dom.addClass(img, "disabled")) :(lnk.getAttribute("realhref") && lnk.setAttribute("href", lnk.getAttribute("realhref")), 
tinyMCEPopup.dom.removeClass(img, "disabled")));
}

function getBrowserHTML(id, target_form_element, type, prefix) {
var cb, html, option = prefix + "_" + type + "_browser_callback";
return (cb = tinyMCEPopup.getParam(option, tinyMCEPopup.getParam("file_browser_callback"))) ? (html = "", 
html += '<a id="' + id + '_link" href="javascript:openBrowser(\'' + id + "','" + target_form_element + "', '" + type + "','" + option + '\');" onmousedown="return false;" class="browse">', 
html += '<span id="' + id + '" title="' + tinyMCEPopup.getLang("browse") + '">&nbsp;</span></a>') :"";
}

function openBrowser(img_id, target_form_element, type, option) {
var img = document.getElementById(img_id);
"mceButtonDisabled" != img.className && tinyMCEPopup.openBrowser(target_form_element, type, option);
}

function selectByValue(form_obj, field_name, value, add_custom, ignore_case) {
if (form_obj && form_obj.elements[field_name]) {
value || (value = "");
for (var sel = form_obj.elements[field_name], found = !1, i = 0; i < sel.options.length; i++) {
var option = sel.options[i];
option.value == value || ignore_case && option.value.toLowerCase() == value.toLowerCase() ? (option.selected = !0, 
found = !0) :option.selected = !1;
}
if (!found && add_custom && "" != value) {
var option = new Option(value, value);
option.selected = !0, sel.options[sel.options.length] = option, sel.selectedIndex = sel.options.length - 1;
}
return found;
}
}

function getSelectValue(form_obj, field_name) {
var elm = form_obj.elements[field_name];
return null == elm || null == elm.options || -1 === elm.selectedIndex ? "" :elm.options[elm.selectedIndex].value;
}

function addSelectValue(form_obj, field_name, name, value) {
var s = form_obj.elements[field_name], o = new Option(name, value);
s.options[s.options.length] = o;
}

function addClassesToList(list_id, specific_option) {
var styleSelectElm = document.getElementById(list_id), styles = tinyMCEPopup.getParam("theme_advanced_styles", !1);
if (styles = tinyMCEPopup.getParam(specific_option, styles)) {
for (var stylesAr = styles.split(";"), i = 0; i < stylesAr.length; i++) if ("" != stylesAr) {
var key, value;
key = stylesAr[i].split("=")[0], value = stylesAr[i].split("=")[1], styleSelectElm.options[styleSelectElm.length] = new Option(key, value);
}
} else tinymce.each(tinyMCEPopup.editor.dom.getClasses(), function(o) {
styleSelectElm.options[styleSelectElm.length] = new Option(o.title || o["class"], o["class"]);
});
}

function isVisible(element_id) {
var elm = document.getElementById(element_id);
return elm && "none" != elm.style.display;
}

function convertRGBToHex(col) {
var re = new RegExp("rgb\\s*\\(\\s*([0-9]+).*,\\s*([0-9]+).*,\\s*([0-9]+).*\\)", "gi"), rgb = col.replace(re, "$1,$2,$3").split(",");
return 3 == rgb.length ? (r = parseInt(rgb[0]).toString(16), g = parseInt(rgb[1]).toString(16), 
b = parseInt(rgb[2]).toString(16), r = 1 == r.length ? "0" + r :r, g = 1 == g.length ? "0" + g :g, 
b = 1 == b.length ? "0" + b :b, "#" + r + g + b) :col;
}

function convertHexToRGB(col) {
return -1 != col.indexOf("#") ? (col = col.replace(new RegExp("[^0-9A-F]", "gi"), ""), 
r = parseInt(col.substring(0, 2), 16), g = parseInt(col.substring(2, 4), 16), b = parseInt(col.substring(4, 6), 16), 
"rgb(" + r + "," + g + "," + b + ")") :col;
}

function trimSize(size) {
return size.replace(/([0-9\.]+)(px|%|in|cm|mm|em|ex|pt|pc)/i, "$1$2");
}

function getCSSSize(size) {
if (size = trimSize(size), "" == size) return "";
if (/^[0-9]+$/.test(size)) size += "px"; else if (!/^[0-9\.]+(px|%|in|cm|mm|em|ex|pt|pc)$/i.test(size)) return "";
return size;
}

function getStyle(elm, attrib, style) {
var val = tinyMCEPopup.dom.getAttrib(elm, attrib);
return "" != val ? "" + val :("undefined" == typeof style && (style = attrib), tinyMCEPopup.dom.getStyle(elm, style));
}

var themeBaseURL = tinyMCEPopup.editor.baseURI.toAbsolute("themes/" + tinyMCEPopup.getParam("theme"));