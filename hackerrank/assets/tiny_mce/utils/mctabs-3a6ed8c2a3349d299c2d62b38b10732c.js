/**
 * mctabs.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
function MCTabs() {
this.settings = [], this.onChange = tinyMCEPopup.editor.windowManager.createInstance("tinymce.util.Dispatcher");
}

MCTabs.prototype.init = function(settings) {
this.settings = settings;
}, MCTabs.prototype.getParam = function(name, default_value) {
var value = null;
return value = "undefined" == typeof this.settings[name] ? default_value :this.settings[name], 
"true" == value || "false" == value ? "true" == value :value;
}, MCTabs.prototype.showTab = function(tab) {
tab.className = "current", tab.setAttribute("aria-selected", !0), tab.setAttribute("aria-expanded", !0), 
tab.tabIndex = 0;
}, MCTabs.prototype.hideTab = function(tab) {
tab.className = "", tab.setAttribute("aria-selected", !1), tab.setAttribute("aria-expanded", !1), 
tab.tabIndex = -1;
}, MCTabs.prototype.showPanel = function(panel) {
panel.className = "current", panel.setAttribute("aria-hidden", !1);
}, MCTabs.prototype.hidePanel = function(panel) {
panel.className = "panel", panel.setAttribute("aria-hidden", !0);
}, MCTabs.prototype.getPanelForTab = function(tabElm) {
return tinyMCEPopup.dom.getAttrib(tabElm, "aria-controls");
}, MCTabs.prototype.displayTab = function(tab_id, panel_id, avoid_focus) {
var panelElm, panelContainerElm, tabElm, tabContainerElm, selectionClass, nodes, i, t = this;
if (tabElm = document.getElementById(tab_id), void 0 === panel_id && (panel_id = t.getPanelForTab(tabElm)), 
panelElm = document.getElementById(panel_id), panelContainerElm = panelElm ? panelElm.parentNode :null, 
tabContainerElm = tabElm ? tabElm.parentNode :null, selectionClass = t.getParam("selection_class", "current"), 
tabElm && tabContainerElm) {
for (nodes = tabContainerElm.childNodes, i = 0; i < nodes.length; i++) "LI" == nodes[i].nodeName && t.hideTab(nodes[i]);
t.showTab(tabElm);
}
if (panelElm && panelContainerElm) {
for (nodes = panelContainerElm.childNodes, i = 0; i < nodes.length; i++) "DIV" == nodes[i].nodeName && t.hidePanel(nodes[i]);
avoid_focus || tabElm.focus(), t.showPanel(panelElm);
}
}, MCTabs.prototype.getAnchor = function() {
var pos, url = document.location.href;
return -1 != (pos = url.lastIndexOf("#")) ? url.substring(pos + 1) :"";
};

var mcTabs = new MCTabs();

tinyMCEPopup.onInit.add(function() {
var tinymce = tinyMCEPopup.getWin().tinymce, dom = tinyMCEPopup.dom, each = tinymce.each;
each(dom.select("div.tabs"), function(tabContainerElm) {
var keyNav;
dom.setAttrib(tabContainerElm, "role", "tablist");
var items = tinyMCEPopup.dom.select("li", tabContainerElm), action = function(id) {
mcTabs.displayTab(id, mcTabs.getPanelForTab(id)), mcTabs.onChange.dispatch(id);
};
each(items, function(item) {
dom.setAttrib(item, "role", "tab"), dom.bind(item, "click", function() {
action(item.id);
});
}), dom.bind(dom.getRoot(), "keydown", function(evt) {
9 === evt.keyCode && evt.ctrlKey && !evt.altKey && (keyNav.moveFocus(evt.shiftKey ? -1 :1), 
tinymce.dom.Event.cancel(evt));
}), each(dom.select("a", tabContainerElm), function(a) {
dom.setAttrib(a, "tabindex", "-1");
}), keyNav = tinyMCEPopup.editor.windowManager.createInstance("tinymce.ui.KeyboardNavigation", {
root:tabContainerElm,
items:items,
onAction:action,
actOnFocus:!0,
enableLeftRight:!0,
enableUpDown:!0
}, tinyMCEPopup.dom);
});
});