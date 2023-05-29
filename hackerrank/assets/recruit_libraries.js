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
}), $element.find("input").on("change", function(e, skipOnChange) {
var $this = $(this), $element = $this.parent(), thisState = $this.is(":checked"), state = $element.is(".switch-off");
if (e.preventDefault(), $element.css("left", ""), state === thisState) {
if (thisState ? $element.removeClass("switch-off").addClass("switch-on") :$element.removeClass("switch-on").addClass("switch-off"), 
$element.data("animated") !== !1 && $element.addClass("switch-animate"), "boolean" == typeof skipOnChange && skipOnChange) return;
$element.parent().trigger("switch-change", {
el:$this,
value:thisState
});
}
}), $element.find("label").on("mousedown touchstart", function(e) {
var $this = $(this);
moving = !1, e.preventDefault(), e.stopImmediatePropagation(), $this.closest("div").removeClass("switch-animate"), 
$this.closest(".has-switch").is(".deactivate") ? $this.unbind("click") :($this.on("mousemove touchmove", function(e) {
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
}(jQuery), $(function() {
$(".switch").bootstrapSwitch();
}), function(undefined) {
function padToken(func, count) {
return function(a) {
return leftZeroFill(func.call(this, a), count);
};
}
function ordinalizeToken(func, period) {
return function(a) {
return this.lang().ordinal(func.call(this, a), period);
};
}
function Language() {}
function Moment(config) {
checkOverflow(config), extend(this, config);
}
function Duration(duration) {
var normalizedInput = normalizeObjectUnits(duration), years = normalizedInput.year || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
this._milliseconds = +milliseconds + 1e3 * seconds + 6e4 * minutes + 36e5 * hours, 
this._days = +days + 7 * weeks, this._months = +months + 12 * years, this._data = {}, 
this._bubble();
}
function extend(a, b) {
for (var i in b) b.hasOwnProperty(i) && (a[i] = b[i]);
return b.hasOwnProperty("toString") && (a.toString = b.toString), b.hasOwnProperty("valueOf") && (a.valueOf = b.valueOf), 
a;
}
function absRound(number) {
return 0 > number ? Math.ceil(number) :Math.floor(number);
}
function leftZeroFill(number, targetLength) {
for (var output = number + ""; output.length < targetLength; ) output = "0" + output;
return output;
}
function addOrSubtractDurationFromMoment(mom, duration, isAdding, ignoreUpdateOffset) {
var minutes, hours, milliseconds = duration._milliseconds, days = duration._days, months = duration._months;
milliseconds && mom._d.setTime(+mom._d + milliseconds * isAdding), (days || months) && (minutes = mom.minute(), 
hours = mom.hour()), days && mom.date(mom.date() + days * isAdding), months && mom.month(mom.month() + months * isAdding), 
milliseconds && !ignoreUpdateOffset && moment.updateOffset(mom), (days || months) && (mom.minute(minutes), 
mom.hour(hours));
}
function isArray(input) {
return "[object Array]" === Object.prototype.toString.call(input);
}
function isDate(input) {
return "[object Date]" === Object.prototype.toString.call(input) || input instanceof Date;
}
function compareArrays(array1, array2, dontConvert) {
var i, len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0;
for (i = 0; len > i; i++) (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) && diffs++;
return diffs + lengthDiff;
}
function normalizeUnits(units) {
if (units) {
var lowered = units.toLowerCase().replace(/(.)s$/, "$1");
units = unitAliases[units] || camelFunctions[lowered] || lowered;
}
return units;
}
function normalizeObjectUnits(inputObject) {
var normalizedProp, prop, normalizedInput = {};
for (prop in inputObject) inputObject.hasOwnProperty(prop) && (normalizedProp = normalizeUnits(prop), 
normalizedProp && (normalizedInput[normalizedProp] = inputObject[prop]));
return normalizedInput;
}
function makeList(field) {
var count, setter;
if (0 === field.indexOf("week")) count = 7, setter = "day"; else {
if (0 !== field.indexOf("month")) return;
count = 12, setter = "month";
}
moment[field] = function(format, index) {
var i, getter, method = moment.fn._lang[field], results = [];
if ("number" == typeof format && (index = format, format = undefined), getter = function(i) {
var m = moment().utc().set(setter, i);
return method.call(moment.fn._lang, m, format || "");
}, null != index) return getter(index);
for (i = 0; count > i; i++) results.push(getter(i));
return results;
};
}
function toInt(argumentForCoercion) {
var coercedNumber = +argumentForCoercion, value = 0;
return 0 !== coercedNumber && isFinite(coercedNumber) && (value = coercedNumber >= 0 ? Math.floor(coercedNumber) :Math.ceil(coercedNumber)), 
value;
}
function daysInMonth(year, month) {
return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}
function daysInYear(year) {
return isLeapYear(year) ? 366 :365;
}
function isLeapYear(year) {
return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function checkOverflow(m) {
var overflow;
m._a && -2 === m._pf.overflow && (overflow = m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :-1, 
m._pf._overflowDayOfYear && (YEAR > overflow || overflow > DATE) && (overflow = DATE), 
m._pf.overflow = overflow);
}
function initializeParsingFlags(config) {
config._pf = {
empty:!1,
unusedTokens:[],
unusedInput:[],
overflow:-2,
charsLeftOver:0,
nullInput:!1,
invalidMonth:null,
invalidFormat:!1,
userInvalidated:!1,
iso:!1
};
}
function isValid(m) {
return null == m._isValid && (m._isValid = !isNaN(m._d.getTime()) && m._pf.overflow < 0 && !m._pf.empty && !m._pf.invalidMonth && !m._pf.nullInput && !m._pf.invalidFormat && !m._pf.userInvalidated, 
m._strict && (m._isValid = m._isValid && 0 === m._pf.charsLeftOver && 0 === m._pf.unusedTokens.length)), 
m._isValid;
}
function normalizeLanguage(key) {
return key ? key.toLowerCase().replace("_", "-") :key;
}
function loadLang(key, values) {
return values.abbr = key, languages[key] || (languages[key] = new Language()), languages[key].set(values), 
languages[key];
}
function unloadLang(key) {
delete languages[key];
}
function getLangDefinition(key) {
var j, lang, next, split, i = 0, get = function(k) {
if (!languages[k] && hasModule) try {
require("./lang/" + k);
} catch (e) {}
return languages[k];
};
if (!key) return moment.fn._lang;
if (!isArray(key)) {
if (lang = get(key)) return lang;
key = [ key ];
}
for (;i < key.length; ) {
for (split = normalizeLanguage(key[i]).split("-"), j = split.length, next = normalizeLanguage(key[i + 1]), 
next = next ? next.split("-") :null; j > 0; ) {
if (lang = get(split.slice(0, j).join("-"))) return lang;
if (next && next.length >= j && compareArrays(split, next, !0) >= j - 1) break;
j--;
}
i++;
}
return moment.fn._lang;
}
function removeFormattingTokens(input) {
return input.match(/\[[\s\S]/) ? input.replace(/^\[|\]$/g, "") :input.replace(/\\/g, "");
}
function makeFormatFunction(format) {
var i, length, array = format.match(formattingTokens);
for (i = 0, length = array.length; length > i; i++) array[i] = formatTokenFunctions[array[i]] ? formatTokenFunctions[array[i]] :removeFormattingTokens(array[i]);
return function(mom) {
var output = "";
for (i = 0; length > i; i++) output += array[i] instanceof Function ? array[i].call(mom, format) :array[i];
return output;
};
}
function formatMoment(m, format) {
return m.isValid() ? (format = expandFormat(format, m.lang()), formatFunctions[format] || (formatFunctions[format] = makeFormatFunction(format)), 
formatFunctions[format](m)) :m.lang().invalidDate();
}
function expandFormat(format, lang) {
function replaceLongDateFormatTokens(input) {
return lang.longDateFormat(input) || input;
}
var i = 5;
for (localFormattingTokens.lastIndex = 0; i >= 0 && localFormattingTokens.test(format); ) format = format.replace(localFormattingTokens, replaceLongDateFormatTokens), 
localFormattingTokens.lastIndex = 0, i -= 1;
return format;
}
function getParseRegexForToken(token, config) {
var a, strict = config._strict;
switch (token) {
case "DDDD":
return parseTokenThreeDigits;

case "YYYY":
case "GGGG":
case "gggg":
return strict ? parseTokenFourDigits :parseTokenOneToFourDigits;

case "YYYYY":
case "GGGGG":
case "ggggg":
return strict ? parseTokenSixDigits :parseTokenOneToSixDigits;

case "S":
if (strict) return parseTokenOneDigit;

case "SS":
if (strict) return parseTokenTwoDigits;

case "SSS":
case "DDD":
return strict ? parseTokenThreeDigits :parseTokenOneToThreeDigits;

case "MMM":
case "MMMM":
case "dd":
case "ddd":
case "dddd":
return parseTokenWord;

case "a":
case "A":
return getLangDefinition(config._l)._meridiemParse;

case "X":
return parseTokenTimestampMs;

case "Z":
case "ZZ":
return parseTokenTimezone;

case "T":
return parseTokenT;

case "SSSS":
return parseTokenDigits;

case "MM":
case "DD":
case "YY":
case "GG":
case "gg":
case "HH":
case "hh":
case "mm":
case "ss":
case "ww":
case "WW":
return strict ? parseTokenTwoDigits :parseTokenOneOrTwoDigits;

case "M":
case "D":
case "d":
case "H":
case "h":
case "m":
case "s":
case "w":
case "W":
case "e":
case "E":
return strict ? parseTokenOneDigit :parseTokenOneOrTwoDigits;

default:
return a = new RegExp(regexpEscape(unescapeFormat(token.replace("\\", "")), "i"));
}
}
function timezoneMinutesFromString(string) {
var tzchunk = (parseTokenTimezone.exec(string) || [])[0], parts = (tzchunk + "").match(parseTimezoneChunker) || [ "-", 0, 0 ], minutes = +(60 * parts[1]) + toInt(parts[2]);
return "+" === parts[0] ? -minutes :minutes;
}
function addTimeToArrayFromToken(token, input, config) {
var a, datePartArray = config._a;
switch (token) {
case "M":
case "MM":
null != input && (datePartArray[MONTH] = toInt(input) - 1);
break;

case "MMM":
case "MMMM":
a = getLangDefinition(config._l).monthsParse(input), null != a ? datePartArray[MONTH] = a :config._pf.invalidMonth = input;
break;

case "D":
case "DD":
null != input && (datePartArray[DATE] = toInt(input));
break;

case "DDD":
case "DDDD":
null != input && (config._dayOfYear = toInt(input));
break;

case "YY":
datePartArray[YEAR] = toInt(input) + (toInt(input) > 68 ? 1900 :2e3);
break;

case "YYYY":
case "YYYYY":
datePartArray[YEAR] = toInt(input);
break;

case "a":
case "A":
config._isPm = getLangDefinition(config._l).isPM(input);
break;

case "H":
case "HH":
case "h":
case "hh":
datePartArray[HOUR] = toInt(input);
break;

case "m":
case "mm":
datePartArray[MINUTE] = toInt(input);
break;

case "s":
case "ss":
datePartArray[SECOND] = toInt(input);
break;

case "S":
case "SS":
case "SSS":
case "SSSS":
datePartArray[MILLISECOND] = toInt(1e3 * ("0." + input));
break;

case "X":
config._d = new Date(1e3 * parseFloat(input));
break;

case "Z":
case "ZZ":
config._useUTC = !0, config._tzm = timezoneMinutesFromString(input);
break;

case "w":
case "ww":
case "W":
case "WW":
case "d":
case "dd":
case "ddd":
case "dddd":
case "e":
case "E":
token = token.substr(0, 1);

case "gg":
case "gggg":
case "GG":
case "GGGG":
case "GGGGG":
token = token.substr(0, 2), input && (config._w = config._w || {}, config._w[token] = input);
}
}
function dateFromConfig(config) {
var i, date, currentDate, yearToUse, fixYear, w, temp, lang, weekday, week, input = [];
if (!config._d) {
for (currentDate = currentDateArray(config), config._w && null == config._a[DATE] && null == config._a[MONTH] && (fixYear = function(val) {
return val ? val.length < 3 ? parseInt(val, 10) > 68 ? "19" + val :"20" + val :val :null == config._a[YEAR] ? moment().weekYear() :config._a[YEAR];
}, w = config._w, null != w.GG || null != w.W || null != w.E ? temp = dayOfYearFromWeeks(fixYear(w.GG), w.W || 1, w.E, 4, 1) :(lang = getLangDefinition(config._l), 
weekday = null != w.d ? parseWeekday(w.d, lang) :null != w.e ? parseInt(w.e, 10) + lang._week.dow :0, 
week = parseInt(w.w, 10) || 1, null != w.d && weekday < lang._week.dow && week++, 
temp = dayOfYearFromWeeks(fixYear(w.gg), week, weekday, lang._week.doy, lang._week.dow)), 
config._a[YEAR] = temp.year, config._dayOfYear = temp.dayOfYear), config._dayOfYear && (yearToUse = null == config._a[YEAR] ? currentDate[YEAR] :config._a[YEAR], 
config._dayOfYear > daysInYear(yearToUse) && (config._pf._overflowDayOfYear = !0), 
date = makeUTCDate(yearToUse, 0, config._dayOfYear), config._a[MONTH] = date.getUTCMonth(), 
config._a[DATE] = date.getUTCDate()), i = 0; 3 > i && null == config._a[i]; ++i) config._a[i] = input[i] = currentDate[i];
for (;7 > i; i++) config._a[i] = input[i] = null == config._a[i] ? 2 === i ? 1 :0 :config._a[i];
input[HOUR] += toInt((config._tzm || 0) / 60), input[MINUTE] += toInt((config._tzm || 0) % 60), 
config._d = (config._useUTC ? makeUTCDate :makeDate).apply(null, input);
}
}
function dateFromObject(config) {
var normalizedInput;
config._d || (normalizedInput = normalizeObjectUnits(config._i), config._a = [ normalizedInput.year, normalizedInput.month, normalizedInput.day, normalizedInput.hour, normalizedInput.minute, normalizedInput.second, normalizedInput.millisecond ], 
dateFromConfig(config));
}
function currentDateArray(config) {
var now = new Date();
return config._useUTC ? [ now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ] :[ now.getFullYear(), now.getMonth(), now.getDate() ];
}
function makeDateFromStringAndFormat(config) {
config._a = [], config._pf.empty = !0;
var i, parsedInput, tokens, token, skipped, lang = getLangDefinition(config._l), string = "" + config._i, stringLength = string.length, totalParsedInputLength = 0;
for (tokens = expandFormat(config._f, lang).match(formattingTokens) || [], i = 0; i < tokens.length; i++) token = tokens[i], 
parsedInput = (getParseRegexForToken(token, config).exec(string) || [])[0], parsedInput && (skipped = string.substr(0, string.indexOf(parsedInput)), 
skipped.length > 0 && config._pf.unusedInput.push(skipped), string = string.slice(string.indexOf(parsedInput) + parsedInput.length), 
totalParsedInputLength += parsedInput.length), formatTokenFunctions[token] ? (parsedInput ? config._pf.empty = !1 :config._pf.unusedTokens.push(token), 
addTimeToArrayFromToken(token, parsedInput, config)) :config._strict && !parsedInput && config._pf.unusedTokens.push(token);
config._pf.charsLeftOver = stringLength - totalParsedInputLength, string.length > 0 && config._pf.unusedInput.push(string), 
config._isPm && config._a[HOUR] < 12 && (config._a[HOUR] += 12), config._isPm === !1 && 12 === config._a[HOUR] && (config._a[HOUR] = 0), 
dateFromConfig(config), checkOverflow(config);
}
function unescapeFormat(s) {
return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
return p1 || p2 || p3 || p4;
});
}
function regexpEscape(s) {
return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function makeDateFromStringAndArray(config) {
var tempConfig, bestMoment, scoreToBeat, i, currentScore;
if (0 === config._f.length) return config._pf.invalidFormat = !0, config._d = new Date(0/0), 
void 0;
for (i = 0; i < config._f.length; i++) currentScore = 0, tempConfig = extend({}, config), 
initializeParsingFlags(tempConfig), tempConfig._f = config._f[i], makeDateFromStringAndFormat(tempConfig), 
isValid(tempConfig) && (currentScore += tempConfig._pf.charsLeftOver, currentScore += 10 * tempConfig._pf.unusedTokens.length, 
tempConfig._pf.score = currentScore, (null == scoreToBeat || scoreToBeat > currentScore) && (scoreToBeat = currentScore, 
bestMoment = tempConfig));
extend(config, bestMoment || tempConfig);
}
function makeDateFromString(config) {
var i, string = config._i, match = isoRegex.exec(string);
if (match) {
for (config._pf.iso = !0, i = 4; i > 0; i--) if (match[i]) {
config._f = isoDates[i - 1] + (match[6] || " ");
break;
}
for (i = 0; 4 > i; i++) if (isoTimes[i][1].exec(string)) {
config._f += isoTimes[i][0];
break;
}
parseTokenTimezone.exec(string) && (config._f += "Z"), makeDateFromStringAndFormat(config);
} else config._d = new Date(string);
}
function makeDateFromInput(config) {
var input = config._i, matched = aspNetJsonRegex.exec(input);
input === undefined ? config._d = new Date() :matched ? config._d = new Date(+matched[1]) :"string" == typeof input ? makeDateFromString(config) :isArray(input) ? (config._a = input.slice(0), 
dateFromConfig(config)) :isDate(input) ? config._d = new Date(+input) :"object" == typeof input ? dateFromObject(config) :config._d = new Date(input);
}
function makeDate(y, m, d, h, M, s, ms) {
var date = new Date(y, m, d, h, M, s, ms);
return 1970 > y && date.setFullYear(y), date;
}
function makeUTCDate(y) {
var date = new Date(Date.UTC.apply(null, arguments));
return 1970 > y && date.setUTCFullYear(y), date;
}
function parseWeekday(input, language) {
if ("string" == typeof input) if (isNaN(input)) {
if (input = language.weekdaysParse(input), "number" != typeof input) return null;
} else input = parseInt(input, 10);
return input;
}
function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime(milliseconds, withoutSuffix, lang) {
var seconds = round(Math.abs(milliseconds) / 1e3), minutes = round(seconds / 60), hours = round(minutes / 60), days = round(hours / 24), years = round(days / 365), args = 45 > seconds && [ "s", seconds ] || 1 === minutes && [ "m" ] || 45 > minutes && [ "mm", minutes ] || 1 === hours && [ "h" ] || 22 > hours && [ "hh", hours ] || 1 === days && [ "d" ] || 25 >= days && [ "dd", days ] || 45 >= days && [ "M" ] || 345 > days && [ "MM", round(days / 30) ] || 1 === years && [ "y" ] || [ "yy", years ];
return args[2] = withoutSuffix, args[3] = milliseconds > 0, args[4] = lang, substituteTimeAgo.apply({}, args);
}
function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
var adjustedMoment, end = firstDayOfWeekOfYear - firstDayOfWeek, daysToDayOfWeek = firstDayOfWeekOfYear - mom.day();
return daysToDayOfWeek > end && (daysToDayOfWeek -= 7), end - 7 > daysToDayOfWeek && (daysToDayOfWeek += 7), 
adjustedMoment = moment(mom).add("d", daysToDayOfWeek), {
week:Math.ceil(adjustedMoment.dayOfYear() / 7),
year:adjustedMoment.year()
};
}
function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
var daysToAdd, dayOfYear, d = new Date(Date.UTC(year, 0)).getUTCDay();
return weekday = null != weekday ? weekday :firstDayOfWeek, daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 :0), 
dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1, {
year:dayOfYear > 0 ? year :year - 1,
dayOfYear:dayOfYear > 0 ? dayOfYear :daysInYear(year - 1) + dayOfYear
};
}
function makeMoment(config) {
var input = config._i, format = config._f;
return "undefined" == typeof config._pf && initializeParsingFlags(config), null === input ? moment.invalid({
nullInput:!0
}) :("string" == typeof input && (config._i = input = getLangDefinition().preparse(input)), 
moment.isMoment(input) ? (config = extend({}, input), config._d = new Date(+input._d)) :format ? isArray(format) ? makeDateFromStringAndArray(config) :makeDateFromStringAndFormat(config) :makeDateFromInput(config), 
new Moment(config));
}
function makeGetterAndSetter(name, key) {
moment.fn[name] = moment.fn[name + "s"] = function(input) {
var utc = this._isUTC ? "UTC" :"";
return null != input ? (this._d["set" + utc + key](input), moment.updateOffset(this), 
this) :this._d["get" + utc + key]();
};
}
function makeDurationGetter(name) {
moment.duration.fn[name] = function() {
return this._data[name];
};
}
function makeDurationAsGetter(name, factor) {
moment.duration.fn["as" + name] = function() {
return +this / factor;
};
}
function makeGlobal(deprecate) {
var warned = !1, local_moment = moment;
"undefined" == typeof ender && (deprecate ? (global.moment = function() {
return !warned && console && console.warn && (warned = !0, console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")), 
local_moment.apply(null, arguments);
}, extend(global.moment, local_moment)) :global.moment = moment);
}
for (var moment, i, VERSION = "2.4.0", global = this, round = Math.round, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, languages = {}, hasModule = "undefined" != typeof module && module.exports && "undefined" != typeof require, aspNetJsonRegex = /^\/?Date\((\-?\d+)/i, aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, parseTokenOneOrTwoDigits = /\d\d?/, parseTokenOneToThreeDigits = /\d{1,3}/, parseTokenOneToFourDigits = /\d{1,4}/, parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, parseTokenDigits = /\d+/, parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, parseTokenT = /T/i, parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, parseTokenOneDigit = /\d/, parseTokenTwoDigits = /\d\d/, parseTokenThreeDigits = /\d{3}/, parseTokenFourDigits = /\d{4}/, parseTokenSixDigits = /[+\-]?\d{6}/, isoRegex = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d:?\d\d|\s*Z)?)?$/, isoFormat = "YYYY-MM-DDTHH:mm:ssZ", isoDates = [ "YYYY-MM-DD", "GGGG-[W]WW", "GGGG-[W]WW-E", "YYYY-DDD" ], isoTimes = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], parseTimezoneChunker = /([\+\-]|\d\d)/gi, proxyGettersAndSetters = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), unitMillisecondFactors = {
Milliseconds:1,
Seconds:1e3,
Minutes:6e4,
Hours:36e5,
Days:864e5,
Months:2592e6,
Years:31536e6
}, unitAliases = {
ms:"millisecond",
s:"second",
m:"minute",
h:"hour",
d:"day",
D:"date",
w:"week",
W:"isoWeek",
M:"month",
y:"year",
DDD:"dayOfYear",
e:"weekday",
E:"isoWeekday",
gg:"weekYear",
GG:"isoWeekYear"
}, camelFunctions = {
dayofyear:"dayOfYear",
isoweekday:"isoWeekday",
isoweek:"isoWeek",
weekyear:"weekYear",
isoweekyear:"isoWeekYear"
}, formatFunctions = {}, ordinalizeTokens = "DDD w W M D d".split(" "), paddedTokens = "M D H h m s w W".split(" "), formatTokenFunctions = {
M:function() {
return this.month() + 1;
},
MMM:function(format) {
return this.lang().monthsShort(this, format);
},
MMMM:function(format) {
return this.lang().months(this, format);
},
D:function() {
return this.date();
},
DDD:function() {
return this.dayOfYear();
},
d:function() {
return this.day();
},
dd:function(format) {
return this.lang().weekdaysMin(this, format);
},
ddd:function(format) {
return this.lang().weekdaysShort(this, format);
},
dddd:function(format) {
return this.lang().weekdays(this, format);
},
w:function() {
return this.week();
},
W:function() {
return this.isoWeek();
},
YY:function() {
return leftZeroFill(this.year() % 100, 2);
},
YYYY:function() {
return leftZeroFill(this.year(), 4);
},
YYYYY:function() {
return leftZeroFill(this.year(), 5);
},
gg:function() {
return leftZeroFill(this.weekYear() % 100, 2);
},
gggg:function() {
return this.weekYear();
},
ggggg:function() {
return leftZeroFill(this.weekYear(), 5);
},
GG:function() {
return leftZeroFill(this.isoWeekYear() % 100, 2);
},
GGGG:function() {
return this.isoWeekYear();
},
GGGGG:function() {
return leftZeroFill(this.isoWeekYear(), 5);
},
e:function() {
return this.weekday();
},
E:function() {
return this.isoWeekday();
},
a:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !0);
},
A:function() {
return this.lang().meridiem(this.hours(), this.minutes(), !1);
},
H:function() {
return this.hours();
},
h:function() {
return this.hours() % 12 || 12;
},
m:function() {
return this.minutes();
},
s:function() {
return this.seconds();
},
S:function() {
return toInt(this.milliseconds() / 100);
},
SS:function() {
return leftZeroFill(toInt(this.milliseconds() / 10), 2);
},
SSS:function() {
return leftZeroFill(this.milliseconds(), 3);
},
SSSS:function() {
return leftZeroFill(this.milliseconds(), 3);
},
Z:function() {
var a = -this.zone(), b = "+";
return 0 > a && (a = -a, b = "-"), b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
},
ZZ:function() {
var a = -this.zone(), b = "+";
return 0 > a && (a = -a, b = "-"), b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
},
z:function() {
return this.zoneAbbr();
},
zz:function() {
return this.zoneName();
},
X:function() {
return this.unix();
},
Q:function() {
return this.quarter();
}
}, lists = [ "months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin" ]; ordinalizeTokens.length; ) i = ordinalizeTokens.pop(), 
formatTokenFunctions[i + "o"] = ordinalizeToken(formatTokenFunctions[i], i);
for (;paddedTokens.length; ) i = paddedTokens.pop(), formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
for (formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3), extend(Language.prototype, {
set:function(config) {
var prop, i;
for (i in config) prop = config[i], "function" == typeof prop ? this[i] = prop :this["_" + i] = prop;
},
_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
months:function(m) {
return this._months[m.month()];
},
_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
monthsShort:function(m) {
return this._monthsShort[m.month()];
},
monthsParse:function(monthName) {
var i, mom, regex;
for (this._monthsParse || (this._monthsParse = []), i = 0; 12 > i; i++) if (this._monthsParse[i] || (mom = moment.utc([ 2e3, i ]), 
regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, ""), this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i")), 
this._monthsParse[i].test(monthName)) return i;
},
_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdays:function(m) {
return this._weekdays[m.day()];
},
_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysShort:function(m) {
return this._weekdaysShort[m.day()];
},
_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
weekdaysMin:function(m) {
return this._weekdaysMin[m.day()];
},
weekdaysParse:function(weekdayName) {
var i, mom, regex;
for (this._weekdaysParse || (this._weekdaysParse = []), i = 0; 7 > i; i++) if (this._weekdaysParse[i] || (mom = moment([ 2e3, 1 ]).day(i), 
regex = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, ""), 
this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i")), this._weekdaysParse[i].test(weekdayName)) return i;
},
_longDateFormat:{
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D YYYY",
LLL:"MMMM D YYYY LT",
LLLL:"dddd, MMMM D YYYY LT"
},
longDateFormat:function(key) {
var output = this._longDateFormat[key];
return !output && this._longDateFormat[key.toUpperCase()] && (output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(val) {
return val.slice(1);
}), this._longDateFormat[key] = output), output;
},
isPM:function(input) {
return "p" === (input + "").toLowerCase().charAt(0);
},
_meridiemParse:/[ap]\.?m?\.?/i,
meridiem:function(hours, minutes, isLower) {
return hours > 11 ? isLower ? "pm" :"PM" :isLower ? "am" :"AM";
},
_calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
},
calendar:function(key, mom) {
var output = this._calendar[key];
return "function" == typeof output ? output.apply(mom) :output;
},
_relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
relativeTime:function(number, withoutSuffix, string, isFuture) {
var output = this._relativeTime[string];
return "function" == typeof output ? output(number, withoutSuffix, string, isFuture) :output.replace(/%d/i, number);
},
pastFuture:function(diff, output) {
var format = this._relativeTime[diff > 0 ? "future" :"past"];
return "function" == typeof format ? format(output) :format.replace(/%s/i, output);
},
ordinal:function(number) {
return this._ordinal.replace("%d", number);
},
_ordinal:"%d",
preparse:function(string) {
return string;
},
postformat:function(string) {
return string;
},
week:function(mom) {
return weekOfYear(mom, this._week.dow, this._week.doy).week;
},
_week:{
dow:0,
doy:6
},
_invalidDate:"Invalid date",
invalidDate:function() {
return this._invalidDate;
}
}), moment = function(input, format, lang, strict) {
return "boolean" == typeof lang && (strict = lang, lang = undefined), makeMoment({
_i:input,
_f:format,
_l:lang,
_strict:strict,
_isUTC:!1
});
}, moment.utc = function(input, format, lang, strict) {
var m;
return "boolean" == typeof lang && (strict = lang, lang = undefined), m = makeMoment({
_useUTC:!0,
_isUTC:!0,
_l:lang,
_i:input,
_f:format,
_strict:strict
}).utc();
}, moment.unix = function(input) {
return moment(1e3 * input);
}, moment.duration = function(input, key) {
var sign, ret, parseIso, duration = input, match = null;
return moment.isDuration(input) ? duration = {
ms:input._milliseconds,
d:input._days,
M:input._months
} :"number" == typeof input ? (duration = {}, key ? duration[key] = input :duration.milliseconds = input) :(match = aspNetTimeSpanJsonRegex.exec(input)) ? (sign = "-" === match[1] ? -1 :1, 
duration = {
y:0,
d:toInt(match[DATE]) * sign,
h:toInt(match[HOUR]) * sign,
m:toInt(match[MINUTE]) * sign,
s:toInt(match[SECOND]) * sign,
ms:toInt(match[MILLISECOND]) * sign
}) :(match = isoDurationRegex.exec(input)) && (sign = "-" === match[1] ? -1 :1, 
parseIso = function(inp) {
var res = inp && parseFloat(inp.replace(",", "."));
return (isNaN(res) ? 0 :res) * sign;
}, duration = {
y:parseIso(match[2]),
M:parseIso(match[3]),
d:parseIso(match[4]),
h:parseIso(match[5]),
m:parseIso(match[6]),
s:parseIso(match[7]),
w:parseIso(match[8])
}), ret = new Duration(duration), moment.isDuration(input) && input.hasOwnProperty("_lang") && (ret._lang = input._lang), 
ret;
}, moment.version = VERSION, moment.defaultFormat = isoFormat, moment.updateOffset = function() {}, 
moment.lang = function(key, values) {
var r;
return key ? (values ? loadLang(normalizeLanguage(key), values) :null === values ? (unloadLang(key), 
key = "en") :languages[key] || getLangDefinition(key), r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key), 
r._abbr) :moment.fn._lang._abbr;
}, moment.langData = function(key) {
return key && key._lang && key._lang._abbr && (key = key._lang._abbr), getLangDefinition(key);
}, moment.isMoment = function(obj) {
return obj instanceof Moment;
}, moment.isDuration = function(obj) {
return obj instanceof Duration;
}, i = lists.length - 1; i >= 0; --i) makeList(lists[i]);
for (moment.normalizeUnits = function(units) {
return normalizeUnits(units);
}, moment.invalid = function(flags) {
var m = moment.utc(0/0);
return null != flags ? extend(m._pf, flags) :m._pf.userInvalidated = !0, m;
}, moment.parseZone = function(input) {
return moment(input).parseZone();
}, extend(moment.fn = Moment.prototype, {
clone:function() {
return moment(this);
},
valueOf:function() {
return +this._d + 6e4 * (this._offset || 0);
},
unix:function() {
return Math.floor(+this / 1e3);
},
toString:function() {
return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
},
toDate:function() {
return this._offset ? new Date(+this) :this._d;
},
toISOString:function() {
return formatMoment(moment(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
},
toArray:function() {
var m = this;
return [ m.year(), m.month(), m.date(), m.hours(), m.minutes(), m.seconds(), m.milliseconds() ];
},
isValid:function() {
return isValid(this);
},
isDSTShifted:function() {
return this._a ? this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) :moment(this._a)).toArray()) > 0 :!1;
},
parsingFlags:function() {
return extend({}, this._pf);
},
invalidAt:function() {
return this._pf.overflow;
},
utc:function() {
return this.zone(0);
},
local:function() {
return this.zone(0), this._isUTC = !1, this;
},
format:function(inputString) {
var output = formatMoment(this, inputString || moment.defaultFormat);
return this.lang().postformat(output);
},
add:function(input, val) {
var dur;
return dur = "string" == typeof input ? moment.duration(+val, input) :moment.duration(input, val), 
addOrSubtractDurationFromMoment(this, dur, 1), this;
},
subtract:function(input, val) {
var dur;
return dur = "string" == typeof input ? moment.duration(+val, input) :moment.duration(input, val), 
addOrSubtractDurationFromMoment(this, dur, -1), this;
},
diff:function(input, units, asFloat) {
var diff, output, that = moment(input), zoneDiff = 6e4 * (this.zone() - that.zone());
return units = normalizeUnits(units), "year" === units || "month" === units ? (diff = 432e5 * (this.daysInMonth() + that.daysInMonth()), 
output = 12 * (this.year() - that.year()) + (this.month() - that.month()), output += (this - moment(this).startOf("month") - (that - moment(that).startOf("month"))) / diff, 
output -= 6e4 * (this.zone() - moment(this).startOf("month").zone() - (that.zone() - moment(that).startOf("month").zone())) / diff, 
"year" === units && (output /= 12)) :(diff = this - that, output = "second" === units ? diff / 1e3 :"minute" === units ? diff / 6e4 :"hour" === units ? diff / 36e5 :"day" === units ? (diff - zoneDiff) / 864e5 :"week" === units ? (diff - zoneDiff) / 6048e5 :diff), 
asFloat ? output :absRound(output);
},
from:function(time, withoutSuffix) {
return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
},
fromNow:function(withoutSuffix) {
return this.from(moment(), withoutSuffix);
},
calendar:function() {
var diff = this.diff(moment().zone(this.zone()).startOf("day"), "days", !0), format = -6 > diff ? "sameElse" :-1 > diff ? "lastWeek" :0 > diff ? "lastDay" :1 > diff ? "sameDay" :2 > diff ? "nextDay" :7 > diff ? "nextWeek" :"sameElse";
return this.format(this.lang().calendar(format, this));
},
isLeapYear:function() {
return isLeapYear(this.year());
},
isDST:function() {
return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone();
},
day:function(input) {
var day = this._isUTC ? this._d.getUTCDay() :this._d.getDay();
return null != input ? (input = parseWeekday(input, this.lang()), this.add({
d:input - day
})) :day;
},
month:function(input) {
var dayOfMonth, utc = this._isUTC ? "UTC" :"";
return null != input ? "string" == typeof input && (input = this.lang().monthsParse(input), 
"number" != typeof input) ? this :(dayOfMonth = this.date(), this.date(1), this._d["set" + utc + "Month"](input), 
this.date(Math.min(dayOfMonth, this.daysInMonth())), moment.updateOffset(this), 
this) :this._d["get" + utc + "Month"]();
},
startOf:function(units) {
switch (units = normalizeUnits(units)) {
case "year":
this.month(0);

case "month":
this.date(1);

case "week":
case "isoWeek":
case "day":
this.hours(0);

case "hour":
this.minutes(0);

case "minute":
this.seconds(0);

case "second":
this.milliseconds(0);
}
return "week" === units ? this.weekday(0) :"isoWeek" === units && this.isoWeekday(1), 
this;
},
endOf:function(units) {
return units = normalizeUnits(units), this.startOf(units).add("isoWeek" === units ? "week" :units, 1).subtract("ms", 1);
},
isAfter:function(input, units) {
return units = "undefined" != typeof units ? units :"millisecond", +this.clone().startOf(units) > +moment(input).startOf(units);
},
isBefore:function(input, units) {
return units = "undefined" != typeof units ? units :"millisecond", +this.clone().startOf(units) < +moment(input).startOf(units);
},
isSame:function(input, units) {
return units = "undefined" != typeof units ? units :"millisecond", +this.clone().startOf(units) === +moment(input).startOf(units);
},
min:function(other) {
return other = moment.apply(null, arguments), this > other ? this :other;
},
max:function(other) {
return other = moment.apply(null, arguments), other > this ? this :other;
},
zone:function(input) {
var offset = this._offset || 0;
return null == input ? this._isUTC ? offset :this._d.getTimezoneOffset() :("string" == typeof input && (input = timezoneMinutesFromString(input)), 
Math.abs(input) < 16 && (input = 60 * input), this._offset = input, this._isUTC = !0, 
offset !== input && addOrSubtractDurationFromMoment(this, moment.duration(offset - input, "m"), 1, !0), 
this);
},
zoneAbbr:function() {
return this._isUTC ? "UTC" :"";
},
zoneName:function() {
return this._isUTC ? "Coordinated Universal Time" :"";
},
parseZone:function() {
return "string" == typeof this._i && this.zone(this._i), this;
},
hasAlignedHourOffset:function(input) {
return input = input ? moment(input).zone() :0, (this.zone() - input) % 60 === 0;
},
daysInMonth:function() {
return daysInMonth(this.year(), this.month());
},
dayOfYear:function(input) {
var dayOfYear = round((moment(this).startOf("day") - moment(this).startOf("year")) / 864e5) + 1;
return null == input ? dayOfYear :this.add("d", input - dayOfYear);
},
quarter:function() {
return Math.ceil((this.month() + 1) / 3);
},
weekYear:function(input) {
var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
return null == input ? year :this.add("y", input - year);
},
isoWeekYear:function(input) {
var year = weekOfYear(this, 1, 4).year;
return null == input ? year :this.add("y", input - year);
},
week:function(input) {
var week = this.lang().week(this);
return null == input ? week :this.add("d", 7 * (input - week));
},
isoWeek:function(input) {
var week = weekOfYear(this, 1, 4).week;
return null == input ? week :this.add("d", 7 * (input - week));
},
weekday:function(input) {
var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
return null == input ? weekday :this.add("d", input - weekday);
},
isoWeekday:function(input) {
return null == input ? this.day() || 7 :this.day(this.day() % 7 ? input :input - 7);
},
get:function(units) {
return units = normalizeUnits(units), this[units]();
},
set:function(units, value) {
return units = normalizeUnits(units), "function" == typeof this[units] && this[units](value), 
this;
},
lang:function(key) {
return key === undefined ? this._lang :(this._lang = getLangDefinition(key), this);
}
}), i = 0; i < proxyGettersAndSetters.length; i++) makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ""), proxyGettersAndSetters[i]);
makeGetterAndSetter("year", "FullYear"), moment.fn.days = moment.fn.day, moment.fn.months = moment.fn.month, 
moment.fn.weeks = moment.fn.week, moment.fn.isoWeeks = moment.fn.isoWeek, moment.fn.toJSON = moment.fn.toISOString, 
extend(moment.duration.fn = Duration.prototype, {
_bubble:function() {
var seconds, minutes, hours, years, milliseconds = this._milliseconds, days = this._days, months = this._months, data = this._data;
data.milliseconds = milliseconds % 1e3, seconds = absRound(milliseconds / 1e3), 
data.seconds = seconds % 60, minutes = absRound(seconds / 60), data.minutes = minutes % 60, 
hours = absRound(minutes / 60), data.hours = hours % 24, days += absRound(hours / 24), 
data.days = days % 30, months += absRound(days / 30), data.months = months % 12, 
years = absRound(months / 12), data.years = years;
},
weeks:function() {
return absRound(this.days() / 7);
},
valueOf:function() {
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12);
},
humanize:function(withSuffix) {
var difference = +this, output = relativeTime(difference, !withSuffix, this.lang());
return withSuffix && (output = this.lang().pastFuture(difference, output)), this.lang().postformat(output);
},
add:function(input, val) {
var dur = moment.duration(input, val);
return this._milliseconds += dur._milliseconds, this._days += dur._days, this._months += dur._months, 
this._bubble(), this;
},
subtract:function(input, val) {
var dur = moment.duration(input, val);
return this._milliseconds -= dur._milliseconds, this._days -= dur._days, this._months -= dur._months, 
this._bubble(), this;
},
get:function(units) {
return units = normalizeUnits(units), this[units.toLowerCase() + "s"]();
},
as:function(units) {
return units = normalizeUnits(units), this["as" + units.charAt(0).toUpperCase() + units.slice(1) + "s"]();
},
lang:moment.fn.lang,
toIsoString:function() {
var years = Math.abs(this.years()), months = Math.abs(this.months()), days = Math.abs(this.days()), hours = Math.abs(this.hours()), minutes = Math.abs(this.minutes()), seconds = Math.abs(this.seconds() + this.milliseconds() / 1e3);
return this.asSeconds() ? (this.asSeconds() < 0 ? "-" :"") + "P" + (years ? years + "Y" :"") + (months ? months + "M" :"") + (days ? days + "D" :"") + (hours || minutes || seconds ? "T" :"") + (hours ? hours + "H" :"") + (minutes ? minutes + "M" :"") + (seconds ? seconds + "S" :"") :"P0D";
}
});
for (i in unitMillisecondFactors) unitMillisecondFactors.hasOwnProperty(i) && (makeDurationAsGetter(i, unitMillisecondFactors[i]), 
makeDurationGetter(i.toLowerCase()));
makeDurationAsGetter("Weeks", 6048e5), moment.duration.fn.asMonths = function() {
return (+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years();
}, moment.lang("en", {
ordinal:function(number) {
var b = number % 10, output = 1 === toInt(number % 100 / 10) ? "th" :1 === b ? "st" :2 === b ? "nd" :3 === b ? "rd" :"th";
return number + output;
}
}), hasModule ? (module.exports = moment, makeGlobal(!0)) :"function" == typeof define && define.amd ? define("moment", function(require, exports, module) {
return module.config && module.config() && module.config().noGlobal !== !0 && makeGlobal(module.config().noGlobal === undefined), 
moment;
}) :makeGlobal();
}.call(this), function() {
function onload(moment) {
function parseMinutes(input) {
input += "";
var output = input.split(":"), sign = ~input.indexOf("-") ? -1 :1, hour = Math.abs(+output[0]), minute = parseInt(output[1], 10) || 0, second = parseInt(output[2], 10) || 0;
return sign * (60 * hour + minute + second / 60);
}
function Rule(name, startYear, endYear, month, day, dayRule, time, timeRule, offset, letters) {
this.name = name, this.startYear = +startYear, this.endYear = +endYear, this.month = +month, 
this.day = +day, this.dayRule = +dayRule, this.time = parseMinutes(time), this.timeRule = +timeRule, 
this.offset = parseMinutes(offset), this.letters = letters || "", this.date = memoize(this.date), 
this.weekdayAfter = memoize(this.weekdayAfter), this.lastWeekday = memoize(this.lastWeekday);
}
function RuleYear(year, rule) {
this.rule = rule, this.start = rule.start(year);
}
function sortRuleYears(a, b) {
return a.isLast ? -1 :b.isLast ? 1 :b.start - a.start;
}
function RuleSet(name) {
this.name = name, this.rules = [], this.lastYearRule = memoize(this.lastYearRule);
}
function Zone(name, offset, ruleSet, letters, until, untilOffset) {
var i, untilArray = "string" == typeof until ? until.split("_") :[ 9999 ];
for (this.name = name, this.offset = parseMinutes(offset), this.ruleSet = ruleSet, 
this.letters = letters, this.lastRule = memoize(this.lastRule), i = 0; i < untilArray.length; i++) untilArray[i] = +untilArray[i];
this.until = moment.utc(untilArray).subtract("m", parseMinutes(untilOffset));
}
function sortZones(a, b) {
return a.until - b.until;
}
function ZoneSet(name) {
this.name = normalizeName(name), this.displayName = name, this.zones = [], this.zoneAndRule = memoize(this.zoneAndRule, function(mom) {
return +mom;
});
}
function memoize(fn, keyFn) {
var cache = {};
return function(first) {
var key = keyFn ? keyFn.apply(this, arguments) :first;
return key in cache ? cache[key] :cache[key] = fn.apply(this, arguments);
};
}
function addRules(rules) {
var i, j, rule;
for (i in rules) for (rule = rules[i], j = 0; j < rule.length; j++) addRule(i + "	" + rule[j]);
}
function addRule(ruleString) {
if (rules[ruleString]) return rules[ruleString];
var p = ruleString.split(/\s/), name = normalizeName(p[0]), rule = new Rule(name, p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9], p[10]);
return rules[ruleString] = rule, getRuleSet(name).add(rule), rule;
}
function normalizeName(name) {
return (name || "").toLowerCase().replace(/\//g, "_");
}
function addZones(zones) {
var i, j, zone;
for (i in zones) for (zone = zones[i], j = 0; j < zone.length; j++) addZone(i + "	" + zone[j]);
}
function addLinks(linksToAdd) {
var i;
for (i in linksToAdd) links[normalizeName(i)] = normalizeName(linksToAdd[i]);
}
function addZone(zoneString) {
if (zones[zoneString]) return zones[zoneString];
var p = zoneString.split(/\s/), name = normalizeName(p[0]), zone = new Zone(name, p[1], getRuleSet(p[2]), p[3], p[4], p[5]);
return zones[zoneString] = zone, getZoneSet(p[0]).add(zone), zone;
}
function getRuleSet(name) {
return name = normalizeName(name), ruleSets[name] || (ruleSets[name] = new RuleSet(name)), 
ruleSets[name];
}
function getZoneSet(name) {
var machineName = normalizeName(name);
return links[machineName] && (machineName = links[machineName]), zoneSets[machineName] || (zoneSets[machineName] = new ZoneSet(name)), 
zoneSets[machineName];
}
function add(data) {
data && (data.zones && addZones(data.zones), data.rules && addRules(data.rules), 
data.links && addLinks(data.links));
}
function getZoneSets() {
var zoneName, sets = [];
for (zoneName in zoneSets) sets.push(zoneSets[zoneName]);
return sets;
}
var defaultRule, oldZoneName = moment.fn.zoneName, oldZoneAbbr = moment.fn.zoneAbbr, rules = {}, ruleSets = {}, zones = {}, zoneSets = {}, links = {}, TIME_RULE_UTC = 1, TIME_RULE_STANDARD = 2, DAY_RULE_DAY_OF_MONTH = 7, DAY_RULE_LAST_WEEKDAY = 8;
return Rule.prototype = {
contains:function(year) {
return year >= this.startYear && year <= this.endYear;
},
start:function(year) {
return year = Math.min(Math.max(year, this.startYear), this.endYear), moment.utc([ year, this.month, this.date(year), 0, this.time ]);
},
date:function(year) {
return this.dayRule === DAY_RULE_DAY_OF_MONTH ? this.day :this.dayRule === DAY_RULE_LAST_WEEKDAY ? this.lastWeekday(year) :this.weekdayAfter(year);
},
weekdayAfter:function(year) {
for (var day = this.day, firstDayOfWeek = moment([ year, this.month, 1 ]).day(), output = this.dayRule + 1 - firstDayOfWeek; day > output; ) output += 7;
return output;
},
lastWeekday:function(year) {
var day = this.day, dow = day % 7, lastDowOfMonth = moment([ year, this.month + 1, 1 ]).day(), daysInMonth = moment([ year, this.month, 1 ]).daysInMonth(), output = daysInMonth + (dow - (lastDowOfMonth - 1)) - 7 * ~~(day / 7);
return dow >= lastDowOfMonth && (output -= 7), output;
}
}, RuleYear.prototype = {
equals:function(other) {
return other && other.rule === this.rule ? Math.abs(other.start - this.start) < 864e5 :!1;
}
}, RuleSet.prototype = {
add:function(rule) {
this.rules.push(rule);
},
ruleYears:function(mom, lastZone) {
var i, rule, lastZoneRule, year = mom.year(), rules = [];
for (i = 0; i < this.rules.length; i++) rule = this.rules[i], rule.contains(year) ? rules.push(new RuleYear(year, rule)) :rule.contains(year + 1) && rules.push(new RuleYear(year + 1, rule));
return rules.push(new RuleYear(year - 1, this.lastYearRule(year - 1))), lastZone && (lastZoneRule = new RuleYear(year - 1, lastZone.lastRule()), 
lastZoneRule.start = lastZone.until.clone().utc(), lastZoneRule.isLast = lastZone.ruleSet !== this, 
rules.push(lastZoneRule)), rules.sort(sortRuleYears), rules;
},
rule:function(mom, offset, lastZone) {
var rule, lastZoneOffset, lastZoneOffsetAbs, lastRule, i, rules = this.ruleYears(mom, lastZone), lastOffset = 0;
for (lastZone && (lastZoneOffset = lastZone.offset + lastZone.lastRule().offset, 
lastZoneOffsetAbs = 9e4 * Math.abs(lastZoneOffset)), i = rules.length - 1; i > -1; i--) lastRule = rule, 
rule = rules[i], rule.equals(lastRule) || (lastZone && !rule.isLast && Math.abs(rule.start - lastZone.until) <= lastZoneOffsetAbs && (lastOffset += lastZoneOffset - offset), 
rule.rule.timeRule === TIME_RULE_STANDARD && (lastOffset = offset), rule.rule.timeRule !== TIME_RULE_UTC && rule.start.add("m", -lastOffset), 
lastOffset = rule.rule.offset + offset);
for (i = 0; i < rules.length; i++) if (rule = rules[i], mom >= rule.start && !rule.isLast) return rule.rule;
return defaultRule;
},
lastYearRule:function(year) {
var i, rule, start, bestRule = defaultRule, largest = -1e30;
for (i = 0; i < this.rules.length; i++) rule = this.rules[i], year >= rule.startYear && (start = rule.start(year), 
start > largest && (largest = start, bestRule = rule));
return bestRule;
}
}, Zone.prototype = {
rule:function(mom, lastZone) {
return this.ruleSet.rule(mom, this.offset, lastZone);
},
lastRule:function() {
return this.rule(this.until);
},
format:function(rule) {
return this.letters.replace("%s", rule.letters);
}
}, ZoneSet.prototype = {
zoneAndRule:function(mom) {
var i, zone, lastZone;
for (mom = mom.clone().utc(), i = 0; i < this.zones.length && (zone = this.zones[i], 
!(mom < zone.until)); i++) lastZone = zone;
return [ zone, zone.rule(mom, lastZone) ];
},
add:function(zone) {
this.zones.push(zone), this.zones.sort(sortZones);
},
format:function(mom) {
var zoneAndRule = this.zoneAndRule(mom);
return zoneAndRule[0].format(zoneAndRule[1]);
},
offset:function(mom) {
var zoneAndRule = this.zoneAndRule(mom);
return -(zoneAndRule[0].offset + zoneAndRule[1].offset);
}
}, moment.updateOffset = function(mom, dontAdjustTime) {
var offset;
mom._z && (offset = mom._z.offset(mom), Math.abs(offset) < 16 && (offset /= 60), 
mom.zone(offset, !dontAdjustTime));
}, moment.fn.tz = function(name) {
return name ? (this._z = getZoneSet(name), this._z && moment.updateOffset(this), 
this) :this._z ? this._z.displayName :void 0;
}, moment.fn.zoneName = function() {
return this._z ? this._z.format(this) :oldZoneName.call(this);
}, moment.fn.zoneAbbr = function() {
return this._z ? this._z.format(this) :oldZoneAbbr.call(this);
}, moment.tz = function() {
var i, args = [], len = arguments.length - 1;
for (i = 0; len > i; i++) args[i] = arguments[i];
var m = moment.apply(null, args), preTzOffset = m.zone();
return m.tz(arguments[len]), m.add("minutes", m.zone() - preTzOffset);
}, moment.tz.add = add, moment.tz.addRule = addRule, moment.tz.addZone = addZone, 
moment.tz.zones = getZoneSets, moment.tz.version = VERSION, defaultRule = addRule("- 0 9999 0 0 0 0 0 0"), 
moment;
}
var VERSION = "0.0.3";
"function" == typeof define && define.amd ? define("moment-timezone", [ "moment" ], onload) :"undefined" != typeof module ? module.exports = onload(require("moment")) :"undefined" != typeof window && window.moment && onload(window.moment);
}.apply(this), moment.tz.add({
zones:{
"Africa/Abidjan":[ "-0:16:8 - LMT 1912 -0:16:8", "0 - GMT" ],
"Africa/Accra":[ "-0:0:52 - LMT 1918 -0:0:52", "0 Ghana %s" ],
"Africa/Addis_Ababa":[ "2:34:48 - LMT 1870 2:34:48", "2:35:20 - ADMT 1936_4_5 2:35:20", "3 - EAT" ],
"Africa/Algiers":[ "0:12:12 - LMT 1891_2_15_0_1 0:12:12", "0:9:21 - PMT 1911_2_11 0:9:21", "0 Algeria WE%sT 1940_1_25_2", "1 Algeria CE%sT 1946_9_7 1", "0 - WET 1956_0_29", "1 - CET 1963_3_14 1", "0 Algeria WE%sT 1977_9_21 1", "1 Algeria CE%sT 1979_9_26 1", "0 Algeria WE%sT 1981_4", "1 - CET" ],
"Africa/Asmara":[ "2:35:32 - LMT 1870 2:35:32", "2:35:32 - AMT 1890 2:35:32", "2:35:20 - ADMT 1936_4_5 2:35:20", "3 - EAT" ],
"Africa/Bamako":[ "-0:32 - LMT 1912 -0:32", "0 - GMT 1934_1_26", "-1 - WAT 1960_5_20 -1", "0 - GMT" ],
"Africa/Bangui":[ "1:14:20 - LMT 1912 1:14:20", "1 - WAT" ],
"Africa/Banjul":[ "-1:6:36 - LMT 1912 -1:6:36", "-1:6:36 - BMT 1935 -1:6:36", "-1 - WAT 1964 -1", "0 - GMT" ],
"Africa/Bissau":[ "-1:2:20 - LMT 1911_4_26 -1:2:20", "-1 - WAT 1975 -1", "0 - GMT" ],
"Africa/Blantyre":[ "2:20 - LMT 1903_2 2:20", "2 - CAT" ],
"Africa/Brazzaville":[ "1:1:8 - LMT 1912 1:1:8", "1 - WAT" ],
"Africa/Bujumbura":[ "1:57:28 - LMT 1890 1:57:28", "2 - CAT" ],
"Africa/Cairo":[ "2:5:9 - LMT 1900_9 2:5:9", "2 Egypt EE%sT" ],
"Africa/Casablanca":[ "-0:30:20 - LMT 1913_9_26 -0:30:20", "0 Morocco WE%sT 1984_2_16", "1 - CET 1986 1", "0 Morocco WE%sT" ],
"Africa/Ceuta":[ "-0:21:16 - LMT 1901 -0:21:16", "0 - WET 1918_4_6_23", "1 - WEST 1918_9_7_23 1", "0 - WET 1924", "0 Spain WE%sT 1929", "0 SpainAfrica WE%sT 1984_2_16", "1 - CET 1986 1", "1 EU CE%sT" ],
"Africa/Conakry":[ "-0:54:52 - LMT 1912 -0:54:52", "0 - GMT 1934_1_26", "-1 - WAT 1960 -1", "0 - GMT" ],
"Africa/Dakar":[ "-1:9:44 - LMT 1912 -1:9:44", "-1 - WAT 1941_5 -1", "0 - GMT" ],
"Africa/Dar_es_Salaam":[ "2:37:8 - LMT 1931 2:37:8", "3 - EAT 1948 3", "2:45 - BEAUT 1961 2:45", "3 - EAT" ],
"Africa/Djibouti":[ "2:52:36 - LMT 1911_6 2:52:36", "3 - EAT" ],
"Africa/Douala":[ "0:38:48 - LMT 1912 0:38:48", "1 - WAT" ],
"Africa/El_Aaiun":[ "-0:52:48 - LMT 1934_0 -0:52:48", "-1 - WAT 1976_3_14 -1", "0 - WET" ],
"Africa/Freetown":[ "-0:53 - LMT 1882 -0:53", "-0:53 - FMT 1913_5 -0:53", "-1 SL %s 1957 -1", "0 SL %s" ],
"Africa/Gaborone":[ "1:43:40 - LMT 1885 1:43:40", "1:30 - SAST 1903_2 1:30", "2 - CAT 1943_8_19_2 2", "3 - CAST 1944_2_19_2 3", "2 - CAT" ],
"Africa/Harare":[ "2:4:12 - LMT 1903_2 2:4:12", "2 - CAT" ],
"Africa/Johannesburg":[ "1:52 - LMT 1892_1_8 1:52", "1:30 - SAST 1903_2 1:30", "2 SA SAST" ],
"Africa/Juba":[ "2:6:24 - LMT 1931 2:6:24", "2 Sudan CA%sT 2000_0_15_12 2", "3 - EAT" ],
"Africa/Kampala":[ "2:9:40 - LMT 1928_6 2:9:40", "3 - EAT 1930 3", "2:30 - BEAT 1948 2:30", "2:45 - BEAUT 1957 2:45", "3 - EAT" ],
"Africa/Khartoum":[ "2:10:8 - LMT 1931 2:10:8", "2 Sudan CA%sT 2000_0_15_12 2", "3 - EAT" ],
"Africa/Kigali":[ "2:0:16 - LMT 1935_5 2:0:16", "2 - CAT" ],
"Africa/Kinshasa":[ "1:1:12 - LMT 1897_10_9 1:1:12", "1 - WAT" ],
"Africa/Lagos":[ "0:13:36 - LMT 1919_8 0:13:36", "1 - WAT" ],
"Africa/Libreville":[ "0:37:48 - LMT 1912 0:37:48", "1 - WAT" ],
"Africa/Lome":[ "0:4:52 - LMT 1893 0:4:52", "0 - GMT" ],
"Africa/Luanda":[ "0:52:56 - LMT 1892 0:52:56", "0:52:4 - AOT 1911_4_26 0:52:4", "1 - WAT" ],
"Africa/Lubumbashi":[ "1:49:52 - LMT 1897_10_9 1:49:52", "2 - CAT" ],
"Africa/Lusaka":[ "1:53:8 - LMT 1903_2 1:53:8", "2 - CAT" ],
"Africa/Malabo":[ "0:35:8 - LMT 1912 0:35:8", "0 - GMT 1963_11_15", "1 - WAT" ],
"Africa/Maputo":[ "2:10:20 - LMT 1903_2 2:10:20", "2 - CAT" ],
"Africa/Maseru":[ "1:50 - LMT 1903_2 1:50", "2 - SAST 1943_8_19_2 2", "3 - SAST 1944_2_19_2 3", "2 - SAST" ],
"Africa/Mbabane":[ "2:4:24 - LMT 1903_2 2:4:24", "2 - SAST" ],
"Africa/Mogadishu":[ "3:1:28 - LMT 1893_10 3:1:28", "3 - EAT 1931 3", "2:30 - BEAT 1957 2:30", "3 - EAT" ],
"Africa/Monrovia":[ "-0:43:8 - LMT 1882 -0:43:8", "-0:43:8 - MMT 1919_2 -0:43:8", "-0:44:30 - LRT 1972_4 -0:44:30", "0 - GMT" ],
"Africa/Nairobi":[ "2:27:16 - LMT 1928_6 2:27:16", "3 - EAT 1930 3", "2:30 - BEAT 1940 2:30", "2:45 - BEAUT 1960 2:45", "3 - EAT" ],
"Africa/Ndjamena":[ "1:0:12 - LMT 1912 1:0:12", "1 - WAT 1979_9_14 1", "2 - WAST 1980_2_8 2", "1 - WAT" ],
"Africa/Niamey":[ "0:8:28 - LMT 1912 0:8:28", "-1 - WAT 1934_1_26 -1", "0 - GMT 1960", "1 - WAT" ],
"Africa/Nouakchott":[ "-1:3:48 - LMT 1912 -1:3:48", "0 - GMT 1934_1_26", "-1 - WAT 1960_10_28 -1", "0 - GMT" ],
"Africa/Ouagadougou":[ "-0:6:4 - LMT 1912 -0:6:4", "0 - GMT" ],
"Africa/Porto-Novo":[ "0:10:28 - LMT 1912 0:10:28", "0 - GMT 1934_1_26", "1 - WAT" ],
"Africa/Sao_Tome":[ "0:26:56 - LMT 1884 0:26:56", "-0:36:32 - LMT 1912 -0:36:32", "0 - GMT" ],
"Africa/Tripoli":[ "0:52:44 - LMT 1920 0:52:44", "1 Libya CE%sT 1959 1", "2 - EET 1982 2", "1 Libya CE%sT 1990_4_4 1", "2 - EET 1996_8_30 2", "1 Libya CE%sT 1997_9_4 2", "2 - EET 2012_10_10_2 2", "1 Libya CE%sT" ],
"Africa/Tunis":[ "0:40:44 - LMT 1881_4_12 0:40:44", "0:9:21 - PMT 1911_2_11 0:9:21", "1 Tunisia CE%sT" ],
"Africa/Windhoek":[ "1:8:24 - LMT 1892_1_8 1:8:24", "1:30 - SWAT 1903_2 1:30", "2 - SAST 1942_8_20_2 2", "3 - SAST 1943_2_21_2 3", "2 - SAST 1990_2_21 2", "2 - CAT 1994_3_3 2", "1 Namibia WA%sT" ],
"America/Adak":[ "12:13:21 - LMT 1867_9_18 12:13:21", "-11:46:38 - LMT 1900_7_20_12 -11:46:38", "-11 - NST 1942 -11", "-11 US N%sT 1946 -11", "-11 - NST 1967_3 -11", "-11 - BST 1969 -11", "-11 US B%sT 1983_9_30_2 -10", "-10 US AH%sT 1983_10_30 -10", "-10 US HA%sT" ],
"America/Anchorage":[ "14:0:24 - LMT 1867_9_18 14:0:24", "-9:59:36 - LMT 1900_7_20_12 -9:59:36", "-10 - CAT 1942 -10", "-10 US CAT/CAWT 1945_7_14_23", "-10 US CAT/CAPT 1946 -10", "-10 - CAT 1967_3 -10", "-10 - AHST 1969 -10", "-10 US AH%sT 1983_9_30_2 -9", "-9 US Y%sT 1983_10_30 -9", "-9 US AK%sT" ],
"America/Anguilla":[ "-4:12:16 - LMT 1912_2_2 -4:12:16", "-4 - AST" ],
"America/Antigua":[ "-4:7:12 - LMT 1912_2_2 -4:7:12", "-5 - EST 1951 -5", "-4 - AST" ],
"America/Araguaina":[ "-3:12:48 - LMT 1914 -3:12:48", "-3 Brazil BR%sT 1990_8_17 -3", "-3 - BRT 1995_8_14 -3", "-3 Brazil BR%sT 2003_8_24 -3", "-3 - BRT 2012_9_21 -3", "-3 Brazil BR%sT" ],
"America/Argentina/Buenos_Aires":[ "-3:53:48 - LMT 1894_9_31 -3:53:48", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 Arg AR%sT" ],
"America/Argentina/Catamarca":[ "-4:23:8 - LMT 1894_9_31 -4:23:8", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_3 -2", "-4 - WART 1991_9_20 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_5_1 -3", "-4 - WART 2004_5_20 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART" ],
"America/Argentina/Cordoba":[ "-4:16:48 - LMT 1894_9_31 -4:16:48", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_3 -2", "-4 - WART 1991_9_20 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 Arg AR%sT" ],
"America/Argentina/Jujuy":[ "-4:21:12 - LMT 1894_9_31 -4:21:12", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1990_2_4 -2", "-4 - WART 1990_9_28 -4", "-3 - WARST 1991_2_17 -3", "-4 - WART 1991_9_6 -4", "-2 - ARST 1992 -2", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART" ],
"America/Argentina/La_Rioja":[ "-4:27:24 - LMT 1894_9_31 -4:27:24", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_1 -2", "-4 - WART 1991_4_7 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_5_1 -3", "-4 - WART 2004_5_20 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART" ],
"America/Argentina/Mendoza":[ "-4:35:16 - LMT 1894_9_31 -4:35:16", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1990_2_4 -2", "-4 - WART 1990_9_15 -4", "-3 - WARST 1991_2_1 -3", "-4 - WART 1991_9_15 -4", "-3 - WARST 1992_2_1 -3", "-4 - WART 1992_9_18 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_4_23 -3", "-4 - WART 2004_8_26 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART" ],
"America/Argentina/Rio_Gallegos":[ "-4:36:52 - LMT 1894_9_31 -4:36:52", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_5_1 -3", "-4 - WART 2004_5_20 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART" ],
"America/Argentina/Salta":[ "-4:21:40 - LMT 1894_9_31 -4:21:40", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_3 -2", "-4 - WART 1991_9_20 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART" ],
"America/Argentina/San_Juan":[ "-4:34:4 - LMT 1894_9_31 -4:34:4", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_1 -2", "-4 - WART 1991_4_7 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_4_31 -3", "-4 - WART 2004_6_25 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART" ],
"America/Argentina/San_Luis":[ "-4:25:24 - LMT 1894_9_31 -4:25:24", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1990 -2", "-2 - ARST 1990_2_14 -2", "-4 - WART 1990_9_15 -4", "-3 - WARST 1991_2_1 -3", "-4 - WART 1991_5_1 -4", "-3 - ART 1999_9_3 -3", "-3 - WARST 2000_2_3 -3", "-3 - ART 2004_4_31 -3", "-4 - WART 2004_6_25 -4", "-3 Arg AR%sT 2008_0_21 -2", "-4 SanLuis WAR%sT" ],
"America/Argentina/Tucuman":[ "-4:20:52 - LMT 1894_9_31 -4:20:52", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1991_2_3 -2", "-4 - WART 1991_9_20 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_5_1 -3", "-4 - WART 2004_5_13 -4", "-3 Arg AR%sT" ],
"America/Argentina/Ushuaia":[ "-4:33:12 - LMT 1894_9_31 -4:33:12", "-4:16:48 - CMT 1920_4 -4:16:48", "-4 - ART 1930_11 -4", "-4 Arg AR%sT 1969_9_5 -4", "-3 Arg AR%sT 1999_9_3 -3", "-4 Arg AR%sT 2000_2_3 -3", "-3 - ART 2004_4_30 -3", "-4 - WART 2004_5_20 -4", "-3 Arg AR%sT 2008_9_18 -3", "-3 - ART" ],
"America/Aruba":[ "-4:40:24 - LMT 1912_1_12 -4:40:24", "-4:30 - ANT 1965 -4:30", "-4 - AST" ],
"America/Asuncion":[ "-3:50:40 - LMT 1890 -3:50:40", "-3:50:40 - AMT 1931_9_10 -3:50:40", "-4 - PYT 1972_9 -4", "-3 - PYT 1974_3 -3", "-4 Para PY%sT" ],
"America/Atikokan":[ "-6:6:28 - LMT 1895 -6:6:28", "-6 Canada C%sT 1940_8_29 -6", "-5 - CDT 1942_1_9_2 -6", "-6 Canada C%sT 1945_8_30_2 -5", "-5 - EST" ],
"America/Bahia":[ "-2:34:4 - LMT 1914 -2:34:4", "-3 Brazil BR%sT 2003_8_24 -3", "-3 - BRT 2011_9_16 -3", "-3 Brazil BR%sT 2012_9_21 -3", "-3 - BRT" ],
"America/Bahia_Banderas":[ "-7:1 - LMT 1921_11_31_23_59 -7:1", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 - CST 1942_3_24 -6", "-7 - MST 1949_0_14 -7", "-8 - PST 1970 -8", "-7 Mexico M%sT 2010_3_4_2 -7", "-6 Mexico C%sT" ],
"America/Barbados":[ "-3:58:29 - LMT 1924 -3:58:29", "-3:58:29 - BMT 1932 -3:58:29", "-4 Barb A%sT" ],
"America/Belem":[ "-3:13:56 - LMT 1914 -3:13:56", "-3 Brazil BR%sT 1988_8_12 -3", "-3 - BRT" ],
"America/Belize":[ "-5:52:48 - LMT 1912_3 -5:52:48", "-6 Belize C%sT" ],
"America/Blanc-Sablon":[ "-3:48:28 - LMT 1884 -3:48:28", "-4 Canada A%sT 1970 -4", "-4 - AST" ],
"America/Boa_Vista":[ "-4:2:40 - LMT 1914 -4:2:40", "-4 Brazil AM%sT 1988_8_12 -4", "-4 - AMT 1999_8_30 -4", "-4 Brazil AM%sT 2000_9_15 -3", "-4 - AMT" ],
"America/Bogota":[ "-4:56:16 - LMT 1884_2_13 -4:56:16", "-4:56:16 - BMT 1914_10_23 -4:56:16", "-5 CO CO%sT" ],
"America/Boise":[ "-7:44:49 - LMT 1883_10_18_12_15_11 -7:44:49", "-8 US P%sT 1923_4_13_2 -8", "-7 US M%sT 1974 -7", "-7 - MST 1974_1_3_2 -7", "-7 US M%sT" ],
"America/Cambridge_Bay":[ "0 - zzz 1920", "-7 NT_YK M%sT 1999_9_31_2 -6", "-6 Canada C%sT 2000_9_29_2 -5", "-5 - EST 2000_10_5_0 -5", "-6 - CST 2001_3_1_3 -6", "-7 Canada M%sT" ],
"America/Campo_Grande":[ "-3:38:28 - LMT 1914 -3:38:28", "-4 Brazil AM%sT" ],
"America/Cancun":[ "-5:47:4 - LMT 1922_0_1_0_12_56 -5:47:4", "-6 - CST 1981_11_23 -6", "-5 Mexico E%sT 1998_7_2_2 -4", "-6 Mexico C%sT" ],
"America/Caracas":[ "-4:27:44 - LMT 1890 -4:27:44", "-4:27:40 - CMT 1912_1_12 -4:27:40", "-4:30 - VET 1965 -4:30", "-4 - VET 2007_11_9_03 -4", "-4:30 - VET" ],
"America/Cayenne":[ "-3:29:20 - LMT 1911_6 -3:29:20", "-4 - GFT 1967_9 -4", "-3 - GFT" ],
"America/Cayman":[ "-5:25:32 - LMT 1890 -5:25:32", "-5:7:12 - KMT 1912_1 -5:7:12", "-5 - EST" ],
"America/Chicago":[ "-5:50:36 - LMT 1883_10_18_12_9_24 -5:50:36", "-6 US C%sT 1920 -6", "-6 Chicago C%sT 1936_2_1_2 -6", "-5 - EST 1936_10_15_2 -5", "-6 Chicago C%sT 1942 -6", "-6 US C%sT 1946 -6", "-6 Chicago C%sT 1967 -6", "-6 US C%sT" ],
"America/Chihuahua":[ "-7:4:20 - LMT 1921_11_31_23_55_40 -7:4:20", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 - CST 1996 -6", "-6 Mexico C%sT 1998 -6", "-6 - CST 1998_3_5_3 -6", "-7 Mexico M%sT" ],
"America/Costa_Rica":[ "-5:36:13 - LMT 1890 -5:36:13", "-5:36:13 - SJMT 1921_0_15 -5:36:13", "-6 CR C%sT" ],
"America/Creston":[ "-7:46:4 - LMT 1884 -7:46:4", "-7 - MST 1916_9_1 -7", "-8 - PST 1918_5_2 -8", "-7 - MST" ],
"America/Cuiaba":[ "-3:44:20 - LMT 1914 -3:44:20", "-4 Brazil AM%sT 2003_8_24 -4", "-4 - AMT 2004_9_1 -4", "-4 Brazil AM%sT" ],
"America/Curacao":[ "-4:35:47 - LMT 1912_1_12 -4:35:47", "-4:30 - ANT 1965 -4:30", "-4 - AST" ],
"America/Danmarkshavn":[ "-1:14:40 - LMT 1916_6_28 -1:14:40", "-3 - WGT 1980_3_6_2 -3", "-3 EU WG%sT 1996 -3", "0 - GMT" ],
"America/Dawson":[ "-9:17:40 - LMT 1900_7_20 -9:17:40", "-9 NT_YK Y%sT 1973_9_28_0 -9", "-8 NT_YK P%sT 1980 -8", "-8 Canada P%sT" ],
"America/Dawson_Creek":[ "-8:0:56 - LMT 1884 -8:0:56", "-8 Canada P%sT 1947 -8", "-8 Vanc P%sT 1972_7_30_2 -7", "-7 - MST" ],
"America/Denver":[ "-6:59:56 - LMT 1883_10_18_12_0_4 -6:59:56", "-7 US M%sT 1920 -7", "-7 Denver M%sT 1942 -7", "-7 US M%sT 1946 -7", "-7 Denver M%sT 1967 -7", "-7 US M%sT" ],
"America/Detroit":[ "-5:32:11 - LMT 1905 -5:32:11", "-6 - CST 1915_4_15_2 -6", "-5 - EST 1942 -5", "-5 US E%sT 1946 -5", "-5 Detroit E%sT 1973 -5", "-5 US E%sT 1975 -5", "-5 - EST 1975_3_27_2 -5", "-5 US E%sT" ],
"America/Dominica":[ "-4:5:36 - LMT 1911_6_1_0_1 -4:5:36", "-4 - AST" ],
"America/Edmonton":[ "-7:33:52 - LMT 1906_8 -7:33:52", "-7 Edm M%sT 1987 -7", "-7 Canada M%sT" ],
"America/Eirunepe":[ "-4:39:28 - LMT 1914 -4:39:28", "-5 Brazil AC%sT 1988_8_12 -5", "-5 - ACT 1993_8_28 -5", "-5 Brazil AC%sT 1994_8_22 -5", "-5 - ACT 2008_5_24_00 -5", "-4 - AMT" ],
"America/El_Salvador":[ "-5:56:48 - LMT 1921 -5:56:48", "-6 Salv C%sT" ],
"America/Fortaleza":[ "-2:34 - LMT 1914 -2:34", "-3 Brazil BR%sT 1990_8_17 -3", "-3 - BRT 1999_8_30 -3", "-3 Brazil BR%sT 2000_9_22 -2", "-3 - BRT 2001_8_13 -3", "-3 Brazil BR%sT 2002_9_1 -3", "-3 - BRT" ],
"America/Glace_Bay":[ "-3:59:48 - LMT 1902_5_15 -3:59:48", "-4 Canada A%sT 1953 -4", "-4 Halifax A%sT 1954 -4", "-4 - AST 1972 -4", "-4 Halifax A%sT 1974 -4", "-4 Canada A%sT" ],
"America/Godthab":[ "-3:26:56 - LMT 1916_6_28 -3:26:56", "-3 - WGT 1980_3_6_2 -3", "-3 EU WG%sT" ],
"America/Goose_Bay":[ "-4:1:40 - LMT 1884 -4:1:40", "-3:30:52 - NST 1918 -3:30:52", "-3:30:52 Canada N%sT 1919 -3:30:52", "-3:30:52 - NST 1935_2_30 -3:30:52", "-3:30 - NST 1936 -3:30", "-3:30 StJohns N%sT 1942_4_11 -3:30", "-3:30 Canada N%sT 1946 -3:30", "-3:30 StJohns N%sT 1966_2_15_2 -3:30", "-4 StJohns A%sT 2011_10 -3", "-4 Canada A%sT" ],
"America/Grand_Turk":[ "-4:44:32 - LMT 1890 -4:44:32", "-5:7:12 - KMT 1912_1 -5:7:12", "-5 TC E%sT" ],
"America/Grenada":[ "-4:7 - LMT 1911_6 -4:7", "-4 - AST" ],
"America/Guadeloupe":[ "-4:6:8 - LMT 1911_5_8 -4:6:8", "-4 - AST" ],
"America/Guatemala":[ "-6:2:4 - LMT 1918_9_5 -6:2:4", "-6 Guat C%sT" ],
"America/Guayaquil":[ "-5:19:20 - LMT 1890 -5:19:20", "-5:14 - QMT 1931 -5:14", "-5 - ECT" ],
"America/Guyana":[ "-3:52:40 - LMT 1915_2 -3:52:40", "-3:45 - GBGT 1966_4_26 -3:45", "-3:45 - GYT 1975_6_31 -3:45", "-3 - GYT 1991 -3", "-4 - GYT" ],
"America/Halifax":[ "-4:14:24 - LMT 1902_5_15 -4:14:24", "-4 Halifax A%sT 1918 -4", "-4 Canada A%sT 1919 -4", "-4 Halifax A%sT 1942_1_9_2 -4", "-4 Canada A%sT 1946 -4", "-4 Halifax A%sT 1974 -4", "-4 Canada A%sT" ],
"America/Havana":[ "-5:29:28 - LMT 1890 -5:29:28", "-5:29:36 - HMT 1925_6_19_12 -5:29:36", "-5 Cuba C%sT" ],
"America/Hermosillo":[ "-7:23:52 - LMT 1921_11_31_23_36_8 -7:23:52", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 - CST 1942_3_24 -6", "-7 - MST 1949_0_14 -7", "-8 - PST 1970 -8", "-7 Mexico M%sT 1999 -7", "-7 - MST" ],
"America/Indiana/Indianapolis":[ "-5:44:38 - LMT 1883_10_18_12_15_22 -5:44:38", "-6 US C%sT 1920 -6", "-6 Indianapolis C%sT 1942 -6", "-6 US C%sT 1946 -6", "-6 Indianapolis C%sT 1955_3_24_2 -6", "-5 - EST 1957_8_29_2 -5", "-6 - CST 1958_3_27_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1971 -5", "-5 - EST 2006 -5", "-5 US E%sT" ],
"America/Indiana/Knox":[ "-5:46:30 - LMT 1883_10_18_12_13_30 -5:46:30", "-6 US C%sT 1947 -6", "-6 Starke C%sT 1962_3_29_2 -6", "-5 - EST 1963_9_27_2 -5", "-6 US C%sT 1991_9_27_2 -5", "-5 - EST 2006_3_2_2 -5", "-6 US C%sT" ],
"America/Indiana/Marengo":[ "-5:45:23 - LMT 1883_10_18_12_14_37 -5:45:23", "-6 US C%sT 1951 -6", "-6 Marengo C%sT 1961_3_30_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1974_0_6_2 -5", "-5 - CDT 1974_9_27_2 -5", "-5 US E%sT 1976 -5", "-5 - EST 2006 -5", "-5 US E%sT" ],
"America/Indiana/Petersburg":[ "-5:49:7 - LMT 1883_10_18_12_10_53 -5:49:7", "-6 US C%sT 1955 -6", "-6 Pike C%sT 1965_3_25_2 -6", "-5 - EST 1966_9_30_2 -5", "-6 US C%sT 1977_9_30_2 -5", "-5 - EST 2006_3_2_2 -5", "-6 US C%sT 2007_10_4_2 -5", "-5 US E%sT" ],
"America/Indiana/Tell_City":[ "-5:47:3 - LMT 1883_10_18_12_12_57 -5:47:3", "-6 US C%sT 1946 -6", "-6 Perry C%sT 1964_3_26_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1971 -5", "-5 - EST 2006_3_2_2 -5", "-6 US C%sT" ],
"America/Indiana/Vevay":[ "-5:40:16 - LMT 1883_10_18_12_19_44 -5:40:16", "-6 US C%sT 1954_3_25_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1973 -5", "-5 - EST 2006 -5", "-5 US E%sT" ],
"America/Indiana/Vincennes":[ "-5:50:7 - LMT 1883_10_18_12_9_53 -5:50:7", "-6 US C%sT 1946 -6", "-6 Vincennes C%sT 1964_3_26_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1971 -5", "-5 - EST 2006_3_2_2 -5", "-6 US C%sT 2007_10_4_2 -5", "-5 US E%sT" ],
"America/Indiana/Winamac":[ "-5:46:25 - LMT 1883_10_18_12_13_35 -5:46:25", "-6 US C%sT 1946 -6", "-6 Pulaski C%sT 1961_3_30_2 -6", "-5 - EST 1969 -5", "-5 US E%sT 1971 -5", "-5 - EST 2006_3_2_2 -5", "-6 US C%sT 2007_2_11_2 -6", "-5 US E%sT" ],
"America/Inuvik":[ "0 - zzz 1953", "-8 NT_YK P%sT 1979_3_29_2 -8", "-7 NT_YK M%sT 1980 -7", "-7 Canada M%sT" ],
"America/Iqaluit":[ "0 - zzz 1942_7", "-5 NT_YK E%sT 1999_9_31_2 -4", "-6 Canada C%sT 2000_9_29_2 -5", "-5 Canada E%sT" ],
"America/Jamaica":[ "-5:7:12 - LMT 1890 -5:7:12", "-5:7:12 - KMT 1912_1 -5:7:12", "-5 - EST 1974_3_28_2 -5", "-5 US E%sT 1984 -5", "-5 - EST" ],
"America/Juneau":[ "15:2:19 - LMT 1867_9_18 15:2:19", "-8:57:41 - LMT 1900_7_20_12 -8:57:41", "-8 - PST 1942 -8", "-8 US P%sT 1946 -8", "-8 - PST 1969 -8", "-8 US P%sT 1980_3_27_2 -8", "-9 US Y%sT 1980_9_26_2 -8", "-8 US P%sT 1983_9_30_2 -7", "-9 US Y%sT 1983_10_30 -9", "-9 US AK%sT" ],
"America/Kentucky/Louisville":[ "-5:43:2 - LMT 1883_10_18_12_16_58 -5:43:2", "-6 US C%sT 1921 -6", "-6 Louisville C%sT 1942 -6", "-6 US C%sT 1946 -6", "-6 Louisville C%sT 1961_6_23_2 -5", "-5 - EST 1968 -5", "-5 US E%sT 1974_0_6_2 -5", "-5 - CDT 1974_9_27_2 -5", "-5 US E%sT" ],
"America/Kentucky/Monticello":[ "-5:39:24 - LMT 1883_10_18_12_20_36 -5:39:24", "-6 US C%sT 1946 -6", "-6 - CST 1968 -6", "-6 US C%sT 2000_9_29_2 -5", "-5 US E%sT" ],
"America/La_Paz":[ "-4:32:36 - LMT 1890 -4:32:36", "-4:32:36 - CMT 1931_9_15 -4:32:36", "-3:32:36 - BOST 1932_2_21 -3:32:36", "-4 - BOT" ],
"America/Lima":[ "-5:8:12 - LMT 1890 -5:8:12", "-5:8:36 - LMT 1908_6_28 -5:8:36", "-5 Peru PE%sT" ],
"America/Los_Angeles":[ "-7:52:58 - LMT 1883_10_18_12_7_2 -7:52:58", "-8 US P%sT 1946 -8", "-8 CA P%sT 1967 -8", "-8 US P%sT" ],
"America/Maceio":[ "-2:22:52 - LMT 1914 -2:22:52", "-3 Brazil BR%sT 1990_8_17 -3", "-3 - BRT 1995_9_13 -3", "-3 Brazil BR%sT 1996_8_4 -3", "-3 - BRT 1999_8_30 -3", "-3 Brazil BR%sT 2000_9_22 -2", "-3 - BRT 2001_8_13 -3", "-3 Brazil BR%sT 2002_9_1 -3", "-3 - BRT" ],
"America/Managua":[ "-5:45:8 - LMT 1890 -5:45:8", "-5:45:12 - MMT 1934_5_23 -5:45:12", "-6 - CST 1973_4 -6", "-5 - EST 1975_1_16 -5", "-6 Nic C%sT 1992_0_1_4 -6", "-5 - EST 1992_8_24 -5", "-6 - CST 1993 -6", "-5 - EST 1997 -5", "-6 Nic C%sT" ],
"America/Manaus":[ "-4:0:4 - LMT 1914 -4:0:4", "-4 Brazil AM%sT 1988_8_12 -4", "-4 - AMT 1993_8_28 -4", "-4 Brazil AM%sT 1994_8_22 -4", "-4 - AMT" ],
"America/Martinique":[ "-4:4:20 - LMT 1890 -4:4:20", "-4:4:20 - FFMT 1911_4 -4:4:20", "-4 - AST 1980_3_6 -4", "-3 - ADT 1980_8_28 -3", "-4 - AST" ],
"America/Matamoros":[ "-6:40 - LMT 1921_11_31_23_20 -6:40", "-6 - CST 1988 -6", "-6 US C%sT 1989 -6", "-6 Mexico C%sT 2010 -6", "-6 US C%sT" ],
"America/Mazatlan":[ "-7:5:40 - LMT 1921_11_31_23_54_20 -7:5:40", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 - CST 1942_3_24 -6", "-7 - MST 1949_0_14 -7", "-8 - PST 1970 -8", "-7 Mexico M%sT" ],
"America/Menominee":[ "-5:50:27 - LMT 1885_8_18_12 -5:50:27", "-6 US C%sT 1946 -6", "-6 Menominee C%sT 1969_3_27_2 -6", "-5 - EST 1973_3_29_2 -5", "-6 US C%sT" ],
"America/Merida":[ "-5:58:28 - LMT 1922_0_1_0_1_32 -5:58:28", "-6 - CST 1981_11_23 -6", "-5 - EST 1982_11_2 -5", "-6 Mexico C%sT" ],
"America/Metlakatla":[ "15:13:42 - LMT 1867_9_18 15:13:42", "-8:46:18 - LMT 1900_7_20_12 -8:46:18", "-8 - PST 1942 -8", "-8 US P%sT 1946 -8", "-8 - PST 1969 -8", "-8 US P%sT 1983_9_30_2 -7", "-8 - MeST" ],
"America/Mexico_City":[ "-6:36:36 - LMT 1922_0_1_0_23_24 -6:36:36", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 Mexico C%sT 2001_8_30_02 -5", "-6 - CST 2002_1_20 -6", "-6 Mexico C%sT" ],
"America/Miquelon":[ "-3:44:40 - LMT 1911_4_15 -3:44:40", "-4 - AST 1980_4 -4", "-3 - PMST 1987 -3", "-3 Canada PM%sT" ],
"America/Moncton":[ "-4:19:8 - LMT 1883_11_9 -4:19:8", "-5 - EST 1902_5_15 -5", "-4 Canada A%sT 1933 -4", "-4 Moncton A%sT 1942 -4", "-4 Canada A%sT 1946 -4", "-4 Moncton A%sT 1973 -4", "-4 Canada A%sT 1993 -4", "-4 Moncton A%sT 2007 -4", "-4 Canada A%sT" ],
"America/Monterrey":[ "-6:41:16 - LMT 1921_11_31_23_18_44 -6:41:16", "-6 - CST 1988 -6", "-6 US C%sT 1989 -6", "-6 Mexico C%sT" ],
"America/Montevideo":[ "-3:44:44 - LMT 1898_5_28 -3:44:44", "-3:44:44 - MMT 1920_4_1 -3:44:44", "-3:30 Uruguay UY%sT 1942_11_14 -3:30", "-3 Uruguay UY%sT" ],
"America/Montreal":[ "-4:54:16 - LMT 1884 -4:54:16", "-5 Mont E%sT 1918 -5", "-5 Canada E%sT 1919 -5", "-5 Mont E%sT 1942_1_9_2 -5", "-5 Canada E%sT 1946 -5", "-5 Mont E%sT 1974 -5", "-5 Canada E%sT" ],
"America/Montserrat":[ "-4:8:52 - LMT 1911_6_1_0_1 -4:8:52", "-4 - AST" ],
"America/Nassau":[ "-5:9:30 - LMT 1912_2_2 -5:9:30", "-5 Bahamas E%sT 1976 -5", "-5 US E%sT" ],
"America/New_York":[ "-4:56:2 - LMT 1883_10_18_12_3_58 -4:56:2", "-5 US E%sT 1920 -5", "-5 NYC E%sT 1942 -5", "-5 US E%sT 1946 -5", "-5 NYC E%sT 1967 -5", "-5 US E%sT" ],
"America/Nipigon":[ "-5:53:4 - LMT 1895 -5:53:4", "-5 Canada E%sT 1940_8_29 -5", "-4 - EDT 1942_1_9_2 -5", "-5 Canada E%sT" ],
"America/Nome":[ "12:58:21 - LMT 1867_9_18 12:58:21", "-11:1:38 - LMT 1900_7_20_12 -11:1:38", "-11 - NST 1942 -11", "-11 US N%sT 1946 -11", "-11 - NST 1967_3 -11", "-11 - BST 1969 -11", "-11 US B%sT 1983_9_30_2 -10", "-9 US Y%sT 1983_10_30 -9", "-9 US AK%sT" ],
"America/Noronha":[ "-2:9:40 - LMT 1914 -2:9:40", "-2 Brazil FN%sT 1990_8_17 -2", "-2 - FNT 1999_8_30 -2", "-2 Brazil FN%sT 2000_9_15 -1", "-2 - FNT 2001_8_13 -2", "-2 Brazil FN%sT 2002_9_1 -2", "-2 - FNT" ],
"America/North_Dakota/Beulah":[ "-6:47:7 - LMT 1883_10_18_12_12_53 -6:47:7", "-7 US M%sT 2010_10_7_2 -6", "-6 US C%sT" ],
"America/North_Dakota/Center":[ "-6:45:12 - LMT 1883_10_18_12_14_48 -6:45:12", "-7 US M%sT 1992_9_25_02 -6", "-6 US C%sT" ],
"America/North_Dakota/New_Salem":[ "-6:45:39 - LMT 1883_10_18_12_14_21 -6:45:39", "-7 US M%sT 2003_9_26_02 -6", "-6 US C%sT" ],
"America/Ojinaga":[ "-6:57:40 - LMT 1922_0_1_0_2_20 -6:57:40", "-7 - MST 1927_5_10_23 -7", "-6 - CST 1930_10_15 -6", "-7 - MST 1931_4_1_23 -7", "-6 - CST 1931_9 -6", "-7 - MST 1932_3_1 -7", "-6 - CST 1996 -6", "-6 Mexico C%sT 1998 -6", "-6 - CST 1998_3_5_3 -6", "-7 Mexico M%sT 2010 -7", "-7 US M%sT" ],
"America/Panama":[ "-5:18:8 - LMT 1890 -5:18:8", "-5:19:36 - CMT 1908_3_22 -5:19:36", "-5 - EST" ],
"America/Pangnirtung":[ "0 - zzz 1921", "-4 NT_YK A%sT 1995_3_2_2 -4", "-5 Canada E%sT 1999_9_31_2 -4", "-6 Canada C%sT 2000_9_29_2 -5", "-5 Canada E%sT" ],
"America/Paramaribo":[ "-3:40:40 - LMT 1911 -3:40:40", "-3:40:52 - PMT 1935 -3:40:52", "-3:40:36 - PMT 1945_9 -3:40:36", "-3:30 - NEGT 1975_10_20 -3:30", "-3:30 - SRT 1984_9 -3:30", "-3 - SRT" ],
"America/Phoenix":[ "-7:28:18 - LMT 1883_10_18_11_31_42 -7:28:18", "-7 US M%sT 1944_0_1_00_1 -6", "-7 - MST 1944_3_1_00_1 -7", "-7 US M%sT 1944_9_1_00_1 -6", "-7 - MST 1967 -7", "-7 US M%sT 1968_2_21 -7", "-7 - MST" ],
"America/Port-au-Prince":[ "-4:49:20 - LMT 1890 -4:49:20", "-4:49 - PPMT 1917_0_24_12 -4:49", "-5 Haiti E%sT" ],
"America/Port_of_Spain":[ "-4:6:4 - LMT 1912_2_2 -4:6:4", "-4 - AST" ],
"America/Porto_Velho":[ "-4:15:36 - LMT 1914 -4:15:36", "-4 Brazil AM%sT 1988_8_12 -4", "-4 - AMT" ],
"America/Puerto_Rico":[ "-4:24:25 - LMT 1899_2_28_12 -4:24:25", "-4 - AST 1942_4_3 -4", "-4 US A%sT 1946 -4", "-4 - AST" ],
"America/Rainy_River":[ "-6:18:16 - LMT 1895 -6:18:16", "-6 Canada C%sT 1940_8_29 -6", "-5 - CDT 1942_1_9_2 -6", "-6 Canada C%sT" ],
"America/Rankin_Inlet":[ "0 - zzz 1957", "-6 NT_YK C%sT 2000_9_29_2 -5", "-5 - EST 2001_3_1_3 -5", "-6 Canada C%sT" ],
"America/Recife":[ "-2:19:36 - LMT 1914 -2:19:36", "-3 Brazil BR%sT 1990_8_17 -3", "-3 - BRT 1999_8_30 -3", "-3 Brazil BR%sT 2000_9_15 -2", "-3 - BRT 2001_8_13 -3", "-3 Brazil BR%sT 2002_9_1 -3", "-3 - BRT" ],
"America/Regina":[ "-6:58:36 - LMT 1905_8 -6:58:36", "-7 Regina M%sT 1960_3_24_2 -7", "-6 - CST" ],
"America/Resolute":[ "0 - zzz 1947_7_31", "-6 NT_YK C%sT 2000_9_29_2 -5", "-5 - EST 2001_3_1_3 -5", "-6 Canada C%sT 2006_9_29_2 -5", "-5 - EST 2007_2_11_3 -5", "-6 Canada C%sT" ],
"America/Rio_Branco":[ "-4:31:12 - LMT 1914 -4:31:12", "-5 Brazil AC%sT 1988_8_12 -5", "-5 - ACT 2008_5_24_00 -5", "-4 - AMT" ],
"America/Santa_Isabel":[ "-7:39:28 - LMT 1922_0_1_0_20_32 -7:39:28", "-7 - MST 1924 -7", "-8 - PST 1927_5_10_23 -8", "-7 - MST 1930_10_15 -7", "-8 - PST 1931_3_1 -8", "-7 - PDT 1931_8_30 -7", "-8 - PST 1942_3_24 -8", "-7 - PWT 1945_7_14_23", "-7 - PPT 1945_10_12 -7", "-8 - PST 1948_3_5 -8", "-7 - PDT 1949_0_14 -7", "-8 - PST 1954 -8", "-8 CA P%sT 1961 -8", "-8 - PST 1976 -8", "-8 US P%sT 1996 -8", "-8 Mexico P%sT 2001 -8", "-8 US P%sT 2002_1_20 -8", "-8 Mexico P%sT" ],
"America/Santarem":[ "-3:38:48 - LMT 1914 -3:38:48", "-4 Brazil AM%sT 1988_8_12 -4", "-4 - AMT 2008_5_24_00 -4", "-3 - BRT" ],
"America/Santiago":[ "-4:42:46 - LMT 1890 -4:42:46", "-4:42:46 - SMT 1910 -4:42:46", "-5 - CLT 1916_6_1 -5", "-4:42:46 - SMT 1918_8_1 -4:42:46", "-4 - CLT 1919_6_1 -4", "-4:42:46 - SMT 1927_8_1 -4:42:46", "-5 Chile CL%sT 1947_4_22 -5", "-4 Chile CL%sT" ],
"America/Santo_Domingo":[ "-4:39:36 - LMT 1890 -4:39:36", "-4:40 - SDMT 1933_3_1_12 -4:40", "-5 DR E%sT 1974_9_27 -5", "-4 - AST 2000_9_29_02 -4", "-5 US E%sT 2000_11_3_01 -5", "-4 - AST" ],
"America/Sao_Paulo":[ "-3:6:28 - LMT 1914 -3:6:28", "-3 Brazil BR%sT 1963_9_23_00 -3", "-2 - BRST 1964 -2", "-3 Brazil BR%sT" ],
"America/Scoresbysund":[ "-1:27:52 - LMT 1916_6_28 -1:27:52", "-2 - CGT 1980_3_6_2 -2", "-2 C-Eur CG%sT 1981_2_29 -2", "-1 EU EG%sT" ],
"America/Sitka":[ "14:58:47 - LMT 1867_9_18 14:58:47", "-9:1:13 - LMT 1900_7_20_12 -9:1:13", "-8 - PST 1942 -8", "-8 US P%sT 1946 -8", "-8 - PST 1969 -8", "-8 US P%sT 1983_9_30_2 -7", "-9 US Y%sT 1983_10_30 -9", "-9 US AK%sT" ],
"America/St_Johns":[ "-3:30:52 - LMT 1884 -3:30:52", "-3:30:52 StJohns N%sT 1918 -3:30:52", "-3:30:52 Canada N%sT 1919 -3:30:52", "-3:30:52 StJohns N%sT 1935_2_30 -3:30:52", "-3:30 StJohns N%sT 1942_4_11 -3:30", "-3:30 Canada N%sT 1946 -3:30", "-3:30 StJohns N%sT 2011_10 -2:30", "-3:30 Canada N%sT" ],
"America/St_Kitts":[ "-4:10:52 - LMT 1912_2_2 -4:10:52", "-4 - AST" ],
"America/St_Lucia":[ "-4:4 - LMT 1890 -4:4", "-4:4 - CMT 1912 -4:4", "-4 - AST" ],
"America/St_Thomas":[ "-4:19:44 - LMT 1911_6 -4:19:44", "-4 - AST" ],
"America/St_Vincent":[ "-4:4:56 - LMT 1890 -4:4:56", "-4:4:56 - KMT 1912 -4:4:56", "-4 - AST" ],
"America/Swift_Current":[ "-7:11:20 - LMT 1905_8 -7:11:20", "-7 Canada M%sT 1946_3_28_2 -7", "-7 Regina M%sT 1950 -7", "-7 Swift M%sT 1972_3_30_2 -7", "-6 - CST" ],
"America/Tegucigalpa":[ "-5:48:52 - LMT 1921_3 -5:48:52", "-6 Hond C%sT" ],
"America/Thule":[ "-4:35:8 - LMT 1916_6_28 -4:35:8", "-4 Thule A%sT" ],
"America/Thunder_Bay":[ "-5:57 - LMT 1895 -5:57", "-6 - CST 1910 -6", "-5 - EST 1942 -5", "-5 Canada E%sT 1970 -5", "-5 Mont E%sT 1973 -5", "-5 - EST 1974 -5", "-5 Canada E%sT" ],
"America/Tijuana":[ "-7:48:4 - LMT 1922_0_1_0_11_56 -7:48:4", "-7 - MST 1924 -7", "-8 - PST 1927_5_10_23 -8", "-7 - MST 1930_10_15 -7", "-8 - PST 1931_3_1 -8", "-7 - PDT 1931_8_30 -7", "-8 - PST 1942_3_24 -8", "-7 - PWT 1945_7_14_23", "-7 - PPT 1945_10_12 -7", "-8 - PST 1948_3_5 -8", "-7 - PDT 1949_0_14 -7", "-8 - PST 1954 -8", "-8 CA P%sT 1961 -8", "-8 - PST 1976 -8", "-8 US P%sT 1996 -8", "-8 Mexico P%sT 2001 -8", "-8 US P%sT 2002_1_20 -8", "-8 Mexico P%sT 2010 -8", "-8 US P%sT" ],
"America/Toronto":[ "-5:17:32 - LMT 1895 -5:17:32", "-5 Canada E%sT 1919 -5", "-5 Toronto E%sT 1942_1_9_2 -5", "-5 Canada E%sT 1946 -5", "-5 Toronto E%sT 1974 -5", "-5 Canada E%sT" ],
"America/Tortola":[ "-4:18:28 - LMT 1911_6 -4:18:28", "-4 - AST" ],
"America/Vancouver":[ "-8:12:28 - LMT 1884 -8:12:28", "-8 Vanc P%sT 1987 -8", "-8 Canada P%sT" ],
"America/Whitehorse":[ "-9:0:12 - LMT 1900_7_20 -9:0:12", "-9 NT_YK Y%sT 1966_6_1_2 -9", "-8 NT_YK P%sT 1980 -8", "-8 Canada P%sT" ],
"America/Winnipeg":[ "-6:28:36 - LMT 1887_6_16 -6:28:36", "-6 Winn C%sT 2006 -6", "-6 Canada C%sT" ],
"America/Yakutat":[ "14:41:5 - LMT 1867_9_18 14:41:5", "-9:18:55 - LMT 1900_7_20_12 -9:18:55", "-9 - YST 1942 -9", "-9 US Y%sT 1946 -9", "-9 - YST 1969 -9", "-9 US Y%sT 1983_10_30 -9", "-9 US AK%sT" ],
"America/Yellowknife":[ "0 - zzz 1935", "-7 NT_YK M%sT 1980 -7", "-7 Canada M%sT" ],
"Antarctica/Casey":[ "0 - zzz 1969", "8 - WST 2009_9_18_2 8", "11 - CAST 2010_2_5_2 11", "8 - WST 2011_9_28_2 8", "11 - CAST 2012_1_21_17", "8 - WST" ],
"Antarctica/Davis":[ "0 - zzz 1957_0_13", "7 - DAVT 1964_10 7", "0 - zzz 1969_1", "7 - DAVT 2009_9_18_2 7", "5 - DAVT 2010_2_10_20", "7 - DAVT 2011_9_28_2 7", "5 - DAVT 2012_1_21_20", "7 - DAVT" ],
"Antarctica/DumontDUrville":[ "0 - zzz 1947", "10 - PMT 1952_0_14 10", "0 - zzz 1956_10", "10 - DDUT" ],
"Antarctica/Macquarie":[ "0 - zzz 1899_10", "10 - EST 1916_9_1_2 10", "11 - EST 1917_1 11", "10 Aus EST 1919_3 10", "0 - zzz 1948_2_25", "10 Aus EST 1967 10", "10 AT EST 2010_3_4_3 11", "11 - MIST" ],
"Antarctica/Mawson":[ "0 - zzz 1954_1_13", "6 - MAWT 2009_9_18_2 6", "5 - MAWT" ],
"Antarctica/McMurdo":[ "0 - zzz 1956", "12 NZAQ NZ%sT" ],
"Antarctica/Palmer":[ "0 - zzz 1965", "-4 ArgAQ AR%sT 1969_9_5 -4", "-3 ArgAQ AR%sT 1982_4 -3", "-4 ChileAQ CL%sT" ],
"Antarctica/Rothera":[ "0 - zzz 1976_11_1", "-3 - ROTT" ],
"Antarctica/Syowa":[ "0 - zzz 1957_0_29", "3 - SYOT" ],
"Antarctica/Vostok":[ "0 - zzz 1957_11_16", "6 - VOST" ],
"Europe/Oslo":[ "0:43 - LMT 1895_0_1 0:43", "1 Norway CE%sT 1940_7_10_23 1", "1 C-Eur CE%sT 1945_3_2_2 1", "1 Norway CE%sT 1980 1", "1 EU CE%sT" ],
"Asia/Aden":[ "2:59:54 - LMT 1950 2:59:54", "3 - AST" ],
"Asia/Almaty":[ "5:7:48 - LMT 1924_4_2 5:7:48", "5 - ALMT 1930_5_21 5", "6 RussiaAsia ALM%sT 1991 6", "6 - ALMT 1992 6", "6 RussiaAsia ALM%sT 2005_2_15 6", "6 - ALMT" ],
"Asia/Amman":[ "2:23:44 - LMT 1931 2:23:44", "2 Jordan EE%sT" ],
"Asia/Anadyr":[ "11:49:56 - LMT 1924_4_2 11:49:56", "12 - ANAT 1930_5_21 12", "13 Russia ANA%sT 1982_3_1_0 13", "12 Russia ANA%sT 1991_2_31_2 12", "11 Russia ANA%sT 1992_0_19_2 11", "12 Russia ANA%sT 2010_2_28_2 12", "11 Russia ANA%sT 2011_2_27_2 11", "12 - ANAT" ],
"Asia/Aqtau":[ "3:21:4 - LMT 1924_4_2 3:21:4", "4 - FORT 1930_5_21 4", "5 - FORT 1963 5", "5 - SHET 1981_9_1 5", "6 - SHET 1982_3_1 6", "5 RussiaAsia SHE%sT 1991 5", "5 - SHET 1991_11_16 5", "5 RussiaAsia AQT%sT 1995_2_26_2 5", "4 RussiaAsia AQT%sT 2005_2_15 4", "5 - AQTT" ],
"Asia/Aqtobe":[ "3:48:40 - LMT 1924_4_2 3:48:40", "4 - AKTT 1930_5_21 4", "5 - AKTT 1981_3_1 5", "6 - AKTST 1981_9_1 6", "6 - AKTT 1982_3_1 6", "5 RussiaAsia AKT%sT 1991 5", "5 - AKTT 1991_11_16 5", "5 RussiaAsia AQT%sT 2005_2_15 5", "5 - AQTT" ],
"Asia/Ashgabat":[ "3:53:32 - LMT 1924_4_2 3:53:32", "4 - ASHT 1930_5_21 4", "5 RussiaAsia ASH%sT 1991_2_31_2 5", "4 RussiaAsia ASH%sT 1991_9_27 4", "4 RussiaAsia TM%sT 1992_0_19_2 4", "5 - TMT" ],
"Asia/Baghdad":[ "2:57:40 - LMT 1890 2:57:40", "2:57:36 - BMT 1918 2:57:36", "3 - AST 1982_4 3", "3 Iraq A%sT" ],
"Asia/Bahrain":[ "3:22:20 - LMT 1920 3:22:20", "4 - GST 1972_5 4", "3 - AST" ],
"Asia/Baku":[ "3:19:24 - LMT 1924_4_2 3:19:24", "3 - BAKT 1957_2 3", "4 RussiaAsia BAK%sT 1991_2_31_2 4", "4 - BAKST 1991_7_30 4", "3 RussiaAsia AZ%sT 1992_8_26_23 4", "4 - AZT 1996 4", "4 EUAsia AZ%sT 1997 4", "4 Azer AZ%sT" ],
"Asia/Bangkok":[ "6:42:4 - LMT 1880 6:42:4", "6:42:4 - BMT 1920_3 6:42:4", "7 - ICT" ],
"Asia/Beirut":[ "2:22 - LMT 1880 2:22", "2 Lebanon EE%sT" ],
"Asia/Bishkek":[ "4:58:24 - LMT 1924_4_2 4:58:24", "5 - FRUT 1930_5_21 5", "6 RussiaAsia FRU%sT 1991_2_31_2 6", "6 - FRUST 1991_7_31_2 6", "5 Kyrgyz KG%sT 2005_7_12 6", "6 - KGT" ],
"Asia/Brunei":[ "7:39:40 - LMT 1926_2 7:39:40", "7:30 - BNT 1933 7:30", "8 - BNT" ],
"Asia/Choibalsan":[ "7:38 - LMT 1905_7 7:38", "7 - ULAT 1978 7", "8 - ULAT 1983_3 8", "9 Mongol CHO%sT 2008_2_31 9", "8 Mongol CHO%sT" ],
"Asia/Chongqing":[ "7:6:20 - LMT 1928 7:6:20", "7 - LONT 1980_4 7", "8 PRC C%sT" ],
"Asia/Colombo":[ "5:19:24 - LMT 1880 5:19:24", "5:19:32 - MMT 1906 5:19:32", "5:30 - IST 1942_0_5 5:30", "6 - IHST 1942_8 6", "6:30 - IST 1945_9_16_2 6:30", "5:30 - IST 1996_4_25_0 5:30", "6:30 - LKT 1996_9_26_0_30 6:30", "6 - LKT 2006_3_15_0_30 6", "5:30 - IST" ],
"Asia/Damascus":[ "2:25:12 - LMT 1920 2:25:12", "2 Syria EE%sT" ],
"Asia/Dhaka":[ "6:1:40 - LMT 1890 6:1:40", "5:53:20 - HMT 1941_9 5:53:20", "6:30 - BURT 1942_4_15 6:30", "5:30 - IST 1942_8 5:30", "6:30 - BURT 1951_8_30 6:30", "6 - DACT 1971_2_26 6", "6 - BDT 2009 6", "6 Dhaka BD%sT" ],
"Asia/Dili":[ "8:22:20 - LMT 1912 8:22:20", "8 - TLT 1942_1_21_23 8", "9 - JST 1945_8_23 9", "9 - TLT 1976_4_3 9", "8 - CIT 2000_8_17_00 8", "9 - TLT" ],
"Asia/Dubai":[ "3:41:12 - LMT 1920 3:41:12", "4 - GST" ],
"Asia/Dushanbe":[ "4:35:12 - LMT 1924_4_2 4:35:12", "5 - DUST 1930_5_21 5", "6 RussiaAsia DUS%sT 1991_2_31_2 6", "6 - DUSST 1991_8_9_2 5", "5 - TJT" ],
"Asia/Gaza":[ "2:17:52 - LMT 1900_9 2:17:52", "2 Zion EET 1948_4_15 2", "2 EgyptAsia EE%sT 1967_5_5 3", "2 Zion I%sT 1996 2", "2 Jordan EE%sT 1999 2", "2 Palestine EE%sT 2008_7_29_0 3", "2 - EET 2008_8 2", "2 Palestine EE%sT 2010 2", "2 - EET 2010_2_27_0_1 2", "2 Palestine EE%sT 2011_7_1 3", "2 - EET 2012 2", "2 Palestine EE%sT" ],
"Asia/Harbin":[ "8:26:44 - LMT 1928 8:26:44", "8:30 - CHAT 1932_2 8:30", "8 - CST 1940 8", "9 - CHAT 1966_4 9", "8:30 - CHAT 1980_4 8:30", "8 PRC C%sT" ],
"Asia/Hebron":[ "2:20:23 - LMT 1900_9 2:20:23", "2 Zion EET 1948_4_15 2", "2 EgyptAsia EE%sT 1967_5_5 3", "2 Zion I%sT 1996 2", "2 Jordan EE%sT 1999 2", "2 Palestine EE%sT" ],
"Asia/Ho_Chi_Minh":[ "7:6:40 - LMT 1906_5_9 7:6:40", "7:6:20 - SMT 1911_2_11_0_1 7:6:20", "7 - ICT 1912_4 7", "8 - ICT 1931_4 8", "7 - ICT" ],
"Asia/Hong_Kong":[ "7:36:42 - LMT 1904_9_30 7:36:42", "8 HK HK%sT 1941_11_25 8", "9 - JST 1945_8_15 9", "8 HK HK%sT" ],
"Asia/Hovd":[ "6:6:36 - LMT 1905_7 6:6:36", "6 - HOVT 1978 6", "7 Mongol HOV%sT" ],
"Asia/Irkutsk":[ "6:57:20 - LMT 1880 6:57:20", "6:57:20 - IMT 1920_0_25 6:57:20", "7 - IRKT 1930_5_21 7", "8 Russia IRK%sT 1991_2_31_2 8", "7 Russia IRK%sT 1992_0_19_2 7", "8 Russia IRK%sT 2011_2_27_2 8", "9 - IRKT" ],
"Asia/Jakarta":[ "7:7:12 - LMT 1867_7_10 7:7:12", "7:7:12 - JMT 1923_11_31_23_47_12 7:7:12", "7:20 - JAVT 1932_10 7:20", "7:30 - WIT 1942_2_23 7:30", "9 - JST 1945_8_23 9", "7:30 - WIT 1948_4 7:30", "8 - WIT 1950_4 8", "7:30 - WIT 1964 7:30", "7 - WIT" ],
"Asia/Jayapura":[ "9:22:48 - LMT 1932_10 9:22:48", "9 - EIT 1944_8_1 9", "9:30 - CST 1964 9:30", "9 - EIT" ],
"Asia/Jerusalem":[ "2:20:56 - LMT 1880 2:20:56", "2:20:40 - JMT 1918 2:20:40", "2 Zion I%sT" ],
"Asia/Kabul":[ "4:36:48 - LMT 1890 4:36:48", "4 - AFT 1945 4", "4:30 - AFT" ],
"Asia/Kamchatka":[ "10:34:36 - LMT 1922_10_10 10:34:36", "11 - PETT 1930_5_21 11", "12 Russia PET%sT 1991_2_31_2 12", "11 Russia PET%sT 1992_0_19_2 11", "12 Russia PET%sT 2010_2_28_2 12", "11 Russia PET%sT 2011_2_27_2 11", "12 - PETT" ],
"Asia/Karachi":[ "4:28:12 - LMT 1907 4:28:12", "5:30 - IST 1942_8 5:30", "6:30 - IST 1945_9_15 6:30", "5:30 - IST 1951_8_30 5:30", "5 - KART 1971_2_26 5", "5 Pakistan PK%sT" ],
"Asia/Kashgar":[ "5:3:56 - LMT 1928 5:3:56", "5:30 - KAST 1940 5:30", "5 - KAST 1980_4 5", "8 PRC C%sT" ],
"Asia/Kathmandu":[ "5:41:16 - LMT 1920 5:41:16", "5:30 - IST 1986 5:30", "5:45 - NPT" ],
"Asia/Khandyga":[ "9:2:13 - LMT 1919_11_15 9:2:13", "8 - YAKT 1930_5_21 8", "9 Russia YAK%sT 1991_2_31_2 9", "8 Russia YAK%sT 1992_0_19_2 8", "9 Russia YAK%sT 2004 9", "10 Russia VLA%sT 2011_2_27_2 10", "11 - VLAT 2011_8_13_0 11", "10 - YAKT" ],
"Asia/Kolkata":[ "5:53:28 - LMT 1880 5:53:28", "5:53:20 - HMT 1941_9 5:53:20", "6:30 - BURT 1942_4_15 6:30", "5:30 - IST 1942_8 5:30", "6:30 - IST 1945_9_15 6:30", "5:30 - IST" ],
"Asia/Krasnoyarsk":[ "6:11:20 - LMT 1920_0_6 6:11:20", "6 - KRAT 1930_5_21 6", "7 Russia KRA%sT 1991_2_31_2 7", "6 Russia KRA%sT 1992_0_19_2 6", "7 Russia KRA%sT 2011_2_27_2 7", "8 - KRAT" ],
"Asia/Kuala_Lumpur":[ "6:46:46 - LMT 1901_0_1 6:46:46", "6:55:25 - SMT 1905_5_1 6:55:25", "7 - MALT 1933_0_1 7", "7:20 - MALST 1936_0_1 7:20", "7:20 - MALT 1941_8_1 7:20", "7:30 - MALT 1942_1_16 7:30", "9 - JST 1945_8_12 9", "7:30 - MALT 1982_0_1 7:30", "8 - MYT" ],
"Asia/Kuching":[ "7:21:20 - LMT 1926_2 7:21:20", "7:30 - BORT 1933 7:30", "8 NBorneo BOR%sT 1942_1_16 8", "9 - JST 1945_8_12 9", "8 - BORT 1982_0_1 8", "8 - MYT" ],
"Asia/Kuwait":[ "3:11:56 - LMT 1950 3:11:56", "3 - AST" ],
"Asia/Macau":[ "7:34:20 - LMT 1912 7:34:20", "8 Macau MO%sT 1999_11_20 8", "8 PRC C%sT" ],
"Asia/Magadan":[ "10:3:12 - LMT 1924_4_2 10:3:12", "10 - MAGT 1930_5_21 10", "11 Russia MAG%sT 1991_2_31_2 11", "10 Russia MAG%sT 1992_0_19_2 10", "11 Russia MAG%sT 2011_2_27_2 11", "12 - MAGT" ],
"Asia/Makassar":[ "7:57:36 - LMT 1920 7:57:36", "7:57:36 - MMT 1932_10 7:57:36", "8 - CIT 1942_1_9 8", "9 - JST 1945_8_23 9", "8 - CIT" ],
"Asia/Manila":[ "-15:56 - LMT 1844_11_31 -15:56", "8:4 - LMT 1899_4_11 8:4", "8 Phil PH%sT 1942_4 8", "9 - JST 1944_10 9", "8 Phil PH%sT" ],
"Asia/Muscat":[ "3:54:24 - LMT 1920 3:54:24", "4 - GST" ],
"Asia/Nicosia":[ "2:13:28 - LMT 1921_10_14 2:13:28", "2 Cyprus EE%sT 1998_8 3", "2 EUAsia EE%sT" ],
"Asia/Novokuznetsk":[ "5:48:48 - NMT 1920_0_6 5:48:48", "6 - KRAT 1930_5_21 6", "7 Russia KRA%sT 1991_2_31_2 7", "6 Russia KRA%sT 1992_0_19_2 6", "7 Russia KRA%sT 2010_2_28_2 7", "6 Russia NOV%sT 2011_2_27_2 6", "7 - NOVT" ],
"Asia/Novosibirsk":[ "5:31:40 - LMT 1919_11_14_6 5:31:40", "6 - NOVT 1930_5_21 6", "7 Russia NOV%sT 1991_2_31_2 7", "6 Russia NOV%sT 1992_0_19_2 6", "7 Russia NOV%sT 1993_4_23 8", "6 Russia NOV%sT 2011_2_27_2 6", "7 - NOVT" ],
"Asia/Omsk":[ "4:53:36 - LMT 1919_10_14 4:53:36", "5 - OMST 1930_5_21 5", "6 Russia OMS%sT 1991_2_31_2 6", "5 Russia OMS%sT 1992_0_19_2 5", "6 Russia OMS%sT 2011_2_27_2 6", "7 - OMST" ],
"Asia/Oral":[ "3:25:24 - LMT 1924_4_2 3:25:24", "4 - URAT 1930_5_21 4", "5 - URAT 1981_3_1 5", "6 - URAST 1981_9_1 6", "6 - URAT 1982_3_1 6", "5 RussiaAsia URA%sT 1989_2_26_2 5", "4 RussiaAsia URA%sT 1991 4", "4 - URAT 1991_11_16 4", "4 RussiaAsia ORA%sT 2005_2_15 4", "5 - ORAT" ],
"Asia/Phnom_Penh":[ "6:59:40 - LMT 1906_5_9 6:59:40", "7:6:20 - SMT 1911_2_11_0_1 7:6:20", "7 - ICT 1912_4 7", "8 - ICT 1931_4 8", "7 - ICT" ],
"Asia/Pontianak":[ "7:17:20 - LMT 1908_4 7:17:20", "7:17:20 - PMT 1932_10 7:17:20", "7:30 - WIT 1942_0_29 7:30", "9 - JST 1945_8_23 9", "7:30 - WIT 1948_4 7:30", "8 - WIT 1950_4 8", "7:30 - WIT 1964 7:30", "8 - CIT 1988_0_1 8", "7 - WIT" ],
"Asia/Pyongyang":[ "8:23 - LMT 1890 8:23", "8:30 - KST 1904_11 8:30", "9 - KST 1928 9", "8:30 - KST 1932 8:30", "9 - KST 1954_2_21 9", "8 - KST 1961_7_10 8", "9 - KST" ],
"Asia/Qatar":[ "3:26:8 - LMT 1920 3:26:8", "4 - GST 1972_5 4", "3 - AST" ],
"Asia/Qyzylorda":[ "4:21:52 - LMT 1924_4_2 4:21:52", "4 - KIZT 1930_5_21 4", "5 - KIZT 1981_3_1 5", "6 - KIZST 1981_9_1 6", "6 - KIZT 1982_3_1 6", "5 RussiaAsia KIZ%sT 1991 5", "5 - KIZT 1991_11_16 5", "5 - QYZT 1992_0_19_2 5", "6 RussiaAsia QYZ%sT 2005_2_15 6", "6 - QYZT" ],
"Asia/Rangoon":[ "6:24:40 - LMT 1880 6:24:40", "6:24:40 - RMT 1920 6:24:40", "6:30 - BURT 1942_4 6:30", "9 - JST 1945_4_3 9", "6:30 - MMT" ],
"Asia/Riyadh":[ "3:6:52 - LMT 1950 3:6:52", "3 - AST" ],
"Asia/Sakhalin":[ "9:30:48 - LMT 1905_7_23 9:30:48", "9 - CJT 1938 9", "9 - JST 1945_7_25 9", "11 Russia SAK%sT 1991_2_31_2 11", "10 Russia SAK%sT 1992_0_19_2 10", "11 Russia SAK%sT 1997_2_30_2 11", "10 Russia SAK%sT 2011_2_27_2 10", "11 - SAKT" ],
"Asia/Samarkand":[ "4:27:12 - LMT 1924_4_2 4:27:12", "4 - SAMT 1930_5_21 4", "5 - SAMT 1981_3_1 5", "6 - SAMST 1981_9_1 6", "6 - TAST 1982_3_1 6", "5 RussiaAsia SAM%sT 1991_8_1 6", "5 RussiaAsia UZ%sT 1992 5", "5 - UZT" ],
"Asia/Seoul":[ "8:27:52 - LMT 1890 8:27:52", "8:30 - KST 1904_11 8:30", "9 - KST 1928 9", "8:30 - KST 1932 8:30", "9 - KST 1954_2_21 9", "8 ROK K%sT 1961_7_10 8", "8:30 - KST 1968_9 8:30", "9 ROK K%sT" ],
"Asia/Shanghai":[ "8:5:57 - LMT 1928 8:5:57", "8 Shang C%sT 1949 8", "8 PRC C%sT" ],
"Asia/Singapore":[ "6:55:25 - LMT 1901_0_1 6:55:25", "6:55:25 - SMT 1905_5_1 6:55:25", "7 - MALT 1933_0_1 7", "7:20 - MALST 1936_0_1 7:20", "7:20 - MALT 1941_8_1 7:20", "7:30 - MALT 1942_1_16 7:30", "9 - JST 1945_8_12 9", "7:30 - MALT 1965_7_9 7:30", "7:30 - SGT 1982_0_1 7:30", "8 - SGT" ],
"Asia/Taipei":[ "8:6 - LMT 1896 8:6", "8 Taiwan C%sT" ],
"Asia/Tashkent":[ "4:37:12 - LMT 1924_4_2 4:37:12", "5 - TAST 1930_5_21 5", "6 RussiaAsia TAS%sT 1991_2_31_2 6", "5 RussiaAsia TAS%sT 1991_8_1 6", "5 RussiaAsia UZ%sT 1992 5", "5 - UZT" ],
"Asia/Tbilisi":[ "2:59:16 - LMT 1880 2:59:16", "2:59:16 - TBMT 1924_4_2 2:59:16", "3 - TBIT 1957_2 3", "4 RussiaAsia TBI%sT 1991_2_31_2 4", "4 - TBIST 1991_3_9 4", "3 RussiaAsia GE%sT 1992 3", "3 E-EurAsia GE%sT 1994_8_25 4", "4 E-EurAsia GE%sT 1996_9_27 5", "5 - GEST 1997_2_30 5", "4 E-EurAsia GE%sT 2004_5_27 5", "3 RussiaAsia GE%sT 2005_2_27_2 3", "4 - GET" ],
"Asia/Tehran":[ "3:25:44 - LMT 1916 3:25:44", "3:25:44 - TMT 1946 3:25:44", "3:30 - IRST 1977_10 3:30", "4 Iran IR%sT 1979 4", "3:30 Iran IR%sT" ],
"Asia/Thimphu":[ "5:58:36 - LMT 1947_7_15 5:58:36", "5:30 - IST 1987_9 5:30", "6 - BTT" ],
"Asia/Tokyo":[ "9:18:59 - LMT 1887_11_31_15", "9 - JST 1896 9", "9 - CJT 1938 9", "9 Japan J%sT" ],
"Asia/Ulaanbaatar":[ "7:7:32 - LMT 1905_7 7:7:32", "7 - ULAT 1978 7", "8 Mongol ULA%sT" ],
"Asia/Urumqi":[ "5:50:20 - LMT 1928 5:50:20", "6 - URUT 1980_4 6", "8 PRC C%sT" ],
"Asia/Ust-Nera":[ "9:32:54 - LMT 1919_11_15 9:32:54", "8 - YAKT 1930_5_21 8", "9 Russia YAKT 1981_3_1 9", "11 Russia MAG%sT 1991_2_31_2 11", "10 Russia MAG%sT 1992_0_19_2 10", "11 Russia MAG%sT 2011_2_27_2 11", "12 - MAGT 2011_8_13_0 12", "11 - VLAT" ],
"Asia/Vientiane":[ "6:50:24 - LMT 1906_5_9 6:50:24", "7:6:20 - SMT 1911_2_11_0_1 7:6:20", "7 - ICT 1912_4 7", "8 - ICT 1931_4 8", "7 - ICT" ],
"Asia/Vladivostok":[ "8:47:44 - LMT 1922_10_15 8:47:44", "9 - VLAT 1930_5_21 9", "10 Russia VLA%sT 1991_2_31_2 10", "9 Russia VLA%sST 1992_0_19_2 9", "10 Russia VLA%sT 2011_2_27_2 10", "11 - VLAT" ],
"Asia/Yakutsk":[ "8:38:40 - LMT 1919_11_15 8:38:40", "8 - YAKT 1930_5_21 8", "9 Russia YAK%sT 1991_2_31_2 9", "8 Russia YAK%sT 1992_0_19_2 8", "9 Russia YAK%sT 2011_2_27_2 9", "10 - YAKT" ],
"Asia/Yekaterinburg":[ "4:2:24 - LMT 1919_6_15_4 4:2:24", "4 - SVET 1930_5_21 4", "5 Russia SVE%sT 1991_2_31_2 5", "4 Russia SVE%sT 1992_0_19_2 4", "5 Russia YEK%sT 2011_2_27_2 5", "6 - YEKT" ],
"Asia/Yerevan":[ "2:58 - LMT 1924_4_2 2:58", "3 - YERT 1957_2 3", "4 RussiaAsia YER%sT 1991_2_31_2 4", "4 - YERST 1991_8_23 4", "3 RussiaAsia AM%sT 1995_8_24_2 3", "4 - AMT 1997 4", "4 RussiaAsia AM%sT 2012_2_25_2 4", "4 - AMT" ],
"Atlantic/Azores":[ "-1:42:40 - LMT 1884 -1:42:40", "-1:54:32 - HMT 1911_4_24 -1:54:32", "-2 Port AZO%sT 1966_3_3_2 -2", "-1 Port AZO%sT 1983_8_25_1 -1", "-1 W-Eur AZO%sT 1992_8_27_1 -1", "0 EU WE%sT 1993_2_28_1", "-1 EU AZO%sT" ],
"Atlantic/Bermuda":[ "-4:19:18 - LMT 1930_0_1_2 -4:19:18", "-4 - AST 1974_3_28_2 -4", "-4 Bahamas A%sT 1976 -4", "-4 US A%sT" ],
"Atlantic/Canary":[ "-1:1:36 - LMT 1922_2 -1:1:36", "-1 - CANT 1946_8_30_1 -1", "0 - WET 1980_3_6_0", "1 - WEST 1980_8_28_0", "0 EU WE%sT" ],
"Atlantic/Cape_Verde":[ "-1:34:4 - LMT 1907 -1:34:4", "-2 - CVT 1942_8 -2", "-1 - CVST 1945_9_15 -1", "-2 - CVT 1975_10_25_2 -2", "-1 - CVT" ],
"Atlantic/Faroe":[ "-0:27:4 - LMT 1908_0_11 -0:27:4", "0 - WET 1981", "0 EU WE%sT" ],
"Atlantic/Madeira":[ "-1:7:36 - LMT 1884 -1:7:36", "-1:7:36 - FMT 1911_4_24 -1:7:36", "-1 Port MAD%sT 1966_3_3_2 -1", "0 Port WE%sT 1983_8_25_1", "0 EU WE%sT" ],
"Atlantic/Reykjavik":[ "-1:27:24 - LMT 1837 -1:27:24", "-1:27:48 - RMT 1908 -1:27:48", "-1 Iceland IS%sT 1968_3_7_1 -1", "0 - GMT" ],
"Atlantic/South_Georgia":[ "-2:26:8 - LMT 1890 -2:26:8", "-2 - GST" ],
"Atlantic/St_Helena":[ "-0:22:48 - LMT 1890 -0:22:48", "-0:22:48 - JMT 1951 -0:22:48", "0 - GMT" ],
"Atlantic/Stanley":[ "-3:51:24 - LMT 1890 -3:51:24", "-3:51:24 - SMT 1912_2_12 -3:51:24", "-4 Falk FK%sT 1983_4 -4", "-3 Falk FK%sT 1985_8_15 -3", "-4 Falk FK%sT 2010_8_5_02 -4", "-3 - FKST" ],
"Australia/Adelaide":[ "9:14:20 - LMT 1895_1 9:14:20", "9 - CST 1899_4 9", "9:30 Aus CST 1971 9:30", "9:30 AS CST" ],
"Australia/Brisbane":[ "10:12:8 - LMT 1895 10:12:8", "10 Aus EST 1971 10", "10 AQ EST" ],
"Australia/Broken_Hill":[ "9:25:48 - LMT 1895_1 9:25:48", "10 - EST 1896_7_23 10", "9 - CST 1899_4 9", "9:30 Aus CST 1971 9:30", "9:30 AN CST 2000 10:30", "9:30 AS CST" ],
"Australia/Currie":[ "9:35:28 - LMT 1895_8 9:35:28", "10 - EST 1916_9_1_2 10", "11 - EST 1917_1 11", "10 Aus EST 1971_6 10", "10 AT EST" ],
"Australia/Darwin":[ "8:43:20 - LMT 1895_1 8:43:20", "9 - CST 1899_4 9", "9:30 Aus CST" ],
"Australia/Eucla":[ "8:35:28 - LMT 1895_11 8:35:28", "8:45 Aus CWST 1943_6 8:45", "8:45 AW CWST" ],
"Australia/Hobart":[ "9:49:16 - LMT 1895_8 9:49:16", "10 - EST 1916_9_1_2 10", "11 - EST 1917_1 11", "10 Aus EST 1967 10", "10 AT EST" ],
"Australia/Lindeman":[ "9:55:56 - LMT 1895 9:55:56", "10 Aus EST 1971 10", "10 AQ EST 1992_6 10", "10 Holiday EST" ],
"Australia/Lord_Howe":[ "10:36:20 - LMT 1895_1 10:36:20", "10 - EST 1981_2 10", "10:30 LH LHST" ],
"Australia/Melbourne":[ "9:39:52 - LMT 1895_1 9:39:52", "10 Aus EST 1971 10", "10 AV EST" ],
"Australia/Perth":[ "7:43:24 - LMT 1895_11 7:43:24", "8 Aus WST 1943_6 8", "8 AW WST" ],
"Australia/Sydney":[ "10:4:52 - LMT 1895_1 10:4:52", "10 Aus EST 1971 10", "10 AN EST" ],
CET:[ "1 C-Eur CE%sT" ],
CST6CDT:[ "-6 US C%sT" ],
EET:[ "2 EU EE%sT" ],
EST:[ "-5 - EST" ],
EST5EDT:[ "-5 US E%sT" ],
HST:[ "-10 - HST" ],
MET:[ "1 C-Eur ME%sT" ],
MST:[ "-7 - MST" ],
MST7MDT:[ "-7 US M%sT" ],
PST8PDT:[ "-8 US P%sT" ],
WET:[ "0 EU WE%sT" ],
"Europe/Amsterdam":[ "0:19:32 - LMT 1835 0:19:32", "0:19:32 Neth %s 1937_6_1 1:19:32", "0:20 Neth NE%sT 1940_4_16_0 0:20", "1 C-Eur CE%sT 1945_3_2_2 1", "1 Neth CE%sT 1977 1", "1 EU CE%sT" ],
"Europe/Andorra":[ "0:6:4 - LMT 1901 0:6:4", "0 - WET 1946_8_30", "1 - CET 1985_2_31_2 1", "1 EU CE%sT" ],
"Europe/Athens":[ "1:34:52 - LMT 1895_8_14 1:34:52", "1:34:52 - AMT 1916_6_28_0_1 1:34:52", "2 Greece EE%sT 1941_3_30 3", "1 Greece CE%sT 1944_3_4 1", "2 Greece EE%sT 1981 2", "2 EU EE%sT" ],
"Europe/Belgrade":[ "1:22 - LMT 1884 1:22", "1 - CET 1941_3_18_23 1", "1 C-Eur CE%sT 1945 1", "1 - CET 1945_4_8_2 1", "2 - CEST 1945_8_16_2 1", "1 - CET 1982_10_27 1", "1 EU CE%sT" ],
"Europe/Berlin":[ "0:53:28 - LMT 1893_3 0:53:28", "1 C-Eur CE%sT 1945_4_24_2 2", "1 SovietZone CE%sT 1946 1", "1 Germany CE%sT 1980 1", "1 EU CE%sT" ],
"Europe/Prague":[ "0:57:44 - LMT 1850 0:57:44", "0:57:44 - PMT 1891_9 0:57:44", "1 C-Eur CE%sT 1944_8_17_2 1", "1 Czech CE%sT 1979 1", "1 EU CE%sT" ],
"Europe/Brussels":[ "0:17:30 - LMT 1880 0:17:30", "0:17:30 - BMT 1892_4_1_12 0:17:30", "0 - WET 1914_10_8", "1 - CET 1916_4_1_0 1", "1 C-Eur CE%sT 1918_10_11_11", "0 Belgium WE%sT 1940_4_20_2", "1 C-Eur CE%sT 1944_8_3 2", "1 Belgium CE%sT 1977 1", "1 EU CE%sT" ],
"Europe/Bucharest":[ "1:44:24 - LMT 1891_9 1:44:24", "1:44:24 - BMT 1931_6_24 1:44:24", "2 Romania EE%sT 1981_2_29_2 2", "2 C-Eur EE%sT 1991 2", "2 Romania EE%sT 1994 2", "2 E-Eur EE%sT 1997 2", "2 EU EE%sT" ],
"Europe/Budapest":[ "1:16:20 - LMT 1890_9 1:16:20", "1 C-Eur CE%sT 1918 1", "1 Hungary CE%sT 1941_3_6_2 1", "1 C-Eur CE%sT 1945 1", "1 Hungary CE%sT 1980_8_28_2 1", "1 EU CE%sT" ],
"Europe/Zurich":[ "0:34:8 - LMT 1848_8_12 0:34:8", "0:29:44 - BMT 1894_5 0:29:44", "1 Swiss CE%sT 1981 1", "1 EU CE%sT" ],
"Europe/Chisinau":[ "1:55:20 - LMT 1880 1:55:20", "1:55 - CMT 1918_1_15 1:55", "1:44:24 - BMT 1931_6_24 1:44:24", "2 Romania EE%sT 1940_7_15 2", "3 - EEST 1941_6_17 3", "1 C-Eur CE%sT 1944_7_24 2", "3 Russia MSK/MSD 1990 3", "3 - MSK 1990_4_6 3", "2 - EET 1991 2", "2 Russia EE%sT 1992 2", "2 E-Eur EE%sT 1997 2", "2 EU EE%sT" ],
"Europe/Copenhagen":[ "0:50:20 - LMT 1890 0:50:20", "0:50:20 - CMT 1894_0_1 0:50:20", "1 Denmark CE%sT 1942_10_2_2 1", "1 C-Eur CE%sT 1945_3_2_2 1", "1 Denmark CE%sT 1980 1", "1 EU CE%sT" ],
"Europe/Dublin":[ "-0:25 - LMT 1880_7_2 -0:25", "-0:25:21 - DMT 1916_4_21_2 -0:25:21", "0:34:39 - IST 1916_9_1_2 -0:25:21", "0 GB-Eire %s 1921_11_6", "0 GB-Eire GMT/IST 1940_1_25_2", "1 - IST 1946_9_6_2 1", "0 - GMT 1947_2_16_2", "1 - IST 1947_10_2_2 1", "0 - GMT 1948_3_18_2", "0 GB-Eire GMT/IST 1968_9_27 1", "1 - IST 1971_9_31_2", "0 GB-Eire GMT/IST 1996", "0 EU GMT/IST" ],
"Europe/Gibraltar":[ "-0:21:24 - LMT 1880_7_2_0 -0:21:24", "0 GB-Eire %s 1957_3_14_2", "1 - CET 1982 1", "1 EU CE%sT" ],
"Europe/London":[ "-0:1:15 - LMT 1847_11_1_0 -0:1:15", "0 GB-Eire %s 1968_9_27 1", "1 - BST 1971_9_31_2", "0 GB-Eire %s 1996", "0 EU GMT/BST" ],
"Europe/Helsinki":[ "1:39:52 - LMT 1878_4_31 1:39:52", "1:39:52 - HMT 1921_4 1:39:52", "2 Finland EE%sT 1983 2", "2 EU EE%sT" ],
"Europe/Istanbul":[ "1:55:52 - LMT 1880 1:55:52", "1:56:56 - IMT 1910_9 1:56:56", "2 Turkey EE%sT 1978_9_15 3", "3 Turkey TR%sT 1985_3_20 3", "2 Turkey EE%sT 2007 2", "2 EU EE%sT 2011_2_27_1", "2 - EET 2011_2_28_1", "2 EU EE%sT" ],
"Europe/Kaliningrad":[ "1:22 - LMT 1893_3 1:22", "1 C-Eur CE%sT 1945 1", "2 Poland CE%sT 1946 2", "3 Russia MSK/MSD 1991_2_31_2 3", "2 Russia EE%sT 2011_2_27_2 2", "3 - FET" ],
"Europe/Kiev":[ "2:2:4 - LMT 1880 2:2:4", "2:2:4 - KMT 1924_4_2 2:2:4", "2 - EET 1930_5_21 2", "3 - MSK 1941_8_20 3", "1 C-Eur CE%sT 1943_10_6 1", "3 Russia MSK/MSD 1990 3", "3 - MSK 1990_6_1_2 3", "2 - EET 1992 2", "2 E-Eur EE%sT 1995 2", "2 EU EE%sT" ],
"Europe/Lisbon":[ "-0:36:32 - LMT 1884 -0:36:32", "-0:36:32 - LMT 1912_0_1 -0:36:32", "0 Port WE%sT 1966_3_3_2", "1 - CET 1976_8_26_1 1", "0 Port WE%sT 1983_8_25_1", "0 W-Eur WE%sT 1992_8_27_1", "1 EU CE%sT 1996_2_31_1", "0 EU WE%sT" ],
"Europe/Luxembourg":[ "0:24:36 - LMT 1904_5 0:24:36", "1 Lux CE%sT 1918_10_25 1", "0 Lux WE%sT 1929_9_6_2", "0 Belgium WE%sT 1940_4_14_3 1", "1 C-Eur WE%sT 1944_8_18_3 2", "1 Belgium CE%sT 1977 1", "1 EU CE%sT" ],
"Europe/Madrid":[ "-0:14:44 - LMT 1901_0_1_0 -0:14:44", "0 Spain WE%sT 1946_8_30 2", "1 Spain CE%sT 1979 1", "1 EU CE%sT" ],
"Europe/Malta":[ "0:58:4 - LMT 1893_10_2_0 0:58:4", "1 Italy CE%sT 1942_10_2_2 1", "1 C-Eur CE%sT 1945_3_2_2 1", "1 Italy CE%sT 1973_2_31 1", "1 Malta CE%sT 1981 1", "1 EU CE%sT" ],
"Europe/Minsk":[ "1:50:16 - LMT 1880 1:50:16", "1:50 - MMT 1924_4_2 1:50", "2 - EET 1930_5_21 2", "3 - MSK 1941_5_28 3", "1 C-Eur CE%sT 1944_6_3 2", "3 Russia MSK/MSD 1990 3", "3 - MSK 1991_2_31_2 3", "3 - EEST 1991_8_29_2 2", "2 - EET 1992_2_29_0 2", "3 - EEST 1992_8_27_0 2", "2 Russia EE%sT 2011_2_27_2 2", "3 - FET" ],
"Europe/Monaco":[ "0:29:32 - LMT 1891_2_15 0:29:32", "0:9:21 - PMT 1911_2_11 0:9:21", "0 France WE%sT 1945_8_16_3 2", "1 France CE%sT 1977 1", "1 EU CE%sT" ],
"Europe/Moscow":[ "2:30:20 - LMT 1880 2:30:20", "2:30 - MMT 1916_6_3 2:30", "2:30:48 Russia %s 1919_6_1_2 4:30:48", "3 Russia MSK/MSD 1922_9 3", "2 - EET 1930_5_21 2", "3 Russia MSK/MSD 1991_2_31_2 3", "2 Russia EE%sT 1992_0_19_2 2", "3 Russia MSK/MSD 2011_2_27_2 3", "4 - MSK" ],
"Europe/Paris":[ "0:9:21 - LMT 1891_2_15_0_1 0:9:21", "0:9:21 - PMT 1911_2_11_0_1 0:9:21", "0 France WE%sT 1940_5_14_23 1", "1 C-Eur CE%sT 1944_7_25 2", "0 France WE%sT 1945_8_16_3 2", "1 France CE%sT 1977 1", "1 EU CE%sT" ],
"Europe/Riga":[ "1:36:24 - LMT 1880 1:36:24", "1:36:24 - RMT 1918_3_15_2 1:36:24", "2:36:24 - LST 1918_8_16_3 2:36:24", "1:36:24 - RMT 1919_3_1_2 1:36:24", "2:36:24 - LST 1919_4_22_3 2:36:24", "1:36:24 - RMT 1926_4_11 1:36:24", "2 - EET 1940_7_5 2", "3 - MSK 1941_6 3", "1 C-Eur CE%sT 1944_9_13 1", "3 Russia MSK/MSD 1989_2_26_2 3", "3 - EEST 1989_8_24_2 2", "2 Latvia EE%sT 1997_0_21 2", "2 EU EE%sT 2000_1_29 2", "2 - EET 2001_0_2 2", "2 EU EE%sT" ],
"Europe/Rome":[ "0:49:56 - LMT 1866_8_22 0:49:56", "0:49:56 - RMT 1893_10_1_0 0:49:56", "1 Italy CE%sT 1942_10_2_2 1", "1 C-Eur CE%sT 1944_6 2", "1 Italy CE%sT 1980 1", "1 EU CE%sT" ],
"Europe/Samara":[ "3:20:36 - LMT 1919_6_1_2 3:20:36", "3 - SAMT 1930_5_21 3", "4 - SAMT 1935_0_27 4", "4 Russia KUY%sT 1989_2_26_2 4", "3 Russia KUY%sT 1991_2_31_2 3", "2 Russia KUY%sT 1991_8_29_2 2", "3 - KUYT 1991_9_20_3 3", "4 Russia SAM%sT 2010_2_28_2 4", "3 Russia SAM%sT 2011_2_27_2 3", "4 - SAMT" ],
"Europe/Simferopol":[ "2:16:24 - LMT 1880 2:16:24", "2:16 - SMT 1924_4_2 2:16", "2 - EET 1930_5_21 2", "3 - MSK 1941_10 3", "1 C-Eur CE%sT 1944_3_13 2", "3 Russia MSK/MSD 1990 3", "3 - MSK 1990_6_1_2 3", "2 - EET 1992 2", "2 E-Eur EE%sT 1994_4 3", "3 E-Eur MSK/MSD 1996_2_31_3 3", "4 - MSD 1996_9_27_3 3", "3 Russia MSK/MSD 1997 3", "3 - MSK 1997_2_30_1", "2 EU EE%sT" ],
"Europe/Sofia":[ "1:33:16 - LMT 1880 1:33:16", "1:56:56 - IMT 1894_10_30 1:56:56", "2 - EET 1942_10_2_3 2", "1 C-Eur CE%sT 1945 1", "1 - CET 1945_3_2_3 1", "2 - EET 1979_2_31_23 2", "2 Bulg EE%sT 1982_8_26_2 3", "2 C-Eur EE%sT 1991 2", "2 E-Eur EE%sT 1997 2", "2 EU EE%sT" ],
"Europe/Stockholm":[ "1:12:12 - LMT 1879_0_1 1:12:12", "1:0:14 - SET 1900_0_1 1:0:14", "1 - CET 1916_4_14_23 1", "2 - CEST 1916_9_1_01 2", "1 - CET 1980 1", "1 EU CE%sT" ],
"Europe/Tallinn":[ "1:39 - LMT 1880 1:39", "1:39 - TMT 1918_1 1:39", "1 C-Eur CE%sT 1919_6 1", "1:39 - TMT 1921_4 1:39", "2 - EET 1940_7_6 2", "3 - MSK 1941_8_15 3", "1 C-Eur CE%sT 1944_8_22 2", "3 Russia MSK/MSD 1989_2_26_2 3", "3 - EEST 1989_8_24_2 2", "2 C-Eur EE%sT 1998_8_22 3", "2 EU EE%sT 1999_10_1 3", "2 - EET 2002_1_21 2", "2 EU EE%sT" ],
"Europe/Tirane":[ "1:19:20 - LMT 1914 1:19:20", "1 - CET 1940_5_16 1", "1 Albania CE%sT 1984_6 2", "1 EU CE%sT" ],
"Europe/Uzhgorod":[ "1:29:12 - LMT 1890_9 1:29:12", "1 - CET 1940 1", "1 C-Eur CE%sT 1944_9 2", "2 - CEST 1944_9_26 2", "1 - CET 1945_5_29 1", "3 Russia MSK/MSD 1990 3", "3 - MSK 1990_6_1_2 3", "1 - CET 1991_2_31_3 1", "2 - EET 1992 2", "2 E-Eur EE%sT 1995 2", "2 EU EE%sT" ],
"Europe/Vaduz":[ "0:38:4 - LMT 1894_5 0:38:4", "1 - CET 1981 1", "1 EU CE%sT" ],
"Europe/Vienna":[ "1:5:21 - LMT 1893_3 1:5:21", "1 C-Eur CE%sT 1920 1", "1 Austria CE%sT 1940_3_1_2 1", "1 C-Eur CE%sT 1945_3_2_2 1", "2 - CEST 1945_3_12_2 1", "1 - CET 1946 1", "1 Austria CE%sT 1981 1", "1 EU CE%sT" ],
"Europe/Vilnius":[ "1:41:16 - LMT 1880 1:41:16", "1:24 - WMT 1917 1:24", "1:35:36 - KMT 1919_9_10 1:35:36", "1 - CET 1920_6_12 1", "2 - EET 1920_9_9 2", "1 - CET 1940_7_3 1", "3 - MSK 1941_5_24 3", "1 C-Eur CE%sT 1944_7 2", "3 Russia MSK/MSD 1991_2_31_2 3", "3 - EEST 1991_8_29_2 2", "2 C-Eur EE%sT 1998 2", "2 - EET 1998_2_29_1", "1 EU CE%sT 1999_9_31_1", "2 - EET 2003_0_1 2", "2 EU EE%sT" ],
"Europe/Volgograd":[ "2:57:40 - LMT 1920_0_3 2:57:40", "3 - TSAT 1925_3_6 3", "3 - STAT 1930_5_21 3", "4 - STAT 1961_10_11 4", "4 Russia VOL%sT 1989_2_26_2 4", "3 Russia VOL%sT 1991_2_31_2 3", "4 - VOLT 1992_2_29_2 4", "3 Russia VOL%sT 2011_2_27_2 3", "4 - VOLT" ],
"Europe/Warsaw":[ "1:24 - LMT 1880 1:24", "1:24 - WMT 1915_7_5 1:24", "1 C-Eur CE%sT 1918_8_16_3 2", "2 Poland EE%sT 1922_5 2", "1 Poland CE%sT 1940_5_23_2 1", "1 C-Eur CE%sT 1944_9 2", "1 Poland CE%sT 1977 1", "1 W-Eur CE%sT 1988 1", "1 EU CE%sT" ],
"Europe/Zaporozhye":[ "2:20:40 - LMT 1880 2:20:40", "2:20 - CUT 1924_4_2 2:20", "2 - EET 1930_5_21 2", "3 - MSK 1941_7_25 3", "1 C-Eur CE%sT 1943_9_25 1", "3 Russia MSK/MSD 1991_2_31_2 3", "2 E-Eur EE%sT 1995 2", "2 EU EE%sT" ],
"Indian/Antananarivo":[ "3:10:4 - LMT 1911_6 3:10:4", "3 - EAT 1954_1_27_23 3", "4 - EAST 1954_4_29_23 3", "3 - EAT" ],
"Indian/Chagos":[ "4:49:40 - LMT 1907 4:49:40", "5 - IOT 1996 5", "6 - IOT" ],
"Indian/Christmas":[ "7:2:52 - LMT 1895_1 7:2:52", "7 - CXT" ],
"Indian/Cocos":[ "6:27:40 - LMT 1900 6:27:40", "6:30 - CCT" ],
"Indian/Comoro":[ "2:53:4 - LMT 1911_6 2:53:4", "3 - EAT" ],
"Indian/Kerguelen":[ "0 - zzz 1950", "5 - TFT" ],
"Indian/Mahe":[ "3:41:48 - LMT 1906_5 3:41:48", "4 - SCT" ],
"Indian/Maldives":[ "4:54 - LMT 1880 4:54", "4:54 - MMT 1960 4:54", "5 - MVT" ],
"Indian/Mauritius":[ "3:50 - LMT 1907 3:50", "4 Mauritius MU%sT" ],
"Indian/Mayotte":[ "3:0:56 - LMT 1911_6 3:0:56", "3 - EAT" ],
"Indian/Reunion":[ "3:41:52 - LMT 1911_5 3:41:52", "4 - RET" ],
"Pacific/Apia":[ "12:33:4 - LMT 1879_6_5 12:33:4", "-11:26:56 - LMT 1911 -11:26:56", "-11:30 - SAMT 1950 -11:30", "-11 - WST 2010_8_26 -11", "-10 - WSDT 2011_3_2_4 -10", "-11 - WST 2011_8_24_3 -11", "-10 - WSDT 2011_11_30 -10", "14 - WSDT 2012_3_1_4 14", "13 WS WS%sT" ],
"Pacific/Auckland":[ "11:39:4 - LMT 1868_10_2 11:39:4", "11:30 NZ NZ%sT 1946_0_1 12", "12 NZ NZ%sT" ],
"Pacific/Chatham":[ "12:13:48 - LMT 1957_0_1 12:13:48", "12:45 Chatham CHA%sT" ],
"Pacific/Chuuk":[ "10:7:8 - LMT 1901 10:7:8", "10 - CHUT" ],
"Pacific/Easter":[ "-7:17:44 - LMT 1890 -7:17:44", "-7:17:28 - EMT 1932_8 -7:17:28", "-7 Chile EAS%sT 1982_2_13_21 -6", "-6 Chile EAS%sT" ],
"Pacific/Efate":[ "11:13:16 - LMT 1912_0_13 11:13:16", "11 Vanuatu VU%sT" ],
"Pacific/Enderbury":[ "-11:24:20 - LMT 1901 -11:24:20", "-12 - PHOT 1979_9 -12", "-11 - PHOT 1995 -11", "13 - PHOT" ],
"Pacific/Fakaofo":[ "-11:24:56 - LMT 1901 -11:24:56", "-11 - TKT 2011_11_30 -11", "13 - TKT" ],
"Pacific/Fiji":[ "11:55:44 - LMT 1915_9_26 11:55:44", "12 Fiji FJ%sT" ],
"Pacific/Funafuti":[ "11:56:52 - LMT 1901 11:56:52", "12 - TVT" ],
"Pacific/Galapagos":[ "-5:58:24 - LMT 1931 -5:58:24", "-5 - ECT 1986 -5", "-6 - GALT" ],
"Pacific/Gambier":[ "-8:59:48 - LMT 1912_9 -8:59:48", "-9 - GAMT" ],
"Pacific/Guadalcanal":[ "10:39:48 - LMT 1912_9 10:39:48", "11 - SBT" ],
"Pacific/Guam":[ "-14:21 - LMT 1844_11_31 -14:21", "9:39 - LMT 1901 9:39", "10 - GST 2000_11_23 10", "10 - ChST" ],
"Pacific/Honolulu":[ "-10:31:26 - LMT 1896_0_13_12 -10:31:26", "-10:30 - HST 1933_3_30_2 -10:30", "-9:30 - HDT 1933_4_21_12 -9:30", "-10:30 - HST 1942_1_09_2 -10:30", "-9:30 - HDT 1945_8_30_2 -9:30", "-10:30 - HST 1947_5_8_2 -10:30", "-10 - HST" ],
"Pacific/Johnston":[ "-10 - HST" ],
"Pacific/Kiritimati":[ "-10:29:20 - LMT 1901 -10:29:20", "-10:40 - LINT 1979_9 -10:40", "-10 - LINT 1995 -10", "14 - LINT" ],
"Pacific/Kosrae":[ "10:51:56 - LMT 1901 10:51:56", "11 - KOST 1969_9 11", "12 - KOST 1999 12", "11 - KOST" ],
"Pacific/Kwajalein":[ "11:9:20 - LMT 1901 11:9:20", "11 - MHT 1969_9 11", "-12 - KWAT 1993_7_20 -12", "12 - MHT" ],
"Pacific/Majuro":[ "11:24:48 - LMT 1901 11:24:48", "11 - MHT 1969_9 11", "12 - MHT" ],
"Pacific/Marquesas":[ "-9:18 - LMT 1912_9 -9:18", "-9:30 - MART" ],
"Pacific/Midway":[ "-11:49:28 - LMT 1901 -11:49:28", "-11 - NST 1956_5_3 -11", "-10 - NDT 1956_8_2 -10", "-11 - NST 1967_3 -11", "-11 - BST 1983_10_30 -11", "-11 - SST" ],
"Pacific/Nauru":[ "11:7:40 - LMT 1921_0_15 11:7:40", "11:30 - NRT 1942_2_15 11:30", "9 - JST 1944_7_15 9", "11:30 - NRT 1979_4 11:30", "12 - NRT" ],
"Pacific/Niue":[ "-11:19:40 - LMT 1901 -11:19:40", "-11:20 - NUT 1951 -11:20", "-11:30 - NUT 1978_9_1 -11:30", "-11 - NUT" ],
"Pacific/Norfolk":[ "11:11:52 - LMT 1901 11:11:52", "11:12 - NMT 1951 11:12", "11:30 - NFT" ],
"Pacific/Noumea":[ "11:5:48 - LMT 1912_0_13 11:5:48", "11 NC NC%sT" ],
"Pacific/Pago_Pago":[ "12:37:12 - LMT 1879_6_5 12:37:12", "-11:22:48 - LMT 1911 -11:22:48", "-11:30 - SAMT 1950 -11:30", "-11 - NST 1967_3 -11", "-11 - BST 1983_10_30 -11", "-11 - SST" ],
"Pacific/Palau":[ "8:57:56 - LMT 1901 8:57:56", "9 - PWT" ],
"Pacific/Pitcairn":[ "-8:40:20 - LMT 1901 -8:40:20", "-8:30 - PNT 1998_3_27_00 -8:30", "-8 - PST" ],
"Pacific/Pohnpei":[ "10:32:52 - LMT 1901 10:32:52", "11 - PONT" ],
"Pacific/Port_Moresby":[ "9:48:40 - LMT 1880 9:48:40", "9:48:32 - PMMT 1895 9:48:32", "10 - PGT" ],
"Pacific/Rarotonga":[ "-10:39:4 - LMT 1901 -10:39:4", "-10:30 - CKT 1978_10_12 -10:30", "-10 Cook CK%sT" ],
"Pacific/Saipan":[ "-14:17 - LMT 1844_11_31 -14:17", "9:43 - LMT 1901 9:43", "9 - MPT 1969_9 9", "10 - MPT 2000_11_23 10", "10 - ChST" ],
"Pacific/Tahiti":[ "-9:58:16 - LMT 1912_9 -9:58:16", "-10 - TAHT" ],
"Pacific/Tarawa":[ "11:32:4 - LMT 1901 11:32:4", "12 - GILT" ],
"Pacific/Tongatapu":[ "12:19:20 - LMT 1901 12:19:20", "12:20 - TOT 1941 12:20", "13 - TOT 1999 13", "13 Tonga TO%sT" ],
"Pacific/Wake":[ "11:6:28 - LMT 1901 11:6:28", "12 - WAKT" ],
"Pacific/Wallis":[ "12:15:20 - LMT 1901 12:15:20", "12 - WFT" ]
},
rules:{
Ghana:[ "1936 1942 8 1 7 0 0 0:20 GHST", "1936 1942 11 31 7 0 0 0 GMT" ],
Algeria:[ "1916 1916 5 14 7 23 2 1 S", "1916 1919 9 1 0 23 2 0", "1917 1917 2 24 7 23 2 1 S", "1918 1918 2 9 7 23 2 1 S", "1919 1919 2 1 7 23 2 1 S", "1920 1920 1 14 7 23 2 1 S", "1920 1920 9 23 7 23 2 0", "1921 1921 2 14 7 23 2 1 S", "1921 1921 5 21 7 23 2 0", "1939 1939 8 11 7 23 2 1 S", "1939 1939 10 19 7 1 0 0", "1944 1945 3 1 1 2 0 1 S", "1944 1944 9 8 7 2 0 0", "1945 1945 8 16 7 1 0 0", "1971 1971 3 25 7 23 2 1 S", "1971 1971 8 26 7 23 2 0", "1977 1977 4 6 7 0 0 1 S", "1977 1977 9 21 7 0 0 0", "1978 1978 2 24 7 1 0 1 S", "1978 1978 8 22 7 3 0 0", "1980 1980 3 25 7 0 0 1 S", "1980 1980 9 31 7 2 0 0" ],
Egypt:[ "1940 1940 6 15 7 0 0 1 S", "1940 1940 9 1 7 0 0 0", "1941 1941 3 15 7 0 0 1 S", "1941 1941 8 16 7 0 0 0", "1942 1944 3 1 7 0 0 1 S", "1942 1942 9 27 7 0 0 0", "1943 1945 10 1 7 0 0 0", "1945 1945 3 16 7 0 0 1 S", "1957 1957 4 10 7 0 0 1 S", "1957 1958 9 1 7 0 0 0", "1958 1958 4 1 7 0 0 1 S", "1959 1981 4 1 7 1 0 1 S", "1959 1965 8 30 7 3 0 0", "1966 1994 9 1 7 3 0 0", "1982 1982 6 25 7 1 0 1 S", "1983 1983 6 12 7 1 0 1 S", "1984 1988 4 1 7 1 0 1 S", "1989 1989 4 6 7 1 0 1 S", "1990 1994 4 1 7 1 0 1 S", "1995 2010 3 5 8 0 2 1 S", "1995 2005 8 4 8 23 2 0", "2006 2006 8 21 7 23 2 0", "2007 2007 8 1 4 23 2 0", "2008 2008 7 4 8 23 2 0", "2009 2009 7 20 7 23 2 0", "2010 2010 7 11 7 0 0 0", "2010 2010 8 10 7 0 0 1 S", "2010 2010 8 4 8 23 2 0" ],
Morocco:[ "1939 1939 8 12 7 0 0 1 S", "1939 1939 10 19 7 0 0 0", "1940 1940 1 25 7 0 0 1 S", "1945 1945 10 18 7 0 0 0", "1950 1950 5 11 7 0 0 1 S", "1950 1950 9 29 7 0 0 0", "1967 1967 5 3 7 12 0 1 S", "1967 1967 9 1 7 0 0 0", "1974 1974 5 24 7 0 0 1 S", "1974 1974 8 1 7 0 0 0", "1976 1977 4 1 7 0 0 1 S", "1976 1976 7 1 7 0 0 0", "1977 1977 8 28 7 0 0 0", "1978 1978 5 1 7 0 0 1 S", "1978 1978 7 4 7 0 0 0", "2008 2008 5 1 7 0 0 1 S", "2008 2008 8 1 7 0 0 0", "2009 2009 5 1 7 0 0 1 S", "2009 2009 7 21 7 0 0 0", "2010 2010 4 2 7 0 0 1 S", "2010 2010 7 8 7 0 0 0", "2011 2011 3 3 7 0 0 1 S", "2011 2011 6 31 7 0 0 0", "2012 2019 3 0 8 2 0 1 S", "2012 9999 8 0 8 3 0 0", "2012 2012 6 20 7 3 0 0", "2012 2012 7 20 7 2 0 1 S", "2013 2013 6 9 7 3 0 0", "2013 2013 7 8 7 2 0 1 S", "2014 2014 5 29 7 3 0 0", "2014 2014 6 29 7 2 0 1 S", "2015 2015 5 18 7 3 0 0", "2015 2015 6 18 7 2 0 1 S", "2016 2016 5 7 7 3 0 0", "2016 2016 6 7 7 2 0 1 S", "2017 2017 4 27 7 3 0 0", "2017 2017 5 26 7 2 0 1 S", "2018 2018 4 16 7 3 0 0", "2018 2018 5 15 7 2 0 1 S", "2019 2019 4 6 7 3 0 0", "2019 2019 5 5 7 2 0 1 S", "2020 2020 4 24 7 2 0 1 S", "2021 2021 4 13 7 2 0 1 S", "2022 2022 4 3 7 2 0 1 S", "2023 9999 3 0 8 2 0 1 S" ],
Spain:[ "1917 1917 4 5 7 23 2 1 S", "1917 1919 9 6 7 23 2 0", "1918 1918 3 15 7 23 2 1 S", "1919 1919 3 5 7 23 2 1 S", "1924 1924 3 16 7 23 2 1 S", "1924 1924 9 4 7 23 2 0", "1926 1926 3 17 7 23 2 1 S", "1926 1929 9 1 6 23 2 0", "1927 1927 3 9 7 23 2 1 S", "1928 1928 3 14 7 23 2 1 S", "1929 1929 3 20 7 23 2 1 S", "1937 1937 4 22 7 23 2 1 S", "1937 1939 9 1 6 23 2 0", "1938 1938 2 22 7 23 2 1 S", "1939 1939 3 15 7 23 2 1 S", "1940 1940 2 16 7 23 2 1 S", "1942 1942 4 2 7 22 2 2 M", "1942 1942 8 1 7 22 2 1 S", "1943 1946 3 13 6 22 2 2 M", "1943 1943 9 3 7 22 2 1 S", "1944 1944 9 10 7 22 2 1 S", "1945 1945 8 30 7 1 0 1 S", "1946 1946 8 30 7 0 0 0", "1949 1949 3 30 7 23 0 1 S", "1949 1949 8 30 7 1 0 0", "1974 1975 3 13 6 23 0 1 S", "1974 1975 9 1 0 1 0 0", "1976 1976 2 27 7 23 0 1 S", "1976 1977 8 0 8 1 0 0", "1977 1978 3 2 7 23 0 1 S", "1978 1978 9 1 7 1 0 0" ],
SpainAfrica:[ "1967 1967 5 3 7 12 0 1 S", "1967 1967 9 1 7 0 0 0", "1974 1974 5 24 7 0 0 1 S", "1974 1974 8 1 7 0 0 0", "1976 1977 4 1 7 0 0 1 S", "1976 1976 7 1 7 0 0 0", "1977 1977 8 28 7 0 0 0", "1978 1978 5 1 7 0 0 1 S", "1978 1978 7 4 7 0 0 0" ],
EU:[ "1977 1980 3 1 0 1 1 1 S", "1977 1977 8 0 8 1 1 0", "1978 1978 9 1 7 1 1 0", "1979 1995 8 0 8 1 1 0", "1981 9999 2 0 8 1 1 1 S", "1996 9999 9 0 8 1 1 0" ],
SL:[ "1935 1942 5 1 7 0 0 0:40 SLST", "1935 1942 9 1 7 0 0 0 WAT", "1957 1962 5 1 7 0 0 1 SLST", "1957 1962 8 1 7 0 0 0 GMT" ],
SA:[ "1942 1943 8 15 0 2 0 1", "1943 1944 2 15 0 2 0 0" ],
Sudan:[ "1970 1970 4 1 7 0 0 1 S", "1970 1985 9 15 7 0 0 0", "1971 1971 3 30 7 0 0 1 S", "1972 1985 3 0 8 0 0 1 S" ],
Libya:[ "1951 1951 9 14 7 2 0 1 S", "1952 1952 0 1 7 0 0 0", "1953 1953 9 9 7 2 0 1 S", "1954 1954 0 1 7 0 0 0", "1955 1955 8 30 7 0 0 1 S", "1956 1956 0 1 7 0 0 0", "1982 1984 3 1 7 0 0 1 S", "1982 1985 9 1 7 0 0 0", "1985 1985 3 6 7 0 0 1 S", "1986 1986 3 4 7 0 0 1 S", "1986 1986 9 3 7 0 0 0", "1987 1989 3 1 7 0 0 1 S", "1987 1989 9 1 7 0 0 0", "1997 1997 3 4 7 0 0 1 S", "1997 1997 9 4 7 0 0 0", "2013 9999 2 5 8 1 0 1 S", "2013 9999 9 5 8 2 0 0" ],
Tunisia:[ "1939 1939 3 15 7 23 2 1 S", "1939 1939 10 18 7 23 2 0", "1940 1940 1 25 7 23 2 1 S", "1941 1941 9 6 7 0 0 0", "1942 1942 2 9 7 0 0 1 S", "1942 1942 10 2 7 3 0 0", "1943 1943 2 29 7 2 0 1 S", "1943 1943 3 17 7 2 0 0", "1943 1943 3 25 7 2 0 1 S", "1943 1943 9 4 7 2 0 0", "1944 1945 3 1 1 2 0 1 S", "1944 1944 9 8 7 0 0 0", "1945 1945 8 16 7 0 0 0", "1977 1977 3 30 7 0 2 1 S", "1977 1977 8 24 7 0 2 0", "1978 1978 4 1 7 0 2 1 S", "1978 1978 9 1 7 0 2 0", "1988 1988 5 1 7 0 2 1 S", "1988 1990 8 0 8 0 2 0", "1989 1989 2 26 7 0 2 1 S", "1990 1990 4 1 7 0 2 1 S", "2005 2005 4 1 7 0 2 1 S", "2005 2005 8 30 7 1 2 0", "2006 2008 2 0 8 2 2 1 S", "2006 2008 9 0 8 2 2 0" ],
Namibia:[ "1994 9999 8 1 0 2 0 1 S", "1995 9999 3 1 0 2 0 0" ],
US:[ "1918 1919 2 0 8 2 0 1 D", "1918 1919 9 0 8 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 30 7 2 0 0 S", "1967 2006 9 0 8 2 0 0 S", "1967 1973 3 0 8 2 0 1 D", "1974 1974 0 6 7 2 0 1 D", "1975 1975 1 23 7 2 0 1 D", "1976 1986 3 0 8 2 0 1 D", "1987 2006 3 1 0 2 0 1 D", "2007 9999 2 8 0 2 0 1 D", "2007 9999 10 1 0 2 0 0 S" ],
Brazil:[ "1931 1931 9 3 7 11 0 1 S", "1932 1933 3 1 7 0 0 0", "1932 1932 9 3 7 0 0 1 S", "1949 1952 11 1 7 0 0 1 S", "1950 1950 3 16 7 1 0 0", "1951 1952 3 1 7 0 0 0", "1953 1953 2 1 7 0 0 0", "1963 1963 11 9 7 0 0 1 S", "1964 1964 2 1 7 0 0 0", "1965 1965 0 31 7 0 0 1 S", "1965 1965 2 31 7 0 0 0", "1965 1965 11 1 7 0 0 1 S", "1966 1968 2 1 7 0 0 0", "1966 1967 10 1 7 0 0 1 S", "1985 1985 10 2 7 0 0 1 S", "1986 1986 2 15 7 0 0 0", "1986 1986 9 25 7 0 0 1 S", "1987 1987 1 14 7 0 0 0", "1987 1987 9 25 7 0 0 1 S", "1988 1988 1 7 7 0 0 0", "1988 1988 9 16 7 0 0 1 S", "1989 1989 0 29 7 0 0 0", "1989 1989 9 15 7 0 0 1 S", "1990 1990 1 11 7 0 0 0", "1990 1990 9 21 7 0 0 1 S", "1991 1991 1 17 7 0 0 0", "1991 1991 9 20 7 0 0 1 S", "1992 1992 1 9 7 0 0 0", "1992 1992 9 25 7 0 0 1 S", "1993 1993 0 31 7 0 0 0", "1993 1995 9 11 0 0 0 1 S", "1994 1995 1 15 0 0 0 0", "1996 1996 1 11 7 0 0 0", "1996 1996 9 6 7 0 0 1 S", "1997 1997 1 16 7 0 0 0", "1997 1997 9 6 7 0 0 1 S", "1998 1998 2 1 7 0 0 0", "1998 1998 9 11 7 0 0 1 S", "1999 1999 1 21 7 0 0 0", "1999 1999 9 3 7 0 0 1 S", "2000 2000 1 27 7 0 0 0", "2000 2001 9 8 0 0 0 1 S", "2001 2006 1 15 0 0 0 0", "2002 2002 10 3 7 0 0 1 S", "2003 2003 9 19 7 0 0 1 S", "2004 2004 10 2 7 0 0 1 S", "2005 2005 9 16 7 0 0 1 S", "2006 2006 10 5 7 0 0 1 S", "2007 2007 1 25 7 0 0 0", "2007 2007 9 8 0 0 0 1 S", "2008 9999 9 15 0 0 0 1 S", "2008 2011 1 15 0 0 0 0", "2012 2012 1 22 0 0 0 0", "2013 2014 1 15 0 0 0 0", "2015 2015 1 22 0 0 0 0", "2016 2022 1 15 0 0 0 0", "2023 2023 1 22 0 0 0 0", "2024 2025 1 15 0 0 0 0", "2026 2026 1 22 0 0 0 0", "2027 2033 1 15 0 0 0 0", "2034 2034 1 22 0 0 0 0", "2035 2036 1 15 0 0 0 0", "2037 2037 1 22 0 0 0 0", "2038 9999 1 15 0 0 0 0" ],
Arg:[ "1930 1930 11 1 7 0 0 1 S", "1931 1931 3 1 7 0 0 0", "1931 1931 9 15 7 0 0 1 S", "1932 1940 2 1 7 0 0 0", "1932 1939 10 1 7 0 0 1 S", "1940 1940 6 1 7 0 0 1 S", "1941 1941 5 15 7 0 0 0", "1941 1941 9 15 7 0 0 1 S", "1943 1943 7 1 7 0 0 0", "1943 1943 9 15 7 0 0 1 S", "1946 1946 2 1 7 0 0 0", "1946 1946 9 1 7 0 0 1 S", "1963 1963 9 1 7 0 0 0", "1963 1963 11 15 7 0 0 1 S", "1964 1966 2 1 7 0 0 0", "1964 1966 9 15 7 0 0 1 S", "1967 1967 3 2 7 0 0 0", "1967 1968 9 1 0 0 0 1 S", "1968 1969 3 1 0 0 0 0", "1974 1974 0 23 7 0 0 1 S", "1974 1974 4 1 7 0 0 0", "1988 1988 11 1 7 0 0 1 S", "1989 1993 2 1 0 0 0 0", "1989 1992 9 15 0 0 0 1 S", "1999 1999 9 1 0 0 0 1 S", "2000 2000 2 3 7 0 0 0", "2007 2007 11 30 7 0 0 1 S", "2008 2009 2 15 0 0 0 0", "2008 2008 9 15 0 0 0 1 S" ],
SanLuis:[ "2008 2009 2 8 0 0 0 0", "2007 2009 9 8 0 0 0 1 S" ],
Para:[ "1975 1988 9 1 7 0 0 1 S", "1975 1978 2 1 7 0 0 0", "1979 1991 3 1 7 0 0 0", "1989 1989 9 22 7 0 0 1 S", "1990 1990 9 1 7 0 0 1 S", "1991 1991 9 6 7 0 0 1 S", "1992 1992 2 1 7 0 0 0", "1992 1992 9 5 7 0 0 1 S", "1993 1993 2 31 7 0 0 0", "1993 1995 9 1 7 0 0 1 S", "1994 1995 1 0 8 0 0 0", "1996 1996 2 1 7 0 0 0", "1996 2001 9 1 0 0 0 1 S", "1997 1997 1 0 8 0 0 0", "1998 2001 2 1 0 0 0 0", "2002 2004 3 1 0 0 0 0", "2002 2003 8 1 0 0 0 1 S", "2004 2009 9 15 0 0 0 1 S", "2005 2009 2 8 0 0 0 0", "2010 9999 9 1 0 0 0 1 S", "2010 2012 3 8 0 0 0 0", "2013 9999 2 22 0 0 0 0" ],
Canada:[ "1918 1918 3 14 7 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 30 7 2 0 0 S", "1974 1986 3 0 8 2 0 1 D", "1974 2006 9 0 8 2 0 0 S", "1987 2006 3 1 0 2 0 1 D", "2007 9999 2 8 0 2 0 1 D", "2007 9999 10 1 0 2 0 0 S" ],
Mexico:[ "1939 1939 1 5 7 0 0 1 D", "1939 1939 5 25 7 0 0 0 S", "1940 1940 11 9 7 0 0 1 D", "1941 1941 3 1 7 0 0 0 S", "1943 1943 11 16 7 0 0 1 W", "1944 1944 4 1 7 0 0 0 S", "1950 1950 1 12 7 0 0 1 D", "1950 1950 6 30 7 0 0 0 S", "1996 2000 3 1 0 2 0 1 D", "1996 2000 9 0 8 2 0 0 S", "2001 2001 4 1 0 2 0 1 D", "2001 2001 8 0 8 2 0 0 S", "2002 9999 3 1 0 2 0 1 D", "2002 9999 9 0 8 2 0 0 S" ],
Barb:[ "1977 1977 5 12 7 2 0 1 D", "1977 1978 9 1 0 2 0 0 S", "1978 1980 3 15 0 2 0 1 D", "1979 1979 8 30 7 2 0 0 S", "1980 1980 8 25 7 2 0 0 S" ],
Belize:[ "1918 1942 9 2 0 0 0 0:30 HD", "1919 1943 1 9 0 0 0 0 S", "1973 1973 11 5 7 0 0 1 D", "1974 1974 1 9 7 0 0 0 S", "1982 1982 11 18 7 0 0 1 D", "1983 1983 1 12 7 0 0 0 S" ],
CO:[ "1992 1992 4 3 7 0 0 1 S", "1993 1993 3 4 7 0 0 0" ],
NT_YK:[ "1918 1918 3 14 7 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1919 1919 4 25 7 2 0 1 D", "1919 1919 10 1 7 0 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 30 7 2 0 0 S", "1965 1965 3 0 8 0 0 2 DD", "1965 1965 9 0 8 2 0 0 S", "1980 1986 3 0 8 2 0 1 D", "1980 2006 9 0 8 2 0 0 S", "1987 2006 3 1 0 2 0 1 D" ],
Chicago:[ "1920 1920 5 13 7 2 0 1 D", "1920 1921 9 0 8 2 0 0 S", "1921 1921 2 0 8 2 0 1 D", "1922 1966 3 0 8 2 0 1 D", "1922 1954 8 0 8 2 0 0 S", "1955 1966 9 0 8 2 0 0 S" ],
CR:[ "1979 1980 1 0 8 0 0 1 D", "1979 1980 5 1 0 0 0 0 S", "1991 1992 0 15 6 0 0 1 D", "1991 1991 6 1 7 0 0 0 S", "1992 1992 2 15 7 0 0 0 S" ],
Vanc:[ "1918 1918 3 14 7 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 30 7 2 0 0 S", "1946 1986 3 0 8 2 0 1 D", "1946 1946 9 13 7 2 0 0 S", "1947 1961 8 0 8 2 0 0 S", "1962 2006 9 0 8 2 0 0 S" ],
Denver:[ "1920 1921 2 0 8 2 0 1 D", "1920 1920 9 0 8 2 0 0 S", "1921 1921 4 22 7 2 0 0 S", "1965 1966 3 0 8 2 0 1 D", "1965 1966 9 0 8 2 0 0 S" ],
Detroit:[ "1948 1948 3 0 8 2 0 1 D", "1948 1948 8 0 8 2 0 0 S", "1967 1967 5 14 7 2 0 1 D", "1967 1967 9 0 8 2 0 0 S" ],
Edm:[ "1918 1919 3 8 0 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1919 1919 4 27 7 2 0 0 S", "1920 1923 3 0 8 2 0 1 D", "1920 1920 9 0 8 2 0 0 S", "1921 1923 8 0 8 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 0 8 2 0 0 S", "1947 1947 3 0 8 2 0 1 D", "1947 1947 8 0 8 2 0 0 S", "1967 1967 3 0 8 2 0 1 D", "1967 1967 9 0 8 2 0 0 S", "1969 1969 3 0 8 2 0 1 D", "1969 1969 9 0 8 2 0 0 S", "1972 1986 3 0 8 2 0 1 D", "1972 2006 9 0 8 2 0 0 S" ],
Salv:[ "1987 1988 4 1 0 0 0 1 D", "1987 1988 8 0 8 0 0 0 S" ],
Halifax:[ "1916 1916 3 1 7 0 0 1 D", "1916 1916 9 1 7 0 0 0 S", "1920 1920 4 9 7 0 0 1 D", "1920 1920 7 29 7 0 0 0 S", "1921 1921 4 6 7 0 0 1 D", "1921 1922 8 5 7 0 0 0 S", "1922 1922 3 30 7 0 0 1 D", "1923 1925 4 1 0 0 0 1 D", "1923 1923 8 4 7 0 0 0 S", "1924 1924 8 15 7 0 0 0 S", "1925 1925 8 28 7 0 0 0 S", "1926 1926 4 16 7 0 0 1 D", "1926 1926 8 13 7 0 0 0 S", "1927 1927 4 1 7 0 0 1 D", "1927 1927 8 26 7 0 0 0 S", "1928 1931 4 8 0 0 0 1 D", "1928 1928 8 9 7 0 0 0 S", "1929 1929 8 3 7 0 0 0 S", "1930 1930 8 15 7 0 0 0 S", "1931 1932 8 24 1 0 0 0 S", "1932 1932 4 1 7 0 0 1 D", "1933 1933 3 30 7 0 0 1 D", "1933 1933 9 2 7 0 0 0 S", "1934 1934 4 20 7 0 0 1 D", "1934 1934 8 16 7 0 0 0 S", "1935 1935 5 2 7 0 0 1 D", "1935 1935 8 30 7 0 0 0 S", "1936 1936 5 1 7 0 0 1 D", "1936 1936 8 14 7 0 0 0 S", "1937 1938 4 1 0 0 0 1 D", "1937 1941 8 24 1 0 0 0 S", "1939 1939 4 28 7 0 0 1 D", "1940 1941 4 1 0 0 0 1 D", "1946 1949 3 0 8 2 0 1 D", "1946 1949 8 0 8 2 0 0 S", "1951 1954 3 0 8 2 0 1 D", "1951 1954 8 0 8 2 0 0 S", "1956 1959 3 0 8 2 0 1 D", "1956 1959 8 0 8 2 0 0 S", "1962 1973 3 0 8 2 0 1 D", "1962 1973 9 0 8 2 0 0 S" ],
StJohns:[ "1917 1917 3 8 7 2 0 1 D", "1917 1917 8 17 7 2 0 0 S", "1919 1919 4 5 7 23 0 1 D", "1919 1919 7 12 7 23 0 0 S", "1920 1935 4 1 0 23 0 1 D", "1920 1935 9 0 8 23 0 0 S", "1936 1941 4 9 1 0 0 1 D", "1936 1941 9 2 1 0 0 0 S", "1946 1950 4 8 0 2 0 1 D", "1946 1950 9 2 0 2 0 0 S", "1951 1986 3 0 8 2 0 1 D", "1951 1959 8 0 8 2 0 0 S", "1960 1986 9 0 8 2 0 0 S", "1987 1987 3 1 0 0:1 0 1 D", "1987 2006 9 0 8 0:1 0 0 S", "1988 1988 3 1 0 0:1 0 2 DD", "1989 2006 3 1 0 0:1 0 1 D", "2007 2011 2 8 0 0:1 0 1 D", "2007 2010 10 1 0 0:1 0 0 S" ],
TC:[ "1979 1986 3 0 8 2 0 1 D", "1979 2006 9 0 8 2 0 0 S", "1987 2006 3 1 0 2 0 1 D", "2007 9999 2 8 0 2 0 1 D", "2007 9999 10 1 0 2 0 0 S" ],
Guat:[ "1973 1973 10 25 7 0 0 1 D", "1974 1974 1 24 7 0 0 0 S", "1983 1983 4 21 7 0 0 1 D", "1983 1983 8 22 7 0 0 0 S", "1991 1991 2 23 7 0 0 1 D", "1991 1991 8 7 7 0 0 0 S", "2006 2006 3 30 7 0 0 1 D", "2006 2006 9 1 7 0 0 0 S" ],
Cuba:[ "1928 1928 5 10 7 0 0 1 D", "1928 1928 9 10 7 0 0 0 S", "1940 1942 5 1 0 0 0 1 D", "1940 1942 8 1 0 0 0 0 S", "1945 1946 5 1 0 0 0 1 D", "1945 1946 8 1 0 0 0 0 S", "1965 1965 5 1 7 0 0 1 D", "1965 1965 8 30 7 0 0 0 S", "1966 1966 4 29 7 0 0 1 D", "1966 1966 9 2 7 0 0 0 S", "1967 1967 3 8 7 0 0 1 D", "1967 1968 8 8 0 0 0 0 S", "1968 1968 3 14 7 0 0 1 D", "1969 1977 3 0 8 0 0 1 D", "1969 1971 9 0 8 0 0 0 S", "1972 1974 9 8 7 0 0 0 S", "1975 1977 9 0 8 0 0 0 S", "1978 1978 4 7 7 0 0 1 D", "1978 1990 9 8 0 0 0 0 S", "1979 1980 2 15 0 0 0 1 D", "1981 1985 4 5 0 0 0 1 D", "1986 1989 2 14 0 0 0 1 D", "1990 1997 3 1 0 0 0 1 D", "1991 1995 9 8 0 0 2 0 S", "1996 1996 9 6 7 0 2 0 S", "1997 1997 9 12 7 0 2 0 S", "1998 1999 2 0 8 0 2 1 D", "1998 2003 9 0 8 0 2 0 S", "2000 2004 3 1 0 0 2 1 D", "2006 2010 9 0 8 0 2 0 S", "2007 2007 2 8 0 0 2 1 D", "2008 2008 2 15 0 0 2 1 D", "2009 2010 2 8 0 0 2 1 D", "2011 2011 2 15 0 0 2 1 D", "2011 2011 10 13 7 0 2 0 S", "2012 2012 3 1 7 0 2 1 D", "2012 9999 10 1 0 0 2 0 S", "2013 9999 2 8 0 0 2 1 D" ],
Indianapolis:[ "1941 1941 5 22 7 2 0 1 D", "1941 1954 8 0 8 2 0 0 S", "1946 1954 3 0 8 2 0 1 D" ],
Starke:[ "1947 1961 3 0 8 2 0 1 D", "1947 1954 8 0 8 2 0 0 S", "1955 1956 9 0 8 2 0 0 S", "1957 1958 8 0 8 2 0 0 S", "1959 1961 9 0 8 2 0 0 S" ],
Marengo:[ "1951 1951 3 0 8 2 0 1 D", "1951 1951 8 0 8 2 0 0 S", "1954 1960 3 0 8 2 0 1 D", "1954 1960 8 0 8 2 0 0 S" ],
Pike:[ "1955 1955 4 1 7 0 0 1 D", "1955 1960 8 0 8 2 0 0 S", "1956 1964 3 0 8 2 0 1 D", "1961 1964 9 0 8 2 0 0 S" ],
Perry:[ "1946 1946 3 0 8 2 0 1 D", "1946 1946 8 0 8 2 0 0 S", "1953 1954 3 0 8 2 0 1 D", "1953 1959 8 0 8 2 0 0 S", "1955 1955 4 1 7 0 0 1 D", "1956 1963 3 0 8 2 0 1 D", "1960 1960 9 0 8 2 0 0 S", "1961 1961 8 0 8 2 0 0 S", "1962 1963 9 0 8 2 0 0 S" ],
Vincennes:[ "1946 1946 3 0 8 2 0 1 D", "1946 1946 8 0 8 2 0 0 S", "1953 1954 3 0 8 2 0 1 D", "1953 1959 8 0 8 2 0 0 S", "1955 1955 4 1 7 0 0 1 D", "1956 1963 3 0 8 2 0 1 D", "1960 1960 9 0 8 2 0 0 S", "1961 1961 8 0 8 2 0 0 S", "1962 1963 9 0 8 2 0 0 S" ],
Pulaski:[ "1946 1960 3 0 8 2 0 1 D", "1946 1954 8 0 8 2 0 0 S", "1955 1956 9 0 8 2 0 0 S", "1957 1960 8 0 8 2 0 0 S" ],
Louisville:[ "1921 1921 4 1 7 2 0 1 D", "1921 1921 8 1 7 2 0 0 S", "1941 1961 3 0 8 2 0 1 D", "1941 1941 8 0 8 2 0 0 S", "1946 1946 5 2 7 2 0 0 S", "1950 1955 8 0 8 2 0 0 S", "1956 1960 9 0 8 2 0 0 S" ],
Peru:[ "1938 1938 0 1 7 0 0 1 S", "1938 1938 3 1 7 0 0 0", "1938 1939 8 0 8 0 0 1 S", "1939 1940 2 24 0 0 0 0", "1986 1987 0 1 7 0 0 1 S", "1986 1987 3 1 7 0 0 0", "1990 1990 0 1 7 0 0 1 S", "1990 1990 3 1 7 0 0 0", "1994 1994 0 1 7 0 0 1 S", "1994 1994 3 1 7 0 0 0" ],
CA:[ "1948 1948 2 14 7 2 0 1 D", "1949 1949 0 1 7 2 0 0 S", "1950 1966 3 0 8 2 0 1 D", "1950 1961 8 0 8 2 0 0 S", "1962 1966 9 0 8 2 0 0 S" ],
Nic:[ "1979 1980 2 16 0 0 0 1 D", "1979 1980 5 23 1 0 0 0 S", "2005 2005 3 10 7 0 0 1 D", "2005 2005 9 1 0 0 0 0 S", "2006 2006 3 30 7 2 0 1 D", "2006 2006 9 1 0 1 0 0 S" ],
Menominee:[ "1946 1946 3 0 8 2 0 1 D", "1946 1946 8 0 8 2 0 0 S", "1966 1966 3 0 8 2 0 1 D", "1966 1966 9 0 8 2 0 0 S" ],
Moncton:[ "1933 1935 5 8 0 1 0 1 D", "1933 1935 8 8 0 1 0 0 S", "1936 1938 5 1 0 1 0 1 D", "1936 1938 8 1 0 1 0 0 S", "1939 1939 4 27 7 1 0 1 D", "1939 1941 8 21 6 1 0 0 S", "1940 1940 4 19 7 1 0 1 D", "1941 1941 4 4 7 1 0 1 D", "1946 1972 3 0 8 2 0 1 D", "1946 1956 8 0 8 2 0 0 S", "1957 1972 9 0 8 2 0 0 S", "1993 2006 3 1 0 0:1 0 1 D", "1993 2006 9 0 8 0:1 0 0 S" ],
Uruguay:[ "1923 1923 9 2 7 0 0 0:30 HS", "1924 1926 3 1 7 0 0 0", "1924 1925 9 1 7 0 0 0:30 HS", "1933 1935 9 0 8 0 0 0:30 HS", "1934 1936 2 25 6 23:30 2 0", "1936 1936 10 1 7 0 0 0:30 HS", "1937 1941 2 0 8 0 0 0", "1937 1940 9 0 8 0 0 0:30 HS", "1941 1941 7 1 7 0 0 0:30 HS", "1942 1942 0 1 7 0 0 0", "1942 1942 11 14 7 0 0 1 S", "1943 1943 2 14 7 0 0 0", "1959 1959 4 24 7 0 0 1 S", "1959 1959 10 15 7 0 0 0", "1960 1960 0 17 7 0 0 1 S", "1960 1960 2 6 7 0 0 0", "1965 1967 3 1 0 0 0 1 S", "1965 1965 8 26 7 0 0 0", "1966 1967 9 31 7 0 0 0", "1968 1970 4 27 7 0 0 0:30 HS", "1968 1970 11 2 7 0 0 0", "1972 1972 3 24 7 0 0 1 S", "1972 1972 7 15 7 0 0 0", "1974 1974 2 10 7 0 0 0:30 HS", "1974 1974 11 22 7 0 0 1 S", "1976 1976 9 1 7 0 0 0", "1977 1977 11 4 7 0 0 1 S", "1978 1978 3 1 7 0 0 0", "1979 1979 9 1 7 0 0 1 S", "1980 1980 4 1 7 0 0 0", "1987 1987 11 14 7 0 0 1 S", "1988 1988 2 14 7 0 0 0", "1988 1988 11 11 7 0 0 1 S", "1989 1989 2 12 7 0 0 0", "1989 1989 9 29 7 0 0 1 S", "1990 1992 2 1 0 0 0 0", "1990 1991 9 21 0 0 0 1 S", "1992 1992 9 18 7 0 0 1 S", "1993 1993 1 28 7 0 0 0", "2004 2004 8 19 7 0 0 1 S", "2005 2005 2 27 7 2 0 0", "2005 2005 9 9 7 2 0 1 S", "2006 2006 2 12 7 2 0 0", "2006 9999 9 1 0 2 0 1 S", "2007 9999 2 8 0 2 0 0" ],
Mont:[ "1917 1917 2 25 7 2 0 1 D", "1917 1917 3 24 7 0 0 0 S", "1919 1919 2 31 7 2:30 0 1 D", "1919 1919 9 25 7 2:30 0 0 S", "1920 1920 4 2 7 2:30 0 1 D", "1920 1922 9 1 0 2:30 0 0 S", "1921 1921 4 1 7 2 0 1 D", "1922 1922 3 30 7 2 0 1 D", "1924 1924 4 17 7 2 0 1 D", "1924 1926 8 0 8 2:30 0 0 S", "1925 1926 4 1 0 2 0 1 D", "1927 1927 4 1 7 0 0 1 D", "1927 1932 8 0 8 0 0 0 S", "1928 1931 3 0 8 0 0 1 D", "1932 1932 4 1 7 0 0 1 D", "1933 1940 3 0 8 0 0 1 D", "1933 1933 9 1 7 0 0 0 S", "1934 1939 8 0 8 0 0 0 S", "1946 1973 3 0 8 2 0 1 D", "1945 1948 8 0 8 2 0 0 S", "1949 1950 9 0 8 2 0 0 S", "1951 1956 8 0 8 2 0 0 S", "1957 1973 9 0 8 2 0 0 S" ],
Bahamas:[ "1964 1975 9 0 8 2 0 0 S", "1964 1975 3 0 8 2 0 1 D" ],
NYC:[ "1920 1920 2 0 8 2 0 1 D", "1920 1920 9 0 8 2 0 0 S", "1921 1966 3 0 8 2 0 1 D", "1921 1954 8 0 8 2 0 0 S", "1955 1966 9 0 8 2 0 0 S" ],
Haiti:[ "1983 1983 4 8 7 0 0 1 D", "1984 1987 3 0 8 0 0 1 D", "1983 1987 9 0 8 0 0 0 S", "1988 1997 3 1 0 1 2 1 D", "1988 1997 9 0 8 1 2 0 S", "2005 2006 3 1 0 0 0 1 D", "2005 2006 9 0 8 0 0 0 S", "2012 9999 2 8 0 2 0 1 D", "2012 9999 10 1 0 2 0 0 S" ],
Regina:[ "1918 1918 3 14 7 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1930 1934 4 1 0 0 0 1 D", "1930 1934 9 1 0 0 0 0 S", "1937 1941 3 8 0 0 0 1 D", "1937 1937 9 8 0 0 0 0 S", "1938 1938 9 1 0 0 0 0 S", "1939 1941 9 8 0 0 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 0 8 2 0 0 S", "1946 1946 3 8 0 2 0 1 D", "1946 1946 9 8 0 2 0 0 S", "1947 1957 3 0 8 2 0 1 D", "1947 1957 8 0 8 2 0 0 S", "1959 1959 3 0 8 2 0 1 D", "1959 1959 9 0 8 2 0 0 S" ],
Chile:[ "1927 1932 8 1 7 0 0 1 S", "1928 1932 3 1 7 0 0 0", "1942 1942 5 1 7 4 1 0", "1942 1942 7 1 7 5 1 1 S", "1946 1946 6 15 7 4 1 1 S", "1946 1946 8 1 7 3 1 0", "1947 1947 3 1 7 4 1 0", "1968 1968 10 3 7 4 1 1 S", "1969 1969 2 30 7 3 1 0", "1969 1969 10 23 7 4 1 1 S", "1970 1970 2 29 7 3 1 0", "1971 1971 2 14 7 3 1 0", "1970 1972 9 9 0 4 1 1 S", "1972 1986 2 9 0 3 1 0", "1973 1973 8 30 7 4 1 1 S", "1974 1987 9 9 0 4 1 1 S", "1987 1987 3 12 7 3 1 0", "1988 1989 2 9 0 3 1 0", "1988 1988 9 1 0 4 1 1 S", "1989 1989 9 9 0 4 1 1 S", "1990 1990 2 18 7 3 1 0", "1990 1990 8 16 7 4 1 1 S", "1991 1996 2 9 0 3 1 0", "1991 1997 9 9 0 4 1 1 S", "1997 1997 2 30 7 3 1 0", "1998 1998 2 9 0 3 1 0", "1998 1998 8 27 7 4 1 1 S", "1999 1999 3 4 7 3 1 0", "1999 2010 9 9 0 4 1 1 S", "2000 2007 2 9 0 3 1 0", "2008 2008 2 30 7 3 1 0", "2009 2009 2 9 0 3 1 0", "2010 2010 3 1 0 3 1 0", "2011 2011 4 2 0 3 1 0", "2011 2011 7 16 0 4 1 1 S", "2012 9999 3 23 0 3 1 0", "2012 9999 8 2 0 4 1 1 S" ],
DR:[ "1966 1966 9 30 7 0 0 1 D", "1967 1967 1 28 7 0 0 0 S", "1969 1973 9 0 8 0 0 0:30 HD", "1970 1970 1 21 7 0 0 0 S", "1971 1971 0 20 7 0 0 0 S", "1972 1974 0 21 7 0 0 0 S" ],
"C-Eur":[ "1916 1916 3 30 7 23 0 1 S", "1916 1916 9 1 7 1 0 0", "1917 1918 3 15 1 2 2 1 S", "1917 1918 8 15 1 2 2 0", "1940 1940 3 1 7 2 2 1 S", "1942 1942 10 2 7 2 2 0", "1943 1943 2 29 7 2 2 1 S", "1943 1943 9 4 7 2 2 0", "1944 1945 3 1 1 2 2 1 S", "1944 1944 9 2 7 2 2 0", "1945 1945 8 16 7 2 2 0", "1977 1980 3 1 0 2 2 1 S", "1977 1977 8 0 8 2 2 0", "1978 1978 9 1 7 2 2 0", "1979 1995 8 0 8 2 2 0", "1981 9999 2 0 8 2 2 1 S", "1996 9999 9 0 8 2 2 0" ],
Swift:[ "1957 1957 3 0 8 2 0 1 D", "1957 1957 9 0 8 2 0 0 S", "1959 1961 3 0 8 2 0 1 D", "1959 1959 9 0 8 2 0 0 S", "1960 1961 8 0 8 2 0 0 S" ],
Hond:[ "1987 1988 4 1 0 0 0 1 D", "1987 1988 8 0 8 0 0 0 S", "2006 2006 4 1 0 0 0 1 D", "2006 2006 7 1 1 0 0 0 S" ],
Thule:[ "1991 1992 2 0 8 2 0 1 D", "1991 1992 8 0 8 2 0 0 S", "1993 2006 3 1 0 2 0 1 D", "1993 2006 9 0 8 2 0 0 S", "2007 9999 2 8 0 2 0 1 D", "2007 9999 10 1 0 2 0 0 S" ],
Toronto:[ "1919 1919 2 30 7 23:30 0 1 D", "1919 1919 9 26 7 0 0 0 S", "1920 1920 4 2 7 2 0 1 D", "1920 1920 8 26 7 0 0 0 S", "1921 1921 4 15 7 2 0 1 D", "1921 1921 8 15 7 2 0 0 S", "1922 1923 4 8 0 2 0 1 D", "1922 1926 8 15 0 2 0 0 S", "1924 1927 4 1 0 2 0 1 D", "1927 1932 8 0 8 2 0 0 S", "1928 1931 3 0 8 2 0 1 D", "1932 1932 4 1 7 2 0 1 D", "1933 1940 3 0 8 2 0 1 D", "1933 1933 9 1 7 2 0 0 S", "1934 1939 8 0 8 2 0 0 S", "1945 1946 8 0 8 2 0 0 S", "1946 1946 3 0 8 2 0 1 D", "1947 1949 3 0 8 0 0 1 D", "1947 1948 8 0 8 0 0 0 S", "1949 1949 10 0 8 0 0 0 S", "1950 1973 3 0 8 2 0 1 D", "1950 1950 10 0 8 2 0 0 S", "1951 1956 8 0 8 2 0 0 S", "1957 1973 9 0 8 2 0 0 S" ],
Winn:[ "1916 1916 3 23 7 0 0 1 D", "1916 1916 8 17 7 0 0 0 S", "1918 1918 3 14 7 2 0 1 D", "1918 1918 9 27 7 2 0 0 S", "1937 1937 4 16 7 2 0 1 D", "1937 1937 8 26 7 2 0 0 S", "1942 1942 1 9 7 2 0 1 W", "1945 1945 7 14 7 23 1 1 P", "1945 1945 8 0 8 2 0 0 S", "1946 1946 4 12 7 2 0 1 D", "1946 1946 9 13 7 2 0 0 S", "1947 1949 3 0 8 2 0 1 D", "1947 1949 8 0 8 2 0 0 S", "1950 1950 4 1 7 2 0 1 D", "1950 1950 8 30 7 2 0 0 S", "1951 1960 3 0 8 2 0 1 D", "1951 1958 8 0 8 2 0 0 S", "1959 1959 9 0 8 2 0 0 S", "1960 1960 8 0 8 2 0 0 S", "1963 1963 3 0 8 2 0 1 D", "1963 1963 8 22 7 2 0 0 S", "1966 1986 3 0 8 2 2 1 D", "1966 2005 9 0 8 2 2 0 S", "1987 2005 3 1 0 2 2 1 D" ],
Aus:[ "1917 1917 0 1 7 0:1 0 1", "1917 1917 2 25 7 2 0 0", "1942 1942 0 1 7 2 0 1", "1942 1942 2 29 7 2 0 0", "1942 1942 8 27 7 2 0 1", "1943 1944 2 0 8 2 0 0", "1943 1943 9 3 7 2 0 1" ],
AT:[ "1967 1967 9 1 0 2 2 1", "1968 1968 2 0 8 2 2 0", "1968 1985 9 0 8 2 2 1", "1969 1971 2 8 0 2 2 0", "1972 1972 1 0 8 2 2 0", "1973 1981 2 1 0 2 2 0", "1982 1983 2 0 8 2 2 0", "1984 1986 2 1 0 2 2 0", "1986 1986 9 15 0 2 2 1", "1987 1990 2 15 0 2 2 0", "1987 1987 9 22 0 2 2 1", "1988 1990 9 0 8 2 2 1", "1991 1999 9 1 0 2 2 1", "1991 2005 2 0 8 2 2 0", "2000 2000 7 0 8 2 2 1", "2001 9999 9 1 0 2 2 1", "2006 2006 3 1 0 2 2 0", "2007 2007 2 0 8 2 2 0", "2008 9999 3 1 0 2 2 0" ],
NZAQ:[ "1974 1974 10 3 7 2 2 1 D", "1975 1988 9 0 8 2 2 1 D", "1989 1989 9 8 7 2 2 1 D", "1990 2006 9 1 0 2 2 1 D", "1975 1975 1 23 7 2 2 0 S", "1976 1989 2 1 0 2 2 0 S", "1990 2007 2 15 0 2 2 0 S", "2007 9999 8 0 8 2 2 1 D", "2008 9999 3 1 0 2 2 0 S" ],
ArgAQ:[ "1964 1966 2 1 7 0 0 0", "1964 1966 9 15 7 0 0 1 S", "1967 1967 3 2 7 0 0 0", "1967 1968 9 1 0 0 0 1 S", "1968 1969 3 1 0 0 0 0", "1974 1974 0 23 7 0 0 1 S", "1974 1974 4 1 7 0 0 0" ],
ChileAQ:[ "1972 1986 2 9 0 3 1 0", "1974 1987 9 9 0 4 1 1 S", "1987 1987 3 12 7 3 1 0", "1988 1989 2 9 0 3 1 0", "1988 1988 9 1 0 4 1 1 S", "1989 1989 9 9 0 4 1 1 S", "1990 1990 2 18 7 3 1 0", "1990 1990 8 16 7 4 1 1 S", "1991 1996 2 9 0 3 1 0", "1991 1997 9 9 0 4 1 1 S", "1997 1997 2 30 7 3 1 0", "1998 1998 2 9 0 3 1 0", "1998 1998 8 27 7 4 1 1 S", "1999 1999 3 4 7 3 1 0", "1999 2010 9 9 0 4 1 1 S", "2000 2007 2 9 0 3 1 0", "2008 2008 2 30 7 3 1 0", "2009 2009 2 9 0 3 1 0", "2010 2010 3 1 0 3 1 0", "2011 2011 4 2 0 3 1 0", "2011 2011 7 16 0 4 1 1 S", "2012 9999 3 23 0 3 1 0", "2012 9999 8 2 0 4 1 1 S" ],
Norway:[ "1916 1916 4 22 7 1 0 1 S", "1916 1916 8 30 7 0 0 0", "1945 1945 3 2 7 2 2 1 S", "1945 1945 9 1 7 2 2 0", "1959 1964 2 15 0 2 2 1 S", "1959 1965 8 15 0 2 2 0", "1965 1965 3 25 7 2 2 1 S" ],
RussiaAsia:[ "1981 1984 3 1 7 0 0 1 S", "1981 1983 9 1 7 0 0 0", "1984 1991 8 0 8 2 2 0", "1985 1991 2 0 8 2 2 1 S", "1992 1992 2 6 8 23 0 1 S", "1992 1992 8 6 8 23 0 0", "1993 9999 2 0 8 2 2 1 S", "1993 1995 8 0 8 2 2 0", "1996 9999 9 0 8 2 2 0" ],
Jordan:[ "1973 1973 5 6 7 0 0 1 S", "1973 1975 9 1 7 0 0 0", "1974 1977 4 1 7 0 0 1 S", "1976 1976 10 1 7 0 0 0", "1977 1977 9 1 7 0 0 0", "1978 1978 3 30 7 0 0 1 S", "1978 1978 8 30 7 0 0 0", "1985 1985 3 1 7 0 0 1 S", "1985 1985 9 1 7 0 0 0", "1986 1988 3 1 5 0 0 1 S", "1986 1990 9 1 5 0 0 0", "1989 1989 4 8 7 0 0 1 S", "1990 1990 3 27 7 0 0 1 S", "1991 1991 3 17 7 0 0 1 S", "1991 1991 8 27 7 0 0 0", "1992 1992 3 10 7 0 0 1 S", "1992 1993 9 1 5 0 0 0", "1993 1998 3 1 5 0 0 1 S", "1994 1994 8 15 5 0 0 0", "1995 1998 8 15 5 0 2 0", "1999 1999 6 1 7 0 2 1 S", "1999 2002 8 5 8 0 2 0", "2000 2001 2 4 8 0 2 1 S", "2002 9999 2 4 8 24 0 1 S", "2003 2003 9 24 7 0 2 0", "2004 2004 9 15 7 0 2 0", "2005 2005 8 5 8 0 2 0", "2006 2011 9 5 8 0 2 0", "2013 9999 9 5 8 0 2 0" ],
Russia:[ "1917 1917 6 1 7 23 0 1 MST", "1917 1917 11 28 7 0 0 0 MMT", "1918 1918 4 31 7 22 0 2 MDST", "1918 1918 8 16 7 1 0 1 MST", "1919 1919 4 31 7 23 0 2 MDST", "1919 1919 6 1 7 2 0 1 S", "1919 1919 7 16 7 0 0 0", "1921 1921 1 14 7 23 0 1 S", "1921 1921 2 20 7 23 0 2 M", "1921 1921 8 1 7 0 0 1 S", "1921 1921 9 1 7 0 0 0", "1981 1984 3 1 7 0 0 1 S", "1981 1983 9 1 7 0 0 0", "1984 1991 8 0 8 2 2 0", "1985 1991 2 0 8 2 2 1 S", "1992 1992 2 6 8 23 0 1 S", "1992 1992 8 6 8 23 0 0", "1993 2010 2 0 8 2 2 1 S", "1993 1995 8 0 8 2 2 0", "1996 2010 9 0 8 2 2 0" ],
Iraq:[ "1982 1982 4 1 7 0 0 1 D", "1982 1984 9 1 7 0 0 0 S", "1983 1983 2 31 7 0 0 1 D", "1984 1985 3 1 7 0 0 1 D", "1985 1990 8 0 8 1 2 0 S", "1986 1990 2 0 8 1 2 1 D", "1991 2007 3 1 7 3 2 1 D", "1991 2007 9 1 7 3 2 0 S" ],
EUAsia:[ "1981 9999 2 0 8 1 1 1 S", "1979 1995 8 0 8 1 1 0", "1996 9999 9 0 8 1 1 0" ],
Azer:[ "1997 9999 2 0 8 4 0 1 S", "1997 9999 9 0 8 5 0 0" ],
Lebanon:[ "1920 1920 2 28 7 0 0 1 S", "1920 1920 9 25 7 0 0 0", "1921 1921 3 3 7 0 0 1 S", "1921 1921 9 3 7 0 0 0", "1922 1922 2 26 7 0 0 1 S", "1922 1922 9 8 7 0 0 0", "1923 1923 3 22 7 0 0 1 S", "1923 1923 8 16 7 0 0 0", "1957 1961 4 1 7 0 0 1 S", "1957 1961 9 1 7 0 0 0", "1972 1972 5 22 7 0 0 1 S", "1972 1977 9 1 7 0 0 0", "1973 1977 4 1 7 0 0 1 S", "1978 1978 3 30 7 0 0 1 S", "1978 1978 8 30 7 0 0 0", "1984 1987 4 1 7 0 0 1 S", "1984 1991 9 16 7 0 0 0", "1988 1988 5 1 7 0 0 1 S", "1989 1989 4 10 7 0 0 1 S", "1990 1992 4 1 7 0 0 1 S", "1992 1992 9 4 7 0 0 0", "1993 9999 2 0 8 0 0 1 S", "1993 1998 8 0 8 0 0 0", "1999 9999 9 0 8 0 0 0" ],
Kyrgyz:[ "1992 1996 3 7 0 0 2 1 S", "1992 1996 8 0 8 0 0 0", "1997 2005 2 0 8 2:30 0 1 S", "1997 2004 9 0 8 2:30 0 0" ],
Mongol:[ "1983 1984 3 1 7 0 0 1 S", "1983 1983 9 1 7 0 0 0", "1985 1998 2 0 8 0 0 1 S", "1984 1998 8 0 8 0 0 0", "2001 2001 3 6 8 2 0 1 S", "2001 2006 8 6 8 2 0 0", "2002 2006 2 6 8 2 0 1 S" ],
PRC:[ "1986 1986 4 4 7 0 0 1 D", "1986 1991 8 11 0 0 0 0 S", "1987 1991 3 10 0 0 0 1 D" ],
Syria:[ "1920 1923 3 15 0 2 0 1 S", "1920 1923 9 1 0 2 0 0", "1962 1962 3 29 7 2 0 1 S", "1962 1962 9 1 7 2 0 0", "1963 1965 4 1 7 2 0 1 S", "1963 1963 8 30 7 2 0 0", "1964 1964 9 1 7 2 0 0", "1965 1965 8 30 7 2 0 0", "1966 1966 3 24 7 2 0 1 S", "1966 1976 9 1 7 2 0 0", "1967 1978 4 1 7 2 0 1 S", "1977 1978 8 1 7 2 0 0", "1983 1984 3 9 7 2 0 1 S", "1983 1984 9 1 7 2 0 0", "1986 1986 1 16 7 2 0 1 S", "1986 1986 9 9 7 2 0 0", "1987 1987 2 1 7 2 0 1 S", "1987 1988 9 31 7 2 0 0", "1988 1988 2 15 7 2 0 1 S", "1989 1989 2 31 7 2 0 1 S", "1989 1989 9 1 7 2 0 0", "1990 1990 3 1 7 2 0 1 S", "1990 1990 8 30 7 2 0 0", "1991 1991 3 1 7 0 0 1 S", "1991 1992 9 1 7 0 0 0", "1992 1992 3 8 7 0 0 1 S", "1993 1993 2 26 7 0 0 1 S", "1993 1993 8 25 7 0 0 0", "1994 1996 3 1 7 0 0 1 S", "1994 2005 9 1 7 0 0 0", "1997 1998 2 1 8 0 0 1 S", "1999 2006 3 1 7 0 0 1 S", "2006 2006 8 22 7 0 0 0", "2007 2007 2 5 8 0 0 1 S", "2007 2007 10 1 5 0 0 0", "2008 2008 3 1 5 0 0 1 S", "2008 2008 10 1 7 0 0 0", "2009 2009 2 5 8 0 0 1 S", "2010 2011 3 1 5 0 0 1 S", "2012 9999 2 5 8 0 0 1 S", "2009 9999 9 5 8 0 0 0" ],
Dhaka:[ "2009 2009 5 19 7 23 0 1 S", "2009 2009 11 31 7 23:59 0 0" ],
Zion:[ "1940 1940 5 1 7 0 0 1 D", "1942 1944 10 1 7 0 0 0 S", "1943 1943 3 1 7 2 0 1 D", "1944 1944 3 1 7 0 0 1 D", "1945 1945 3 16 7 0 0 1 D", "1945 1945 10 1 7 2 0 0 S", "1946 1946 3 16 7 2 0 1 D", "1946 1946 10 1 7 0 0 0 S", "1948 1948 4 23 7 0 0 2 DD", "1948 1948 8 1 7 0 0 1 D", "1948 1949 10 1 7 2 0 0 S", "1949 1949 4 1 7 0 0 1 D", "1950 1950 3 16 7 0 0 1 D", "1950 1950 8 15 7 3 0 0 S", "1951 1951 3 1 7 0 0 1 D", "1951 1951 10 11 7 3 0 0 S", "1952 1952 3 20 7 2 0 1 D", "1952 1952 9 19 7 3 0 0 S", "1953 1953 3 12 7 2 0 1 D", "1953 1953 8 13 7 3 0 0 S", "1954 1954 5 13 7 0 0 1 D", "1954 1954 8 12 7 0 0 0 S", "1955 1955 5 11 7 2 0 1 D", "1955 1955 8 11 7 0 0 0 S", "1956 1956 5 3 7 0 0 1 D", "1956 1956 8 30 7 3 0 0 S", "1957 1957 3 29 7 2 0 1 D", "1957 1957 8 22 7 0 0 0 S", "1974 1974 6 7 7 0 0 1 D", "1974 1974 9 13 7 0 0 0 S", "1975 1975 3 20 7 0 0 1 D", "1975 1975 7 31 7 0 0 0 S", "1985 1985 3 14 7 0 0 1 D", "1985 1985 8 15 7 0 0 0 S", "1986 1986 4 18 7 0 0 1 D", "1986 1986 8 7 7 0 0 0 S", "1987 1987 3 15 7 0 0 1 D", "1987 1987 8 13 7 0 0 0 S", "1988 1988 3 9 7 0 0 1 D", "1988 1988 8 3 7 0 0 0 S", "1989 1989 3 30 7 0 0 1 D", "1989 1989 8 3 7 0 0 0 S", "1990 1990 2 25 7 0 0 1 D", "1990 1990 7 26 7 0 0 0 S", "1991 1991 2 24 7 0 0 1 D", "1991 1991 8 1 7 0 0 0 S", "1992 1992 2 29 7 0 0 1 D", "1992 1992 8 6 7 0 0 0 S", "1993 1993 3 2 7 0 0 1 D", "1993 1993 8 5 7 0 0 0 S", "1994 1994 3 1 7 0 0 1 D", "1994 1994 7 28 7 0 0 0 S", "1995 1995 2 31 7 0 0 1 D", "1995 1995 8 3 7 0 0 0 S", "1996 1996 2 15 7 0 0 1 D", "1996 1996 8 16 7 0 0 0 S", "1997 1997 2 21 7 0 0 1 D", "1997 1997 8 14 7 0 0 0 S", "1998 1998 2 20 7 0 0 1 D", "1998 1998 8 6 7 0 0 0 S", "1999 1999 3 2 7 2 0 1 D", "1999 1999 8 3 7 2 0 0 S", "2000 2000 3 14 7 2 0 1 D", "2000 2000 9 6 7 1 0 0 S", "2001 2001 3 9 7 1 0 1 D", "2001 2001 8 24 7 1 0 0 S", "2002 2002 2 29 7 1 0 1 D", "2002 2002 9 7 7 1 0 0 S", "2003 2003 2 28 7 1 0 1 D", "2003 2003 9 3 7 1 0 0 S", "2004 2004 3 7 7 1 0 1 D", "2004 2004 8 22 7 1 0 0 S", "2005 2005 3 1 7 2 0 1 D", "2005 2005 9 9 7 2 0 0 S", "2006 2010 2 26 5 2 0 1 D", "2006 2006 9 1 7 2 0 0 S", "2007 2007 8 16 7 2 0 0 S", "2008 2008 9 5 7 2 0 0 S", "2009 2009 8 27 7 2 0 0 S", "2010 2010 8 12 7 2 0 0 S", "2011 2011 3 1 7 2 0 1 D", "2011 2011 9 2 7 2 0 0 S", "2012 2012 2 26 5 2 0 1 D", "2012 2012 8 23 7 2 0 0 S", "2013 9999 2 23 5 2 0 1 D", "2013 2026 9 2 0 2 0 0 S", "2027 2027 9 3 1 2 0 0 S", "2028 9999 9 2 0 2 0 0 S" ],
EgyptAsia:[ "1957 1957 4 10 7 0 0 1 S", "1957 1958 9 1 7 0 0 0", "1958 1958 4 1 7 0 0 1 S", "1959 1967 4 1 7 1 0 1 S", "1959 1965 8 30 7 3 0 0", "1966 1966 9 1 7 3 0 0" ],
Palestine:[ "1999 2005 3 15 5 0 0 1 S", "1999 2003 9 15 5 0 0 0", "2004 2004 9 1 7 1 0 0", "2005 2005 9 4 7 2 0 0", "2006 2007 3 1 7 0 0 1 S", "2006 2006 8 22 7 0 0 0", "2007 2007 8 8 4 2 0 0", "2008 2009 2 5 8 0 0 1 S", "2008 2008 8 1 7 0 0 0", "2009 2009 8 1 5 1 0 0", "2010 2010 2 26 7 0 0 1 S", "2010 2010 7 11 7 0 0 0", "2011 2011 3 1 7 0:1 0 1 S", "2011 2011 7 1 7 0 0 0", "2011 2011 7 30 7 0 0 1 S", "2011 2011 8 30 7 0 0 0", "2012 9999 2 4 8 24 0 1 S", "2012 9999 8 21 5 1 0 0" ],
HK:[ "1941 1941 3 1 7 3:30 0 1 S", "1941 1941 8 30 7 3:30 0 0", "1946 1946 3 20 7 3:30 0 1 S", "1946 1946 11 1 7 3:30 0 0", "1947 1947 3 13 7 3:30 0 1 S", "1947 1947 11 30 7 3:30 0 0", "1948 1948 4 2 7 3:30 0 1 S", "1948 1951 9 0 8 3:30 0 0", "1952 1952 9 25 7 3:30 0 0", "1949 1953 3 1 0 3:30 0 1 S", "1953 1953 10 1 7 3:30 0 0", "1954 1964 2 18 0 3:30 0 1 S", "1954 1954 9 31 7 3:30 0 0", "1955 1964 10 1 0 3:30 0 0", "1965 1976 3 16 0 3:30 0 1 S", "1965 1976 9 16 0 3:30 0 0", "1973 1973 11 30 7 3:30 0 1 S", "1979 1979 4 8 0 3:30 0 1 S", "1979 1979 9 16 0 3:30 0 0" ],
Pakistan:[ "2002 2002 3 2 0 0:1 0 1 S", "2002 2002 9 2 0 0:1 0 0", "2008 2008 5 1 7 0 0 1 S", "2008 2008 10 1 7 0 0 0", "2009 2009 3 15 7 0 0 1 S", "2009 2009 10 1 7 0 0 0" ],
NBorneo:[ "1935 1941 8 14 7 0 0 0:20 TS", "1935 1941 11 14 7 0 0 0" ],
Macau:[ "1961 1962 2 16 0 3:30 0 1 S", "1961 1964 10 1 0 3:30 0 0", "1963 1963 2 16 0 0 0 1 S", "1964 1964 2 16 0 3:30 0 1 S", "1965 1965 2 16 0 0 0 1 S", "1965 1965 9 31 7 0 0 0", "1966 1971 3 16 0 3:30 0 1 S", "1966 1971 9 16 0 3:30 0 0", "1972 1974 3 15 0 0 0 1 S", "1972 1973 9 15 0 0 0 0", "1974 1977 9 15 0 3:30 0 0", "1975 1977 3 15 0 3:30 0 1 S", "1978 1980 3 15 0 0 0 1 S", "1978 1980 9 15 0 0 0 0" ],
Phil:[ "1936 1936 10 1 7 0 0 1 S", "1937 1937 1 1 7 0 0 0", "1954 1954 3 12 7 0 0 1 S", "1954 1954 6 1 7 0 0 0", "1978 1978 2 22 7 0 0 1 S", "1978 1978 8 21 7 0 0 0" ],
Cyprus:[ "1975 1975 3 13 7 0 0 1 S", "1975 1975 9 12 7 0 0 0", "1976 1976 4 15 7 0 0 1 S", "1976 1976 9 11 7 0 0 0", "1977 1980 3 1 0 0 0 1 S", "1977 1977 8 25 7 0 0 0", "1978 1978 9 2 7 0 0 0", "1979 1997 8 0 8 0 0 0", "1981 1998 2 0 8 0 0 1 S" ],
ROK:[ "1960 1960 4 15 7 0 0 1 D", "1960 1960 8 13 7 0 0 0 S", "1987 1988 4 8 0 0 0 1 D", "1987 1988 9 8 0 0 0 0 S" ],
Shang:[ "1940 1940 5 3 7 0 0 1 D", "1940 1941 9 1 7 0 0 0 S", "1941 1941 2 16 7 0 0 1 D" ],
Taiwan:[ "1945 1951 4 1 7 0 0 1 D", "1945 1951 9 1 7 0 0 0 S", "1952 1952 2 1 7 0 0 1 D", "1952 1954 10 1 7 0 0 0 S", "1953 1959 3 1 7 0 0 1 D", "1955 1961 9 1 7 0 0 0 S", "1960 1961 5 1 7 0 0 1 D", "1974 1975 3 1 7 0 0 1 D", "1974 1975 9 1 7 0 0 0 S", "1979 1979 5 30 7 0 0 1 D", "1979 1979 8 30 7 0 0 0 S" ],
"E-EurAsia":[ "1981 9999 2 0 8 0 0 1 S", "1979 1995 8 0 8 0 0 0", "1996 9999 9 0 8 0 0 0" ],
Iran:[ "1978 1980 2 21 7 0 0 1 D", "1978 1978 9 21 7 0 0 0 S", "1979 1979 8 19 7 0 0 0 S", "1980 1980 8 23 7 0 0 0 S", "1991 1991 4 3 7 0 0 1 D", "1992 1995 2 22 7 0 0 1 D", "1991 1995 8 22 7 0 0 0 S", "1996 1996 2 21 7 0 0 1 D", "1996 1996 8 21 7 0 0 0 S", "1997 1999 2 22 7 0 0 1 D", "1997 1999 8 22 7 0 0 0 S", "2000 2000 2 21 7 0 0 1 D", "2000 2000 8 21 7 0 0 0 S", "2001 2003 2 22 7 0 0 1 D", "2001 2003 8 22 7 0 0 0 S", "2004 2004 2 21 7 0 0 1 D", "2004 2004 8 21 7 0 0 0 S", "2005 2005 2 22 7 0 0 1 D", "2005 2005 8 22 7 0 0 0 S", "2008 2008 2 21 7 0 0 1 D", "2008 2008 8 21 7 0 0 0 S", "2009 2011 2 22 7 0 0 1 D", "2009 2011 8 22 7 0 0 0 S", "2012 2012 2 21 7 0 0 1 D", "2012 2012 8 21 7 0 0 0 S", "2013 2015 2 22 7 0 0 1 D", "2013 2015 8 22 7 0 0 0 S", "2016 2016 2 21 7 0 0 1 D", "2016 2016 8 21 7 0 0 0 S", "2017 2019 2 22 7 0 0 1 D", "2017 2019 8 22 7 0 0 0 S", "2020 2020 2 21 7 0 0 1 D", "2020 2020 8 21 7 0 0 0 S", "2021 2023 2 22 7 0 0 1 D", "2021 2023 8 22 7 0 0 0 S", "2024 2024 2 21 7 0 0 1 D", "2024 2024 8 21 7 0 0 0 S", "2025 2027 2 22 7 0 0 1 D", "2025 2027 8 22 7 0 0 0 S", "2028 2029 2 21 7 0 0 1 D", "2028 2029 8 21 7 0 0 0 S", "2030 2031 2 22 7 0 0 1 D", "2030 2031 8 22 7 0 0 0 S", "2032 2033 2 21 7 0 0 1 D", "2032 2033 8 21 7 0 0 0 S", "2034 2035 2 22 7 0 0 1 D", "2034 2035 8 22 7 0 0 0 S", "2036 2037 2 21 7 0 0 1 D", "2036 2037 8 21 7 0 0 0 S" ],
Japan:[ "1948 1948 4 1 0 2 0 1 D", "1948 1951 8 8 6 2 0 0 S", "1949 1949 3 1 0 2 0 1 D", "1950 1951 4 1 0 2 0 1 D" ],
Port:[ "1916 1916 5 17 7 23 0 1 S", "1916 1916 10 1 7 1 0 0", "1917 1917 1 28 7 23 2 1 S", "1917 1921 9 14 7 23 2 0", "1918 1918 2 1 7 23 2 1 S", "1919 1919 1 28 7 23 2 1 S", "1920 1920 1 29 7 23 2 1 S", "1921 1921 1 28 7 23 2 1 S", "1924 1924 3 16 7 23 2 1 S", "1924 1924 9 14 7 23 2 0", "1926 1926 3 17 7 23 2 1 S", "1926 1929 9 1 6 23 2 0", "1927 1927 3 9 7 23 2 1 S", "1928 1928 3 14 7 23 2 1 S", "1929 1929 3 20 7 23 2 1 S", "1931 1931 3 18 7 23 2 1 S", "1931 1932 9 1 6 23 2 0", "1932 1932 3 2 7 23 2 1 S", "1934 1934 3 7 7 23 2 1 S", "1934 1938 9 1 6 23 2 0", "1935 1935 2 30 7 23 2 1 S", "1936 1936 3 18 7 23 2 1 S", "1937 1937 3 3 7 23 2 1 S", "1938 1938 2 26 7 23 2 1 S", "1939 1939 3 15 7 23 2 1 S", "1939 1939 10 18 7 23 2 0", "1940 1940 1 24 7 23 2 1 S", "1940 1941 9 5 7 23 2 0", "1941 1941 3 5 7 23 2 1 S", "1942 1945 2 8 6 23 2 1 S", "1942 1942 3 25 7 22 2 2 M", "1942 1942 7 15 7 22 2 1 S", "1942 1945 9 24 6 23 2 0", "1943 1943 3 17 7 22 2 2 M", "1943 1945 7 25 6 22 2 1 S", "1944 1945 3 21 6 22 2 2 M", "1946 1946 3 1 6 23 2 1 S", "1946 1946 9 1 6 23 2 0", "1947 1949 3 1 0 2 2 1 S", "1947 1949 9 1 0 2 2 0", "1951 1965 3 1 0 2 2 1 S", "1951 1965 9 1 0 2 2 0", "1977 1977 2 27 7 0 2 1 S", "1977 1977 8 25 7 0 2 0", "1978 1979 3 1 0 0 2 1 S", "1978 1978 9 1 7 0 2 0", "1979 1982 8 0 8 1 2 0", "1980 1980 2 0 8 0 2 1 S", "1981 1982 2 0 8 1 2 1 S", "1983 1983 2 0 8 2 2 1 S" ],
"W-Eur":[ "1977 1980 3 1 0 1 2 1 S", "1977 1977 8 0 8 1 2 0", "1978 1978 9 1 7 1 2 0", "1979 1995 8 0 8 1 2 0", "1981 9999 2 0 8 1 2 1 S", "1996 9999 9 0 8 1 2 0" ],
Iceland:[ "1917 1918 1 19 7 23 0 1 S", "1917 1917 9 21 7 1 0 0", "1918 1918 10 16 7 1 0 0", "1939 1939 3 29 7 23 0 1 S", "1939 1939 10 29 7 2 0 0", "1940 1940 1 25 7 2 0 1 S", "1940 1940 10 3 7 2 0 0", "1941 1941 2 2 7 1 2 1 S", "1941 1941 10 2 7 1 2 0", "1942 1942 2 8 7 1 2 1 S", "1942 1942 9 25 7 1 2 0", "1943 1946 2 1 0 1 2 1 S", "1943 1948 9 22 0 1 2 0", "1947 1967 3 1 0 1 2 1 S", "1949 1949 9 30 7 1 2 0", "1950 1966 9 22 0 1 2 0", "1967 1967 9 29 7 1 2 0" ],
Falk:[ "1937 1938 8 0 8 0 0 1 S", "1938 1942 2 19 0 0 0 0", "1939 1939 9 1 7 0 0 1 S", "1940 1942 8 0 8 0 0 1 S", "1943 1943 0 1 7 0 0 0", "1983 1983 8 0 8 0 0 1 S", "1984 1985 3 0 8 0 0 0", "1984 1984 8 16 7 0 0 1 S", "1985 2000 8 9 0 0 0 1 S", "1986 2000 3 16 0 0 0 0", "2001 2010 3 15 0 2 0 0", "2001 2010 8 1 0 2 0 1 S" ],
AS:[ "1971 1985 9 0 8 2 2 1", "1986 1986 9 19 7 2 2 1", "1987 2007 9 0 8 2 2 1", "1972 1972 1 27 7 2 2 0", "1973 1985 2 1 0 2 2 0", "1986 1990 2 15 0 2 2 0", "1991 1991 2 3 7 2 2 0", "1992 1992 2 22 7 2 2 0", "1993 1993 2 7 7 2 2 0", "1994 1994 2 20 7 2 2 0", "1995 2005 2 0 8 2 2 0", "2006 2006 3 2 7 2 2 0", "2007 2007 2 0 8 2 2 0", "2008 9999 3 1 0 2 2 0", "2008 9999 9 1 0 2 2 1" ],
AQ:[ "1971 1971 9 0 8 2 2 1", "1972 1972 1 0 8 2 2 0", "1989 1991 9 0 8 2 2 1", "1990 1992 2 1 0 2 2 0" ],
AN:[ "1971 1985 9 0 8 2 2 1", "1972 1972 1 27 7 2 2 0", "1973 1981 2 1 0 2 2 0", "1982 1982 3 1 0 2 2 0", "1983 1985 2 1 0 2 2 0", "1986 1989 2 15 0 2 2 0", "1986 1986 9 19 7 2 2 1", "1987 1999 9 0 8 2 2 1", "1990 1995 2 1 0 2 2 0", "1996 2005 2 0 8 2 2 0", "2000 2000 7 0 8 2 2 1", "2001 2007 9 0 8 2 2 1", "2006 2006 3 1 0 2 2 0", "2007 2007 2 0 8 2 2 0", "2008 9999 3 1 0 2 2 0", "2008 9999 9 1 0 2 2 1" ],
AW:[ "1974 1974 9 0 8 2 2 1", "1975 1975 2 1 0 2 2 0", "1983 1983 9 0 8 2 2 1", "1984 1984 2 1 0 2 2 0", "1991 1991 10 17 7 2 2 1", "1992 1992 2 1 0 2 2 0", "2006 2006 11 3 7 2 2 1", "2007 2009 2 0 8 2 2 0", "2007 2008 9 0 8 2 2 1" ],
Holiday:[ "1992 1993 9 0 8 2 2 1", "1993 1994 2 1 0 2 2 0" ],
LH:[ "1981 1984 9 0 8 2 0 1", "1982 1985 2 1 0 2 0 0", "1985 1985 9 0 8 2 0 0:30", "1986 1989 2 15 0 2 0 0", "1986 1986 9 19 7 2 0 0:30", "1987 1999 9 0 8 2 0 0:30", "1990 1995 2 1 0 2 0 0", "1996 2005 2 0 8 2 0 0", "2000 2000 7 0 8 2 0 0:30", "2001 2007 9 0 8 2 0 0:30", "2006 2006 3 1 0 2 0 0", "2007 2007 2 0 8 2 0 0", "2008 9999 3 1 0 2 0 0", "2008 9999 9 1 0 2 0 0:30" ],
AV:[ "1971 1985 9 0 8 2 2 1", "1972 1972 1 0 8 2 2 0", "1973 1985 2 1 0 2 2 0", "1986 1990 2 15 0 2 2 0", "1986 1987 9 15 0 2 2 1", "1988 1999 9 0 8 2 2 1", "1991 1994 2 1 0 2 2 0", "1995 2005 2 0 8 2 2 0", "2000 2000 7 0 8 2 2 1", "2001 2007 9 0 8 2 2 1", "2006 2006 3 1 0 2 2 0", "2007 2007 2 0 8 2 2 0", "2008 9999 3 1 0 2 2 0", "2008 9999 9 1 0 2 2 1" ],
Neth:[ "1916 1916 4 1 7 0 0 1 NST", "1916 1916 9 1 7 0 0 0 AMT", "1917 1917 3 16 7 2 2 1 NST", "1917 1917 8 17 7 2 2 0 AMT", "1918 1921 3 1 1 2 2 1 NST", "1918 1921 8 1 8 2 2 0 AMT", "1922 1922 2 0 8 2 2 1 NST", "1922 1936 9 2 0 2 2 0 AMT", "1923 1923 5 1 5 2 2 1 NST", "1924 1924 2 0 8 2 2 1 NST", "1925 1925 5 1 5 2 2 1 NST", "1926 1931 4 15 7 2 2 1 NST", "1932 1932 4 22 7 2 2 1 NST", "1933 1936 4 15 7 2 2 1 NST", "1937 1937 4 22 7 2 2 1 NST", "1937 1937 6 1 7 0 0 1 S", "1937 1939 9 2 0 2 2 0", "1938 1939 4 15 7 2 2 1 S", "1945 1945 3 2 7 2 2 1 S", "1945 1945 8 16 7 2 2 0" ],
Greece:[ "1932 1932 6 7 7 0 0 1 S", "1932 1932 8 1 7 0 0 0", "1941 1941 3 7 7 0 0 1 S", "1942 1942 10 2 7 3 0 0", "1943 1943 2 30 7 0 0 1 S", "1943 1943 9 4 7 0 0 0", "1952 1952 6 1 7 0 0 1 S", "1952 1952 10 2 7 0 0 0", "1975 1975 3 12 7 0 2 1 S", "1975 1975 10 26 7 0 2 0", "1976 1976 3 11 7 2 2 1 S", "1976 1976 9 10 7 2 2 0", "1977 1978 3 1 0 2 2 1 S", "1977 1977 8 26 7 2 2 0", "1978 1978 8 24 7 4 0 0", "1979 1979 3 1 7 9 0 1 S", "1979 1979 8 29 7 2 0 0", "1980 1980 3 1 7 0 0 1 S", "1980 1980 8 28 7 0 0 0" ],
SovietZone:[ "1945 1945 4 24 7 2 0 2 M", "1945 1945 8 24 7 3 0 1 S", "1945 1945 10 18 7 2 2 0" ],
Germany:[ "1946 1946 3 14 7 2 2 1 S", "1946 1946 9 7 7 2 2 0", "1947 1949 9 1 0 2 2 0", "1947 1947 3 6 7 3 2 1 S", "1947 1947 4 11 7 2 2 2 M", "1947 1947 5 29 7 3 0 1 S", "1948 1948 3 18 7 2 2 1 S", "1949 1949 3 10 7 2 2 1 S" ],
Czech:[ "1945 1945 3 8 7 2 2 1 S", "1945 1945 10 18 7 2 2 0", "1946 1946 4 6 7 2 2 1 S", "1946 1949 9 1 0 2 2 0", "1947 1947 3 20 7 2 2 1 S", "1948 1948 3 18 7 2 2 1 S", "1949 1949 3 9 7 2 2 1 S" ],
Belgium:[ "1918 1918 2 9 7 0 2 1 S", "1918 1919 9 1 6 23 2 0", "1919 1919 2 1 7 23 2 1 S", "1920 1920 1 14 7 23 2 1 S", "1920 1920 9 23 7 23 2 0", "1921 1921 2 14 7 23 2 1 S", "1921 1921 9 25 7 23 2 0", "1922 1922 2 25 7 23 2 1 S", "1922 1927 9 1 6 23 2 0", "1923 1923 3 21 7 23 2 1 S", "1924 1924 2 29 7 23 2 1 S", "1925 1925 3 4 7 23 2 1 S", "1926 1926 3 17 7 23 2 1 S", "1927 1927 3 9 7 23 2 1 S", "1928 1928 3 14 7 23 2 1 S", "1928 1938 9 2 0 2 2 0", "1929 1929 3 21 7 2 2 1 S", "1930 1930 3 13 7 2 2 1 S", "1931 1931 3 19 7 2 2 1 S", "1932 1932 3 3 7 2 2 1 S", "1933 1933 2 26 7 2 2 1 S", "1934 1934 3 8 7 2 2 1 S", "1935 1935 2 31 7 2 2 1 S", "1936 1936 3 19 7 2 2 1 S", "1937 1937 3 4 7 2 2 1 S", "1938 1938 2 27 7 2 2 1 S", "1939 1939 3 16 7 2 2 1 S", "1939 1939 10 19 7 2 2 0", "1940 1940 1 25 7 2 2 1 S", "1944 1944 8 17 7 2 2 0", "1945 1945 3 2 7 2 2 1 S", "1945 1945 8 16 7 2 2 0", "1946 1946 4 19 7 2 2 1 S", "1946 1946 9 7 7 2 2 0" ],
Romania:[ "1932 1932 4 21 7 0 2 1 S", "1932 1939 9 1 0 0 2 0", "1933 1939 3 2 0 0 2 1 S", "1979 1979 4 27 7 0 0 1 S", "1979 1979 8 0 8 0 0 0", "1980 1980 3 5 7 23 0 1 S", "1980 1980 8 0 8 1 0 0", "1991 1993 2 0 8 0 2 1 S", "1991 1993 8 0 8 0 2 0" ],
"E-Eur":[ "1977 1980 3 1 0 0 0 1 S", "1977 1977 8 0 8 0 0 0", "1978 1978 9 1 7 0 0 0", "1979 1995 8 0 8 0 0 0", "1981 9999 2 0 8 0 0 1 S", "1996 9999 9 0 8 0 0 0" ],
Hungary:[ "1918 1918 3 1 7 3 0 1 S", "1918 1918 8 29 7 3 0 0", "1919 1919 3 15 7 3 0 1 S", "1919 1919 8 15 7 3 0 0", "1920 1920 3 5 7 3 0 1 S", "1920 1920 8 30 7 3 0 0", "1945 1945 4 1 7 23 0 1 S", "1945 1945 10 3 7 0 0 0", "1946 1946 2 31 7 2 2 1 S", "1946 1949 9 1 0 2 2 0", "1947 1949 3 4 0 2 2 1 S", "1950 1950 3 17 7 2 2 1 S", "1950 1950 9 23 7 2 2 0", "1954 1955 4 23 7 0 0 1 S", "1954 1955 9 3 7 0 0 0", "1956 1956 5 1 0 0 0 1 S", "1956 1956 8 0 8 0 0 0", "1957 1957 5 1 0 1 0 1 S", "1957 1957 8 0 8 3 0 0", "1980 1980 3 6 7 1 0 1 S" ],
Swiss:[ "1941 1942 4 1 1 1 0 1 S", "1941 1942 9 1 1 2 0 0" ],
Denmark:[ "1916 1916 4 14 7 23 0 1 S", "1916 1916 8 30 7 23 0 0", "1940 1940 4 15 7 0 0 1 S", "1945 1945 3 2 7 2 2 1 S", "1945 1945 7 15 7 2 2 0", "1946 1946 4 1 7 2 2 1 S", "1946 1946 8 1 7 2 2 0", "1947 1947 4 4 7 2 2 1 S", "1947 1947 7 10 7 2 2 0", "1948 1948 4 9 7 2 2 1 S", "1948 1948 7 8 7 2 2 0" ],
"GB-Eire":[ "1916 1916 4 21 7 2 2 1 BST", "1916 1916 9 1 7 2 2 0 GMT", "1917 1917 3 8 7 2 2 1 BST", "1917 1917 8 17 7 2 2 0 GMT", "1918 1918 2 24 7 2 2 1 BST", "1918 1918 8 30 7 2 2 0 GMT", "1919 1919 2 30 7 2 2 1 BST", "1919 1919 8 29 7 2 2 0 GMT", "1920 1920 2 28 7 2 2 1 BST", "1920 1920 9 25 7 2 2 0 GMT", "1921 1921 3 3 7 2 2 1 BST", "1921 1921 9 3 7 2 2 0 GMT", "1922 1922 2 26 7 2 2 1 BST", "1922 1922 9 8 7 2 2 0 GMT", "1923 1923 3 16 0 2 2 1 BST", "1923 1924 8 16 0 2 2 0 GMT", "1924 1924 3 9 0 2 2 1 BST", "1925 1926 3 16 0 2 2 1 BST", "1925 1938 9 2 0 2 2 0 GMT", "1927 1927 3 9 0 2 2 1 BST", "1928 1929 3 16 0 2 2 1 BST", "1930 1930 3 9 0 2 2 1 BST", "1931 1932 3 16 0 2 2 1 BST", "1933 1933 3 9 0 2 2 1 BST", "1934 1934 3 16 0 2 2 1 BST", "1935 1935 3 9 0 2 2 1 BST", "1936 1937 3 16 0 2 2 1 BST", "1938 1938 3 9 0 2 2 1 BST", "1939 1939 3 16 0 2 2 1 BST", "1939 1939 10 16 0 2 2 0 GMT", "1940 1940 1 23 0 2 2 1 BST", "1941 1941 4 2 0 1 2 2 BDST", "1941 1943 7 9 0 1 2 1 BST", "1942 1944 3 2 0 1 2 2 BDST", "1944 1944 8 16 0 1 2 1 BST", "1945 1945 3 2 1 1 2 2 BDST", "1945 1945 6 9 0 1 2 1 BST", "1945 1946 9 2 0 2 2 0 GMT", "1946 1946 3 9 0 2 2 1 BST", "1947 1947 2 16 7 2 2 1 BST", "1947 1947 3 13 7 1 2 2 BDST", "1947 1947 7 10 7 1 2 1 BST", "1947 1947 10 2 7 2 2 0 GMT", "1948 1948 2 14 7 2 2 1 BST", "1948 1948 9 31 7 2 2 0 GMT", "1949 1949 3 3 7 2 2 1 BST", "1949 1949 9 30 7 2 2 0 GMT", "1950 1952 3 14 0 2 2 1 BST", "1950 1952 9 21 0 2 2 0 GMT", "1953 1953 3 16 0 2 2 1 BST", "1953 1960 9 2 0 2 2 0 GMT", "1954 1954 3 9 0 2 2 1 BST", "1955 1956 3 16 0 2 2 1 BST", "1957 1957 3 9 0 2 2 1 BST", "1958 1959 3 16 0 2 2 1 BST", "1960 1960 3 9 0 2 2 1 BST", "1961 1963 2 0 8 2 2 1 BST", "1961 1968 9 23 0 2 2 0 GMT", "1964 1967 2 19 0 2 2 1 BST", "1968 1968 1 18 7 2 2 1 BST", "1972 1980 2 16 0 2 2 1 BST", "1972 1980 9 23 0 2 2 0 GMT", "1981 1995 2 0 8 1 1 1 BST", "1981 1989 9 23 0 1 1 0 GMT", "1990 1995 9 22 0 1 1 0 GMT" ],
Finland:[ "1942 1942 3 3 7 0 0 1 S", "1942 1942 9 3 7 0 0 0", "1981 1982 2 0 8 2 0 1 S", "1981 1982 8 0 8 3 0 0" ],
Turkey:[ "1916 1916 4 1 7 0 0 1 S", "1916 1916 9 1 7 0 0 0", "1920 1920 2 28 7 0 0 1 S", "1920 1920 9 25 7 0 0 0", "1921 1921 3 3 7 0 0 1 S", "1921 1921 9 3 7 0 0 0", "1922 1922 2 26 7 0 0 1 S", "1922 1922 9 8 7 0 0 0", "1924 1924 4 13 7 0 0 1 S", "1924 1925 9 1 7 0 0 0", "1925 1925 4 1 7 0 0 1 S", "1940 1940 5 30 7 0 0 1 S", "1940 1940 9 5 7 0 0 0", "1940 1940 11 1 7 0 0 1 S", "1941 1941 8 21 7 0 0 0", "1942 1942 3 1 7 0 0 1 S", "1942 1942 10 1 7 0 0 0", "1945 1945 3 2 7 0 0 1 S", "1945 1945 9 8 7 0 0 0", "1946 1946 5 1 7 0 0 1 S", "1946 1946 9 1 7 0 0 0", "1947 1948 3 16 0 0 0 1 S", "1947 1950 9 2 0 0 0 0", "1949 1949 3 10 7 0 0 1 S", "1950 1950 3 19 7 0 0 1 S", "1951 1951 3 22 7 0 0 1 S", "1951 1951 9 8 7 0 0 0", "1962 1962 6 15 7 0 0 1 S", "1962 1962 9 8 7 0 0 0", "1964 1964 4 15 7 0 0 1 S", "1964 1964 9 1 7 0 0 0", "1970 1972 4 2 0 0 0 1 S", "1970 1972 9 2 0 0 0 0", "1973 1973 5 3 7 1 0 1 S", "1973 1973 10 4 7 3 0 0", "1974 1974 2 31 7 2 0 1 S", "1974 1974 10 3 7 5 0 0", "1975 1975 2 30 7 0 0 1 S", "1975 1976 9 0 8 0 0 0", "1976 1976 5 1 7 0 0 1 S", "1977 1978 3 1 0 0 0 1 S", "1977 1977 9 16 7 0 0 0", "1979 1980 3 1 0 3 0 1 S", "1979 1982 9 11 1 0 0 0", "1981 1982 2 0 8 3 0 1 S", "1983 1983 6 31 7 0 0 1 S", "1983 1983 9 2 7 0 0 0", "1985 1985 3 20 7 0 0 1 S", "1985 1985 8 28 7 0 0 0", "1986 1990 2 0 8 2 2 1 S", "1986 1990 8 0 8 2 2 0", "1991 2006 2 0 8 1 2 1 S", "1991 1995 8 0 8 1 2 0", "1996 2006 9 0 8 1 2 0" ],
Poland:[ "1918 1919 8 16 7 2 2 0", "1919 1919 3 15 7 2 2 1 S", "1944 1944 3 3 7 2 2 1 S", "1944 1944 9 4 7 2 0 0", "1945 1945 3 29 7 0 0 1 S", "1945 1945 10 1 7 0 0 0", "1946 1946 3 14 7 0 2 1 S", "1946 1946 9 7 7 2 2 0", "1947 1947 4 4 7 2 2 1 S", "1947 1949 9 1 0 2 2 0", "1948 1948 3 18 7 2 2 1 S", "1949 1949 3 10 7 2 2 1 S", "1957 1957 5 2 7 1 2 1 S", "1957 1958 8 0 8 1 2 0", "1958 1958 2 30 7 1 2 1 S", "1959 1959 4 31 7 1 2 1 S", "1959 1961 9 1 0 1 2 0", "1960 1960 3 3 7 1 2 1 S", "1961 1964 4 0 8 1 2 1 S", "1962 1964 8 0 8 1 2 0" ],
Lux:[ "1916 1916 4 14 7 23 0 1 S", "1916 1916 9 1 7 1 0 0", "1917 1917 3 28 7 23 0 1 S", "1917 1917 8 17 7 1 0 0", "1918 1918 3 15 1 2 2 1 S", "1918 1918 8 15 1 2 2 0", "1919 1919 2 1 7 23 0 1 S", "1919 1919 9 5 7 3 0 0", "1920 1920 1 14 7 23 0 1 S", "1920 1920 9 24 7 2 0 0", "1921 1921 2 14 7 23 0 1 S", "1921 1921 9 26 7 2 0 0", "1922 1922 2 25 7 23 0 1 S", "1922 1922 9 2 0 1 0 0", "1923 1923 3 21 7 23 0 1 S", "1923 1923 9 2 0 2 0 0", "1924 1924 2 29 7 23 0 1 S", "1924 1928 9 2 0 1 0 0", "1925 1925 3 5 7 23 0 1 S", "1926 1926 3 17 7 23 0 1 S", "1927 1927 3 9 7 23 0 1 S", "1928 1928 3 14 7 23 0 1 S", "1929 1929 3 20 7 23 0 1 S" ],
Italy:[ "1916 1916 5 3 7 0 2 1 S", "1916 1916 9 1 7 0 2 0", "1917 1917 3 1 7 0 2 1 S", "1917 1917 8 30 7 0 2 0", "1918 1918 2 10 7 0 2 1 S", "1918 1919 9 1 0 0 2 0", "1919 1919 2 2 7 0 2 1 S", "1920 1920 2 21 7 0 2 1 S", "1920 1920 8 19 7 0 2 0", "1940 1940 5 15 7 0 2 1 S", "1944 1944 8 17 7 0 2 0", "1945 1945 3 2 7 2 0 1 S", "1945 1945 8 15 7 0 2 0", "1946 1946 2 17 7 2 2 1 S", "1946 1946 9 6 7 2 2 0", "1947 1947 2 16 7 0 2 1 S", "1947 1947 9 5 7 0 2 0", "1948 1948 1 29 7 2 2 1 S", "1948 1948 9 3 7 2 2 0", "1966 1968 4 22 0 0 0 1 S", "1966 1969 8 22 0 0 0 0", "1969 1969 5 1 7 0 0 1 S", "1970 1970 4 31 7 0 0 1 S", "1970 1970 8 0 8 0 0 0", "1971 1972 4 22 0 0 0 1 S", "1971 1971 8 0 8 1 0 0", "1972 1972 9 1 7 0 0 0", "1973 1973 5 3 7 0 0 1 S", "1973 1974 8 0 8 0 0 0", "1974 1974 4 26 7 0 0 1 S", "1975 1975 5 1 7 0 2 1 S", "1975 1977 8 0 8 0 2 0", "1976 1976 4 30 7 0 2 1 S", "1977 1979 4 22 0 0 2 1 S", "1978 1978 9 1 7 0 2 0", "1979 1979 8 30 7 0 2 0" ],
Malta:[ "1973 1973 2 31 7 0 2 1 S", "1973 1973 8 29 7 0 2 0", "1974 1974 3 21 7 0 2 1 S", "1974 1974 8 16 7 0 2 0", "1975 1979 3 15 0 2 0 1 S", "1975 1980 8 15 0 2 0 0", "1980 1980 2 31 7 2 0 1 S" ],
France:[ "1916 1916 5 14 7 23 2 1 S", "1916 1919 9 1 0 23 2 0", "1917 1917 2 24 7 23 2 1 S", "1918 1918 2 9 7 23 2 1 S", "1919 1919 2 1 7 23 2 1 S", "1920 1920 1 14 7 23 2 1 S", "1920 1920 9 23 7 23 2 0", "1921 1921 2 14 7 23 2 1 S", "1921 1921 9 25 7 23 2 0", "1922 1922 2 25 7 23 2 1 S", "1922 1938 9 1 6 23 2 0", "1923 1923 4 26 7 23 2 1 S", "1924 1924 2 29 7 23 2 1 S", "1925 1925 3 4 7 23 2 1 S", "1926 1926 3 17 7 23 2 1 S", "1927 1927 3 9 7 23 2 1 S", "1928 1928 3 14 7 23 2 1 S", "1929 1929 3 20 7 23 2 1 S", "1930 1930 3 12 7 23 2 1 S", "1931 1931 3 18 7 23 2 1 S", "1932 1932 3 2 7 23 2 1 S", "1933 1933 2 25 7 23 2 1 S", "1934 1934 3 7 7 23 2 1 S", "1935 1935 2 30 7 23 2 1 S", "1936 1936 3 18 7 23 2 1 S", "1937 1937 3 3 7 23 2 1 S", "1938 1938 2 26 7 23 2 1 S", "1939 1939 3 15 7 23 2 1 S", "1939 1939 10 18 7 23 2 0", "1940 1940 1 25 7 2 0 1 S", "1941 1941 4 5 7 0 0 2 M", "1941 1941 9 6 7 0 0 1 S", "1942 1942 2 9 7 0 0 2 M", "1942 1942 10 2 7 3 0 1 S", "1943 1943 2 29 7 2 0 2 M", "1943 1943 9 4 7 3 0 1 S", "1944 1944 3 3 7 2 0 2 M", "1944 1944 9 8 7 1 0 1 S", "1945 1945 3 2 7 2 0 2 M", "1945 1945 8 16 7 3 0 0", "1976 1976 2 28 7 1 0 1 S", "1976 1976 8 26 7 1 0 0" ],
Latvia:[ "1989 1996 2 0 8 2 2 1 S", "1989 1996 8 0 8 2 2 0" ],
Bulg:[ "1979 1979 2 31 7 23 0 1 S", "1979 1979 9 1 7 1 0 0", "1980 1982 3 1 6 23 0 1 S", "1980 1980 8 29 7 1 0 0", "1981 1981 8 27 7 2 0 0" ],
Albania:[ "1940 1940 5 16 7 0 0 1 S", "1942 1942 10 2 7 3 0 0", "1943 1943 2 29 7 2 0 1 S", "1943 1943 3 10 7 3 0 0", "1974 1974 4 4 7 0 0 1 S", "1974 1974 9 2 7 0 0 0", "1975 1975 4 1 7 0 0 1 S", "1975 1975 9 2 7 0 0 0", "1976 1976 4 2 7 0 0 1 S", "1976 1976 9 3 7 0 0 0", "1977 1977 4 8 7 0 0 1 S", "1977 1977 9 2 7 0 0 0", "1978 1978 4 6 7 0 0 1 S", "1978 1978 9 1 7 0 0 0", "1979 1979 4 5 7 0 0 1 S", "1979 1979 8 30 7 0 0 0", "1980 1980 4 3 7 0 0 1 S", "1980 1980 9 4 7 0 0 0", "1981 1981 3 26 7 0 0 1 S", "1981 1981 8 27 7 0 0 0", "1982 1982 4 2 7 0 0 1 S", "1982 1982 9 3 7 0 0 0", "1983 1983 3 18 7 0 0 1 S", "1983 1983 9 1 7 0 0 0", "1984 1984 3 1 7 0 0 1 S" ],
Austria:[ "1920 1920 3 5 7 2 2 1 S", "1920 1920 8 13 7 2 2 0", "1946 1946 3 14 7 2 2 1 S", "1946 1948 9 1 0 2 2 0", "1947 1947 3 6 7 2 2 1 S", "1948 1948 3 18 7 2 2 1 S", "1980 1980 3 6 7 0 0 1 S", "1980 1980 8 28 7 0 0 0" ],
Mauritius:[ "1982 1982 9 10 7 0 0 1 S", "1983 1983 2 21 7 0 0 0", "2008 2008 9 0 8 2 0 1 S", "2009 2009 2 0 8 2 0 0" ],
WS:[ "2012 9999 8 0 8 3 0 1 D", "2012 9999 3 1 0 4 0 0" ],
NZ:[ "1927 1927 10 6 7 2 0 1 S", "1928 1928 2 4 7 2 0 0 M", "1928 1933 9 8 0 2 0 0:30 S", "1929 1933 2 15 0 2 0 0 M", "1934 1940 3 0 8 2 0 0 M", "1934 1940 8 0 8 2 0 0:30 S", "1946 1946 0 1 7 0 0 0 S", "1974 1974 10 1 0 2 2 1 D", "1975 1975 1 0 8 2 2 0 S", "1975 1988 9 0 8 2 2 1 D", "1976 1989 2 1 0 2 2 0 S", "1989 1989 9 8 0 2 2 1 D", "1990 2006 9 1 0 2 2 1 D", "1990 2007 2 15 0 2 2 0 S", "2007 9999 8 0 8 2 2 1 D", "2008 9999 3 1 0 2 2 0 S" ],
Chatham:[ "1974 1974 10 1 0 2:45 2 1 D", "1975 1975 1 0 8 2:45 2 0 S", "1975 1988 9 0 8 2:45 2 1 D", "1976 1989 2 1 0 2:45 2 0 S", "1989 1989 9 8 0 2:45 2 1 D", "1990 2006 9 1 0 2:45 2 1 D", "1990 2007 2 15 0 2:45 2 0 S", "2007 9999 8 0 8 2:45 2 1 D", "2008 9999 3 1 0 2:45 2 0 S" ],
Vanuatu:[ "1983 1983 8 25 7 0 0 1 S", "1984 1991 2 23 0 0 0 0", "1984 1984 9 23 7 0 0 1 S", "1985 1991 8 23 0 0 0 1 S", "1992 1993 0 23 0 0 0 0", "1992 1992 9 23 0 0 0 1 S" ],
Fiji:[ "1998 1999 10 1 0 2 0 1 S", "1999 2000 1 0 8 3 0 0", "2009 2009 10 29 7 2 0 1 S", "2010 2010 2 0 8 3 0 0", "2010 9999 9 18 0 2 0 1 S", "2011 2011 2 1 0 3 0 0", "2012 9999 0 18 0 3 0 0" ],
NC:[ "1977 1978 11 1 0 0 0 1 S", "1978 1979 1 27 7 0 0 0", "1996 1996 11 1 7 2 2 1 S", "1997 1997 2 2 7 2 2 0" ],
Cook:[ "1978 1978 10 12 7 0 0 0:30 HS", "1979 1991 2 1 0 0 0 0", "1979 1990 9 0 8 0 0 0:30 HS" ],
Tonga:[ "1999 1999 9 7 7 2 2 1 S", "2000 2000 2 19 7 2 2 0", "2000 2001 10 1 0 2 0 1 S", "2001 2002 0 0 8 2 0 0" ]
},
links:{
"America/Kralendijk":"America/Curacao",
"America/Lower_Princes":"America/Curacao",
"America/Marigot":"America/Guadeloupe",
"America/Shiprock":"America/Denver",
"America/St_Barthelemy":"America/Guadeloupe",
"Antarctica/South_Pole":"Antarctica/McMurdo",
"Arctic/Longyearbyen":"Europe/Oslo",
"Europe/Bratislava":"Europe/Prague",
"Europe/Busingen":"Europe/Zurich",
"Europe/Guernsey":"Europe/London",
"Europe/Isle_of_Man":"Europe/London",
"Europe/Jersey":"Europe/London",
"Europe/Ljubljana":"Europe/Belgrade",
"Europe/Mariehamn":"Europe/Helsinki",
"Europe/Podgorica":"Europe/Belgrade",
"Europe/San_Marino":"Europe/Rome",
"Europe/Sarajevo":"Europe/Belgrade",
"Europe/Skopje":"Europe/Belgrade",
"Europe/Vatican":"Europe/Rome",
"Europe/Zagreb":"Europe/Belgrade"
}
}), /**
 * @summary     DataTables
 * @description Paginate, search and sort HTML tables
 * @version     1.9.4
 * @file        jquery.dataTables.js
 * @author      Allan Jardine (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 *
 * @copyright Copyright 2008-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 * 
 * This source file is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 * 
 * For details please refer to: http://www.datatables.net
 */
function(window, document, undefined) {
!function(factory) {
"use strict";
"function" == typeof define && define.amd ? define([ "jquery" ], factory) :jQuery && !jQuery.fn.dataTable && factory(jQuery);
}(function($) {
"use strict";
var DataTable = function(oInit) {
function _fnAddColumn(oSettings, nTh) {
var oDefaults = DataTable.defaults.columns, iCol = oSettings.aoColumns.length, oCol = $.extend({}, DataTable.models.oColumn, oDefaults, {
sSortingClass:oSettings.oClasses.sSortable,
sSortingClassJUI:oSettings.oClasses.sSortJUI,
nTh:nTh ? nTh :document.createElement("th"),
sTitle:oDefaults.sTitle ? oDefaults.sTitle :nTh ? nTh.innerHTML :"",
aDataSort:oDefaults.aDataSort ? oDefaults.aDataSort :[ iCol ],
mData:oDefaults.mData ? oDefaults.oDefaults :iCol
});
if (oSettings.aoColumns.push(oCol), oSettings.aoPreSearchCols[iCol] === undefined || null === oSettings.aoPreSearchCols[iCol]) oSettings.aoPreSearchCols[iCol] = $.extend({}, DataTable.models.oSearch); else {
var oPre = oSettings.aoPreSearchCols[iCol];
oPre.bRegex === undefined && (oPre.bRegex = !0), oPre.bSmart === undefined && (oPre.bSmart = !0), 
oPre.bCaseInsensitive === undefined && (oPre.bCaseInsensitive = !0);
}
_fnColumnOptions(oSettings, iCol, null);
}
function _fnColumnOptions(oSettings, iCol, oOptions) {
var oCol = oSettings.aoColumns[iCol];
oOptions !== undefined && null !== oOptions && (oOptions.mDataProp && !oOptions.mData && (oOptions.mData = oOptions.mDataProp), 
oOptions.sType !== undefined && (oCol.sType = oOptions.sType, oCol._bAutoType = !1), 
$.extend(oCol, oOptions), _fnMap(oCol, oOptions, "sWidth", "sWidthOrig"), oOptions.iDataSort !== undefined && (oCol.aDataSort = [ oOptions.iDataSort ]), 
_fnMap(oCol, oOptions, "aDataSort"));
var mRender = oCol.mRender ? _fnGetObjectDataFn(oCol.mRender) :null, mData = _fnGetObjectDataFn(oCol.mData);
oCol.fnGetData = function(oData, sSpecific) {
var innerData = mData(oData, sSpecific);
return oCol.mRender && sSpecific && "" !== sSpecific ? mRender(innerData, sSpecific, oData) :innerData;
}, oCol.fnSetData = _fnSetObjectDataFn(oCol.mData), oSettings.oFeatures.bSort || (oCol.bSortable = !1), 
!oCol.bSortable || -1 == $.inArray("asc", oCol.asSorting) && -1 == $.inArray("desc", oCol.asSorting) ? (oCol.sSortingClass = oSettings.oClasses.sSortableNone, 
oCol.sSortingClassJUI = "") :-1 == $.inArray("asc", oCol.asSorting) && -1 == $.inArray("desc", oCol.asSorting) ? (oCol.sSortingClass = oSettings.oClasses.sSortable, 
oCol.sSortingClassJUI = oSettings.oClasses.sSortJUI) :-1 != $.inArray("asc", oCol.asSorting) && -1 == $.inArray("desc", oCol.asSorting) ? (oCol.sSortingClass = oSettings.oClasses.sSortableAsc, 
oCol.sSortingClassJUI = oSettings.oClasses.sSortJUIAscAllowed) :-1 == $.inArray("asc", oCol.asSorting) && -1 != $.inArray("desc", oCol.asSorting) && (oCol.sSortingClass = oSettings.oClasses.sSortableDesc, 
oCol.sSortingClassJUI = oSettings.oClasses.sSortJUIDescAllowed);
}
function _fnAdjustColumnSizing(oSettings) {
if (oSettings.oFeatures.bAutoWidth === !1) return !1;
_fnCalculateColumnWidths(oSettings);
for (var i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) oSettings.aoColumns[i].nTh.style.width = oSettings.aoColumns[i].sWidth;
}
function _fnVisibleToColumnIndex(oSettings, iMatch) {
var aiVis = _fnGetColumns(oSettings, "bVisible");
return "number" == typeof aiVis[iMatch] ? aiVis[iMatch] :null;
}
function _fnColumnIndexToVisible(oSettings, iMatch) {
var aiVis = _fnGetColumns(oSettings, "bVisible"), iPos = $.inArray(iMatch, aiVis);
return -1 !== iPos ? iPos :null;
}
function _fnVisbleColumns(oSettings) {
return _fnGetColumns(oSettings, "bVisible").length;
}
function _fnGetColumns(oSettings, sParam) {
var a = [];
return $.map(oSettings.aoColumns, function(val, i) {
val[sParam] && a.push(i);
}), a;
}
function _fnDetectType(sData) {
for (var aTypes = DataTable.ext.aTypes, iLen = aTypes.length, i = 0; iLen > i; i++) {
var sType = aTypes[i](sData);
if (null !== sType) return sType;
}
return "string";
}
function _fnReOrderIndex(oSettings, sColumns) {
for (var aColumns = sColumns.split(","), aiReturn = [], i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) for (var j = 0; iLen > j; j++) if (oSettings.aoColumns[i].sName == aColumns[j]) {
aiReturn.push(j);
break;
}
return aiReturn;
}
function _fnColumnOrdering(oSettings) {
for (var sNames = "", i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) sNames += oSettings.aoColumns[i].sName + ",";
return sNames.length == iLen ? "" :sNames.slice(0, -1);
}
function _fnApplyColumnDefs(oSettings, aoColDefs, aoCols, fn) {
var i, iLen, j, jLen, k, kLen;
if (aoColDefs) for (i = aoColDefs.length - 1; i >= 0; i--) {
var aTargets = aoColDefs[i].aTargets;
for ($.isArray(aTargets) || _fnLog(oSettings, 1, "aTargets must be an array of targets, not a " + typeof aTargets), 
j = 0, jLen = aTargets.length; jLen > j; j++) if ("number" == typeof aTargets[j] && aTargets[j] >= 0) {
for (;oSettings.aoColumns.length <= aTargets[j]; ) _fnAddColumn(oSettings);
fn(aTargets[j], aoColDefs[i]);
} else if ("number" == typeof aTargets[j] && aTargets[j] < 0) fn(oSettings.aoColumns.length + aTargets[j], aoColDefs[i]); else if ("string" == typeof aTargets[j]) for (k = 0, 
kLen = oSettings.aoColumns.length; kLen > k; k++) ("_all" == aTargets[j] || $(oSettings.aoColumns[k].nTh).hasClass(aTargets[j])) && fn(k, aoColDefs[i]);
}
if (aoCols) for (i = 0, iLen = aoCols.length; iLen > i; i++) fn(i, aoCols[i]);
}
function _fnAddData(oSettings, aDataSupplied) {
var oCol, aDataIn = $.isArray(aDataSupplied) ? aDataSupplied.slice() :$.extend(!0, {}, aDataSupplied), iRow = oSettings.aoData.length, oData = $.extend(!0, {}, DataTable.models.oRow);
oData._aData = aDataIn, oSettings.aoData.push(oData);
for (var sThisType, i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) if (oCol = oSettings.aoColumns[i], 
"function" == typeof oCol.fnRender && oCol.bUseRendered && null !== oCol.mData ? _fnSetCellData(oSettings, iRow, i, _fnRender(oSettings, iRow, i)) :_fnSetCellData(oSettings, iRow, i, _fnGetCellData(oSettings, iRow, i)), 
oCol._bAutoType && "string" != oCol.sType) {
var sVarType = _fnGetCellData(oSettings, iRow, i, "type");
null !== sVarType && "" !== sVarType && (sThisType = _fnDetectType(sVarType), null === oCol.sType ? oCol.sType = sThisType :oCol.sType != sThisType && "html" != oCol.sType && (oCol.sType = "string"));
}
return oSettings.aiDisplayMaster.push(iRow), oSettings.oFeatures.bDeferRender || _fnCreateTr(oSettings, iRow), 
iRow;
}
function _fnGatherData(oSettings) {
var i, iLen, jInner, nTds, nTrs, nTd, nTr, iThisIndex, iRow, iRows, iColumn, iColumns, sNodeName, oCol, oData;
if (oSettings.bDeferLoading || null === oSettings.sAjaxSource) for (nTr = oSettings.nTBody.firstChild; nTr; ) {
if ("TR" == nTr.nodeName.toUpperCase()) for (iThisIndex = oSettings.aoData.length, 
nTr._DT_RowIndex = iThisIndex, oSettings.aoData.push($.extend(!0, {}, DataTable.models.oRow, {
nTr:nTr
})), oSettings.aiDisplayMaster.push(iThisIndex), nTd = nTr.firstChild, jInner = 0; nTd; ) sNodeName = nTd.nodeName.toUpperCase(), 
("TD" == sNodeName || "TH" == sNodeName) && (_fnSetCellData(oSettings, iThisIndex, jInner, $.trim(nTd.innerHTML)), 
jInner++), nTd = nTd.nextSibling;
nTr = nTr.nextSibling;
}
for (nTrs = _fnGetTrNodes(oSettings), nTds = [], i = 0, iLen = nTrs.length; iLen > i; i++) for (nTd = nTrs[i].firstChild; nTd; ) sNodeName = nTd.nodeName.toUpperCase(), 
("TD" == sNodeName || "TH" == sNodeName) && nTds.push(nTd), nTd = nTd.nextSibling;
for (iColumn = 0, iColumns = oSettings.aoColumns.length; iColumns > iColumn; iColumn++) {
oCol = oSettings.aoColumns[iColumn], null === oCol.sTitle && (oCol.sTitle = oCol.nTh.innerHTML);
var nCell, sThisType, sRendered, sValType, bAutoType = oCol._bAutoType, bRender = "function" == typeof oCol.fnRender, bClass = null !== oCol.sClass, bVisible = oCol.bVisible;
if (bAutoType || bRender || bClass || !bVisible) for (iRow = 0, iRows = oSettings.aoData.length; iRows > iRow; iRow++) oData = oSettings.aoData[iRow], 
nCell = nTds[iRow * iColumns + iColumn], bAutoType && "string" != oCol.sType && (sValType = _fnGetCellData(oSettings, iRow, iColumn, "type"), 
"" !== sValType && (sThisType = _fnDetectType(sValType), null === oCol.sType ? oCol.sType = sThisType :oCol.sType != sThisType && "html" != oCol.sType && (oCol.sType = "string"))), 
oCol.mRender ? nCell.innerHTML = _fnGetCellData(oSettings, iRow, iColumn, "display") :oCol.mData !== iColumn && (nCell.innerHTML = _fnGetCellData(oSettings, iRow, iColumn, "display")), 
bRender && (sRendered = _fnRender(oSettings, iRow, iColumn), nCell.innerHTML = sRendered, 
oCol.bUseRendered && _fnSetCellData(oSettings, iRow, iColumn, sRendered)), bClass && (nCell.className += " " + oCol.sClass), 
bVisible ? oData._anHidden[iColumn] = null :(oData._anHidden[iColumn] = nCell, nCell.parentNode.removeChild(nCell)), 
oCol.fnCreatedCell && oCol.fnCreatedCell.call(oSettings.oInstance, nCell, _fnGetCellData(oSettings, iRow, iColumn, "display"), oData._aData, iRow, iColumn);
}
if (0 !== oSettings.aoRowCreatedCallback.length) for (i = 0, iLen = oSettings.aoData.length; iLen > i; i++) oData = oSettings.aoData[i], 
_fnCallbackFire(oSettings, "aoRowCreatedCallback", null, [ oData.nTr, oData._aData, i ]);
}
function _fnNodeToDataIndex(oSettings, n) {
return n._DT_RowIndex !== undefined ? n._DT_RowIndex :null;
}
function _fnNodeToColumnIndex(oSettings, iRow, n) {
for (var anCells = _fnGetTdNodes(oSettings, iRow), i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) if (anCells[i] === n) return i;
return -1;
}
function _fnGetRowData(oSettings, iRow, sSpecific, aiColumns) {
for (var out = [], i = 0, iLen = aiColumns.length; iLen > i; i++) out.push(_fnGetCellData(oSettings, iRow, aiColumns[i], sSpecific));
return out;
}
function _fnGetCellData(oSettings, iRow, iCol, sSpecific) {
var sData, oCol = oSettings.aoColumns[iCol], oData = oSettings.aoData[iRow]._aData;
if ((sData = oCol.fnGetData(oData, sSpecific)) === undefined) return oSettings.iDrawError != oSettings.iDraw && null === oCol.sDefaultContent && (_fnLog(oSettings, 0, "Requested unknown parameter " + ("function" == typeof oCol.mData ? "{mData function}" :"'" + oCol.mData + "'") + " from the data source for row " + iRow), 
oSettings.iDrawError = oSettings.iDraw), oCol.sDefaultContent;
if (null === sData && null !== oCol.sDefaultContent) sData = oCol.sDefaultContent; else if ("function" == typeof sData) return sData();
return "display" == sSpecific && null === sData ? "" :sData;
}
function _fnSetCellData(oSettings, iRow, iCol, val) {
var oCol = oSettings.aoColumns[iCol], oData = oSettings.aoData[iRow]._aData;
oCol.fnSetData(oData, val);
}
function _fnGetObjectDataFn(mSource) {
if (null === mSource) return function() {
return null;
};
if ("function" == typeof mSource) return function(data, type, extra) {
return mSource(data, type, extra);
};
if ("string" != typeof mSource || -1 === mSource.indexOf(".") && -1 === mSource.indexOf("[")) return function(data) {
return data[mSource];
};
var fetchData = function(data, type, src) {
var arrayNotation, out, innerSrc, a = src.split(".");
if ("" !== src) for (var i = 0, iLen = a.length; iLen > i; i++) {
if (arrayNotation = a[i].match(__reArray)) {
a[i] = a[i].replace(__reArray, ""), "" !== a[i] && (data = data[a[i]]), out = [], 
a.splice(0, i + 1), innerSrc = a.join(".");
for (var j = 0, jLen = data.length; jLen > j; j++) out.push(fetchData(data[j], type, innerSrc));
var join = arrayNotation[0].substring(1, arrayNotation[0].length - 1);
data = "" === join ? out :out.join(join);
break;
}
if (null === data || data[a[i]] === undefined) return undefined;
data = data[a[i]];
}
return data;
};
return function(data, type) {
return fetchData(data, type, mSource);
};
}
function _fnSetObjectDataFn(mSource) {
if (null === mSource) return function() {};
if ("function" == typeof mSource) return function(data, val) {
mSource(data, "set", val);
};
if ("string" != typeof mSource || -1 === mSource.indexOf(".") && -1 === mSource.indexOf("[")) return function(data, val) {
data[mSource] = val;
};
var setData = function(data, val, src) {
for (var b, arrayNotation, o, innerSrc, a = src.split("."), i = 0, iLen = a.length - 1; iLen > i; i++) {
if (arrayNotation = a[i].match(__reArray)) {
a[i] = a[i].replace(__reArray, ""), data[a[i]] = [], b = a.slice(), b.splice(0, i + 1), 
innerSrc = b.join(".");
for (var j = 0, jLen = val.length; jLen > j; j++) o = {}, setData(o, val[j], innerSrc), 
data[a[i]].push(o);
return;
}
(null === data[a[i]] || data[a[i]] === undefined) && (data[a[i]] = {}), data = data[a[i]];
}
data[a[a.length - 1].replace(__reArray, "")] = val;
};
return function(data, val) {
return setData(data, val, mSource);
};
}
function _fnGetDataMaster(oSettings) {
for (var aData = [], iLen = oSettings.aoData.length, i = 0; iLen > i; i++) aData.push(oSettings.aoData[i]._aData);
return aData;
}
function _fnClearTable(oSettings) {
oSettings.aoData.splice(0, oSettings.aoData.length), oSettings.aiDisplayMaster.splice(0, oSettings.aiDisplayMaster.length), 
oSettings.aiDisplay.splice(0, oSettings.aiDisplay.length), _fnCalculateEnd(oSettings);
}
function _fnDeleteIndex(a, iTarget) {
for (var iTargetIndex = -1, i = 0, iLen = a.length; iLen > i; i++) a[i] == iTarget ? iTargetIndex = i :a[i] > iTarget && a[i]--;
-1 != iTargetIndex && a.splice(iTargetIndex, 1);
}
function _fnRender(oSettings, iRow, iCol) {
var oCol = oSettings.aoColumns[iCol];
return oCol.fnRender({
iDataRow:iRow,
iDataColumn:iCol,
oSettings:oSettings,
aData:oSettings.aoData[iRow]._aData,
mDataProp:oCol.mData
}, _fnGetCellData(oSettings, iRow, iCol, "display"));
}
function _fnCreateTr(oSettings, iRow) {
var nTd, oData = oSettings.aoData[iRow];
if (null === oData.nTr) {
oData.nTr = document.createElement("tr"), oData.nTr._DT_RowIndex = iRow, oData._aData.DT_RowId && (oData.nTr.id = oData._aData.DT_RowId), 
oData._aData.DT_RowClass && (oData.nTr.className = oData._aData.DT_RowClass);
for (var i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) {
var oCol = oSettings.aoColumns[i];
nTd = document.createElement(oCol.sCellType), nTd.innerHTML = "function" != typeof oCol.fnRender || oCol.bUseRendered && null !== oCol.mData ? _fnGetCellData(oSettings, iRow, i, "display") :_fnRender(oSettings, iRow, i), 
null !== oCol.sClass && (nTd.className = oCol.sClass), oCol.bVisible ? (oData.nTr.appendChild(nTd), 
oData._anHidden[i] = null) :oData._anHidden[i] = nTd, oCol.fnCreatedCell && oCol.fnCreatedCell.call(oSettings.oInstance, nTd, _fnGetCellData(oSettings, iRow, i, "display"), oData._aData, iRow, i);
}
_fnCallbackFire(oSettings, "aoRowCreatedCallback", null, [ oData.nTr, oData._aData, iRow ]);
}
}
function _fnBuildHead(oSettings) {
var i, nTh, iLen, iThs = $("th, td", oSettings.nTHead).length;
if (0 !== iThs) for (i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) nTh = oSettings.aoColumns[i].nTh, 
nTh.setAttribute("role", "columnheader"), oSettings.aoColumns[i].bSortable && (nTh.setAttribute("tabindex", oSettings.iTabIndex), 
nTh.setAttribute("aria-controls", oSettings.sTableId)), null !== oSettings.aoColumns[i].sClass && $(nTh).addClass(oSettings.aoColumns[i].sClass), 
oSettings.aoColumns[i].sTitle != nTh.innerHTML && (nTh.innerHTML = oSettings.aoColumns[i].sTitle); else {
var nTr = document.createElement("tr");
for (i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) nTh = oSettings.aoColumns[i].nTh, 
nTh.innerHTML = oSettings.aoColumns[i].sTitle, nTh.setAttribute("tabindex", "0"), 
null !== oSettings.aoColumns[i].sClass && $(nTh).addClass(oSettings.aoColumns[i].sClass), 
nTr.appendChild(nTh);
$(oSettings.nTHead).html("")[0].appendChild(nTr), _fnDetectHeader(oSettings.aoHeader, oSettings.nTHead);
}
if ($(oSettings.nTHead).children("tr").attr("role", "row"), oSettings.bJUI) for (i = 0, 
iLen = oSettings.aoColumns.length; iLen > i; i++) {
nTh = oSettings.aoColumns[i].nTh;
var nDiv = document.createElement("div");
nDiv.className = oSettings.oClasses.sSortJUIWrapper, $(nTh).contents().appendTo(nDiv);
var nSpan = document.createElement("span");
nSpan.className = oSettings.oClasses.sSortIcon, nDiv.appendChild(nSpan), nTh.appendChild(nDiv);
}
if (oSettings.oFeatures.bSort) for (i = 0; i < oSettings.aoColumns.length; i++) oSettings.aoColumns[i].bSortable !== !1 ? _fnSortAttachListener(oSettings, oSettings.aoColumns[i].nTh, i) :$(oSettings.aoColumns[i].nTh).addClass(oSettings.oClasses.sSortableNone);
if ("" !== oSettings.oClasses.sFooterTH && $(oSettings.nTFoot).children("tr").children("th").addClass(oSettings.oClasses.sFooterTH), 
null !== oSettings.nTFoot) {
var anCells = _fnGetUniqueThs(oSettings, null, oSettings.aoFooter);
for (i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) anCells[i] && (oSettings.aoColumns[i].nTf = anCells[i], 
oSettings.aoColumns[i].sClass && $(anCells[i]).addClass(oSettings.aoColumns[i].sClass));
}
}
function _fnDrawHead(oSettings, aoSource, bIncludeHidden) {
var i, iLen, j, jLen, k, n, nLocalTr, iRowspan, iColspan, aoLocal = [], aApplied = [], iColumns = oSettings.aoColumns.length;
for (bIncludeHidden === undefined && (bIncludeHidden = !1), i = 0, iLen = aoSource.length; iLen > i; i++) {
for (aoLocal[i] = aoSource[i].slice(), aoLocal[i].nTr = aoSource[i].nTr, j = iColumns - 1; j >= 0; j--) oSettings.aoColumns[j].bVisible || bIncludeHidden || aoLocal[i].splice(j, 1);
aApplied.push([]);
}
for (i = 0, iLen = aoLocal.length; iLen > i; i++) {
if (nLocalTr = aoLocal[i].nTr) for (;n = nLocalTr.firstChild; ) nLocalTr.removeChild(n);
for (j = 0, jLen = aoLocal[i].length; jLen > j; j++) if (iRowspan = 1, iColspan = 1, 
aApplied[i][j] === undefined) {
for (nLocalTr.appendChild(aoLocal[i][j].cell), aApplied[i][j] = 1; aoLocal[i + iRowspan] !== undefined && aoLocal[i][j].cell == aoLocal[i + iRowspan][j].cell; ) aApplied[i + iRowspan][j] = 1, 
iRowspan++;
for (;aoLocal[i][j + iColspan] !== undefined && aoLocal[i][j].cell == aoLocal[i][j + iColspan].cell; ) {
for (k = 0; iRowspan > k; k++) aApplied[i + k][j + iColspan] = 1;
iColspan++;
}
aoLocal[i][j].cell.rowSpan = iRowspan, aoLocal[i][j].cell.colSpan = iColspan;
}
}
}
function _fnDraw(oSettings) {
var aPreDraw = _fnCallbackFire(oSettings, "aoPreDrawCallback", "preDraw", [ oSettings ]);
if (-1 !== $.inArray(!1, aPreDraw)) return _fnProcessingDisplay(oSettings, !1), 
void 0;
var i, iLen, n, anRows = [], iRowCount = 0, iStripes = oSettings.asStripeClasses.length, iOpenRows = oSettings.aoOpenRows.length;
if (oSettings.bDrawing = !0, oSettings.iInitDisplayStart !== undefined && -1 != oSettings.iInitDisplayStart && (oSettings._iDisplayStart = oSettings.oFeatures.bServerSide ? oSettings.iInitDisplayStart :oSettings.iInitDisplayStart >= oSettings.fnRecordsDisplay() ? 0 :oSettings.iInitDisplayStart, 
oSettings.iInitDisplayStart = -1, _fnCalculateEnd(oSettings)), oSettings.bDeferLoading) oSettings.bDeferLoading = !1, 
oSettings.iDraw++; else if (oSettings.oFeatures.bServerSide) {
if (!oSettings.bDestroying && !_fnAjaxUpdate(oSettings)) return;
} else oSettings.iDraw++;
if (0 !== oSettings.aiDisplay.length) {
var iStart = oSettings._iDisplayStart, iEnd = oSettings._iDisplayEnd;
oSettings.oFeatures.bServerSide && (iStart = 0, iEnd = oSettings.aoData.length);
for (var j = iStart; iEnd > j; j++) {
var aoData = oSettings.aoData[oSettings.aiDisplay[j]];
null === aoData.nTr && _fnCreateTr(oSettings, oSettings.aiDisplay[j]);
var nRow = aoData.nTr;
if (0 !== iStripes) {
var sStripe = oSettings.asStripeClasses[iRowCount % iStripes];
aoData._sRowStripe != sStripe && ($(nRow).removeClass(aoData._sRowStripe).addClass(sStripe), 
aoData._sRowStripe = sStripe);
}
if (_fnCallbackFire(oSettings, "aoRowCallback", null, [ nRow, oSettings.aoData[oSettings.aiDisplay[j]]._aData, iRowCount, j ]), 
anRows.push(nRow), iRowCount++, 0 !== iOpenRows) for (var k = 0; iOpenRows > k; k++) if (nRow == oSettings.aoOpenRows[k].nParent) {
anRows.push(oSettings.aoOpenRows[k].nTr);
break;
}
}
} else {
anRows[0] = document.createElement("tr"), oSettings.asStripeClasses[0] && (anRows[0].className = oSettings.asStripeClasses[0]);
var oLang = oSettings.oLanguage, sZero = oLang.sZeroRecords;
1 != oSettings.iDraw || null === oSettings.sAjaxSource || oSettings.oFeatures.bServerSide ? oLang.sEmptyTable && 0 === oSettings.fnRecordsTotal() && (sZero = oLang.sEmptyTable) :sZero = oLang.sLoadingRecords;
var nTd = document.createElement("td");
nTd.setAttribute("valign", "top"), nTd.colSpan = _fnVisbleColumns(oSettings), nTd.className = oSettings.oClasses.sRowEmpty, 
nTd.innerHTML = _fnInfoMacros(oSettings, sZero), anRows[iRowCount].appendChild(nTd);
}
_fnCallbackFire(oSettings, "aoHeaderCallback", "header", [ $(oSettings.nTHead).children("tr")[0], _fnGetDataMaster(oSettings), oSettings._iDisplayStart, oSettings.fnDisplayEnd(), oSettings.aiDisplay ]), 
_fnCallbackFire(oSettings, "aoFooterCallback", "footer", [ $(oSettings.nTFoot).children("tr")[0], _fnGetDataMaster(oSettings), oSettings._iDisplayStart, oSettings.fnDisplayEnd(), oSettings.aiDisplay ]);
var nBodyPar, nAddFrag = document.createDocumentFragment(), nRemoveFrag = document.createDocumentFragment();
if (oSettings.nTBody) {
if (nBodyPar = oSettings.nTBody.parentNode, nRemoveFrag.appendChild(oSettings.nTBody), 
!oSettings.oScroll.bInfinite || !oSettings._bInitComplete || oSettings.bSorted || oSettings.bFiltered) for (;n = oSettings.nTBody.firstChild; ) oSettings.nTBody.removeChild(n);
for (i = 0, iLen = anRows.length; iLen > i; i++) nAddFrag.appendChild(anRows[i]);
oSettings.nTBody.appendChild(nAddFrag), null !== nBodyPar && nBodyPar.appendChild(oSettings.nTBody);
}
_fnCallbackFire(oSettings, "aoDrawCallback", "draw", [ oSettings ]), oSettings.bSorted = !1, 
oSettings.bFiltered = !1, oSettings.bDrawing = !1, oSettings.oFeatures.bServerSide && (_fnProcessingDisplay(oSettings, !1), 
oSettings._bInitComplete || _fnInitComplete(oSettings));
}
function _fnReDraw(oSettings) {
oSettings.oFeatures.bSort ? _fnSort(oSettings, oSettings.oPreviousSearch) :oSettings.oFeatures.bFilter ? _fnFilterComplete(oSettings, oSettings.oPreviousSearch) :(_fnCalculateEnd(oSettings), 
_fnDraw(oSettings));
}
function _fnAddOptionsHtml(oSettings) {
var nHolding = $("<div></div>")[0];
oSettings.nTable.parentNode.insertBefore(nHolding, oSettings.nTable), oSettings.nTableWrapper = $('<div id="' + oSettings.sTableId + '_wrapper" class="' + oSettings.oClasses.sWrapper + '" role="grid"></div>')[0], 
oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
for (var nTmp, iPushFeature, cOption, nNewNode, cNext, sAttr, j, nInsertNode = oSettings.nTableWrapper, aDom = oSettings.sDom.split(""), i = 0; i < aDom.length; i++) {
if (iPushFeature = 0, cOption = aDom[i], "<" == cOption) {
if (nNewNode = $("<div></div>")[0], cNext = aDom[i + 1], "'" == cNext || '"' == cNext) {
for (sAttr = "", j = 2; aDom[i + j] != cNext; ) sAttr += aDom[i + j], j++;
if ("H" == sAttr ? sAttr = oSettings.oClasses.sJUIHeader :"F" == sAttr && (sAttr = oSettings.oClasses.sJUIFooter), 
-1 != sAttr.indexOf(".")) {
var aSplit = sAttr.split(".");
nNewNode.id = aSplit[0].substr(1, aSplit[0].length - 1), nNewNode.className = aSplit[1];
} else "#" == sAttr.charAt(0) ? nNewNode.id = sAttr.substr(1, sAttr.length - 1) :nNewNode.className = sAttr;
i += j;
}
nInsertNode.appendChild(nNewNode), nInsertNode = nNewNode;
} else if (">" == cOption) nInsertNode = nInsertNode.parentNode; else if ("l" == cOption && oSettings.oFeatures.bPaginate && oSettings.oFeatures.bLengthChange) nTmp = _fnFeatureHtmlLength(oSettings), 
iPushFeature = 1; else if ("f" == cOption && oSettings.oFeatures.bFilter) nTmp = _fnFeatureHtmlFilter(oSettings), 
iPushFeature = 1; else if ("r" == cOption && oSettings.oFeatures.bProcessing) nTmp = _fnFeatureHtmlProcessing(oSettings), 
iPushFeature = 1; else if ("t" == cOption) nTmp = _fnFeatureHtmlTable(oSettings), 
iPushFeature = 1; else if ("i" == cOption && oSettings.oFeatures.bInfo) nTmp = _fnFeatureHtmlInfo(oSettings), 
iPushFeature = 1; else if ("p" == cOption && oSettings.oFeatures.bPaginate) nTmp = _fnFeatureHtmlPaginate(oSettings), 
iPushFeature = 1; else if (0 !== DataTable.ext.aoFeatures.length) for (var aoFeatures = DataTable.ext.aoFeatures, k = 0, kLen = aoFeatures.length; kLen > k; k++) if (cOption == aoFeatures[k].cFeature) {
nTmp = aoFeatures[k].fnInit(oSettings), nTmp && (iPushFeature = 1);
break;
}
1 == iPushFeature && null !== nTmp && ("object" != typeof oSettings.aanFeatures[cOption] && (oSettings.aanFeatures[cOption] = []), 
oSettings.aanFeatures[cOption].push(nTmp), nInsertNode.appendChild(nTmp));
}
nHolding.parentNode.replaceChild(oSettings.nTableWrapper, nHolding);
}
function _fnDetectHeader(aLayout, nThead) {
var nTr, nCell, i, k, l, iLen, iColShifted, iColumn, iColspan, iRowspan, bUnique, nTrs = $(nThead).children("tr"), fnShiftCol = function(a, i, j) {
for (var k = a[i]; k[j]; ) j++;
return j;
};
for (aLayout.splice(0, aLayout.length), i = 0, iLen = nTrs.length; iLen > i; i++) aLayout.push([]);
for (i = 0, iLen = nTrs.length; iLen > i; i++) for (nTr = nTrs[i], iColumn = 0, 
nCell = nTr.firstChild; nCell; ) {
if ("TD" == nCell.nodeName.toUpperCase() || "TH" == nCell.nodeName.toUpperCase()) for (iColspan = 1 * nCell.getAttribute("colspan"), 
iRowspan = 1 * nCell.getAttribute("rowspan"), iColspan = iColspan && 0 !== iColspan && 1 !== iColspan ? iColspan :1, 
iRowspan = iRowspan && 0 !== iRowspan && 1 !== iRowspan ? iRowspan :1, iColShifted = fnShiftCol(aLayout, i, iColumn), 
bUnique = 1 === iColspan ? !0 :!1, l = 0; iColspan > l; l++) for (k = 0; iRowspan > k; k++) aLayout[i + k][iColShifted + l] = {
cell:nCell,
unique:bUnique
}, aLayout[i + k].nTr = nTr;
nCell = nCell.nextSibling;
}
}
function _fnGetUniqueThs(oSettings, nHeader, aLayout) {
var aReturn = [];
aLayout || (aLayout = oSettings.aoHeader, nHeader && (aLayout = [], _fnDetectHeader(aLayout, nHeader)));
for (var i = 0, iLen = aLayout.length; iLen > i; i++) for (var j = 0, jLen = aLayout[i].length; jLen > j; j++) !aLayout[i][j].unique || aReturn[j] && oSettings.bSortCellsTop || (aReturn[j] = aLayout[i][j].cell);
return aReturn;
}
function _fnAjaxUpdate(oSettings) {
if (oSettings.bAjaxDataGet) {
oSettings.iDraw++, _fnProcessingDisplay(oSettings, !0);
var aoData = (oSettings.aoColumns.length, _fnAjaxParameters(oSettings));
return _fnServerParams(oSettings, aoData), oSettings.fnServerData.call(oSettings.oInstance, oSettings.sAjaxSource, aoData, function(json) {
_fnAjaxUpdateDraw(oSettings, json);
}, oSettings), !1;
}
return !0;
}
function _fnAjaxParameters(oSettings) {
var mDataProp, aaSort, aDataSort, i, j, iColumns = oSettings.aoColumns.length, aoData = [];
for (aoData.push({
name:"sEcho",
value:oSettings.iDraw
}), aoData.push({
name:"iColumns",
value:iColumns
}), aoData.push({
name:"sColumns",
value:_fnColumnOrdering(oSettings)
}), aoData.push({
name:"iDisplayStart",
value:oSettings._iDisplayStart
}), aoData.push({
name:"iDisplayLength",
value:oSettings.oFeatures.bPaginate !== !1 ? oSettings._iDisplayLength :-1
}), i = 0; iColumns > i; i++) mDataProp = oSettings.aoColumns[i].mData, aoData.push({
name:"mDataProp_" + i,
value:"function" == typeof mDataProp ? "function" :mDataProp
});
if (oSettings.oFeatures.bFilter !== !1) for (aoData.push({
name:"sSearch",
value:oSettings.oPreviousSearch.sSearch
}), aoData.push({
name:"bRegex",
value:oSettings.oPreviousSearch.bRegex
}), i = 0; iColumns > i; i++) aoData.push({
name:"sSearch_" + i,
value:oSettings.aoPreSearchCols[i].sSearch
}), aoData.push({
name:"bRegex_" + i,
value:oSettings.aoPreSearchCols[i].bRegex
}), aoData.push({
name:"bSearchable_" + i,
value:oSettings.aoColumns[i].bSearchable
});
if (oSettings.oFeatures.bSort !== !1) {
var iCounter = 0;
for (aaSort = null !== oSettings.aaSortingFixed ? oSettings.aaSortingFixed.concat(oSettings.aaSorting) :oSettings.aaSorting.slice(), 
i = 0; i < aaSort.length; i++) for (aDataSort = oSettings.aoColumns[aaSort[i][0]].aDataSort, 
j = 0; j < aDataSort.length; j++) aoData.push({
name:"iSortCol_" + iCounter,
value:aDataSort[j]
}), aoData.push({
name:"sSortDir_" + iCounter,
value:aaSort[i][1]
}), iCounter++;
for (aoData.push({
name:"iSortingCols",
value:iCounter
}), i = 0; iColumns > i; i++) aoData.push({
name:"bSortable_" + i,
value:oSettings.aoColumns[i].bSortable
});
}
return aoData;
}
function _fnServerParams(oSettings, aoData) {
_fnCallbackFire(oSettings, "aoServerParams", "serverParams", [ aoData ]);
}
function _fnAjaxUpdateDraw(oSettings, json) {
if (json.sEcho !== undefined) {
if (1 * json.sEcho < oSettings.iDraw) return;
oSettings.iDraw = 1 * json.sEcho;
}
(!oSettings.oScroll.bInfinite || oSettings.oScroll.bInfinite && (oSettings.bSorted || oSettings.bFiltered)) && _fnClearTable(oSettings), 
oSettings._iRecordsTotal = parseInt(json.iTotalRecords, 10), oSettings._iRecordsDisplay = parseInt(json.iTotalDisplayRecords, 10);
var aiIndex, sOrdering = _fnColumnOrdering(oSettings), bReOrder = json.sColumns !== undefined && "" !== sOrdering && json.sColumns != sOrdering;
bReOrder && (aiIndex = _fnReOrderIndex(oSettings, json.sColumns));
for (var aData = _fnGetObjectDataFn(oSettings.sAjaxDataProp)(json), i = 0, iLen = aData.length; iLen > i; i++) if (bReOrder) {
for (var aDataSorted = [], j = 0, jLen = oSettings.aoColumns.length; jLen > j; j++) aDataSorted.push(aData[i][aiIndex[j]]);
_fnAddData(oSettings, aDataSorted);
} else _fnAddData(oSettings, aData[i]);
oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), oSettings.bAjaxDataGet = !1, 
_fnDraw(oSettings), oSettings.bAjaxDataGet = !0, _fnProcessingDisplay(oSettings, !1);
}
function _fnFeatureHtmlFilter(oSettings) {
var oPreviousSearch = oSettings.oPreviousSearch, sSearchStr = oSettings.oLanguage.sSearch;
sSearchStr = -1 !== sSearchStr.indexOf("_INPUT_") ? sSearchStr.replace("_INPUT_", '<input type="text" />') :"" === sSearchStr ? '<input type="text" />' :sSearchStr + ' <input type="text" />';
var nFilter = document.createElement("div");
nFilter.className = oSettings.oClasses.sFilter, nFilter.innerHTML = "<label>" + sSearchStr + "</label>", 
oSettings.aanFeatures.f || (nFilter.id = oSettings.sTableId + "_filter");
var jqFilter = $('input[type="text"]', nFilter);
return nFilter._DT_Input = jqFilter[0], jqFilter.val(oPreviousSearch.sSearch.replace('"', "&quot;")), 
jqFilter.bind("keyup.DT", function() {
for (var n = oSettings.aanFeatures.f, val = "" === this.value ? "" :this.value, i = 0, iLen = n.length; iLen > i; i++) n[i] != $(this).parents("div.dataTables_filter")[0] && $(n[i]._DT_Input).val(val);
val != oPreviousSearch.sSearch && _fnFilterComplete(oSettings, {
sSearch:val,
bRegex:oPreviousSearch.bRegex,
bSmart:oPreviousSearch.bSmart,
bCaseInsensitive:oPreviousSearch.bCaseInsensitive
});
}), jqFilter.attr("aria-controls", oSettings.sTableId).bind("keypress.DT", function(e) {
return 13 == e.keyCode ? !1 :void 0;
}), nFilter;
}
function _fnFilterComplete(oSettings, oInput, iForce) {
var oPrevSearch = oSettings.oPreviousSearch, aoPrevSearch = oSettings.aoPreSearchCols, fnSaveFilter = function(oFilter) {
oPrevSearch.sSearch = oFilter.sSearch, oPrevSearch.bRegex = oFilter.bRegex, oPrevSearch.bSmart = oFilter.bSmart, 
oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
};
if (oSettings.oFeatures.bServerSide) fnSaveFilter(oInput); else {
_fnFilter(oSettings, oInput.sSearch, iForce, oInput.bRegex, oInput.bSmart, oInput.bCaseInsensitive), 
fnSaveFilter(oInput);
for (var i = 0; i < oSettings.aoPreSearchCols.length; i++) _fnFilterColumn(oSettings, aoPrevSearch[i].sSearch, i, aoPrevSearch[i].bRegex, aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive);
_fnFilterCustom(oSettings);
}
oSettings.bFiltered = !0, $(oSettings.oInstance).trigger("filter", oSettings), oSettings._iDisplayStart = 0, 
_fnCalculateEnd(oSettings), _fnDraw(oSettings), _fnBuildSearchArray(oSettings, 0);
}
function _fnFilterCustom(oSettings) {
for (var afnFilters = DataTable.ext.afnFiltering, aiFilterColumns = _fnGetColumns(oSettings, "bSearchable"), i = 0, iLen = afnFilters.length; iLen > i; i++) for (var iCorrector = 0, j = 0, jLen = oSettings.aiDisplay.length; jLen > j; j++) {
var iDisIndex = oSettings.aiDisplay[j - iCorrector], bTest = afnFilters[i](oSettings, _fnGetRowData(oSettings, iDisIndex, "filter", aiFilterColumns), iDisIndex);
bTest || (oSettings.aiDisplay.splice(j - iCorrector, 1), iCorrector++);
}
}
function _fnFilterColumn(oSettings, sInput, iColumn, bRegex, bSmart, bCaseInsensitive) {
if ("" !== sInput) for (var iIndexCorrector = 0, rpSearch = _fnFilterCreateSearch(sInput, bRegex, bSmart, bCaseInsensitive), i = oSettings.aiDisplay.length - 1; i >= 0; i--) {
var sData = _fnDataToSearch(_fnGetCellData(oSettings, oSettings.aiDisplay[i], iColumn, "filter"), oSettings.aoColumns[iColumn].sType);
rpSearch.test(sData) || (oSettings.aiDisplay.splice(i, 1), iIndexCorrector++);
}
}
function _fnFilter(oSettings, sInput, iForce, bRegex, bSmart, bCaseInsensitive) {
var i, rpSearch = _fnFilterCreateSearch(sInput, bRegex, bSmart, bCaseInsensitive), oPrevSearch = oSettings.oPreviousSearch;
if (iForce || (iForce = 0), 0 !== DataTable.ext.afnFiltering.length && (iForce = 1), 
sInput.length <= 0) oSettings.aiDisplay.splice(0, oSettings.aiDisplay.length), oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(); else if (oSettings.aiDisplay.length == oSettings.aiDisplayMaster.length || oPrevSearch.sSearch.length > sInput.length || 1 == iForce || 0 !== sInput.indexOf(oPrevSearch.sSearch)) for (oSettings.aiDisplay.splice(0, oSettings.aiDisplay.length), 
_fnBuildSearchArray(oSettings, 1), i = 0; i < oSettings.aiDisplayMaster.length; i++) rpSearch.test(oSettings.asDataSearch[i]) && oSettings.aiDisplay.push(oSettings.aiDisplayMaster[i]); else {
var iIndexCorrector = 0;
for (i = 0; i < oSettings.asDataSearch.length; i++) rpSearch.test(oSettings.asDataSearch[i]) || (oSettings.aiDisplay.splice(i - iIndexCorrector, 1), 
iIndexCorrector++);
}
}
function _fnBuildSearchArray(oSettings, iMaster) {
if (!oSettings.oFeatures.bServerSide) {
oSettings.asDataSearch = [];
for (var aiFilterColumns = _fnGetColumns(oSettings, "bSearchable"), aiIndex = 1 === iMaster ? oSettings.aiDisplayMaster :oSettings.aiDisplay, i = 0, iLen = aiIndex.length; iLen > i; i++) oSettings.asDataSearch[i] = _fnBuildSearchRow(oSettings, _fnGetRowData(oSettings, aiIndex[i], "filter", aiFilterColumns));
}
}
function _fnBuildSearchRow(oSettings, aData) {
var sSearch = aData.join("  ");
return -1 !== sSearch.indexOf("&") && (sSearch = $("<div>").html(sSearch).text()), 
sSearch.replace(/[\n\r]/g, " ");
}
function _fnFilterCreateSearch(sSearch, bRegex, bSmart, bCaseInsensitive) {
var asSearch, sRegExpString;
return bSmart ? (asSearch = bRegex ? sSearch.split(" ") :_fnEscapeRegex(sSearch).split(" "), 
sRegExpString = "^(?=.*?" + asSearch.join(")(?=.*?") + ").*$", new RegExp(sRegExpString, bCaseInsensitive ? "i" :"")) :(sSearch = bRegex ? sSearch :_fnEscapeRegex(sSearch), 
new RegExp(sSearch, bCaseInsensitive ? "i" :""));
}
function _fnDataToSearch(sData, sType) {
return "function" == typeof DataTable.ext.ofnSearch[sType] ? DataTable.ext.ofnSearch[sType](sData) :null === sData ? "" :"html" == sType ? sData.replace(/[\r\n]/g, " ").replace(/<.*?>/g, "") :"string" == typeof sData ? sData.replace(/[\r\n]/g, " ") :sData;
}
function _fnEscapeRegex(sVal) {
var acEscape = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^", "-" ], reReplace = new RegExp("(\\" + acEscape.join("|\\") + ")", "g");
return sVal.replace(reReplace, "\\$1");
}
function _fnFeatureHtmlInfo(oSettings) {
var nInfo = document.createElement("div");
return nInfo.className = oSettings.oClasses.sInfo, oSettings.aanFeatures.i || (oSettings.aoDrawCallback.push({
fn:_fnUpdateInfo,
sName:"information"
}), nInfo.id = oSettings.sTableId + "_info"), oSettings.nTable.setAttribute("aria-describedby", oSettings.sTableId + "_info"), 
nInfo;
}
function _fnUpdateInfo(oSettings) {
if (oSettings.oFeatures.bInfo && 0 !== oSettings.aanFeatures.i.length) {
var sOut, oLang = oSettings.oLanguage, iStart = oSettings._iDisplayStart + 1, iEnd = oSettings.fnDisplayEnd(), iMax = oSettings.fnRecordsTotal(), iTotal = oSettings.fnRecordsDisplay();
sOut = 0 === iTotal ? oLang.sInfoEmpty :oLang.sInfo, iTotal != iMax && (sOut += " " + oLang.sInfoFiltered), 
sOut += oLang.sInfoPostFix, sOut = _fnInfoMacros(oSettings, sOut), null !== oLang.fnInfoCallback && (sOut = oLang.fnInfoCallback.call(oSettings.oInstance, oSettings, iStart, iEnd, iMax, iTotal, sOut));
for (var n = oSettings.aanFeatures.i, i = 0, iLen = n.length; iLen > i; i++) $(n[i]).html(sOut);
}
}
function _fnInfoMacros(oSettings, str) {
var iStart = oSettings._iDisplayStart + 1, sStart = oSettings.fnFormatNumber(iStart), iEnd = oSettings.fnDisplayEnd(), sEnd = oSettings.fnFormatNumber(iEnd), iTotal = oSettings.fnRecordsDisplay(), sTotal = oSettings.fnFormatNumber(iTotal), iMax = oSettings.fnRecordsTotal(), sMax = oSettings.fnFormatNumber(iMax);
return oSettings.oScroll.bInfinite && (sStart = oSettings.fnFormatNumber(1)), str.replace(/_START_/g, sStart).replace(/_END_/g, sEnd).replace(/_TOTAL_/g, sTotal).replace(/_MAX_/g, sMax);
}
function _fnInitialise(oSettings) {
var i, iLen, iAjaxStart = oSettings.iInitDisplayStart;
if (oSettings.bInitialised === !1) return setTimeout(function() {
_fnInitialise(oSettings);
}, 200), void 0;
for (_fnAddOptionsHtml(oSettings), _fnBuildHead(oSettings), _fnDrawHead(oSettings, oSettings.aoHeader), 
oSettings.nTFoot && _fnDrawHead(oSettings, oSettings.aoFooter), _fnProcessingDisplay(oSettings, !0), 
oSettings.oFeatures.bAutoWidth && _fnCalculateColumnWidths(oSettings), i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) null !== oSettings.aoColumns[i].sWidth && (oSettings.aoColumns[i].nTh.style.width = _fnStringToCss(oSettings.aoColumns[i].sWidth));
if (oSettings.oFeatures.bSort ? _fnSort(oSettings) :oSettings.oFeatures.bFilter ? _fnFilterComplete(oSettings, oSettings.oPreviousSearch) :(oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), 
_fnCalculateEnd(oSettings), _fnDraw(oSettings)), null !== oSettings.sAjaxSource && !oSettings.oFeatures.bServerSide) {
var aoData = [];
return _fnServerParams(oSettings, aoData), oSettings.fnServerData.call(oSettings.oInstance, oSettings.sAjaxSource, aoData, function(json) {
var aData = "" !== oSettings.sAjaxDataProp ? _fnGetObjectDataFn(oSettings.sAjaxDataProp)(json) :json;
for (i = 0; i < aData.length; i++) _fnAddData(oSettings, aData[i]);
oSettings.iInitDisplayStart = iAjaxStart, oSettings.oFeatures.bSort ? _fnSort(oSettings) :(oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), 
_fnCalculateEnd(oSettings), _fnDraw(oSettings)), _fnProcessingDisplay(oSettings, !1), 
_fnInitComplete(oSettings, json);
}, oSettings), void 0;
}
oSettings.oFeatures.bServerSide || (_fnProcessingDisplay(oSettings, !1), _fnInitComplete(oSettings));
}
function _fnInitComplete(oSettings, json) {
oSettings._bInitComplete = !0, _fnCallbackFire(oSettings, "aoInitComplete", "init", [ oSettings, json ]);
}
function _fnLanguageCompat(oLanguage) {
var oDefaults = DataTable.defaults.oLanguage;
!oLanguage.sEmptyTable && oLanguage.sZeroRecords && "No data available in table" === oDefaults.sEmptyTable && _fnMap(oLanguage, oLanguage, "sZeroRecords", "sEmptyTable"), 
!oLanguage.sLoadingRecords && oLanguage.sZeroRecords && "Loading..." === oDefaults.sLoadingRecords && _fnMap(oLanguage, oLanguage, "sZeroRecords", "sLoadingRecords");
}
function _fnFeatureHtmlLength(oSettings) {
if (oSettings.oScroll.bInfinite) return null;
var i, iLen, sName = 'name="' + oSettings.sTableId + '_length"', sStdMenu = '<select size="1" ' + sName + ">", aLengthMenu = oSettings.aLengthMenu;
if (2 == aLengthMenu.length && "object" == typeof aLengthMenu[0] && "object" == typeof aLengthMenu[1]) for (i = 0, 
iLen = aLengthMenu[0].length; iLen > i; i++) sStdMenu += '<option value="' + aLengthMenu[0][i] + '">' + aLengthMenu[1][i] + "</option>"; else for (i = 0, 
iLen = aLengthMenu.length; iLen > i; i++) sStdMenu += '<option value="' + aLengthMenu[i] + '">' + aLengthMenu[i] + "</option>";
sStdMenu += "</select>";
var nLength = document.createElement("div");
return oSettings.aanFeatures.l || (nLength.id = oSettings.sTableId + "_length"), 
nLength.className = oSettings.oClasses.sLength, nLength.innerHTML = "<label>" + oSettings.oLanguage.sLengthMenu.replace("_MENU_", sStdMenu) + "</label>", 
$('select option[value="' + oSettings._iDisplayLength + '"]', nLength).attr("selected", !0), 
$("select", nLength).bind("change.DT", function() {
var iVal = $(this).val(), n = oSettings.aanFeatures.l;
for (i = 0, iLen = n.length; iLen > i; i++) n[i] != this.parentNode && $("select", n[i]).val(iVal);
oSettings._iDisplayLength = parseInt(iVal, 10), _fnCalculateEnd(oSettings), oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() && (oSettings._iDisplayStart = oSettings.fnDisplayEnd() - oSettings._iDisplayLength, 
oSettings._iDisplayStart < 0 && (oSettings._iDisplayStart = 0)), -1 == oSettings._iDisplayLength && (oSettings._iDisplayStart = 0), 
_fnDraw(oSettings);
}), $("select", nLength).attr("aria-controls", oSettings.sTableId), nLength;
}
function _fnCalculateEnd(oSettings) {
oSettings._iDisplayEnd = oSettings.oFeatures.bPaginate === !1 ? oSettings.aiDisplay.length :oSettings._iDisplayStart + oSettings._iDisplayLength > oSettings.aiDisplay.length || -1 == oSettings._iDisplayLength ? oSettings.aiDisplay.length :oSettings._iDisplayStart + oSettings._iDisplayLength;
}
function _fnFeatureHtmlPaginate(oSettings) {
if (oSettings.oScroll.bInfinite) return null;
var nPaginate = document.createElement("div");
return nPaginate.className = oSettings.oClasses.sPaging + oSettings.sPaginationType, 
DataTable.ext.oPagination[oSettings.sPaginationType].fnInit(oSettings, nPaginate, function(oSettings) {
_fnCalculateEnd(oSettings), _fnDraw(oSettings);
}), oSettings.aanFeatures.p || oSettings.aoDrawCallback.push({
fn:function(oSettings) {
DataTable.ext.oPagination[oSettings.sPaginationType].fnUpdate(oSettings, function(oSettings) {
_fnCalculateEnd(oSettings), _fnDraw(oSettings);
});
},
sName:"pagination"
}), nPaginate;
}
function _fnPageChange(oSettings, mAction) {
var iOldStart = oSettings._iDisplayStart;
if ("number" == typeof mAction) oSettings._iDisplayStart = mAction * oSettings._iDisplayLength, 
oSettings._iDisplayStart > oSettings.fnRecordsDisplay() && (oSettings._iDisplayStart = 0); else if ("first" == mAction) oSettings._iDisplayStart = 0; else if ("previous" == mAction) oSettings._iDisplayStart = oSettings._iDisplayLength >= 0 ? oSettings._iDisplayStart - oSettings._iDisplayLength :0, 
oSettings._iDisplayStart < 0 && (oSettings._iDisplayStart = 0); else if ("next" == mAction) oSettings._iDisplayLength >= 0 ? oSettings._iDisplayStart + oSettings._iDisplayLength < oSettings.fnRecordsDisplay() && (oSettings._iDisplayStart += oSettings._iDisplayLength) :oSettings._iDisplayStart = 0; else if ("last" == mAction) if (oSettings._iDisplayLength >= 0) {
var iPages = parseInt((oSettings.fnRecordsDisplay() - 1) / oSettings._iDisplayLength, 10) + 1;
oSettings._iDisplayStart = (iPages - 1) * oSettings._iDisplayLength;
} else oSettings._iDisplayStart = 0; else _fnLog(oSettings, 0, "Unknown paging action: " + mAction);
return $(oSettings.oInstance).trigger("page", oSettings), iOldStart != oSettings._iDisplayStart;
}
function _fnFeatureHtmlProcessing(oSettings) {
var nProcessing = document.createElement("div");
return oSettings.aanFeatures.r || (nProcessing.id = oSettings.sTableId + "_processing"), 
nProcessing.innerHTML = oSettings.oLanguage.sProcessing, nProcessing.className = oSettings.oClasses.sProcessing, 
oSettings.nTable.parentNode.insertBefore(nProcessing, oSettings.nTable), nProcessing;
}
function _fnProcessingDisplay(oSettings, bShow) {
if (oSettings.oFeatures.bProcessing) for (var an = oSettings.aanFeatures.r, i = 0, iLen = an.length; iLen > i; i++) an[i].style.visibility = bShow ? "visible" :"hidden";
$(oSettings.oInstance).trigger("processing", [ oSettings, bShow ]);
}
function _fnFeatureHtmlTable(oSettings) {
if ("" === oSettings.oScroll.sX && "" === oSettings.oScroll.sY) return oSettings.nTable;
var nScroller = document.createElement("div"), nScrollHead = document.createElement("div"), nScrollHeadInner = document.createElement("div"), nScrollBody = document.createElement("div"), nScrollFoot = document.createElement("div"), nScrollFootInner = document.createElement("div"), nScrollHeadTable = oSettings.nTable.cloneNode(!1), nScrollFootTable = oSettings.nTable.cloneNode(!1), nThead = oSettings.nTable.getElementsByTagName("thead")[0], nTfoot = 0 === oSettings.nTable.getElementsByTagName("tfoot").length ? null :oSettings.nTable.getElementsByTagName("tfoot")[0], oClasses = oSettings.oClasses;
nScrollHead.appendChild(nScrollHeadInner), nScrollFoot.appendChild(nScrollFootInner), 
nScrollBody.appendChild(oSettings.nTable), nScroller.appendChild(nScrollHead), nScroller.appendChild(nScrollBody), 
nScrollHeadInner.appendChild(nScrollHeadTable), nScrollHeadTable.appendChild(nThead), 
null !== nTfoot && (nScroller.appendChild(nScrollFoot), nScrollFootInner.appendChild(nScrollFootTable), 
nScrollFootTable.appendChild(nTfoot)), nScroller.className = oClasses.sScrollWrapper, 
nScrollHead.className = oClasses.sScrollHead, nScrollHeadInner.className = oClasses.sScrollHeadInner, 
nScrollBody.className = oClasses.sScrollBody, nScrollFoot.className = oClasses.sScrollFoot, 
nScrollFootInner.className = oClasses.sScrollFootInner, oSettings.oScroll.bAutoCss && (nScrollHead.style.overflow = "hidden", 
nScrollHead.style.position = "relative", nScrollFoot.style.overflow = "hidden", 
nScrollBody.style.overflow = "auto"), nScrollHead.style.border = "0", nScrollHead.style.width = "100%", 
nScrollFoot.style.border = "0", nScrollHeadInner.style.width = "" !== oSettings.oScroll.sXInner ? oSettings.oScroll.sXInner :"100%", 
nScrollHeadTable.removeAttribute("id"), nScrollHeadTable.style.marginLeft = "0", 
oSettings.nTable.style.marginLeft = "0", null !== nTfoot && (nScrollFootTable.removeAttribute("id"), 
nScrollFootTable.style.marginLeft = "0");
var nCaption = $(oSettings.nTable).children("caption");
return nCaption.length > 0 && (nCaption = nCaption[0], "top" === nCaption._captionSide ? nScrollHeadTable.appendChild(nCaption) :"bottom" === nCaption._captionSide && nTfoot && nScrollFootTable.appendChild(nCaption)), 
"" !== oSettings.oScroll.sX && (nScrollHead.style.width = _fnStringToCss(oSettings.oScroll.sX), 
nScrollBody.style.width = _fnStringToCss(oSettings.oScroll.sX), null !== nTfoot && (nScrollFoot.style.width = _fnStringToCss(oSettings.oScroll.sX)), 
$(nScrollBody).scroll(function() {
nScrollHead.scrollLeft = this.scrollLeft, null !== nTfoot && (nScrollFoot.scrollLeft = this.scrollLeft);
})), "" !== oSettings.oScroll.sY && (nScrollBody.style.height = _fnStringToCss(oSettings.oScroll.sY)), 
oSettings.aoDrawCallback.push({
fn:_fnScrollDraw,
sName:"scrolling"
}), oSettings.oScroll.bInfinite && $(nScrollBody).scroll(function() {
oSettings.bDrawing || 0 === $(this).scrollTop() || $(this).scrollTop() + $(this).height() > $(oSettings.nTable).height() - oSettings.oScroll.iLoadGap && oSettings.fnDisplayEnd() < oSettings.fnRecordsDisplay() && (_fnPageChange(oSettings, "next"), 
_fnCalculateEnd(oSettings), _fnDraw(oSettings));
}), oSettings.nScrollHead = nScrollHead, oSettings.nScrollFoot = nScrollFoot, nScroller;
}
function _fnScrollDraw(o) {
var i, iLen, anHeadToSize, anHeadSizers, anFootSizers, anFootToSize, oStyle, iVis, nTheadSize, nTfootSize, iSanityWidth, nScrollHeadInner = o.nScrollHead.getElementsByTagName("div")[0], nScrollHeadTable = nScrollHeadInner.getElementsByTagName("table")[0], nScrollBody = o.nTable.parentNode, aApplied = [], aAppliedFooter = [], nScrollFootInner = null !== o.nTFoot ? o.nScrollFoot.getElementsByTagName("div")[0] :null, nScrollFootTable = null !== o.nTFoot ? nScrollFootInner.getElementsByTagName("table")[0] :null, ie67 = o.oBrowser.bScrollOversize, zeroOut = function(nSizer) {
oStyle = nSizer.style, oStyle.paddingTop = "0", oStyle.paddingBottom = "0", oStyle.borderTopWidth = "0", 
oStyle.borderBottomWidth = "0", oStyle.height = 0;
};
$(o.nTable).children("thead, tfoot").remove(), nTheadSize = $(o.nTHead).clone()[0], 
o.nTable.insertBefore(nTheadSize, o.nTable.childNodes[0]), anHeadToSize = o.nTHead.getElementsByTagName("tr"), 
anHeadSizers = nTheadSize.getElementsByTagName("tr"), null !== o.nTFoot && (nTfootSize = $(o.nTFoot).clone()[0], 
o.nTable.insertBefore(nTfootSize, o.nTable.childNodes[1]), anFootToSize = o.nTFoot.getElementsByTagName("tr"), 
anFootSizers = nTfootSize.getElementsByTagName("tr")), "" === o.oScroll.sX && (nScrollBody.style.width = "100%", 
nScrollHeadInner.parentNode.style.width = "100%");
var nThs = _fnGetUniqueThs(o, nTheadSize);
for (i = 0, iLen = nThs.length; iLen > i; i++) iVis = _fnVisibleToColumnIndex(o, i), 
nThs[i].style.width = o.aoColumns[iVis].sWidth;
if (null !== o.nTFoot && _fnApplyToChildren(function(n) {
n.style.width = "";
}, anFootSizers), o.oScroll.bCollapse && "" !== o.oScroll.sY && (nScrollBody.style.height = nScrollBody.offsetHeight + o.nTHead.offsetHeight + "px"), 
iSanityWidth = $(o.nTable).outerWidth(), "" === o.oScroll.sX ? (o.nTable.style.width = "100%", 
ie67 && ($("tbody", nScrollBody).height() > nScrollBody.offsetHeight || "scroll" == $(nScrollBody).css("overflow-y")) && (o.nTable.style.width = _fnStringToCss($(o.nTable).outerWidth() - o.oScroll.iBarWidth))) :"" !== o.oScroll.sXInner ? o.nTable.style.width = _fnStringToCss(o.oScroll.sXInner) :iSanityWidth == $(nScrollBody).width() && $(nScrollBody).height() < $(o.nTable).height() ? (o.nTable.style.width = _fnStringToCss(iSanityWidth - o.oScroll.iBarWidth), 
$(o.nTable).outerWidth() > iSanityWidth - o.oScroll.iBarWidth && (o.nTable.style.width = _fnStringToCss(iSanityWidth))) :o.nTable.style.width = _fnStringToCss(iSanityWidth), 
iSanityWidth = $(o.nTable).outerWidth(), _fnApplyToChildren(zeroOut, anHeadSizers), 
_fnApplyToChildren(function(nSizer) {
aApplied.push(_fnStringToCss($(nSizer).width()));
}, anHeadSizers), _fnApplyToChildren(function(nToSize, i) {
nToSize.style.width = aApplied[i];
}, anHeadToSize), $(anHeadSizers).height(0), null !== o.nTFoot && (_fnApplyToChildren(zeroOut, anFootSizers), 
_fnApplyToChildren(function(nSizer) {
aAppliedFooter.push(_fnStringToCss($(nSizer).width()));
}, anFootSizers), _fnApplyToChildren(function(nToSize, i) {
nToSize.style.width = aAppliedFooter[i];
}, anFootToSize), $(anFootSizers).height(0)), _fnApplyToChildren(function(nSizer, i) {
nSizer.innerHTML = "", nSizer.style.width = aApplied[i];
}, anHeadSizers), null !== o.nTFoot && _fnApplyToChildren(function(nSizer, i) {
nSizer.innerHTML = "", nSizer.style.width = aAppliedFooter[i];
}, anFootSizers), $(o.nTable).outerWidth() < iSanityWidth) {
var iCorrection = nScrollBody.scrollHeight > nScrollBody.offsetHeight || "scroll" == $(nScrollBody).css("overflow-y") ? iSanityWidth + o.oScroll.iBarWidth :iSanityWidth;
ie67 && (nScrollBody.scrollHeight > nScrollBody.offsetHeight || "scroll" == $(nScrollBody).css("overflow-y")) && (o.nTable.style.width = _fnStringToCss(iCorrection - o.oScroll.iBarWidth)), 
nScrollBody.style.width = _fnStringToCss(iCorrection), o.nScrollHead.style.width = _fnStringToCss(iCorrection), 
null !== o.nTFoot && (o.nScrollFoot.style.width = _fnStringToCss(iCorrection)), 
"" === o.oScroll.sX ? _fnLog(o, 1, "The table cannot fit into the current element which will cause column misalignment. The table has been drawn at its minimum possible width.") :"" !== o.oScroll.sXInner && _fnLog(o, 1, "The table cannot fit into the current element which will cause column misalignment. Increase the sScrollXInner value or remove it to allow automatic calculation");
} else nScrollBody.style.width = _fnStringToCss("100%"), o.nScrollHead.style.width = _fnStringToCss("100%"), 
null !== o.nTFoot && (o.nScrollFoot.style.width = _fnStringToCss("100%"));
if ("" === o.oScroll.sY && ie67 && (nScrollBody.style.height = _fnStringToCss(o.nTable.offsetHeight + o.oScroll.iBarWidth)), 
"" !== o.oScroll.sY && o.oScroll.bCollapse) {
nScrollBody.style.height = _fnStringToCss(o.oScroll.sY);
var iExtra = "" !== o.oScroll.sX && o.nTable.offsetWidth > nScrollBody.offsetWidth ? o.oScroll.iBarWidth :0;
o.nTable.offsetHeight < nScrollBody.offsetHeight && (nScrollBody.style.height = _fnStringToCss(o.nTable.offsetHeight + iExtra));
}
var iOuterWidth = $(o.nTable).outerWidth();
nScrollHeadTable.style.width = _fnStringToCss(iOuterWidth), nScrollHeadInner.style.width = _fnStringToCss(iOuterWidth);
var bScrolling = $(o.nTable).height() > nScrollBody.clientHeight || "scroll" == $(nScrollBody).css("overflow-y");
nScrollHeadInner.style.paddingRight = bScrolling ? o.oScroll.iBarWidth + "px" :"0px", 
null !== o.nTFoot && (nScrollFootTable.style.width = _fnStringToCss(iOuterWidth), 
nScrollFootInner.style.width = _fnStringToCss(iOuterWidth), nScrollFootInner.style.paddingRight = bScrolling ? o.oScroll.iBarWidth + "px" :"0px"), 
$(nScrollBody).scroll(), (o.bSorted || o.bFiltered) && (nScrollBody.scrollTop = 0);
}
function _fnApplyToChildren(fn, an1, an2) {
for (var nNode1, nNode2, index = 0, i = 0, iLen = an1.length; iLen > i; ) {
for (nNode1 = an1[i].firstChild, nNode2 = an2 ? an2[i].firstChild :null; nNode1; ) 1 === nNode1.nodeType && (an2 ? fn(nNode1, nNode2, index) :fn(nNode1, index), 
index++), nNode1 = nNode1.nextSibling, nNode2 = an2 ? nNode2.nextSibling :null;
i++;
}
}
function _fnConvertToWidth(sWidth, nParent) {
if (!sWidth || null === sWidth || "" === sWidth) return 0;
nParent || (nParent = document.body);
var iWidth, nTmp = document.createElement("div");
return nTmp.style.width = _fnStringToCss(sWidth), nParent.appendChild(nTmp), iWidth = nTmp.offsetWidth, 
nParent.removeChild(nTmp), iWidth;
}
function _fnCalculateColumnWidths(oSettings) {
var iTmpWidth, i, iCorrector, iWidth, iUserInputs = (oSettings.nTable.offsetWidth, 
0), iVisibleColumns = 0, iColums = oSettings.aoColumns.length, oHeaders = $("th", oSettings.nTHead), widthAttr = oSettings.nTable.getAttribute("width"), nWrapper = oSettings.nTable.parentNode;
for (i = 0; iColums > i; i++) oSettings.aoColumns[i].bVisible && (iVisibleColumns++, 
null !== oSettings.aoColumns[i].sWidth && (iTmpWidth = _fnConvertToWidth(oSettings.aoColumns[i].sWidthOrig, nWrapper), 
null !== iTmpWidth && (oSettings.aoColumns[i].sWidth = _fnStringToCss(iTmpWidth)), 
iUserInputs++));
if (iColums == oHeaders.length && 0 === iUserInputs && iVisibleColumns == iColums && "" === oSettings.oScroll.sX && "" === oSettings.oScroll.sY) for (i = 0; i < oSettings.aoColumns.length; i++) iTmpWidth = $(oHeaders[i]).width(), 
null !== iTmpWidth && (oSettings.aoColumns[i].sWidth = _fnStringToCss(iTmpWidth)); else {
var nCalcTmp = oSettings.nTable.cloneNode(!1), nTheadClone = oSettings.nTHead.cloneNode(!0), nBody = document.createElement("tbody"), nTr = document.createElement("tr");
nCalcTmp.removeAttribute("id"), nCalcTmp.appendChild(nTheadClone), null !== oSettings.nTFoot && (nCalcTmp.appendChild(oSettings.nTFoot.cloneNode(!0)), 
_fnApplyToChildren(function(n) {
n.style.width = "";
}, nCalcTmp.getElementsByTagName("tr"))), nCalcTmp.appendChild(nBody), nBody.appendChild(nTr);
var jqColSizing = $("thead th", nCalcTmp);
0 === jqColSizing.length && (jqColSizing = $("tbody tr:eq(0)>td", nCalcTmp));
var nThs = _fnGetUniqueThs(oSettings, nTheadClone);
for (iCorrector = 0, i = 0; iColums > i; i++) {
var oColumn = oSettings.aoColumns[i];
oColumn.bVisible && null !== oColumn.sWidthOrig && "" !== oColumn.sWidthOrig ? nThs[i - iCorrector].style.width = _fnStringToCss(oColumn.sWidthOrig) :oColumn.bVisible ? nThs[i - iCorrector].style.width = "" :iCorrector++;
}
for (i = 0; iColums > i; i++) if (oSettings.aoColumns[i].bVisible) {
var nTd = _fnGetWidestNode(oSettings, i);
null !== nTd && (nTd = nTd.cloneNode(!0), "" !== oSettings.aoColumns[i].sContentPadding && (nTd.innerHTML += oSettings.aoColumns[i].sContentPadding), 
nTr.appendChild(nTd));
}
nWrapper.appendChild(nCalcTmp), "" !== oSettings.oScroll.sX && "" !== oSettings.oScroll.sXInner ? nCalcTmp.style.width = _fnStringToCss(oSettings.oScroll.sXInner) :"" !== oSettings.oScroll.sX ? (nCalcTmp.style.width = "", 
$(nCalcTmp).width() < nWrapper.offsetWidth && (nCalcTmp.style.width = _fnStringToCss(nWrapper.offsetWidth))) :"" !== oSettings.oScroll.sY ? nCalcTmp.style.width = _fnStringToCss(nWrapper.offsetWidth) :widthAttr && (nCalcTmp.style.width = _fnStringToCss(widthAttr)), 
nCalcTmp.style.visibility = "hidden", _fnScrollingWidthAdjust(oSettings, nCalcTmp);
var oNodes = $("tbody tr:eq(0)", nCalcTmp).children();
if (0 === oNodes.length && (oNodes = _fnGetUniqueThs(oSettings, $("thead", nCalcTmp)[0])), 
"" !== oSettings.oScroll.sX) {
var iTotal = 0;
for (iCorrector = 0, i = 0; i < oSettings.aoColumns.length; i++) oSettings.aoColumns[i].bVisible && (iTotal += null === oSettings.aoColumns[i].sWidthOrig ? $(oNodes[iCorrector]).outerWidth() :parseInt(oSettings.aoColumns[i].sWidth.replace("px", ""), 10) + ($(oNodes[iCorrector]).outerWidth() - $(oNodes[iCorrector]).width()), 
iCorrector++);
nCalcTmp.style.width = _fnStringToCss(iTotal), oSettings.nTable.style.width = _fnStringToCss(iTotal);
}
for (iCorrector = 0, i = 0; i < oSettings.aoColumns.length; i++) oSettings.aoColumns[i].bVisible && (iWidth = $(oNodes[iCorrector]).width(), 
null !== iWidth && iWidth > 0 && (oSettings.aoColumns[i].sWidth = _fnStringToCss(iWidth)), 
iCorrector++);
var cssWidth = $(nCalcTmp).css("width");
oSettings.nTable.style.width = -1 !== cssWidth.indexOf("%") ? cssWidth :_fnStringToCss($(nCalcTmp).outerWidth()), 
nCalcTmp.parentNode.removeChild(nCalcTmp);
}
widthAttr && (oSettings.nTable.style.width = _fnStringToCss(widthAttr));
}
function _fnScrollingWidthAdjust(oSettings, n) {
if ("" === oSettings.oScroll.sX && "" !== oSettings.oScroll.sY) {
{
$(n).width();
}
n.style.width = _fnStringToCss($(n).outerWidth() - oSettings.oScroll.iBarWidth);
} else "" !== oSettings.oScroll.sX && (n.style.width = _fnStringToCss($(n).outerWidth()));
}
function _fnGetWidestNode(oSettings, iCol) {
var iMaxIndex = _fnGetMaxLenString(oSettings, iCol);
if (0 > iMaxIndex) return null;
if (null === oSettings.aoData[iMaxIndex].nTr) {
var n = document.createElement("td");
return n.innerHTML = _fnGetCellData(oSettings, iMaxIndex, iCol, ""), n;
}
return _fnGetTdNodes(oSettings, iMaxIndex)[iCol];
}
function _fnGetMaxLenString(oSettings, iCol) {
for (var iMax = -1, iMaxIndex = -1, i = 0; i < oSettings.aoData.length; i++) {
var s = _fnGetCellData(oSettings, i, iCol, "display") + "";
s = s.replace(/<.*?>/g, ""), s.length > iMax && (iMax = s.length, iMaxIndex = i);
}
return iMaxIndex;
}
function _fnStringToCss(s) {
if (null === s) return "0px";
if ("number" == typeof s) return 0 > s ? "0px" :s + "px";
var c = s.charCodeAt(s.length - 1);
return 48 > c || c > 57 ? s :s + "px";
}
function _fnScrollBarWidth() {
var inner = document.createElement("p"), style = inner.style;
style.width = "100%", style.height = "200px", style.padding = "0px";
var outer = document.createElement("div");
style = outer.style, style.position = "absolute", style.top = "0px", style.left = "0px", 
style.visibility = "hidden", style.width = "200px", style.height = "150px", style.padding = "0px", 
style.overflow = "hidden", outer.appendChild(inner), document.body.appendChild(outer);
var w1 = inner.offsetWidth;
outer.style.overflow = "scroll";
var w2 = inner.offsetWidth;
return w1 == w2 && (w2 = outer.clientWidth), document.body.removeChild(outer), w1 - w2;
}
function _fnSort(oSettings, bApplyClasses) {
var i, iLen, j, jLen, k, kLen, sDataType, nTh, aaSort = [], aiOrig = [], oSort = DataTable.ext.oSort, aoData = oSettings.aoData, aoColumns = oSettings.aoColumns, oAria = oSettings.oLanguage.oAria;
if (!oSettings.oFeatures.bServerSide && (0 !== oSettings.aaSorting.length || null !== oSettings.aaSortingFixed)) {
for (aaSort = null !== oSettings.aaSortingFixed ? oSettings.aaSortingFixed.concat(oSettings.aaSorting) :oSettings.aaSorting.slice(), 
i = 0; i < aaSort.length; i++) {
var iColumn = aaSort[i][0], iVisColumn = _fnColumnIndexToVisible(oSettings, iColumn);
if (sDataType = oSettings.aoColumns[iColumn].sSortDataType, DataTable.ext.afnSortData[sDataType]) {
var aData = DataTable.ext.afnSortData[sDataType].call(oSettings.oInstance, oSettings, iColumn, iVisColumn);
if (aData.length === aoData.length) for (j = 0, jLen = aoData.length; jLen > j; j++) _fnSetCellData(oSettings, j, iColumn, aData[j]); else _fnLog(oSettings, 0, "Returned data sort array (col " + iColumn + ") is the wrong length");
}
}
for (i = 0, iLen = oSettings.aiDisplayMaster.length; iLen > i; i++) aiOrig[oSettings.aiDisplayMaster[i]] = i;
var fnSortFormat, aDataSort, iSortLen = aaSort.length;
for (i = 0, iLen = aoData.length; iLen > i; i++) for (j = 0; iSortLen > j; j++) for (aDataSort = aoColumns[aaSort[j][0]].aDataSort, 
k = 0, kLen = aDataSort.length; kLen > k; k++) sDataType = aoColumns[aDataSort[k]].sType, 
fnSortFormat = oSort[(sDataType ? sDataType :"string") + "-pre"], aoData[i]._aSortData[aDataSort[k]] = fnSortFormat ? fnSortFormat(_fnGetCellData(oSettings, i, aDataSort[k], "sort")) :_fnGetCellData(oSettings, i, aDataSort[k], "sort");
oSettings.aiDisplayMaster.sort(function(a, b) {
var k, l, lLen, iTest, aDataSort, sDataType;
for (k = 0; iSortLen > k; k++) for (aDataSort = aoColumns[aaSort[k][0]].aDataSort, 
l = 0, lLen = aDataSort.length; lLen > l; l++) if (sDataType = aoColumns[aDataSort[l]].sType, 
iTest = oSort[(sDataType ? sDataType :"string") + "-" + aaSort[k][1]](aoData[a]._aSortData[aDataSort[l]], aoData[b]._aSortData[aDataSort[l]]), 
0 !== iTest) return iTest;
return oSort["numeric-asc"](aiOrig[a], aiOrig[b]);
});
}
for (bApplyClasses !== undefined && !bApplyClasses || oSettings.oFeatures.bDeferRender || _fnSortingClasses(oSettings), 
i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) {
var sTitle = aoColumns[i].sTitle.replace(/<.*?>/g, "");
if (nTh = aoColumns[i].nTh, nTh.removeAttribute("aria-sort"), nTh.removeAttribute("aria-label"), 
aoColumns[i].bSortable) if (aaSort.length > 0 && aaSort[0][0] == i) {
nTh.setAttribute("aria-sort", "asc" == aaSort[0][1] ? "ascending" :"descending");
var nextSort = aoColumns[i].asSorting[aaSort[0][2] + 1] ? aoColumns[i].asSorting[aaSort[0][2] + 1] :aoColumns[i].asSorting[0];
nTh.setAttribute("aria-label", sTitle + ("asc" == nextSort ? oAria.sSortAscending :oAria.sSortDescending));
} else nTh.setAttribute("aria-label", sTitle + ("asc" == aoColumns[i].asSorting[0] ? oAria.sSortAscending :oAria.sSortDescending)); else nTh.setAttribute("aria-label", sTitle);
}
oSettings.bSorted = !0, $(oSettings.oInstance).trigger("sort", oSettings), oSettings.oFeatures.bFilter ? _fnFilterComplete(oSettings, oSettings.oPreviousSearch, 1) :(oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), 
oSettings._iDisplayStart = 0, _fnCalculateEnd(oSettings), _fnDraw(oSettings));
}
function _fnSortAttachListener(oSettings, nNode, iDataIndex, fnCallback) {
_fnBindAction(nNode, {}, function(e) {
if (oSettings.aoColumns[iDataIndex].bSortable !== !1) {
var fnInnerSorting = function() {
var iColumn, iNextSort;
if (e.shiftKey) {
for (var bFound = !1, i = 0; i < oSettings.aaSorting.length; i++) if (oSettings.aaSorting[i][0] == iDataIndex) {
bFound = !0, iColumn = oSettings.aaSorting[i][0], iNextSort = oSettings.aaSorting[i][2] + 1, 
oSettings.aoColumns[iColumn].asSorting[iNextSort] ? (oSettings.aaSorting[i][1] = oSettings.aoColumns[iColumn].asSorting[iNextSort], 
oSettings.aaSorting[i][2] = iNextSort) :oSettings.aaSorting.splice(i, 1);
break;
}
bFound === !1 && oSettings.aaSorting.push([ iDataIndex, oSettings.aoColumns[iDataIndex].asSorting[0], 0 ]);
} else 1 == oSettings.aaSorting.length && oSettings.aaSorting[0][0] == iDataIndex ? (iColumn = oSettings.aaSorting[0][0], 
iNextSort = oSettings.aaSorting[0][2] + 1, oSettings.aoColumns[iColumn].asSorting[iNextSort] || (iNextSort = 0), 
oSettings.aaSorting[0][1] = oSettings.aoColumns[iColumn].asSorting[iNextSort], oSettings.aaSorting[0][2] = iNextSort) :(oSettings.aaSorting.splice(0, oSettings.aaSorting.length), 
oSettings.aaSorting.push([ iDataIndex, oSettings.aoColumns[iDataIndex].asSorting[0], 0 ]));
_fnSort(oSettings);
};
oSettings.oFeatures.bProcessing ? (_fnProcessingDisplay(oSettings, !0), setTimeout(function() {
fnInnerSorting(), oSettings.oFeatures.bServerSide || _fnProcessingDisplay(oSettings, !1);
}, 0)) :fnInnerSorting(), "function" == typeof fnCallback && fnCallback(oSettings);
}
});
}
function _fnSortingClasses(oSettings) {
var i, iLen, j, iFound, aaSort, sClass, iColumns = oSettings.aoColumns.length, oClasses = oSettings.oClasses;
for (i = 0; iColumns > i; i++) oSettings.aoColumns[i].bSortable && $(oSettings.aoColumns[i].nTh).removeClass(oClasses.sSortAsc + " " + oClasses.sSortDesc + " " + oSettings.aoColumns[i].sSortingClass);
for (aaSort = null !== oSettings.aaSortingFixed ? oSettings.aaSortingFixed.concat(oSettings.aaSorting) :oSettings.aaSorting.slice(), 
i = 0; i < oSettings.aoColumns.length; i++) if (oSettings.aoColumns[i].bSortable) {
for (sClass = oSettings.aoColumns[i].sSortingClass, iFound = -1, j = 0; j < aaSort.length; j++) if (aaSort[j][0] == i) {
sClass = "asc" == aaSort[j][1] ? oClasses.sSortAsc :oClasses.sSortDesc, iFound = j;
break;
}
if ($(oSettings.aoColumns[i].nTh).addClass(sClass), oSettings.bJUI) {
var jqSpan = $("span." + oClasses.sSortIcon, oSettings.aoColumns[i].nTh);
jqSpan.removeClass(oClasses.sSortJUIAsc + " " + oClasses.sSortJUIDesc + " " + oClasses.sSortJUI + " " + oClasses.sSortJUIAscAllowed + " " + oClasses.sSortJUIDescAllowed);
var sSpanClass;
sSpanClass = -1 == iFound ? oSettings.aoColumns[i].sSortingClassJUI :"asc" == aaSort[iFound][1] ? oClasses.sSortJUIAsc :oClasses.sSortJUIDesc, 
jqSpan.addClass(sSpanClass);
}
} else $(oSettings.aoColumns[i].nTh).addClass(oSettings.aoColumns[i].sSortingClass);
if (sClass = oClasses.sSortColumn, oSettings.oFeatures.bSort && oSettings.oFeatures.bSortClasses) {
var iClass, iTargetCol, nTds = _fnGetTdNodes(oSettings), asClasses = [];
for (i = 0; iColumns > i; i++) asClasses.push("");
for (i = 0, iClass = 1; i < aaSort.length; i++) iTargetCol = parseInt(aaSort[i][0], 10), 
asClasses[iTargetCol] = sClass + iClass, 3 > iClass && iClass++;
var sTmpClass, sCurrentClass, sNewClass, reClass = new RegExp(sClass + "[123]");
for (i = 0, iLen = nTds.length; iLen > i; i++) iTargetCol = i % iColumns, sCurrentClass = nTds[i].className, 
sNewClass = asClasses[iTargetCol], sTmpClass = sCurrentClass.replace(reClass, sNewClass), 
sTmpClass != sCurrentClass ? nTds[i].className = $.trim(sTmpClass) :sNewClass.length > 0 && -1 == sCurrentClass.indexOf(sNewClass) && (nTds[i].className = sCurrentClass + " " + sNewClass);
}
}
function _fnSaveState(oSettings) {
if (oSettings.oFeatures.bStateSave && !oSettings.bDestroying) {
var i, iLen, bInfinite = oSettings.oScroll.bInfinite, oState = {
iCreate:new Date().getTime(),
iStart:bInfinite ? 0 :oSettings._iDisplayStart,
iEnd:bInfinite ? oSettings._iDisplayLength :oSettings._iDisplayEnd,
iLength:oSettings._iDisplayLength,
aaSorting:$.extend(!0, [], oSettings.aaSorting),
oSearch:$.extend(!0, {}, oSettings.oPreviousSearch),
aoSearchCols:$.extend(!0, [], oSettings.aoPreSearchCols),
abVisCols:[]
};
for (i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) oState.abVisCols.push(oSettings.aoColumns[i].bVisible);
_fnCallbackFire(oSettings, "aoStateSaveParams", "stateSaveParams", [ oSettings, oState ]), 
oSettings.fnStateSave.call(oSettings.oInstance, oSettings, oState);
}
}
function _fnLoadState(oSettings, oInit) {
if (oSettings.oFeatures.bStateSave) {
var oData = oSettings.fnStateLoad.call(oSettings.oInstance, oSettings);
if (oData) {
var abStateLoad = _fnCallbackFire(oSettings, "aoStateLoadParams", "stateLoadParams", [ oSettings, oData ]);
if (-1 === $.inArray(!1, abStateLoad)) {
oSettings.oLoadedState = $.extend(!0, {}, oData), oSettings._iDisplayStart = oData.iStart, 
oSettings.iInitDisplayStart = oData.iStart, oSettings._iDisplayEnd = oData.iEnd, 
oSettings._iDisplayLength = oData.iLength, oSettings.aaSorting = oData.aaSorting.slice(), 
oSettings.saved_aaSorting = oData.aaSorting.slice(), $.extend(oSettings.oPreviousSearch, oData.oSearch), 
$.extend(!0, oSettings.aoPreSearchCols, oData.aoSearchCols), oInit.saved_aoColumns = [];
for (var i = 0; i < oData.abVisCols.length; i++) oInit.saved_aoColumns[i] = {}, 
oInit.saved_aoColumns[i].bVisible = oData.abVisCols[i];
_fnCallbackFire(oSettings, "aoStateLoaded", "stateLoaded", [ oSettings, oData ]);
}
}
}
}
function _fnCreateCookie(sName, sValue, iSecs, sBaseName, fnCallback) {
var date = new Date();
date.setTime(date.getTime() + 1e3 * iSecs);
var aParts = window.location.pathname.split("/"), sNameFile = sName + "_" + aParts.pop().replace(/[\/:]/g, "").toLowerCase(), sFullCookie, oData;
null !== fnCallback ? (oData = "function" == typeof $.parseJSON ? $.parseJSON(sValue) :eval("(" + sValue + ")"), 
sFullCookie = fnCallback(sNameFile, oData, date.toGMTString(), aParts.join("/") + "/")) :sFullCookie = sNameFile + "=" + encodeURIComponent(sValue) + "; expires=" + date.toGMTString() + "; path=" + aParts.join("/") + "/";
var aCookies = document.cookie.split(";"), iNewCookieLen = sFullCookie.split(";")[0].length, aOldCookies = [];
if (iNewCookieLen + document.cookie.length + 10 > 4096) {
for (var i = 0, iLen = aCookies.length; iLen > i; i++) if (-1 != aCookies[i].indexOf(sBaseName)) {
var aSplitCookie = aCookies[i].split("=");
try {
oData = eval("(" + decodeURIComponent(aSplitCookie[1]) + ")"), oData && oData.iCreate && aOldCookies.push({
name:aSplitCookie[0],
time:oData.iCreate
});
} catch (e) {}
}
for (aOldCookies.sort(function(a, b) {
return b.time - a.time;
}); iNewCookieLen + document.cookie.length + 10 > 4096; ) {
if (0 === aOldCookies.length) return;
var old = aOldCookies.pop();
document.cookie = old.name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + aParts.join("/") + "/";
}
}
document.cookie = sFullCookie;
}
function _fnReadCookie(sName) {
for (var aParts = window.location.pathname.split("/"), sNameEQ = sName + "_" + aParts[aParts.length - 1].replace(/[\/:]/g, "").toLowerCase() + "=", sCookieContents = document.cookie.split(";"), i = 0; i < sCookieContents.length; i++) {
for (var c = sCookieContents[i]; " " == c.charAt(0); ) c = c.substring(1, c.length);
if (0 === c.indexOf(sNameEQ)) return decodeURIComponent(c.substring(sNameEQ.length, c.length));
}
return null;
}
function _fnSettingsFromNode(nTable) {
for (var i = 0; i < DataTable.settings.length; i++) if (DataTable.settings[i].nTable === nTable) return DataTable.settings[i];
return null;
}
function _fnGetTrNodes(oSettings) {
for (var aNodes = [], aoData = oSettings.aoData, i = 0, iLen = aoData.length; iLen > i; i++) null !== aoData[i].nTr && aNodes.push(aoData[i].nTr);
return aNodes;
}
function _fnGetTdNodes(oSettings, iIndividualRow) {
var iCorrector, anTds, nTd, iRow, iColumn, iColumns, oData, sNodeName, anReturn = [], iRows = oSettings.aoData.length, iStart = 0, iEnd = iRows;
for (iIndividualRow !== undefined && (iStart = iIndividualRow, iEnd = iIndividualRow + 1), 
iRow = iStart; iEnd > iRow; iRow++) if (oData = oSettings.aoData[iRow], null !== oData.nTr) {
for (anTds = [], nTd = oData.nTr.firstChild; nTd; ) sNodeName = nTd.nodeName.toLowerCase(), 
("td" == sNodeName || "th" == sNodeName) && anTds.push(nTd), nTd = nTd.nextSibling;
for (iCorrector = 0, iColumn = 0, iColumns = oSettings.aoColumns.length; iColumns > iColumn; iColumn++) oSettings.aoColumns[iColumn].bVisible ? anReturn.push(anTds[iColumn - iCorrector]) :(anReturn.push(oData._anHidden[iColumn]), 
iCorrector++);
}
return anReturn;
}
function _fnLog(oSettings, iLevel, sMesg) {
var sAlert = null === oSettings ? "DataTables warning: " + sMesg :"DataTables warning (table id = '" + oSettings.sTableId + "'): " + sMesg;
if (0 === iLevel) {
if ("alert" != DataTable.ext.sErrMode) throw new Error(sAlert);
return alert(sAlert), void 0;
}
window.console && console.log && console.log(sAlert);
}
function _fnMap(oRet, oSrc, sName, sMappedName) {
sMappedName === undefined && (sMappedName = sName), oSrc[sName] !== undefined && (oRet[sMappedName] = oSrc[sName]);
}
function _fnExtend(oOut, oExtender) {
var val;
for (var prop in oExtender) oExtender.hasOwnProperty(prop) && (val = oExtender[prop], 
"object" == typeof oInit[prop] && null !== val && $.isArray(val) === !1 ? $.extend(!0, oOut[prop], val) :oOut[prop] = val);
return oOut;
}
function _fnBindAction(n, oData, fn) {
$(n).bind("click.DT", oData, function(e) {
n.blur(), fn(e);
}).bind("keypress.DT", oData, function(e) {
13 === e.which && fn(e);
}).bind("selectstart.DT", function() {
return !1;
});
}
function _fnCallbackReg(oSettings, sStore, fn, sName) {
fn && oSettings[sStore].push({
fn:fn,
sName:sName
});
}
function _fnCallbackFire(oSettings, sStore, sTrigger, aArgs) {
for (var aoStore = oSettings[sStore], aRet = [], i = aoStore.length - 1; i >= 0; i--) aRet.push(aoStore[i].fn.apply(oSettings.oInstance, aArgs));
return null !== sTrigger && $(oSettings.oInstance).trigger(sTrigger, aArgs), aRet;
}
function _fnBrowserDetect(oSettings) {
var n = $('<div style="position:absolute; top:0; left:0; height:1px; width:1px; overflow:hidden"><div style="position:absolute; top:1px; left:1px; width:100px; overflow:scroll;"><div id="DT_BrowserTest" style="width:100%; height:10px;"></div></div></div>')[0];
document.body.appendChild(n), oSettings.oBrowser.bScrollOversize = 100 === $("#DT_BrowserTest", n)[0].offsetWidth ? !0 :!1, 
document.body.removeChild(n);
}
function _fnExternApiFunc(sFunc) {
return function() {
var aArgs = [ _fnSettingsFromNode(this[DataTable.ext.iApiIndex]) ].concat(Array.prototype.slice.call(arguments));
return DataTable.ext.oApi[sFunc].apply(this, aArgs);
};
}
var __reArray = /\[.*?\]$/, _fnJsonString = window.JSON ? JSON.stringify :function(o) {
var sType = typeof o;
if ("object" !== sType || null === o) return "string" === sType && (o = '"' + o + '"'), 
o + "";
var sProp, mValue, json = [], bArr = $.isArray(o);
for (sProp in o) mValue = o[sProp], sType = typeof mValue, "string" === sType ? mValue = '"' + mValue + '"' :"object" === sType && null !== mValue && (mValue = _fnJsonString(mValue)), 
json.push((bArr ? "" :'"' + sProp + '":') + mValue);
return (bArr ? "[" :"{") + json + (bArr ? "]" :"}");
};
this.$ = function(sSelector, oOpts) {
var i, iLen, tr, a = [], oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), aoData = oSettings.aoData, aiDisplay = oSettings.aiDisplay, aiDisplayMaster = oSettings.aiDisplayMaster;
if (oOpts || (oOpts = {}), oOpts = $.extend({}, {
filter:"none",
order:"current",
page:"all"
}, oOpts), "current" == oOpts.page) for (i = oSettings._iDisplayStart, iLen = oSettings.fnDisplayEnd(); iLen > i; i++) tr = aoData[aiDisplay[i]].nTr, 
tr && a.push(tr); else if ("current" == oOpts.order && "none" == oOpts.filter) for (i = 0, 
iLen = aiDisplayMaster.length; iLen > i; i++) tr = aoData[aiDisplayMaster[i]].nTr, 
tr && a.push(tr); else if ("current" == oOpts.order && "applied" == oOpts.filter) for (i = 0, 
iLen = aiDisplay.length; iLen > i; i++) tr = aoData[aiDisplay[i]].nTr, tr && a.push(tr); else if ("original" == oOpts.order && "none" == oOpts.filter) for (i = 0, 
iLen = aoData.length; iLen > i; i++) tr = aoData[i].nTr, tr && a.push(tr); else if ("original" == oOpts.order && "applied" == oOpts.filter) for (i = 0, 
iLen = aoData.length; iLen > i; i++) tr = aoData[i].nTr, -1 !== $.inArray(i, aiDisplay) && tr && a.push(tr); else _fnLog(oSettings, 1, "Unknown selection options");
var jqA = $(a), jqTRs = jqA.filter(sSelector), jqDescendants = jqA.find(sSelector);
return $([].concat($.makeArray(jqTRs), $.makeArray(jqDescendants)));
}, this._ = function(sSelector, oOpts) {
var i, iLen, aOut = [], aTrs = this.$(sSelector, oOpts);
for (i = 0, iLen = aTrs.length; iLen > i; i++) aOut.push(this.fnGetData(aTrs[i]));
return aOut;
}, this.fnAddData = function(mData, bRedraw) {
if (0 === mData.length) return [];
var iTest, aiReturn = [], oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
if ("object" == typeof mData[0] && null !== mData[0]) for (var i = 0; i < mData.length; i++) {
if (iTest = _fnAddData(oSettings, mData[i]), -1 == iTest) return aiReturn;
aiReturn.push(iTest);
} else {
if (iTest = _fnAddData(oSettings, mData), -1 == iTest) return aiReturn;
aiReturn.push(iTest);
}
return oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), (bRedraw === undefined || bRedraw) && _fnReDraw(oSettings), 
aiReturn;
}, this.fnAdjustColumnSizing = function(bRedraw) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
_fnAdjustColumnSizing(oSettings), bRedraw === undefined || bRedraw ? this.fnDraw(!1) :("" !== oSettings.oScroll.sX || "" !== oSettings.oScroll.sY) && this.oApi._fnScrollDraw(oSettings);
}, this.fnClearTable = function(bRedraw) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
_fnClearTable(oSettings), (bRedraw === undefined || bRedraw) && _fnDraw(oSettings);
}, this.fnClose = function(nTr) {
for (var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), i = 0; i < oSettings.aoOpenRows.length; i++) if (oSettings.aoOpenRows[i].nParent == nTr) {
var nTrParent = oSettings.aoOpenRows[i].nTr.parentNode;
return nTrParent && nTrParent.removeChild(oSettings.aoOpenRows[i].nTr), oSettings.aoOpenRows.splice(i, 1), 
0;
}
return 1;
}, this.fnDeleteRow = function(mTarget, fnCallBack, bRedraw) {
var i, iLen, iAODataIndex, oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
iAODataIndex = "object" == typeof mTarget ? _fnNodeToDataIndex(oSettings, mTarget) :mTarget;
var oData = oSettings.aoData.splice(iAODataIndex, 1);
for (i = 0, iLen = oSettings.aoData.length; iLen > i; i++) null !== oSettings.aoData[i].nTr && (oSettings.aoData[i].nTr._DT_RowIndex = i);
var iDisplayIndex = $.inArray(iAODataIndex, oSettings.aiDisplay);
return oSettings.asDataSearch.splice(iDisplayIndex, 1), _fnDeleteIndex(oSettings.aiDisplayMaster, iAODataIndex), 
_fnDeleteIndex(oSettings.aiDisplay, iAODataIndex), "function" == typeof fnCallBack && fnCallBack.call(this, oSettings, oData), 
oSettings._iDisplayStart >= oSettings.fnRecordsDisplay() && (oSettings._iDisplayStart -= oSettings._iDisplayLength, 
oSettings._iDisplayStart < 0 && (oSettings._iDisplayStart = 0)), (bRedraw === undefined || bRedraw) && (_fnCalculateEnd(oSettings), 
_fnDraw(oSettings)), oData;
}, this.fnDestroy = function(bRemove) {
var i, iLen, oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), nOrig = oSettings.nTableWrapper.parentNode, nBody = oSettings.nTBody;
if (bRemove = bRemove === undefined ? !1 :bRemove, oSettings.bDestroying = !0, _fnCallbackFire(oSettings, "aoDestroyCallback", "destroy", [ oSettings ]), 
!bRemove) for (i = 0, iLen = oSettings.aoColumns.length; iLen > i; i++) oSettings.aoColumns[i].bVisible === !1 && this.fnSetColumnVis(i, !0);
for ($(oSettings.nTableWrapper).find("*").andSelf().unbind(".DT"), $("tbody>tr>td." + oSettings.oClasses.sRowEmpty, oSettings.nTable).parent().remove(), 
oSettings.nTable != oSettings.nTHead.parentNode && ($(oSettings.nTable).children("thead").remove(), 
oSettings.nTable.appendChild(oSettings.nTHead)), oSettings.nTFoot && oSettings.nTable != oSettings.nTFoot.parentNode && ($(oSettings.nTable).children("tfoot").remove(), 
oSettings.nTable.appendChild(oSettings.nTFoot)), oSettings.nTable.parentNode.removeChild(oSettings.nTable), 
$(oSettings.nTableWrapper).remove(), oSettings.aaSorting = [], oSettings.aaSortingFixed = [], 
_fnSortingClasses(oSettings), $(_fnGetTrNodes(oSettings)).removeClass(oSettings.asStripeClasses.join(" ")), 
$("th, td", oSettings.nTHead).removeClass([ oSettings.oClasses.sSortable, oSettings.oClasses.sSortableAsc, oSettings.oClasses.sSortableDesc, oSettings.oClasses.sSortableNone ].join(" ")), 
oSettings.bJUI && ($("th span." + oSettings.oClasses.sSortIcon + ", td span." + oSettings.oClasses.sSortIcon, oSettings.nTHead).remove(), 
$("th, td", oSettings.nTHead).each(function() {
var jqWrapper = $("div." + oSettings.oClasses.sSortJUIWrapper, this), kids = jqWrapper.contents();
$(this).append(kids), jqWrapper.remove();
})), !bRemove && oSettings.nTableReinsertBefore ? nOrig.insertBefore(oSettings.nTable, oSettings.nTableReinsertBefore) :bRemove || nOrig.appendChild(oSettings.nTable), 
i = 0, iLen = oSettings.aoData.length; iLen > i; i++) null !== oSettings.aoData[i].nTr && nBody.appendChild(oSettings.aoData[i].nTr);
if (oSettings.oFeatures.bAutoWidth === !0 && (oSettings.nTable.style.width = _fnStringToCss(oSettings.sDestroyWidth)), 
iLen = oSettings.asDestroyStripes.length) {
var anRows = $(nBody).children("tr");
for (i = 0; iLen > i; i++) anRows.filter(":nth-child(" + iLen + "n + " + i + ")").addClass(oSettings.asDestroyStripes[i]);
}
for (i = 0, iLen = DataTable.settings.length; iLen > i; i++) DataTable.settings[i] == oSettings && DataTable.settings.splice(i, 1);
oSettings = null, oInit = null;
}, this.fnDraw = function(bComplete) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
bComplete === !1 ? (_fnCalculateEnd(oSettings), _fnDraw(oSettings)) :_fnReDraw(oSettings);
}, this.fnFilter = function(sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
if (oSettings.oFeatures.bFilter) if ((bRegex === undefined || null === bRegex) && (bRegex = !1), 
(bSmart === undefined || null === bSmart) && (bSmart = !0), (bShowGlobal === undefined || null === bShowGlobal) && (bShowGlobal = !0), 
(bCaseInsensitive === undefined || null === bCaseInsensitive) && (bCaseInsensitive = !0), 
iColumn === undefined || null === iColumn) {
if (_fnFilterComplete(oSettings, {
sSearch:sInput + "",
bRegex:bRegex,
bSmart:bSmart,
bCaseInsensitive:bCaseInsensitive
}, 1), bShowGlobal && oSettings.aanFeatures.f) for (var n = oSettings.aanFeatures.f, i = 0, iLen = n.length; iLen > i; i++) try {
n[i]._DT_Input != document.activeElement && $(n[i]._DT_Input).val(sInput);
} catch (e) {
$(n[i]._DT_Input).val(sInput);
}
} else $.extend(oSettings.aoPreSearchCols[iColumn], {
sSearch:sInput + "",
bRegex:bRegex,
bSmart:bSmart,
bCaseInsensitive:bCaseInsensitive
}), _fnFilterComplete(oSettings, oSettings.oPreviousSearch, 1);
}, this.fnGetData = function(mRow, iCol) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
if (mRow !== undefined) {
var iRow = mRow;
if ("object" == typeof mRow) {
var sNode = mRow.nodeName.toLowerCase();
"tr" === sNode ? iRow = _fnNodeToDataIndex(oSettings, mRow) :"td" === sNode && (iRow = _fnNodeToDataIndex(oSettings, mRow.parentNode), 
iCol = _fnNodeToColumnIndex(oSettings, iRow, mRow));
}
return iCol !== undefined ? _fnGetCellData(oSettings, iRow, iCol, "") :oSettings.aoData[iRow] !== undefined ? oSettings.aoData[iRow]._aData :null;
}
return _fnGetDataMaster(oSettings);
}, this.fnGetNodes = function(iRow) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
return iRow !== undefined ? oSettings.aoData[iRow] !== undefined ? oSettings.aoData[iRow].nTr :null :_fnGetTrNodes(oSettings);
}, this.fnGetPosition = function(nNode) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), sNodeName = nNode.nodeName.toUpperCase();
if ("TR" == sNodeName) return _fnNodeToDataIndex(oSettings, nNode);
if ("TD" == sNodeName || "TH" == sNodeName) {
var iDataIndex = _fnNodeToDataIndex(oSettings, nNode.parentNode), iColumnIndex = _fnNodeToColumnIndex(oSettings, iDataIndex, nNode);
return [ iDataIndex, _fnColumnIndexToVisible(oSettings, iColumnIndex), iColumnIndex ];
}
return null;
}, this.fnIsOpen = function(nTr) {
for (var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), i = (oSettings.aoOpenRows, 
0); i < oSettings.aoOpenRows.length; i++) if (oSettings.aoOpenRows[i].nParent == nTr) return !0;
return !1;
}, this.fnOpen = function(nTr, mHtml, sClass) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), nTableRows = _fnGetTrNodes(oSettings);
if (-1 !== $.inArray(nTr, nTableRows)) {
this.fnClose(nTr);
var nNewRow = document.createElement("tr"), nNewCell = document.createElement("td");
nNewRow.appendChild(nNewCell), nNewCell.className = sClass, nNewCell.colSpan = _fnVisbleColumns(oSettings), 
"string" == typeof mHtml ? nNewCell.innerHTML = mHtml :$(nNewCell).html(mHtml);
var nTrs = $("tr", oSettings.nTBody);
return -1 != $.inArray(nTr, nTrs) && $(nNewRow).insertAfter(nTr), oSettings.aoOpenRows.push({
nTr:nNewRow,
nParent:nTr
}), nNewRow;
}
}, this.fnPageChange = function(mAction, bRedraw) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
_fnPageChange(oSettings, mAction), _fnCalculateEnd(oSettings), (bRedraw === undefined || bRedraw) && _fnDraw(oSettings);
}, this.fnSetColumnVis = function(iCol, bShow, bRedraw) {
var i, iLen, nTd, bAppend, iBefore, oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), aoColumns = oSettings.aoColumns, aoData = oSettings.aoData;
if (aoColumns[iCol].bVisible != bShow) {
if (bShow) {
var iInsert = 0;
for (i = 0; iCol > i; i++) aoColumns[i].bVisible && iInsert++;
if (bAppend = iInsert >= _fnVisbleColumns(oSettings), !bAppend) for (i = iCol; i < aoColumns.length; i++) if (aoColumns[i].bVisible) {
iBefore = i;
break;
}
for (i = 0, iLen = aoData.length; iLen > i; i++) null !== aoData[i].nTr && (bAppend ? aoData[i].nTr.appendChild(aoData[i]._anHidden[iCol]) :aoData[i].nTr.insertBefore(aoData[i]._anHidden[iCol], _fnGetTdNodes(oSettings, i)[iBefore]));
} else for (i = 0, iLen = aoData.length; iLen > i; i++) null !== aoData[i].nTr && (nTd = _fnGetTdNodes(oSettings, i)[iCol], 
aoData[i]._anHidden[iCol] = nTd, nTd.parentNode.removeChild(nTd));
for (aoColumns[iCol].bVisible = bShow, _fnDrawHead(oSettings, oSettings.aoHeader), 
oSettings.nTFoot && _fnDrawHead(oSettings, oSettings.aoFooter), i = 0, iLen = oSettings.aoOpenRows.length; iLen > i; i++) oSettings.aoOpenRows[i].nTr.colSpan = _fnVisbleColumns(oSettings);
(bRedraw === undefined || bRedraw) && (_fnAdjustColumnSizing(oSettings), _fnDraw(oSettings)), 
_fnSaveState(oSettings);
}
}, this.fnSettings = function() {
return _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
}, this.fnSort = function(aaSort) {
var oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]);
oSettings.aaSorting = aaSort, _fnSort(oSettings);
}, this.fnSortListener = function(nNode, iColumn, fnCallback) {
_fnSortAttachListener(_fnSettingsFromNode(this[DataTable.ext.iApiIndex]), nNode, iColumn, fnCallback);
}, this.fnUpdate = function(mData, mRow, iColumn, bRedraw, bAction) {
var i, sDisplay, oSettings = _fnSettingsFromNode(this[DataTable.ext.iApiIndex]), iRow = "object" == typeof mRow ? _fnNodeToDataIndex(oSettings, mRow) :mRow;
if ($.isArray(mData) && iColumn === undefined) for (oSettings.aoData[iRow]._aData = mData.slice(), 
i = 0; i < oSettings.aoColumns.length; i++) this.fnUpdate(_fnGetCellData(oSettings, iRow, i), iRow, i, !1, !1); else if ($.isPlainObject(mData) && iColumn === undefined) for (oSettings.aoData[iRow]._aData = $.extend(!0, {}, mData), 
i = 0; i < oSettings.aoColumns.length; i++) this.fnUpdate(_fnGetCellData(oSettings, iRow, i), iRow, i, !1, !1); else {
_fnSetCellData(oSettings, iRow, iColumn, mData), sDisplay = _fnGetCellData(oSettings, iRow, iColumn, "display");
var oCol = oSettings.aoColumns[iColumn];
null !== oCol.fnRender && (sDisplay = _fnRender(oSettings, iRow, iColumn), oCol.bUseRendered && _fnSetCellData(oSettings, iRow, iColumn, sDisplay)), 
null !== oSettings.aoData[iRow].nTr && (_fnGetTdNodes(oSettings, iRow)[iColumn].innerHTML = sDisplay);
}
var iDisplayIndex = $.inArray(iRow, oSettings.aiDisplay);
return oSettings.asDataSearch[iDisplayIndex] = _fnBuildSearchRow(oSettings, _fnGetRowData(oSettings, iRow, "filter", _fnGetColumns(oSettings, "bSearchable"))), 
(bAction === undefined || bAction) && _fnAdjustColumnSizing(oSettings), (bRedraw === undefined || bRedraw) && _fnReDraw(oSettings), 
0;
}, this.fnVersionCheck = DataTable.ext.fnVersionCheck, this.oApi = {
_fnExternApiFunc:_fnExternApiFunc,
_fnInitialise:_fnInitialise,
_fnInitComplete:_fnInitComplete,
_fnLanguageCompat:_fnLanguageCompat,
_fnAddColumn:_fnAddColumn,
_fnColumnOptions:_fnColumnOptions,
_fnAddData:_fnAddData,
_fnCreateTr:_fnCreateTr,
_fnGatherData:_fnGatherData,
_fnBuildHead:_fnBuildHead,
_fnDrawHead:_fnDrawHead,
_fnDraw:_fnDraw,
_fnReDraw:_fnReDraw,
_fnAjaxUpdate:_fnAjaxUpdate,
_fnAjaxParameters:_fnAjaxParameters,
_fnAjaxUpdateDraw:_fnAjaxUpdateDraw,
_fnServerParams:_fnServerParams,
_fnAddOptionsHtml:_fnAddOptionsHtml,
_fnFeatureHtmlTable:_fnFeatureHtmlTable,
_fnScrollDraw:_fnScrollDraw,
_fnAdjustColumnSizing:_fnAdjustColumnSizing,
_fnFeatureHtmlFilter:_fnFeatureHtmlFilter,
_fnFilterComplete:_fnFilterComplete,
_fnFilterCustom:_fnFilterCustom,
_fnFilterColumn:_fnFilterColumn,
_fnFilter:_fnFilter,
_fnBuildSearchArray:_fnBuildSearchArray,
_fnBuildSearchRow:_fnBuildSearchRow,
_fnFilterCreateSearch:_fnFilterCreateSearch,
_fnDataToSearch:_fnDataToSearch,
_fnSort:_fnSort,
_fnSortAttachListener:_fnSortAttachListener,
_fnSortingClasses:_fnSortingClasses,
_fnFeatureHtmlPaginate:_fnFeatureHtmlPaginate,
_fnPageChange:_fnPageChange,
_fnFeatureHtmlInfo:_fnFeatureHtmlInfo,
_fnUpdateInfo:_fnUpdateInfo,
_fnFeatureHtmlLength:_fnFeatureHtmlLength,
_fnFeatureHtmlProcessing:_fnFeatureHtmlProcessing,
_fnProcessingDisplay:_fnProcessingDisplay,
_fnVisibleToColumnIndex:_fnVisibleToColumnIndex,
_fnColumnIndexToVisible:_fnColumnIndexToVisible,
_fnNodeToDataIndex:_fnNodeToDataIndex,
_fnVisbleColumns:_fnVisbleColumns,
_fnCalculateEnd:_fnCalculateEnd,
_fnConvertToWidth:_fnConvertToWidth,
_fnCalculateColumnWidths:_fnCalculateColumnWidths,
_fnScrollingWidthAdjust:_fnScrollingWidthAdjust,
_fnGetWidestNode:_fnGetWidestNode,
_fnGetMaxLenString:_fnGetMaxLenString,
_fnStringToCss:_fnStringToCss,
_fnDetectType:_fnDetectType,
_fnSettingsFromNode:_fnSettingsFromNode,
_fnGetDataMaster:_fnGetDataMaster,
_fnGetTrNodes:_fnGetTrNodes,
_fnGetTdNodes:_fnGetTdNodes,
_fnEscapeRegex:_fnEscapeRegex,
_fnDeleteIndex:_fnDeleteIndex,
_fnReOrderIndex:_fnReOrderIndex,
_fnColumnOrdering:_fnColumnOrdering,
_fnLog:_fnLog,
_fnClearTable:_fnClearTable,
_fnSaveState:_fnSaveState,
_fnLoadState:_fnLoadState,
_fnCreateCookie:_fnCreateCookie,
_fnReadCookie:_fnReadCookie,
_fnDetectHeader:_fnDetectHeader,
_fnGetUniqueThs:_fnGetUniqueThs,
_fnScrollBarWidth:_fnScrollBarWidth,
_fnApplyToChildren:_fnApplyToChildren,
_fnMap:_fnMap,
_fnGetRowData:_fnGetRowData,
_fnGetCellData:_fnGetCellData,
_fnSetCellData:_fnSetCellData,
_fnGetObjectDataFn:_fnGetObjectDataFn,
_fnSetObjectDataFn:_fnSetObjectDataFn,
_fnApplyColumnDefs:_fnApplyColumnDefs,
_fnBindAction:_fnBindAction,
_fnExtend:_fnExtend,
_fnCallbackReg:_fnCallbackReg,
_fnCallbackFire:_fnCallbackFire,
_fnJsonString:_fnJsonString,
_fnRender:_fnRender,
_fnNodeToColumnIndex:_fnNodeToColumnIndex,
_fnInfoMacros:_fnInfoMacros,
_fnBrowserDetect:_fnBrowserDetect,
_fnGetColumns:_fnGetColumns
}, $.extend(DataTable.ext.oApi, this.oApi);
for (var sFunc in DataTable.ext.oApi) sFunc && (this[sFunc] = _fnExternApiFunc(sFunc));
var _that = this;
return this.each(function() {
var iLen, j, jLen, i = 0, sId = this.getAttribute("id"), bInitHandedOff = !1, bUsePassedData = !1;
if ("table" != this.nodeName.toLowerCase()) return _fnLog(null, 0, "Attempted to initialise DataTables on a node which is not a table: " + this.nodeName), 
void 0;
for (i = 0, iLen = DataTable.settings.length; iLen > i; i++) {
if (DataTable.settings[i].nTable == this) {
if (oInit === undefined || oInit.bRetrieve) return DataTable.settings[i].oInstance;
if (oInit.bDestroy) {
DataTable.settings[i].oInstance.fnDestroy();
break;
}
return _fnLog(DataTable.settings[i], 0, "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, pass no arguments or see the docs for bRetrieve and bDestroy"), 
void 0;
}
if (DataTable.settings[i].sTableId == this.id) {
DataTable.settings.splice(i, 1);
break;
}
}
(null === sId || "" === sId) && (sId = "DataTables_Table_" + DataTable.ext._oExternConfig.iNextUnique++, 
this.id = sId);
var oSettings = $.extend(!0, {}, DataTable.models.oSettings, {
nTable:this,
oApi:_that.oApi,
oInit:oInit,
sDestroyWidth:$(this).width(),
sInstance:sId,
sTableId:sId
});
if (DataTable.settings.push(oSettings), oSettings.oInstance = 1 === _that.length ? _that :$(this).dataTable(), 
oInit || (oInit = {}), oInit.oLanguage && _fnLanguageCompat(oInit.oLanguage), oInit = _fnExtend($.extend(!0, {}, DataTable.defaults), oInit), 
_fnMap(oSettings.oFeatures, oInit, "bPaginate"), _fnMap(oSettings.oFeatures, oInit, "bLengthChange"), 
_fnMap(oSettings.oFeatures, oInit, "bFilter"), _fnMap(oSettings.oFeatures, oInit, "bSort"), 
_fnMap(oSettings.oFeatures, oInit, "bInfo"), _fnMap(oSettings.oFeatures, oInit, "bProcessing"), 
_fnMap(oSettings.oFeatures, oInit, "bAutoWidth"), _fnMap(oSettings.oFeatures, oInit, "bSortClasses"), 
_fnMap(oSettings.oFeatures, oInit, "bServerSide"), _fnMap(oSettings.oFeatures, oInit, "bDeferRender"), 
_fnMap(oSettings.oScroll, oInit, "sScrollX", "sX"), _fnMap(oSettings.oScroll, oInit, "sScrollXInner", "sXInner"), 
_fnMap(oSettings.oScroll, oInit, "sScrollY", "sY"), _fnMap(oSettings.oScroll, oInit, "bScrollCollapse", "bCollapse"), 
_fnMap(oSettings.oScroll, oInit, "bScrollInfinite", "bInfinite"), _fnMap(oSettings.oScroll, oInit, "iScrollLoadGap", "iLoadGap"), 
_fnMap(oSettings.oScroll, oInit, "bScrollAutoCss", "bAutoCss"), _fnMap(oSettings, oInit, "asStripeClasses"), 
_fnMap(oSettings, oInit, "asStripClasses", "asStripeClasses"), _fnMap(oSettings, oInit, "fnServerData"), 
_fnMap(oSettings, oInit, "fnFormatNumber"), _fnMap(oSettings, oInit, "sServerMethod"), 
_fnMap(oSettings, oInit, "aaSorting"), _fnMap(oSettings, oInit, "aaSortingFixed"), 
_fnMap(oSettings, oInit, "aLengthMenu"), _fnMap(oSettings, oInit, "sPaginationType"), 
_fnMap(oSettings, oInit, "sAjaxSource"), _fnMap(oSettings, oInit, "sAjaxDataProp"), 
_fnMap(oSettings, oInit, "iCookieDuration"), _fnMap(oSettings, oInit, "sCookiePrefix"), 
_fnMap(oSettings, oInit, "sDom"), _fnMap(oSettings, oInit, "bSortCellsTop"), _fnMap(oSettings, oInit, "iTabIndex"), 
_fnMap(oSettings, oInit, "oSearch", "oPreviousSearch"), _fnMap(oSettings, oInit, "aoSearchCols", "aoPreSearchCols"), 
_fnMap(oSettings, oInit, "iDisplayLength", "_iDisplayLength"), _fnMap(oSettings, oInit, "bJQueryUI", "bJUI"), 
_fnMap(oSettings, oInit, "fnCookieCallback"), _fnMap(oSettings, oInit, "fnStateLoad"), 
_fnMap(oSettings, oInit, "fnStateSave"), _fnMap(oSettings.oLanguage, oInit, "fnInfoCallback"), 
_fnCallbackReg(oSettings, "aoDrawCallback", oInit.fnDrawCallback, "user"), _fnCallbackReg(oSettings, "aoServerParams", oInit.fnServerParams, "user"), 
_fnCallbackReg(oSettings, "aoStateSaveParams", oInit.fnStateSaveParams, "user"), 
_fnCallbackReg(oSettings, "aoStateLoadParams", oInit.fnStateLoadParams, "user"), 
_fnCallbackReg(oSettings, "aoStateLoaded", oInit.fnStateLoaded, "user"), _fnCallbackReg(oSettings, "aoRowCallback", oInit.fnRowCallback, "user"), 
_fnCallbackReg(oSettings, "aoRowCreatedCallback", oInit.fnCreatedRow, "user"), _fnCallbackReg(oSettings, "aoHeaderCallback", oInit.fnHeaderCallback, "user"), 
_fnCallbackReg(oSettings, "aoFooterCallback", oInit.fnFooterCallback, "user"), _fnCallbackReg(oSettings, "aoInitComplete", oInit.fnInitComplete, "user"), 
_fnCallbackReg(oSettings, "aoPreDrawCallback", oInit.fnPreDrawCallback, "user"), 
oSettings.oFeatures.bServerSide && oSettings.oFeatures.bSort && oSettings.oFeatures.bSortClasses ? _fnCallbackReg(oSettings, "aoDrawCallback", _fnSortingClasses, "server_side_sort_classes") :oSettings.oFeatures.bDeferRender && _fnCallbackReg(oSettings, "aoDrawCallback", _fnSortingClasses, "defer_sort_classes"), 
oInit.bJQueryUI ? ($.extend(oSettings.oClasses, DataTable.ext.oJUIClasses), oInit.sDom === DataTable.defaults.sDom && "lfrtip" === DataTable.defaults.sDom && (oSettings.sDom = '<"H"lfr>t<"F"ip>')) :$.extend(oSettings.oClasses, DataTable.ext.oStdClasses), 
$(this).addClass(oSettings.oClasses.sTable), ("" !== oSettings.oScroll.sX || "" !== oSettings.oScroll.sY) && (oSettings.oScroll.iBarWidth = _fnScrollBarWidth()), 
oSettings.iInitDisplayStart === undefined && (oSettings.iInitDisplayStart = oInit.iDisplayStart, 
oSettings._iDisplayStart = oInit.iDisplayStart), oInit.bStateSave && (oSettings.oFeatures.bStateSave = !0, 
_fnLoadState(oSettings, oInit), _fnCallbackReg(oSettings, "aoDrawCallback", _fnSaveState, "state_save")), 
null !== oInit.iDeferLoading) {
oSettings.bDeferLoading = !0;
var tmp = $.isArray(oInit.iDeferLoading);
oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] :oInit.iDeferLoading, 
oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] :oInit.iDeferLoading;
}
if (null !== oInit.aaData && (bUsePassedData = !0), "" !== oInit.oLanguage.sUrl ? (oSettings.oLanguage.sUrl = oInit.oLanguage.sUrl, 
$.getJSON(oSettings.oLanguage.sUrl, null, function(json) {
_fnLanguageCompat(json), $.extend(!0, oSettings.oLanguage, oInit.oLanguage, json), 
_fnInitialise(oSettings);
}), bInitHandedOff = !0) :$.extend(!0, oSettings.oLanguage, oInit.oLanguage), null === oInit.asStripeClasses && (oSettings.asStripeClasses = [ oSettings.oClasses.sStripeOdd, oSettings.oClasses.sStripeEven ]), 
iLen = oSettings.asStripeClasses.length, oSettings.asDestroyStripes = [], iLen) {
var bStripeRemove = !1, anRows = $(this).children("tbody").children("tr:lt(" + iLen + ")");
for (i = 0; iLen > i; i++) anRows.hasClass(oSettings.asStripeClasses[i]) && (bStripeRemove = !0, 
oSettings.asDestroyStripes.push(oSettings.asStripeClasses[i]));
bStripeRemove && anRows.removeClass(oSettings.asStripeClasses.join(" "));
}
var aoColumnsInit, anThs = [], nThead = this.getElementsByTagName("thead");
if (0 !== nThead.length && (_fnDetectHeader(oSettings.aoHeader, nThead[0]), anThs = _fnGetUniqueThs(oSettings)), 
null === oInit.aoColumns) for (aoColumnsInit = [], i = 0, iLen = anThs.length; iLen > i; i++) aoColumnsInit.push(null); else aoColumnsInit = oInit.aoColumns;
for (i = 0, iLen = aoColumnsInit.length; iLen > i; i++) oInit.saved_aoColumns !== undefined && oInit.saved_aoColumns.length == iLen && (null === aoColumnsInit[i] && (aoColumnsInit[i] = {}), 
aoColumnsInit[i].bVisible = oInit.saved_aoColumns[i].bVisible), _fnAddColumn(oSettings, anThs ? anThs[i] :null);
for (_fnApplyColumnDefs(oSettings, oInit.aoColumnDefs, aoColumnsInit, function(iCol, oDef) {
_fnColumnOptions(oSettings, iCol, oDef);
}), i = 0, iLen = oSettings.aaSorting.length; iLen > i; i++) {
oSettings.aaSorting[i][0] >= oSettings.aoColumns.length && (oSettings.aaSorting[i][0] = 0);
var oColumn = oSettings.aoColumns[oSettings.aaSorting[i][0]];
for (oSettings.aaSorting[i][2] === undefined && (oSettings.aaSorting[i][2] = 0), 
oInit.aaSorting === undefined && oSettings.saved_aaSorting === undefined && (oSettings.aaSorting[i][1] = oColumn.asSorting[0]), 
j = 0, jLen = oColumn.asSorting.length; jLen > j; j++) if (oSettings.aaSorting[i][1] == oColumn.asSorting[j]) {
oSettings.aaSorting[i][2] = j;
break;
}
}
_fnSortingClasses(oSettings), _fnBrowserDetect(oSettings);
var captions = $(this).children("caption").each(function() {
this._captionSide = $(this).css("caption-side");
}), thead = $(this).children("thead");
0 === thead.length && (thead = [ document.createElement("thead") ], this.appendChild(thead[0])), 
oSettings.nTHead = thead[0];
var tbody = $(this).children("tbody");
0 === tbody.length && (tbody = [ document.createElement("tbody") ], this.appendChild(tbody[0])), 
oSettings.nTBody = tbody[0], oSettings.nTBody.setAttribute("role", "alert"), oSettings.nTBody.setAttribute("aria-live", "polite"), 
oSettings.nTBody.setAttribute("aria-relevant", "all");
var tfoot = $(this).children("tfoot");
if (0 === tfoot.length && captions.length > 0 && ("" !== oSettings.oScroll.sX || "" !== oSettings.oScroll.sY) && (tfoot = [ document.createElement("tfoot") ], 
this.appendChild(tfoot[0])), tfoot.length > 0 && (oSettings.nTFoot = tfoot[0], _fnDetectHeader(oSettings.aoFooter, oSettings.nTFoot)), 
bUsePassedData) for (i = 0; i < oInit.aaData.length; i++) _fnAddData(oSettings, oInit.aaData[i]); else _fnGatherData(oSettings);
oSettings.aiDisplay = oSettings.aiDisplayMaster.slice(), oSettings.bInitialised = !0, 
bInitHandedOff === !1 && _fnInitialise(oSettings);
}), _that = null, this;
};
DataTable.fnVersionCheck = function(sVersion) {
for (var fnZPad = function(Zpad, count) {
for (;Zpad.length < count; ) Zpad += "0";
return Zpad;
}, aThis = DataTable.ext.sVersion.split("."), aThat = sVersion.split("."), sThis = "", sThat = "", i = 0, iLen = aThat.length; iLen > i; i++) sThis += fnZPad(aThis[i], 3), 
sThat += fnZPad(aThat[i], 3);
return parseInt(sThis, 10) >= parseInt(sThat, 10);
}, DataTable.fnIsDataTable = function(nTable) {
for (var o = DataTable.settings, i = 0; i < o.length; i++) if (o[i].nTable === nTable || o[i].nScrollHead === nTable || o[i].nScrollFoot === nTable) return !0;
return !1;
}, DataTable.fnTables = function(bVisible) {
var out = [];
return jQuery.each(DataTable.settings, function(i, o) {
(!bVisible || bVisible === !0 && $(o.nTable).is(":visible")) && out.push(o.nTable);
}), out;
}, DataTable.version = "1.9.4", DataTable.settings = [], DataTable.models = {}, 
DataTable.models.ext = {
afnFiltering:[],
afnSortData:[],
aoFeatures:[],
aTypes:[],
fnVersionCheck:DataTable.fnVersionCheck,
iApiIndex:0,
ofnSearch:{},
oApi:{},
oStdClasses:{},
oJUIClasses:{},
oPagination:{},
oSort:{},
sVersion:DataTable.version,
sErrMode:"alert",
_oExternConfig:{
iNextUnique:0
}
}, DataTable.models.oSearch = {
bCaseInsensitive:!0,
sSearch:"",
bRegex:!1,
bSmart:!0
}, DataTable.models.oRow = {
nTr:null,
_aData:[],
_aSortData:[],
_anHidden:[],
_sRowStripe:""
}, DataTable.models.oColumn = {
aDataSort:null,
asSorting:null,
bSearchable:null,
bSortable:null,
bUseRendered:null,
bVisible:null,
_bAutoType:!0,
fnCreatedCell:null,
fnGetData:null,
fnRender:null,
fnSetData:null,
mData:null,
mRender:null,
nTh:null,
nTf:null,
sClass:null,
sContentPadding:null,
sDefaultContent:null,
sName:null,
sSortDataType:"std",
sSortingClass:null,
sSortingClassJUI:null,
sTitle:null,
sType:null,
sWidth:null,
sWidthOrig:null
}, DataTable.defaults = {
aaData:null,
aaSorting:[ [ 0, "asc" ] ],
aaSortingFixed:null,
aLengthMenu:[ 10, 25, 50, 100 ],
aoColumns:null,
aoColumnDefs:null,
aoSearchCols:[],
asStripeClasses:null,
bAutoWidth:!0,
bDeferRender:!1,
bDestroy:!1,
bFilter:!0,
bInfo:!0,
bJQueryUI:!1,
bLengthChange:!0,
bPaginate:!0,
bProcessing:!1,
bRetrieve:!1,
bScrollAutoCss:!0,
bScrollCollapse:!1,
bScrollInfinite:!1,
bServerSide:!1,
bSort:!0,
bSortCellsTop:!1,
bSortClasses:!0,
bStateSave:!1,
fnCookieCallback:null,
fnCreatedRow:null,
fnDrawCallback:null,
fnFooterCallback:null,
fnFormatNumber:function(iIn) {
if (1e3 > iIn) return iIn;
for (var s = iIn + "", a = s.split(""), out = "", iLen = s.length, i = 0; iLen > i; i++) i % 3 === 0 && 0 !== i && (out = this.oLanguage.sInfoThousands + out), 
out = a[iLen - i - 1] + out;
return out;
},
fnHeaderCallback:null,
fnInfoCallback:null,
fnInitComplete:null,
fnPreDrawCallback:null,
fnRowCallback:null,
fnServerData:function(sUrl, aoData, fnCallback, oSettings) {
oSettings.jqXHR = $.ajax({
url:sUrl,
data:aoData,
success:function(json) {
json.sError && oSettings.oApi._fnLog(oSettings, 0, json.sError), $(oSettings.oInstance).trigger("xhr", [ oSettings, json ]), 
fnCallback(json);
},
dataType:"json",
cache:!1,
type:oSettings.sServerMethod,
error:function(xhr, error) {
"parsererror" == error && oSettings.oApi._fnLog(oSettings, 0, "DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.");
}
});
},
fnServerParams:null,
fnStateLoad:function(oSettings) {
var sData = this.oApi._fnReadCookie(oSettings.sCookiePrefix + oSettings.sInstance), oData;
try {
oData = "function" == typeof $.parseJSON ? $.parseJSON(sData) :eval("(" + sData + ")");
} catch (e) {
oData = null;
}
return oData;
},
fnStateLoadParams:null,
fnStateLoaded:null,
fnStateSave:function(oSettings, oData) {
this.oApi._fnCreateCookie(oSettings.sCookiePrefix + oSettings.sInstance, this.oApi._fnJsonString(oData), oSettings.iCookieDuration, oSettings.sCookiePrefix, oSettings.fnCookieCallback);
},
fnStateSaveParams:null,
iCookieDuration:7200,
iDeferLoading:null,
iDisplayLength:10,
iDisplayStart:0,
iScrollLoadGap:100,
iTabIndex:0,
oLanguage:{
oAria:{
sSortAscending:": activate to sort column ascending",
sSortDescending:": activate to sort column descending"
},
oPaginate:{
sFirst:"First",
sLast:"Last",
sNext:"Next",
sPrevious:"Previous"
},
sEmptyTable:"No data available in table",
sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",
sInfoEmpty:"Showing 0 to 0 of 0 entries",
sInfoFiltered:"(filtered from _MAX_ total entries)",
sInfoPostFix:"",
sInfoThousands:",",
sLengthMenu:"Show _MENU_ entries",
sLoadingRecords:"Loading...",
sProcessing:"Processing...",
sSearch:"Search:",
sUrl:"",
sZeroRecords:"No matching records found"
},
oSearch:$.extend({}, DataTable.models.oSearch),
sAjaxDataProp:"aaData",
sAjaxSource:null,
sCookiePrefix:"SpryMedia_DataTables_",
sDom:"lfrtip",
sPaginationType:"two_button",
sScrollX:"",
sScrollXInner:"",
sScrollY:"",
sServerMethod:"GET"
}, DataTable.defaults.columns = {
aDataSort:null,
asSorting:[ "asc", "desc" ],
bSearchable:!0,
bSortable:!0,
bUseRendered:!0,
bVisible:!0,
fnCreatedCell:null,
fnRender:null,
iDataSort:-1,
mData:null,
mRender:null,
sCellType:"td",
sClass:"",
sContentPadding:"",
sDefaultContent:null,
sName:"",
sSortDataType:"std",
sTitle:null,
sType:null,
sWidth:null
}, DataTable.models.oSettings = {
oFeatures:{
bAutoWidth:null,
bDeferRender:null,
bFilter:null,
bInfo:null,
bLengthChange:null,
bPaginate:null,
bProcessing:null,
bServerSide:null,
bSort:null,
bSortClasses:null,
bStateSave:null
},
oScroll:{
bAutoCss:null,
bCollapse:null,
bInfinite:null,
iBarWidth:0,
iLoadGap:null,
sX:null,
sXInner:null,
sY:null
},
oLanguage:{
fnInfoCallback:null
},
oBrowser:{
bScrollOversize:!1
},
aanFeatures:[],
aoData:[],
aiDisplay:[],
aiDisplayMaster:[],
aoColumns:[],
aoHeader:[],
aoFooter:[],
asDataSearch:[],
oPreviousSearch:{},
aoPreSearchCols:[],
aaSorting:null,
aaSortingFixed:null,
asStripeClasses:null,
asDestroyStripes:[],
sDestroyWidth:0,
aoRowCallback:[],
aoHeaderCallback:[],
aoFooterCallback:[],
aoDrawCallback:[],
aoRowCreatedCallback:[],
aoPreDrawCallback:[],
aoInitComplete:[],
aoStateSaveParams:[],
aoStateLoadParams:[],
aoStateLoaded:[],
sTableId:"",
nTable:null,
nTHead:null,
nTFoot:null,
nTBody:null,
nTableWrapper:null,
bDeferLoading:!1,
bInitialised:!1,
aoOpenRows:[],
sDom:null,
sPaginationType:"two_button",
iCookieDuration:0,
sCookiePrefix:"",
fnCookieCallback:null,
aoStateSave:[],
aoStateLoad:[],
oLoadedState:null,
sAjaxSource:null,
sAjaxDataProp:null,
bAjaxDataGet:!0,
jqXHR:null,
fnServerData:null,
aoServerParams:[],
sServerMethod:null,
fnFormatNumber:null,
aLengthMenu:null,
iDraw:0,
bDrawing:!1,
iDrawError:-1,
_iDisplayLength:10,
_iDisplayStart:0,
_iDisplayEnd:10,
_iRecordsTotal:0,
_iRecordsDisplay:0,
bJUI:null,
oClasses:{},
bFiltered:!1,
bSorted:!1,
bSortCellsTop:null,
oInit:null,
aoDestroyCallback:[],
fnRecordsTotal:function() {
return this.oFeatures.bServerSide ? parseInt(this._iRecordsTotal, 10) :this.aiDisplayMaster.length;
},
fnRecordsDisplay:function() {
return this.oFeatures.bServerSide ? parseInt(this._iRecordsDisplay, 10) :this.aiDisplay.length;
},
fnDisplayEnd:function() {
return this.oFeatures.bServerSide ? this.oFeatures.bPaginate === !1 || -1 == this._iDisplayLength ? this._iDisplayStart + this.aiDisplay.length :Math.min(this._iDisplayStart + this._iDisplayLength, this._iRecordsDisplay) :this._iDisplayEnd;
},
oInstance:null,
sInstance:null,
iTabIndex:0,
nScrollHead:null,
nScrollFoot:null
}, DataTable.ext = $.extend(!0, {}, DataTable.models.ext), $.extend(DataTable.ext.oStdClasses, {
sTable:"dataTable",
sPagePrevEnabled:"paginate_enabled_previous",
sPagePrevDisabled:"paginate_disabled_previous",
sPageNextEnabled:"paginate_enabled_next",
sPageNextDisabled:"paginate_disabled_next",
sPageJUINext:"",
sPageJUIPrev:"",
sPageButton:"paginate_button",
sPageButtonActive:"paginate_active",
sPageButtonStaticDisabled:"paginate_button paginate_button_disabled",
sPageFirst:"first",
sPagePrevious:"previous",
sPageNext:"next",
sPageLast:"last",
sStripeOdd:"odd",
sStripeEven:"even",
sRowEmpty:"dataTables_empty",
sWrapper:"dataTables_wrapper",
sFilter:"dataTables_filter",
sInfo:"dataTables_info",
sPaging:"dataTables_paginate paging_",
sLength:"dataTables_length",
sProcessing:"dataTables_processing",
sSortAsc:"sorting_asc",
sSortDesc:"sorting_desc",
sSortable:"sorting",
sSortableAsc:"sorting_asc_disabled",
sSortableDesc:"sorting_desc_disabled",
sSortableNone:"sorting_disabled",
sSortColumn:"sorting_",
sSortJUIAsc:"",
sSortJUIDesc:"",
sSortJUI:"",
sSortJUIAscAllowed:"",
sSortJUIDescAllowed:"",
sSortJUIWrapper:"",
sSortIcon:"",
sScrollWrapper:"dataTables_scroll",
sScrollHead:"dataTables_scrollHead",
sScrollHeadInner:"dataTables_scrollHeadInner",
sScrollBody:"dataTables_scrollBody",
sScrollFoot:"dataTables_scrollFoot",
sScrollFootInner:"dataTables_scrollFootInner",
sFooterTH:"",
sJUIHeader:"",
sJUIFooter:""
}), $.extend(DataTable.ext.oJUIClasses, DataTable.ext.oStdClasses, {
sPagePrevEnabled:"fg-button ui-button ui-state-default ui-corner-left",
sPagePrevDisabled:"fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
sPageNextEnabled:"fg-button ui-button ui-state-default ui-corner-right",
sPageNextDisabled:"fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
sPageJUINext:"ui-icon ui-icon-circle-arrow-e",
sPageJUIPrev:"ui-icon ui-icon-circle-arrow-w",
sPageButton:"fg-button ui-button ui-state-default",
sPageButtonActive:"fg-button ui-button ui-state-default ui-state-disabled",
sPageButtonStaticDisabled:"fg-button ui-button ui-state-default ui-state-disabled",
sPageFirst:"first ui-corner-tl ui-corner-bl",
sPageLast:"last ui-corner-tr ui-corner-br",
sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
sSortAsc:"ui-state-default",
sSortDesc:"ui-state-default",
sSortable:"ui-state-default",
sSortableAsc:"ui-state-default",
sSortableDesc:"ui-state-default",
sSortableNone:"ui-state-default",
sSortJUIAsc:"css_right ui-icon ui-icon-triangle-1-n",
sSortJUIDesc:"css_right ui-icon ui-icon-triangle-1-s",
sSortJUI:"css_right ui-icon ui-icon-carat-2-n-s",
sSortJUIAscAllowed:"css_right ui-icon ui-icon-carat-1-n",
sSortJUIDescAllowed:"css_right ui-icon ui-icon-carat-1-s",
sSortJUIWrapper:"DataTables_sort_wrapper",
sSortIcon:"DataTables_sort_icon",
sScrollHead:"dataTables_scrollHead ui-state-default",
sScrollFoot:"dataTables_scrollFoot ui-state-default",
sFooterTH:"ui-state-default",
sJUIHeader:"fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix",
sJUIFooter:"fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"
}), $.extend(DataTable.ext.oPagination, {
two_button:{
fnInit:function(oSettings, nPaging, fnCallbackDraw) {
var oLang = oSettings.oLanguage.oPaginate, fnClickHandler = (oSettings.oClasses, 
function(e) {
oSettings.oApi._fnPageChange(oSettings, e.data.action) && fnCallbackDraw(oSettings);
}), sAppend = oSettings.bJUI ? '<a class="' + oSettings.oClasses.sPagePrevDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button"><span class="' + oSettings.oClasses.sPageJUIPrev + '"></span></a><a class="' + oSettings.oClasses.sPageNextDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button"><span class="' + oSettings.oClasses.sPageJUINext + '"></span></a>' :'<a class="' + oSettings.oClasses.sPagePrevDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button">' + oLang.sPrevious + '</a><a class="' + oSettings.oClasses.sPageNextDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button">' + oLang.sNext + "</a>";
$(nPaging).append(sAppend);
var els = $("a", nPaging), nPrevious = els[0], nNext = els[1];
oSettings.oApi._fnBindAction(nPrevious, {
action:"previous"
}, fnClickHandler), oSettings.oApi._fnBindAction(nNext, {
action:"next"
}, fnClickHandler), oSettings.aanFeatures.p || (nPaging.id = oSettings.sTableId + "_paginate", 
nPrevious.id = oSettings.sTableId + "_previous", nNext.id = oSettings.sTableId + "_next", 
nPrevious.setAttribute("aria-controls", oSettings.sTableId), nNext.setAttribute("aria-controls", oSettings.sTableId));
},
fnUpdate:function(oSettings) {
if (oSettings.aanFeatures.p) for (var nNode, oClasses = oSettings.oClasses, an = oSettings.aanFeatures.p, i = 0, iLen = an.length; iLen > i; i++) nNode = an[i].firstChild, 
nNode && (nNode.className = 0 === oSettings._iDisplayStart ? oClasses.sPagePrevDisabled :oClasses.sPagePrevEnabled, 
nNode = nNode.nextSibling, nNode.className = oSettings.fnDisplayEnd() == oSettings.fnRecordsDisplay() ? oClasses.sPageNextDisabled :oClasses.sPageNextEnabled);
}
},
iFullNumbersShowPages:5,
full_numbers:{
fnInit:function(oSettings, nPaging, fnCallbackDraw) {
var oLang = oSettings.oLanguage.oPaginate, oClasses = oSettings.oClasses, fnClickHandler = function(e) {
oSettings.oApi._fnPageChange(oSettings, e.data.action) && fnCallbackDraw(oSettings);
};
$(nPaging).append('<a  tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPageFirst + '">' + oLang.sFirst + '</a><a  tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPagePrevious + '">' + oLang.sPrevious + '</a><span></span><a tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPageNext + '">' + oLang.sNext + '</a><a tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPageLast + '">' + oLang.sLast + "</a>");
var els = $("a", nPaging), nFirst = els[0], nPrev = els[1], nNext = els[2], nLast = els[3];
oSettings.oApi._fnBindAction(nFirst, {
action:"first"
}, fnClickHandler), oSettings.oApi._fnBindAction(nPrev, {
action:"previous"
}, fnClickHandler), oSettings.oApi._fnBindAction(nNext, {
action:"next"
}, fnClickHandler), oSettings.oApi._fnBindAction(nLast, {
action:"last"
}, fnClickHandler), oSettings.aanFeatures.p || (nPaging.id = oSettings.sTableId + "_paginate", 
nFirst.id = oSettings.sTableId + "_first", nPrev.id = oSettings.sTableId + "_previous", 
nNext.id = oSettings.sTableId + "_next", nLast.id = oSettings.sTableId + "_last");
},
fnUpdate:function(oSettings, fnCallbackDraw) {
if (oSettings.aanFeatures.p) {
var iStartButton, iEndButton, i, iLen, anButtons, anStatic, nNode, iPageCount = DataTable.ext.oPagination.iFullNumbersShowPages, iPageCountHalf = Math.floor(iPageCount / 2), iPages = Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength), iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1, sList = "", oClasses = oSettings.oClasses, an = oSettings.aanFeatures.p, fnBind = function(j) {
oSettings.oApi._fnBindAction(this, {
page:j + iStartButton - 1
}, function(e) {
oSettings.oApi._fnPageChange(oSettings, e.data.page), fnCallbackDraw(oSettings), 
e.preventDefault();
});
};
for (-1 === oSettings._iDisplayLength ? (iStartButton = 1, iEndButton = 1, iCurrentPage = 1) :iPageCount > iPages ? (iStartButton = 1, 
iEndButton = iPages) :iPageCountHalf >= iCurrentPage ? (iStartButton = 1, iEndButton = iPageCount) :iCurrentPage >= iPages - iPageCountHalf ? (iStartButton = iPages - iPageCount + 1, 
iEndButton = iPages) :(iStartButton = iCurrentPage - Math.ceil(iPageCount / 2) + 1, 
iEndButton = iStartButton + iPageCount - 1), i = iStartButton; iEndButton >= i; i++) sList += iCurrentPage !== i ? '<a tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + '">' + oSettings.fnFormatNumber(i) + "</a>" :'<a tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButtonActive + '">' + oSettings.fnFormatNumber(i) + "</a>";
for (i = 0, iLen = an.length; iLen > i; i++) nNode = an[i], nNode.hasChildNodes() && ($("span:eq(0)", nNode).html(sList).children("a").each(fnBind), 
anButtons = nNode.getElementsByTagName("a"), anStatic = [ anButtons[0], anButtons[1], anButtons[anButtons.length - 2], anButtons[anButtons.length - 1] ], 
$(anStatic).removeClass(oClasses.sPageButton + " " + oClasses.sPageButtonActive + " " + oClasses.sPageButtonStaticDisabled), 
$([ anStatic[0], anStatic[1] ]).addClass(1 == iCurrentPage ? oClasses.sPageButtonStaticDisabled :oClasses.sPageButton), 
$([ anStatic[2], anStatic[3] ]).addClass(0 === iPages || iCurrentPage === iPages || -1 === oSettings._iDisplayLength ? oClasses.sPageButtonStaticDisabled :oClasses.sPageButton));
}
}
}
}), $.extend(DataTable.ext.oSort, {
"string-pre":function(a) {
return "string" != typeof a && (a = null !== a && a.toString ? a.toString() :""), 
a.toLowerCase();
},
"string-asc":function(x, y) {
return y > x ? -1 :x > y ? 1 :0;
},
"string-desc":function(x, y) {
return y > x ? 1 :x > y ? -1 :0;
},
"html-pre":function(a) {
return a.replace(/<.*?>/g, "").toLowerCase();
},
"html-asc":function(x, y) {
return y > x ? -1 :x > y ? 1 :0;
},
"html-desc":function(x, y) {
return y > x ? 1 :x > y ? -1 :0;
},
"date-pre":function(a) {
var x = Date.parse(a);
return (isNaN(x) || "" === x) && (x = Date.parse("01/01/1970 00:00:00")), x;
},
"date-asc":function(x, y) {
return x - y;
},
"date-desc":function(x, y) {
return y - x;
},
"numeric-pre":function(a) {
return "-" == a || "" === a ? 0 :1 * a;
},
"numeric-asc":function(x, y) {
return x - y;
},
"numeric-desc":function(x, y) {
return y - x;
}
}), $.extend(DataTable.ext.aTypes, [ function(sData) {
if ("number" == typeof sData) return "numeric";
if ("string" != typeof sData) return null;
var Char, sValidFirstChars = "0123456789-", sValidChars = "0123456789.", bDecimal = !1;
if (Char = sData.charAt(0), -1 == sValidFirstChars.indexOf(Char)) return null;
for (var i = 1; i < sData.length; i++) {
if (Char = sData.charAt(i), -1 == sValidChars.indexOf(Char)) return null;
if ("." == Char) {
if (bDecimal) return null;
bDecimal = !0;
}
}
return "numeric";
}, function(sData) {
var iParse = Date.parse(sData);
return null !== iParse && !isNaN(iParse) || "string" == typeof sData && 0 === sData.length ? "date" :null;
}, function(sData) {
return "string" == typeof sData && -1 != sData.indexOf("<") && -1 != sData.indexOf(">") ? "html" :null;
} ]), $.fn.DataTable = DataTable, $.fn.dataTable = DataTable, $.fn.dataTableSettings = DataTable.settings, 
$.fn.dataTableExt = DataTable.ext;
});
}(window, document), $.extend(!0, $.fn.dataTable.defaults, {
sDom:"<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
sPaginationType:"bootstrap",
oLanguage:{
sLengthMenu:"_MENU_ records per page"
}
}), $.extend($.fn.dataTableExt.oStdClasses, {
sWrapper:"dataTables_wrapper form-inline"
}), $.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings) {
return {
iStart:oSettings._iDisplayStart,
iEnd:oSettings.fnDisplayEnd(),
iLength:oSettings._iDisplayLength,
iTotal:oSettings.fnRecordsTotal(),
iFilteredTotal:oSettings.fnRecordsDisplay(),
iPage:-1 === oSettings._iDisplayLength ? 0 :Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
iTotalPages:-1 === oSettings._iDisplayLength ? 0 :Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
};
}, $.extend($.fn.dataTableExt.oPagination, {
bootstrap:{
fnInit:function(oSettings, nPaging, fnDraw) {
var fnClickHandler = (oSettings.oLanguage.oPaginate, function(e) {
e.preventDefault(), oSettings.oApi._fnPageChange(oSettings, e.data.action) && fnDraw(oSettings);
});
$(nPaging).addClass("pagination").append('<ul><li class="prev disabled"><a href="#">&larr;</a></li><li class="next disabled"><a href="#">&rarr; </a></li></ul>');
var els = $("a", nPaging);
$(els[0]).bind("click.DT", {
action:"previous"
}, fnClickHandler), $(els[1]).bind("click.DT", {
action:"next"
}, fnClickHandler);
},
fnUpdate:function(oSettings, fnDraw) {
var i, ien, j, sClass, iStart, iEnd, iListLength = 5, oPaging = oSettings.oInstance.fnPagingInfo(), an = oSettings.aanFeatures.p, iHalf = Math.floor(iListLength / 2);
for (oPaging.iTotalPages < iListLength ? (iStart = 1, iEnd = oPaging.iTotalPages) :oPaging.iPage <= iHalf ? (iStart = 1, 
iEnd = iListLength) :oPaging.iPage >= oPaging.iTotalPages - iHalf ? (iStart = oPaging.iTotalPages - iListLength + 1, 
iEnd = oPaging.iTotalPages) :(iStart = oPaging.iPage - iHalf + 1, iEnd = iStart + iListLength - 1), 
i = 0, ien = an.length; ien > i; i++) {
for ($("li:gt(0)", an[i]).filter(":not(:last)").remove(), j = iStart; iEnd >= j; j++) sClass = j == oPaging.iPage + 1 ? 'class="active"' :"", 
$("<li " + sClass + '><a href="#">' + j + "</a></li>").insertBefore($("li:last", an[i])[0]).bind("click", function(e) {
e.preventDefault(), oSettings._iDisplayStart = (parseInt($("a", this).text(), 10) - 1) * oPaging.iLength, 
fnDraw(oSettings);
});
0 === oPaging.iPage ? $("li:first", an[i]).addClass("disabled") :$("li:first", an[i]).removeClass("disabled"), 
oPaging.iPage === oPaging.iTotalPages - 1 || 0 === oPaging.iTotalPages ? $("li:last", an[i]).addClass("disabled") :$("li:last", an[i]).removeClass("disabled");
}
}
}
}), $.fn.DataTable.TableTools && ($.extend(!0, $.fn.DataTable.TableTools.classes, {
container:"DTTT btn-group",
buttons:{
normal:"btn",
disabled:"disabled"
},
collection:{
container:"DTTT_dropdown dropdown-menu",
buttons:{
normal:"",
disabled:"disabled"
}
},
print:{
info:"DTTT_print_info modal"
},
select:{
row:"active"
}
}), $.extend(!0, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
collection:{
container:"ul",
button:"li",
liner:"a"
}
})), function(factory) {
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
}), /* ===========================================================
 * bootstrap-tooltip.js v2.0.0
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
!function($) {
"use strict";
var Tooltip = function(element, options) {
this.init("tooltip", element, options);
};
Tooltip.prototype = {
constructor:Tooltip,
init:function(type, element, options) {
var eventIn, eventOut;
this.type = type, this.$element = $(element), this.options = this.getOptions(options), 
this.enabled = !0, "manual" != this.options.trigger && (eventIn = "hover" == this.options.trigger ? "mouseenter" :"focus", 
eventOut = "hover" == this.options.trigger ? "mouseleave" :"blur", this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this)), 
this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))), this.options.selector ? this._options = $.extend({}, this.options, {
trigger:"manual",
selector:""
}) :this.fixTitle();
},
getOptions:function(options) {
return options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data()), 
options.delay && "number" == typeof options.delay && (options.delay = {
show:options.delay,
hide:options.delay
}), options;
},
enter:function(e) {
var self = $(e.currentTarget)[this.type](this._options).data(this.type);
self.options.delay && self.options.delay.show ? (self.hoverState = "in", setTimeout(function() {
"in" == self.hoverState && self.show();
}, self.options.delay.show)) :self.show();
},
leave:function(e) {
var self = $(e.currentTarget)[this.type](this._options).data(this.type);
self.options.delay && self.options.delay.hide ? (self.hoverState = "out", setTimeout(function() {
"out" == self.hoverState && self.hide();
}, self.options.delay.hide)) :self.hide();
},
show:function() {
var $tip, inside, pos, actualWidth, actualHeight, placement, tp;
if (this.hasContent() && this.enabled) {
switch ($tip = this.tip(), this.setContent(), this.options.animation && $tip.addClass("fade"), 
placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) :this.options.placement, 
inside = /in/.test(placement), $tip.remove().css({
top:0,
left:0,
display:"block"
}).appendTo(inside ? this.$element :document.body), pos = this.getPosition(inside), 
actualWidth = $tip[0].offsetWidth, actualHeight = $tip[0].offsetHeight, inside ? placement.split(" ")[1] :placement) {
case "bottom":
tp = {
top:pos.top + pos.height,
left:pos.left + pos.width / 2 - actualWidth / 2
};
break;

case "top":
tp = {
top:pos.top - actualHeight,
left:pos.left + pos.width / 2 - actualWidth / 2
};
break;

case "left":
tp = {
top:pos.top + pos.height / 2 - actualHeight / 2,
left:pos.left - actualWidth
};
break;

case "right":
tp = {
top:pos.top + pos.height / 2 - actualHeight / 2,
left:pos.left + pos.width
};
}
$tip.css(tp).addClass(placement).addClass("in");
}
},
setContent:function() {
var $tip = this.tip();
$tip.find(".tooltip-inner").html(this.getTitle()), $tip.removeClass("fade in top bottom left right");
},
hide:function() {
function removeWithAnimation() {
var timeout = setTimeout(function() {
$tip.off($.support.transition.end).remove();
}, 500);
$tip.one($.support.transition.end, function() {
clearTimeout(timeout), $tip.remove();
});
}
var $tip = this.tip();
$tip.removeClass("in"), $.support.transition && this.$tip.hasClass("fade") ? removeWithAnimation() :$tip.remove();
},
fixTitle:function() {
var $e = this.$element;
($e.attr("title") || "string" != typeof $e.attr("data-original-title")) && $e.attr("data-original-title", $e.attr("title") || "").removeAttr("title");
},
hasContent:function() {
return this.getTitle();
},
getPosition:function(inside) {
return $.extend({}, inside ? {
top:0,
left:0
} :this.$element.offset(), {
width:this.$element[0].offsetWidth,
height:this.$element[0].offsetHeight
});
},
getTitle:function() {
var title, $e = this.$element, o = this.options;
return title = $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) :o.title), 
title = title.toString().replace(/(^\s*|\s*$)/, "");
},
tip:function() {
return this.$tip = this.$tip || $(this.options.template);
},
validate:function() {
this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
},
enable:function() {
this.enabled = !0;
},
disable:function() {
this.enabled = !1;
},
toggleEnabled:function() {
this.enabled = !this.enabled;
},
toggle:function() {
this[this.tip().hasClass("in") ? "hide" :"show"]();
}
}, $.fn.tooltip = function(option) {
return this.each(function() {
var $this = $(this), data = $this.data("tooltip"), options = "object" == typeof option && option;
data || $this.data("tooltip", data = new Tooltip(this, options)), "string" == typeof option && data[option]();
});
}, $.fn.tooltip.Constructor = Tooltip, $.fn.tooltip.defaults = {
animation:!0,
delay:0,
selector:!1,
placement:"top",
trigger:"hover",
title:"",
template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
};
}(window.jQuery), function($, undefined) {
function UTCDate() {
return new Date(Date.UTC.apply(Date, arguments));
}
function UTCToday() {
var today = new Date();
return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
}
function alias(method) {
return function() {
return this[method].apply(this, arguments);
};
}
function opts_from_el(el, prefix) {
function re_lower(_, a) {
return a.toLowerCase();
}
var inkey, data = $(el).data(), out = {}, replace = new RegExp("^" + prefix.toLowerCase() + "([A-Z])");
prefix = new RegExp("^" + prefix.toLowerCase());
for (var key in data) prefix.test(key) && (inkey = key.replace(replace, re_lower), 
out[inkey] = data[key]);
return out;
}
function opts_from_locale(lang) {
var out = {};
if (dates[lang] || (lang = lang.split("-")[0], dates[lang])) {
var d = dates[lang];
return $.each(locale_opts, function(i, k) {
k in d && (out[k] = d[k]);
}), out;
}
}
var $window = $(window), DateArray = function() {
var extras = {
get:function(i) {
return this.slice(i)[0];
},
contains:function(d) {
for (var val = d && d.valueOf(), i = 0, l = this.length; l > i; i++) if (this[i].valueOf() === val) return i;
return -1;
},
remove:function(i) {
this.splice(i, 1);
},
replace:function(new_array) {
new_array && ($.isArray(new_array) || (new_array = [ new_array ]), this.clear(), 
this.push.apply(this, new_array));
},
clear:function() {
this.length = 0;
},
copy:function() {
var a = new DateArray();
return a.replace(this), a;
}
};
return function() {
var a = [];
return a.push.apply(a, arguments), $.extend(a, extras), a;
};
}(), Datepicker = function(element, options) {
this.dates = new DateArray(), this.viewDate = UTCToday(), this.focusDate = null, 
this._process_options(options), this.element = $(element), this.isInline = !1, this.isInput = this.element.is("input"), 
this.component = this.element.is(".date") ? this.element.find(".add-on, .input-group-addon, .btn") :!1, 
this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), 
this.picker = $(DPGlobal.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) :this.picker.addClass("datepicker-dropdown dropdown-menu"), 
this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, 
this.o.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function(i, val) {
return parseInt(val) + 1;
}), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), 
this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.fillDow(), this.fillMonths(), 
this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show();
};
Datepicker.prototype = {
constructor:Datepicker,
_process_options:function(opts) {
this._o = $.extend({}, this._o, opts);
var o = this.o = $.extend({}, this._o), lang = o.language;
switch (dates[lang] || (lang = lang.split("-")[0], dates[lang] || (lang = defaults.language)), 
o.language = lang, o.startView) {
case 2:
case "decade":
o.startView = 2;
break;

case 1:
case "year":
o.startView = 1;
break;

default:
o.startView = 0;
}
switch (o.minViewMode) {
case 1:
case "months":
o.minViewMode = 1;
break;

case 2:
case "years":
o.minViewMode = 2;
break;

default:
o.minViewMode = 0;
}
o.startView = Math.max(o.startView, o.minViewMode), o.multidate !== !0 && (o.multidate = Number(o.multidate) || !1, 
o.multidate = o.multidate !== !1 ? Math.max(0, o.multidate) :1), o.multidateSeparator = String(o.multidateSeparator), 
o.weekStart %= 7, o.weekEnd = (o.weekStart + 6) % 7;
var format = DPGlobal.parseFormat(o.format);
o.startDate !== -1/0 && (o.startDate = o.startDate ? o.startDate instanceof Date ? this._local_to_utc(this._zero_time(o.startDate)) :DPGlobal.parseDate(o.startDate, format, o.language) :-1/0), 
1/0 !== o.endDate && (o.endDate = o.endDate ? o.endDate instanceof Date ? this._local_to_utc(this._zero_time(o.endDate)) :DPGlobal.parseDate(o.endDate, format, o.language) :1/0), 
o.daysOfWeekDisabled = o.daysOfWeekDisabled || [], $.isArray(o.daysOfWeekDisabled) || (o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/)), 
o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d) {
return parseInt(d, 10);
});
var plc = String(o.orientation).toLowerCase().split(/\s+/g), _plc = o.orientation.toLowerCase();
if (plc = $.grep(plc, function(word) {
return /^auto|left|right|top|bottom$/.test(word);
}), o.orientation = {
x:"auto",
y:"auto"
}, _plc && "auto" !== _plc) if (1 === plc.length) switch (plc[0]) {
case "top":
case "bottom":
o.orientation.y = plc[0];
break;

case "left":
case "right":
o.orientation.x = plc[0];
} else _plc = $.grep(plc, function(word) {
return /^left|right$/.test(word);
}), o.orientation.x = _plc[0] || "auto", _plc = $.grep(plc, function(word) {
return /^top|bottom$/.test(word);
}), o.orientation.y = _plc[0] || "auto"; else ;
},
_events:[],
_secondaryEvents:[],
_applyEvents:function(evs) {
for (var el, ch, ev, i = 0; i < evs.length; i++) el = evs[i][0], 2 === evs[i].length ? (ch = undefined, 
ev = evs[i][1]) :3 === evs[i].length && (ch = evs[i][1], ev = evs[i][2]), el.on(ev, ch);
},
_unapplyEvents:function(evs) {
for (var el, ev, ch, i = 0; i < evs.length; i++) el = evs[i][0], 2 === evs[i].length ? (ch = undefined, 
ev = evs[i][1]) :3 === evs[i].length && (ch = evs[i][1], ev = evs[i][2]), el.off(ev, ch);
},
_buildEvents:function() {
this.isInput ? this._events = [ [ this.element, {
focus:$.proxy(this.show, this),
keyup:$.proxy(function(e) {
-1 === $.inArray(e.keyCode, [ 27, 37, 39, 38, 40, 32, 13, 9 ]) && this.update();
}, this),
keydown:$.proxy(this.keydown, this)
} ] ] :this.component && this.hasInput ? this._events = [ [ this.element.find("input"), {
focus:$.proxy(this.show, this),
keyup:$.proxy(function(e) {
-1 === $.inArray(e.keyCode, [ 27, 37, 39, 38, 40, 32, 13, 9 ]) && this.update();
}, this),
keydown:$.proxy(this.keydown, this)
} ], [ this.component, {
click:$.proxy(this.show, this)
} ] ] :this.element.is("div") ? this.isInline = !0 :this._events = [ [ this.element, {
click:$.proxy(this.show, this)
} ] ], this._events.push([ this.element, "*", {
blur:$.proxy(function(e) {
this._focused_from = e.target;
}, this)
} ], [ this.element, {
blur:$.proxy(function(e) {
this._focused_from = e.target;
}, this)
} ]), this._secondaryEvents = [ [ this.picker, {
click:$.proxy(this.click, this)
} ], [ $(window), {
resize:$.proxy(this.place, this)
} ], [ $(document), {
"mousedown touchstart":$.proxy(function(e) {
this.element.is(e.target) || this.element.find(e.target).length || this.picker.is(e.target) || this.picker.find(e.target).length || this.hide();
}, this)
} ] ];
},
_attachEvents:function() {
this._detachEvents(), this._applyEvents(this._events);
},
_detachEvents:function() {
this._unapplyEvents(this._events);
},
_attachSecondaryEvents:function() {
this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents);
},
_detachSecondaryEvents:function() {
this._unapplyEvents(this._secondaryEvents);
},
_trigger:function(event, altdate) {
var date = altdate || this.dates.get(-1), local_date = this._utc_to_local(date);
this.element.trigger({
type:event,
date:local_date,
dates:$.map(this.dates, this._utc_to_local),
format:$.proxy(function(ix, format) {
0 === arguments.length ? (ix = this.dates.length - 1, format = this.o.format) :"string" == typeof ix && (format = ix, 
ix = this.dates.length - 1), format = format || this.o.format;
var date = this.dates.get(ix);
return DPGlobal.formatDate(date, format, this.o.language);
}, this)
});
},
show:function() {
this.isInline || this.picker.appendTo("body"), this.picker.show(), this.place(), 
this._attachSecondaryEvents(), this._trigger("show");
},
hide:function() {
this.isInline || this.picker.is(":visible") && (this.focusDate = null, this.picker.hide().detach(), 
this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), 
this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), 
this._trigger("hide"));
},
remove:function() {
this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), 
delete this.element.data().datepicker, this.isInput || delete this.element.data().date;
},
_utc_to_local:function(utc) {
return utc && new Date(utc.getTime() + 6e4 * utc.getTimezoneOffset());
},
_local_to_utc:function(local) {
return local && new Date(local.getTime() - 6e4 * local.getTimezoneOffset());
},
_zero_time:function(local) {
return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
},
_zero_utc_time:function(utc) {
return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
},
getDates:function() {
return $.map(this.dates, this._utc_to_local);
},
getUTCDates:function() {
return $.map(this.dates, function(d) {
return new Date(d);
});
},
getDate:function() {
return this._utc_to_local(this.getUTCDate());
},
getUTCDate:function() {
return new Date(this.dates.get(-1));
},
setDates:function() {
var args = $.isArray(arguments[0]) ? arguments[0] :arguments;
this.update.apply(this, args), this._trigger("changeDate"), this.setValue();
},
setUTCDates:function() {
var args = $.isArray(arguments[0]) ? arguments[0] :arguments;
this.update.apply(this, $.map(args, this._utc_to_local)), this._trigger("changeDate"), 
this.setValue();
},
setDate:alias("setDates"),
setUTCDate:alias("setUTCDates"),
setValue:function() {
var formatted = this.getFormattedDate();
this.isInput ? this.element.val(formatted).change() :this.component && this.element.find("input").val(formatted).change();
},
getFormattedDate:function(format) {
format === undefined && (format = this.o.format);
var lang = this.o.language;
return $.map(this.dates, function(d) {
return DPGlobal.formatDate(d, format, lang);
}).join(this.o.multidateSeparator);
},
setStartDate:function(startDate) {
this._process_options({
startDate:startDate
}), this.update(), this.updateNavArrows();
},
setEndDate:function(endDate) {
this._process_options({
endDate:endDate
}), this.update(), this.updateNavArrows();
},
setDaysOfWeekDisabled:function(daysOfWeekDisabled) {
this._process_options({
daysOfWeekDisabled:daysOfWeekDisabled
}), this.update(), this.updateNavArrows();
},
place:function() {
if (!this.isInline) {
var calendarWidth = this.picker.outerWidth(), calendarHeight = this.picker.outerHeight(), visualPadding = 10, windowWidth = $window.width(), windowHeight = $window.height(), scrollTop = $window.scrollTop(), zIndex = parseInt(this.element.parents().filter(function() {
return "auto" !== $(this).css("z-index");
}).first().css("z-index")) + 10, offset = this.component ? this.component.parent().offset() :this.element.offset(), height = this.component ? this.component.outerHeight(!0) :this.element.outerHeight(!1), width = this.component ? this.component.outerWidth(!0) :this.element.outerWidth(!1), left = offset.left, top = offset.top;
this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), 
"auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), 
"right" === this.o.orientation.x && (left -= calendarWidth - width)) :(this.picker.addClass("datepicker-orient-left"), 
offset.left < 0 ? left -= offset.left - visualPadding :offset.left + calendarWidth > windowWidth && (left = windowWidth - calendarWidth - visualPadding));
var top_overflow, bottom_overflow, yorient = this.o.orientation.y;
"auto" === yorient && (top_overflow = -scrollTop + offset.top - calendarHeight, 
bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight), 
yorient = Math.max(top_overflow, bottom_overflow) === bottom_overflow ? "top" :"bottom"), 
this.picker.addClass("datepicker-orient-" + yorient), "top" === yorient ? top += height :top -= calendarHeight + parseInt(this.picker.css("padding-top")), 
this.picker.css({
top:top,
left:left,
zIndex:zIndex
});
}
},
_allow_update:!0,
update:function() {
if (this._allow_update) {
var oldDates = this.dates.copy(), dates = [], fromArgs = !1;
arguments.length ? ($.each(arguments, $.proxy(function(i, date) {
date instanceof Date && (date = this._local_to_utc(date)), dates.push(date);
}, this)), fromArgs = !0) :(dates = this.isInput ? this.element.val() :this.element.data("date") || this.element.find("input").val(), 
dates = dates && this.o.multidate ? dates.split(this.o.multidateSeparator) :[ dates ], 
delete this.element.data().date), dates = $.map(dates, $.proxy(function(date) {
return DPGlobal.parseDate(date, this.o.format, this.o.language);
}, this)), dates = $.grep(dates, $.proxy(function(date) {
return date < this.o.startDate || date > this.o.endDate || !date;
}, this), !0), this.dates.replace(dates), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) :this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) :this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), 
fromArgs ? this.setValue() :dates.length && String(oldDates) !== String(this.dates) && this._trigger("changeDate"), 
!this.dates.length && oldDates.length && this._trigger("clearDate"), this.fill();
}
},
fillDow:function() {
var dowCnt = this.o.weekStart, html = "<tr>";
if (this.o.calendarWeeks) {
var cell = '<th class="cw">&nbsp;</th>';
html += cell, this.picker.find(".datepicker-days thead tr:first-child").prepend(cell);
}
for (;dowCnt < this.o.weekStart + 7; ) html += '<th class="dow">' + dates[this.o.language].daysMin[dowCnt++ % 7] + "</th>";
html += "</tr>", this.picker.find(".datepicker-days thead").append(html);
},
fillMonths:function() {
for (var html = "", i = 0; 12 > i; ) html += '<span class="month">' + dates[this.o.language].monthsShort[i++] + "</span>";
this.picker.find(".datepicker-months td").html(html);
},
setRange:function(range) {
range && range.length ? this.range = $.map(range, function(d) {
return d.valueOf();
}) :delete this.range, this.fill();
},
getClassNames:function(date) {
var cls = [], year = this.viewDate.getUTCFullYear(), month = this.viewDate.getUTCMonth(), today = new Date();
return date.getUTCFullYear() < year || date.getUTCFullYear() === year && date.getUTCMonth() < month ? cls.push("old") :(date.getUTCFullYear() > year || date.getUTCFullYear() === year && date.getUTCMonth() > month) && cls.push("new"), 
this.focusDate && date.valueOf() === this.focusDate.valueOf() && cls.push("focused"), 
this.o.todayHighlight && date.getUTCFullYear() === today.getFullYear() && date.getUTCMonth() === today.getMonth() && date.getUTCDate() === today.getDate() && cls.push("today"), 
-1 !== this.dates.contains(date) && cls.push("active"), (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate || -1 !== $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled)) && cls.push("disabled"), 
this.range && (date > this.range[0] && date < this.range[this.range.length - 1] && cls.push("range"), 
-1 !== $.inArray(date.valueOf(), this.range) && cls.push("selected")), cls;
},
fill:function() {
var tooltip, d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth(), startYear = this.o.startDate !== -1/0 ? this.o.startDate.getUTCFullYear() :-1/0, startMonth = this.o.startDate !== -1/0 ? this.o.startDate.getUTCMonth() :-1/0, endYear = 1/0 !== this.o.endDate ? this.o.endDate.getUTCFullYear() :1/0, endMonth = 1/0 !== this.o.endDate ? this.o.endDate.getUTCMonth() :1/0, todaytxt = dates[this.o.language].today || dates.en.today || "", cleartxt = dates[this.o.language].clear || dates.en.clear || "";
this.picker.find(".datepicker-days thead th.datepicker-switch").text(dates[this.o.language].months[month] + " " + year), 
this.picker.find("tfoot th.today").text(todaytxt).toggle(this.o.todayBtn !== !1), 
this.picker.find("tfoot th.clear").text(cleartxt).toggle(this.o.clearBtn !== !1), 
this.updateNavArrows(), this.fillMonths();
var prevMonth = UTCDate(year, month - 1, 28), day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
prevMonth.setUTCDate(day), prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7) % 7);
var nextMonth = new Date(prevMonth);
nextMonth.setUTCDate(nextMonth.getUTCDate() + 42), nextMonth = nextMonth.valueOf();
for (var clsName, html = []; prevMonth.valueOf() < nextMonth; ) {
if (prevMonth.getUTCDay() === this.o.weekStart && (html.push("<tr>"), this.o.calendarWeeks)) {
var ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5), th = new Date(Number(ws) + (11 - ws.getUTCDay()) % 7 * 864e5), yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (11 - yth.getUTCDay()) % 7 * 864e5), calWeek = (th - yth) / 864e5 / 7 + 1;
html.push('<td class="cw">' + calWeek + "</td>");
}
if (clsName = this.getClassNames(prevMonth), clsName.push("day"), this.o.beforeShowDay !== $.noop) {
var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
before === undefined ? before = {} :"boolean" == typeof before ? before = {
enabled:before
} :"string" == typeof before && (before = {
classes:before
}), before.enabled === !1 && clsName.push("disabled"), before.classes && (clsName = clsName.concat(before.classes.split(/\s+/))), 
before.tooltip && (tooltip = before.tooltip);
}
clsName = $.unique(clsName), html.push('<td class="' + clsName.join(" ") + '"' + (tooltip ? ' title="' + tooltip + '"' :"") + ">" + prevMonth.getUTCDate() + "</td>"), 
prevMonth.getUTCDay() === this.o.weekEnd && html.push("</tr>"), prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
}
this.picker.find(".datepicker-days tbody").empty().append(html.join(""));
var months = this.picker.find(".datepicker-months").find("th:eq(1)").text(year).end().find("span").removeClass("active");
$.each(this.dates, function(i, d) {
d.getUTCFullYear() === year && months.eq(d.getUTCMonth()).addClass("active");
}), (startYear > year || year > endYear) && months.addClass("disabled"), year === startYear && months.slice(0, startMonth).addClass("disabled"), 
year === endYear && months.slice(endMonth + 1).addClass("disabled"), html = "", 
year = 10 * parseInt(year / 10, 10);
var yearCont = this.picker.find(".datepicker-years").find("th:eq(1)").text(year + "-" + (year + 9)).end().find("td");
year -= 1;
for (var classes, years = $.map(this.dates, function(d) {
return d.getUTCFullYear();
}), i = -1; 11 > i; i++) classes = [ "year" ], -1 === i ? classes.push("old") :10 === i && classes.push("new"), 
-1 !== $.inArray(year, years) && classes.push("active"), (startYear > year || year > endYear) && classes.push("disabled"), 
html += '<span class="' + classes.join(" ") + '">' + year + "</span>", year += 1;
yearCont.html(html);
},
updateNavArrows:function() {
if (this._allow_update) {
var d = new Date(this.viewDate), year = d.getUTCFullYear(), month = d.getUTCMonth();
switch (this.viewMode) {
case 0:
this.o.startDate !== -1/0 && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
visibility:"hidden"
}) :this.picker.find(".prev").css({
visibility:"visible"
}), 1/0 !== this.o.endDate && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
visibility:"hidden"
}) :this.picker.find(".next").css({
visibility:"visible"
});
break;

case 1:
case 2:
this.o.startDate !== -1/0 && year <= this.o.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
visibility:"hidden"
}) :this.picker.find(".prev").css({
visibility:"visible"
}), 1/0 !== this.o.endDate && year >= this.o.endDate.getUTCFullYear() ? this.picker.find(".next").css({
visibility:"hidden"
}) :this.picker.find(".next").css({
visibility:"visible"
});
}
}
},
click:function(e) {
e.preventDefault();
var year, month, day, target = $(e.target).closest("span, td, th");
if (1 === target.length) switch (target[0].nodeName.toLowerCase()) {
case "th":
switch (target[0].className) {
case "datepicker-switch":
this.showMode(1);
break;

case "prev":
case "next":
var dir = DPGlobal.modes[this.viewMode].navStep * ("prev" === target[0].className ? -1 :1);
switch (this.viewMode) {
case 0:
this.viewDate = this.moveMonth(this.viewDate, dir), this._trigger("changeMonth", this.viewDate);
break;

case 1:
case 2:
this.viewDate = this.moveYear(this.viewDate, dir), 1 === this.viewMode && this._trigger("changeYear", this.viewDate);
}
this.fill();
break;

case "today":
var date = new Date();
date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0), this.showMode(-2);
var which = "linked" === this.o.todayBtn ? null :"view";
this._setDate(date, which);
break;

case "clear":
var element;
this.isInput ? element = this.element :this.component && (element = this.element.find("input")), 
element && element.val("").change(), this.update(), this._trigger("changeDate"), 
this.o.autoclose && this.hide();
}
break;

case "span":
target.is(".disabled") || (this.viewDate.setUTCDate(1), target.is(".month") ? (day = 1, 
month = target.parent().find("span").index(target), year = this.viewDate.getUTCFullYear(), 
this.viewDate.setUTCMonth(month), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(UTCDate(year, month, day))) :(day = 1, 
month = 0, year = parseInt(target.text(), 10) || 0, this.viewDate.setUTCFullYear(year), 
this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(UTCDate(year, month, day))), 
this.showMode(-1), this.fill());
break;

case "td":
target.is(".day") && !target.is(".disabled") && (day = parseInt(target.text(), 10) || 1, 
year = this.viewDate.getUTCFullYear(), month = this.viewDate.getUTCMonth(), target.is(".old") ? 0 === month ? (month = 11, 
year -= 1) :month -= 1 :target.is(".new") && (11 === month ? (month = 0, year += 1) :month += 1), 
this._setDate(UTCDate(year, month, day)));
}
this.picker.is(":visible") && this._focused_from && $(this._focused_from).focus(), 
delete this._focused_from;
},
_toggle_multidate:function(date) {
var ix = this.dates.contains(date);
if (date ? -1 !== ix ? this.dates.remove(ix) :this.dates.push(date) :this.dates.clear(), 
"number" == typeof this.o.multidate) for (;this.dates.length > this.o.multidate; ) this.dates.remove(0);
},
_setDate:function(date, which) {
which && "date" !== which || this._toggle_multidate(date && new Date(date)), which && "view" !== which || (this.viewDate = date && new Date(date)), 
this.fill(), this.setValue(), this._trigger("changeDate");
var element;
this.isInput ? element = this.element :this.component && (element = this.element.find("input")), 
element && element.change(), !this.o.autoclose || which && "date" !== which || this.hide();
},
moveMonth:function(date, dir) {
if (!date) return undefined;
if (!dir) return date;
var new_month, test, new_date = new Date(date.valueOf()), day = new_date.getUTCDate(), month = new_date.getUTCMonth(), mag = Math.abs(dir);
if (dir = dir > 0 ? 1 :-1, 1 === mag) test = -1 === dir ? function() {
return new_date.getUTCMonth() === month;
} :function() {
return new_date.getUTCMonth() !== new_month;
}, new_month = month + dir, new_date.setUTCMonth(new_month), (0 > new_month || new_month > 11) && (new_month = (new_month + 12) % 12); else {
for (var i = 0; mag > i; i++) new_date = this.moveMonth(new_date, dir);
new_month = new_date.getUTCMonth(), new_date.setUTCDate(day), test = function() {
return new_month !== new_date.getUTCMonth();
};
}
for (;test(); ) new_date.setUTCDate(--day), new_date.setUTCMonth(new_month);
return new_date;
},
moveYear:function(date, dir) {
return this.moveMonth(date, 12 * dir);
},
dateWithinRange:function(date) {
return date >= this.o.startDate && date <= this.o.endDate;
},
keydown:function(e) {
if (this.picker.is(":not(:visible)")) return 27 === e.keyCode && this.show(), void 0;
var dir, newDate, newViewDate, dateChanged = !1, focusDate = this.focusDate || this.viewDate;
switch (e.keyCode) {
case 27:
this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
this.fill()) :this.hide(), e.preventDefault();
break;

case 37:
case 39:
if (!this.o.keyboardNavigation) break;
dir = 37 === e.keyCode ? -1 :1, e.ctrlKey ? (newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir), 
newViewDate = this.moveYear(focusDate, dir), this._trigger("changeYear", this.viewDate)) :e.shiftKey ? (newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir), 
newViewDate = this.moveMonth(focusDate, dir), this._trigger("changeMonth", this.viewDate)) :(newDate = new Date(this.dates.get(-1) || UTCToday()), 
newDate.setUTCDate(newDate.getUTCDate() + dir), newViewDate = new Date(focusDate), 
newViewDate.setUTCDate(focusDate.getUTCDate() + dir)), this.dateWithinRange(newDate) && (this.focusDate = this.viewDate = newViewDate, 
this.setValue(), this.fill(), e.preventDefault());
break;

case 38:
case 40:
if (!this.o.keyboardNavigation) break;
dir = 38 === e.keyCode ? -1 :1, e.ctrlKey ? (newDate = this.moveYear(this.dates.get(-1) || UTCToday(), dir), 
newViewDate = this.moveYear(focusDate, dir), this._trigger("changeYear", this.viewDate)) :e.shiftKey ? (newDate = this.moveMonth(this.dates.get(-1) || UTCToday(), dir), 
newViewDate = this.moveMonth(focusDate, dir), this._trigger("changeMonth", this.viewDate)) :(newDate = new Date(this.dates.get(-1) || UTCToday()), 
newDate.setUTCDate(newDate.getUTCDate() + 7 * dir), newViewDate = new Date(focusDate), 
newViewDate.setUTCDate(focusDate.getUTCDate() + 7 * dir)), this.dateWithinRange(newDate) && (this.focusDate = this.viewDate = newViewDate, 
this.setValue(), this.fill(), e.preventDefault());
break;

case 32:
break;

case 13:
focusDate = this.focusDate || this.dates.get(-1) || this.viewDate, this._toggle_multidate(focusDate), 
dateChanged = !0, this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, 
this.setValue(), this.fill(), this.picker.is(":visible") && (e.preventDefault(), 
this.o.autoclose && this.hide());
break;

case 9:
this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), 
this.hide();
}
if (dateChanged) {
this.dates.length ? this._trigger("changeDate") :this._trigger("clearDate");
var element;
this.isInput ? element = this.element :this.component && (element = this.element.find("input")), 
element && element.change();
}
},
showMode:function(dir) {
dir && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir))), 
this.picker.find(">div").hide().filter(".datepicker-" + DPGlobal.modes[this.viewMode].clsName).css("display", "block"), 
this.updateNavArrows();
}
};
var DateRangePicker = function(element, options) {
this.element = $(element), this.inputs = $.map(options.inputs, function(i) {
return i.jquery ? i[0] :i;
}), delete options.inputs, $(this.inputs).datepicker(options).bind("changeDate", $.proxy(this.dateUpdated, this)), 
this.pickers = $.map(this.inputs, function(i) {
return $(i).data("datepicker");
}), this.updateDates();
};
DateRangePicker.prototype = {
updateDates:function() {
this.dates = $.map(this.pickers, function(i) {
return i.getUTCDate();
}), this.updateRanges();
},
updateRanges:function() {
var range = $.map(this.dates, function(d) {
return d.valueOf();
});
$.each(this.pickers, function(i, p) {
p.setRange(range);
});
},
dateUpdated:function(e) {
if (!this.updating) {
this.updating = !0;
var dp = $(e.target).data("datepicker"), new_date = dp.getUTCDate(), i = $.inArray(e.target, this.inputs), l = this.inputs.length;
if (-1 !== i) {
if ($.each(this.pickers, function(i, p) {
p.getUTCDate() || p.setUTCDate(new_date);
}), new_date < this.dates[i]) for (;i >= 0 && new_date < this.dates[i]; ) this.pickers[i--].setUTCDate(new_date); else if (new_date > this.dates[i]) for (;l > i && new_date > this.dates[i]; ) this.pickers[i++].setUTCDate(new_date);
this.updateDates(), delete this.updating;
}
}
},
remove:function() {
$.map(this.pickers, function(p) {
p.remove();
}), delete this.element.data().datepicker;
}
};
var old = $.fn.datepicker;
$.fn.datepicker = function(option) {
var args = Array.apply(null, arguments);
args.shift();
var internal_return;
return this.each(function() {
var $this = $(this), data = $this.data("datepicker"), options = "object" == typeof option && option;
if (!data) {
var elopts = opts_from_el(this, "date"), xopts = $.extend({}, defaults, elopts, options), locopts = opts_from_locale(xopts.language), opts = $.extend({}, defaults, locopts, elopts, options);
if ($this.is(".input-daterange") || opts.inputs) {
var ropts = {
inputs:opts.inputs || $this.find("input").toArray()
};
$this.data("datepicker", data = new DateRangePicker(this, $.extend(opts, ropts)));
} else $this.data("datepicker", data = new Datepicker(this, opts));
}
return "string" == typeof option && "function" == typeof data[option] && (internal_return = data[option].apply(data, args), 
internal_return !== undefined) ? !1 :void 0;
}), internal_return !== undefined ? internal_return :this;
};
var defaults = $.fn.datepicker.defaults = {
autoclose:!1,
beforeShowDay:$.noop,
calendarWeeks:!1,
clearBtn:!1,
daysOfWeekDisabled:[],
endDate:1/0,
forceParse:!0,
format:"mm/dd/yyyy",
keyboardNavigation:!0,
language:"en",
minViewMode:0,
multidate:!1,
multidateSeparator:",",
orientation:"auto",
rtl:!1,
startDate:-1/0,
startView:0,
todayBtn:!1,
todayHighlight:!1,
weekStart:0
}, locale_opts = $.fn.datepicker.locale_opts = [ "format", "rtl", "weekStart" ];
$.fn.datepicker.Constructor = Datepicker;
var dates = $.fn.datepicker.dates = {
en:{
days:[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
daysShort:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
daysMin:[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su" ],
months:[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
monthsShort:[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
today:"Today",
clear:"Clear"
}
}, DPGlobal = {
modes:[ {
clsName:"days",
navFnc:"Month",
navStep:1
}, {
clsName:"months",
navFnc:"FullYear",
navStep:1
}, {
clsName:"years",
navFnc:"FullYear",
navStep:10
} ],
isLeapYear:function(year) {
return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
},
getDaysInMonth:function(year, month) {
return [ 31, DPGlobal.isLeapYear(year) ? 29 :28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month];
},
validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,
nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
parseFormat:function(format) {
var separators = format.replace(this.validParts, "\x00").split("\x00"), parts = format.match(this.validParts);
if (!separators || !separators.length || !parts || 0 === parts.length) throw new Error("Invalid date format.");
return {
separators:separators,
parts:parts
};
},
parseDate:function(date, format, language) {
function match_part() {
var m = this.slice(0, parts[i].length), p = parts[i].slice(0, m.length);
return m === p;
}
if (!date) return undefined;
if (date instanceof Date) return date;
"string" == typeof format && (format = DPGlobal.parseFormat(format));
var part, dir, i, part_re = /([\-+]\d+)([dmwy])/, parts = date.match(/([\-+]\d+)([dmwy])/g);
if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
for (date = new Date(), i = 0; i < parts.length; i++) switch (part = part_re.exec(parts[i]), 
dir = parseInt(part[1]), part[2]) {
case "d":
date.setUTCDate(date.getUTCDate() + dir);
break;

case "m":
date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
break;

case "w":
date.setUTCDate(date.getUTCDate() + 7 * dir);
break;

case "y":
date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
}
return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
}
parts = date && date.match(this.nonpunctuation) || [], date = new Date();
var val, filtered, parsed = {}, setters_order = [ "yyyy", "yy", "M", "MM", "m", "mm", "d", "dd" ], setters_map = {
yyyy:function(d, v) {
return d.setUTCFullYear(v);
},
yy:function(d, v) {
return d.setUTCFullYear(2e3 + v);
},
m:function(d, v) {
if (isNaN(d)) return d;
for (v -= 1; 0 > v; ) v += 12;
for (v %= 12, d.setUTCMonth(v); d.getUTCMonth() !== v; ) d.setUTCDate(d.getUTCDate() - 1);
return d;
},
d:function(d, v) {
return d.setUTCDate(v);
}
};
setters_map.M = setters_map.MM = setters_map.mm = setters_map.m, setters_map.dd = setters_map.d, 
date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
var fparts = format.parts.slice();
if (parts.length !== fparts.length && (fparts = $(fparts).filter(function(i, p) {
return -1 !== $.inArray(p, setters_order);
}).toArray()), parts.length === fparts.length) {
var cnt;
for (i = 0, cnt = fparts.length; cnt > i; i++) {
if (val = parseInt(parts[i], 10), part = fparts[i], isNaN(val)) switch (part) {
case "MM":
filtered = $(dates[language].months).filter(match_part), val = $.inArray(filtered[0], dates[language].months) + 1;
break;

case "M":
filtered = $(dates[language].monthsShort).filter(match_part), val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
}
parsed[part] = val;
}
var _date, s;
for (i = 0; i < setters_order.length; i++) s = setters_order[i], s in parsed && !isNaN(parsed[s]) && (_date = new Date(date), 
setters_map[s](_date, parsed[s]), isNaN(_date) || (date = _date));
}
return date;
},
formatDate:function(date, format, language) {
if (!date) return "";
"string" == typeof format && (format = DPGlobal.parseFormat(format));
var val = {
d:date.getUTCDate(),
D:dates[language].daysShort[date.getUTCDay()],
DD:dates[language].days[date.getUTCDay()],
m:date.getUTCMonth() + 1,
M:dates[language].monthsShort[date.getUTCMonth()],
MM:dates[language].months[date.getUTCMonth()],
yy:date.getUTCFullYear().toString().substring(2),
yyyy:date.getUTCFullYear()
};
val.dd = (val.d < 10 ? "0" :"") + val.d, val.mm = (val.m < 10 ? "0" :"") + val.m, 
date = [];
for (var seps = $.extend([], format.separators), i = 0, cnt = format.parts.length; cnt >= i; i++) seps.length && date.push(seps.shift()), 
date.push(val[format.parts[i]]);
return date.join("");
},
headTemplate:'<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',
footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
};
DPGlobal.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + DPGlobal.headTemplate + "<tbody></tbody>" + DPGlobal.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + DPGlobal.footTemplate + "</table></div></div>", 
$.fn.datepicker.DPGlobal = DPGlobal, $.fn.datepicker.noConflict = function() {
return $.fn.datepicker = old, this;
}, $(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
var $this = $(this);
$this.data("datepicker") || (e.preventDefault(), $this.datepicker("show"));
}), $(function() {
$('[data-provide="datepicker-inline"]').datepicker();
});
}(window.jQuery), /*
* jQuery File Download Plugin v1.4.2 
*
* http://www.johnculviner.com
*
* Copyright (c) 2013 - John Culviner
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* !!!!NOTE!!!!
* You must also write a cookie in conjunction with using this plugin as mentioned in the orignal post:
* http://johnculviner.com/jquery-file-download-plugin-for-ajax-like-feature-rich-file-downloads/
* !!!!NOTE!!!!
*/
function($, window) {
var htmlSpecialCharsRegEx = /[<>&\r\n"']/gm, htmlSpecialCharsPlaceHolders = {
"<":"lt;",
">":"gt;",
"&":"amp;",
"\r":"#13;",
"\n":"#10;",
'"':"quot;",
"'":"apos;"
};
$.extend({
fileDownload:function(fileUrl, options) {
function checkFileDownloadComplete() {
if (-1 != document.cookie.indexOf(settings.cookieName + "=" + settings.cookieValue)) return internalCallbacks.onSuccess(fileUrl), 
document.cookie = settings.cookieName + "=; expires=" + new Date(1e3).toUTCString() + "; path=" + settings.cookiePath, 
cleanUp(!1), void 0;
if (downloadWindow || $iframe) try {
var formDoc = downloadWindow ? downloadWindow.document :getiframeDocument($iframe);
if (formDoc && null != formDoc.body && formDoc.body.innerHTML.length) {
var isFailure = !0;
if ($form && $form.length) {
var $contents = $(formDoc.body).contents().first();
$contents.length && $contents[0] === $form[0] && (isFailure = !1);
}
if (isFailure) return internalCallbacks.onFail(formDoc.body.innerHTML, fileUrl), 
cleanUp(!0), void 0;
}
} catch (err) {
return internalCallbacks.onFail("", fileUrl), cleanUp(!0), void 0;
}
return timePassed += settings.checkInterval, null == settings.timeout || timePassed < settings.timeout ? (setTimeout(checkFileDownloadComplete, settings.checkInterval), 
void 0) :(internalCallbacks.onFail("", fileUrl), cleanUp(!0), void 0);
}
function getiframeDocument($iframe) {
var iframeDoc = $iframe[0].contentWindow || $iframe[0].contentDocument;
return iframeDoc.document && (iframeDoc = iframeDoc.document), iframeDoc;
}
function cleanUp(isFailure) {
setTimeout(function() {
downloadWindow && (isAndroid && downloadWindow.close(), isIos && (downloadWindow.focus(), 
isFailure && downloadWindow.close()));
}, 0);
}
function htmlSpecialCharsEntityEncode(str) {
return str.replace(htmlSpecialCharsRegEx, function(match) {
return "&" + htmlSpecialCharsPlaceHolders[match];
});
}
var isIos, isAndroid, isOtherMobileBrowser, settings = $.extend({
preparingMessageHtml:null,
failMessageHtml:null,
androidPostUnsupportedMessageHtml:"Unfortunately your Android browser doesn't support this type of file download. Please try again with a different browser.",
dialogOptions:{
modal:!0
},
prepareCallback:function() {},
successCallback:function() {},
failCallback:function() {},
httpMethod:"GET",
data:null,
checkInterval:100,
cookieName:"fileDownload",
cookieValue:"true",
cookiePath:"/",
popupWindowTitle:"Initiating file download...",
encodeHTMLEntities:!0,
timeout:null
}, options), deferred = new $.Deferred(), userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase(), timePassed = 0;
/ip(ad|hone|od)/.test(userAgent) ? isIos = !0 :-1 !== userAgent.indexOf("android") ? isAndroid = !0 :isOtherMobileBrowser = /avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|playbook|silk|iemobile|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));
var httpMethodUpper = settings.httpMethod.toUpperCase();
if (isAndroid && "GET" !== httpMethodUpper) return $().dialog ? $("<div>").html(settings.androidPostUnsupportedMessageHtml).dialog(settings.dialogOptions) :alert(settings.androidPostUnsupportedMessageHtml), 
deferred.reject();
var $preparingDialog = null, internalCallbacks = {
onPrepare:function(url) {
settings.preparingMessageHtml ? $preparingDialog = $("<div>").html(settings.preparingMessageHtml).dialog(settings.dialogOptions) :settings.prepareCallback && settings.prepareCallback(url);
},
onSuccess:function(url) {
$preparingDialog && $preparingDialog.dialog("close"), settings.successCallback(url), 
deferred.resolve(url);
},
onFail:function(responseHtml, url) {
$preparingDialog && $preparingDialog.dialog("close"), settings.failMessageHtml && $("<div>").html(settings.failMessageHtml).dialog(settings.dialogOptions), 
settings.failCallback(responseHtml, url), deferred.reject(responseHtml, url);
}
};
internalCallbacks.onPrepare(fileUrl), null !== settings.data && "string" != typeof settings.data && (settings.data = $.param(settings.data));
var $iframe, downloadWindow, formDoc, $form;
if ("GET" === httpMethodUpper) {
if (null !== settings.data) {
var qsStart = fileUrl.indexOf("?");
-1 !== qsStart ? "&" !== fileUrl.substring(fileUrl.length - 1) && (fileUrl += "&") :fileUrl += "?", 
fileUrl += settings.data;
}
isIos || isAndroid ? (downloadWindow = window.open(fileUrl), downloadWindow.document.title = settings.popupWindowTitle, 
window.focus()) :isOtherMobileBrowser ? window.location(fileUrl) :$iframe = $("<iframe>").hide().prop("src", fileUrl).appendTo("body");
} else {
var formInnerHtml = "";
null !== settings.data && $.each(settings.data.replace(/\+/g, " ").split("&"), function() {
var kvp = this.split("="), key = settings.encodeHTMLEntities ? htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[0])) :decodeURIComponent(kvp[0]);
if (key) {
var value = settings.encodeHTMLEntities ? htmlSpecialCharsEntityEncode(decodeURIComponent(kvp[1])) :decodeURIComponent(kvp[1]);
formInnerHtml += '<input type="hidden" name="' + key + '" value="' + value + '" />';
}
}), isOtherMobileBrowser ? ($form = $("<form>").appendTo("body"), $form.hide().prop("method", settings.httpMethod).prop("action", fileUrl).html(formInnerHtml)) :(isIos ? (downloadWindow = window.open("about:blank"), 
downloadWindow.document.title = settings.popupWindowTitle, formDoc = downloadWindow.document, 
window.focus()) :($iframe = $("<iframe style='display: none' src='about:blank'></iframe>").appendTo("body"), 
formDoc = getiframeDocument($iframe)), formDoc.write("<html><head></head><body><form method='" + settings.httpMethod + "' action='" + fileUrl + "'>" + formInnerHtml + "</form>" + settings.popupWindowTitle + "</body></html>"), 
$form = $(formDoc).find("form")), $form.submit();
}
return setTimeout(checkFileDownloadComplete, settings.checkInterval), deferred.promise();
}
});
}(jQuery, this), $(function() {
$.fn.bootstrapFileInput = function() {
this.each(function(i, elem) {
var $elem = $(elem);
if ("undefined" == typeof $elem.attr("data-bfi-disabled")) {
var buttonWord = "Browse";
"undefined" != typeof $elem.attr("title") && (buttonWord = $elem.attr("title"));
var input = $("<div>").append($elem.eq(0).clone()).html(), className = "";
$elem.attr("class") && (className = " " + $elem.attr("class")), $elem.replaceWith('<a class="file-input-wrapper btn' + className + '">' + buttonWord + input + "</a>");
}
}).promise().done(function() {
$(".file-input-wrapper").mousemove(function(cursor) {
var input, wrapper, wrapperX, wrapperY, inputWidth, inputHeight, cursorX, cursorY;
wrapper = $(this), input = wrapper.find("input"), wrapperX = wrapper.offset().left, 
wrapperY = wrapper.offset().top, inputWidth = input.width(), inputHeight = input.height(), 
cursorX = cursor.pageX, cursorY = cursor.pageY, moveInputX = cursorX - wrapperX - inputWidth + 20, 
moveInputY = cursorY - wrapperY - inputHeight / 2, input.css({
left:moveInputX,
top:moveInputY
});
}), $(".file-input-wrapper input[type=file]").change(function() {
var fileName;
fileName = $(this).val(), $(this).parent().next(".file-input-name").remove(), fileName = $(this).prop("files") && $(this).prop("files").length > 1 ? $(this)[0].files.length + " files" :fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.length), 
$(this).parent().after('<span class="file-input-name">' + fileName + "</span>");
});
});
};
var cssHtml = "<style>.file-input-wrapper { overflow: hidden; position: relative; cursor: pointer; z-index: 1; }.file-input-wrapper input[type=file], .file-input-wrapper input[type=file]:focus, .file-input-wrapper input[type=file]:hover { position: absolute; top: 0; left: 0; cursor: pointer; opacity: 0; filter: alpha(opacity=0); z-index: 99; outline: 0; }.file-input-name { margin-left: 8px; }</style>";
$("link[rel=stylesheet]").eq(0).before(cssHtml);
}), /**
* @version: 1.2
* @author: Dan Grossman http://www.dangrossman.info/
* @date: 2013-07-25
* @copyright: Copyright (c) 2012-2013 Dan Grossman. All rights reserved.
* @license: Licensed under Apache License v2.0. See http://www.apache.org/licenses/LICENSE-2.0
* @website: http://www.improvely.com/
*/
!function($) {
var DateRangePicker = function(element, options, cb) {
var localeObject, hasOptions = "object" == typeof options;
this.startDate = moment().startOf("day"), this.endDate = moment().startOf("day"), 
this.minDate = !1, this.maxDate = !1, this.dateLimit = !1, this.showDropdowns = !1, 
this.showWeekNumbers = !1, this.timePicker = !1, this.timePickerIncrement = 30, 
this.timePicker12Hour = !0, this.ranges = {}, this.opens = "right", this.buttonClasses = [ "btn", "btn-small" ], 
this.applyClass = "btn-success", this.cancelClass = "btn-default", this.format = "MM/DD/YYYY", 
this.separator = " - ", this.locale = {
applyLabel:"Apply",
cancelLabel:"Cancel",
fromLabel:"From",
toLabel:"To",
weekLabel:"W",
customRangeLabel:"Custom Range",
daysOfWeek:moment()._lang._weekdaysMin,
monthNames:moment()._lang._monthsShort,
firstDay:0
}, this.cb = function() {}, this.element = $(element), this.element.hasClass("pull-right") && (this.opens = "left"), 
this.element.is("input") ? this.element.on({
click:$.proxy(this.show, this),
focus:$.proxy(this.show, this)
}) :this.element.on("click", $.proxy(this.show, this)), localeObject = this.locale, 
hasOptions && ("object" == typeof options.locale && $.each(localeObject, function(property, value) {
localeObject[property] = options.locale[property] || value;
}), options.applyClass && (this.applyClass = options.applyClass), options.cancelClass && (this.cancelClass = options.cancelClass));
var DRPTemplate = '<div class="daterangepicker dropdown-menu"><div class="calendar left"></div><div class="calendar right"></div><div class="ranges"><div class="range_inputs"><div class="daterangepicker_start_input" style="float: left"><label for="daterangepicker_start">' + this.locale.fromLabel + '</label><input class="input-mini" type="text" name="daterangepicker_start" value="" disabled="disabled" /></div><div class="daterangepicker_end_input" style="float: left; padding-left: 11px"><label for="daterangepicker_end">' + this.locale.toLabel + '</label><input class="input-mini" type="text" name="daterangepicker_end" value="" disabled="disabled" /></div><button class="' + this.applyClass + ' applyBtn" disabled="disabled">' + this.locale.applyLabel + '</button>&nbsp;<button class="' + this.cancelClass + ' cancelBtn">' + this.locale.cancelLabel + "</button></div></div></div>";
if (this.container = $(DRPTemplate).appendTo("body"), hasOptions) {
if ("string" == typeof options.format && (this.format = options.format), "string" == typeof options.separator && (this.separator = options.separator), 
"string" == typeof options.startDate && (this.startDate = moment(options.startDate, this.format)), 
"string" == typeof options.endDate && (this.endDate = moment(options.endDate, this.format)), 
"string" == typeof options.minDate && (this.minDate = moment(options.minDate, this.format)), 
"string" == typeof options.maxDate && (this.maxDate = moment(options.maxDate, this.format)), 
"object" == typeof options.startDate && (this.startDate = moment(options.startDate)), 
"object" == typeof options.endDate && (this.endDate = moment(options.endDate)), 
"object" == typeof options.minDate && (this.minDate = moment(options.minDate)), 
"object" == typeof options.maxDate && (this.maxDate = moment(options.maxDate)), 
"object" == typeof options.ranges) {
for (var range in options.ranges) {
var start = moment(options.ranges[range][0]), end = moment(options.ranges[range][1]);
this.minDate && start.isBefore(this.minDate) && (start = moment(this.minDate)), 
this.maxDate && end.isAfter(this.maxDate) && (end = moment(this.maxDate)), this.minDate && end.isBefore(this.minDate) || this.maxDate && start.isAfter(this.maxDate) || (this.ranges[range] = [ start, end ]);
}
var list = "<ul>";
for (var range in this.ranges) list += "<li>" + range + "</li>";
list += "<li>" + this.locale.customRangeLabel + "</li>", list += "</ul>", this.container.find(".ranges").prepend(list);
}
if ("object" == typeof options.dateLimit && (this.dateLimit = options.dateLimit), 
"object" == typeof options.locale && "number" == typeof options.locale.firstDay) {
this.locale.firstDay = options.locale.firstDay;
for (var iterator = options.locale.firstDay; iterator > 0; ) this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), 
iterator--;
}
"string" == typeof options.opens && (this.opens = options.opens), "boolean" == typeof options.showWeekNumbers && (this.showWeekNumbers = options.showWeekNumbers), 
"string" == typeof options.buttonClasses && (this.buttonClasses = [ options.buttonClasses ]), 
"object" == typeof options.buttonClasses && (this.buttonClasses = options.buttonClasses), 
"boolean" == typeof options.showDropdowns && (this.showDropdowns = options.showDropdowns), 
"boolean" == typeof options.timePicker && (this.timePicker = options.timePicker), 
"number" == typeof options.timePickerIncrement && (this.timePickerIncrement = options.timePickerIncrement), 
"boolean" == typeof options.timePicker12Hour && (this.timePicker12Hour = options.timePicker12Hour);
}
this.timePicker || (this.startDate = this.startDate.startOf("day"), this.endDate = this.endDate.startOf("day"));
var c = this.container;
if ($.each(this.buttonClasses, function(idx, val) {
c.find("button").addClass(val);
}), "right" == this.opens) {
var left = this.container.find(".calendar.left"), right = this.container.find(".calendar.right");
left.removeClass("left").addClass("right"), right.removeClass("right").addClass("left");
}
if (("undefined" == typeof options || "undefined" == typeof options.ranges) && (this.container.find(".calendar").show(), 
this.move()), "function" == typeof cb && (this.cb = cb), this.container.addClass("opens" + this.opens), 
(!hasOptions || "undefined" == typeof options.startDate && "undefined" == typeof options.endDate) && $(this.element).is("input[type=text]")) {
var start, end, val = $(this.element).val(), split = val.split(this.separator);
2 == split.length && (start = moment(split[0], this.format), end = moment(split[1], this.format)), 
null != start && null != end && (this.startDate = start, this.endDate = end);
}
this.oldStartDate = this.startDate, this.oldEndDate = this.endDate, this.leftCalendar = {
month:moment([ this.startDate.year(), this.startDate.month(), 1, this.startDate.hour(), this.startDate.minute() ]),
calendar:[]
}, this.rightCalendar = {
month:moment([ this.endDate.year(), this.endDate.month(), 1, this.endDate.hour(), this.endDate.minute() ]),
calendar:[]
}, this.container.on("mousedown", $.proxy(this.mousedown, this)), this.container.find(".calendar").on("click", ".prev", $.proxy(this.clickPrev, this)), 
this.container.find(".calendar").on("click", ".next", $.proxy(this.clickNext, this)), 
this.container.find(".ranges").on("click", "button.applyBtn", $.proxy(this.clickApply, this)), 
this.container.find(".ranges").on("click", "button.cancelBtn", $.proxy(this.clickCancel, this)), 
this.container.find(".calendar").on("click", "td.available", $.proxy(this.clickDate, this)), 
this.container.find(".calendar").on("mouseenter", "td.available", $.proxy(this.enterDate, this)), 
this.container.find(".calendar").on("mouseleave", "td.available", $.proxy(this.updateView, this)), 
this.container.find(".ranges").on("click", "li", $.proxy(this.clickRange, this)), 
this.container.find(".ranges").on("mouseenter", "li", $.proxy(this.enterRange, this)), 
this.container.find(".ranges").on("mouseleave", "li", $.proxy(this.updateView, this)), 
this.container.find(".calendar").on("change", "select.yearselect", $.proxy(this.updateYear, this)), 
this.container.find(".calendar").on("change", "select.monthselect", $.proxy(this.updateMonth, this)), 
this.container.find(".calendar").on("change", "select.hourselect", $.proxy(this.updateTime, this)), 
this.container.find(".calendar").on("change", "select.minuteselect", $.proxy(this.updateTime, this)), 
this.container.find(".calendar").on("change", "select.ampmselect", $.proxy(this.updateTime, this)), 
this.element.on("keyup", $.proxy(this.updateFromControl, this)), this.updateView(), 
this.updateCalendars();
};
DateRangePicker.prototype = {
constructor:DateRangePicker,
mousedown:function(e) {
e.stopPropagation();
},
updateView:function() {
this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()), 
this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()), 
this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.format)), 
this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.format)), 
this.startDate.isSame(this.endDate) || this.startDate.isBefore(this.endDate) ? this.container.find("button.applyBtn").removeAttr("disabled") :this.container.find("button.applyBtn").attr("disabled", "disabled");
},
updateFromControl:function() {
if (this.element.is("input") && this.element.val().length) {
var dateString = this.element.val().split(this.separator), start = moment(dateString[0], this.format), end = moment(dateString[1], this.format);
null != start && null != end && (end.isBefore(start) || (this.startDate = start, 
this.endDate = end, this.updateView(), this.cb(this.startDate, this.endDate), this.updateCalendars()));
}
},
notify:function() {
this.updateView(), this.cb(this.startDate, this.endDate);
},
move:function() {
var minWidth = $(this.container).find(".ranges").outerWidth();
if ($(this.container).find(".calendar").is(":visible")) {
var padding = 24;
minWidth += 2 * $(this.container).find(".calendar").outerWidth() + padding;
}
"left" == this.opens ? (this.container.css({
top:this.element.offset().top + this.element.outerHeight(),
right:$(window).width() - this.element.offset().left - this.element.outerWidth(),
left:"auto",
"min-width":minWidth
}), this.container.offset().left < 0 && this.container.css({
right:"auto",
left:9
})) :(this.container.css({
top:this.element.offset().top + this.element.outerHeight(),
left:this.element.offset().left,
right:"auto",
"min-width":minWidth
}), this.container.offset().left + this.container.outerWidth() > $(window).width() && this.container.css({
left:"auto",
right:0
}));
},
show:function(e) {
this.container.show(), this.move(), e && (e.stopPropagation(), e.preventDefault()), 
this.oldStartDate = this.startDate, this.oldEndDate = this.endDate, $(document).on("mousedown", $.proxy(this.hide, this)), 
this.element.trigger("shown", {
target:e.target,
picker:this
});
},
hide:function() {
this.container.hide(), this.startDate.isSame(this.oldStartDate) && this.endDate.isSame(this.oldEndDate) || this.notify(), 
$(document).off("mousedown", this.hide), this.element.trigger("hidden", {
picker:this
});
},
enterRange:function(e) {
var label = e.target.innerHTML;
if (label == this.locale.customRangeLabel) this.updateView(); else {
var dates = this.ranges[label];
this.container.find("input[name=daterangepicker_start]").val(dates[0].format(this.format)), 
this.container.find("input[name=daterangepicker_end]").val(dates[1].format(this.format));
}
},
clickRange:function(e) {
var label = e.target.innerHTML;
if (label == this.locale.customRangeLabel) this.container.find(".calendar").show(), 
this.move(); else {
var dates = this.ranges[label];
this.startDate = dates[0], this.endDate = dates[1], this.timePicker || (this.startDate.startOf("day"), 
this.endDate.startOf("day")), this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute()), 
this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute()), 
this.updateCalendars(), this.element.is("input") && this.element.val(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format)), 
this.container.find(".calendar").hide(), this.hide();
}
},
clickPrev:function(e) {
var cal = $(e.target).parents(".calendar");
cal.hasClass("left") ? this.leftCalendar.month.subtract("month", 1) :this.rightCalendar.month.subtract("month", 1), 
this.updateCalendars();
},
clickNext:function(e) {
var cal = $(e.target).parents(".calendar");
cal.hasClass("left") ? this.leftCalendar.month.add("month", 1) :this.rightCalendar.month.add("month", 1), 
this.updateCalendars();
},
enterDate:function(e) {
var title = $(e.target).attr("data-title"), row = title.substr(1, 1), col = title.substr(3, 1), cal = $(e.target).parents(".calendar");
cal.hasClass("left") ? this.container.find("input[name=daterangepicker_start]").val(this.leftCalendar.calendar[row][col].format(this.format)) :this.container.find("input[name=daterangepicker_end]").val(this.rightCalendar.calendar[row][col].format(this.format));
},
clickDate:function(e) {
var title = $(e.target).attr("data-title"), row = title.substr(1, 1), col = title.substr(3, 1), cal = $(e.target).parents(".calendar");
if (cal.hasClass("left")) {
var startDate = this.leftCalendar.calendar[row][col], endDate = this.endDate;
if ("object" == typeof this.dateLimit) {
var maxDate = moment(startDate).add(this.dateLimit).startOf("day");
endDate.isAfter(maxDate) && (endDate = maxDate);
}
} else {
var startDate = this.startDate, endDate = this.rightCalendar.calendar[row][col];
if ("object" == typeof this.dateLimit) {
var minDate = moment(endDate).subtract(this.dateLimit).startOf("day");
startDate.isBefore(minDate) && (startDate = minDate);
}
}
cal.find("td").removeClass("active"), startDate.isSame(endDate) || startDate.isBefore(endDate) ? ($(e.target).addClass("active"), 
this.startDate = startDate, this.endDate = endDate) :startDate.isAfter(endDate) && ($(e.target).addClass("active"), 
this.startDate = startDate, this.endDate = moment(startDate).add("day", 1).startOf("day")), 
this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()), 
this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()), 
this.updateCalendars();
},
clickApply:function() {
this.element.is("input") && this.element.val(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format)), 
this.hide();
},
clickCancel:function() {
this.startDate = this.oldStartDate, this.endDate = this.oldEndDate, this.updateView(), 
this.updateCalendars(), this.hide();
},
updateYear:function(e) {
var year = parseInt($(e.target).val()), isLeft = $(e.target).closest(".calendar").hasClass("left");
isLeft ? this.leftCalendar.month.month(this.startDate.month()).year(year) :this.rightCalendar.month.month(this.endDate.month()).year(year), 
this.updateCalendars();
},
updateMonth:function(e) {
var month = parseInt($(e.target).val()), isLeft = $(e.target).closest(".calendar").hasClass("left");
isLeft ? this.leftCalendar.month.month(month).year(this.startDate.year()) :this.rightCalendar.month.month(month).year(this.endDate.year()), 
this.updateCalendars();
},
updateTime:function(e) {
var isLeft = $(e.target).closest(".calendar").hasClass("left"), cal = this.container.find(".calendar.left");
isLeft || (cal = this.container.find(".calendar.right"));
var hour = parseInt(cal.find(".hourselect").val()), minute = parseInt(cal.find(".minuteselect").val());
if (this.timePicker12Hour) {
var ampm = cal.find(".ampmselect").val();
"PM" == ampm && 12 > hour && (hour += 12);
}
if (isLeft) {
var start = this.startDate;
start.hour(hour), start.minute(minute), this.startDate = start, this.leftCalendar.month.hour(hour).minute(minute);
} else {
var end = this.endDate;
end.hour(hour), end.minute(minute), this.endDate = end, this.rightCalendar.month.hour(hour).minute(minute);
}
this.updateCalendars();
},
updateCalendars:function() {
this.leftCalendar.calendar = this.buildCalendar(this.leftCalendar.month.month(), this.leftCalendar.month.year(), this.leftCalendar.month.hour(), this.leftCalendar.month.minute(), "left"), 
this.rightCalendar.calendar = this.buildCalendar(this.rightCalendar.month.month(), this.rightCalendar.month.year(), this.rightCalendar.month.hour(), this.rightCalendar.month.minute(), "right"), 
this.container.find(".calendar.left").html(this.renderCalendar(this.leftCalendar.calendar, this.startDate, this.minDate, this.maxDate)), 
this.container.find(".calendar.right").html(this.renderCalendar(this.rightCalendar.calendar, this.endDate, this.startDate, this.maxDate)), 
this.container.find(".ranges li").removeClass("active");
var customRange = !0, i = 0;
for (var range in this.ranges) this.timePicker ? this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1]) && (customRange = !1, 
this.container.find(".ranges li:eq(" + i + ")").addClass("active")) :this.startDate.format("YYYY-MM-DD") == this.ranges[range][0].format("YYYY-MM-DD") && this.endDate.format("YYYY-MM-DD") == this.ranges[range][1].format("YYYY-MM-DD") && (customRange = !1, 
this.container.find(".ranges li:eq(" + i + ")").addClass("active")), i++;
customRange && this.container.find(".ranges li:last").addClass("active");
},
buildCalendar:function(month, year, hour, minute) {
for (var firstDay = moment([ year, month, 1 ]), lastMonth = moment(firstDay).subtract("month", 1).month(), lastYear = moment(firstDay).subtract("month", 1).year(), daysInLastMonth = moment([ lastYear, lastMonth ]).daysInMonth(), dayOfWeek = firstDay.day(), calendar = [], i = 0; 6 > i; i++) calendar[i] = [];
var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
startDay > daysInLastMonth && (startDay -= 7), dayOfWeek == this.locale.firstDay && (startDay = daysInLastMonth - 6);
for (var curDate = moment([ lastYear, lastMonth, startDay, hour, minute ]), i = 0, col = 0, row = 0; 42 > i; i++, 
col++, curDate = moment(curDate).add("day", 1)) i > 0 && col % 7 == 0 && (col = 0, 
row++), calendar[row][col] = curDate;
return calendar;
},
renderDropdowns:function(selected, minDate, maxDate) {
for (var currentMonth = selected.month(), monthHtml = '<select class="monthselect">', inMinYear = !1, inMaxYear = !1, m = 0; 12 > m; m++) (!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month()) && (monthHtml += "<option value='" + m + "'" + (m === currentMonth ? " selected='selected'" :"") + ">" + this.locale.monthNames[m] + "</option>");
monthHtml += "</select>";
for (var currentYear = selected.year(), maxYear = maxDate && maxDate.year() || currentYear + 5, minYear = minDate && minDate.year() || currentYear - 50, yearHtml = '<select class="yearselect">', y = minYear; maxYear >= y; y++) yearHtml += '<option value="' + y + '"' + (y === currentYear ? ' selected="selected"' :"") + ">" + y + "</option>";
return yearHtml += "</select>", monthHtml + yearHtml;
},
renderCalendar:function(calendar, selected, minDate, maxDate) {
var html = '<div class="calendar-date">';
html += '<table class="table-condensed">', html += "<thead>", html += "<tr>", this.showWeekNumbers && (html += "<th></th>"), 
html += !minDate || minDate.isBefore(calendar[1][1]) ? '<th class="prev available"><i class="icon-arrow-left"></i></th>' :"<th></th>";
var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");
this.showDropdowns && (dateHtml = this.renderDropdowns(calendar[1][1], minDate, maxDate)), 
html += '<th colspan="5" style="width: auto">' + dateHtml + "</th>", html += !maxDate || maxDate.isAfter(calendar[1][1]) ? '<th class="next available"><i class="icon-arrow-right"></i></th>' :"<th></th>", 
html += "</tr>", html += "<tr>", this.showWeekNumbers && (html += '<th class="week">' + this.locale.weekLabel + "</th>"), 
$.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
html += "<th>" + dayOfWeek + "</th>";
}), html += "</tr>", html += "</thead>", html += "<tbody>";
for (var row = 0; 6 > row; row++) {
html += "<tr>", this.showWeekNumbers && (html += '<td class="week">' + calendar[row][0].week() + "</td>");
for (var col = 0; 7 > col; col++) {
var cname = "available ";
cname += calendar[row][col].month() == calendar[1][1].month() ? "" :"off", minDate && calendar[row][col].isBefore(minDate) || maxDate && calendar[row][col].isAfter(maxDate) ? cname = " off disabled " :calendar[row][col].format("YYYY-MM-DD") == selected.format("YYYY-MM-DD") ? (cname += " active ", 
calendar[row][col].format("YYYY-MM-DD") == this.startDate.format("YYYY-MM-DD") && (cname += " start-date "), 
calendar[row][col].format("YYYY-MM-DD") == this.endDate.format("YYYY-MM-DD") && (cname += " end-date ")) :calendar[row][col] >= this.startDate && calendar[row][col] <= this.endDate && (cname += " in-range ", 
calendar[row][col].isSame(this.startDate) && (cname += " start-date "), calendar[row][col].isSame(this.endDate) && (cname += " end-date "));
var title = "r" + row + "c" + col;
html += '<td class="' + cname.replace(/\s+/g, " ").replace(/^\s?(.*?)\s?$/, "$1") + '" data-title="' + title + '">' + calendar[row][col].date() + "</td>";
}
html += "</tr>";
}
if (html += "</tbody>", html += "</table>", html += "</div>", this.timePicker) {
html += '<div class="calendar-time">', html += '<select class="hourselect">';
var start = 0, end = 23, selected_hour = selected.hour();
this.timePicker12Hour && (start = 1, end = 12, selected_hour >= 12 && (selected_hour -= 12), 
0 == selected_hour && (selected_hour = 12));
for (var i = start; end >= i; i++) html += i == selected_hour ? '<option value="' + i + '" selected="selected">' + i + "</option>" :'<option value="' + i + '">' + i + "</option>";
html += "</select> : ", html += '<select class="minuteselect">';
for (var i = 0; 60 > i; i += this.timePickerIncrement) {
var num = i;
10 > num && (num = "0" + num), html += i == selected.minute() ? '<option value="' + i + '" selected="selected">' + num + "</option>" :'<option value="' + i + '">' + num + "</option>";
}
html += "</select> ", this.timePicker12Hour && (html += '<select class="ampmselect">', 
html += selected.hour() >= 12 ? '<option value="AM">AM</option><option value="PM" selected="selected">PM</option>' :'<option value="AM" selected="selected">AM</option><option value="PM">PM</option>', 
html += "</select>"), html += "</div>";
}
return html;
}
}, $.fn.daterangepicker = function(options, cb) {
return this.each(function() {
var el = $(this);
el.data("daterangepicker") || el.data("daterangepicker", new DateRangePicker(el, options, cb));
}), this;
};
}(window.jQuery), /*!
 * ZeroClipboard
 * The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
 * Copyright (c) 2014 Jon Rohan, James M. Greene
 * Licensed MIT
 * http://zeroclipboard.org/
 * v2.0.0-alpha.1
 */
function() {
"use strict";
function _parseFlashVersion(flashVersion) {
return flashVersion.replace(/,/g, ".").replace(/[^0-9\.]/g, "");
}
function _isFlashVersionSupported(flashVersion) {
return parseFloat(_parseFlashVersion(flashVersion)) >= 10;
}
var currentElement, flashState = {
bridge:null,
version:"0.0.0",
disabled:null,
outdated:null,
ready:null
}, _clipData = {}, clientIdCounter = 0, _clientMeta = {}, elementIdCounter = 0, _elementMeta = {}, _amdModuleId = null, _cjsModuleId = null, _swfPath = function() {
var i, jsDir, tmpJsPath, jsPath, swfPath = "ZeroClipboard.swf";
if (document.currentScript && (jsPath = document.currentScript.src)) ; else {
var scripts = document.getElementsByTagName("script");
if ("readyState" in scripts[0]) for (i = scripts.length; i-- && ("interactive" !== scripts[i].readyState || !(jsPath = scripts[i].src)); ) ; else if ("loading" === document.readyState) jsPath = scripts[scripts.length - 1].src; else {
for (i = scripts.length; i--; ) {
if (tmpJsPath = scripts[i].src, !tmpJsPath) {
jsDir = null;
break;
}
if (tmpJsPath = tmpJsPath.split("#")[0].split("?")[0], tmpJsPath = tmpJsPath.slice(0, tmpJsPath.lastIndexOf("/") + 1), 
null == jsDir) jsDir = tmpJsPath; else if (jsDir !== tmpJsPath) {
jsDir = null;
break;
}
}
null !== jsDir && (jsPath = jsDir);
}
}
return jsPath && (jsPath = jsPath.split("#")[0].split("?")[0], swfPath = jsPath.slice(0, jsPath.lastIndexOf("/") + 1) + swfPath), 
swfPath;
}(), _camelizeCssPropName = function() {
var matcherRegex = /\-([a-z])/g, replacerFn = function(match, group) {
return group.toUpperCase();
};
return function(prop) {
return prop.replace(matcherRegex, replacerFn);
};
}(), _getStyle = function(el, prop) {
var value, camelProp, tagName;
return window.getComputedStyle ? value = window.getComputedStyle(el, null).getPropertyValue(prop) :(camelProp = _camelizeCssPropName(prop), 
value = el.currentStyle ? el.currentStyle[camelProp] :el.style[camelProp]), "cursor" !== prop || value && "auto" !== value || (tagName = el.tagName.toLowerCase(), 
"a" !== tagName) ? value :"pointer";
}, _elementMouseOver = function(event) {
event || (event = window.event);
var target;
this !== window ? target = this :event.target ? target = event.target :event.srcElement && (target = event.srcElement), 
ZeroClipboard.activate(target);
}, _addEventHandler = function(element, method, func) {
element && 1 === element.nodeType && (element.addEventListener ? element.addEventListener(method, func, !1) :element.attachEvent && element.attachEvent("on" + method, func));
}, _removeEventHandler = function(element, method, func) {
element && 1 === element.nodeType && (element.removeEventListener ? element.removeEventListener(method, func, !1) :element.detachEvent && element.detachEvent("on" + method, func));
}, _addClass = function(element, value) {
if (!element || 1 !== element.nodeType) return element;
if (element.classList) return element.classList.contains(value) || element.classList.add(value), 
element;
if (value && "string" == typeof value) {
var classNames = (value || "").split(/\s+/);
if (1 === element.nodeType) if (element.className) {
for (var className = " " + element.className + " ", setClass = element.className, c = 0, cl = classNames.length; cl > c; c++) className.indexOf(" " + classNames[c] + " ") < 0 && (setClass += " " + classNames[c]);
element.className = setClass.replace(/^\s+|\s+$/g, "");
} else element.className = value;
}
return element;
}, _removeClass = function(element, value) {
if (!element || 1 !== element.nodeType) return element;
if (element.classList) return element.classList.contains(value) && element.classList.remove(value), 
element;
if (value && "string" == typeof value || void 0 === value) {
var classNames = (value || "").split(/\s+/);
if (1 === element.nodeType && element.className) if (value) {
for (var className = (" " + element.className + " ").replace(/[\n\t]/g, " "), c = 0, cl = classNames.length; cl > c; c++) className = className.replace(" " + classNames[c] + " ", " ");
element.className = className.replace(/^\s+|\s+$/g, "");
} else element.className = "";
}
return element;
}, _getZoomFactor = function() {
var rect, physicalWidth, logicalWidth, zoomFactor = 1;
return "function" == typeof document.body.getBoundingClientRect && (rect = document.body.getBoundingClientRect(), 
physicalWidth = rect.right - rect.left, logicalWidth = document.body.offsetWidth, 
zoomFactor = Math.round(physicalWidth / logicalWidth * 100) / 100), zoomFactor;
}, _getDOMObjectPosition = function(obj, defaultZIndex) {
var info = {
left:0,
top:0,
width:0,
height:0,
zIndex:_getSafeZIndex(defaultZIndex) - 1
};
if (obj.getBoundingClientRect) {
var pageXOffset, pageYOffset, zoomFactor, rect = obj.getBoundingClientRect();
"pageXOffset" in window && "pageYOffset" in window ? (pageXOffset = window.pageXOffset, 
pageYOffset = window.pageYOffset) :(zoomFactor = _getZoomFactor(), pageXOffset = Math.round(document.documentElement.scrollLeft / zoomFactor), 
pageYOffset = Math.round(document.documentElement.scrollTop / zoomFactor));
var leftBorderWidth = document.documentElement.clientLeft || 0, topBorderWidth = document.documentElement.clientTop || 0;
info.left = rect.left + pageXOffset - leftBorderWidth, info.top = rect.top + pageYOffset - topBorderWidth, 
info.width = "width" in rect ? rect.width :rect.right - rect.left, info.height = "height" in rect ? rect.height :rect.bottom - rect.top;
}
return info;
}, _cacheBust = function(path, options) {
var cacheBust = null == options || options && options.cacheBust === !0 && options.useNoCache === !0;
return cacheBust ? (-1 === path.indexOf("?") ? "?" :"&") + "noCache=" + new Date().getTime() :"";
}, _vars = function(options) {
var i, len, domain, str = [], domains = [], trustedOriginsExpanded = [];
if (options.trustedOrigins && ("string" == typeof options.trustedOrigins ? domains.push(options.trustedOrigins) :"object" == typeof options.trustedOrigins && "length" in options.trustedOrigins && (domains = domains.concat(options.trustedOrigins))), 
options.trustedDomains && ("string" == typeof options.trustedDomains ? domains.push(options.trustedDomains) :"object" == typeof options.trustedDomains && "length" in options.trustedDomains && (domains = domains.concat(options.trustedDomains))), 
domains.length) for (i = 0, len = domains.length; len > i; i++) if (domains.hasOwnProperty(i) && domains[i] && "string" == typeof domains[i]) {
if (domain = _extractDomain(domains[i]), !domain) continue;
if ("*" === domain) {
trustedOriginsExpanded = [ domain ];
break;
}
trustedOriginsExpanded.push.apply(trustedOriginsExpanded, [ domain, "//" + domain, window.location.protocol + "//" + domain ]);
}
return trustedOriginsExpanded.length && str.push("trustedOrigins=" + encodeURIComponent(trustedOriginsExpanded.join(","))), 
"string" == typeof options.jsModuleId && options.jsModuleId && str.push("jsModuleId=" + encodeURIComponent(options.jsModuleId)), 
str.join("&");
}, _inArray = function(elem, array, fromIndex) {
if ("function" == typeof array.indexOf) return array.indexOf(elem, fromIndex);
var i, len = array.length;
for ("undefined" == typeof fromIndex ? fromIndex = 0 :0 > fromIndex && (fromIndex = len + fromIndex), 
i = fromIndex; len > i; i++) if (array.hasOwnProperty(i) && array[i] === elem) return i;
return -1;
}, _prepClip = function(elements) {
if ("string" == typeof elements) throw new TypeError("ZeroClipboard doesn't accept query strings.");
return elements.length ? elements :[ elements ];
}, _dispatchCallback = function(func, context, args, async) {
async ? window.setTimeout(function() {
func.apply(context, args);
}, 0) :func.apply(context, args);
}, _getSafeZIndex = function(val) {
var zIndex, tmp;
return val && ("number" == typeof val && val > 0 ? zIndex = val :"string" == typeof val && (tmp = parseInt(val, 10)) && !isNaN(tmp) && tmp > 0 && (zIndex = tmp)), 
zIndex || ("number" == typeof _globalConfig.zIndex && _globalConfig.zIndex > 0 ? zIndex = _globalConfig.zIndex :"string" == typeof _globalConfig.zIndex && (tmp = parseInt(_globalConfig.zIndex, 10)) && !isNaN(tmp) && tmp > 0 && (zIndex = tmp)), 
zIndex || 0;
}, _deprecationWarning = function(deprecatedApiName, debugEnabled) {
if (deprecatedApiName && debugEnabled !== !1 && "undefined" != typeof console && console && (console.warn || console.log)) {
var deprecationWarning = "`" + deprecatedApiName + "` is deprecated. See docs for more info:\n    https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md#deprecations";
console.warn ? console.warn(deprecationWarning) :console.log(deprecationWarning);
}
}, _extend = function() {
var i, len, arg, prop, src, copy, target = arguments[0] || {};
for (i = 1, len = arguments.length; len > i; i++) if (null != (arg = arguments[i])) for (prop in arg) if (arg.hasOwnProperty(prop)) {
if (src = target[prop], copy = arg[prop], target === copy) continue;
void 0 !== copy && (target[prop] = copy);
}
return target;
}, _extractDomain = function(originOrUrl) {
if (null == originOrUrl || "" === originOrUrl) return null;
if (originOrUrl = originOrUrl.replace(/^\s+|\s+$/g, ""), "" === originOrUrl) return null;
var protocolIndex = originOrUrl.indexOf("//");
originOrUrl = -1 === protocolIndex ? originOrUrl :originOrUrl.slice(protocolIndex + 2);
var pathIndex = originOrUrl.indexOf("/");
return originOrUrl = -1 === pathIndex ? originOrUrl :-1 === protocolIndex || 0 === pathIndex ? null :originOrUrl.slice(0, pathIndex), 
originOrUrl && ".swf" === originOrUrl.slice(-4).toLowerCase() ? null :originOrUrl || null;
}, _determineScriptAccess = function() {
var _extractAllDomains = function(origins, resultsArray) {
var i, len, tmp;
if (null != origins && "*" !== resultsArray[0] && ("string" == typeof origins && (origins = [ origins ]), 
"object" == typeof origins && "length" in origins)) for (i = 0, len = origins.length; len > i; i++) if (origins.hasOwnProperty(i) && (tmp = _extractDomain(origins[i]))) {
if ("*" === tmp) {
resultsArray.length = 0, resultsArray.push("*");
break;
}
-1 === _inArray(tmp, resultsArray) && resultsArray.push(tmp);
}
}, _accessLevelLookup = {
always:"always",
samedomain:"sameDomain",
never:"never"
};
return function(currentDomain, configOptions) {
var asaLower, allowScriptAccess = configOptions.allowScriptAccess;
if ("string" == typeof allowScriptAccess && (asaLower = allowScriptAccess.toLowerCase()) && /^always|samedomain|never$/.test(asaLower)) return _accessLevelLookup[asaLower];
var swfDomain = _extractDomain(configOptions.moviePath);
null === swfDomain && (swfDomain = currentDomain);
var trustedDomains = [];
_extractAllDomains(configOptions.trustedOrigins, trustedDomains), _extractAllDomains(configOptions.trustedDomains, trustedDomains);
var len = trustedDomains.length;
if (len > 0) {
if (1 === len && "*" === trustedDomains[0]) return "always";
if (-1 !== _inArray(currentDomain, trustedDomains)) return 1 === len && currentDomain === swfDomain ? "sameDomain" :"always";
}
return "never";
};
}(), _objectKeys = function(obj) {
if (null == obj) return [];
if (Object.keys) return Object.keys(obj);
var keys = [];
for (var prop in obj) obj.hasOwnProperty(prop) && keys.push(prop);
return keys;
}, _deleteOwnProperties = function(obj) {
if (obj) for (var prop in obj) obj.hasOwnProperty(prop) && delete obj[prop];
return obj;
}, _detectFlashSupport = function() {
var hasFlash = !1;
if ("boolean" == typeof flashState.disabled) hasFlash = flashState.disabled === !1; else {
if ("function" == typeof ActiveXObject) try {
new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && (hasFlash = !0);
} catch (error) {}
!hasFlash && navigator.mimeTypes["application/x-shockwave-flash"] && (hasFlash = !0);
}
return hasFlash;
}, ZeroClipboard = function(elements, options) {
return this instanceof ZeroClipboard ? (this.id = "" + clientIdCounter++, _clientMeta[this.id] = {
instance:this,
elements:[],
handlers:{}
}, elements && this.clip(elements), "undefined" != typeof options && (_deprecationWarning("new ZeroClipboard(elements, options)", _globalConfig.debug), 
ZeroClipboard.config(options)), this.options = ZeroClipboard.config(), "boolean" != typeof flashState.disabled && (flashState.disabled = !_detectFlashSupport()), 
flashState.disabled === !1 && flashState.outdated !== !0 && null === flashState.bridge && (flashState.outdated = !1, 
flashState.ready = !1, _bridge()), void 0) :new ZeroClipboard(elements, options);
};
ZeroClipboard.prototype.setText = function(newText) {
return newText && "" !== newText && (_clipData["text/plain"] = newText, flashState.ready === !0 && flashState.bridge && flashState.bridge.setText(newText)), 
this;
}, ZeroClipboard.prototype.setSize = function(width, height) {
return flashState.ready === !0 && flashState.bridge && flashState.bridge.setSize(width, height), 
this;
};
var _setHandCursor = function(enabled) {
flashState.ready === !0 && flashState.bridge && flashState.bridge.setHandCursor(enabled);
};
ZeroClipboard.prototype.destroy = function() {
this.unclip(), this.off(), delete _clientMeta[this.id];
};
var _getAllClients = function() {
var i, len, client, clients = [], clientIds = _objectKeys(_clientMeta);
for (i = 0, len = clientIds.length; len > i; i++) client = _clientMeta[clientIds[i]].instance, 
client && client instanceof ZeroClipboard && clients.push(client);
return clients;
};
ZeroClipboard.version = "2.0.0-alpha.1";
var _globalConfig = {
swfPath:_swfPath,
trustedDomains:window.location.host ? [ window.location.host ] :[],
cacheBust:!0,
forceHandCursor:!1,
zIndex:999999999,
debug:!0,
title:null,
autoActivate:!0
};
ZeroClipboard.config = function(options) {
"object" == typeof options && null !== options && _extend(_globalConfig, options);
{
if ("string" != typeof options || !options) {
var copy = {};
for (var prop in _globalConfig) _globalConfig.hasOwnProperty(prop) && (copy[prop] = "object" == typeof _globalConfig[prop] && null !== _globalConfig[prop] ? "length" in _globalConfig[prop] ? _globalConfig[prop].slice(0) :_extend({}, _globalConfig[prop]) :_globalConfig[prop]);
return copy;
}
if (_globalConfig.hasOwnProperty(options)) return _globalConfig[options];
}
}, ZeroClipboard.destroy = function() {
ZeroClipboard.deactivate();
for (var clientId in _clientMeta) if (_clientMeta.hasOwnProperty(clientId) && _clientMeta[clientId]) {
var client = _clientMeta[clientId].instance;
client && "function" == typeof client.destroy && client.destroy();
}
var htmlBridge = _getHtmlBridge(flashState.bridge);
htmlBridge && htmlBridge.parentNode && (htmlBridge.parentNode.removeChild(htmlBridge), 
flashState.ready = null, flashState.bridge = null);
}, ZeroClipboard.activate = function(element) {
currentElement && (_removeClass(currentElement, _globalConfig.hoverClass), _removeClass(currentElement, _globalConfig.activeClass)), 
currentElement = element, _addClass(element, _globalConfig.hoverClass), _reposition();
var newTitle = _globalConfig.title || element.getAttribute("title");
if (newTitle) {
var htmlBridge = _getHtmlBridge(flashState.bridge);
htmlBridge && htmlBridge.setAttribute("title", newTitle);
}
var useHandCursor = _globalConfig.forceHandCursor === !0 || "pointer" === _getStyle(element, "cursor");
_setHandCursor(useHandCursor);
}, ZeroClipboard.deactivate = function() {
var htmlBridge = _getHtmlBridge(flashState.bridge);
htmlBridge && (htmlBridge.style.left = "0px", htmlBridge.style.top = "-9999px", 
htmlBridge.removeAttribute("title")), currentElement && (_removeClass(currentElement, _globalConfig.hoverClass), 
_removeClass(currentElement, _globalConfig.activeClass), currentElement = null);
};
var _bridge = function() {
var flashBridge, len, container = document.getElementById("global-zeroclipboard-html-bridge");
if (!container) {
var opts = ZeroClipboard.config();
opts.jsModuleId = "string" == typeof _amdModuleId && _amdModuleId || "string" == typeof _cjsModuleId && _cjsModuleId || null;
var allowScriptAccess = _determineScriptAccess(window.location.host, _globalConfig), flashvars = _vars(opts), swfUrl = _globalConfig.moviePath + _cacheBust(_globalConfig.moviePath, _globalConfig), html = '      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="' + swfUrl + '"/>         <param name="allowScriptAccess" value="' + allowScriptAccess + '"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="' + flashvars + '"/>         <embed src="' + swfUrl + '"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="' + allowScriptAccess + '"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="' + flashvars + '"           scale="exactfit">         </embed>       </object>';
container = document.createElement("div"), container.id = "global-zeroclipboard-html-bridge", 
container.setAttribute("class", "global-zeroclipboard-container"), container.style.position = "absolute", 
container.style.left = "0px", container.style.top = "-9999px", container.style.width = "15px", 
container.style.height = "15px", container.style.zIndex = "" + _getSafeZIndex(_globalConfig.zIndex), 
document.body.appendChild(container), container.innerHTML = html;
}
flashBridge = document["global-zeroclipboard-flash-bridge"], flashBridge && (len = flashBridge.length) && (flashBridge = flashBridge[len - 1]), 
flashState.bridge = flashBridge || container.children[0].lastElementChild;
}, _getHtmlBridge = function(flashBridge) {
for (var isFlashElement = /^OBJECT|EMBED$/, htmlBridge = flashBridge && flashBridge.parentNode; htmlBridge && isFlashElement.test(htmlBridge.nodeName) && htmlBridge.parentNode; ) htmlBridge = htmlBridge.parentNode;
return htmlBridge || null;
}, _reposition = function() {
if (currentElement) {
var pos = _getDOMObjectPosition(currentElement, _globalConfig.zIndex), htmlBridge = _getHtmlBridge(flashState.bridge);
htmlBridge && (htmlBridge.style.top = pos.top + "px", htmlBridge.style.left = pos.left + "px", 
htmlBridge.style.width = pos.width + "px", htmlBridge.style.height = pos.height + "px", 
htmlBridge.style.zIndex = pos.zIndex + 1), flashState.ready === !0 && flashState.bridge && flashState.bridge.setSize(pos.width, pos.height);
}
return this;
};
ZeroClipboard.prototype.on = function(eventName, func) {
var i, len, events, added = {}, handlers = _clientMeta[this.id] && _clientMeta[this.id].handlers;
if ("string" == typeof eventName && eventName) events = eventName.toLowerCase().split(/\s+/); else if ("object" == typeof eventName && eventName && "undefined" == typeof func) for (i in eventName) eventName.hasOwnProperty(i) && "string" == typeof i && i && "function" == typeof eventName[i] && this.on(i, eventName[i]);
if (events && events.length) {
for (i = 0, len = events.length; len > i; i++) eventName = events[i].replace(/^on/, ""), 
added[eventName] = !0, handlers[eventName] || (handlers[eventName] = []), handlers[eventName].push(func);
added.noflash && flashState.disabled && _receiveEvent.call(this, "noflash", {}), 
added.wrongflash && flashState.outdated && _receiveEvent.call(this, "wrongflash", {
flashVersion:flashState.version
}), added.load && flashState.ready && _receiveEvent.call(this, "load", {
flashVersion:flashState.version
});
}
return this;
}, ZeroClipboard.prototype.off = function(eventName, func) {
var i, len, foundIndex, events, perEventHandlers, handlers = _clientMeta[this.id] && _clientMeta[this.id].handlers;
if (0 === arguments.length) events = _objectKeys(handlers); else if ("string" == typeof eventName && eventName) events = eventName.split(/\s+/); else if ("object" == typeof eventName && eventName && "undefined" == typeof func) for (i in eventName) eventName.hasOwnProperty(i) && "string" == typeof i && i && "function" == typeof eventName[i] && this.off(i, eventName[i]);
if (events && events.length) for (i = 0, len = events.length; len > i; i++) if (eventName = events[i].toLowerCase().replace(/^on/, ""), 
perEventHandlers = handlers[eventName], perEventHandlers && perEventHandlers.length) if (func) for (foundIndex = _inArray(func, perEventHandlers); -1 !== foundIndex; ) perEventHandlers.splice(foundIndex, 1), 
foundIndex = _inArray(func, perEventHandlers, foundIndex); else handlers[eventName].length = 0;
return this;
}, ZeroClipboard.prototype.handlers = function(eventName) {
var prop, copy = null, handlers = _clientMeta[this.id] && _clientMeta[this.id].handlers;
if (handlers) {
if ("string" == typeof eventName && eventName) return handlers[eventName] ? handlers[eventName].slice(0) :null;
copy = {};
for (prop in handlers) handlers.hasOwnProperty(prop) && handlers[prop] && (copy[prop] = handlers[prop].slice(0));
}
return copy;
};
var _dispatchClientCallbacks = function(eventName, context, args, async) {
var handlers = _clientMeta[this.id] && _clientMeta[this.id].handlers[eventName];
if (handlers && handlers.length) {
var i, len, func, originalContext = context || this;
for (i = 0, len = handlers.length; len > i; i++) func = handlers[i], context = originalContext, 
"string" == typeof func && "function" == typeof window[func] && (func = window[func]), 
"object" == typeof func && func && "function" == typeof func.handleEvent && (context = func, 
func = func.handleEvent), "function" == typeof func && _dispatchCallback(func, context, args, async);
}
return this;
};
ZeroClipboard.prototype.clip = function(elements) {
elements = _prepClip(elements);
for (var i = 0; i < elements.length; i++) if (elements.hasOwnProperty(i) && elements[i] && 1 === elements[i].nodeType) {
elements[i].zcClippingId ? -1 === _inArray(this.id, _elementMeta[elements[i].zcClippingId]) && _elementMeta[elements[i].zcClippingId].push(this.id) :(elements[i].zcClippingId = "zcClippingId_" + elementIdCounter++, 
_elementMeta[elements[i].zcClippingId] = [ this.id ], _globalConfig.autoActivate === !0 && _addEventHandler(elements[i], "mouseover", _elementMouseOver));
var clippedElements = _clientMeta[this.id].elements;
-1 === _inArray(elements[i], clippedElements) && clippedElements.push(elements[i]);
}
return this;
}, ZeroClipboard.prototype.unclip = function(elements) {
var meta = _clientMeta[this.id];
if (meta) {
var arrayIndex, clippedElements = meta.elements;
elements = "undefined" == typeof elements ? clippedElements.slice(0) :_prepClip(elements);
for (var i = elements.length; i--; ) if (elements.hasOwnProperty(i) && elements[i] && 1 === elements[i].nodeType) {
for (arrayIndex = 0; -1 !== (arrayIndex = _inArray(elements[i], clippedElements, arrayIndex)); ) clippedElements.splice(arrayIndex, 1);
var clientIds = _elementMeta[elements[i].zcClippingId];
if (clientIds) {
for (arrayIndex = 0; -1 !== (arrayIndex = _inArray(this.id, clientIds, arrayIndex)); ) clientIds.splice(arrayIndex, 1);
0 === clientIds.length && (_globalConfig.autoActivate === !0 && _removeEventHandler(elements[i], "mouseover", _elementMouseOver), 
delete elements[i].zcClippingId);
}
}
}
return this;
}, ZeroClipboard.prototype.elements = function() {
var meta = _clientMeta[this.id];
return meta && meta.elements ? meta.elements.slice(0) :[];
};
var _getAllClientsClippedToElement = function(element) {
var elementMetaId, clientIds, i, len, client, clients = [];
if (element && 1 === element.nodeType && (elementMetaId = element.zcClippingId) && _elementMeta.hasOwnProperty(elementMetaId) && (clientIds = _elementMeta[elementMetaId], 
clientIds && clientIds.length)) for (i = 0, len = clientIds.length; len > i; i++) client = _clientMeta[clientIds[i]].instance, 
client && client instanceof ZeroClipboard && clients.push(client);
return clients;
};
_globalConfig.hoverClass = "zeroclipboard-is-hover", _globalConfig.activeClass = "zeroclipboard-is-active", 
_globalConfig.trustedOrigins = null, _globalConfig.allowScriptAccess = null, _globalConfig.useNoCache = !0, 
_globalConfig.moviePath = "ZeroClipboard.swf", ZeroClipboard.detectFlashSupport = function() {
return _deprecationWarning("ZeroClipboard.detectFlashSupport", _globalConfig.debug), 
_detectFlashSupport();
}, ZeroClipboard.dispatch = function(eventName, args) {
if ("string" == typeof eventName && eventName) {
var cleanEventName = eventName.toLowerCase().replace(/^on/, "");
if (cleanEventName) for (var clients = currentElement ? _getAllClientsClippedToElement(currentElement) :_getAllClients(), i = 0, len = clients.length; len > i; i++) _receiveEvent.call(clients[i], cleanEventName, args);
}
}, ZeroClipboard.prototype.setHandCursor = function(enabled) {
return _deprecationWarning("ZeroClipboard.prototype.setHandCursor", _globalConfig.debug), 
enabled = "boolean" == typeof enabled ? enabled :!!enabled, _setHandCursor(enabled), 
_globalConfig.forceHandCursor = enabled, this;
}, ZeroClipboard.prototype.reposition = function() {
return _deprecationWarning("ZeroClipboard.prototype.reposition", _globalConfig.debug), 
_reposition();
}, ZeroClipboard.prototype.receiveEvent = function(eventName, args) {
if (_deprecationWarning("ZeroClipboard.prototype.receiveEvent", _globalConfig.debug), 
"string" == typeof eventName && eventName) {
var cleanEventName = eventName.toLowerCase().replace(/^on/, "");
cleanEventName && _receiveEvent.call(this, cleanEventName, args);
}
}, ZeroClipboard.prototype.setCurrent = function(element) {
return _deprecationWarning("ZeroClipboard.prototype.setCurrent", _globalConfig.debug), 
ZeroClipboard.activate(element), this;
}, ZeroClipboard.prototype.resetBridge = function() {
return _deprecationWarning("ZeroClipboard.prototype.resetBridge", _globalConfig.debug), 
ZeroClipboard.deactivate(), this;
}, ZeroClipboard.prototype.setTitle = function(newTitle) {
if (_deprecationWarning("ZeroClipboard.prototype.setTitle", _globalConfig.debug), 
newTitle = newTitle || _globalConfig.title || currentElement && currentElement.getAttribute("title")) {
var htmlBridge = _getHtmlBridge(flashState.bridge);
htmlBridge && htmlBridge.setAttribute("title", newTitle);
}
return this;
}, ZeroClipboard.setDefaults = function(options) {
_deprecationWarning("ZeroClipboard.setDefaults", _globalConfig.debug), ZeroClipboard.config(options);
}, ZeroClipboard.prototype.addEventListener = function(eventName, func) {
return _deprecationWarning("ZeroClipboard.prototype.addEventListener", _globalConfig.debug), 
this.on(eventName, func);
}, ZeroClipboard.prototype.removeEventListener = function(eventName, func) {
return _deprecationWarning("ZeroClipboard.prototype.removeEventListener", _globalConfig.debug), 
this.off(eventName, func);
}, ZeroClipboard.prototype.ready = function() {
return _deprecationWarning("ZeroClipboard.prototype.ready", _globalConfig.debug), 
flashState.ready === !0;
};
var _receiveEvent = function(eventName, args) {
eventName = eventName.toLowerCase().replace(/^on/, "");
var cleanVersion = args && args.flashVersion && _parseFlashVersion(args.flashVersion) || null, element = currentElement, performCallbackAsync = !0;
switch (eventName) {
case "load":
if (cleanVersion) {
if (!_isFlashVersionSupported(cleanVersion)) return _receiveEvent.call(this, "onWrongFlash", {
flashVersion:cleanVersion
}), void 0;
flashState.outdated = !1, flashState.ready = !0, flashState.version = cleanVersion;
}
break;

case "wrongflash":
cleanVersion && !_isFlashVersionSupported(cleanVersion) && (flashState.outdated = !0, 
flashState.ready = !1, flashState.version = cleanVersion);
break;

case "mouseover":
_addClass(element, _globalConfig.hoverClass);
break;

case "mouseout":
_globalConfig.autoActivate === !0 && ZeroClipboard.deactivate();
break;

case "mousedown":
_addClass(element, _globalConfig.activeClass);
break;

case "mouseup":
_removeClass(element, _globalConfig.activeClass);
break;

case "datarequested":
var targetId = element.getAttribute("data-clipboard-target"), targetEl = targetId ? document.getElementById(targetId) :null;
if (targetEl) {
var textContent = targetEl.value || targetEl.textContent || targetEl.innerText;
textContent && this.setText(textContent);
} else {
var defaultText = element.getAttribute("data-clipboard-text");
defaultText && this.setText(defaultText);
}
performCallbackAsync = !1;
break;

case "complete":
_deleteOwnProperties(_clipData);
}
var context = element, eventArgs = [ this, args ];
return _dispatchClientCallbacks.call(this, eventName, context, eventArgs, performCallbackAsync);
};
"function" == typeof define && define.amd ? define([ "require", "exports", "module" ], function(require, exports, module) {
return _amdModuleId = module && module.id || null, ZeroClipboard;
}) :"object" == typeof module && module && "object" == typeof module.exports && module.exports ? (_cjsModuleId = module.id || null, 
module.exports = ZeroClipboard) :window.ZeroClipboard = ZeroClipboard;
}(), function() {
var prefix = "/assets/zero-clipboard/";
"undefined" != typeof HR && "undefined" != typeof HR.config && (prefix = HR.config.swfPath), 
"undefined" != typeof ZeroClipboard && ZeroClipboard.setDefaults({
moviePath:prefix + "ZeroClipboard.swf",
trustedDomains:[ "*" ],
allowScriptAccess:"always",
useNoCache:!1
});
}(), /***
This is part of jsdifflib v1.0. <http://snowtide.com/jsdifflib>

Copyright (c) 2007, Snowtide Informatics Systems, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

	* Redistributions of source code must retain the above copyright notice, this
		list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright notice,
		this list of conditions and the following disclaimer in the documentation
		and/or other materials provided with the distribution.
	* Neither the name of the Snowtide Informatics Systems nor the names of its
		contributors may be used to endorse or promote products derived from this
		software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
DAMAGE.
***/
__whitespace = {
" ":!0,
"	":!0,
"\n":!0,
"\f":!0,
"\r":!0
}, difflib = {
defaultJunkFunction:function(c) {
return __whitespace.hasOwnProperty(c);
},
stripLinebreaks:function(str) {
return str.replace(/^[\n\r]*|[\n\r]*$/g, "");
},
stringAsLines:function(str) {
for (var lfpos = str.indexOf("\n"), crpos = str.indexOf("\r"), linebreak = lfpos > -1 && crpos > -1 || 0 > crpos ? "\n" :"\r", lines = str.split(linebreak), i = 0; i < lines.length; i++) lines[i] = difflib.stripLinebreaks(lines[i]);
return lines;
},
__reduce:function(func, list, initial) {
if (null != initial) var value = initial, idx = 0; else {
if (!list) return null;
var value = list[0], idx = 1;
}
for (;idx < list.length; idx++) value = func(value, list[idx]);
return value;
},
__ntuplecomp:function(a, b) {
for (var mlen = Math.max(a.length, b.length), i = 0; mlen > i; i++) {
if (a[i] < b[i]) return -1;
if (a[i] > b[i]) return 1;
}
return a.length == b.length ? 0 :a.length < b.length ? -1 :1;
},
__calculate_ratio:function(matches, length) {
return length ? 2 * matches / length :1;
},
__isindict:function(dict) {
return function(key) {
return dict.hasOwnProperty(key);
};
},
__dictget:function(dict, key, defaultValue) {
return dict.hasOwnProperty(key) ? dict[key] :defaultValue;
},
SequenceMatcher:function(a, b, isjunk) {
this.set_seqs = function(a, b) {
this.set_seq1(a), this.set_seq2(b);
}, this.set_seq1 = function(a) {
a != this.a && (this.a = a, this.matching_blocks = this.opcodes = null);
}, this.set_seq2 = function(b) {
b != this.b && (this.b = b, this.matching_blocks = this.opcodes = this.fullbcount = null, 
this.__chain_b());
}, this.__chain_b = function() {
for (var b = this.b, n = b.length, b2j = this.b2j = {}, populardict = {}, i = 0; i < b.length; i++) {
var elt = b[i];
if (b2j.hasOwnProperty(elt)) {
var indices = b2j[elt];
n >= 200 && 100 * indices.length > n ? (populardict[elt] = 1, delete b2j[elt]) :indices.push(i);
} else b2j[elt] = [ i ];
}
for (var elt in populardict) populardict.hasOwnProperty(elt) && delete b2j[elt];
var isjunk = this.isjunk, junkdict = {};
if (isjunk) {
for (var elt in populardict) populardict.hasOwnProperty(elt) && isjunk(elt) && (junkdict[elt] = 1, 
delete populardict[elt]);
for (var elt in b2j) b2j.hasOwnProperty(elt) && isjunk(elt) && (junkdict[elt] = 1, 
delete b2j[elt]);
}
this.isbjunk = difflib.__isindict(junkdict), this.isbpopular = difflib.__isindict(populardict);
}, this.find_longest_match = function(alo, ahi, blo, bhi) {
for (var a = this.a, b = this.b, b2j = this.b2j, isbjunk = this.isbjunk, besti = alo, bestj = blo, bestsize = 0, j = null, j2len = {}, nothing = [], i = alo; ahi > i; i++) {
var newj2len = {}, jdict = difflib.__dictget(b2j, a[i], nothing);
for (var jkey in jdict) if (jdict.hasOwnProperty(jkey)) {
if (j = jdict[jkey], blo > j) continue;
if (j >= bhi) break;
newj2len[j] = k = difflib.__dictget(j2len, j - 1, 0) + 1, k > bestsize && (besti = i - k + 1, 
bestj = j - k + 1, bestsize = k);
}
j2len = newj2len;
}
for (;besti > alo && bestj > blo && !isbjunk(b[bestj - 1]) && a[besti - 1] == b[bestj - 1]; ) besti--, 
bestj--, bestsize++;
for (;ahi > besti + bestsize && bhi > bestj + bestsize && !isbjunk(b[bestj + bestsize]) && a[besti + bestsize] == b[bestj + bestsize]; ) bestsize++;
for (;besti > alo && bestj > blo && isbjunk(b[bestj - 1]) && a[besti - 1] == b[bestj - 1]; ) besti--, 
bestj--, bestsize++;
for (;ahi > besti + bestsize && bhi > bestj + bestsize && isbjunk(b[bestj + bestsize]) && a[besti + bestsize] == b[bestj + bestsize]; ) bestsize++;
return [ besti, bestj, bestsize ];
}, this.get_matching_blocks = function() {
if (null != this.matching_blocks) return this.matching_blocks;
for (var alo, ahi, blo, bhi, qi, i, j, k, x, la = this.a.length, lb = this.b.length, queue = [ [ 0, la, 0, lb ] ], matching_blocks = []; queue.length; ) qi = queue.pop(), 
alo = qi[0], ahi = qi[1], blo = qi[2], bhi = qi[3], x = this.find_longest_match(alo, ahi, blo, bhi), 
i = x[0], j = x[1], k = x[2], k && (matching_blocks.push(x), i > alo && j > blo && queue.push([ alo, i, blo, j ]), 
ahi > i + k && bhi > j + k && queue.push([ i + k, ahi, j + k, bhi ]));
matching_blocks.sort(difflib.__ntuplecomp);
var i1 = j1 = k1 = block = 0, non_adjacent = [];
for (var idx in matching_blocks) matching_blocks.hasOwnProperty(idx) && (block = matching_blocks[idx], 
i2 = block[0], j2 = block[1], k2 = block[2], i1 + k1 == i2 && j1 + k1 == j2 ? k1 += k2 :(k1 && non_adjacent.push([ i1, j1, k1 ]), 
i1 = i2, j1 = j2, k1 = k2));
return k1 && non_adjacent.push([ i1, j1, k1 ]), non_adjacent.push([ la, lb, 0 ]), 
this.matching_blocks = non_adjacent, this.matching_blocks;
}, this.get_opcodes = function() {
if (null != this.opcodes) return this.opcodes;
var i = 0, j = 0, answer = [];
this.opcodes = answer;
var block, ai, bj, size, tag, blocks = this.get_matching_blocks();
for (var idx in blocks) blocks.hasOwnProperty(idx) && (block = blocks[idx], ai = block[0], 
bj = block[1], size = block[2], tag = "", ai > i && bj > j ? tag = "replace" :ai > i ? tag = "delete" :bj > j && (tag = "insert"), 
tag && answer.push([ tag, i, ai, j, bj ]), i = ai + size, j = bj + size, size && answer.push([ "equal", ai, i, bj, j ]));
return answer;
}, this.get_grouped_opcodes = function(n) {
n || (n = 3);
var codes = this.get_opcodes();
codes || (codes = [ [ "equal", 0, 1, 0, 1 ] ]);
var code, tag, i1, i2, j1, j2;
"equal" == codes[0][0] && (code = codes[0], tag = code[0], i1 = code[1], i2 = code[2], 
j1 = code[3], j2 = code[4], codes[0] = [ tag, Math.max(i1, i2 - n), i2, Math.max(j1, j2 - n), j2 ]), 
"equal" == codes[codes.length - 1][0] && (code = codes[codes.length - 1], tag = code[0], 
i1 = code[1], i2 = code[2], j1 = code[3], j2 = code[4], codes[codes.length - 1] = [ tag, i1, Math.min(i2, i1 + n), j1, Math.min(j2, j1 + n) ]);
var nn = n + n, groups = [];
for (var idx in codes) codes.hasOwnProperty(idx) && (code = codes[idx], tag = code[0], 
i1 = code[1], i2 = code[2], j1 = code[3], j2 = code[4], "equal" == tag && i2 - i1 > nn && (groups.push([ tag, i1, Math.min(i2, i1 + n), j1, Math.min(j2, j1 + n) ]), 
i1 = Math.max(i1, i2 - n), j1 = Math.max(j1, j2 - n)), groups.push([ tag, i1, i2, j1, j2 ]));
return groups && "equal" == groups[groups.length - 1][0] && groups.pop(), groups;
}, this.ratio = function() {
return matches = difflib.__reduce(function(sum, triple) {
return sum + triple[triple.length - 1];
}, this.get_matching_blocks(), 0), difflib.__calculate_ratio(matches, this.a.length + this.b.length);
}, this.quick_ratio = function() {
var fullbcount, elt;
if (null == this.fullbcount) {
this.fullbcount = fullbcount = {};
for (var i = 0; i < this.b.length; i++) elt = this.b[i], fullbcount[elt] = difflib.__dictget(fullbcount, elt, 0) + 1;
}
fullbcount = this.fullbcount;
for (var avail = {}, availhas = difflib.__isindict(avail), matches = numb = 0, i = 0; i < this.a.length; i++) elt = this.a[i], 
numb = availhas(elt) ? avail[elt] :difflib.__dictget(fullbcount, elt, 0), avail[elt] = numb - 1, 
numb > 0 && matches++;
return difflib.__calculate_ratio(matches, this.a.length + this.b.length);
}, this.real_quick_ratio = function() {
var la = this.a.length, lb = this.b.length;
return _calculate_ratio(Math.min(la, lb), la + lb);
}, this.isjunk = isjunk ? isjunk :difflib.defaultJunkFunction, this.a = this.b = null, 
this.set_seqs(a, b);
}
}, /*
This is part of jsdifflib v1.0. <http://github.com/cemerick/jsdifflib>

Copyright 2007 - 2011 Chas Emerick <cemerick@snowtide.com>. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY Chas Emerick ``AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Chas Emerick OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of Chas Emerick.
*/
diffview = {
buildView:function(params) {
function celt(name, clazz) {
var e = document.createElement(name);
return e.className = clazz, e;
}
function telt(name, text) {
var e = document.createElement(name);
return e.appendChild(document.createTextNode(text)), e;
}
function ctelt(name, clazz, text) {
var e = document.createElement(name);
return e.className = clazz, e.appendChild(document.createTextNode(text)), e;
}
function addCells(row, tidx, tend, textLines, change) {
return tend > tidx ? (row.appendChild(telt("th", (tidx + 1).toString())), row.appendChild(ctelt("td", change, textLines[tidx].replace(/\t/g, "\xa0\xa0\xa0\xa0"))), 
tidx + 1) :(row.appendChild(document.createElement("th")), row.appendChild(celt("td", "empty")), 
tidx);
}
function addCellsInline(row, tidx, tidx2, textLines, change) {
row.appendChild(telt("th", null == tidx ? "" :(tidx + 1).toString())), row.appendChild(telt("th", null == tidx2 ? "" :(tidx2 + 1).toString())), 
row.appendChild(ctelt("td", change, textLines[null != tidx ? tidx :tidx2].replace(/\t/g, "\xa0\xa0\xa0\xa0")));
}
var baseTextLines = params.baseTextLines, newTextLines = params.newTextLines, opcodes = params.opcodes, baseTextName = params.baseTextName ? params.baseTextName :"Base Text", newTextName = params.newTextName ? params.newTextName :"New Text", contextSize = params.contextSize, inline = 0 == params.viewType || 1 == params.viewType ? params.viewType :0;
if (null == baseTextLines) throw "Cannot build diff view; baseTextLines is not defined.";
if (null == newTextLines) throw "Cannot build diff view; newTextLines is not defined.";
if (!opcodes) throw "Canno build diff view; opcodes is not defined.";
var tdata = document.createElement("thead"), node = document.createElement("tr");
tdata.appendChild(node), inline ? (node.appendChild(document.createElement("th")), 
node.appendChild(document.createElement("th")), node.appendChild(ctelt("th", "texttitle", baseTextName + " vs. " + newTextName))) :(node.appendChild(document.createElement("th")), 
node.appendChild(ctelt("th", "texttitle", baseTextName)), node.appendChild(document.createElement("th")), 
node.appendChild(ctelt("th", "texttitle", newTextName))), tdata = [ tdata ];
for (var node2, rows = [], idx = 0; idx < opcodes.length; idx++) {
code = opcodes[idx], change = code[0];
for (var b = code[1], be = code[2], n = code[3], ne = code[4], rowcnt = Math.max(be - b, ne - n), toprows = [], botrows = [], i = 0; rowcnt > i; i++) {
if (contextSize && opcodes.length > 1 && (idx > 0 && i == contextSize || 0 == idx && 0 == i) && "equal" == change) {
var jump = rowcnt - (0 == idx ? 1 :2) * contextSize;
if (jump > 1) {
if (toprows.push(node = document.createElement("tr")), b += jump, n += jump, i += jump - 1, 
node.appendChild(telt("th", "...")), inline || node.appendChild(ctelt("td", "skip", "")), 
node.appendChild(telt("th", "...")), node.appendChild(ctelt("td", "skip", "")), 
idx + 1 == opcodes.length) break;
continue;
}
}
toprows.push(node = document.createElement("tr")), inline ? "insert" == change ? addCellsInline(node, null, n++, newTextLines, change) :"replace" == change ? (botrows.push(node2 = document.createElement("tr")), 
be > b && addCellsInline(node, b++, null, baseTextLines, "delete"), ne > n && addCellsInline(node2, null, n++, newTextLines, "insert")) :"delete" == change ? addCellsInline(node, b++, null, baseTextLines, change) :addCellsInline(node, b++, n++, baseTextLines, change) :(b = addCells(node, b, be, baseTextLines, change), 
n = addCells(node, n, ne, newTextLines, change));
}
for (var i = 0; i < toprows.length; i++) rows.push(toprows[i]);
for (var i = 0; i < botrows.length; i++) rows.push(botrows[i]);
}
tdata.push(node = document.createElement("tbody"));
for (var idx in rows) rows.hasOwnProperty(idx) && node.appendChild(rows[idx]);
node = celt("table", "diff table table-bordered" + (inline ? " inlinediff" :""));
for (var idx in tdata) tdata.hasOwnProperty(idx) && node.appendChild(tdata[idx]);
return node;
}
};