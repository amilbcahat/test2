!function($) {
var pluginName = "countdown", Y = 0, O = 1, W = 2, D = 3, H = 4, M = 5, S = 6;
$.JQPlugin.createPlugin({
name:pluginName,
defaultOptions:{
until:null,
since:null,
timezone:null,
serverSync:null,
format:"dHMS",
layout:"",
compact:!1,
padZeroes:!1,
significant:0,
description:"",
expiryUrl:"",
expiryText:"",
alwaysExpire:!1,
onExpiry:null,
onTick:null,
tickInterval:1
},
regionalOptions:{
"":{
labels:[ "Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds" ],
labels1:[ "Year", "Month", "Week", "Day", "Hour", "Minute", "Second" ],
compactLabels:[ "y", "m", "w", "d" ],
whichLabels:null,
digits:[ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ],
timeSeparator:":",
isRTL:!1
}
},
_getters:[ "getTimes" ],
_rtlClass:pluginName + "-rtl",
_sectionClass:pluginName + "-section",
_amountClass:pluginName + "-amount",
_periodClass:pluginName + "-period",
_rowClass:pluginName + "-row",
_holdingClass:pluginName + "-holding",
_showClass:pluginName + "-show",
_descrClass:pluginName + "-descr",
_timerElems:[],
_init:function() {
function timerCallBack(timestamp) {
var drawStart = 1e12 > timestamp ? perfAvail ? performance.now() + performance.timing.navigationStart :now() :timestamp || now();
drawStart - animationStartTime >= 1e3 && (self._updateElems(), animationStartTime = drawStart), 
requestAnimationFrame(timerCallBack);
}
var self = this;
this._super(), this._serverSyncs = [];
var now = "function" == typeof Date.now ? Date.now :function() {
return new Date().getTime();
}, perfAvail = window.performance && "function" == typeof window.performance.now, requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null, animationStartTime = 0;
!requestAnimationFrame || $.noRequestAnimationFrame ? ($.noRequestAnimationFrame = null, 
setInterval(function() {
self._updateElems();
}, 980)) :(animationStartTime = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || now(), 
requestAnimationFrame(timerCallBack));
},
UTCDate:function(tz, year, month, day, hours, mins, secs, ms) {
"object" == typeof year && year.constructor == Date && (ms = year.getMilliseconds(), 
secs = year.getSeconds(), mins = year.getMinutes(), hours = year.getHours(), day = year.getDate(), 
month = year.getMonth(), year = year.getFullYear());
var d = new Date();
return d.setUTCFullYear(year), d.setUTCDate(1), d.setUTCMonth(month || 0), d.setUTCDate(day || 1), 
d.setUTCHours(hours || 0), d.setUTCMinutes((mins || 0) - (Math.abs(tz) < 30 ? 60 * tz :tz)), 
d.setUTCSeconds(secs || 0), d.setUTCMilliseconds(ms || 0), d;
},
periodsToSeconds:function(periods) {
return 31557600 * periods[0] + 2629800 * periods[1] + 604800 * periods[2] + 86400 * periods[3] + 3600 * periods[4] + 60 * periods[5] + periods[6];
},
_instSettings:function() {
return {
_periods:[ 0, 0, 0, 0, 0, 0, 0 ]
};
},
_addElem:function(elem) {
this._hasElem(elem) || this._timerElems.push(elem);
},
_hasElem:function(elem) {
return $.inArray(elem, this._timerElems) > -1;
},
_removeElem:function(elem) {
this._timerElems = $.map(this._timerElems, function(value) {
return value == elem ? null :value;
});
},
_updateElems:function() {
for (var i = this._timerElems.length - 1; i >= 0; i--) this._updateCountdown(this._timerElems[i]);
},
_optionsChanged:function(elem, inst, options) {
options.layout && (options.layout = options.layout.replace(/&lt;/g, "<").replace(/&gt;/g, ">")), 
this._resetExtraLabels(inst.options, options);
var timezoneChanged = inst.options.timezone != options.timezone;
$.extend(inst.options, options), this._adjustSettings(elem, inst, null != options.until || null != options.since || timezoneChanged);
var now = new Date();
(inst._since && inst._since < now || inst._until && inst._until > now) && this._addElem(elem[0]), 
this._updateCountdown(elem, inst);
},
_updateCountdown:function(elem, inst) {
if (elem = elem.jquery ? elem :$(elem), inst = inst || elem.data(this.name)) {
if (elem.html(this._generateHTML(inst)).toggleClass(this._rtlClass, inst.options.isRTL), 
$.isFunction(inst.options.onTick)) {
var periods = "lap" != inst._hold ? inst._periods :this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
(1 == inst.options.tickInterval || this.periodsToSeconds(periods) % inst.options.tickInterval == 0) && inst.options.onTick.apply(elem[0], [ periods ]);
}
var expired = "pause" != inst._hold && (inst._since ? inst._now.getTime() < inst._since.getTime() :inst._now.getTime() >= inst._until.getTime());
if (expired && !inst._expiring) {
if (inst._expiring = !0, this._hasElem(elem[0]) || inst.options.alwaysExpire) {
if (this._removeElem(elem[0]), $.isFunction(inst.options.onExpiry) && inst.options.onExpiry.apply(elem[0], []), 
inst.options.expiryText) {
var layout = inst.options.layout;
inst.options.layout = inst.options.expiryText, this._updateCountdown(elem[0], inst), 
inst.options.layout = layout;
}
inst.options.expiryUrl && (window.location = inst.options.expiryUrl);
}
inst._expiring = !1;
} else "pause" == inst._hold && this._removeElem(elem[0]);
}
},
_resetExtraLabels:function(base, options) {
var changingLabels = !1;
for (var n in options) if ("whichLabels" != n && n.match(/[Ll]abels/)) {
changingLabels = !0;
break;
}
if (changingLabels) for (var n in base) n.match(/[Ll]abels[02-9]|compactLabels1/) && (base[n] = null);
},
_adjustSettings:function(elem, inst, recalc) {
for (var now, serverOffset = 0, serverEntry = null, i = 0; i < this._serverSyncs.length; i++) if (this._serverSyncs[i][0] == inst.options.serverSync) {
serverEntry = this._serverSyncs[i][1];
break;
}
if (null != serverEntry) serverOffset = inst.options.serverSync ? serverEntry :0, 
now = new Date(); else {
var serverResult = $.isFunction(inst.options.serverSync) ? inst.options.serverSync.apply(elem[0], []) :null;
now = new Date(), serverOffset = serverResult ? now.getTime() - serverResult.getTime() :0, 
this._serverSyncs.push([ inst.options.serverSync, serverOffset ]);
}
var timezone = inst.options.timezone;
timezone = null == timezone ? -now.getTimezoneOffset() :timezone, (recalc || !recalc && null == inst._until && null == inst._since) && (inst._since = inst.options.since, 
null != inst._since && (inst._since = this.UTCDate(timezone, this._determineTime(inst._since, null)), 
inst._since && serverOffset && inst._since.setMilliseconds(inst._since.getMilliseconds() + serverOffset)), 
inst._until = this.UTCDate(timezone, this._determineTime(inst.options.until, now)), 
serverOffset && inst._until.setMilliseconds(inst._until.getMilliseconds() + serverOffset)), 
inst._show = this._determineShow(inst);
},
_preDestroy:function(elem) {
this._removeElem(elem[0]), elem.empty();
},
pause:function(elem) {
this._hold(elem, "pause");
},
lap:function(elem) {
this._hold(elem, "lap");
},
resume:function(elem) {
this._hold(elem, null);
},
toggle:function(elem) {
var inst = $.data(elem, this.name) || {};
this[inst._hold ? "resume" :"pause"](elem);
},
toggleLap:function(elem) {
var inst = $.data(elem, this.name) || {};
this[inst._hold ? "resume" :"lap"](elem);
},
_hold:function(elem, hold) {
var inst = $.data(elem, this.name);
if (inst) {
if ("pause" == inst._hold && !hold) {
inst._periods = inst._savePeriods;
var sign = inst._since ? "-" :"+";
inst[inst._since ? "_since" :"_until"] = this._determineTime(sign + inst._periods[0] + "y" + sign + inst._periods[1] + "o" + sign + inst._periods[2] + "w" + sign + inst._periods[3] + "d" + sign + inst._periods[4] + "h" + sign + inst._periods[5] + "m" + sign + inst._periods[6] + "s"), 
this._addElem(elem);
}
inst._hold = hold, inst._savePeriods = "pause" == hold ? inst._periods :null, $.data(elem, this.name, inst), 
this._updateCountdown(elem, inst);
}
},
getTimes:function(elem) {
var inst = $.data(elem, this.name);
return inst ? "pause" == inst._hold ? inst._savePeriods :inst._hold ? this._calculatePeriods(inst, inst._show, inst.options.significant, new Date()) :inst._periods :null;
},
_determineTime:function(setting, defaultTime) {
var self = this, offsetNumeric = function(offset) {
var time = new Date();
return time.setTime(time.getTime() + 1e3 * offset), time;
}, offsetString = function(offset) {
offset = offset.toLowerCase();
for (var time = new Date(), year = time.getFullYear(), month = time.getMonth(), day = time.getDate(), hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds(), pattern = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, matches = pattern.exec(offset); matches; ) {
switch (matches[2] || "s") {
case "s":
second += parseInt(matches[1], 10);
break;

case "m":
minute += parseInt(matches[1], 10);
break;

case "h":
hour += parseInt(matches[1], 10);
break;

case "d":
day += parseInt(matches[1], 10);
break;

case "w":
day += 7 * parseInt(matches[1], 10);
break;

case "o":
month += parseInt(matches[1], 10), day = Math.min(day, self._getDaysInMonth(year, month));
break;

case "y":
year += parseInt(matches[1], 10), day = Math.min(day, self._getDaysInMonth(year, month));
}
matches = pattern.exec(offset);
}
return new Date(year, month, day, hour, minute, second, 0);
}, time = null == setting ? defaultTime :"string" == typeof setting ? offsetString(setting) :"number" == typeof setting ? offsetNumeric(setting) :setting;
return time && time.setMilliseconds(0), time;
},
_getDaysInMonth:function(year, month) {
return 32 - new Date(year, month, 32).getDate();
},
_normalLabels:function(num) {
return num;
},
_generateHTML:function(inst) {
var self = this;
inst._periods = inst._hold ? inst._periods :this._calculatePeriods(inst, inst._show, inst.options.significant, new Date());
for (var shownNonZero = !1, showCount = 0, sigCount = inst.options.significant, show = $.extend({}, inst._show), period = Y; S >= period; period++) shownNonZero |= "?" == inst._show[period] && inst._periods[period] > 0, 
show[period] = "?" != inst._show[period] || shownNonZero ? inst._show[period] :null, 
showCount += show[period] ? 1 :0, sigCount -= inst._periods[period] > 0 ? 1 :0;
for (var showSignificant = [ !1, !1, !1, !1, !1, !1, !1 ], period = S; period >= Y; period--) inst._show[period] && (inst._periods[period] ? showSignificant[period] = !0 :(showSignificant[period] = sigCount > 0, 
sigCount--));
var labels = inst.options.compact ? inst.options.compactLabels :inst.options.labels, whichLabels = inst.options.whichLabels || this._normalLabels, showCompact = function(period) {
var labelsNum = inst.options["compactLabels" + whichLabels(inst._periods[period])];
return show[period] ? self._translateDigits(inst, inst._periods[period]) + (labelsNum ? labelsNum[period] :labels[period]) + " " :"";
}, minDigits = inst.options.padZeroes ? 2 :1, showFull = function(period) {
var labelsNum = inst.options["labels" + whichLabels(inst._periods[period])];
return !inst.options.significant && show[period] || inst.options.significant && showSignificant[period] ? '<span class="' + self._sectionClass + '"><span class="' + self._amountClass + '">' + self._minDigits(inst, inst._periods[period], minDigits) + '</span><span class="' + self._periodClass + '">' + (labelsNum ? labelsNum[period] :labels[period]) + "</span></span>" :"";
};
return inst.options.layout ? this._buildLayout(inst, show, inst.options.layout, inst.options.compact, inst.options.significant, showSignificant) :(inst.options.compact ? '<span class="' + this._rowClass + " " + this._amountClass + (inst._hold ? " " + this._holdingClass :"") + '">' + showCompact(Y) + showCompact(O) + showCompact(W) + showCompact(D) + (show[H] ? this._minDigits(inst, inst._periods[H], 2) :"") + (show[M] ? (show[H] ? inst.options.timeSeparator :"") + this._minDigits(inst, inst._periods[M], 2) :"") + (show[S] ? (show[H] || show[M] ? inst.options.timeSeparator :"") + this._minDigits(inst, inst._periods[S], 2) :"") :'<span class="' + this._rowClass + " " + this._showClass + (inst.options.significant || showCount) + (inst._hold ? " " + this._holdingClass :"") + '">' + showFull(Y) + showFull(O) + showFull(W) + showFull(D) + showFull(H) + showFull(M) + showFull(S)) + "</span>" + (inst.options.description ? '<span class="' + this._rowClass + " " + this._descrClass + '">' + inst.options.description + "</span>" :"");
},
_buildLayout:function(inst, show, layout, compact, significant, showSignificant) {
for (var labels = inst.options[compact ? "compactLabels" :"labels"], whichLabels = inst.options.whichLabels || this._normalLabels, labelFor = function(index) {
return (inst.options[(compact ? "compactLabels" :"labels") + whichLabels(inst._periods[index])] || labels)[index];
}, digit = function(value, position) {
return inst.options.digits[Math.floor(value / position) % 10];
}, subs = {
desc:inst.options.description,
sep:inst.options.timeSeparator,
yl:labelFor(Y),
yn:this._minDigits(inst, inst._periods[Y], 1),
ynn:this._minDigits(inst, inst._periods[Y], 2),
ynnn:this._minDigits(inst, inst._periods[Y], 3),
y1:digit(inst._periods[Y], 1),
y10:digit(inst._periods[Y], 10),
y100:digit(inst._periods[Y], 100),
y1000:digit(inst._periods[Y], 1e3),
ol:labelFor(O),
on:this._minDigits(inst, inst._periods[O], 1),
onn:this._minDigits(inst, inst._periods[O], 2),
onnn:this._minDigits(inst, inst._periods[O], 3),
o1:digit(inst._periods[O], 1),
o10:digit(inst._periods[O], 10),
o100:digit(inst._periods[O], 100),
o1000:digit(inst._periods[O], 1e3),
wl:labelFor(W),
wn:this._minDigits(inst, inst._periods[W], 1),
wnn:this._minDigits(inst, inst._periods[W], 2),
wnnn:this._minDigits(inst, inst._periods[W], 3),
w1:digit(inst._periods[W], 1),
w10:digit(inst._periods[W], 10),
w100:digit(inst._periods[W], 100),
w1000:digit(inst._periods[W], 1e3),
dl:labelFor(D),
dn:this._minDigits(inst, inst._periods[D], 1),
dnn:this._minDigits(inst, inst._periods[D], 2),
dnnn:this._minDigits(inst, inst._periods[D], 3),
d1:digit(inst._periods[D], 1),
d10:digit(inst._periods[D], 10),
d100:digit(inst._periods[D], 100),
d1000:digit(inst._periods[D], 1e3),
hl:labelFor(H),
hn:this._minDigits(inst, inst._periods[H], 1),
hnn:this._minDigits(inst, inst._periods[H], 2),
hnnn:this._minDigits(inst, inst._periods[H], 3),
h1:digit(inst._periods[H], 1),
h10:digit(inst._periods[H], 10),
h100:digit(inst._periods[H], 100),
h1000:digit(inst._periods[H], 1e3),
ml:labelFor(M),
mn:this._minDigits(inst, inst._periods[M], 1),
mnn:this._minDigits(inst, inst._periods[M], 2),
mnnn:this._minDigits(inst, inst._periods[M], 3),
m1:digit(inst._periods[M], 1),
m10:digit(inst._periods[M], 10),
m100:digit(inst._periods[M], 100),
m1000:digit(inst._periods[M], 1e3),
sl:labelFor(S),
sn:this._minDigits(inst, inst._periods[S], 1),
snn:this._minDigits(inst, inst._periods[S], 2),
snnn:this._minDigits(inst, inst._periods[S], 3),
s1:digit(inst._periods[S], 1),
s10:digit(inst._periods[S], 10),
s100:digit(inst._periods[S], 100),
s1000:digit(inst._periods[S], 1e3)
}, html = layout, i = Y; S >= i; i++) {
var period = "yowdhms".charAt(i), re = new RegExp("\\{" + period + "<\\}([\\s\\S]*)\\{" + period + ">\\}", "g");
html = html.replace(re, !significant && show[i] || significant && showSignificant[i] ? "$1" :"");
}
return $.each(subs, function(n, v) {
var re = new RegExp("\\{" + n + "\\}", "g");
html = html.replace(re, v);
}), html;
},
_minDigits:function(inst, value, len) {
return value = "" + value, value.length >= len ? this._translateDigits(inst, value) :(value = "0000000000" + value, 
this._translateDigits(inst, value.substr(value.length - len)));
},
_translateDigits:function(inst, value) {
return ("" + value).replace(/[0-9]/g, function(digit) {
return inst.options.digits[digit];
});
},
_determineShow:function(inst) {
var format = inst.options.format, show = [];
return show[Y] = format.match("y") ? "?" :format.match("Y") ? "!" :null, show[O] = format.match("o") ? "?" :format.match("O") ? "!" :null, 
show[W] = format.match("w") ? "?" :format.match("W") ? "!" :null, show[D] = format.match("d") ? "?" :format.match("D") ? "!" :null, 
show[H] = format.match("h") ? "?" :format.match("H") ? "!" :null, show[M] = format.match("m") ? "?" :format.match("M") ? "!" :null, 
show[S] = format.match("s") ? "?" :format.match("S") ? "!" :null, show;
},
_calculatePeriods:function(inst, show, significant, now) {
inst._now = now, inst._now.setMilliseconds(0);
var until = new Date(inst._now.getTime());
inst._since ? now.getTime() < inst._since.getTime() ? inst._now = now = until :now = inst._since :(until.setTime(inst._until.getTime()), 
now.getTime() > inst._until.getTime() && (inst._now = now = until));
var periods = [ 0, 0, 0, 0, 0, 0, 0 ];
if (show[Y] || show[O]) {
var lastNow = this._getDaysInMonth(now.getFullYear(), now.getMonth()), lastUntil = this._getDaysInMonth(until.getFullYear(), until.getMonth()), sameDay = until.getDate() == now.getDate() || until.getDate() >= Math.min(lastNow, lastUntil) && now.getDate() >= Math.min(lastNow, lastUntil), getSecs = function(date) {
return 60 * (60 * date.getHours() + date.getMinutes()) + date.getSeconds();
}, months = Math.max(0, 12 * (until.getFullYear() - now.getFullYear()) + until.getMonth() - now.getMonth() + (until.getDate() < now.getDate() && !sameDay || sameDay && getSecs(until) < getSecs(now) ? -1 :0));
periods[Y] = show[Y] ? Math.floor(months / 12) :0, periods[O] = show[O] ? months - 12 * periods[Y] :0, 
now = new Date(now.getTime());
var wasLastDay = now.getDate() == lastNow, lastDay = this._getDaysInMonth(now.getFullYear() + periods[Y], now.getMonth() + periods[O]);
now.getDate() > lastDay && now.setDate(lastDay), now.setFullYear(now.getFullYear() + periods[Y]), 
now.setMonth(now.getMonth() + periods[O]), wasLastDay && now.setDate(lastDay);
}
var diff = Math.floor((until.getTime() - now.getTime()) / 1e3), extractPeriod = function(period, numSecs) {
periods[period] = show[period] ? Math.floor(diff / numSecs) :0, diff -= periods[period] * numSecs;
};
if (extractPeriod(W, 604800), extractPeriod(D, 86400), extractPeriod(H, 3600), extractPeriod(M, 60), 
extractPeriod(S, 1), diff > 0 && !inst._since) for (var multiplier = [ 1, 12, 4.3482, 7, 24, 60, 60 ], lastShown = S, max = 1, period = S; period >= Y; period--) show[period] && (periods[lastShown] >= max && (periods[lastShown] = 0, 
diff = 1), diff > 0 && (periods[period]++, diff = 0, lastShown = period, max = 1)), 
max *= multiplier[period];
if (significant) for (var period = Y; S >= period; period++) significant && periods[period] ? significant-- :significant || (periods[period] = 0);
return periods;
}
});
}(jQuery);