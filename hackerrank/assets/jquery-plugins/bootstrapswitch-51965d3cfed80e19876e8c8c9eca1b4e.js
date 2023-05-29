!function($) {
"use strict";
$.fn.bootstrapSwitch = function(method) {
var methods = {
init:function() {
return this.each(function() {
var $div, $switchLeft, $switchRight, $label, color, moving, $element = $(this), myClasses = "", classes = $element.attr("class"), onLabel = "ON", offLabel = "OFF", icon = !1;
$.each([ "switch-mini", "switch-small", "switch-large" ], function(i, el) {
classes.indexOf(el) >= 0 && (myClasses = el);
}), $element.addClass("has-switch"), void 0 !== $element.data("on") && (color = "switch-" + $element.data("on")), 
void 0 !== $element.data("on-label") && (onLabel = $element.data("on-label")), void 0 !== $element.data("off-label") && (offLabel = $element.data("off-label")), 
void 0 !== $element.data("icon") && (icon = $element.data("icon")), $switchLeft = $("<span>").addClass("switch-left").addClass(myClasses).addClass(color).html(onLabel), 
color = "", void 0 !== $element.data("off") && (color = "switch-" + $element.data("off")), 
$switchRight = $("<span>").addClass("switch-right").addClass(myClasses).addClass(color).html(offLabel), 
$label = $("<label>").html("&nbsp;").addClass(myClasses).attr("for", $element.find("input").attr("id")), 
icon && $label.html('<i class="icon icon-' + icon + '"></i>'), $div = $element.find(":checkbox").wrap($("<div>")).parent().data("animated", !1), 
$element.data("animated") !== !1 && $div.addClass("switch-animate").data("animated", !0), 
$div.append($switchLeft).append($label).append($switchRight), $element.find(">div").addClass($element.find("input").is(":checked") ? "switch-on" :"switch-off"), 
$element.find("input").is(":disabled") && $(this).addClass("deactivate");
var changeStatus = function($this) {
$this.siblings("label").trigger("mousedown").trigger("mouseup").trigger("click");
};
$element.on("keydown", function(e) {
32 === e.keyCode && (e.stopImmediatePropagation(), e.preventDefault(), changeStatus($(e.target).find("span:first")));
}), $switchLeft.on("click", function() {
changeStatus($(this));
}), $switchRight.on("click", function() {
changeStatus($(this));
}), $element.find("input").on("change", function(e) {
var $this = $(this), $element = $this.parent(), thisState = $this.is(":checked"), state = $element.is(".switch-off");
e.preventDefault(), $element.css("left", ""), state === thisState && (thisState ? $element.removeClass("switch-off").addClass("switch-on") :$element.removeClass("switch-on").addClass("switch-off"), 
$element.data("animated") !== !1 && $element.addClass("switch-animate"), $element.parent().trigger("switch-change", {
el:$this,
value:thisState
}));
}), $element.find("label").on("mousedown touchstart", function(e) {
var $this = $(this);
moving = !1, e.preventDefault(), e.stopImmediatePropagation(), $this.closest("div").removeClass("switch-animate"), 
$this.closest(".switch").is(".deactivate") ? $this.unbind("click") :($this.on("mousemove touchmove", function(e) {
var $element = $(this).closest(".switch"), relativeX = (e.pageX || e.originalEvent.targetTouches[0].pageX) - $element.offset().left, percent = relativeX / $element.width() * 100, left = 25, right = 75;
moving = !0, left > percent ? percent = left :percent > right && (percent = right), 
$element.find(">div").css("left", percent - right + "%");
}), $this.on("click touchend", function(e) {
var $this = $(this), $target = $(e.target), $myCheckBox = $target.siblings("input");
e.stopImmediatePropagation(), e.preventDefault(), $this.unbind("mouseleave"), moving ? $myCheckBox.prop("checked", !(parseInt($this.parent().css("left")) < -25)) :$myCheckBox.prop("checked", !$myCheckBox.is(":checked")), 
moving = !1, $myCheckBox.trigger("change");
}), $this.on("mouseleave", function(e) {
var $this = $(this), $myCheckBox = $this.siblings("input");
e.preventDefault(), e.stopImmediatePropagation(), $this.unbind("mouseleave"), $this.trigger("mouseup"), 
$myCheckBox.prop("checked", !(parseInt($this.parent().css("left")) < -25)).trigger("change");
}), $this.on("mouseup", function(e) {
e.stopImmediatePropagation(), e.preventDefault(), $(this).unbind("mousemove");
}));
});
});
},
toggleActivation:function() {
$(this).toggleClass("deactivate");
},
isActive:function() {
return !$(this).hasClass("deactivate");
},
setActive:function(active) {
active ? $(this).removeClass("deactivate") :$(this).addClass("deactivate");
},
toggleState:function(skipOnChange) {
var $input = $(this).find("input:checkbox");
$input.prop("checked", !$input.is(":checked")).trigger("change", skipOnChange);
},
setState:function(value, skipOnChange) {
$(this).find("input:checkbox").prop("checked", value).trigger("change", skipOnChange);
},
status:function() {
return $(this).find("input:checkbox").is(":checked");
},
destroy:function() {
var $checkbox, $div = $(this).find("div");
return $div.find(":not(input:checkbox)").remove(), $checkbox = $div.children(), 
$checkbox.unwrap().unwrap(), $checkbox.unbind("change"), $checkbox;
}
};
return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof method && method ? ($.error("Method " + method + " does not exist!"), 
void 0) :methods.init.apply(this, arguments);
};
}(jQuery);