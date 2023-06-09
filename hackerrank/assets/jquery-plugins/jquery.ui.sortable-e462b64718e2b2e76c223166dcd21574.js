/*
 * jQuery UI Sortable 1.8.18
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
!function($) {
$.widget("ui.sortable", $.ui.mouse, {
widgetEventPrefix:"sort",
ready:!1,
options:{
appendTo:"parent",
axis:!1,
connectWith:!1,
containment:!1,
cursor:"auto",
cursorAt:!1,
dropOnEmpty:!0,
forcePlaceholderSize:!1,
forceHelperSize:!1,
grid:!1,
handle:!1,
helper:"original",
items:"> *",
opacity:!1,
placeholder:!1,
revert:!1,
scroll:!0,
scrollSensitivity:20,
scrollSpeed:20,
scope:"default",
tolerance:"intersect",
zIndex:1e3
},
_create:function() {
var o = this.options;
this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), 
this.floating = this.items.length ? "x" === o.axis || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) :!1, 
this.offset = this.element.offset(), this._mouseInit(), this.ready = !0;
},
destroy:function() {
$.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), 
this._mouseDestroy();
for (var i = this.items.length - 1; i >= 0; i--) this.items[i].item.removeData(this.widgetName + "-item");
return this;
},
_setOption:function(key, value) {
"disabled" === key ? (this.options[key] = value, this.widget()[value ? "addClass" :"removeClass"]("ui-sortable-disabled")) :$.Widget.prototype._setOption.apply(this, arguments);
},
_mouseCapture:function(event, overrideHandle) {
var that = this;
if (this.reverting) return !1;
if (this.options.disabled || "static" == this.options.type) return !1;
this._refreshItems(event);
{
var currentItem = null, self = this;
$(event.target).parents().each(function() {
return $.data(this, that.widgetName + "-item") == self ? (currentItem = $(this), 
!1) :void 0;
});
}
if ($.data(event.target, that.widgetName + "-item") == self && (currentItem = $(event.target)), 
!currentItem) return !1;
if (this.options.handle && !overrideHandle) {
var validHandle = !1;
if ($(this.options.handle, currentItem).find("*").andSelf().each(function() {
this == event.target && (validHandle = !0);
}), !validHandle) return !1;
}
return this.currentItem = currentItem, this._removeCurrentsFromItems(), !0;
},
_mouseStart:function(event, overrideHandle, noActivation) {
var o = this.options, self = this;
if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(event), 
this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), 
this.offset = this.currentItem.offset(), this.offset = {
top:this.offset.top - this.margins.top,
left:this.offset.left - this.margins.left
}, this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), 
$.extend(this.offset, {
click:{
left:event.pageX - this.offset.left,
top:event.pageY - this.offset.top
},
parent:this._getParentOffset(),
relative:this._getRelativeOffset()
}), this.originalPosition = this._generatePosition(event), this.originalPageX = event.pageX, 
this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), 
this.domPosition = {
prev:this.currentItem.prev()[0],
parent:this.currentItem.parent()[0]
}, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), 
o.containment && this._setContainment(), o.cursor && ($("body").css("cursor") && (this._storedCursor = $("body").css("cursor")), 
$("body").css("cursor", o.cursor)), o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), 
this.helper.css("opacity", o.opacity)), o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), 
this.helper.css("zIndex", o.zIndex)), this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), 
this._trigger("start", event, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), 
!noActivation) for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("activate", event, self._uiHash(this));
return $.ui.ddmanager && ($.ui.ddmanager.current = this), $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), 
this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(event), 
!0;
},
_mouseDrag:function(event) {
if (this.position = this._generatePosition(event), this.positionAbs = this._convertPositionTo("absolute"), 
this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll) {
var o = this.options, scrolled = !1;
this.scrollParent[0] != document && "HTML" != this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed :event.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed), 
this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed :event.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed)) :(event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) :$(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed)), 
event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) :$(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed))), 
scrolled !== !1 && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event);
}
this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" == this.options.axis || (this.helper[0].style.left = this.position.left + "px"), 
this.options.axis && "x" == this.options.axis || (this.helper[0].style.top = this.position.top + "px");
for (var i = this.items.length - 1; i >= 0; i--) {
var item = this.items[i], itemElement = item.item[0], intersection = this._intersectsWithPointer(item);
if (intersection && itemElement != this.currentItem[0] && this.placeholder[1 == intersection ? "next" :"prev"]()[0] != itemElement && !$.ui.contains(this.placeholder[0], itemElement) && ("semi-dynamic" == this.options.type ? !$.ui.contains(this.element[0], itemElement) :!0)) {
if (this.direction = 1 == intersection ? "down" :"up", "pointer" != this.options.tolerance && !this._intersectsWithSides(item)) break;
this._rearrange(event, item), this._trigger("change", event, this._uiHash());
break;
}
}
return this._contactContainers(event), $.ui.ddmanager && $.ui.ddmanager.drag(this, event), 
this._trigger("sort", event, this._uiHash()), this.lastPositionAbs = this.positionAbs, 
!1;
},
_mouseStop:function(event, noPropagation) {
if (event) {
if ($.ui.ddmanager && !this.options.dropBehaviour && $.ui.ddmanager.drop(this, event), 
this.options.revert) {
var self = this, cur = self.placeholder.offset();
self.reverting = !0, $(this.helper).animate({
left:cur.left - this.offset.parent.left - self.margins.left + (this.offsetParent[0] == document.body ? 0 :this.offsetParent[0].scrollLeft),
top:cur.top - this.offset.parent.top - self.margins.top + (this.offsetParent[0] == document.body ? 0 :this.offsetParent[0].scrollTop)
}, parseInt(this.options.revert, 10) || 500, function() {
self._clear(event);
});
} else this._clear(event, noPropagation);
return !1;
}
},
cancel:function() {
var self = this;
if (this.dragging) {
this._mouseUp({
target:null
}), "original" == this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") :this.currentItem.show();
for (var i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("deactivate", null, self._uiHash(this)), 
this.containers[i].containerCache.over && (this.containers[i]._trigger("out", null, self._uiHash(this)), 
this.containers[i].containerCache.over = 0);
}
return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
"original" != this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), 
$.extend(this, {
helper:null,
dragging:!1,
reverting:!1,
_noFinalSort:null
}), this.domPosition.prev ? $(this.domPosition.prev).after(this.currentItem) :$(this.domPosition.parent).prepend(this.currentItem)), 
this;
},
serialize:function(o) {
var items = this._getItemsAsjQuery(o && o.connected), str = [];
return o = o || {}, $(items).each(function() {
var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[-=_](.+)/);
res && str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] :res[2]));
}), !str.length && o.key && str.push(o.key + "="), str.join("&");
},
toArray:function(o) {
var items = this._getItemsAsjQuery(o && o.connected), ret = [];
return o = o || {}, items.each(function() {
ret.push($(o.item || this).attr(o.attribute || "id") || "");
}), ret;
},
_intersectsWith:function(item) {
var x1 = this.positionAbs.left, x2 = x1 + this.helperProportions.width, y1 = this.positionAbs.top, y2 = y1 + this.helperProportions.height, l = item.left, r = l + item.width, t = item.top, b = t + item.height, dyClick = this.offset.click.top, dxClick = this.offset.click.left, isOverElement = y1 + dyClick > t && b > y1 + dyClick && x1 + dxClick > l && r > x1 + dxClick;
return "pointer" == this.options.tolerance || this.options.forcePointerForContainers || "pointer" != this.options.tolerance && this.helperProportions[this.floating ? "width" :"height"] > item[this.floating ? "width" :"height"] ? isOverElement :l < x1 + this.helperProportions.width / 2 && x2 - this.helperProportions.width / 2 < r && t < y1 + this.helperProportions.height / 2 && y2 - this.helperProportions.height / 2 < b;
},
_intersectsWithPointer:function(item) {
var isOverElementHeight = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height), isOverElementWidth = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width), isOverElement = isOverElementHeight && isOverElementWidth, verticalDirection = this._getDragVerticalDirection(), horizontalDirection = this._getDragHorizontalDirection();
return isOverElement ? this.floating ? horizontalDirection && "right" == horizontalDirection || "down" == verticalDirection ? 2 :1 :verticalDirection && ("down" == verticalDirection ? 2 :1) :!1;
},
_intersectsWithSides:function(item) {
var isOverBottomHalf = $.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height), isOverRightHalf = $.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width), verticalDirection = this._getDragVerticalDirection(), horizontalDirection = this._getDragHorizontalDirection();
return this.floating && horizontalDirection ? "right" == horizontalDirection && isOverRightHalf || "left" == horizontalDirection && !isOverRightHalf :verticalDirection && ("down" == verticalDirection && isOverBottomHalf || "up" == verticalDirection && !isOverBottomHalf);
},
_getDragVerticalDirection:function() {
var delta = this.positionAbs.top - this.lastPositionAbs.top;
return 0 != delta && (delta > 0 ? "down" :"up");
},
_getDragHorizontalDirection:function() {
var delta = this.positionAbs.left - this.lastPositionAbs.left;
return 0 != delta && (delta > 0 ? "right" :"left");
},
refresh:function(event) {
return this._refreshItems(event), this.refreshPositions(), this;
},
_connectWith:function() {
var options = this.options;
return options.connectWith.constructor == String ? [ options.connectWith ] :options.connectWith;
},
_getItemsAsjQuery:function(connected) {
var items = [], queries = [], connectWith = this._connectWith();
if (connectWith && connected) for (var i = connectWith.length - 1; i >= 0; i--) for (var cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) {
var inst = $.data(cur[j], this.widgetName);
inst && inst != this && !inst.options.disabled && queries.push([ $.isFunction(inst.options.items) ? inst.options.items.call(inst.element) :$(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst ]);
}
queries.push([ $.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
options:this.options,
item:this.currentItem
}) :$(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this ]);
for (var i = queries.length - 1; i >= 0; i--) queries[i][0].each(function() {
items.push(this);
});
return $(items);
},
_removeCurrentsFromItems:function() {
for (var list = this.currentItem.find(":data(" + this.widgetName + "-item)"), i = 0; i < this.items.length; i++) for (var j = 0; j < list.length; j++) list[j] == this.items[i].item[0] && this.items.splice(i, 1);
},
_refreshItems:function(event) {
this.items = [], this.containers = [ this ];
var items = this.items, queries = [ [ $.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
item:this.currentItem
}) :$(this.options.items, this.element), this ] ], connectWith = this._connectWith();
if (connectWith && this.ready) for (var i = connectWith.length - 1; i >= 0; i--) for (var cur = $(connectWith[i]), j = cur.length - 1; j >= 0; j--) {
var inst = $.data(cur[j], this.widgetName);
inst && inst != this && !inst.options.disabled && (queries.push([ $.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
item:this.currentItem
}) :$(inst.options.items, inst.element), inst ]), this.containers.push(inst));
}
for (var i = queries.length - 1; i >= 0; i--) for (var targetData = queries[i][1], _queries = queries[i][0], j = 0, queriesLength = _queries.length; queriesLength > j; j++) {
var item = $(_queries[j]);
item.data(this.widgetName + "-item", targetData), items.push({
item:item,
instance:targetData,
width:0,
height:0,
left:0,
top:0
});
}
},
refreshPositions:function(fast) {
this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
for (var i = this.items.length - 1; i >= 0; i--) {
var item = this.items[i];
if (item.instance == this.currentContainer || !this.currentContainer || item.item[0] == this.currentItem[0]) {
var t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) :item.item;
fast || (item.width = t.outerWidth(), item.height = t.outerHeight());
var p = t.offset();
item.left = p.left, item.top = p.top;
}
}
if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (var i = this.containers.length - 1; i >= 0; i--) {
var p = this.containers[i].element.offset();
this.containers[i].containerCache.left = p.left, this.containers[i].containerCache.top = p.top, 
this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), 
this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
}
return this;
},
_createPlaceholder:function(that) {
var self = that || this, o = self.options;
if (!o.placeholder || o.placeholder.constructor == String) {
var className = o.placeholder;
o.placeholder = {
element:function() {
var el = $(document.createElement(self.currentItem[0].nodeName)).addClass(className || self.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
return className || (el.style.visibility = "hidden"), el;
},
update:function(container, p) {
(!className || o.forcePlaceholderSize) && (p.height() || p.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css("paddingTop") || 0, 10) - parseInt(self.currentItem.css("paddingBottom") || 0, 10)), 
p.width() || p.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css("paddingLeft") || 0, 10) - parseInt(self.currentItem.css("paddingRight") || 0, 10)));
}
};
}
self.placeholder = $(o.placeholder.element.call(self.element, self.currentItem)), 
self.currentItem.after(self.placeholder), o.placeholder.update(self, self.placeholder);
},
_contactContainers:function(event) {
for (var innermostContainer = null, innermostIndex = null, i = this.containers.length - 1; i >= 0; i--) if (!$.ui.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
if (innermostContainer && $.ui.contains(this.containers[i].element[0], innermostContainer.element[0])) continue;
innermostContainer = this.containers[i], innermostIndex = i;
} else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", event, this._uiHash(this)), 
this.containers[i].containerCache.over = 0);
if (innermostContainer) if (1 === this.containers.length) this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), 
this.containers[innermostIndex].containerCache.over = 1; else if (this.currentContainer != this.containers[innermostIndex]) {
for (var dist = 1e4, itemWithLeastDistance = null, base = this.positionAbs[this.containers[innermostIndex].floating ? "left" :"top"], j = this.items.length - 1; j >= 0; j--) if ($.ui.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
var cur = this.items[j][this.containers[innermostIndex].floating ? "left" :"top"];
Math.abs(cur - base) < dist && (dist = Math.abs(cur - base), itemWithLeastDistance = this.items[j]);
}
if (!itemWithLeastDistance && !this.options.dropOnEmpty) return;
this.currentContainer = this.containers[innermostIndex], itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, !0) :this._rearrange(event, null, this.containers[innermostIndex].element, !0), 
this._trigger("change", event, this._uiHash()), this.containers[innermostIndex]._trigger("change", event, this._uiHash(this)), 
this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)), 
this.containers[innermostIndex].containerCache.over = 1;
}
},
_createHelper:function(event) {
var o = this.options, helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [ event, this.currentItem ])) :"clone" == o.helper ? this.currentItem.clone() :this.currentItem;
return helper.parents("body").length || $("parent" != o.appendTo ? o.appendTo :this.currentItem[0].parentNode)[0].appendChild(helper[0]), 
helper[0] == this.currentItem[0] && (this._storedCSS = {
width:this.currentItem[0].style.width,
height:this.currentItem[0].style.height,
position:this.currentItem.css("position"),
top:this.currentItem.css("top"),
left:this.currentItem.css("left")
}), ("" == helper[0].style.width || o.forceHelperSize) && helper.width(this.currentItem.width()), 
("" == helper[0].style.height || o.forceHelperSize) && helper.height(this.currentItem.height()), 
helper;
},
_adjustOffsetFromHelper:function(obj) {
"string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
left:+obj[0],
top:+obj[1] || 0
}), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), 
"top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top);
},
_getParentOffset:function() {
this.offsetParent = this.helper.offsetParent();
var po = this.offsetParent.offset();
return "absolute" == this.cssPosition && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), 
po.top += this.scrollParent.scrollTop()), (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && "html" == this.offsetParent[0].tagName.toLowerCase() && $.browser.msie) && (po = {
top:0,
left:0
}), {
top:po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
left:po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
};
},
_getRelativeOffset:function() {
if ("relative" == this.cssPosition) {
var p = this.currentItem.position();
return {
top:p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
left:p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
};
}
return {
top:0,
left:0
};
},
_cacheMargins:function() {
this.margins = {
left:parseInt(this.currentItem.css("marginLeft"), 10) || 0,
top:parseInt(this.currentItem.css("marginTop"), 10) || 0
};
},
_cacheHelperProportions:function() {
this.helperProportions = {
width:this.helper.outerWidth(),
height:this.helper.outerHeight()
};
},
_setContainment:function() {
var o = this.options;
if ("parent" == o.containment && (o.containment = this.helper[0].parentNode), ("document" == o.containment || "window" == o.containment) && (this.containment = [ 0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $("document" == o.containment ? document :window).width() - this.helperProportions.width - this.margins.left, ($("document" == o.containment ? document :window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]), 
!/^(document|window|parent)$/.test(o.containment)) {
var ce = $(o.containment)[0], co = $(o.containment).offset(), over = "hidden" != $(ce).css("overflow");
this.containment = [ co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) :ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) :ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top ];
}
},
_convertPositionTo:function(d, pos) {
pos || (pos = this.position);
var mod = "absolute" == d ? 1 :-1, scroll = (this.options, "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent), scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
return {
top:pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ($.browser.safari && "fixed" == this.cssPosition ? 0 :("fixed" == this.cssPosition ? -this.scrollParent.scrollTop() :scrollIsRootNode ? 0 :scroll.scrollTop()) * mod),
left:pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ($.browser.safari && "fixed" == this.cssPosition ? 0 :("fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :scrollIsRootNode ? 0 :scroll.scrollLeft()) * mod)
};
},
_generatePosition:function(event) {
var o = this.options, scroll = "absolute" != this.cssPosition || this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent :this.offsetParent, scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
"relative" != this.cssPosition || this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset());
var pageX = event.pageX, pageY = event.pageY;
if (this.originalPosition && (this.containment && (event.pageX - this.offset.click.left < this.containment[0] && (pageX = this.containment[0] + this.offset.click.left), 
event.pageY - this.offset.click.top < this.containment[1] && (pageY = this.containment[1] + this.offset.click.top), 
event.pageX - this.offset.click.left > this.containment[2] && (pageX = this.containment[2] + this.offset.click.left), 
event.pageY - this.offset.click.top > this.containment[3] && (pageY = this.containment[3] + this.offset.click.top)), 
o.grid)) {
var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
pageY = this.containment ? top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3] ? top - this.offset.click.top < this.containment[1] ? top + o.grid[1] :top - o.grid[1] :top :top;
var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
pageX = this.containment ? left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2] ? left - this.offset.click.left < this.containment[0] ? left + o.grid[0] :left - o.grid[0] :left :left;
}
return {
top:pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ($.browser.safari && "fixed" == this.cssPosition ? 0 :"fixed" == this.cssPosition ? -this.scrollParent.scrollTop() :scrollIsRootNode ? 0 :scroll.scrollTop()),
left:pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ($.browser.safari && "fixed" == this.cssPosition ? 0 :"fixed" == this.cssPosition ? -this.scrollParent.scrollLeft() :scrollIsRootNode ? 0 :scroll.scrollLeft())
};
},
_rearrange:function(event, i, a, hardRefresh) {
a ? a[0].appendChild(this.placeholder[0]) :i.item[0].parentNode.insertBefore(this.placeholder[0], "down" == this.direction ? i.item[0] :i.item[0].nextSibling), 
this.counter = this.counter ? ++this.counter :1;
var self = this, counter = this.counter;
window.setTimeout(function() {
counter == self.counter && self.refreshPositions(!hardRefresh);
}, 0);
},
_clear:function(event, noPropagation) {
this.reverting = !1;
var delayedTriggers = [];
if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), 
this._noFinalSort = null, this.helper[0] == this.currentItem[0]) {
for (var i in this._storedCSS) ("auto" == this._storedCSS[i] || "static" == this._storedCSS[i]) && (this._storedCSS[i] = "");
this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
} else this.currentItem.show();
if (this.fromOutside && !noPropagation && delayedTriggers.push(function(event) {
this._trigger("receive", event, this._uiHash(this.fromOutside));
}), !this.fromOutside && this.domPosition.prev == this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent == this.currentItem.parent()[0] || noPropagation || delayedTriggers.push(function(event) {
this._trigger("update", event, this._uiHash());
}), !$.ui.contains(this.element[0], this.currentItem[0])) {
noPropagation || delayedTriggers.push(function(event) {
this._trigger("remove", event, this._uiHash());
});
for (var i = this.containers.length - 1; i >= 0; i--) $.ui.contains(this.containers[i].element[0], this.currentItem[0]) && !noPropagation && (delayedTriggers.push(function(c) {
return function(event) {
c._trigger("receive", event, this._uiHash(this));
};
}.call(this, this.containers[i])), delayedTriggers.push(function(c) {
return function(event) {
c._trigger("update", event, this._uiHash(this));
};
}.call(this, this.containers[i])));
}
for (var i = this.containers.length - 1; i >= 0; i--) noPropagation || delayedTriggers.push(function(c) {
return function(event) {
c._trigger("deactivate", event, this._uiHash(this));
};
}.call(this, this.containers[i])), this.containers[i].containerCache.over && (delayedTriggers.push(function(c) {
return function(event) {
c._trigger("out", event, this._uiHash(this));
};
}.call(this, this.containers[i])), this.containers[i].containerCache.over = 0);
if (this._storedCursor && $("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), 
this._storedZIndex && this.helper.css("zIndex", "auto" == this._storedZIndex ? "" :this._storedZIndex), 
this.dragging = !1, this.cancelHelperRemoval) {
if (!noPropagation) {
this._trigger("beforeStop", event, this._uiHash());
for (var i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
this._trigger("stop", event, this._uiHash());
}
return !1;
}
if (noPropagation || this._trigger("beforeStop", event, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), 
this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null, 
!noPropagation) {
for (var i = 0; i < delayedTriggers.length; i++) delayedTriggers[i].call(this, event);
this._trigger("stop", event, this._uiHash());
}
return this.fromOutside = !1, !0;
},
_trigger:function() {
$.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel();
},
_uiHash:function(inst) {
var self = inst || this;
return {
helper:self.helper,
placeholder:self.placeholder || $([]),
position:self.position,
originalPosition:self.originalPosition,
offset:self.positionAbs,
item:self.currentItem,
sender:inst ? inst.element :null
};
}
}), $.extend($.ui.sortable, {
version:"1.8.18"
});
}(jQuery);