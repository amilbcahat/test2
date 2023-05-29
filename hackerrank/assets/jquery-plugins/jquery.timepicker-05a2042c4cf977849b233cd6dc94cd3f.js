!function(factory) {
"function" == typeof define && define.amd ? define([ "jquery" ], factory) :factory(jQuery);
}(function($) {
function _parseSettings(settings) {
if (settings.minTime && (settings.minTime = _time2int(settings.minTime)), settings.maxTime && (settings.maxTime = _time2int(settings.maxTime)), 
settings.durationTime && "function" != typeof settings.durationTime && (settings.durationTime = _time2int(settings.durationTime)), 
settings.disableTimeRanges.length > 0) {
for (var i in settings.disableTimeRanges) settings.disableTimeRanges[i] = [ _time2int(settings.disableTimeRanges[i][0]), _time2int(settings.disableTimeRanges[i][1]) ];
settings.disableTimeRanges = settings.disableTimeRanges.sort(function(a, b) {
return a[0] - b[0];
});
}
return settings;
}
function _render(self) {
var settings = self.data("timepicker-settings"), list = self.data("timepicker-list");
list && list.length && (list.remove(), self.data("timepicker-list", !1)), list = $("<ul />", {
"class":"ui-timepicker-list"
});
var wrapped_list = $("<div />", {
"class":"ui-timepicker-wrapper",
tabindex:-1
});
wrapped_list.css({
display:"none",
position:"absolute"
}).append(list), settings.className && wrapped_list.addClass(settings.className), 
null === settings.minTime && null === settings.durationTime || !settings.showDuration || wrapped_list.addClass("ui-timepicker-with-duration");
var durStart = settings.minTime;
"function" == typeof settings.durationTime ? durStart = _time2int(settings.durationTime()) :null !== settings.durationTime && (durStart = settings.durationTime);
var start = null !== settings.minTime ? settings.minTime :0, end = null !== settings.maxTime ? settings.maxTime :start + _ONE_DAY - 1;
start >= end && (end += _ONE_DAY);
for (var dr = settings.disableTimeRanges, drCur = 0, drLen = dr.length, i = start; end >= i; i += 60 * settings.step) {
var timeInt = i % _ONE_DAY, row = $("<li />");
if (row.data("time", timeInt), row.text(_int2time(timeInt, settings.timeFormat)), 
(null !== settings.minTime || null !== settings.durationTime) && settings.showDuration) {
var duration = $("<span />");
duration.addClass("ui-timepicker-duration"), duration.text(" (" + _int2duration(i - durStart) + ")"), 
row.append(duration);
}
drLen > drCur && (timeInt >= dr[drCur][1] && (drCur += 1), dr[drCur] && timeInt >= dr[drCur][0] && timeInt < dr[drCur][1] && row.addClass("ui-timepicker-disabled")), 
list.append(row);
}
wrapped_list.data("timepicker-input", self), self.data("timepicker-list", wrapped_list);
var appendTo = settings.appendTo;
"string" == typeof appendTo ? appendTo = $(appendTo) :"function" == typeof appendTo && (appendTo = appendTo(self)), 
appendTo.append(wrapped_list), _setSelected(self, list), list.on("click", "li", function() {
self.off("focus.timepicker"), self.on("focus.timepicker-ie-hack", function() {
self.off("focus.timepicker-ie-hack"), self.on("focus.timepicker", methods.show);
}), _hideKeyboard(self) || self[0].focus(), list.find("li").removeClass("ui-timepicker-selected"), 
$(this).addClass("ui-timepicker-selected"), _selectValue(self) && (self.trigger("hideTimepicker"), 
wrapped_list.hide());
});
}
function _generateBaseDate() {
return new Date(1970, 1, 1, 0, 0, 0);
}
function _attachCloseHandler(settings) {
"ontouchstart" in document ? $("body").on("touchstart.ui-timepicker", _closeHandler) :($("body").on("mousedown.ui-timepicker", _closeHandler), 
settings.closeOnWindowScroll && $(window).on("scroll.ui-timepicker", _closeHandler));
}
function _closeHandler(e) {
var target = $(e.target), input = target.closest(".ui-timepicker-input");
0 === input.length && 0 === target.closest(".ui-timepicker-wrapper").length && (methods.hide(), 
$("body").unbind(".ui-timepicker"), $(window).unbind(".ui-timepicker"));
}
function _hideKeyboard(self) {
var settings = self.data("timepicker-settings");
return (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && settings.disableTouchKeyboard;
}
function _findRow(self, list, value) {
if (!value && 0 !== value) return !1;
var settings = self.data("timepicker-settings"), out = !1, halfStep = 30 * settings.step;
return list.find("li").each(function(i, obj) {
var jObj = $(obj), offset = jObj.data("time") - value;
return Math.abs(offset) < halfStep || offset == halfStep ? (out = jObj, !1) :void 0;
}), out;
}
function _setSelected(self, list) {
list.find("li").removeClass("ui-timepicker-selected");
var timeValue = _time2int(_getTimeValue(self));
if (null !== timeValue) {
var selected = _findRow(self, list, timeValue);
if (selected) {
var topDelta = selected.offset().top - list.offset().top;
(topDelta + selected.outerHeight() > list.outerHeight() || 0 > topDelta) && list.scrollTop(list.scrollTop() + selected.position().top - selected.outerHeight()), 
selected.addClass("ui-timepicker-selected");
}
}
}
function _formatValue() {
if ("" !== this.value) {
var self = $(this), list = self.data("timepicker-list");
if (!list || !list.is(":visible")) {
var seconds = _time2int(this.value);
if (null === seconds) return self.trigger("timeFormatError"), void 0;
var settings = self.data("timepicker-settings"), rangeError = !1;
if (null !== settings.minTime && seconds < settings.minTime ? rangeError = !0 :null !== settings.maxTime && seconds > settings.maxTime && (rangeError = !0), 
$.each(settings.disableTimeRanges, function() {
return seconds >= this[0] && seconds < this[1] ? (rangeError = !0, !1) :void 0;
}), settings.forceRoundTime) {
var offset = seconds % (60 * settings.step);
offset >= 30 * settings.step ? seconds += 60 * settings.step - offset :seconds -= offset;
}
var prettyTime = _int2time(seconds, settings.timeFormat);
rangeError ? _setTimeValue(self, prettyTime, "error") && self.trigger("timeRangeError") :_setTimeValue(self, prettyTime);
}
}
}
function _getTimeValue(self) {
return self.is("input") ? self.val() :self.data("ui-timepicker-value");
}
function _setTimeValue(self, value, source) {
return self.data("ui-timepicker-value", value), self.is("input") && self.val(value), 
self.data("ui-timepicker-value") != value ? ("select" == source ? self.trigger("selectTime").trigger("changeTime").trigger("change") :"error" != source && self.trigger("changeTime"), 
!0) :(self.trigger("selectTime"), !1);
}
function _keydownhandler(e) {
var self = $(this), list = self.data("timepicker-list");
if (!list || !list.is(":visible")) {
if (40 != e.keyCode) return _screenInput(e, self);
_hideKeyboard(self) || self.focus();
}
switch (e.keyCode) {
case 13:
return _selectValue(self) && methods.hide.apply(this), e.preventDefault(), !1;

case 38:
var selected = list.find(".ui-timepicker-selected");
return selected.length ? selected.is(":first-child") || (selected.removeClass("ui-timepicker-selected"), 
selected.prev().addClass("ui-timepicker-selected"), selected.prev().position().top < selected.outerHeight() && list.scrollTop(list.scrollTop() - selected.outerHeight())) :(list.find("li").each(function(i, obj) {
return $(obj).position().top > 0 ? (selected = $(obj), !1) :void 0;
}), selected.addClass("ui-timepicker-selected")), !1;

case 40:
return selected = list.find(".ui-timepicker-selected"), 0 === selected.length ? (list.find("li").each(function(i, obj) {
return $(obj).position().top > 0 ? (selected = $(obj), !1) :void 0;
}), selected.addClass("ui-timepicker-selected")) :selected.is(":last-child") || (selected.removeClass("ui-timepicker-selected"), 
selected.next().addClass("ui-timepicker-selected"), selected.next().position().top + 2 * selected.outerHeight() > list.outerHeight() && list.scrollTop(list.scrollTop() + selected.outerHeight())), 
!1;

case 27:
list.find("li").removeClass("ui-timepicker-selected"), methods.hide();
break;

case 9:
methods.hide();
break;

default:
return _screenInput(e, self);
}
}
function _screenInput(e, self) {
return !self.data("timepicker-settings").disableTextInput || e.ctrlKey || e.altKey || e.metaKey || 2 != e.keyCode && e.keyCode < 46;
}
function _keyuphandler(e) {
var self = $(this), list = self.data("timepicker-list");
if (!list || !list.is(":visible")) return !0;
switch (e.keyCode) {
case 96:
case 97:
case 98:
case 99:
case 100:
case 101:
case 102:
case 103:
case 104:
case 105:
case 48:
case 49:
case 50:
case 51:
case 52:
case 53:
case 54:
case 55:
case 56:
case 57:
case 65:
case 77:
case 80:
case 186:
case 8:
case 46:
_setSelected(self, list);
break;

default:
return;
}
}
function _selectValue(self) {
var settings = self.data("timepicker-settings"), list = self.data("timepicker-list"), timeValue = null, cursor = list.find(".ui-timepicker-selected");
if (cursor.hasClass("ui-timepicker-disabled")) return !1;
if (cursor.length ? timeValue = cursor.data("time") :_getTimeValue(self) && (timeValue = _time2int(_getTimeValue(self)), 
_setSelected(self, list)), null !== timeValue) {
var timeString = _int2time(timeValue, settings.timeFormat);
_setTimeValue(self, timeString, "select");
}
return !0;
}
function _int2duration(seconds) {
var duration, minutes = Math.round(seconds / 60);
if (Math.abs(minutes) < 60) duration = [ minutes, _lang.mins ]; else if (60 == minutes) duration = [ "1", _lang.hr ]; else {
var hours = (minutes / 60).toFixed(1);
"." != _lang.decimal && (hours = hours.replace(".", _lang.decimal)), duration = [ hours, _lang.hrs ];
}
return duration.join(" ");
}
function _int2time(seconds, format) {
if (null !== seconds) {
for (var hour, code, time = new Date(_baseDate.valueOf() + 1e3 * seconds), output = "", i = 0; i < format.length; i++) switch (code = format.charAt(i)) {
case "a":
output += time.getHours() > 11 ? "pm" :"am";
break;

case "A":
output += time.getHours() > 11 ? "PM" :"AM";
break;

case "g":
hour = time.getHours() % 12, output += 0 === hour ? "12" :hour;
break;

case "G":
output += time.getHours();
break;

case "h":
hour = time.getHours() % 12, 0 !== hour && 10 > hour && (hour = "0" + hour), output += 0 === hour ? "12" :hour;
break;

case "H":
hour = time.getHours(), output += hour > 9 ? hour :"0" + hour;
break;

case "i":
var minutes = time.getMinutes();
output += minutes > 9 ? minutes :"0" + minutes;
break;

case "s":
seconds = time.getSeconds(), output += seconds > 9 ? seconds :"0" + seconds;
break;

default:
output += code;
}
return output;
}
}
function _time2int(timeString) {
if ("" === timeString) return null;
if (!timeString || timeString + 0 == timeString) return timeString;
"object" == typeof timeString && (timeString = timeString.getHours() + ":" + _pad2(timeString.getMinutes()) + ":" + _pad2(timeString.getSeconds())), 
timeString = timeString.toLowerCase();
{
var time;
new Date(0);
}
if (-1 === timeString.indexOf(":") ? (time = timeString.match(/^([0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/), 
time || (time = timeString.match(/^([0-2][0-9]):?([0-5][0-9])?:?([0-5][0-9])?\s*([pa]?)m?$/))) :time = timeString.match(/^(\d{1,2})(?::([0-5][0-9]))?(?::([0-5][0-9]))?\s*([pa]?)m?$/), 
!time) return null;
var hours, hour = parseInt(1 * time[1], 10);
hours = time[4] ? 12 == hour ? "p" == time[4] ? 12 :0 :hour + ("p" == time[4] ? 12 :0) :hour;
var minutes = 1 * time[2] || 0, seconds = 1 * time[3] || 0;
return 3600 * hours + 60 * minutes + seconds;
}
function _pad2(n) {
return ("0" + n).slice(-2);
}
var _baseDate = _generateBaseDate(), _ONE_DAY = 86400, _defaults = {
className:null,
minTime:null,
maxTime:null,
durationTime:null,
step:30,
showDuration:!1,
timeFormat:"g:ia",
scrollDefaultNow:!1,
scrollDefaultTime:!1,
selectOnBlur:!1,
disableTouchKeyboard:!0,
forceRoundTime:!1,
appendTo:"body",
disableTimeRanges:[],
closeOnWindowScroll:!1,
disableTextInput:!1
}, _lang = {
decimal:".",
mins:"mins",
hr:"hr",
hrs:"hrs"
}, methods = {
init:function(options) {
return this.each(function() {
var self = $(this);
if ("SELECT" == self[0].tagName) {
for (var attrs = {
type:"text",
value:self.val()
}, raw_attrs = self[0].attributes, i = 0; i < raw_attrs.length; i++) attrs[raw_attrs[i].nodeName] = raw_attrs[i].nodeValue;
var input = $("<input />", attrs);
self.replaceWith(input), self = input;
}
var settings = $.extend({}, _defaults);
options && (settings = $.extend(settings, options)), settings.lang && (_lang = $.extend(_lang, settings.lang)), 
settings = _parseSettings(settings), self.data("timepicker-settings", settings), 
self.prop("autocomplete", "off"), self.on("click.timepicker focus.timepicker", methods.show), 
self.on("change.timepicker", _formatValue), self.on("keydown.timepicker", _keydownhandler), 
self.on("keyup.timepicker", _keyuphandler), self.addClass("ui-timepicker-input"), 
_formatValue.call(self.get(0));
});
},
show:function() {
var self = $(this), settings = self.data("timepicker-settings");
_hideKeyboard(self) && self.blur();
var list = self.data("timepicker-list");
if (!self.prop("readonly") && (list && 0 !== list.length && "function" != typeof settings.durationTime || (_render(self), 
list = self.data("timepicker-list")), !list.is(":visible"))) {
methods.hide(), list.show(), self.offset().top + self.outerHeight(!0) + list.outerHeight() > $(window).height() + $(window).scrollTop() ? list.offset({
left:self.offset().left + parseInt(list.css("marginLeft").replace("px", ""), 10),
top:self.offset().top - list.outerHeight() + parseInt(list.css("marginTop").replace("px", ""), 10)
}) :list.offset({
left:self.offset().left + parseInt(list.css("marginLeft").replace("px", ""), 10),
top:self.offset().top + self.outerHeight() + parseInt(list.css("marginTop").replace("px", ""), 10)
});
var selected = list.find(".ui-timepicker-selected");
if (selected.length || (_getTimeValue(self) ? selected = _findRow(self, list, _time2int(_getTimeValue(self))) :settings.scrollDefaultNow ? selected = _findRow(self, list, _time2int(new Date())) :settings.scrollDefaultTime !== !1 && (selected = _findRow(self, list, _time2int(settings.scrollDefaultTime)))), 
selected && selected.length) {
var topOffset = list.scrollTop() + selected.position().top - selected.outerHeight();
list.scrollTop(topOffset);
} else list.scrollTop(0);
_attachCloseHandler(settings), self.trigger("showTimepicker");
}
},
hide:function() {
$(".ui-timepicker-wrapper:visible").each(function() {
var list = $(this), self = list.data("timepicker-input"), settings = self.data("timepicker-settings");
settings && settings.selectOnBlur && _selectValue(self), list.hide(), self.trigger("hideTimepicker");
});
},
option:function(key, value) {
var self = this, settings = self.data("timepicker-settings"), list = self.data("timepicker-list");
if ("object" == typeof key) settings = $.extend(settings, key); else if ("string" == typeof key && "undefined" != typeof value) settings[key] = value; else if ("string" == typeof key) return settings[key];
return settings = _parseSettings(settings), self.data("timepicker-settings", settings), 
list && (list.remove(), self.data("timepicker-list", !1)), self;
},
getSecondsFromMidnight:function() {
return _time2int(_getTimeValue(this));
},
getTime:function(relative_date) {
var self = this;
return relative_date || (relative_date = new Date()), relative_date.setHours(0, 0, 0, 0), 
new Date(relative_date.valueOf() + 1e3 * _time2int(_getTimeValue(self)));
},
setTime:function(value) {
var self = this, prettyTime = _int2time(_time2int(value), self.data("timepicker-settings").timeFormat);
_setTimeValue(self, prettyTime), self.data("timepicker-list") && _setSelected(self, self.data("timepicker-list"));
},
remove:function() {
var self = this;
self.hasClass("ui-timepicker-input") && (self.removeAttr("autocomplete", "off"), 
self.removeClass("ui-timepicker-input"), self.removeData("timepicker-settings"), 
self.off(".timepicker"), self.data("timepicker-list") && self.data("timepicker-list").remove(), 
self.removeData("timepicker-list"));
}
};
$.fn.timepicker = function(method) {
return methods[method] ? methods[method].apply(this, Array.prototype.slice.call(arguments, 1)) :"object" != typeof method && method ? ($.error("Method " + method + " does not exist on jQuery.timepicker"), 
void 0) :methods.init.apply(this, arguments);
};
});