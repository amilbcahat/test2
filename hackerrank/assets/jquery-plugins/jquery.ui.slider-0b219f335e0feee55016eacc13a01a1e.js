/*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
!function(a, b) {
function c(b, c) {
var e = b.nodeName.toLowerCase();
if ("area" === e) {
var h, f = b.parentNode, g = f.name;
return b.href && g && "map" === f.nodeName.toLowerCase() ? (h = a("img[usemap=#" + g + "]")[0], 
!!h && d(h)) :!1;
}
return (/input|select|textarea|button|object/.test(e) ? !b.disabled :"a" == e ? b.href || c :c) && d(b);
}
function d(b) {
return !a(b).parents().andSelf().filter(function() {
return "hidden" === a.curCSS(this, "visibility") || a.expr.filters.hidden(this);
}).length;
}
a.ui = a.ui || {}, a.ui.version || (a.extend(a.ui, {
version:"1.8.23",
keyCode:{
ALT:18,
BACKSPACE:8,
CAPS_LOCK:20,
COMMA:188,
COMMAND:91,
COMMAND_LEFT:91,
COMMAND_RIGHT:93,
CONTROL:17,
DELETE:46,
DOWN:40,
END:35,
ENTER:13,
ESCAPE:27,
HOME:36,
INSERT:45,
LEFT:37,
MENU:93,
NUMPAD_ADD:107,
NUMPAD_DECIMAL:110,
NUMPAD_DIVIDE:111,
NUMPAD_ENTER:108,
NUMPAD_MULTIPLY:106,
NUMPAD_SUBTRACT:109,
PAGE_DOWN:34,
PAGE_UP:33,
PERIOD:190,
RIGHT:39,
SHIFT:16,
SPACE:32,
TAB:9,
UP:38,
WINDOWS:91
}
}), a.fn.extend({
propAttr:a.fn.prop || a.fn.attr,
_focus:a.fn.focus,
focus:function(b, c) {
return "number" == typeof b ? this.each(function() {
var d = this;
setTimeout(function() {
a(d).focus(), c && c.call(d);
}, b);
}) :this._focus.apply(this, arguments);
},
scrollParent:function() {
var b;
return b = a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1));
}).eq(0) :this.parents().filter(function() {
return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1));
}).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) :b;
},
zIndex:function(c) {
if (c !== b) return this.css("zIndex", c);
if (this.length) for (var e, f, d = a(this[0]); d.length && d[0] !== document; ) {
if (e = d.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (f = parseInt(d.css("zIndex"), 10), 
!isNaN(f) && 0 !== f)) return f;
d = d.parent();
}
return 0;
},
disableSelection:function() {
return this.bind((a.support.selectstart ? "selectstart" :"mousedown") + ".ui-disableSelection", function(a) {
a.preventDefault();
});
},
enableSelection:function() {
return this.unbind(".ui-disableSelection");
}
}), a("<a>").outerWidth(1).jquery || a.each([ "Width", "Height" ], function(c, d) {
function h(b, c, d, f) {
return a.each(e, function() {
c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), 
f && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0);
}), c;
}
var e = "Width" === d ? [ "Left", "Right" ] :[ "Top", "Bottom" ], f = d.toLowerCase(), g = {
innerWidth:a.fn.innerWidth,
innerHeight:a.fn.innerHeight,
outerWidth:a.fn.outerWidth,
outerHeight:a.fn.outerHeight
};
a.fn["inner" + d] = function(c) {
return c === b ? g["inner" + d].call(this) :this.each(function() {
a(this).css(f, h(this, c) + "px");
});
}, a.fn["outer" + d] = function(b, c) {
return "number" != typeof b ? g["outer" + d].call(this, b) :this.each(function() {
a(this).css(f, h(this, b, !0, c) + "px");
});
};
}), a.extend(a.expr[":"], {
data:a.expr.createPseudo ? a.expr.createPseudo(function(b) {
return function(c) {
return !!a.data(c, b);
};
}) :function(b, c, d) {
return !!a.data(b, d[3]);
},
focusable:function(b) {
return c(b, !isNaN(a.attr(b, "tabindex")));
},
tabbable:function(b) {
var d = a.attr(b, "tabindex"), e = isNaN(d);
return (e || d >= 0) && c(b, !e);
}
}), a(function() {
var b = document.body, c = b.appendChild(c = document.createElement("div"));
c.offsetHeight, a.extend(c.style, {
minHeight:"100px",
height:"auto",
padding:0,
borderWidth:0
}), a.support.minHeight = 100 === c.offsetHeight, a.support.selectstart = "onselectstart" in c, 
b.removeChild(c).style.display = "none";
}), a.curCSS || (a.curCSS = a.css), a.extend(a.ui, {
plugin:{
add:function(b, c, d) {
var e = a.ui[b].prototype;
for (var f in d) e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([ c, d[f] ]);
},
call:function(a, b, c) {
var d = a.plugins[b];
if (d && a.element[0].parentNode) for (var e = 0; e < d.length; e++) a.options[d[e][0]] && d[e][1].apply(a.element, c);
}
},
contains:function(a, b) {
return document.compareDocumentPosition ? 16 & a.compareDocumentPosition(b) :a !== b && a.contains(b);
},
hasScroll:function(b, c) {
if ("hidden" === a(b).css("overflow")) return !1;
var d = c && "left" === c ? "scrollLeft" :"scrollTop", e = !1;
return b[d] > 0 ? !0 :(b[d] = 1, e = b[d] > 0, b[d] = 0, e);
},
isOverAxis:function(a, b, c) {
return a > b && b + c > a;
},
isOver:function(b, c, d, e, f, g) {
return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g);
}
}));
}(jQuery), /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
function(a, b) {
if (a.cleanData) {
var c = a.cleanData;
a.cleanData = function(b) {
for (var e, d = 0; null != (e = b[d]); d++) try {
a(e).triggerHandler("remove");
} catch (f) {}
c(b);
};
} else {
var d = a.fn.remove;
a.fn.remove = function(b, c) {
return this.each(function() {
return c || (!b || a.filter(b, [ this ]).length) && a("*", this).add([ this ]).each(function() {
try {
a(this).triggerHandler("remove");
} catch (b) {}
}), d.call(a(this), b, c);
});
};
}
a.widget = function(b, c, d) {
var f, e = b.split(".")[0];
b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function(c) {
return !!a.data(c, b);
}, a[e] = a[e] || {}, a[e][b] = function(a, b) {
arguments.length && this._createWidget(a, b);
};
var g = new c();
g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {
namespace:e,
widgetName:b,
widgetEventPrefix:a[e][b].prototype.widgetEventPrefix || b,
widgetBaseClass:f
}, d), a.widget.bridge(b, a[e][b]);
}, a.widget.bridge = function(c, d) {
a.fn[c] = function(e) {
var f = "string" == typeof e, g = Array.prototype.slice.call(arguments, 1), h = this;
return e = !f && g.length ? a.extend.apply(null, [ !0, e ].concat(g)) :e, f && "_" === e.charAt(0) ? h :(f ? this.each(function() {
var d = a.data(this, c), f = d && a.isFunction(d[e]) ? d[e].apply(d, g) :d;
return f !== d && f !== b ? (h = f, !1) :void 0;
}) :this.each(function() {
var b = a.data(this, c);
b ? b.option(e || {})._init() :a.data(this, c, new d(e, this));
}), h);
};
}, a.Widget = function(a, b) {
arguments.length && this._createWidget(a, b);
}, a.Widget.prototype = {
widgetName:"widget",
widgetEventPrefix:"",
options:{
disabled:!1
},
_createWidget:function(b, c) {
a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
var d = this;
this.element.bind("remove." + this.widgetName, function() {
d.destroy();
}), this._create(), this._trigger("create"), this._init();
},
_getCreateOptions:function() {
return a.metadata && a.metadata.get(this.element[0])[this.widgetName];
},
_create:function() {},
_init:function() {},
destroy:function() {
this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled");
},
widget:function() {
return this.element;
},
option:function(c, d) {
var e = c;
if (0 === arguments.length) return a.extend({}, this.options);
if ("string" == typeof c) {
if (d === b) return this.options[c];
e = {}, e[c] = d;
}
return this._setOptions(e), this;
},
_setOptions:function(b) {
var c = this;
return a.each(b, function(a, b) {
c._setOption(a, b);
}), this;
},
_setOption:function(a, b) {
return this.options[a] = b, "disabled" === a && this.widget()[b ? "addClass" :"removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", b), 
this;
},
enable:function() {
return this._setOption("disabled", !1);
},
disable:function() {
return this._setOption("disabled", !0);
},
_trigger:function(b, c, d) {
var e, f, g = this.options[b];
if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b :this.widgetEventPrefix + b).toLowerCase(), 
c.target = this.element[0], f = c.originalEvent, f) for (e in f) e in c || (c[e] = f[e]);
return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented());
}
};
}(jQuery), /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
function(a) {
var c = !1;
a(document).mouseup(function() {
c = !1;
}), a.widget("ui.mouse", {
options:{
cancel:":input,option",
distance:1,
delay:0
},
_mouseInit:function() {
var b = this;
this.element.bind("mousedown." + this.widgetName, function(a) {
return b._mouseDown(a);
}).bind("click." + this.widgetName, function(c) {
return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), 
c.stopImmediatePropagation(), !1) :void 0;
}), this.started = !1;
},
_mouseDestroy:function() {
this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
},
_mouseDown:function(b) {
if (!c) {
this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
var d = this, e = 1 == b.which, f = "string" == typeof this.options.cancel && b.target.nodeName ? a(b.target).closest(this.options.cancel).length :!1;
return e && !f && this._mouseCapture(b) ? (this.mouseDelayMet = !this.options.delay, 
this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
d.mouseDelayMet = !0;
}, this.options.delay)), this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(b) !== !1, 
!this._mouseStarted) ? (b.preventDefault(), !0) :(!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), 
this._mouseMoveDelegate = function(a) {
return d._mouseMove(a);
}, this._mouseUpDelegate = function(a) {
return d._mouseUp(a);
}, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
b.preventDefault(), c = !0, !0)) :!0;
}
},
_mouseMove:function(b) {
return !a.browser.msie || document.documentMode >= 9 || b.button ? this._mouseStarted ? (this._mouseDrag(b), 
b.preventDefault()) :(this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, 
this._mouseStarted ? this._mouseDrag(b) :this._mouseUp(b)), !this._mouseStarted) :this._mouseUp(b);
},
_mouseUp:function(b) {
return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), 
this._mouseStop(b)), !1;
},
_mouseDistanceMet:function(a) {
return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance;
},
_mouseDelayMet:function() {
return this.mouseDelayMet;
},
_mouseStart:function() {},
_mouseDrag:function() {},
_mouseStop:function() {},
_mouseCapture:function() {
return !0;
}
});
}(jQuery), /*! jQuery UI - v1.8.23 - 2012-08-15
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.slider.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
function(a) {
var c = 5;
a.widget("ui.slider", a.ui.mouse, {
widgetEventPrefix:"slide",
options:{
animate:!1,
distance:0,
max:100,
min:0,
orientation:"horizontal",
range:!1,
step:1,
value:0,
values:null
},
_create:function() {
var b = this, d = this.options, e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), f = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>", g = d.values && d.values.length || 1, h = [];
this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, 
this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all" + (d.disabled ? " ui-slider-disabled ui-disabled" :"")), 
this.range = a([]), d.range && (d.range === !0 && (d.values || (d.values = [ this._valueMin(), this._valueMin() ]), 
d.values.length && 2 !== d.values.length && (d.values = [ d.values[0], d.values[0] ])), 
this.range = a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + ("min" === d.range || "max" === d.range ? " ui-slider-range-" + d.range :"")));
for (var i = e.length; g > i; i += 1) h.push(f);
this.handles = e.add(a(h.join("")).appendTo(b.element)), this.handle = this.handles.eq(0), 
this.handles.add(this.range).filter("a").click(function(a) {
a.preventDefault();
}).hover(function() {
d.disabled || a(this).addClass("ui-state-hover");
}, function() {
a(this).removeClass("ui-state-hover");
}).focus(function() {
d.disabled ? a(this).blur() :(a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), 
a(this).addClass("ui-state-focus"));
}).blur(function() {
a(this).removeClass("ui-state-focus");
}), this.handles.each(function(b) {
a(this).data("index.ui-slider-handle", b);
}), this.handles.keydown(function(d) {
var f, g, h, i, e = a(this).data("index.ui-slider-handle");
if (!b.options.disabled) {
switch (d.keyCode) {
case a.ui.keyCode.HOME:
case a.ui.keyCode.END:
case a.ui.keyCode.PAGE_UP:
case a.ui.keyCode.PAGE_DOWN:
case a.ui.keyCode.UP:
case a.ui.keyCode.RIGHT:
case a.ui.keyCode.DOWN:
case a.ui.keyCode.LEFT:
if (d.preventDefault(), !b._keySliding && (b._keySliding = !0, a(this).addClass("ui-state-active"), 
f = b._start(d, e), f === !1)) return;
}
switch (i = b.options.step, g = h = b.options.values && b.options.values.length ? b.values(e) :b.value(), 
d.keyCode) {
case a.ui.keyCode.HOME:
h = b._valueMin();
break;

case a.ui.keyCode.END:
h = b._valueMax();
break;

case a.ui.keyCode.PAGE_UP:
h = b._trimAlignValue(g + (b._valueMax() - b._valueMin()) / c);
break;

case a.ui.keyCode.PAGE_DOWN:
h = b._trimAlignValue(g - (b._valueMax() - b._valueMin()) / c);
break;

case a.ui.keyCode.UP:
case a.ui.keyCode.RIGHT:
if (g === b._valueMax()) return;
h = b._trimAlignValue(g + i);
break;

case a.ui.keyCode.DOWN:
case a.ui.keyCode.LEFT:
if (g === b._valueMin()) return;
h = b._trimAlignValue(g - i);
}
b._slide(d, e, h);
}
}).keyup(function(c) {
var d = a(this).data("index.ui-slider-handle");
b._keySliding && (b._keySliding = !1, b._stop(c, d), b._change(c, d), a(this).removeClass("ui-state-active"));
}), this._refreshValue(), this._animateOff = !1;
},
destroy:function() {
return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), 
this._mouseDestroy(), this;
},
_mouseCapture:function(b) {
var d, e, f, g, h, i, j, k, l, c = this.options;
return c.disabled ? !1 :(this.elementSize = {
width:this.element.outerWidth(),
height:this.element.outerHeight()
}, this.elementOffset = this.element.offset(), d = {
x:b.pageX,
y:b.pageY
}, e = this._normValueFromMouse(d), f = this._valueMax() - this._valueMin() + 1, 
h = this, this.handles.each(function(b) {
var c = Math.abs(e - h.values(b));
f > c && (f = c, g = a(this), i = b);
}), c.range === !0 && this.values(1) === c.min && (i += 1, g = a(this.handles[i])), 
j = this._start(b, i), j === !1 ? !1 :(this._mouseSliding = !0, h._handleIndex = i, 
g.addClass("ui-state-active").focus(), k = g.offset(), l = !a(b.target).parents().andSelf().is(".ui-slider-handle"), 
this._clickOffset = l ? {
left:0,
top:0
} :{
left:b.pageX - k.left - g.width() / 2,
top:b.pageY - k.top - g.height() / 2 - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)
}, this.handles.hasClass("ui-state-hover") || this._slide(b, i, e), this._animateOff = !0, 
!0));
},
_mouseStart:function() {
return !0;
},
_mouseDrag:function(a) {
var b = {
x:a.pageX,
y:a.pageY
}, c = this._normValueFromMouse(b);
return this._slide(a, this._handleIndex, c), !1;
},
_mouseStop:function(a) {
return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), 
this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, 
this._animateOff = !1, !1;
},
_detectOrientation:function() {
this.orientation = "vertical" === this.options.orientation ? "vertical" :"horizontal";
},
_normValueFromMouse:function(a) {
var b, c, d, e, f;
return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left :0)) :(b = this.elementSize.height, 
c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top :0)), 
d = c / b, d > 1 && (d = 1), 0 > d && (d = 0), "vertical" === this.orientation && (d = 1 - d), 
e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f);
},
_start:function(a, b) {
var c = {
handle:this.handles[b],
value:this.value()
};
return this.options.values && this.options.values.length && (c.value = this.values(b), 
c.values = this.values()), this._trigger("start", a, c);
},
_slide:function(a, b, c) {
var d, e, f;
this.options.values && this.options.values.length ? (d = this.values(b ? 0 :1), 
2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && d > c) && (c = d), 
c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
handle:this.handles[b],
value:c,
values:e
}), d = this.values(b ? 0 :1), f !== !1 && this.values(b, c, !0))) :c !== this.value() && (f = this._trigger("slide", a, {
handle:this.handles[b],
value:c
}), f !== !1 && this.value(c));
},
_stop:function(a, b) {
var c = {
handle:this.handles[b],
value:this.value()
};
this.options.values && this.options.values.length && (c.value = this.values(b), 
c.values = this.values()), this._trigger("stop", a, c);
},
_change:function(a, b) {
if (!this._keySliding && !this._mouseSliding) {
var c = {
handle:this.handles[b],
value:this.value()
};
this.options.values && this.options.values.length && (c.value = this.values(b), 
c.values = this.values()), this._trigger("change", a, c);
}
},
value:function(a) {
return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), 
this._change(null, 0), void 0) :this._value();
},
values:function(b, c) {
var d, e, f;
if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), 
this._refreshValue(), this._change(null, b), void 0;
if (!arguments.length) return this._values();
if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) :this.value();
for (d = this.options.values, e = arguments[0], f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]), 
this._change(null, f);
this._refreshValue();
},
_setOption:function(b, c) {
var d, e = 0;
switch (a.isArray(this.options.values) && (e = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments), 
b) {
case "disabled":
c ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), 
this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) :(this.handles.propAttr("disabled", !1), 
this.element.removeClass("ui-disabled"));
break;

case "orientation":
this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), 
this._refreshValue();
break;

case "value":
this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
break;

case "values":
for (this._animateOff = !0, this._refreshValue(), d = 0; e > d; d += 1) this._change(null, d);
this._animateOff = !1;
}
},
_value:function() {
var a = this.options.value;
return a = this._trimAlignValue(a);
},
_values:function(a) {
var b, c, d;
if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b);
for (c = this.options.values.slice(), d = 0; d < c.length; d += 1) c[d] = this._trimAlignValue(c[d]);
return c;
},
_trimAlignValue:function(a) {
if (a <= this._valueMin()) return this._valueMin();
if (a >= this._valueMax()) return this._valueMax();
var b = this.options.step > 0 ? this.options.step :1, c = (a - this._valueMin()) % b, d = a - c;
return 2 * Math.abs(c) >= b && (d += c > 0 ? b :-b), parseFloat(d.toFixed(5));
},
_valueMin:function() {
return this.options.min;
},
_valueMax:function() {
return this.options.max;
},
_refreshValue:function() {
var f, h, i, j, k, b = this.options.range, c = this.options, d = this, e = this._animateOff ? !1 :c.animate, g = {};
this.options.values && this.options.values.length ? this.handles.each(function(b) {
f = (d.values(b) - d._valueMin()) / (d._valueMax() - d._valueMin()) * 100, g["horizontal" === d.orientation ? "left" :"bottom"] = f + "%", 
a(this).stop(1, 1)[e ? "animate" :"css"](g, c.animate), d.options.range === !0 && ("horizontal" === d.orientation ? (0 === b && d.range.stop(1, 1)[e ? "animate" :"css"]({
left:f + "%"
}, c.animate), 1 === b && d.range[e ? "animate" :"css"]({
width:f - h + "%"
}, {
queue:!1,
duration:c.animate
})) :(0 === b && d.range.stop(1, 1)[e ? "animate" :"css"]({
bottom:f + "%"
}, c.animate), 1 === b && d.range[e ? "animate" :"css"]({
height:f - h + "%"
}, {
queue:!1,
duration:c.animate
}))), h = f;
}) :(i = this.value(), j = this._valueMin(), k = this._valueMax(), f = k !== j ? (i - j) / (k - j) * 100 :0, 
g["horizontal" === d.orientation ? "left" :"bottom"] = f + "%", this.handle.stop(1, 1)[e ? "animate" :"css"](g, c.animate), 
"min" === b && "horizontal" === this.orientation && this.range.stop(1, 1)[e ? "animate" :"css"]({
width:f + "%"
}, c.animate), "max" === b && "horizontal" === this.orientation && this.range[e ? "animate" :"css"]({
width:100 - f + "%"
}, {
queue:!1,
duration:c.animate
}), "min" === b && "vertical" === this.orientation && this.range.stop(1, 1)[e ? "animate" :"css"]({
height:f + "%"
}, c.animate), "max" === b && "vertical" === this.orientation && this.range[e ? "animate" :"css"]({
height:100 - f + "%"
}, {
queue:!1,
duration:c.animate
}));
}
}), a.extend(a.ui.slider, {
version:"1.8.23"
});
}(jQuery);